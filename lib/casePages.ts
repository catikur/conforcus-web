import type { PTBlock } from "./blogSamples";
import type { Bi } from "./i18n";

export type CasePage = {
  slug: string;
  name: string;
  sector: Bi;
  countries: string[];
  blurb: Bi;
  body: { tr: PTBlock[]; en: PTBlock[] };
};

let _k = 0;
const key = () => `c${_k++}`;
const p = (text: string): PTBlock => ({
  _type: "block",
  _key: key(),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});
const h = (text: string): PTBlock => ({
  _type: "block",
  _key: key(),
  style: "h2",
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

export const CASE_FALLBACKS: CasePage[] = [
  {
    slug: "santa-farma",
    name: "Santa Farma",
    sector: { tr: "İlaç", en: "Pharmaceutical" },
    countries: ["Türkiye"],
    blurb: { tr: "SLA AMS hizmetleri", en: "SLA AMS services" },
    body: {
      tr: [
        p("Santa Farma, 1944’ten beri Türkiye’de faaliyet gösteren bir ilaç şirketidir. Merkezi İstanbul’dadır. Kamuya açık kaynaklarda üretim, ruhsat ve tedavi alanları anlatılır; bu sayfada uydurma ciro, kullanıcı veya ‘tasarruf’ rakamı yoktur."),
        h("Conforcus’un rolü"),
        p("Sanity’deki mevcut referans kaydı ve ekip anlatımı, Santa Farma ile ilişkinin SLA’lı AMS (sürekli SAP destek) olduğunu söylüyor. Yani canlı sistemin yanında durmak: olay, kapanış ve mevzuat takvimi. Proje sloganı uydurmayız; AMS’in doğası sürekliliktir."),
        h("Neden anlatıyoruz"),
        p("İlaç sektöründe kapanış ve izlenebilirlik, ‘iyi niyetli Excel’e’ bırakılacak iş değildir. AMS’i seçen bir üretici, bileti değil dönemi paylaşır. Detaylı modül dökümü müşteri onayı olmadan burada genişletilmez."),
        p("Kaynak: Santa Farma kurumsal site (santafarma.com.tr) — kuruluş ve sektör; Conforcus CMS kaydı — SLA AMS. Başka iddia yok."),
      ],
      en: [
        p("Santa Farma is a pharmaceutical company that has operated in Türkiye since 1944, headquartered in Istanbul. Public sources describe manufacturing, licences and therapy areas. This page does not invent revenue, user counts or ‘savings’."),
        h("Conforcus’s role"),
        p("The existing CMS reference and team description frame the relationship as SLA-backed AMS — standing next to a live SAP system: incidents, close and the regulatory calendar. We do not invent a project slogan; AMS is continuity."),
        h("Why it is here"),
        p("In pharma, close and traceability are not work you leave to a well-meaning spreadsheet. A manufacturer that chooses AMS is sharing the period, not a ticket pile. We do not expand a module list here without customer approval."),
        p("Sources: Santa Farma corporate site (santafarma.com.tr) for founding and sector; Conforcus CMS for SLA AMS. Nothing else is claimed."),
      ],
    },
  },
  {
    slug: "evyap",
    name: "Evyap",
    sector: { tr: "Hızlı Tüketim Malları", en: "FMCG" },
    countries: ["Türkiye", "Malezya", "Endonezya", "Rusya"],
    blurb: { tr: "SAP S/4HANA dönüşümü — FI, TRM, CO, FM desteği", en: "SAP S/4HANA transformation — FI, TRM, CO, FM support" },
    body: {
      tr: [
        p("Evyap, Türkiye merkezli bir FMCG ve yaşam kimyasalları grubudur. Conforcus’un kendi LinkedIn duyurusuna (şirket sayfası con4cus) göre, GoLive Yazılım A.Ş. liderliğindeki uçtan uca SAP S/4HANA dönüşümünde stratejik iş ortağı olarak yer aldık."),
        h("Kamuya açıklanan kapsam"),
        p("Duyuruya göre program Türkiye, Malezya, Endonezya ve Rusya operasyonlarını kapsadı; 2024’te başladı, yaklaşık 20 ay sürdü ve 1 Ocak 2026 itibarıyla canlıya alındı. Conforcus tarafında FI, TRM, CO ve FM modüllerinde destek anlatıldı. Çoklu ülke ve zaman dilimine uygun entegre ERP altyapısı, GoLive ve diğer iş ortaklarının (kamuya teşekkür edilen ekipler) ortak işi olarak tarif edildi."),
        h("Ne iddia etmiyoruz"),
        p("Bu sayfada üretim duruşu yüzdesi, kullanıcı sayısı, tasarruf veya ‘başarı skoru’ yoktur. Bunlar duyuruda yoksa burada da yoktur. Rolümüz finans ve hazine/bütçe kesitindeki destektir; tüm modül haritasının sahibi değiliz."),
        p("Kaynak: Conforcus LinkedIn duyurusu (con4cus) ve GoLive’ın aynı programa ilişkin kamuya açık go-live metni. Üçüncü taraf övgü cümleleri alıntılanmaz."),
      ],
      en: [
        p("Evyap is a Türkiye-based FMCG and home & personal care group. Per Conforcus’s own LinkedIn announcement (company page con4cus), we took part as a strategic partner on the end-to-end SAP S/4HANA transformation led by GoLive Yazılım A.Ş."),
        h("What was stated publicly"),
        p("The announcement describes coverage of operations in Türkiye, Malaysia, Indonesia and Russia; a start in 2024; roughly 20 months of work; live as of 1 January 2026. Conforcus described support in FI, TRM, CO and FM. An integrated ERP landscape across countries and time zones was framed as joint work with GoLive and other publicly thanked partners."),
        h("What we do not claim"),
        p("This page has no production-downtime percentage, user count, savings figure or ‘success score’. If it was not in the announcement, it is not here. Our role is support on the finance and treasury/budget cut — we do not own the full module map."),
        p("Sources: Conforcus LinkedIn (con4cus) and GoLive’s public go-live text on the same programme. Third-party praise is not quoted as a metric."),
      ],
    },
  },
  {
    slug: "flormar-germany",
    name: "Flormar Germany",
    sector: { tr: "Kozmetik", en: "Cosmetics" },
    countries: ["Almanya"],
    blurb: { tr: "Almanya SAP S/4HANA rollout — kickoff", en: "Germany SAP S/4HANA rollout — kickoff" },
    body: {
      tr: [
        p("Flormar, Türkiye kökenli, uluslararası perakendesi olan bir kozmetik markasıdır. Conforcus LinkedIn duyurusuna (con4cus) göre 25 Mart 2026’da Almanya operasyonunu SAP S/4HANA üzerinde yürütme yolculuğunun kickoff’u yapıldı. Bu sayfa bir go-live iddiası değildir; kickoff’ta kamuya anlatılan kapsamın kaydıdır."),
        h("Duyurulan kapsam"),
        p("FI, CO, SD ve MM modülleri; DATEV entegrasyonu; Almanya e-fatura düzeni (XRechnung / ZUGFeRD); çok lokasyonlu lojistik süreçleri. Türkiye’den Avrupa’ya uzanan bir rollout olarak tarif edildi."),
        h("Ne yok"),
        p("Tamamlanma tarihi, bütçe, kullanıcı sayısı ve ‘kaç günde bitti’ cümlesi yok — çünkü kickoff’ta bunlar henüz sonuç değildir. Flormar’ın ayrı bir S/4HANA sürüm yükseltmesi (GoLive duyurusu, 1709→2023) bu Almanya rollout’undan farklı bir programdır; karıştırmayız."),
        p("Kaynak: Conforcus LinkedIn (con4cus), 25 Mart 2026 kickoff duyurusu. GoLive’ın Flormar sürüm yükseltme metni yalnızca ayrım için anılır."),
      ],
      en: [
        p("Flormar is a cosmetics brand of Turkish origin with international retail. Per Conforcus’s LinkedIn announcement (con4cus), the kickoff for running the German operation on SAP S/4HANA was held on 25 March 2026. This page is not a go-live claim; it is a record of the scope stated at kickoff."),
        h("Scope as announced"),
        p("FI, CO, SD and MM; DATEV integration; German e-invoicing (XRechnung / ZUGFeRD); multi-site logistics. It was described as a rollout from Türkiye into Europe."),
        h("What is not here"),
        p("No completion date, budget, user count or ‘how many days it took’ — those are not kickoff results. Flormar’s separate S/4HANA release upgrade (GoLive announcement, 1709→2023) is a different programme; we do not mix them."),
        p("Source: Conforcus LinkedIn (con4cus), 25 March 2026 kickoff. GoLive’s Flormar upgrade text is mentioned only to keep the two programmes apart."),
      ],
    },
  },
];

export function caseBySlug(slug: string) {
  return CASE_FALLBACKS.find((c) => c.slug === slug);
}
