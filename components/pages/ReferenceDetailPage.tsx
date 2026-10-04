import Link from "next/link";
import { SECTOR_PAGES } from "@/lib/sectorPages";
import PortableBody from "@/components/PortableBody";
import { COUNTRY_NAMES_EN } from "@/lib/data";
import type { RefFull } from "@/lib/references";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import MediaSlot from "@/components/MediaSlot";
import YouTube from "@/components/YouTube";
import { CaseArticleJsonLd } from "@/components/JsonLd";
import { sanityImg } from "@/lib/img";

export default function ReferenceDetailPage({ locale, reference }: { locale: Locale; reference: RefFull }) {
  // Referansın sektör sayfası (varsa): sektör adı ve alttaki düğme oraya bağlanır.
  const sectorPage = SECTOR_PAGES.find(
    (s) => (reference.sectorTr && s.sectorLabels.includes(reference.sectorTr)) || (s.refSlugs || []).includes(reference.slug)
  );
  const sectorHref = sectorPage ? `${pathFor("sektorler", locale)}/${sectorPage.slug[locale]}` : "";
  const cName = (c: string) => (locale === "tr" ? c : COUNTRY_NAMES_EN[c] || c);
  const t0 = reference.testimonials[0];

  return (
    <main data-page="referanslar" className="active" id="main" tabIndex={-1}>
      <CaseArticleJsonLd
        locale={locale}
        name={reference.name}
        slug={reference.slug}
        blurb={reference.blurb}
        sector={reference.sector}
        imageUrl={reference.projectImageUrl || reference.logoUrl}
      />
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <Link href={pathFor("referanslar", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm referanslar", "← All references")}
          </Link>
          <div className="rd-hero">
            <div className="rd-logo">{reference.logoUrl ? <img src={sanityImg(reference.logoUrl, { w: 240, h: 240 })} alt={reference.name} width={120} height={120} /> : reference.name}</div>
            <div className="rd-meta">
              {reference.sector ? <span className="sect">{reference.sector}</span> : null}
              <h1>{reference.name}</h1>
              {reference.countries.length ? (
                <div className="rd-flags">
                  {reference.countries.map((c) => (
                    <span className="rd-flag" key={c}>
                      {cName(c)}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <div className="rd-body">
            <div>
              {reference.body.length ? (
                <PortableBody value={reference.body} />
              ) : (
                <p className="lead">
                  {reference.blurb ||
                    pick(
                      locale,
                      `${reference.name}, SAP yolculuğunda Conforcus ile çalışan referanslarımızdandır. Detaylı proje anlatımı yakında.`,
                      `${reference.name} is among our references working with Conforcus on their SAP journey. A detailed case study is coming soon.`
                    )}
                </p>
              )}
            </div>
            <div className="rd-media">
              <MediaSlot
                src={reference.projectImageUrl}
                alt={reference.projectImageAlt}
                field="clientReference.projectImage"
                locale={locale}
                label={{ tr: "Proje görseli (müşteri izniyle)", en: "Project image (with client consent)" }}
                ratio="16 / 9"
              />
              <YouTube
                url={reference.videoUrl}
                locale={locale}
                title={`${reference.name} — ${pick(locale, "müşteri görüşü", "client testimonial")}`}
              />
            </div>
            <aside className="rd-side">
              {reference.sector ? (
                <>
                  <div className="k">{pick(locale, "Sektör", "Sector")}</div>
                  <div className="v">{sectorPage ? <Link href={sectorHref}>{reference.sector}</Link> : reference.sector}</div>
                </>
              ) : null}
              {reference.countries.length ? (
                <>
                  <div className="k">{pick(locale, "Ülkeler", "Countries")}</div>
                  <div className="v">{reference.countries.map(cName).join(", ")}</div>
                </>
              ) : null}
              {t0 ? (
                <div className="rd-quote">
                  “{t0.quote}”
                  <span>
                    — {t0.person}
                    {t0.role || t0.company ? `, ${[t0.role, t0.company].filter(Boolean).join(" · ")}` : ""}
                  </span>
                </div>
              ) : null}
            </aside>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
            {sectorPage ? (
              <Link className="btn btn-g" href={sectorHref}>
                {pick(locale, `${sectorPage.name.tr}: sektör deneyimimiz`, `${sectorPage.name.en}: our industry experience`)}
              </Link>
            ) : null}
            <Link className="btn btn-g" href={pathFor("referanslar", locale)}>
              {pick(locale, "Tüm referanslar", "All references")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
