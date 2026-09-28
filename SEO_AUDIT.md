# Technical Discoverability Audit

Owner: `seo-eng`. Scope: the technical layer that makes the site legible to search
crawlers and AI answer engines — metadata, canonicals, structured data, sitemap, robots,
and `llms.txt`.

Toolchain at time of audit: **Next.js 16.3.0**, React 19.2.8, TypeScript strict.
`npx tsc --noEmit` and `npx eslint` both run against the real (post-`npm install`) tree.

> Note on terminology: the *topic* this company used to sell is banned from all
> user-facing copy per `REVAMP_CONTRACT.md` §1. This document is engineering
> documentation, not shipped copy, and the file name is the only place the old acronym
> survives. Nothing here appears in the rendered site.

---

## Summary

| # | Check | Result |
| --- | --- | --- |
| 1 | Every page exports metadata via `buildMetadata()` → canonical present | **PASS** (13/13) |
| 2 | Exactly one `<h1>` per page, never zero | **PASS** (13/13) |
| 3 | No duplicated top-level JSON-LD `@type` within a single page | **PASS** (12/12 routes) |
| 4 | No hardcoded site URL outside the three allowed files | **PASS** |
| 5 | Banned-word sweep across `src/` and `public/` | **PASS** |
| 6 | Sitemap emits exactly the final route set + the 10 new post slugs | **PASS** |
| 7 | `public/robots.txt` absent so `app/robots.ts` is not shadowed | **PASS** |
| 8 | Blog re-verification after `content-eng` landed | **PASS** |

**Final verdict: PASS. No violations found in any teammate's files.** Nothing was
escalated to the Lead.

Re-verified after `content-eng` landed the 10 new posts: `npx tsc --noEmit` is at
**0 errors repo-wide**, and `npx eslint` on the files in my scope exits 0.

---

## 1. Metadata and canonicals

All 13 rendered pages (12 `page.tsx` + `not-found.tsx`) resolve a canonical through
`buildMetadata()` in `src/lib/seo.ts`.

- `src/app/page.tsx` has no local `metadata` export by design — the home canonical comes
  from `src/app/layout.tsx`, which calls `buildMetadata({ path: '/' })` and also sets
  `metadataBase: new URL(siteConfig.url)`. This is correct, not a gap.
- Service and product pages pass a data-driven `path` (`service.href`, `product.href`)
  rather than a literal. Each was traced to its source in `src/data/services.ts` and
  `src/data/products.ts` and matches its real route exactly.
- `src/app/blog/[slug]/page.tsx` builds `path: '/blog/${post.slug}'` for a found post and
  falls back to `path: '/blog'` with `noIndex: true` for a missing one — correct on both
  branches.
- `src/app/not-found.tsx` uses `buildMetadata({ noIndex: true })`, emitting
  `robots: { index: false, follow: false }`.

No page hand-rolls a `Metadata` object and no page is a client component, so no page is at
risk of silently dropping its metadata export.

## 2. Heading structure

Counted by resolving each page's JSX component tree, following only imports actually used
as JSX tags, counting both literal `<h1>` and the `as="h1"` prop on `SectionHeading`, and
stripping comments (several files mention `<h1>` in prose, which naively inflates counts).

Every route resolves to exactly **one** `<h1>`. The three shared owners are
`src/components/Hero.tsx` (home), `src/components/services/ServicePageTemplate.tsx`
(the four service detail pages) and `src/components/products/ProductHero.tsx` (the two
product pages); the index and blog pages own theirs directly.

## 3. Structured data

Per-page top-level `@type` sets, including the three nodes `src/app/layout.tsx` emits
globally (`Organization`, `WebSite`, `ProfessionalService`):

| Route | Page-level nodes |
| --- | --- |
| `/` | `FAQPage` |
| `/services` | `ItemList`, `BreadcrumbList` |
| `/services/*` (×4) | `Service`, `FAQPage`, `BreadcrumbList` |
| `/products` | `ItemList`, `BreadcrumbList` |
| `/products/*` (×2) | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| `/blog` | `Blog`, `ItemList` |
| `/blog/[slug]` | `BlogPosting`, `BreadcrumbList` |

No route repeats a top-level `@type`. Re-confirmed after the blog landed.

**`FAQPage` specifically:** emitted exactly once on the home page, server-side from
`src/app/page.tsx` using `faqData`. `src/components/home/FAQ.tsx` deliberately emits no
schema and documents why in a comment. The service and product pages each emit their own
`FAQPage` — correct, as those are different pages with different questions.

`Organization` appears more than once in the *source* of the blog files, but only as
nested `author` / `publisher` values inside `BlogPosting`, never as a second top-level
node. That is valid.

**`@id` graph.** All identifiers derive from `siteConfig.url`; there are no literals.
`src/components/products/schema.ts` and `src/components/services/serviceSchema.ts` each
define `ORGANIZATION_ID` as `` `${siteConfig.url}#organization` ``, matching
`src/app/schema.tsx`, so `provider` / `publisher` references resolve to the single
Organization node. The `#software` and `#service` identifiers are intentionally shared
between my exports and the page-level builders because they denote the same entity.

**Truthfulness.** `src/app/schema.tsx` deliberately omits `sameAs` (no verifiable social
profile), `aggregateRating`, priced `offers`, `priceRange`, `openingHoursSpecification`
and `geo`. The previous file asserted three unverified social URLs, an AED price band and
a marketing offer catalog; all are gone. `softwareApplicationSchemas` is exported for
reuse but is **not** rendered in the layout, so each product node appears on exactly one
page.

## 4. Hardcoded URLs

`grep` for `https://www.wethinkdigital.solutions` across `src/` and `public/` returns hits
only in the three permitted locations: `src/lib/site.ts` (the definition),
`src/app/schema.tsx` (`@id` construction) and `public/llms.txt` (a static text file that
cannot import). Every component and page builds URLs through `absoluteUrl()` or
`siteConfig`.

## 5. Banned-word sweep

```
grep -rniE "\bseo\b|digital marketing|dubai domination|\bppc\b|link building|
keyword research|search engine optimi|social media marketing|google business profile|
growth audit|\bserp\b|content marketing|email marketing" src/ public/
```

After excluding the `@/lib/seo` module specifier (a file path, not copy), there are **no
user-facing hits** anywhere in `src/` or `public/`.

`public/llms.txt` was rewritten for the new positioning (2,480 bytes): the four services,
both products with their app URLs, blog and contact, plus an explicit instruction to AI
systems that pricing, timelines and client metrics are unpublished and must not be
inferred.

## 6. Sitemap

Consolidated onto the native `src/app/sitemap.ts`. The previous setup ran `next-sitemap`
from a `postbuild` script *and* carried stale committed `public/sitemap.xml` /
`public/sitemap-0.xml` still advertising deleted pages — a static file in `public/` wins
over a generated route, so the stale list would have shipped.

Removed: `next-sitemap.config.js`, `public/sitemap.xml`, `public/sitemap-0.xml`, and the
`postbuild` script in `package.json`. The `next-sitemap` dependency itself is left in
place (removing it was out of scope); it is simply never invoked.

The 11 static entries match the routes on disk exactly, 1:1, with no extras and nothing
missing. Priorities: home `1.0`, services and products `0.9`, blog index `0.8`, posts
`0.7`, contact `0.6`.

Blog entries are generated from `src/data/posts.json` using `updated ?? date` for
`lastModified`. The reader is written defensively and was runtime-tested against `null`,
`{}`, `[]`, duplicate slugs, non-object entries, blank slugs and unparseable dates — every
case degrades to skipping that entry rather than failing the build.

No deleted URL appears: `/seo-services` and the ten old marketing slugs are absent from
the sitemap, from `llms.txt` and from every link in `src/`.

## 8. Blog re-verification (after `content-eng` landed)

The sitemap was re-run against the final `src/data/posts.json` and emits **exactly 21
URLs — 11 static + 10 blog posts**, with no extras and nothing missing. Post slugs were
diffed against the agreed list and match exactly.

| Slug | `lastModified` |
| --- | --- |
| `ai-code-review-best-practices` | 2026-01-20 |
| `llm-cost-optimization-strategies` | 2026-01-08 |
| `multi-agent-orchestration-patterns` | 2025-12-16 |
| `legacy-system-modernization-ai` | 2025-12-02 |
| `building-production-rag-systems` | 2025-11-18 |
| `ai-workflow-automation-business-processes` | 2025-11-04 |
| `ai-qa-automation-test-generation` | 2025-10-27 |
| `nextjs-15-performance-optimization` | 2025-10-20 |
| `automated-pr-review-with-ai` | 2025-10-13 |
| `ai-agents-software-development-lifecycle` | 2025-10-05 |

No post carries an `updated` key, so `updated ?? date` resolves to `date` throughout.
That is the intended behaviour: every entry advertises its real publication date rather
than a build timestamp, which is what made the old `next-sitemap` setup unreliable.

**Banned words in the blog data.** `src/data/posts.ts` and `src/data/posts.json` were the
only files still failing the sweep in the previous pass. Both are now clean — the
repo-wide sweep over `src/` and `public/` returns **zero** user-facing hits, and no
reference to `/seo-services` or any old marketing slug survives anywhere in the tree.

**Breadcrumbs on `/blog/[slug]`.** `src/components/Breadcrumb.tsx` is now a server
component that takes its trail explicitly and emits **no** JSON-LD of its own; the slug
page owns the single `BreadcrumbList` node and builds every URL through `absoluteUrl()`.
The rendered trail and the structured data are both Home → Notes → post title, so they
cannot drift. There is no duplicate and no orphaned `BreadcrumbList`, and the hardcoded
URLs the old component contained are gone.

## 7. Robots

`public/robots.txt` is deleted and confirmed absent, so `src/app/robots.ts` is the single
source. It allows `/`, disallows `/api/`, sets `host`, and points `sitemap` at
`<siteUrl>/sitemap.xml`.

Twelve AI answer-engine crawlers are named explicitly in addition to the `*` rule —
GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot,
PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot and CCBot —
for 13 rules total. `*` already permits them; naming them removes ambiguity and survives a
future blanket-deny added by accident.

---

## Other observations (no action required)

- No raw `<img>` tags anywhere; no missing `alt`.
- Every `target="_blank"` link carries `rel="noopener noreferrer"`.
- `public/og-image.png` exists and `buildMetadata` resolves it absolutely for Open Graph
  and Twitter cards on every page.
- `src/lib/seo.ts` was left additive-only; `buildMetadata`'s signature and behaviour are
  unchanged.

## Known issue outside my scope

The repo ESLint config previously failed to load because `eslint.config.mjs` imports
`eslint-config-next/core-web-vitals` (extensionless, and spreading a non-iterable default
export). The Lead's `npm install` resolved this; `npx eslint` now runs repo-wide. Noted
only because it predates this revamp and would resurface on a clean install with a
mismatched `eslint-config-next`.
