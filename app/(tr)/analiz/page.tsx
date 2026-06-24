import AnalizPage from "@/components/pages/AnalizPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("analiz", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="analiz" name="Ücretsiz SAP Analizi" />
      <AnalizPage locale="tr" />
    </>
  );
}
