import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && seo.noIndex != true] | order(publishedAt desc){
  "slug": slug.current,
  title_tr, title_en, excerpt_tr, excerpt_en, category, publishedAt,
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  "noIndex": seo.noIndex == true,
  "seoTitle": coalesce(seo.title, title_tr),
  "seoTitle_en": coalesce(seo.title, title_en),
  "seoDesc": coalesce(seo.description, excerpt_tr),
  "seoDesc_en": coalesce(seo.description, excerpt_en),
  "seoImage": seo.image.asset->url,
  author->{ name, role, role_tr, role_en, bio_tr, bio_en, "sameAs": sameAs, "photoUrl": photo.asset->url, "photoAlt": photo.alt }
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title_tr, title_en, excerpt_tr, excerpt_en, body_tr, body_en, category, publishedAt,
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  "noIndex": seo.noIndex == true,
  "seoTitle": coalesce(seo.title, title_tr),
  "seoTitle_en": coalesce(seo.title, title_en),
  "seoDesc": coalesce(seo.description, excerpt_tr),
  "seoDesc_en": coalesce(seo.description, excerpt_en),
  "seoImage": seo.image.asset->url,
  faqs,
  author->{ name, role, role_tr, role_en, bio_tr, bio_en, "sameAs": sameAs, "photoUrl": photo.asset->url, "photoAlt": photo.alt }
}`;

export const SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const SITEMAP_POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && seo.noIndex != true && defined(publishedAt)]{
  "slug": slug.current, _updatedAt
}`;

const REF_CARD = `{
  "slug": slug.current, name, sector_tr, sector_en, countries, blurb_tr, blurb_en, featured, order,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt,
  "noIndex": seo.noIndex == true,
  "hasBody": length(pt::text(coalesce(body_tr, []))) > 200 || length(pt::text(coalesce(body_en, []))) > 200,
  _updatedAt
}`;

export const REFERENCES_QUERY = groq`*[_type == "clientReference" && defined(slug.current)] | order(order asc, name asc) ${REF_CARD}`;

export const REFERENCE_QUERY = groq`*[_type == "clientReference" && slug.current == $slug][0]{
  "slug": slug.current, name, sector_tr, sector_en, countries, blurb_tr, blurb_en, body_tr, body_en, featured, order,
  "logoUrl": logo.asset->url,
  "logoAlt": logo.alt,
  "noIndex": seo.noIndex == true,
  "seoTitle": coalesce(seo.title, name),
  "seoDesc": coalesce(seo.description, blurb_tr),
  "seoDesc_en": coalesce(seo.description, blurb_en),
  "hasBody": length(pt::text(coalesce(body_tr, []))) > 200 || length(pt::text(coalesce(body_en, []))) > 200,
  _updatedAt,
  "testimonials": *[_type == "testimonial" && reference._ref == ^._id] | order(order asc){
    quote_tr, quote_en, person, role, role_tr, role_en, company
  }
}`;

export const REFERENCE_SLUGS_QUERY = groq`*[_type == "clientReference" && defined(slug.current)].slug.current`;

export const SITEMAP_REFERENCES_QUERY = groq`*[_type == "clientReference" && defined(slug.current) && seo.noIndex != true && (length(pt::text(coalesce(body_tr, []))) > 200 || length(pt::text(coalesce(body_en, []))) > 200)]{
  "slug": slug.current, _updatedAt
}`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(order asc){
  quote_tr, quote_en, person, role, role_tr, role_en, company, "refSlug": reference->slug.current
}`;

export const FEATURED_TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  quote_tr, quote_en, person, role, role_tr, role_en, company, "refSlug": reference->slug.current
}`;

const SOL_CARD = `{
  "slug": slug.current, name_tr, name_en, module, group, short_tr, short_en, featured, order,
  "noIndex": seo.noIndex == true,
  "bodyChars": length(pt::text(coalesce(body_tr, []))),
  "hasBody": length(pt::text(coalesce(body_tr, []))) > 400 || length(pt::text(coalesce(body_en, []))) > 400,
  _updatedAt
}`;

export const SOLUTIONS_QUERY = groq`*[_type == "solution"] | order(order asc, name_tr asc) ${SOL_CARD}`;

export const SOLUTION_QUERY = groq`*[_type == "solution" && slug.current == $slug][0]{
  "slug": slug.current, name_tr, name_en, module, group, short_tr, short_en, body_tr, body_en, featured,
  faqs,
  "noIndex": seo.noIndex == true,
  "seoTitle": coalesce(seo.title, name_tr),
  "seoTitle_en": coalesce(seo.title, name_en),
  "seoDesc": coalesce(seo.description, short_tr),
  "seoDesc_en": coalesce(seo.description, short_en),
  "hasBody": length(pt::text(coalesce(body_tr, []))) > 400 || length(pt::text(coalesce(body_en, []))) > 400,
  "bodyChars": length(pt::text(coalesce(body_tr, []))),
  _updatedAt
}`;

export const SOLUTION_SLUGS_QUERY = groq`*[_type == "solution" && defined(slug.current)].slug.current`;

export const SITEMAP_SOLUTIONS_QUERY = groq`*[_type == "solution" && defined(slug.current) && seo.noIndex != true && (length(pt::text(coalesce(body_tr, []))) > 400 || length(pt::text(coalesce(body_en, []))) > 400)]{
  "slug": slug.current, _updatedAt
}`;

export const JOBS_QUERY = groq`*[_type == "jobPosting" && active == true] | order(order asc){
  title_tr, title_en, location, body_tr, body_en, applyEmail, applyUrl
}`;

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  hero_title_tr, hero_title_en, hero_sub_tr, hero_sub_en,
  hero_cta_primary_tr, hero_cta_primary_en, hero_cta_secondary_tr, hero_cta_secondary_en,
  "noIndex": seo.noIndex == true
}`;
