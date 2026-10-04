import type { Faq } from "@/components/FaqList";
import type { Bi } from "./i18n";
import { PRODUCT_NOTES } from "./productExpand";

export type ProductPage = {
  slug: string;
  module: string;
  name: Bi;
  short: Bi;
  intro: Bi;
  sections: { h2: Bi; paras: Bi[] }[];
  faqs: Faq[];
};

export const PRODUCT_SLUGS = [
  "inflation-accounting",
  "e-payment-bank-e-signature-integrations",
  "customer-vendor-e-reconciliation",
  "ifrs-16-package",
  "direct-debit-system-dbs-bank-integration",
  "automated-clearing-processes",
  "import-management-process",
  "invoice-approval-workflow",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];
export const PRODUCT_SLUG_SET = new Set<string>(PRODUCT_SLUGS);

const faq = (qtr: string, qen: string, atr: string, aen: string): Faq => ({
  q: { tr: qtr, en: qen },
  a: { tr: atr, en: aen },
});

export const PRODUCT_PAGES: Record<string, ProductPage> = {
  "inflation-accounting": {
    slug: "inflation-accounting",
    module: "FI",
    name: { tr: "Enflasyon Muhasebesi", en: "Inflation Accounting" },
    short: {
      tr: "Enflasyon düzeltmesini 25+ şirkette kanıtlanmış paketle, kapanışı geciktirmeden tamamlayın.",
      en: "Complete inflation adjustment on time — with a suite already proven in 25+ companies.",
    },
    intro: {
      tr: "Enflasyon düzeltmesi, parasal olmayan kalemlerin bir fiyat endeksinden türetilen katsayılarla bilanço tarihindeki satın alma gücüne taşınmasıdır. Türkiye’de bu düzeltme hem VUK hem de TMS/IFRS çerçevesinde tanımlıdır ve standart SAP süreci yerel mevzuatı tam olarak karşılamaz. Bu nedenle birçok şirkette düzeltme her dönem elle, SAP dışında hazırlanan tablolarla yapılır; çalışma hataya açıktır ve denetim baskısı altında yürür. Conforcus enflasyon muhasebesi paketi düzeltme katsayılarını, parasal ve parasal olmayan kalem ayrımını ve düzeltme kayıtlarını SAP içinde otomatikleştirir; VUK ve TMS/IFRS bazlarını paralel üretir. Paket 25+ şirkette canlı kullanımdadır.",
      en: "Inflation adjustment restates non-monetary items to their purchasing power at the balance sheet date, using coefficients derived from a price index. In Türkiye the adjustment is defined under both the Tax Procedure Law (VUK) and TMS/IFRS, and standard SAP does not fully cover the local regulation. As a result, many companies carry out the adjustment by hand every period, in spreadsheets prepared outside SAP; the work is error-prone and runs under audit pressure. The Conforcus inflation accounting suite automates the restatement coefficients, the monetary/non-monetary classification and the adjustment postings inside SAP, and produces the VUK and TMS/IFRS bases in parallel. The suite is live in 25+ companies.",
    },
    sections: [
      {
        h2: {
          tr: "Enflasyon düzeltmesinin dönem kapanışına getirdiği yük",
          en: "The load inflation adjustment puts on the period close",
        },
        paras: [
          {
            tr: "Düzeltmenin zorluğu hesaplamanın kendisinden çok kapsamından ve her dönem tekrarlanmasından gelir. Her hesabın parasal mı yoksa parasal olmayan mı olduğuna karar verilmesi, parasal olmayan her kalemin de doğru tarihe ve doğru katsayıya bağlanması gerekir. Nakit, alacak ve borç gibi parasal kalemler zaten cari değerleriyle ifade edildiği için düzeltilmez. Duran varlıklar çoğu şirkette işin en yoğun kısmıdır; çünkü her varlığın edinim tarihi ve birikmiş amortismanı ayrı ayrı dikkate alınır. Bir dönemde yapılan sınıflama hatası sonraki dönemlere de taşınır.",
            en: "The difficulty lies less in the arithmetic than in the scope of the work and the fact that it is repeated every period. Every account has to be classified as monetary or non-monetary, and every non-monetary item has to be tied to the right date and the right coefficient. Monetary items such as cash, receivables and payables are already expressed in current terms and are not restated. In most companies fixed assets are the heaviest part of the work, because each asset’s acquisition date and accumulated depreciation are taken into account individually. A classification error made in one period carries forward into the periods that follow.",
          },
          {
            tr: "VUK ve TMS/IFRS enflasyon düzeltmesini kendi kurallarıyla tanımlar; her iki çerçeveye göre raporlama yapan şirketler aynı dönem için ayrı sonuçlar üretmek zorundadır. Hesaplama SAP dışında yapıldığında tutarlar sisteme toplu kayıtlarla aktarılır. Denetçi bir tutarın hangi katsayıdan ve hangi sınıflamadan geldiğini sorduğunda yanıtı muhasebe kayıtları değil, sistem dışındaki tablolar verir. Kapanış takvimi de bu tabloların hazırlanma hızına bağlı kalır.",
            en: "VUK and TMS/IFRS each define inflation adjustment by their own rules, so companies that report under both have to produce separate results for the same period. When the calculation is done outside SAP, the amounts are brought into the system as lump-sum postings. When the auditor asks which coefficient and which classification an amount came from, the answer lies in spreadsheets outside the system rather than in the accounting records. The closing calendar also ends up depending on how quickly those spreadsheets can be prepared.",
          },
          {
            tr: "Enflasyon düzeltmesi tek seferlik bir çalışma da değildir. Bir dönemde düzeltilen tutarlar sonraki dönemin başlangıç noktası olur; bu yüzden hesaplamanın her dönem aynı sınıflama ve aynı yöntemle yapılması gerekir. Tablolar elden ele geçtikçe bu sürekliliği korumak zorlaşır.",
            en: "Nor is inflation adjustment a one-off exercise. The amounts restated in one period become the starting point for the next, so the calculation has to be made with the same classification and the same method every period. That continuity is hard to preserve as spreadsheets pass from hand to hand.",
          },
        ],
      },
      {
        h2: {
          tr: "Paket düzeltmeyi SAP içinde nasıl yürütür",
          en: "How the suite runs the adjustment inside SAP",
        },
        paras: [
          {
            tr: "Paket düzeltmenin temel unsurlarını SAP içine taşır. Düzeltme katsayıları sistemdeki katsayı tablolarında tutulur. Kalemler parasal ve parasal olmayan olarak sınıflanır. Otomatik düzeltme batch’i bu katsayılara ve sınıflamaya dayanarak düzeltme kayıtlarını üretir. Böylece hesaplama ile muhasebe kaydı aynı yerde oluşur; tutarların sisteme ayrıca aktarılması gerekmez.",
            en: "The suite brings the core elements of the adjustment into SAP. Restatement coefficients are held in coefficient tables in the system. Items are classified as monetary or non-monetary. The automated restatement batch then generates the adjustment postings from those coefficients and that classification. The calculation and the accounting entry are created in the same place, and amounts no longer have to be carried into the system separately.",
          },
          {
            tr: "Paket FI ve Duran Varlık (AA) modülleriyle entegredir; duran varlıklar düzeltme çalışmasına bu entegrasyon üzerinden dahil edilir. VUK ve TMS/IFRS bazları paralel üretilir ve her iki baz tek çalıştırmada elde edilir. Çalıştırmanın sonuçları paketin düzeltme raporlarından izlenir.",
            en: "The suite is integrated with FI and Asset Accounting (AA), and fixed assets are brought into the restatement run through that integration. The VUK and TMS/IFRS bases are produced in parallel, and both are obtained in a single run. The results of the run are followed in the suite’s restatement reports.",
          },
        ],
      },
      {
        h2: {
          tr: "Kapanışta ve denetimde ekip için değişenler",
          en: "What changes for the team at close and in audit",
        },
        paras: [
          {
            tr: "Dönem sonundaki elle düzeltme çalışması otomatik bir çalıştırmaya dönüşür. Ekip zamanını tablo hazırlamaya değil, katsayıların güncelliğini ve sınıflamanın doğruluğunu kontrol etmeye ayırır. Her iki baz aynı çalıştırmadan ve aynı kaynak veriden çıktığı için ayrı ayrı hazırlanmaları gerekmez; düzeltme kapanışı geciktirmeden tamamlanır.",
            en: "The manual restatement work at period end becomes an automated run. The team spends its time checking that the coefficients are current and the classification is correct, rather than preparing spreadsheets. Because both bases come out of the same run and the same source data, they do not have to be prepared separately, and the adjustment is completed without delaying the close.",
          },
          {
            tr: "Düzeltme kayıtları sistemde üretildiği için uçtan uca izlenebilir. Denetçi bir tutarın nasıl oluştuğunu sorduğunda yanıt, kaydın kendisinden ve düzeltme raporlarından verilir. Çalışma belirli kişilerin bilgisine bağlı kalmaz; aynı çalıştırma her dönem aynı kurallarla tekrarlanır.",
            en: "Because the adjustment postings are generated in the system, they are traceable end to end. When the auditor asks how an amount was derived, the answer comes from the posting itself and from the restatement reports. The work no longer depends on what a few individuals know: the same run is repeated every period under the same rules.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Paket SAP dışında ayrı bir araç olarak mı çalışıyor?",
        "Does the suite run as a separate tool outside SAP?",
        "Hayır. Paket SAP içinde çalışır ve FI ile Duran Varlık (AA) modülleriyle entegredir; ayrı bir sistem ya da SAP dışı bir hesaplama aracı değildir. Standart SAP süreci yerel enflasyon düzeltmesi mevzuatını tam karşılamadığı için paket bu boşluğu kapatmak üzere geliştirilmiştir. FI ve AA’daki mevcut kayıtlar üzerinde çalışır.",
        "No. The suite runs inside SAP and is integrated with FI and Asset Accounting (AA); it is not a separate system or an external calculation tool. It was developed to close the gap left by standard SAP, which does not fully cover local inflation adjustment regulation. It works on the existing records in FI and AA."
      ),
      faq(
        "Parasal ve parasal olmayan kalem ayrımı neden önemlidir?",
        "Why does the distinction between monetary and non-monetary items matter?",
        "Düzeltme yalnızca parasal olmayan kalemlere uygulanır; bu nedenle bir hesabın yanlış sınıflanması düzeltme tutarını doğrudan değiştirir. Parasal kalemler nakit, alacak ve borç gibi belirli bir para tutarıyla ifade edilen kalemlerdir. Duran varlıklar gibi parasal olmayan kalemler ise edinildikleri tarihin satın alma gücüyle kayıtlıdır ve bilanço tarihine taşınmaları gerekir. Pakette bu sınıflama SAP içinde tutulur ve düzeltme batch’i her çalıştırmada aynı sınıflamayı kullanır.",
        "The adjustment is applied only to non-monetary items, so classifying an account wrongly changes the adjustment amount directly. Monetary items are those expressed in a fixed amount of money, such as cash, receivables and payables. Non-monetary items, such as fixed assets, are recorded at the purchasing power of the date they were acquired and have to be brought forward to the balance sheet date. In the suite this classification is held inside SAP, and the restatement batch uses the same classification on every run."
      ),
      faq(
        "Kurulumdan sonra her dönem ne yapılması gerekir?",
        "What has to be done each period after implementation?",
        "Dönemin katsayıları katsayı tablolarında güncellenir ve otomatik düzeltme batch’i çalıştırılır. Sınıflama kurulumda tanımlandığı için her dönem baştan yapılmaz; yeni hesap açıldığında gözden geçirilir. Çalıştırmanın sonuçları düzeltme raporlarından kontrol edilir.",
        "The coefficients for the period are updated in the coefficient tables and the automated restatement batch is run. Because the classification is defined during implementation, it is not redone every period; it is reviewed when new accounts are opened. The results of the run are checked in the restatement reports."
      ),
    ],
  },
  "e-payment-bank-e-signature-integrations": {
    slug: "e-payment-bank-e-signature-integrations",
    module: "FI",
    name: { tr: "E-Ödeme, Banka ve E-imza entegrasyonları", en: "e-Payment, Bank & e-Signature Integrations" },
    short: {
      tr: "Ödeme talimatlarını SAP’tan e-imzalı, otomatik ve güvenli şekilde bankaya iletin.",
      en: "Send payment instructions from SAP — e-signed, automated and secure straight to the bank.",
    },
    intro: {
      tr: "Çoğu şirkette ödeme süreci SAP’ta başlar, ancak SAP dışında tamamlanır. Ödeme programı talimatları oluşturur; ardından bu talimatlar banka portallarına elle girilir ve e-imza onayı sistem dışında verilir. Her aktarım gecikme, hata ve mükerrer ödeme riski taşır; kimin neyi onayladığını sonradan izlemek de zorlaşır. Conforcus e-ödeme çözümü ödeme talimatlarını SAP içinden banka sistemlerine e-imzalı ve otomatik olarak iletir. Onay, imza ve bankaya iletim tek akışta birleşir; bankadan dönen bilgi de ödemelerle otomatik eşleştirilir.",
      en: "In most companies the payment process starts in SAP but is completed outside it. The payment program creates the instructions; they are then re-keyed into bank portals, and the e-signature approval is given outside the system. Every hand-off carries a risk of delay, error and duplicate payment, and it becomes hard to trace afterwards who approved what. The Conforcus e-payment solution sends payment instructions from within SAP to the banks’ systems, e-signed and automated. Approval, signature and transmission to the bank are combined in one flow, and the information returned by the bank is matched to the payments automatically.",
    },
    sections: [
      {
        h2: {
          tr: "Ödeme talimatı SAP’tan çıktığında ortaya çıkan riskler",
          en: "The risks that arise once a payment instruction leaves SAP",
        },
        paras: [
          {
            tr: "Standart SAP’ta ödeme programı (F110) vadesi gelen açık kalemleri seçer, ödeme önerisini hazırlar ve ödeme kayıtlarını oluşturur. Sürecin bu kısmı sistem içindedir ve kontrollüdür. Sorun bir sonraki adımda başlar: talimatın bankaya ulaştırılması ve yetkililerce imzalanması çoğu şirkette banka portallarında, yani SAP dışında yapılır. Aynı bilgi ikinci kez girildiği için tutarda, hesapta ya da alıcıda hata yapılabilir; bir talimat iki kez gönderilebilir.",
            en: "In standard SAP, the payment program (F110) selects the open items that are due, creates the payment proposal and posts the payment documents. That part of the process is inside the system and controlled. The problem starts at the next step: in most companies the instruction is delivered to the bank and signed by the authorized signatories in the bank portals, that is, outside SAP. Because the same information is entered a second time, the amount, the account or the payee can be wrong, and an instruction can be sent twice.",
          },
          {
            tr: "Diğer risk izlenebilirliktir. Ödemeyi hazırlayan, onaylayan ve imzalayan kişilerin ayrılması temel bir iç kontrol ilkesidir. Onay ve e-imza zinciri sistem dışında yürüdüğünde bu ayrımın uygulandığını göstermek zorlaşır; kayıtlar SAP, e-posta ve banka portalı arasında dağılır. Çok bankalı ve çok şirketli yapılarda her banka kendi portalını ve kendi çalışma düzenini getirir; hazine ekibi zamanının önemli bir kısmını bu ekranlar arasında veri taşımaya harcar.",
            en: "The other risk is traceability. Separating the people who prepare, approve and sign a payment is a basic internal control principle. When the approval and e-signature chain runs outside the system, it becomes hard to show that this separation was applied, and the records are spread across SAP, email and the bank portal. In multi-bank, multi-company structures each bank brings its own portal and its own way of working, and the treasury team spends a considerable part of its time moving data between these screens.",
          },
        ],
      },
      {
        h2: {
          tr: "Çözüm ödeme akışını nasıl birleştirir",
          en: "How the solution brings the payment flow together",
        },
        paras: [
          {
            tr: "Çözüm FI ödeme programı (F110) ve banka iletişim katmanıyla entegre çalışır. Ödemeler bugün olduğu gibi ödeme programında oluşturulur; değişen, sonraki adımlardır. Onay ve e-imza SAP içindeki akışta verilir, talimat bankanın kabul ettiği formatta hazırlanır ve bankaya otomatik iletilir. Talimatın banka portalına yeniden girilmesi gerekmediği için elle girişten kaynaklanan hata ve mükerrer ödeme riski ortadan kalkar.",
            en: "The solution is integrated with the FI payment program (F110) and the bank communication layer. Payments are created in the payment program as they are today; what changes is the steps that follow. Approval and e-signature are given in the flow inside SAP, the instruction is prepared in the format the bank accepts, and it is transmitted to the bank automatically. Because the instruction no longer has to be re-entered in a bank portal, the errors and the duplicate-payment risk that come from manual entry are removed.",
          },
          {
            tr: "Akışın dönüş yönü de otomatiktir. Bankadan gelen dekont ve geri besleme bilgisi ilgili ödemeyle eşleştirilir; hangi talimatın bankaya iletildiği ve hangisi için geri besleme geldiği SAP’tan izlenir. Çözüm çok bankalı ve çok şirketli yapılarda çalışır. Banka formatları birbirinden farklı olduğu için kapsamdaki bankalar kurulum sırasında tek tek tanımlanır.",
            en: "The return leg of the flow is automated as well. The statements and feedback that come back from the bank are matched to the related payment, and it can be followed in SAP which instructions have been transmitted and which have received feedback. The solution runs in multi-bank, multi-company structures. Because bank formats differ from one another, each bank in scope is set up individually during implementation.",
          },
        ],
      },
      {
        h2: {
          tr: "Hazine ve mali işler ekipleri için değişenler",
          en: "What changes for treasury and finance teams",
        },
        paras: [
          {
            tr: "Hazine ekibi ödeme gününde banka portallarına veri girmek yerine akışı yönetir: hangi talimatın onay beklediğini, hangisinin imzalandığını ve hangisinin bankaya iletildiğini izler. Adımlar arasında yeniden giriş ve bekleme olmadığı için ödeme döngüsü hızlanır. Onay ve e-imza zinciri uçtan uca kayıt altında olduğundan, denetimde ya da bir ödeme sorgulandığında kimin neyi ne zaman onayladığı sistemden gösterilir.",
            en: "On payment day the treasury team manages the flow instead of entering data in bank portals: it follows which instructions are awaiting approval, which have been signed and which have been transmitted to the bank. With no re-entry and no waiting between the steps, the payment cycle is faster. And since the approval and e-signature chain is recorded end to end, the system can show who approved what and when, in an audit or whenever a payment is queried.",
          },
          {
            tr: "Hazine kontrolü de güçlenir. Talimatlar doğrudan SAP’taki ödeme kayıtlarından üretildiği için bankaya giden bilgi ile muhasebedeki bilgi aynı kaynağa dayanır. Ödemelerin hangi aşamada olduğunu görmek için banka portallarına ayrı ayrı bakmak gerekmez. CFO ve mali işler yönetimi için bu, ödeme sürecinin tek bir yerden izlenebilmesi anlamına gelir.",
            en: "Treasury control is stronger too. Because instructions are produced directly from the payment records in SAP, the information sent to the bank and the information in accounting rest on the same source. There is no need to check each bank portal separately to see what stage payments have reached. For the CFO and finance management, this means the payment process can be followed from one place.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Mevcut ödeme sürecimizde ne değişir, ne aynı kalır?",
        "What changes in our current payment process, and what stays the same?",
        "Ödenecek kalemlerin seçimi ve ödeme önerisi bugün olduğu gibi kalır. Değişen, öneriden sonraki adımlardır: onay ve e-imza SAP içindeki akışa taşınır, talimat bankaya otomatik iletilir ve bankadan dönen bilgi ödemeyle eşleştirilir. Banka portalına elle giriş adımı ortadan kalkar.",
        "The selection of the items to be paid and the payment proposal stay as they are today. What changes is the steps after the proposal: approval and e-signature move into the flow inside SAP, the instruction is transmitted to the bank automatically, and the information returned by the bank is matched to the payment. The step of entering data by hand in a bank portal disappears."
      ),
      faq(
        "Çözüm çok şirketli gruplarda nasıl kullanılır?",
        "How is the solution used in multi-company groups?",
        "Çözüm çok şirketli ve çok bankalı yapılarda çalışır; gruptaki şirketler aynı akışı kullanır. Hangi şirketlerin ve hangi banka hesaplarının kapsama gireceği ile her şirketin onay ve imza yetkilileri kurulum sırasında tanımlanır. Böylece her şirket kendi yetki düzenini korur, grup ise ödeme sürecini ortak bir yapıda izler.",
        "The solution runs in multi-company, multi-bank structures, and the companies in the group use the same flow. Which companies and which bank accounts are in scope, and each company’s approvers and authorized signatories, are defined during implementation. Each company keeps its own authorization structure, while the group follows the payment process in a common framework."
      ),
      faq(
        "Çözüm ödeme güvenliğine nasıl katkı sağlar?",
        "How does the solution contribute to payment security?",
        "Talimat SAP’tan bankaya elle müdahale olmadan iletildiği için ödeme bilgisinin yeniden girilirken yanlış yazılması ya da değiştirilmesi riski ortadan kalkar. Talimat bankaya, tanımlı onay ve e-imza adımlarından geçerek ulaşır. Aynı talimatın ikinci kez gönderilmesi gibi elle aktarıma özgü hatalar da akışın dışında kalır.",
        "Because the instruction goes from SAP to the bank without manual intervention, the risk of payment details being mistyped or altered during re-entry is removed. The instruction reaches the bank after passing through the defined approval and e-signature steps. Errors specific to manual transfer, such as sending the same instruction twice, are also kept out of the flow."
      ),
    ],
  },
  "customer-vendor-e-reconciliation": {
    slug: "customer-vendor-e-reconciliation",
    module: "FI",
    name: { tr: "Müşteri Satıcı E-Mutabakat", en: "Customer & Vendor e-Reconciliation" },
    short: {
      tr: "Cari mutabakatı e-ortama taşıyın; gönderim, yanıt ve uyuşmazlığı tek akışta yönetin.",
      en: "Move account reconciliation to digital — send, track and resolve in one flow.",
    },
    intro: {
      tr: "Cari hesap mutabakatı, bir şirketin müşterileri ve satıcılarıyla karşılıklı bakiyelerini belirli bir tarih itibarıyla teyit etmesidir. Birçok şirkette bu süreç hâlâ e-posta ve Excel üzerinden yürür: gönderim elle yapılır, yanıtlar farklı kişilerin posta kutularına dağılır ve dönem sonunda kimin mutabık olduğu, kimin olmadığı takip edilemez. Conforcus E-Mutabakat çözümü cari bakiye mutabakatlarını SAP içinden elektronik ortamda otomatik gönderir, karşı tarafın yanıtlarını ve uyuşmazlıkları statü bazında izler. Mutabakat süreci tek panelden uçtan uca yönetilir.",
      en: "Account reconciliation is the process by which a company confirms mutual balances with its customers and vendors as of a given date. In many companies it still runs on email and spreadsheets: sending is manual, replies are scattered across different people’s inboxes, and at period end it is not possible to tell who has confirmed and who has not. Conforcus e-Reconciliation sends balance confirmations electronically and automatically from within SAP, and tracks counterparty responses and disputes by status. The whole reconciliation cycle is managed end to end from a single panel.",
    },
    sections: [
      {
        h2: {
          tr: "Mutabakatın e-posta ve Excel ile yürütülmesinin sonuçları",
          en: "What happens when reconciliation runs on email and spreadsheets",
        },
        paras: [
          {
            tr: "Mutabakatın amacı, iki tarafın kayıtlarının birbiriyle uyumlu olduğunu dönem kapanmadan görmektir. Farkların çoğu zamanlamadan kaynaklanır: bir taraf faturayı ya da ödemeyi kaydetmiş, diğeri henüz kaydetmemiştir. Bir kısmı ise gerçek bir uyuşmazlığa işaret eder. Her iki durumda da farkın erken görülmesi gerekir; çünkü dönem kapandıktan sonra düzeltme yapmak çok daha zahmetlidir. Bağımsız denetimde de cari bakiyelerin karşı tarafla teyit edilmesi yaygın bir prosedürdür.",
            en: "The purpose of reconciliation is to see, before the period closes, that the two parties’ records agree. Most differences are a matter of timing: one side has posted an invoice or a payment and the other has not yet done so. Some point to a genuine dispute. In both cases the difference needs to be seen early, because corrections are far more laborious once the period is closed. Confirming balances with the counterparty is also a common procedure in an independent audit.",
          },
          {
            tr: "Standart SAP cari hesabın bakiyesini ve kalemlerini gösterir; ancak mutabakat yazışmasının gönderilmesi, yanıtların toplanması ve sonucun izlenmesi çoğu şirkette sistem dışında kalır. Bakiyeler SAP’tan alınır, formlara aktarılır ve tek tek gönderilir. Yanıt vermeyen carilerin takibi kişilere bağlıdır. Cari sayısı arttıkça gönderim ve takip işi dönem sonunun en yoğun günlerine sıkışır; denetim ve kapanış baskısı da aynı günlerde artar.",
            en: "Standard SAP shows the balance and the line items of an account, but in most companies sending the reconciliation correspondence, collecting the replies and tracking the outcome remain outside the system. Balances are extracted from SAP, copied into forms and sent one by one. Following up the accounts that do not reply depends on individuals. As the number of accounts grows, sending and follow-up are squeezed into the busiest days of period end, the same days on which audit and closing pressure mounts.",
          },
        ],
      },
      {
        h2: {
          tr: "E-Mutabakat çözümü süreci nasıl yürütür",
          en: "How the e-Reconciliation solution runs the process",
        },
        paras: [
          {
            tr: "Çözüm FI’daki müşteri ve satıcı cari hesap (AR/AP) verisiyle entegre çalışır. Mutabakat formları bu veriden otomatik üretilir ve SAP içinden elektronik ortamda gönderilir; bakiyelerin dışarı alınıp forma aktarılması gerekmez. Form doğrudan FI verisinden üretildiği için gönderilen bakiye ile sistemdeki bakiye arasında aktarım hatası oluşmaz. Karşı taraf yanıtını elektronik ortamda verir ve gelen yanıt ilgili cari hesapla eşleştirilir.",
            en: "The solution is integrated with customer and vendor account (AR/AP) data in FI. Confirmation forms are generated automatically from that data and sent electronically from within SAP, so balances no longer have to be extracted and copied into a form. Because the form is produced directly from FI data, no transfer error can arise between the balance sent and the balance in the system. The counterparty replies electronically, and each reply is matched to the relevant account.",
          },
          {
            tr: "Her cari için sürecin hangi aşamada olduğu statü olarak izlenir: formun gönderilip gönderilmediği, yanıtın gelip gelmediği, karşı tarafın mutabık olduğu ya da uyuşmazlık bildirdiği. Uyuşmazlık bildirilen hesaplar uyuşmazlık iş listesine düşer ve sonuçlanana kadar orada kalır. Bu bilgilerin tamamı tek panelde toplanır; mutabakat süreci buradan yönetilir.",
            en: "For every account, the stage the process has reached is tracked as a status: whether the form has been sent, whether a reply has arrived, and whether the counterparty has confirmed or raised a dispute. Disputed accounts drop into the dispute worklist and stay there until they are resolved. All of this information is brought together in a single panel, from which the reconciliation cycle is managed.",
          },
          {
            tr: "Süreç karşı taraf için de sadeleşir. Mutabakat formu elektronik ortamda ulaşır ve yanıt aynı yolla verilir; yanıtlar farklı kişilerin posta kutularına farklı biçimlerde gelmek yerine doğrudan ilgili cari hesaba bağlanır. Böylece bir yanıtın gelip gelmediği cari hesabın statüsünden anlaşılır.",
            en: "The process is simpler for the counterparty as well. The confirmation form arrives electronically and the reply is given the same way; instead of arriving in different forms in different people’s inboxes, replies are linked directly to the relevant account. Whether a reply has come in can therefore be seen from the status of the account.",
          },
        ],
      },
      {
        h2: {
          tr: "Dönem sonunda muhasebe ekibi için değişenler",
          en: "What changes for the accounting team at period end",
        },
        paras: [
          {
            tr: "Elle gönderim ve takip ortadan kalktığı için ekip zamanını form hazırlamaya değil, farkların incelenmesine ayırır. Mutabık ve uyuşmazlık statüleri anlık göründüğünden, yanıt vermeyen ya da fark bildiren cariler dönem kapanmadan öne çıkar. Ekip tüm carileri değil, yalnızca bu hesapları takip eder. Riskli hesaplar erken fark edilir ve dönem sonu çalışması hızlanır.",
            en: "Because manual sending and follow-up disappear, the team spends its time investigating differences rather than preparing forms. With confirmed and disputed statuses visible as they change, the accounts that have not replied or have reported a difference stand out before the period closes. The team follows up only these accounts rather than all of them. High-risk accounts are noticed early, and the period-end work moves faster.",
          },
          {
            tr: "Gönderim ve yanıt kayıtları sistemde tutulduğu için mutabakatın izi denetime hazırdır. Hangi cariye mutabakat gönderildiği ve sürecin nasıl sonuçlandığı sistemden gösterilir; bunun için e-posta arşivlerinin taranması gerekmez.",
            en: "Because dispatch and response records are kept in the system, the reconciliation trail is ready for audit. The system shows which accounts were sent a confirmation and how each case was resolved, with no need to search through email archives.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Çözüm hem müşteri hem satıcı hesapları için kullanılabilir mi?",
        "Can the solution be used for both customer and vendor accounts?",
        "Evet. Çözüm FI’daki alacak ve borç (AR/AP) cari hesap verisiyle entegredir; müşteri ve satıcı mutabakatları aynı panelden yürütülür. Hangi hesapların kapsama alınacağı kurulum sırasında tanımlanır.",
        "Yes. The solution is integrated with accounts receivable and accounts payable (AR/AP) data in FI, and customer and vendor reconciliations are run from the same panel. Which accounts are in scope is defined during implementation."
      ),
      faq(
        "Mutabakatın ne sıklıkla yapılacağını çözüm mü belirler?",
        "Does the solution dictate how often reconciliation is carried out?",
        "Hayır. Sıklığı şirketin kendi uygulaması ve denetim ihtiyacı belirler; birçok şirket mutabakatı dönem sonlarında yapar. Gönderim otomatik olduğu için mutabakatın daha sık yapılması ekibe aynı oranda iş yükü getirmez. Mutabakat takvimi kurulum sırasında şirketin kapanış takvimine göre planlanır.",
        "No. The frequency is set by the company’s own practice and audit needs; many companies reconcile at period ends. Because dispatch is automatic, reconciling more often does not add a proportionate workload for the team. The reconciliation calendar is planned during implementation around the company’s closing calendar."
      ),
      faq(
        "Bakiye farkları çoğunlukla nereden kaynaklanır?",
        "Where do balance differences usually come from?",
        "Farkların büyük kısmı zamanlamadan doğar: bir taraf faturayı, iadeyi ya da ödemeyi kaydetmiş, diğeri henüz kaydetmemiştir. Daha az sayıda fark ise fiyat, miktar ya da teslimat konusundaki gerçek bir anlaşmazlığa dayanır. Çözüm farkı kendisi düzeltmez; farkın hangi caride olduğunu ve uyuşmazlığın hangi statüde beklediğini görünür kılar, böylece düzeltme dönem kapanmadan yapılabilir.",
        "Most differences arise from timing: one party has posted an invoice, a return or a payment and the other has not yet done so. A smaller number rest on a genuine disagreement over price, quantity or delivery. The solution does not correct the difference itself; it makes visible which account the difference is on and what status the dispute is in, so that the correction can be made before the period closes."
      ),
    ],
  },
  "ifrs-16-package": {
    slug: "ifrs-16-package",
    module: "FI",
    name: { tr: "IFRS 16 Paketi", en: "IFRS 16 Package" },
    short: {
      tr: "Kiralama yükümlülüğü ve kullanım hakkı varlığını IFRS16’ya uygun, RE-FX entegre yönetin.",
      en: "Manage lease liability and right-of-use assets per IFRS 16 — integrated with RE-FX.",
    },
    intro: {
      tr: "IFRS16, kiracının kira sözleşmelerini bilançoda bir kullanım hakkı varlığı ve bir kiralama yükümlülüğü olarak göstermesini ister. Birçok şirkette bu sözleşmeler Excel’de yönetilir; kiralama yükümlülüğü, kullanım hakkı varlığı, faiz ve amortisman ayrı ayrı hesaplanır. Sözleşme değiştiğinde yapılması gereken yeniden ölçüm hataya açıktır; denetim ve raporlama da zorlaşır. Conforcus IFRS16 paketi kira sözleşmelerini SAP RE-FX ile entegre yönetir; yükümlülüğü, kullanım hakkı varlığını, faizi ve amortismanı IFRS16’ya uygun olarak otomatik hesaplar ve kaydeder. Sözleşme değişikliklerinde yeniden ölçüm de sistem içinde yürütülür.",
      en: "IFRS 16 requires a lessee to show its leases on the balance sheet as a right-of-use asset and a lease liability. In many companies these leases are managed in spreadsheets, with the lease liability, right-of-use asset, interest and depreciation each calculated separately. The remeasurement required when a contract changes is error-prone, and audit and reporting become harder. The Conforcus IFRS 16 package manages leases in integration with SAP RE-FX; it calculates and posts the lease liability, right-of-use asset, interest and depreciation automatically in line with IFRS 16. Remeasurement on contract changes also runs inside the system.",
    },
    sections: [
      {
        h2: {
          tr: "Kiralamaların Excel’de yönetilmesinin zorlukları",
          en: "Why leases are hard to manage in spreadsheets",
        },
        paras: [
          {
            tr: "IFRS16 öncesinde faaliyet kiralamaları bilanço dışında izlenir, kira ödemeleri doğrudan gider yazılırdı. Standartla birlikte bu sözleşmeler bilançoya girdi ve her biri için sözleşme süresi boyunca yürüyen bir hesaplama gerekli hale geldi. Kiracı, sözleşmenin başlangıcında kira ödemelerinin bugünkü değerini hesaplar ve bu tutarı yükümlülük olarak kaydeder; kullanım hakkı varlığı da bu yükümlülük temel alınarak oluşur. Sonraki her dönemde yükümlülük üzerinden faiz işler, varlık ise amortismana tabi tutulur. Dolayısıyla her sözleşme, süresi boyunca her dönem faiz ve amortisman için ayrı bir hesaplama ve muhasebe kaydı gerektirir. Sözleşme sayısı arttıkça bu planları Excel’de güncel tutmak ve muhasebe kayıtlarıyla tutarlı kılmak güçleşir.",
            en: "Before IFRS 16, operating leases were kept off the balance sheet and lease payments were simply expensed. The standard brought these contracts onto the balance sheet and made a calculation that runs for the whole term necessary for each of them. At the start of the contract the lessee calculates the present value of the lease payments and recognizes that amount as a liability; the right-of-use asset is then built on that liability. In every subsequent period interest accrues on the liability and the asset is depreciated. Each contract therefore requires a separate calculation and posting for interest and for depreciation in every period of its term. As the number of contracts grows, keeping these schedules up to date in spreadsheets and consistent with the accounting records becomes difficult.",
          },
          {
            tr: "En büyük risk sözleşme değişikliklerindedir. Kira süresi uzadığında, kira bedeli değiştiğinde ya da sözleşmenin kapsamı daraldığında yükümlülüğün ve kullanım hakkı varlığının yeniden ölçülmesi gerekir. Excel’de bu, mevcut planın elle yeniden kurulması demektir ve önceki hesaplamanın izi çoğu zaman kaybolur. Denetçi dönemin faiz ve amortisman tutarlarının hangi sözleşmeden ve hangi varsayımlardan geldiğini sorduğunda yanıt vermek zorlaşır; dipnotlar için gereken veriler de ayrı tablolardan derlenir.",
            en: "The greatest risk lies in contract changes. When the lease term is extended, the rent changes or the scope of the contract is reduced, the liability and the right-of-use asset have to be remeasured. In a spreadsheet this means rebuilding the existing schedule by hand, and the trail of the previous calculation is often lost. When the auditor asks which contract and which assumptions the period’s interest and depreciation came from, the answer is hard to give, and the data needed for the disclosures has to be compiled from separate spreadsheets.",
          },
        ],
      },
      {
        h2: {
          tr: "Paket RE-FX ve FI/AA ile nasıl çalışır",
          en: "How the package works with RE-FX and FI/AA",
        },
        paras: [
          {
            tr: "Paket SAP RE-FX (Esnek Gayrimenkul) ve FI/AA modülleriyle entegre çalışır. Kira sözleşmeleri RE-FX ile entegre yönetilir; böylece hesaplamanın dayandığı sözleşme bilgisi muhasebe kayıtlarıyla aynı sistemde durur. Paket bu sözleşmeler üzerinden kiralama yükümlülüğünü ve kullanım hakkı varlığını hesaplar, faiz ve amortisman planlarını oluşturur ve ilgili muhasebe kayıtlarını otomatik üretir.",
            en: "The package works in integration with SAP RE-FX (Flexible Real Estate) and FI/AA. Leases are managed in integration with RE-FX, so the contract information the calculation rests on sits in the same system as the accounting records. From these contracts the package calculates the lease liability and the right-of-use asset, builds the interest and depreciation schedules, and creates the related accounting postings automatically.",
          },
          {
            tr: "Sözleşme değiştiğinde yeniden ölçüm sistem içinde yürütülür: değişiklik sözleşmeye işlenir, yükümlülük ve kullanım hakkı varlığı güncel koşullara göre yeniden hesaplanır. Hesaplama sistemde kaldığı için yeniden ölçümün dayanağı sonradan da gösterilebilir. Paket IFRS16 raporlamasını da içerir; dipnotlar için gereken veriler aynı hesaplamalardan gelir. Çok şirketli yapılarda çalışır.",
            en: "When a contract changes, remeasurement runs inside the system: the change is entered on the contract, and the liability and the right-of-use asset are recalculated on the current terms. Because the calculation stays in the system, the basis for the remeasurement can also be shown afterwards. The package also includes IFRS 16 reporting, and the data needed for the disclosures comes from the same calculations. It runs in multi-company structures.",
          },
        ],
      },
      {
        h2: {
          tr: "Mali işler ve raporlama ekipleri için değişenler",
          en: "What changes for finance and reporting teams",
        },
        paras: [
          {
            tr: "Ekip dönem sonunda Excel planlarını güncellemek yerine sözleşme verisinin doğruluğuna odaklanır. Yükümlülük, kullanım hakkı varlığı, faiz ve amortisman aynı kaynaktan üretildiği için bu tutarlar birbiriyle ve muhasebe kayıtlarıyla tutarlıdır. Yeniden ölçüm elle yapılmadığından sözleşme değişikliklerindeki hata riski azalır.",
            en: "At period end the team focuses on the accuracy of the contract data instead of updating spreadsheet schedules. Because the liability, the right-of-use asset, interest and depreciation are produced from the same source, the amounts are consistent with one another and with the accounting records. Since remeasurement is no longer done by hand, the risk of error on contract changes falls.",
          },
          {
            tr: "Raporlama ve denetim tarafında IFRS16 dipnotları ve raporları sistemdeki hesaplamalara dayanır. Bir tutarın hangi sözleşmeden geldiği sistemden gösterilebildiği için dipnot ve raporlama denetime hazır hale gelir.",
            en: "On the reporting and audit side, IFRS 16 disclosures and reports rest on the calculations in the system. Because the system can show which contract an amount came from, disclosures and reporting are ready for audit.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "İskonto oranını ve kira süresini paket mi belirler?",
        "Does the package determine the discount rate and the lease term?",
        "Hayır. İskonto oranı ve kira süresi, şirketin muhasebe politikasına ve sözleşme koşullarına göre belirlenen girdilerdir. IFRS16’ya göre iskonto oranı kiralamadaki zımni faiz oranıdır; bu oran kolayca belirlenemiyorsa kiracının alternatif borçlanma faiz oranı kullanılır. Bu girdilerin sözleşmelere nasıl tanımlanacağı kurulum sırasında belirlenir; paket hesaplamayı bu girdiler üzerinden yapar.",
        "No. The discount rate and the lease term are inputs determined by the company’s accounting policy and the terms of the contract. Under IFRS 16 the discount rate is the interest rate implicit in the lease or, if that cannot be readily determined, the lessee’s incremental borrowing rate. How these inputs are assigned to contracts is defined during implementation, and the package performs the calculation on them."
      ),
      faq(
        "Excel’de izlenen mevcut sözleşmelerle nasıl başlanır?",
        "How do we start with contracts that are currently tracked in spreadsheets?",
        "Kapsamdaki sözleşmeler ve geçiş tarihi kurulum sırasında belirlenir; hesaplamalar bu tarihten itibaren sistemde yürür. Geçişten önce sözleşme verisinin, yani sürelerin, ödeme tutarlarının ve ödeme tarihlerinin gözden geçirilmesi önemlidir; çünkü hesaplamanın doğruluğu bu veriye bağlıdır. Excel’deki mevcut planlar bu aşamada karşılaştırma için kullanılabilir.",
        "The contracts in scope and the transition date are settled during implementation, and from that date the calculations run in the system. Before the transition it is important to review the contract data, that is, the terms, payment amounts and payment dates, because the accuracy of the calculation depends on it. The existing spreadsheet schedules can be used for comparison at this stage."
      ),
      faq(
        "TFRS 16 raporlaması yapan şirketler için durum farklı mı?",
        "Is anything different for companies reporting under TFRS 16?",
        "TFRS 16, IFRS16’nın Türkiye’de Kamu Gözetimi Kurumu (KGK) tarafından yayımlanan karşılığıdır ve aynı ölçüm ve muhasebeleştirme esaslarını içerir. Bu nedenle kiralama yükümlülüğü, kullanım hakkı varlığı, faiz ve amortisman hesaplamaları her iki adlandırma için de aynı mantıkla yapılır.",
        "TFRS 16 is the Turkish equivalent of IFRS 16, published by the Public Oversight Authority (KGK), and contains the same measurement and recognition principles. The calculations of lease liability, right-of-use asset, interest and depreciation therefore follow the same logic under either name."
      ),
    ],
  },
  "direct-debit-system-dbs-bank-integration": {
    slug: "direct-debit-system-dbs-bank-integration",
    module: "FI",
    name: { tr: "DBS banka entegrasyonu", en: "Direct Debit System (DBS) Bank Integration" },
    short: {
      tr: "Doğrudan Borçlandırma ile tahsilatı otomatikleştirin; bayi alacaklarınızı garanti altına alın.",
      en: "Automate collections with Direct Debit — secure your dealer receivables.",
    },
    intro: {
      tr: "Doğrudan Borçlandırma Sistemi (DBS), ana firmanın bayilerinden olan alacaklarını banka aracılığıyla tahsil ettiği bir banka ürünüdür. Banka her bayiye bir limit tanımlar; ana firma faturalarını bankaya bildirir ve banka vadesinde tutarı bayinin hesabından tahsil eder. Birçok şirkette DBS limitleri ve banka geri beslemesi SAP dışında izlenir, tahsilatlar tek tek takip edilir ve mutabakat zorlaşır. Conforcus DBS entegrasyonu Doğrudan Borçlandırma Sistemi’ni SAP’a bağlayarak tahsilatı otomatikleştirir; limit kullanımını, tahsilat dosyalarını ve banka geri beslemesini sistem içinde eşleştirir.",
      en: "The Direct Debit System (DBS) is a bank product through which a company collects its receivables from its dealers via the bank. The bank assigns each dealer a limit; the company notifies the bank of its invoices, and on the due date the bank collects the amount from the dealer’s account. In many companies DBS limits and bank feedback are tracked outside SAP, collections are followed up one by one, and reconciliation becomes difficult. Conforcus DBS integration connects the Direct Debit System to SAP and automates collections; it matches limit usage, collection files and bank feedback inside the system.",
    },
    sections: [
      {
        h2: {
          tr: "DBS tahsilatının SAP dışında izlenmesinin sonuçları",
          en: "What happens when DBS collections are tracked outside SAP",
        },
        paras: [
          {
            tr: "DBS’de sürekli değişen bilgiler vardır: bayinin limiti ve bu limitin ne kadarının kullanıldığı, bankaya bildirilen faturalar ve bankanın bu faturalar için döndürdüğü sonuç. Bu bilgiler SAP dışında izlendiğinde müşteri cari hesabındaki açık alacak ile bankadaki durum birbirinden kopar. Tahsil edilmiş bir fatura SAP’ta açık görünebilir; bir bayinin limitinin dolduğu ise ancak bankanın ekranına bakıldığında anlaşılır.",
            en: "Some information changes constantly in DBS: the dealer’s limit and how much of it has been used, the invoices notified to the bank, and the result the bank returns for those invoices. When this information is tracked outside SAP, the open receivable on the customer account and the position at the bank drift apart. A collected invoice may still show as open in SAP, and the fact that a dealer has used up its limit only becomes apparent by looking at the bank’s screen.",
          },
          {
            tr: "Bunun ilk sonucu, tahsilat takibinin kişilere bağlı kalmasıdır: ödeme gecikmeleri tek tek izlenir ve alacak riski büyür. Diğer sonuç mutabakatın zorlaşmasıdır: banka geri beslemesinin cari hesaptaki kalemlerle elle eşleştirilmesi gerekir ve çok bankalı yapılarda her bankanın dosyası ayrı ele alınır. Hazine, mali işler ve satış ekipleri aynı bayi için farklı bilgilere bakar.",
            en: "The first consequence is that collection follow-up depends on individuals: payment delays are followed one by one and receivable risk grows. The other is that reconciliation becomes difficult: bank feedback has to be matched by hand to the items on the customer account, and in a multi-bank setup each bank’s file is handled separately. Treasury, finance and sales end up looking at different information for the same dealer.",
          },
          {
            tr: "Limit bilgisi satış tarafı için de önemlidir. Bir bayinin DBS limiti, o bayiye kesilecek yeni faturaların DBS kapsamında tahsil edilip edilemeyeceğini belirler. Limit dolduğunda yeni faturalar bu kapsamın dışında kalabilir; satış ve bayi yönetimi ekipleri bu durumu zamanında göremezse alacak riski fark edilmeden büyür.",
            en: "Limit information matters to the sales side as well. A dealer’s DBS limit determines whether new invoices issued to that dealer can be collected under DBS. Once the limit is used up, new invoices may fall outside that cover; if sales and dealer management teams cannot see this in time, receivable risk grows unnoticed.",
          },
        ],
      },
      {
        h2: {
          tr: "Entegrasyon DBS sürecini SAP’a nasıl bağlar",
          en: "How the integration connects the DBS process to SAP",
        },
        paras: [
          {
            tr: "Entegrasyon FI müşteri cari hesap (AR) süreçleriyle birlikte çalışır. Tahsilat dosyaları SAP’ta üretilir; bankaya bildirilecek alacakların ayrıca derlenmesi gerekmez. Bankadan dönen geri besleme müşteri cari hesabındaki ilgili kalemle otomatik eşleştirilir. DBS limitleri ve limit kullanımı da SAP içinde izlenir; limit durumunu görmek için bankanın ekranına bakmak gerekmez.",
            en: "The integration works with the FI accounts receivable (AR) processes. Collection files are generated in SAP, so the receivables to be notified to the bank do not have to be compiled separately. Feedback returned by the bank is matched automatically to the related item on the customer account. DBS limits and limit usage are tracked inside SAP as well, so there is no need to look at the bank’s screen to see the limit position.",
          },
          {
            tr: "Limit kullanımı, tahsilat dosyaları ve banka geri beslemesi sistem içinde birbiriyle eşleştirildiği için tahsilat baştan sona izlenebilir hale gelir. Entegrasyon Türkiye banka standartlarına uyumludur ve çok bankalı yapıda çalışır; tahsilat dosyası üretimi ve geri besleme eşleştirmesi her banka için aynı süreç mantığıyla yürür. Ekibin her banka için ayrı bir çalışma yöntemi izlemesi gerekmez.",
            en: "Because limit usage, collection files and bank feedback are matched to one another inside the system, collections become traceable from start to finish. The integration is compliant with Turkish bank standards and runs in a multi-bank setup; collection file generation and feedback matching follow the same process logic for every bank. The team does not have to follow a different way of working for each bank.",
          },
        ],
      },
      {
        h2: {
          tr: "Hazine, mali işler ve satış ekipleri için değişenler",
          en: "What changes for treasury, finance and sales teams",
        },
        paras: [
          {
            tr: "Tahsilat otomatikleştiği için ekip faturaları tek tek takip etmez; DBS kapsamındaki alacaklar banka üzerinden vadesinde tahsil edilir ve sonuç SAP’a yansır. Tahsilat garantili ve izlenebilir hale gelir, alacak riski azalır. Banka geri beslemesi otomatik eşleştiği için mutabakat hızlanır; ekip yalnızca eşleşmeyen kayıtlarla ilgilenir.",
            en: "Because collections are automated, the team does not follow up invoices one by one; receivables under DBS are collected through the bank on their due date and the result is reflected in SAP. Collections become guaranteed and traceable, and receivable risk is reduced. Since bank feedback is matched automatically, reconciliation is faster and the team deals only with the records that do not match.",
          },
          {
            tr: "DBS limitleri ve kullanım durumu anlık göründüğü için satış ve bayi yönetimi ekipleri bir bayinin limit durumunu SAP’tan görür. Hazine ve mali işler de aynı bilgiye bakar; limit durumu için ayrı tablolar tutulmasına gerek kalmaz.",
            en: "With DBS limits and usage visible in real time, sales and dealer management teams can see a dealer’s limit position in SAP. Treasury and finance look at the same information, and separate spreadsheets for limit status are no longer needed.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "DBS’de tahsilat garantisi nasıl işler?",
        "How does the collection guarantee work in DBS?",
        "Garanti, entegrasyonun değil DBS ürününün bir özelliğidir: banka, bayiye tanımladığı limit dahilinde faturanın vadesinde ödenmesini üstlenir. Garantinin kapsamı ana firma ile banka arasındaki anlaşmaya göre belirlenir. Entegrasyon bu yapıyı SAP’a bağlar; limit kullanımı ve banka geri beslemesi sistemde eşleştirildiği için garantili tahsilat izlenebilir hale gelir.",
        "The guarantee is a feature of the DBS product, not of the integration: the bank undertakes to pay the invoice on its due date within the limit it has assigned to the dealer. The extent of the guarantee is set by the agreement between the company and the bank. The integration connects this arrangement to SAP; because limit usage and bank feedback are matched in the system, guaranteed collections become traceable."
      ),
      faq(
        "Tahsilat dosyaları elle mi hazırlanıyor?",
        "Are collection files prepared by hand?",
        "Hayır. Tahsilat dosyaları SAP’ta, FI müşteri cari hesap (AR) süreçleriyle entegre biçimde üretilir. Dosyanın içeriği müşteri hesabındaki alacak kalemlerine dayandığı için bankaya bildirilen tutarlar ile SAP’taki kayıtlar aynı kaynaktan gelir. Dosyanın bankaya hangi düzende iletileceği kurulum sırasında banka bazında tanımlanır.",
        "No. Collection files are generated in SAP, in integration with the FI accounts receivable (AR) processes. Because the content of the file is based on the receivable items on the customer account, the amounts notified to the bank and the records in SAP come from the same source. How the file is delivered to each bank is defined per bank during implementation."
      ),
      faq(
        "DBS kapsamında olmayan müşterilerin tahsilatı nasıl yürür?",
        "How are collections handled for customers outside DBS?",
        "Entegrasyon DBS ile tahsil edilen alacakları kapsar. DBS anlaşması olmayan müşterilerin tahsilatı mevcut FI süreçleriyle yürümeye devam eder. Hangi müşterilerin DBS kapsamında izleneceği kurulum sırasında tanımlanır.",
        "The integration covers receivables collected through DBS. Collections from customers without a DBS agreement continue to run through the existing FI processes. Which customers are followed under DBS is defined during implementation."
      ),
    ],
  },
  "automated-clearing-processes": {
    slug: "automated-clearing-processes",
    module: "FI",
    name: { tr: "Otomatik Denkleştirme Süreçleri", en: "Automated Clearing Processes" },
    short: {
      tr: "Açık kalemleri otomatik eşleştirin; manuel denkleştirme yükünü ekibinizden alın.",
      en: "Match open items automatically — lift the manual clearing burden off your team.",
    },
    intro: {
      tr: "SAP FI’da müşteri ve satıcı hesaplarındaki her fatura, ödeme ve iade bir açık kalem olarak durur ve karşılığı olan kalemle denkleştirilene kadar açık kalır. Birçok şirkette bu eşleştirme elle yapılır: ekip çok sayıda satır arasından birbirini karşılayan kalemleri seçer. İş zaman alır ve hata üretir; kapanmamış kalemler açık alacak ve borç tutarlarını olduğundan yüksek gösterir, raporları bozar. Conforcus otomatik denkleştirme çözümü açık kalemleri tanımlı kriterlerle (tutar, referans, vade, doküman) eşleştirir ve otomatik kapatır. Eşleşmeyen kalemler iş listesine düşer; elle müdahale bu kalemlerle sınırlı kalır.",
      en: "In SAP FI, every invoice, payment and credit memo on a customer or vendor account sits as an open item and stays open until it is cleared against its counterpart. In many companies this matching is done by hand: the team picks out corresponding items from among a large number of lines. The work is slow and error-prone, and uncleared items overstate open receivables and payables and distort reports. Conforcus automatic clearing matches open items by defined criteria (amount, reference, due date, document) and clears them automatically. Unmatched items drop into a worklist, so manual intervention is limited to those items.",
    },
    sections: [
      {
        h2: {
          tr: "Elle denkleştirmenin raporlara ve kapanışa etkisi",
          en: "How manual clearing affects reports and the close",
        },
        paras: [
          {
            tr: "Denkleştirme, birbirini karşılayan borç ve alacak kalemlerinin birbirine bağlanarak kapatılmasıdır. Bir tahsilat hesaba kaydedilmiş, ancak ilgili faturayla denkleştirilmemişse hem fatura hem tahsilat açık görünmeye devam eder. Yaşlandırma ve vade raporları açık kalemleri okuduğu için bu durum raporlara doğrudan yansır: ödenmiş bir fatura gecikmiş alacak gibi görünür ve tahsilat ekibi aslında ödenmiş bir tutar için müşteriyi arar.",
            en: "Clearing means linking debit and credit items that offset each other and closing them. If an incoming payment has been posted to the account but not cleared against the related invoice, both the invoice and the payment continue to show as open. Because aging and due-date reports read open items, this feeds straight into the reports: a paid invoice appears as an overdue receivable, and the collections team contacts a customer about an amount that has already been paid.",
          },
          {
            tr: "Elle denkleştirmede kullanıcı hesabı açar, birbirini karşılayan kalemleri seçer ve farkın sıfırlandığını görerek kaydeder. Bir müşteri tek bir ödemeyle birçok faturayı kapattığında ya da ödemede fatura bilgisi yer almadığında doğru kalemleri bulmak uzun sürer. Yanlış kalemlerin seçilmesi ise hem cari hesabı hem raporları bozar.",
            en: "In manual clearing the user opens the account, selects the items that offset each other and posts once the difference comes to zero. When a customer settles many invoices with a single payment, or when the payment carries no invoice information, finding the right items takes a long time. Selecting the wrong items distorts both the account and the reports.",
          },
          {
            tr: "Standart SAP’ta otomatik denkleştirme programı (F.13) bulunur; program, yapılandırmada tanımlanan alanlarda aynı değeri taşıyan ve toplamı sıfırlanan kalemleri kapatır. Uygulamada bu alanlar her zaman tutarlı doldurulmaz: ödeme kaydındaki fatura numarası eksik ya da farklı yazılmış olabilir. Bu tür kalemler standart kriterlerle eşleşmez ve elle denkleştirmeye kalır. İşlem hacmi yüksek şirketlerde bu iş dönem sonuna birikir ve kapanışı uzatır.",
            en: "Standard SAP has an automatic clearing program (F.13), which clears items that carry the same value in the fields defined in configuration and whose total comes to zero. In practice those fields are not always filled consistently: the invoice number on a payment posting may be missing or written differently. Such items do not match under the standard criteria and are left for manual clearing. In companies with high transaction volumes the work piles up towards period end and lengthens the close.",
          },
        ],
      },
      {
        h2: {
          tr: "Çözüm standart denkleştirmeyi nasıl genişletir",
          en: "How the solution extends standard clearing",
        },
        paras: [
          {
            tr: "Çözüm, SAP FI otomatik denkleştirme (F.13) ve açık kalem yönetimi mantığı üzerine kurulur; bu mantığı şirkete özel kural setleri ve eşleştirme algoritmalarıyla genişletir. Açık kalemler tutar, referans, vade ve doküman gibi tanımlı kriterlerle karşılaştırılır; kurala uyan kalemler otomatik kapatılır. Hangi kriterin hangi sırayla uygulanacağı kural setinde belirlenir.",
            en: "The solution builds on SAP FI automatic clearing (F.13) and open-item management, and extends it with company-specific rule sets and matching algorithms. Open items are compared by defined criteria such as amount, reference, due date and document, and the items that satisfy a rule are cleared automatically. The rule set determines which criteria are applied and in what order.",
          },
          {
            tr: "Denkleştirme batch olarak çalışır; kullanıcının kalemleri tek tek seçmesi gerekmez. Kuralların eşleştiremediği kalemler iş listesine düşer ve istisna raporunda görünür. Böylece her çalıştırmanın sonucu açıkça ayrışır: otomatik kapanan kalemler ve incelenmesi gereken istisnalar. Ekip, incelenecek kalemleri hesap hesap aramak yerine doğrudan iş listesinden çalışır.",
            en: "Clearing runs as a batch, so users do not have to select items one by one. Items the rules cannot match drop into a worklist and appear in the exception report. The outcome of each run is therefore clearly divided: the items cleared automatically, and the exceptions that need to be reviewed. Instead of searching account by account for the items to review, the team works directly from the worklist.",
          },
        ],
      },
      {
        h2: {
          tr: "Muhasebe ve hazine ekipleri için değişenler",
          en: "What changes for accounting and treasury teams",
        },
        paras: [
          {
            tr: "Ekip rutin eşleştirme işinden kurtulur ve zamanını istisna kalemlere ayırır. İstisnalar çoğunlukla gerçekten incelenmesi gereken durumlardır: eksik ödeme, yanlış referans ya da karşılığı henüz kaydedilmemiş bir belge. Bu kalemlerin dönem sonunu beklemeden görünür olması sorunların erken çözülmesini sağlar.",
            en: "The team is freed from routine matching and spends its time on the exception items. Exceptions are mostly the cases that genuinely need attention: a short payment, a wrong reference, or a document whose counterpart has not yet been posted. Having these items visible without waiting for period end allows problems to be resolved early.",
          },
          {
            tr: "Cari bakiyeler temiz ve gerçek kalır. Yaşlandırma ve vade raporları yalnızca gerçekten açık olan kalemleri gösterir; tahsilat ve ödeme planlaması bu raporlara dayanarak yapılabilir. Temiz cari hesaplar, müşteri ve satıcılarla yapılan bakiye mutabakatlarını da kolaylaştırır. Dönem sonuna birikmiş bir denkleştirme işi kalmadığı için kapanışın bu adımı kısalır.",
            en: "Customer and vendor balances stay clean and accurate. Aging and due-date reports show only the items that are genuinely open, so collection and payment planning can rely on them. Clean accounts also make balance reconciliations with customers and vendors easier. With no backlog of clearing left for period end, this step of the close becomes shorter.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Tahsilat kaydedildiği halde fatura neden açık görünür?",
        "Why does an invoice still show as open after the payment has been posted?",
        "SAP’ta tahsilatın kaydedilmesi ile faturanın kapatılması aynı işlem olmak zorunda değildir. Tahsilat müşteri hesabına faturayla ilişkilendirilmeden kaydedilirse hem fatura hem tahsilat açık kalem olarak durur; hesabın net bakiyesi doğrudur, ancak kalem bazlı raporlar yanıltıcı olur. Otomatik denkleştirme bu kalemleri tanımlı kriterlerle eşleştirip kapatır.",
        "In SAP, posting a payment and closing the invoice do not have to be the same transaction. If the payment is posted to the customer account without being assigned to the invoice, both the invoice and the payment remain as open items; the net balance of the account is correct, but item-level reports become misleading. Automatic clearing matches these items by the defined criteria and closes them."
      ),
      faq(
        "Otomatik denkleştirmenin iyi sonuç vermesi için veride nelere dikkat edilmelidir?",
        "What should we pay attention to in the data for automatic clearing to work well?",
        "Eşleştirme tutar, referans, vade ve doküman bilgisine dayandığı için bu alanların tutarlı doldurulması belirleyicidir. Örneğin ödeme kaydında fatura numarasının referans olarak taşınması eşleşmeyi kolaylaştırır. Eksik ya da tutarsız bilgi taşıyan kalemler iş listesine düşer; bu liste hangi alanlarda veri disiplininin artırılması gerektiğini de gösterir.",
        "Matching relies on amount, reference, due date and document information, so filling these fields consistently is decisive. Carrying the invoice number as the reference on a payment posting, for example, makes matching easier. Items with missing or inconsistent information drop into the worklist, which also shows where data discipline needs to improve."
      ),
      faq(
        "Çözüm devreye girdikten sonra elle denkleştirme yapılabilir mi?",
        "Can items still be cleared manually once the solution is in place?",
        "Evet. Çözüm standart SAP denkleştirmesinin üzerine kurulduğu için elle denkleştirmede kullanılan standart işlemler yerinde kalır. Ekip iş listesindeki istisna kalemleri bu işlemlerle sonuçlandırır. Çözüm rutin eşleşmeleri üstlenir; karar gerektiren kalemler kullanıcıda kalır.",
        "Yes. Because the solution is built on standard SAP clearing, the standard transactions used for manual clearing remain in place. The team resolves the exception items in the worklist with those transactions. The solution takes over routine matches, and the items that require a decision stay with the user."
      ),
    ],
  },
  "import-management-process": {
    slug: "import-management-process",
    module: "MM",
    name: { tr: "İthalat Süreci", en: "Import Management Process" },
    short: {
      tr: "İthalat maliyetlerinizi son kuruşuna kadar doğru malzeme maliyetine yansıtın.",
      en: "Land every import cost — accurately reflected in true material cost.",
    },
    intro: {
      tr: "İthal edilen bir malzemenin gerçek maliyeti tedarikçi faturasındaki fiyattan ibaret değildir; akreditif, gümrük, navlun ve sigorta masrafları da bu maliyetin parçasıdır. Birçok şirkette bu masraflar Excel’de ve farklı sistemlerde dağınık izlenir; gerçek malzeme maliyeti ancak iş bittikten sonra ve çoğu zaman hatalı ortaya çıkar. Standart SAP bu masrafları uçtan uca ilişkilendirmez. Conforcus ithalat çözümü tüm yan maliyetleri tek bir ithalat dosyasında toplar ve mal girişiyle birlikte malzeme maliyetine otomatik dağıtır. Akreditiften gümrük beyannamesine kadar her adım SAP içinde izlenir.",
      en: "The true cost of an imported material is more than the price on the supplier’s invoice: letter of credit, customs, freight and insurance charges are part of it too. In many companies these charges are tracked piecemeal in spreadsheets and separate systems, and the true material cost emerges only after the process has ended, often incorrectly. Standard SAP does not tie these charges together end to end. The Conforcus import solution gathers all landed-cost elements in a single import file and distributes them automatically to material cost at goods receipt. Every step, from letter of credit to customs declaration, is tracked inside SAP.",
    },
    sections: [
      {
        h2: {
          tr: "İthalat maliyetlerinin dağınık izlenmesinin sonuçları",
          en: "What happens when import costs are tracked piecemeal",
        },
        paras: [
          {
            tr: "Bir ithalatın masrafları farklı taraflardan ve farklı zamanlarda gelir: akreditif masrafı bankadan, navlun nakliyeciden, sigorta primi sigorta şirketinden, vergi ve harçlar gümrükten. Bu belgelerin hangi ithalata ve hangi malzemeye ait olduğu sistemde bir arada tutulmadığında bağlantı, kişilerin tuttuğu tablolarda kurulur. Muhasebe standartlarına göre stokun maliyeti satın alma fiyatının yanında ithalat vergilerini ve edinimle doğrudan ilgili nakliye gibi masrafları da içerir; dolayısıyla bu bağlantı kurulmadan doğru stok değeri oluşmaz.",
            en: "The charges of an import come from different parties at different times: the letter of credit charge from the bank, freight from the carrier, the insurance premium from the insurer, and duties and fees from customs. When the system does not hold together which import and which material these documents belong to, the link is made in spreadsheets kept by individuals. Under accounting standards the cost of inventory includes, alongside the purchase price, import duties and charges directly related to the acquisition such as transport; without that link, a correct stock value cannot be formed.",
          },
          {
            tr: "Sonuç birden fazla yerde görülür. Maliyet muhasebesi dönem sonunda masrafları toplayıp malzemelere elle dağıtmak zorunda kalır; bu hem zaman alır hem kapanışı geciktirir. Satış ve fiyatlandırma tarafı ise o ana kadar eksik maliyetle çalışır: malzeme stoka tedarikçi fiyatıyla girmiş, yan maliyetler henüz eklenmemiştir. Gerçek maliyet ortaya çıktığında aradaki fark çoğu zaman beklenmedik olur.",
            en: "The consequences show in more than one place. Cost accounting has to collect the charges at period end and allocate them to materials by hand, which takes time and delays the close. Meanwhile, sales and pricing work with an incomplete cost: the material has entered stock at the supplier’s price and the landed costs have not yet been added. When the true cost finally emerges, the difference is often unexpected.",
          },
        ],
      },
      {
        h2: {
          tr: "İthalat dosyası ve maliyet dağıtımının işleyişi",
          en: "How the import file and cost distribution work",
        },
        paras: [
          {
            tr: "Çözümün merkezinde ithalat dosyası vardır. Bir ithalata ait akreditif, gümrük, navlun ve sigorta maliyetleri bu dosyada toplanır; akreditiften gümrük beyannamesine kadar olan adımlar da aynı dosya üzerinden izlenir. Böylece bir ithalatın hangi adımda olduğu ve o ana kadar hangi masrafların oluştuğu tek yerden görülür. Satınalma siparişi, mal girişi ve fatura MM ve FI belgeleri olarak kalır; ithalat dosyası bu belgelerin bir arada görülmesini sağlar.",
            en: "At the centre of the solution is the import file. The letter of credit, customs, freight and insurance costs of an import are gathered in this file, and the steps from letter of credit to customs declaration are followed through it as well. Which step an import has reached, and which charges have arisen so far, can therefore be seen in one place. Purchase order, goods receipt and invoice remain MM and FI documents; the import file is where they are seen together.",
          },
          {
            tr: "Maliyet tarafında çözüm, SAP’ın planlanan teslimat maliyetleri (planned delivery costs) ve masraf koşulları yapısını kullanır. Yan maliyetler bu koşullar üzerinden tanımlanır ve mal girişi kaydedildiğinde ilgili malzemelere otomatik dağıtılır. Böylece malzeme stoka yalnızca tedarikçi fiyatıyla değil, yan maliyetleriyle birlikte girer. Çözüm MM ve FI ile entegre çalıştığı için stok değeri ve muhasebe kaydı birlikte oluşur.",
            en: "On the cost side, the solution uses SAP’s planned delivery costs and condition-based charge handling. Landed costs are defined through these conditions and, when the goods receipt is posted, are distributed automatically to the materials concerned. The material therefore enters stock not at the supplier’s price alone but together with its landed costs. Because the solution is integrated with MM and FI, the stock value and the accounting entry are created together.",
          },
        ],
      },
      {
        h2: {
          tr: "Satınalma, dış ticaret ve maliyet muhasebesi için değişenler",
          en: "What changes for procurement, foreign trade and cost accounting",
        },
        paras: [
          {
            tr: "Dış ticaret ve ithalat ekibi bir ithalatın akreditif, gümrük, navlun ve sigorta bilgilerini ayrı tablolarda değil, tek dosyada izler. Satınalma, bir siparişin yan maliyetleriyle birlikte neye mal olduğunu görür. Maliyet muhasebesi için gerçek malzeme maliyeti iş bittikten sonra değil, mal girişiyle birlikte oluşur; dönem sonunda masrafları elle dağıtma çalışması ortadan kalkar ve kapanış hızlanır.",
            en: "The foreign trade and import team follows the letter of credit, customs, freight and insurance information of an import in one file rather than in separate spreadsheets. Procurement sees what an order costs together with its landed costs. For cost accounting, the true material cost is formed at goods receipt rather than after the process has ended; the period-end work of allocating charges by hand disappears and the close speeds up.",
          },
          {
            tr: "Bu ekipler aynı dosyaya baktığı için bir masrafın hangi ithalata ait olduğu sorusu yazışmayla değil, sistemden yanıtlanır. Denetimde de aynı kolaylık geçerlidir: bir ithalatın akreditif, gümrük, navlun ve sigorta kalemleri ithalat dosyasından izlenebilir.",
            en: "Because these teams look at the same file, the question of which import a charge belongs to is answered from the system rather than by correspondence. The same applies in an audit: the letter of credit, customs, freight and insurance items of an import can be traced from the import file.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Yan maliyet (landed cost) neleri kapsar?",
        "What does landed cost cover?",
        "Yan maliyet, malzemenin tedarikçi fiyatına ek olarak şirketin deposuna ulaşana kadar oluşan masraflardır. Çözümde bu masraflar akreditif, gümrük, navlun ve sigorta başlıklarında izlenir. Bir şirketin hangi masraf türlerini kullanacağı kurulum sırasında tanımlanır; önemli olan, bu masrafların ait oldukları ithalatla ve malzemeyle ilişkilendirilmesidir.",
        "Landed cost is the set of charges incurred, on top of the supplier’s price, until the material reaches the company’s warehouse. In the solution these charges are tracked under letter of credit, customs, freight and insurance. Which charge types a company uses is defined during implementation; what matters is that the charges are linked to the import and the material they belong to."
      ),
      faq(
        "Planlanan teslimat maliyeti ne demektir?",
        "What are planned delivery costs?",
        "Planlanan teslimat maliyetleri, SAP’ta satınalma siparişi oluşturulurken koşul olarak tanımlanan navlun, gümrük ve benzeri masraflardır. Standart SAP bu maliyetleri mal girişinde malzemenin değerine dahil eder. Çözüm bu standart yapıyı kullanır; farkı, masrafların ithalat dosyasında bir arada toplanması ve dağıtımın otomatik yapılmasıdır.",
        "Planned delivery costs are charges such as freight and customs that are defined as conditions in SAP when the purchase order is created. Standard SAP includes these costs in the value of the material at goods receipt. The solution uses this standard structure; what it adds is that the charges are gathered in the import file and the distribution is automatic."
      ),
      faq(
        "Malzeme maliyetinin mal girişinde doğru oluşması neden önemlidir?",
        "Why does it matter that material cost is correct at goods receipt?",
        "Malzeme stoka girdiği andan itibaren üretimde kullanılabilir ya da satılabilir; tüketim ve satış maliyeti o andaki stok değeri üzerinden hesaplanır. Yan maliyetler sonradan eklenirse malzemenin bir kısmı eksik maliyetle tüketilmiş olur ve fark sonradan düzeltilmek zorunda kalır. Yan maliyetler mal girişiyle birlikte dağıtıldığında malzeme baştan tam maliyetiyle stoka girer.",
        "From the moment a material enters stock it can be used in production or sold, and the cost of consumption and of sales is calculated on the stock value at that time. If landed costs are added later, part of the material will already have been consumed at an incomplete cost and the difference has to be corrected afterwards. When landed costs are distributed at goods receipt, the material enters stock at its full cost from the start."
      ),
    ],
  },
  "invoice-approval-workflow": {
    slug: "invoice-approval-workflow",
    module: "MM",
    name: { tr: "Fatura Onay", en: "Invoice Approval Workflow" },
    short: {
      tr: "Fatura onayını siparişe bağlayın; tam eşleşen otomatik geçsin, gerisi doğru kişiye gitsin.",
      en: "Tie invoice approval to the PO — auto-post perfect matches, route the rest to the right person.",
    },
    intro: {
      tr: "Satınalma siparişine bağlı bir fatura geldiğinde faturanın sipariş ve mal girişiyle uyumlu olup olmadığı kontrol edilir. Birçok şirkette bu kontrol elle yapılır; fatura doğru onaycıya geç ulaşır, sipariş ile fatura arasındaki küçük farklar bile süreci tıkar ve onayın kimde beklediği bilinmez. Sonuçta ödeme gecikir. Conforcus fatura onay çözümü gelen faturayı satınalma siparişi (SAS) ile eşleştirir; tam eşleşen faturaları otomatik kaydeder, fark içerenleri önceden tanımlı kişilerin onayına ya da bilgisine yönlendirir. Akış uçtan uca SAP içinde işler.",
      en: "When an invoice arrives against a purchase order, it has to be checked against the order and the goods receipt. In many companies that check is done by hand; the invoice reaches the right approver late, even small differences between the purchase order and the invoice stall the process, and nobody knows who is holding the approval. Payment is delayed as a result. The Conforcus invoice approval solution matches the incoming invoice to the purchase order (PO); it posts perfect matches automatically and routes invoices with a discrepancy to predefined people for approval or for information. The flow runs end to end inside SAP.",
    },
    sections: [
      {
        h2: {
          tr: "Elle fatura kontrolünün yol açtığı gecikmeler",
          en: "The delays caused by manual invoice checking",
        },
        paras: [
          {
            tr: "Siparişe bağlı faturaların önemli bir kısmı hiçbir fark içermez: miktar teslim alınan miktarla, fiyat siparişteki fiyatla aynıdır. Elle yürüyen bir süreçte bu faturalar da fark içerenlerle aynı kuyrukta bekler; çünkü her faturaya birinin bakması gerekir. Muhasebe ekibinin zamanı, karar gerektirmeyen kontrollere gider.",
            en: "A good share of PO-based invoices contain no difference at all: the quantity equals the quantity received and the price equals the price on the order. In a manual process these invoices wait in the same queue as the ones with a discrepancy, because someone has to look at every invoice. The accounting team’s time goes into checks that require no decision.",
          },
          {
            tr: "Fark içeren faturalarda sorun kontrolün kendisi değil, kararın kime ait olduğudur. Fiyat farkını satınalmanın, miktar farkını malı teslim alan birimin değerlendirmesi gerekir; fatura ise çoğu zaman e-posta ile, kimin bakacağı belli olmadan dolaşır. Onay beklerken faturanın nerede olduğu bilinmez; tedarikçiye ödeme gecikir ve dönem sonunda kaydedilmemiş faturalar kapanışı zorlaştırır.",
            en: "With invoices that do contain a discrepancy, the problem is not the check itself but who owns the decision. A price difference needs to be assessed by procurement, a quantity difference by the unit that received the goods; yet the invoice often circulates by email with no clear owner. While it waits for approval, nobody knows where it is; payment to the vendor is delayed, and at period end unposted invoices make the close harder.",
          },
          {
            tr: "Sorun fatura hacmiyle birlikte büyür. Fatura sayısı arttıkça kontrol kuyruğu uzar ve onay bekleyen faturaların takibi ayrı bir iş haline gelir. Muhasebe ekibi, tedarikçilerin ödeme sorularını yanıtlayabilmek için faturaların nerede olduğunu araştırmak zorunda kalır.",
            en: "The problem grows with invoice volume. As the number of invoices rises, the checking queue lengthens and keeping track of invoices awaiting approval becomes a task in its own right. The accounting team has to find out where invoices are in order to answer vendors’ questions about payment.",
          },
        ],
      },
      {
        h2: {
          tr: "Çözüm faturayı siparişle nasıl eşleştirir ve yönlendirir",
          en: "How the solution matches the invoice to the PO and routes it",
        },
        paras: [
          {
            tr: "Çözüm lojistik fatura doğrulama (MIRO) ve satınalma siparişi ile entegre çalışır ve üç yönlü eşleştirme kullanır: fatura, ilgili sipariş ve mal girişiyle karşılaştırılır. Tam eşleşme varsa fatura kullanıcı müdahalesi olmadan otomatik kaydedilir. Böylece fark içermeyen faturalar kuyrukta beklemez ve muhasebe ekibinin bunları elle kontrol etmesi gerekmez.",
            en: "The solution is integrated with Logistics Invoice Verification (MIRO) and the purchase order, and uses three-way matching: the invoice is compared with its purchase order and the goods receipt. Where there is a perfect match, the invoice posts automatically with no user intervention. Invoices with no discrepancy therefore do not wait in a queue, and the accounting team does not have to check them by hand.",
          },
          {
            tr: "Fark içeren faturalar iş akışına girer. İş akışı faturayı önceden tanımlı kişilere yönlendirir; bu kişilerin bir kısmı onay verir, bir kısmı yalnızca bilgilendirilir. Kimin hangi durumda onaycı olacağı kurulum sırasında tanımlanan kurallarla belirlenir. Her onay adımı kimin, neyi, ne zaman onayladığı bilgisiyle kayıt altına alınır ve akışın tamamı SAP içinde işler.",
            en: "Invoices with a discrepancy enter the workflow. The workflow routes the invoice to predefined people, some of whom approve while others are only informed. Who acts as approver in which situation is determined by rules defined during implementation. Every approval step is recorded with who approved what and when, and the whole flow runs inside SAP.",
          },
        ],
      },
      {
        h2: {
          tr: "Muhasebe ve satınalma ekipleri için değişenler",
          en: "What changes for accounting and procurement teams",
        },
        paras: [
          {
            tr: "Muhasebe ekibi tam eşleşen faturalara dokunmaz; zamanını fark içeren faturalara ayırır. Fark içeren fatura doğru onaycıya doğrudan ulaştığı için e-posta ile takip ve hatırlatma gerekmez. Onayın kimde beklediği sistemden görülür; bir tedarikçi ödemesini sorduğunda yanıt faturanın kendisinden verilir.",
            en: "The accounting team does not touch perfectly matched invoices and spends its time on those with a discrepancy. Because an invoice with a discrepancy reaches the right approver directly, there is no need for follow-up and reminders by email. Who is holding the approval is visible in the system; when a vendor asks about a payment, the answer comes from the invoice itself.",
          },
          {
            tr: "Satınalma ekibi kendisine yönlendirilen farkları fatura muhasebede beklerken değil, fatura geldiğinde görür. Faturalar zamanında kaydedildiği için ödemeler gecikmez. Onay geçmişi fatura bazında tutulduğundan iç kontrol ve denetim sorularına yanıt vermek de kolaylaşır.",
            en: "Procurement sees the discrepancies routed to it when the invoice arrives, not while the invoice is waiting in accounting. Because invoices are posted on time, payments are not delayed. And since the approval history is kept invoice by invoice, internal control and audit questions are easier to answer.",
          },
          {
            tr: "Değişiklik dönem sonunda da görülür. Kaydedilmemiş bir fatura satıcı hesabında ve vergi kayıtlarında yer almaz; bu nedenle kapanışta bekleyen faturaların tek tek izlenmesi gerekir. Tam eşleşen faturalar beklemeden kaydedildiği için bekleyen fatura sayısı azalır; fark içeren faturaların kimde beklediği ise sistemden görülür.",
            en: "The change shows at period end as well. An unposted invoice appears neither on the vendor account nor in the tax records, so invoices that are still pending have to be followed one by one at close. Because perfectly matched invoices are posted without waiting, fewer invoices are left pending, and the system shows who is holding each invoice with a discrepancy.",
          },
        ],
      },
    ],
    faqs: [
      faq(
        "Üç yönlü eşleştirme ne anlama gelir?",
        "What does three-way matching mean?",
        "Üç yönlü eşleştirme, faturanın satınalma siparişi ve mal girişiyle karşılaştırılmasıdır. Sipariş neyin hangi fiyatla sipariş edildiğini, mal girişi neyin teslim alındığını, fatura ise tedarikçinin ne talep ettiğini gösterir. Bu belgeler birbiriyle uyumluysa faturanın kaydedilmesi için ek bir karar gerekmez. Uyumlu değilse hangi belgenin diğerlerinden ayrıştığı, farkı kimin değerlendirmesi gerektiğini de gösterir.",
        "Three-way matching compares the invoice with the purchase order and the goods receipt. The purchase order shows what was ordered and at what price, the goods receipt shows what was received, and the invoice shows what the vendor is charging. If these documents agree, no further decision is needed for the invoice to be posted. If they do not, the document that differs from the others also indicates who needs to assess the discrepancy."
      ),
      faq(
        "Çözüm tedarikçi ödemelerindeki gecikmeyi nasıl azaltır?",
        "How does the solution reduce delays in vendor payments?",
        "Gecikme başlıca şu nedenlerden doğar: fark içermeyen faturaların elle kontrol kuyruğunda beklemesi ve fark içeren faturaların doğru kişiye geç ulaşması. Çözüm ilkini otomatik kayıtla, diğerini iş akışı yönlendirmesiyle giderir. Fatura zamanında kaydedildiğinde ödeme de vadesinde yapılabilir.",
        "Delays arise mainly from invoices with no discrepancy waiting in a manual checking queue, and from invoices with a discrepancy reaching the right person late. The solution addresses the former with automatic posting and the latter with workflow routing. When an invoice is posted on time, it can also be paid on its due date."
      ),
      faq(
        "Çözüm mevcut MIRO sürecinin yerine mi geçiyor?",
        "Does the solution replace the existing MIRO process?",
        "Hayır. Çözüm lojistik fatura doğrulama (MIRO) ile entegre çalışır; faturalar yine SAP’ın fatura doğrulama belgeleri olarak kaydedilir. Değişen, kaydın nasıl gerçekleştiğidir: tam eşleşen faturada kayıt otomatik oluşur, fark içeren faturada ise iş akışı üzerinden onay ya da bilgilendirme adımı devreye girer.",
        "No. The solution works in integration with Logistics Invoice Verification (MIRO), and invoices are still posted as SAP invoice verification documents. What changes is how the posting comes about: for a perfect match the posting is created automatically, while for an invoice with a discrepancy an approval or information step comes in through the workflow."
      ),
    ],
  },
};

for (const slug of PRODUCT_SLUGS) {
  const extra = PRODUCT_NOTES[slug];
  if (extra) PRODUCT_PAGES[slug].sections.push(extra);
}
