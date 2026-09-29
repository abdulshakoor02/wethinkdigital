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

---

# Ember restyle — regression audit

Owner: `ember-seo`. Scope: prove the technical discoverability layer survived the
dark→light "Ember" inversion, and restyle `src/app/not-found.tsx`. Nothing below is new
discoverability work — no route, no metadata field and no schema node was added.

**Headline: PASS on all eight sweep items. No blocking violation found.** One optional
wording finding (`ranking` in `src/data/posts.ts`) was reported to the Lead rather than
edited, since it sits in another owner's write scope. One temporary scratch route
(`src/app/products/render-check/`) was spotted mid-audit, flagged, and has since been
deleted by its owner — re-verified.

All eight sweeps were re-run **after every Ember writer had stopped** (last writer edit
00:44; final sweep 00:54–00:56) so the numbers below describe the post-restyle tree, not a
mid-flight snapshot.

## Method

`<h1>` counts come from a script that (a) strips block and line comments before counting —
several files mention `<h1>` in prose, which inflates a naive count — (b) resolves local
`@/…` imports that are actually used as JSX tags, transitively, and (c) counts both literal
`<h1>` and `as="h1"` passed to `SectionHeading`. JSON-LD was enumerated by scanning every
`<JsonLd>` tag in each route's transitive import graph and resolving each payload to its
top-level `@type` (nested nodes such as `Question`, `Answer`, `ListItem` and the
`BlogPosting` items inside a `Blog` do not count as top-level). `buildMetadata` call sites
were read individually, including the `generateMetadata` and ternary branches.

## Result table

| # | Check | Result |
| --- | --- | --- |
| 1 | Every page still exports metadata via `buildMetadata()` → canonical | **PASS** (13/13) |
| 2 | Exactly one `<h1>` per route, never zero | **PASS** (12/12 routes + 404) |
| 3 | No duplicated top-level JSON-LD `@type` per page | **PASS** (12/12 routes) |
| 4 | All JSON-LD blocks still present | **PASS** |
| 5 | `FAQPage` on home exactly once; `components/home/FAQ.tsx` emits none | **PASS** |
| 6 | Sitemap emits 21 URLs (11 static + 10 posts), no duplicates | **PASS** |
| 7 | `robots.ts` keeps 13 rules; `public/robots.txt` absent | **PASS** |
| 8 | No hardcoded site URL outside the allowed files | **PASS** |
| 9 | Banned-word sweep over `src/` and `public/` | **PASS** (1 flagged technical use) |
| 10 | `public/llms.txt` still accurate | **PASS** — no change needed |
| 11 | `npx tsc --noEmit` repo-wide / `npx eslint` on the owned files | **PASS** (0 errors, exit 0) |

## 1. Metadata and canonicals — 13/13

All 12 `page.tsx` files still resolve a canonical through `buildMetadata()`, plus
`not-found.tsx`. Verified after the restyle landed:

| Route | Canonical source |
| --- | --- |
| `/` | `src/app/layout.tsx` — `buildMetadata({ path: '/' })` (+ `metadataBase`). The home page itself has no local export **by design**; this is the one documented exception, not a gap. |
| `/services`, `/products`, `/blog`, `/contact` | Local `export const metadata` with a literal `path` |
| `/services/*` (×4) | `service ? buildMetadata({ path: service.href, … }) : {}` — data-driven |
| `/products/*` (×2) | `buildMetadata({ path: product.href, … })`, `product.href` from `siteConfig.apps.*.href` |
| `/blog/[slug]` | `generateMetadata` — found: `path: '/blog/<slug>'`; missing: `path: '/blog'` + `noIndex` |
| 404 | `buildMetadata({ path: '/404', noIndex: true })` — unchanged from HEAD |

The four service pages use a ternary with an `: {}` fallback. That is pre-existing, and
`getService()` resolves all four slugs from `src/data/services.ts`, so the canonical branch
is always the one that ships; the fallback only exists to satisfy the type. Not a
regression. No `page.tsx` is a client component (checked for `'use client'` in all 12), so
no page can silently lose its metadata export.

`src/lib/seo.ts` is **byte-identical to HEAD** (`git diff --quiet` clean) — `buildMetadata`'s
signature and behaviour are untouched, as required.

## 2. Heading structure — 12/12 routes at exactly one `<h1>`

| Route | h1 owner |
| --- | --- |
| `/` | `src/components/Hero.tsx` (1 literal) |
| `/services` | `src/app/services/page.tsx` |
| `/services/*` (×4) | `src/components/services/ServicePageTemplate.tsx` (1 literal, shared) |
| `/products` | `src/app/products/page.tsx` — `SectionHeading as="h1"` |
| `/products/*` (×2) | `src/components/products/ProductHero.tsx` (1 literal, shared) |
| `/blog` | `src/app/blog/page.tsx` |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` |
| 404 | `src/app/not-found.tsx` (1 literal) |

**Comment trap confirmed and defeated.** `src/components/Hero.tsx` and
`src/components/products/ProductHero.tsx` each contain two textual occurrences of `<h1>`
but render exactly one — the other is a doc comment ("the `<h1>` text and every other
device…", "Owns the single `<h1>`"). A naive `grep -c "<h1"` reports 2 for both and would
fail the check spuriously. Nothing renders zero.

## 3. Structured data — no duplicated top-level `@type`

Every route also carries the three global nodes from `src/app/layout.tsx`
(`Organization`, `WebSite`, `ProfessionalService`); page-level additions verified as:

| Route | Page-level top-level nodes | Duplicates |
| --- | --- | --- |
| `/` | `FAQPage` | none |
| `/services` | `ItemList`, `BreadcrumbList` | none |
| `/services/*` (×4) | `Service`, `FAQPage`, `BreadcrumbList` | none |
| `/products` | `ItemList`, `BreadcrumbList` | none |
| `/products/*` (×2) | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` | none |
| `/blog` | `Blog`, `ItemList` | none |
| `/blog/[slug]` | `BlogPosting`, `BreadcrumbList` | none |
| `/contact` | none (global nodes only) | none |
| 404 | none | none |

`BlogPosting` on `/blog` is nested inside `Blog.blogPost`, and the `Organization` nodes in
the blog files are nested `author` / `publisher` values inside `BlogPosting` — neither is a
second top-level node, which is valid.

**`FAQPage` on the home page is emitted exactly once**, unconditionally, server-side, from
a single `<JsonLd id="json-ld-faq-server">` in `src/app/page.tsx` using `faqData`.
`src/components/home/FAQ.tsx` renders the same list with **no** JSON-LD and no schema
import — its doc comment still states that the page owns the node. `home/FAQ.tsx`,
`ServicesOverview`, `Process`, `TechStack`, `RecentPosts` and `ProductsShowcase` were all
scanned for `<JsonLd>` and contain none, so no home section duplicated the FAQ node during
the restyle. `src/components/home/FAQ.tsx` was restyled (`<span className="serif">` on the
heading) without touching that contract.

## 4. JSON-LD inventory — nothing lost

| Node type | Where it is emitted | Status |
| --- | --- | --- |
| `Service` | `serviceSchema.buildServiceSchema()` on all 4 service pages | present |
| `FAQPage` | home + 4 service pages + 2 product pages (7 nodes, one per page) | present |
| `BreadcrumbList` | services index, 4 service pages, products index, 2 product pages, `/blog/[slug]` | present |
| `SoftwareApplication` | `productSchema.softwareApplicationSchema()` on both product pages | present |
| `BlogPosting` | `/blog/[slug]` (top-level) and nested in `/blog`'s `Blog.blogPost` | present |
| `Organization` / `WebSite` / `ProfessionalService` | `src/app/layout.tsx` | present |
| `Blog` / `ItemList` | `/blog`; `ItemList` also on `/services` and `/products` | present |

All builders are unchanged (`src/app/schema.tsx`, `src/components/products/schema.ts`,
`src/components/services/serviceSchema.ts` are byte-identical to HEAD), so the `@id` graph
still resolves through `siteConfig.url` exactly as documented in §3.

## 5. Sitemap, robots and shadowing artifacts

- `sitemap.ts` still emits **exactly 21 URLs: 11 static + 10 blog posts**, with no
  duplicates and nothing missing. Re-read from the current file: 11 `staticRoutes` entries,
  and `src/data/posts.json` still holds the same 10 slugs verified in §8.
- `robots.ts` still returns **13 rules** — the `*` rule plus the 12 named AI answer-engine
  crawlers — with `sitemap: absoluteUrl('/sitemap.xml')` and `host: siteConfig.url`.
- `public/robots.txt` is **still absent**, and so are `public/sitemap.xml`,
  `public/sitemap-0.xml` and `next-sitemap.config.js`. `package.json` still has no
  `postbuild` script, so no static file can shadow the generated routes again.

## 6. Hardcoded site URLs

`grep -rn "wethinkdigital\.solutions" src/ public/` returns hits in exactly two files:
`src/lib/site.ts` (the definition) and `public/llms.txt` (a static text file that cannot
import). `src/app/schema.tsx` and the two JSON-LD builders construct every `@id` from
`siteConfig.url`, so they contain no literal at all. No page or component hardcodes the
origin.

## 7. Banned-word sweep

```
grep -rniE "\bseo\b|search engine optimi|digital marketing|\bppc\b|social media marketing|\
link building|keyword research|google business profile|growth audit|\brankings?\b|\bserp\b|\
content marketing|email marketing|dubai domination|roi calculator" src public
```

Zero user-facing hits. The 18 remaining matches are all the `@/lib/seo` **module specifier**
(a file path, not copy) and are excluded per the brief.

**One flagged item, not a violation — reported, not edited.** `src/data/posts.ts` lines
653, 672 and 688 (owned by `content-eng`) use the word *ranking* in its
information-retrieval sense, inside the production-RAG article: "pre-ranking", "spend real
computation ranking only those fifty", "Post-filtering after ranking is also wrong". This is
retrieval-reranking vocabulary, not marketing rankings, and the article is otherwise
unambiguously engineering-led. It is strictly inside the contract's `rankings` token, so
the Lead should decide: keep it (technically correct, matches `reranking` used throughout
the same post) or swap to "scoring" / "ordering" if a literal substring check must pass.
No other positioning term appears anywhere in `src/` or `public/`.

## 8. `public/llms.txt`

Reviewed line by line against `src/lib/site.ts`, the sitemap routes and the 10 published
posts. It still matches the site: the same four services, both products with their real
app URLs (`agents.wethinkdigital.solutions`, `resume.wethinkdigital.solutions`), `/blog` and
`/contact`, the HQ/contact/language line, and the note that pricing, timelines and client
metrics are unpublished. The blog description names only topics the 10 live posts cover.
No deleted route is referenced. **No contradiction found — the file was left unchanged**
(29 lines, as committed).

## 9. `src/app/not-found.tsx` — restyled, content untouched

| | Before | After |
| --- | --- | --- |
| Canvas | `grid-bg` section on the page background | `bg-background` (bone) with the Ember `.mesh` warm gradient + `.m-fade` |
| `h1` | `text-4xl … sm:text-5xl lg:text-6xl font-bold` | `text-[2.5rem] sm:text-6xl lg:text-[4.4rem] font-semibold tracking-[-0.045em] leading-[1.06]`, with `<span className="serif">isn&apos;t here</span>` — one serif phrase, 2 words |
| Lede | `text-lg` | `text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]` |
| Section label | hand-rolled uppercase `h2` | `.mono-label` on the same `h2` |
| Link cards | `.surface` + `rounded-xl border border-line` + `block` | `.surface surface-hover` + `flex flex-col` (`.surface` already owns border + 14px radius) |
| Grid | `gap-4` | `gap-3.5` (Ember bento rhythm) |
| Buttons | `.btn-primary` / `.btn-secondary` | unchanged — both are pills now via `globals.css` |

Unchanged by design: the metadata export (canonical `/404`, `noIndex: true`), the copy, the
`pt-32` top padding, `id="main"`, the 404 eyebrow and **all five destinations** — Home,
Services, Products, Blog, Contact. `git diff` confirms the metadata block and every
user-facing string are byte-identical to HEAD; the only additions are the presentational
classNames and one explanatory comment. Exactly one `<h1>`.

## Flagged for the Lead (other owners' files — not edited)

1. **`src/app/products/render-check/page.tsx` — RESOLVED.** A temporary screenshot harness
   appeared during the restyle (`/** TEMPORARY screenshot harness — deleted before
   hand-off. */`). It was a real, reachable route with no `<h1>` and no metadata export, and
   correctly absent from the sitemap. It was flagged mid-audit and its owner has since
   deleted the whole `src/app/products/render-check/` directory; the route list is back to
   exactly the 12 documented pages. Re-verified after deletion.
2. **`ranking` in `src/data/posts.ts`** — see §7 above. Optional wording change only.
3. **`src/app/layout.tsx:63` raw hex in the critical-CSS block** — the inline `:root{…}`
   that mirrors the bone/ink/ember tokens for first paint. It trips a literal
   `#1[0-9a-f]{5}` grep, but the values *are* the Ember tokens (`#f6f4ef`, `#141310`,
   `#d9481f`, `#ddd8cb`) and the duplication is deliberate (no flash of the old dark
   palette before the stylesheet resolves). No blue or navy value survives anywhere in
   `src/`. Recommend keeping; noted so the Lead's final grep is not a surprise.
   (The only other hex hits in `src/` are a comment in `WhatsAppButton.tsx` explaining why
   WhatsApp green is *not* used, plus PR/issue numbers like `#812` that merely look like
   hex.)

## Verification commands run

- `npx tsc --noEmit` → **0 errors repo-wide**.
- `npx eslint src/app/not-found.tsx src/app/schema.tsx src/app/sitemap.ts src/app/robots.ts src/components/JsonLd.tsx src/lib/seo.ts` → **exit 0**.
- `grep -rn "oklch\|#0[0-9a-f]\{5\}\|#1[0-9a-f]\{5\}"` over the owned files → no matches.
- `git diff --stat` over my scope → only `src/app/not-found.tsx` changed (23 insertions,
  13 deletions); `seo.ts`, `schema.tsx`, `sitemap.ts`, `robots.ts` and `JsonLd.tsx` are
  byte-identical to HEAD.
- `npm run build` was **not** run — the Lead owns the integration build.
