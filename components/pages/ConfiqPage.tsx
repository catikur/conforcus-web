import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import { lineBreak } from "@/lib/lineBreak";
import { ConfiqArchitecture } from "@/components/Diagrams";
import MediaSlot from "@/components/MediaSlot";
import YouTube from "@/components/YouTube";
import { getSiteMedia } from "@/lib/siteSettings";
import FaqList, { localizedFaqs, type Faq } from "@/components/FaqList";
import { FaqJsonLd } from "@/components/JsonLd";

const CONFIQ_FAQS: Faq[] = [
  {
    q: { tr: "Confiq hangi SAP sürümlerinde çalışır?", en: "Which SAP versions does Confiq run on?" },
    a: {
      tr: "Confiq ürünleri hem S/4HANA hem de SAP ECC üzerinde çalışır. S/4HANA'da gerçek zamanlı analitik ve Fiori tabanlı arayüz gibi ek yetenekler devreye girer; ECC'de klasik tablolar üzerinden çalışır.",
      en: "Confiq products run on both S/4HANA and SAP ECC. On S/4HANA additional capabilities such as real-time analytics and a Fiori-based interface come into play; on ECC it works on the classic tables.",
    },
  },
  {
    q: { tr: "Decode ile Predict arasındaki fark nedir?", en: "What is the difference between Decode and Predict?" },
    a: {
      tr: "Decode bugünü ve geçmişi anlatır: doğal dilde sorduğunuz soruyu SAP verisinden yanıtlar. Predict geleceğe bakar: geçmiş SAP verisi üzerine kurulan modellerle nakit, satış ve kârlılık için tahmin üretir. Cortex ikisini birleştirir ve öngörülen bir sapmanın nedenini aynı ekranda gösterir.",
      en: "Decode describes today and the past: it answers the question you ask in plain language from SAP data. Predict looks ahead: it produces forecasts for cash, sales and profitability with models built on historical SAP data. Cortex combines the two and shows the reason behind a forecast deviation on the same screen.",
    },
  },
  {
    q: { tr: "Confiq'e nereden başlanır?", en: "Where do you start with Confiq?" },
    a: {
      tr: "Ücretsiz analizle. Önce birkaç soruyla durumunuzu anlıyoruz ve 48 saat içinde yazılı bir uzman notu gönderiyoruz. Sistem erişimi gerektiren derin tarama ve ardından Decode ya da Predict, bu ilk adımın sonucuna göre konuşulur.",
      en: "With the free analysis. We first understand your situation through a few questions and send a written expert note within 48 hours. A deep scan that requires system access, and then Decode or Predict, are discussed based on the outcome of that first step.",
    },
  },
  {
    q: { tr: "Confiq danışmanlık hizmetinin yerini mi alıyor?", en: "Does Confiq replace consulting?" },
    a: {
      tr: "Hayır, tamamlıyor. Tarama bulguları çoğu zaman bir iyileştirme çalışmasına ya da destek hizmetine bağlanır; Confiq de düzgün veri ve süreç üzerinde daha iyi sonuç verir. Danışmanlarımız SAP verisini sorgularken Decode'u kendileri de kullanıyor.",
      en: "No, it complements it. Scan findings usually lead to an improvement engagement or to support services, and Confiq delivers better results on clean data and processes. Our own consultants use Decode when they query SAP data.",
    },
  },
];

export default async function ConfiqPage({ locale }: { locale: Locale }) {
  const media = await getSiteMedia(locale);
  return (
    <main data-page="confiq" className="active" id="main" tabIndex={-1}>
      <FaqJsonLd faqs={localizedFaqs(locale, CONFIQ_FAQS)} />
      <section className="confiq" style={{ padding: "80px 0" }}>
        <div className="wrap">
          <ConfiqArchitecture locale={locale} />
          <div className="mediarow">
            <MediaSlot
              src={media.confiqShotUrl}
              alt={media.confiqShotAlt}
              field="siteSettings.confiqShot"
              locale={locale}
              label={{ tr: "Confiq arayüz görüntüsü", en: "Confiq interface screenshot" }}
              ratio="16 / 10"
            />
            <YouTube url={media.confiqVideoUrl} locale={locale} title={pick(locale, "Confiq demo", "Confiq demo")} />
          </div>
          <div className="eyebrow">{pick(locale, "Yapay Zekâ Ürün Ailesi", "AI Product Family")}</div>
          {/* Sayfanın tek H1'i (SEO başlık hiyerarşisi) — görünüm prototipteki büyük başlıkla aynı */}
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)" }}>
            {pick(
              locale,
              lineBreak("SAP veriniz konuşabilseydi,", <span className="grad">ona ne sorardınız?</span>),
              lineBreak("If your SAP data could talk,", <span className="grad">what would you ask?</span>)
            )}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Confiq, 20 yılı aşkın SAP danışmanlık deneyimimizin yazılıma dönüşmüş hali: SAP'ınıza doğal dilde soru sorun, geleceği bugünden görün, modüller arası akışları otomatikleştirin.",
              "Confiq is our SAP consulting expertise turned into software: ask your SAP questions in plain language, see the future today, automate cross-module flows."
            )}
          </p>

          <div className="prods" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 44 }}>
            <div className="prod">
              <b>Confiq Decode</b>
              <span>
                {pick(
                  locale,
                  'SAP\'a doğal dilde sorun: "Bu ay en çok geciken müşteri kim?" Saniyeler içinde, tablo ve grafiklerle yanıt alın. SAP ekranlarında kaybolmak yok.',
                  'Ask SAP in plain language: "Which customer is most overdue this month?" Get answers in seconds, with tables and charts. No more getting lost in SAP screens.'
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Predict</b>
              <span>
                {pick(
                  locale,
                  "Nakit akışından tahsilat riskine, finansal göstergelerinizde 3-6 ay sonrasını bugünden görün. Sürprizlerle değil, senaryolarla yönetin.",
                  "From cash flow to collection risk, see 3-6 months ahead in your financial indicators. Manage with scenarios, not surprises."
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Cortex</b>
              <span>
                {pick(
                  locale,
                  'Decode\'un yanıtlarıyla Predict\'in öngörülerini birleştiren karar zekâsı katmanı: "Ne oldu?" ve "Ne olacak?" sorularını tek ekranda buluşturur.',
                  'The decision intelligence layer uniting Decode\'s answers with Predict\'s foresight: "what happened" and "what\'s next" on a single screen.'
                )}
              </span>
            </div>
            <div className="prod">
              <b>Confiq Bridge</b>
              <span>
                {pick(
                  locale,
                  "Modüller ve sistemler arasında akıllı veri akışı: manuel aktarımları, mutabakatsızlıkları ve tekrar eden işleri ortadan kaldırır.",
                  "Smart data flow between modules and systems: eliminates manual transfers, mismatches and repetitive work."
                )}
              </span>
            </div>
            <div className="prod free" style={{ gridColumn: "1/-1" }}>
              <b>
                Confiq Scan
                <span className="pill">{pick(locale, "ÜCRETSİZ", "FREE")}</span>
              </b>
              <span>
                {pick(
                  locale,
                  "SAP sisteminizin kapsamlı analizi: veri kalitesi, süreç verimliliği ve risk haritanız 48 saat içinde elinizde. Confiq yolculuğunun ücretsiz ilk adımı.",
                  "A comprehensive analysis of your SAP system: data quality, process efficiency and your risk map within 48 hours. The free first step of the Confiq journey."
                )}
              </span>
            </div>
          </div>

          <div className="cycle">
            <div className="cyc">
              <b>{pick(locale, "1 · Tara", "1 · Scan")}</b>
              <h2 className="cyc-h">{pick(locale, "Ücretsiz analizle başlayın", "Start with a free analysis")}</h2>
              <p>
                {pick(
                  locale,
                  "Confiq Scan sisteminizin fotoğrafını çeker: nerede zaman, nerede para kaybediyorsunuz?",
                  "Confiq Scan photographs your system: where are you losing time and money?"
                )}
              </p>
            </div>
            <div className="cyc">
              <b>{pick(locale, "2 · İyileştir", "2 · Improve")}</b>
              <h2 className="cyc-h">{pick(locale, "Uzman ekiple güçlendirin", "Strengthen with expert teams")}</h2>
              <p>
                {pick(
                  locale,
                  "Bulgulara göre danışman ekiplerimiz süreçlerinizi ve sisteminizi iyileştirir.",
                  "Based on the findings, our consultants improve your processes and your system."
                )}
              </p>
            </div>
            <div className="cyc">
              <b>{pick(locale, "3 · Dönüştür", "3 · Transform")}</b>
              <h2 className="cyc-h">{pick(locale, "Confiq ile geleceğe geçin", "Step into the future with Confiq")}</h2>
              <p>
                {pick(
                  locale,
                  "Decode, Predict ve Bridge ile SAP'ınız artık konuşan, öngören bir sisteme dönüşür.",
                  "With Decode, Predict and Bridge, your SAP becomes a system that talks and foresees."
                )}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="btn btn-b" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz Scan ile Başlayın", "Start with a Free Scan")}
            </Link>
            <a className="btn btn-g" style={{ color: "#fff", borderColor: "rgba(255,255,255,.3)" }} href="#" data-toast="confiq">
              {pick(locale, "Detaylar: confiq.ai →", "Details: confiq.ai →")}
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          <div className="eyebrow">{pick(locale, "Yakından", "A closer look")}</div>
          <h2>{pick(locale, "Beş ürün ne yapar?", "What do the five products do?")}</h2>
          <p>
            {pick(
              locale,
              "Confiq iki motor üzerine kurulu: SAP verisine doğal dille erişim sağlayan Decode ve geleceğe dönük tahmin üreten Predict. Cortex bu iki motoru birlikte çalıştırır, Bridge aralarındaki veri akışını sağlar, Scan ise başlangıç noktasıdır. Her ürün tek başına kullanılabilir; birlikte çalıştıklarında birbirini besler.",
              "Confiq is built on two engines: Decode, which gives natural-language access to SAP data, and Predict, which produces forward-looking forecasts. Cortex runs the two engines together, Bridge carries the data between them and Scan is the starting point. Each product can be used on its own; together they feed one another."
            )}
          </p>

          <h3>Confiq Decode</h3>
          <p>
            {pick(
              locale,
              "Kullanıcı sorusunu Türkçe ya da İngilizce yazar. Decode soruyu anlar, cevabın hangi SAP tablolarında ve alanlarında olduğunu belirler, sorguyu çalıştırır ve sonucu iş diliyle, tablo ve grafik olarak sunar. Üç kapsamda gelir: tüm modülleri kapsayan SAP (FI, CO, MM, SD, PP, PS, TRM, CM), finans odaklı Finance (FI, CO, TRM, CM) ve tedarik odaklı Supply (MM, SD, PP).",
              "The user types a question in Turkish or English. Decode understands it, works out which SAP tables and fields hold the answer, runs the query and presents the result in business language, as tables and charts. It comes in three scopes: SAP for all modules (FI, CO, MM, SD, PP, PS, TRM, CM), Finance (FI, CO, TRM, CM) and Supply (MM, SD, PP)."
            )}
          </p>
          <ul className="sx-list" style={{ maxWidth: "72ch", marginBottom: 20 }}>
            <li>{pick(locale, "“Geçen ay hangi malzemeler kritik stok seviyesinin altına düştü?”", "“Which materials fell below critical stock level last month?”")}</li>
            <li>{pick(locale, "“Hangi masraf yerleri bütçeyi aştı?”", "“Which cost centres exceeded their budget?”")}</li>
            <li>{pick(locale, "“Hangi tedarikçinin teslimat performansı düşüyor?”", "“Which supplier's delivery performance is declining?”")}</li>
          </ul>

          <h3>Confiq Predict</h3>
          <p>
            {pick(
              locale,
              "Predict, geçmiş SAP verisi üzerine kurulan makine öğrenmesi modelleriyle tahmin ve optimizasyon yapar. Cash kapsamı nakit akışını tahmin eder ve ödeme-tahsilat stratejisine yardımcı olur; Sales satış tahmini, talep planlama ve mevsimsellik için kullanılır; Margin ise kârlılığı fiyat, hacim ve ürün karması açısından çözümler.",
              "Predict performs forecasting and optimisation with machine-learning models built on historical SAP data. The Cash scope forecasts cash flow and supports payment and collection strategy; Sales is used for sales forecasting, demand planning and seasonality; Margin breaks profitability down by price, volume and mix."
            )}
          </p>

          <h3>Confiq Cortex</h3>
          <p>
            {pick(
              locale,
              "Cortex, Decode ile Predict birlikte çalıştığında devreye giren katmandır. Predict bir sapma öngördüğünde Cortex bunu Decode'un sağladığı bağlamla birleştirir ve kök nedeni gösterir; yalnız uyarmakla kalmaz, atılabilecek adımı da önerir. Yönetim ekibi tahmini ve arkasındaki ayrıntıyı tek ekranda görür. Çalışması için en az bir Decode ve bir Predict kapsamının etkin olması gerekir.",
              "Cortex is the layer that comes into play when Decode and Predict work together. When Predict foresees a deviation, Cortex combines it with the context Decode provides and shows the root cause; it does not only alert, it also suggests the step that could be taken. Management sees the forecast and the detail behind it on one screen. It requires at least one Decode scope and one Predict scope to be active."
            )}
          </p>

          <h3>Confiq Bridge</h3>
          <p>
            {pick(
              locale,
              "Bridge bir bağlayıcıdır: Confiq ürünleri ve SAP modülleri arasında veriyi taşır, ama yorumlamaz. Elle yapılan aktarımların ve bunlardan doğan uyuşmazlıkların yerini alır.",
              "Bridge is a connector: it carries data between Confiq products and SAP modules, but does not interpret it. It replaces manual transfers and the mismatches they cause."
            )}
          </p>

          <h3>Confiq Scan</h3>
          <p>
            {pick(
              locale,
              "Scan, SAP sisteminin durumunu dört alanda inceler ve bulguları önceliklendirir. Her bulgu için somut bir iyileştirme önerisi verilir.",
              "Scan examines the state of the SAP system in four areas and prioritises the findings. Each finding comes with a concrete improvement recommendation."
            )}
          </p>
          <ul className="sx-list ok" style={{ maxWidth: "72ch", marginBottom: 20 }}>
            <li>
              {pick(
                locale,
                "Ana veri kalitesi: mükerrer kayıtlar, eksik zorunlu alanlar, tutarsız kodlamalar, kullanılmayan kayıtlar.",
                "Master data quality: duplicate records, missing mandatory fields, inconsistent coding, unused records."
              )}
            </li>
            <li>
              {pick(
                locale,
                "İşlem verisi kalitesi: açık belgeler, tamamlanmamış işlemler, eski açık kalemler, dönem kapama uyumsuzlukları.",
                "Transaction data quality: open documents, incomplete transactions, old open items, period-close inconsistencies."
              )}
            </li>
            <li>
              {pick(
                locale,
                "Süreç sağlığı: onay gecikmeleri, iş akışı darboğazları, elle müdahale gerektiren adımlar, otomasyon fırsatları.",
                "Process health: approval delays, workflow bottlenecks, steps that need manual intervention, automation opportunities."
              )}
            </li>
            <li>
              {pick(
                locale,
                "Geliştirme ve uyarlama: özel program kalitesi, kullanılmayan geliştirmeler, yetki tutarsızlıkları, S/4HANA uyumluluğu.",
                "Development and customisation: custom program quality, unused developments, authorisation inconsistencies, S/4HANA readiness."
              )}
            </li>
          </ul>

          <FaqList locale={locale} faqs={CONFIQ_FAQS} />
          <div style={{ marginTop: 32 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Ücretsiz analizle başlayın", "Start with the free analysis")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
