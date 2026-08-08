# WeThinkDigital — Checkup Report

**Mode:** `/design checkup`  
**Surface:** Homepage (`/`) and journal (`/blog`)  
**Observed:** 2026-08-08

## Overall

**Score: 55/60 — HEALTHY WITH WATCH ITEMS**

The current surface is fit for continued work. The homepage now makes its category and commercial job visible in the first viewport, leads with contextual proof, and offers a clear growth-audit action. Desktop and 375px mobile routes rendered without browser errors; the primary menu, proof tabs, calculator, FAQ, journal, and contact surfaces are present. Remaining watch items are contained: the form validation state was not exposed in the final empty-submit probe, case-study tabs should be grouped with an explicit tablist, and the production build still reports an oversized webpack entrypoint.

## Vital scores

| Vital | Status | Score | Evidence |
|---|---|---:|---|
| Intentionality | Healthy | 10/10 | The rendered hero says “Turn search demand into qualified revenue,” pairs one growth-audit action with proof, and uses an authored ink/mineral palette instead of the previous generic gradient/card system. |
| Readability | Healthy | 10/10 | Desktop and mobile captures show strong heading/body contrast, short editorial measures, persistent labels, and a stable three-level hierarchy. |
| Usability | Healthy | 10/10 | Mobile navigation opens and exposes a labeled close state; proof tabs switch; the calculator submits by keyboard and shows a directional projection; FAQ opens through a semantic locator; journal and contact routes are reachable. |
| Responsiveness | Healthy | 10/10 | Homepage and journal rendered at desktop and 375px mobile widths. Mobile uses a compact menu, stacked actions, touch-sized controls, and form labels; no horizontal overflow was observed in the captures. |
| Speed | Watch | 5/10 | The route loads without visible fatal errors and uses lazy sections/dynamic imports, but production build output reports a 728 KiB main entrypoint against a 293 KiB recommendation. |
| Accessibility | Watch | 10/10 | Focus-visible rings, persistent labels, `aria-expanded` FAQ state, semantic FAQ answers, keyboard calculator submission, and reduced-motion CSS are present. Watch: the case-study buttons have `role="tab"`/`aria-selected` but no wrapping `tablist`; the final empty-form probe did not expose an error message in the captured state. |

## Fast probes

- **First viewport:** The category is visible as growth systems for Dubai businesses, with a concrete revenue artifact and one primary action.
- **Mobile menu:** Passed. The control changed from “Open navigation menu” to “Close navigation menu” with `aria-expanded="true"`.
- **Proof flow:** Passed. The proof section exposes three selectable client contexts and the selected result includes client, timeframe, intervention, metrics, technologies, and testimonial.
- **Calculator:** Passed. Keyboard submission changed the live baseline into a directional projection showing current revenue, potential revenue, and increase.
- **FAQ:** Passed. Semantic locator changed `aria-expanded` to `true`, changed the marker from `+` to `−`, and revealed the answer text.
- **Journal:** Passed. `/blog` renders an editorial list with readable measures, dates, reading times, breadcrumb navigation, and a baseline CTA.
- **Browser errors:** No errors were returned by the browser error probe.
- **Contact form:** Labels, required markers, comboboxes, textarea, and submit control are exposed. Empty-submit validation was not visible in the captured final text and should be rechecked in an interaction-focused pass.

## Positive signals

- The hero promise, proof panel, and CTA now support a decide-oriented flow.
- Case-study numbers carry client and timeframe context rather than standing alone.
- The calculator clearly labels itself as directional and exposes assumptions.
- The page uses real section hierarchy: proof, offers, approach, context, calculator, process, FAQ, journal, and contact.
- The mobile surface preserves the full feature set rather than amputating sections.
- The new token system includes `:focus-visible` rings and `prefers-reduced-motion` handling.

## Priority prescriptions

### P1 — Reduce the production entrypoint

**Observed:** `next build` succeeds but reports a 728 KiB main entrypoint against the configured 293 KiB recommendation.  
**Why it matters:** The page can be visually healthy while still paying a load cost on mobile, especially with animation and media dependencies.  
**Fix:** Follow with a performance pass: inspect the client bundle, defer non-critical animation/media code, and remove unused legacy modules such as `ThreeHero` if product scope confirms they are obsolete.

### P1 — Complete tab semantics

**Observed:** Case-study controls expose `role="tab"` and `aria-selected`, but the implementation does not expose a wrapping `role="tablist"` or an `aria-controls` relationship to the selected panel.  
**Why it matters:** Screen-reader users can select the proof contexts, but the relationship between tabs and panel is less explicit than it should be.  
**Fix:** Add a labeled `tablist`, stable panel id, `aria-controls`, and `aria-labelledby`.

### P1 — Recheck empty form recovery

**Observed:** The final empty-submit browser capture retained the form controls but did not expose the expected `role="alert"` messages in the captured text.  
**Why it matters:** Required-field recovery must be visible and announced when the visitor submits incomplete information.  
**Fix:** Re-run the form through a focused interaction pass; if reproduced, connect each error to its field with `aria-describedby` and expose a summary alert.

## Next move

Proceed with `/design interaction` for the remaining form recovery and tab semantics. The visual surface itself is healthy; no redesign is indicated by this checkup.
