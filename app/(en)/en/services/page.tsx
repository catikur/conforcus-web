import HizmetlerPage from "@/components/pages/HizmetlerPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hizmetler", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="hizmetler" name="Services" />
      <HizmetlerPage locale="en" />
    </>
  );
}
