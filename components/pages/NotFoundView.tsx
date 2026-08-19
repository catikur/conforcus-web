import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export const notFoundMetadata = {
  title: { tr: "Sayfa bulunamadı — Conforcus", en: "Page not found — Conforcus" },
  robots: { index: false, follow: false },
};

export default function NotFoundView({ locale }: { locale: Locale }) {
  return (
    <main
      id="main"
      className="active"
      data-page="home"
      style={{
        minHeight: "62vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px 24px",
        gap: 14,
      }}
    >
      <div className="kicker" style={{ justifyContent: "center" }}>
        404
      </div>
      <h1 style={{ fontFamily: "var(--disp)", fontSize: "clamp(40px,8vw,72px)", color: "var(--navy)", lineHeight: 1, margin: 0 }}>
        {pick(locale, "Sayfa bulunamadı", "Page not found")}
      </h1>
      <p style={{ color: "var(--ink-2)", fontSize: 17, maxWidth: "44ch" }}>
        {pick(
          locale,
          "Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Menüden devam edin veya ücretsiz analize gidin.",
          "That address may have moved or never existed. Continue from the menu, or start a free analysis."
        )}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <Link className="btn btn-p" href={pathFor("home", locale)}>
          {pick(locale, "Ana sayfa", "Home")}
        </Link>
        <Link className="btn btn-g" href={pathFor("analiz", locale)}>
          {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
        </Link>
      </div>
    </main>
  );
}
