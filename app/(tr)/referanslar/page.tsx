import ReferanslarPage from "@/components/pages/ReferanslarPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("referanslar", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="referanslar" name="Referanslar" />
      <ReferanslarPage locale="tr" />
    </>
  );
}
