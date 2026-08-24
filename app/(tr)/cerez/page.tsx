import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, legalParas } from "@/lib/legalPages";

export const metadata = pageMetadata("cerez", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="cerez" name="Çerez" />
      <LegalPage locale="tr" crumbKey="cerez" title={LEGAL.cerez.h1.tr} paras={legalParas(LEGAL.cerez, "tr")} />
    </>
  );
}
