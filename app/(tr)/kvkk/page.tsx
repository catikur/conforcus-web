import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, legalParas } from "@/lib/legalPages";

export const metadata = pageMetadata("kvkk", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="kvkk" name="KVKK" />
      <LegalPage locale="tr" crumbKey="kvkk" title={LEGAL.kvkk.h1.tr} paras={legalParas(LEGAL.kvkk, "tr")} />
    </>
  );
}
