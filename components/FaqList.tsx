import { pick, type Locale } from "@/lib/i18n";

export type Faq = { q: { tr: string; en: string }; a: { tr: string; en: string } };

export function localizedFaqs(locale: Locale, faqs: Faq[]): { q: string; a: string }[] {
  return faqs.map((f) => ({ q: pick(locale, f.q.tr, f.q.en), a: pick(locale, f.a.tr, f.a.en) }));
}

export default function FaqList({ locale, faqs, title }: { locale: Locale; faqs: Faq[]; title?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="faq-sec">
      {title ? <h2>{title}</h2> : <h2>{pick(locale, "Sık sorulan sorular", "Frequently asked questions")}</h2>}
      <div className="faq-list">
        {faqs.map((f, i) => (
          <details key={i} className="faq-item">
            <summary>{pick(locale, f.q.tr, f.q.en)}</summary>
            <p>{pick(locale, f.a.tr, f.a.en)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
