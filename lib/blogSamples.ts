// Blog örnek yazıları — Sanity yapılandırılana kadar geri-dönüş içeriği.
// Gövde, gerçek Sanity Portable Text ile aynı yapıda (tek renderer kullanılır).

type PTSpan = { _type: "span"; _key: string; text: string; marks: string[] };
export type PTBlock = { _type: "block"; _key: string; style: string; markDefs: never[]; children: PTSpan[] };

let _k = 0;
const key = () => `s${_k++}`;
const p = (text: string): PTBlock => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });
const h = (text: string): PTBlock => ({ _type: "block", _key: key(), style: "h2", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });

export type SamplePost = {
  slug: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
  category: string;
  publishedAt: string; // ISO
  readMins: number;
  author: { name: string; role_tr: string; role_en: string };
  body: { tr: PTBlock[]; en: PTBlock[] };
};

const AUTHOR = { name: "Conforcus", role_tr: "SAP Danışmanlığı", role_en: "SAP Consulting" };

export const SAMPLE_POSTS: SamplePost[] = [
  {
    slug: "s4hana-gecisinde-5-kritik-karar",
    title: {
      tr: "S/4HANA'ya geçişte finans ekiplerini bekleyen 5 kritik karar",
      en: "5 critical decisions awaiting finance teams in S/4HANA migration",
    },
    excerpt: {
      tr: "Dönüşüm projelerinde en sık ertelenen ama en pahalıya mal olan kararlar finansta veriliyor.",
      en: "The most postponed — and most costly — decisions in transformation projects are made in finance.",
    },
    category: "S/4HANA",
    publishedAt: "2026-05-28",
    readMins: 5,
    author: AUTHOR,
    body: {
      tr: [
        p("S/4HANA dönüşümü teknik bir migrasyon gibi görünse de gerçek riskin yoğunlaştığı yer finans modülleridir. Greenfield mi brownfield mi sorusu çoğu zaman ilk gündeme gelir; oysa asıl belirleyici kararlar onun ardından gelir."),
        h("1. Yeni General Ledger ve belge yapısı"),
        p("Universal Journal (ACDOCA) ile FI ve CO tek tabloda birleşir. Bu, raporlamayı sadeleştirir ama mevcut özelleştirmelerin ve mutabakat süreçlerinin yeniden tasarlanmasını gerektirir."),
        h("2. Müşteri ve satıcı master verisi (Business Partner)"),
        p("BP zorunluluğu, yıllardır biriken master veriyi temizlemek için bir fırsattır; ertelenirse go-live'da en çok zaman kaybettiren konu hâline gelir."),
        p("Kalan üç karar — para birimi yapısı, yeni varlık muhasebesi ve raporlama stratejisi — birbirini etkiler. Bu yazı örnek içeriktir; yayın planı içerik stratejisiyle birlikte netleşecektir."),
      ],
      en: [
        p("S/4HANA migration may look like a technical exercise, but the real risk concentrates in the finance modules. Greenfield vs. brownfield is usually the first question raised — yet the decisions that truly shape the outcome come right after it."),
        h("1. New General Ledger and document structure"),
        p("With the Universal Journal (ACDOCA), FI and CO merge into a single table. This simplifies reporting but requires redesigning existing customizations and reconciliation processes."),
        h("2. Customer and vendor master data (Business Partner)"),
        p("The BP requirement is an opportunity to clean up years of accumulated master data; postpone it and it becomes the biggest time sink at go-live."),
        p("The remaining three decisions — currency structure, new asset accounting and reporting strategy — all influence one another. This is sample content; the publishing plan will follow the content strategy."),
      ],
    },
  },
  {
    slug: "global-rollout-lokalizasyon-vietnam",
    title: {
      tr: "Global rollout'ta lokalizasyon: Vietnam'dan öğrendiklerimiz",
      en: "Localization in global rollouts: what Vietnam taught us",
    },
    excerpt: {
      tr: "Bir ülke şablonunu yerelleştirmek teknik bir iş değil, kültürel bir iştir.",
      en: "Localizing a country template is not a technical job — it's a cultural one.",
    },
    category: "Global Rollout",
    publishedAt: "2026-04-12",
    readMins: 7,
    author: AUTHOR,
    body: {
      tr: [
        p("Kurumsal bir SAP şablonunu yeni bir ülkeye taşırken en büyük yanılgı, işin yalnızca vergi kodları ve raporlama formatlarından ibaret olduğunu sanmaktır. Vietnam rollout'umuz bunun aksini gösterdi."),
        h("Yerel mevzuat, küresel şablon"),
        p("Fatura numaralandırma, KDV beyanı ve yerel para birimi raporlaması elbette önemli. Ama asıl fark, onay süreçlerinin ve yetki yapısının yerel iş kültürüne uyarlanmasında ortaya çıktı."),
        h("Çok dilli ekip avantajı"),
        p("Merkez ile ülke ekibi arasındaki şablon yönetişimini canlı tutmak, go-live'dan çok sonra bile değer üretmeye devam ediyor. Bu yazı örnek içeriktir."),
      ],
      en: [
        p("When moving a corporate SAP template to a new country, the biggest misconception is assuming the work is only about tax codes and reporting formats. Our Vietnam rollout proved otherwise."),
        h("Local regulation, global template"),
        p("Invoice numbering, VAT declaration and local-currency reporting matter, of course. But the real difference emerged in adapting approval flows and authorization structures to the local business culture."),
        h("The multilingual-team advantage"),
        p("Keeping template governance alive between HQ and the country team keeps producing value long after go-live. This is sample content."),
      ],
    },
  },
  {
    slug: "sap-verinizle-konusmak",
    title: {
      tr: "SAP verinizle konuşmak: kurumsal yapay zekâda yeni dönem",
      en: "Talking to your SAP data: a new era in enterprise AI",
    },
    excerpt: {
      tr: "Doğal dil arayüzleri ERP kullanımını kökten değiştiriyor.",
      en: "Natural language interfaces are fundamentally changing how we use ERP.",
    },
    category: "Confiq AI",
    publishedAt: "2026-03-05",
    readMins: 6,
    author: AUTHOR,
    body: {
      tr: [
        p("Yıllarca SAP kullanmak, doğru ekranı ve doğru işlem kodunu bilmek demekti. Doğal dil arayüzleri bu denklemi tersine çeviriyor: artık soruyu sormak yeterli."),
        h("Sorudan içgörüye"),
        p("\"Bu ay en çok geciken müşteri kim?\" gibi bir soru, saniyeler içinde tablo ve grafiğe dönüşüyor. Confiq Decode tam da bunun için tasarlandı."),
        p("Önümüzdeki dönemde öngörü (Predict) ve karar zekâsı (Cortex) katmanlarıyla bu deneyim derinleşecek. Bu yazı örnek içeriktir."),
      ],
      en: [
        p("For years, using SAP meant knowing the right screen and the right transaction code. Natural language interfaces invert that equation: now it's enough to just ask the question."),
        h("From question to insight"),
        p('A question like "Which customer is most overdue this month?" turns into a table and a chart within seconds. Confiq Decode was built for exactly this.'),
        p("In the coming period, the foresight (Predict) and decision-intelligence (Cortex) layers will deepen this experience. This is sample content."),
      ],
    },
  },
];
