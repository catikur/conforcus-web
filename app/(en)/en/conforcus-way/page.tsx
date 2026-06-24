import ConforcusWayPage from "@/components/pages/ConforcusWayPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("conforcus-way", "en");

export const revalidate = 60; // ISR — Sanity icerigi 60sn'de tazelenir

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd locale="en" pageKey="conforcus-way" name="Conforcus Way" />
      <ConforcusWayPage locale="en" />
    </>
  );
}
