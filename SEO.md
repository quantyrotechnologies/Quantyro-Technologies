# SEO Status — Quantyro Technologies

Working reference for everything already done on SEO, so it's easy to spot
what's still missing. Update this file whenever SEO work is added.

Legend: ✅ done · 🟡 built but needs real data/action from you · ❌ not code, needs manual work

---

## 1. Technical foundation

| Item | Status | Notes |
|---|---|---|
| Clean URL structure | ✅ | Lowercase, no query params in canonical paths (`/services/custom-software`, not `?id=`) |
| Self-referencing canonical tags | ✅ | Every page — this was the root cause of the old site's "Alternate page with proper canonical tag: Failed" GSC error. `/blog?tag=x` always canonicals to plain `/blog` |
| Dynamic sitemap.xml | ✅ | `src/app/sitemap.ts` — only live/active/published content: services, service detail pages, service+region combos, work projects, work detail pages, blog posts |
| robots.txt | ✅ | `src/app/robots.ts` — explicit allow for GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Perplexity-User, ClaudeBot, Claude-User, anthropic-ai, Google-Extended, Applebot-Extended, CCBot, Bytespider, plus default `*` allow |
| Admin pages noindex | ✅ | `robots: {index:false, follow:false}` at `/admin/(dashboard)/layout.tsx` — still crawlable (so AI bots can read it), never indexed |
| Custom 404 page | ✅ | `src/app/not-found.tsx` — real 404 status, noindex, quick links back into the site |
| No redirect chains | ✅ | Only `/admin/*` redirects (auth gate); public pages have none |
| Webmaster verification | ✅ | Google/Bing/Ahrefs meta tags via env vars (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `AHREFS_SITE_VERIFICATION`) — blank until you create those accounts |

## 2. On-page SEO

| Item | Status | Notes |
|---|---|---|
| Title tags | ✅ | 42–60 chars across all pages, keyword-first + brand suffix via `template: "%s — Quantyro Technologies"` |
| Meta descriptions | ✅ | ~140–175 chars, tuned per page |
| One H1 per page | ✅ | |
| Heading depth (H1→H4) | ✅ | Service pages reach H1→H2→H3→H4 with genuine content at each level (not padded) |
| Table of contents | ✅ | `TableOfContents.tsx`, used on service + work detail pages |
| Internal linking | ✅ | Breadcrumbs (with `BreadcrumbList` schema) everywhere, service↔region cross-links, work list → work detail links |
| Images: alt + title tags | ✅ | Every image (`next/image`, auto WebP/AVIF, lazy loading, `sizes` prop tuned per layout) |
| Content formatting | ✅ | Bullet lists, cards, short paragraphs — not walls of text |

## 3. GEO / AI-search optimization

| Item | Status | Notes |
|---|---|---|
| FAQ sections + `FAQPage` schema | ✅ | Home, Services, Work, About, Contact, Blog, every individual service page (3 Q&A each) |
| Quick-answer / TL;DR block | ✅ | Blog posts only so far — sits above the full article for AI-snapshot friendliness |
| Structured data coverage | ✅ | `Organization`, `BreadcrumbList`, `FAQPage`, `Service`, `BlogPosting` (with `image`), `CreativeWork` (work case studies) |
| Author E-E-A-T signals | ❌ | Needs a real person's name/bio — not fabricated. Currently `Organization` is the schema author, which is valid for a company blog but weaker than named authors |
| Original data/stats/tables in posts | ❌ | Needs real content — no blog posts exist yet (0 published) |

## 4. Pages with full SEO infrastructure

- `/` , `/services`, `/services/[slug]` (5 pages), `/services/[slug]/[region]`, `/industries`, `/industries/[slug]` (8 pages), `/work`, `/work/[slug]` (6 pages), `/about`, `/contact`, `/blog`, `/blog/[slug]`

## 5. Pending — needs your action

- [ ] (Optional) Run migration `0011_industries.sql` to manage Industries from the admin panel — the site already renders real content from a code fallback (`SAMPLE_INDUSTRIES`) without it
- [ ] Run migration `0010_projects_full_case_study.sql` (adds `stack`, `duration`, `highlights` to projects)
- [ ] Add real tech stack / delivery time / "what made this hard" per project (admin → Projects) — sections stay hidden until filled
- [ ] Add real project `year` (admin → Projects) — falls back to a sequence number until set
- [ ] Add real office addresses (admin → Offices) — unlocks `LocalBusiness` schema / multi-location SEO, currently only city+region shown
- [ ] Add real social profile links (admin → Social Links) — footer + `Organization.sameAs` are empty until then
- [ ] Publish blog posts — 0 exist right now, so `/blog` has no content to rank
- [ ] Add real office/team photos (admin → Offices `photo_url` field) — optional, currently no photo shown

## 6. Out of scope — not fixable from code

These need real-world action outside this codebase, not more engineering:

- **Off-page SEO**: backlinks, B2B directory listings (Clutch, GoodFirms, DesignRush), Google Business Profile, Bing Places, guest posts, PR mentions, social media presence — all manual/marketing work
- **Core Web Vitals real score**: only measurable post-deploy via PageSpeed Insights on the live domain — dev server numbers aren't representative
- **HTTPS/SSL enforcement**: hosting-level (Vercel and most modern hosts do this automatically at deploy)
- **hreflang / multi-language**: not applicable unless the site goes multi-language

## 7. Ideas for the next round

Things not yet built that would be reasonable next steps once you have more
real content or want to go further:

- Individual blog post FAQ sections (currently only the `/blog` listing page has one)
- `Person`/author schema once you have a named writer for blog posts
- `LocalBusiness` schema per office once real addresses exist
- More case studies / blog posts to actually have content to rank
- A backlink/directory-listing push (off-page) — the technical foundation here is ready to support it
