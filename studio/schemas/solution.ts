import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "solution",
  title: "Solution / Çözüm",
  type: "document",
  fields: [
    defineField({ name: "name_tr", title: "Name (TR) / Ad", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name_en", title: "Name (EN)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "module",
      title: "Module / Modül",
      type: "string",
      options: { list: ["FI", "CO", "MM", "SD", "PS", "FM"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "group",
      title: "Group / Grup",
      type: "string",
      options: { list: [{ title: "Finans", value: "fin" }, { title: "Lojistik", value: "log" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name_en", maxLength: 96 } }),
    defineField({ name: "short_tr", title: "Short (TR) / Kısa açıklama", type: "text", rows: 2 }),
    defineField({ name: "short_en", title: "Short (EN)", type: "text", rows: 2 }),
    defineField({
      name: "body_tr",
      title: "Body (TR) / Detay",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "featured", title: "Featured / Ana sayfa tabında göster", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order / Sıra", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name_tr", subtitle: "module" } },
});
