export type Metric = {
  industry: string;
  headline: string;
  detail: string;
};

export type DemoPlaceholder = {
  title: string;
  duration: string;
  summary: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
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
