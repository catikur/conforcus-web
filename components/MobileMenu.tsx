"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { pathFor, pick, type Locale, type RouteKey } from "@/lib/i18n";
import { NAV_SECTIONS } from "@/lib/nav";
import { linkHref, MLink } from "./navShared";

// Dar ekran (≤960px) için tam mobil menü: hamburger + akordeon çekmece.
// Panel body'ye portal'lanır: .nav'daki backdrop-filter, position:fixed için
// containing block oluşturduğundan panel aksi halde nav kutusuna hapsolur.
export default function MobileMenu({ locale, activeKey }: { locale: Locale; activeKey: RouteKey }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Rota değişince kapat.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Açıkken gövde kaydırmasını kilitle + Escape ile kapat.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const panel = (
    <div
      id="mobpanel"
      className={"mobpanel" + (open ? " open" : "")}
      role="dialog"
      aria-modal="true"
      aria-label={pick(locale, "Menü", "Menu")}
      aria-hidden={!open}
    >
      <div className="mobpanel-in">
        {NAV_SECTIONS.map((s) => {
          const isOpen = expanded === s.key;
          return (
            <div className={"mobsec" + (isOpen ? " open" : "")} key={s.key}>
              <button
                className={"mobsec-head" + (activeKey === s.key ? " act" : "")}
                aria-expanded={isOpen}
                onClick={() => setExpanded(isOpen ? null : s.key)}
              >
                <span>{pick(locale, s.tr, s.en)}</span>
                <span className="chev" aria-hidden="true" />
              </button>
              <div className="mobsub">
                {s.links.map((l, i) => (
                  <MLink className="mobsub-link" href={linkHref(l, locale)} onClick={() => setOpen(false)} key={i}>
                    <b>
                      {pick(locale, l.tr, l.en)}
                      {l.note ? <> <i>{l.note}</i></> : null}
                      {l.pill ? <span className="pill">{pick(locale, l.pill.tr, l.pill.en)}</span> : null}
                    </b>
                    {l.sub_tr ? <small>{pick(locale, l.sub_tr, l.sub_en ?? l.sub_tr)}</small> : null}
                  </MLink>
                ))}
                <Link className="mobsub-cta" href={pathFor(s.key, locale)} onClick={() => setOpen(false)}>
                  {pick(locale, s.cta_tr, s.cta_en)}
                </Link>
              </div>
            </div>
          );
        })}

        <Link className="btn btn-p mobpanel-cta" href={pathFor("analiz", locale)} onClick={() => setOpen(false)}>
          {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="navtoggle"
        aria-label={pick(locale, "Menü", "Menu")}
        aria-expanded={open}
        aria-controls="mobpanel"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={"navtoggle-ico" + (open ? " x" : "")} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
