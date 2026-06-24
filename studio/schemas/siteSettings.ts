import { defineField, defineType } from "sanity";

// Singleton — yalnızca bir doküman (Studio'da "Site Settings" altında düzenlenir).
export default defineType({
  name: "siteSettings",
  title: "Site Settings / Site Ayarları",
  type: "document",
  fields: [
    defineField({ name: "hero_title_tr", title: "Hero Title (TR)", type: "text", rows: 2 }),
    defineField({ name: "hero_title_en", title: "Hero Title (EN)", type: "text", rows: 2 }),
    defineField({ name: "hero_sub_tr", title: "Hero Subtitle (TR)", type: "text", rows: 3 }),
    defineField({ name: "hero_sub_en", title: "Hero Subtitle (EN)", type: "text", rows: 3 }),
    defineField({ name: "hero_cta_primary_tr", title: "Hero Primary CTA (TR)", type: "string" }),
    defineField({ name: "hero_cta_primary_en", title: "Hero Primary CTA (EN)", type: "string" }),
    defineField({ name: "hero_cta_secondary_tr", title: "Hero Secondary CTA (TR)", type: "string" }),
    defineField({ name: "hero_cta_secondary_en", title: "Hero Secondary CTA (EN)", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
