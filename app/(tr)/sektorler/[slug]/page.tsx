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
  return SECTOR_PAGES.map((s) => ({ slug: s.slug.tr }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = sectorBySlug("tr", params.slug);
  if (!p) return { title: ROUTES.sektorler.title.tr };
  return pathMetadata("tr", `${ROUTES.sektorler.tr}/${p.slug.tr}`, `${ROUTES.sektorler.en}/${p.slug.en}`, p.title.tr, p.desc.tr);
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = sectorBySlug("tr", params.slug);
  if (!p) notFound();
  return (
    <>
      <DetailBreadcrumbJsonLd locale="tr" parentKey="sektorler" parentName="Sektörler" title={p.name.tr} slug={p.slug.tr} />
      <SectorDetailPage locale="tr" page={p} />
    </>
  );
}
