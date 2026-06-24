import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "jobPosting",
  title: "Job Posting / İş İlanı",
  type: "document",
  fields: [
    defineField({ name: "title_tr", title: "Title (TR) / Pozisyon", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "location", title: "Location / Konum", type: "string" }),
    defineField({
      name: "body_tr",
      title: "Body (TR) / İlan metni",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "body_en",
      title: "Body (EN)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({ name: "active", title: "Active / Yayında", type: "boolean", initialValue: true }),
    defineField({ name: "applyEmail", title: "Apply Email / Başvuru e-posta", type: "string" }),
    defineField({ name: "applyUrl", title: "Apply URL / Başvuru linki", type: "url" }),
    defineField({ name: "order", title: "Order / Sıra", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title_tr", subtitle: "location" } },
});
