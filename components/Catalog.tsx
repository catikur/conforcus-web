"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MODS } from "@/lib/data";
import type { SolutionCard } from "@/lib/solutions";
import { modLabel } from "@/lib/modules";
import { pathFor, pick, type Locale } from "@/lib/i18n";

/* Çözüm kataloğu — iki katman:
   1) E-Çözümler: modül bazlı değil, ayrı bir başlık (GİB e-dönüşüm + elektronik
      finans süreçleri). Filtreden bağımsız, her zaman kendi bölümünde görünür.
   2) SAP modül kataloğu: FI/CO/MM/SD/PS/FM çipleriyle filtrelenir. */
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

  const eSols = solutions.filter((s) => s.module === "E");
  const modSols = solutions.filter((s) => s.module !== "E");
  const counts: Record<string, number> = {};
  modSols.forEach((s) => (counts[s.module] = (counts[s.module] || 0) + 1));
  const list = modSols.filter((s) => mod === "ALL" || s.module === mod);
  const analiz = pathFor("analiz", locale);
  const catalogBase = pathFor("cozumler", locale);
  const total = solutions.length;

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "Çözüm Kataloğu", "Solution Catalog")}</div>
          <h1>{pick(locale, `${total}+ hazır SAP çözümü`, `${total}+ ready-made SAP solutions`)}</h1>
          <p className="lead">
            {pick(
              locale,
              "Sahada kanıtlanmış, kurulmaya hazır çözüm paketlerimiz. E-dönüşüm çözümleri ayrı başlıkta; SAP çözümlerini modüle göre filtreleyin.",
              "Field-proven, ready-to-deploy solution packages. E-transformation solutions sit under their own heading; filter SAP solutions by module."
            )}
          </p>
          <div className="chiprow" id="modchips">
            <button className={"chip" + (mod === "ALL" ? " on" : "")} data-m="ALL" onClick={() => setMod("ALL")}>
              {pick(locale, "Tümü", "All")} · {modSols.length}
            </button>
            {MODS.map((m) => (
              <button key={m} className={"chip" + (mod === m ? " on" : "")} data-m={m} onClick={() => setMod(m)}>
                {m} · {counts[m] || 0}
              </button>
            ))}
            {eSols.length ? (
              <a className="chip chip-e" href="#e-cozumler">
                {pick(locale, "E-Çözümler", "E-Solutions")} · {eSols.length}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {eSols.length ? (
        <section className="esec" id="e-cozumler">
          <div className="wrap">
            <div className="eyebrow">{pick(locale, "E-Dönüşüm", "E-Transformation")}</div>
            <h2>{pick(locale, "E-Çözümler", "E-Solutions")}</h2>
            <p className="lead">
              {pick(
                locale,
                "GİB e-dönüşüm belgeleri ve elektronik finans süreçleri: SAP içinde uçtan uca, mevzuat değiştikçe güncellenen paketler.",
                "Turkish e-transformation documents and electronic finance processes: end-to-end inside SAP, kept current as regulation changes."
              )}
            </p>
            <p style={{ marginTop: -6, marginBottom: 22 }}>
              <Link href={pathFor("e-cozumler", locale)} style={{ color: "#0B6E4F", fontWeight: 600, fontSize: 14 }}>
                {pick(locale, "E-dönüşüm rehberi ve 2026 takvimi →", "E-transformation guide and 2026 calendar →")}
              </Link>
            </p>
            <div className="pgrid">
              {eSols.map((s) => (
                <Link className="pcard" href={`${catalogBase}/${s.slug}`} key={s.slug}>
                  <span className="mod m-E">{modLabel(s.module)}</span>
                  <h3>{s.name}</h3>
                  {s.short ? <p>{s.short}</p> : null}
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section style={{ padding: "50px 0 70px" }}>
        <div className="wrap">
          {eSols.length ? (
            <>
              <div className="eyebrow">{pick(locale, "SAP Modül Çözümleri", "SAP Module Solutions")}</div>
              <h2 style={{ marginBottom: 26 }}>{pick(locale, "Modüle göre çözümler", "Solutions by module")}</h2>
            </>
          ) : null}
          <div className="pgrid" id="catalog">
            {list.map((s, i) => (
              <div className="pcard" key={i}>
                <span className={"mod m-" + s.module}>{modLabel(s.module)}</span>
                <h3>{s.name}</h3>
                <Link className="more" style={{ color: "var(--blue)", fontSize: 13, fontWeight: 600 }} href={`${catalogBase}/${s.slug}`}>
                  {pick(locale, "Detay →", "Details →")}
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
