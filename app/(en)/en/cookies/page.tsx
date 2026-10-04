import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ConsentReset } from "@/components/Analytics";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, cookieParas } from "@/lib/legalPages";
import { ANALYTICS_ON } from "@/lib/analytics";

export const metadata = pageMetadata("cerez", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="cerez" name="Cookies" />
      <LegalPage
        locale="en"
        crumbKey="cerez"
        title={LEGAL.cerez.h1.en}
        paras={cookieParas("en", ANALYTICS_ON)}
        extra={ANALYTICS_ON ? <ConsentReset locale="en" /> : undefined}
      />
    </>
  );
}
