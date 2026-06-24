// Sanity seed üretici: 48 çözüm + 23 referansı NDJSON'a yazar.
// Çalıştır:  node scripts/gen-seed.ts   (Node 22+ TS type-stripping)
// İçe aktar: cd studio && npx sanity dataset import ../studio/seed/seed.ndjson production
import { writeFileSync, mkdirSync } from "node:fs";
import { SOLUTIONS, REFS } from "../lib/data.ts";
import { slugify } from "../lib/slug.ts";

const FIN = ["FI", "CO", "PS", "FM"];
const lines: string[] = [];

SOLUTIONS.forEach((s, i) => {
  const slug = slugify(s.en);
  lines.push(
    JSON.stringify({
      _id: `solution-${slug}`,
      _type: "solution",
      name_tr: s.tr,
      name_en: s.en,
      module: s.m,
      group: FIN.includes(s.m) ? "fin" : "log",
      slug: { _type: "slug", current: slug },
      featured: false,
      order: i,
    })
  );
});

REFS.forEach((r, i) => {
  const slug = slugify(r.n);
  lines.push(
    JSON.stringify({
      _id: `reference-${slug}`,
      _type: "reference",
      name: r.n,
      slug: { _type: "slug", current: slug },
      sector_tr: r.s,
      sector_en: r.se,
      countries: [],
      featured: false,
      order: i,
    })
  );
});

mkdirSync(new URL("../studio/seed/", import.meta.url), { recursive: true });
const out = new URL("../studio/seed/seed.ndjson", import.meta.url);
writeFileSync(out, lines.join("\n") + "\n");
console.log(`seed.ndjson yazıldı: ${SOLUTIONS.length} çözüm + ${REFS.length} referans = ${lines.length} doküman`);
