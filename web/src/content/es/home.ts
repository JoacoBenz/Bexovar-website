export type Metric = {
  industry: string;
  headline: string;
  detail: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
};

export const home = {
  hero: {
    eyebrow: "Automatización de operaciones",
    title: "Reduce entre un 30 y un 60 % el trabajo repetitivo de tu equipo de operaciones. Medido, no prometido.",
    body: "Construimos software a medida y automatización que quita trabajo manual y repetitivo a tu gente — para que puedan enfocarse en lo que realmente mueve el negocio. Solicita una llamada y mira una demo en vivo sobre tu propio flujo de trabajo.",
    industries: "Industrias en las que trabajamos: Finanzas · Logística · Salud · Manufactura · Retail",
  },
  metrics: [
    { industry: "Finanzas", headline: "42%", detail: "menos costo de procesamiento de facturas" },
    { industry: "Logística", headline: "4h → 20min", detail: "tiempo de reconciliación de envíos" },
    { industry: "Salud", headline: "$480K", detail: "de ahorro anual en el primer año" },
    { industry: "Retail", headline: "3 FTE", detail: "reasignados a trabajo de crecimiento" },
  ] satisfies Metric[],
  featuredCase: {
    eyebrow: "Caso destacado",
    title: "Cómo una empresa logística mediana redujo la reconciliación de 4 días a 4 horas",
    summary: "Equipo de 200 personas · 6 semanas · 38 % de reducción de costos · Entrega completa al equipo interno.",
    href: "/case-studies",
    cta: "Leer el caso →",
  },
  process: [
    { number: "1", title: "Descubrir", summary: "Mapa del proceso + estimación de ROI en 2 semanas." },
    { number: "2", title: "Diseñar", summary: "Prototipo sobre tus datos reales." },
    { number: "3", title: "Construir", summary: "Sprints de alcance fijo con demos semanales." },
    { number: "4", title: "Entregar", summary: "Documentación, capacitación y 90 días de soporte." },
  ] satisfies ProcessStep[],
  closingCta: {
    heading: "¿Listo para ver cómo se ve esto en tu flujo de trabajo?",
    subtitle: "Llamada de 30 minutos. Te mostraremos una demo en vivo construida sobre tu proceso real.",
  },
} as const;
