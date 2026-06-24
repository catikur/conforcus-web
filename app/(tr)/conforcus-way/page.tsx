import ConforcusWayPage from "@/components/pages/ConforcusWayPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("conforcus-way", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="conforcus-way" name="Conforcus Way" />
      <ConforcusWayPage locale="tr" />
    </>
  );
}
