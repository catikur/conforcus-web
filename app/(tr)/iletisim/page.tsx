import ContactPage from "@/components/pages/ContactPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("iletisim", "tr");

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="iletisim" name="İletişim" />
      <ContactPage locale="tr" />
    </>
  );
}
