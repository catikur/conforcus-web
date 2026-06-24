"use client";

import { useState } from "react";
import type { SolutionCard } from "@/lib/solutions";
import { pick, type Locale } from "@/lib/i18n";

// Ana sayfa "Ürünlerimiz" sekmeleri. Kartlar sunucudan (Sanity-or-fallback)
// yerelleştirilmiş gelir; fallback = HOME_PRODUCTS (mevcut tablar aynen).
export default function HomeProducts({ locale, fin, log }: { locale: Locale; fin: SolutionCard[]; log: SolutionCard[] }) {
  const [grp, setGrp] = useState<"fin" | "log">("fin");
  const items = grp === "fin" ? fin : log;

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
      </div>
      <div className="pgrid" id="homeprods">
        {items.map((s, i) => (
          <div className="pcard" key={i}>
            <span className={"mod m-" + s.module}>{s.module}</span>
            <h4>{s.name}</h4>
            {s.short ? <p>{s.short}</p> : null}
          </div>
        ))}
      </div>
    </>
  );
}
