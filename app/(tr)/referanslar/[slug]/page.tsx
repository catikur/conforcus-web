import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferenceDetailPage from "@/components/pages/ReferenceDetailPage";
import { DetailBreadcrumbJsonLd } from "@/components/JsonLd";
import { getReference, getReferenceSlugs } from "@/lib/references";
import { SITE_URL } from "@/lib/i18n";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getReferenceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const r = await getReference("tr", params.slug);
  if (!r) return { title: "Referanslar — Conforcus" };
  const url = `${SITE_URL}/referanslar/${r.slug}`;
  const desc = r.blurb || `${r.name} — Conforcus SAP referansı${r.sector ? ` · ${r.sector}` : ""}.`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${r.name} — Conforcus`,
    description: desc,
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/referanslar/${r.slug}`,
        en: `${SITE_URL}/en/references/${r.slug}`,
        "x-default": `${SITE_URL}/referanslar/${r.slug}`,
      },
    },
    openGraph: { title: r.name, description: desc, url, type: "article", siteName: "Conforcus", locale: "tr_TR", images: [r.logoUrl || `${SITE_URL}/og`] },
  };
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
