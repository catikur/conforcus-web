import Link from "next/link";
import { pathFor, pick, type Locale, type RouteKey } from "@/lib/i18n";

export default function LegalPage({
  locale,
  title,
  paras,
  crumbKey,
}: {
  locale: Locale;
  title: string;
  paras: string[];
  crumbKey: RouteKey;
}) {
  return (
    <main data-page={crumbKey} className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <h1>{title}</h1>
        </div>
      </div>
      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap legal" style={{ maxWidth: 840 }}>
          {paras.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
          <p>
            <Link className="mega-cta" href={pathFor("home", locale)}>
              {pick(locale, "← Ana sayfa", "← Home")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
