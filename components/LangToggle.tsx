"use client";

import { usePathname } from "next/navigation";
import { oppositePath, type Locale } from "@/lib/i18n";

// Dil anahtarı: bulunulan sayfanın karşı dildeki eşleniğine gider
// (prototip #langbtn yerine gerçek rota geçişi). JS olmadan da çalışır.
export default function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const { otherPath } = oppositePath(pathname);
  return (
    <a className="lang" id="langbtn" href={otherPath} aria-label="Dil / Language" hrefLang={locale === "tr" ? "en" : "tr"}>
      {locale === "tr" ? (
        <>
          <b>TR</b> | EN
        </>
      ) : (
        <>
          TR | <b>EN</b>
        </>
      )}
    </a>
  );
}
