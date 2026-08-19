# AGENT BRIEF — Conforcus web → www.conforcus.com (SEO 42 → 85)

Repo: https://github.com/catikur/conforcus-web (Next.js App Router + Sanity Studio studio/). Live preview: https://web.conforcus.com. Final canonical host when ready: https://www.conforcus.com.

Owner: Atilla Kuruüzüm. Company: Conforcus Bilişim Danışmanlık A.Ş. Content: Sanity bl5w7h11 / production (Studio workspace conforcus). Do not change the design; Halo/segment, app/globals.css tokens and conforcus_site_v13.html are the visual source of truth.

## 0. Do not do (Atilla will do these)

- No DNS / domain cutover. No A record, www CNAME, removing web., switching Caddy production host live. Prepare Caddyfile stage 2, leave default at stage 1 (web.conforcus.com + srv).
- Do not touch the LinkedIn platform (company page website field, posts, logo). Atilla will set LinkedIn website to https://www.conforcus.com after cutover.
- No visual "improvements", Tailwind, new colors, new fonts.
- Do not index 48 thin solution pages.
- Do not invent metrics.
- Do not touch Sanity workspace `default`. Only Studio `conforcus` (studio/schemas).
- Do not touch anything on the VPS except what this PR prepares in the repo. No DNS, no docker compose production host swap.

On-site LinkedIn href is currently linkedin.com/company/conforcus (404). Change it on the site to https://www.linkedin.com/company/con4cus. That is a broken-link fix, not a LinkedIn platform change.

## 1. Goal

Cutover-ready quality ≥ 85 (not today's Google rank).

SITE_URL is hardcoded in lib/i18n.ts as https://conforcus.com (no www). Canonical, hreflang, OG, robots, sitemap, JSON-LD all come from that. Apex is still 2023 Hostinger HTML.

Correct model:
- Preview now: NEXT_PUBLIC_SITE_URL=https://web.conforcus.com, Caddy stage 1
- Cutover day: NEXT_PUBLIC_SITE_URL=https://www.conforcus.com, Caddy www primary; apex and web 301 to www
Never hardcode the host.

## 2. Repo map

lib/i18n.ts SITE_URL, ROUTES, alternatesFor
lib/seo.ts pageMetadata
app/robots.ts
app/sitemap.ts (currently only ROUTES hubs; missing blog/case/product)
app/(tr)/… TR routes
app/(en)/en/… EN routes (verify structure)
app/(tr)/not-found.tsx
Caddyfile prepare stage 2 www-primary, do not enable
next.config.mjs redirects
studio/schemas/*
lib/sanity.queries.ts
lib/data.ts
components/ nav, footer, counters, tel

Solution detail route ALREADY exists: app/(tr)/cozumler/[slug]. Catalog "Detay iste" probably does not link, or empty-body pages are indexed. Verify.

## 3. Tasks

A. Pull SITE_URL out of lib/i18n.ts into process.env.NEXT_PUBLIC_SITE_URL (fallback https://web.conforcus.com, no trailing slash). Add to .env.example and .env.production.example (preview web., production www.). Wire pageMetadata, robots.ts, sitemap.ts, JSON-LD, llms.txt, OG, schema logo/url. Canonical self-ref. hreflang tr / en / x-default (x-default = TR).

B. next.config.mjs redirects(): old Hostinger paths /indexen.html, /ourservices.html, /hakkimizda.html, /aboutus.html to new equivalents. Do not invent unknown paths. Cutover apex→www and web.→www ONLY if env says production canonical is www. Default preview must keep web. working.

C. sitemap.ts: ROUTES + Sanity posts (not noIndex) + clientReference/reference case slugs + solutions WITH body + new service subpages + legal/contact/about. lastmod = _updatedAt. Empty-body solutions out. robots.ts sitemap uses SITE_URL. llms.txt URLs from SITE_URL.

D. Technical hygiene: app/favicon.ico + apple-icon.png from existing logo (do not redesign). poweredByHeader: false. Optional Caddy stage-1 security headers that do not break preview. Homepage counters currently render 0; animation must end on 130+ / 50+ / 30+ / 48+ / 70+ / 95% and reduced-motion shows the number immediately. Fix concatenated words ülkedеSAP, ofyour, across6 (real space or br, do not swallow letters). Footer + schema sameAs https://www.linkedin.com/company/con4cus. tel:+908502423772 header, footer, contact, JSON-LD telephone. Hamburger min 48x48. Mobile menu keeps Ücretsiz SAP Analizi. Images width/height or next/image, lazy except LCP, alt. Branded TR/EN 404 with nav, noindex. Footer KVKK · Gizlilik · Çerez must be links.

E. New pages in ROUTES with pageMetadata:
- hakkimizda /hakkimizda and /en/about
- iletisim /iletisim and /en/contact
- kvkk /kvkk and /en/privacy
- gizlilik /gizlilik
- cerez /cerez and /en/cookies
Address: İçerenköy Mah. Yeşilvadi Sok. No:8, Öneren İş Merkezi Kat:3, Ataşehir / İstanbul. info@conforcus.com, hr@conforcus.com, +90 850 242 3772. Legal name Conforcus Bilişim Danışmanlık A.Ş. Do not invent lawyer-grade KVKK; short honest skeleton if no existing copy.

F. Service unique URLs. Hub /hizmetler stays. Cards link to:
TR: /hizmetler/sap-destek-ams, /hizmetler/s4hana-donusum, /hizmetler/global-rollout, /hizmetler/urun-gelistirme
EN: /en/services/sap-ams, /en/services/s4hana-transformation, /en/services/global-rollout, /en/services/product-development
Each page: one H1, ICP, steps, 4–6 FAQ (FAQPage JSON-LD), CTA /analiz, related solutions. Keep Halo visual language.

G. Only 8 product pages with 600–900 words TR+EN, H2 questions, FAQ, module, CTA. Wire catalog Detay to /cozumler/{slug} and /en/solutions/{slug}. Empty 36 noIndex (meta robots + out of sitemap). Prefer writing into Sanity body_tr/en if you can; otherwise content in repo that the pages render.
Targets (use existing slugs, do not break them): enflasyon muhasebesi, e-payment-bank-e-signature-integrations, e-mutabakat, IFRS 16, DBS, automated-clearing-processes, import-management-process, invoice-approval-workflow.

H. Blog post slug testing id 777de114-b659-423c-8d6b-78009595ba15: unpublish or noIndex. Remove iyzico cover and Vestel author photo if still there. Add 4 real posts TR+EN authored by Atilla: Greenfield/Brownfield/Bluefield; SAP AMS nedir; SAP Türkiye e-fatura/GİB plus EN localization guide page; RISE vs GROW vs on-prem. Expand Santa Farma. Add Evyap S/4 and Flormar Germany as clientReference using only public facts, no invented metrics.

I. JSON-LD Organization url/logo/telephone/sameAs con4cus; WebSite; FAQPage; BlogPosting on real posts not testing; BreadcrumbList with SITE_URL.

J. studio/schemas: seo object (title, description, image, noIndex) on post, page, solution, reference, jobPosting, siteSettings. Image alt on coverImage, author.photo, logo, PTE image. faqItem question_tr/en answer_tr/en. redirect document type. Localize page type TR/EN + seo. author bio_tr/en, slug, sameAs, photo alt. testimonial.role_tr/en. generateMetadata coalesce(seo.title, title_*, ROUTES.title), stega off.

K. /analiz how-it-works + FAQ. Remove prototype disclaimers ("Prototipte marka adları", "Skor örnektir") from production copy.

L. Caddyfile stage 2 commented:
www.conforcus.com reverse_proxy web:3000
conforcus.com redir https://www.conforcus.com{uri} permanent
web.conforcus.com redir https://www.conforcus.com{uri} permanent
Leave stage 1 as-is.

## 4. Quality

TR and EN written separately, not word-for-word. One H1 per page. Keep prefers-reduced-motion, skip-link, focus rings.

## 5. PR done when

- SITE_URL from env
- canonical self-ref matches env host
- /sitemap.xml 200, no testing, no empty solutions
- /blog/testing 404 or noindex
- 4 service sub-URLs 200 unique H1
- 8 product pages 200, other solutions noindex
- tel: and con4cus LinkedIn
- counters not 0
- branded 404 TR/EN
- next build clean
- design tokens unchanged
- DNS / Caddy stage 1 unchanged

PR title example: SEO: www-ready canonical, unique service/product URLs, content hygiene
