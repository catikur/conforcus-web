import { ROUTES, SITE_URL, type Locale, type RouteKey } from "@/lib/i18n";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Kuruluş bilgisi — agentic search + zengin sonuçlar için en kritik şema.
export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Conforcus",
        legalName: "Conforcus Bilişim Danışmanlık A.Ş.",
        url: SITE_URL,
        logo: SITE_URL + "/logo.png",
        slogan: "Deep Expertise. Smart Solutions. Lasting Trust.",
        description:
          "SAP danışmanlığında derin uzmanlık: SAP destek (AMS), S/4HANA dönüşümleri, global rollout ve 48+ hazır SAP çözümü.",
        email: "info@conforcus.com",
        sameAs: ["https://www.linkedin.com/company/conforcus"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "İçerenköy Mah. Yeşilvadi Sok. No:8, Öneren İş Merkezi Kat:3",
          addressLocality: "Ataşehir",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
      }}
    />
  );
}

export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Conforcus",
        url: SITE_URL + (locale === "en" ? "/en" : "/"),
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        publisher: { "@type": "Organization", name: "Conforcus" },
      }}
    />
  );
}

// Ana sayfa: sunulan SAP hizmetleri kataloğu.
export function ProfessionalServiceJsonLd({ locale }: { locale: Locale }) {
  const services =
    locale === "tr"
      ? ["SAP Destek Hizmetleri (AMS)", "S/4HANA Dönüşümleri", "Global Rollout", "Ürün & Çözüm Geliştirme"]
      : ["SAP Support Services (AMS)", "S/4HANA Transformations", "Global Rollout", "Product & Solution Development"];
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Conforcus",
        url: SITE_URL + ROUTES.home[locale],
        image: SITE_URL + "/logo.png",
        priceRange: "$$$",
        areaServed: "Worldwide",
        knowsAbout: ["SAP", "S/4HANA", "SAP FI", "SAP CO", "SAP MM", "SAP SD", "ABAP", "SAP Fiori", "AMS"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: locale === "tr" ? "SAP Hizmetleri" : "SAP Services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        },
      }}
    />
  );
}

// Blog yazısı — BlogPosting (agentic + zengin sonuçlar) + 3 seviyeli breadcrumb.
export function ArticleJsonLd({
  locale,
  title,
  excerpt,
  slug,
  publishedAt,
  authorName,
  coverUrl,
}: {
  locale: Locale;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  authorName?: string;
  coverUrl?: string;
}) {
  const url = `${SITE_URL}${ROUTES.blog[locale]}/${slug}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: excerpt,
        datePublished: publishedAt,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        mainEntityOfPage: url,
        url,
        image: coverUrl || `${SITE_URL}/og`,
        author: authorName ? { "@type": "Person", name: authorName } : { "@type": "Organization", name: "Conforcus" },
        publisher: { "@type": "Organization", name: "Conforcus", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
      }}
    />
  );
}

export function PostBreadcrumbJsonLd({ locale, title, slug }: { locale: Locale; title: string; slug: string }) {
  const blog = SITE_URL + ROUTES.blog[locale];
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : "Home", item: SITE_URL + ROUTES.home[locale] },
          { "@type": "ListItem", position: 2, name: "Blog", item: blog },
          { "@type": "ListItem", position: 3, name: title, item: `${blog}/${slug}` },
        ],
      }}
    />
  );
}

// Genel 3 seviyeli breadcrumb: Ana Sayfa → üst sayfa → detay.
export function DetailBreadcrumbJsonLd({
  locale,
  parentKey,
  parentName,
  title,
  slug,
}: {
  locale: Locale;
  parentKey: RouteKey;
  parentName: string;
  title: string;
  slug: string;
}) {
  const parent = SITE_URL + ROUTES[parentKey][locale];
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : "Home", item: SITE_URL + ROUTES.home[locale] },
          { "@type": "ListItem", position: 2, name: parentName, item: parent },
          { "@type": "ListItem", position: 3, name: title, item: `${parent}/${slug}` },
        ],
      }}
    />
  );
}

export function BreadcrumbJsonLd({ locale, pageKey, name }: { locale: Locale; pageKey: RouteKey; name: string }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "tr" ? "Ana Sayfa" : "Home", item: SITE_URL + ROUTES.home[locale] },
          { "@type": "ListItem", position: 2, name, item: SITE_URL + ROUTES[pageKey][locale] },
        ],
      }}
    />
  );
}
