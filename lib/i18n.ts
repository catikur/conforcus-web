// i18n çekirdeği — TR varsayılan (kök), EN `/en/...` çevrilmiş slug'larla.
// Tek dil DOM: sayfalar `pick(locale, tr, en)` ile tek dil render eder.

import type { ReactNode } from "react";
import { SITE_URL } from "./site";

export { SITE_URL } from "./site";

export const LOCALES = ["tr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";

export type RouteKey =
  | "home"
  | "hizmetler"
  | "cozumler"
  | "confiq"
  | "referanslar"
  | "conforcus-way"
  | "blog"
  | "analiz"
  | "ekip"
  | "hakkimizda"
  | "iletisim"
  | "kvkk"
  | "gizlilik"
  | "cerez"
  | "hizmet-sap-ams"
  | "hizmet-s4hana"
  | "hizmet-rollout"
  | "hizmet-urun";

export const NAV_HUBS: RouteKey[] = ["hizmetler", "cozumler", "confiq", "referanslar", "conforcus-way", "blog"];

type RouteMeta = {
  tr: string;
  en: string;
  title: { tr: string; en: string };
  desc: { tr: string; en: string };
  /** false: EN path is a language-switch fallback, not a unique sitemap URL (gizlilik). */
  enInSitemap?: boolean;
};

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
  ekip: {
    tr: "/ekip",
    en: "/en/team",
    title: { tr: "Ekibimiz — Conforcus", en: "Our Team — Conforcus" },
    desc: {
      tr: "SAP danışmanlarımız: FI, CO, MM, SD, PS ve FM modüllerinde saha deneyimi. Projelerinizde birlikte çalışacağınız ekip.",
      en: "Our SAP consultants: field experience across FI, CO, MM, SD, PS and FM. The team you will actually work with.",
    },
  },
  hakkimizda: {
    tr: "/hakkimizda",
    en: "/en/about",
    title: { tr: "Hakkımızda — Conforcus", en: "About Us — Conforcus" },
    desc: {
      tr: "Conforcus Bilişim Danışmanlık A.Ş.: SAP destek (AMS), S/4HANA, global rollout ve ürün geliştirme. Merkez Ataşehir / İstanbul.",
      en: "Conforcus Bilişim Danışmanlık A.Ş.: SAP support (AMS), S/4HANA, global rollout and product development. Headquarters in Ataşehir, Istanbul.",
    },
  },
  iletisim: {
    tr: "/iletisim",
    en: "/en/contact",
    title: { tr: "İletişim — Conforcus", en: "Contact — Conforcus" },
    desc: {
      tr: "Conforcus ile iletişime geçin: info@conforcus.com, hr@conforcus.com, +90 850 242 3772. Ataşehir / İstanbul.",
      en: "Contact Conforcus: info@conforcus.com, hr@conforcus.com, +90 850 242 3772. Ataşehir, Istanbul.",
    },
  },
  kvkk: {
    tr: "/kvkk",
    en: "/en/privacy",
    title: { tr: "KVKK Aydınlatma Metni — Conforcus", en: "Privacy Notice — Conforcus" },
    desc: {
      tr: "Conforcus Bilişim Danışmanlık A.Ş. kişisel verilerin korunması aydınlatma metni. Kısa, dürüst bir iskelet; hukuki tavsiye değildir.",
      en: "Conforcus Bilişim Danışmanlık A.Ş. privacy notice. A short, honest outline — not legal advice.",
    },
  },
  gizlilik: {
    tr: "/gizlilik",
    en: "/en/privacy",
    title: { tr: "Gizlilik Politikası — Conforcus", en: "Privacy Policy — Conforcus" },
    desc: {
      tr: "Conforcus web sitesi gizlilik politikası: hangi verileri neden işlediğimiz ve nasıl ulaşabileceğiniz.",
      en: "Conforcus website privacy policy: what we process, why, and how to reach us.",
    },
    enInSitemap: false,
  },
  cerez: {
    tr: "/cerez",
    en: "/en/cookies",
    title: { tr: "Çerez Politikası — Conforcus", en: "Cookie Policy — Conforcus" },
    desc: {
      tr: "Conforcus sitesinde kullanılan çerezler, amaçları ve tercihlerinizi nasıl yönetebileceğiniz.",
      en: "Cookies used on the Conforcus site, why they are there, and how you can manage them.",
    },
  },
  "hizmet-sap-ams": {
    tr: "/hizmetler/sap-destek-ams",
    en: "/en/services/sap-ams",
    title: { tr: "SAP Destek Hizmetleri (AMS) — Conforcus", en: "SAP Support Services (AMS) — Conforcus" },
    desc: {
      tr: "Canlı SAP için SLA'lı AMS: hata çözümü, dönem sonu, mevzuat uyarlaması ve sürekli iyileştirme. 130+ şirketin yanında duran destek modeli.",
      en: "SLA-backed AMS for live SAP: incident resolution, period-close, regulatory adaptation and continuous improvement — support as partnership.",
    },
  },
  "hizmet-s4hana": {
    tr: "/hizmetler/s4hana-donusum",
    en: "/en/services/s4hana-transformation",
    title: { tr: "S/4HANA Dönüşümleri — Conforcus", en: "S/4HANA Transformations — Conforcus" },
    desc: {
      tr: "Greenfield, brownfield ve bluefield S/4HANA dönüşümleri; finans derinliği, Türkiye lokalizasyonu, hypercare. RISE, GROW veya on-premise.",
      en: "Greenfield, brownfield and bluefield S/4HANA transformations with finance depth, local compliance and hypercare — RISE, GROW or on-premise.",
    },
  },
  "hizmet-rollout": {
    tr: "/hizmetler/global-rollout",
    en: "/en/services/global-rollout",
    title: { tr: "Global Rollout — Conforcus", en: "Global Rollout — Conforcus" },
    desc: {
      tr: "Kurumsal SAP şablonunu ülke ülke yayın: lokalizasyon, IFRS, çok dilli ekip, eşzamanlı go-live. 6 kıta, 50+ ülke deneyimi.",
      en: "Deploy your corporate SAP template country by country: localization, IFRS, multilingual teams, simultaneous go-lives. 6 continents, 50+ countries.",
    },
  },
  "hizmet-urun": {
    tr: "/hizmetler/urun-gelistirme",
    en: "/en/services/product-development",
    title: { tr: "Ürün & Çözüm Geliştirme — Conforcus", en: "Product & Solution Development — Conforcus" },
    desc: {
      tr: "ABAP, Fiori ve BTP ile özel geliştirme; 48+ hazır SAP çözümü. FS → TS → CR kalite zinciri, e-dönüşüm ve onay akışları.",
      en: "Custom development with ABAP, Fiori and BTP plus 48+ ready SAP packages. FS → TS → CR quality chain, e-invoicing and approval flows.",
    },
  },
};

export function pick<T>(locale: Locale, tr: T, en: T): T {
  return locale === "tr" ? tr : en;
}

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

function pathMatches(pathname: string, p: string): boolean {
  return pathname === p || pathname === p + "/";
}

export function keyFromPath(pathname: string): RouteKey {
  const keys = Object.keys(ROUTES) as RouteKey[];
  const score = (k: RouteKey, p: string, exact: boolean) =>
    p.length * 10 + (exact ? 5 : 0) + (ROUTES[k].enInSitemap === false ? 0 : 1);

  let best: RouteKey = "home";
  let bestScore = -1;
  let exactHit = false;
  for (const k of keys) {
    for (const loc of LOCALES) {
      const p = ROUTES[k][loc];
      if (pathMatches(pathname, p)) {
        const s = score(k, p, true);
        if (s > bestScore) {
          best = k;
          bestScore = s;
          exactHit = true;
        }
      }
    }
  }
  if (exactHit) return best;

  best = "home";
  bestScore = -1;
  for (const k of keys) {
    for (const loc of LOCALES) {
      const p = ROUTES[k][loc];
      if (p !== "/" && pathname.startsWith(p + "/")) {
        const s = score(k, p, false);
        if (s > bestScore) {
          best = k;
          bestScore = s;
        }
      }
    }
  }
  return best;
}

export function navKeyFromPath(pathname: string): RouteKey {
  const key = keyFromPath(pathname);
  if (key.startsWith("hizmet-")) return "hizmetler";
  return key;
}

export function oppositePath(pathname: string): { locale: Locale; otherLocale: Locale; otherPath: string; key: RouteKey } {
  const locale = localeFromPath(pathname);
  const otherLocale: Locale = locale === "tr" ? "en" : "tr";
  const keys = Object.keys(ROUTES) as RouteKey[];

  for (const k of keys) {
    if (pathMatches(pathname, ROUTES[k][locale])) {
      return { locale, otherLocale, otherPath: ROUTES[k][otherLocale], key: k };
    }
  }

  let best: RouteKey | null = null;
  let bestLen = -1;
  for (const k of keys) {
    const p = ROUTES[k][locale];
    if (p !== "/" && pathname.startsWith(p + "/") && p.length > bestLen) {
      best = k;
      bestLen = p.length;
    }
  }
  if (best) {
    const rest = pathname.slice(ROUTES[best][locale].length);
    return { locale, otherLocale, otherPath: ROUTES[best][otherLocale] + rest, key: best };
  }

  const key = keyFromPath(pathname);
  return { locale, otherLocale, otherPath: ROUTES[key][otherLocale], key };
}

export function absUrl(path: string): string {
  if (!path || path === "/") return SITE_URL + "/";
  return SITE_URL + path;
}

export function alternatesFor(key: RouteKey, locale: Locale) {
  const r = ROUTES[key];
  return {
    canonical: absUrl(r[locale]),
    languages: {
      tr: absUrl(r.tr),
      en: absUrl(r.en),
      "x-default": absUrl(r.tr),
    } as Record<string, string>,
  };
}

export function alternatesForPath(locale: Locale, trPath: string, enPath: string) {
  const path = locale === "tr" ? trPath : enPath;
  return {
    canonical: absUrl(path),
    languages: {
      tr: absUrl(trPath),
      en: absUrl(enPath),
      "x-default": absUrl(trPath),
    } as Record<string, string>,
  };
}

export type Node = ReactNode;
