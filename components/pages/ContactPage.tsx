import { COMPANY } from "@/lib/site";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import Link from "next/link";

export default function ContactPage({ locale }: { locale: Locale }) {
  return (
    <main data-page="iletisim" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="eyebrow">{pick(locale, "İletişim", "Contact")}</div>
          <h1>{pick(locale, "Bize yazın", "Write to us")}</h1>
          <p className="lead">
            {pick(
              locale,
              "Analiz, AMS, dönüşüm veya kariyer — doğru adrese gitsin. Hukuki tebligat için unvan ve adres aşağıdadır.",
              "Analysis, AMS, transformation or careers — so it reaches the right desk. Legal name and address are below."
            )}
          </p>
        </div>
      </div>
      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div className="contact-dl">
            <div>
              <strong>{COMPANY.legalName}</strong>
            </div>
            <div>{COMPANY.addressLine}</div>
            <div>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              {" · "}
              <a href={`mailto:${COMPANY.hrEmail}`}>{COMPANY.hrEmail}</a>
            </div>
            <div>
              <a href={`tel:${COMPANY.telephone}`}>{COMPANY.telephoneDisplay}</a>
            </div>
            <div>
              <a href={COMPANY.linkedin} target="_blank" rel="noopener">
                linkedin.com/company/con4cus
              </a>
            </div>
          </div>
          <Link className="btn btn-p" href={pathFor("analiz", locale)}>
            {pick(locale, "Ücretsiz SAP Analizi formunu açın", "Open the free SAP analysis form")}
          </Link>
        </div>
      </section>

      <section style={{ padding: "0 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          <h2>{pick(locale, "Hangi konu için nereye yazmalı?", "Where to write, by topic")}</h2>
          <ul className="sx-list ok" style={{ maxWidth: "72ch" }}>
            <li>
              <b>{pick(locale, "Yeni bir proje, teklif ya da hizmet sorusu:", "A new project, a proposal or a question about our services:")}</b>{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              {pick(
                locale,
                ". SAP destek (AMS), S/4HANA dönüşümü, global rollout ve hazır çözümlerimizle ilgili sorularınızı bu adrese iletebilirsiniz.",
                ". Use this address for questions about SAP support (AMS), S/4HANA transformation, global rollout and our ready-made solutions."
              )}
            </li>
            <li>
              <b>{pick(locale, "Sisteminizle ilgili ilk değerlendirme:", "A first assessment of your system:")}</b>{" "}
              <Link href={pathFor("analiz", locale)}>{pick(locale, "ücretsiz SAP analizi", "the free SAP analysis")}</Link>
              {pick(
                locale,
                ". Birkaç soruluk formu doldurduğunuzda 48 saat içinde yazılı bir uzman notu gönderiyoruz.",
                ". Fill in the short form and we send a written expert note within 48 hours."
              )}
            </li>
            <li>
              <b>{pick(locale, "Kariyer ve özgeçmiş:", "Careers and CVs:")}</b>{" "}
              <a href={`mailto:${COMPANY.hrEmail}`}>{COMPANY.hrEmail}</a>
              {pick(locale, ". Açık pozisyonlar ve çalışma kültürümüz ", ". Open positions and how we work are on the ")}
              <Link href={pathFor("conforcus-way", locale)}>Conforcus Way</Link>
              {pick(locale, " sayfasında.", " page.")}
            </li>
            <li>
              <b>{pick(locale, "Kişisel verilerinizle ilgili başvurular:", "Requests about your personal data:")}</b>{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              {pick(locale, ". Ayrıntılar ", ". Details are in the ")}
              <Link href={pathFor("kvkk", locale)}>{pick(locale, "KVKK aydınlatma metninde", "privacy notice")}</Link>
              {pick(locale, ".", ".")}
            </li>
          </ul>

          <h2>{pick(locale, "Ofislerimiz", "Our offices")}</h2>
          <p>
            {pick(
              locale,
              `Merkez ofisimiz İstanbul Ataşehir'de: ${COMPANY.addressLine}. İkinci ofisimiz Samsun'da. Bugüne kadar 6 kıtada, 50'den fazla ülkede SAP projelerinde çalıştık.`,
              `Our head office is in Ataşehir, Istanbul: ${COMPANY.addressLine}. Our second office is in Samsun. So far we have worked on SAP projects in more than 50 countries on 6 continents.`
            )}
          </p>

          <h2>{pick(locale, "Yazmadan önce göz atmak isterseniz", "If you would like to look around first")}</h2>
          <ul className="sx-list" style={{ maxWidth: "72ch" }}>
            <li>
              <Link href={pathFor("hizmetler", locale)}>{pick(locale, "Hizmetlerimiz", "Our services")}</Link>
              {pick(locale, ": AMS, S/4HANA dönüşümü, global rollout, ürün ve çözüm geliştirme.", ": AMS, S/4HANA transformation, global rollout, product and solution development.")}
            </li>
            <li>
              <Link href={pathFor("uzmanlik", locale)}>{pick(locale, "Modül uzmanlığımız", "Our module expertise")}</Link>
              {pick(locale, " ve ", " and ")}
              <Link href={pathFor("sektorler", locale)}>{pick(locale, "sektörlere göre deneyimimiz", "our experience by industry")}</Link>
              {pick(locale, ".", ".")}
            </li>
            <li>
              <Link href={pathFor("cozumler", locale)}>{pick(locale, "Çözüm kataloğu", "The solution catalog")}</Link>
              {pick(locale, " ve ", " and ")}
              <Link href={pathFor("referanslar", locale)}>{pick(locale, "referanslarımız", "our references")}</Link>
              {pick(locale, ".", ".")}
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
