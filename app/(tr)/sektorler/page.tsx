import SectorsPage from "@/components/pages/SectorsPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("sektorler", "tr");

export const revalidate = 60; // referans sayıları Sanity'den gelir

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="sektorler" name="Sektörler" />
      <SectorsPage locale="tr" />
    </>
  );
}
