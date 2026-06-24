import HomePage from "@/components/pages/HomePage";
import { ProfessionalServiceJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "en");

export default function Page() {
  return (
    <>
      <ProfessionalServiceJsonLd locale="en" />
      <HomePage locale="en" />
    </>
  );
}
