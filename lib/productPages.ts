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
      tr: "Mevzuata uyumlu enflasyon düzeltmesi — kapanışı geciktirmeden SAP içinde.",
      en: "Statutory inflation adjustment inside SAP, without parking the close in a spreadsheet.",
    },
    intro: {
      tr: "Enflasyon muhasebesi, finans ekibinin ‘bir kere çalıştırılan program’ sandığı işlerden değildir. Endeks, parasal / parasal olmayan ayrımı, duran varlık, stok ve özkaynak düzeltmesi aynı kapanış penceresine sıkışır. Türkiye’de tebliğ ve TMS/TFRS yorumları değiştikçe Excel modeli bir gece eski kalır. Conforcus paketi, düzeltmeyi SAP FI (ve ihtiyaç halinde MM/CO kesiti) içinde koşturur; denetçiye ‘dosyada var’ değil, belgede iz bırakır. Bu sayfa enflasyon düzeltmesini fiilen kapatmış ekipler için yazıldı — slogan için değil.",
      en: "Inflation accounting is not a program you run once and forget. Indices, monetary versus non-monetary splits, PPE, inventory and equity adjustments all collide in the same close window. In Türkiye, a spreadsheet model goes stale the night a communiqué moves. Our package runs the adjustment inside SAP FI (and across MM/CO where the close needs it) so the auditor follows a document, not a file share. This page is for teams who actually have to close — not for a slogan.",
    },
    sections: [
      {
        h2: { tr: "Enflasyon düzeltmesi neden kapanışı kilitler?", en: "Why does inflation adjustment stall the close?" },
        paras: [
          {
            tr: "Çünkü iş tek bir ‘düzeltme kaydı’ değildir. Parasal kalemler ile duran varlık farklı endekslenır; stok yöntemi (FIFO, ortalama) sonucu değiştirir; geçmiş yıl düzeltmesi açılış bakiyesini iter. Bir hesap planı kalemi yanlış sınıfta kaldıysa tüm mizan kayar. Ekip bunu fark ettiğinde dönem zaten kapanmak üzeredir. SAP dışında yapılan düzeltme, bir sonraki ayın açılışıyla çatışır: kimse hangi bakiyenin ‘gerçek’ olduğunu söyleyemez.",
            en: "Because it is not one ‘adjustment posting’. Monetary items and PPE index differently; inventory method (FIFO, average) changes the result; prior-year restatement shoves the opening balance. One GL account in the wrong class and the trial balance slides. Teams notice this when the period is already supposed to close. An extra-SAP adjustment then fights next month’s opening: nobody can say which balance is ‘real’.",
          },
          {
            tr: "İkinci kilit, yetki ve tekrarlanabilirliktir. Düzeltmeyi iki kişi ‘bilir’, üçüncü kişi izindeyse kapanış bekler. Programın parametreleri (endeks tablosu, hesap ataması, belge türü) versiyonlanmazsa denetimde ‘nasıl yaptınız?’ sorusu e-posta aramaya döner. Paket, parametreyi master data gibi tutar; çalıştırma log’u belgede kalır.",
            en: "The second lock is knowledge and repeatability. Two people ‘know’ the adjustment; if the third is on leave, the close waits. If index tables, account assignments and document types are not versioned, the audit question ‘how did you do this?’ becomes a mail search. The package treats parameters like master data; the run leaves a document trail.",
          },
        ],
      },
      {
        h2: { tr: "SAP içinde hangi nesneler konuşur?", en: "Which SAP objects actually talk to each other?" },
        paras: [
          {
            tr: "FI belge ve hesap planı çekirdektir. Duran varlık tarafı varlık sınıfı ve değerleme alanı ister; stok tarafı değerleme sınıfı ve dönem stok miktarı ister. Özkaynak ve geçmiş yıl kârı ayrı bir düzeltme setidir. Yanlış nesnede ‘toplu kayıt’ atmak, raporları düzeltmez — ters kayıt üretir. Paket, parasal olmayan kalem listesini sizin hesap planınıza bağlar; her çalıştırmada aynı sınıfın aynı kuralı görmesini sağlar.",
            en: "FI documents and the chart of accounts are the core. PPE needs asset class and depreciation area; inventory needs valuation class and period quantity. Equity and retained earnings are a separate restatement set. A mass posting on the wrong object does not fix reports — it creates reversals. The package binds the non-monetary list to your chart so the same class sees the same rule on every run.",
          },
          {
            tr: "CO ve kâr merkezi raporlaması unutulursa yönetim raporu ile yasal rapor ayrışır. Enflasyon düzeltmesi ‘sadece mali işler’ diye kesilirse üretim ve stok ekipleri sapmayı geç fark eder. Bu yüzden keşifte FI ile MM’i aynı masaya oturturuz. Rakam uydurmayız: sizin mizanınız, sizin varlık defteriniz, sizin stok değerlemeniz.",
            en: "If CO and profit-center reporting are skipped, management and statutory books drift. If inflation is framed as ‘finance only’, production and inventory notice the gap late. Discovery therefore puts FI and MM at the same table. We do not invent figures: your trial balance, your asset book, your inventory valuation.",
          },
        ],
      },
      {
        h2: { tr: "Kimler bu paketi konuşmalı?", en: "Who should even discuss this package?" },
        paras: [
          {
            tr: "TMS 29 / yerel enflasyon düzeltmesi kapsamına giren veya girme eşiğini izleyen şirketler; özellikle duran varlık yoğun, stoklu ve çok şirket kodlu yapılar. Holding raporlaması IFRS, yasal defter yerel ise iki iz aynı anda yönetilir. ‘Biz bu yıl belki çıkarız’ belirsizliği, parametreleri şimdiden SAP’de tutmayı engellemez — endeks gelince çalıştırırsınız.",
            en: "Companies inside IAS 29 or local inflation restatement — or watching the threshold — especially asset-heavy, inventory-heavy, multi-company-code groups. If the holding reports IFRS and the statutory book is local, you are already managing two tracks. ‘We might be in scope this year’ is not a reason to keep parameters in a private workbook; when the index lands, you run.",
          },
        ],
      },
      {
        h2: { tr: "Kurulumdan sonra AMS’e ne kalır?", en: "What is left for AMS after go-live?" },
        paras: [
          {
            tr: "Endeks güncellemesi, yeni hesap sınıfı, varlık alımı sonrası ilk düzeltme, dönem kesiti. Bunlar proje değil, işletmedir. AMS sözleşmesine ‘enflasyon çalıştırma penceresi’ yazılmazsa kapanış günü bilet kuyruğuna düşer. Paketle birlikte runbook veririz: kim çalıştırır, kim onaylar, hata kodunda ne yapılır.",
            en: "Index updates, a new account class, the first restatement after an asset acquisition, the period cut. That is operations, not a project. If the AMS agreement has no ‘inflation run window’, it lands in the ticket pile on close day. We ship a runbook with the package: who runs, who approves, what happens on an error code.",
          },
        ],
      },
    ],
    faqs: [
      faq("Excel modelini SAP’e taşır mısınız?", "Will you migrate our Excel model into SAP?", "Mantığı dinleriz, hücreleri kopyalamayız. Yanlış sınıflama Excel’de gizlenir, belgede görünür.", "We listen to the logic; we do not copy cells. Bad classification hides in Excel and shows on a document."),
      faq("Hangi modül?", "Which module?", "Çekirdek FI. Stok ve varlık duruma göre MM ve AA kesiti açılır.", "FI is the core. Inventory and assets open MM and AA where the close needs them."),
      faq("TFRS ve VUK aynı anda mı?", "IFRS and local books together?", "Paralel defter veya ayrı hesap seti ile. Tek kayda zorlamayız.", "Via parallel ledger or a separate account set. We do not force a single posting."),
      faq("Ne kadar sürer?", "How long to deploy?", "Hesap planı ve varlık defteri temizse keşif kısadır. Kirli sınıflamada önce envanter.", "Short discovery if the chart and asset book are clean. Dirty classification needs an inventory first."),
      faq("Denetçi ne görür?", "What does the auditor see?", "Belge, hesap ataması, endeks tablosu ve çalıştırma log’u — kişisel klasör değil.", "The document, account assignment, index table and run log — not a personal folder."),
    ],
  },
  "e-payment-bank-e-signature-integrations": {
    slug: "e-payment-bank-e-signature-integrations",
    module: "FI",
    name: { tr: "E-Ödeme, Banka ve E-imza entegrasyonları", en: "e-Payment, Bank & e-Signature Integrations" },
    short: {
      tr: "Ödeme önerisinden banka talimatına ve e-imzaya — SAP’den çıkmadan.",
      en: "From payment proposal to bank instruction and e-signature without leaving SAP.",
    },
    intro: {
      tr: "Ödeme, şirketin en görünür kontrol noktasıdır. SAP’de öneri oluşur, sonra birileri XML’i e-posta ile bankaya atar, imza portalında onay bekler, mutabakat cuma akşamına kalır. Aradaki boşluk hem dolandırıcılık riski hem kapanış riskidir. Bu paket banka bağlantısını, ödeme dosyasını ve e-imza onayını FI ödeme programına bağlar. Hangi bankanın hangi formatı istediğini ‘bizde Ali bilir’ olmaktan çıkarır.",
      en: "Payments are the most visible control in the company. A proposal is born in SAP, then someone mails an XML to the bank, waits in a signature portal, and reconciliation slips to Friday evening. The gap is fraud risk and close risk. This package ties the bank connection, the payment file and e-signature approval back to the FI payment program. Which bank wants which format stops being ‘Ali knows’.",
    },
    sections: [
      {
        h2: { tr: "Neden hâlâ dosya taşıyoruz?", en: "Why are we still moving files by hand?" },
        paras: [
          {
            tr: "Çünkü her banka biraz farklı konuşur ve proje ‘çekirdek FI’ bitince entegrasyon 2. faza itilir. 2. faz, hazine’nin Excel’idir. Ödeme ortağı değişince format kırılır; e-imza sağlayıcısı şifre politikasını değiştirince onay durur. SAP standardı (payment medium, BCM, house bank) bu parçaları taşır — yeter ki banka ve imza uçları tarif edilsin.",
            en: "Because every bank speaks a slightly different dialect, and integration is pushed to phase 2 once ‘core FI’ is signed off. Phase 2 is treasury’s spreadsheet. Change a payment factory and the format breaks; the e-signature vendor changes a password policy and approvals freeze. SAP standard (payment medium, BCM, house bank) will carry the parts — if the bank and signature edges are actually specified.",
          },
          {
            tr: "İkinci neden, yetki ayrılığıdır. Öneriyi kuran ile imzalayan aynı kişi olmasın diye süreç SAP dışına kaçırılır. Doğru tasarım tam tersidir: öneri, onay, dosya üretimi ve banka teyidi aynı belgede, farklı rollerle.",
            en: "The second reason is segregation of duties. The process is pushed outside SAP so the proposer is not the signer. The right design is the opposite: proposal, approval, file generation and bank acknowledgement on the same document, with different roles.",
          },
        ],
      },
      {
        h2: { tr: "Hangi uçlar pakete girer?", en: "Which edges are in the package?" },
        paras: [
          {
            tr: "House bank ve hesap belirleme, ödeme yöntemi, payment medium / XML veya bankanın beklediği host-to-host, durum dönüşü (ödeme kabul / ret), e-imza veya banka onay iş akışı. Türkiye’de e-ödeme ve banka imza ürünleri çeşitlidir; ‘tek entegrasyon herkese’ iddiası yoktur. Keşifte mevcut banka listesi ve imza politikası çıkar, sonra bağlantı tek tek bağlanır.",
            en: "House bank and account determination, payment method, payment medium / XML or the bank’s host-to-host, status back (accept / reject), e-signature or bank-approval workflow. Türkiye’s e-payment and bank-signature products vary; there is no honest ‘one connector for all’. Discovery lists banks and signature policy, then each connection is bound.",
          },
          {
            tr: "Hazine raporu (vade, likidite) FI açık kaleminden okunmalıdır. Ayrı bir ‘ödeme Excel’i’ ikinci gerçeklik yaratır. Paket, öneri çalıştırıldığında açık kalemi kilitler veya izler; çift ödemeyi ‘fark ettik’ seviyesinden ‘sistem bırakmadı’ seviyesine çeker.",
            en: "Treasury reporting (due dates, liquidity) should read from FI open items. A side ‘payments Excel’ creates a second reality. When the proposal runs, the package locks or tracks the open item so double pay moves from ‘we noticed’ to ‘the system refused’.",
          },
        ],
      },
      {
        h2: { tr: "Kimin için öncelikli?", en: "Who should prioritise this?" },
        paras: [
          {
            tr: "Çok bankalı, çok şirket kodlu, tedarikçi ödemesi yoğun işletmeler; özellikle imza sirküleri ve çift onay isteyen yapılar. Global rollout’ta ülke bankası değişir — şablon ödeme yöntemi kalır, format yerelleşir. Almanya DATEV dünyası ile Türkiye banka XML’i aynı cümlede çözülmez; ülkeye göre uç açılır.",
            en: "Multi-bank, multi-company-code businesses with heavy vendor payments — especially dual approval and signature circulars. In a global rollout the country bank changes: the template payment method stays, the format localises. German DATEV-land and a Turkish bank XML are not one sentence; the edge opens per country.",
          },
        ],
      },
      {
        h2: { tr: "Güvenlik ve AMS", en: "Security and AMS" },
        paras: [
          {
            tr: "Sertifika, kullanıcı ve IP kısıtı banka tarafında biter; SAP tarafında rol ve BCM/onay kademesi durur. Sertifika yenilemesi AMS takvimine yazılır — aksi halde bir sabah ödeme durur ve ‘sistem çöktü’ sanılır. İzleme: başarısız dosya, imzasız bekleyen, bankadan dönmeyen teyit.",
            en: "Certificates, users and IP allow-lists end at the bank; roles and BCM/approval steps stay in SAP. Certificate renewal is an AMS calendar item — otherwise payments stop on a Tuesday morning and everyone says ‘the system is down’. Watch failed files, unsigned queues and acknowledgements that never return.",
          },
        ],
      },
    ],
    faqs: [
      faq("Hangi bankalar?", "Which banks?", "Keşifte sizin liste. ‘Hepsi’ diye söz vermeyiz; formatı olan bağlanır.", "Your list in discovery. We do not promise ‘all of them’; we connect what has a format."),
      faq("E-imza zorunlu mu?", "Is e-signature mandatory?", "Kontrol politikanıza göre. Banka onay ekranı da yeterli olabilir. Amaç iz ve ayrılık.", "Depends on control policy. A bank approval screen can suffice. The point is trail and segregation."),
      faq("BCM şart mı?", "Is BCM required?", "Kademeli onay için güçlü yol. Olmayan sistemde workflow ile de kurulur.", "A strong path for staged approval. Workflow can carry it where BCM is absent."),
      faq("Çift ödeme nasıl kesilir?", "How do you stop double pay?", "Açık kalem referansı ve öneri kilidi. Excel listesi kilitlemez.", "Open-item reference and proposal lock. A spreadsheet list does not lock."),
      faq("Rollout’ta ne değişir?", "What changes in a rollout?", "Banka ve format. Ödeme yöntemi ve onay kademesi şablonda kalır.", "Bank and format. Payment method and approval tiers stay in the template."),
    ],
  },
  "customer-vendor-e-reconciliation": {
    slug: "customer-vendor-e-reconciliation",
    module: "FI",
    name: { tr: "Müşteri Satıcı E-Mutabakat", en: "Customer & Vendor e-Reconciliation" },
    short: {
      tr: "Aylık mutabakat maratonunu gönderim, takip ve eşleştirmeyle tek akışa alın.",
      en: "Turn the monthly reconciliation marathon into send, track and match — one flow.",
    },
    intro: {
      tr: "Mutabakat, Türkiye’de dönem sonunun sosyal ritüelidir: PDF, kargo, e-posta, ‘bizde 17 bin fark var’. Fark çoğu zaman geç kayıttır, bazen gerçek uyuşmazlık. Süreç SAP dışında yürüyorsa açık kalem gerçeği ile yazışma gerçeği ayrılır. E-mutabakat paketi cari hesap bakiyesini (ve istenirse açık kalemi) karşı tarafa iletir, yanıtı izler, farkı belgelendirir. Müşteri ve satıcı aynı fikirde olmasa bile sizin dosyanız kapanışta anlatılabilir olur.",
      en: "Reconciliation is the social ritual of period-end in Türkiye: PDF, cargo, mail, ‘we have a 17k difference’. Often it is late posting; sometimes it is a real dispute. If the process lives outside SAP, open items and correspondence become two truths. The e-reconciliation package sends GL/AR/AP balances (and open items if you want), tracks replies and documents differences. Even when customer and vendor disagree, your file can be explained at close.",
    },
    sections: [
      {
        h2: { tr: "Mutabakat neden hâlâ Excel?", en: "Why is reconciliation still in Excel?" },
        paras: [
          {
            tr: "Çünkü standart SAP cari bakiyeyi gösterir, yazışmayı yönetmez. Ekip bakiyeyi dışarı alır, antetli kağıda dizer, yanıtı klasöre atar. Yanıt gelmeyenin takibi kişiye bağlıdır. Dönem kesildiğinde ‘kim teyit etti?’ sorusu yanıtsız kalır. Paket, gönderim durumunu (iletilmedi / iletildi / teyit / ihtilaf) cariye bağlar.",
            en: "Because standard SAP shows the balance and does not run the correspondence. The team extracts, pastes onto letterhead, drops replies in a folder. Follow-up of silence is personal. When the period is cut, ‘who confirmed?’ has no answer. The package binds send status (not sent / sent / confirmed / disputed) to the account.",
          },
          {
            tr: "E-mutabakat mevzuatı ve ticari teamül karışır. Yasal zorunluluk ile iç kontrol ihtiyacı aynı ekranda çözülmeyebilir; keşifte ayırırız. Amaç, kapanış komitesine ‘yüzde kaç teyit’ diye bakılabilen bir listedir — uydurma skor değil, durum kodu.",
            en: "Statute and commercial habit get mixed. Legal must and internal-control want may not share a screen; we split them in discovery. The aim is a list a close committee can read as ‘what share is confirmed’ — a status code, not an invented score.",
          },
        ],
      },
      {
        h2: { tr: "Müşteri ve satıcı aynı paket mi?", en: "Are customers and vendors the same package?" },
        paras: [
          {
            tr: "Aynı omurga, farklı metin ve farklı açık kalem seçimi. Satıcıda fatura-irsaliye zamanlaması, müşteride tahsilat ve iade konuşur. BP (S/4) dünyasında master aynı nesnedir; ECC’de müşteri/satıcı ayrıdır. Paket her iki manzaraya uyar, ‘hepsini bir Z’ye tıkmayız’.",
            en: "Same spine, different text and open-item selection. Vendors talk invoice–delivery timing; customers talk collection and returns. In S/4 BP they are one master; in ECC they are two. The package fits both landscapes — we do not jam everything into one Z.",
          },
          {
            tr: "Eşleştirme kuralı (belge no, tutar, tarih toleransı) iş birimiyle yazılır. Çok sıkı kural her şeyi ihtilafa atar; çok gevşek kural farkı yutar. Bu yüzden ilk ay ‘öğrenme’ kapanışı planlanır: eşleşmeyenler raporlanır, kural sıkılaşır.",
            en: "Match rules (document, amount, date tolerance) are written with the business. Too tight and everything is a dispute; too loose and differences vanish. Month one is a learning close: unmatched items are reported, then the rule tightens.",
          },
        ],
      },
      {
        h2: { tr: "Kapanış takvimiyle nasıl oturur?", en: "How does it sit on the close calendar?" },
        paras: [
          {
            tr: "Gönderim günü dönem kesiminden önce sabitlenir. Geç kayıt mutabakatı bozar; bu da aslında FI disiplinidir, ‘mutabakat yazılımı suçu’ değil. Paket, kesim sonrası bakiyeyi dondurulmuş görüntü olarak saklayabilir — sonraki kayıtlar ayrı izlenir.",
            en: "Send day is fixed before the period cut. Late postings break reconciliation; that is FI discipline, not a ‘software crime’. The package can freeze the balance snapshot after cut-off; later postings are tracked aside.",
          },
        ],
      },
      {
        h2: { tr: "Gizlilik ve yetki", en: "Privacy and authorization" },
        paras: [
          {
            tr: "Karşı tarafa giden bakiye ticari sırdır. Rol, şirket kodu ve hesap grubu kesilir. Toplu gönderimde yanlış cariye yanlış bakiye gitmemesi için önizleme adımı vardır. Kişisel veri (e-posta) KVKK kapsamında işlenir; bu sitenin KVKK metni genel çerçevedir, mutabakat sözleşmesi ayrıca konuşulur.",
            en: "The balance you send is commercially sensitive. Roles cut by company code and account group. Mass send has a preview so the wrong account does not get the wrong figure. Personal data (email) is processed under KVKK; the site notice is the general frame — the reconciliation agreement is discussed separately.",
          },
        ],
      },
    ],
    faqs: [
      faq("E-posta mı portal mı?", "Email or portal?", "İkiniz de olur. Portal izi güçlendirir; e-posta yaygınlıktır. Keşifte seçilir.", "Either. A portal strengthens the trail; email is reach. Chosen in discovery."),
      faq("Açık kalem gider mi?", "Do open items go out?", "İsterseniz. Bazı cariler yalnızca bakiye ister. Parametre.", "If you want. Some accounts only want the balance. It is a parameter."),
      faq("Uymayan fark ne olur?", "What about unmatched differences?", "İhtilaf kuyruğu ve gerekçe alanı. Sessizce Excel’e dönülmez.", "A dispute queue with a reason field. You do not quietly return to Excel."),
      faq("Çok şirket kodu?", "Multi company code?", "Gönderim şirket kodu bazında. Holding özeti ayrı rapordur.", "Send per company code. A holding summary is a separate report."),
      faq("S/4 BP zorunlu mu?", "Is S/4 BP required?", "Hayır. ECC müşteri/satıcı ile de kurulur.", "No. It also runs on ECC customer/vendor."),
    ],
  },
  "ifrs-16-package": {
    slug: "ifrs-16-package",
    module: "FI",
    name: { tr: "IFRS 16 Paketi", en: "IFRS 16 Package" },
    short: {
      tr: "Kira sözleşmesinden kullanım hakkı varlığı ve borçlanmaya — kapanışta izlenebilir.",
      en: "From the lease contract to right-of-use asset and liability — traceable at close.",
    },
    intro: {
      tr: "IFRS 16, kira Excel’inin ‘idare eder’ dediği yerde bozulur: sözleşme yenilenir, endeks işler, erken fesih olur, döviz kirası kurlar. Kullanım hakkı varlığı ile kira yükümlülüğü her ay birbirini tutmalıdır; tutmazsa dipnot ve varlık defteri ayrılır. Paket, sözleşme verisini SAP’de tutar, aylık faiz ve amortismanı üretir, yerel defter ile IFRS defteri ayrımını (paralel defter veya hesap) tarif eder. Avukat metni yazmayız; muhasebe izi yazarız.",
      en: "IFRS 16 breaks where the lease spreadsheet said ‘good enough’: renewal, indexation, early termination, FX leases. Right-of-use and lease liability must still talk to each other every month; if they do not, the note and the asset book diverge. The package keeps contract data in SAP, posts monthly interest and depreciation, and states how local and IFRS books split (parallel ledger or accounts). We do not write lawyer prose; we write an accounting trail.",
    },
    sections: [
      {
        h2: { tr: "Excel kira modeli nerede kırılır?", en: "Where does the Excel lease model break?" },
        paras: [
          {
            tr: "Yeni sözleşme geç kaydolur. Değişiklik (süre, bedel, kapsam) eski satırı ezer. Araç ve gayrimenkul karışır. Kısa vadeli ve düşük değer istisnaları ‘hepsini aktifleştirelim’ baskısıyla unutulur. Ay sonu faiz, tablodaki formüle bağlıdır; formülü yazan kişi ayrılınca kimse dokunmaz. SAP’de sözleşme nesnesi yoksa her ay yeniden icat edilir.",
            en: "New contracts land late. A change (term, amount, scope) overwrites the old row. Vehicles and property get mixed. Short-term and low-value exemptions vanish under ‘capitalise everything’. Month-end interest hangs on a formula; when the author leaves, nobody touches it. Without a contract object in SAP, you reinvent it every month.",
          },
          {
            tr: "Denetim sorusu nettir: bu ayki faiz ve amortisman hangi sözleşmeden, hangi iskonto oranı ile? Excel hücresi cevap değildir. Paket, oranı ve nakit akışını belgede bırakır.",
            en: "The audit question is plain: this month’s interest and depreciation — which contract, which discount rate? A cell is not an answer. The package leaves rate and cash flows on the document.",
          },
        ],
      },
      {
        h2: { tr: "FI, AA ve CO kesiti", en: "The FI, AA and CO cut" },
        paras: [
          {
            tr: "Kullanım hakkı varlığı varlık muhasebesine (veya eşdeğer kayda) gider; yükümlülük FI borcuna. Masraf yeri / kâr merkezi, kiranın ‘kimin maliyeti’ olduğunu gösterir. Unutulursa yönetim raporu eski faaliyet kirasını arar, IFRS tablosu amortisman görür. Keşifte maliyet nesnesi konuşulmadan paket kurulmaz.",
            en: "The RoU goes to asset accounting (or an equivalent posting); the liability to FI. Cost center / profit center says whose cost the lease is. Skip it and management still hunts an operating lease while IFRS shows depreciation. We do not install the package before the cost object is discussed.",
          },
          {
            tr: "Yerel mevzuat IFRS 16 ile bire bir olmayabilir. Türkiye’de kira ve VUK duran varlık kuralları ayrı konuşulur. Paket ‘tek doğru’ dayatmaz; defter ayrımını sizin politika metninize bağlar — politika yoksa önce onu yazdırırız, kısa ve dürüst.",
            en: "Local statute may not mirror IFRS 16 one-for-one. In Türkiye, lease practice and local PPE rules are a separate conversation. The package does not impose ‘one truth’; it binds the book split to your policy — and if there is no policy, we make you write a short honest one first.",
          },
        ],
      },
      {
        h2: { tr: "Kimler için?", en: "Who is this for?" },
        paras: [
          {
            tr: "Mağaza, depo, filo ve ofis kirası olan perakende, üretim, lojistik ve holdingler. Global rollout’ta ülke kira hukuku değişir; şablon hesap planı kalır, sözleşme alanları yerelleşir. IFRS raporlayan ve yerel defteri ayrı tutanlar önceliklidir.",
            en: "Retail, manufacturing, logistics and holdings with stores, warehouses, fleets and offices. In a rollout, lease law changes by country; the chart stays, contract fields localise. Priority is anyone reporting IFRS while keeping a local book.",
          },
        ],
      },
      {
        h2: { tr: "Aylık işletme", en: "Month-end operations" },
        paras: [
          {
            tr: "Yeni sözleşme girişi, değişiklik, endeks, kur ve kapanış işi AMS ritmidir. ‘Yılda bir proje’ değildir. Paketle checklist: sözleşme kesimi, çalıştırma, mizan kontrolü (varlık = yükümlülük + özkaynak etkileri bağlamında beklenen denge).",
            en: "New contracts, modifications, index, FX and the close are an AMS rhythm, not an annual project. Checklist with the package: contract cut-off, run, trial-balance check (the expected relationship between asset, liability and equity effects).",
          },
        ],
      },
    ],
    faqs: [
      faq("RE-FX şart mı?", "Is RE-FX mandatory?", "Hayır. Kapsama göre FI/AA odaklı paket yeter. Büyük gayrimenkul portföyünde RE-FX konuşulur.", "No. An FI/AA-centred package can suffice. Large real-estate books may discuss RE-FX."),
      faq("İskonto oranı kimin?", "Whose discount rate?", "Sizin hazine / muhasebe politikanız. Biz oran uydurmayız.", "Your treasury/accounting policy. We do not invent a rate."),
      faq("Operasyonel kira kaldı mı?", "Any operating leases left?", "İstisnalar politikada yazılıysa evet. ‘Hepsi IFRS 16’ demek çoğu kez yanlıştır.", "Yes if exemptions are written. ‘Everything is IFRS 16’ is often wrong."),
      faq("Döviz kira?", "FX leases?", "Kur farkı ve yükümlülük yeniden değerlemesi tarif edilir. Excel gizli parite kullanmaz — parametre açık olur.", "FX and liability revaluation are specified. Excel does not hide a private rate — the parameter is visible."),
      faq("Sözleşme hukuki inceleme?", "Legal review of contracts?", "Biz muhasebeleştiririz. Sözleşme yorumu hukuk / kiralama ekibinizindir.", "We account. Contract interpretation stays with your legal/lease team."),
    ],
  },
  "direct-debit-system-dbs-bank-integration": {
    slug: "direct-debit-system-dbs-bank-integration",
    module: "FI",
    name: { tr: "DBS banka entegrasyonu", en: "Direct Debit System (DBS) Bank Integration" },
    short: {
      tr: "Doğrudan borçlanma talimatını SAP açık kalemine bağlayın; tahsilatı elde takip etmeyin.",
      en: "Bind direct-debit instructions to SAP open items; stop collecting by hand.",
    },
    intro: {
      tr: "DBS, Türkiye’de özellikle dağıtım ve tekrarlayan B2B tahsilatta kullanılan banka ürünüdür. SAP’de fatura doğar, talimat bankaya gitmezse tahsilat ‘müşteri öder’ beklentisine döner. Banka dosyası ile açık kalem konuşmazsa çift kayıt veya unutulan iptal çıkar. Paket, talimat üretimini, banka dönüşünü ve denkleştirmeyi FI-AR akışına oturtur. ‘Banka ekranından bakıyoruz’ cümlesi kapanış kanıtı değildir.",
      en: "DBS is a Turkish bank product, common in distribution and repeating B2B collection. If the invoice is born in SAP and the instruction never leaves, collection becomes ‘the customer will pay’. If the bank file and the open item do not talk, you get double posts or forgotten cancels. The package sits instruction, bank return and clearing on the FI-AR flow. ‘We check the bank screen’ is not close evidence.",
    },
    sections: [
      {
        h2: { tr: "DBS neden sapar?", en: "Why does DBS drift?" },
        paras: [
          {
            tr: "Limit, vade ve iptal banka tarafında değişir; SAP’de fatura aynı kalır. Müşteri limit doldu diye talimat reddedilir, satış bunu günler sonra duyar. İade ve iptal ayrı kanalda yürür. Paket, ret kodunu açık kaleme yazar; tahsilat ekibi ‘neden gelmedi’yi banka sohbetinde aramaz.",
            en: "Limit, due date and cancel change at the bank; the invoice in SAP stays. The instruction is rejected because the limit is full; sales hears days later. Returns and cancels walk another channel. The package writes the reject code on the open item; collections does not hunt ‘why didn’t it come’ in a bank chat.",
          },
          {
            tr: "Doğrudan borç, müşteri onayı ve KVKK/ticari şart meselesidir. Teknik bağlantı, müşterinin DBS talimatının var olduğunu varsaymaz — master data’da işaret ve limit alanı durur. Yanlış müşteriye talimat üretmek hem operasyon hem itibar riskidir; önizleme şarttır.",
            en: "Direct debit is a customer mandate and a commercial/KVKK matter. The technical pipe does not assume a mandate exists — a flag and a limit sit in master data. Instructing the wrong customer is operations and reputation risk; preview is mandatory.",
          },
        ],
      },
      {
        h2: { tr: "FI-AR ve banka ekstresi", en: "FI-AR and the bank statement" },
        paras: [
          {
            tr: "Başarılı tahsilat, açık kalemi kapatır; kısmi tahsilat kalemi böler veya kısmi denkleştirir. Ekstre (MT940/camt veya bankanın formatı) ile talimat dosyası çelişirse hangisi ‘asıl’ tanımlanır. Paket, çelişki kuyruğu üretir — sessizce bakiyeyi ‘düzelten’ bir Z-kayıt değil.",
            en: "A successful collection clears the open item; a partial splits or partially clears. If the statement (MT940/camt or the bank’s format) disagrees with the instruction file, you define which is source. The package makes a conflict queue — not a silent Z that ‘fixes’ the balance.",
          },
          {
            tr: "Satış siparişi ve kredi limiti (SD) DBS reddini görmezse yeni sipariş açılır. İsteğe bağlı sinyal: ret kodu krediyi uyarır. Bu, ‘satışı durduralım’ demek değil; görünür kılmak demektir.",
            en: "If sales orders and credit limit (SD) never see a DBS reject, a new order is born. Optional signal: the reject warns credit. That is visibility, not ‘stop sales’.",
          },
        ],
      },
      {
        h2: { tr: "Kimler konuşmalı?", en: "Who should talk to us?" },
        paras: [
          {
            tr: "Bayi ve zincir tahsilatı DBS ile yürüyen üretici ve dağıtıcılar; çok bankalı yapılar. Tek banka, tek şirket kodu da yarar görür — çünkü iz kaybolması ölçekle değil dağınıklıkla ilgilidir.",
            en: "Manufacturers and distributors who already collect from dealers and chains via DBS; multi-bank setups. A single bank and company code still benefits — lost trail is about mess, not scale.",
          },
        ],
      },
      {
        h2: { tr: "AMS: limit ve dosya", en: "AMS: limits and files" },
        paras: [
          {
            tr: "Banka sertifikası, dosya saati, ret kodu sözlüğü AMS’e yazılır. Kod değişince ‘sistem bozuldu’ denmeden sözlük güncellenir. Ay sonu: talimat adedi, ret oranı, açık kalan DBS’li kalem — uydurma KPI değil, kuyruk sayımı.",
            en: "Bank certificates, file time, reject-code dictionary are AMS items. When a code changes, you update the dictionary before anyone says ‘the system broke’. Month-end: instruction count, reject share, remaining DBS open items — a queue count, not an invented KPI.",
          },
        ],
      },
    ],
    faqs: [
      faq("Hangi banka?", "Which bank?", "Sizin DBS bankanız. Format keşifte alınır.", "Your DBS bank. The format is taken in discovery."),
      faq("Müşteri talimatı SAP’de mi durur?", "Does the mandate live in SAP?", "İşaret ve referans durur. Asıl sözleşme banka / hukuk dosyanızdadır.", "A flag and a reference. The contract stays in bank/legal files."),
      faq("İptal nasıl işler?", "How does cancel work?", "SAP’den iptal dosyası veya banka iptali + açık kalem güncellemesi. Tek taraflı unutulmaz.", "A cancel file from SAP or a bank cancel plus open-item update. Not one-sided and forgotten."),
      faq("SD kredi?", "SD credit?", "Opsiyonel uyarı. Zorunlu blok politikadır, yazılım dayatması değil.", "Optional warning. A hard block is policy, not a software imposition."),
      faq("Çok şirket?", "Multi company?", "Talimat şirket kodu ve house bank bazında.", "Instructions per company code and house bank."),
    ],
  },
  "automated-clearing-processes": {
    slug: "automated-clearing-processes",
    module: "FI",
    name: { tr: "Otomatik Denkleştirme Süreçleri", en: "Automated Clearing Processes" },
    short: {
      tr: "Açık kalem denkleştirmesini kurala bağlayın; kapanışta ‘elle eşleştirme’ kuyruğunu küçültün.",
      en: "Put open-item clearing on rules; shrink the manual matching queue at close.",
    },
    intro: {
      tr: "Denkleştirme, FI’nin görünmeyen emeğidir. Ödeme gelir, faturalar bekler, birileri F-32/F-44 ekranında satır seçer. Yanlış eşleşme hem cariyi hem nakit raporunu bozar. Otomatik denkleştirme, ‘her şeyi körlemesine kapat’ demek değildir; referans, tutar, tarih ve hesaplama kuralıyla güvenli olanı kapatır, gerisini kuyruğa bırakır. Kapanış günü kahramanlık yerine kural bakımı konuşulur.",
      en: "Clearing is FI’s invisible labour. Cash arrives, invoices wait, someone picks lines on F-32/F-44. A wrong match breaks the subledger and the cash report. Automated clearing does not mean ‘close everything blindly’; it closes what the reference, amount, date and tolerance rule trusts, and queues the rest. Close day becomes rule maintenance, not heroics.",
    },
    sections: [
      {
        h2: { tr: "Neden hâlâ satır tıklıyoruz?", en: "Why are we still clicking lines?" },
        paras: [
          {
            tr: "Çünkü standart otomatik denkleştirme (ör. F.13) her şirketin referans disiplinine uymaz. Belge numarası gitmez, ödeme açıklaması serbest metindir, kısmi ödemeler kuralı kırar. Ekip ‘bozar diye’ otomatiği kapatır. Paket, sizin referans evreninizi (fatura no, ödeme referansı, müşteri banka açıklaması) tarif eder ve güven eşiğini kademelendirir.",
            en: "Because standard automatic clearing (e.g. F.13) does not match every company’s reference discipline. Document numbers never travel, payment text is free, partials break the rule. Teams switch automation off ‘in case it breaks’. The package describes your reference universe (invoice, payment ref, bank text) and stages the trust threshold.",
          },
          {
            tr: "İkinci neden, yetki korkusudur. Otomatik kapanan kalem kimde denetlenecek? Log ve ters kayıt senaryosu yoksa haklı bir korkudur. Paket, her otomatik belgede kural kimliğini bırakır; yanlış kapanırsa aynı kural id ile geri alınır.",
            en: "The second reason is control fear. Who audits an automatically closed item? Without a log and a reverse scenario, the fear is fair. The package leaves a rule id on every automatic document; a wrong close is reversed with the same id.",
          },
        ],
      },
      {
        h2: { tr: "Kurallar nasıl yaşar?", en: "How do rules live?" },
        paras: [
          {
            tr: "Önce yüksek güven: bire bir tutar + bire bir referans. Sonra toleranslı (kur farkı, yuvarlama). En sonda manuel kuyruk. ‘Tek kural her şeyi çözsün’ isteği kuyruğu gizler, silmez. Ayda bir kural raporu: kaç kalem otomatik, kaç neden kodu ile düştü.",
            en: "First high trust: exact amount plus exact reference. Then tolerance (FX, rounding). Manual queue last. ‘One rule to clear them all’ hides the queue; it does not delete it. Once a month: how many items automatic, how many dropped with which reason code.",
          },
          {
            tr: "Müşteri ve satıcı simetrik değildir. Satıcıda avans ve iade, müşteride çek/senet ve DBS retleri kuralı kirletir. Modül FI olsa da SD/MM belgesi referans taşır; keşifte satış ve satın alma oturur.",
            en: "Customers and vendors are not symmetric. Vendor advances and returns, customer notes/cheques and DBS rejects dirty the rule. Even in FI, SD/MM documents carry the reference; sales and procurement sit in discovery.",
          },
        ],
      },
      {
        h2: { tr: "Kapanış ve nakit", en: "Close and cash" },
        paras: [
          {
            tr: "Denkleşmemiş kalem yaşlandırma ve nakit tahminini şişirir. Otomasyon, tahmini ‘daha doğru’ yapmaz; yalan açık kalemi azaltır. Uydurma tahsilat oranı yazmayız. Gösterdiğimiz şey kuyruk boyu ve kural kapsamıdır.",
            en: "Uncleared items inflate aging and cash forecast. Automation does not make the forecast ‘truer’; it reduces fake open items. We do not write an invented collection rate. What we show is queue length and rule coverage.",
          },
        ],
      },
      {
        h2: { tr: "AMS", en: "AMS" },
        paras: [
          {
            tr: "Yeni ödeme şekli, yeni banka açıklama kalıbı, kur farkı hesabı değişimi kural bakımıdır. Bunu projeye çevirmeyin. Haftalık kısa bakış: düşen kalem örnekleri.",
            en: "A new payment method, a new bank-text pattern, a changed FX account is rule care. Do not turn it into a project. A short weekly look at dropped-item samples.",
          },
        ],
      },
    ],
    faqs: [
      faq("F.13 yetmez mi?", "Isn’t F.13 enough?", "Bazen yeter. Referans dağınıksa yetmez. Paket F.13’ü öldürmek için değil, sizin kuralınıza uydurmak için.", "Sometimes. If references are messy, no. The package is not here to kill F.13; it is here to fit your rule."),
      faq("Kısmi ödeme?", "Partials?", "Kuralda açıkça. Yoksa kuyrukta kalır — sessizce tam kapanmaz.", "Explicit in the rule. Otherwise it stays queued — it is not silently fully cleared."),
      faq("Kur farkı?", "FX differences?", "Tolerans ve fark hesabı tarifli. Sınırsız tolerans kontrol kaybıdır.", "Tolerance and difference account specified. Unlimited tolerance is lost control."),
      faq("Hangi işlem kodları?", "Which transactions?", "Sizin süreç. AR/AP denkleştirme ve ödemeden gelen otomatik kapanış.", "Your process. AR/AP clearing and automatic close from payment."),
      faq("Ters kayıt?", "Reversal?", "Kural id ile. ‘Kim kapatmış’ bilinir.", "By rule id. ‘Who closed it’ is known."),
    ],
  },
  "import-management-process": {
    slug: "import-management-process",
    module: "MM",
    name: { tr: "İthalat Süreci", en: "Import Management Process" },
    short: {
      tr: "Siparişten gümrüğe ithalat dosyası tek yerde; masraf dağıtımı belgede.",
      en: "Import file from PO to customs in one place; landed-cost distribution on the document.",
    },
    intro: {
      tr: "İthalat, MM’in siparişi ile FI’nin maliyeti ve gümrüğün evrakı arasında kaybolur. Navlun, sigorta, vergi, antrepo — her biri ayrı fatura, ayrı e-posta. Stok değeri geç kapanır, satış fiyatı ‘tahmini maliyetle’ yürür. Paket, ithalat dosyasını SAP belgelerine bağlar: sipariş, giriş, masraf, gümrük referansı. Gümrük müşavirinin Excel’i kaynak olmaya devam edebilir; sizin defteriniz belgeden okunur.",
      en: "Import is lost between the MM purchase order, FI cost and customs paperwork. Freight, insurance, duty, warehouse — each a separate invoice and a separate mail. Stock value closes late; sales price walks on a guessed cost. The package binds the import file to SAP documents: PO, GR, costs, customs reference. The broker’s spreadsheet may still exist; your books read from a document.",
    },
    sections: [
      {
        h2: { tr: "Masraf neden stoka geç yüklenir?", en: "Why do landed costs hit stock late?" },
        paras: [
          {
            tr: "Çünkü mal girişi navlun faturasından önce olur. Standart süreç bunu bilir (planlı masraf, sonradan yükleme) ama fiilen ‘mali işler ay sonunda dağıtır’. Dağıtım anahtarı (değer, miktar, ağırlık) yazılı değilse her ay tartışılır. Paket, dosya kapanmadan dağıtım kuralını kilitler; geç gelen faturayı aynı kurala bağlar.",
            en: "Because goods receipt happens before the freight invoice. Standard SAP knows this (planned costs, later load) but in practice finance distributes at month-end. If the key (value, qty, weight) is unwritten, you argue every month. The package locks the distribution rule before the file closes; a late invoice follows the same rule.",
          },
          {
            tr: "Döviz ve teslim şartı (Incoterms) maliyeti değiştirir. FOC / CIF karışıklığı stok değerini sessizce kaydırır. Alanlar siparişte durur, ithalat dosyasında tekrar edilir; çelişki raporu üretilir.",
            en: "FX and Incoterms change cost. Mixing FOB and CIF slides stock value quietly. Fields live on the PO and are repeated on the import file; a conflict report is produced.",
          },
        ],
      },
      {
        h2: { tr: "Gümrük ve mevzuat", en: "Customs and regulation" },
        paras: [
          {
            tr: "GTIP, menşe, antidamping, kota — SAP bunları ‘gümrük yazılımı’ yerine geçirmek zorunda değildir. Paket, referans numarayı ve tarife alanını taşır; beyanı müşavir sistemine bırakabilir. Amaç, denetimde ‘bu giriş hangi ithalat dosyası?’ sorusuna belge ile cevap.",
            en: "HS code, origin, anti-dumping, quota — SAP does not have to become the customs engine. The package carries a reference and tariff fields; the declaration can stay with the broker system. The point is answering ‘which import file was this GR?’ with a document.",
          },
          {
            tr: "Türkiye ithalatında KDV, ÖTV ve teminat konuşulur. Hesap belirleme FI’dedir; tetik MM hareketindendir. Yanlış hesap, kapanışta ‘ithalat KDV’si netleşmedi’ olarak geri gelir. Keşifte vergi kodu ve stok hesabı birlikte bakılır.",
            en: "In Türkiye you talk VAT, special consumption tax and guarantees. Account determination is FI; the trigger is an MM movement. A wrong account comes back at close as ‘import VAT never settled’. Discovery looks at tax code and stock account together.",
          },
        ],
      },
      {
        h2: { tr: "Kimler için?", en: "Who is it for?" },
        paras: [
          {
            tr: "Hammadde ve mamul ithal eden üreticiler, çok tedarikçi / çok rejim çalışan dağıtıcılar. Global şablonda ithalat ülkesi Türkiye veya başka bir gümrük birliği olabilir; dosya yapısı şablondadır, tarife yereldedir.",
            en: "Manufacturers importing materials and finished goods; distributors with many vendors and regimes. In a global template the importing country may be Türkiye or another customs union; file structure is template, tariff is local.",
          },
        ],
      },
      {
        h2: { tr: "Operasyon", en: "Operations" },
        paras: [
          {
            tr: "Dosya durumu (yolda / gümrükte / kapandı) satın alma ve finansin ortak ekranıdır. Kapalı dosyaya masraf eklemek ayrı yetkidir. AMS: yeni masraf türü, yeni rejim, kur tipi.",
            en: "File status (in transit / at customs / closed) is a shared screen for procurement and finance. Posting cost onto a closed file is a separate authorization. AMS: new cost type, new regime, FX type.",
          },
        ],
      },
    ],
    faqs: [
      faq("Gümrük yazılımının yerine geçer mi?", "Does it replace the customs package?", "Hayır. Referans ve maliyet izi. Beyan müşavirde kalabilir.", "No. Reference and cost trail. The declaration can stay with the broker."),
      faq("Inbound delivery şart mı?", "Is inbound delivery required?", "Süreç olgunluğuna göre. Mal girişi ve dosya bağını koparmamak yeter.", "Depends on process maturity. Do not break the GR–file link."),
      faq("Masraf tahmini?", "Accrual of costs?", "Evet, dosya açıkken planlı masraf. Fatura gelince denkleşir.", "Yes — planned cost while the file is open. Invoice then clears."),
      faq("Çok para birimi?", "Multi currency?", "Sipariş, masraf ve stok değeri ayrı kur tipleriyle tariflenir.", "PO, cost and stock value with specified rate types."),
      faq("İhracat paketi var mı?", "Is there an export package?", "Katalogda ihracat süreci ayrı çözüm. Bu sayfa ithalat.", "Export is a separate catalog item. This page is import."),
    ],
  },
  "invoice-approval-workflow": {
    slug: "invoice-approval-workflow",
    module: "MM",
    name: { tr: "Fatura Onay", en: "Invoice Approval Workflow" },
    short: {
      tr: "Gelen faturayı dijital onayda yürütün; kayıp evrak ve gecikme cezasını süreçten çıkarın.",
      en: "Walk incoming invoices through digital approval; take lost paper and late fees out of the process.",
    },
    intro: {
      tr: "Fatura onayı, satın almanın ‘imza sirküleri’ ile mali işlerin kapanışının çarpıştığı yerdir. Kağıt veya e-posta zinciri, faturayı MIRO’dan önce kaybeder. Üç yollu eşleşme (sipariş, giriş, fatura) sapınca herkes birbirini bekler. Paket, faturayı (e-fatura dahil) onay kademesine bağlar, sapmayı gerekçelendirir, yetki tutara ve hesaba göre keser. Amaç hız değil; kapanışta ‘kim neden onayladı’ izidir — hız onun yan etkisidir.",
      en: "Invoice approval is where procurement’s signature matrix hits finance’s close. Paper or mail loses the invoice before MIRO. When three-way match (PO, GR, invoice) breaks, everyone waits for everyone. The package binds the invoice (including e-invoice) to approval steps, reasons a mismatch, and cuts authorization by amount and account. The aim is not speed; it is ‘who approved why’ at close — speed is a side effect.",
    },
    sections: [
      {
        h2: { tr: "Onay neden kapanışı geciktirir?", en: "Why does approval delay the close?" },
        paras: [
          {
            tr: "Fatura dönem dışına kalır çünkü onaycı tatildedir ve vekâlet yoktur. Vekâlet vardır ama tutar eşiği yanlış kişiye düşer. E-fatura GİB’de kabul edilmiştir, SAP’de park halindedir; KDV raporu iki dünya görür. Paket, vekâleti ve süre aşığını görünür kılar; park süresi kapanış listesine düşer.",
            en: "The invoice misses the period because the approver is off and there is no deputy. Or there is a deputy and the amount threshold still hits the wrong person. The e-invoice is accepted at GİB and parked in SAP; VAT reports see two worlds. The package makes deputy and timeout visible; park age lands on the close list.",
          },
          {
            tr: "Siparişsiz fatura (FI) ile siparişli fatura (MM) aynı kuyrukta karışır. Karışınca kontrol kaybolur. Paket iki şerittir: PO’lu üç yollu, PO’suz hesap ve maliyet nesnesi onayı.",
            en: "Non-PO (FI) and PO (MM) invoices mix in one queue. Mix them and control dies. The package is two lanes: three-way with PO, account and cost object without.",
          },
        ],
      },
      {
        h2: { tr: "E-fatura ve GİB", en: "e-Invoice and GİB" },
        paras: [
          {
            tr: "Türkiye’de e-fatura / e-arşiv akışı yasal kabul ile muhasebe kaydını ayırır. Paket, gelen e-faturayı onay öncesi park eder; reddin yasal süresi ayrı, iç onay süresi ayrı konuşulur. İkisini tek SLA sanmak hem mevzuat hem iç kontrol hatasıdır.",
            en: "In Türkiye, e-invoice / e-archive splits legal acceptance from the accounting post. The package parks inbound e-invoices before approval; the statutory reject window and the internal approval window are different conversations. Treating them as one SLA is both a legal and a control error.",
          },
          {
            tr: "Kalem eşleşmesi (miktar, fiyat, vergi kodu) otomatik kural + insan. Küçük fiyat farkı kurala, büyük sapma satın almaya. ‘Hepsini malzeme sorumlusu imzalasın’ kuyruğu şişirir.",
            en: "Item match (qty, price, tax code) is rule plus human. Small price gaps to the rule, large gaps to procurement. ‘Material owner signs everything’ just grows the queue.",
          },
        ],
      },
      {
        h2: { tr: "Kimler için?", en: "Who is it for?" },
        paras: [
          {
            tr: "Fatura hacmi yüksek, çok maliyet merkezi olan, dış denetimi olan şirketler. Holding onay matrisi ülke/şirket koduna göre değişir; şablon kademe sayısı, yerel eşik.",
            en: "High invoice volume, many cost centers, external audit. A holding matrix changes by country/company code; template is the number of steps, local is the threshold.",
          },
        ],
      },
      {
        h2: { tr: "Fiori mi GUI mi?", en: "Fiori or GUI?" },
        paras: [
          {
            tr: "Onaycıya Fiori veya mail+bağlantı öneririz; mali işler park listesinde GUI’de kalabilir. Araç tartışması, matris yazılmadan başlamaz.",
            en: "Approvers get Fiori or mail-plus-link; finance can stay on a GUI park list. Tool talk does not start before the matrix is written.",
          },
        ],
      },
    ],
    faqs: [
      faq("OCR var mı?", "Do you include OCR?", "Gerekirse bağlanır. Asıl iş onay ve eşleşme. OCR’siz e-fatura XML’i yeter.", "We can connect it. The real work is approval and match. e-Invoice XML often needs no OCR."),
      faq("Üç yollu zorunlu mu?", "Is three-way match mandatory?", "PO’lu stok ve hizmet alımında evet. Gider faturasında hesap onayı.", "Yes for PO stock and services. Expense invoices use account approval."),
      faq("GİB reddi?", "GİB reject?", "Yasal süre iç kontrol kuyruğundan ayrı izlenir.", "The statutory window is tracked apart from the internal queue."),
      faq("Tutar eşikleri?", "Amount thresholds?", "Sizin imza sirküleri. Yazılım uydurmaz.", "Your signature circular. Software does not invent them."),
      faq("AMS?", "AMS?", "Yeni onaycı, vekâlet, vergi kodu, sapma toleransı bakım işidir.", "New approvers, deputies, tax codes, mismatch tolerance — care work."),
    ],
  },
};

for (const slug of PRODUCT_SLUGS) {
  const extra = PRODUCT_NOTES[slug];
  if (extra) PRODUCT_PAGES[slug].sections.push(extra);
}
