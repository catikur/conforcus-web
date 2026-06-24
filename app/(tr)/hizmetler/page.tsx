import HizmetlerPage from "@/components/pages/HizmetlerPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hizmetler", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="hizmetler" name="Hizmetler" />
      <HizmetlerPage locale="tr" />
    </>
  );
}
