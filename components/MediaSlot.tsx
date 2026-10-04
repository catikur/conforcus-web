import { SITE_IS_WWW } from "@/lib/site";
import { sanityImg, sanitySrcSetW } from "@/lib/img";
import { pick, type Locale } from "@/lib/i18n";

/* Görsel yuvası — Sanity'de görsel varsa Sanity CDN'in ölçeklediği sürümünü (WebP/AVIF,
   responsive srcSet) basar; yoksa markalı bir yer tutucu gösterir. Sunucu tarafı
   görsel optimizasyonu (/_next/image) bilinçli olarak kapalıdır (bkz. next.config.mjs).

   Yer tutucu kasıtlı olarak "eksik görsel" gibi görünmez: lacivert degrade ve
   ince bir desenle tasarımın parçası gibi durur. Yalnızca ÖNİZLEME ortamında
   (henüz www değilken) hangi Sanity alanının doldurulacağını söyleyen küçük bir
   not eklenir; üretimde bu not görünmez. */

export default function MediaSlot({
  src,
  alt,
  label,
  field,
  locale,
  ratio = "16 / 9",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 840px",
}: {
  src?: string;
  alt?: string;
  label: { tr: string; en: string };
  field: string; // ör. "siteSettings.officeImage"
  locale: Locale;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const text = pick(locale, label.tr, label.en);

  if (src) {
    const [rw, rh] = ratio.split("/").map((n) => parseFloat(n));
    const r = rw > 0 && rh > 0 ? rw / rh : undefined;
    return (
      <figure className="mslot" style={{ aspectRatio: ratio }}>
        <img
          src={sanityImg(src, { w: 1280, h: r ? Math.round(1280 / r) : undefined, fit: r ? "crop" : "max" })}
          srcSet={sanitySrcSetW(src, [480, 840, 1280, 1680], { ratio: r })}
          sizes={sizes}
          alt={alt || text}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </figure>
    );
  }

  return (
    <div className="mslot mslot-empty" style={{ aspectRatio: ratio }} role="img" aria-label={text}>
      <svg className="mslot-ico" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <path
          d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="9" cy="10" r="1.7" fill="currentColor" />
        <path d="M4 17l5-4.5 3.5 3L16 12l4 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="mslot-label">{text}</span>
      {!SITE_IS_WWW ? <span className="mslot-field">Sanity · {field}</span> : null}
    </div>
  );
}
