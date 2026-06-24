import Link from "next/link";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import type { Testimonial } from "@/lib/testimonials";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// items boşsa hiçbir şey render edilmez → mevcut sayfa görünümü korunur.
export default function Testimonials({ locale, items }: { locale: Locale; items: Testimonial[] }) {
  if (!items.length) return null;
  const base = pathFor("referanslar", locale);

  return (
    <section className="refs">
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          {pick(locale, "Müşterilerimiz ne diyor", "What our clients say")}
        </div>
        <div className="tgrid">
          {items.map((t, i) => {
            const who = (
              <>
                <div className="av">{initials(t.person)}</div>
                <div>
                  <div className="nm">{t.person}</div>
                  {t.role || t.company ? <div className="rl">{[t.role, t.company].filter(Boolean).join(" · ")}</div> : null}
                </div>
              </>
            );
            return (
              <div className="tcard" key={i}>
                <p>{t.quote}</p>
                {t.refSlug ? (
                  <Link className="who" href={`${base}/${t.refSlug}`}>
                    {who}
                  </Link>
                ) : (
                  <div className="who">{who}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
