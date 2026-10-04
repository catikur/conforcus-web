import SectorsPage from "@/components/pages/SectorsPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("sektorler", "en");

export const revalidate = 60; // referans sayıları Sanity'den gelir

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="sektorler" name="Industries" />
      <SectorsPage locale="en" />
    </>
  );
}
