import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { MeasurementToggle } from "@/components/Analytics";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, cookieParas } from "@/lib/legalPages";
import { ANALYTICS_ON } from "@/lib/analytics";

export const metadata = pageMetadata("cerez", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="cerez" name="Çerez" />
      <LegalPage
        locale="tr"
        crumbKey="cerez"
        title={LEGAL.cerez.h1.tr}
        paras={cookieParas("tr", ANALYTICS_ON)}
        extra={ANALYTICS_ON ? <MeasurementToggle locale="tr" /> : undefined}
      />
    </>
  );
}
