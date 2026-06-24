import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailPage from "@/components/pages/SolutionDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { getSolution, getSolutionSlugs } from "@/lib/solutions";
import { SITE_URL } from "@/lib/i18n";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = await getSolution("en", params.slug);
  if (!s) return { title: "Solution Catalog — Conforcus" };
  const url = `${SITE_URL}/en/solutions/${s.slug}`;
  const desc = s.short || `${s.name} — an SAP solution in the ${s.module} module.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${s.name} — Conforcus`,
    description: desc,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/cozumler/${s.slug}`, en: url, "x-default": `${SITE_URL}/cozumler/${s.slug}` },
    },
    openGraph: { title: s.name, description: desc, url, type: "article", siteName: "Conforcus", locale: "en_US", images: [`${SITE_URL}/og`] },
  };
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
