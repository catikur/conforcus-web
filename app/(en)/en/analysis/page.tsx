import AnalizPage from "@/components/pages/AnalizPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("analiz", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="analiz" name="Free SAP Analysis" />
      <AnalizPage locale="en" />
    </>
  );
}
