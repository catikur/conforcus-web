import Link from "next/link";
import { getPosts, type PostCard } from "@/lib/blog";
import { pathFor, pick, type Locale } from "@/lib/i18n";
import { sanityImg, sanitySrcSet } from "@/lib/img";

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
  const parts = [post.category, post.publishedAt ? fmtDate(post.publishedAt, locale) : ""].filter(Boolean);
  if (post.readMins) parts.push(pick(locale, `${post.readMins} dk okuma`, `${post.readMins} min read`));
  return parts.join(" · ");
}

export default async function BlogPage({ locale }: { locale: Locale }) {
  const posts = await getPosts(locale);
  const base = pathFor("blog", locale);

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
          {posts.length === 0 ? (
            <p className="lead" style={{ textAlign: "center", padding: "40px 0" }}>
              {pick(
                locale,
                "İlk yazılarımız çok yakında burada olacak. Bu arada sorularınız için bize yazabilirsiniz.",
                "Our first articles will appear here shortly. In the meantime, feel free to get in touch."
              )}
            </p>
          ) : null}
          <div className="bgrid">
            {posts.map((post, i) => (
              <Link className="bpost" href={`${base}/${post.slug}`} key={post.slug}>
                <div className="bimg">
                  {post.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={sanityImg(post.coverUrl, { w: 640, h: 336, fit: "crop" })}
                      srcSet={sanitySrcSet(post.coverUrl, { w: 640, h: 336, fit: "crop" })}
                      alt=""
                      width={640}
                      height={336}
                      loading={i < 3 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  ) : null}
                </div>
                <div className="bbody">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <small>{metaText(post, locale)}</small>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
