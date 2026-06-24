import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Basit bellek-içi rate limit (tek konteyner). 10 dk'da en fazla 5 istek/IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX;
}

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const LEAD_TO = process.env.LEAD_TO || "info@conforcus.com";
const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

type LeadBody = { name?: string; email?: string; company?: string; score?: string; lang?: string; website?: string };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
function valid(b: LeadBody): boolean {
  return typeof b.name === "string" && b.name.trim().length > 1 && typeof b.email === "string" && EMAIL_RE.test(b.email);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // honeypot — botlar gizli alanı doldurur
  if (body.website) return NextResponse.json({ ok: true });
  if (!valid(body)) return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });

  const { name, email, company, score, lang } = body;
  const subject = `Conforcus — Yeni SAP Analiz talebi: ${name}${company ? ` (${company})` : ""}`;
  const text = [
    `Ad Soyad: ${name}`,
    `E-posta: ${email}`,
    `Şirket: ${company || "-"}`,
    `Skor: ${score || "-"}`,
    `Dil: ${lang || "-"}`,
    `IP: ${ip}`,
  ].join("\n");

  if (!smtpConfigured) {
    // SMTP henüz ayarlı değil — geliştirmede logla, başarıyla dön.
    console.log("[lead] SMTP yapılandırılmadı, gelen talep:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({ from: `Conforcus Web <${SMTP_USER}>`, to: LEAD_TO, replyTo: email, subject, text });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[lead] SMTP hatası", e);
    return NextResponse.json({ ok: false, error: "smtp" }, { status: 502 });
  }
}
