// Sanity görsel CDN yardımcıları. Görseller sunucu tarafı optimizasyondan geçmez;
// boyut ve biçim (auto=format → webp/avif) parametreleri CDN'de uygulanır.
// SVG'ler ve Sanity dışı adresler olduğu gibi döner.

const SANITY = "https://cdn.sanity.io/images/";

// `local`: görsel aynı kaynaktan (/img/…, app/img/[file]/route.ts) istenir — yalnız LCP adayı için.
// Yol yalnız aşağıdaki dosya adlarını (Sanity'nin belgelediği <varlık adı>-<G>x<Y>.<biçim>; raster)
// ve sitenin ürettiği sabit varyantları kabul eder. İkisine de uymayan istek CDN adresinde kalır;
// yeni bir boyut `local` ile istenecekse varyantı buraya eklemek yeterli.
export const LOCAL_FILE = /^[A-Za-z0-9]{1,64}-\d{1,5}x\d{1,5}\.(?:jpe?g|png|webp|gif|avif)$/;
export const LOCAL_QUERIES: readonly string[] = [
  "w=640&h=336&fit=crop&auto=format&q=75",
  "w=1280&h=672&fit=crop&auto=format&q=75",
];
const SANITY_ASSET = /^https:\/\/cdn\.sanity\.io\/images\/[^/]+\/[^/]+\/([^/?#]+)$/;

export function sanityImg(url: string | undefined | null, opts: { w: number; h?: number; fit?: "max" | "crop"; q?: number; local?: boolean }): string {
  if (!url) return "";
  if (!url.startsWith(SANITY) || /\.svg(\?|$)/i.test(url) || url.includes("?")) return url;
  const p = [`w=${opts.w}`];
  if (opts.h) p.push(`h=${opts.h}`);
  p.push(`fit=${opts.fit || "max"}`, "auto=format", `q=${opts.q ?? 75}`);
  const query = p.join("&");
  if (opts.local && LOCAL_QUERIES.includes(query)) {
    const file = url.match(SANITY_ASSET)?.[1];
    if (file && LOCAL_FILE.test(file)) return `/img/${file}?${query}`;
  }
  return `${url}?${query}`;
}

/** 1x ve 2x için srcSet (yalnız Sanity raster görsellerinde anlamlı). */
export function sanitySrcSet(url: string | undefined | null, opts: { w: number; h?: number; fit?: "max" | "crop"; q?: number; local?: boolean }): string | undefined {
  if (!url || !url.startsWith(SANITY) || /\.svg(\?|$)/i.test(url) || url.includes("?")) return undefined;
  const x2 = sanityImg(url, { ...opts, w: opts.w * 2, h: opts.h ? opts.h * 2 : undefined });
  return `${sanityImg(url, opts)} 1x, ${x2} 2x`;
}

/** Genişlik tanımlı srcSet ("… 640w, … 1280w") — `sizes` ile birlikte kullanılır. */
export function sanitySrcSetW(url: string | undefined | null, widths: number[], opts: { ratio?: number; q?: number } = {}): string | undefined {
  if (!url || !url.startsWith(SANITY) || /\.svg(\?|$)/i.test(url) || url.includes("?")) return undefined;
  return widths
    .map((w) => `${sanityImg(url, { w, h: opts.ratio ? Math.round(w / opts.ratio) : undefined, fit: opts.ratio ? "crop" : "max", q: opts.q })} ${w}w`)
    .join(", ");
}
