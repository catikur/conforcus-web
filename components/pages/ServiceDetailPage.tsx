import Link from "next/link";
import FaqList, { localizedFaqs } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import type { ServicePage } from "@/lib/servicePages";
import { PRODUCT_PAGES } from "@/lib/productPages";

export default function ServiceDetailPage({ locale, page }: { locale: Locale; page: ServicePage }) {
  const faqs = localizedFaqs(locale, page.faqs);
  const related = page.related
    .map((slug) => PRODUCT_PAGES[slug])
    .filter(Boolean);
  return (
    <main data-page="hizmetler" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={faqs} />
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <Link href={pathFor("hizmetler", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm hizmetler", "← All services")}
          </Link>
          <div className="eyebrow" style={{ color: page.color }}>
            {pick(locale, page.eyebrow.tr, page.eyebrow.en)}
          </div>
          <h1>{pick(locale, page.h1.tr, page.h1.en)}</h1>
          <p className="lead">{pick(locale, page.lead.tr, page.lead.en)}</p>
        </div>
      </div>

      <section className="sblock">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <h2>{pick(locale, "Kimin için", "Who it is for")}</h2>
          <p className="lead" style={{ maxWidth: "72ch" }}>
            {pick(locale, page.icp.tr, page.icp.en)}
          </p>
          <h2>{pick(locale, page.stepsTitle.tr, page.stepsTitle.en)}</h2>
          <ol className="steps">
            {page.steps.map((s, i) => (
              <li key={i}>{pick(locale, s.tr, s.en)}</li>
            ))}
          </ol>
          <FaqList locale={locale} faqs={page.faqs} />
          {related.length ? (
            <>
              <h2>{pick(locale, "İlgili çözümler", "Related solutions")}</h2>
              <div className="rel-sols">
                {related.map((p) => (
                  <Link key={p.slug} href={`${pathFor("cozumler", locale)}/${p.slug}`}>
                    {pick(locale, p.name.tr, p.name.en)}
                  </Link>
                ))}
              </div>
            </>
          ) : null}
          <div style={{ marginTop: 28 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
