import AboutPage from "@/components/pages/AboutPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hakkimizda", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="hakkimizda" name="About" />
      <AboutPage locale="en" />
    </>
  );
}
