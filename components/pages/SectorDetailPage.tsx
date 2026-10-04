import Link from "next/link";
import FaqList, { localizedFaqs } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";
import { LogoWall, BrandIndex } from "@/components/LogoWall";
import type { SectorPage } from "@/lib/sectorPages";
import { getReferences } from "@/lib/references";
import { getSolutions } from "@/lib/solutions";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default async function SectorDetailPage({ locale, page }: { locale: Locale; page: SectorPage }) {
  // Sektör etiketleri Sanity'de Türkçe tutulur; eşleşme TR listeden, gösterim sayfa dilinden.
  const [trRefs, locRefs, sols] = await Promise.all([getReferences("tr"), getReferences(locale), getSolutions(locale)]);
  const slugs = new Set(
    trRefs.filter((r) => page.sectorLabels.includes(r.sector) || (page.refSlugs || []).includes(r.slug)).map((r) => r.slug)
  );
  const refs = locRefs.filter((r) => slugs.has(r.slug));
  const cases = locRefs.filter((r) => page.caseSlugs.includes(r.slug) && r.hasBody);
  const solutions = page.solutionSlugs.map((s) => sols.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);
  const refsBase = pathFor("referanslar", locale);
  const catalog = pathFor("cozumler", locale);
  const t = (b: { tr: string; en: string }) => b[locale];

  return (
    <main data-page="sektorler" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={localizedFaqs(locale, page.faqs)} />
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <Link href={pathFor("sektorler", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm sektörler", "← All industries")}
          </Link>
          <div className="eyebrow">{pick(locale, "Sektör", "Industry")}</div>
          <h1>{t(page.h1)}</h1>
          <p className="lead">{t(page.lead)}</p>
          <div className="badges" style={{ marginTop: 18 }}>
            {page.modules.map((m) => (
              <span className="badge" key={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section style={{ padding: "44px 0 24px" }}>
        <div className="wrap legal" style={{ maxWidth: 900 }}>
          {page.intro.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
          <div className="sx-two">
            <div>
              <h2>{t(page.challenges.h)}</h2>
              <ul className="sx-list">
                {page.challenges.items.map((b, i) => (
                  <li key={i}>{t(b)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>{t(page.approach.h)}</h2>
              <ul className="sx-list ok">
                {page.approach.items.map((b, i) => (
                  <li key={i}>{t(b)}</li>
                ))}
              </ul>
            </div>
          </div>

          {page.proof.length ? (
            <>
              <h2>{pick(locale, "Sahadan", "From the field")}</h2>
              {page.proof.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </>
          ) : null}
          {cases.length ? (
            <div className="rel-sols">
              {cases.map((c) => (
                <Link key={c.slug} href={`${refsBase}/${c.slug}`}>
                  {pick(locale, `${c.name} vakası →`, `${c.name} case →`)}
                </Link>
              ))}
            </div>
          ) : null}

          {solutions.length ? (
            <>
              <h2>{pick(locale, "Bu sektörde öne çıkan çözümler", "Solutions that matter in this industry")}</h2>
              <div className="rel-sols">
                {solutions.map((s) => (
                  <Link key={s.slug} href={`${catalog}/${s.slug}`}>
                    {s.name}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>

      {refs.length ? (
        <section className="refs" style={{ padding: "20px 0 40px" }}>
          <div className="wrap">
            <h2>{pick(locale, `${t(page.name)} referanslarımız`, `Our ${t(page.name)} references`)}</h2>
            <LogoWall items={refs} base={refsBase} cols={6} />
            <BrandIndex items={refs} base={refsBase} />
          </div>
        </section>
      ) : null}

      <section style={{ padding: "0 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 900 }}>
          <FaqList locale={locale} faqs={page.faqs} />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
            <Link className="btn btn-g" href={pathFor("uzmanlik", locale)}>
              {pick(locale, "Modül uzmanlığımız", "Our module expertise")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
