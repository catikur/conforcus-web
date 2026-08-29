import EkipPage from "@/components/pages/EkipPage";
import { BreadcrumbJsonLd, TeamJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/team";

export const metadata = pageMetadata("ekip", "tr");
export const revalidate = 60; // ISR — Sanity'den eklenen ekip üyesi 60sn'de yansır

export default async function Page() {
  const team = await getTeam("tr");
  return (
    <>
      <BreadcrumbJsonLd locale="tr" pageKey="ekip" name="Ekibimiz" />
      <TeamJsonLd team={team} />
      <EkipPage locale="tr" />
    </>
  );
}
