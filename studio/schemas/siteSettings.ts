import { defineField, defineType } from "sanity";
import { imageWithAlt } from "./objects";

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
    // ── Medya ──────────────────────────────────────────────
    // YouTube bağlantısı girildiğinde ilgili bölümde oynatıcı belirir.
    // Boş bırakılırsa bölüm hiç render edilmez (boş kutu görünmez).
    defineField({
      name: "introVideoUrl",
      title: "Kurumsal tanıtım videosu (YouTube URL)",
      type: "url",
      description: "Ana sayfada gösterilir. Örn: https://www.youtube.com/watch?v=XXXX",
    }),
    defineField({ name: "introVideoTitle_tr", title: "Tanıtım videosu başlığı (TR)", type: "string" }),
    defineField({ name: "introVideoTitle_en", title: "Tanıtım videosu başlığı (EN)", type: "string" }),
    defineField({
      name: "confiqVideoUrl",
      title: "Confiq demo videosu (YouTube URL)",
      type: "url",
      description: "Confiq sayfasında gösterilir.",
    }),
    imageWithAlt("confiqShot", "Confiq ekran görüntüsü"),
    imageWithAlt("officeImage", "Ofis fotoğrafı (Hakkımızda)"),
    imageWithAlt("teamImage", "Ekip fotoğrafı (Conforcus Way)"),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
