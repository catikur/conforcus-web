import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title override (TR) / Başlık", type: "string", description: "Boşsa site başlığı otomatik kurar (ad + bağlam + Conforcus). Yalnız özel bir arama başlığı istiyorsanız doldurun." }),
    defineField({ name: "title_en", title: "Title override (EN)", type: "string", description: "Boşsa TR geçersiz kılma, o da boşsa otomatik başlık kullanılır." }),
    defineField({ name: "description", title: "Description (TR) / Açıklama", type: "text", rows: 3, description: "Arama sonucunda görünen açıklama; 120–158 karakter idealdir." }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Social image / Paylaşım görseli",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "noIndex", title: "noIndex — arama motorlarından gizle", type: "boolean", initialValue: false }),
  ],
});

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question_tr", title: "Question (TR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "question_en", title: "Question (EN)", type: "string" }),
    defineField({ name: "answer_tr", title: "Answer (TR)", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "answer_en", title: "Answer (EN)", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "question_tr" } },
});

export function imageWithAlt(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
  });
}

export const portableText = [
  { type: "block" },
  {
    type: "image",
    options: { hotspot: true },
    fields: [{ name: "alt", title: "Alt text", type: "string" }],
  },
];
