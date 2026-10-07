import type { NextRequest } from "next/server";
import { PLAUSIBLE_DOMAIN } from "@/lib/analytics";
import { readBodyCapped } from "@/lib/readBody";

export const runtime = "nodejs";

// Plausible olay ucunun aynı kaynaktaki vekili: tarayıcı ölçüm için başka bir alan adına bağlanmaz.
// Plausible ziyaretçiyi saymak ve ülkeyi bulmak için IP adresine ve tarayıcı bilgisine bakar (ikisini
// de saklamaz); bu yüzden istekten yalnız bu iki başlık iletilir. Gövde izleyicinin ürettiği küçük
// JSON'dur ve yalnız bu sitenin alan adı için kabul edilir.
const UPSTREAM = (process.env.PLAUSIBLE_API || "").trim() || "https://plausible.io/api/event";
const MAX_BODY = 4096;

const reply = (status: number) => new Response(null, { status, headers: { "cache-control": "no-store" } });

export async function POST(req: NextRequest) {
  if (!PLAUSIBLE_DOMAIN) return reply(404);

  const body = await readBodyCapped(req, MAX_BODY);
  if (body === null) return reply(413);
  let site: unknown;
  try {
    site = (JSON.parse(body) as { d?: unknown }).d;
  } catch {
    return reply(400);
  }
  if (site !== PLAUSIBLE_DOMAIN) return reply(400);

  // Caddy gerçek istemci adresini X-Forwarded-For'a yazar (istemcinin gönderdiği değeri kullanmaz).
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  try {
    const up = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": req.headers.get("user-agent") || "",
        ...(ip ? { "x-forwarded-for": ip } : {}),
      },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    await up.body?.cancel().catch(() => {});
    return reply(up.ok ? 202 : 502);
  } catch {
    return reply(502);
  }
}
