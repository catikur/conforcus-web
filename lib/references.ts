import { sanityClient, sanityConfigured } from "./sanity";
import { REFERENCE_QUERY, REFERENCE_SLUGS_QUERY, REFERENCES_QUERY } from "./sanity.queries";
import { REFS, type Ref } from "./data";
import { slugify } from "./slug";
import type { Locale } from "./i18n";
import type { PTBlock } from "./blogSamples";

export type RefCard = {
  slug: string;
  name: string;
  sector: string;
  countries: string[];
  blurb: string;
  logoUrl?: string;
  featured: boolean;
};
export type RefTestimonial = { quote: string; person: string; role?: string; company?: string };
export type RefFull = RefCard & { body: PTBlock[]; testimonials: RefTestimonial[] };

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
};
type RawRefFull = RawRef & {
  body_tr?: PTBlock[];
  body_en?: PTBlock[];
  testimonials?: { quote_tr?: string; quote_en?: string; person: string; role?: string; company?: string }[];
};

const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

function rawToCard(r: RawRef, l: Locale): RefCard {
  return {
    slug: r.slug,
    name: r.name,
    sector: loc(l, r.sector_tr, r.sector_en),
    countries: r.countries || [],
    blurb: loc(l, r.blurb_tr, r.blurb_en),
    logoUrl: r.logoUrl,
    featured: !!r.featured,
  };
}
function fallbackCard(r: Ref, l: Locale): RefCard {
  return { slug: slugify(r.n), name: r.n, sector: l === "tr" ? r.s : r.se, countries: [], blurb: "", featured: false };
}

export async function getReferences(l: Locale): Promise<RefCard[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawRef[] = await sanityClient.fetch(REFERENCES_QUERY);
      if (d?.length) return d.map((x) => rawToCard(x, l));
    } catch {
      /* fallback */
    }
  }
  return REFS.map((r) => fallbackCard(r, l));
}

export async function getReference(l: Locale, slug: string): Promise<RefFull | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawRefFull | null = await sanityClient.fetch(REFERENCE_QUERY, { slug });
      if (d) {
        return {
          ...rawToCard(d, l),
          body: (l === "tr" ? d.body_tr : d.body_en) || d.body_tr || d.body_en || [],
          testimonials: (d.testimonials || []).map((t) => ({
            quote: loc(l, t.quote_tr, t.quote_en),
            person: t.person,
            role: t.role,
            company: t.company,
          })),
        };
      }
    } catch {
      /* fallback */
    }
  }
  const r = REFS.find((x) => slugify(x.n) === slug);
  return r ? { ...fallbackCard(r, l), body: [], testimonials: [] } : null;
}

export async function getReferenceSlugs(): Promise<string[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const s: string[] = await sanityClient.fetch(REFERENCE_SLUGS_QUERY);
      if (s?.length) return s;
    } catch {
      /* fallback */
    }
  }
  return REFS.map((r) => slugify(r.n));
}

// country (Türkçe ad) -> o ülkede projesi olan referanslar. Fallback boş → harita
// metni korunur (mevcut davranış). Sanity'de countries[] dolunca logolar belirir.
export async function getReferencesByCountry(l: Locale): Promise<Record<string, RefCard[]>> {
  const out: Record<string, RefCard[]> = {};
  if (sanityConfigured && sanityClient) {
    try {
      const d: RawRef[] = await sanityClient.fetch(REFERENCES_QUERY);
      d.forEach((r) => {
        (r.countries || []).forEach((c) => {
          (out[c] ||= []).push(rawToCard(r, l));
        });
      });
    } catch {
      /* fallback boş */
    }
  }
  return out;
}
