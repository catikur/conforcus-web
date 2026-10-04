import type { Bi } from "./i18n";

/** Extra section per product page: what is defined during implementation and who the solution suits. Appended after the main sections. */
export const PRODUCT_NOTES: Record<string, { h2: Bi; paras: Bi[] }> = {
  "inflation-accounting": {
    h2: {
      tr: "Kurulumda tanımlananlar ve paketin uygun olduğu şirketler",
      en: "What is defined during implementation, and who the suite suits",
    },
    paras: [
      {
        tr: "Paketin şirkete uyarlanması sınıflama ve kapsam kararlarına dayanır. Hangi hesapların parasal, hangilerinin parasal olmayan sayılacağı şirketin hesap planına ve muhasebe politikasına göre kurulum sırasında tanımlanır. Hangi bazların kapsama alınacağı da şirketin raporlama yükümlülüklerine göre aynı aşamada belirlenir. Katsayılar resmî olarak yayımlanan fiyat endekslerine dayanır; paket bu katsayıları kendi tablolarında tutar.",
        en: "Fitting the suite to a company rests on classification and scope decisions. Which accounts count as monetary and which as non-monetary is defined during implementation, according to the company’s chart of accounts and accounting policy. Which bases are in scope is settled at the same stage, according to the company’s reporting obligations. The coefficients are based on officially published price indices, and the suite holds them in its own tables.",
      },
      {
        tr: "Paket, enflasyon düzeltmesi yükümlülüğü olan ve bu çalışmayı bugün SAP dışında elle yürüten şirketler için uygundur. CFO’lara, finans müdürlerine, mali işler ve denetim ekiplerine yöneliktir. Elle çalışmanın yükü, duran varlık sayısı yüksek olan ya da hem VUK hem TMS/IFRS bazına ihtiyaç duyan şirketlerde en fazladır; paketin Duran Varlık entegrasyonu ve paralel baz üretimi doğrudan bu ihtiyaçlara karşılık gelir.",
        en: "The suite suits companies that are required to apply inflation adjustment and currently do the work by hand outside SAP. It is aimed at CFOs, finance directors, and finance and audit teams. The manual burden is heaviest in companies with a large number of fixed assets, or with a need for both the VUK and the TMS/IFRS basis; the suite’s Asset Accounting integration and parallel production of the bases answer these needs directly.",
      },
    ],
  },
  "e-payment-bank-e-signature-integrations": {
    h2: {
      tr: "Kapsamın tanımlanması ve çözümün uygun olduğu yapılar",
      en: "Defining the scope, and where the solution fits",
    },
    paras: [
      {
        tr: "Çözümün kapsamı şirketin banka ve yetki yapısına göre kurulum sırasında tanımlanır. Hangi bankaların ve hangi şirketlerin akışa alınacağı, her bankanın kabul ettiği format, onay adımlarının hangi kurallara göre işleyeceği ve imza yetkililerinin akışta nerede yer alacağı bu aşamada belirlenir. İmza yetkileri şirketin imza sirkülerine ve bankalarla yaptığı anlaşmalara dayanır; çözüm bu yetkileri değiştirmez, akışa yansıtır.",
        en: "The scope of the solution is defined during implementation according to the company’s banks and authorization structure. Which banks and which companies are brought into the flow, the format each bank accepts, the rules that govern the approval steps and where the authorized signatories sit in the flow are all settled at this stage. Signing authority rests on the company’s signature circular and its agreements with the banks; the solution does not change those authorities, it reflects them in the flow.",
      },
      {
        tr: "Çözüm, ödemelerini SAP’tan yapan ve talimatları bankalara elle aktaran şirketler için uygundur. Elle aktarımın yükü ve riski, birden fazla bankayla çalışan ve birden fazla şirketi olan gruplarda en yüksektir; çözüm bu yapılarda bankalar ve şirketler için aynı akışı kullanır. Hazine müdürlerine, CFO’lara ve mali işler ekiplerine yöneliktir.",
        en: "The solution suits companies that make their payments from SAP and transfer the instructions to banks by hand. The burden and the risk of manual transfer are highest in groups that work with several banks and have several companies; in these structures the solution uses the same flow across banks and companies. It is aimed at treasury directors, CFOs and finance teams.",
      },
    ],
  },
  "customer-vendor-e-reconciliation": {
    h2: {
      tr: "Mutabakat uygulamasının tanımlanması ve çözümün uygun olduğu şirketler",
      en: "Defining the reconciliation practice, and who the solution suits",
    },
    paras: [
      {
        tr: "Mutabakatın hangi cariler için, hangi dönemlerde ve hangi içerikle yapılacağı şirketten şirkete değişir. Bu nedenle form içeriği, gönderim kanalı ve kapsama alınacak cari hesaplar kurulum sırasında şirketin mevcut mutabakat uygulamasına göre tanımlanır. Çözüm bu tanımları her mutabakat döneminde aynı şekilde uygular; süreç kişilere değil, tanımlı bir akışa dayanır.",
        en: "Which accounts are reconciled, for which periods and with what content varies from company to company. The form content, the dispatch channel and the accounts in scope are therefore defined during implementation to match the company’s existing reconciliation practice. The solution applies these definitions in the same way in every reconciliation period, so the process rests on a defined flow rather than on individuals.",
      },
      {
        tr: "Çözüm, çok sayıda müşteri ve satıcıyla çalışan ve mutabakatı bugün e-posta ile Excel üzerinden yürüten şirketler için uygundur. CFO’lar ve finans müdürleri kapanış ve denetim öncesinde cari hesapların durumunu tek yerden görür; muhasebe ve hazine ekipleri gönderim ve takip yükünden kurtulur. Çözüm birden fazla sektörde devrededir.",
        en: "The solution suits companies that work with a large number of customers and vendors and currently run reconciliation on email and spreadsheets. CFOs and finance directors get a single view of where customer and vendor accounts stand ahead of close and audit, while accounting and treasury teams are relieved of the burden of sending and follow-up. The solution is in use across several sectors.",
      },
    ],
  },
  "ifrs-16-package": {
    h2: {
      tr: "Muhasebe politikası kararları ve paketin uygun olduğu şirketler",
      en: "Accounting policy decisions, and who the package suits",
    },
    paras: [
      {
        tr: "IFRS16 hesaplaması, şirketin vermesi gereken kararlara dayanır: kira süresinin nasıl belirleneceği, hangi iskonto oranının kullanılacağı ve standardın kısa vadeli ve düşük değerli kiralamalar için tanıdığı istisnalardan yararlanılıp yararlanılmayacağı. Bunlar muhasebe politikası kararlarıdır ve şirket tarafından, denetçisiyle birlikte verilir. Paket bu kararları kendisi vermez; kararlar kurulum sırasında tanımlanır ve hesaplamalar bunlara göre yürür. Kapsama alınacak sözleşmeler de aynı aşamada belirlenir.",
        en: "The IFRS 16 calculation rests on decisions the company has to make: how the lease term is determined, which discount rate is used, and whether the exemptions the standard allows for short-term and low-value leases are applied. These are accounting policy decisions, taken by the company together with its auditor. The package does not make them; they are defined during implementation, and the calculations follow them. The contracts in scope are settled at the same stage.",
      },
      {
        tr: "Paket, IFRS16 kapsamında çok sayıda kira sözleşmesi olan ve bunları bugün Excel’de izleyen şirketler için uygundur. CFO’lara, mali işler ekiplerine ve raporlama ile denetimden sorumlu ekiplere yöneliktir. Çok şirketli yapılarda çalıştığı için grup şirketlerinin kiralamalarını aynı yöntemle hesaplamak isteyen gruplar için de uygundur. Paket birden çok sektörde uygulanmıştır.",
        en: "The package suits companies that have a large number of leases under IFRS 16 and currently track them in spreadsheets. It is aimed at CFOs, finance teams, and the teams responsible for reporting and audit. Because it runs in multi-company structures, it also suits groups that want to calculate the leases of their companies by the same method. The package has been implemented in several sectors.",
      },
    ],
  },
  "direct-debit-system-dbs-bank-integration": {
    h2: {
      tr: "Banka ve bayi kapsamının tanımlanması, çözümün uygun olduğu şirketler",
      en: "Defining the bank and dealer scope, and who the solution suits",
    },
    paras: [
      {
        tr: "DBS, ana firma, banka ve bayi arasındaki anlaşmalara dayanır; limitleri banka belirler. Entegrasyon bu ticari ilişkiyi değiştirmez; SAP tarafındaki izlemeyi ve eşleştirmeyi sağlar. DBS dosya yapıları bankadan bankaya farklılaşabildiği için kapsamdaki bankalar kurulum sırasında tek tek tanımlanır. Hangi müşteri ve bayilerin DBS kapsamında izleneceği de aynı aşamada belirlenir.",
        en: "DBS rests on the agreements between the company, the bank and the dealer, and the limits are set by the bank. The integration does not change that commercial relationship; it provides the tracking and matching on the SAP side. Because DBS file layouts can differ from bank to bank, the banks in scope are defined one by one during implementation. Which customers and dealers are followed under DBS is settled at the same stage.",
      },
      {
        tr: "Çözüm, bayi ağı üzerinden satış yapan ve tahsilatının önemli bir kısmını DBS ile gerçekleştiren şirketler için uygundur. Hazine ve mali işler ekipleri çözümü tahsilat ve mutabakat için, satış ve bayi yönetimi ekipleri ise limit görünürlüğü için kullanır. Birden fazla bankayla DBS çalışan şirketlerde tek bir süreç mantığıyla ilerlemek, bankalar arasındaki farkların ekibe yansımasını azaltır.",
        en: "The solution suits companies that sell through a dealer network and collect a significant share of their receivables through DBS. Treasury and finance teams use it for collections and reconciliation, while sales and dealer management teams use it for limit visibility. For companies that run DBS with several banks, working with a single process logic means the differences between banks weigh less on the team.",
      },
    ],
  },
  "automated-clearing-processes": {
    h2: {
      tr: "Kural setinin şirkete göre tanımlanması ve çözümün uygun olduğu ekipler",
      en: "Defining the rule set for the company, and who the solution suits",
    },
    paras: [
      {
        tr: "Eşleştirme kuralları her şirkette farklıdır; çünkü müşterilerin ödeme alışkanlıkları, bankadan gelen açıklamalar ve belgelerde kullanılan referans alanları farklıdır. Bu nedenle kural setleri kurulum sırasında şirketin tahsilat, ödeme ve kayıt düzenine göre tanımlanır. Batch çalıştırmanın ne sıklıkla yapılacağı da şirketin işlem hacmine ve kapanış takvimine göre aynı aşamada planlanır.",
        en: "Matching rules differ from company to company, because customers’ payment habits, the descriptions that arrive from the bank and the reference fields used on documents all differ. Rule sets are therefore defined during implementation around the way the company collects, pays and posts. How often the batch is run is planned at the same stage, according to the company’s transaction volume and closing calendar.",
      },
      {
        tr: "Çözüm, alacak ve borç hesaplarında yüksek sayıda açık kalemi olan ve denkleştirmeyi bugün büyük ölçüde elle yapan şirketler için uygundur. Muhasebe müdürlerine, hazine ve mali işler ekiplerine yöneliktir. Çözüm standart SAP denkleştirmesinin üzerine geliştirilmiştir ve birden çok sektörde canlı kullanımdadır.",
        en: "The solution suits companies that have a high number of open items on their receivable and payable accounts and currently clear them largely by hand. It is aimed at accounting managers, treasury and finance teams. It is developed on top of standard SAP clearing and is live across several sectors.",
      },
    ],
  },
  "import-management-process": {
    h2: {
      tr: "Masraf yapısının tanımlanması ve çözümün uygun olduğu şirketler",
      en: "Defining the charge structure, and who the solution suits",
    },
    paras: [
      {
        tr: "Her şirketin ithalat masraf yapısı farklıdır: çalışılan teslim şekilleri, masrafların hangi tarafça üstlenildiği ve bir masrafın malzemelere nasıl paylaştırılacağı değişir. Bu nedenle izlenecek masraf türleri, bunların SAP koşullarıyla eşlenmesi ve dağıtımın esası kurulum sırasında tanımlanır. Çözüm bu tanımları her ithalat dosyasında aynı şekilde uygular.",
        en: "Every company’s import charge structure is different: the delivery terms it works with, which party bears which charge, and how a charge is to be shared across materials all vary. The charge types to be tracked, their mapping to SAP conditions and the basis of distribution are therefore defined during implementation. The solution applies these definitions in the same way on every import file.",
      },
      {
        tr: "Çözüm, düzenli ithalat yapan ve yan maliyetleri bugün Excel’de ya da ayrı sistemlerde izleyen şirketler için uygundur. Satınalma direktörlerine, dış ticaret ve ithalat müdürlerine ve maliyet muhasebesi ekiplerine yöneliktir. İthal malzemenin maliyet içindeki payı yüksek olan işletmelerde yan maliyetlerin doğru ve zamanında yansıtılması, ürün maliyetinin ve kârlılık analizinin doğruluğunu doğrudan etkiler. Çözüm farklı sektörlerde canlı kullanımdadır.",
        en: "The solution suits companies that import regularly and currently track landed costs in spreadsheets or separate systems. It is aimed at procurement directors, foreign trade and import managers, and cost accounting teams. In businesses where imported materials make up a large share of cost, reflecting landed costs accurately and on time has a direct effect on the accuracy of product costing and profitability analysis. The solution is in live use across different sectors.",
      },
    ],
  },
  "invoice-approval-workflow": {
    h2: {
      tr: "Onay kurallarının tanımlanması ve çözümün uygun olduğu şirketler",
      en: "Defining the approval rules, and who the solution suits",
    },
    paras: [
      {
        tr: "Çözümün iyi çalışması, onay kurallarının açık biçimde tanımlanmasına bağlıdır. Hangi tür farkın kime gideceği, kimin onay vereceği ve kimin yalnızca bilgilendirileceği kurulum sırasında şirketin organizasyon yapısına ve yetki düzenine göre tanımlanır. Bu kararlar şirkete aittir; çözüm onları iş akışına yansıtır ve her faturada aynı şekilde uygular. Üç yönlü eşleştirmenin sağlıklı sonuç vermesi için siparişlerin ve mal girişlerinin de zamanında ve doğru kaydedilmesi gerekir.",
        en: "How well the solution works depends on approval rules being defined clearly. Which kind of discrepancy goes to whom, who approves and who is only informed are defined during implementation according to the company’s organizational structure and authority levels. These decisions belong to the company; the solution reflects them in the workflow and applies them in the same way to every invoice. For three-way matching to give sound results, purchase orders and goods receipts also need to be posted correctly and on time.",
      },
      {
        tr: "Çözüm, satınalma siparişine bağlı fatura hacmi yüksek olan ve fatura kontrolünü bugün elle yürüten şirketler için uygundur. Mali işler müdürlerine, satınalma direktörlerine, muhasebe ve tedarik ekiplerine yöneliktir. Çözüm birden fazla sektörde uygulanmıştır.",
        en: "The solution suits companies that handle a high volume of PO-based invoices and currently check them by hand. It is aimed at finance directors, procurement directors, and accounts payable and procurement teams. It has been implemented in several sectors.",
      },
    ],
  },
};
