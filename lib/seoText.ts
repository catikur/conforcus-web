// Arama sonucu başlık ve açıklamaları — detay sayfaları için tek kalıp.
// Başlıkta marka + "SAP" + bağlam; açıklamada kısa metin yetersizse faydalarla tamamlanır.

import type { Locale } from "./i18n";

const MODULE_NAME: Record<string, { tr: string; en: string }> = {
  E: { tr: "E-Dönüşüm", en: "E-Transformation" },
};
const modName = (m: string, l: Locale) => MODULE_NAME[m]?.[l] || m;

const MAX_TITLE = 65;

/** "e-Fatura — SAP E-Dönüşüm Çözümü | Conforcus"; uzun adlarda ek kademeli kısalır. */
export function solutionTitle(name: string, module: string, l: Locale): string {
  const m = modName(module, l);
  const full = l === "tr" ? `${name} — SAP ${m} Çözümü | Conforcus` : `${name} — SAP ${m} Solution | Conforcus`;
  if (full.length <= MAX_TITLE) return full;
  const mid = `${name} — SAP ${m} | Conforcus`;
  if (mid.length <= MAX_TITLE) return mid;
  return `${name} | Conforcus`;
}

export function referenceTitle(name: string, hasCase: boolean, l: Locale): string {
  if (l === "tr") return hasCase ? `${name} — SAP Proje Vakası | Conforcus` : `${name} — SAP Referansı | Conforcus`;
  return hasCase ? `${name} — SAP Case Study | Conforcus` : `${name} — SAP Reference | Conforcus`;
}

function clamp(s: string, max = 158): string {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 60)).replace(/[\s,;:—-]+$/, "") + "…";
}

/** Kısa metin 110 karakterin altındaysa faydalarla 158'e kadar tamamlar. */
export function solutionDescription(short: string, benefits: string[] | undefined, module: string, l: Locale): string {
  let d = (short || "").trim();
  if (d && !/[.!?…]$/.test(d)) d += ".";
  for (const b of benefits || []) {
    if (d.length >= 110) break;
    const add = b.trim().replace(/[.;]+$/, "") + ".";
    if ((d + " " + add).length > 158) break;
    d = d ? `${d} ${add}` : add;
  }
  if (!d) d = l === "tr" ? `SAP ${modName(module, l)} çözümü — Conforcus.` : `SAP ${modName(module, l)} solution — Conforcus.`;
  return clamp(d);
}

export function referenceDescription(
  r: { name: string; blurb?: string; sector?: string; countries: string[] },
  l: Locale,
  countryName: (c: string) => string
): string {
  let d = (r.blurb || "").trim();
  if (!d) {
    d =
      l === "tr"
        ? `${r.name}, SAP yolculuğunda Conforcus ile çalışan referanslarımızdan.`
        : `${r.name} is one of the clients working with Conforcus on their SAP journey.`;
  }
  if (!/[.!?…]$/.test(d)) d += ".";
  if (d.length < 110 && r.sector) d += l === "tr" ? ` Sektör: ${r.sector}.` : ` Industry: ${r.sector}.`;
  if (d.length < 120 && r.countries.length > 1) {
    d += (l === "tr" ? " Ülkeler: " : " Countries: ") + r.countries.map(countryName).join(", ") + ".";
  }
  if (d.length < 120) d += l === "tr" ? " Conforcus SAP referansı." : " A Conforcus SAP reference.";
  return clamp(d);
}
