import type { Locale } from "./i18n";
import { COMPANY } from "./site";

export type LegalDoc = { h1: { tr: string; en: string }; paras: readonly { tr: string; en: string }[] };

export const LEGAL = {
  kvkk: {
    h1: { tr: "KVKK aydınlatma metni", en: "Privacy notice" },
    paras: [
      {
        tr: `Veri sorumlusu ${COMPANY.legalName}’dir. Adres: ${COMPANY.addressLine}. E-posta: ${COMPANY.email}. Telefon: ${COMPANY.telephoneDisplay}. Bu metin, web sitemiz üzerinden hangi kişisel verileri hangi amaçla işlediğimizi ve haklarınızı açıklar.`,
        en: `The data controller is ${COMPANY.legalName}. Address: ${COMPANY.addressLine}. Email: ${COMPANY.email}. Phone: ${COMPANY.telephoneDisplay}. This notice explains which personal data we process through our website, for what purpose, and your rights.`,
      },
      {
        tr: "İşlediğimiz veriler: analiz ve iletişim formunda paylaştığınız ad soyad, e-posta adresi, şirket adı ve değerlendirme sorularına verdiğiniz cevaplar; bize gönderdiğiniz e-postaların içeriği; güvenlik, hata ayıklama ve toplu ziyaret istatistiği için tutulan sunucu kayıtları (son bölümü silinmiş IP adresi, tarayıcı bilgisi, istenen sayfa, gelinen adres); işe alım için hr@conforcus.com adresine gönderdiğiniz özgeçmiş ve iletişim bilgileri.",
        en: "What we process: the name, email address, company name and assessment answers you share on the analysis and contact form; the content of emails you send us; server records kept for security, debugging and aggregate visit statistics (IP address with its last part removed, browser information, requested page, referring address); CVs and contact details you send to hr@conforcus.com for hiring.",
      },
      {
        tr: "Amaç ve hukuki sebep: talebinizi yanıtlamak, analiz notunu hazırlamak ve sözleşme öncesi görüşmeleri yürütmek (analiz randevusu, teklif); site güvenliğini sağlamak, kötüye kullanımı önlemek ve sitenin nasıl kullanıldığını toplu rakamlarla görmek (meşru menfaat). Sitede bülten aboneliği yoktur; ileride pazarlama iletisi göndermek istersek bunun için ayrıca açık rızanızı alırız. Çerezler ve ziyaret ölçümü için çerez politikasına bakabilirsiniz.",
        en: "Purpose and legal basis: answering your request, preparing the analysis note and carrying out pre-contract steps (analysis meeting, proposal); keeping the site secure, preventing abuse and seeing in aggregate figures how the site is used (legitimate interest). The site has no newsletter subscription; if we ever want to send marketing messages we will ask for your explicit consent separately. See the cookie policy for cookies and visit measurement.",
      },
      {
        tr: "Aktarım: form içeriği e-posta yoluyla info@conforcus.com adresine iletilir. Hizmet aldığımız sağlayıcılar (örneğin barındırma için Hostinger, içerik yönetimi için Sanity) bu hizmetlerin gerektirdiği ölçüde veri işleyen olarak verilere erişebilir. Yurt dışına aktarım söz konusu olursa ayrıca bilgilendirme yapılır.",
        en: "Sharing: form content is delivered by email to info@conforcus.com. The providers we use (for example Hostinger for hosting and Sanity for content management) may access data as processors to the extent those services require. If data is transferred outside your country, we will inform you separately.",
      },
      {
        tr: "Saklama süresi: form kayıtları, talebiniz sonuçlanana ve varsa yasal saklama süreleri dolana kadar tutulur. Sunucu kayıtları en çok 90 gün saklanır. Özgeçmişler işe alım süreci kapandığında veya adayın talebi üzerine silinir.",
        en: "Retention: form records are kept until your request is closed and any legal retention period has ended. Server records are kept for at most 90 days. CVs are deleted when the hiring process closes or at the candidate’s request.",
      },
      {
        tr: "Haklarınız: KVKK’nın 11. maddesi uyarınca verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme, işlemeye itiraz etme ve Kişisel Verileri Koruma Kurulu’na şikâyette bulunma haklarına sahipsiniz. Başvurularınızı info@conforcus.com adresine iletebilirsiniz; kimliğinizi doğrulamamız gerekebilir.",
        en: "Your rights: under applicable law (article 11 of the KVKK in Türkiye) you can ask whether your data is processed, request correction or deletion, object to processing and lodge a complaint with the data-protection authority. Send requests to info@conforcus.com; we may need to verify your identity.",
      },
    ],
  },
  gizlilik: {
    h1: { tr: "Gizlilik politikası", en: "Privacy policy" },
    paras: [
      {
        tr: `Bu politika ${COMPANY.legalName} web sitesinin gizlilik uygulamasını özetler ve KVKK aydınlatma metniyle birlikte okunur. İkisi arasında fark olursa aydınlatma metni ve yürürlükteki mevzuat esas alınır.`,
        en: `This policy summarises how the ${COMPANY.legalName} website treats privacy and is read together with the privacy notice. If the two differ, the notice and applicable law prevail.`,
      },
      {
        tr: "Topladığımız bilgiler: formlarda paylaştığınız bilgiler, sunucu kayıtları ve çerez politikasında açıklanan kayıtlar. Müşterilerimize ait gizli proje bilgilerini bu sitede yayımlamayız; referans sayfalarında yalnızca kamuya açık veya müşterinin onayladığı bilgiler yer alır.",
        en: "What we collect: the information you share in forms, server records and the records described in the cookie policy. We do not publish our clients’ confidential project information on this site; reference pages contain only public or client-approved information.",
      },
      {
        tr: "Üçüncü taraflar: yazı tipleri ve harita kendi sunucumuzdan yüklenir; sayfalarımızda reklam veya sosyal medya izleme kodu yoktur. Görseller içerik yönetim sağlayıcımızın (Sanity) ağından sunulur. Analiz formu e-posta yoluyla bize ulaşır. Ziyaret ölçümü için çerez politikasına bakabilirsiniz. LinkedIn gibi dış bağlantılara tıkladığınızda ilgili sitenin kendi gizlilik koşulları geçerli olur.",
        en: "Third parties: fonts and the map are served from our own server; our pages contain no advertising or social-media tracking code. Images are served from the network of our content-management provider (Sanity). The analysis form reaches us by email. See the cookie policy for visit measurement. When you follow external links such as LinkedIn, that site’s own privacy terms apply.",
      },
      {
        tr: `İletişim: ${COMPANY.email} · ${COMPANY.telephoneDisplay} · ${COMPANY.addressLine}.`,
        en: `Contact: ${COMPANY.email} · ${COMPANY.telephoneDisplay} · ${COMPANY.addressLine}.`,
      },
    ],
  },
  cerez: {
    h1: { tr: "Çerez politikası", en: "Cookie policy" },
    paras: [
      {
        tr: "Çerez, bir web sitesinin tarayıcınıza kaydettiği küçük bir metin dosyasıdır. Bu sitede reklam veya izleme çerezi kullanılmaz; üçüncü taraf reklam ağlarıyla veri paylaşılmaz.",
        en: "A cookie is a small text file that a website stores in your browser. This site uses no advertising or tracking cookies and shares no data with third-party advertising networks.",
      },
      {
        tr: "Video: tanıtım videoları, siz oynat düğmesine basana kadar yüklenmez. Oynattığınızda video YouTube'un çerezsiz alan adından (youtube-nocookie.com) gelir.",
        en: "Video: introduction videos are not loaded until you press play. When you do, the video is served from YouTube's privacy-enhanced domain (youtube-nocookie.com).",
      },
    ],
  },
} as const;

// KVKK metninde ziyaret ölçümü açıkken eklenen cümle (veri işleyenler paragrafının sonuna).
const KVKK_ANALYTICS = {
  tr: " Ziyaret istatistiği için Plausible Analytics kullanırız; Plausible ziyaret verisini Avrupa Birliği'ndeki sunucularında işler ve IP adresini saklamaz.",
  en: " For visit statistics we use Plausible Analytics; Plausible processes visit data on its servers in the European Union and does not store IP addresses.",
} as const;
const KVKK_SHARING_INDEX = 3;

export function kvkkParas(locale: Locale, analyticsOn: boolean): string[] {
  return legalParas(LEGAL.kvkk, locale).map((p, i) => (analyticsOn && i === KVKK_SHARING_INDEX ? p + KVKK_ANALYTICS[locale] : p));
}

// Çerez politikasının ziyaret ölçümü açık/kapalı olmasına göre değişen paragrafları + ortak bölümler.
const COOKIE_ANALYTICS = {
  on: {
    storage: {
      tr: "Tarayıcınızdaki kayıtlar: site, çalışmak için tarayıcınıza çerez yazmaz. Yalnızca aşağıdaki düğmeyle ölçüm dışında kalmayı seçerseniz bu tercih tarayıcınızda saklanır; kimliğinizi belirlemez ve dilediğiniz zaman geri alabilirsiniz.",
      en: "Records in your browser: the site writes no cookies to your browser in order to work. Only if you choose to stay out of measurement with the button below is that preference kept in your browser; it does not identify you and you can undo it at any time.",
    },
    measure: {
      tr: "Ziyaret ölçümü: hangi sayfaların ne kadar ziyaret edildiğini toplu rakamlarla görmek için Plausible Analytics kullanırız. Plausible çerez, tarayıcı deposu ya da kalıcı kimlik kullanmaz; bu yüzden onay kutusu göstermiyoruz. Ölçülenler: ziyaret edilen sayfa, gelinen site, tarayıcı ve cihaz türü, yaklaşık konum (ülke, bölge, şehir) ve sayfada geçirilen süre. Ziyaretçileri saymak için IP adresi ve tarayıcı bilgisinden her gün değişen anonim bir özet üretilir; IP adresi saklanmaz, ziyaretiniz günler arasında ya da başka sitelerle ilişkilendirilmez. Veriler Avrupa Birliği'ndeki sunucularda işlenir; reklam için kullanılmaz ve satılmaz.",
      en: "Visit measurement: we use Plausible Analytics to see, in aggregate figures, which pages are visited and how often. Plausible uses no cookies, browser storage or persistent identifiers, which is why we show no consent banner. What is measured: the page visited, the referring site, browser and device type, approximate location (country, region, city) and time spent on the page. To count visitors, an anonymous digest that changes every day is derived from the IP address and browser information; the IP address is not stored, and your visit is not linked across days or across other sites. The data is processed on servers in the European Union; it is not used for advertising and is not sold.",
    },
  },
  off: {
    storage: {
      tr: "Tarayıcınızdaki kayıtlar: site, çalışmak için tarayıcınıza çerez veya benzeri bir kayıt yazmaz.",
      en: "Records in your browser: the site writes no cookies or similar records to your browser in order to work.",
    },
    measure: {
      tr: "Ziyaret ölçümü: şu anda ziyaretçi ölçümü yapan bir analitik aracı kullanmıyoruz. Kullanmaya başlarsak bu metni güncelleriz.",
      en: "Visit measurement: we currently use no analytics tool that measures visitors. If we start to, we will update this text.",
    },
  },
  logs: {
    tr: "Sunucu kayıtları: her web sunucusu gibi bizimki de gelen istekleri kaydeder (istenen sayfa, gelinen adres, tarayıcı bilgisi ve son bölümü silinmiş IP adresi). Bu kayıtlar güvenlik ve toplu istatistik için kullanılır, en çok 90 gün saklanır ve tarayıcınıza hiçbir şey yazmaz.",
    en: "Server records: like every web server, ours records incoming requests (the requested page, the referring address, browser information and the IP address with its last part removed). These records are used for security and aggregate statistics, are kept for at most 90 days and write nothing to your browser.",
  },
  end: {
    tr: "Tarayıcı ayarlarınızdan çerezleri ve site verilerini dilediğiniz zaman silebilir veya engelleyebilirsiniz. Sorularınız için: info@conforcus.com.",
    en: "You can delete or block cookies and site data in your browser settings at any time. Questions: info@conforcus.com.",
  },
} as const;

export function cookieParas(locale: Locale, analyticsOn: boolean): string[] {
  const a = analyticsOn ? COOKIE_ANALYTICS.on : COOKIE_ANALYTICS.off;
  const [intro, ...rest] = legalParas(LEGAL.cerez, locale);
  return [intro, a.storage[locale], ...rest, a.measure[locale], COOKIE_ANALYTICS.logs[locale], COOKIE_ANALYTICS.end[locale]];
}

export function legalParas(doc: LegalDoc, locale: Locale) {
  return doc.paras.map((p) => (locale === "tr" ? p.tr : p.en));
}
