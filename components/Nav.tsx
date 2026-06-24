"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { keyFromPath, pathFor, pick, type Locale } from "@/lib/i18n";
import { NAV_SECTIONS } from "@/lib/nav";
import { linkHref, MLink } from "./navShared";
import LangToggle from "./LangToggle";
import MobileMenu from "./MobileMenu";

// Mega menüdeki bir bağlantıya tıklanınca menüyü kapat (prototip davranışı):
// istemci tarafı geçişte imleç üstte kaldığı için menü kendiliğinden kapanmaz.
function closeMega(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.blur();
  const m = e.currentTarget.closest<HTMLElement>(".mega");
  if (m) {
    m.style.display = "none";
    setTimeout(() => {
      m.style.display = "";
    }, 400);
  }
}

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const active = keyFromPath(pathname);

  return (
    <nav className="nav">
      <div className="wrap nav-in">
        <Link className="nav-logo" href={pathFor("home", locale)}>
          <img src="/logo.png" alt="Conforcus" />
        </Link>

        {/* Masaüstü mega-menü — tek kaynak: NAV_SECTIONS */}
        <div className="nav-links">
          {NAV_SECTIONS.map((s) => (
            <div className="nav-item" key={s.key}>
              <Link href={pathFor(s.key, locale)} data-r={s.key} className={active === s.key ? "act" : undefined}>
                {pick(locale, s.tr, s.en)}
              </Link>
              <div className="mega">
                <div className="wrap mega-in">
                  <div className="mega-side">
                    <div className="mega-eyebrow">{pick(locale, s.eyebrow_tr, s.eyebrow_en)}</div>
                    <p>{pick(locale, s.desc_tr, s.desc_en)}</p>
                    <Link className="mega-cta" href={pathFor(s.key, locale)} onClick={closeMega}>
                      {pick(locale, s.cta_tr, s.cta_en)}
                    </Link>
                  </div>
                  <div className={"mega-grid" + (s.cols3 ? " cols-3" : "")}>
                    {s.links.map((l, i) => (
                      <MLink className="mlink" href={linkHref(l, locale)} onClick={closeMega} key={i}>
                        <b>
                          {pick(locale, l.tr, l.en)}
                          {l.note ? <> <i>{l.note}</i></> : null}
                          {l.pill ? <span className="pill">{pick(locale, l.pill.tr, l.pill.en)}</span> : null}
                        </b>
                        {l.sub_tr ? <span>{pick(locale, l.sub_tr, l.sub_en ?? l.sub_tr)}</span> : null}
                      </MLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <span className="sp" />
        <Link className="btn btn-p nav-cta" href={pathFor("analiz", locale)}>
          {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
        </Link>
        <LangToggle locale={locale} />
        <MobileMenu locale={locale} activeKey={active} />
      </div>
    </nav>
  );
}
