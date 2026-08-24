import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_SLUG_TR, serviceByKey } from "@/lib/servicePages";
import type { RouteKey } from "@/lib/i18n";

export function generateStaticParams() {
  return Object.keys(SERVICE_SLUG_TR).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const key = SERVICE_SLUG_TR[params.slug];
  if (!key) return { title: "Hizmetler — Conforcus" };
  return pageMetadata(key, "tr");
}

export default function Page({ params }: { params: { slug: string } }) {
  const key = SERVICE_SLUG_TR[params.slug] as RouteKey | undefined;
  const page = key ? serviceByKey(key) : undefined;
  if (!page) notFound();
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey={page.key} name={page.h1.tr} />
      <ServiceDetailPage locale="tr" page={page} />
    </>
  );
}
