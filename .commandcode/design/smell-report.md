# WeThinkDigital — Smell Report

**Mode:** `/design smell`  
**Surface:** Homepage (`/`)  
**Observed:** 2026-08-08

## Overall

**Score: 1/10 — IDENTITY FAILURE**

The homepage is functional but reads as a generated digital-agency template. The strongest tells cluster across composition, palette, depth, type, motion, and copy. The visual direction can be guessed before reading the brand name: dark SaaS canvas, blue-violet gradients, glass cards, generic growth claims, and repeated equal-weight modules.

## Heuristic scores

| # | Heuristic | Score | Observed finding |
|---|---|---:|---|
| 1 | Tech gradient | 0/1 | Purple-to-blue gradient text, buttons, hero placeholder, timeline, and service accents repeat across the page. |
| 2 | Generic tech hue | 0/1 | `--primary: #6b46c1` and `--secondary: #3b82f6` make the identity the default software-agency blue-purple. |
| 3 | Feature tile grid | 0/1 | Services, strategy, keywords, blog posts, contact details, and ROI stats are all presented as repeated equal cards or tiles. |
| 4 | Accent rail | 1/1 | No dominant colored side rail was observed. |
| 5 | Unearned blur | 0/1 | `.glass` uses translucent surfaces and `backdrop-filter: blur(10px)` throughout without a meaningful depth hierarchy. |
| 6 | Stat monument | 0/1 | ROI quick stats and case-study metrics are isolated numbers without enough evidence context in the primary flow. |
| 7 | Icon topper | 0/1 | Emoji and oversized icons decorate process, calculator, and contact blocks instead of carrying domain meaning. |
| 8 | Bounce everywhere | 0/1 | `whileHover` scale and `whileTap` scale are applied to navigation, cards, buttons, social links, and floating WhatsApp action. |
| 9 | Default type | 0/1 | Inter/system sans is declared without a tuned type scale; oversized centered headings repeat the same treatment. |
| 10 | Center stack | 0/1 | Hero and nearly every section heading use centered alignment, even where proof, comparison, or action would benefit from an editorial split. |

## Priority smells

### P0 — Generic agency identity

**Reflex:** Start with a dark canvas, blue-violet gradient, centered hero, and “digital experiences” headline.  
**Evidence:** Rendered hero reads “Build Tomorrow’s Digital Experiences Today,” with gradient text and two equal CTAs. `globals.css` repeats the gradient in `.gradient-text` and `.btn-primary`.  
**Replacement:** Make the page about the concrete Dubai growth artifact: a measurable acquisition system. Use a warm mineral/ink palette, an asymmetric hero with a proof panel, and one primary action.

### P1 — Uniform card grammar

**Reflex:** Put every service, insight, statistic, and contact item into the same translucent rounded card.  
**Evidence:** `.glass` is reused by Keywords, Services, Process, CaseStudies, ROICalculator, ContactForm, and blog sections. The services array renders six equal cards in a `md:grid-cols-3` layout.  
**Replacement:** Give each section its own job. Use a ranked service list with one lead service, a horizontal proof strip for outcomes, a split calculator/form surface, and flat editorial sections with dividers instead of nested glass cards.

### P1 — Decoration substituting for evidence

**Reflex:** Use emoji, oversized icons, isolated ROI numbers, and vague claims to fill hierarchy.  
**Evidence:** Process uses emoji icons (`🔍`, `🎨`, `⚡`, `🚀`, `👑`); calculator starts with `💡`; contact info uses `📧`, `📱`, `📍`; copy claims “Dubai domination,” “10x your business,” and “millions” without linked proof.  
**Replacement:** Keep the real case-study outcomes, label the inputs and assumptions in the calculator, and make proof statements specific to client, intervention, timeframe, and measured result.

### P2 — Interaction motion as ornament

**Reflex:** Scale everything on hover/tap for perceived polish.  
**Evidence:** Repeated `whileHover={{ scale: 1.05 }}`, `whileTap={{ scale: 0.95 }}`, and card `whileHover={{ scale: 1.05 }}` across components.  
**Replacement:** Reserve motion for section entry, active tabs, menu state, FAQ expansion, and form feedback. Use color/border/focus changes for hover and remove scale from content cards.

## Domain default trap

This is recognizable as a generic dark digital-marketing site before the name is read. The replacement should keep the Dubai/revenue focus but break the default with authored editorial pacing, mineral orange as the action color, ink/navy surfaces, and concrete acquisition proof rather than abstract “digital experiences.”

## Recommended modes

- `/design relayout` for the center-stack and equal-card structure.
- `/design recolor` for the blue-violet gradient and depth system.
- `/design typeset` for the uncommitted heading scale and copy hierarchy.
- `/design interaction` for motion, focus, and form feedback.
