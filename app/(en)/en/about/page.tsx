import AboutPage from "@/components/pages/AboutPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hakkimizda", "en");

export const revalidate = 60; // çözüm sayısı Sanity'den

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="hakkimizda" name="About" />
      <AboutPage locale="en" />
    </>
  );
}
