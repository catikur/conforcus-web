import type { Metadata } from "next";
import ExpertisePage from "@/components/pages/ExpertisePage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { EXPERTISE } from "@/lib/expertise";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  const { title, desc } = EXPERTISE.page;
  return pageMetadata("uzmanlik", "en", { title: title.en || undefined, description: desc.en || undefined });
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="uzmanlik" name="Expertise" />
      <ExpertisePage locale="en" />
    </>
  );
}
