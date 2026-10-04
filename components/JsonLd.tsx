import { COMPANY, SITE_URL } from "@/lib/site";
import { ROUTES, type Locale, type RouteKey } from "@/lib/i18n";

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Şirketin makine tarafından okunur uzmanlık alanları — sitede karşılığı olan konularla sınırlı.
const ORG_KNOWS_ABOUT = [
  "SAP S/4HANA",
  "SAP ECC",
  "SAP Application Management Services (AMS)",
  "SAP S/4HANA conversion (greenfield, brownfield, bluefield)",
  "SAP global rollout and localization",
  "SAP FI (Financial Accounting)",
  "SAP CO (Controlling)",
  "SAP PS (Project System)",
  "SAP FM (Funds Management)",
  "SAP TRM (Treasury and Risk Management)",
  "SAP Cash Management",
  "SAP MM (Materials Management)",
  "SAP SD (Sales and Distribution)",
  "ABAP",
  "SAP Fiori",
  "SAP BTP",
  "Inflation accounting in SAP (IAS 29 / TMS 29)",
  "IFRS 16 in SAP",
  "Turkish e-transformation in SAP (e-Fatura, e-Arşiv, e-İrsaliye, e-Defter)",
  "AI for SAP data (natural-language query, forecasting)",
];

export function OrganizationJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": SITE_URL + "/#organization",
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: SITE_URL,
        logo: SITE_URL + "/logo.png",
        slogan: COMPANY.slogan,
        description:
          "SAP danışmanlığında derin uzmanlık: SAP destek (AMS), S/4HANA dönüşümleri, global rollout ve 55+ hazır SAP çözümü. 2015'te İstanbul'da kuruldu; finans modüllerinde (FI, CO, PS, FM, TRM) butik uzmanlık.",
        foundingDate: "2015",
        foundingLocation: { "@type": "Place", name: "İstanbul, Türkiye" },
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 70 },
        areaServed: "Worldwide",
        knowsLanguage: ["tr", "en"],
        knowsAbout: ORG_KNOWS_ABOUT,
        brand: { "@type": "Brand", name: "Confiq", description: "SAP için yapay zekâ ürün ailesi / AI product family for SAP" },
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

/* Çözüm detayı — Service şeması: sağlayıcı, kapsam ve hedef kitle. Arama motorlarına ve
   yapay zekâ asistanlarına "bu bir SAP çözümü, Conforcus sunuyor" bilgisini makine diliyle verir. */
export function SolutionJsonLd({
  locale,
  name,
  slug,
  module,
  description,
  audience,
}: {
  locale: Locale;
  name: string;
  slug: string;
  module: string;
  description?: string;
  audience?: string;
}) {
  const url = `${SITE_URL}${ROUTES.cozumler[locale]}/${slug}`;
  const mod = module === "E" ? (locale === "tr" ? "E-Dönüşüm" : "E-Transformation") : module;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        ...(description ? { description } : {}),
        serviceType: locale === "tr" ? `SAP ${mod} çözümü` : `SAP ${mod} solution`,
        category: `SAP ${mod}`,
        url,
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        areaServed: "Worldwide",
        provider: { "@type": "Organization", name: COMPANY.name, url: SITE_URL, logo: SITE_URL + "/logo.png" },
        ...(audience ? { audience: { "@type": "BusinessAudience", audienceType: audience } } : {}),
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


/* Ekip — her üye için Person şeması. Uzmanlık sinyali (E-E-A-T) hem Google hem
   yapay zekâ motorları için değerli: "kim söylüyor" sorusunun makine cevabı. */
export function TeamJsonLd({ team }: { team: { name: string; role: string; bio?: string; photoUrl?: string; linkedin?: string; expertise: string[] }[] }) {
  if (!team.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: team.map((m, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
            ...(m.bio ? { description: m.bio } : {}),
            ...(m.photoUrl ? { image: m.photoUrl } : {}),
            ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
            ...(m.expertise.length ? { knowsAbout: m.expertise } : {}),
            worksFor: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
          },
        })),
      }}
    />
  );
}

/* Vaka sayfası — Article + about:Organization. Yapay zekâ motorları için vaka
   içeriği en değerli alıntı malzemesi; şemasız kalması kayıptı. */
export function CaseArticleJsonLd({
  locale,
  name,
  slug,
  blurb,
  sector,
  imageUrl,
}: {
  locale: Locale;
  name: string;
  slug: string;
  blurb?: string;
  sector?: string;
  imageUrl?: string;
}) {
  const base = SITE_URL + ROUTES.referanslar[locale];
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: locale === "tr" ? `${name} — SAP vaka çalışması` : `${name} — SAP case study`,
        ...(blurb ? { description: blurb } : {}),
        ...(imageUrl ? { image: imageUrl } : {}),
        inLanguage: locale === "tr" ? "tr-TR" : "en-US",
        mainEntityOfPage: `${base}/${slug}`,
        about: { "@type": "Organization", name, ...(sector ? { industry: sector } : {}) },
        author: { "@type": "Organization", name: COMPANY.name, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: COMPANY.name,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        },
      }}
    />
  );
}
