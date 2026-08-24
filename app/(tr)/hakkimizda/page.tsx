import AboutPage from "@/components/pages/AboutPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hakkimizda", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="hakkimizda" name="Hakkımızda" />
      <AboutPage locale="tr" />
    </>
  );
}
