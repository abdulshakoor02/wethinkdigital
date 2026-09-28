# WeThinkDigital

Marketing and content site for **WeThinkDigital** — an AI and software engineering company.

We build AI automation, autonomous agent systems, custom software and modern web
applications. The site also promotes our two products:

- **[Agents](https://agents.wethinkdigital.solutions)** — an autonomous software delivery
  platform. SDE, QA and PR Review agents work a shared backlog: the SDE agent implements
  work items, the QA agent tests them, and the PR Review agent reviews raised pull requests.
- **[Resume](https://resume.wethinkdigital.solutions)** — an AI app that redesigns an
  existing resume into a cleaner, better-structured, recruiter-ready document.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| UI | React 19 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Motion | Framer Motion |
| Forms | React Hook Form |
| Mail | Nodemailer (contact API route) |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run start        # serves on port 3201
npm run lint         # ESLint
npx tsc --noEmit     # type check
```

Copy `.env.example` to `.env.local` and fill in the SMTP values used by
`src/app/api/contact/route.ts`.

## Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, fonts, global JSON-LD
│   ├── page.tsx                # Home — composes the /components/home sections
│   ├── schema.tsx              # Organization / WebSite / Service / SoftwareApplication JSON-LD
│   ├── sitemap.ts              # Native Next.js sitemap
│   ├── robots.ts               # Native Next.js robots
│   ├── not-found.tsx           # 404
│   ├── contact/                # Contact page
│   ├── services/               # 4 service pages + index
│   ├── products/               # Agents + Resume product pages + index
│   ├── blog/                   # Blog index and [slug] articles
│   └── api/contact/            # Contact form handler
├── components/
│   ├── ui/                     # Section, SectionHeading, Pill, CTA primitives
│   ├── home/                   # Home page sections
│   ├── services/               # Service page template + parts
│   ├── products/               # Product page parts
│   ├── blog/                   # Blog cards, filter, table of contents
│   └── *.tsx                   # Navigation, Footer, Hero, ContactForm, ...
├── data/                       # services.ts, products.ts, posts.ts, faq.ts
├── lib/
│   ├── site.ts                 # Site identity, contact, nav, product config
│   └── seo.ts                  # buildMetadata() + absoluteUrl()
└── types/
```

## Conventions

- **Every page** exports metadata built with `buildMetadata()` from `src/lib/seo.ts`.
  That is what keeps canonicals, Open Graph and Twitter cards consistent.
- **Never hardcode the site URL.** Use `siteConfig.url` or `absoluteUrl()`.
- **Server Components by default.** Add `'use client'` only for state, hooks or browser APIs.
- **Design tokens only** — the classes defined in `src/app/globals.css`
  (`bg-surface`, `text-muted`, `border-line`, `.btn-primary`, `.mono-label`, …).
  No raw hex values in components.
- One `<h1>` per page. Inner pages start with `pt-32` to clear the fixed nav.

See `REVAMP_CONTRACT.md` for the full authoring contract.

## Deployment

Builds with `output: 'standalone'`. Production server listens on port **3201**.
