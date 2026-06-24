import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author / Yazar",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name / Ad", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Ünvan", type: "string" }),
    defineField({ name: "photo", title: "Photo / Fotoğraf", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
