import Link from "next/link";
import PortableBody from "@/components/PortableBody";
import { type PostFull } from "@/lib/blog";
import { pathFor, pick, type Locale } from "@/lib/i18n";

function fmtDate(iso: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      new Date(iso)
    );
  } catch {
    return iso;
  }
}

export default function BlogPostPage({ locale, post }: { locale: Locale; post: PostFull }) {
  const meta = [post.author?.name, post.publishedAt ? fmtDate(post.publishedAt, locale) : "", post.readMins ? pick(locale, `${post.readMins} dk okuma`, `${post.readMins} min read`) : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <main data-page="blog" className="active" id="main" tabIndex={-1}>
      <article>
        <div className="phero">
          <div className="wrap" style={{ maxWidth: 780 }}>
            <Link href={pathFor("blog", locale)} className="mega-cta" style={{ display: "inline-block", marginBottom: 18 }}>
              {pick(locale, "← Tüm yazılar", "← All posts")}
            </Link>
            {post.category ? (
              <div className="eyebrow" style={{ marginBottom: 4 }}>
                {post.category}
              </div>
            ) : null}
            <h1>{post.title}</h1>
            {post.excerpt ? <p className="lead">{post.excerpt}</p> : null}
            {meta ? (
              <p style={{ marginTop: 14, fontSize: 13.5, color: "var(--mute)", fontWeight: 500 }}>{meta}</p>
            ) : null}
          </div>
        </div>

        {post.coverUrl ? (
          <div className="wrap" style={{ maxWidth: 900, marginTop: 36 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverUrl} alt={post.title} style={{ width: "100%", borderRadius: 12, border: "1px solid var(--line)" }} />
          </div>
        ) : null}

        <section style={{ padding: "44px 0 80px" }}>
          <div className="wrap" style={{ maxWidth: 780 }}>
            <PortableBody value={post.body} />
            <div style={{ marginTop: 48, paddingTop: 28, borderTop: "1px solid var(--line)" }}>
              <Link className="btn btn-p" href={pathFor("analiz", locale)}>
                {pick(locale, "Ücretsiz SAP Analizi", "Free SAP Analysis")}
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
