import { sanityClient, sanityConfigured } from "./sanity";
import { SOLUTION_QUERY, SOLUTION_SLUGS_QUERY, SOLUTIONS_QUERY } from "./sanity.queries";
import { HOME_PRODUCTS, SOLUTIONS } from "./data";
import { slugify } from "./slug";
import type { Locale } from "./i18n";
import type { PTBlock } from "./blogSamples";
import { PRODUCT_PAGES, PRODUCT_SLUG_SET } from "./productPages";
import type { Faq } from "@/components/FaqList";
import type { SeoOverride } from "./seo";

export type SolGroup = "fin" | "log";
export type SolutionCard = {
  slug: string;
  name: string;
  module: string;
  group: SolGroup;
  short: string;
  featured: boolean;
  noIndex: boolean;
  hasBody: boolean;
};
export type SolutionFull = SolutionCard & {
  body: PTBlock[];
  faqs?: Faq[];
  seo?: SeoOverride;
};

const FIN_MODULES = ["FI", "CO", "PS", "FM"];
const groupFor = (m: string): SolGroup => (FIN_MODULES.includes(m) ? "fin" : "log");
const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

type RawSol = {
  slug?: string;
  name_tr: string;
  name_en: string;
  module: string;
  group: SolGroup;
  short_tr?: string;
  short_en?: string;
  featured?: boolean;
  noIndex?: boolean;
  hasBody?: boolean;
};
type RawFaq = { question_tr?: string; question_en?: string; answer_tr?: string; answer_en?: string };
type RawSolFull = RawSol & {
  body_tr?: PTBlock[];
  body_en?: PTBlock[];
  faqs?: RawFaq[];
  seoTitle?: string;
  seoTitle_en?: string;
  seoDesc?: string;
  seoDesc_en?: string;
};

function isThin(slug: string, hasBody?: boolean, noIndex?: boolean) {
  if (PRODUCT_SLUG_SET.has(slug)) return false;
  if (noIndex) return true;
  return !hasBody;
}

function rawToCard(s: RawSol, l: Locale): SolutionCard {
  const slug = s.slug || slugify(s.name_en);
  const pack = PRODUCT_PAGES[slug];
  return {
    slug,
    name: pack ? (l === "tr" ? pack.name.tr : pack.name.en) : l === "tr" ? s.name_tr : s.name_en,
    module: s.module,
    group: s.group,
    short: pack ? (l === "tr" ? pack.short.tr : pack.short.en) : loc(l, s.short_tr, s.short_en),
    featured: !!s.featured,
    noIndex: isThin(slug, s.hasBody, s.noIndex),
    hasBody: PRODUCT_SLUG_SET.has(slug) || !!s.hasBody,
  };
}

function fallbackCard(s: (typeof SOLUTIONS)[number], l: Locale): SolutionCard {
  const slug = slugify(s.en);
  const pack = PRODUCT_PAGES[slug];
  return {
    slug,
    name: pack ? (l === "tr" ? pack.name.tr : pack.name.en) : l === "tr" ? s.tr : s.en,
    module: s.m,
    group: groupFor(s.m),
    short: pack ? (l === "tr" ? pack.short.tr : pack.short.en) : "",
    featured: false,
    noIndex: !PRODUCT_SLUG_SET.has(slug),
    hasBody: PRODUCT_SLUG_SET.has(slug),
  };
}

export async function getSolutions(l: Locale): Promise<SolutionCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSol[] = await sanityClient.fetch(SOLUTIONS_QUERY);
      if (d?.length) return d.map((x) => rawToCard(x, l));
    } catch {
      /* fallback */
    }
  }
  return SOLUTIONS.map((s) => fallbackCard(s, l));
}

export async function getFeaturedSolutions(l: Locale, group: SolGroup): Promise<SolutionCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSol[] = await sanityClient.fetch(SOLUTIONS_QUERY);
      if (d?.length) return d.filter((s) => s.featured && s.group === group).map((x) => rawToCard(x, l));
    } catch {
      /* fallback */
    }
  }
  return HOME_PRODUCTS.filter((h) => h.grp === group).map((h) => {
    const slug = slugify(h.en);
    const pack = PRODUCT_PAGES[slug];
    return {
      slug,
      name: pack ? (l === "tr" ? pack.name.tr : pack.name.en) : l === "tr" ? h.tr : h.en,
      module: h.m,
      group,
      short: pack ? (l === "tr" ? pack.short.tr : pack.short.en) : l === "tr" ? h.d_tr : h.d_en,
      featured: true,
      noIndex: !PRODUCT_SLUG_SET.has(slug),
      hasBody: PRODUCT_SLUG_SET.has(slug),
    };
  });
}

function mapFaqs(raw?: RawFaq[]): Faq[] | undefined {
  if (!raw?.length) return undefined;
  return raw
    .filter((f) => f.question_tr || f.question_en)
    .map((f) => ({
      q: { tr: f.question_tr || f.question_en || "", en: f.question_en || f.question_tr || "" },
      a: { tr: f.answer_tr || f.answer_en || "", en: f.answer_en || f.answer_tr || "" },
    }));
}

export async function getSolution(l: Locale, slug: string): Promise<SolutionFull | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSolFull | null = await sanityClient.fetch(SOLUTION_QUERY, { slug });
      if (d) {
        const card = rawToCard(d, l);
        return {
          ...card,
          body: (l === "tr" ? d.body_tr : d.body_en) || d.body_tr || d.body_en || [],
          faqs: mapFaqs(d.faqs),
          seo: {
            title: l === "tr" ? d.seoTitle : d.seoTitle_en,
            description: l === "tr" ? d.seoDesc : d.seoDesc_en,
            noIndex: card.noIndex,
          },
        };
      }
    } catch {
      /* fallback */
    }
  }
  // Sanity'de çözüm varsa yedek veriye düşme (bkz. lib/references.ts aynı gerekçe).
  if (sanityConfigured && sanityClient) {
    try {
      const n: number = await sanityClient.fetch(`count(*[_type == "solution"])`);
      if (n > 0) return null;
    } catch {
      /* sayım başarısızsa yedeğe izin ver */
    }
  }
  const s = SOLUTIONS.find((x) => slugify(x.en) === slug);
  if (!s && !PRODUCT_SLUG_SET.has(slug)) return null;
  if (s) {
    const card = fallbackCard(s, l);
    return { ...card, body: [] };
  }
  const pack = PRODUCT_PAGES[slug];
  if (!pack) return null;
  return {
    slug,
    name: l === "tr" ? pack.name.tr : pack.name.en,
    module: pack.module,
    group: groupFor(pack.module),
    short: l === "tr" ? pack.short.tr : pack.short.en,
    featured: false,
    noIndex: false,
    hasBody: true,
    body: [],
  };
}

export async function getSolutionSlugs(): Promise<string[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const s: string[] = await sanityClient.fetch(SOLUTION_SLUGS_QUERY);
      if (s?.length) return s;
    } catch {
      /* fallback */
    }
  }
  return SOLUTIONS.map((s) => slugify(s.en));
}
