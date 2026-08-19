import { sanityClient, sanityConfigured } from "./sanity";
import { REFERENCE_QUERY, REFERENCE_SLUGS_QUERY, REFERENCES_QUERY } from "./sanity.queries";
import { REFS, type Ref } from "./data";
import { slugify } from "./slug";
import type { Locale } from "./i18n";
import type { PTBlock } from "./blogSamples";
import { CASE_FALLBACKS, caseBySlug } from "./casePages";
import type { SeoOverride } from "./seo";

export type RefCard = {
  slug: string;
  name: string;
  sector: string;
  countries: string[];
  blurb: string;
  logoUrl?: string;
  logoAlt?: string;
  featured: boolean;
  noIndex?: boolean;
  hasBody?: boolean;
};
export type RefTestimonial = { quote: string; person: string; role?: string; company?: string };
export type RefFull = RefCard & { body: PTBlock[]; testimonials: RefTestimonial[]; seo?: SeoOverride };

type RawRef = {
  slug: string;
  name: string;
  sector_tr?: string;
  sector_en?: string;
  countries?: string[];
  blurb_tr?: string;
  blurb_en?: string;
  featured?: boolean;
  logoUrl?: string;
  logoAlt?: string;
  noIndex?: boolean;
  hasBody?: boolean;
};
type RawRefFull = RawRef & {
  body_tr?: PTBlock[];
  body_en?: PTBlock[];
  seoTitle?: string;
  seoDesc?: string;
  seoDesc_en?: string;
  testimonials?: { quote_tr?: string; quote_en?: string; person: string; role?: string; role_tr?: string; role_en?: string; company?: string }[];
};

const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

function rawToCard(r: RawRef, l: Locale): RefCard {
  const fb = caseBySlug(r.slug);
  return {
    slug: r.slug,
    name: r.name,
    sector: loc(l, r.sector_tr, r.sector_en) || (fb ? fb.sector[l] : ""),
    countries: r.countries?.length ? r.countries : fb?.countries || [],
    blurb: loc(l, r.blurb_tr, r.blurb_en) || (fb ? fb.blurb[l] : ""),
    logoUrl: r.logoUrl,
    logoAlt: r.logoAlt,
    featured: !!r.featured,
    noIndex: !!r.noIndex,
    hasBody: !!r.hasBody || !!fb,
  };
}
function fallbackCard(r: Ref, l: Locale): RefCard {
  const fb = caseBySlug(slugify(r.n));
  return {
    slug: slugify(r.n),
    name: r.n,
    sector: l === "tr" ? r.s : r.se,
    countries: fb?.countries || [],
    blurb: fb ? fb.blurb[l] : "",
    featured: false,
    hasBody: !!fb,
  };
}

function mergeCaseFallbacks(cards: RefCard[], l: Locale): RefCard[] {
  const have = new Set(cards.map((c) => c.slug));
  const extra: RefCard[] = CASE_FALLBACKS.filter((c) => !have.has(c.slug)).map((c) => ({
    slug: c.slug,
    name: c.name,
    sector: c.sector[l],
    countries: c.countries,
    blurb: c.blurb[l],
    featured: true,
    hasBody: true,
  }));
  return [...cards, ...extra];
}

export async function getReferences(l: Locale): Promise<RefCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawRef[] = await sanityClient.fetch(REFERENCES_QUERY);
      if (d?.length) return mergeCaseFallbacks(d.map((x) => rawToCard(x, l)), l);
    } catch {
      /* fallback */
    }
  }
  return mergeCaseFallbacks(REFS.map((r) => fallbackCard(r, l)), l);
}

export async function getReference(l: Locale, slug: string): Promise<RefFull | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawRefFull | null = await sanityClient.fetch(REFERENCE_QUERY, { slug });
      if (d) {
        const fb = caseBySlug(slug);
        const body = (l === "tr" ? d.body_tr : d.body_en) || d.body_tr || d.body_en || [];
        const useBody = body.length && (d.hasBody || !fb) ? body : fb ? fb.body[l] : body;
        return {
          ...rawToCard(d, l),
          body: useBody,
          seo: {
            title: d.seoTitle,
            description: l === "tr" ? d.seoDesc : d.seoDesc_en,
            noIndex: !!d.noIndex,
          },
          testimonials: (d.testimonials || []).map((t) => ({
            quote: loc(l, t.quote_tr, t.quote_en),
            person: t.person,
            role: loc(l, t.role_tr || t.role, t.role_en || t.role),
            company: t.company,
          })),
        };
      }
    } catch {
      /* fallback */
    }
  }
  const fb = caseBySlug(slug);
  if (fb) {
    return {
      slug: fb.slug,
      name: fb.name,
      sector: fb.sector[l],
      countries: fb.countries,
      blurb: fb.blurb[l],
      featured: true,
      hasBody: true,
      body: fb.body[l],
      testimonials: [],
    };
  }
  const r = REFS.find((x) => slugify(x.n) === slug);
  return r ? { ...fallbackCard(r, l), body: [], testimonials: [] } : null;
}

export async function getReferenceSlugs(): Promise<string[]> {
  const refs = await getReferences("tr");
  return refs.map((r) => r.slug);
}

export async function getReferencesByCountry(l: Locale): Promise<Record<string, RefCard[]>> {
  const out: Record<string, RefCard[]> = {};
  const list = await getReferences(l);
  list.forEach((r) => {
    r.countries.forEach((c) => {
      (out[c] ||= []).push(r);
    });
  });
  return out;
}
