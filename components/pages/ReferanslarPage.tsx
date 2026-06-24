import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import References from "@/components/References";
import Testimonials from "@/components/Testimonials";
import { getReferences, getReferencesByCountry } from "@/lib/references";
import { getTestimonials } from "@/lib/testimonials";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default async function ReferanslarPage({ locale }: { locale: Locale }) {
  const [references, refsByCountry, testimonials] = await Promise.all([
    getReferences(locale),
    getReferencesByCountry(locale),
    getTestimonials(locale, false),
  ]);
  const refsBase = pathFor("referanslar", locale);

  return (
    <main data-page="referanslar" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Referanslarımız", "Our References")}</div>
          <h1>
            {pick(
              locale,
              <>
                130+ müşteri, 30+ sektör,
                <br />
                50+ ülke
              </>,
              <>
                130+ clients, 30+ industries,
                <br />
                50+ countries
              </>
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Robotikten kozmetiğe, enerjiden inşaata — Türkiye'nin ve dünyanın önde gelen markaları SAP yolculuklarında Conforcus'a güveniyor. Müşterilerimizin %95'i bizimle çalışmaya devam ediyor.",
              "From robotics to cosmetics, energy to construction — leading brands trust Conforcus on their SAP journey. 95% of our clients continue working with us."
            )}
          </p>
        </div>
      </div>

      <section className="mapsec">
        <div className="wrap">
          <div className="map-head">
            <div>
              <h2 style={{ marginTop: 0 }}>{pick(locale, "Proje haritamız", "Our project map")}</h2>
            </div>
            <div className="map-legend">
              <span>
                <span className="dotl" style={{ background: "var(--amber)" }} />
                {pick(locale, "Merkez — Türkiye", "HQ — Türkiye")}
              </span>
              <span>
                <span className="dotl" style={{ background: "#B9E4FF", border: "1px solid #6FC4F2" }} />
                {pick(locale, "Proje ülkeleri", "Project countries")}
              </span>
            </div>
          </div>
          <WorldMap locale={locale} className="map-card map-slot" refsByCountry={refsByCountry} refsBase={refsBase} />
        </div>
      </section>

      <section className="refs">
        <div className="wrap">
          <h2>{pick(locale, "Markalar", "Brands")}</h2>
          <References locale={locale} references={references} />
          <p className="note">
            {pick(
              locale,
              "* Bu sayfada logo kullanım onayı bulunan müşterilerimiz listelenmektedir; tam referans listesi için bizimle iletişime geçin. Prototipte marka adları yazıyla temsil edilmiştir.",
              "* This page lists clients who approved logo usage; contact us for the full reference list. Brand names are shown as text in this prototype."
            )}
          </p>
          <div className="cta-mid">
            <Link className="btn btn-b" href={pathFor("analiz", locale)}>
              {pick(locale, "Siz de aramıza katılın →", "Join them →")}
            </Link>
          </div>
        </div>
      </section>

      <Testimonials locale={locale} items={testimonials} />
    </main>
  );
}
