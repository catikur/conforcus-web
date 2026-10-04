// Sektör sayfası slug eşlemesi (TR ↔ EN). İstemci tarafında da kullanıldığı için
// (dil değiştirici) içerik dosyasından ayrı, küçük bir sabit olarak tutulur.
export const SECTOR_SLUGS: { key: string; tr: string; en: string }[] = [
  { key: "uretim", tr: "uretim-imalat", en: "manufacturing" },
  { key: "otomotiv", tr: "otomotiv", en: "automotive" },
  { key: "kimya-fmcg", tr: "kimya-fmcg-ilac", en: "chemicals-fmcg-pharma" },
  { key: "enerji", tr: "enerji-petrol-gaz", en: "energy-oil-gas" },
  { key: "insaat-holding", tr: "insaat-holding", en: "construction-holdings" },
  { key: "perakende", tr: "perakende", en: "retail" },
  { key: "savunma", tr: "savunma", en: "defense" },
];
