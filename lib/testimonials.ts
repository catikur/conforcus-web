import { sanityClient, sanityConfigured } from "./sanity";
import { FEATURED_TESTIMONIALS_QUERY, TESTIMONIALS_QUERY } from "./sanity.queries";
import type { Locale } from "./i18n";

export type Testimonial = { quote: string; person: string; role?: string; company?: string; refSlug?: string };
type Raw = { quote_tr?: string; quote_en?: string; person: string; role?: string; company?: string; refSlug?: string };
const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

export async function getTestimonials(l: Locale, featuredOnly = false): Promise<Testimonial[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: Raw[] = await sanityClient.fetch(featuredOnly ? FEATURED_TESTIMONIALS_QUERY : TESTIMONIALS_QUERY);
      if (d?.length)
        return d.map((t) => ({ quote: loc(l, t.quote_tr, t.quote_en), person: t.person, role: t.role, company: t.company, refSlug: t.refSlug }));
    } catch {
      /* fallback */
    }
  }
  // Fallback: testimonial yok → bölüm gizlenir (mevcut sayfalar değişmez).
  return [];
}
