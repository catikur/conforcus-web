import type { NextRequest } from "next/server";
import { LOCAL_FILE, LOCAL_QUERIES } from "@/lib/img";

export const runtime = "nodejs";

// Sanity görsel CDN'inin aynı kaynaktan sunulan kopyası: /img/<varlık dosyası>?<varyant>
// LCP adayı kapak görseli ek bir alan adına (DNS + TLS) bağlanmadan, sayfanın açık bağlantısından
// gelsin diye. Yalnız bu projenin görsel varlıkları ve yalnız sitenin ürettiği sabit varyantlar
// (lib/img.ts: LOCAL_FILE, LOCAL_QUERIES) geçer; istemcinin başlıkları (çerez dahil) CDN'e iletilmez.
// Varlık adları içerik özetli olduğundan yanıt kalıcı önbelleklenir.
const MAX_BYTES = 1_000_000;
// Yalnız raster yanıtlar geri verilir (SVG gibi etkin içerik bu kaynaktan sunulmaz).
const RASTER = new Set(["image/avif", "image/webp", "image/jpeg", "image/png", "image/gif"]);
// Süreç içi önbellek: aynı varyant her istekte CDN'e gidip gelmesin. Toplam boyut sınırlı, en eski atılır.
const CACHE_BYTES = 8_000_000;

type Entry = { type: string; body: ArrayBuffer };
const cache = new Map<string, Entry>();
let cached = 0;
// Aynı varyant için eşzamanlı istekler tek CDN isteğini paylaşır.
const inflight = new Map<string, Promise<Entry | number>>();

const fail = (status: number) => new Response(null, { status, headers: { "cache-control": "no-store" } });

// CDN'den alır; başarıda önbelleğe koyup girdiyi, aksi halde istemciye dönülecek durum kodunu verir.
async function load(key: string, url: string, accept: string): Promise<Entry | number> {
  let up: Response;
  try {
    up = await fetch(url, { headers: { accept }, cache: "no-store", signal: AbortSignal.timeout(8000) });
  } catch {
    return 502;
  }
  const type = (up.headers.get("content-type") || "").split(";")[0].trim();
  const tooBig = Number(up.headers.get("content-length") || 0) > MAX_BYTES;
  if (!up.ok || !RASTER.has(type) || tooBig) {
    await up.body?.cancel().catch(() => {});
    return up.status === 404 ? 404 : 502;
  }
  const body = await up.arrayBuffer();
  if (body.byteLength > MAX_BYTES) return 502;

  const entry = { type, body };
  for (const [k, e] of cache) {
    if (cached + body.byteLength <= CACHE_BYTES) break;
    cache.delete(k);
    cached -= e.body.byteLength;
  }
  cache.set(key, entry);
  cached += body.byteLength;
  return entry;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const pid = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || "production";
  if (!pid || !LOCAL_FILE.test(file)) return fail(404);

  const query = req.nextUrl.search.slice(1);
  if (!LOCAL_QUERIES.includes(query)) return fail(400);

  // Biçim pazarlığı üç sınıfa indirilir; önbellek anahtarı tarayıcıya göre dağılmasın.
  const a = req.headers.get("accept") || "";
  const accept = a.includes("image/avif") ? "image/avif,image/webp,*/*" : a.includes("image/webp") ? "image/webp,*/*" : "*/*";
  const key = `${file}?${query}|${accept}`;

  let hit = cache.get(key);
  if (!hit) {
    let job = inflight.get(key);
    if (!job) {
      job = load(key, `https://cdn.sanity.io/images/${pid}/${dataset}/${file}?${query}`, accept).finally(() => inflight.delete(key));
      inflight.set(key, job);
    }
    const res = await job;
    if (typeof res === "number") return fail(res);
    hit = res;
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
