"use client";

import { useMemo, useState } from "react";
import type { RefCard } from "@/lib/references";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import { LogoWall, BrandIndex } from "@/components/LogoWall";

// Referanslar "Markalar": sektör filtresi → üstte logo duvarı, altta marka dizini.
export default function References({ locale, references }: { locale: Locale; references: RefCard[] }) {
  const [sec, setSec] = useState<string>("ALL");
  const base = pathFor("referanslar", locale);

  // Sektörler adet sırasına göre; adet çipte küçük sayı olarak görünür.
  const sectors = useMemo(() => {
    const c: Record<string, number> = {};
    references.forEach((r) => r.sector && (c[r.sector] = (c[r.sector] || 0) + 1));
    return Object.entries(c).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], locale === "tr" ? "tr" : "en"));
  }, [references, locale]);

  const list = references.filter((r) => sec === "ALL" || r.sector === sec);
  const logoCount = list.filter((r) => r.logoUrl).length;
  const nameCount = list.length - logoCount;

  return (
    <>
      <div className="secbar" role="tablist" aria-label={pick(locale, "Sektöre göre filtrele", "Filter by industry")}>
        <button className={"secchip" + (sec === "ALL" ? " on" : "")} role="tab" aria-selected={sec === "ALL"} onClick={() => setSec("ALL")}>
          {pick(locale, "Tümü", "All")} <i>{references.length}</i>
        </button>
        {sectors.slice(0, 10).map(([s, n]) => (
          <button key={s} className={"secchip" + (sec === s ? " on" : "")} role="tab" aria-selected={sec === s} onClick={() => setSec(s)}>
            {s} <i>{n}</i>
          </button>
        ))}
        {sectors.length > 10 ? (
          <label className={"secsel" + (sec !== "ALL" && !sectors.slice(0, 10).some(([s]) => s === sec) ? " on" : "")}>
            <span>{pick(locale, "Diğer sektörler", "Other industries")}</span>
            <select value={sectors.slice(0, 10).some(([s]) => s === sec) || sec === "ALL" ? "" : sec} onChange={(e) => setSec(e.target.value || "ALL")} aria-label={pick(locale, "Diğer sektörler", "Other industries")}>
              <option value="">{pick(locale, "Seçin…", "Choose…")}</option>
              {sectors.slice(10).map(([s, n]) => (
                <option key={s} value={s}>
                  {s} ({n})
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <LogoWall items={list} base={base} cols={5} />

      {nameCount ? (
        <BrandIndex
          items={list}
          base={base}
          title={
            logoCount
              ? pick(locale, `ve ${nameCount} marka daha`, `and ${nameCount} more brands`)
              : pick(locale, `${nameCount} marka`, `${nameCount} brands`)
          }
        />
      ) : null}
    </>
  );
}
