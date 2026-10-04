import Link from "next/link";
import { SECTOR_PAGES } from "@/lib/sectorPages";
import { getReferences } from "@/lib/references";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Sektörler — liste. Her kart, o sektördeki referans sayısını Sanity'den hesaplar.
export default async function SectorsPage({ locale }: { locale: Locale }) {
  const trRefs = await getReferences("tr");
  const base = pathFor("sektorler", locale);
  const count = (labels: string[], extra: string[] = []) =>
    trRefs.filter((r) => labels.includes(r.sector) || extra.includes(r.slug)).length;

  return (
    <main data-page="sektorler" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Sektörler", "Industries")}</div>
          <h1>{pick(locale, "Sektörünüzde SAP'ı nasıl çalıştırıyoruz", "How we run SAP in your industry")}</h1>
          <p className="lead">
            {pick(
              locale,
              "Aynı SAP modülü her sektörde farklı bir soruya cevap verir: üretimde maliyet, inşaatta hakediş, perakendede mağaza, enerjide bütçe. Aşağıda sektör bazında neyi çözdüğümüzü, hangi çözümleri kurduğumuzu ve kimlerle çalıştığımızı bulacaksınız.",
              "The same SAP module answers a different question in each industry: cost in manufacturing, progress billing in construction, stores in retail, budget in energy. Below you will find what we solve per industry, which solutions we deploy and who we work with."
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "44px 0 80px" }}>
        <div className="wrap">
          <div className="sx-grid">
            {SECTOR_PAGES.map((s) => {
              const n = count(s.sectorLabels, s.refSlugs);
              return (
                <Link className="sx-card" href={`${base}/${s.slug[locale]}`} key={s.key}>
                  <h2>{s.name[locale]}</h2>
                  <p>{s.lead[locale]}</p>
                  <small>
                    {s.modules.join(" · ")}
                    {n ? pick(locale, ` — ${n} referans`, ` — ${n} references`) : ""}
                  </small>
                </Link>
              );
            })}
          </div>
          <div className="cta-mid">
            <p className="lead" style={{ margin: "0 auto 18px", textAlign: "center" }}>
              {pick(locale, "Sektörünüz listede yok mu? Modül uzmanlığımıza bakın ya da doğrudan yazın.", "Don't see your industry? Look at our module expertise or write to us directly.")}
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link className="btn btn-b" href={pathFor("uzmanlik", locale)}>
                {pick(locale, "Modül uzmanlığımız", "Our module expertise")}
              </Link>
              <Link className="btn btn-g" href={pathFor("analiz", locale)}>
                {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
