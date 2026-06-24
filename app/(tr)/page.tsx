import HomePage from "@/components/pages/HomePage";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "tr");

export default function Page() {
  return (
    <>
      <ProfessionalServiceJsonLd locale="tr" />
      <HomePage locale="tr" />
    </>
  );
}
