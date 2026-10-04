import Link from "next/link";
import { LogoWall } from "@/components/LogoWall";
import FaqList, { localizedFaqs, type Faq } from "@/components/FaqList";
import PortableBody from "@/components/PortableBody";
import { FaqJsonLd, SolutionJsonLd } from "@/components/JsonLd";
import { modLabel, type SolutionCard, type SolutionFull } from "@/lib/solutions";
import { PRODUCT_PAGES } from "@/lib/productPages";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Sanity SSS'leri önce gelir (CMS'ten yönetilir); kod içi ürün SSS'leri aynı soru yoksa eklenir.
function mergeFaqs(a: Faq[] = [], b: Faq[] = []): Faq[] {
  const seen = new Set(a.map((f) => f.q.tr.trim().toLowerCase()));
  return [...a, ...b.filter((f) => !seen.has(f.q.tr.trim().toLowerCase()))];
}

// Kendi tanıtım sitesi olan çözümler.
const MICROSITE: Record<string, string> = {
  "inflation-accounting": "https://enflasyon.conforcus.com",
};

export default function SolutionDetailPage({
  locale,
  sol,
  related = [],
}: {
  locale: Locale;
  sol: SolutionFull;
  related?: SolutionCard[];
}) {
  const pack = PRODUCT_PAGES[sol.slug];
  const faqs: Faq[] = mergeFaqs(sol.faqs, pack?.faqs);
  const locFaqs = localizedFaqs(locale, faqs);
  const catalog = pathFor("cozumler", locale);
  const name = pack ? pick(locale, pack.name.tr, pack.name.en) : sol.name;
  const short = pack ? pick(locale, pack.short.tr, pack.short.en) : sol.short;

  return (
    <main data-page="cozumler" className="active" id="main" tabIndex={-1}>
      {locFaqs.length ? <FaqJsonLd faqs={locFaqs} /> : null}
      <SolutionJsonLd locale={locale} name={name} slug={sol.slug} module={sol.module} description={short} audience={sol.audience} />
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <Link href={catalog} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm çözümler", "← All solutions")}
          </Link>
          <div style={{ marginBottom: 10 }}>
            <span className={"mod m-" + sol.module}>{modLabel(sol.module)}</span>
          </div>
          <h1>{name}</h1>
          {short ? <p className="lead">{short}</p> : null}
        </div>
      </div>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          {pack ? (
            <>
              <p>{pick(locale, pack.intro.tr, pack.intro.en)}</p>
              {pack.sections.map((s, i) => (
                <div key={i}>
                  <h2>{pick(locale, s.h2.tr, s.h2.en)}</h2>
                  {s.paras.map((para, j) => (
                    <p key={j}>{pick(locale, para.tr, para.en)}</p>
                  ))}
                </div>
              ))}
            </>
          ) : sol.body.length ? (
            <PortableBody value={sol.body} />
          ) : (
            <p className="lead">
              {pick(
                locale,
                "Bu çözümün uzun anlatımı henüz yayımlanmadı. Katalogda durur; ücretsiz analizle ihtiyacınızı konuşabiliriz.",
                "A long write-up for this solution is not published yet. It stays in the catalog — tell us what you need via the free analysis."
              )}
            </p>
          )}

          {sol.benefits?.length ? (
            <>
              <h2>{pick(locale, "Kazanımlar", "Benefits")}</h2>
              <ul className="sol-benefits">
                {sol.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          ) : null}

          {sol.technical ? (
            <>
              <h2>{pick(locale, "SAP'ta nereye oturur", "Where it sits in SAP")}</h2>
              <p>{sol.technical}</p>
            </>
          ) : null}

          {sol.audience ? (
            <p className="sol-aud">
              <b>{pick(locale, "Kimler için:", "Who it is for:")}</b> {sol.audience}
            </p>
          ) : null}

          {MICROSITE[sol.slug] ? (
            <p className="sol-aud">
              {pick(locale, "Çözümün ayrı tanıtım sitesi:", "The solution has its own site:")}{" "}
              <a href={MICROSITE[sol.slug]} rel="noopener">
                {MICROSITE[sol.slug].replace(/^https:\/\//, "")}
              </a>
            </p>
          ) : null}

          {sol.refs?.length ? (
            <div className="solrefs">
              <div className="eyebrow">{pick(locale, "Bu çözümü kullanan müşterilerimiz", "Clients using this solution")}</div>
              <LogoWall items={sol.refs} base={pathFor("referanslar", locale)} cols={4} compact />
              {sol.refs.some((r) => !r.logoUrl) ? (
                <p className="solrefs-names">
                  {sol.refs
                    .filter((r) => !r.logoUrl)
                    .map((r) => (
                      <Link href={`${pathFor("referanslar", locale)}/${r.slug}`} key={r.slug}>
                        {r.name}
                      </Link>
                    ))}
                </p>
              ) : null}
            </div>
          ) : null}

          {faqs.length ? <FaqList locale={locale} faqs={faqs} /> : null}

          {related.length ? (
            <>
              <h2>{pick(locale, "İlgili çözümler", "Related solutions")}</h2>
              <div className="rel-sols">
                {related.map((r) => (
                  <Link key={r.slug} href={`${catalog}/${r.slug}`}>
                    {r.name}
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          <div style={{ marginTop: 40 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Bu çözüm için analiz isteyin", "Request analysis for this solution")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
