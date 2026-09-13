/* Modül/grup sabitleri — İSTEMCİ-GÜVENLİ (sunucu importu yok).
   "use client" bileşenleri buradan alır; lib/solutions.ts sunucu tarafı için
   aynı tanımları yeniden dışa aktarır. */

export type SolGroup = "fin" | "log" | "edon";

// Modül rozeti için görünen ad: SAP modülleri kısa kodla, E-Çözümler açık adla.
export const MODULE_LABEL: Record<string, string> = { E: "E-ÇÖZÜM" };
export const modLabel = (m: string) => MODULE_LABEL[m] || m;
