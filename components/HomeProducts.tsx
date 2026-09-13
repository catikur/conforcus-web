"use client";

import { useState } from "react";
import Link from "next/link";
import type { SolutionCard } from "@/lib/solutions";
import { modLabel, type SolGroup } from "@/lib/modules";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Ana sayfa "Ürünlerimiz" sekmeleri: Finans · Lojistik · E-Çözümler.
// Kartlar sunucudan (Sanity-or-fallback) yerelleştirilmiş gelir.
export default function HomeProducts({
  locale,
  fin,
  log,
  edon = [],
}: {
  locale: Locale;
  fin: SolutionCard[];
  log: SolutionCard[];
  edon?: SolutionCard[];
}) {
  const [grp, setGrp] = useState<SolGroup>("fin");
  const items = grp === "fin" ? fin : grp === "log" ? log : edon;
  const catalogBase = pathFor("cozumler", locale);

  return (
    <>
      <div className="ptabs rv">
        <button className={"ptab" + (grp === "fin" ? " on" : "")} data-g="fin" onClick={() => setGrp("fin")}>
          <span>{pick(locale, "Finans Çözümleri", "Finance Solutions")}</span>
          <i>FI · CO · PS · FM</i>
        </button>
        <button className={"ptab" + (grp === "log" ? " on" : "")} data-g="log" onClick={() => setGrp("log")}>
          <span>{pick(locale, "Lojistik Çözümleri", "Logistics Solutions")}</span>
          <i>MM · SD</i>
        </button>
        {edon.length ? (
          <button className={"ptab" + (grp === "edon" ? " on" : "")} data-g="edon" onClick={() => setGrp("edon")}>
            <span>{pick(locale, "E-Çözümler", "E-Solutions")}</span>
            <i>{pick(locale, "e-Fatura · e-Defter · e-Mutabakat", "e-Invoice · e-Ledger · e-Reconciliation")}</i>
          </button>
        ) : null}
      </div>
      <div className="pgrid" id="homeprods">
        {items.map((s, i) => (
          <Link className="pcard" href={`${catalogBase}/${s.slug}`} key={i}>
            <span className={"mod m-" + s.module}>{modLabel(s.module)}</span>
            <h4>{s.name}</h4>
            {s.short ? <p>{s.short}</p> : null}
          </Link>
        ))}
      </div>
      {grp === "edon" ? (
        <p style={{ marginTop: 18, textAlign: "center" }}>
          <Link className="mega-cta" href={`${catalogBase}#e-cozumler`}>
            {pick(locale, "Tüm e-çözümler →", "All e-solutions →")}
          </Link>
        </p>
      ) : null}
    </>
  );
}
