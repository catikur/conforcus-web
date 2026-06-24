// Navigasyon içeriği — tek kaynak. Hem masaüstü mega-menü (Nav.tsx) hem mobil
// menü (MobileMenu.tsx) bundan üretilir. Yollar RouteKey üzerinden locale'e göre
// çözülür (lib/i18n.ts → pathFor).

import type { RouteKey } from "./i18n";

export type MegaLink = {
  key?: RouteKey; // iç rota
  query?: string; // ör. "?m=FI"
  href?: string; // dış bağlantı (mailto:) — key yerine geçer
  tr: string;
  en: string;
  note?: string; // ör. "· 17" (dilden bağımsız, italik)
  pill?: { tr: string; en: string };
  sub_tr?: string;
  sub_en?: string;
};

export type NavSection = {
  key: RouteKey; // üst rota + aktif durum
  tr: string;
  en: string;
  eyebrow_tr: string;
  eyebrow_en: string;
  desc_tr: string;
  desc_en: string;
  cta_tr: string;
  cta_en: string;
  cols3?: boolean;
  links: MegaLink[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    key: "hizmetler",
    tr: "Hizmetler",
    en: "Services",
    eyebrow_tr: "Hizmetlerimiz",
    eyebrow_en: "Our Services",
    desc_tr: "Kurulumdan sürekli desteğe — SAP yolculuğunuzun her adımında tek ekip.",
    desc_en: "From implementation to ongoing support — one team at every step of your SAP journey.",
    cta_tr: "Tüm hizmetler →",
    cta_en: "All services →",
    links: [
      { key: "hizmetler", tr: "SAP Destek Hizmetleri", en: "SAP Support Services", sub_tr: "SLA garantili sürekli destek ve bakım", sub_en: "SLA-backed ongoing support & maintenance" },
      { key: "hizmetler", tr: "S/4HANA Dönüşümleri", en: "S/4HANA Transformations", sub_tr: "Greenfield, brownfield, bulut ve on-premise", sub_en: "Greenfield, brownfield, cloud & on-premise" },
      { key: "hizmetler", tr: "Global Rollout", en: "Global Rollout", sub_tr: "6 kıtada, 50+ ülkede şablon yaygınlaştırma", sub_en: "Template deployment across 50+ countries" },
      { key: "hizmetler", tr: "Ürün & Çözüm Geliştirme", en: "Product & Solution Development", sub_tr: "ABAP, Fiori ve bulutla özel geliştirme", sub_en: "Custom builds with ABAP, Fiori & cloud" },
    ],
  },
  {
    key: "cozumler",
    tr: "Çözümler",
    en: "Solutions",
    eyebrow_tr: "Çözüm Kataloğu",
    eyebrow_en: "Solution Catalog",
    desc_tr: "Sahada kanıtlanmış, kurulmaya hazır 48+ SAP çözümü. Modül seçerek filtrelenmiş kataloğa gidin.",
    desc_en: "48+ field-proven, ready-to-deploy SAP solutions. Pick a module to open the filtered catalog.",
    cta_tr: "Tüm katalog →",
    cta_en: "Full catalog →",
    cols3: true,
    links: [
      { key: "cozumler", query: "?m=FI", tr: "FI", en: "FI", note: "· 17", sub_tr: "Finansal Muhasebe", sub_en: "Financial Accounting" },
      { key: "cozumler", query: "?m=CO", tr: "CO", en: "CO", note: "· 7", sub_tr: "Maliyet Muhasebesi", sub_en: "Controlling" },
      { key: "cozumler", query: "?m=MM", tr: "MM", en: "MM", note: "· 12", sub_tr: "Malzeme Yönetimi", sub_en: "Materials Management" },
      { key: "cozumler", query: "?m=SD", tr: "SD", en: "SD", note: "· 9", sub_tr: "Satış ve Dağıtım", sub_en: "Sales & Distribution" },
      { key: "cozumler", query: "?m=PS", tr: "PS", en: "PS", note: "· 2", sub_tr: "Proje Sistemi", sub_en: "Project Systems" },
      { key: "cozumler", query: "?m=FM", tr: "FM", en: "FM", note: "· 1", sub_tr: "Bütçe Yönetimi", sub_en: "Funds Management" },
    ],
  },
  {
    key: "confiq",
    tr: "Confiq",
    en: "Confiq",
    eyebrow_tr: "Yapay Zekâ Ürün Ailesi",
    eyebrow_en: "AI Product Family",
    desc_tr: "SAP uzmanlığımızın yazılıma dönüşmüş hali — beş üründen oluşan yapay zekâ ailesi.",
    desc_en: "Our SAP expertise turned into software — a family of five AI products.",
    cta_tr: "Confiq'i keşfedin →",
    cta_en: "Discover Confiq →",
    links: [
      { key: "confiq", tr: "Confiq Decode", en: "Confiq Decode", sub_tr: "SAP'a doğal dilde soru sorun", sub_en: "Ask SAP in plain language" },
      { key: "confiq", tr: "Confiq Predict", en: "Confiq Predict", sub_tr: "Finansal göstergelerde 3-6 ay öngörü", sub_en: "3-6 months of financial foresight" },
      { key: "confiq", tr: "Confiq Cortex", en: "Confiq Cortex", sub_tr: "Soru ve öngörüyü birleştiren karar zekâsı", sub_en: "Decision intelligence uniting both" },
      { key: "confiq", tr: "Confiq Bridge", en: "Confiq Bridge", sub_tr: "Modüller arası akıllı veri akışı", sub_en: "Smart cross-module data flow" },
      { key: "analiz", tr: "Confiq Scan", en: "Confiq Scan", pill: { tr: "ÜCRETSİZ", en: "FREE" }, sub_tr: "48 saatte sistem risk haritanız", sub_en: "Your system risk map in 48 hours" },
    ],
  },
  {
    key: "referanslar",
    tr: "Referanslar",
    en: "References",
    eyebrow_tr: "Referanslarımız",
    eyebrow_en: "Our References",
    desc_tr: "Müşterilerimizin %95'i bizimle çalışmaya devam ediyor.",
    desc_en: "95% of our clients continue working with us.",
    cta_tr: "Tüm referanslar →",
    cta_en: "All references →",
    cols3: true,
    links: [
      { key: "referanslar", tr: "Proje Haritası", en: "Project Map", sub_tr: "6 kıta, 50+ ülke", sub_en: "6 continents, 50+ countries" },
      { key: "referanslar", tr: "Markalar", en: "Brands", sub_tr: "130+ aktif müşteri", sub_en: "130+ active clients" },
      { key: "referanslar", tr: "Sektörler", en: "Industries", sub_tr: "30+ sektörde deneyim", sub_en: "Experience across 30+ industries" },
    ],
  },
  {
    key: "conforcus-way",
    tr: "Conforcus Way",
    en: "Conforcus Way",
    eyebrow_tr: "Conforcus Way",
    eyebrow_en: "Conforcus Way",
    desc_tr: "Mutlu çalışan, mutlu müşteri — işimizi yapma biçimimizin adı.",
    desc_en: "Happy employees, happy clients — the name of how we work.",
    cta_tr: "Kültürümüzü tanıyın →",
    cta_en: "Get to know our culture →",
    links: [
      { key: "conforcus-way", tr: "Kültürümüz", en: "Our Culture", sub_tr: "Bizi biz yapan dört ilke", sub_en: "The four principles that define us" },
      { key: "conforcus-way", tr: "Conforcus Prime", en: "Conforcus Prime", sub_tr: "Genç danışman ve mentorluk programı", sub_en: "Young consultant & mentoring program" },
      { key: "conforcus-way", tr: "Kariyer", en: "Careers", sub_tr: "Açık pozisyonlar ve başvuru", sub_en: "Open positions & applications" },
      { href: "mailto:info@conforcus.com", tr: "Genel Başvuru", en: "General Application", sub_tr: "CV'nizi her zaman bekliyoruz", sub_en: "We always welcome your CV" },
    ],
  },
  {
    key: "blog",
    tr: "Blog",
    en: "Blog",
    eyebrow_tr: "İçgörüler",
    eyebrow_en: "Insights",
    desc_tr: "SAP dünyasından gelişmeler, mevzuat ve saha deneyimleri.",
    desc_en: "SAP updates, regulation and field experience.",
    cta_tr: "Tüm yazılar →",
    cta_en: "All posts →",
    cols3: true,
    links: [
      { key: "blog", tr: "S/4HANA'ya geçişte 5 kritik karar", en: "5 critical decisions in S/4HANA migration", sub_tr: "5 dk okuma", sub_en: "5 min read" },
      { key: "blog", tr: "Global rollout'ta lokalizasyon", en: "Localization in global rollouts", sub_tr: "7 dk okuma", sub_en: "7 min read" },
      { key: "blog", tr: "SAP verinizle konuşmak", en: "Talking to your SAP data", sub_tr: "6 dk okuma", sub_en: "6 min read" },
    ],
  },
];
