import { COMPANY, SITE_URL } from "@/lib/site";
import { ROUTES, type Locale, type RouteKey } from "@/lib/i18n";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        logo: SITE_URL + "/logo.png",
        slogan: COMPANY.slogan,
        description:
          "SAP danışmanlığında derin uzmanlık: SAP destek (AMS), S/4HANA dönüşümleri, global rollout ve 48+ hazır SAP çözümü.",
        email: COMPANY.email,
        telephone: COMPANY.telephone,
        sameAs: [COMPANY.linkedin],
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.streetAddress,
          addressLocality: COMPANY.addressLocality,
          addressRegion: COMPANY.addressRegion,
          addressCountry: COMPANY.addressCountry,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: COMPANY.telephone,
            email: COMPANY.email,
            contactType: "customer service",
            availableLanguage: ["Turkish", "English"],
          },
        ],
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
        name: COMPANY.name,
        url: SITE_URL + (locale === "en" ? "/en" : "/"),
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        publisher: { "@type": "Organization", name: COMPANY.name, url: SITE_URL, logo: SITE_URL + "/logo.png" },
      }}
    />
  );
}

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
        name: COMPANY.name,
        url: SITE_URL + ROUTES.home[locale],
        image: SITE_URL + "/logo.png",
        telephone: COMPANY.telephone,
        email: COMPANY.email,
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

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

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
        author: authorName ? { "@type": "Person", name: authorName } : { "@type": "Organization", name: COMPANY.name },
        publisher: {
          "@type": "Organization",
          name: COMPANY.name,
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
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
