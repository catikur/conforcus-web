import { defineField, defineType } from "sanity";
import { portableText } from "./objects";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title_tr", title: "Title (TR)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en" } }),
    defineField({ name: "body_tr", title: "Body (TR)", type: "array", of: portableText }),
    defineField({ name: "body_en", title: "Body (EN)", type: "array", of: portableText }),
    defineField({ name: "faqs", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: { title: "title_tr" } },
});
