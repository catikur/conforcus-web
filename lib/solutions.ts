import { sanityClient, sanityConfigured } from "./sanity";
import { SOLUTION_QUERY, SOLUTION_SLUGS_QUERY, SOLUTIONS_QUERY } from "./sanity.queries";
import { HOME_PRODUCTS, SOLUTIONS } from "./data";
import { slugify } from "./slug";
import type { Locale } from "./i18n";
import type { PTBlock } from "./blogSamples";

export type SolGroup = "fin" | "log";
export type SolutionCard = { slug: string; name: string; module: string; group: SolGroup; short: string; featured: boolean };
export type SolutionFull = SolutionCard & { body: PTBlock[] };

const FIN_MODULES = ["FI", "CO", "PS", "FM"];
const groupFor = (m: string): SolGroup => (FIN_MODULES.includes(m) ? "fin" : "log");
const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

type RawSol = { slug?: string; name_tr: string; name_en: string; module: string; group: SolGroup; short_tr?: string; short_en?: string; featured?: boolean };
type RawSolFull = RawSol & { body_tr?: PTBlock[]; body_en?: PTBlock[] };

function rawToCard(s: RawSol, l: Locale): SolutionCard {
  return {
    slug: s.slug || slugify(s.name_en),
    name: l === "tr" ? s.name_tr : s.name_en,
    module: s.module,
    group: s.group,
    short: loc(l, s.short_tr, s.short_en),
    featured: !!s.featured,
  };
}

// Katalog (tüm 48): fallback = SOLUTIONS (lib/data).
export async function getSolutions(l: Locale): Promise<SolutionCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSol[] = await sanityClient.fetch(SOLUTIONS_QUERY);
      if (d?.length) return d.map((x) => rawToCard(x, l));
    } catch {
      /* fallback */
    }
  }
  return SOLUTIONS.map((s) => ({
    slug: slugify(s.en),
    name: l === "tr" ? s.tr : s.en,
    module: s.m,
    group: groupFor(s.m),
    short: "",
    featured: false,
  }));
}

// Ana sayfa Finans/Lojistik tabları: fallback = HOME_PRODUCTS (mevcut tablar aynen).
export async function getFeaturedSolutions(l: Locale, group: SolGroup): Promise<SolutionCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSol[] = await sanityClient.fetch(SOLUTIONS_QUERY);
      if (d?.length) return d.filter((s) => s.featured && s.group === group).map((x) => rawToCard(x, l));
    } catch {
      /* fallback */
    }
  }
  return HOME_PRODUCTS.filter((h) => h.grp === group).map((h) => ({
    slug: slugify(h.en),
    name: l === "tr" ? h.tr : h.en,
    module: h.m,
    group,
    short: l === "tr" ? h.d_tr : h.d_en,
    featured: true,
  }));
}

export async function getSolution(l: Locale, slug: string): Promise<SolutionFull | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawSolFull | null = await sanityClient.fetch(SOLUTION_QUERY, { slug });
      if (d) return { ...rawToCard(d, l), body: (l === "tr" ? d.body_tr : d.body_en) || d.body_tr || d.body_en || [] };
    } catch {
      /* fallback */
    }
  }
  const s = SOLUTIONS.find((x) => slugify(x.en) === slug);
  return s
    ? { slug, name: l === "tr" ? s.tr : s.en, module: s.m, group: groupFor(s.m), short: "", featured: false, body: [] }
    : null;
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
