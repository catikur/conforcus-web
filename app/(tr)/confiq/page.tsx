import ConfiqPage from "@/components/pages/ConfiqPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("confiq", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="confiq" name="Confiq" />
      <ConfiqPage locale="tr" />
    </>
  );
}
