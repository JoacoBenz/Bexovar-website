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
