import type { Metadata } from "next";
import ExpertisePage from "@/components/pages/ExpertisePage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { EXPERTISE } from "@/lib/expertise";

export const revalidate = 60;

export function generateMetadata(): Metadata {
  const { title, desc } = EXPERTISE.page;
  return pageMetadata("uzmanlik", "tr", { title: title.tr || undefined, description: desc.tr || undefined });
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="uzmanlik" name="Uzmanlık" />
      <ExpertisePage locale="tr" />
    </>
  );
}
