/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { RefCard } from "@/lib/references";

export type LogoItem = Pick<RefCard, "slug" | "name"> & { sector?: string; logoUrl?: string; logoAlt?: string };

/* Logo duvarı — yalnızca logosu olan markalar. Kutu içinde sadece logo;
   sektör adı kart altına yazılmaz, hover/odakta alt şeritte belirir.
   Logolar dinlenirken gri, üzerine gelince renklenir (tek tip, sakin duvar). */
export function LogoWall({
  items,
  base,
  cols = 4,
  compact = false,
}: {
  items: LogoItem[];
  base: string;
  cols?: 4 | 5 | 6;
  compact?: boolean;
}) {
  const logos = items.filter((r) => r.logoUrl);
  if (!logos.length) return null;
  return (
    <ul className={"lwall lwall-" + cols + (compact ? " lwall-sm" : "")}>
      {logos.map((r) => (
        <li key={r.slug}>
          <Link className="lw" href={`${base}/${r.slug}`}>
            <Logo url={r.logoUrl!} alt={r.logoAlt || r.name} />
            {r.sector ? <span className="lw-cap">{r.sector}</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Görseller Sanity CDN'den boyutlandırılmış ve auto=format (webp) ile gelir; sunucu tarafı
// next/image optimizasyonu VPS'te CPU'ya bindiği için kullanılmaz. SVG'ler olduğu gibi.
function Logo({ url, alt }: { url: string; alt: string }) {
  const svg = /\.svg(\?|$)/i.test(url);
  const src = svg ? url : `${url}?w=440&h=144&fit=max&auto=format&q=80`;
  return <img src={src} alt={alt} width={220} height={72} loading="lazy" decoding="async" />;
}

/* Marka dizini — logosu olmayan markalar tipografik, çok sütunlu bir liste olarak.
   Boş kutu yerine ad · sektör; her satır detay sayfasına gider. */
export function BrandIndex({ items, base, title }: { items: LogoItem[]; base: string; title?: string }) {
  const names = items.filter((r) => !r.logoUrl);
  if (!names.length) return null;
  return (
    <div className="bindex">
      {title ? <div className="bindex-h">{title}</div> : null}
      <ul>
        {names.map((r) => (
          <li key={r.slug}>
            <Link href={`${base}/${r.slug}`}>
              <b>{r.name}</b>
              {r.sector ? <small>{r.sector}</small> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
