import Quiz from "@/components/Quiz";
import FaqList, { type Faq } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";
import { pick, type Locale } from "@/lib/i18n";
import { lineBreak } from "@/lib/lineBreak";

const ANALIZ_FAQS: Faq[] = [
  {
    q: { tr: "Analiz gerçekten ücretsiz mi?", en: "Is the analysis actually free?" },
    a: {
      tr: "Evet. Form bir satış tuzağı değil; 48 saat içinde yazılı dönüş sözüdür. Taahhüt, kredi kartı veya ‘keşif ücreti’ yoktur. İsterseniz konuşuruz, istemezseniz rapor sizinle kalır.",
      en: "Yes. The form is not a bait-and-switch; it is a written reply within 48 hours. No commitment, card or ‘discovery fee’. We talk if you want; the note stays yours if you do not.",
    },
  },
  {
    q: { tr: "Sisteminize bağlanıyor musunuz?", en: "Do you connect to our system?" },
    a: {
      tr: "Bu adımda hayır. Beş soru ve sizin tarifiniz yeter. Canlı sisteme erişim ancak ayrıca, yazılı izin ve kapsamla açılır — analiz formunun parçası değildir.",
      en: "Not at this step. Five questions and your description are enough. Access to a live system opens only later, with written permission and a scope — it is not part of the form.",
    },
  },
  {
    q: { tr: "48 saat ne anlama gelir?", en: "What does 48 hours mean?" },
    a: {
      tr: "İş günü içinde uzman notu. Gece yarısı gönderilen form, sonraki iş gününden sayılır. SLA reklamı değil, operasyon cümlesidir.",
      en: "An expert note inside business days. A form sent at midnight counts from the next business day. That is an operations sentence, not an SLA advert.",
    },
  },
  {
    q: { tr: "Confiq Scan şimdi puan mı basıyor?", en: "Does Confiq Scan print a score now?" },
    a: {
      tr: "Hayır. Bu sayfadaki mini değerlendirme yönlendirme içindir. Sayısal bir ‘sistem skoru’ uydurmayız. Derin tarama ayrı bir ürün/çalışmadır ve erişim ister.",
      en: "No. The mini assessment on this page is for routing. We do not invent a numeric ‘system score’. A deeper scan is a separate piece of work and needs access.",
    },
  },
  {
    q: { tr: "Kişisel veriler ne olur?", en: "What happens to personal data?" },
    a: {
      tr: "Ad, e-posta ve şirket info@conforcus.com kutusuna düşer. Pazarlama listesine sessizce eklenmez. KVKK metni ve gizlilik sayfasında iskelet anlatılır.",
      en: "Name, email and company land in info@conforcus.com. We do not silently add you to a marketing list. The KVKK notice and privacy page sketch the outline.",
    },
  },
];

export default function AnalizPage({ locale }: { locale: Locale }) {
  const faqs = ANALIZ_FAQS.map((f) => ({ q: pick(locale, f.q.tr, f.q.en), a: pick(locale, f.a.tr, f.a.en) }));
  return (
    <main data-page="analiz" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={faqs} />
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}</div>
          <h1>
            {pick(
              locale,
              lineBreak("SAP sisteminiz gerçek", "potansiyelinde mi çalışıyor?"),
              lineBreak("Is your SAP running", "at its true potential?")
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Beş dakikalık sorular, iletişim bilgisi, 48 saat içinde uzman notu. Canlı sisteme bu adımda bağlanılmaz. Tamamen ücretsiz, taahhütsüz.",
              "Five minutes of questions, your contact details, an expert note within 48 hours. We do not connect to the live system at this step. Completely free, no commitment."
            )}
          </p>
        </div>
      </div>

      <section style={{ padding: "36px 0 8px" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <h2>{pick(locale, "Nasıl işler", "How it works")}</h2>
          <ol className="how-list">
            <li>
              <span className="fn">1</span>
              <div>
                <b>{pick(locale, "Beş soru", "Five questions")}</b>
                <p style={{ margin: "4px 0 0", color: "var(--ink-2)" }}>
                  {pick(
                    locale,
                    "Sürüm, kapanış süresi, Excel alışkanlığı, banka/e-dönüşüm otomasyonu, 12 aylık öncelik. Sektörünüze göre yorumlanır; tek doğru cevap yok.",
                    "Version, close duration, Excel habit, bank/e-invoicing automation, 12-month priority. Read in context of your industry; there is no single right answer."
                  )}
                </p>
              </div>
            </li>
            <li>
              <span className="fn">2</span>
              <div>
                <b>{pick(locale, "İletişim", "Contact")}</b>
                <p style={{ margin: "4px 0 0", color: "var(--ink-2)" }}>
                  {pick(
                    locale,
                    "Ad, kurumsal e-posta, isteğe bağlı şirket. Form info@conforcus.com’a gider.",
                    "Name, work email, optional company. The form goes to info@conforcus.com."
                  )}
                </p>
              </div>
            </li>
            <li>
              <span className="fn">3</span>
              <div>
                <b>{pick(locale, "Uzman notu", "Expert note")}</b>
                <p style={{ margin: "4px 0 0", color: "var(--ink-2)" }}>
                  {pick(
                    locale,
                    "48 saat içinde yazılı dönüş: hangi hizmet veya çözüm paketinin konuşulmaya değer olduğu. Sayısal skor basılmaz.",
                    "A written reply within 48 hours: which service or package is worth a conversation. No numeric score is printed."
                  )}
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section style={{ padding: "30px 0 40px", background: "var(--mist)" }}>
        <div className="wrap">
          <Quiz locale={locale} />
        </div>
      </section>

      <section style={{ padding: "20px 0 70px" }}>
        <div className="wrap">
          <FaqList locale={locale} faqs={ANALIZ_FAQS} />
        </div>
      </section>
    </main>
  );
}
