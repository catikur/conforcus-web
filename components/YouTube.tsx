"use client";

import { useState } from "react";
import { pick, type Locale } from "@/lib/i18n";

/* YouTube — "facade" yöntemi: sayfa yüklenirken YouTube'dan hiçbir şey çekilmez,
   yalnızca kapak görseli gösterilir. Ziyaretçi oynata basınca iframe eklenir.
   Böylece hız avantajı (0,04 sn) korunur ve izleme çerezleri tıklanmadan set edilmez
   (youtube-nocookie). Bağlantı Sanity'den gelir; boşsa bileşen hiç render edilmez. */

// Farklı YouTube bağlantı biçimlerinden video kimliğini çıkarır.
export function youTubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

export default function YouTube({
  url,
  title,
  locale,
  caption,
}: {
  url?: string;
  title?: string;
  locale: Locale;
  caption?: string;
}) {
  const [play, setPlay] = useState(false);
  const id = youTubeId(url);
  if (!id) return null;

  const label = title || pick(locale, "Tanıtım videosu", "Introduction video");

  return (
    <figure className="yt">
      <div className="yt-frame">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button type="button" className="yt-play" onClick={() => setPlay(true)} aria-label={`${label} — ${pick(locale, "oynat", "play")}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- kapak YouTube CDN'inden, tek boyut yeterli */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
            <span className="yt-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="yt-label">{label}</span>
          </button>
        )}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
