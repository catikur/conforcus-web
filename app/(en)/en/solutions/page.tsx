import CozumlerPage from "@/components/pages/CozumlerPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { MODS } from "@/lib/data";

export const metadata = pageMetadata("cozumler", "en");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page({ searchParams }: { searchParams: { m?: string } }) {
  const m = searchParams?.m;
  const initialMod = m && (MODS as readonly string[]).includes(m) ? m : "ALL";
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="cozumler" name="Solutions" />
      <CozumlerPage locale="en" initialMod={initialMod} />
    </>
  );
}
