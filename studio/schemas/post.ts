import { defineArrayMember, defineField, defineType } from "sanity";

// CLAUDE.md: post {title_tr/en, slug, excerpt_tr/en, body_tr/en (portable text),
// coverImage, author→ref, category, publishedAt}.
export default defineType({
  name: "post",
  title: "Blog Post / Yazı",
  type: "document",
  fields: [
    defineField({ name: "title_tr", title: "Title (TR) / Başlık", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt_tr", title: "Excerpt (TR) / Özet", type: "text", rows: 3 }),
    defineField({ name: "excerpt_en", title: "Excerpt (EN)", type: "text", rows: 3 }),
    defineField({
      name: "body_tr",
      title: "Body (TR) / İçerik",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [defineArrayMember({ type: "block" }), defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "coverImage", title: "Cover Image / Kapak", type: "image", options: { hotspot: true } }),
    defineField({ name: "author", title: "Author / Yazar", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "category",
      title: "Category / Kategori",
      type: "string",
      options: { list: ["S/4HANA", "Global Rollout", "Confiq AI", "SAP Destek", "Genel"] },
    }),
    defineField({ name: "publishedAt", title: "Published At / Yayın Tarihi", type: "datetime", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Published (newest)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title_tr", subtitle: "category", media: "coverImage" } },
});
