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
  publishedAt: string;
  readMins: number;
  author: { name: string; role_tr: string; role_en: string };
  body: { tr: PTBlock[]; en: PTBlock[] };
  faqs?: { q: { tr: string; en: string }; a: { tr: string; en: string } }[];
};

const AUTHOR = { name: "Atilla Kuruüzüm", role_tr: "Managing Partner", role_en: "Managing Partner" };

export const SAMPLE_POSTS: SamplePost[] = [
  {
    slug: "greenfield-brownfield-bluefield",
    title: {
      tr: "Greenfield, brownfield, bluefield: S/4HANA’da asıl karar hangisi?",
      en: "Greenfield, brownfield, bluefield: which S/4HANA call is the real one?",
    },
    excerpt: {
      tr: "Üç kelime slaytta komşu durur. Canlıda komşu değiller. Karar, slogan değil veri ve kapanış disiplinidir.",
      en: "Three words sit together on a slide. In production they do not. The call is data and close discipline, not a slogan.",
    },
    category: "S/4HANA",
    publishedAt: "2026-03-12",
    readMins: 8,
    author: AUTHOR,
    faqs: [
      { q: { tr: "Greenfield mi brownfield mı daha hızlı?", en: "Which is faster, greenfield or brownfield?" }, a: { tr: "Brownfield genelde daha kısa görünür çünkü süreçler yeniden tasarlanmaz; ancak taşınan Z-kod ve kirli ana veri süreyi geri alır. Greenfield'da takvim, veri taşıma kapsamına bağlıdır. Gerçek cevap, hazırlık analizindeki özel geliştirme envanterinden çıkar.", en: "Brownfield usually looks shorter because processes are not redesigned; however migrated custom code and dirty master data give that time back. In greenfield the timeline depends on data migration scope. The real answer comes from the custom-code inventory in the readiness assessment." } },
      { q: { tr: "Bluefield gerçek bir yöntem mi?", en: "Is bluefield a real method?" }, a: { tr: "Bluefield, seçmeli veri taşımayla ilerleyen yaklaşımların pazarlama adıdır. Teknik olarak mümkündür ama yönetişim ister: hangi şirket kodunun yeni kurulacağı, hangisinin taşınacağı yazılı kriterlere bağlanmazsa şablon dağılır.", en: "Bluefield is the marketing name for selective data transition approaches. It is technically possible but demands governance: unless written criteria decide which company code is rebuilt and which is migrated, the template falls apart." } },
      { q: { tr: "Karar için ilk adım ne olmalı?", en: "What is the first step in deciding?" }, a: { tr: "Sistem fotoğrafı: son 12–24 ayda hangi özel nesne kaç kez çalıştı, ana veri kalitesi nedir, hangi yasal gereklilikler kritik. Bu envanter olmadan alınan yöntem kararı, projenin ortasında revize ediliyor.", en: "A picture of the system: which custom objects ran how often in the past 12–24 months, what master data quality looks like, which statutory requirements are critical. A method decision without this inventory tends to be revised mid-project." } },
    ],
    body: {
      tr: [
        p("S/4HANA konuşması çoğu masada aynı cümleyle açılır: greenfield mı brownfield mı. Bluefield sonra eklenir, çünkü birileri ‘ikisinin ortası’ demiştir. Ortası, bir yöntem adı değildir. Hangi verinin, hangi sürecin, hangi Z-kodun yeni dünyaya taşınacağına dair bir seçim paketidir. Bu yazı üç yolu yan yana koyuyor; kazanan ilan etmiyor."),
        h("Greenfield ne zaman gerçekten yeşil?"),
        p("Süreçlerinizi standartta yaşatabiliyorsanız, add-on listeniz kısaysa ve kapanışı birkaç kişinin başında tuttuğu bir Excel imparatorluğu yoksa greenfield hız kazandırır. Kazanç, ‘temiz S/4’ romantizmi değil: Universal Journal’a düzgün doğmak, Business Partner’ı ertelememek, varlık muhasebesini eski dünya taklidiyle kurmamaktır. Bedel, tarihçedir. On yılın açık kalemi, dava dosyası, eski maliyet tahmini yeni sistemde yoktur — arşiv ve rapor kararı ayrıca alınır."),
        h("Brownfield neyi korur, neyi gizler?"),
        p("Brownfield, çalışan fabrikayı taşıma vaadidir. Vaadin altı, Z-kod ve dirty master’dır. Taşıdığınız şey süreç değil, alışkanlık da olabilir. Finans tarafında belge türü, hesap planı ve kapanış rolü dönüşmeden ‘teknik conversion bitti’ demek, ilk kapanışta faturayı keser. Conversion’ı deneme çalışması olmadan, bakiyeyi hesap hesap doğrulamadan imzalamayın. İmza, slayt değildir."),
        h("Bluefield: seçici olmak, kararsız olmak değil"),
        p("Bluefield, bazı şirket kodlarını veya süreçleri yeni kurup bazılarını taşımak diye satılır. Bu, yönetişim ister. Aksi halde her ekip kendi yeşilini ilan eder, şablon kalmaz. Seçici olunacaksa kriter yazılıdır: yasal zorunluluk, hacim, Z-kod bağımlılığı, kapanış kritikliği. ‘Satış ister’ kriter değildir."),
        h("RISE ve GROW bu üçlünün neresinde?"),
        p("Hiçbirinin yerine geçmezler. RISE bir işletme ve sözleşme modelidir; GROW sade standart seven orta ölçek için bir üründür; on-premise veri yeri ve eklenti kontrolüdür. Greenfield’i GROW ile eşlemek bazen doğru, brownfield’i RISE ile eşlemek bazen doğrudur. Otomatik eşleşme yoktur. Ayrı yazıda (RISE / GROW / on-prem) sözleşmeyi konuşuyoruz; burada yöntem."),
        h("Türkiye lokalizasyonu ‘2. faz’ olamaz"),
        p("e-Fatura, e-defter, e-irsaliye ve GİB takvimi go-live kriteridir. Greenfield diye ertelemek, ilk ay yasal süreci Excel’de yürütmek demektir. Brownfield diye ‘zaten vardı’ demek, S/4 nesnelerinde kırıldığını görmemek demektir. Lokalizasyon, yöntem seçiminden bağımsız bir raydır; rayı sökmeyin."),
        p("Conforcus’ta bu kararı workshop’ta alırız: add-on envanteri, kapanış takvimi, BP ve varlık. Slaytta üç kutucuk işaretlemek, karar değildir. Karar, ilk kapanışı kiminle birlikte yapacağınızdır."),
      ],
      en: [
        p("Most S/4HANA tables open with the same sentence: greenfield or brownfield. Bluefield is appended because someone said ‘the middle’. The middle is not a method name. It is a selection pack: which data, which process, which Z-code travels. This piece puts the three paths next to each other. It does not crown a winner."),
        h("When is greenfield actually green?"),
        p("If you can live in the standard, your add-on list is short, and close is not an Excel empire run by three people, greenfield buys speed. The gain is not a ‘clean S/4’ romance: being born properly into the Universal Journal, not postponing Business Partner, not faking old asset accounting. The cost is history. Ten years of open items, disputes and old cost estimates are not in the new system — archive and reporting are a separate call."),
        h("What brownfield keeps — and what it hides"),
        p("Brownfield promises to move a working factory. Under the promise sit Z-code and dirty master. You may be moving habit, not process. If document types, the chart and close roles do not change, ‘technical conversion is done’ will cut you on the first close. Do not sign conversion without a dry run and account-level balance checks. A signature is not a slide."),
        h("Bluefield: selective, not indecisive"),
        p("Bluefield is sold as ‘new here, convert there’. That needs governance. Otherwise every team declares its own green and the template dies. If you select, write the criteria: legal must, volume, Z-dependence, close criticality. ‘Sales wants it’ is not a criterion."),
        h("Where RISE and GROW sit"),
        p("They replace none of the three. RISE is an operating and contract model; GROW is a product for mid-market teams who will live in the standard; on-premise is data residency and add-on control. Mapping greenfield to GROW is sometimes right; mapping brownfield to RISE is sometimes right. There is no automatic pairing. Another article covers the contract; this one is method."),
        h("Türkiye localization cannot be phase 2"),
        p("e-Invoice, e-ledger, e-despatch and the GİB calendar are go-live criteria. Postponing them because you chose greenfield means running the first legal month in Excel. Saying ‘we already had it’ because you chose brownfield means missing the break on S/4 objects. Localization is a rail independent of method. Do not pull the rail."),
        p("At Conforcus we take the call in a workshop: add-on inventory, close calendar, BP and assets. Ticking three boxes on a slide is not a decision. The decision is who you will close the first period with."),
      ],
    },
  },
  {
    slug: "sap-ams-nedir",
    title: {
      tr: "SAP AMS nedir — ve neden destek sözleşmesi yetmez?",
      en: "What SAP AMS is — and why a ‘support contract’ is not enough",
    },
    excerpt: {
      tr: "AMS, bilet kuyruğu değildir. Canlı SAP’i kapanış ve mevzuatla birlikte taşımaktır. SLA tek başına kültür yazmaz.",
      en: "AMS is not a ticket queue. It is carrying live SAP with the close and the gazette. An SLA alone does not write culture.",
    },
    category: "SAP Destek",
    publishedAt: "2026-04-02",
    readMins: 7,
    author: AUTHOR,
    faqs: [
      { q: { tr: "AMS ile normal danışmanlık arasındaki fark ne?", en: "How does AMS differ from regular consulting?" }, a: { tr: "Danışmanlık proje bazlıdır, başlar ve biter. AMS süreklidir: sisteminizi tanıyan sabit bir ekip, SLA süreleriyle bağlı olarak günlük operasyonu ve dönem sonu kapanışını destekler, aynı zamanda tekrar eden sorunları kökünden çözer.", en: "Consulting is project-based; it starts and ends. AMS is continuous: a named team that knows your system supports daily operations and period-end close against SLA targets, while also removing the root cause of recurring issues." } },
      { q: { tr: "Kendi iç ekibimiz varken AMS'e ihtiyacımız olur mu?", en: "Do we need AMS if we already have an in-house team?" }, a: { tr: "Çoğu şirkette AMS iç ekibin yerine değil, yanına kurulur. İç ekip iş bilgisini taşır; AMS derinlik (modül uzmanlığı, mevzuat, ABAP) ve süreklilik (izin, ayrılma, dönem sonu yoğunluğu) sağlar.", en: "In most companies AMS is set up next to the in-house team, not instead of it. The in-house team carries business knowledge; AMS adds depth (module expertise, regulation, ABAP) and continuity (leave, attrition, period-end peaks)." } },
      { q: { tr: "AMS maliyeti nasıl belirlenir?", en: "How is AMS pricing determined?" }, a: { tr: "Modül kapsamı, bilet hacmi, SLA kademesi ve kapanış desteğinin kapsamı belirleyicidir. Sağlıklı bir teklif için önce birkaç aylık gerçek bilet verisi ve kapanış takvimi incelenir; kapsam netleşmeden verilen fiyat genelde ikisinden birine zarar verir.", en: "Module scope, ticket volume, SLA tier and the extent of close support drive it. A sound proposal starts from a few months of real ticket data and the close calendar; a price quoted before scope is clear usually hurts one side or the other." } },
    ],
    body: {
      tr: [
        p("AMS (Application Management Services) kelimesi, tekliflerde ‘7/24 destek’ diye şişer. 7/24, bir telefonun çalmasıdır. AMS, kimin çalacağını, kapanışta kimin masada duracağını ve aynı hatanın üçüncü kez gelmeyeceğini tarif eder. Bu yazı tanım cümlesi; sihirli SLA tablosu değil."),
        h("Proje biter, sistem kalır"),
        p("Dönüşüm veya rollout bittiğinde hypercare birkaç haftadır. Sonra işletme başlar: dönem sonu, banka dosyası, e-fatura tebliği, yanlış master, yetki. Bunları proje ekibi ‘artık sizin’ diye bırakırsa, bilgi de gider. AMS, o bilgiyi isimlendirilmiş bir ekibe bağlar. Sözleşme, kapsam ve öncelik sırası yazar. Yazılmazsa her şey acildir; acil olan hiçbir şey bitmez."),
        h("SLA neyi ölçer, neyi ölçmez?"),
        p("Yanıt süresi ölçülür. Kapanış kalitesi ölçülmez — ta ki ters kayıt ve tekrar bilet sayılana kadar. İyi AMS, tekrarlayan olayı runbook veya düzeltmeye çevirir. Kötü AMS, aynı Fiori dump’ını her ay yeniden ‘çözür’. Skor tahtası uydurmayız; kuyruk ve tekrar adedi yeter."),
        h("Türkiye’de AMS’in görünmez yarısı"),
        p("GİB takvimi, e-belge kesintisi, enflasyon düzeltmesi çalıştırma penceresi, DBS ret kodu. Bunlar ‘ABAP dump’ değildir; takvim işidir. Destek sözleşmesi yalnızca Priority-1 dump yazıyorsa, kapanış günü yalnız kalırsınız. Kapsama mevzuat ve kapanış penceresini yazın."),
        h("Ne zaman AMS, ne zaman proje?"),
        p("Yeni bir ülke, yeni bir defter, yeni bir banka fabrikası — bunlar projedir. Yeni bir onaycı, yeni bir vergi kodu, endeks güncellemesi — AMS. Karışırsa her bakım ‘değişiklik talebi’ olup kuyruk şişer, ya da her proje ‘destekten hallice’ olup risk gizlenir. Sınır, keşifte çizilir."),
        p("Conforcus’ta AMS’i ortaklık diye tarif ediyoruz çünkü kapanışı birlikte yapmadığımız bir ‘destek’i satmıyoruz. Ücretsiz analiz, kapsamın nerede durduğunu konuşmak içindir — sihirli sağlık skoru için değil."),
      ],
      en: [
        p("AMS (Application Management Services) inflates in proposals as ‘24/7 support’. 24/7 is a phone ringing. AMS names who picks up, who sits the close, and how the same incident does not arrive a third time. This is a definition, not a magic SLA table."),
        h("The project ends; the system stays"),
        p("When a transformation or rollout ends, hypercare is a few weeks. Then operations: period-end, bank files, an e-invoice communiqué, bad master, authorizations. If the project team says ‘yours now’, the knowledge leaves too. AMS binds that knowledge to a named team. The contract writes scope and priority. If it does not, everything is urgent and nothing finishes."),
        h("What an SLA measures — and what it does not"),
        p("Response time is measured. Close quality is not — until reversals and repeat tickets are counted. Good AMS turns a repeating incident into a runbook or a fix. Bad AMS ‘solves’ the same Fiori dump every month. We do not invent a scoreboard; queue and repeat counts are enough."),
        h("The invisible half of AMS in Türkiye"),
        p("The GİB calendar, an e-document outage, the inflation-run window, a DBS reject code. These are not ABAP dumps; they are calendar work. If the support contract only writes Priority-1 dumps, you are alone on close day. Write regulation and the close window into scope."),
        h("When is it AMS, when is it a project?"),
        p("A new country, a new ledger, a new payment factory — project. A new approver, a new tax code, an index update — AMS. Mix them and every care item becomes a change request, or every project pretends to be ‘just support’ and hides risk. The line is drawn in discovery."),
        p("At Conforcus we call AMS a partnership because we do not sell ‘support’ we will not close with. The free analysis is to talk about where scope sits — not to mint a magic health score."),
      ],
    },
  },
  {
    slug: "sap-turkiye-e-fatura-gib-localization",
    title: {
      tr: "SAP’de Türkiye e-fatura ve GİB — plus a localization brief for English readers",
      en: "Türkiye e-invoicing on SAP, GİB, and a localization brief",
    },
    excerpt: {
      tr: "e-Fatura go-live’ın 2. fazı değildir. GİB takvimi, park edilen fatura ve iç onay ayrı saatlerdir. EN okur için: localization is not a language pack.",
      en: "e-Invoicing is not phase 2 of go-live. GİB calendars, parked invoices and internal approval are different clocks. Localization is not a language pack.",
    },
    category: "Genel",
    publishedAt: "2026-05-08",
    readMins: 9,
    author: AUTHOR,
    faqs: [
      { q: { tr: "SAP standardı Türkiye e-dönüşümünü tek başına karşılar mı?", en: "Does standard SAP cover Türkiye e-transformation on its own?" }, a: { tr: "Karşılamaz. e-Fatura, e-Arşiv, e-İrsaliye ve e-Defter için entegratör bağlantısı, yerel format ve mevzuat takibi gerekir. Standart SAP altyapıyı verir; uyum katmanı ayrıca kurulur ve mevzuat değiştikçe güncellenir.", en: "It does not. e-Invoice, e-Archive, e-Delivery note and e-Ledger require integrator connectivity, local formats and regulatory tracking. Standard SAP provides the foundation; the compliance layer is built separately and updated as regulation changes." } },
      { q: { tr: "Global şablonla yerel mevzuat nasıl bir arada yürür?", en: "How do a global template and local regulation coexist?" }, a: { tr: "Yerel gereklilikler şablonu bozmadan, ülkeye özel katman olarak eklenir. Kritik kural şudur: merkezî süreç ve hesap planı ortak kalır, yasal çıktı ve raporlama ülke katmanında çözülür.", en: "Local requirements are added as a country layer without breaking the template. The critical rule: the central process and chart of accounts stay shared, while statutory output and reporting are solved in the country layer." } },
      { q: { tr: "Mevzuat değiştiğinde ne oluyor?", en: "What happens when regulation changes?" }, a: { tr: "Takvim genelde kısa olur. Bu yüzden uyum katmanının kim tarafından, hangi SLA ile güncelleneceği baştan tanımlanmalıdır; aksi halde her değişiklik acil proje hâline gelir.", en: "The deadline is usually short. That is why it must be defined upfront who updates the compliance layer and under which SLA; otherwise every change turns into an emergency project." } },
    ],
    body: {
      tr: [
        p("Türkiye’de SAP konuşması, bir noktada GİB’e çarpar. e-Fatura, e-arşiv, e-irsaliye, e-defter — her biri ayrı tebliğ, ayrı kesinti, ayrı ret penceresi. Uluslararası şablon bunları ‘local add-on’ diye 2. faza iter. 2. faz, ilk yasal ayın Excel’idir. Bu yazının Türkçe yarısı pratik; İngilizce yarısı aynı gerçeği localization kelimesinin içine gömer."),
        h("Yasal kabul ile muhasebe kaydı aynı şey değil"),
        p("GİB’de belge kabul edilmiş olabilir; SAP’de park halindedir. KDV raporu iki dünya görür. İç onay (tutar, hesap, üç yollu eşleşme) yasal ret süresinden uzundur. İkisini tek SLA sanmak ya belgeyi panikle reddettirir ya da süreyi yakar. Süreçte iki saat durur."),
        h("Entegrasyon kimin işi?"),
        p("Özel entegratör, SAP e-belge çözümleri, banka ve e-imza uçları. Hepsi ‘SAP standardı’ diye tek kutuya girmez. Keşifte hangi uç, hangi şirket kodu, hangi belge türü yazılır. Yazılmazsa go-live sabahı XML konuşur, finans susar."),
        h("Kapanış takvimi"),
        p("e-Defter beratı ve dönem kesimi, AMS takvimine yazılır. Yazılmazsa her dönem ‘bu sefer de yetiştirdik’ kahramanlığıdır. Kahramanlık, süreç değildir. Enflasyon ve IFRS kapanışı aynı pencereye binerse e-belge kuyruğu üçüncü iş olur; öncelik sırası sözleşmede durur."),
        h("For English readers: localization is not translation"),
        p("A global template can stay in English. A Turkish company code still needs statutory invoicing, ledger filing, tax codes that mean something to a local inspector, and a calendar that is not the US close. Localization is those rails. Language of the GUI is a separate, smaller decision. If your rollout plan says ‘we will add Turkey later’, you are planning an Excel month. GİB does not wait for phase 2. German XRechnung is a different rail again — do not paste one ‘e-invoice’ story on both countries."),
        p("Conforcus, e-belgeyi AMS ve fatura onay paketinin komşusu görür. Komşu, aynı ev değil: yasal saat ayrı, iç kontrol saati ayrı. Karıştırmayın."),
      ],
      en: [
        p("In Türkiye, every SAP conversation eventually hits GİB — the revenue administration. e-Invoice, e-archive, e-despatch, e-ledger: each has its own communiqué, outage and reject window. A global template parks them as a ‘local add-on’ in phase 2. Phase 2 is the first legal month in Excel. The Turkish half of this article is practice; this English half puts the same fact inside the word localization."),
        h("Legal acceptance is not the accounting post"),
        p("A document may be accepted at GİB and still parked in SAP. VAT reports then see two worlds. Internal approval (amount, account, three-way match) is longer than the statutory reject window. Treating them as one SLA either panic-rejects the document or burns the window. The process keeps two clocks."),
        h("Whose job is the integration?"),
        p("A special integrator, SAP e-document options, banks, e-signature edges. They do not fit in one box labelled ‘SAP standard’. Discovery writes which edge, which company code, which document type. If it does not, go-live morning speaks XML and finance is silent."),
        h("The close calendar"),
        p("e-Ledger seals and the period cut belong on the AMS calendar. If they do not, every period is a ‘we made it this time’ hero story. Heroes are not a process. If inflation and IFRS land in the same window, the e-document queue is a third job; priority sits in the contract."),
        h("Localization is not a language pack"),
        p("The template can stay English. A Turkish company code still needs statutory invoicing, ledger filing, tax codes a local inspector recognises, and a calendar that is not the US close. Those rails are localization. GUI language is a smaller, separate call. If the rollout plan says ‘we will add Turkey later’, you are planning an Excel month. GİB does not wait for phase 2. German XRechnung is another rail — do not paste one ‘e-invoice’ story on both countries."),
        p("We treat e-documents as a neighbour of AMS and invoice approval. Neighbour, not the same house: statutory clock apart from internal-control clock. Do not mix them."),
      ],
    },
  },
  {
    slug: "rise-vs-grow-vs-on-premise",
    title: {
      tr: "RISE with SAP, GROW ve on-premise: sözleşmeyi yöntem sanmayın",
      en: "RISE with SAP, GROW and on-premise: do not mistake the contract for the method",
    },
    excerpt: {
      tr: "Üçü de ‘bulut’ diye tek cümleye sığmaz. RISE işletme modeli, GROW sade standart, on-premise kontrol. Greenfield kararı ayrıdır.",
      en: "None of the three fits in the word ‘cloud’. RISE is how you operate, GROW is a standard-first product, on-premise is control. Greenfield is a separate call.",
    },
    category: "S/4HANA",
    publishedAt: "2026-06-18",
    readMins: 8,
    author: AUTHOR,
    faqs: [
      { q: { tr: "RISE, GROW ve on-premise arasındaki temel fark ne?", en: "What is the core difference between RISE, GROW and on-premise?" }, a: { tr: "On-premise'de altyapı ve sürüm kontrolü sizde, sorumluluk da sizde. RISE, mevcut karmaşıklığı olan kurumlar için yönetilen bir bulut paketidir. GROW, standarda yakın çalışan ve hızlı başlamak isteyen şirketler için tasarlanmıştır.", en: "On-premise leaves infrastructure and release control — and responsibility — with you. RISE is a managed cloud package for organisations carrying existing complexity. GROW is designed for companies close to standard that want to start quickly." } },
      { q: { tr: "Özel geliştirmelerimiz varsa hangisi uygun?", en: "Which fits if we have heavy custom development?" }, a: { tr: "Yoğun özel geliştirme ve entegrasyon varsa GROW dar gelir. Bu durumda ya RISE ya da on-premise değerlendirilir; karar, geliştirmelerin ne kadarının standartla karşılanabileceğine bakılarak verilir.", en: "With heavy custom development and integrations, GROW becomes tight. RISE or on-premise are then evaluated; the decision rests on how much of that development standard functionality can absorb." } },
      { q: { tr: "Bulut daha mı ucuz?", en: "Is cloud cheaper?" }, a: { tr: "Toplam sahip olma maliyetine bakmak gerekir: lisans, altyapı, operasyon ekibi, yükseltme emeği ve kesinti riski birlikte hesaplanır. Bulut çoğu zaman maliyeti öngörülebilir kılar; her senaryoda ucuzlatmaz.", en: "You have to look at total cost of ownership: licences, infrastructure, operations staff, upgrade effort and downtime risk together. Cloud usually makes cost predictable; it does not make it lower in every scenario." } },
    ],
    body: {
      tr: [
        p("SAP’nin ürün ve sözleşme isimleri masada yöntem gibi durur. RISE with SAP, GROW with SAP, on-premise S/4. Üçü de S/4HANA’ya gidebilir; üçü de greenfield veya brownfield ile birleşebilir. Karıştırınca ‘buluta geçiyoruz’ cümlesi her kararı yutar. Bu yazı yutar cümleyi ayırır. Fiyat listesi değildir."),
        h("GROW: sade yaşayacak mısınız?"),
        p("GROW, orta ölçek ve standart süreç vaadidir. Vaadi tutmak, Z-kod iştahını kesmektir. Kapanışınız üç tane Z-raporuna bağlıysa GROW’a ‘sığarız’ demek, go-live’da sığmamaktır. Sığacaksanız, paket ve Fiori ile yaşarsınız. Sığmayacaksanız, başka sözleşme ararsınız — utanç değil, dürüstlüktür."),
        h("RISE: kim işletir?"),
        p("RISE, altyapı ve birçok işletme katmanını SAP’nin sözleşmesine taşır. Bu, yöntem değildir; işletme modelidir. Hâlâ greenfield veya brownfield seçeceksiniz. Hâlâ lokalizasyon rayını döşeyeceksiniz. Değişen, kimin yama, kimin sistem, kimin yükseltme takvimine sahip olduğudur. Veri yeri ve ek sorumluluklar sözleşmede okunur; slaytta ‘cloud’ diye geçiştirilmez."),
        h("On-premise: kontrol ve bedeli"),
        p("Kendi veri merkeziniz veya hosting partner’ınız, eklenti ve yükseltme takvimini sizde bırakır. Bedel, işletme olgunluğudur. AMS’iniz yoksa on-premise ‘özgürlük’ değil, yalnızlıktır. Özgürlük, yama penceresini dolduracak ekip demektir."),
        h("Nasıl seçilir?"),
        p("Üç soru: süreci standartta yaşatır mıyız, veriyi nerede tutmak zorundayız, yükseltmeyi kim yönetsin. Cevaplar yöntem (greenfield/brownfield) ile çarpılır. Çarpım tablosu slaytta tek kutucuk değildir. Workshop’ta add-on, GİB, kapanış ve yetki konuşulur. Konuşulmazsa satış cümlesi kararın yerini alır."),
        p("Conforcus, üçünü de ‘doğru’ ilan etmez. Doğru, sizin kapanışınızın ve denetçinizin yaşayacağı yerdir. Ücretsiz analiz, o yeri işaretlemek içindir."),
      ],
      en: [
        p("SAP’s product and contract names sit on the table as if they were methods. RISE with SAP, GROW with SAP, on-premise S/4. All three can reach S/4HANA; all three can pair with greenfield or brownfield. Mix them and ‘we are going to the cloud’ swallows every decision. This article unsallows that sentence. It is not a price list."),
        h("GROW: will you actually live in the standard?"),
        p("GROW promises mid-market and standard process. Keeping the promise means cutting Z-appetite. If close hangs on three Z-reports, saying ‘we will fit GROW’ means not fitting at go-live. If you will fit, you live with packages and Fiori. If you will not, you look for another contract — that is honesty, not shame."),
        h("RISE: who runs it?"),
        p("RISE moves infrastructure and several operating layers onto an SAP contract. That is not a method; it is an operating model. You still choose greenfield or brownfield. You still lay the localization rail. What changes is who owns patching, the system, the upgrade calendar. Data residency and extra duties are read in the contract; they are not waved through as ‘cloud’ on a slide."),
        h("On-premise: control and its cost"),
        p("Your data centre or hosting partner leaves add-ons and the upgrade calendar with you. The cost is operating maturity. Without AMS, on-premise is not freedom; it is solitude. Freedom means a team that can fill a patch window."),
        h("How to choose"),
        p("Three questions: can we live in the standard, where must data sit, who should own upgrades. The answers multiply by method (greenfield/brownfield). The product is not one tick-box on a slide. A workshop talks add-ons, GİB, close and authorization. If it does not, a sales sentence replaces the decision."),
        p("We do not crown all three as ‘right’. Right is where your close and your auditor will live. The free analysis is to point at that place."),
      ],
    },
  },
];
