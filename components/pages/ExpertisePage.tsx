import Link from "next/link";
import FaqList, { localizedFaqs } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";
import { EXPERTISE } from "@/lib/expertise";
import { getReferences } from "@/lib/references";
import { getSolutions } from "@/lib/solutions";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Modül uzmanlığı — finans, lojistik, ileri finans ve teknoloji başlıklarında tek sayfa.
export default async function ExpertisePage({ locale }: { locale: Locale }) {
  const [sols, refs] = await Promise.all([getSolutions(locale), getReferences(locale)]);
  const { page, items } = EXPERTISE;
  const t = (b: { tr: string; en: string }) => b[locale];
  const catalog = pathFor("cozumler", locale);
  const refsBase = pathFor("referanslar", locale);
  const countFor = (m: string) => sols.filter((s) => s.module === m).length;

  return (
    <main data-page="uzmanlik" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={localizedFaqs(locale, page.faqs)} />
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Uzmanlık", "Expertise")}</div>
          <h1>{t(page.h1)}</h1>
          <p className="lead">{t(page.lead)}</p>
          <div className="chiprow">
            {page.groups.map((g) => (
              <a className="chip" href={`#${g.key}`} key={g.key}>
                {t(g.name)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {page.groups.map((g) => (
        <section className="xp-group" id={g.key} key={g.key}>
          <div className="wrap">
            <h2>{t(g.name)}</h2>
            <p className="lead">{t(g.blurb)}</p>
            <div className="xp-grid">
              {items
                .filter((it) => it.group === g.key)
                .map((it) => {
                  const itSols = it.solutionSlugs.map((s) => sols.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);
                  const itRefs = it.refSlugs.map((s) => refs.find((x) => x.slug === s)).filter((x): x is NonNullable<typeof x> => !!x);
                  const n = it.solutionModule ? countFor(it.solutionModule) : 0;
                  return (
                    <article className="xp-item" id={it.key} key={it.key}>
                      <div className="xp-head">
                        <span className="xp-code">{it.code}</span>
                        <h3>{t(it.name)}</h3>
                      </div>
                      <p>{t(it.intro)}</p>
                      <ul className="sx-list ok">
                        {it.strengths.map((s, i) => (
                          <li key={i}>{t(s)}</li>
                        ))}
                      </ul>
                      {it.proof && t(it.proof) ? <p className="xp-proof">{t(it.proof)}</p> : null}
                      {itSols.length || itRefs.length || n ? (
                        <div className="xp-links">
                          {itSols.map((s) => (
                            <Link key={s.slug} href={`${catalog}/${s.slug}`}>
                              {s.name}
                            </Link>
                          ))}
                          {itRefs.map((r) => (
                            <Link key={r.slug} href={`${refsBase}/${r.slug}`} className="xp-ref">
                              {r.name}
                            </Link>
                          ))}
                          {it.solutionModule && n ? (
                            <Link href={it.solutionModule === "E" ? pathFor("e-cozumler", locale) : `${catalog}?m=${it.solutionModule}`} className="xp-all">
                              {pick(locale, `${it.solutionModule} çözümleri (${n}) →`, `${it.solutionModule} solutions (${n}) →`)}
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: "20px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 900 }}>
          <FaqList locale={locale} faqs={page.faqs} />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 32 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
            <Link className="btn btn-g" href={pathFor("sektorler", locale)}>
              {pick(locale, "Sektörlere göre deneyimimiz", "Our experience by industry")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
