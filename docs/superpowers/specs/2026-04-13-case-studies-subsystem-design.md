# Case Studies Subsystem — Design (Plan 4)

**Status:** Approved for implementation planning
**Date:** 2026-04-13
**Parent spec:** `2026-04-13-bexovar-website-enhancement-design.md`
**Preceded by:** Plan 1 (foundation), Plan 2 (marketing pages), Plan 3 (demos).

## 1. Goal

Ship the `/case-studies` index and `/case-studies/[slug]` detail pages for the Bexovar site, providing anonymized proof that backs the headline metrics already visible on the homepage Proof strip.

## 2. Scope

**In:** Content module, 4 seed case studies (Finance, Logistics, Healthcare, Retail), index page with unified filter, detail pages with Situation / Built / Outcome / Delivered sections, pull quotes, related demo embeds, CTA band, SEO metadata, tests (unit + component + E2E).

**Out:** MDX pipeline; a 5th+ case study for additional industries; case-study logo assets; per-case-study OG images (inherits default).

## 3. Content format decision

Typed TypeScript content module (`web/src/content/case-studies.ts`) — consistent with every other content module in the codebase (`home.ts`, `services.ts`, `about.ts`, `how-we-work.ts`, `demos.ts`). MDX is explicitly deferred; revisit when a non-developer content editor needs to author prose without a PR.

## 4. Content schema

```ts
export type Industry = "Finance" | "Logistics" | "Healthcare" | "Retail";

// Re-use the existing service slugs from web/src/content/services.ts
export type ServiceSlug =
  | "custom-software"
  | "rpa-agents"
  | "integrations"
  | "consulting";

export type PullQuote = {
  quote: string;
  attribution: string; // anonymized title, e.g. "VP of Operations, mid-market lender"
};

export type HeadlineMetric = {
  value: string; // "42%"
  label: string; // "lower invoice processing cost"
};

export type CaseStudy = {
  slug: string;                           // URL segment, kebab-case, unique
  industry: Industry;
  services: readonly ServiceSlug[];       // 1+; drives the service filter chips
  engagementLength: string;               // "10 weeks", "4 months"
  clientDescriptor: string;               // "Mid-market specialty lender, ~200 staff"
  headlineOutcome: string;                // hero subtitle on detail page
  headlineMetric: HeadlineMetric;         // shown on card + detail hero
  cardSummary: string;                    // 1-line card body
  situation: string;                      // prose; paragraphs separated by \n\n
  whatWeBuilt: string;
  outcome: string;
  delivery: string;
  pullQuotes: readonly PullQuote[];       // 1-2 per study
  relatedDemoSlugs: readonly string[];    // must reference existing demo slugs
};

export const caseStudies: readonly CaseStudy[];      // 4 entries
export const caseStudyIndustries: readonly Industry[]; // derived display order
export const caseStudyServices: readonly ServiceSlug[]; // derived display order
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined;
```

### Seed content (4 case studies)

Each case study backs one metric already shown on the homepage Proof strip, so the site tells one coherent story.

| slug                            | industry    | engagement   | headline metric                          | primary service    |
|---------------------------------|-------------|--------------|------------------------------------------|--------------------|
| `finance-invoice-automation`    | Finance     | 10 weeks     | 42% lower invoice processing cost        | `rpa-agents`       |
| `logistics-shipment-reconciliation` | Logistics | 3 months   | 4h → 20min shipment reconciliation time  | `integrations`     |
| `healthcare-claims-intake`      | Healthcare  | 4 months     | $480K annual savings, year one           | `custom-software`  |
| `retail-ops-reallocation`       | Retail      | 6 months     | 3 FTE reallocated to growth work         | `consulting`       |

Each entry provides: 2–3 short paragraphs per Situation / Built / Outcome / Delivery section, 1–2 pull quotes with anonymized attribution, and 1–2 `relatedDemoSlugs` drawn from the existing demos catalog (e.g., `invoice-triage`, `shipment-reconciliation`, `claims-intake`, `portal-scraper`, `ops-copilot`).

## 5. Page structures

### `/case-studies` (index)

Composition, top to bottom:

1. **Hero section** — eyebrow "Case studies", title "Proof, not promises", subtitle about anonymized real engagements. `bg-bg-alt`, matches `/demos` hero styling.
2. **Filter row + grid** — `CaseStudiesBrowser` client component. Single chip row with `All + {industries in display order} + {service labels in display order}`. One active chip at a time. Grid of `CaseStudyCard` (2 cols md, 2 cols lg — 4 entries total, 2×2 grid). Empty-state message if the filter narrows to zero.
3. **CTA section** — reuses `CTASection` with a case-studies-specific heading.

Server page passes `{ caseStudies, caseStudyIndustries, caseStudyServices }` to the client `CaseStudiesBrowser`.

### `/case-studies/[slug]` (detail)

`generateStaticParams` returns all slugs. `generateMetadata` builds per-slug title and description. Structure:

1. **Hero** — industry · engagement length · headline outcome (h1). Subtitle = `clientDescriptor`. `bg-bg-alt`.
2. **Headline metric band** — big `value` + `label`, optional accent background.
3. **Four content sections** — Situation / What We Built / The Outcome / How It Was Delivered. Each is a `CaseStudySection` (h2 title + paragraphs rendered from `split("\n\n")`).
4. **Pull quotes** — stacked `PullQuote` blockquotes, rendered between sections 3 and 4 of the content for visual rhythm, or grouped after section 4 if content is short. Implementer choice; 1-2 quotes per study.
5. **Related demos strip** — eyebrow "Related demos", grid of `DemoCard` for each resolved `relatedDemoSlugs` entry. If zero resolved, section is omitted.
6. **CTA section** — reuses `CTASection`.

If the slug is unknown, render `notFound()` (Next.js 404 handler).

## 6. Component inventory

| Component | Kind | Responsibility |
|---|---|---|
| `CaseStudyCard` | server | Display industry tag + headline metric + 1-line summary + link. Visually analogous to `DemoCard` minus the video. |
| `CaseStudiesBrowser` | client | Own filter state, compute visible case studies (matching either `industry` OR any `serviceSlug`), render `CategoryFilter` + grid + empty state. Reuses existing generic `CategoryFilter<C>` from demos. |
| `PullQuote` | server | `<blockquote>` + attribution. |
| `CaseStudySection` | server | h2 title + paragraphs; splits prose on `\n\n`. |
| (re-used) `CategoryFilter<C>` | client | Generic chip row, already shipped in Plan 3. |
| (re-used) `DemoCard` | client | Already shipped in Plan 3. |
| (re-used) `CTASection`, `SectionHeader`, `Container` | server | Already shipped. |

Filter labels for services use human-readable names. Reuse the label map already in `web/src/content/services.ts`; expose a thin lookup if needed.

## 7. Filtering logic

Unified chip row. Chip values are `"All" | Industry | ServiceSlug`. Active chip string is narrowed by shape at selection time. Filter predicate:

```ts
function matchesActive(cs: CaseStudy, active: "All" | Industry | ServiceSlug): boolean {
  if (active === "All") return true;
  if (caseStudyIndustries.includes(active as Industry)) return cs.industry === active;
  return cs.services.includes(active as ServiceSlug);
}
```

Chip display order: `All`, then industries in `caseStudyIndustries` order, then services in `caseStudyServices` order. Industry chips display the industry name directly. Service chips display the human label (e.g. `"RPA & Agents"`), not the slug.

## 8. Files

**New:**
- `web/src/content/case-studies.ts`
- `web/src/content/case-studies.test.ts`
- `web/src/components/marketing/case-study-card.tsx` (+ `.test.tsx`)
- `web/src/components/marketing/pull-quote.tsx` (+ `.test.tsx`)
- `web/src/components/marketing/case-study-section.tsx` (+ `.test.tsx`)
- `web/src/components/sections/case-studies-browser.tsx` (+ `.test.tsx`)
- `web/src/app/case-studies/page.tsx`
- `web/src/app/case-studies/[slug]/page.tsx`

**Modified:**
- `web/tests/e2e/smoke.spec.ts` — add coverage.
- `web/src/content/services.ts` — expose a `serviceLabelBySlug(slug: ServiceSlug): string` helper if one doesn't already exist, for the filter chip labels. (Implementer verifies what's there; only add what's missing.)

**No modifications required:**
- `siteConfig.nav` already contains `{ href: "/case-studies", label: "Case Studies" }`.
- `DemoCard`, `CategoryFilter` imported as-is.

## 9. Testing

**Unit (content integrity):**
- `caseStudies` has exactly 4 entries.
- Slugs are unique.
- Every entry's `services` elements exist in the `services` catalog (imported from `@/content/services`).
- Every entry's `relatedDemoSlugs` elements exist in the `demos` catalog (imported from `@/content/demos`).
- `getCaseStudyBySlug` returns the right entry and `undefined` for unknown slugs.

**Component:**
- `CaseStudyCard` renders industry tag, headline metric, summary, and link to `/case-studies/<slug>`.
- `PullQuote` renders quote and attribution (`<blockquote>`, `<cite>` or equivalent).
- `CaseStudySection` splits `\n\n` into `<p>` paragraphs; renders the title as h2.
- `CaseStudiesBrowser` shows all on "All", filters by clicked industry chip, filters by clicked service chip, shows empty state when the current catalog has no matches.

**Pages:**
- `/case-studies` and `/case-studies/[slug]` build (covered by `pnpm build` in verification).
- `generateStaticParams` returns all 4 slugs.

**E2E (`web/tests/e2e/smoke.spec.ts` additions):**
- `/case-studies` renders hero, all industry + service chips, and 4 cards.
- Clicking a service chip narrows the grid to cards tagged with that service.
- Clicking a card navigates to the detail page and the detail hero shows the expected headline outcome.
- Detail page renders all four section headings (Situation, What We Built, The Outcome, How It Was Delivered) and at least one related demo card.

## 10. Non-goals / explicit out-of-scope

- Per-case-study OG images, logos, real client names, multi-author attribution, comment systems.
- Pagination — 4 cards fit comfortably in a single grid.
- Shareable deep-links to filtered states (URL query params for filters).
- CMS wiring; case studies remain TS-authored until the team needs otherwise.

## 11. Risk / open questions

None remaining. Content format, count, filter model, and related-demo linking were all resolved during brainstorming.
