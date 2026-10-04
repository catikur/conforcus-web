"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";

/* Ziyaret ölçümü (Google Analytics 4) — yalnızca açık onayla.
   Onay verilmeden hiçbir ölçüm kodu yüklenmez ve çerez yazılmaz; reklam sinyalleri
   her durumda kapalıdır. Tercih tarayıcıda saklanır, çerez politikası sayfasından
   değiştirilebilir. gaId boşsa bu bileşen hiç render edilmez (bkz. Shell). */

const KEY = "cfx-consent";
export const CONSENT_OPEN_EVENT = "cfx:consent-open";

type Choice = "granted" | "denied";
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

function read(): Choice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function write(v: Choice) {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* depolama kapalıysa tercih yalnız bu sayfa için geçerli olur */
  }
}

let loaded = false;
function loadGa(gaId: string) {
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  const gtag: Gtag = function () {
    window.dataLayer!.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  gtag("js", new Date());
  gtag("config", gaId, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(s);
}

export default function Analytics({ gaId, locale }: { gaId: string; locale: Locale }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = read();
    if (c === "granted") loadGa(gaId);
    // Tercih tarayıcı depolamasında durur; sunucu çıktısıyla aynı kalmak için ancak yüklendikten sonra okunabilir.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    else if (c === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, [gaId]);

  if (!open) return null;

  const choose = (v: Choice) => {
    write(v);
    setOpen(false);
    if (v === "granted") loadGa(gaId);
    else if (loaded && window.gtag) window.gtag("consent", "update", { analytics_storage: "denied" });
  };

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label={pick(locale, "Çerez tercihi", "Cookie preference")}>
      <p>
        {pick(
          locale,
          "Siteyi nasıl kullandığınızı anlamak için, izin verirseniz ziyaret ölçümü yapıyoruz. Reklam ve izleme çerezi kullanmıyoruz.",
          "With your permission we measure visits to understand how the site is used. We use no advertising or tracking cookies."
        )}{" "}
        <Link href={pathFor("cerez", locale)}>{pick(locale, "Çerez politikası", "Cookie policy")}</Link>
      </p>
      <div className="consent-btns">
        <button type="button" className="btn btn-g" onClick={() => choose("denied")}>
          {pick(locale, "Reddet", "Decline")}
        </button>
        <button type="button" className="btn btn-p" onClick={() => choose("granted")}>
          {pick(locale, "Kabul et", "Accept")}
        </button>
      </div>
    </div>
  );
}

/** Çerez politikası sayfasındaki "tercihimi değiştir" düğmesi. */
export function ConsentReset({ locale }: { locale: Locale }) {
  return (
    <button type="button" className="btn btn-g" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>
      {pick(locale, "Çerez tercihimi değiştir", "Change my cookie preference")}
    </button>
  );
}

/** Form gönderimi gibi dönüşümleri ölçer; onay yoksa hiçbir şey yapmaz. */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.gtag) window.gtag("event", name, params || {});
}
