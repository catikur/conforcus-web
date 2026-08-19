import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailPage from "@/components/pages/SolutionDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { getSolution, getSolutionSlugs } from "@/lib/solutions";
import { PRODUCT_PAGES } from "@/lib/productPages";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await getSolution("en", params.slug);
  if (!s) return { title: "Solution Catalog — Conforcus" };
  const pack = PRODUCT_PAGES[s.slug];
  const desc = s.seo?.description || pack?.short.en || s.short || `${s.name} — an SAP solution in the ${s.module} module.`;
  const title = s.seo?.title || `${s.name} — Conforcus`;
  return buildMetadata({
    locale: "en",
    title,
    description: desc,
    path: `/en/solutions/${s.slug}`,
    canonical: `${SITE_URL}/en/solutions/${s.slug}`,
    languages: {
      tr: `${SITE_URL}/cozumler/${s.slug}`,
      en: `${SITE_URL}/en/solutions/${s.slug}`,
      "x-default": `${SITE_URL}/cozumler/${s.slug}`,
    },
    noIndex: s.noIndex,
    type: "article",
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const s = await getSolution("en", params.slug);
  if (!s) notFound();
  return (
    <>
      <DetailBreadcrumbJsonLd locale="en" parentKey="cozumler" parentName="Solutions" title={s.name} slug={s.slug} />
      <SolutionDetailPage locale="en" sol={s} />
    </>
  );
}
