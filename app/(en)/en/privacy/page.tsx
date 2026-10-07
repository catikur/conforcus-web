import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, kvkkParas } from "@/lib/legalPages";
import { ANALYTICS_ON } from "@/lib/analytics";

export const metadata = pageMetadata("kvkk", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="kvkk" name="Privacy" />
      <LegalPage locale="en" crumbKey="kvkk" title={LEGAL.kvkk.h1.en} paras={kvkkParas("en", ANALYTICS_ON)} />
    </>
  );
}
