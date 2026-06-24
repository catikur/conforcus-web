import ConfiqPage from "@/components/pages/ConfiqPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("confiq", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="confiq" name="Confiq" />
      <ConfiqPage locale="en" />
    </>
  );
}
