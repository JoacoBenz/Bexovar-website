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
  sectionHeaders: {
    phasesEyebrow: "The four phases",
    phasesTitle: "Same shape every time",
    differentiatorsEyebrow: "Why this works",
    differentiatorsTitle: "What makes this different",
    faqEyebrow: "Questions",
    faqTitle: "Things execs usually ask",
  },
  closingCta: {
    heading: "Start with a 30-minute call.",
    subtitle: "We'll tell you whether your problem fits our shape — honestly — before we quote anything.",
  },
} as const;
