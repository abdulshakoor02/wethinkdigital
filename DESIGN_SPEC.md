# Ember — Design System Spec (READ BEFORE TOUCHING UI)

The approved redesign. `src/app/globals.css` already implements every token and utility
below — **use it, do not add competing styles.**

Reference render: `design-preview.png`. Reference markup: `design-ember.html`.

---

## 0. The one rule that matters

**Content, structure, routes, metadata and JSON-LD do not change. Only presentation.**
Every page keeps its exact copy, its `<h1>`, its `buildMetadata()` export, and its
structured data. If you find yourself rewriting copy to suit the design, stop.

---

## 1. What changed, conceptually

The old system was **dark navy canvas + electric blue + violet glow + grid background**.
That is the documented "AI startup uniform" and it is gone.

The new system is **warm bone canvas + near-black ink + one ember accent**, with
**dark surfaces used as accent objects** rather than as the page background.

| | Old | Ember |
| --- | --- | --- |
| Page canvas | near-black navy `#08090a` | warm bone `#f6f4ef` |
| Cards | dark, blue hairline | white, warm hairline, 14px radius |
| Primary accent | electric blue `#7170ff` | ember `#d9481f` |
| Secondary | cyan | sage `#5c6b52` |
| Headline emphasis | two-hue gradient text | **serif italic on 1–3 words** |
| Hero backdrop | navy radial blobs + grid | **warm gradient mesh + fade** |
| Buttons | rectangle, radius 0.4rem | **pill, radius 100px** |
| Dark usage | the whole page | **only product surfaces** (`.surface-dark`) |

---

## 2. Tokens (Tailwind classes, already wired)

Page: `bg-background` `bg-background-muted`
Cards: `bg-surface` `bg-surface-elevated` `bg-surface-sunken`
Ink: `text-foreground` `text-muted` `text-subtle`
Accent: `text-primary` `bg-primary-soft` `text-secondary` `bg-secondary-soft`
Hairlines: `border-line` `border-line-strong`
Status: `text-success` `bg-success-soft` `text-warning` `bg-warning-soft` `text-danger`

**Never** write a raw hex value in a component. **Never** reintroduce navy, electric blue,
`oklch()` blue values, or a two-hue gradient.

---

## 3. Typography

Three faces, wired in the root layout via `next/font/google`:

| Variable | Font | Use |
| --- | --- | --- |
| `--font-inter-tight` | Inter Tight | everything by default |
| `--font-instrument-serif` | Instrument Serif | **italic emphasis words only** |
| `--font-jetbrains-mono` | JetBrains Mono | labels, IDs, code, metrics |

### The signature move — `<span className="serif">`

An **italic serif phrase embedded inside a sans headline**, on the 1–3 most important
words. This is the single most identifying device in the design.

```tsx
<h2>Four things, <span className="serif">done properly</span>.</h2>
<h1>Agents that ship<br />your <span className="serif">backlog</span>.</h1>
```

**Rules**
- Max 3 words, and only the emphasised words — never a whole line or a whole heading.
- **One per heading, maximum.** Two serif phrases in one heading is noise.
- `.serif` is already ember-coloured. Do not also wrap it in `text-primary`.
- On a dark surface, use the ember-soft tint instead: see `.surface-dark .serif` guidance
  in §5 — or just add `style={{ color: '#f0a97d' }}` is **not** allowed; use the
  `text-primary-soft` token.

### Scale
- `h1`: `text-[2.5rem] sm:text-6xl lg:text-[4.4rem] font-semibold tracking-[-0.045em] leading-[1.06]`
- `h2`: `text-3xl sm:text-5xl font-semibold tracking-[-0.04em] leading-[1.08]`
- `h3`: `text-lg sm:text-xl font-semibold tracking-[-0.025em]`
- Body: `text-base leading-[1.65] text-muted` (16px — **smaller than the old 18px, on purpose**)
- Lede: `text-[1.05rem] sm:text-[1.0625rem] leading-[1.66] text-muted`
- Labels: `.mono-label` (already styled, includes the leading rule)

**Do not** use `tracking-[-0.05em]` on body text. Negative tracking is for display sizes only.

---

## 4. Utilities available (all in globals.css)

| Class | What it does |
| --- | --- |
| `.surface` | white card, hairline, 14px radius |
| `.surface-elevated` | inset warm well |
| `.surface-dark` | **the dark product surface** with layered shadow |
| `.surface-hover` | lift on hover (translateY(-3px) + shadow) |
| `.mesh` + `.m-ember` `.m-sage` `.m-amber` `.m-fade` | warm gradient backdrop |
| `.dot-field` | subtle dot texture, pre-masked away from content |
| `.serif` | italic serif emphasis |
| `.mono-label` | uppercase mono eyebrow with leading rule |
| `.btn-primary` | **ink pill** — default action |
| `.btn-ember` | **ember pill** — the single most important action on a page |
| `.btn-secondary` | outlined pill |
| `.btn-ghost` | borderless text action |
| `.pill` `.pill-ok` `.pill-warn` `.pill-ember` | status chips |
| `.term-bar` `.term-dots` `.term-title` `.term-live` `.term-label` | dark chrome |
| `.diff` `.diff-head` `.diff-body` `.diff-ctx` `.diff-del` `.diff-add` `.diff-note` | agent review diff |
| `.kpi` `.kpi-k` `.kpi-v` `.kpi-d` | metric tile (dark surfaces) |
| `.pulse-dot` | live status dot with ping |
| `.animate-fade-up` `.fade-in` | the one entrance animation |
| `.prose-wtd` | article body (blog only) |

**Button hierarchy — pick correctly:**
- `btn-primary` (ink) = the normal primary CTA. Most pages use this.
- `btn-ember` = at most **one per page**, for the single most important action.
- `btn-secondary` = the paired secondary action.
- Two buttons in a hero: `btn-primary` + `btn-secondary`. Do not put two ember buttons together.

---

## 5. Dark surfaces — the signature device

Dark is no longer the page. It is reserved for **product evidence**: the agent run
dashboard, the diff panel, the KPI tiles, product showcase cards.

```tsx
<div className="surface-dark p-6">
  <div className="term-bar">
    <span className="term-dots"><i /><i /><i /></span>
    <span className="term-title">wtd-agents — run #4118</span>
    <span className="term-live"><i />LIVE</span>
  </div>
  …
</div>
```

Inside `.surface-dark`: text is white by default. Use `text-white/60` for body and
`text-white/38` for labels — or the `.term-label` / `.kpi-*` helpers.

**Text on a dark surface must not be pure `#fff` for body copy** — use white at 60–72%.

---

## 6. Layout & rhythm

- Container: `mx-auto max-w-7xl px-6 sm:px-10 lg:px-16`
- Section padding: `py-24 sm:py-32` (this was already right — do not inflate it)
- Page top padding for inner routes: `pt-32`
- Hairline dividers: `border-y border-line`
- Grid gaps: `gap-3.5` for bento (14px), `gap-6` for looser groups
- One `<h1>` per page. Never zero.

---

## 7. Motion

One entrance, reused. No parallax, no scroll-jacking, no marquees, no animated typing.
`framer-motion` is allowed only for once-only opacity/translate reveals
(`viewport={{ once: true }}`). Everything must respect `prefers-reduced-motion` —
globals.css already handles this.

---

## 8. Anti-patterns — these will get your work sent back

1. ❌ Navy / blue-black background, or any blue accent
2. ❌ Two-hue gradient text on a headline (`.gradient-text` is now single-hue only)
3. ❌ Full-strength grid background behind content (`.grid-bg` is faint + masked)
4. ❌ Glow blobs behind text
5. ❌ `.serif` on a whole heading, or twice in one heading
6. ❌ Square buttons — everything actionable is a pill
7. ❌ Making the whole page dark again
8. ❌ Raw hex in a component instead of a token
9. ❌ Changing copy, routes, metadata or JSON-LD
10. ❌ Adding a new font

---

## 9. Definition of done

1. `npx tsc --noEmit` — 0 errors repo-wide
2. `npx eslint <your files>` — exit 0
3. `grep -rn "oklch\|#0[0-9a-f]\{5\}\|#1[0-9a-f]\{5\}" <your files>` — no blue/navy values
4. Banned-word sweep from `REVAMP_CONTRACT.md` §1 still passes
5. Your pages still export `buildMetadata()` and emit the same JSON-LD
6. You report to the Lead

Do **not** run `npm run build` — the Lead runs the integration build.

---

## 10. Known characteristic: utility classes are unlayered

**Everything in `globals.css` is plain, unlayered CSS.** Tailwind v4 puts its own
utilities in `@layer utilities`, and unlayered CSS always beats layered CSS — so
**a Tailwind utility cannot override one of our utility classes.**

Concretely, this does *not* work:

```tsx
<button className="btn-primary px-8 text-lg">   {/* px-8 / text-lg are silently ignored */}
```

To override, use one of:

```tsx
<a className="btn-primary !px-8">              {/* important modifier */}
<a className="btn-primary [&]:px-8">           {/* arbitrary variant */}
<span><a className="btn-primary">…</a></span>  {/* restyle the child instead */}
```

Same applies to `.serif`, `.mono-label`, `.pill`, `.kpi-*`, `.diff-*`, `.term-*`,
`.surface*`, `.grid-bg`, `.glow`.

**Do not "fix" this by wrapping the file in `@layer components` without a full
visual regression pass** — it would change the computed result anywhere a Tailwind
utility is already present alongside one of these classes, which is exactly the kind
of change that looks harmless in a diff and breaks a layout in the browser.

## 11. Screenshot caveat

`framer-motion`'s `whileInView` does **not** resolve under headless Chrome with
`--virtual-time-budget`, so any `<Reveal>`-wrapped block photographs blank even
though its markup is server-rendered and correct. Confirm via SSR HTML before
treating a blank region in a screenshot as a bug.
