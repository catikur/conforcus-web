import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./objects";

export default defineType({
  name: "author",
  title: "Author / Yazar",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name / Ad", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 } }),
    defineField({ name: "role", title: "Role / Ünvan (legacy)", type: "string", hidden: true }),
    defineField({ name: "role_tr", title: "Role (TR) / Ünvan", type: "string" }),
    defineField({ name: "role_en", title: "Role (EN)", type: "string" }),
    defineField({ name: "bio_tr", title: "Bio (TR)", type: "text", rows: 4 }),
    defineField({ name: "bio_en", title: "Bio (EN)", type: "text", rows: 4 }),
    imageWithAlt("photo", "Photo / Fotoğraf"),
    defineField({
      name: "sameAs",
      title: "sameAs (LinkedIn, site…)",
      type: "array",
      of: [{ type: "url" }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role_tr", media: "photo" } },
});
