import { FAQ, faqKicker, faqLede, faqTitle } from "@/lib/faq";
import { pick, type Locale } from "@/lib/i18n";

/* SSS — native <details>/<summary> ile: JavaScript gerekmez, klavye ve
   ekran okuyucu desteği tarayıcıdan gelir, içerik HTML'de görünür (SEO). */
export default function Faq({ locale }: { locale: Locale }) {
  return (
    <section className="faq">
      <div className="wrap">
        <p className="eyebrow rv">{faqKicker(locale)}</p>
        <h2 className="rv">{faqTitle(locale)}</h2>
        <p className="lead rv">{faqLede(locale)}</p>

        <div className="faq-list">
          {FAQ.map((item, i) => (
            <details className="faq-item rv" key={i}>
              <summary>
                <span>{pick(locale, item.q.tr, item.q.en)}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{pick(locale, item.a.tr, item.a.en)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
