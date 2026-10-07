// Ölçüm ve arama konsolu ayarları — hepsi ortam değişkeniyle açılır, boşken hiçbir şey yüklenmez.
// PLAUSIBLE_DOMAIN        : Plausible'da tanımlı site adı (ör. conforcus.com). Doluysa çerezsiz ziyaret ölçümü açılır.
// GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION : arama konsolu doğrulama meta değerleri
const domain = (process.env.PLAUSIBLE_DOMAIN || "").trim().toLowerCase();

export const PLAUSIBLE_DOMAIN = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain) ? domain : "";
export const ANALYTICS_ON = Boolean(PLAUSIBLE_DOMAIN);
/** Olayların gönderildiği aynı-kaynak uç; app/olcum/event/route.ts Plausible'a iletir. */
export const PLAUSIBLE_ENDPOINT = "/olcum/event";

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
