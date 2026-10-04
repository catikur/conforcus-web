import data from "@/content/expertise.json";
import type { Bi } from "./i18n";
import type { Faq } from "@/components/FaqList";

// "Modül uzmanlığı" sayfası — içerik content/expertise.json'da (kaynak: şirket bilgi
// tabanındaki modül ve teknoloji notları).
export type ExpertiseItem = {
  key: string;
  group: "finance" | "logistics" | "advanced" | "technical";
  code: string;
  name: Bi;
  intro: Bi;
  strengths: Bi[];
  solutionModule: string | null;
  solutionSlugs: string[];
  refSlugs: string[];
  proof?: Bi;
};
export type ExpertiseData = {
  page: {
    title: Bi;
    desc: Bi;
    h1: Bi;
    lead: Bi;
    groups: { key: ExpertiseItem["group"]; name: Bi; blurb: Bi }[];
    faqs: Faq[];
  };
  items: ExpertiseItem[];
};

export const EXPERTISE = data as unknown as ExpertiseData;
