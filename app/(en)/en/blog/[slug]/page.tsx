import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { ArticleJsonLd, PostBreadcrumbJsonLd } from "@/components/JsonLd";
import { getPost, getPostSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/i18n";

export const revalidate = 60; // ISR
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost("en", params.slug);
  if (!post) return { title: "Blog — Conforcus" };
  const url = `${SITE_URL}/en/blog/${post.slug}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} — Conforcus`,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/blog/${post.slug}`,
        en: `${SITE_URL}/en/blog/${post.slug}`,
        "x-default": `${SITE_URL}/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      siteName: "Conforcus",
      locale: "en_US",
      images: [post.coverUrl || `${SITE_URL}/og`],
      publishedTime: post.publishedAt,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.coverUrl || `${SITE_URL}/og`] },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost("en", params.slug);
  if (!post) notFound();
  return (
    <>
      <ArticleJsonLd
        locale="en"
        title={post.title}
        excerpt={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        authorName={post.author?.name}
        coverUrl={post.coverUrl}
      />
      <PostBreadcrumbJsonLd locale="en" title={post.title} slug={post.slug} />
      <BlogPostPage locale="en" post={post} />
    </>
  );
}
