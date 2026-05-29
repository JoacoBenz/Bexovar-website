// Bexovar marketing-site component library (JSX).
// All copy lifted from web/src/content/en/*.ts — DO NOT paraphrase.

// ---------- Content (mirrored from web/src/content/en) ----------
const content = {
  nav: [
    { slug: "services", label: "Services" },
    { slug: "case-studies", label: "Case Studies" },
    { slug: "demos", label: "Demos" },
    { slug: "how-we-work", label: "How we work" },
    { slug: "about", label: "About" },
  ],
  home: {
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
    ],
    featuredCase: {
      eyebrow: "Featured case",
      title: "How a mid-market logistics firm cut reconciliation from 4 days to 4 hours",
      summary: "200-person ops team · 6-week engagement · 38% cost reduction · Full handoff to internal team.",
      cta: "Read the case →",
    },
    process: [
      { number: "1", title: "Discover", summary: "2-week process map + ROI estimate." },
      { number: "2", title: "Design", summary: "Prototype on your real data." },
      { number: "3", title: "Build", summary: "Fixed-scope sprints, weekly demos." },
      { number: "4", title: "Handoff", summary: "Docs, training, 90-day support." },
    ],
    closingCta: {
      heading: "Ready to see what this looks like on your workflow?",
      subtitle: "30-min call. We'll show you a live demo built around your actual process.",
    },
  },
  services: [
    { slug: "custom-software", title: "Custom Software", summary: "Purpose-built apps that replace spreadsheets, shadow IT, and manual coordination.", tagline: "Internal tools shaped to how your team actually works.", examples: [
      "Operations dashboard consolidating 4 systems into one screen for the ops team.",
      "Back-office workflow tool that cut case-handling time from 22 minutes to 6.",
      "Internal admin replacing a $60K/yr licensed product the team outgrew.",
    ], miniCase: { headline: "38% fewer hand-offs", summary: "A 200-person logistics ops team consolidated 4 tools into one." } },
    { slug: "rpa-agents", title: "RPA & Agents", summary: "Robotic process automation and AI agents that handle repetitive digital work.", tagline: "Automate the clicks, forms, and copy-paste.", examples: [
      "AP automation: OCR intake → ERP posting with human-in-the-loop exceptions.",
      "Data-entry agent that keeps two CRMs in sync across 2M records.",
      "Email triage classifier routing tickets with 97% accuracy.",
    ], miniCase: { headline: "42% AP cost reduction", summary: "A finance team replaced nightly manual invoice entry." } },
    { slug: "integrations", title: "Systems Integration", summary: "Wiring SaaS, ERPs, and internal systems so data flows without humans carrying it.", tagline: "Make your stack talk to itself.", examples: [
      "CRM ↔ ERP sync handling 2M+ records nightly with delta reconciliation.",
      "Warehouse ↔ storefront inventory pipeline; stock accurate within 90 seconds.",
      "Finance close pipeline pulling data from 6 sources into a validated report.",
    ], miniCase: { headline: "4h → 20min", summary: "Nightly reconciliation replaced a four-hour manual process." } },
    { slug: "consulting", title: "Process Consulting", summary: "Process diagnostics and ROI-aware roadmaps — sometimes the right answer is not software.", tagline: "Find the leverage before you write code.", examples: [
      "2-week process map with quantified waste and a prioritized automation backlog.",
      "Vendor selection: built an internal tool vs. licensed SaaS decision with a 5-yr TCO model.",
      "Org redesign playbook for a finance team after AP automation freed 3 FTE.",
    ], miniCase: { headline: "$480K year-one savings", summary: "A healthcare billing team's roadmap, sequenced by payback." } },
  ],
  demos: [
    { slug: "invoice-triage", title: "AP invoice triage & coding", duration: "45s", category: "Finance", summary: "Invoices land in a shared inbox, get parsed, matched to POs, GL-coded, and queued for one-click approval.", poster: "../../assets/demos/invoice-triage.svg" },
    { slug: "shipment-reconciliation", title: "Shipment reconciliation", duration: "1:10", category: "Logistics", summary: "Carrier EDI feeds reconciled against WMS receipts; exceptions pushed to ops with proposed adjustments.", poster: "../../assets/demos/shipment-reconciliation.svg" },
    { slug: "claims-intake", title: "Claims intake & eligibility check", duration: "55s", category: "Healthcare", summary: "Patient claims parsed, checked against payer eligibility APIs, and routed by rule into the right work queue.", poster: "../../assets/demos/claims-intake.svg" },
    { slug: "portal-scraper", title: "Vendor portal scraper", duration: "40s", category: "RPA", summary: "Scheduled bot logs into three vendor portals, pulls statements, normalizes them, and drops a single report.", poster: "../../assets/demos/portal-scraper.svg" },
    { slug: "crm-erp-sync", title: "CRM ↔ ERP two-way sync", duration: "1:05", category: "Integrations", summary: "Accounts, opportunities, and orders kept in sync bidirectionally with idempotent, replay-safe handlers.", poster: "../../assets/demos/crm-erp-sync.svg" },
    { slug: "ops-copilot", title: "Ops copilot — natural-language reports", duration: "1:20", category: "AI agents", summary: "A scoped agent answers 'show me last week's exceptions by carrier' against real ops data, with guardrails.", poster: "../../assets/demos/ops-copilot.svg" },
  ],
  demoCategories: ["Finance", "Logistics", "Healthcare", "RPA", "Integrations", "AI agents"],
  cases: [
    { slug: "logistics-reconciliation", industry: "Logistics", metric: "38%", metricLabel: "cost reduction", summary: "A 200-person ops team consolidated four tools into one. Reconciliation went from 4 days to 4 hours." },
    { slug: "finance-ap", industry: "Finance", metric: "42%", metricLabel: "AP cost cut", summary: "Nightly manual invoice entry replaced with OCR-to-ERP pipeline and human-in-the-loop exceptions." },
    { slug: "healthcare-billing", industry: "Healthcare", metric: "$480K", metricLabel: "year-one savings", summary: "A billing team's automation roadmap, sequenced by payback, saved $480K in the first twelve months." },
    { slug: "retail-ops", industry: "Retail", metric: "3 FTE", metricLabel: "reallocated", summary: "Repetitive pricing work moved to a scheduled job; three full-time staff redirected to growth projects." },
  ],
  caseCategories: ["Finance", "Logistics", "Healthcare", "Retail"],
  howWeWork: {
    hero: { eyebrow: "How we work", title: "Predictable process. No mystery.", body: "Every engagement follows the same four phases so you always know what's next, what's expected, and what you'll get." },
    phases: [
      { number: "1", title: "Discover", duration: "1–2 weeks", deliverables: ["Process map of the target workflow", "Quantified baseline (time, cost, error rate)", "Prioritized automation backlog with ROI estimates"], clientRole: "Two half-day workshops; async Q&A in between." },
      { number: "2", title: "Design", duration: "1–2 weeks", deliverables: ["Prototype working against your real data", "Data-flow and integration diagrams", "Fixed-scope statement of work"], clientRole: "One walkthrough per week; sign-off before Build." },
      { number: "3", title: "Build", duration: "3–8 weeks", deliverables: ["Production code in your environment", "Automated tests and monitoring", "Weekly working demos — not status decks"], clientRole: "30-min demo each week; exception review as needed." },
      { number: "4", title: "Handoff", duration: "2 weeks + 90-day support", deliverables: ["Runbooks and architecture docs", "Training for the internal owners", "Bug fixes and minor tweaks for 90 days"], clientRole: "Identify internal owner(s) early in Build." },
    ],
    differentiators: [
      { title: "Fixed-scope sprints", body: "You know the price and the deadline before we start. Scope changes turn into change orders, not mystery invoices." },
      { title: "Weekly working demos", body: "Every Friday you see something that runs. No status theater." },
      { title: "Built to hand off", body: "Your team owns what we build. Docs, training, and a 90-day warranty come standard." },
    ],
    faq: [
      { q: "How do you price engagements?", a: "Fixed-fee per phase. Discover is a flat rate. Design and Build are quoted together after Discover. Ongoing support is monthly or hourly, your call." },
      { q: "How long does a typical project take?", a: "Six to ten weeks end-to-end is typical. Discover ~2 weeks, Design ~1–2, Build ~3–6, Handoff ~2 plus 90 days of support." },
      { q: "Who owns the IP?", a: "You do. All code is delivered under work-for-hire terms to your organization. We keep no embedded licenses or runtime fees." },
      { q: "Who will be on the team?", a: "Two to four senior engineers. The person scoping the work is the person shipping it. No offshore handoff, no junior staffing surprise." },
      { q: "What happens after handoff?", a: "Ninety days of included support for bug fixes and small tweaks. After that, most clients move to a monthly retainer for enhancements, or come back for the next project." },
    ],
  },
  about: {
    hero: { eyebrow: "About Bexovar", title: "We build the software your operators wish they had.", body: "We're a software and automation team that partners with mid-market operators who have outgrown spreadsheets and shadow IT. We ship focused tools, measure what they change, and hand them off clean." },
    values: [
      { title: "Outcomes over artifacts", body: "Deliverables only matter if they move a metric. We quantify savings before we start and verify them after we ship." },
      { title: "Fixed scope, weekly demos", body: "Every engagement has a clear budget, timeline, and definition of done. You see progress every week — no six-month surprises." },
      { title: "Built to hand off", body: "Your team owns what we build. We write the docs we'd want to inherit and train the people who'll maintain it." },
      { title: "Small team, senior people", body: "The engineer scoping the work is the engineer shipping it. No bait-and-switch, no offshore surprise." },
    ],
    stats: [
      { headline: "30–60%", label: "Typical cost reduction on automated processes" },
      { headline: "6 wks",  label: "Median engagement length" },
      { headline: "5",      label: "Industries we've shipped in" },
    ],
  },
};

window.BexovarContent = content;
