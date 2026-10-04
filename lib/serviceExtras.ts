import data from "@/content/service-extras.json";
import type { Bi } from "./i18n";

// Hizmet sayfalarının ek bölümleri (kapsam, SLA modeli, sahadan örnekler).
export type ServiceExtra = {
  sections: { h2: Bi; paras: Bi[]; bullets: Bi[] }[];
  caseSlugs: string[];
};

export const SERVICE_EXTRAS = data as unknown as Record<string, ServiceExtra>;
