import CozumlerPage from "@/components/pages/CozumlerPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { MODS } from "@/lib/data";

export const metadata = pageMetadata("cozumler", "tr");

export default function Page({ searchParams }: { searchParams: { m?: string } }) {
  const m = searchParams?.m;
  const initialMod = m && (MODS as readonly string[]).includes(m) ? m : "ALL";
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="cozumler" name="Çözümler" />
      <CozumlerPage locale="tr" initialMod={initialMod} />
    </>
  );
}
