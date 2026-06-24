import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function ConfiqPage({ locale }: { locale: Locale }) {
  return (
    <main data-page="confiq" className="active" id="main" tabIndex={-1}>
      <section className="confiq" style={{ padding: "80px 0" }}>
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Yapay Zekâ Ürün Ailesi", "AI Product Family")}</div>
          {/* Sayfanın tek H1'i (SEO başlık hiyerarşisi) — görünüm prototipteki büyük başlıkla aynı */}
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            {pick(
              locale,
              <>
                SAP veriniz konuşabilseydi,
                <br />
                <span className="grad">ona ne sorardınız?</span>
              </>,
              <>
                If your SAP data could talk,
                <br />
                <span className="grad">what would you ask?</span>
              </>
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Confiq, 20 yılı aşkın SAP danışmanlık deneyimimizin yazılıma dönüşmüş hali: SAP'ınıza doğal dilde soru sorun, geleceği bugünden görün, modüller arası akışları otomatikleştirin.",
              "Confiq is our SAP consulting expertise turned into software: ask your SAP questions in plain language, see the future today, automate cross-module flows."
            )}
          </p>

          <div className="prods" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 44 }}>
            <div className="prod">
              <b>Confiq Decode</b>
              <span>
                {pick(
                  locale,
                  'SAP\'a doğal dilde sorun: "Bu ay en çok geciken müşteri kim?" Saniyeler içinde, tablo ve grafiklerle yanıt alın. SAP ekranlarında kaybolmak yok.',
                  'Ask SAP in plain language: "Which customer is most overdue this month?" Get answers in seconds, with tables and charts. No more getting lost in SAP screens.'
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Predict</b>
              <span>
                {pick(
                  locale,
                  "Nakit akışından tahsilat riskine, finansal göstergelerinizde 3-6 ay sonrasını bugünden görün. Sürprizlerle değil, senaryolarla yönetin.",
                  "From cash flow to collection risk, see 3-6 months ahead in your financial indicators. Manage with scenarios, not surprises."
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Cortex</b>
              <span>
                {pick(
                  locale,
                  'Decode\'un yanıtlarıyla Predict\'in öngörülerini birleştiren karar zekâsı katmanı: "Ne oldu?" ve "Ne olacak?" sorularını tek ekranda buluşturur.',
                  'The decision intelligence layer uniting Decode\'s answers with Predict\'s foresight: "what happened" and "what\'s next" on a single screen.'
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Bridge</b>
              <span>
                {pick(
                  locale,
                  "Modüller ve sistemler arasında akıllı veri akışı: manuel aktarımları, mutabakatsızlıkları ve tekrar eden işleri ortadan kaldırır.",
                  "Smart data flow between modules and systems: eliminates manual transfers, mismatches and repetitive work."
                )}
              </span>
            </div>
            <div className="prod free" style={{ gridColumn: "1/-1" }}>
              <b>
                Confiq Scan
                <span className="pill">{pick(locale, "ÜCRETSİZ", "FREE")}</span>
              </b>
              <span>
                {pick(
                  locale,
                  "SAP sisteminizin kapsamlı analizi: veri kalitesi, süreç verimliliği ve risk haritanız 48 saat içinde elinizde. Confiq yolculuğunun ücretsiz ilk adımı.",
                  "A comprehensive analysis of your SAP system: data quality, process efficiency and your risk map within 48 hours. The free first step of the Confiq journey."
                )}
              </span>
            </div>
          </div>

          <div className="cycle">
            <div className="cyc">
              <b>{pick(locale, "1 · Tara", "1 · Scan")}</b>
              <h4>{pick(locale, "Ücretsiz analizle başlayın", "Start with a free analysis")}</h4>
              <p>
                {pick(
                  locale,
                  "Confiq Scan sisteminizin fotoğrafını çeker: nerede zaman, nerede para kaybediyorsunuz?",
                  "Confiq Scan photographs your system: where are you losing time and money?"
                )}
              </p>
            </div>
            <div className="cyc">
              <b>{pick(locale, "2 · İyileştir", "2 · Improve")}</b>
              <h4>{pick(locale, "Uzman ekiple güçlendirin", "Strengthen with expert teams")}</h4>
              <p>
                {pick(
                  locale,
                  "Bulgulara göre danışman ekiplerimiz süreçlerinizi ve sisteminizi iyileştirir.",
                  "Based on the findings, our consultants improve your processes and your system."
                )}
              </p>
            </div>
            <div className="cyc">
              <b>{pick(locale, "3 · Dönüştür", "3 · Transform")}</b>
              <h4>{pick(locale, "Confiq ile geleceğe geçin", "Step into the future with Confiq")}</h4>
              <p>
                {pick(
                  locale,
                  "Decode, Predict ve Bridge ile SAP'ınız artık konuşan, öngören bir sisteme dönüşür.",
                  "With Decode, Predict and Bridge, your SAP becomes a system that talks and foresees."
                )}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-b" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz Scan ile Başlayın", "Start with a Free Scan")}
            </Link>
            <a className="btn btn-g" style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }} href="#" data-toast="confiq">
              {pick(locale, "Detaylar: confiq.ai →", "Details: confiq.ai →")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
