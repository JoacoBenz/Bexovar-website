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

export const industryLabels: Record<Industry, string> = {
  Finance: "Finanzas",
  Logistics: "Logística",
  Healthcare: "Salud",
  Retail: "Retail",
};

export const caseStudies = [
  {
    slug: "finance-invoice-automation",
    industry: "Finance",
    services: ["rpa-agents", "custom-software"],
    engagementLength: "10 semanas",
    clientDescriptor: "Prestamista especializado de mediana empresa, ~200 empleados",
    headlineOutcome: "42% menos costo de procesamiento de facturas y cierre 4 días más rápido.",
    headlineMetric: { value: "42%", label: "menos costo de procesamiento de facturas" },
    cardSummary:
      "Redujo el costo de procesamiento de AP en un 42% al reemplazar el triaje manual con automatización y una app ligera de aprobaciones.",
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
          "Dejamos de preguntarnos si necesitábamos contratar otro analista de AP. Esa pregunta simplemente desapareció.",
        attribution: "VP de Finanzas, prestamista especializado de mediana empresa",
      },
    ],
    relatedDemoSlugs: ["invoice-triage", "portal-scraper"],
  },
  {
    slug: "logistics-shipment-reconciliation",
    industry: "Logistics",
    services: ["integrations", "custom-software"],
    engagementLength: "3 meses",
    clientDescriptor: "Operador 3PL regional, 12 almacenes",
    headlineOutcome:
      "Redujo la reconciliación de envíos de 4 horas a 20 minutos diarios en todos los sitios.",
    headlineMetric: { value: "4h → 20min", label: "tiempo de reconciliación de envíos" },
    cardSummary:
      "Reemplazó un proceso manual de conciliación transportista-WMS con una integración idempotente que muestra solo las excepciones reales.",
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
          "Nuestros gerentes de almacén peleaban por quién tenía que hacer la reconciliación. Ahora es solo una pestaña que revisan después del café.",
        attribution: "Director de Operaciones, 3PL regional",
      },
      {
        quote: "El replay idempotente nos salvó la semana que tuvimos un feed de transportista defectuoso. El sistema simplemente reconvergió.",
        attribution: "Jefe de TI, 3PL regional",
      },
    ],
    relatedDemoSlugs: ["shipment-reconciliation", "crm-erp-sync"],
  },
  {
    slug: "healthcare-claims-intake",
    industry: "Healthcare",
    services: ["custom-software", "integrations"],
    engagementLength: "4 meses",
    clientDescriptor: "Servicio regional de facturación médica, ~80 empleados",
    headlineOutcome: "$480K de ahorro anual y menor tiempo de respuesta de pagadores en el primer año.",
    headlineMetric: { value: "$480K", label: "ahorro anual, primer año" },
    cardSummary:
      "Automatizó la verificación de elegibilidad inicial en las reclamaciones entrantes para que el personal solo gestione excepciones.",
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
          "Estábamos listos para firmar contratos con tres nuevos analistas. En cambio, ascendimos a dos personas existentes a roles de team lead.",
        attribution: "Dueño, servicio regional de facturación médica",
      },
    ],
    relatedDemoSlugs: ["claims-intake"],
  },
  {
    slug: "retail-ops-reallocation",
    industry: "Retail",
    services: ["consulting", "rpa-agents"],
    engagementLength: "6 meses",
    clientDescriptor: "Retailer especializado multi-marca, más de 40 tiendas",
    headlineOutcome: "Liberó 3 FTE para trabajo de crecimiento sin eliminar ningún puesto.",
    headlineMetric: { value: "3 FTE", label: "reasignados a trabajo de crecimiento" },
    cardSummary:
      "El mapeo de procesos más automatización enfocada en tres flujos de alto volumen recuperó el tiempo equivalente a tres roles.",
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
          "No nos faltaban ideas. Nos faltaban horas. Esto nos devolvió las horas.",
        attribution: "COO, retailer especializado multi-marca",
      },
    ],
    relatedDemoSlugs: ["portal-scraper", "ops-copilot"],
  },
] as const satisfies readonly CaseStudy[];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
