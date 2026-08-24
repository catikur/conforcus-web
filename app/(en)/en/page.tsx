import HomePage from "@/components/pages/HomePage";
import { FaqJsonLd, ProfessionalServiceJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "en");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page() {
  return (
    <>
      <ProfessionalServiceJsonLd locale="en" />
      <FaqJsonLd locale="en" />
      <HomePage locale="en" />
    </>
  );
}
