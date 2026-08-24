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
    </main>
  );
}
