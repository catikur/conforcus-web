// i18n çekirdeği — TR varsayılan (kök), EN `/en/...` çevrilmiş slug'larla.
// Tek dil DOM: sayfalar `pick(locale, tr, en)` ile tek dil render eder.

import type { ReactNode } from "react";

export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";

export const SITE_URL = "https://conforcus.com";

export type RouteKey =
  | "home"
  | "hizmetler"
  | "cozumler"
  | "confiq"
  | "referanslar"
  | "conforcus-way"
  | "blog"
  | "analiz";

type RouteMeta = {
  tr: string; // TR yolu
  en: string; // EN yolu (çevrilmiş slug)
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
};

// Tek kaynak: yollar + SEO başlık/açıklama (TR/EN). hreflang, sitemap, canonical,
// dil anahtarı ve aktif menü bundan beslenir.
export const ROUTES: Record<RouteKey, RouteMeta> = {
  home: {
    tr: "/",
    en: "/en",
    title: { tr: "Conforcus — SAP Danışmanlığında Güvenilir Ortak", en: "Conforcus — Your Trusted SAP Partner" },
    desc: {
      tr: "SAP danışmanlığında derin uzmanlık: SAP destek (AMS), S/4HANA dönüşümleri, global rollout ve 48+ hazır SAP çözümü. 130+ müşteri, 50+ ülke.",
      en: "Deep expertise in SAP consulting: SAP support (AMS), S/4HANA transformations, global rollout and 48+ ready-made SAP solutions. 130+ clients, 50+ countries.",
    },
  },
  hizmetler: {
    tr: "/hizmetler",
    en: "/en/services",
    title: { tr: "Hizmetler — Conforcus", en: "Services — Conforcus" },
    desc: {
      tr: "SAP destek hizmetleri (AMS), S/4HANA dönüşümleri, global rollout ve özel ürün & çözüm geliştirme — SAP yolculuğunuzun her adımında tek ekip.",
      en: "SAP support services (AMS), S/4HANA transformations, global rollout and custom product & solution development — one team at every step of your SAP journey.",
    },
  },
  cozumler: {
    tr: "/cozumler",
    en: "/en/solutions",
    title: { tr: "Çözüm Kataloğu — Conforcus", en: "Solution Catalog — Conforcus" },
    desc: {
      tr: "Sahada kanıtlanmış, kurulmaya hazır 48+ SAP çözümü: FI, CO, MM, SD, PS ve FM modüllerinde mutabakat, IFRS, ithalat, onay akışları ve daha fazlası.",
      en: "48+ field-proven, ready-to-deploy SAP solutions across FI, CO, MM, SD, PS and FM: reconciliation, IFRS, import, approval workflows and more.",
    },
  },
  confiq: {
    tr: "/confiq",
    en: "/en/confiq",
    title: { tr: "Confiq AI Ürün Ailesi — Conforcus", en: "Confiq AI Product Family — Conforcus" },
    desc: {
      tr: "Confiq: SAP uzmanlığımızın yazılıma dönüşmüş hali. SAP'a doğal dilde soru sorun (Decode), geleceği görün (Predict), modüller arası akışı otomatikleştirin.",
      en: "Confiq: our SAP expertise turned into software. Ask SAP in plain language (Decode), see the future (Predict), automate cross-module flows.",
    },
  },
  referanslar: {
    tr: "/referanslar",
    en: "/en/references",
    title: { tr: "Referanslar — Conforcus", en: "References — Conforcus" },
    desc: {
      tr: "130+ müşteri, 30+ sektör, 50+ ülke. Türkiye'nin ve dünyanın önde gelen markaları SAP yolculuklarında Conforcus'a güveniyor. Proje haritamızı keşfedin.",
      en: "130+ clients, 30+ industries, 50+ countries. Leading brands of Türkiye and the world trust Conforcus on their SAP journey. Explore our project map.",
    },
  },
  "conforcus-way": {
    tr: "/conforcus-way",
    en: "/en/conforcus-way",
    title: { tr: "Conforcus Way & Kariyer — Conforcus", en: "Conforcus Way & Careers — Conforcus" },
    desc: {
      tr: "Mutlu çalışan, mutlu müşteri. Conforcus Way kültürümüzün ve kariyer fırsatlarımızın adı — esnek yapı, sürekli gelişim, güven ve işbirliği.",
      en: "Happy employees, happy clients. Conforcus Way is the name of our culture and careers — flexible structure, continuous growth, trust and collaboration.",
    },
  },
  blog: {
    tr: "/blog",
    en: "/en/blog",
    title: { tr: "Blog — Conforcus", en: "Blog — Conforcus" },
    desc: {
      tr: "SAP dünyasından güncel gelişmeler, mevzuat değişiklikleri ve ekibimizin saha deneyimleri — S/4HANA, global rollout ve kurumsal yapay zekâ üzerine içgörüler.",
      en: "Updates from the SAP world, regulatory changes and field experience — insights on S/4HANA, global rollout and enterprise AI.",
    },
  },
  analiz: {
    tr: "/analiz",
    en: "/en/analysis",
    title: { tr: "Ücretsiz SAP Analizi — Conforcus", en: "Free SAP Analysis — Conforcus" },
    desc: {
      tr: "5 dakikalık ücretsiz değerlendirmeyle SAP sisteminizin verimlilik ve risk haritasını çıkarın. Confiq Scan altyapısıyla, uzman yorumuyla 48 saatte rapor.",
      en: "Map your SAP system's efficiency and risks with a free 5-minute assessment. Powered by Confiq Scan, with expert commentary delivered in 48 hours.",
    },
  },
};

// locale'e göre değer seç (tek dil render).
export function pick<T>(locale: Locale, tr: T, en: T): T {
  return locale === "tr" ? tr : en;
}

// İki dilli düz metin alanları için kısayol.
export type Bi = { tr: string; en: string };
export function t(locale: Locale, v: Bi): string {
  return v[locale];
}

export function pathFor(key: RouteKey, locale: Locale): string {
  return ROUTES[key][locale];
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export function keyFromPath(pathname: string): RouteKey {
  const keys = Object.keys(ROUTES) as RouteKey[];
  // En uzun eşleşen yolu seç (kök "/" en sona kalsın diye uzunluğa göre)
  let best: RouteKey = "home";
  let bestLen = -1;
  for (const k of keys) {
    for (const loc of LOCALES) {
      const p = ROUTES[k][loc];
      if ((pathname === p || pathname === p + "/") && p.length > bestLen) {
        best = k;
        bestLen = p.length;
      }
    }
  }
  return best;
}

// Dil anahtarı / hreflang için karşı dildeki eşlenik yol.
export function oppositePath(pathname: string): { locale: Locale; otherLocale: Locale; otherPath: string; key: RouteKey } {
  const key = keyFromPath(pathname);
  const locale = localeFromPath(pathname);
  const otherLocale: Locale = locale === "tr" ? "en" : "tr";
  return { locale, otherLocale, otherPath: ROUTES[key][otherLocale], key };
}

// Bir sayfanın canonical + hreflang alternatif haritası (Metadata.alternates).
export function alternatesFor(key: RouteKey, locale: Locale) {
  return {
    canonical: SITE_URL + ROUTES[key][locale],
    languages: {
      tr: SITE_URL + ROUTES[key].tr,
      en: SITE_URL + ROUTES[key].en,
      "x-default": SITE_URL + ROUTES[key].tr,
    } as Record<string, string>,
  };
}

export type Node = ReactNode;
