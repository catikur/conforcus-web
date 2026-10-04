import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceDetailPage from "@/components/pages/ReferenceDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { getReference, getReferenceSlugs } from "@/lib/references";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { referenceDescription, referenceTitle } from "@/lib/seoText";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getReferenceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getReference("tr", params.slug);
  if (!r) return { title: "Referanslar — Conforcus" };
  const cName = (c: string) => c;
  const desc = r.seo?.description || referenceDescription(r, "tr", cName);
  const title = r.seo?.title || referenceTitle(r.name, !!r.hasBody, "tr");
  return buildMetadata({
    locale: "tr",
    title,
    description: desc,
    path: `/referanslar/${r.slug}`,
    canonical: `${SITE_URL}/referanslar/${r.slug}`,
    languages: {
      tr: `${SITE_URL}/referanslar/${r.slug}`,
      en: `${SITE_URL}/en/references/${r.slug}`,
      "x-default": `${SITE_URL}/referanslar/${r.slug}`,
    },
    // Vaka anlatımı olmayan referans sayfası ince içeriktir: dizine girmez, bağlantıları izlenir.
    noIndex: !!r.noIndex || !r.hasBody,
    image: r.logoUrl,
    type: "article",
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const r = await getReference("tr", params.slug);
  if (!r) notFound();
  return (
    <>
      <DetailBreadcrumbJsonLd locale="tr" parentKey="referanslar" parentName="Referanslar" title={r.name} slug={r.slug} />
      <ReferenceDetailPage locale="tr" reference={r} />
    </>
  );
}
