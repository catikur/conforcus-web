import { sanityClient, sanityConfigured } from "./sanity";
import { POST_QUERY, POSTS_QUERY, SLUGS_QUERY } from "./sanity.queries";
import { SAMPLE_POSTS, type PTBlock, type SamplePost } from "./blogSamples";
import type { Locale } from "./i18n";

export type PostAuthor = { name: string; role?: string; photoUrl?: string };
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  coverUrl?: string;
  author?: PostAuthor;
  readMins?: number;
  isSample: boolean;
};
export type PostFull = PostCard & { body: PTBlock[] };

type RawAuthor = { name?: string; role?: string; photoUrl?: string } | null;
type RawCard = {
  slug: string;
  title_tr?: string;
  title_en?: string;
  excerpt_tr?: string;
  excerpt_en?: string;
  category?: string;
  publishedAt?: string;
  coverUrl?: string;
  author?: RawAuthor;
};
type RawFull = RawCard & { body_tr?: PTBlock[]; body_en?: PTBlock[] };

const loc = (locale: Locale, tr?: string, en?: string) => (locale === "tr" ? tr : en) || tr || en || "";
const mapAuthor = (a: RawAuthor): PostAuthor | undefined => (a?.name ? { name: a.name, role: a.role, photoUrl: a.photoUrl } : undefined);

function rawToCard(r: RawCard, locale: Locale): PostCard {
  return {
    slug: r.slug,
    title: loc(locale, r.title_tr, r.title_en),
    excerpt: loc(locale, r.excerpt_tr, r.excerpt_en),
    category: r.category,
    publishedAt: r.publishedAt || "",
    coverUrl: r.coverUrl,
    author: mapAuthor(r.author || null),
    isSample: false,
  };
}
function rawToFull(r: RawFull, locale: Locale): PostFull {
  return { ...rawToCard(r, locale), body: (locale === "tr" ? r.body_tr : r.body_en) || r.body_tr || r.body_en || [] };
}
function sampleToCard(s: SamplePost, locale: Locale): PostCard {
  return {
    slug: s.slug,
    title: s.title[locale],
    excerpt: s.excerpt[locale],
    category: s.category,
    publishedAt: s.publishedAt,
    readMins: s.readMins,
    author: { name: s.author.name, role: locale === "tr" ? s.author.role_tr : s.author.role_en },
    isSample: true,
  };
}
function sampleToFull(s: SamplePost, locale: Locale): PostFull {
  return { ...sampleToCard(s, locale), body: s.body[locale] };
}

export async function getPosts(locale: Locale): Promise<PostCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const data: RawCard[] = await sanityClient.fetch(POSTS_QUERY);
      if (data?.length) return data.map((d) => rawToCard(d, locale));
    } catch {
      /* geri-dönüş */
    }
  }
  return SAMPLE_POSTS.map((s) => sampleToCard(s, locale));
}

export async function getPost(locale: Locale, slug: string): Promise<PostFull | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawFull | null = await sanityClient.fetch(POST_QUERY, { slug });
      if (d) return rawToFull(d, locale);
    } catch {
      /* geri-dönüş */
    }
  }
  const s = SAMPLE_POSTS.find((p) => p.slug === slug);
  return s ? sampleToFull(s, locale) : null;
}

export async function getPostSlugs(): Promise<string[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const s: string[] = await sanityClient.fetch(SLUGS_QUERY);
      if (s?.length) return s;
    } catch {
      /* geri-dönüş */
    }
  }
  return SAMPLE_POSTS.map((p) => p.slug);
}
