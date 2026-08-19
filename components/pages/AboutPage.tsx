import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function AboutPage({ locale }: { locale: Locale }) {
  return (
    <main data-page="hakkimizda" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="eyebrow">{pick(locale, "Şirket", "Company")}</div>
          <h1>{pick(locale, "Hakkımızda", "About Conforcus")}</h1>
          <p className="lead">
            {pick(
              locale,
              `${COMPANY.legalName}: SAP’ta derin uzmanlık, işinizde kalıcı güven. Destek (AMS), S/4HANA, global rollout ve ürün geliştirme — tek ekip.`,
              `${COMPANY.legalName}: deep expertise in SAP, lasting trust in your business. Support (AMS), S/4HANA, global rollout and product development — one team.`
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          <h2>{pick(locale, "Ne iş yaparız", "What we do")}</h2>
          <p>
            {pick(
              locale,
              "Canlı SAP’i yalnız bırakmayız. Dönüşümü finans derinliğiyle yürütürüz. Şablonu ülkeye yayarız. Tekrarlayan işi pakete veya Fiori’ye çeviririz. Confiq, aynı deneyimin yazılıma dönüşmüş halidir.",
              "We do not leave live SAP on its own. We run transformation with finance depth. We roll a template out country by country. We turn repeating work into a package or Fiori. Confiq is that experience turned into software."
            )}
          </p>
          <h2>{pick(locale, "Nasıl dururuz", "How we stand")}</h2>
          <p>
            {pick(
              locale,
              "Mutlu çalışan, mutlu müşteri — Conforcus Way. Rakamları (130+ müşteri, 50+ ülke, 30+ sektör, 48+ çözüm, 70+ danışman, %95 devam) sitede istatistik olarak kullanırız; uydurma ‘tasarruf milyonları’ yazmayız. Referans anlatımı kamuya açık veya onaylıdır.",
              "Happy employees, happy clients — Conforcus Way. We use the site statistics (130+ clients, 50+ countries, 30+ industries, 48+ solutions, 70+ consultants, 95% retention) as published figures; we do not invent ‘millions saved’. Reference write-ups are public or approved."
            )}
          </p>
          <h2>{pick(locale, "Neredeyiz", "Where we are")}</h2>
          <p>
            {COMPANY.addressLine}
            <br />
            {COMPANY.email} · {COMPANY.hrEmail} · {COMPANY.telephoneDisplay}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
            <Link className="btn btn-g" href={pathFor("iletisim", locale)}>
              {pick(locale, "İletişim", "Contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
