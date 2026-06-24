import { groq } from "next-sanity";

// Liste: yayınlanmış yazılar, tarihe göre.
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current,
  title_tr, title_en, excerpt_tr, excerpt_en, category, publishedAt,
  "coverUrl": coverImage.asset->url,
  author->{ name, role, "photoUrl": photo.asset->url }
}`;

// Tek yazı (slug ile).
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title_tr, title_en, excerpt_tr, excerpt_en, body_tr, body_en, category, publishedAt,
  "coverUrl": coverImage.asset->url,
  author->{ name, role, "photoUrl": photo.asset->url }
}`;

// Tüm slug'lar (generateStaticParams).
export const SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)].slug.current`;

/* ---------- Faz 3.5 içerik tipleri ---------- */

const REF_CARD = `{
  "slug": slug.current, name, sector_tr, sector_en, countries, blurb_tr, blurb_en, featured, order,
  "logoUrl": logo.asset->url
}`;

export const REFERENCES_QUERY = groq`*[_type == "clientReference" && defined(slug.current)] | order(order asc, name asc) ${REF_CARD}`;

export const REFERENCE_QUERY = groq`*[_type == "clientReference" && slug.current == $slug][0]{
  "slug": slug.current, name, sector_tr, sector_en, countries, blurb_tr, blurb_en, body_tr, body_en, featured, order,
  "logoUrl": logo.asset->url,
  "testimonials": *[_type == "testimonial" && reference._ref == ^._id] | order(order asc){
    quote_tr, quote_en, person, role, company
  }
}`;

export const REFERENCE_SLUGS_QUERY = groq`*[_type == "clientReference" && defined(slug.current)].slug.current`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(order asc){
  quote_tr, quote_en, person, role, company, "refSlug": reference->slug.current
}`;

export const FEATURED_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  quote_tr, quote_en, person, role, company, "refSlug": reference->slug.current
}`;

const SOL_CARD = `{ "slug": slug.current, name_tr, name_en, module, group, short_tr, short_en, featured, order }`;

export const SOLUTIONS_QUERY = groq`*[_type == "solution"] | order(order asc, name_tr asc) ${SOL_CARD}`;

export const SOLUTION_QUERY = groq`*[_type == "solution" && slug.current == $slug][0]{
  "slug": slug.current, name_tr, name_en, module, group, short_tr, short_en, body_tr, body_en
}`;

export const SOLUTION_SLUGS_QUERY = groq`*[_type == "solution" && defined(slug.current)].slug.current`;

export const JOBS_QUERY = groq`*[_type == "jobPosting" && active == true] | order(order asc){
  title_tr, title_en, location, body_tr, body_en, applyEmail, applyUrl
}`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  hero_title_tr, hero_title_en, hero_sub_tr, hero_sub_en,
  hero_cta_primary_tr, hero_cta_primary_en, hero_cta_secondary_tr, hero_cta_secondary_en
}`;
