/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PortableBody from "@/components/PortableBody";
import { COUNTRY_NAMES_EN } from "@/lib/data";
import type { RefFull } from "@/lib/references";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function ReferenceDetailPage({ locale, reference }: { locale: Locale; reference: RefFull }) {
  const cName = (c: string) => (locale === "tr" ? c : COUNTRY_NAMES_EN[c] || c);
  const t0 = reference.testimonials[0];

  return (
    <main data-page="referanslar" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 1000 }}>
          <Link href={pathFor("referanslar", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm referanslar", "← All references")}
          </Link>
          <div className="rd-hero">
            <div className="rd-logo">{reference.logoUrl ? <img src={reference.logoUrl} alt={reference.name} /> : reference.name}</div>
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
            <aside className="rd-side">
              {reference.sector ? (
                <>
                  <div className="k">{pick(locale, "Sektör", "Sector")}</div>
                  <div className="v">{reference.sector}</div>
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
          <div style={{ marginTop: 40 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
