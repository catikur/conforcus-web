import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial / Görüş",
  type: "document",
  fields: [
    defineField({ name: "quote_tr", title: "Quote (TR) / Alıntı", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "quote_en", title: "Quote (EN)", type: "text", rows: 4 }),
    defineField({ name: "person", title: "Person / Kişi", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Ünvan", type: "string" }),
    defineField({ name: "company", title: "Company / Şirket", type: "string" }),
    defineField({ name: "reference", title: "Reference / Bağlı referans", type: "reference", to: [{ type: "clientReference" }] }),
    defineField({ name: "featured", title: "Featured / Ana sayfada göster", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Order / Sıra", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "person", subtitle: "company" } },
});
