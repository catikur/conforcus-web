// Ölçüm ve arama konsolu ayarları — hepsi ortam değişkeniyle açılır, boşken hiçbir şey yüklenmez.
// GA_MEASUREMENT_ID      : Google Analytics 4 ölçüm kimliği (G-XXXXXXXXXX)
// GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION : arama konsolu doğrulama meta değerleri
const id = (process.env.GA_MEASUREMENT_ID || "").trim();

export const GA_ID = /^G-[A-Z0-9]{4,}$/.test(id) ? id : "";
export const ANALYTICS_ON = Boolean(GA_ID);

export const SITE_VERIFICATION = {
  google: (process.env.GOOGLE_SITE_VERIFICATION || "").trim() || undefined,
  bing: (process.env.BING_SITE_VERIFICATION || "").trim() || undefined,
};

/** Kök layout'ların metadata.verification alanı (değer yoksa boş). */
export function verificationMeta() {
  const { google, bing } = SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return { ...(google ? { google } : {}), ...(bing ? { other: { "msvalidate.01": bing } } : {}) };
}
