import { defineField, defineType } from "sanity";
import { imageWithAlt, portableText } from "./objects";

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
    defineField({ name: "body_tr", title: "Body (TR) / İçerik", type: "array", of: portableText }),
    defineField({ name: "body_en", title: "Body (EN)", type: "array", of: portableText }),
    imageWithAlt("coverImage", "Cover Image / Kapak"),
    defineField({ name: "author", title: "Author / Yazar", type: "reference", to: [{ type: "author" }] }),
    defineField({
      name: "category",
      title: "Category / Kategori",
      type: "string",
      options: { list: ["S/4HANA", "Global Rollout", "Confiq AI", "SAP Destek", "Genel"] },
    }),
    defineField({ name: "publishedAt", title: "Published At / Yayın Tarihi", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "faqs", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  orderings: [{ title: "Published (newest)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title_tr", subtitle: "category", media: "coverImage" } },
});
