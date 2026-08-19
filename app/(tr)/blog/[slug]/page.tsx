import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { ArticleJsonLd, PostBreadcrumbJsonLd } from "@/components/JsonLd";
import { getPost, getPostSlugs } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost("tr", params.slug);
  if (!post) return { title: "Blog — Conforcus", robots: { index: false, follow: false } };
  return buildMetadata({
    locale: "tr",
    title: post.seo?.title || `${post.title} — Conforcus`,
    description: post.seo?.description || post.excerpt,
    path: `/blog/${post.slug}`,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    languages: {
      tr: `${SITE_URL}/blog/${post.slug}`,
      en: `${SITE_URL}/en/blog/${post.slug}`,
      "x-default": `${SITE_URL}/blog/${post.slug}`,
    },
    noIndex: post.noIndex,
    image: post.seo?.image || post.coverUrl,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost("tr", params.slug);
  if (!post) notFound();
  return (
    <>
      {post.noIndex ? null : (
        <ArticleJsonLd
          locale="tr"
          title={post.title}
          excerpt={post.excerpt}
          slug={post.slug}
          publishedAt={post.publishedAt}
          authorName={post.author?.name}
          coverUrl={post.coverUrl}
        />
      )}
      <PostBreadcrumbJsonLd locale="tr" title={post.title} slug={post.slug} />
      <BlogPostPage locale="tr" post={post} />
    </>
  );
}
