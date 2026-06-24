import ReferanslarPage from "@/components/pages/ReferanslarPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("referanslar", "en");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="referanslar" name="References" />
      <ReferanslarPage locale="en" />
    </>
  );
}
