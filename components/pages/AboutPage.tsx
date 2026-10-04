import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import MediaSlot from "@/components/MediaSlot";
import { getSiteMedia } from "@/lib/siteSettings";
import { getSolutions } from "@/lib/solutions";

// Hakkımızda — şirket olguları (kuruluş, ölçek, uzmanlık, vizyon). Rakamlar kurumsal
// sunumlarda kullanılan değerlerdir; değişirse buradan ve ana sayfadan birlikte güncellenir.
export default async function AboutPage({ locale }: { locale: Locale }) {
  const [media, sols] = await Promise.all([getSiteMedia(locale), getSolutions(locale)]);
  const solN = `${Math.max(sols.length, 48)}+`;
  const refs = pathFor("referanslar", locale);
  const L = (tr: string, en: string) => pick(locale, tr, en);

  const stats: [string, string][] = [
    ["2015", L("Kuruluş", "Founded")],
    ["130+", L("Müşteri", "Clients")],
    ["40+", L("Uçtan uca tamamlanan proje", "Full-cycle projects delivered")],
    ["50+", L("Ülke, 6 kıtada", "Countries on 6 continents")],
    ["70+", L("SAP danışmanı", "SAP consultants")],
    ["%95", L("Müşteri devamlılığı", "Client retention")],
  ];
  if (locale === "en") stats[5][0] = "95%";

  return (
    <main data-page="hakkimizda" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="eyebrow">{L("Şirket", "Company")}</div>
          <h1>{L("Hakkımızda", "About Conforcus")}</h1>
          <p className="lead">
            {L(
              "Conforcus, 2015'ten beri SAP'nin finans ve yönetim kontrolü modüllerinde derinleşen bir danışmanlık şirketi. Canlı sistemleri destekliyor, S/4HANA dönüşümlerini yürütüyor, şablonları ülke ülke yaygınlaştırıyor ve tekrarlayan işleri hazır çözüme çeviriyoruz.",
              "Conforcus is an SAP consultancy that has been building depth in the finance and management-control modules since 2015. We support live systems, run S/4HANA transformations, roll templates out country by country and turn repetitive work into ready-made solutions."
            )}
          </p>
        </div>
      </div>

      <section className="stats">
        <div className="wrap stats-in">
          {stats.map(([n, label]) => (
            <div className="stat" key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "36px 0 8px" }}>
        <div className="wrap">
          <MediaSlot
            src={media.officeImageUrl}
            alt={media.officeImageAlt}
            field="siteSettings.officeImage"
            locale={locale}
            label={{ tr: "Ofis fotoğrafı — Ataşehir, İstanbul", en: "Office photo — Ataşehir, Istanbul" }}
            ratio="21 / 9"
          />
        </div>
      </section>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          <h2>{L("Kimiz", "Who we are")}</h2>
          <p>
            {L(
              `${COMPANY.legalName}, 2015'te İstanbul'da kuruldu. Merkezimiz Ataşehir'de; Samsun'da ikinci bir ofisimiz var. Kurulduğumuz günden beri odağımız değişmedi: SAP'nin finansal ve yönetimsel kontrol tarafı. FI, CO, PS, FM, TRM ve CM modüllerinde butik bir uzmanlık kurduk; bu çekirdeği lojistikte MM ve SD, teknolojide ABAP, Fiori ve BTP, yapay zekâda ise kendi ürün ailemiz Confiq tamamlıyor.`,
              `${COMPANY.legalName} was founded in Istanbul in 2015. Our headquarters is in Ataşehir and we have a second office in Samsun. Our focus has not changed since day one: the financial and management-control side of SAP. We built boutique expertise in FI, CO, PS, FM, TRM and CM; that core is complemented by MM and SD in logistics, ABAP, Fiori and BTP in technology, and our own product family, Confiq, in AI.`
            )}
          </p>
          <p>
            {L(
              "Bugün 70'ten fazla danışmanla çalışıyoruz; ekibin yarısından fazlası SAP'de 10 yılı aşkın deneyime sahip. 130'dan fazla müşteriye hizmet verdik, 40'tan fazla uçtan uca projeyi tamamladık ve 6 kıtada 50'den fazla ülkede rollout deneyimi biriktirdik. Müşterilerimizin %95'i bizimle çalışmaya devam ediyor.",
              "Today we work with more than 70 consultants; over half of the team has more than ten years of SAP experience. We have served more than 130 clients, completed more than 40 full-cycle projects and built rollout experience in more than 50 countries across 6 continents. 95% of our clients continue working with us."
            )}
          </p>

          <h2>{L("Ne iş yaparız", "What we do")}</h2>
          <ul className="sx-list ok" style={{ maxWidth: "72ch" }}>
            <li>
              <Link href={pathFor("hizmet-sap-ams", locale)}>{L("SAP Destek Hizmetleri (AMS)", "SAP Support Services (AMS)")}</Link>
              {L(
                ": canlı sistemin SLA'lı bakımı, hata çözümü, mevzuat uyarlaması ve sürekli iyileştirmesi.",
                ": SLA-based maintenance of the live system, incident resolution, regulatory adaptation and continuous improvement."
              )}
            </li>
            <li>
              <Link href={pathFor("hizmet-s4hana", locale)}>{L("S/4HANA Dönüşümleri", "S/4HANA Transformations")}</Link>
              {L(
                ": greenfield, brownfield, RISE with SAP ve on-premise senaryolarında, finans tarafı ağırlıklı dönüşüm.",
                ": finance-led transformation across greenfield, brownfield, RISE with SAP and on-premise scenarios."
              )}
            </li>
            <li>
              <Link href={pathFor("hizmet-rollout", locale)}>Global Rollout</Link>
              {L(
                ": kurumsal şablonun yerel vergi ve raporlama gereklilikleriyle birlikte ülke ülke devreye alınması.",
                ": taking a corporate template live country by country, together with local tax and reporting requirements."
              )}
            </li>
            <li>
              <Link href={pathFor("hizmet-urun", locale)}>{L("Ürün ve Çözüm Geliştirme", "Product & Solution Development")}</Link>
              {L(
                `: ABAP, Fiori ve BTP ile özel geliştirme ve ${solN} hazır SAP çözümü.`,
                `: custom development with ABAP, Fiori and BTP, and ${solN} ready-made SAP solutions.`
              )}
            </li>
            <li>
              <Link href={pathFor("confiq", locale)}>Confiq</Link>
              {L(
                ": SAP verisine doğal dille erişim ve finansal öngörü sunan yapay zekâ ürün ailemiz.",
                ": our AI product family for natural-language access to SAP data and financial foresight."
              )}
            </li>
          </ul>
          <p style={{ marginTop: 18 }}>
            {L("Ayrıntı için: ", "In more detail: ")}
            <Link href={pathFor("uzmanlik", locale)}>{L("modül uzmanlığımız", "our module expertise")}</Link>
            {" · "}
            <Link href={pathFor("sektorler", locale)}>{L("sektörlere göre deneyimimiz", "our experience by industry")}</Link>
            {" · "}
            <Link href={pathFor("cozumler", locale)}>{L("çözüm kataloğu", "solution catalogue")}</Link>
          </p>

          <h2>{L("Sloganımızın üç sözü", "The three promises in our slogan")}</h2>
          <p>
            <b>Deep Expertise.</b>{" "}
            {L(
              "Genel SAP danışmanlığı yerine finans ve kontrol modüllerinde derinleşmeyi seçtik. Dönüşümün en riskli alanı finanstır; bizim en iyi bildiğimiz alan da orası.",
              "Instead of general SAP consulting we chose depth in the finance and control modules. Finance is the riskiest area of a transformation; it is also the area we know best."
            )}
          </p>
          <p>
            <b>Smart Solutions.</b>{" "}
            {L(
              `Sahada tekrar eden ihtiyaçları ürünleştirdik: ${solN} hazır çözüm ve Confiq. Enflasyon muhasebesi paketimiz 25'ten fazla şirkette canlı.`,
              `We productised the needs that recur in the field: ${solN} ready-made solutions and Confiq. Our inflation accounting suite is live in more than 25 companies.`
            )}
          </p>
          <p>
            <b>Lasting Trust.</b>{" "}
            {L(
              "Projeyi canlıya alıp gitmiyoruz; büyük dönüşümlerimizin çoğu canlıya geçtikten sonra destek hizmetiyle devam ediyor. %95 müşteri devamlılığı bunun sonucu.",
              "We do not go live and leave; most of our large transformations continue under support after go-live. 95% client retention is the result."
            )}
          </p>

          <h2>{L("Sahadan", "From the field")}</h2>
          <ul className="sx-list" style={{ maxWidth: "72ch" }}>
            <li>
              <Link href={`${refs}/ronesans-holding`}>Rönesans Holding</Link>
              {L(
                ": 200'den fazla şirketin aynı anda canlıya geçtiği greenfield S/4HANA dönüşümü.",
                ": a greenfield S/4HANA transformation in which more than 200 companies went live at the same time."
              )}
            </li>
            <li>
              <Link href={`${refs}/borusan-birlesik-boru`}>Borusan Birleşik Boru</Link>
              {L(
                ": beş ülkede rollout; FI, CO, PS, nakit ve hazine yönetimi.",
                ": rollout in five countries; FI, CO, PS, cash and treasury management."
              )}
            </li>
            <li>
              <Link href={`${refs}/arcelik`}>Arçelik</Link>
              {L(
                ": Tayland, Bangladeş, Vietnam, Malezya, Endonezya ve Dubai'de S/4HANA rollout.",
                ": S/4HANA rollout in Thailand, Bangladesh, Vietnam, Malaysia, Indonesia and Dubai."
              )}
            </li>
            <li>
              <Link href={`${refs}/karaca-zuccaciye`}>Karaca</Link>
              {L(
                ": RISE with SAP üzerinde 40 şirket ve 100'den fazla mağazalı SAP Retail dönüşümü.",
                ": an SAP Retail transformation on RISE with SAP for 40 companies and more than 100 stores."
              )}
            </li>
            <li>
              <Link href={`${refs}/tpao`}>TPAO</Link>
              {L(
                ": kamu bütçe yönetimi (FM), proje ve yatırım portföyü ile SAP IS-Oil.",
                ": public budget management (FM), project and investment portfolio, and SAP IS-Oil."
              )}
            </li>
          </ul>
          <p style={{ marginTop: 16 }}>
            <Link href={refs}>{L("Tüm referanslar ve proje haritası →", "All references and the project map →")}</Link>
          </p>

          <h2>{L("Nasıl çalışırız", "How we work")}</h2>
          <p>
            {L(
              "İşimizi yapma biçimimizin bir adı var: Conforcus Way. Özeti “mutlu çalışan, mutlu müşteri”. Ünvan yarışı yerine ekip uyumunu, bürokrasi yerine hızlı kararı, satılabilir olan yerine doğru olanı tavsiye etmeyi seçiyoruz.",
              "The way we work has a name: Conforcus Way. In short, “happy employees, happy clients”. We choose team harmony over title races, fast decisions over bureaucracy, and recommending what is right over what is easy to sell."
            )}{" "}
            <Link href={pathFor("conforcus-way", locale)}>{L("Conforcus Way ve kariyer →", "Conforcus Way and careers →")}</Link>
          </p>

          <h2>{L("Vizyonumuz", "Our vision")}</h2>
          <p>
            {L(
              "EMEA bölgesinde müşteri memnuniyeti en yüksek, güvenilir ve butik SAP danışmanlık şirketi olmak.",
              "To be the trusted, boutique SAP consultancy with the highest customer satisfaction in the EMEA region."
            )}
          </p>

          <h2>{L("Neredeyiz", "Where we are")}</h2>
          <p>
            {COMPANY.addressLine}
            <br />
            {COMPANY.email} · {COMPANY.hrEmail} · {COMPANY.telephoneDisplay}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {L("Ücretsiz SAP Analizi", "Free SAP Analysis")}
            </Link>
            <Link className="btn btn-g" href={pathFor("iletisim", locale)}>
              {L("İletişim", "Contact")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
