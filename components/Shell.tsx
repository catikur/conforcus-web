import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import Reveals from "./Reveals";
import Toast from "./Toast";
import Sweep from "./Sweep";
import { OrganizationJsonLd, WebSiteJsonLd } from "./JsonLd";
import Analytics from "./Analytics";
import { GA_ID } from "@/lib/analytics";
import { pick, type Locale } from "@/lib/i18n";

// Her iki kök layout'un (TR/EN) paylaştığı gövde.
export default function Shell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd locale={locale} />

      <a className="skip" href="#main">
        {pick(locale, "İçeriğe geç", "Skip to content")}
      </a>

      <Nav locale={locale} />
      {children}
      <Footer locale={locale} />

      <Sweep />
      <Toast locale={locale} />
      <div id="tip" />
      <ScrollProgress />
      <Reveals locale={locale} />
      {GA_ID ? <Analytics gaId={GA_ID} locale={locale} /> : null}
    </>
  );
}
