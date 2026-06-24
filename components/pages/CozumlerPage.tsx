import Catalog from "@/components/Catalog";
import { getSolutions } from "@/lib/solutions";
import type { Locale } from "@/lib/i18n";

export default async function CozumlerPage({ locale, initialMod = "ALL" }: { locale: Locale; initialMod?: string }) {
  const solutions = await getSolutions(locale);
  return (
    <main data-page="cozumler" className="active" id="main" tabIndex={-1}>
      <Catalog locale={locale} initialMod={initialMod} solutions={solutions} />
    </main>
  );
}
