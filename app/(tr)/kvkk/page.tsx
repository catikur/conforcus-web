import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, kvkkParas } from "@/lib/legalPages";
import { ANALYTICS_ON } from "@/lib/analytics";

export const metadata = pageMetadata("kvkk", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="kvkk" name="KVKK" />
      <LegalPage locale="tr" crumbKey="kvkk" title={LEGAL.kvkk.h1.tr} paras={kvkkParas("tr", ANALYTICS_ON)} />
    </>
  );
}
