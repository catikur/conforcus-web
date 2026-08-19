import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, legalParas } from "@/lib/legalPages";

export const metadata = pageMetadata("kvkk", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="kvkk" name="Privacy" />
      <LegalPage locale="en" crumbKey="kvkk" title={LEGAL.kvkk.h1.en} paras={legalParas(LEGAL.kvkk, "en")} />
    </>
  );
}
