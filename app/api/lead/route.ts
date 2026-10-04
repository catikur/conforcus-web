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

type LeadBody = {
  name?: string;
  email?: string;
  company?: string;
  score?: string;
  lang?: string;
  website?: string;
  answers?: string[];
  recommendations?: string[];
};
const EMAIL_RE = /^[^@\s<>(),;:"\\]+@[^@\s<>(),;:"\\]+\.[^@\s<>(),;:"\\]+$/;
const MAX_BODY = 32 * 1024;
// Tek satırlık alanlar: satır sonu ve kontrol karakterleri atılır, uzunluk sınırlanır.
const line = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";
const lines = (v: unknown, maxItems: number, max: number) =>
  Array.isArray(v) ? v.slice(0, maxItems).map((x) => line(x, max)).filter(Boolean) : [];
function valid(b: { name: string; email: string }): boolean {
  return b.name.length > 1 && b.email.length <= 254 && EMAIL_RE.test(b.email);
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: LeadBody;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    body = JSON.parse(raw) as LeadBody;
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // honeypot — botlar gizli alanı doldurur
  if (body.website) return NextResponse.json({ ok: true });

  const name = line(body.name, 120);
  const email = line(body.email, 254);
  const company = line(body.company, 160);
  const score = line(body.score, 200);
  const lang = line(body.lang, 8);
  const answers = lines(body.answers, 20, 600);
  const recommendations = lines(body.recommendations, 20, 600);
  if (!valid({ name, email })) return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });

  const subject = `Conforcus — Yeni SAP Analiz talebi: ${name}${company ? ` (${company})` : ""}`;
  const list = (arr?: string[]) => (arr?.length ? arr.map((x, i) => `  ${i + 1}. ${x}`).join("\n") : "  -");
  const text = [
    `Ad Soyad: ${name}`,
    `E-posta: ${email}`,
    `Şirket: ${company || "-"}`,
    `Skor: ${score || "-"}`,
    `Dil: ${lang || "-"}`,
    `IP: ${ip}`,
    "",
    "— Değerlendirme cevapları —",
    list(answers),
    "",
    "— Önerilen odak —",
    list(recommendations),
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
