import type { Faq } from "@/components/FaqList";
import type { RouteKey } from "./i18n";

export type ServicePage = {
  key: RouteKey;
  eyebrow: { tr: string; en: string };
  h1: { tr: string; en: string };
  lead: { tr: string; en: string };
  icp: { tr: string; en: string };
  stepsTitle: { tr: string; en: string };
  steps: { tr: string; en: string }[];
  faqs: Faq[];
  related: string[];
  color: string;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    key: "hizmet-sap-ams",
    color: "var(--blue)",
    eyebrow: { tr: "Sürekli Destek", en: "Ongoing Support" },
    h1: { tr: "SAP Destek Hizmetleri (AMS)", en: "SAP Support Services (AMS)" },
    lead: {
      tr: "Canlı SAP sistemi mesai saati tanımaz. AMS bizim için bir bilet kuyruğu değil: adanmış ekip, SLA ve dönem sonunu bilen danışmanlarla sistemin yanında durmaktır.",
      en: "A live SAP system does not keep office hours. AMS for us is not a ticket queue: it is standing next to the system with a named team, an SLA, and consultants who have closed a period before.",
    },
    icp: {
      tr: "Bu hizmet, ECC veya S/4HANA’yı üretimde kullanan, kendi içinde 7/24 SAP ekibi olmayan veya kapanış/mevzuat yükünü paylaşmak isteyen finans ve IT ekipleri içindir. Özellikle Türkiye e-dönüşüm takvimi, IFRS kapanışı ve çok şirketli yapılarda AMS farkı görünür.",
      en: "This is for finance and IT teams running ECC or S/4HANA in production who do not keep a 24/7 SAP bench in-house — or who want period-close and regulatory load shared. The difference shows up around Türkiye e-transformation calendars, IFRS closes and multi-company landscapes.",
    },
    stepsTitle: { tr: "AMS nasıl işler", en: "How AMS actually runs" },
    steps: [
      { tr: "Keşif: modül kapsamı, öncelikli süreçler, mevcut bilet hacmi ve kapanış takvimi.", en: "Discovery: module scope, priority processes, ticket volume and the close calendar." },
      { tr: "Hizmet tasarımı: SLA kademeleri, iletişim kanalları, hypercare ile steady-state ayrımı.", en: "Service design: SLA tiers, channels, and a clear split between hypercare and steady state." },
      { tr: "Adanmış ekip: FI/CO ağırlıklı çekirdek, MM/SD ve ABAP yedeklemesi.", en: "Named team: FI/CO core, with MM/SD and ABAP coverage behind it." },
      { tr: "Operasyon: olay çözümü, değişiklik talepleri, mevzuat uyarlaması, dönem sonu yoğunluğu.", en: "Run: incidents, changes, regulatory adaptation, and period-end surge cover." },
      { tr: "İyileştirme: tekrarlayan biletleri çözüme veya runbook’a çevirmek — aynı hatayı üçüncü kez almamak.", en: "Improve: turn repeat tickets into a fix or a runbook so the same incident does not come back a third time." },
    ],
    faqs: [
      { q: { tr: "AMS ile proje ekibi aynı şey mi?", en: "Is AMS the same as a project team?" }, a: { tr: "Hayır. Proje bir dönüşümü bitirir; AMS canlı sistemi taşır. Aynı kişiler bazen her iki rolde de bulunur ama sözleşme, SLA ve öncelik sırası farklıdır.", en: "No. A project finishes a transformation; AMS carries the live system. The same people may appear in both roles, but the contract, SLA and priority order are different." } },
      { q: { tr: "Hangi SLA’ları öneriyorsunuz?", en: "Which SLAs do you typically propose?" }, a: { tr: "Kritik finans süreçleri (ödeme, fatura, kapanış) için saatlik yanıt; diğerleri için iş günü içinde ilk dönüş. Rakamı şablondan kopyalamayız — sizin kapanış gününüze göre yazarız.", en: "Hour-scale response for critical finance (payments, invoices, close); business-day first response for the rest. We do not paste a template number — it is written around your close calendar." } },
      { q: { tr: "Türkiye lokalizasyonu AMS’nin parçası mı?", en: "Is Türkiye localization part of AMS?" }, a: { tr: "Evet, e-fatura / e-defter / e-irsaliye ve GİB takvimi AMS kapsamına alınabilir. Ayrı bir ‘lokalizasyon projesi’ diye ertelemeyin; tebliğ tarihi beklemez.", en: "Yes — e-invoice, e-ledger, e-despatch and the GİB calendar can sit inside AMS. Do not park them as a separate ‘localization project’; gazette dates do not wait." } },
      { q: { tr: "Sadece FI mi bakıyorsunuz?", en: "Do you only cover FI?" }, a: { tr: "Çekirdeğimiz finansal modüller. MM, SD, PS, FM ve ABAP ile birlikte çalışırız; kapsam sözleşmede netleşir.", en: "Finance modules are the core. We work with MM, SD, PS, FM and ABAP; scope is explicit in the agreement." } },
      { q: { tr: "Hypercare ne kadar sürer?", en: "How long does hypercare last?" }, a: { tr: "Go-live sonrası genelde 4–8 hafta. AMS’e geçiş, bilet hacmi ve kapanışın bir kez sakin geçmesiyle konuşulur — takvim yapraklarından değil.", en: "Usually four to eight weeks after go-live. Handover into AMS is discussed after ticket volume and one calm close — not after a number of calendar pages." } },
    ],
    related: ["customer-vendor-e-reconciliation", "automated-clearing-processes", "invoice-approval-workflow", "e-payment-bank-e-signature-integrations"],
  },
  {
    key: "hizmet-s4hana",
    color: "var(--amber-d)",
    eyebrow: { tr: "Dönüşüm", en: "Transformation" },
    h1: { tr: "S/4HANA Dönüşümleri", en: "S/4HANA Transformations" },
    lead: {
      tr: "Greenfield, brownfield veya bluefield — dönüşümün riski finansta toplanır. Universal Journal, Business Partner ve varlık muhasebesi ‘teknik maddeler’ değildir; kapanışı taşıyan kararlardır.",
      en: "Greenfield, brownfield or bluefield — transformation risk concentrates in finance. Universal Journal, Business Partner and asset accounting are not ‘technical items’; they are the decisions that carry the close.",
    },
    icp: {
      tr: "ECC’den çıkan, RISE with SAP veya GROW ile buluta bakan, ya da on-premise S/4’e geçen CFO / CIO ekipleri. Çok şirket, çok para birimi, Türkiye lokalizasyonu ve IFRS paralel defteri olan yapılar özellikle bu kapsamda.",
      en: "CFO/CIO teams leaving ECC, looking at RISE with SAP or GROW, or moving to on-premise S/4. Multi-company, multi-currency landscapes with Türkiye localization and an IFRS parallel ledger sit squarely here.",
    },
    stepsTitle: { tr: "Dönüşümü nasıl yürütürüz", en: "How we run a transformation" },
    steps: [
      { tr: "Hazırlık: Readiness, add-on envanteri, z-kod gerçekliği, finans veri kalitesi.", en: "Prepare: readiness, add-on inventory, the truth about Z-code, finance data quality." },
      { tr: "Senaryo seçimi: greenfield / brownfield / bluefield — slogan değil, veri ve süreç gerçeği.", en: "Choose the path: greenfield / brownfield / bluefield as a data-and-process fact, not a slogan." },
      { tr: "Tasarım: hesap planı, BP, yeni varlık, belge türleri, kapanış rolü.", en: "Design: chart of accounts, BP, new asset accounting, document types, who owns the close." },
      { tr: "Dönüşüm ve doğrulama: denemeler, bakiyeler, IFRS/VUK karşılaştırması.", en: "Convert and validate: dry runs, balances, IFRS vs local-book checks." },
      { tr: "Go-live ve hypercare: ilk kapanışı birlikte yapmak.", en: "Go-live and hypercare: close the first period together." },
    ],
    faqs: [
      { q: { tr: "Greenfield mi brownfield mi?", en: "Greenfield or brownfield?" }, a: { tr: "Temiz süreç ve az Z-kod varsa greenfield hız kazandırır. Ağır tarihçe ve sektör uyumu varsa brownfield veya seçici bluefield daha az sürpriz çıkarır. Kararı workshop’ta, slaytta değil.", en: "Clean processes and little Z-code favour greenfield. Heavy history and industry constraints favour brownfield or a selective bluefield. Decide in a workshop, not on a slide." } },
      { q: { tr: "RISE, GROW ve on-premise’i nasıl ayırıyorsunuz?", en: "How do you separate RISE, GROW and on-premise?" }, a: { tr: "GROW sade ve standart seven orta ölçek içindir. RISE, özel süreçleri olan ve işletmeyi SAP’nin işlettiği bir sözleşmeye taşımak isteyenler içindir. On-premise, veri yeri ve eklenti kontrolünü elde tutmak isteyenler içindir. Üçü de ‘bulut’ diye tek cümleye sığmaz.", en: "GROW fits mid-market teams who will live inside the standard. RISE fits those who will move operations onto an SAP-run contract while keeping some process depth. On-premise fits those who must keep data residency and add-on control. None of the three collapses into the word ‘cloud’." } },
      { q: { tr: "Türkiye e-dönüşümü dönüşümü durdurur mu?", en: "Will Türkiye e-invoicing block the programme?" }, a: { tr: "Durdurmamalı; paralel planlanmalı. GİB entegrasyonu go-live kriteridir, ‘2. faz’ değil.", en: "It should not. Plan it in parallel. GİB integration is a go-live criterion, not ‘phase 2’." } },
      { q: { tr: "Finans veri dönüşümünde neyi farklı yapıyorsunuz?", en: "What is different about your finance data conversion?" }, a: { tr: "Bakiyeyi ‘yükledik’ demek yetmez. Açık kalem, varlık alt sayısı, müşteri-satıcı BP eşlemesi ve dönem kesiti ayrı doğrulanır.", en: "‘Loaded the balances’ is not enough. Open items, asset sub-numbers, customer/vendor BP mapping and the period cut are validated separately." } },
      { q: { tr: "Ne kadar sürer?", en: "How long does it take?" }, a: { tr: "Kapsama göre değişir. Tek şirket sade brownfield ile çok ülkeli greenfield aynı cümlede konuşulmaz. Tahmin, envanterden sonra verilir.", en: "It depends on scope. A single-company brownfield and a multi-country greenfield should not share a sentence. We estimate after the inventory." } },
      { q: { tr: "Conforcus tek başına mı gider?", en: "Does Conforcus run this alone?" }, a: { tr: "Finans ve AMS çekirdeğini biz taşırız. Büyük programlarda entegratör ve diğer modül ortaklarıyla omuz omuza çalıştığımız olur — Evyap S/4 örneğinde olduğu gibi, kamuya açık olarak da anlattık.", en: "We carry the finance and AMS core. On large programmes we work shoulder to shoulder with an integrator and other module partners — as we have described publicly on the Evyap S/4 programme." } },
    ],
    related: ["inflation-accounting", "ifrs-16-package", "automated-clearing-processes", "customer-vendor-e-reconciliation"],
  },
  {
    key: "hizmet-rollout",
    color: "var(--indigo)",
    eyebrow: { tr: "Global Yaygınlaştırma", en: "Global Deployment" },
    h1: { tr: "Global Rollout", en: "Global Rollout" },
    lead: {
      tr: "Aynı şablon Hanoi’de de Hamburg’da da aynı gün canlıya geçebilir — ama vergi numarası, fatura biçimi ve onay kültürü geçmez. Rollout, kopyala-yapıştır değil; şablon + lokalizasyon + yönetişimdir.",
      en: "The same template can go live in Hanoi and Hamburg on the same day — tax IDs, invoice shapes and approval culture cannot. Rollout is not copy-paste; it is template plus localization plus governance.",
    },
    icp: {
      tr: "Merkez şablonu olan, yeni ülke veya şirket kodu açan gruplar. Kozmetik, FMCG, üretim ve holding yapıları; Almanya Datev / XRechnung gibi yerel zorunluluklar devreye girdiğinde özellikle.",
      en: "Groups that already have a hub template and are opening a new country or company code. Cosmetics, FMCG, manufacturing and holding structures — especially when local obligations such as German DATEV / XRechnung enter the picture.",
    },
    stepsTitle: { tr: "Rollout adımları", en: "Rollout steps" },
    steps: [
      { tr: "Şablon envanteri: neresi global, neresi yerel — yazılı olarak.", en: "Template inventory: what is global, what is local — in writing." },
      { tr: "Ülke gap: vergi, e-fatura, dil, banka, onay matrisi.", en: "Country gap: tax, e-invoicing, language, banking, approval matrix." },
      { tr: "Lokalizasyon: yasal raporlar ve entegrasyonlar, şablonu bozmadan.", en: "Localization: statutory reports and integrations without breaking the template." },
      { tr: "Veri ve yetki: master data, rol, şirket kodu kesiti.", en: "Data and authorization: master data, roles, company-code cut." },
      { tr: "Go-live orkestrasyonu: saat dilimi, hypercare penceresi, merkez-ülke ritmi.", en: "Go-live orchestration: time zones, hypercare window, hub–country rhythm." },
    ],
    faqs: [
      { q: { tr: "Şablonu her ülkede değiştirir misiniz?", en: "Do you change the template in every country?" }, a: { tr: "Hayır. Yerel yasal zorunluluk şablona eklenir; ‘biz burada böyle yapıyoruz’ alışkanlığı merkeze taşınmaz. Aksi halde 3. ülkede şablon kalmaz.", en: "No. Local legal musts are added; ‘this is how we do it here’ habits are not promoted into the hub. Otherwise you have no template by country three." } },
      { q: { tr: "IFRS ve yerel defter birlikte gider mi?", en: "Can IFRS and the local book travel together?" }, a: { tr: "Evet — paralel defter veya hesap yaklaşımı ülkeye göre tasarlanır. Tek deftere zorlamak rollout’u değil, denetçiyi yorar.", en: "Yes — parallel ledger or account approach is designed per country. Forcing a single book tires the auditor, not the rollout." } },
      { q: { tr: "Eşzamanlı çok ülke mümkün mü?", en: "Can several countries go live together?" }, a: { tr: "Mümkün; hazırlık olgunluğu aynıysa. Biri boşlukluysa sıraya alınır. Kahramanlık takvimi değil, risk takvimi.", en: "Yes, if readiness is actually the same. If one country is hollow, it waits. A risk calendar, not a hero calendar." } },
      { q: { tr: "Almanya rollout’unda neler öne çıkar?", en: "What stands out on a German rollout?" }, a: { tr: "DATEV, XRechnung/ZUGFeRD, depo/lokasyon ve banka biçimleri. Flormar Almanya kickoff’unda kamuya anlattığımız kapsam da FI, CO, SD, MM ve bu yerel entegrasyonlardı.", en: "DATEV, XRechnung/ZUGFeRD, multi-site logistics and bank formats. The public scope we described at the Flormar Germany kickoff was FI, CO, SD, MM plus those local integrations." } },
      { q: { tr: "Dil ve eğitim nasıl çözülür?", en: "How do you handle language and training?" }, a: { tr: "Şablon İngilizce/Türkçe kalabilir; kullanıcı ekranı ve eğitim yerel dilde olur. Çok dilli ekip buranın maliyeti değil, sigortasıdır.", en: "The template can stay English/Turkish; screens and training go local. A multilingual team is insurance, not a luxury line." } },
    ],
    related: ["e-payment-bank-e-signature-integrations", "ifrs-16-package", "import-management-process", "direct-debit-system-dbs-bank-integration"],
  },
  {
    key: "hizmet-urun",
    color: "var(--green)",
    eyebrow: { tr: "Özel Geliştirme", en: "Custom Development" },
    h1: { tr: "Ürün & Çözüm Geliştirme", en: "Product & Solution Development" },
    lead: {
      tr: "Standart SAP her şirketin Excel’ini bitirmez. ABAP, Fiori ve BTP ile ya 48+ hazır paketten birini kurarız ya da sizin kapanışınızı yavaşlatan süreci yazılım hâline getiririz.",
      en: "Standard SAP will not retire every spreadsheet. With ABAP, Fiori and BTP we either deploy one of 48+ ready packages or turn the process that slows your close into software.",
    },
    icp: {
      tr: "Mutabakat, onay, ithalat, e-ödeme, enflasyon veya IFRS 16 gibi tekrarlayan işi hâlâ e-posta ve Excel’de taşıyan finans/satın alma ekipleri. ‘Bunu Z-programla çözelim’ demeden önce paket var mı diye bakın.",
      en: "Finance and procurement teams still carrying reconciliation, approvals, import, e-payment, inflation or IFRS 16 in mail and Excel. Check for a package before anyone says ‘we’ll write a Z-program’.",
    },
    stepsTitle: { tr: "Geliştirme zinciri", en: "How we build" },
    steps: [
      { tr: "Süreç turu: kim, hangi işlem, hangi kontrol, hangi rapor.", en: "Walk the process: who, which transaction, which control, which report." },
      { tr: "Paket mi özel mi: katalogdan kurulum veya FS.", en: "Package or custom: deploy from the catalog, or write an FS." },
      { tr: "TS ve geliştirme: ABAP/Fiori, yetki, performans.", en: "TS and build: ABAP/Fiori, authorization, performance." },
      { tr: "CR ve test: iş birimi ile kabul, kapanış senaryosu.", en: "CR and test: business acceptance, including a close scenario." },
      { tr: "Canlı ve AMS’e devir: runbook, izleme, küçük iyileştirme.", en: "Live and hand to AMS: runbook, monitoring, small improvements." },
    ],
    faqs: [
      { q: { tr: "48+ çözümün hepsi aynı derinlikte mi?", en: "Are all 48+ solutions equally deep?" }, a: { tr: "Hayır. Sekiz çözümün uzun, indekslenen anlatımı var. Diğerleri katalogda durur; ince sayfa olarak indexlenmez. İhtiyacınız listede yoksa analiz formundan özel talep açın.", en: "No. Eight solutions have long, indexed pages. The rest stay in the catalog and are not indexed as thin pages. If you do not see what you need, open a custom request from the analysis form." } },
      { q: { tr: "Fiori şart mı?", en: "Is Fiori mandatory?" }, a: { tr: "Kullanıcıya dokunan onay ve mutabakat işlerinde tercih ederiz. Toplu finans programı GUI’de kalabilir. Araç, süreçten sonra seçilir.", en: "We prefer it where people approve or reconcile. Mass finance programs can stay in GUI. The tool is chosen after the process." } },
      { q: { tr: "FS → TS → CR neden?", en: "Why FS → TS → CR?" }, a: { tr: "Sözlü ‘bir Z yazın’ talebi canlıda sapar. Yazılı fonksiyon, teknik ve değişiklik kaydı; sonraki AMS ekibinin okuyacağı metindir.", en: "A spoken ‘write a Z’ request drifts in production. Written FS, TS and change record is what the next AMS team will actually read." } },
      { q: { tr: "Hazır paket ne kadar sürede kurulur?", en: "How fast is a ready package?" }, a: { tr: "Süreç uyumu ve test verisine bağlı. ‘Yarın’ demeyiz; keşif sonrası konuşuruz. Saatler süren işi dakikaya indirmek iddiası, kurulum süresini gizlemez.", en: "It depends on process fit and test data. We will not say ‘tomorrow’; we talk after discovery. Cutting hours of work to minutes does not hide the install time." } },
      { q: { tr: "Confiq bu başlığın parçası mı?", en: "Is Confiq part of this?" }, a: { tr: "Confiq ayrı bir ürün ailesi (Decode, Predict, Cortex, Bridge, Scan). Buradaki ‘ürün’ daha çok SAP içi süreç paketleri ve özel geliştirmedir.", en: "Confiq is a separate product family (Decode, Predict, Cortex, Bridge, Scan). ‘Product’ here means in-SAP process packages and custom build." } },
    ],
    related: ["inflation-accounting", "invoice-approval-workflow", "import-management-process", "customer-vendor-e-reconciliation"],
  },
];

export function serviceByKey(key: RouteKey) {
  return SERVICE_PAGES.find((s) => s.key === key);
}

export const SERVICE_SLUG_TR: Record<string, RouteKey> = {
  "sap-destek-ams": "hizmet-sap-ams",
  "s4hana-donusum": "hizmet-s4hana",
  "global-rollout": "hizmet-rollout",
  "urun-gelistirme": "hizmet-urun",
};
export const SERVICE_SLUG_EN: Record<string, RouteKey> = {
  "sap-ams": "hizmet-sap-ams",
  "s4hana-transformation": "hizmet-s4hana",
  "global-rollout": "hizmet-rollout",
  "product-development": "hizmet-urun",
};
