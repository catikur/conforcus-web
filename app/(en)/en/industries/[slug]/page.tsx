import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorDetailPage from "@/components/pages/SectorDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { SECTOR_PAGES, sectorBySlug } from "@/lib/sectorPages";
import { pathMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/i18n";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTOR_PAGES.map((s) => ({ slug: s.slug.en }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = sectorBySlug("en", params.slug);
  if (!p) return { title: ROUTES.sektorler.title.en };
  return pathMetadata("en", `${ROUTES.sektorler.tr}/${p.slug.tr}`, `${ROUTES.sektorler.en}/${p.slug.en}`, p.title.en, p.desc.en);
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = sectorBySlug("en", params.slug);
  if (!p) notFound();
  return (
    <>
      <DetailBreadcrumbJsonLd locale="en" parentKey="sektorler" parentName="Industries" title={p.name.en} slug={p.slug.en} />
      <SectorDetailPage locale="en" page={p} />
    </>
  );
}
