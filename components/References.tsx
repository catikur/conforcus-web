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
        {sectors.map(([s, n]) => (
          <button key={s} className={"secchip" + (sec === s ? " on" : "")} role="tab" aria-selected={sec === s} onClick={() => setSec(s)}>
            {s} <i>{n}</i>
          </button>
        ))}
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
