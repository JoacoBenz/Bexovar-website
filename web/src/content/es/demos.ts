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

export const demoCategoryLabels: Record<DemoCategory, string> = {
  "Finance": "Finanzas",
  "Logistics": "Logística",
  "Healthcare": "Salud",
  "RPA": "RPA",
  "Integrations": "Integraciones",
  "AI agents": "Agentes de IA",
};

export const demos = [
  {
    slug: "invoice-triage",
    title: "Triaje y codificación de facturas de cuentas por pagar",
    duration: "45s",
    category: "Finance",
    summary:
      "Las facturas llegan a un buzón compartido, se procesan, se emparejan con órdenes de compra, se codifican contablemente y se ponen en cola para aprobación con un clic.",
    poster: "/demos/invoice-triage.svg",
    videoSrc: "/demos/invoice-triage.mp4",
  },
  {
    slug: "shipment-reconciliation",
    title: "Reconciliación de envíos",
    duration: "1:10",
    category: "Logistics",
    summary:
      "Feeds EDI de transportistas reconciliados contra recibos del WMS; excepciones enviadas a ops con ajustes propuestos.",
    poster: "/demos/shipment-reconciliation.svg",
    videoSrc: "/demos/shipment-reconciliation.mp4",
  },
  {
    slug: "claims-intake",
    title: "Ingesta de reclamaciones y verificación de elegibilidad",
    duration: "55s",
    category: "Healthcare",
    summary:
      "Reclamaciones de pacientes procesadas, verificadas contra APIs de elegibilidad del pagador y enrutadas por regla a la cola de trabajo correcta.",
    poster: "/demos/claims-intake.svg",
    videoSrc: "/demos/claims-intake.mp4",
  },
  {
    slug: "portal-scraper",
    title: "Extractor de portales de proveedores",
    duration: "40s",
    category: "RPA",
    summary:
      "Un bot programado inicia sesión en tres portales de proveedores, extrae estados de cuenta, los normaliza y genera un único informe.",
    poster: "/demos/portal-scraper.svg",
    videoSrc: "/demos/portal-scraper.mp4",
  },
  {
    slug: "crm-erp-sync",
    title: "Sincronización bidireccional CRM \u2194 ERP",
    duration: "1:05",
    category: "Integrations",
    summary:
      "Cuentas, oportunidades y pedidos sincronizados bidireccionalmente con manejadores idempotentes y seguros para repetición.",
    poster: "/demos/crm-erp-sync.svg",
    videoSrc: "/demos/crm-erp-sync.mp4",
  },
  {
    slug: "ops-copilot",
    title: "Copiloto de operaciones \u2014 informes en lenguaje natural",
    duration: "1:20",
    category: "AI agents",
    summary:
      "Un agente con alcance definido responde \u2018muéstrame las excepciones de la semana pasada por transportista\u2019 contra datos reales de ops, con restricciones.",
    poster: "/demos/ops-copilot.svg",
    videoSrc: "/demos/ops-copilot.mp4",
  },
] as const satisfies readonly Demo[];

export const featuredDemoSlugs = [
  "invoice-triage",
  "shipment-reconciliation",
  "ops-copilot",
] as const;

export function getFeaturedDemos(): readonly Demo[] {
  const slugSet = new Set<string>(featuredDemoSlugs);
  return demos.filter((d) => slugSet.has(d.slug));
}
