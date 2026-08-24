import { sanityClient, sanityConfigured } from "./sanity";
import { SITEMAP_POSTS_QUERY, SITEMAP_REFERENCES_QUERY, SITEMAP_SOLUTIONS_QUERY } from "./sanity.queries";
import { PRODUCT_SLUGS } from "./productPages";
import { SAMPLE_POSTS } from "./blogSamples";
import { CASE_FALLBACKS } from "./casePages";

export type SitemapPair = { tr: string; en: string; lastmod?: string; priority?: number };

export async function getSitemapEntries(): Promise<SitemapPair[]> {
  let sanityHasRefs = false;
  const out: SitemapPair[] = [];
  const seen = new Set<string>();
  const add = (e: SitemapPair) => {
    if (seen.has(e.tr)) return;
    seen.add(e.tr);
    out.push(e);
  };

  if (sanityConfigured && sanityClient) {
    try {
      const posts: { slug: string; _updatedAt?: string }[] = await sanityClient.fetch(SITEMAP_POSTS_QUERY);
      for (const p of posts || []) {
        if (!p.slug || p.slug === "testing") continue;
        add({ tr: `/blog/${p.slug}`, en: `/en/blog/${p.slug}`, lastmod: p._updatedAt, priority: 0.7 });
      }
    } catch {
      /* fallback below */
    }
    try {
      const refs: { slug: string; _updatedAt?: string }[] = await sanityClient.fetch(SITEMAP_REFERENCES_QUERY);
      if (refs?.length) sanityHasRefs = true;
      for (const r of refs || []) {
        if (!r.slug) continue;
        add({ tr: `/referanslar/${r.slug}`, en: `/en/references/${r.slug}`, lastmod: r._updatedAt, priority: 0.65 });
      }
    } catch {
      /* ignore */
    }
    try {
      const sols: { slug: string; _updatedAt?: string }[] = await sanityClient.fetch(SITEMAP_SOLUTIONS_QUERY);
      for (const s of sols || []) {
        if (!s.slug) continue;
        add({ tr: `/cozumler/${s.slug}`, en: `/en/solutions/${s.slug}`, lastmod: s._updatedAt, priority: 0.75 });
      }
    } catch {
      /* ignore */
    }
  }

  for (const slug of PRODUCT_SLUGS) {
    add({ tr: `/cozumler/${slug}`, en: `/en/solutions/${slug}`, priority: 0.75 });
  }
  for (const p of SAMPLE_POSTS) {
    if (p.slug === "testing") continue;
    add({ tr: `/blog/${p.slug}`, en: `/en/blog/${p.slug}`, lastmod: p.publishedAt, priority: 0.7 });
  }
  // Sanity'de referans varsa sabit vaka slug'ları EKLENMEZ: Sanity'de yeniden
  // adlandırılan bir referansın eski slug'ı sitemap'te 404 olarak kalıyordu.
  if (!sanityHasRefs) {
    for (const c of CASE_FALLBACKS) {
      add({ tr: `/referanslar/${c.slug}`, en: `/en/references/${c.slug}`, priority: 0.65 });
    }
  }
  return out;
}
