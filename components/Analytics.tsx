"use client";

import { useEffect, useSyncExternalStore } from "react";
import { init, track } from "@plausible-analytics/tracker";
import { pick, type Locale } from "@/lib/i18n";

/* Ziyaret ölçümü (Plausible) — çerez, tarayıcı deposu ya da kalıcı kimlik kullanmaz; bu yüzden
   onay kutusu yoktur. İzleyici site paketinin içindedir ve olayları aynı kaynaktaki uca gönderir
   (oradan Plausible'a iletilir): sayfa başka bir alan adına bağlanmaz. Sayfa görüntülemeleri ve
   site içi geçişler kendiliğinden ölçülür. domain boşsa bu bileşen hiç render edilmez (bkz. Shell). */

// Ziyaretçi bu tarayıcıda ölçüm dışı kalmak isterse izleyicinin baktığı kayıt (Plausible'ın kendi anahtarı).
const IGNORE_KEY = "plausible_ignore";
const IGNORE_EVENT = "cfx:measure-pref";

let started = false;

/* İzleyici "sayfada geçirilen süre" olayını ölçüm dışı kaydına bakmadan gönderir; kayda yalnız sayfa
   görüntülemede ve özel olaylarda bakar. Ziyaretçi ölçüm dışında kalmayı seçtikten sonra tarayıcıdan
   hiçbir olay çıkmasın diye ölçüm ucuna giden istek burada durdurulur; başka isteğe dokunulmaz.
   İzleyici (0.4.6) olayları fetch(endpoint, …) ile gönderir — sürüm yükseltirken yeniden sına. */
function holdWhenIgnored(endpoint: string) {
  const send = window.fetch;
  window.fetch = (input, options) =>
    input === endpoint && ignored()
      ? Promise.resolve(new Response(null, { status: 202 }))
      : send.call(window, input, options);
}

export default function Analytics({ domain, endpoint }: { domain: string; endpoint: string }) {
  useEffect(() => {
    if (started) return; // init yalnız bir kez çağrılabilir
    started = true;
    holdWhenIgnored(endpoint);
    init({ domain, endpoint, outboundLinks: true, logging: false });
  }, [domain, endpoint]);
  return null;
}

/** Form gönderimi gibi dönüşümleri ölçer; ölçüm kapalıysa hiçbir şey yapmaz. */
export function trackEvent(name: string, props?: Record<string, string>) {
  if (started) track(name, props ? { props } : {});
}

function ignored(): boolean {
  try {
    return window.localStorage.getItem(IGNORE_KEY) === "true";
  } catch {
    return false;
  }
}
function subscribe(onChange: () => void) {
  window.addEventListener(IGNORE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(IGNORE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Çerez politikası sayfasındaki "bu tarayıcıda ölçme" düğmesi. */
export function MeasurementToggle({ locale }: { locale: Locale }) {
  const off = useSyncExternalStore(subscribe, ignored, () => false);
  const toggle = () => {
    try {
      if (off) window.localStorage.removeItem(IGNORE_KEY);
      else window.localStorage.setItem(IGNORE_KEY, "true");
    } catch {
      /* depolama kapalıysa tercih kaydedilemez */
    }
    window.dispatchEvent(new Event(IGNORE_EVENT));
  };
  return (
    <button type="button" className="btn btn-g" aria-pressed={off} onClick={toggle}>
      {off
        ? pick(locale, "Ölçüm bu tarayıcıda kapalı — yeniden aç", "Measurement is off in this browser — turn it back on")
        : pick(locale, "Bu tarayıcıda ziyaretimi ölçme", "Do not measure my visits in this browser")}
    </button>
  );
}
