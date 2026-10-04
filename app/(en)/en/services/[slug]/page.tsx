import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_SLUG_EN, serviceByKey } from "@/lib/servicePages";
import type { RouteKey } from "@/lib/i18n";
import { SERVICE_EXTRAS } from "@/lib/serviceExtras";
import { getReferences } from "@/lib/references";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(SERVICE_SLUG_EN).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const key = SERVICE_SLUG_EN[(await params).slug];
  if (!key) return { title: "Services — Conforcus" };
  return pageMetadata(key, "en");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const key = SERVICE_SLUG_EN[(await params).slug] as RouteKey | undefined;
  const page = key ? serviceByKey(key) : undefined;
  if (!page) notFound();
  const caseSlugs = SERVICE_EXTRAS[page.key]?.caseSlugs || [];
  const cases = caseSlugs.length ? (await getReferences("en")).filter((r) => caseSlugs.includes(r.slug) && r.hasBody) : [];
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey={page.key} name={page.h1.en} />
      <ServiceDetailPage locale="en" page={page} cases={cases} />
    </>
  );
}
