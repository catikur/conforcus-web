import data from "@/content/sectors.json";
import type { Bi, Locale } from "./i18n";
import type { Faq } from "@/components/FaqList";

// Sektör sayfaları — içerik content/sectors.json'da (kaynak: şirket bilgi tabanındaki
// sektör notları + yayındaki referans olguları). Logo duvarı Sanity'deki referansların
// sektör etiketinden kurulur; yeni referans eklenince sayfa kendiliğinden güncellenir.
export type SectorPage = {
  key: string;
  slug: Bi;
  name: Bi;
  title: Bi;
  desc: Bi;
  h1: Bi;
  lead: Bi;
  intro: Bi[];
  challenges: { h: Bi; items: Bi[] };
  approach: { h: Bi; items: Bi[] };
  proof: Bi[];
  modules: string[];
  solutionSlugs: string[];
  sectorLabels: string[];
  refSlugs?: string[];
  caseSlugs: string[];
  faqs: Faq[];
};

export const SECTOR_PAGES = data as unknown as SectorPage[];

export function sectorBySlug(l: Locale, slug: string): SectorPage | undefined {
  return SECTOR_PAGES.find((s) => s.slug[l] === slug);
}
