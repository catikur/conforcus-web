import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, legalParas } from "@/lib/legalPages";

export const metadata = pageMetadata("cerez", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="cerez" name="Cookies" />
      <LegalPage locale="en" crumbKey="cerez" title={LEGAL.cerez.h1.en} paras={legalParas(LEGAL.cerez, "en")} />
    </>
  );
}
