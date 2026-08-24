import type { Locale } from "./i18n";

/* Ana sayfa SSS — hem görünür bölüm hem FAQPage JSON-LD tek kaynaktan beslenir.
   Sorular gerçek satış görüşmelerinde en çok sorulanlar; aynı zamanda
   "SAP danışmanlık", "S/4HANA geçiş", "SAP destek (AMS)" gibi aramaları hedefler. */

export type FaqItem = { q: { tr: string; en: string }; a: { tr: string; en: string } };

export const FAQ: FaqItem[] = [
  {
    q: {
      tr: "SAP danışmanlığı hizmetleriniz neleri kapsıyor?",
      en: "What do your SAP consulting services cover?",
    },
    a: {
      tr: "Dört ana başlıkta çalışıyoruz: sürekli SAP destek (AMS), S/4HANA dönüşümleri, çok ülkeli global rollout projeleri ve şirketinize özel geliştirme. FI, CO, MM, SD, PS ve FM modüllerinde uçtan uca danışmanlık veriyoruz; ihtiyacınız tek bir modülde iyileştirme de olabilir, tüm sistemin dönüşümü de.",
      en: "We work across four areas: ongoing SAP support (AMS), S/4HANA transformations, multi-country global rollouts, and custom development. We provide end-to-end consulting on the FI, CO, MM, SD, PS and FM modules — whether you need a single-module improvement or a full system transformation.",
    },
  },
  {
    q: {
      tr: "SAP ECC kullanıyoruz. S/4HANA'ya geçmek için son tarih ne?",
      en: "We are on SAP ECC. What is the deadline to move to S/4HANA?",
    },
    a: {
      tr: "SAP, ECC 6.0 için ana bakım desteğini 2027 sonunda bitiriyor; uzatılmış destek 2030'a kadar ek maliyetle sürüyor. Tipik bir dönüşüm hazırlıktan canlıya geçişe 9–18 ay alıyor, bu yüzden karar için zaman daralıyor. Geçişin ilk adımı sisteminizin hazırlık analizidir: hangi özel geliştirmeler taşınacak, hangileri sadeleştirilecek — bunu netleştirmeden takvim kurulmaz.",
      en: "SAP ends mainstream maintenance for ECC 6.0 at the end of 2027; extended support runs to 2030 at additional cost. A typical transformation takes 9–18 months from preparation to go-live, so the decision window is narrowing. The first step is a readiness assessment: which custom developments move across and which get simplified — no realistic timeline exists without that.",
    },
  },
  {
    q: {
      tr: "SAP destek (AMS) modeliniz nasıl çalışıyor?",
      en: "How does your SAP support (AMS) model work?",
    },
    a: {
      tr: "Sisteminizi tanıyan sabit bir danışman ekibi atanır; her talep SLA süreleriyle takip edilir. Günlük operasyonel destekten (hata çözümü, kullanıcı soruları, dönem sonu kapanış desteği) sürekli iyileştirmeye kadar uzanır. Kurum içi ekibiniz varsa modeli tamamlayıcı biçimde kurarız — yerine geçmek zorunda değiliz.",
      en: "You get a fixed consultant team that knows your system, with every request tracked against SLA targets. It spans daily operations — incident resolution, user questions, period-end close support — through to continuous improvement. If you have an in-house team, we design the model to complement it rather than replace it.",
    },
  },
  {
    q: {
      tr: "Çok ülkeli SAP rollout deneyiminiz var mı?",
      en: "Do you have multi-country SAP rollout experience?",
    },
    a: {
      tr: "Altı kıtada, 50'den fazla ülkede rollout projelerinde çalıştık. Kritik konu şablon (template) yönetimidir: merkezi süreç standardı ile ülke bazlı yasal gereklilikler arasındaki dengeyi kurmak. Yerel mevzuat, vergi, e-fatura ve raporlama farklarını merkezî şablonu bozmadan çözüyoruz.",
      en: "We have delivered rollout projects in more than 50 countries across six continents. The critical topic is template management: balancing a central process standard against country-specific legal requirements. We handle local regulation, tax, e-invoicing and reporting differences without breaking the central template.",
    },
  },
  {
    q: {
      tr: "Hazır çözüm kataloğunuz nedir, kurulumu ne kadar sürer?",
      en: "What is your ready-to-deploy solution catalogue and how long does it take?",
    },
    a: {
      tr: "Yıllar içinde sahada tekrar eden ihtiyaçları ürünleştirdik: mutabakat, avans onay süreci, dönemselleştirme, maliyet raporları, kredi yönetimi gibi 48'den fazla hazır SAP çözümü. Sıfırdan geliştirme yerine kurulup şirketinize uyarlandıkları için devreye alma süresi haftalarla ölçülür, aylarla değil.",
      en: "We productised the needs that recur in the field: over 48 ready-to-deploy SAP solutions covering reconciliation, advance approval, accruals, costing reports, credit management and more. Because they are configured and adapted rather than built from scratch, go-live is measured in weeks rather than months.",
    },
  },
  {
    q: {
      tr: "Confiq AI nedir, SAP verimizle nasıl çalışıyor?",
      en: "What is Confiq AI and how does it work with our SAP data?",
    },
    a: {
      tr: "Confiq, SAP uzmanlığımızın yazılıma dönüşmüş hali: SAP verinizi doğal dille sorgulamanızı sağlayan, rapor hazırlama yükünü azaltan yapay zekâ destekli ürün ailesi. Veriniz kendi sisteminizde kalır; Confiq üzerine bir okuma ve yorumlama katmanı ekler. Confiq Scan ise sisteminizin risk ve fırsat haritasını çıkarır.",
      en: "Confiq is our SAP expertise turned into software: an AI-powered product family that lets you query your SAP data in natural language and cuts the reporting burden. Your data stays in your own system; Confiq adds a reading and interpretation layer on top. Confiq Scan maps your system's risks and opportunities.",
    },
  },
  {
    q: {
      tr: "Ücretsiz SAP analizi tam olarak neyi kapsıyor?",
      en: "What exactly does the free SAP analysis cover?",
    },
    a: {
      tr: "Beş dakikalık bir değerlendirmeyle başlıyor: sürümünüz, destek modeliniz, kapanış süreniz, manuel yükünüz ve yapay zekâ olgunluğunuz. Cevaplarınıza göre önceliklendirilmiş bir odak listesi çıkarıyor, ardından bir danışmanımız bulguları sizinle birlikte yorumluyor. Taahhüt yok, kredi kartı istenmiyor; raporu 48 saat içinde iletiyoruz.",
      en: "It starts with a five-minute assessment: your version, support model, close duration, manual workload and AI maturity. Based on your answers it produces a prioritised focus list, then one of our consultants reviews the findings with you. No commitment, no credit card; we deliver the report within 48 hours.",
    },
  },
  {
    q: {
      tr: "Hangi sektörlerde çalışıyorsunuz ve nasıl başlıyoruz?",
      en: "Which industries do you work in and how do we start?",
    },
    a: {
      tr: "İlaç, hızlı tüketim, kozmetik, üretim, perakende ve hizmet dahil 30'dan fazla sektörde 130'u aşkın müşteriye hizmet veriyoruz. Başlangıç genelde kısa bir tanışma görüşmesi ve ücretsiz sistem analizidir; buradan çıkan bulgulara göre kapsamı ve takvimi birlikte belirliyoruz.",
      en: "We serve over 130 customers across more than 30 industries, including pharmaceuticals, FMCG, cosmetics, manufacturing, retail and services. We usually start with a short intro call and the free system analysis; we then define scope and timeline together based on what it surfaces.",
    },
  },
];

export const faqTitle = (l: Locale) => (l === "tr" ? "Sık sorulan sorular" : "Frequently asked questions");
export const faqKicker = (l: Locale) => (l === "tr" ? "SSS" : "FAQ");
export const faqLede = (l: Locale) =>
  l === "tr"
    ? "SAP yolculuğuna başlarken en çok sorulanlar. Aradığınızı bulamazsanız bize yazın; aynı gün dönüş yapıyoruz."
    : "The questions we hear most when a SAP journey begins. If yours isn't here, write to us — we reply the same day.";

// JSON-LD için düzleştirilmiş liste (components/JsonLd.tsx FaqJsonLd imzası).
export const faqForJsonLd = (l: Locale) => FAQ.map((f) => ({ q: l === "tr" ? f.q.tr : f.q.en, a: l === "tr" ? f.a.tr : f.a.en }));
