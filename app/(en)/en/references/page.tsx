import ReferanslarPage from "@/components/pages/ReferanslarPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("referanslar", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="referanslar" name="References" />
      <ReferanslarPage locale="en" />
    </>
  );
}
