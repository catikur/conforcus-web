import { sanityClient, sanityConfigured } from "./sanity";
import { JOBS_QUERY } from "./sanity.queries";
import type { Locale } from "./i18n";
import type { PTBlock } from "./blogSamples";

export type Job = { title: string; location?: string; body: PTBlock[]; applyEmail?: string; applyUrl?: string; isSample: boolean };
type Raw = { title_tr: string; title_en?: string; location?: string; body_tr?: PTBlock[]; body_en?: PTBlock[]; applyEmail?: string; applyUrl?: string };
const loc = (l: Locale, tr?: string, en?: string) => (l === "tr" ? tr : en) || tr || en || "";

// Fallback: mevcut ConforcusWayPage'deki 2 örnek ilan (görünüm korunur).
const FALLBACK = [
  { title_tr: "SAP FI Danışmanı", title_en: "SAP FI Consultant", location: "İstanbul" },
  { title_tr: "ABAP Geliştirici", title_en: "ABAP Developer", location: "İstanbul / Erzurum" },
];

export async function getJobs(l: Locale): Promise<Job[]> {
  if (sanityConfigured && sanityClient) {
    try {
      const d: Raw[] = await sanityClient.fetch(JOBS_QUERY);
      if (d?.length)
        return d.map((j) => ({
          title: loc(l, j.title_tr, j.title_en),
          location: j.location,
          body: (l === "tr" ? j.body_tr : j.body_en) || [],
          applyEmail: j.applyEmail,
          applyUrl: j.applyUrl,
          isSample: false,
        }));
    } catch {
      /* fallback */
    }
  }
  return FALLBACK.map((j) => ({ title: l === "tr" ? j.title_tr : j.title_en, location: j.location, body: [], isSample: true }));
}
