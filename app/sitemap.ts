import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, SITE_URL, type RouteKey } from "@/lib/i18n";
import { getSitemapEntries } from "@/lib/sitemapData";

function pair(tr: string, en: string, loc: "tr" | "en", lastmod?: string, priority = 0.8): MetadataRoute.Sitemap[number] {
  return {
    url: SITE_URL + (loc === "tr" ? tr : en),
    lastModified: lastmod ? new Date(lastmod) : undefined,
    changeFrequency: "monthly",
    priority,
    alternates: { languages: { tr: SITE_URL + tr, en: SITE_URL + en } },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const keys = Object.keys(ROUTES) as RouteKey[];
  for (const k of keys) {
    const r = ROUTES[k];
    for (const loc of LOCALES) {
      if (loc === "en" && r.enInSitemap === false) continue;
      entries.push({
        url: SITE_URL + r[loc],
        changeFrequency: "monthly",
        priority: k === "home" ? 1 : k.startsWith("hizmet-") ? 0.85 : 0.8,
        alternates: { languages: { tr: SITE_URL + r.tr, en: SITE_URL + r.en } },
      });
    }
  }

  const extra = await getSitemapEntries();
  for (const e of extra) {
    entries.push(pair(e.tr, e.en, "tr", e.lastmod, e.priority));
    entries.push(pair(e.tr, e.en, "en", e.lastmod, e.priority));
  }
  return entries;
}
