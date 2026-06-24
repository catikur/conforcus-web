// Veri dizileri — conforcus_site_v13.html prototipinden birebir taşındı.
// Tasarımın tek doğru kaynağı prototiptir; metinler/diziler buradan değiştirilir.

export type Lang = "tr" | "en";

/* ---------- Çözüm kataloğu (48+) ---------- */
export type Solution = { m: string; tr: string; en: string };
export const SOLUTIONS: Solution[] = [
  { m: "FI", tr: "Müşteri Satıcı E-Mutabakat", en: "Customer & Vendor e-Reconciliation" },
  { m: "FI", tr: "KKEG Geliştirmeleri", en: "Non-Deductible Expense (KKEG) Solutions" },
  { m: "FI", tr: "Otomatik Denkleştirme Süreçleri", en: "Automated Clearing Processes" },
  { m: "FI", tr: "E-Ödeme Banka-E-imza entegrasyonları", en: "e-Payment, Bank & e-Signature Integrations" },
  { m: "FI", tr: "Dönemselleştirme MM-FI otomatik kart yaratma ve yönetme süreçleri", en: "Accrual Periodization with Automated MM-FI Master Data" },
  { m: "FI", tr: "DBS banka entegrasyonu", en: "Direct Debit System (DBS) Bank Integration" },
  { m: "FI", tr: "Ortalama Vade Raporları", en: "Average Maturity Reports" },
  { m: "FI", tr: "Müşteri-Satıcı Yaşlandırma Raporları", en: "Customer & Vendor Aging Reports" },
  { m: "FI", tr: "Yürüyen Bakiyeli Mizanı", en: "Running-Balance Trial Balance" },
  { m: "FI", tr: "Seyahat Masraf Yönetimi", en: "Travel Expense Management" },
  { m: "FI", tr: "Duran varlık Zimmet Süreci", en: "Fixed Asset Custody & Assignment" },
  { m: "FI", tr: "Kur Farkı Raporu", en: "FX Difference Report" },
  { m: "FI", tr: "Enflasyon Muhasebesi", en: "Inflation Accounting" },
  { m: "FI", tr: "Tüm IFRS Süreçleri(Satışların peşine indirgenmesi, Sınıflama, Satın almanın Peşine indirgenmesi, Reeskont, NRV vb", en: "End-to-End IFRS Processes (Discounting, Reclassification, NRV…)" },
  { m: "FI", tr: "IFRS16 Paketi", en: "IFRS 16 Package" },
  { m: "FI", tr: "Müşteri İhtar ve Tahsilat süreci", en: "Dunning & Collections Process" },
  { m: "FI", tr: "Müşteri Kredi Yönetimi Süreci", en: "Customer Credit Management" },
  { m: "CO", tr: "Uçtan Uca Hakedis Paketi", en: "End-to-End Progress Billing Package" },
  { m: "CO", tr: "SMM Tablosu", en: "Cost of Goods Sold (COGS) Statement" },
  { m: "CO", tr: "Envanter Raporu(Toplu CKM3N)", en: "Inventory Report (Mass CKM3N)" },
  { m: "CO", tr: "Yüklenen KDV Raporu", en: "Input VAT Report" },
  { m: "CO", tr: "710 Fiilileştirme Programı", en: "Account 710 Actualization Program" },
  { m: "CO", tr: "Yansıtma Kaydı Programı", en: "Allocation Posting Program" },
  { m: "CO", tr: "MR22 Açılış ve Fiyat Farkı Programı", en: "MR22 Opening & Price Difference Program" },
  { m: "PS", tr: "Proje Planlama Paketi", en: "Project Planning Package" },
  { m: "PS", tr: "Bütçe Workflow Paketi", en: "Budget Workflow Package" },
  { m: "FM", tr: "Bütçe Onay Paketi", en: "Budget Approval Package" },
  { m: "MM", tr: "İthalat Süreci", en: "Import Management Process" },
  { m: "MM", tr: "Fatura Onay", en: "Invoice Approval Workflow" },
  { m: "MM", tr: "MM Belgelerinde tarihsel onay strateji kurgusu", en: "Historical Release Strategy for MM Documents" },
  { m: "MM", tr: "Teşvikli alımların yönetimi", en: "Incentivized Procurement Management" },
  { m: "MM", tr: "Parti aktif olmayan malzemelerde KDV iadesi", en: "VAT Refund for Non-Batch-Managed Materials" },
  { m: "MM", tr: "SAP içinde tutulan veriler ile Satın alma departmanı KPI raporları", en: "Procurement KPI Reports from SAP Data" },
  { m: "MM", tr: "Mal hareketleri öncesi rezervasyonların onaya tabi tutulması", en: "Reservation Approval before Goods Movements" },
  { m: "MM", tr: "Teklif Talepleri sonrası Teklif karşılaştırmasının onay süreci", en: "Quotation Comparison Approval Workflow" },
  { m: "MM", tr: "Avans Onay Süreci", en: "Advance Payment Approval" },
  { m: "MM", tr: "Mal Hareketleri Yetkilendirme Genişletmesi", en: "Extended Authorization for Goods Movements" },
  { m: "MM", tr: "Bilgi Kaydı üzerinden fiyat onay süreçleri", en: "Price Approval via Info Records" },
  { m: "MM", tr: "MM Onay Raporları", en: "MM Approval Reports" },
  { m: "SD", tr: "Sipariş Onay Süreci", en: "Sales Order Approval Workflow" },
  { m: "SD", tr: "Müşteri Yaratma-Değişiklik Onay Süreci", en: "Customer Master Create/Change Approval" },
  { m: "SD", tr: "Fiyat-Koşul Onay Süreci", en: "Pricing & Condition Approval" },
  { m: "SD", tr: "İhracat Süreci", en: "Export Management Process" },
  { m: "SD", tr: "Sigorta Süreci", en: "Cargo Insurance Process" },
  { m: "SD", tr: "Otomatik Faturalama Süreci", en: "Automated Billing Process" },
  { m: "SD", tr: "Doğrulanmış Brüt Ağırlık Entegrasyon Süreci", en: "Verified Gross Mass (VGM) Integration" },
  { m: "SD", tr: "Sipariş Kalemi Bazlı Ambalajlama Süreci", en: "Item-Level Packaging Process" },
  { m: "SD", tr: "Miktar Bazlı Teslimat Ayrıştırma Süreci", en: "Quantity-Based Delivery Split" },
];

/* SAP modülleri (katalog filtresi sırası) */
export const MODS = ["FI", "CO", "MM", "SD", "PS", "FM"] as const;

/* ---------- Referanslar ---------- */
export type Ref = { n: string; s: string; se: string };
export const REFS: Ref[] = [
  { n: "ABB Elektrik", s: "Robotik", se: "Robotics" },
  { n: "Aksa Jeneratör", s: "Elektrik-Elektronik", se: "Electrical & Electronics" },
  { n: "Arçelik Global", s: "Dayanıklı Tüketim ve Tüketici Elektroniği", se: "Consumer Durables & Electronics" },
  { n: "Borusan Birleşik Boru", s: "Boru Sanayi", se: "Pipe Manufacturing" },
  { n: "Coşkunöz Holding", s: "Otomotiv", se: "Automotive" },
  { n: "Çolakoğlu Metalurji", s: "Demir-Çelik", se: "Iron & Steel" },
  { n: "Evyap", s: "Hızlı Tüketim Malları", se: "FMCG" },
  { n: "Farmasi", s: "Kozmetik", se: "Cosmetics" },
  { n: "GDZ Elektrik", s: "Enerji", se: "Energy" },
  { n: "Hayat Kimya", s: "Kimya", se: "Chemicals" },
  { n: "Kalyon", s: "İnşaat", se: "Construction" },
  { n: "Milangaz", s: "Petrol ve Gaz Ürünleri", se: "Oil & Gas" },
  { n: "Nurol Holding ve Grup Şirketleri", s: "İnşaat", se: "Construction" },
  { n: "Otokar", s: "Otomotiv ve Savunma Sanayi", se: "Automotive & Defense" },
  { n: "Penti Çorap", s: "Tekstil", se: "Textiles" },
  { n: "Petrol Ofisi", s: "Petrol ve Gaz Ürünleri", se: "Oil & Gas" },
  { n: "Rönesans Holding", s: "Çoklu Sektör", se: "Multi-Industry" },
  { n: "Sark wire", s: "Elektrik-Elektronik", se: "Electrical & Electronics" },
  { n: "Şişecam", s: "Cam", se: "Glass" },
  { n: "TPAO", s: "Petrol ve Gaz Ürünleri", se: "Oil & Gas" },
  { n: "Yataş", s: "Mobilya", se: "Furniture" },
  { n: "Yorglass", s: "Cam", se: "Glass" },
  { n: "Zorlu Holding", s: "Çoklu Sektör", se: "Multi-Industry" },
];

/* ---------- Ana sayfa ürün örnekleri (fin / log sekmeleri) ---------- */
export type HomeProduct = {
  grp: "fin" | "log";
  m: string;
  tr: string;
  en: string;
  d_tr: string;
  d_en: string;
};
export const HOME_PRODUCTS: HomeProduct[] = [
  { grp: "fin", m: "FI", tr: "Müşteri Satıcı E-Mutabakat", en: "Customer & Vendor e-Reconciliation", d_tr: "Aylık mutabakat maratonunu tek tuşa indirin: gönderim, takip ve eşleştirme otomatik.", d_en: "Turn the monthly reconciliation marathon into one click: sending, tracking and matching, automated." },
  { grp: "fin", m: "FI", tr: "Enflasyon Muhasebesi", en: "Inflation Accounting", d_tr: "Mevzuata tam uyumlu enflasyon düzeltmesi, kapanışı geciktirmeden sistem içinde.", d_en: "Fully compliant inflation adjustment, inside the system, without delaying your close." },
  { grp: "fin", m: "FI", tr: "DBS Banka Entegrasyonu", en: "Direct Debit (DBS) Bank Integration", d_tr: "Bankalarla doğrudan borçlanma sistemi tam entegre; manuel tahsilat takibi tarihe karışır.", d_en: "Fully integrated direct debit with your banks — manual collection tracking becomes history." },
  { grp: "fin", m: "CO", tr: "Uçtan Uca Hakediş Paketi", en: "End-to-End Progress Billing Package", d_tr: "İnşaat ve proje şirketleri için hakediş sürecinin tamamı SAP içinde, onay akışıyla.", d_en: "The entire progress billing cycle for construction and project companies, inside SAP with approvals." },
  { grp: "fin", m: "PS", tr: "Bütçe Workflow Paketi", en: "Budget Workflow Package", d_tr: "Proje bütçeleri talepten onaya tek akışta; revizyonlar izlenebilir, limitler kontrol altında.", d_en: "Project budgets in one flow from request to approval; revisions traceable, limits under control." },
  { grp: "fin", m: "FM", tr: "Bütçe Onay Paketi", en: "Budget Approval Package", d_tr: "Bütçe kullanımında çok seviyeli onay: aşımlar daha gerçekleşmeden yakalanır.", d_en: "Multi-level approval for budget consumption: overruns are caught before they happen." },
  { grp: "log", m: "MM", tr: "İthalat Süreci", en: "Import Management Process", d_tr: "Siparişten gümrüğe ithalat dosyanız tek ekranda; masraf dağıtımı otomatik.", d_en: "From purchase order to customs, your import file on one screen — cost allocation automated." },
  { grp: "log", m: "MM", tr: "Fatura Onay", en: "Invoice Approval Workflow", d_tr: "Gelen faturalar dijital onay akışında; kayıp evrak yok, gecikme cezası yok.", d_en: "Incoming invoices in a digital approval flow; no lost documents, no late fees." },
  { grp: "log", m: "MM", tr: "Teklif Karşılaştırma Onayı", en: "Quotation Comparison Approval", d_tr: "Teklifleri SAP içinde yan yana karşılaştırın, onayı tek tıkla toplayın.", d_en: "Compare quotations side by side inside SAP and collect approvals in one click." },
  { grp: "log", m: "SD", tr: "Sipariş Onay Süreci", en: "Sales Order Approval Workflow", d_tr: "Riskli sipariş kural bazlı onaya takılır, temiz sipariş hız kazanır.", d_en: "Risky orders are caught by rule-based approval; clean orders move faster." },
  { grp: "log", m: "SD", tr: "Otomatik Faturalama Süreci", en: "Automated Billing Process", d_tr: "Teslimattan faturaya insan eli değmeden: hata oranı düşer, nakit akışı hızlanır.", d_en: "From delivery to invoice without manual touch: fewer errors, faster cash flow." },
  { grp: "log", m: "SD", tr: "İhracat Süreci", en: "Export Management Process", d_tr: "İhracat evrakları, sigorta ve VGM entegrasyonuyla uçtan uca tek akışta.", d_en: "Export documents, insurance and VGM integration in one end-to-end flow." },
];

/* ---------- Harita verileri ---------- */
export type CountryText = { tr: string; en: string };
export const COUNTRY_INFO: Record<string, CountryText> = {
  Türkiye: { tr: "Merkez · İstanbul", en: "Headquarters · Istanbul" },
  Almanya: { tr: "Rollout projeleri", en: "Rollout projects" },
  ABD: { tr: "Rollout projeleri", en: "Rollout projects" },
  İtalya: { tr: "Rollout projeleri", en: "Rollout projects" },
  Romanya: { tr: "Rollout projeleri", en: "Rollout projects" },
  Vietnam: { tr: "Rollout & lokalizasyon", en: "Rollout & localization" },
  Endonezya: { tr: "Rollout & lokalizasyon", en: "Rollout & localization" },
};
export const DEFAULT_INFO: CountryText = { tr: "SAP proje deneyimi", en: "SAP project experience" };

/* Çok parçalı ülke çizimlerinde merkez yardımcı koordinatları */
export const MAP_ANCHOR: Record<string, [number, number]> = {
  Rusya: [655, 115],
  ABD: [185, 200],
};

/* Sol alt ülke listesi (bölge grupları) */
export const MAP_REGIONS: [CountryText, string[]][] = [
  [{ tr: "Merkez", en: "HQ" }, ["Türkiye"]],
  [{ tr: "Amerika", en: "Americas" }, ["ABD", "Meksika", "Brezilya", "Arjantin", "Uruguay"]],
  [{ tr: "Avrupa", en: "Europe" }, ["Almanya", "Birleşik Krallık", "Fransa", "İtalya", "İspanya", "Hollanda", "Belçika", "İsviçre", "Avusturya", "İrlanda", "Polonya", "Romanya", "Bulgaristan", "Moldova", "Ukrayna", "Kıbrıs"]],
  [{ tr: "Orta Doğu & Afrika", en: "Middle East & Africa" }, ["Birleşik Arap Emirlikleri", "Katar", "İran", "Mısır", "Nijerya", "Kenya", "Güney Afrika"]],
  [{ tr: "Asya-Pasifik", en: "Asia-Pacific" }, ["Rusya", "Çin", "Kazakistan", "Özbekistan", "Pakistan", "Nepal", "Bangladeş", "Tayland", "Vietnam", "Kamboçya", "Malezya", "Singapur", "Endonezya", "Yeni Zelanda"]],
];

/* Ülke adlarının İngilizce karşılıkları (harita yalnızca GÖRÜNTÜLEMEDE kullanır;
   data-n anahtarı / COUNTRY_INFO anahtarları Türkçe kalır). */
export const COUNTRY_NAMES_EN: Record<string, string> = {
  Türkiye: "Türkiye",
  ABD: "United States",
  Meksika: "Mexico",
  Brezilya: "Brazil",
  Arjantin: "Argentina",
  Uruguay: "Uruguay",
  Almanya: "Germany",
  "Birleşik Krallık": "United Kingdom",
  Fransa: "France",
  İtalya: "Italy",
  İspanya: "Spain",
  Hollanda: "Netherlands",
  Belçika: "Belgium",
  İsviçre: "Switzerland",
  Avusturya: "Austria",
  İrlanda: "Ireland",
  Polonya: "Poland",
  Romanya: "Romania",
  Bulgaristan: "Bulgaria",
  Moldova: "Moldova",
  Ukrayna: "Ukraine",
  Kıbrıs: "Cyprus",
  "Birleşik Arap Emirlikleri": "United Arab Emirates",
  Katar: "Qatar",
  İran: "Iran",
  Mısır: "Egypt",
  Nijerya: "Nigeria",
  Kenya: "Kenya",
  "Güney Afrika": "South Africa",
  Rusya: "Russia",
  Çin: "China",
  Kazakistan: "Kazakhstan",
  Özbekistan: "Uzbekistan",
  Pakistan: "Pakistan",
  Nepal: "Nepal",
  Bangladeş: "Bangladesh",
  Tayland: "Thailand",
  Vietnam: "Vietnam",
  Kamboçya: "Cambodia",
  Malezya: "Malaysia",
  Singapur: "Singapore",
  Endonezya: "Indonesia",
  "Yeni Zelanda": "New Zealand",
};

/* ---------- Sayfa başlıkları (TR/EN) ---------- */
export const TITLES: Record<string, { tr: string; en: string }> = {
  home: { tr: "Conforcus — SAP Danışmanlığında Güvenilir Ortak", en: "Conforcus — Your Trusted SAP Partner" },
  hizmetler: { tr: "Hizmetler — Conforcus", en: "Services — Conforcus" },
  cozumler: { tr: "Çözüm Kataloğu — Conforcus", en: "Solution Catalog — Conforcus" },
  confiq: { tr: "Confiq AI Ürün Ailesi — Conforcus", en: "Confiq AI Product Family — Conforcus" },
  referanslar: { tr: "Referanslar — Conforcus", en: "References — Conforcus" },
  "conforcus-way": { tr: "Conforcus Way & Kariyer", en: "Conforcus Way & Careers" },
  blog: { tr: "Blog — Conforcus", en: "Blog — Conforcus" },
  analiz: { tr: "Ücretsiz SAP Analizi — Conforcus", en: "Free SAP Analysis — Conforcus" },
};

/* Rota yolu -> sayfa anahtarı (başlık ve aktif menü için) */
export const PATH_TO_KEY: Record<string, string> = {
  "/": "home",
  "/hizmetler": "hizmetler",
  "/cozumler": "cozumler",
  "/confiq": "confiq",
  "/referanslar": "referanslar",
  "/conforcus-way": "conforcus-way",
  "/blog": "blog",
  "/analiz": "analiz",
};
