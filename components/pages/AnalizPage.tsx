import Quiz from "@/components/Quiz";
import { pick, type Locale } from "@/lib/i18n";

export default function AnalizPage({ locale }: { locale: Locale }) {
  return (
    <main data-page="analiz" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}</div>
          <h1>
            {pick(
              locale,
              <>
                SAP sisteminiz gerçek
                <br />
                potansiyelinde mi çalışıyor?
              </>,
              <>
                Is your SAP running
                <br />
                at its true potential?
              </>
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "5 dakikalık değerlendirmeyi tamamlayın; Confiq Scan altyapısıyla hazırlanan verimlilik ve risk haritanızı, uzman yorumuyla birlikte 48 saat içinde size ulaştıralım. Tamamen ücretsiz, taahhütsüz.",
              "Complete the 5-minute assessment and receive your efficiency and risk map — prepared on Confiq Scan and delivered with expert commentary within 48 hours. Completely free, no commitment."
            )}
          </p>
        </div>
      </div>

      <section style={{ padding: "30px 0 70px", background: "var(--mist)" }}>
        <div className="wrap">
          <Quiz locale={locale} />
        </div>
      </section>
    </main>
  );
}
