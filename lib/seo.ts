import type { Metadata } from "next";
import { alternatesFor, alternatesForPath, ROUTES, SITE_URL, type Locale, type RouteKey } from "./i18n";

export type SeoOverride = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  noIndex?: boolean | null;
};

export function pageMetadata(key: RouteKey, locale: Locale, seo?: SeoOverride): Metadata {
  const r = ROUTES[key];
  const title = seo?.title || r.title[locale];
  const description = seo?.description || r.desc[locale];
  return buildMetadata({
    locale,
    title,
    description,
    path: r[locale],
    languages: alternatesFor(key, locale).languages,
    canonical: SITE_URL + r[locale],
    noIndex: !!seo?.noIndex,
    image: seo?.image,
  });
}

export function buildMetadata(opts: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  canonical?: string;
  languages?: Record<string, string>;
  noIndex?: boolean;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
}): Metadata {
  const url = opts.canonical || SITE_URL + opts.path;
  const image = opts.image || `${SITE_URL}/og`;
  const languages = opts.languages;
  return {
    metadataBase: new URL(SITE_URL),
    title: opts.title,
    description: opts.description,
    alternates: languages
      ? { canonical: url, languages }
      : { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      type: opts.type || "website",
      siteName: "Conforcus",
      locale: opts.locale === "tr" ? "tr_TR" : "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: "Conforcus" }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: { title: opts.title, description: opts.description, card: "summary_large_image", images: [image] },
  };
}

export function pathMetadata(
  locale: Locale,
  trPath: string,
  enPath: string,
  title: string,
  description: string,
  seo?: SeoOverride
): Metadata {
  const path = locale === "tr" ? trPath : enPath;
  return buildMetadata({
    locale,
    title: seo?.title || title,
    description: seo?.description || description,
    path,
    ...alternatesForPath(locale, trPath, enPath),
    noIndex: !!seo?.noIndex,
    image: seo?.image,
  });
}
