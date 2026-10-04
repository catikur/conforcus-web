import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorDetailPage from "@/components/pages/SectorDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { SECTOR_PAGES, sectorBySlug } from "@/lib/sectorPages";
import { pathMetadata } from "@/lib/seo";
import { ROUTES } from "@/lib/i18n";

export const revalidate = 60;
// Bilinmeyen slug sayfa içinde notFound() ile 404 olur. (false iken Next 16 her bilinmeyen adres için
// günlüğe "Internal: NoFallbackError" yazıyordu; yanıt aynı, günlük temiz.)
export const dynamicParams = true;

export function generateStaticParams() {
  return SECTOR_PAGES.map((s) => ({ slug: s.slug.en }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = sectorBySlug("en", (await params).slug);
  if (!p) return { title: ROUTES.sektorler.title.en };
  return pathMetadata("en", `${ROUTES.sektorler.tr}/${p.slug.tr}`, `${ROUTES.sektorler.en}/${p.slug.en}`, p.title.en, p.desc.en);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = sectorBySlug("en", (await params).slug);
  if (!p) notFound();
  return (
    <>
      <DetailBreadcrumbJsonLd locale="en" parentKey="sektorler" parentName="Industries" title={p.name.en} slug={p.slug.en} />
      <SectorDetailPage locale="en" page={p} />
    </>
  );
}
