import Link from "next/link";
import PortableBody from "@/components/PortableBody";
import type { SolutionFull } from "@/lib/solutions";
import { pathFor, pick, type Locale } from "@/lib/i18n";

export default function SolutionDetailPage({ locale, sol }: { locale: Locale; sol: SolutionFull }) {
  return (
    <main data-page="cozumler" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <Link href={pathFor("cozumler", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
            {pick(locale, "← Tüm çözümler", "← All solutions")}
          </Link>
          <div style={{ marginBottom: 10 }}>
            <span className={"mod m-" + sol.module}>{sol.module}</span>
          </div>
          <h1>{sol.name}</h1>
          {sol.short ? <p className="lead">{sol.short}</p> : null}
        </div>
      </div>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap" style={{ maxWidth: 840 }}>
          {sol.body.length ? (
            <PortableBody value={sol.body} />
          ) : (
            <p className="lead">
              {pick(
                locale,
                "Bu çözüm hakkında detaylı bilgi için ücretsiz analiz talebinde bulunabilirsiniz.",
                "For more details about this solution, you can request a free analysis."
              )}
            </p>
          )}
          <div style={{ marginTop: 40 }}>
            <Link className="btn btn-p" href={pathFor("analiz", locale)}>
              {pick(locale, "Bu çözüm için detay isteyin", "Request details for this solution")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
