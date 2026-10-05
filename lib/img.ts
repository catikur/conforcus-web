// Sanity görsel CDN yardımcıları. Görseller sunucu tarafı optimizasyondan geçmez;
// boyut ve biçim (auto=format → webp/avif) parametreleri CDN'de uygulanır.
// SVG'ler ve Sanity dışı adresler olduğu gibi döner.

const SANITY = "https://cdn.sanity.io/images/";
// `local`: görsel aynı kaynaktan (/img/…, app/img/[file]/route.ts) istenir — yalnız LCP adayı için.
const SANITY_ASSET_BASE = /^https:\/\/cdn\.sanity\.io\/images\/[^/]+\/[^/]+\//;

export function sanityImg(url: string | undefined | null, opts: { w: number; h?: number; fit?: "max" | "crop"; q?: number; local?: boolean }): string {
  if (!url) return "";
  if (!url.startsWith(SANITY) || /\.svg(\?|$)/i.test(url) || url.includes("?")) return url;
  const p = [`w=${opts.w}`];
  if (opts.h) p.push(`h=${opts.h}`);
  p.push(`fit=${opts.fit || "max"}`, "auto=format", `q=${opts.q ?? 75}`);
  return `${opts.local ? url.replace(SANITY_ASSET_BASE, "/img/") : url}?${p.join("&")}`;
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
