import HomePage from "@/components/pages/HomePage";
import { FaqJsonLd, ProfessionalServiceJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { faqForJsonLd } from "@/lib/faq";

export const metadata = pageMetadata("home", "tr");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page() {
  return (
    <>
      <ProfessionalServiceJsonLd locale="tr" />
      <FaqJsonLd faqs={faqForJsonLd("tr")} />
      <HomePage locale="tr" />
    </>
  );
}
