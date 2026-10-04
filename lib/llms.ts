import "server-only";
import { groq } from "./groq";
import { sanityClient, sanityConfigured } from "./sanity";
import { COMPANY, SITE_URL } from "./site";
import { ROUTES, type Bi, type Locale } from "./i18n";
import { PRODUCT_PAGES } from "./productPages";
import { SERVICE_PAGES } from "./servicePages";
import { SERVICE_EXTRAS } from "./serviceExtras";
import { SECTOR_PAGES } from "./sectorPages";
import { EXPERTISE } from "./expertise";
import { COUNTRY_NAMES_EN } from "./data";

/* llms.txt / llms-full.txt — yapay zekâ asistanları ve arama ajanları için düz metin özet.
   Kısa sürüm (llms.txt) yol haritasıdır; tam sürüm sitedeki bütün çözüm, sektör, uzmanlık,
   vaka ve SSS içeriğini tek belgede verir. İçerik Sanity'den okunur: Studio'da yapılan
   değişiklik ek iş gerektirmeden buraya da yansır. */

type RawFaq = { question_tr?: string; question_en?: string; answer_tr?: string; answer_en?: string };
type RawSolution = {
  slug: string;
  name_tr: string;
  name_en: string;
  module: string;
  short_tr?: string;
  short_en?: string;
  body_tr?: string;
  body_en?: string;
  benefits_tr?: string[];
  benefits_en?: string[];
  technical_tr?: string;
  technical_en?: string;
  audience_tr?: string;
  audience_en?: string;
  faqs?: RawFaq[];
};
type RawRef = {
  slug: string;
  name: string;
  sector_tr?: string;
  sector_en?: string;
  countries?: string[];
  blurb_tr?: string;
  blurb_en?: string;
  body_tr?: string;
  body_en?: string;
};
type RawPost = { slug: string; title_tr?: string; title_en?: string; excerpt_tr?: string; excerpt_en?: string; publishedAt?: string };
export type LlmsData = { solutions: RawSolution[]; refs: RawRef[]; posts: RawPost[] };

const LLMS_QUERY = groq`{
  "solutions": *[_type == "solution" && defined(slug.current)] | order(order asc, name_tr asc){
    "slug": slug.current, name_tr, name_en, module, short_tr, short_en,
    "body_tr": pt::text(coalesce(body_tr, [])), "body_en": pt::text(coalesce(body_en, [])),
    benefits_tr, benefits_en, technical_tr, technical_en, audience_tr, audience_en,
    "faqs": faqs[]{question_tr, question_en, answer_tr, answer_en}
  },
  "refs": *[_type == "clientReference" && defined(slug.current)] | order(order asc, name asc){
    "slug": slug.current, name, sector_tr, sector_en, countries, blurb_tr, blurb_en,
    "body_tr": pt::text(coalesce(body_tr, [])), "body_en": pt::text(coalesce(body_en, []))
  },
  "posts": *[_type == "post" && defined(slug.current) && seo.noIndex != true && defined(publishedAt)] | order(publishedAt desc){
    "slug": slug.current, title_tr, title_en, excerpt_tr, excerpt_en, publishedAt
  }
}`;

export async function getLlmsData(): Promise<LlmsData> {
  if (sanityConfigured && sanityClient) {
    try {
      const d = await sanityClient.fetch<LlmsData>(LLMS_QUERY);
      if (d?.solutions) return { solutions: d.solutions || [], refs: d.refs || [], posts: (d.posts || []).filter((p) => p.slug !== "testing") };
    } catch {
      /* Sanity erişilemezse yalnız koddaki içerikle devam */
    }
  }
  return { solutions: [], refs: [], posts: [] };
}

const u = (path: string) => SITE_URL + path;
const pair = (key: keyof typeof ROUTES) => `${u(ROUTES[key].tr)} (TR) · ${u(ROUTES[key].en)} (EN)`;
const modName = (m: string, l: Locale) => (m === "E" ? (l === "tr" ? "E-Dönüşüm" : "E-Transformation") : m);
const clean = (s?: string) => (s || "").replace(/\r/g, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
const CASE_MIN = 200;
// Çözüm gövdelerindeki ara başlıklar düz metne inerken Markdown başlığı olarak korunur.
const BODY_HEADS = new Set([
  "Hangi sorunu çözer?",
  "Çözüm nasıl çalışır?",
  "Uygulamada neler değişir?",
  "What problem does it solve?",
  "How does the solution work?",
  "What changes in practice?",
]);
const mdBody = (s: string) =>
  s
    .split("\n")
    .map((ln) => (BODY_HEADS.has(ln.trim()) ? `#### ${ln.trim()}` : ln))
    .join("\n");

/** Kısa yol haritası: /llms.txt */
export function buildLlmsIndex(d: LlmsData): string {
  const solCount = d.solutions.length || 55;
  const cases = d.refs.filter((r) => (r.body_tr || "").length > CASE_MIN || (r.body_en || "").length > CASE_MIN);
  const eSols = d.solutions.filter((s) => s.module === "E");
  const lines: string[] = [];
  lines.push(
    `# Conforcus`,
    ``,
    `> ${COMPANY.legalName} is a boutique SAP consultancy founded in 2015 in Istanbul, Türkiye, with core depth in`,
    `> SAP finance modules (FI, CO, PS, FM, TRM, Cash Management). Services: SAP support (AMS), S/4HANA`,
    `> transformations, global rollout, and product & solution development — plus a catalog of ${solCount} ready-made`,
    `> SAP solutions and Confiq, an AI product family for SAP. 130+ clients, 40+ end-to-end projects, 50+ countries`,
    `> on 6 continents, 70+ consultants, 95% client retention. Tagline: "${COMPANY.slogan}"`,
    `> Site language: Turkish at the root (/), English under /en/.`,
    ``,
    `Full machine-readable content (every solution, industry, module, case page and FAQ in one document):`,
    `- English: ${u("/llms-full.txt")}`,
    `- Türkçe: ${u("/llms-full-tr.txt")}`,
    ``,
    `## Services`,
    `- [SAP Support Services (AMS)](${u(ROUTES["hizmet-sap-ams"].en)}): SLA-backed application management for live ECC and S/4HANA systems — incidents, period-end close, regulatory changes, continuous improvement. Türkçe: ${u(ROUTES["hizmet-sap-ams"].tr)}`,
    `- [S/4HANA Transformations](${u(ROUTES["hizmet-s4hana"].en)}): greenfield, brownfield and bluefield conversions with finance depth, Türkiye localization and hypercare; RISE, GROW or on-premise. Türkçe: ${u(ROUTES["hizmet-s4hana"].tr)}`,
    `- [Global Rollout](${u(ROUTES["hizmet-rollout"].en)}): country-by-country deployment of a corporate SAP template with localization and IFRS. Türkçe: ${u(ROUTES["hizmet-rollout"].tr)}`,
    `- [Product & Solution Development](${u(ROUTES["hizmet-urun"].en)}): custom development with ABAP, Fiori and BTP; ready-made solution packages. Türkçe: ${u(ROUTES["hizmet-urun"].tr)}`,
    `- [All services](${u(ROUTES.hizmetler.en)}) · Türkçe: ${u(ROUTES.hizmetler.tr)}`,
    ``,
    `## Expertise and industries`,
    `- [SAP module expertise](${u(ROUTES.uzmanlik.en)}): FI, CO, PS, FM, TRM, Cash Management, MM, SD, ABAP, Fiori, BTP and AI — what Conforcus does in each. Türkçe: ${u(ROUTES.uzmanlik.tr)}`,
    `- [Industries](${u(ROUTES.sektorler.en)}): ${SECTOR_PAGES.map((s) => s.name.en).join(", ") || "industry pages"}. Türkçe: ${u(ROUTES.sektorler.tr)}`,
    ...SECTOR_PAGES.map((s) => `  - [${s.name.en}](${u(`${ROUTES.sektorler.en}/${s.slug.en}`)}) · Türkçe: ${u(`${ROUTES.sektorler.tr}/${s.slug.tr}`)}`),
    ``,
    `## Ready-made SAP solutions`,
    `- [Solution catalog](${u(ROUTES.cozumler.en)}): ${solCount} field-proven solutions across FI, CO, MM, SD, PS, FM and Turkish e-transformation. Türkçe: ${u(ROUTES.cozumler.tr)}`,
    `- [E-solutions hub](${u(ROUTES["e-cozumler"].en)}): Turkish e-transformation inside SAP (GİB): ${eSols.map((s) => s.name_tr).join(", ") || "e-Fatura, e-Arşiv, e-İrsaliye, e-Defter"}. Türkçe: ${u(ROUTES["e-cozumler"].tr)}`,
    `- [Inflation accounting in SAP (IAS 29 / TMS 29)](${u(`${ROUTES.cozumler.en}/inflation-accounting`)}): statutory inflation adjustment inside SAP; live at 25+ companies. Türkçe: ${u(`${ROUTES.cozumler.tr}/inflation-accounting`)}`,
    ...d.solutions
      .filter((s) => s.slug !== "inflation-accounting")
      .map((s) => {
        const pack = PRODUCT_PAGES[s.slug];
        const name = pack ? pack.name.en : s.name_en;
        const short = clean(pack ? pack.short.en : s.short_en);
        return `- [${name}](${u(`${ROUTES.cozumler.en}/${s.slug}`)}) (SAP ${modName(s.module, "en")}; Türkçe: ${pack ? pack.name.tr : s.name_tr})${short ? ` — ${short}` : ""}`;
      }),
    ``,
    `## Confiq — AI product family for SAP`,
    `- [Confiq](${u(ROUTES.confiq.en)}) · Türkçe: ${u(ROUTES.confiq.tr)}`,
    `- Confiq Decode: natural-language questions answered from SAP data (scopes: SAP, Finance, Supply).`,
    `- Confiq Predict: machine-learning forecasts on historical SAP data (scopes: Cash, Sales, Margin).`,
    `- Confiq Cortex: combines Decode and Predict to show the root cause behind a forecast deviation.`,
    `- Confiq Bridge: connector that carries data between Confiq products and SAP modules.`,
    `- Confiq Scan: SAP system analysis across master data, transaction data, process health and custom development.`,
    `- [Free SAP analysis](${u(ROUTES.analiz.en)}): 5-minute assessment, written expert note within 48 hours. Türkçe: ${u(ROUTES.analiz.tr)}`,
    ``,
    `## References and case pages`,
    `- [References](${u(ROUTES.referanslar.en)}): ${d.refs.length || "130+"} client brands by industry, with a project map. Türkçe: ${u(ROUTES.referanslar.tr)}`,
    ...cases.map((r) => `- [${r.name}](${u(`${ROUTES.referanslar.en}/${r.slug}`)})${r.sector_en ? ` (${r.sector_en})` : ""}${r.blurb_en ? ` — ${clean(r.blurb_en)}` : ""}`),
    ``,
    `## Company`,
    `- [About](${u(ROUTES.hakkimizda.en)}) · Türkçe: ${u(ROUTES.hakkimizda.tr)}`,
    `- [Conforcus Way — culture and careers](${u(ROUTES["conforcus-way"].en)}) · Türkçe: ${u(ROUTES["conforcus-way"].tr)}`,
    `- [Team](${u(ROUTES.ekip.en)}) · Türkçe: ${u(ROUTES.ekip.tr)}`,
    `- [Blog](${u(ROUTES.blog.en)}) · Türkçe: ${u(ROUTES.blog.tr)}`,
    `- [Contact](${u(ROUTES.iletisim.en)}) · Türkçe: ${u(ROUTES.iletisim.tr)}`,
    ``,
    `## Contact`,
    `- Email: ${COMPANY.email}`,
    `- Careers: ${COMPANY.hrEmail}`,
    `- Phone: ${COMPANY.telephoneDisplay}`,
    `- LinkedIn: ${COMPANY.linkedin}`,
    `- Address: ${COMPANY.addressLine}, Türkiye`,
    ``
  );
  return lines.join("\n");
}

/** Tam içerik: /llms-full.txt (EN) ve /llms-full-tr.txt (TR) */
export function buildLlmsFull(d: LlmsData, l: Locale): string {
  const t = (b: Bi | undefined) => (b ? clean(b[l]) : "");
  const L = (tr: string, en: string) => (l === "tr" ? tr : en);
  const loc = (tr?: string, en?: string) => clean((l === "tr" ? tr : en) || tr || en || "");
  const out: string[] = [];
  const p = (...xs: string[]) => out.push(...xs);
  const solCount = d.solutions.length || 55;

  p(
    `# Conforcus — ${L("tam içerik (yapay zekâ asistanları için)", "full content (for AI assistants)")}`,
    ``,
    L(
      `> ${COMPANY.legalName}, 2015'te İstanbul'da kurulan butik bir SAP danışmanlık şirketidir. Çekirdek uzmanlığı SAP finans modülleridir (FI, CO, PS, FM, TRM, Nakit Yönetimi). Hizmetleri: SAP destek (AMS), S/4HANA dönüşümleri, global rollout ve ürün & çözüm geliştirme. Ayrıca ${solCount} hazır SAP çözümünden oluşan bir kataloğu ve SAP için yapay zekâ ürün ailesi Confiq'i sunar.`,
      `> ${COMPANY.legalName} is a boutique SAP consultancy founded in 2015 in Istanbul, Türkiye. Its core expertise is SAP finance (FI, CO, PS, FM, TRM, Cash Management). Services: SAP support (AMS), S/4HANA transformations, global rollout, and product & solution development. It also offers a catalog of ${solCount} ready-made SAP solutions and Confiq, an AI product family for SAP.`
    ),
    ``,
    L(`Bu belge ${SITE_URL} sitesindeki içeriğin düz metin halidir. Kaynak gösterirken ilgili sayfanın adresini kullanın.`, `This document is the plain-text form of the content on ${SITE_URL}. When citing, use the URL of the relevant page.`),
    L(`İngilizce sürüm: ${u("/llms-full.txt")} · Kısa yol haritası: ${u("/llms.txt")}`, `Turkish version: ${u("/llms-full-tr.txt")} · Short index: ${u("/llms.txt")}`),
    ``,
    `## ${L("Şirket bilgileri", "Company facts")}`,
    `- ${L("Ticari unvan", "Legal name")}: ${COMPANY.legalName}`,
    `- ${L("Kuruluş", "Founded")}: 2015, İstanbul`,
    `- ${L("Merkez", "Headquarters")}: ${COMPANY.addressLine}, Türkiye`,
    `- ${L("İkinci ofis", "Second office")}: Samsun`,
    `- ${L("Slogan", "Tagline")}: ${COMPANY.slogan}`,
    `- ${L("Müşteri", "Clients")}: 130+`,
    `- ${L("Uçtan uca tamamlanan proje", "End-to-end projects completed")}: 40+`,
    `- ${L("Proje yapılan ülke", "Countries with project experience")}: 50+ (${L("6 kıta", "6 continents")})`,
    `- ${L("Danışman", "Consultants")}: 70+`,
    `- ${L("Müşteri devamlılığı", "Client retention")}: ${L("%95", "95%")}`,
    `- ${L("Hazır SAP çözümü", "Ready-made SAP solutions")}: ${solCount}`,
    `- ${L("Enflasyon muhasebesi paketi", "Inflation accounting suite")}: ${L("25'ten fazla şirkette canlı", "live at 25+ companies")}`,
    `- ${L("Yapay zekâ ürün ailesi", "AI product family")}: Confiq (Decode, Predict, Cortex, Bridge, Scan)`,
    `- ${L("İletişim", "Contact")}: ${COMPANY.email} · ${COMPANY.telephoneDisplay} · ${COMPANY.linkedin}`,
    `- ${L("Hakkımızda", "About")}: ${u(ROUTES.hakkimizda[l])}`,
    ``
  );

  // ── Hizmetler
  p(`## ${L("Hizmetler", "Services")}`, `${L("Genel bakış", "Overview")}: ${u(ROUTES.hizmetler[l])}`, ``);
  for (const s of SERVICE_PAGES) {
    p(`### ${t(s.h1)}`, `URL: ${u(ROUTES[s.key][l])}`, ``, t(s.lead), ``, `${L("Kimler için", "Who it is for")}: ${t(s.icp)}`, ``, `${t(s.stepsTitle)}:`);
    s.steps.forEach((st, i) => p(`${i + 1}. ${t(st)}`));
    p(``);
    for (const sec of SERVICE_EXTRAS[s.key]?.sections || []) {
      p(`#### ${t(sec.h2)}`);
      (sec.paras || []).forEach((x) => p(t(x), ``));
      (sec.bullets || []).forEach((x) => p(`- ${t(x)}`));
      if (sec.bullets?.length) p(``);
    }
    if (s.faqs.length) {
      p(`#### ${L("Sık sorulan sorular", "Frequently asked questions")}`);
      s.faqs.forEach((f) => p(`**${t(f.q)}**`, t(f.a), ``));
    }
  }

  // ── Modül uzmanlığı
  if (EXPERTISE.items.length) {
    p(`## ${L("SAP modül uzmanlığı", "SAP module expertise")}`, `URL: ${u(ROUTES.uzmanlik[l])}`, ``, t(EXPERTISE.page.lead), ``);
    for (const g of EXPERTISE.page.groups) {
      p(`### ${t(g.name)}`, t(g.blurb), ``);
      for (const it of EXPERTISE.items.filter((x) => x.group === g.key)) {
        p(`#### ${it.code} — ${t(it.name)}`, t(it.intro));
        it.strengths.forEach((x) => p(`- ${t(x)}`));
        if (it.proof) p(``, `${L("Sahadan", "From the field")}: ${t(it.proof)}`);
        p(``);
      }
    }
    if (EXPERTISE.page.faqs.length) {
      p(`### ${L("Sık sorulan sorular", "Frequently asked questions")}`);
      EXPERTISE.page.faqs.forEach((f) => p(`**${t(f.q)}**`, t(f.a), ``));
    }
  }

  // ── Sektörler
  if (SECTOR_PAGES.length) {
    p(`## ${L("Sektörler", "Industries")}`, `URL: ${u(ROUTES.sektorler[l])}`, ``);
    for (const s of SECTOR_PAGES) {
      p(`### ${t(s.name)}`, `URL: ${u(`${ROUTES.sektorler[l]}/${s.slug[l]}`)}`, ``, t(s.lead), ``);
      s.intro.forEach((x) => p(t(x), ``));
      p(`${t(s.challenges.h)}:`);
      s.challenges.items.forEach((x) => p(`- ${t(x)}`));
      p(``, `${t(s.approach.h)}:`);
      s.approach.items.forEach((x) => p(`- ${t(x)}`));
      p(``);
      if (s.proof.length) {
        p(`${L("Sahadan", "From the field")}:`);
        s.proof.forEach((x) => p(t(x)));
        p(``);
      }
      s.faqs.forEach((f) => p(`**${t(f.q)}**`, t(f.a), ``));
    }
  }

  // ── Confiq
  p(
    `## Confiq — ${L("SAP için yapay zekâ ürün ailesi", "AI product family for SAP")}`,
    `URL: ${u(ROUTES.confiq[l])}`,
    ``,
    L(
      "Confiq iki motor üzerine kurulu: SAP verisine doğal dille erişim sağlayan Decode ve geleceğe dönük tahmin üreten Predict. Cortex bu iki motoru birlikte çalıştırır, Bridge aralarındaki veri akışını sağlar, Scan ise başlangıç noktasıdır. Ürünler hem S/4HANA hem SAP ECC üzerinde çalışır.",
      "Confiq is built on two engines: Decode, which gives natural-language access to SAP data, and Predict, which produces forward-looking forecasts. Cortex runs the two engines together, Bridge carries the data between them, and Scan is the starting point. The products run on both S/4HANA and SAP ECC."
    ),
    ``,
    L(
      "- Confiq Decode: Kullanıcı sorusunu Türkçe ya da İngilizce yazar; Decode cevabın hangi SAP tablolarında olduğunu belirler, sorguyu çalıştırır ve sonucu iş diliyle sunar. Kapsamlar: SAP (FI, CO, MM, SD, PP, PS, TRM, CM), Finance (FI, CO, TRM, CM), Supply (MM, SD, PP).",
      "- Confiq Decode: the user types a question in Turkish or English; Decode works out which SAP tables hold the answer, runs the query and presents the result in business language. Scopes: SAP (FI, CO, MM, SD, PP, PS, TRM, CM), Finance (FI, CO, TRM, CM), Supply (MM, SD, PP)."
    ),
    L(
      "- Confiq Predict: geçmiş SAP verisi üzerine kurulan makine öğrenmesi modelleriyle tahmin. Kapsamlar: Cash (nakit akışı), Sales (satış ve talep), Margin (kârlılık).",
      "- Confiq Predict: forecasting with machine-learning models built on historical SAP data. Scopes: Cash (cash flow), Sales (sales and demand), Margin (profitability)."
    ),
    L(
      "- Confiq Cortex: Predict bir sapma öngördüğünde bunu Decode'un sağladığı bağlamla birleştirir ve kök nedeni gösterir. En az bir Decode ve bir Predict kapsamı gerekir.",
      "- Confiq Cortex: when Predict foresees a deviation, Cortex combines it with the context Decode provides and shows the root cause. Requires at least one Decode scope and one Predict scope."
    ),
    L("- Confiq Bridge: Confiq ürünleri ve SAP modülleri arasında veriyi taşıyan bağlayıcı.", "- Confiq Bridge: a connector that carries data between Confiq products and SAP modules."),
    L(
      "- Confiq Scan: SAP sistemini dört alanda inceler: ana veri kalitesi, işlem verisi kalitesi, süreç sağlığı, geliştirme ve uyarlama. Bulgular önceliklendirilir ve her biri için iyileştirme önerisi verilir.",
      "- Confiq Scan: examines the SAP system in four areas: master data quality, transaction data quality, process health, development and customisation. Findings are prioritised and each comes with an improvement recommendation."
    ),
    L(
      `- Başlangıç: ücretsiz SAP analizi — birkaç soruluk değerlendirme, 48 saat içinde yazılı uzman notu: ${u(ROUTES.analiz.tr)}`,
      `- Starting point: the free SAP analysis — a short assessment and a written expert note within 48 hours: ${u(ROUTES.analiz.en)}`
    ),
    ``
  );

  // ── Çözüm kataloğu
  if (d.solutions.length) {
    p(`## ${L(`Hazır SAP çözümleri (${solCount})`, `Ready-made SAP solutions (${solCount})`)}`, `${L("Katalog", "Catalog")}: ${u(ROUTES.cozumler[l])} · ${L("E-dönüşüm", "E-transformation")}: ${u(ROUTES["e-cozumler"][l])}`, ``);
    for (const s of d.solutions) {
      const pack = PRODUCT_PAGES[s.slug];
      const name = pack ? pack.name[l] : loc(s.name_tr, s.name_en);
      p(`### ${name} (SAP ${modName(s.module, l)})`, `URL: ${u(`${ROUTES.cozumler[l]}/${s.slug}`)}`);
      if (l === "en" && s.name_tr) p(`Turkish name: ${s.name_tr}`);
      p(``);
      const short = pack ? pack.short[l] : loc(s.short_tr, s.short_en);
      if (short) p(short, ``);
      if (pack) {
        p(t(pack.intro), ``);
        for (const sec of pack.sections) {
          p(`#### ${t(sec.h2)}`);
          sec.paras.forEach((x) => p(t(x), ``));
        }
      } else {
        const body = loc(s.body_tr, s.body_en);
        if (body) p(mdBody(body), ``);
      }
      const benefits = (l === "tr" ? s.benefits_tr : s.benefits_en) || s.benefits_tr || [];
      if (benefits.length) {
        p(`${L("Kazanımlar", "Benefits")}:`);
        benefits.forEach((b) => p(`- ${clean(b)}`));
        p(``);
      }
      const technical = loc(s.technical_tr, s.technical_en);
      if (technical) p(`${L("SAP'ta nereye oturur", "Where it sits in SAP")}: ${technical}`, ``);
      const audience = loc(s.audience_tr, s.audience_en);
      if (audience) p(`${L("Kimler için", "Who it is for")}: ${audience}`, ``);
      const faqs = [
        ...(s.faqs || []).map((f) => ({ q: loc(f.question_tr, f.question_en), a: loc(f.answer_tr, f.answer_en) })),
        ...(pack?.faqs || []).map((f) => ({ q: t(f.q), a: t(f.a) })),
      ].filter((f) => f.q && f.a);
      const seen = new Set<string>();
      for (const f of faqs) {
        if (seen.has(f.q)) continue;
        seen.add(f.q);
        p(`**${f.q}**`, f.a, ``);
      }
    }
  }

  // ── Referanslar
  if (d.refs.length) {
    const cases = d.refs.filter((r) => (r.body_tr || "").length > CASE_MIN || (r.body_en || "").length > CASE_MIN);
    p(`## ${L(`Referanslar (${d.refs.length} marka)`, `References (${d.refs.length} brands)`)}`, `URL: ${u(ROUTES.referanslar[l])}`, ``);
    if (cases.length) {
      p(`### ${L("Vaka sayfaları", "Case pages")}`, ``);
      for (const r of cases) {
        const sector = loc(r.sector_tr, r.sector_en);
        const countries = (r.countries || []).map((c) => (l === "en" ? COUNTRY_NAMES_EN[c] || c : c)).join(", ");
        p(`#### ${r.name}${sector ? ` — ${sector}` : ""}`, `URL: ${u(`${ROUTES.referanslar[l]}/${r.slug}`)}`);
        if (countries) p(`${L("Ülkeler", "Countries")}: ${countries}`);
        p(``);
        const blurb = loc(r.blurb_tr, r.blurb_en);
        if (blurb) p(blurb, ``);
        const body = loc(r.body_tr, r.body_en);
        if (body) p(body, ``);
      }
    }
    const bySector = new Map<string, string[]>();
    for (const r of d.refs) {
      const k = loc(r.sector_tr, r.sector_en) || L("Diğer", "Other");
      bySector.set(k, [...(bySector.get(k) || []), r.name]);
    }
    p(`### ${L("Sektöre göre markalar", "Brands by industry")}`);
    [...bySector.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0], l)).forEach(([k, v]) => p(`- ${k}: ${v.join(", ")}`));
    p(``);
    const withBlurb = d.refs.filter((r) => !cases.includes(r) && loc(r.blurb_tr, r.blurb_en));
    if (withBlurb.length) {
      p(`### ${L("Kısa notlar", "Short notes")}`);
      withBlurb.forEach((r) => p(`- ${r.name}: ${loc(r.blurb_tr, r.blurb_en)}`));
      p(``);
    }
  }

  // ── Blog
  if (d.posts.length) {
    p(`## Blog`, `URL: ${u(ROUTES.blog[l])}`, ``);
    d.posts.forEach((x) => {
      const title = loc(x.title_tr, x.title_en);
      const ex = loc(x.excerpt_tr, x.excerpt_en);
      p(`- ${title} — ${u(`${ROUTES.blog[l]}/${x.slug}`)}${x.publishedAt ? ` (${x.publishedAt.slice(0, 10)})` : ""}${ex ? `: ${ex}` : ""}`);
    });
    p(``);
  }

  p(
    `## ${L("İletişim", "Contact")}`,
    `- ${L("E-posta", "Email")}: ${COMPANY.email}`,
    `- ${L("Kariyer", "Careers")}: ${COMPANY.hrEmail} · ${u(ROUTES["conforcus-way"][l])}`,
    `- ${L("Telefon", "Phone")}: ${COMPANY.telephoneDisplay}`,
    `- LinkedIn: ${COMPANY.linkedin}`,
    `- ${L("Adres", "Address")}: ${COMPANY.addressLine}, Türkiye`,
    `- ${L("Ücretsiz SAP analizi", "Free SAP analysis")}: ${u(ROUTES.analiz[l])}`,
    ``
  );
  return out.join("\n");
}
