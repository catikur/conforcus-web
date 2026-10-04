import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_SLUG_TR, serviceByKey } from "@/lib/servicePages";
import type { RouteKey } from "@/lib/i18n";
import { SERVICE_EXTRAS } from "@/lib/serviceExtras";
import { getReferences } from "@/lib/references";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(SERVICE_SLUG_TR).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const key = SERVICE_SLUG_TR[params.slug];
  if (!key) return { title: "Hizmetler — Conforcus" };
  return pageMetadata(key, "tr");
}

export default async function Page({ params }: { params: { slug: string } }) {
  const key = SERVICE_SLUG_TR[params.slug] as RouteKey | undefined;
  const page = key ? serviceByKey(key) : undefined;
  if (!page) notFound();
  const caseSlugs = SERVICE_EXTRAS[page.key]?.caseSlugs || [];
  const cases = caseSlugs.length ? (await getReferences("tr")).filter((r) => caseSlugs.includes(r.slug) && r.hasBody) : [];
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey={page.key} name={page.h1.tr} />
      <ServiceDetailPage locale="tr" page={page} cases={cases} />
    </>
  );
}
