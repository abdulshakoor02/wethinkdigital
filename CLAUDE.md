# Agent Configuration — WeThinkDigital

Guidance for AI coding agents working in this repository.

## What this project is

The marketing and content site for **WeThinkDigital**, an **AI and software engineering
company**. It is not a marketing agency site.

We sell four services — AI automation, AI engineering, custom software development and web
development — and promote two products:

- **Agents** (`https://agents.wethinkdigital.solutions`) — autonomous software delivery.
  SDE / QA / PR Review agents working a shared backlog.
- **Resume** (`https://resume.wethinkdigital.solutions`) — AI resume redesign.

> **Positioning is enforced.** This site was migrated away from SEO/digital-marketing
> positioning. Terms like *SEO*, *digital marketing*, *PPC*, *link building*,
> *keyword research* and *rankings* must never appear in user-facing copy, metadata,
> structured data or blog content. See `REVAMP_CONTRACT.md` §1 for the full banned list.
> The site must still be *technically* excellent for search and AI answer engines —
> that work lives in `src/app/schema.tsx`, `sitemap.ts`, `robots.ts` and `src/lib/seo.ts`.

Geography: global-first. Dubai/UAE appears only as the HQ line in the footer, the contact
page and the `address` field in Organization schema.

## Stack

- **Next.js 16** App Router + Turbopack, **React 19**, **TypeScript strict**
- **Tailwind CSS v4** with CSS custom properties (no `tailwind.config.js` — theme is in
  `src/app/globals.css` under `@theme inline`)
- **Framer Motion** for animation, **React Hook Form** for forms, **Nodemailer** for the
  contact API

Note: `three`, `@react-three/fiber`, `@react-three/drei` and `gsap` are still in
`package.json` but the components that used them were removed in the revamp. Do not
reintroduce 3D hero scenes — the hero is CSS-only for LCP reasons.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Production server on port 3201 |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, fonts, skip link, global JSON-LD
│   ├── page.tsx         # Home — composes src/components/home/* sections
│   ├── globals.css      # Design tokens + @theme + .prose-wtd + button/surface utilities
│   ├── schema.tsx       # organizationSchema, websiteSchema, professionalServiceSchema,
│   │                    # softwareApplicationSchemas, breadcrumbSchema()
│   ├── sitemap.ts       # Native sitemap (reads src/data/posts.json)
│   ├── robots.ts        # Native robots (allows AI answer-engine crawlers)
│   ├── not-found.tsx
│   ├── contact/ services/ products/ blog/
│   └── api/contact/route.ts
├── components/
│   ├── ui/              # Section, SectionHeading, Pill, CTA
│   ├── home/            # Home sections (ServicesOverview, ProductsShowcase, Process, …)
│   ├── services/ products/ blog/
│   └── Navigation.tsx Footer.tsx Hero.tsx ContactForm.tsx …
├── data/                # services.ts, products.ts, posts.ts, posts.json, faq.ts
├── lib/
│   ├── site.ts          # siteConfig — identity, contact, nav, product URLs
│   └── seo.ts           # buildMetadata(), absoluteUrl()
└── types/blog.ts
```

## Rules

1. **Every page** exports metadata via `buildMetadata()` from `src/lib/seo.ts`. This is how
   canonical, Open Graph and Twitter tags stay consistent. Never hand-roll a `Metadata`
   object and never hardcode the site URL — use `siteConfig.url` / `absoluteUrl()`.
2. **Server Components by default.** Add `'use client'` only for state, hooks or browser
   APIs. Metadata cannot be exported from a client component — keep `page.tsx` on the
   server and push interactivity into a child.
3. **Design tokens only.** Use the Tailwind classes backed by `globals.css`
   (`bg-background`, `bg-surface`, `text-muted`, `text-primary`, `border-line`) and the
   utilities `.surface`, `.glass`, `.grid-bg`, `.glow`, `.btn-primary`, `.btn-secondary`,
   `.mono-label`, `.gradient-text`, `.prose-wtd`. No raw hex values.
4. **Layout rhythm.** Container `mx-auto max-w-7xl px-6 sm:px-10 lg:px-16`; sections
   `py-24 sm:py-32`; inner pages start with `pt-32` to clear the fixed nav; exactly one
   `<h1>` per page.
5. **Dynamic route params are Promises** in Next 16: `const { slug } = await params;`
6. **No new dependencies** without asking. No `any`. No unused imports.
7. **Structured data must be truthful** — no `aggregateRating`, no `offers` with invented
   prices, no fabricated `sameAs` profiles, no invented client names or metrics anywhere.
8. Content data lives in `src/data/*`, never inline in components. `src/data/posts.json`
   must stay in sync with `src/data/posts.ts` — `sitemap.ts` reads the JSON.

## Deployment

`output: 'standalone'`. Production listens on port **3201**.
