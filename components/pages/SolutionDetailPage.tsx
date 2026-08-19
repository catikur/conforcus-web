import Link from "next/link";
import FaqList, { localizedFaqs, type Faq } from "@/components/FaqList";
import PortableBody from "@/components/PortableBody";
import { FaqJsonLd } from "@/components/JsonLd";
import type { SolutionFull } from "@/lib/solutions";
import { PRODUCT_PAGES } from "@/lib/productPages";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function SolutionDetailPage({ locale, sol }: { locale: Locale; sol: SolutionFull }) {
  const pack = PRODUCT_PAGES[sol.slug];
  const faqs: Faq[] = pack?.faqs || sol.faqs || [];
  const locFaqs = localizedFaqs(locale, faqs);

  return (
    <main data-page="cozumler" className="active" id="main" tabIndex={-1}>
      {locFaqs.length ? <FaqJsonLd faqs={locFaqs} /> : null}
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <Link href={pathFor("cozumler", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm çözümler", "← All solutions")}
          </Link>
          <div style={{ marginBottom: 10 }}>
            <span className={"mod m-" + sol.module}>{sol.module}</span>
          </div>
          <h1>{pack ? pick(locale, pack.name.tr, pack.name.en) : sol.name}</h1>
          {pack ? (
            <p className="lead">{pick(locale, pack.short.tr, pack.short.en)}</p>
          ) : sol.short ? (
            <p className="lead">{sol.short}</p>
          ) : null}
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
          {faqs.length ? <FaqList locale={locale} faqs={faqs} /> : null}
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
