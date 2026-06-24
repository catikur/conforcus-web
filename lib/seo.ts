import type { Metadata } from "next";
import { alternatesFor, ROUTES, SITE_URL, type Locale, type RouteKey } from "./i18n";

// Sayfa başına SEO metadata: title, description, canonical + hreflang, OG, Twitter.
export function pageMetadata(key: RouteKey, locale: Locale): Metadata {
  const r = ROUTES[key];
  const title = r.title[locale];
  const description = r.desc[locale];
  const url = SITE_URL + r[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: alternatesFor(key, locale),
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Conforcus",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: `${SITE_URL}/og`, width: 1200, height: 630, alt: "Conforcus" }],
    },
    twitter: { title, description, card: "summary_large_image", images: [`${SITE_URL}/og`] },
  };
}
