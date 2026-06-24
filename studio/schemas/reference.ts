import { defineArrayMember, defineField, defineType } from "sanity";

// Harita eşleşmesi için ülke adları prototipteki Türkçe yazımla BİREBİR aynı olmalı.
export const COUNTRY_OPTIONS = [
  "Türkiye", "ABD", "Meksika", "Brezilya", "Arjantin", "Uruguay",
  "Almanya", "Birleşik Krallık", "Fransa", "İtalya", "İspanya", "Hollanda",
  "Belçika", "İsviçre", "Avusturya", "İrlanda", "Polonya", "Romanya",
  "Bulgaristan", "Moldova", "Ukrayna", "Kıbrıs",
  "Birleşik Arap Emirlikleri", "Katar", "İran", "Mısır", "Nijerya", "Kenya", "Güney Afrika",
  "Rusya", "Çin", "Kazakistan", "Özbekistan", "Pakistan", "Nepal", "Bangladeş",
  "Tayland", "Vietnam", "Kamboçya", "Malezya", "Singapur", "Endonezya", "Yeni Zelanda",
];

export default defineType({
  name: "clientReference",
  title: "Reference / Referans",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name / Marka adı", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "sector_tr", title: "Sector (TR) / Sektör", type: "string" }),
    defineField({ name: "sector_en", title: "Sector (EN)", type: "string" }),
    defineField({
      name: "countries",
      title: "Countries / Ülkeler (haritada boyanır)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: COUNTRY_OPTIONS.map((c) => ({ title: c, value: c })) },
    }),
    defineField({ name: "blurb_tr", title: "Blurb (TR) / Kısa (popup)", type: "text", rows: 2 }),
    defineField({ name: "blurb_en", title: "Blurb (EN)", type: "text", rows: 2 }),
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
    defineField({ name: "featured", title: "Featured / Öne çıkan", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order / Sıra", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "sector_tr", media: "logo" } },
});
