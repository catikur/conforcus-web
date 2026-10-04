import { getJobs } from "@/lib/jobs";
import { pick, type Locale } from "@/lib/i18n";
import { lineBreak } from "@/lib/lineBreak";
import MediaSlot from "@/components/MediaSlot";
import { getSiteMedia } from "@/lib/siteSettings";

export default async function ConforcusWayPage({ locale }: { locale: Locale }) {
  const media = await getSiteMedia(locale);
  const jobs = await getJobs(locale);

  return (
    <main data-page="conforcus-way" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">Conforcus Way</div>
          <h1>
            {pick(locale, lineBreak("Mutlu çalışan,", "mutlu müşteri"), lineBreak("Happy employees,", "happy clients"))}
          </h1>
          <p className="lead">
            {pick(
              locale,
              "Conforcus Way, işimizi yapma biçimimizin adı: bürokrasi yerine sonuç, ünvan yarışı yerine ekip uyumu, katı kurallar yerine güven. Profesyonel disiplinle esnek bir kültürü aynı çatıda buluşturuyoruz — çünkü mutlu bir ekibin müşterisine yansıttığı enerji, hiçbir metodolojiyle üretilemez.",
              "Conforcus Way is the name of how we work: results over bureaucracy, team harmony over title races, trust over rigid rules. We combine professional discipline with a flexible culture — because the energy a happy team brings to its clients cannot be produced by any methodology."
            )}
          </p>
        </div>
      </div>

      <section style={{ padding: "0 0 10px" }}>
        <div className="wrap">
          <MediaSlot
            src={media.teamImageUrl}
            alt={media.teamImageAlt}
            field="siteSettings.teamImage"
            locale={locale}
            label={{ tr: "Ekip fotoğrafı", en: "Team photo" }}
            ratio="21 / 9"
          />
        </div>
      </section>

      <section style={{ padding: "60px 0", background: "var(--mist)" }}>
        <div className="wrap">
          <h2>{pick(locale, "Bizi biz yapan dört ilke", "Four principles that make us who we are")}</h2>
          <div className="vals">
            <div className="val">
              <b>{pick(locale, "Esnek Yapı", "Flexible Structure")}</b>
              <p>
                {pick(
                  locale,
                  "Ünvan yarışı yok. Ekip uyumu ve inisiyatifle herkes aynı zamanda karar verici ve aksiyon alıcı.",
                  "No title races. With team harmony and initiative, everyone is both a decision-maker and a doer."
                )}
              </p>
            </div>
            <div className="val">
              <b>Conforcus Prime</b>
              <p>
                {pick(
                  locale,
                  "Genç danışman yetiştirme ve mentorluk programımızla geleceğimiz emin ellerde.",
                  "Our young consultant development and mentoring program keeps our future in safe hands."
                )}
              </p>
            </div>
            <div className="val">
              <b>{pick(locale, "Sürekli Gelişim", "Continuous Growth")}</b>
              <p>
                {pick(
                  locale,
                  "Eğitim yatırımları ve uzun süreli iş birlikleriyle kendimizi hep güncel tutuyoruz.",
                  "With training investments and long-term partnerships, we keep ourselves sharp and current."
                )}
              </p>
            </div>
            <div className="val">
              <b>{pick(locale, "Güven & İşbirliği", "Trust & Collaboration")}</b>
              <p>
                {pick(
                  locale,
                  "Gereksiz iş yeri stresi ve iç rekabeti en aza indirerek yüksek üretkenlik kültürü kuruyoruz.",
                  "By minimizing unnecessary stress and internal competition, we build a culture of high productivity."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 10px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          <h2>{pick(locale, "Neden böyle çalışıyoruz", "Why we work this way")}</h2>
          <p>
            {pick(
              locale,
              "Çıkış noktamız basit bir gözlem: müşteriye yansıyan kalite, danışmanın işini nasıl yaptığıyla başlar. Düşük stresli, inisiyatife açık bir ortamda çalışan danışman doğru cevabı zamanında verir; müşterisini gerçekten memnun eden danışman da işinde anlam bulur. İki yön birbirini besler.",
              "Our starting point is a simple observation: the quality a client experiences begins with how the consultant does their work. A consultant working in a low-stress environment that welcomes initiative gives the right answer on time; and a consultant who truly satisfies their client finds meaning in the job. The two directions feed each other."
            )}
          </p>
          <p>
            {pick(
              locale,
              "Bu yüzden kararları işe en yakın yerde alıyoruz, bilgiyi paylaşıyoruz ve hatadan birlikte öğreniyoruz. Müşteriye de aynı açıklıkla yaklaşıyoruz: gerçek ihtiyacı anlamadan çözüm önermiyor, satması kolay olanı değil doğru olanı tavsiye ediyoruz. Şirket büyürken bu kültürü iyi niyete bırakmıyoruz; genç danışmanları yetiştiren Conforcus Prime programı ve düzenli birebir görüşmeler bunun yapısal güvencesi.",
              "That is why we take decisions as close to the work as possible, share knowledge and learn from mistakes together. We approach clients with the same openness: we do not propose a solution before understanding the real need, and we recommend what is right rather than what is easy to sell. As the company grows we do not leave this culture to goodwill; the Conforcus Prime programme that develops young consultants, and regular one-to-one conversations, are its structural safeguards."
            )}
          </p>
          <h2>{pick(locale, "Sloganımızın üç sözü", "The three promises in our slogan")}</h2>
          <ul className="sx-list ok" style={{ maxWidth: "72ch" }}>
            <li>
              <b>Deep Expertise.</b>{" "}
              {pick(
                locale,
                "70'ten fazla danışman; yarısından fazlası 10 yılı aşkın SAP deneyimine sahip. Finans ve kontrol modüllerinde butik uzmanlık.",
                "More than 70 consultants; over half with more than ten years of SAP experience. Boutique expertise in finance and control modules."
              )}
            </li>
            <li>
              <b>Smart Solutions.</b>{" "}
              {pick(
                locale,
                "Sahada tekrar eden ihtiyaçlardan doğan hazır çözüm paketleri ve yapay zekâ ürün ailemiz Confiq.",
                "Ready-made solution packages born from needs that recur in the field, and our AI product family, Confiq."
              )}
            </li>
            <li>
              <b>Lasting Trust.</b>{" "}
              {pick(
                locale,
                "130'dan fazla müşteri, %95 müşteri devamlılığı ve yıllara yayılan iş ortaklıkları.",
                "More than 130 clients, 95% client retention and partnerships that span years."
              )}
            </li>
          </ul>
        </div>
      </section>

      <section style={{ padding: "70px 0" }}>
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Kariyer", "Careers")}</div>
          <h2>{pick(locale, "Bu kültürün parçası olun", "Become part of this culture")}</h2>
          <p className="lead">
            {pick(
              locale,
              "SAP'ta derinleşmek isteyen, ekip ruhuna inanan danışmanlar arıyoruz. Açık pozisyon olmasa bile genel başvurunuzu her zaman değerlendiriyoruz.",
              "We're looking for consultants who want to go deep in SAP and believe in team spirit. Even without an open position, we always review general applications."
            )}
          </p>
          <div className="jobs">
            {jobs.map((job, i) => {
              const applyHref = job.applyUrl || (job.applyEmail ? `mailto:${job.applyEmail}` : null);
              return (
                <div className="job" key={i}>
                  <div>
                    <b>{job.title}</b>
                    <small>
                      {job.location}
                      {job.isSample ? <> · {pick(locale, "örnek ilan", "sample posting")}</> : null}
                    </small>
                  </div>
                  {applyHref ? (
                    <a className="btn btn-g" href={applyHref}>
                      {pick(locale, "Başvur", "Apply")}
                    </a>
                  ) : (
                    <a className="btn btn-g" href="#" data-toast="demo">
                      {pick(locale, "Başvur", "Apply")}
                    </a>
                  )}
                </div>
              );
            })}
            <div className="job">
              <div>
                <b>{pick(locale, "Genel Başvuru", "General Application")}</b>
                <small>{pick(locale, "Pozisyondan bağımsız — CV'nizi bekliyoruz", "Independent of any position — send us your CV")}</small>
              </div>
              <a className="btn btn-b" href="mailto:info@conforcus.com">
                {pick(locale, "CV Gönder", "Send CV")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
