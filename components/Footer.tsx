/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import { COMPANY, LOGO_SIZE } from "@/lib/site";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <img src="/logo.png" alt="Conforcus" width={LOGO_SIZE.width} height={LOGO_SIZE.height} loading="lazy" />
            <p>
              Deep Expertise. Smart Solutions.
              <br />
              Lasting Trust.
            </p>
          </div>
          <div>
            <h4>{pick(locale, "Hizmetler", "Services")}</h4>
            <Link href={pathFor("hizmet-sap-ams", locale)}>{pick(locale, "SAP Destek (AMS)", "SAP Support (AMS)")}</Link>
            <Link href={pathFor("hizmet-s4hana", locale)}>{pick(locale, "S/4HANA Dönüşümleri", "S/4HANA Transformations")}</Link>
            <Link href={pathFor("hizmet-rollout", locale)}>Global Rollout</Link>
            <Link href={pathFor("hizmet-urun", locale)}>{pick(locale, "Ürün & Çözüm Geliştirme", "Product & Solution Development")}</Link>
          </div>
          <div>
            <h4>{pick(locale, "Şirket", "Company")}</h4>
            <Link href={pathFor("hakkimizda", locale)}>{pick(locale, "Hakkımızda", "About")}</Link>
            <Link href={pathFor("conforcus-way", locale)}>Conforcus Way</Link>
            <Link href={pathFor("referanslar", locale)}>{pick(locale, "Referanslar", "References")}</Link>
            <Link href={pathFor("blog", locale)}>Blog</Link>
            <Link href={pathFor("iletisim", locale)}>{pick(locale, "İletişim", "Contact")}</Link>
          </div>
          <div>
            <h4>{pick(locale, "İletişim", "Contact")}</h4>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <a href={COMPANY.telHref}>{COMPANY.telephoneDisplay}</a>
            <a href={COMPANY.linkedin} target="_blank" rel="noopener">
              linkedin.com/company/con4cus
            </a>
            <p style={{ marginTop: 10, fontSize: 13 }}>
              {COMPANY.streetAddress}
              <br />
              {COMPANY.addressLocality} / {COMPANY.addressRegion}
            </p>
          </div>
        </div>
        <div className="f-bottom">
          <span>© 2026 {COMPANY.legalName}</span>
          <span>
            <Link href={pathFor("kvkk", locale)}>KVKK</Link>
            {" · "}
            <Link href={pathFor("gizlilik", locale)}>{pick(locale, "Gizlilik", "Privacy")}</Link>
            {" · "}
            <Link href={pathFor("cerez", locale)}>{pick(locale, "Çerez", "Cookies")}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
