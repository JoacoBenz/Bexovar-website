export const demoCategories = [
  "Finance",
  "Logistics",
  "Healthcare",
  "RPA",
  "Integrations",
  "AI agents",
] as const;

export type DemoCategory = (typeof demoCategories)[number];

export type Demo = {
  slug: string;
  title: string;
  duration: string;
  category: DemoCategory;
  summary: string;
  poster: string;
  videoSrc?: string;
};

export const demos = [
  {
    slug: "invoice-triage",
    title: "AP invoice triage & coding",
    duration: "45s",
    category: "Finance",
    summary:
      "Invoices land in a shared inbox, get parsed, matched to POs, GL-coded, and queued for one-click approval.",
    poster: "/demos/invoice-triage.svg",
    videoSrc: "/demos/invoice-triage.mp4",
  },
  {
    slug: "shipment-reconciliation",
    title: "Shipment reconciliation",
    duration: "1:10",
    category: "Logistics",
    summary:
      "Carrier EDI feeds reconciled against WMS receipts; exceptions pushed to ops with proposed adjustments.",
    poster: "/demos/shipment-reconciliation.svg",
    videoSrc: "/demos/shipment-reconciliation.mp4",
  },
  {
    slug: "claims-intake",
    title: "Claims intake & eligibility check",
    duration: "55s",
    category: "Healthcare",
    summary:
      "Patient claims parsed, checked against payer eligibility APIs, and routed by rule into the right work queue.",
    poster: "/demos/claims-intake.svg",
    videoSrc: "/demos/claims-intake.mp4",
  },
  {
    slug: "portal-scraper",
    title: "Vendor portal scraper",
    duration: "40s",
    category: "RPA",
    summary:
      "Scheduled bot logs into three vendor portals, pulls statements, normalizes them, and drops a single report.",
    poster: "/demos/portal-scraper.svg",
    videoSrc: "/demos/portal-scraper.mp4",
  },
  {
    slug: "crm-erp-sync",
    title: "CRM \u2194 ERP two-way sync",
    duration: "1:05",
    category: "Integrations",
    summary:
      "Accounts, opportunities, and orders kept in sync bidirectionally with idempotent, replay-safe handlers.",
    poster: "/demos/crm-erp-sync.svg",
    videoSrc: "/demos/crm-erp-sync.mp4",
  },
  {
    slug: "ops-copilot",
    title: "Ops copilot \u2014 natural-language reports",
    duration: "1:20",
    category: "AI agents",
    summary:
      "A scoped agent answers \u2018show me last week\u2019s exceptions by carrier\u2019 against real ops data, with guardrails.",
    poster: "/demos/ops-copilot.svg",
    videoSrc: "/demos/ops-copilot.mp4",
  },
] as const satisfies readonly Demo[];

export const demoCategoryLabels: Record<DemoCategory, string> = {
  "Finance": "Finance",
  "Logistics": "Logistics",
  "Healthcare": "Healthcare",
  "RPA": "RPA",
  "Integrations": "Integrations",
  "AI agents": "AI agents",
};

export const featuredDemoSlugs = [
  "invoice-triage",
  "shipment-reconciliation",
  "ops-copilot",
] as const;

export function getFeaturedDemos(): readonly Demo[] {
  const slugSet = new Set<string>(featuredDemoSlugs);
  return demos.filter((d) => slugSet.has(d.slug));
}
