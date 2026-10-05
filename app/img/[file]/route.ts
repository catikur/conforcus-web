import type { NextRequest } from "next/server";

export const runtime = "nodejs";

// Sanity görsel CDN'inin aynı kaynaktan sunulan kopyası: /img/<varlık dosyası>?w=…&h=…
// LCP adayı kapak görseli ek bir alan adına (DNS + TLS) bağlanmadan, sayfanın açık bağlantısından
// gelsin diye. Yalnız bu projenin görsel varlıkları ve yalnız boyut/biçim parametreleri geçer;
// istemcinin başlıkları (çerez dahil) CDN'e iletilmez. Varlık adları içerik özetli olduğundan
// yanıt kalıcı önbelleklenir.
const FILE = /^[a-f0-9]{40}-\d{1,5}x\d{1,5}\.(?:png|jpe?g|webp|gif)$/;
const MAX_BYTES = 1_000_000;
// Süreç içi önbellek: aynı varyant her istekte CDN'e gidip gelmesin. Toplam boyut sınırlı, en eski atılır.
const CACHE_BYTES = 8_000_000;
const CACHE_ITEM_BYTES = 400_000;

type Entry = { type: string; body: ArrayBuffer };
const cache = new Map<string, Entry>();
let cached = 0;

const dim = (v: string | null, max: number): number | null => {
  if (v === null) return null;
  const n = Number(v);
  return /^\d{1,4}$/.test(v) && n >= 16 && n <= max ? n : NaN;
};

const fail = (status: number) => new Response(null, { status, headers: { "cache-control": "no-store" } });

export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const pid = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  if (!pid || !FILE.test(file)) return fail(404);

  const sp = req.nextUrl.searchParams;
  const w = dim(sp.get("w"), 1600);
  const h = dim(sp.get("h"), 1600);
  const q = dim(sp.get("q"), 100);
  const fit = sp.get("fit");
  if (!w || Number.isNaN(h) || Number.isNaN(q) || (fit !== null && fit !== "crop" && fit !== "max")) return fail(400);

  // Biçim pazarlığı üç sınıfa indirilir; önbellek anahtarı tarayıcıya göre dağılmasın.
  const a = req.headers.get("accept") || "";
  const accept = a.includes("image/avif") ? "image/avif,image/webp,*/*" : a.includes("image/webp") ? "image/webp,*/*" : "*/*";
  const qs = [`w=${w}`, h ? `h=${h}` : "", `fit=${fit || "max"}`, "auto=format", `q=${q || 75}`].filter(Boolean).join("&");
  const key = `${file}?${qs}|${accept}`;

  let hit = cache.get(key);
  if (!hit) {
    let up: Response;
    try {
      up = await fetch(`https://cdn.sanity.io/images/${pid}/${dataset}/${file}?${qs}`, {
        headers: { accept },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      return fail(502);
    }
    const type = up.headers.get("content-type") || "";
    if (!up.ok || !type.startsWith("image/")) return fail(up.status === 404 ? 404 : 502);
    const body = await up.arrayBuffer();
    if (body.byteLength > MAX_BYTES) return fail(502);
    hit = { type, body };
    if (body.byteLength <= CACHE_ITEM_BYTES) {
      for (const [k, e] of cache) {
        if (cached + body.byteLength <= CACHE_BYTES) break;
        cache.delete(k);
        cached -= e.body.byteLength;
      }
      cached += body.byteLength - (cache.get(key)?.body.byteLength ?? 0); // eşzamanlı aynı istek: üzerine yazılır
      cache.set(key, hit);
    }
  }

  return new Response(hit.body, {
    headers: {
      "content-type": hit.type,
      "content-length": String(hit.body.byteLength),
      "cache-control": "public, max-age=31536000, immutable",
      vary: "Accept",
    },
  });
}
