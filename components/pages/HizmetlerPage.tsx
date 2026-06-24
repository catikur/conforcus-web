import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function HizmetlerPage({ locale }: { locale: Locale }) {
  return (
    <main data-page="hizmetler" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Hizmetlerimiz", "Our Services")}</div>
          <h1>
            {pick(
              locale,
              <>
                SAP yolculuğunuzun
                <br />
                her adımında
              </>,
              <>
                At every step of
                <br />
                your SAP journey
              </>
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Dört uzmanlık alanımız birbirini tamamlar: sisteminizi kurarız, dönüştürürüz, dünyaya yayar ve her gün yanında dururuz.",
              "Our four practice areas complement each other: we implement, transform, deploy globally — and stand by your system every day."
            )}
          </p>
        </div>
      </div>

      <section className="sblock">
        <div className="wrap sgrid">
          <div>
            <div className="eyebrow" style={{ color: "var(--blue)" }}>
              {pick(locale, "Sürekli Destek", "Ongoing Support")}
            </div>
            <h3>{pick(locale, "SAP Destek Hizmetleri", "SAP Support Services")}</h3>
            <p className="lead">
              {pick(
                locale,
                "Canlı SAP sistemi kullanan şirketler için sürekli bakım, hata çözümü ve iyileştirme hizmeti. SLA garantili yanıt süreleri, adanmış danışman ekipleri ve proaktif sistem takibiyle SAP'ınız hiç yalnız kalmaz.",
                "Continuous maintenance, issue resolution and improvement for companies running live SAP. With SLA-backed response times, dedicated consultant teams and proactive monitoring, your SAP is never on its own."
              )}
            </p>
            <div className="badges">
              <span className="badge">FI</span>
              <span className="badge">CO</span>
              <span className="badge">PS</span>
              <span className="badge">FM</span>
              <span className="badge">TRM</span>
              <span className="badge">MM</span>
              <span className="badge">SD</span>
              <span className="badge">ABAP</span>
            </div>
          </div>
          <div>
            <ul>
              <li>
                {pick(
                  locale,
                  "SLA garantili destek modeli — kritik süreçlerde öncelikli müdahale",
                  "SLA-backed support model — priority response for critical processes"
                )}
              </li>
              <li>{pick(locale, "Hata çözümünün ötesinde sürekli iyileştirme önerileri", "Continuous improvement proposals, beyond fixing issues")}</li>
              <li>{pick(locale, "Dönem sonu kapanışlarında yoğunlaştırılmış destek", "Intensified support during period-end closings")}</li>
              <li>
                {pick(
                  locale,
                  "Mevzuat değişikliklerinin (e-dönüşüm, vergi) sisteme zamanında uyarlanması",
                  "Timely adaptation of regulatory changes to your system"
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sblock">
        <div className="wrap sgrid">
          <div>
            <div className="eyebrow" style={{ color: "var(--amber-d)" }}>
              {pick(locale, "Dönüşüm", "Transformation")}
            </div>
            <h3>{pick(locale, "S/4HANA Dönüşümleri", "S/4HANA Transformations")}</h3>
            <p className="lead">
              {pick(
                locale,
                "Sıfırdan kurulumdan mevcut sistemden geçişe, buluttan kendi sunucunuza tüm S/4HANA senaryolarında deneyimliyiz. Finansal modüllerdeki derinliğimiz, dönüşümün en riskli alanını en güvenli alanınız yapar.",
                "From new implementations to system conversions, cloud to on-premise — we cover every S/4HANA scenario. Our depth in financial modules turns the riskiest part of transformation into your safest."
              )}
            </p>
            <div className="badges">
              <span className="badge">Greenfield</span>
              <span className="badge">Brownfield</span>
              <span className="badge">Cloud</span>
              <span className="badge">On-Premise</span>
            </div>
          </div>
          <div>
            <ul>
              <li>{pick(locale, "Dönüşüm öncesi hazırlık analizi ve yol haritası", "Readiness analysis and roadmap before transformation")}</li>
              <li>{pick(locale, "Finansal veri dönüşümünde özel doğrulama metodolojisi", "Dedicated validation methodology for financial data conversion")}</li>
              <li>{pick(locale, "Go-live sonrası stabilizasyon ve hypercare desteği", "Post-go-live stabilization and hypercare support")}</li>
              <li>{pick(locale, "Türkiye lokalizasyonunda (e-dönüşüm, mevzuat) tam uyum", "Full compliance with local regulatory requirements")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sblock">
        <div className="wrap sgrid">
          <div>
            <div className="eyebrow" style={{ color: "var(--indigo)" }}>
              {pick(locale, "Global Yaygınlaştırma", "Global Deployment")}
            </div>
            <h3>Global Rollout</h3>
            <p className="lead">
              {pick(
                locale,
                "Kurumsal SAP şablonunuzu ülke ülke dünyaya yayıyoruz: 6 kıtada, 50'den fazla ülkede rollout deneyimi. Her ülkenin vergi mevzuatına, raporlama standardına ve yerel iş kültürüne uyumlu geçişler.",
                "We deploy your corporate SAP template across the world: rollout experience in 50+ countries on 6 continents, fully aligned with each country's tax law, reporting standards and local business culture."
              )}
            </p>
            <div className="badges">
              <span className="badge">{pick(locale, "Lokalizasyon", "Localization")}</span>
              <span className="badge">IFRS</span>
              <span className="badge">{pick(locale, "Çok Dilli Ekip", "Multilingual Team")}</span>
            </div>
          </div>
          <div>
            <ul>
              <li>{pick(locale, "Eşzamanlı çoklu ülke go-live yönetimi", "Managing simultaneous multi-country go-lives")}</li>
              <li>{pick(locale, "IFRS uyumlu lokalizasyon çözümleri", "IFRS-compliant localization solutions")}</li>
              <li>{pick(locale, "Merkez-ülke arasında şablon yönetişimi", "Template governance between HQ and countries")}</li>
              <li>{pick(locale, "Saat dilimlerine yayılmış destek organizasyonu", "Support organization spanning time zones")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sblock">
        <div className="wrap sgrid">
          <div>
            <div className="eyebrow" style={{ color: "var(--green)" }}>
              {pick(locale, "Özel Geliştirme", "Custom Development")}
            </div>
            <h3>{pick(locale, "Ürün & Çözüm Geliştirme", "Product & Solution Development")}</h3>
            <p className="lead">
              {pick(
                locale,
                "ABAP, Fiori ve bulut teknolojileriyle şirketinize özel geliştirmeler yapıyor; en sık ihtiyaç duyulan süreçler için 48'den fazla hazır çözüm paketi sunuyoruz. Emek ve zaman tasarrufunu teknolojiyle buluşturuyoruz.",
                "We build custom developments with ABAP, Fiori and cloud technologies, and offer 48+ ready-made packages for the most common needs — bringing technology to where your teams lose the most time."
              )}
            </p>
            <div className="badges">
              <span className="badge">ABAP</span>
              <span className="badge">Fiori</span>
              <span className="badge">BTP / Cloud</span>
              <span className="badge">AI</span>
            </div>
          </div>
          <div>
            <ul>
              <li>{pick(locale, "FI'dan SD'ye 6 modülde 48+ hazır çözüm", "48+ ready solutions across 6 modules, FI to SD")}</li>
              <li>{pick(locale, "FS → TS → CR kalite zinciriyle standartlaştırılmış geliştirme", "Standardized development with an FS → TS → CR quality chain")}</li>
              <li>{pick(locale, "Fiori ile modern, mobil uyumlu kullanıcı deneyimi", "Modern, mobile-ready UX with Fiori")}</li>
              <li>{pick(locale, "Yapay zekâ destekli kurumsal uygulamalar", "AI-assisted enterprise applications")}</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="cta-mid" style={{ padding: "50px 0 70px" }}>
        <Link className="btn btn-p" href={pathFor("analiz", locale)}>
          {pick(locale, "Hangi hizmete ihtiyacınız var? Ücretsiz analizle başlayın →", "Not sure where to start? Begin with a free analysis →")}
        </Link>
      </div>
    </main>
  );
}
