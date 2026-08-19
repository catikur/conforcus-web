import type { Locale } from "./i18n";
import { COMPANY } from "./site";

export type LegalDoc = { h1: { tr: string; en: string }; paras: readonly { tr: string; en: string }[] };

export const LEGAL = {
  kvkk: {
    h1: { tr: "KVKK aydınlatma metni", en: "Privacy notice" },
    paras: [
      {
        tr: `Veri sorumlusu ${COMPANY.legalName}’dir. Adres: ${COMPANY.addressLine}. E-posta: ${COMPANY.email}. Telefon: ${COMPANY.telephoneDisplay}. Bu metin hukuki tavsiye veya tam bir KVKK uyum dosyası değildir; sitede hangi kişisel veriyi neden işlediğimizi dürüstçe özetler. Güncel ve bağlayıcı metin talep ederseniz aynı adresten yazın.`,
        en: `The controller is ${COMPANY.legalName}. Address: ${COMPANY.addressLine}. Email: ${COMPANY.email}. Phone: ${COMPANY.telephoneDisplay}. This is not legal advice or a full compliance file. It is an honest outline of what personal data we process on this site and why. For a current binding text, write to the same address.`,
      },
      {
        tr: "İşlediğimiz veriler: analiz / iletişim formunda verdiğiniz ad, e-posta, şirket, isteğe bağlı web sitesi; e-posta ile yazışma içeriği; teknik log (IP, tarayıcı) güvenlik ve hata ayıklama için. İşe alım için hr@conforcus.com’a gönderdiğiniz CV ve iletişim bilgisi.",
        en: "What we process: name, email, company and optional website on the analysis/contact form; the content of email you send us; technical logs (IP, browser) for security and debugging; CVs and contact details sent to hr@conforcus.com for hiring.",
      },
      {
        tr: "Amaç ve hukukî sebep (özet): talebinize cevap vermek ve sözleşme öncesi adımlar (analiz randevusu, teklif); meşru menfaat (site güvenliği, kötüye kullanımın önlenmesi); açık rıza varsa bülten — şu an sitede otomatik bülten kutusu yoktur. Zorunlu çerezler için çerez politikasına bakın.",
        en: "Purpose and legal basis (outline): answering your request and pre-contract steps (analysis, proposal); legitimate interest (site security, abuse prevention); consent if we ever run a newsletter — there is no newsletter checkbox on the site today. See the cookie policy for strictly necessary cookies.",
      },
      {
        tr: "Aktarım: form içeriği SMTP ile info@conforcus.com’a iletilir. Barındırma ve CMS (ör. Sanity, Hostinger VPS) alt işleyen olabilir. Yurt dışı aktarım varsa mekanizma ayrıca bildirilir; bu iskelet uydurma SCC metni yazmaz.",
        en: "Sharing: form content is emailed via SMTP to info@conforcus.com. Hosting and CMS (e.g. Sanity, Hostinger VPS) may act as processors. If we transfer data outside your country we will say so; this skeleton does not invent SCC boilerplate.",
      },
      {
        tr: "Süre: form kayıtları talebiniz sonuçlanana ve yasal saklama (ticari defter, uyuşmazlık) bitene kadar. Log’lar kısa tutulur. CV’ler işe alım kapanınca silinir veya adayın isteğiyle silinir.",
        en: "Retention: form records until your request is closed and any legal retention (commercial books, dispute) ends. Logs are kept short. CVs are deleted when hiring closes or on request.",
      },
      {
        tr: "Haklarınız: KVKK md. 11 — öğrenme, düzeltme, silme, itiraz, şikâyet (Kişisel Verileri Koruma Kurulu). Başvuru: info@conforcus.com. Kimlik doğrulaması isteyebiliriz.",
        en: "Your rights include access, correction, deletion and objection under applicable law (KVKK art. 11 in Türkiye), and a complaint to the data-protection authority. Write to info@conforcus.com. We may need to verify identity.",
      },
    ],
  },
  gizlilik: {
    h1: { tr: "Gizlilik politikası", en: "Privacy policy" },
    paras: [
      {
        tr: `Bu politika ${COMPANY.legalName} web sitesinin gizlilik uygulamasını özetler. KVKK aydınlatma metni ile birlikte okunur. Çelişirse aydınlatma metni ve yürürlükteki hukuk esas alınır.`,
        en: `This policy summarises how the ${COMPANY.legalName} website treats privacy. Read it with the privacy notice. If they conflict, the notice and applicable law win.`,
      },
      {
        tr: "Topladığımız bilgi: sizin gönderdiğiniz form alanları; sunucu log’u; çerez politikasında anlatılan çerezler. Gizli müşteri projelerini, sözleşmesiz, bu sitede yayınlamayız. Referans sayfalarında yalnızca kamuya açık veya onaylı anlatım vardır.",
        en: "What we collect: fields you submit; server logs; cookies described in the cookie policy. We do not publish confidential client work on this site without a basis. Reference pages use public or approved facts only.",
      },
      {
        tr: "Üçüncü taraf: harita ve fontlar self-host veya kendi altyapımızdadır (next/font). Analiz formu SMTP ile bize gelir. Sosyal paylaşım için Open Graph URL’si üretilir; LinkedIn’e sizin tıklamanız dışında otomatik profil göndermeyiz.",
        en: "Third parties: map and fonts are self-hosted or served from our stack (next/font). The analysis form arrives by SMTP. We generate Open Graph URLs for sharing; we do not push a profile to LinkedIn unless you click through.",
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
        tr: "Çerez, tarayıcınıza yazılan küçük bir dosyadır. Bu sitede dil tercihi ve oturum için gereken teknik çerezler kullanılabilir. Şu an ayrı bir pazarlama çerez duvarı ve izleme pikseli yoksa, ‘hepsini kabul et’ tiyatrosu da yoktur.",
        en: "A cookie is a small file on your browser. This site may use technical cookies needed for language and session. If there is no marketing cookie wall or tracking pixel, there is also no ‘accept all’ theatre.",
      },
      {
        tr: "Zorunlu / teknik: güvenlik, yük dengeleme, dil. Bunlarsız site kırılır. Analitik: eklemeden önce bu metin güncellenir. Pazarlama: yok.",
        en: "Strictly necessary / technical: security, load balancing, language. The site breaks without them. Analytics: this text will be updated before we add any. Marketing: none.",
      },
      {
        tr: "Tarayıcı ayarlarından çerezleri silebilirsiniz. Zorunlu çerezleri kapatmak formu veya dil anahtarını bozabilir. Sorular: info@conforcus.com.",
        en: "You can delete cookies in your browser. Turning off strictly necessary cookies may break the form or the language switch. Questions: info@conforcus.com.",
      },
    ],
  },
} as const;

export function legalParas(doc: LegalDoc, locale: Locale) {
  return doc.paras.map((p) => (locale === "tr" ? p.tr : p.en));
}
