# WeThinkDigital — Review Report

**Mode:** `/design review`  
**Surface:** Homepage (`/`)  
**Observed:** 2026-08-08

## Overall

**Score: 20/50 — REWORK THE DIRECTION**

The homepage works as a content container, but the experience does not yet establish a memorable point of view. It asks visitors to accept broad agency claims before showing a clear, specific proof path. The strongest implementation decision is the working ROI calculator; the visual system currently buries that artifact inside repeated cards and generic marketing language.

## Lens scores

| # | Lens | Score | Review finding |
|---|---|---:|---|
| 1 | First impression | 3/10 | The centered “Build Tomorrow’s Digital Experiences Today” hero could belong to almost any software agency. The video adds atmosphere but not business evidence. |
| 2 | Hierarchy | 4/10 | Hero, services, strategy tiles, keywords, calculator, proof, process, blog, and contact are mostly given the same centered heading/card rhythm. |
| 3 | Color voice | 3/10 | Purple-blue gradients, slate backgrounds, and green success numbers are familiar software defaults rather than a WeThinkDigital-specific palette. |
| 4 | Type voice | 4/10 | Geist is loaded but the CSS theme declares Inter/system sans; the page uses oversized repeated headings without a deliberate editorial scale or measure. |
| 5 | Interaction feel | 6/10 | The page has functional tabs, accordions, expansion, calculator submission, and a mobile menu, but hover-scale motion is overused and failure/focus states are weak. |

## First read

I arrive on a full-screen video with a centered headline, two equal actions, and a fixed navigation bar. I understand “digital agency,” but not what WeThinkDigital does differently, who it is for, or what evidence I should inspect first. The phrase “digital experiences” is category language, not a product-specific promise.

## Primary flow

1. The visitor sees the hero and can scroll or choose either CTA.
2. The next section asks the visitor to stop guessing, then presents questions and generic answers.
3. Services are shown as six equal glass cards.
4. The ROI calculator appears later and is the clearest concrete tool.
5. Case studies and contact are further down, after many repeated CTAs.

The story breaks between promise and proof. The strongest artifact, the calculator and its assumptions, should be part of the initial decision path rather than a late module.

## Top improvements

### P0 — Recompose around a growth decision

Move from a centered hero plus feature sequence to an asymmetric claim/proof/action composition. Lead with the Dubai revenue problem, show a compact case-study result or calculator preview beside it, and provide one primary contact action.

### P1 — Replace the default palette and depth system

Remove blue-violet gradients and global glass blur. Use an ink/navy canvas, sand text, and a restrained mineral-orange action color tied to the Dubai heat and commercial focus. Separate sections with surface shifts and rules, not identical translucent cards.

### P1 — Give content a hierarchy

Make services a ranked set of offers, not six equal tiles. Turn process into a numbered path with flat rows. Keep case-study outcomes as proof with client and timeframe context. Reduce keyword inventory and generic blog promotion.

### P2 — Tune interaction and copy

Remove scale animation from cards and controls, add visible keyboard focus, handle contact failures in the UI, and replace “10x,” “dominate,” “empire,” and “digital experiences” with specific language tied to measurable acquisition work.

## Recommended next modes

`/design relayout`, `/design recolor`, `/design typeset`, then `/design interaction`.
