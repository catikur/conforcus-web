"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";
import type { RefCard } from "@/lib/references";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Referanslar "Markalar": sektör çipleriyle filtre; her logo → detay sayfası.
export default function References({ locale, references }: { locale: Locale; references: RefCard[] }) {
  const [sec, setSec] = useState<string>("ALL");
  const sectors = [...new Set(references.map((r) => r.sector).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, locale === "tr" ? "tr" : "en")
  );
  const list = references.filter((r) => sec === "ALL" || r.sector === sec);
  const base = pathFor("referanslar", locale);

  return (
    <>
      <div className="chiprow" id="secchips">
        <button className={"chip" + (sec === "ALL" ? " on" : "")} data-s="ALL" onClick={() => setSec("ALL")}>
          {pick(locale, "Tüm Sektörler", "All Industries")}
        </button>
        {sectors.map((s) => (
          <button key={s} className={"chip" + (sec === s ? " on" : "")} data-s={s} onClick={() => setSec(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="lgrid" id="reflogos">
        {list.map((r) => (
          <Link className="ltile" href={`${base}/${r.slug}`} key={r.slug}>
            <div>
              {r.logoUrl ? (
                <img src={r.logoUrl} alt={r.name} style={{ maxHeight: 42, maxWidth: "100%", margin: "0 auto" }} />
              ) : (
                <b>{r.name}</b>
              )}
              {r.sector ? <small>{r.sector}</small> : null}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
