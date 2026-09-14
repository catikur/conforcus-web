import ECozumlerPage from "@/components/pages/ECozumlerPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("e-cozumler", "tr");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="e-cozumler" name="E-Çözümler" />
      <ECozumlerPage locale="tr" />
    </>
  );
}
