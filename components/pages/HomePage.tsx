import Link from "next/link";
import type { CSSProperties } from "react";
import WorldMap from "@/components/WorldMap";
import HomeProducts from "@/components/HomeProducts";
import Testimonials from "@/components/Testimonials";
import { getReferences } from "@/lib/references";
import { getFeaturedSolutions } from "@/lib/solutions";
import { getTestimonials } from "@/lib/testimonials";
import { getHeroSettings } from "@/lib/siteSettings";
import { pathFor, pick, type Locale } from "@/lib/i18n";

const cvar = (v: string): CSSProperties => ({ "--c": v }) as unknown as CSSProperties;

export default async function HomePage({ locale }: { locale: Locale }) {
  const p = (k: Parameters<typeof pathFor>[0]) => pathFor(k, locale);
  const [hero, references, finSol, logSol, testimonials] = await Promise.all([
    getHeroSettings(locale),
    getReferences(locale),
    getFeaturedSolutions(locale, "fin"),
    getFeaturedSolutions(locale, "log"),
    getTestimonials(locale, true),
  ]);
  const refsBase = pathFor("referanslar", locale);
  return (
    <main data-page="home" className="active" id="main" tabIndex={-1}>
      <header className="hero">
        <div className="wrap hero-in">
          <div>
            <div className="hero-copy rv on">
              <div className="kicker">Deep Expertise · Smart Solutions · Lasting Trust</div>
              <h1>
                {hero?.title
                  ? hero.title
                  : pick(
                      locale,
                      <>
                        SAP&apos;ta derin uzmanlık.
                        <br />
                        <span className="grad">İşinizde kalıcı güven.</span>
                      </>,
                      <>
                        Deep expertise in SAP.
                        <br />
                        <span className="grad">Lasting trust in your business.</span>
                      </>
                    )}
              </h1>
              <p>
                {hero?.sub ||
                  pick(
                    locale,
                    "Finansal modüllerden S/4HANA dönüşümlerine, global rollout'lardan yapay zekâ destekli ürünlere — SAP yolculuğunuzun her adımında yanınızdayız.",
                    "From financial modules to S/4HANA transformations, global rollouts to AI-powered products — we're with you at every step of your SAP journey."
                  )}
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link className="btn btn-p" href={p("analiz")}>
                  {hero?.ctaPrimary || pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
                </Link>
                <Link className="btn btn-g" href={p("hizmetler")}>
                  {hero?.ctaSecondary || pick(locale, "Hizmetlerimizi Keşfedin", "Explore Our Services")}
                </Link>
              </div>
            </div>
          </div>
          <div className="ring" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFB537" />
                  <stop offset="1" stopColor="#E68700" />
                </linearGradient>
                <linearGradient id="rg2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#1DADFF" />
                  <stop offset="1" stopColor="#4D9CEE" />
                </linearGradient>
              </defs>
              <g fill="none" strokeWidth="17" strokeLinecap="butt">
                <circle cx="100" cy="100" r="80" stroke="#EEF3F8" />
                <path d="M 100 20 A 80 80 0 0 0 24.7 73.5" stroke="url(#rg1)" />
                <path d="M 21.6 81 A 80 80 0 0 0 45 159.3" stroke="url(#rg1)" opacity=".85" />
                <path d="M 51.5 164.4 A 80 80 0 0 0 148.5 164.4" stroke="url(#rg2)" opacity=".9" />
                <path d="M 155 159.3 A 80 80 0 0 0 179.5 92" stroke="url(#rg2)" />
              </g>
            </svg>
            <div className="core">
              <span className="wm">CONFORCUS</span>
            </div>
          </div>
        </div>
        <div className="wrap hstrip-wrap">
          <div className="hstrip">
            <Link className="hs rv" style={cvar("var(--blue-d)")} href={p("hizmetler")}>
              <span className="hk">{pick(locale, "SAP Destek", "SAP Support")}</span>
              <b>{pick(locale, "SAP'ınız hiç yalnız kalmasın.", "Your SAP, never on its own.")}</b>
              <p>
                {pick(
                  locale,
                  "Sorunlar mesai saati tanımaz. Peki destek ekibiniz? 130+ şirket farkı biliyor.",
                  "Problems don't keep office hours. Does your support team? 130+ companies know the difference."
                )}
              </p>
              <span className="ar">→</span>
            </Link>
            <Link className="hs rv" style={cvar("var(--indigo)")} href={p("referanslar")}>
              <span className="hk">Global Rollout</span>
              <b>{pick(locale, "Tek şablon. 6 kıta, 50+ ülke.", "One template. 6 continents, 50+ countries.")}</b>
              <p>
                {pick(
                  locale,
                  "Aynı SAP şablonu Hanoi'de de Houston'da da aynı gün nasıl canlıya geçer? Haritada görün.",
                  "How does one SAP template go live in Hanoi and Houston on the same day? See the map."
                )}
              </p>
              <span className="ar">→</span>
            </Link>
            <Link className="hs rv" style={cvar("var(--green)")} href={p("cozumler")}>
              <span className="hk">{pick(locale, "48+ Hazır Çözüm", "48+ Ready Solutions")}</span>
              <b>{pick(locale, "Saatler süren işler, dakikalara insin.", "Hours of work, down to minutes.")}</b>
              <p>
                {pick(
                  locale,
                  "Mutabakat hâlâ Excel'de mi? Ekibinizin en çok zaman kaybettiği 48 süreci çoktan paketledik.",
                  "Still reconciling in Excel? We've already packaged the 48 processes that cost your team the most time."
                )}
              </p>
              <span className="ar">→</span>
            </Link>
            <Link className="hs rv" style={cvar("var(--purple)")} href={p("confiq")}>
              <span className="hk">Confiq AI</span>
              <b>{pick(locale, "SAP veriniz konuşabilseydi, ona ne sorardınız?", "If your SAP data could talk, what would you ask?")}</b>
              <p>{pick(locale, "Cevabı duymak 5 dakika sürüyor. Sormak ücretsiz.", "Hearing the answer takes 5 minutes. Asking is free.")}</p>
              <span className="ar">→</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="stats">
        <div className="wrap stats-in">
          <div className="stat rv">
            <b data-n="130" data-suf="+">
              0
            </b>
            <span>{pick(locale, "Aktif Müşteri", "Active Clients")}</span>
          </div>
          <div className="stat rv">
            <b data-n="50" data-suf="+">
              0
            </b>
            <span>{pick(locale, "Ülke", "Countries")}</span>
          </div>
          <div className="stat rv">
            <b data-n="30" data-suf="+">
              0
            </b>
            <span>{pick(locale, "Sektör", "Industries")}</span>
          </div>
          <div className="stat rv">
            <b data-n="48" data-suf="+">
              0
            </b>
            <span>{pick(locale, "Hazır Çözüm", "Ready Solutions")}</span>
          </div>
          <div className="stat rv">
            <b data-n="70" data-suf="+">
              0
            </b>
            <span>{pick(locale, "Danışman", "Consultants")}</span>
          </div>
          <div className="stat rv">
            <b data-n="95" data-pre-tr="%" data-suf-en="%">
              0
            </b>
            <span>{pick(locale, "Müşteri Devamlılığı", "Client Retention")}</span>
          </div>
        </div>
      </section>

      <section className="mapsec">
        <div className="wrap">
          <div className="map-head rv">
            <div>
              <div className="eyebrow">
                <span className="enum">01</span>
                {pick(locale, "Global Deneyim", "Global Experience")}
              </div>
              <h2>
                {pick(
                  locale,
                  <>
                    6 kıtada, 50+ ülkede
                    <br />
                    SAP projeleri
                  </>,
                  <>
                    SAP projects across
                    <br />6 continents, 50+ countries
                  </>
                )}
              </h2>
              <p className="lead">
                {pick(
                  locale,
                  "Tek merkezden yönetilen global rollout'lar, yerel mevzuata uyumlu lokalizasyonlar. Haritada öne çıkan proje ülkelerimizi keşfedin.",
                  "Centrally managed global rollouts with fully compliant localizations. Explore our featured project countries on the map."
                )}
              </p>
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
          <WorldMap locale={locale} className="map-card rv map-slot" />
        </div>
      </section>

      <section className="svc">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="eyebrow">
                <span className="enum">02</span>
                {pick(locale, "Hizmetlerimiz", "Our Services")}
              </div>
              <h2>
                {pick(
                  locale,
                  <>
                    SAP'ta uçtan uca
                    <br />
                    dört uzmanlık alanı
                  </>,
                  <>
                    Four areas of expertise,
                    <br />
                    end to end in SAP
                  </>
                )}
              </h2>
              <p className="lead">
                {pick(
                  locale,
                  "İster SAP'a yeni geçiyor olun, ister yıllardır kullanıyor — kurulumdan sürekli desteğe, dönüşümden özel geliştirmeye her ihtiyaca tek ekipten yanıt veriyoruz.",
                  "Whether you're new to SAP or a long-time user — from implementation to ongoing support, transformation to custom development, one team answers every need."
                )}
              </p>
            </div>
            <Link className="btn btn-b" href={p("hizmetler")}>
              {pick(locale, "Tüm Hizmetlerimiz →", "All Services →")}
            </Link>
          </div>
          <div className="cards">
            <div className="card rv" style={cvar("var(--blue)")}>
              <span className="tag">{pick(locale, "Sürekli Destek", "Ongoing Support")}</span>
              <h3>{pick(locale, "SAP Destek Hizmetleri", "SAP Support Services")}</h3>
              <p>
                {pick(
                  locale,
                  "Canlı SAP sistemi kullanan şirketlere sürekli bakım, hata çözümü ve iyileştirme desteği veriyoruz. Bizim için bu bir destek sözleşmesi değil; ortaklık.",
                  "Continuous maintenance, issue resolution and improvement for companies running live SAP systems. For us, this is not a support contract — it's a partnership."
                )}
              </p>
              <Link className="more" href={p("hizmetler")}>
                {pick(locale, "Detaylı bilgi →", "Learn more →")}
              </Link>
            </div>
            <div className="card rv" style={cvar("var(--amber-d)")}>
              <span className="tag">{pick(locale, "Dönüşüm", "Transformation")}</span>
              <h3>{pick(locale, "S/4HANA Dönüşümleri", "S/4HANA Transformations")}</h3>
              <p>
                {pick(
                  locale,
                  "Sıfırdan kurulum, mevcut sistemden geçiş, bulut veya kendi sunucunuzda — tüm S/4HANA senaryolarında kanıtlanmış metodolojiyle ilerliyoruz.",
                  "New implementation or migration, in the cloud or on-premise — we run every S/4HANA scenario with a proven methodology."
                )}
              </p>
              <Link className="more" href={p("hizmetler")}>
                {pick(locale, "Detaylı bilgi →", "Learn more →")}
              </Link>
            </div>
            <div className="card rv" style={cvar("var(--indigo)")}>
              <span className="tag">{pick(locale, "Global Yaygınlaştırma", "Global Deployment")}</span>
              <h3>Global Rollout</h3>
              <p>
                {pick(
                  locale,
                  "Kurumsal SAP şablonunuzu ülke ülke, yerel mevzuat uyumuyla birlikte dünyaya yayıyoruz. 6 kıtada, 50'den fazla ülkede proje deneyimi.",
                  "We deploy your corporate SAP template country by country, with full local compliance. Project experience across 6 continents and 50+ countries."
                )}
              </p>
              <Link className="more" href={p("hizmetler")}>
                {pick(locale, "Detaylı bilgi →", "Learn more →")}
              </Link>
            </div>
            <div className="card rv" style={cvar("var(--green)")}>
              <span className="tag">{pick(locale, "Özel Geliştirme", "Custom Development")}</span>
              <h3>{pick(locale, "Ürün & Çözüm Geliştirme", "Product & Solution Development")}</h3>
              <p>
                {pick(
                  locale,
                  "ABAP, Fiori ve bulut teknolojileriyle şirketinize özel geliştirmeler ve hayatı kolaylaştıran hazır çözüm paketleri üretiyoruz.",
                  "With ABAP, Fiori and cloud technologies, we build custom developments and ready-made solution packages that make life easier."
                )}
              </p>
              <Link className="more" href={p("cozumler")}>
                {pick(locale, "Çözüm kataloğu →", "Solution catalog →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="prodsec">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="eyebrow">
                <span className="enum">03</span>
                {pick(locale, "Ürünlerimiz", "Our Products")}
              </div>
              <h2>
                {pick(
                  locale,
                  <>
                    48+ hazır SAP çözümü,
                    <br />
                    kurulmayı bekliyor
                  </>,
                  <>
                    48+ ready-made SAP solutions,
                    <br />
                    waiting to be deployed
                  </>
                )}
              </h2>
              <p className="lead">
                {pick(
                  locale,
                  "Sahada yüzlerce kez kanıtlanmış çözüm paketlerimizden bir seçki. Her biri, ekiplerinizin saatlerini alan bir süreci otomatikleştirmek için tasarlandı.",
                  "A selection from our field-proven solution packages — each one built to automate a process that costs your teams hours."
                )}
              </p>
            </div>
            <Link className="btn btn-b" href={p("cozumler")}>
              {pick(locale, "48+ Ürünün Tamamı →", "See All 48+ Products →")}
            </Link>
          </div>
          <HomeProducts locale={locale} fin={finSol} log={logSol} />
        </div>
      </section>

      <section className="confiq">
        <div className="wrap">
          <div className="rv">
            <div className="eyebrow">
              <span className="enum">04</span>
              {pick(locale, "Yapay Zekâ Ürün Ailesi", "AI Product Family")}
            </div>
            <h2>
              {pick(
                locale,
                <>
                  Confiq: SAP uzmanlığımızın
                  <br />
                  <span className="grad">yazılıma dönüşmüş hali</span>
                </>,
                <>
                  Confiq: our SAP expertise,
                  <br />
                  <span className="grad">turned into software</span>
                </>
              )}
            </h2>
            <p className="lead">
              {pick(
                locale,
                "SAP'ınıza doğal dilde soru sorun, 3-6 ay sonrasını bugünden görün, modüller arası veri akışını otomatikleştirin. Beş üründen oluşan yapay zekâ ailesi.",
                "Ask your SAP questions in plain language, see 3-6 months ahead, automate cross-module data flows. A family of five AI products."
              )}
            </p>
          </div>
          <div className="prods rv">
            <div className="prod">
              <b>Decode</b>
              <span>{pick(locale, "SAP'a doğal dilde sorun, saniyeler içinde yanıt alın", "Ask SAP in plain language, get answers in seconds")}</span>
            </div>
            <div className="prod">
              <b>Predict</b>
              <span>{pick(locale, "Nakit akışı ve finansal riskte 3-6 ay ileriyi görün", "See 3-6 months ahead in cash flow and financial risk")}</span>
            </div>
            <div className="prod">
              <b>Cortex</b>
              <span>{pick(locale, "Soru ve öngörüyü birleştiren karar zekâsı", "Decision intelligence uniting questions and foresight")}</span>
            </div>
            <div className="prod">
              <b>Bridge</b>
              <span>{pick(locale, "Modüller arası akıllı veri akışı ve otomasyon", "Smart cross-module data flow and automation")}</span>
            </div>
            <div className="prod free">
              <b>
                Scan
                <span className="pill">{pick(locale, "ÜCRETSİZ", "FREE")}</span>
              </b>
              <span>{pick(locale, "SAP sisteminizin analizi — risk haritanız 48 saatte", "Your SAP system analyzed — risk map in 48 hours")}</span>
            </div>
          </div>
          <div className="rv">
            <Link className="btn btn-b" href={p("confiq")}>
              {pick(locale, "Confiq'i Keşfedin →", "Discover Confiq →")}
            </Link>
          </div>
        </div>
      </section>

      <section className="refs">
        <div className="wrap">
          <div className="sec-head rv">
            <div>
              <div className="eyebrow">
                <span className="enum">05</span>
                {pick(locale, "Referanslarımız", "Our References")}
              </div>
              <h2>
                {pick(
                  locale,
                  <>
                    Türkiye&apos;nin ve dünyanın
                    <br />
                    önde gelen markaları
                  </>,
                  <>
                    Leading brands of
                    <br />
                    Türkiye and the world
                  </>
                )}
              </h2>
            </div>
            <Link className="btn btn-g" href={p("referanslar")}>
              {pick(locale, "Tüm Referanslar →", "All References →")}
            </Link>
          </div>
          <div className="lgrid" id="homelogos">
            {references.slice(0, 12).map((r) => (
              <Link className="ltile" href={`${refsBase}/${r.slug}`} key={r.slug}>
                <div>
                  {r.logoUrl ? (
                    <img src={r.logoUrl} alt={r.name} style={{ maxHeight: 42, maxWidth: "100%", margin: "0 auto" }} />
                  ) : (
                    <b>{r.name}</b>
                  )}
                  {r.sector ? <small>{r.sector}</small> : null}
                </div>
              </Link>
            ))}
          </div>
          <p className="note">
            {pick(
              locale,
              "* Prototipte marka adları yazıyla temsil edilmiştir; canlı sitede onaylı logo dosyaları kullanılacaktır.",
              "* Brand names are shown as text in this prototype; approved logo files will be used on the live site."
            )}
          </p>
        </div>
      </section>

      <Testimonials locale={locale} items={testimonials} />

      <section className="hc">
        <div className="wrap">
          <div className="hc-card">
            <div className="hc-in">
              <div className="rv">
                <h2 style={{ fontSize: "clamp(28px,4vw,42px)" }}>
                  {pick(
                    locale,
                    <>
                      SAP sisteminiz gerçek
                      <br />
                      potansiyelinde mi çalışıyor?
                    </>,
                    <>
                      Is your SAP system running
                      <br />
                      at its true potential?
                    </>
                  )}
                </h2>
                <p>
                  {pick(
                    locale,
                    "5 dakikalık değerlendirmeyle sisteminizin verimlilik ve risk haritasını çıkaralım; sonuçları uzman yorumuyla birlikte size ulaştıralım. Confiq Scan altyapısıyla, tamamen ücretsiz.",
                    "Take the 5-minute assessment and we'll map your system's efficiency and risks, delivered with expert commentary. Powered by Confiq Scan, completely free."
                  )}
                </p>
                <ol className="flow">
                  <li className="rv">
                    <span className="fn">1</span>
                    <div>
                      <b>{pick(locale, "Mini değerlendirme", "Quick assessment")}</b>
                      <small>
                        {pick(locale, "5 dakikalık 5 soru — sektörünüze göre uyarlanır.", "Five questions in five minutes, tailored to your industry.")}
                      </small>
                    </div>
                  </li>
                  <li className="rv">
                    <span className="fn">2</span>
                    <div>
                      <b>{pick(locale, "Verimlilik raporu", "Efficiency report")}</b>
                      <small>
                        {pick(
                          locale,
                          "Confiq Scan motoru sisteminizin risk ve fırsat haritasını çıkarır.",
                          "The Confiq Scan engine maps your system's risks and opportunities."
                        )}
                      </small>
                    </div>
                  </li>
                  <li className="rv">
                    <span className="fn">3</span>
                    <div>
                      <b>{pick(locale, "Uzman görüşmesi", "Expert review")}</b>
                      <small>
                        {pick(
                          locale,
                          "Bulguları danışmanımızla birlikte yorumlar, yol haritanızı konuşursunuz.",
                          "Interpret the findings with our consultant and discuss your roadmap."
                        )}
                      </small>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="hc-cta rv">
                <Link className="btn" href={p("analiz")}>
                  {pick(locale, "Ücretsiz Analizi Başlat", "Start Free Analysis")}
                </Link>
                <small>{pick(locale, "Kredi kartı yok · Taahhüt yok · 48 saatte rapor", "No credit card · No commitment · Report in 48h")}</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
