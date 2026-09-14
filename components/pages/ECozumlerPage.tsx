import Link from "next/link";
import FaqList, { localizedFaqs, type Faq } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";
import { getSolutions } from "@/lib/solutions";
import { getReferences } from "@/lib/references";
import { LogoWall } from "@/components/LogoWall";
import { pathFor, pick, type Locale } from "@/lib/i18n";

/* E-Çözümler hub'ı — GİB e-dönüşüm belgeleri + elektronik finans süreçleri.
   Çözüm kartları Sanity'den (module = E); mevzuat özeti kod içinde ve tarihlidir:
   kaynak VUK 509 / 573 Sıra No.lu Genel Tebliğler — güncelleme gerekirse burası. */

const FAQS: Faq[] = [
  {
    q: { tr: "E-çözümler için ayrı bir entegratör lisansı gerekir mi?", en: "Do I need a separate integrator licence for the e-solutions?" },
    a: {
      tr: "Evet, GİB'e belge iletimi için bir özel entegratör ya da GİB portal yöntemi gerekir; çözümlerimiz entegratör bağımsızdır. SAP tarafındaki dönüşüm, kontrol ve yanıt işleme katmanı bizde kalır, iletim katmanı mevcut ya da seçeceğiniz entegratörle konuşur. Entegratör değiştiğinde SAP süreci değişmez.",
      en: "Yes — transmission to GİB requires a certified integrator or the GİB portal method; our solutions are integrator-independent. The conversion, validation and response-handling layer stays on the SAP side, and the transmission layer talks to your existing or chosen integrator. Changing integrator does not change the SAP process.",
    },
  },
  {
    q: { tr: "SAP ECC üzerinde de çalışır mı, yoksa S/4HANA şart mı?", en: "Does it run on SAP ECC or is S/4HANA required?" },
    a: {
      tr: "Her iki ortamda da çalışır. Paketler ECC 6.0 ve S/4HANA'da aynı süreç mantığıyla kurulur; S/4HANA'ya geçişte e-dönüşüm kurgusu yeniden yazılmaz, taşınır. Fiori tabanlı izleme ekranları S/4HANA'da, klasik ekranlar ECC'de kullanılır.",
      en: "Both. The packages are installed on ECC 6.0 and S/4HANA with the same process logic; on a move to S/4HANA the e-transformation setup is migrated, not rewritten. Fiori-based monitoring screens are used on S/4HANA, classic screens on ECC.",
    },
  },
  {
    q: { tr: "Mevzuat değiştiğinde ne olur?", en: "What happens when regulation changes?" },
    a: {
      tr: "GİB şema, senaryo ve takvim değişiklikleri paket seviyesinde uygulanır ve AMS kapsamında müşterilerimize dağıtılır. Örneğin UBL-TR sürüm geçişleri ya da e-Defter berat takvimi değişiklikleri tek tek şirketlerde değil, paket güncellemesiyle tüm müşterilerde aynı anda yapılır.",
      en: "GİB schema, scenario and calendar changes are applied at package level and distributed to our clients under AMS. UBL-TR version transitions or e-Ledger certificate calendar changes, for example, are rolled out to every client through a package update rather than company by company.",
    },
  },
  {
    q: { tr: "Birden çok şirket kodu ve mükellef için tek kurulum yeterli mi?", en: "Is one installation enough for multiple company codes and taxpayers?" },
    a: {
      tr: "Evet. Kurulum şirket kodu bazında parametrelenir: her şirketin kendi VKN'si, senaryosu, entegratör hesabı ve numara aralığı vardır, süreç ortaktır. Rönesans Holding'de 200'den fazla şirket kodu bu yapıyla yönetilmektedir.",
      en: "Yes. The installation is parameterised per company code: each company has its own tax number, scenario, integrator account and number range while the process is shared. Rönesans Holding manages more than 200 company codes on this structure.",
    },
  },
  {
    q: { tr: "Hangi belgeyle başlamalıyız?", en: "Which document should we start with?" },
    a: {
      tr: "Yasal takvimin dayattığı belgeyle: çoğu şirket için bu e-Fatura ve e-Arşiv'dir, ardından e-Defter gelir. Zorunluluk kapsamında değilseniz en çok elle iş yaratan süreçten — genellikle e-Mutabakat ya da elektronik banka ekstresi — başlamak en hızlı geri dönüşü verir. Ücretsiz analizde mevcut yapınıza göre sıralama öneriyoruz.",
      en: "With the document the legal calendar imposes: for most companies that is e-Invoice and e-Archive, followed by e-Ledger. If you are outside the mandate, starting with the process that creates the most manual work — usually e-Reconciliation or the electronic bank statement — gives the fastest return. In the free analysis we propose an order based on your current landscape.",
    },
  },
];

export default async function ECozumlerPage({ locale }: { locale: Locale }) {
  const [all, refs] = await Promise.all([getSolutions(locale), getReferences(locale)]);
  const sols = all.filter((s) => s.module === "E");
  const catalogBase = pathFor("cozumler", locale);
  const analiz = pathFor("analiz", locale);
  const refsBase = pathFor("referanslar", locale);
  const locFaqs = localizedFaqs(locale, FAQS);
  // Vitrin: e-dönüşüm ölçeğini taşıyan referanslar (logolu ilk 6)
  const wall = refs.filter((r) => r.logoUrl).slice(0, 6);

  return (
    <main data-page="e-cozumler" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={locFaqs} />
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "E-Dönüşüm", "E-Transformation")}</div>
          <h1>{pick(locale, "E-çözümler: SAP içinde uçtan uca e-dönüşüm", "E-solutions: end-to-end e-transformation inside SAP")}</h1>
          <p className="lead">
            {pick(
              locale,
              "e-Fatura'dan e-Envanter'e sekiz yasal belge ve elektronik finans süreci, SAP belgesinden GİB'e ve geri dönen yanıta kadar tek akışta. Entegratör bağımsız, mevzuat değiştikçe paket seviyesinde güncellenen kurgular.",
              "Eight statutory documents and electronic finance processes, from e-Invoice to e-Inventory, in one flow from the SAP document to GİB and back. Integrator-independent, updated at package level as regulation changes."
            )}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <Link className="btn btn-b" href={analiz}>
              {pick(locale, "E-dönüşüm hazırlık analizi", "E-transformation readiness check")}
            </Link>
            <Link className="btn btn-g" href={`${catalogBase}#e-cozumler`}>
              {pick(locale, "Katalogda gör", "View in catalogue")}
            </Link>
          </div>
        </div>
      </div>

      <section className="esec" style={{ borderTop: 0 }}>
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Sekiz çözüm", "Eight solutions")}</div>
          <h2>{pick(locale, "Belge belge, süreç süreç", "Document by document, process by process")}</h2>
          <div className="pgrid">
            {sols.map((s) => (
              <Link className="pcard" href={`${catalogBase}/${s.slug}`} key={s.slug}>
                <span className="mod m-E">E-ÇÖZÜM</span>
                <h3>{s.name}</h3>
                {s.short ? <p>{s.short}</p> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ecal">
        <div className="wrap ecal-in">
          <div>
            <div className="eyebrow">{pick(locale, "Kim, ne zaman?", "Who, and when?")}</div>
            <h2>{pick(locale, "2026 yükümlülük takvimi", "2026 obligations calendar")}</h2>
            <p className="lead">
              {pick(
                locale,
                "VUK 509 ve 573 Sıra No.lu Genel Tebliğlere göre öne çıkan başlıklar. Eşikler ve tarihler tebliğle değişebilir; kendi durumunuzu mali müşavirinizle doğrulayın.",
                "Headline points under VUK General Communiqués No. 509 and 573. Thresholds and dates change with new communiqués; confirm your own position with your tax advisor."
              )}
            </p>
          </div>
          <dl className="ecal-list">
            <div>
              <dt>{pick(locale, "1 Ocak 2026", "1 January 2026")}</dt>
              <dd>
                {pick(
                  locale,
                  "Bilanço esasına göre defter tutan birinci sınıf tüccarlar, alıcı kim olursa olsun ve tutar sınırı olmaksızın e-Arşiv Fatura düzenler. Kâğıt fatura bu grup için fiilen sona erer.",
                  "First-class merchants keeping books on a balance-sheet basis issue e-Archive invoices regardless of buyer and without an amount limit. Paper invoices effectively end for this group."
                )}
              </dd>
            </div>
            <div>
              <dt>{pick(locale, "1 Temmuz 2026", "1 July 2026")}</dt>
              <dd>
                {pick(
                  locale,
                  "2025 hesap döneminde brüt satış hasılatı 3 milyon TL ve üzeri olan mükellefler e-Fatura ve e-Arşiv Fatura uygulamasına geçer.",
                  "Taxpayers with 2025 gross sales revenue of TRY 3 million or more move to e-Invoice and e-Archive."
                )}
              </dd>
            </div>
            <div>
              <dt>{pick(locale, "500 bin TL eşiği", "TRY 500k threshold")}</dt>
              <dd>
                {pick(
                  locale,
                  "e-Ticaret, gayrimenkul ve motorlu taşıt alım-satım/kiralama/aracılık ile internet reklam aracılığı faaliyetlerinde 500 bin TL ve üzeri hasılat, sektörden bağımsız eşiği beklemeden e-Fatura yükümlülüğü doğurur.",
                  "In e-commerce, real estate and motor vehicle trading/leasing/brokerage and internet advertising intermediation, revenue of TRY 500k or more triggers the e-Invoice mandate without waiting for the general threshold."
                )}
              </dd>
            </div>
            <div>
              <dt>{pick(locale, "e-Defter beratları", "e-Ledger certificates")}</dt>
              <dd>
                {pick(
                  locale,
                  "Berat yükleme tercihi aylık ya da geçici vergi dönemi bazlıdır ve yıl başında bildirilir; tercih yıl içinde değiştirilemez. Geç yüklemede özel usulsüzlük cezası uygulanır — takvim, kapanış rutininin parçası olmalıdır.",
                  "Certificates are uploaded monthly or per advance-tax period, declared at the start of the year and fixed for the year. Late uploads carry a special irregularity penalty — the calendar has to be part of the close routine."
                )}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="ehow">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Nasıl çalışır", "How it works")}</div>
          <h2>{pick(locale, "SAP belgesinden GİB'e, yanıttan belgeye", "From SAP document to GİB, from response back to document")}</h2>
          <ol className="ehow-steps">
            <li>
              <b>{pick(locale, "Belge SAP'ta doğar", "The document is born in SAP")}</b>
              <p>{pick(locale, "Fatura, irsaliye, defter ya da mutabakat kaydı standart SAP belgesi olarak oluşur; kullanıcı yeni bir ekran öğrenmez.", "The invoice, delivery note, ledger or reconciliation record is created as a standard SAP document; users learn no new screen.")}</p>
            </li>
            <li>
              <b>{pick(locale, "Dönüşüm ve kontrol", "Conversion and validation")}</b>
              <p>{pick(locale, "UBL-TR / XBRL üretimi, mükellef sorgusu, senaryo seçimi ve GİB şema kontrolleri belge kaydedilirken çalışır; hata GİB'e gitmeden yakalanır.", "UBL-TR / XBRL generation, taxpayer lookup, scenario selection and GİB schema checks run as the document is posted; errors are caught before they reach GİB.")}</p>
            </li>
            <li>
              <b>{pick(locale, "İletim", "Transmission")}</b>
              <p>{pick(locale, "Belge, entegratör bağımsız iletim katmanıyla GİB'e gider. Entegratör değişse de SAP süreci aynı kalır.", "The document goes to GİB through an integrator-independent transmission layer. If the integrator changes, the SAP process stays the same.")}</p>
            </li>
            <li>
              <b>{pick(locale, "Yanıt belgeye yazılır", "The response is written back")}</b>
              <p>{pick(locale, "Kabul, ret, berat onayı ya da mutabakat cevabı SAP belgesine işlenir; durum tek ekrandan izlenir, istisnalar listeye düşer.", "Acceptance, rejection, certificate confirmation or reconciliation reply is written to the SAP document; status is tracked on one screen and exceptions drop into a list.")}</p>
            </li>
          </ol>
        </div>
      </section>

      {wall.length ? (
        <section className="refs" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="eyebrow">{pick(locale, "Ölçek", "Scale")}</div>
            <h2>{pick(locale, "Bu süreçleri her gün taşıyan ekipler", "Teams that run these processes every day")}</h2>
            <p className="lead">
              {pick(
                locale,
                "Rönesans Holding'de 200'den fazla şirket kodunda e-fatura, e-defter ve e-mutabakat aynı SAP yapısı üzerinde yürüyor; finansal modüllerin tamamında SLA'lı destekle birlikte.",
                "At Rönesans Holding, e-invoice, e-ledger and e-reconciliation run on the same SAP landscape across more than 200 company codes, together with SLA-based support on the full set of financial modules."
              )}{" "}
              <Link href={`${refsBase}/ronesans-holding`}>{pick(locale, "Vakayı okuyun →", "Read the case →")}</Link>
            </p>
            <LogoWall items={wall} base={refsBase} cols={6} compact />
          </div>
        </section>
      ) : null}

      <FaqList locale={locale} faqs={FAQS} title={pick(locale, "E-dönüşüm hakkında sık sorulanlar", "E-transformation FAQ")} />

      <section className="cta-mid" style={{ padding: "0 0 80px" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="lead" style={{ margin: "0 auto 18px" }}>
            {pick(locale, "Hangi belgede, hangi takvimde olduğunuzu birlikte çıkaralım.", "Let's map which document you are in, and on which calendar.")}
          </p>
          <Link className="btn btn-b" href={analiz}>
            {pick(locale, "Ücretsiz e-dönüşüm analizi", "Free e-transformation analysis")}
          </Link>
        </div>
      </section>
    </main>
  );
}
