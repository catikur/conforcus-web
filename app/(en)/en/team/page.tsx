import EkipPage from "@/components/pages/EkipPage";
import { BreadcrumbJsonLd, TeamJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/team";

export const metadata = pageMetadata("ekip", "en");
export const revalidate = 60;

export default async function Page() {
  const team = await getTeam("en");
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="ekip" name="Our Team" />
      <TeamJsonLd team={team} />
      <EkipPage locale="en" />
    </>
  );
}
