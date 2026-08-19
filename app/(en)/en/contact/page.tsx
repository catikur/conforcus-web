import ContactPage from "@/components/pages/ContactPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("iletisim", "en");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="iletisim" name="Contact" />
      <ContactPage locale="en" />
    </>
  );
}
