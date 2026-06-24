import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, SITE_URL, type RouteKey } from "@/lib/i18n";

// Tüm rotalar × diller; her giriş hreflang alternatifleriyle.
export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(ROUTES) as RouteKey[];
  const entries: MetadataRoute.Sitemap = [];
  for (const k of keys) {
    for (const loc of LOCALES) {
      entries.push({
        url: SITE_URL + ROUTES[k][loc],
        changeFrequency: "monthly",
        priority: k === "home" ? 1 : 0.8,
        alternates: {
          languages: {
            tr: SITE_URL + ROUTES[k].tr,
            en: SITE_URL + ROUTES[k].en,
          },
        },
      });
    }
  }
  return entries;
}
