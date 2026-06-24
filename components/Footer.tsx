/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">
          <div>
            <img src="/logo.png" alt="Conforcus" />
            <p>
              Deep Expertise. Smart Solutions.
              <br />
              Lasting Trust.
            </p>
          </div>
          <div>
            <h4>{pick(locale, "Hizmetler", "Services")}</h4>
            <Link href={pathFor("hizmetler", locale)}>{pick(locale, "SAP Destek (AMS)", "SAP Support (AMS)")}</Link>
            <Link href={pathFor("hizmetler", locale)}>{pick(locale, "S/4HANA Dönüşümleri", "S/4HANA Transformations")}</Link>
            <Link href={pathFor("hizmetler", locale)}>Global Rollout</Link>
            <Link href={pathFor("cozumler", locale)}>{pick(locale, "Ürün & Çözümler", "Products & Solutions")}</Link>
          </div>
          <div>
            <h4>{pick(locale, "Şirket", "Company")}</h4>
            <Link href={pathFor("conforcus-way", locale)}>Conforcus Way</Link>
            <Link href={pathFor("conforcus-way", locale)}>{pick(locale, "Kariyer", "Careers")}</Link>
            <Link href={pathFor("referanslar", locale)}>{pick(locale, "Referanslar", "References")}</Link>
            <Link href={pathFor("blog", locale)}>Blog</Link>
          </div>
          <div>
            <h4>{pick(locale, "İletişim", "Contact")}</h4>
            <a href="mailto:info@conforcus.com">info@conforcus.com</a>
            <a href="https://www.linkedin.com/company/conforcus" target="_blank" rel="noopener">
              linkedin.com/company/conforcus
            </a>
            <p style={{ marginTop: 10, fontSize: 13 }}>
              İçerenköy Mah. Yeşilvadi Sok. No:8
              <br />
              Öneren İş Merkezi Kat:3 Ataşehir / İstanbul
            </p>
          </div>
        </div>
        <div className="f-bottom">
          <span>© 2026 Conforcus Bilişim Danışmanlık A.Ş.</span>
          <span>
            KVKK · {pick(locale, "Gizlilik · Çerez Politikası", "Privacy · Cookie Policy")}
          </span>
        </div>
      </div>
    </footer>
  );
}
