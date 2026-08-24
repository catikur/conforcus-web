import { sanityClient, sanityConfigured } from "./sanity";
import { POST_QUERY, POSTS_QUERY, SLUGS_QUERY } from "./sanity.queries";
import { SAMPLE_POSTS, type PTBlock, type SamplePost } from "./blogSamples";
import type { Locale } from "./i18n";
import type { SeoOverride } from "./seo";
import type { Faq } from "@/components/FaqList";

export type PostAuthor = { name: string; role?: string; photoUrl?: string; photoAlt?: string };
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  publishedAt: string;
  coverUrl?: string;
  coverAlt?: string;
  author?: PostAuthor;
  readMins?: number;
  isSample: boolean;
  noIndex: boolean;
  seo?: SeoOverride;
};
export type PostFull = PostCard & { body: PTBlock[]; faqs?: Faq[] };

type RawAuthor = {
  name?: string;
  role?: string;
  role_tr?: string;
  role_en?: string;
  photoUrl?: string;
  photoAlt?: string;
} | null;
type RawCard = {
  slug: string;
  title_tr?: string;
  title_en?: string;
  excerpt_tr?: string;
  excerpt_en?: string;
  category?: string;
  publishedAt?: string;
  coverUrl?: string;
  coverAlt?: string;
  noIndex?: boolean;
  seoTitle?: string;
  seoTitle_en?: string;
  seoDesc?: string;
  seoDesc_en?: string;
  seoImage?: string;
  author?: RawAuthor;
};
type RawFull = RawCard & {
  body_tr?: PTBlock[];
  body_en?: PTBlock[];
  faqs?: { question_tr?: string; question_en?: string; answer_tr?: string; answer_en?: string }[];
};

const loc = (locale: Locale, tr?: string, en?: string) => (locale === "tr" ? tr : en) || tr || en || "";
const mapAuthor = (a: RawAuthor, locale: Locale): PostAuthor | undefined =>
  a?.name
    ? {
        name: a.name,
        role: loc(locale, a.role_tr || a.role, a.role_en || a.role),
        photoUrl: a.photoUrl,
        photoAlt: a.photoAlt,
      }
    : undefined;

function isBlocked(slug: string, noIndex?: boolean) {
  return slug === "testing" || !!noIndex;
}

function rawToCard(r: RawCard, locale: Locale): PostCard {
  const noIndex = isBlocked(r.slug, r.noIndex);
  return {
    slug: r.slug,
    title: loc(locale, r.title_tr, r.title_en),
    excerpt: loc(locale, r.excerpt_tr, r.excerpt_en),
    category: r.category,
    publishedAt: r.publishedAt || "",
    coverUrl: r.coverUrl,
    coverAlt: r.coverAlt,
    author: mapAuthor(r.author || null, locale),
    isSample: false,
    noIndex,
    seo: {
      title: locale === "tr" ? r.seoTitle : r.seoTitle_en,
      description: locale === "tr" ? r.seoDesc : r.seoDesc_en,
      image: r.seoImage,
      noIndex,
    },
  };
}
function rawToFull(r: RawFull, locale: Locale): PostFull {
  const faqs = (r.faqs || [])
    .filter((f) => f.question_tr || f.question_en)
    .map((f) => ({
      q: { tr: f.question_tr || f.question_en || "", en: f.question_en || f.question_tr || "" },
      a: { tr: f.answer_tr || f.answer_en || "", en: f.answer_en || f.answer_tr || "" },
    }));
  return {
    ...rawToCard(r, locale),
    body: (locale === "tr" ? r.body_tr : r.body_en) || r.body_tr || r.body_en || [],
    faqs,
  };
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
    noIndex: false,
  };
}
function sampleToFull(s: SamplePost, locale: Locale): PostFull {
  return { ...sampleToCard(s, locale), body: s.body[locale] };
}

// Kod içinde tutulan editoryal makaleler — Sanity'den bağımsız GERÇEK içerik
// (lib/blogSamples.ts). "sample" adı tarihsel; bunlar yayınlanabilir yazılardır.
function editorialCards(locale: Locale): PostCard[] {
  return SAMPLE_POSTS.filter((s) => s.slug !== "testing").map((s) => sampleToCard(s, locale));
}

export async function getPosts(locale: Locale): Promise<PostCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const data: RawCard[] = await sanityClient.fetch(POSTS_QUERY);
      const live = (data || []).map((d) => rawToCard(d, locale)).filter((p) => !p.noIndex && p.slug !== "testing");
      if (live.length) {
        // Sanity yazıları + editoryal makaleler birlikte (slug çakışırsa Sanity kazanır).
        const have = new Set(live.map((c) => c.slug));
        return [...live, ...editorialCards(locale).filter((c) => !have.has(c.slug))].sort((a, b) =>
          (b.publishedAt || "").localeCompare(a.publishedAt || "")
        );
      }
    } catch {
      /* geri-dönüş */
    }
  }
  return editorialCards(locale);
}

export async function getPost(locale: Locale, slug: string): Promise<PostFull | null> {
  if (slug === "testing") {
    // Unpublished-or-noindex path: hide test post from the public site.
    if (sanityConfigured && sanityClient) {
      try {
        const d: RawFull | null = await sanityClient.fetch(POST_QUERY, { slug });
        if (d) {
          const full = rawToFull(d, locale);
          full.noIndex = true;
          if (full.seo) full.seo.noIndex = true;
          return full;
        }
      } catch {
        /* 404 */
      }
    }
    return null;
  }
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
      const live = (s || []).filter((x) => x && x !== "testing");
      if (live.length) {
        const extra = SAMPLE_POSTS.filter((p) => p.slug !== "testing" && !live.includes(p.slug)).map((p) => p.slug);
        return [...live, ...extra];
      }
    } catch {
      /* geri-dönüş */
    }
  }
  return SAMPLE_POSTS.filter((p) => p.slug !== "testing").map((p) => p.slug);
}
