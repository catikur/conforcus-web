import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { LEGAL, legalParas } from "@/lib/legalPages";

export const metadata = pageMetadata("gizlilik", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="gizlilik" name="Gizlilik" />
      <LegalPage locale="tr" crumbKey="gizlilik" title={LEGAL.gizlilik.h1.tr} paras={legalParas(LEGAL.gizlilik, "tr")} />
    </>
  );
}
