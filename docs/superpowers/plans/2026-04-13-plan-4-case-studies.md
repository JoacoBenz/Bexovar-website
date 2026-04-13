# Plan 4: Case Studies Subsystem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `/case-studies` index (filterable grid of 4 anonymized studies) and `/case-studies/[slug]` detail pages for the Bexovar site.

**Architecture:** Typed TS content module `web/src/content/case-studies.ts` drives everything. Four seed case studies back the homepage Proof-strip metrics (Finance, Logistics, Healthcare, Retail). New presentational components (`CaseStudyCard`, `PullQuote`, `CaseStudySection`) and one client orchestrator (`CaseStudiesBrowser`) that reuses the generic `CategoryFilter<C>` shipped in Plan 3. Both routes are statically generated.

**Tech Stack:** Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Vitest + Testing Library · Playwright.

**Spec:** `docs/superpowers/specs/2026-04-13-case-studies-subsystem-design.md`.

---

## File Structure

**New:**
- `web/src/content/case-studies.ts` — schema (`Industry`, `ServiceSlug`, `CaseStudy`, `PullQuote`, `HeadlineMetric`), seed catalog, lookups.
- `web/src/content/case-studies.test.ts` — integrity tests (slug uniqueness, service/demo cross-refs).
- `web/src/components/marketing/case-study-card.tsx` + `.test.tsx` — card with industry tag + metric + link.
- `web/src/components/marketing/pull-quote.tsx` + `.test.tsx` — blockquote + attribution.
- `web/src/components/marketing/case-study-section.tsx` + `.test.tsx` — h2 + paragraphs from `\n\n`-split prose.
- `web/src/components/sections/case-studies-browser.tsx` + `.test.tsx` — client; filter state + grid + empty state.
- `web/src/app/case-studies/page.tsx` — server index page.
- `web/src/app/case-studies/[slug]/page.tsx` — server detail page.

**Modified:**
- `web/src/content/services.ts` — add `serviceLabelBySlug` helper.
- `web/tests/e2e/smoke.spec.ts` — append case-studies E2E tests.

---

## Prerequisites

- Plan 1, 2, and 3 merged (branch `master`). The demos catalog, `CategoryFilter<C>`, `DemoCard`, `CTASection`, `SectionHeader`, `Container`, `siteConfig` all exist.
- Start work on a new branch: `git checkout -b feat/plan-4-case-studies` from repo root `D:/Bexovar/bexovar-website`.
- `pnpm` installed; `pnpm install` already run in `web/`.
- Shell is bash on Windows — use forward slashes. Run test commands from `web/`, git commands from the repo root.

---

## Task 1: Service label helper

**Files:**
- Modify: `web/src/content/services.ts`
- Create: (test additions inline via a new `web/src/content/services.test.ts`, if one does not already exist — check first).

- [ ] **Step 1: Check for an existing services test file**

```bash
ls web/src/content/services.test.ts 2>/dev/null || echo "absent"
```

If absent, create a new test file in Step 2. If present, append the new test case to it.

- [ ] **Step 2: Write failing test**

Add to (or create) `web/src/content/services.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { serviceLabelBySlug, services } from "./services";

describe("serviceLabelBySlug", () => {
  it("returns the service title for a known slug", () => {
    expect(serviceLabelBySlug("custom-software")).toBe(
      services.find((s) => s.slug === "custom-software")!.title,
    );
  });

  it("returns undefined for an unknown slug", () => {
    expect(serviceLabelBySlug("does-not-exist")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test; expect FAIL**

```bash
cd web && pnpm test src/content/services.test.ts
```

Expected: FAIL with "serviceLabelBySlug is not a function" or similar.

- [ ] **Step 4: Implement helper in `web/src/content/services.ts`**

Append at the end of the file:

```ts
export function serviceLabelBySlug(slug: string): string | undefined {
  return services.find((s) => s.slug === slug)?.title;
}
```

- [ ] **Step 5: Run test; expect PASS**

```bash
cd web && pnpm test src/content/services.test.ts
```

- [ ] **Step 6: Commit**

```bash
git add web/src/content/services.ts web/src/content/services.test.ts
git commit -m "feat(web): serviceLabelBySlug lookup helper"
```

---

## Task 2: Case-studies content module

**Files:**
- Create: `web/src/content/case-studies.ts`
- Create: `web/src/content/case-studies.test.ts`

- [ ] **Step 1: Write failing test**

Path: `web/src/content/case-studies.test.ts`

```ts
import { describe, it, expect } from "vitest";
import {
  caseStudies,
  caseStudyIndustries,
  caseStudyServices,
  getCaseStudyBySlug,
  type CaseStudy,
  type Industry,
} from "./case-studies";
import { services } from "./services";
import { demos } from "./demos";

describe("case-studies content module", () => {
  it("has exactly 4 entries", () => {
    expect(caseStudies).toHaveLength(4);
  });

  it("exposes industries in Finance · Logistics · Healthcare · Retail order", () => {
    expect(caseStudyIndustries).toEqual(["Finance", "Logistics", "Healthcare", "Retail"]);
  });

  it("exposes services in the order used by site-config", () => {
    expect(caseStudyServices).toEqual([
      "custom-software",
      "rpa-agents",
      "integrations",
      "consulting",
    ]);
  });

  it("has unique slugs", () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("covers each of the four industries exactly once", () => {
    for (const ind of caseStudyIndustries) {
      expect(caseStudies.filter((c) => c.industry === ind)).toHaveLength(1);
    }
  });

  it("every service reference resolves in the services catalog", () => {
    const validSlugs = new Set(services.map((s) => s.slug));
    for (const cs of caseStudies) {
      for (const svc of cs.services) {
        expect(validSlugs.has(svc)).toBe(true);
      }
    }
  });

  it("every relatedDemoSlug resolves in the demos catalog", () => {
    const validSlugs = new Set(demos.map((d) => d.slug));
    for (const cs of caseStudies) {
      for (const slug of cs.relatedDemoSlugs) {
        expect(validSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("every entry has at least one pull quote with quote + attribution", () => {
    for (const cs of caseStudies) {
      expect(cs.pullQuotes.length).toBeGreaterThan(0);
      for (const q of cs.pullQuotes) {
        expect(q.quote).toBeTruthy();
        expect(q.attribution).toBeTruthy();
      }
    }
  });

  it("every entry has non-empty prose for all four narrative sections", () => {
    for (const cs of caseStudies) {
      expect(cs.situation).toBeTruthy();
      expect(cs.whatWeBuilt).toBeTruthy();
      expect(cs.outcome).toBeTruthy();
      expect(cs.delivery).toBeTruthy();
    }
  });

  it("getCaseStudyBySlug returns the right entry and undefined for unknown", () => {
    const first = caseStudies[0];
    expect(getCaseStudyBySlug(first.slug)?.slug).toBe(first.slug);
    expect(getCaseStudyBySlug("does-not-exist")).toBeUndefined();
  });

  it("types export correctly", () => {
    const cs: CaseStudy = caseStudies[0];
    const ind: Industry = cs.industry;
    expect(cs.slug).toBeTruthy();
    expect(ind).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/content/case-studies.test.ts
```

Expected: FAIL with "Cannot find module './case-studies'".

- [ ] **Step 3: Implement `web/src/content/case-studies.ts`**

```ts
export const caseStudyIndustries = [
  "Finance",
  "Logistics",
  "Healthcare",
  "Retail",
] as const;

export type Industry = (typeof caseStudyIndustries)[number];

export const caseStudyServices = [
  "custom-software",
  "rpa-agents",
  "integrations",
  "consulting",
] as const;

export type ServiceSlug = (typeof caseStudyServices)[number];

export type PullQuote = {
  quote: string;
  attribution: string;
};

export type HeadlineMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  industry: Industry;
  services: readonly ServiceSlug[];
  engagementLength: string;
  clientDescriptor: string;
  headlineOutcome: string;
  headlineMetric: HeadlineMetric;
  cardSummary: string;
  situation: string;
  whatWeBuilt: string;
  outcome: string;
  delivery: string;
  pullQuotes: readonly PullQuote[];
  relatedDemoSlugs: readonly string[];
};

export const caseStudies = [
  {
    slug: "finance-invoice-automation",
    industry: "Finance",
    services: ["rpa-agents", "custom-software"],
    engagementLength: "10 weeks",
    clientDescriptor: "Mid-market specialty lender, ~200 staff",
    headlineOutcome: "42% lower invoice processing cost and 4-day faster close.",
    headlineMetric: { value: "42%", label: "lower invoice processing cost" },
    cardSummary:
      "Cut AP processing cost by 42% by replacing manual triage with automation plus a lightweight approval app.",
    situation:
      "Accounts payable was fielding 6,000+ invoices a month across a shared inbox, a vendor portal, and paper mail. A four-person team spent most of their week on data entry, GL coding, and chasing approvals. Month-end close slipped consistently because reconciliations waited on backlog.\n\nLeadership wanted to stop growing headcount to keep up with invoice volume without disrupting existing ERP workflows.",
    whatWeBuilt:
      "A pipeline that ingests invoices from inbox, portal, and scanned mail, runs OCR + LLM-assisted field extraction, matches to POs, applies GL-coding rules, and routes exceptions to an approval app we built on top of the existing ERP. The approval app keeps humans in the loop where it matters (exceptions, first-time vendors) while auto-approving straight-through-processing cases under configured thresholds.\n\nWe kept the ERP itself untouched — everything writes back through its existing API.",
    outcome:
      "Straight-through processing landed at 71% within the first full month after go-live. Processing cost per invoice dropped 42% versus the prior six-month baseline. Monthly close shortened by four business days, and the AP team reallocated two FTE to vendor-management work that had been perpetually deferred.\n\nError rate on GL coding fell because the rules engine is auditable and consistent — previously a source of recurring month-end corrections.",
    delivery:
      "Ten-week fixed-scope engagement. Weekly demos against real invoice samples drawn from a sanitized production export. We ran two parallel tracks: the extraction pipeline and the approval UI. Handoff included runbooks, a per-rule audit trail, and 90 days of priority support.",
    pullQuotes: [
      {
        quote:
          "We stopped asking whether we needed to hire another AP clerk. That question just went away.",
        attribution: "VP of Finance, mid-market specialty lender",
      },
    ],
    relatedDemoSlugs: ["invoice-triage", "portal-scraper"],
  },
  {
    slug: "logistics-shipment-reconciliation",
    industry: "Logistics",
    services: ["integrations", "custom-software"],
    engagementLength: "3 months",
    clientDescriptor: "Regional 3PL operator, 12 warehouses",
    headlineOutcome:
      "Cut shipment reconciliation from 4 hours to 20 minutes per day across all sites.",
    headlineMetric: { value: "4h → 20min", label: "shipment reconciliation time" },
    cardSummary:
      "Replaced a manual carrier-vs-WMS matching process with an idempotent integration that surfaces only real exceptions.",
    situation:
      "Warehouse ops teams spent roughly four hours every morning reconciling carrier EDI feeds against WMS receipts across twelve sites. Discrepancies — short shipments, damaged-in-transit flags, rate mismatches — got lost in spreadsheets and resurfaced weeks later as billing disputes.\n\nThe team knew most of the reconciliation was the same patterns repeated per site. They wanted the machine to do the easy work and escalate only the judgment calls.",
    whatWeBuilt:
      "A reconciliation service that subscribes to carrier EDI, joins against WMS receipts, and classifies differences into auto-resolve, review, and escalate. The service is idempotent and replay-safe, so a bad feed or retried message doesn't corrupt state. A small exceptions inbox — one per warehouse — surfaces only the items needing human judgment, with suggested adjustments pre-filled.",
    outcome:
      "Per-site reconciliation dropped from roughly four hours a day to about twenty minutes. Billing disputes tracing back to unresolved receipt mismatches fell by more than half within the first quarter. The ops team now spends the recovered time on carrier-performance reviews that previously never happened.",
    delivery:
      "Three-month engagement rolled out site by site, starting with the two highest-volume warehouses to prove the model. Weekly demos against live feeds. Handoff included a carrier-onboarding checklist, replay tooling, and SLAs on the exceptions inbox.",
    pullQuotes: [
      {
        quote:
          "Our warehouse managers used to fight over who had to do the reconciliation. Now it's just a tab they check after coffee.",
        attribution: "Director of Operations, regional 3PL",
      },
      {
        quote: "Idempotent replay saved us the week we had a bad carrier feed. The system just re-converged.",
        attribution: "Head of IT, regional 3PL",
      },
    ],
    relatedDemoSlugs: ["shipment-reconciliation", "crm-erp-sync"],
  },
  {
    slug: "healthcare-claims-intake",
    industry: "Healthcare",
    services: ["custom-software", "integrations"],
    engagementLength: "4 months",
    clientDescriptor: "Regional healthcare billing service, ~80 staff",
    headlineOutcome: "$480K annual savings and faster payer turnaround in year one.",
    headlineMetric: { value: "$480K", label: "annual savings, year one" },
    cardSummary:
      "Automated the first-pass eligibility check on incoming claims so staff only handle exceptions.",
    situation:
      "The billing team was manually parsing claims from clinic partners, checking payer eligibility one claim at a time through four different payer portals, and routing work by paper pickup. Turnaround time was inconsistent — some claims sat for a week before anyone touched them.\n\nThe owners were weighing whether to hire three more claims analysts or re-examine the process.",
    whatWeBuilt:
      "A claims intake service that parses inbound documents, calls each payer's eligibility API (with queue-based retries for flaky endpoints), applies routing rules to land claims in the right work queue, and flags anything anomalous for review. We also built a lightweight dashboard so team leads can see queue depth and aging at a glance.\n\nNo EHR changes — the service reads and writes through existing integration points.",
    outcome:
      "Average time-to-first-touch on new claims dropped from days to under an hour. Roughly 62% of claims now flow through first-pass automation without human intervention. Year-one savings landed at $480K, driven by the headcount that didn't need to be hired plus faster payer turnaround shortening revenue cycles.",
    delivery:
      "Four months, split into a six-week MVP against a single payer and a payer-by-payer rollout afterward. Weekly demos, with compliance review gates before each payer went live. Handoff included PHI handling runbooks, audit logs, and a 90-day support window.",
    pullQuotes: [
      {
        quote:
          "We were ready to sign offers on three new analysts. Instead we brought two existing people up into team-lead roles.",
        attribution: "Owner, regional healthcare billing service",
      },
    ],
    relatedDemoSlugs: ["claims-intake"],
  },
  {
    slug: "retail-ops-reallocation",
    industry: "Retail",
    services: ["consulting", "rpa-agents"],
    engagementLength: "6 months",
    clientDescriptor: "Multi-brand specialty retailer, 40+ locations",
    headlineOutcome: "Freed 3 FTE for growth work without cutting any roles.",
    headlineMetric: { value: "3 FTE", label: "reallocated to growth work" },
    cardSummary:
      "Process mapping plus targeted automation on three high-volume workflows reclaimed three roles' worth of time.",
    situation:
      "Store operations, inventory, and marketing ops each had one or two processes that quietly consumed a full person's week — vendor catalog normalization, end-of-day reporting rollups, and promotional asset packaging. None was big enough to justify its own project; collectively they blocked the team from strategic work.",
    whatWeBuilt:
      "We ran a short diagnostic to quantify time spent on repeatable work across the three areas, then built focused automations for the top three bottlenecks: a catalog normalization bot, an end-of-day reporting pipeline, and a promo-asset packager. Each one shipped independently with a fallback path so the team could pull the plug on any single piece without blocking the others.",
    outcome:
      "The three automations combined reclaimed roughly 120 hours per week — three full-time equivalents' worth of routine work. No roles were eliminated; the reclaimed time went to category expansion, a new-store-opening playbook, and a merchandising refresh that had been deferred for over a year.",
    delivery:
      "Six-month engagement: four weeks of process mapping and prioritization, then three parallel two-month tracks — one automation per track. Biweekly steering reviews with the operations leadership team. Handoff included monitoring dashboards and a playbook for adding the next automation candidate.",
    pullQuotes: [
      {
        quote:
          "We weren't short on ideas. We were short on hours. This gave us the hours back.",
        attribution: "COO, multi-brand specialty retailer",
      },
    ],
    relatedDemoSlugs: ["portal-scraper", "ops-copilot"],
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
cd web && pnpm test src/content/case-studies.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Type-check**

```bash
cd web && pnpm exec tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add web/src/content/case-studies.ts web/src/content/case-studies.test.ts
git commit -m "feat(web): case-studies content module with four seed studies"
```

---

## Task 3: CaseStudyCard component

**Files:**
- Create: `web/src/components/marketing/case-study-card.tsx`
- Create: `web/src/components/marketing/case-study-card.test.tsx`

- [ ] **Step 1: Write failing test**

Path: `web/src/components/marketing/case-study-card.test.tsx`

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudyCard } from "./case-study-card";
import type { CaseStudy } from "@/content/case-studies";

const cs: CaseStudy = {
  slug: "finance-invoice-automation",
  industry: "Finance",
  services: ["rpa-agents"],
  engagementLength: "10 weeks",
  clientDescriptor: "Mid-market specialty lender",
  headlineOutcome: "42% lower invoice processing cost.",
  headlineMetric: { value: "42%", label: "lower invoice processing cost" },
  cardSummary: "Cut AP processing cost by 42%.",
  situation: "s",
  whatWeBuilt: "b",
  outcome: "o",
  delivery: "d",
  pullQuotes: [{ quote: "q", attribution: "a" }],
  relatedDemoSlugs: [],
};

describe("CaseStudyCard", () => {
  it("renders industry tag, headline metric, summary, and link to the detail page", () => {
    render(<CaseStudyCard caseStudy={cs} />);
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText(/lower invoice processing cost/i)).toBeInTheDocument();
    expect(screen.getByText(/cut ap processing cost by 42%/i)).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /read the finance-invoice-automation case study/i });
    expect(link).toHaveAttribute("href", "/case-studies/finance-invoice-automation");
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/marketing/case-study-card.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/marketing/case-study-card.tsx`**

```tsx
import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      <div className="mb-3">
        <span className="inline-block rounded-full bg-bg-alt px-2 py-0.5 text-xs text-ink-muted">
          {caseStudy.industry}
        </span>
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-ink">{caseStudy.headlineMetric.value}</span>
        <span className="text-sm text-ink-muted">{caseStudy.headlineMetric.label}</span>
      </div>
      <p className="mb-5 flex-1 text-sm text-ink-muted">{caseStudy.cardSummary}</p>
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="text-sm font-medium text-accent hover:text-accent-hover"
        aria-label={`Read the ${caseStudy.slug} case study`}
      >
        Read case study →
      </Link>
    </article>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
cd web && pnpm test src/components/marketing/case-study-card.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/marketing/case-study-card.tsx web/src/components/marketing/case-study-card.test.tsx
git commit -m "feat(web): CaseStudyCard with industry tag, metric, and detail link"
```

---

## Task 4: PullQuote component

**Files:**
- Create: `web/src/components/marketing/pull-quote.tsx`
- Create: `web/src/components/marketing/pull-quote.test.tsx`

- [ ] **Step 1: Write failing test**

Path: `web/src/components/marketing/pull-quote.test.tsx`

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PullQuote } from "./pull-quote";

describe("PullQuote", () => {
  it("renders the quote inside a blockquote and the attribution", () => {
    render(<PullQuote quote="We stopped asking." attribution="VP of Finance" />);
    const block = screen.getByText(/we stopped asking/i).closest("blockquote");
    expect(block).not.toBeNull();
    expect(screen.getByText(/VP of Finance/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/marketing/pull-quote.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/marketing/pull-quote.tsx`**

```tsx
export function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="my-10 border-l-4 border-accent pl-6">
      <blockquote className="text-xl italic text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-sm text-ink-muted">— {attribution}</figcaption>
    </figure>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
cd web && pnpm test src/components/marketing/pull-quote.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/marketing/pull-quote.tsx web/src/components/marketing/pull-quote.test.tsx
git commit -m "feat(web): PullQuote blockquote component with attribution"
```

---

## Task 5: CaseStudySection component

**Files:**
- Create: `web/src/components/marketing/case-study-section.tsx`
- Create: `web/src/components/marketing/case-study-section.test.tsx`

- [ ] **Step 1: Write failing test**

Path: `web/src/components/marketing/case-study-section.test.tsx`

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseStudySection } from "./case-study-section";

describe("CaseStudySection", () => {
  it("renders the title as an h2 and splits prose on double newlines into paragraphs", () => {
    render(
      <CaseStudySection title="The Situation" body={"First paragraph.\n\nSecond paragraph."} />,
    );
    expect(screen.getByRole("heading", { level: 2, name: /the situation/i })).toBeInTheDocument();
    expect(screen.getByText("First paragraph.")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph.")).toBeInTheDocument();
  });

  it("trims empty paragraphs caused by stray blank lines", () => {
    render(<CaseStudySection title="X" body={"A.\n\n\n\nB."} />);
    const paragraphs = screen.getAllByText(/^[AB]\.$/);
    expect(paragraphs).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/marketing/case-study-section.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/marketing/case-study-section.tsx`**

```tsx
export function CaseStudySection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section className="mt-12">
      <h2 className="text-h3 font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-muted">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
cd web && pnpm test src/components/marketing/case-study-section.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/marketing/case-study-section.tsx web/src/components/marketing/case-study-section.test.tsx
git commit -m "feat(web): CaseStudySection renders h2 plus paragraphs from prose"
```

---

## Task 6: CaseStudiesBrowser (filter + grid)

**Files:**
- Create: `web/src/components/sections/case-studies-browser.tsx`
- Create: `web/src/components/sections/case-studies-browser.test.tsx`

- [ ] **Step 1: Write failing test**

Path: `web/src/components/sections/case-studies-browser.test.tsx`

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CaseStudiesBrowser } from "./case-studies-browser";
import type { CaseStudy, Industry, ServiceSlug } from "@/content/case-studies";

const industries: Industry[] = ["Finance", "Logistics"];
const serviceSlugs: ServiceSlug[] = ["custom-software", "rpa-agents"];

const baseStudy = (
  overrides: Partial<CaseStudy> & Pick<CaseStudy, "slug" | "industry" | "services">,
): CaseStudy => ({
  engagementLength: "x",
  clientDescriptor: "x",
  headlineOutcome: "x",
  headlineMetric: { value: "1", label: "l" },
  cardSummary: `summary for ${overrides.slug}`,
  situation: "s",
  whatWeBuilt: "b",
  outcome: "o",
  delivery: "d",
  pullQuotes: [{ quote: "q", attribution: "a" }],
  relatedDemoSlugs: [],
  ...overrides,
} as CaseStudy);

const studies: CaseStudy[] = [
  baseStudy({ slug: "a", industry: "Finance", services: ["rpa-agents"] }),
  baseStudy({ slug: "b", industry: "Logistics", services: ["custom-software"] }),
  baseStudy({ slug: "c", industry: "Finance", services: ["custom-software"] }),
];

describe("CaseStudiesBrowser", () => {
  it("shows all case studies under the All filter", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabel={(s) => s}
      />,
    );
    expect(screen.getByText("summary for a")).toBeInTheDocument();
    expect(screen.getByText("summary for b")).toBeInTheDocument();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("filters by industry when an industry chip is clicked", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabel={(s) => s}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Finance" }));
    expect(screen.getByText("summary for a")).toBeInTheDocument();
    expect(screen.queryByText("summary for b")).toBeNull();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("filters by service when a service chip is clicked", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabel={(s) => s}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "custom-software" }));
    expect(screen.queryByText("summary for a")).toBeNull();
    expect(screen.getByText("summary for b")).toBeInTheDocument();
    expect(screen.getByText("summary for c")).toBeInTheDocument();
  });

  it("renders an empty state when no case studies match the active filter", () => {
    render(
      <CaseStudiesBrowser
        caseStudies={studies.filter((s) => s.industry === "Finance")}
        industries={industries}
        serviceSlugs={serviceSlugs}
        serviceLabel={(s) => s}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Logistics" }));
    expect(screen.getByText(/no case studies match this filter/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/case-studies-browser.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/case-studies-browser.tsx`**

```tsx
"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/marketing/category-filter";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import type { CaseStudy, Industry, ServiceSlug } from "@/content/case-studies";

type ChipValue = "All" | Industry | ServiceSlug;

export function CaseStudiesBrowser({
  caseStudies,
  industries,
  serviceSlugs,
  serviceLabel,
}: {
  caseStudies: readonly CaseStudy[];
  industries: readonly Industry[];
  serviceSlugs: readonly ServiceSlug[];
  serviceLabel: (slug: ServiceSlug) => string;
}) {
  const [active, setActive] = useState<ChipValue>("All");

  // Build the flat chip row: industries first, then service labels.
  // CategoryFilter always prepends "All", so we pass the combined list without it.
  const chipLabels: string[] = [
    ...industries,
    ...serviceSlugs.map((s) => serviceLabel(s)),
  ];

  const labelToValue = useMemo(() => {
    const map = new Map<string, ChipValue>();
    for (const ind of industries) map.set(ind, ind);
    for (const s of serviceSlugs) map.set(serviceLabel(s), s);
    return map;
  }, [industries, serviceSlugs, serviceLabel]);

  const valueToLabel = useMemo(() => {
    const map = new Map<ChipValue, string>();
    for (const ind of industries) map.set(ind, ind);
    for (const s of serviceSlugs) map.set(s, serviceLabel(s));
    map.set("All", "All");
    return map;
  }, [industries, serviceSlugs, serviceLabel]);

  const activeLabel = valueToLabel.get(active) ?? "All";
  const industrySet = new Set<string>(industries);

  const visible = useMemo(() => {
    if (active === "All") return caseStudies;
    if (industrySet.has(active as string)) {
      return caseStudies.filter((c) => c.industry === active);
    }
    return caseStudies.filter((c) => (c.services as readonly string[]).includes(active as string));
  }, [active, caseStudies, industrySet]);

  return (
    <div>
      <CategoryFilter
        categories={chipLabels}
        active={activeLabel}
        onChange={(next) => {
          if (next === "All") {
            setActive("All");
            return;
          }
          const value = labelToValue.get(next);
          if (value) setActive(value);
        }}
      />
      {visible.length === 0 ? (
        <p className="mt-10 text-ink-muted">No case studies match this filter.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
cd web && pnpm test src/components/sections/case-studies-browser.test.tsx
```

- [ ] **Step 5: Commit**

```bash
git add web/src/components/sections/case-studies-browser.tsx web/src/components/sections/case-studies-browser.test.tsx
git commit -m "feat(web): CaseStudiesBrowser with unified industry + service chip filter"
```

---

## Task 7: `/case-studies` index page

**Files:**
- Create: `web/src/app/case-studies/page.tsx`

- [ ] **Step 1: Implement page**

Path: `web/src/app/case-studies/page.tsx`

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CaseStudiesBrowser } from "@/components/sections/case-studies-browser";
import { CTASection } from "@/components/sections/cta-section";
import {
  caseStudies,
  caseStudyIndustries,
  caseStudyServices,
} from "@/content/case-studies";
import { serviceLabelBySlug } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Studies — Bexovar",
  description:
    "Anonymized engagements that back our headline numbers. Filter by industry or service to see what we've actually shipped.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Case studies"
            title="Proof, not promises"
            subtitle="Anonymized engagements with mid-market operators. Filter by industry or service to see what we've actually shipped."
          />
          <div className="mt-10">
            <CaseStudiesBrowser
              caseStudies={caseStudies}
              industries={caseStudyIndustries}
              serviceSlugs={caseStudyServices}
              serviceLabel={(s) => serviceLabelBySlug(s) ?? s}
            />
          </div>
        </Container>
      </section>
      <CTASection
        heading="Want one of these outcomes for your team?"
        subtitle="A 30-minute discovery call is the fastest way to find out if we're a fit."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.tertiary}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd web && pnpm build
```

Expected: `/case-studies` appears in the route table, build exits 0.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/case-studies/page.tsx
git commit -m "feat(web): /case-studies index with unified industry + service filter"
```

---

## Task 8: `/case-studies/[slug]` detail page

**Files:**
- Create: `web/src/app/case-studies/[slug]/page.tsx`

- [ ] **Step 1: Implement page**

Path: `web/src/app/case-studies/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { CaseStudySection } from "@/components/marketing/case-study-section";
import { PullQuote } from "@/components/marketing/pull-quote";
import { DemoCard } from "@/components/marketing/demo-card";
import { CTASection } from "@/components/sections/cta-section";
import { caseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import { demos } from "@/content/demos";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found — Bexovar" };
  return {
    title: `${cs.industry} · ${cs.headlineMetric.value} — Case Study`,
    description: cs.headlineOutcome,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const relatedDemos = cs.relatedDemoSlugs
    .map((slug) => demos.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  return (
    <>
      <section className="py-20 md:py-24 bg-bg-alt">
        <Container>
          <p className="text-eyebrow uppercase text-accent mb-4">
            {cs.industry} · {cs.engagementLength}
          </p>
          <h1 className="text-h1 font-semibold text-ink max-w-3xl">{cs.headlineOutcome}</h1>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl">{cs.clientDescriptor}</p>
          <div className="mt-10 inline-flex items-baseline gap-3 rounded-lg bg-white px-6 py-4 shadow-sm">
            <span className="text-4xl font-semibold text-ink">{cs.headlineMetric.value}</span>
            <span className="text-sm text-ink-muted">{cs.headlineMetric.label}</span>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <CaseStudySection title="The Situation" body={cs.situation} />
            <CaseStudySection title="What We Built" body={cs.whatWeBuilt} />
            <CaseStudySection title="The Outcome" body={cs.outcome} />
            {cs.pullQuotes.map((q, i) => (
              <PullQuote key={i} quote={q.quote} attribution={q.attribution} />
            ))}
            <CaseStudySection title="How It Was Delivered" body={cs.delivery} />
          </div>
        </Container>
      </section>

      {relatedDemos.length > 0 && (
        <section className="py-16 md:py-20 bg-bg-alt">
          <Container>
            <p className="text-eyebrow uppercase text-accent mb-4">Related demos</p>
            <h2 className="text-h2 font-semibold text-ink">See the pieces in action</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedDemos.map((d) => (
                <DemoCard key={d.slug} demo={d} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        heading="Want a result like this?"
        subtitle="A 30-minute discovery call is the fastest way to find out if we're a fit."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.tertiary}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify build (static generation)**

```bash
cd web && pnpm build
```

Expected: build succeeds and lists 4 pre-rendered routes under `/case-studies/[slug]` (one per slug) alongside the index.

- [ ] **Step 3: Commit**

```bash
git add web/src/app/case-studies/[slug]/page.tsx
git commit -m "feat(web): /case-studies/[slug] detail page with pull quotes and related demos"
```

---

## Task 9: E2E coverage

**Files:**
- Modify: `web/tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Append tests at the end of `web/tests/e2e/smoke.spec.ts`**

```ts
test("/case-studies renders hero, industry + service chips, and all 4 cards", async ({ page }) => {
  await page.goto("/case-studies");
  await expect(page.getByRole("heading", { name: /proof, not promises/i })).toBeVisible();
  for (const ind of ["Finance", "Logistics", "Healthcare", "Retail"]) {
    await expect(page.getByRole("button", { name: ind, exact: true })).toBeVisible();
  }
  for (const svc of ["Custom Software", "RPA & Agents", "Systems Integration", "Process Consulting"]) {
    await expect(page.getByRole("button", { name: svc, exact: true })).toBeVisible();
  }
  const cards = page.getByRole("article");
  await expect(cards).toHaveCount(4);
});

test("/case-studies service filter narrows the grid", async ({ page }) => {
  await page.goto("/case-studies");
  await page.getByRole("button", { name: "Custom Software", exact: true }).click();
  await expect(page.getByRole("button", { name: "Custom Software", exact: true })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  const cards = page.getByRole("article");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThan(4);
});

test("/case-studies card navigates to the detail page with expected sections", async ({ page }) => {
  await page.goto("/case-studies");
  await page
    .getByRole("link", { name: /read the finance-invoice-automation case study/i })
    .click();
  await expect(page).toHaveURL(/\/case-studies\/finance-invoice-automation$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/42%/);
  for (const section of ["The Situation", "What We Built", "The Outcome", "How It Was Delivered"]) {
    await expect(page.getByRole("heading", { level: 2, name: section })).toBeVisible();
  }
  // At least one related demo renders
  await expect(page.getByRole("button", { name: /^play .* video$/i }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run E2E**

```bash
cd web && pnpm e2e
```

Expected: all existing + new tests pass (13 total). If Playwright reports missing browsers, run `cd web && pnpm exec playwright install` once and re-run.

- [ ] **Step 3: Commit**

```bash
git add web/tests/e2e/smoke.spec.ts
git commit -m "test(web): E2E coverage for /case-studies index and detail"
```

---

## Task 10: Final verification

- [ ] **Step 1: Full test matrix**

```bash
cd web && pnpm exec tsc --noEmit && pnpm lint && pnpm test && pnpm build && pnpm e2e
```

Every command must exit 0.

- [ ] **Step 2: Manual spot check**

Start dev server (do NOT commit anything from this step):

```bash
cd web && pnpm dev
```

Visit:
- `http://localhost:3000/case-studies` — hero, chip row (8 chips + All = 9), 2×2 card grid. Click each chip, verify filtering. Click a card.
- `http://localhost:3000/case-studies/finance-invoice-automation` — hero, metric band, four sections in order (Situation / Built / Outcome / Delivered), at least one pull quote, at least one related demo card.
- Repeat for the other three slugs (`logistics-shipment-reconciliation`, `healthcare-claims-intake`, `retail-ops-reallocation`).

Stop the dev server.

- [ ] **Step 3: No commit**

Task 10 is verification only. If any check fails, fix in place and make a new commit describing the fix.

---

## Out of scope

- Case-study logos or real client names (content work, not code).
- MDX content pipeline (deferred until a non-developer editor needs it).
- URL-synced filter state for deep-linkable filtered views.
- Pagination (only 4 studies — one grid fits).
- Per-case-study OG images (uses default).
