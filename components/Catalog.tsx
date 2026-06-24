"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MODS } from "@/lib/data";
import type { SolutionCard } from "@/lib/solutions";
import { pathFor, pick, type Locale } from "@/lib/i18n";

// Çözüm kataloğu: çözümler sunucudan (Sanity-or-fallback) gelir; görünüm aynı.
export default function Catalog({
  locale,
  initialMod = "ALL",
  solutions,
}: {
  locale: Locale;
  initialMod?: string;
  solutions: SolutionCard[];
}) {
  const [mod, setMod] = useState<string>(initialMod);

  useEffect(() => {
    setMod(initialMod);
  }, [initialMod]);

  const counts: Record<string, number> = {};
  solutions.forEach((s) => (counts[s.module] = (counts[s.module] || 0) + 1));
  const list = solutions.filter((s) => mod === "ALL" || s.module === mod);
  const analiz = pathFor("analiz", locale);

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Çözüm Kataloğu", "Solution Catalog")}</div>
          <h1>{pick(locale, "48+ hazır SAP çözümü", "48+ ready-made SAP solutions")}</h1>
          <p className="lead">
            {pick(
              locale,
              "Sahada kanıtlanmış, kurulmaya hazır çözüm paketlerimiz. Modüle göre filtreleyin; ihtiyacınıza uyanın detayını isteyin.",
              "Field-proven, ready-to-deploy solution packages. Filter by module and request details for the ones that fit your needs."
            )}
          </p>
          <div className="chiprow" id="modchips">
            <button className={"chip" + (mod === "ALL" ? " on" : "")} data-m="ALL" onClick={() => setMod("ALL")}>
              {pick(locale, "Tümü", "All")} · {solutions.length}
            </button>
            {MODS.map((m) => (
              <button key={m} className={"chip" + (mod === m ? " on" : "")} data-m={m} onClick={() => setMod(m)}>
                {m} · {counts[m] || 0}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section style={{ padding: "50px 0 70px" }}>
        <div className="wrap">
          <div className="pgrid" id="catalog">
            {list.map((s, i) => (
              <div className="pcard" key={i}>
                <span className={"mod m-" + s.module}>{s.module}</span>
                <h4>{s.name}</h4>
                <Link className="more" style={{ color: "var(--blue)", fontSize: 13, fontWeight: 600 }} href={analiz}>
                  {pick(locale, "Detay iste →", "Request details →")}
                </Link>
              </div>
            ))}
          </div>
          <div className="cta-mid">
            <p className="lead" style={{ margin: "0 auto 18px", textAlign: "center" }}>
              {pick(
                locale,
                "Aradığınız çözüm listede yok mu? Şirketinize özel geliştirelim.",
                "Don't see what you need? We'll build it for your company."
              )}
            </p>
            <Link className="btn btn-b" href={analiz}>
              {pick(locale, "Özel Çözüm Talebi", "Request a Custom Solution")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
