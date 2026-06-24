import { sanityClient, sanityConfigured } from "./sanity";
import { SITE_SETTINGS_QUERY } from "./sanity.queries";
import type { Locale } from "./i18n";

export type HeroSettings = { title?: string; sub?: string; ctaPrimary?: string; ctaSecondary?: string };
type Raw = {
  hero_title_tr?: string;
  hero_title_en?: string;
  hero_sub_tr?: string;
  hero_sub_en?: string;
  hero_cta_primary_tr?: string;
  hero_cta_primary_en?: string;
  hero_cta_secondary_tr?: string;
  hero_cta_secondary_en?: string;
};
const pick = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en;

// Fallback: null → HomePage mevcut sabit hero'yu (gradyan dâhil) aynen kullanır.
export async function getHeroSettings(l: Locale): Promise<HeroSettings | null> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: Raw | null = await sanityClient.fetch(SITE_SETTINGS_QUERY);
      if (d && (d.hero_title_tr || d.hero_title_en)) {
        return {
          title: pick(l, d.hero_title_tr, d.hero_title_en),
          sub: pick(l, d.hero_sub_tr, d.hero_sub_en),
          ctaPrimary: pick(l, d.hero_cta_primary_tr, d.hero_cta_primary_en),
          ctaSecondary: pick(l, d.hero_cta_secondary_tr, d.hero_cta_secondary_en),
        };
      }
    } catch {
      /* fallback */
    }
  }
  return null;
}
