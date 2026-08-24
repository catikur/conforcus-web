// Canonical host + şirket iletişim sabitleri.
// Host asla hardcode edilmez: preview web.conforcus.com, cutover www.conforcus.com.

function normalizeSiteUrl(raw: string | undefined): string {
  const fallback = "https://web.conforcus.com";
  const v = (raw || fallback).trim().replace(/\/+$/, "");
  return v || fallback;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_IS_WWW = SITE_URL === "https://www.conforcus.com";

export const COMPANY = {
  name: "Conforcus",
  legalName: "Conforcus Bilişim Danışmanlık A.Ş.",
  slogan: "Deep Expertise. Smart Solutions. Lasting Trust.",
  email: "info@conforcus.com",
  hrEmail: "hr@conforcus.com",
  telephone: "+908502423772",
  telephoneDisplay: "+90 850 242 3772",
  telHref: "tel:+908502423772",
  linkedin: "https://www.linkedin.com/company/con4cus",
  streetAddress: "İçerenköy Mah. Yeşilvadi Sok. No:8, Öneren İş Merkezi Kat:3",
  addressLocality: "Ataşehir",
  addressRegion: "İstanbul",
  addressCountry: "TR",
  addressLine: "İçerenköy Mah. Yeşilvadi Sok. No:8, Öneren İş Merkezi Kat:3, Ataşehir / İstanbul",
} as const;

export const LOGO_SIZE = { width: 115, height: 120 } as const;
