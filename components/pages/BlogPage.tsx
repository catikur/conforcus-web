import Link from "next/link";
import { getPosts, type PostCard } from "@/lib/blog";
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

function metaText(post: PostCard, locale: Locale): string {
  if (post.isSample) {
    const mins = post.readMins ?? 5;
    return pick(locale, `Örnek içerik · ${mins} dk okuma`, `Sample content · ${mins} min read`);
  }
  const parts = [post.category, post.publishedAt ? fmtDate(post.publishedAt, locale) : ""].filter(Boolean);
  return parts.join(" · ");
}

export default async function BlogPage({ locale }: { locale: Locale }) {
  const posts = await getPosts(locale);
  const base = pathFor("blog", locale);
  const anySample = posts.some((p) => p.isSample);

  return (
    <main data-page="blog" className="active" id="main" tabIndex={-1}>
      <div className="phero">
        <div className="wrap">
          <div className="eyebrow">{pick(locale, "İçgörüler", "Insights")}</div>
          <h1>Blog</h1>
          <p className="lead">
            {pick(
              locale,
              "SAP dünyasından güncel gelişmeler, mevzuat değişiklikleri ve ekibimizin saha deneyimleri.",
              "Updates from the SAP world, regulatory changes, and field experience from our team."
            )}
          </p>
        </div>
      </div>

      <section style={{ padding: "50px 0 70px" }}>
        <div className="wrap">
          <div className="bgrid">
            {posts.map((post) => (
              <Link className="bpost" href={`${base}/${post.slug}`} key={post.slug}>
                <div
                  className="bimg"
                  style={
                    post.coverUrl
                      ? { backgroundImage: `url(${post.coverUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
                      : undefined
                  }
                />
                <div className="bbody">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  <small>{metaText(post, locale)}</small>
                </div>
              </Link>
            ))}
          </div>
          {anySample && (
            <p className="note" style={{ textAlign: "center" }}>
              {pick(
                locale,
                "* Blog içerikleri örnektir; Sanity CMS bağlandığında gerçek yazılarla değişecek.",
                "* Posts are placeholders; they will be replaced with real content once Sanity CMS is connected."
              )}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
