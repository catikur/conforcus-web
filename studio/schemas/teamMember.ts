import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./objects";

// Ekip / uzman kadrosu — /ekip ve /en/team sayfalarını besler, Person JSON-LD üretir.
// Fotoğraf yoksa site baş harflerden bir avatar gösterir; sayfa yine de yayınlanabilir.
export default defineType({
  name: "teamMember",
  title: "Team Member / Ekip Üyesi",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Ad Soyad", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role_tr", title: "Unvan (TR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role_en", title: "Unvan (EN)", type: "string" }),
    imageWithAlt("photo", "Fotoğraf (kare, en az 600×600)"),
    defineField({
      name: "bio_tr",
      title: "Kısa biyografi (TR)",
      type: "text",
      rows: 4,
      description: "2–3 cümle. Uzmanlık alanı ve deneyim yılı arama motorları için değerlidir.",
    }),
    defineField({ name: "bio_en", title: "Kısa biyografi (EN)", type: "text", rows: 4 }),
    defineField({
      name: "expertise",
      title: "Uzmanlık alanları",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["FI", "CO", "MM", "SD", "PS", "FM", "ABAP", "Fiori", "S/4HANA", "Global Rollout", "AMS", "Confiq AI"] },
    }),
    defineField({ name: "linkedin", title: "LinkedIn profili", type: "url" }),
    defineField({ name: "email", title: "E-posta", type: "string" }),
    defineField({
      name: "featured",
      title: "Ana sayfada / öne çıkanlarda göster",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "order", title: "Sıra", type: "number" }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role_tr", media: "photo" } },
});
