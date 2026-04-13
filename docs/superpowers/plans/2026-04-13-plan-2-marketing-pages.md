# Plan 2 — Marketing Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the homepage (outcomes-first narrative, 7 sections) and the static marketing surface (`/services`, `/services/[slug]` for 4 services, `/about`, `/how-we-work`, `/404`) on top of the Plan 1 foundation.

**Architecture:** Pure Next.js App Router pages composing the primitives created in Plan 1 (Container, SectionHeader, CTASection, Button, Card, OrbitalGraphic). Per-page content lives in typed data modules under `src/content/` — this keeps copy separate from JSX and makes future CMS migration trivial. New section components live under `src/components/sections/` and `src/components/marketing/` and are each independently testable. No MDX, no client state beyond what's already in NavBar. Every route exports page-specific `metadata`.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind v4, Vitest + RTL, Playwright. All Plan 1 components reused.

---

## File Structure

```
web/src/
  content/
    home.ts                   # hero copy, proof-strip metrics, demo placeholders, featured case, process steps
    services.ts               # overview + 4 service detail records (custom-software, rpa-agents, integrations, consulting)
    about.ts                  # mission, values, stats
    how-we-work.ts            # methodology phases, differentiators, FAQ
  components/
    sections/
      hero-outcomes.tsx       # homepage hero w/ orbital graphic
      hero-outcomes.test.tsx
      proof-strip.tsx         # 4 anonymized metric cards
      proof-strip.test.tsx
      demos-strip.tsx         # 3 featured demo placeholders (real videos land in Plan 3)
      demos-strip.test.tsx
      services-grid.tsx       # 4-card service grid used on home + /services
      services-grid.test.tsx
      featured-case.tsx       # single featured case teaser
      featured-case.test.tsx
      process-strip.tsx       # 4-step How We Work preview
      process-strip.test.tsx
    marketing/
      stat-block.tsx          # big-number + label primitive
      stat-block.test.tsx
      value-card.tsx          # About-page value card
      methodology-phase.tsx   # detailed phase block for /how-we-work
      faq.tsx                 # simple accordion (uses <details>/<summary>)
      faq.test.tsx
  app/
    page.tsx                  # REPLACED: real homepage
    services/
      page.tsx                # services overview
      [slug]/
        page.tsx              # service detail
    about/
      page.tsx
    how-we-work/
      page.tsx
    not-found.tsx             # global 404
```

**Responsibility boundaries:**
- `src/content/*.ts` — typed data only, no JSX.
- `src/components/sections/*` — full-width composable page sections.
- `src/components/marketing/*` — smaller reusable marketing atoms/molecules.
- `app/**/page.tsx` — thin compositions of sections + content.

---

## Prerequisites

- Plan 1 merged (tag `plan-1-foundation` exists).
- Branch: `plan-2-marketing-pages` already checked out.
- All commands assume cwd = `D:/Bexovar/bexovar-website` unless stated.

---

## Task 1: Home content module

**Files:**
- Create: `web/src/content/home.ts`

- [ ] **Step 1: Write `web/src/content/home.ts`**

```ts
export type Metric = {
  industry: string;
  headline: string;   // e.g. "42%"
  detail: string;     // e.g. "lower invoice processing cost"
};

export type DemoPlaceholder = {
  title: string;
  duration: string;   // e.g. "60s"
  summary: string;
};

export type ProcessStep = {
  number: string;     // "1"
  title: string;      // "Discover"
  summary: string;    // "2-wk process map + ROI estimate"
};

export const home = {
  hero: {
    eyebrow: "Operations automation",
    title: "Cut your ops team's busywork by 30–60%. Measured, not promised.",
    body: "We build custom software and automation that takes repetitive, manual work off your people — so they can focus on what actually moves the business. Book a call and see a live demo on your own workflow.",
    industries: "Industries we serve: Finance · Logistics · Healthcare · Manufacturing · Retail",
  },
  metrics: [
    { industry: "Finance", headline: "42%", detail: "lower invoice processing cost" },
    { industry: "Logistics", headline: "4h → 20min", detail: "shipment reconciliation time" },
    { industry: "Healthcare", headline: "$480K", detail: "annual savings, year one" },
    { industry: "Retail", headline: "3 FTE", detail: "reallocated to growth work" },
  ] satisfies Metric[],
  demos: [
    { title: "Invoice OCR → ERP", duration: "60s", summary: "Automated accounts-payable intake with audit trail." },
    { title: "Email triage agent", duration: "45s", summary: "Classifies and routes support mail without rule lists." },
    { title: "Inventory sync", duration: "30s", summary: "Keeps warehouse and storefront stock aligned." },
  ] satisfies DemoPlaceholder[],
  featuredCase: {
    eyebrow: "Featured case",
    title: "How a mid-market logistics firm cut reconciliation from 4 days to 4 hours",
    summary: "200-person ops team · 6-week engagement · 38% cost reduction · Full handoff to internal team.",
    href: "/case-studies",
    cta: "Read the case →",
  },
  process: [
    { number: "1", title: "Discover", summary: "2-week process map + ROI estimate." },
    { number: "2", title: "Design", summary: "Prototype on your real data." },
    { number: "3", title: "Build", summary: "Fixed-scope sprints, weekly demos." },
    { number: "4", title: "Handoff", summary: "Docs, training, 90-day support." },
  ] satisfies ProcessStep[],
  closingCta: {
    heading: "Ready to see what this looks like on your workflow?",
    subtitle: "30-min call. We'll show you a live demo built around your actual process.",
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add web/src/content/home.ts
git commit -m "feat(web): add home content module"
```

---

## Task 2: Services content module

**Files:**
- Create: `web/src/content/services.ts`

- [ ] **Step 1: Write `web/src/content/services.ts`**

```ts
export type ServiceSummary = {
  slug: string;
  title: string;
  tagline: string;           // 1-line outcome-focused
  summary: string;           // card-length summary
};

export type ServiceDetail = ServiceSummary & {
  hero: { eyebrow: string; title: string; body: string };
  examples: string[];                                // "what this looks like in practice"
  demos: { title: string; summary: string }[];      // placeholders (Plan 3 replaces)
  miniCase: { headline: string; summary: string };  // short case callout
  process: { title: string; summary: string }[];
};

const baseProcess = [
  { title: "Discover", summary: "Map the current process; quantify the waste." },
  { title: "Design",   summary: "Prototype the fix on your real data." },
  { title: "Build",    summary: "Fixed-scope sprints with weekly demos." },
  { title: "Handoff",  summary: "Documentation, training, 90 days of support." },
];

export const servicesOverview = {
  eyebrow: "What we build",
  title: "Four services, one outcome: your team gets their time back.",
  body: "Most of our engagements blend these. We'll help you figure out which mix fits.",
  midCta: {
    heading: "Not sure which service you need?",
    subtitle: "Book a call — we'll help you scope it before anyone writes a line of code.",
  },
};

export const services: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Custom Software",
    tagline: "Internal tools shaped to how your team actually works.",
    summary: "Purpose-built apps that replace spreadsheets, shadow IT, and manual coordination.",
    hero: {
      eyebrow: "Custom Software",
      title: "Internal tools shaped to how your team actually works.",
      body: "We build focused, maintainable apps that replace the spreadsheet-and-email duct tape your team has outgrown.",
    },
    examples: [
      "Operations dashboard consolidating 4 systems into one screen for the ops team.",
      "Back-office workflow tool that cut case-handling time from 22 minutes to 6.",
      "Internal admin replacing a $60K/yr licensed product the team outgrew.",
    ],
    demos: [
      { title: "Ops dashboard", summary: "Unified view across ERP, CRM, and fulfillment." },
      { title: "Case workflow",  summary: "Guided intake, auto-routing, SLA tracking." },
    ],
    miniCase: {
      headline: "38% fewer hand-offs",
      summary: "A 200-person logistics ops team consolidated 4 tools into one.",
    },
    process: baseProcess,
  },
  {
    slug: "rpa-agents",
    title: "RPA & Agents",
    tagline: "Automate the clicks, forms, and copy-paste.",
    summary: "Robotic process automation and AI agents that handle repetitive digital work.",
    hero: {
      eyebrow: "RPA & Agents",
      title: "Automate the clicks, forms, and copy-paste work.",
      body: "For the systems you can't replace, we build reliable bots and agents that do the manual work for you — with audit trails.",
    },
    examples: [
      "AP automation: OCR intake → ERP posting with human-in-the-loop exceptions.",
      "Data-entry agent that keeps two CRMs in sync across 2M records.",
      "Email triage classifier routing tickets with 97% accuracy.",
    ],
    demos: [
      { title: "Invoice OCR → ERP", summary: "End-to-end accounts-payable intake." },
      { title: "Email triage",      summary: "LLM classifier with escalation rules." },
    ],
    miniCase: {
      headline: "42% AP cost reduction",
      summary: "A finance team replaced nightly manual invoice entry.",
    },
    process: baseProcess,
  },
  {
    slug: "integrations",
    title: "Systems Integration",
    tagline: "Make your stack talk to itself.",
    summary: "Wiring SaaS, ERPs, and internal systems so data flows without humans carrying it.",
    hero: {
      eyebrow: "Systems Integration",
      title: "Make your stack talk to itself.",
      body: "When the problem is data silos and brittle handoffs, integration is the leverage point. We design durable pipelines, not one-off scripts.",
    },
    examples: [
      "CRM ↔ ERP sync handling 2M+ records nightly with delta reconciliation.",
      "Warehouse ↔ storefront inventory pipeline; stock accurate within 90 seconds.",
      "Finance close pipeline pulling data from 6 sources into a validated report.",
    ],
    demos: [
      { title: "Inventory sync",       summary: "Bidirectional stock alignment." },
      { title: "Ledger reconciliation", summary: "Scheduled close-of-day reports." },
    ],
    miniCase: {
      headline: "4h → 20min",
      summary: "Nightly reconciliation replaced a four-hour manual process.",
    },
    process: baseProcess,
  },
  {
    slug: "consulting",
    title: "Process Consulting",
    tagline: "Find the leverage before you write code.",
    summary: "Process diagnostics and ROI-aware roadmaps — sometimes the right answer is not software.",
    hero: {
      eyebrow: "Process Consulting",
      title: "Find the leverage before you write code.",
      body: "Automation fails when the underlying process is a mess. We start with the work, not the tools.",
    },
    examples: [
      "2-week process map with quantified waste and a prioritized automation backlog.",
      "Vendor selection: built an internal tool vs. licensed SaaS decision with a 5-yr TCO model.",
      "Org redesign playbook for a finance team after AP automation freed 3 FTE.",
    ],
    demos: [
      { title: "Process map sample",   summary: "Annotated flow with waste callouts." },
      { title: "ROI model walkthrough", summary: "Inputs, sensitivity, 5-yr view." },
    ],
    miniCase: {
      headline: "$480K year-one savings",
      summary: "A healthcare billing team's roadmap, sequenced by payback.",
    },
    process: baseProcess,
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
```

- [ ] **Step 2: Commit**

```bash
git add web/src/content/services.ts
git commit -m "feat(web): add services content module with 4 services"
```

---

## Task 3: About content module

**Files:**
- Create: `web/src/content/about.ts`

- [ ] **Step 1: Write `web/src/content/about.ts`**

```ts
export const about = {
  hero: {
    eyebrow: "About Bexovar",
    title: "We build the software your operators wish they had.",
    body: "We're a software and automation team that partners with mid-market operators who have outgrown spreadsheets and shadow IT. We ship focused tools, measure what they change, and hand them off clean.",
  },
  mission: {
    title: "Our mission",
    body: "Take the repetitive, error-prone work off people and replace it with software that actually fits the job. No platforms for their own sake. No five-year transformations. Real outcomes, measured in weeks.",
  },
  values: [
    {
      title: "Outcomes over artifacts",
      body: "Deliverables only matter if they move a metric. We quantify savings before we start and verify them after we ship.",
    },
    {
      title: "Fixed scope, weekly demos",
      body: "Every engagement has a clear budget, timeline, and definition of done. You see progress every week — no six-month surprises.",
    },
    {
      title: "Built to hand off",
      body: "Your team owns what we build. We write the docs we'd want to inherit and train the people who'll maintain it.",
    },
    {
      title: "Small team, senior people",
      body: "The engineer scoping the work is the engineer shipping it. No bait-and-switch, no offshore surprise.",
    },
  ],
  stats: [
    { headline: "30–60%", label: "Typical cost reduction on automated processes" },
    { headline: "6 wks",  label: "Median engagement length" },
    { headline: "5",      label: "Industries we've shipped in" },
  ],
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add web/src/content/about.ts
git commit -m "feat(web): add about content module"
```

---

## Task 4: How-we-work content module

**Files:**
- Create: `web/src/content/how-we-work.ts`

- [ ] **Step 1: Write `web/src/content/how-we-work.ts`**

```ts
export type Phase = {
  number: string;
  title: string;
  duration: string;
  deliverables: string[];
  clientRole: string;
};

export type Faq = { q: string; a: string };

export const howWeWork = {
  hero: {
    eyebrow: "How we work",
    title: "Predictable process. No mystery.",
    body: "Every engagement follows the same four phases so you always know what's next, what's expected, and what you'll get.",
  },
  phases: [
    {
      number: "1",
      title: "Discover",
      duration: "1–2 weeks",
      deliverables: [
        "Process map of the target workflow",
        "Quantified baseline (time, cost, error rate)",
        "Prioritized automation backlog with ROI estimates",
      ],
      clientRole: "Two half-day workshops; async Q&A in between.",
    },
    {
      number: "2",
      title: "Design",
      duration: "1–2 weeks",
      deliverables: [
        "Prototype working against your real data",
        "Data-flow and integration diagrams",
        "Fixed-scope statement of work",
      ],
      clientRole: "One walkthrough per week; sign-off before Build.",
    },
    {
      number: "3",
      title: "Build",
      duration: "3–8 weeks",
      deliverables: [
        "Production code in your environment",
        "Automated tests and monitoring",
        "Weekly working demos — not status decks",
      ],
      clientRole: "30-min demo each week; exception review as needed.",
    },
    {
      number: "4",
      title: "Handoff",
      duration: "2 weeks + 90-day support",
      deliverables: [
        "Runbooks and architecture docs",
        "Training for the internal owners",
        "Bug fixes and minor tweaks for 90 days",
      ],
      clientRole: "Identify internal owner(s) early in Build.",
    },
  ] satisfies Phase[],
  differentiators: [
    {
      title: "Fixed-scope sprints",
      body: "You know the price and the deadline before we start. Scope changes turn into change orders, not mystery invoices.",
    },
    {
      title: "Weekly working demos",
      body: "Every Friday you see something that runs. No status theater.",
    },
    {
      title: "Built to hand off",
      body: "Your team owns what we build. Docs, training, and a 90-day warranty come standard.",
    },
  ],
  faq: [
    {
      q: "How do you price engagements?",
      a: "Fixed-fee per phase. Discover is a flat rate. Design and Build are quoted together after Discover. Ongoing support is monthly or hourly, your call.",
    },
    {
      q: "How long does a typical project take?",
      a: "Six to ten weeks end-to-end is typical. Discover ~2 weeks, Design ~1–2, Build ~3–6, Handoff ~2 plus 90 days of support.",
    },
    {
      q: "Who owns the IP?",
      a: "You do. All code is delivered under work-for-hire terms to your organization. We keep no embedded licenses or runtime fees.",
    },
    {
      q: "Who will be on the team?",
      a: "Two to four senior engineers. The person scoping the work is the person shipping it. No offshore handoff, no junior staffing surprise.",
    },
    {
      q: "What happens after handoff?",
      a: "Ninety days of included support for bug fixes and small tweaks. After that, most clients move to a monthly retainer for enhancements, or come back for the next project.",
    },
  ] satisfies Faq[],
  closingCta: {
    heading: "Start with a 30-minute call.",
    subtitle: "We'll tell you whether your problem fits our shape — honestly — before we quote anything.",
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add web/src/content/how-we-work.ts
git commit -m "feat(web): add how-we-work content module"
```

---

## Task 5: StatBlock primitive

**Files:**
- Create: `web/src/components/marketing/stat-block.tsx`
- Create: `web/src/components/marketing/stat-block.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatBlock } from "./stat-block";

describe("StatBlock", () => {
  it("renders headline and label", () => {
    render(<StatBlock headline="42%" label="lower cost" />);
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText("lower cost")).toBeInTheDocument();
  });
  it("renders optional tag", () => {
    render(<StatBlock tag="Finance" headline="42%" label="lower cost" />);
    expect(screen.getByText("Finance")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/marketing/stat-block.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/marketing/stat-block.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function StatBlock({
  tag,
  headline,
  label,
  className,
}: {
  tag?: string;
  headline: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-white p-6 shadow-sm", className)}>
      {tag && (
        <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
          {tag}
        </span>
      )}
      <p className="mt-4 text-4xl font-bold text-metric leading-none">{headline}</p>
      <p className="mt-3 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/marketing/stat-block.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/marketing/stat-block.tsx web/src/components/marketing/stat-block.test.tsx
git commit -m "feat(web): add StatBlock primitive"
```

---

## Task 6: HeroOutcomes section

**Files:**
- Create: `web/src/components/sections/hero-outcomes.tsx`
- Create: `web/src/components/sections/hero-outcomes.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroOutcomes } from "./hero-outcomes";

describe("HeroOutcomes", () => {
  it("renders eyebrow, heading, body, and industries line", () => {
    render(
      <HeroOutcomes
        eyebrow="EYE"
        title="Title"
        body="Body"
        industries="Industries: A · B"
      />
    );
    expect(screen.getByText("EYE")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText(/Industries: A/)).toBeInTheDocument();
  });
  it("renders primary and secondary CTAs as links", () => {
    render(
      <HeroOutcomes
        eyebrow="x" title="x" body="x" industries="x"
        primary={{ href: "/book", label: "Book a call" }}
        secondary={{ href: "/demos", label: "See demos" }}
      />
    );
    expect(screen.getByRole("link", { name: "Book a call" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "See demos" })).toHaveAttribute("href", "/demos");
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/hero-outcomes.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/hero-outcomes.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";

type Cta = { href: string; label: string };

export function HeroOutcomes({
  eyebrow,
  title,
  body,
  industries,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  industries: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow uppercase text-accent mb-4">{eyebrow}</p>
          <h1 className="text-display text-ink">{title}</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">{body}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && <Button href={primary.href} size="lg">{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          <p className="mt-8 text-sm text-ink-subtle">{industries}</p>
        </div>
        <OrbitalGraphic />
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/hero-outcomes.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/hero-outcomes.tsx web/src/components/sections/hero-outcomes.test.tsx
git commit -m "feat(web): add HeroOutcomes section"
```

---

## Task 7: ProofStrip section

**Files:**
- Create: `web/src/components/sections/proof-strip.tsx`
- Create: `web/src/components/sections/proof-strip.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProofStrip } from "./proof-strip";
import type { Metric } from "@/content/home";

const metrics: Metric[] = [
  { industry: "Finance", headline: "42%", detail: "lower cost" },
  { industry: "Logistics", headline: "4h→20m", detail: "faster close" },
];

describe("ProofStrip", () => {
  it("renders each metric", () => {
    render(<ProofStrip metrics={metrics} />);
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText("4h→20m")).toBeInTheDocument();
    expect(screen.getByText("Finance")).toBeInTheDocument();
    expect(screen.getByText("Logistics")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/proof-strip.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/proof-strip.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import { StatBlock } from "@/components/marketing/stat-block";
import type { Metric } from "@/content/home";

export function ProofStrip({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <SectionHeader
          eyebrow="Proof"
          title="Real outcomes, real clients"
          subtitle="Names withheld under NDA. Metrics verified."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <StatBlock key={m.industry} tag={m.industry} headline={m.headline} label={m.detail} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/proof-strip.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/proof-strip.tsx web/src/components/sections/proof-strip.test.tsx
git commit -m "feat(web): add ProofStrip section"
```

---

## Task 8: DemosStrip section (placeholders; Plan 3 replaces)

**Files:**
- Create: `web/src/components/sections/demos-strip.tsx`
- Create: `web/src/components/sections/demos-strip.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DemosStrip } from "./demos-strip";

const demos = [
  { title: "A", duration: "30s", summary: "sa" },
  { title: "B", duration: "45s", summary: "sb" },
];

describe("DemosStrip", () => {
  it("renders each demo tile and link to gallery", () => {
    render(<DemosStrip demos={demos} />);
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse full demo gallery/i })).toHaveAttribute("href", "/demos");
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/demos-strip.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/demos-strip.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import type { DemoPlaceholder } from "@/content/home";

export function DemosStrip({ demos }: { demos: readonly DemoPlaceholder[] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Demos"
          title="See it in action"
          subtitle="Short demos of automation we've actually shipped. Want us to run one on your data? Book a call."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {demos.map((d) => (
            <div
              key={d.title}
              className="group rounded-lg border border-border bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video bg-bg-alt flex items-center justify-center text-ink-subtle">
                <span aria-hidden="true" className="mr-2">▶</span>
                <span className="text-sm">{d.title} · {d.duration}</span>
              </div>
              <div className="p-5">
                <p className="text-sm text-ink-muted">{d.summary}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/demos" className="text-accent hover:text-accent-hover">
            Browse full demo gallery →
          </Link>
        </p>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/demos-strip.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/demos-strip.tsx web/src/components/sections/demos-strip.test.tsx
git commit -m "feat(web): add DemosStrip section (placeholders)"
```

---

## Task 9: ServicesGrid section

**Files:**
- Create: `web/src/components/sections/services-grid.tsx`
- Create: `web/src/components/sections/services-grid.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesGrid } from "./services-grid";

const items = [
  { slug: "a", title: "A", summary: "sa" },
  { slug: "b", title: "B", summary: "sb" },
];

describe("ServicesGrid", () => {
  it("renders a card per service with a link to its detail page", () => {
    render(<ServicesGrid items={items} />);
    const linkA = screen.getByRole("link", { name: /A/i });
    expect(linkA).toHaveAttribute("href", "/services/a");
    const linkB = screen.getByRole("link", { name: /B/i });
    expect(linkB).toHaveAttribute("href", "/services/b");
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/services-grid.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/services-grid.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/container";

export type ServicesGridItem = {
  slug: string;
  title: string;
  summary: string;
};

export function ServicesGrid({
  items,
  withContainer = true,
}: {
  items: readonly ServicesGridItem[];
  withContainer?: boolean;
}) {
  const grid = (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="group block rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          <h3 className="text-h3 text-ink group-hover:text-accent">{s.title}</h3>
          <p className="mt-2 text-sm text-ink-muted">{s.summary}</p>
          <span className="mt-4 inline-block text-sm font-semibold text-accent">
            Learn more →
          </span>
        </Link>
      ))}
    </div>
  );
  return withContainer ? <Container>{grid}</Container> : grid;
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/services-grid.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/services-grid.tsx web/src/components/sections/services-grid.test.tsx
git commit -m "feat(web): add ServicesGrid section"
```

---

## Task 10: FeaturedCase section

**Files:**
- Create: `web/src/components/sections/featured-case.tsx`
- Create: `web/src/components/sections/featured-case.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedCase } from "./featured-case";

describe("FeaturedCase", () => {
  it("renders eyebrow, title, summary, and CTA link", () => {
    render(
      <FeaturedCase
        eyebrow="Featured case"
        title="How they saved 4 days"
        summary="200 people, 6 weeks."
        href="/case-studies/foo"
        cta="Read →"
      />
    );
    expect(screen.getByText("Featured case")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "How they saved 4 days" })).toBeInTheDocument();
    expect(screen.getByText("200 people, 6 weeks.")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Read →" });
    expect(link).toHaveAttribute("href", "/case-studies/foo");
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/featured-case.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/featured-case.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/container";

export function FeaturedCase({
  eyebrow,
  title,
  summary,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <div className="rounded-2xl border border-border bg-white p-10 md:p-14 shadow-sm">
          <p className="text-eyebrow uppercase text-accent mb-4">{eyebrow}</p>
          <h2 className="text-h2 text-ink max-w-3xl">{title}</h2>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl">{summary}</p>
          <Link
            href={href}
            className="mt-6 inline-flex items-center text-accent font-semibold hover:text-accent-hover"
          >
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/featured-case.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/featured-case.tsx web/src/components/sections/featured-case.test.tsx
git commit -m "feat(web): add FeaturedCase section"
```

---

## Task 11: ProcessStrip section

**Files:**
- Create: `web/src/components/sections/process-strip.tsx`
- Create: `web/src/components/sections/process-strip.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProcessStrip } from "./process-strip";

const steps = [
  { number: "1", title: "Discover", summary: "a" },
  { number: "2", title: "Design",   summary: "b" },
];

describe("ProcessStrip", () => {
  it("renders each step with number and title", () => {
    render(<ProcessStrip steps={steps} />);
    expect(screen.getByText("Discover")).toBeInTheDocument();
    expect(screen.getByText("Design")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/sections/process-strip.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/sections/process-strip.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import type { ProcessStep } from "@/content/home";

export function ProcessStrip({
  steps,
  eyebrow = "How we work",
  title = "Predictable process. No mystery.",
  subtitle,
}: {
  steps: readonly ProcessStep[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.number} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent font-bold">
                {s.number}
              </span>
              <h3 className="mt-4 text-h3 text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.summary}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/sections/process-strip.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/process-strip.tsx web/src/components/sections/process-strip.test.tsx
git commit -m "feat(web): add ProcessStrip section"
```

---

## Task 12: Replace homepage with real content

**Files:**
- Modify: `web/src/app/page.tsx`

- [ ] **Step 1: Replace `web/src/app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { HeroOutcomes } from "@/components/sections/hero-outcomes";
import { ProofStrip } from "@/components/sections/proof-strip";
import { DemosStrip } from "@/components/sections/demos-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedCase } from "@/components/sections/featured-case";
import { ProcessStrip } from "@/components/sections/process-strip";
import { CTASection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description:
    "Bexovar builds custom software and intelligent automation for mid-market operators. Cut operational cost 30–60%. Book a call to see a live demo on your workflow.",
};

export default function HomePage() {
  return (
    <>
      <HeroOutcomes
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        body={home.hero.body}
        industries={home.hero.industries}
        primary={siteConfig.cta.primary}
        secondary={{ href: "/demos", label: "See demos" }}
      />
      <ProofStrip metrics={home.metrics} />
      <DemosStrip demos={home.demos} />

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="What we build"
            subtitle="Most engagements blend these. We help you pick the mix."
          />
          <div className="mt-10">
            <ServicesGrid
              withContainer={false}
              items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }))}
            />
          </div>
        </Container>
      </section>

      <FeaturedCase {...home.featuredCase} />
      <ProcessStrip steps={home.process} />
      <CTASection
        heading={home.closingCta.heading}
        subtitle={home.closingCta.subtitle}
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Build + test**

```bash
cd web && pnpm build && pnpm test
```

Expected: build succeeds; unit tests all pass.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/src/app/page.tsx
git commit -m "feat(web): real homepage with all 7 sections"
```

---

## Task 13: /services overview page

**Files:**
- Create: `web/src/app/services/page.tsx`

- [ ] **Step 1: Write `web/src/app/services/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CTASection } from "@/components/sections/cta-section";
import { servicesOverview, services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description: servicesOverview.body,
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow={servicesOverview.eyebrow}
            title={servicesOverview.title}
            subtitle={servicesOverview.body}
          />
          <div className="mt-12">
            <ServicesGrid
              withContainer={false}
              items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }))}
            />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{servicesOverview.midCta.heading}</h2>
          <p className="mt-4 text-lg text-ink-muted">{servicesOverview.midCta.subtitle}</p>
        </Container>
      </section>

      <CTASection
        heading="Ready to scope a project?"
        subtitle="30-min call. No slides."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd web && pnpm build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/src/app/services/page.tsx
git commit -m "feat(web): /services overview page"
```

---

## Task 14: /services/[slug] detail page with static params

**Files:**
- Create: `web/src/app/services/[slug]/page.tsx`

- [ ] **Step 1: Write `web/src/app/services/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/sections/section-header";
import { getService, serviceSlugs } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.tagline };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl">
          <p className="text-eyebrow uppercase text-accent mb-4">{service.hero.eyebrow}</p>
          <h1 className="text-display text-ink">{service.hero.title}</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-2xl">{service.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {siteConfig.cta.primary.label}
            </Button>
            <Button href={siteConfig.cta.secondary.href} variant="secondary" size="lg">
              {siteConfig.cta.secondary.label}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="In practice"
            title="What this looks like"
            subtitle="A few examples of recent shipments in this area."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {service.examples.map((ex, i) => (
              <li key={i} className="rounded-lg border border-border bg-white p-6 shadow-sm text-ink-muted">
                {ex}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Demos" title="See it work" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.demos.map((d) => (
              <div
                key={d.title}
                className="rounded-lg border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-h3 text-ink">{d.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{d.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link href="/demos" className="text-accent hover:text-accent-hover">
              Browse full demo gallery →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-10 md:p-14 shadow-sm">
            <p className="text-eyebrow uppercase text-accent mb-3">Mini case</p>
            <h2 className="text-h2 text-ink">{service.miniCase.headline}</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl">{service.miniCase.summary}</p>
            <Link href="/case-studies" className="mt-6 inline-block text-accent font-semibold hover:text-accent-hover">
              See more cases →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="How we deliver" title="Four phases, every time" />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <li key={p.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-h3 text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.summary}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection
        heading={`Ready to scope ${service.title.toLowerCase()}?`}
        subtitle="30-min call. We'll show you a live demo on your workflow."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Build (exercises generateStaticParams for all 4 slugs)**

```bash
cd web && pnpm build
```

Expected: build generates `/services/custom-software`, `/services/rpa-agents`, `/services/integrations`, `/services/consulting`.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/src/app/services/
git commit -m "feat(web): /services/[slug] detail pages with static params"
```

---

## Task 15: About page + ValueCard

**Files:**
- Create: `web/src/components/marketing/value-card.tsx`
- Create: `web/src/app/about/page.tsx`

- [ ] **Step 1: Implement `web/src/components/marketing/value-card.tsx`**

```tsx
export function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="mt-3 text-ink-muted">{body}</p>
    </div>
  );
}
```

- [ ] **Step 2: Write `web/src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { StatBlock } from "@/components/marketing/stat-block";
import { ValueCard } from "@/components/marketing/value-card";
import { about } from "@/content/about";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.body,
};

export default function AboutPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <p className="text-eyebrow uppercase text-accent mb-4">{about.hero.eyebrow}</p>
          <h1 className="text-display text-ink">{about.hero.title}</h1>
          <p className="mt-6 text-lg text-ink-muted">{about.hero.body}</p>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl">
          <h2 className="text-h2 text-ink">{about.mission.title}</h2>
          <p className="mt-4 text-lg text-ink-muted">{about.mission.body}</p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Values" title="How we operate" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {about.values.map((v) => (
              <ValueCard key={v.title} title={v.title} body={v.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader eyebrow="By the numbers" title="A bit of context" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {about.stats.map((s) => (
              <StatBlock key={s.label} headline={s.headline} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Want to know if we're a fit?"
        subtitle="Book a 30-min call. If we're not, we'll tell you."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 3: Build**

```bash
cd web && pnpm build
```

Expected: success.

- [ ] **Step 4: Commit**

```bash
cd ..
git add web/src/components/marketing/value-card.tsx web/src/app/about/page.tsx
git commit -m "feat(web): /about page"
```

---

## Task 16: FAQ component (accordion)

**Files:**
- Create: `web/src/components/marketing/faq.tsx`
- Create: `web/src/components/marketing/faq.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Faq } from "./faq";

const items = [
  { q: "First?", a: "First answer." },
  { q: "Second?", a: "Second answer." },
];

describe("Faq", () => {
  it("renders each question as a <summary>", () => {
    render(<Faq items={items} />);
    expect(screen.getByText("First?")).toBeInTheDocument();
    expect(screen.getByText("Second?")).toBeInTheDocument();
  });
  it("renders each answer", () => {
    render(<Faq items={items} />);
    expect(screen.getByText("First answer.")).toBeInTheDocument();
    expect(screen.getByText("Second answer.")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test; expect FAIL**

```bash
cd web && pnpm test src/components/marketing/faq.test.tsx
```

- [ ] **Step 3: Implement `web/src/components/marketing/faq.tsx`**

```tsx
export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer items-center justify-between list-none text-ink font-semibold">
            <span>{item.q}</span>
            <span className="ml-4 text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test; expect PASS**

```bash
pnpm test src/components/marketing/faq.test.tsx
```

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/marketing/faq.tsx web/src/components/marketing/faq.test.tsx
git commit -m "feat(web): add Faq accordion"
```

---

## Task 17: MethodologyPhase block

**Files:**
- Create: `web/src/components/marketing/methodology-phase.tsx`

- [ ] **Step 1: Write `web/src/components/marketing/methodology-phase.tsx`**

```tsx
import type { Phase } from "@/content/how-we-work";

export function MethodologyPhase({ phase }: { phase: Phase }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold text-lg">
          {phase.number}
        </span>
        <div>
          <h3 className="text-h3 text-ink">{phase.title}</h3>
          <p className="text-sm text-ink-subtle">{phase.duration}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-eyebrow uppercase text-ink-subtle mb-3">Deliverables</p>
          <ul className="space-y-2 text-sm text-ink-muted list-disc pl-5">
            {phase.deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow uppercase text-ink-subtle mb-3">Your role</p>
          <p className="text-sm text-ink-muted">{phase.clientRole}</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add web/src/components/marketing/methodology-phase.tsx
git commit -m "feat(web): add MethodologyPhase block"
```

---

## Task 18: /how-we-work page

**Files:**
- Create: `web/src/app/how-we-work/page.tsx`

- [ ] **Step 1: Write `web/src/app/how-we-work/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { MethodologyPhase } from "@/components/marketing/methodology-phase";
import { ValueCard } from "@/components/marketing/value-card";
import { Faq } from "@/components/marketing/faq";
import { howWeWork } from "@/content/how-we-work";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How we work",
  description: howWeWork.hero.body,
};

export default function HowWeWorkPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase text-accent mb-4">{howWeWork.hero.eyebrow}</p>
            <h1 className="text-display text-ink">{howWeWork.hero.title}</h1>
            <p className="mt-6 text-lg text-ink-muted max-w-xl">{howWeWork.hero.body}</p>
          </div>
          <OrbitalGraphic />
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader eyebrow="The four phases" title="Same shape every time" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {howWeWork.phases.map((p) => (
              <MethodologyPhase key={p.number} phase={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Why this works" title="What makes this different" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howWeWork.differentiators.map((d) => (
              <ValueCard key={d.title} title={d.title} body={d.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow="Questions" title="Things execs usually ask" />
          <div className="mt-10">
            <Faq items={howWeWork.faq} />
          </div>
        </Container>
      </section>

      <CTASection
        heading={howWeWork.closingCta.heading}
        subtitle={howWeWork.closingCta.subtitle}
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd web && pnpm build
```

Expected: success.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/src/app/how-we-work/page.tsx
git commit -m "feat(web): /how-we-work page with methodology, differentiators, FAQ"
```

---

## Task 19: Global 404 page

**Files:**
- Create: `web/src/app/not-found.tsx`

- [ ] **Step 1: Write `web/src/app/not-found.tsx`**

```tsx
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow uppercase text-accent mb-4">404</p>
          <h1 className="text-display text-ink">Page not found.</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">
            The page you're looking for moved, or never existed. Either way — not what you wanted.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">Back to home</Button>
            <Button href={siteConfig.cta.primary.href} variant="secondary" size="lg">
              {siteConfig.cta.primary.label}
            </Button>
          </div>
        </div>
        <OrbitalGraphic />
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd web && pnpm build
```

Expected: success. 404 page compiled.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/src/app/not-found.tsx
git commit -m "feat(web): global 404 page"
```

---

## Task 20: Expand Playwright smoke to cover all new routes

**Files:**
- Modify: `web/tests/e2e/smoke.spec.ts`

- [ ] **Step 1: Replace `web/tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("homepage renders hero + proof + services + closing CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Bexovar", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/busywork/i);
  await expect(page.getByText("42%")).toBeVisible();
  await expect(page.getByRole("link", { name: /book a call/i }).first()).toBeVisible();
  await expect(page.getByText(/© \d{4} Bexovar/)).toBeVisible();
});

test("skip link works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
});

test("/services lists all four services", async ({ page }) => {
  await page.goto("/services");
  for (const label of ["Custom Software", "RPA & Agents", "Systems Integration", "Process Consulting"]) {
    await expect(page.getByRole("link", { name: new RegExp(label, "i") }).first()).toBeVisible();
  }
});

test("/services/custom-software renders", async ({ page }) => {
  await page.goto("/services/custom-software");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Custom Software|internal tools/i);
});

test("/about renders mission and values", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /Our mission/i })).toBeVisible();
  await expect(page.getByText(/Outcomes over artifacts/i)).toBeVisible();
});

test("/how-we-work renders phases and FAQ", async ({ page }) => {
  await page.goto("/how-we-work");
  await expect(page.getByText(/Discover/i).first()).toBeVisible();
  await expect(page.getByText(/How do you price engagements/i)).toBeVisible();
});

test("unknown URL renders the 404 page", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
});
```

- [ ] **Step 2: Run E2E**

```bash
cd web && pnpm e2e
```

Expected: 7 tests pass.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/tests/e2e/smoke.spec.ts
git commit -m "test(web): expand E2E smoke to cover marketing routes"
```

---

## Task 21: Final verification + tag

- [ ] **Step 1: Run all checks**

```bash
cd web && pnpm lint && pnpm test && pnpm build && pnpm e2e
```

Expected: all exit 0.

- [ ] **Step 2: Tag the milestone**

```bash
cd ..
git tag -a plan-2-marketing-pages -m "Marketing pages: home, services, service detail, about, how-we-work, 404"
```

- [ ] **Step 3: Verify page routes exist in the build output**

Scan the `pnpm build` summary to confirm these routes were generated:
- `/`
- `/services`
- `/services/custom-software`
- `/services/rpa-agents`
- `/services/integrations`
- `/services/consulting`
- `/about`
- `/how-we-work`
- `/_not-found`

Plan 2 is complete when:
- All Vitest tests pass
- All Playwright E2E tests pass (7 cases)
- `pnpm build` succeeds and generates the 9 routes above
- Visual check in browser matches the wireframes

---

## Self-Review

**Spec coverage (Plan 2 scope from spec §4 Phase 1 and §5 Homepage + §6 Secondary pages):**
- ✅ Homepage all 7 sections (hero, proof, demos, services, featured case, process, closing CTA) → Tasks 1, 5–12
- ✅ /services overview with CTA band → Task 13
- ✅ /services/[slug] for 4 services → Task 14
- ✅ /about with mission + values + stats → Task 15 (+3)
- ✅ /how-we-work with phases, differentiators, FAQ → Tasks 16–18 (+4)
- ✅ Global 404 → Task 19
- ✅ Orbital graphic on home hero and /how-we-work → Tasks 6, 18
- ✅ Per-page metadata → Tasks 12, 13, 14, 15, 18
- ✅ E2E coverage of routes → Task 20

**Deferred to later plans (confirmed out of scope for Plan 2):**
- Case studies index + detail → Plan 3 (MDX-driven)
- Demos gallery + video player → Plan 3
- Forms, booking modal, /contact, /proposal → Plan 4
- Full SEO (JSON-LD, sitemap, OG images), analytics, Lighthouse CI → Plan 5

**Placeholder scan:** Demos strip is intentionally placeholder ("Plan 3 replaces") — explicitly called out in Task 8. Featured case links to `/case-studies` which doesn't exist until Plan 3, but the link is valid (renders 404 until then, which is acceptable behavior for an under-construction phase). No other placeholders.

**Type consistency:** `home.metrics` satisfies `Metric[]`; `ProofStrip` accepts `readonly Metric[]`. `home.demos` satisfies `DemoPlaceholder[]`; `DemosStrip` accepts `readonly DemoPlaceholder[]`. `home.process` satisfies `ProcessStep[]`; `ProcessStrip` accepts `readonly ProcessStep[]`. `services` / `getService` / `serviceSlugs` cross-referenced in Task 14. `howWeWork.phases` uses `Phase`; `MethodologyPhase` accepts `Phase`. Consistent.
