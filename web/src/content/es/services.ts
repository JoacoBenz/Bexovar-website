export type ServiceSummary = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
};

export type ServiceDetail = ServiceSummary & {
  hero: { eyebrow: string; title: string; body: string };
  examples: string[];
  demos: { title: string; summary: string }[];
  miniCase: { headline: string; summary: string };
  process: { title: string; summary: string }[];
};

const baseProcess = [
  { title: "Descubrir", summary: "Mapear el proceso actual; cuantificar el desperdicio." },
  { title: "Diseñar",   summary: "Prototipar la solución con tus datos reales." },
  { title: "Construir", summary: "Sprints de alcance fijo con demos semanales." },
  { title: "Entregar",  summary: "Documentación, capacitación, 90 días de soporte." },
];

export const servicesOverview = {
  eyebrow: "Lo que construimos",
  title: "Cuatro servicios, un resultado: tu equipo recupera su tiempo.",
  body: "La mayoría de nuestros proyectos combinan varios de estos. Te ayudamos a encontrar la mezcla correcta.",
  midCta: {
    heading: "¿No sabes qué servicio necesitas?",
    subtitle: "Solicita una llamada — te ayudamos a definir el alcance antes de que alguien escriba una línea de código.",
  },
};

export const services: ServiceDetail[] = [
  {
    slug: "custom-software",
    title: "Software a medida",
    tagline: "Herramientas internas diseñadas para cómo tu equipo realmente trabaja.",
    summary: "Aplicaciones a medida que reemplazan hojas de cálculo, shadow IT y coordinación manual.",
    hero: {
      eyebrow: "Software a medida",
      title: "Herramientas internas diseñadas para cómo tu equipo realmente trabaja.",
      body: "Construimos aplicaciones enfocadas y mantenibles que reemplazan el parche de hojas de cálculo y correos que tu equipo ha superado.",
    },
    examples: [
      "Dashboard de operaciones que consolida 4 sistemas en una sola pantalla para el equipo de ops.",
      "Herramienta de flujo de trabajo de back-office que redujo el tiempo de gestión de casos de 22 minutos a 6.",
      "Admin interno que reemplazó un producto con licencia de $60K/año que el equipo había superado.",
    ],
    demos: [
      { title: "Dashboard de operaciones", summary: "Vista unificada de ERP, CRM y fulfillment." },
      { title: "Flujo de casos",           summary: "Ingesta guiada, enrutamiento automático, seguimiento de SLA." },
    ],
    miniCase: {
      headline: "38% menos transferencias",
      summary: "Un equipo de operaciones logísticas de 200 personas consolidó 4 herramientas en una.",
    },
    process: baseProcess,
  },
  {
    slug: "rpa-agents",
    title: "RPA y Agentes",
    tagline: "Automatiza los clics, formularios y copiar-pegar.",
    summary: "Automatización robótica de procesos y agentes de IA que gestionan el trabajo digital repetitivo.",
    hero: {
      eyebrow: "RPA y Agentes",
      title: "Automatiza los clics, formularios y el trabajo de copiar y pegar.",
      body: "Para los sistemas que no puedes reemplazar, construimos bots y agentes confiables que hacen el trabajo manual por ti — con trazabilidad completa.",
    },
    examples: [
      "Automatización de cuentas por pagar: ingesta OCR → publicación en ERP con excepciones supervisadas.",
      "Agente de entrada de datos que mantiene dos CRMs sincronizados en 2M de registros.",
      "Clasificador de triaje de correo que enruta tickets con 97% de precisión.",
    ],
    demos: [
      { title: "Facturas OCR → ERP", summary: "Ingesta de cuentas por pagar de extremo a extremo." },
      { title: "Triaje de correo",   summary: "Clasificador LLM con reglas de escalamiento." },
    ],
    miniCase: {
      headline: "42% de reducción en costos de AP",
      summary: "Un equipo de finanzas reemplazó la entrada manual de facturas nocturna.",
    },
    process: baseProcess,
  },
  {
    slug: "integrations",
    title: "Integración de sistemas",
    tagline: "Haz que tu stack se comunique solo.",
    summary: "Conexión de SaaS, ERPs y sistemas internos para que los datos fluyan sin que los humanos los transporten.",
    hero: {
      eyebrow: "Integración de sistemas",
      title: "Haz que tu stack se comunique solo.",
      body: "Cuando el problema son los silos de datos y las transferencias frágiles, la integración es el punto de apalancamiento. Diseñamos pipelines duraderos, no scripts de un solo uso.",
    },
    examples: [
      "Sincronización CRM ↔ ERP con más de 2M de registros nocturnos con reconciliación delta.",
      "Pipeline de inventario almacén ↔ tienda; stock preciso en menos de 90 segundos.",
      "Pipeline de cierre financiero que extrae datos de 6 fuentes en un informe validado.",
    ],
    demos: [
      { title: "Sincronización de inventario",   summary: "Alineación bidireccional de stock." },
      { title: "Reconciliación de libro mayor",  summary: "Informes programados de cierre del día." },
    ],
    miniCase: {
      headline: "4h → 20min",
      summary: "La reconciliación nocturna reemplazó un proceso manual de cuatro horas.",
    },
    process: baseProcess,
  },
  {
    slug: "consulting",
    title: "Consultoría de procesos",
    tagline: "Encuentra el apalancamiento antes de escribir código.",
    summary: "Diagnóstico de procesos y hojas de ruta orientadas al ROI — a veces la respuesta correcta no es software.",
    hero: {
      eyebrow: "Consultoría de procesos",
      title: "Encuentra el apalancamiento antes de escribir código.",
      body: "La automatización falla cuando el proceso subyacente está desordenado. Comenzamos por el trabajo, no por las herramientas.",
    },
    examples: [
      "Mapa de proceso de 2 semanas con desperdicio cuantificado y backlog de automatización priorizado.",
      "Selección de proveedor: análisis de herramienta interna vs. SaaS con modelo de TCO a 5 años.",
      "Guía de rediseño organizacional para un equipo de finanzas tras liberar 3 FTE con automatización de AP.",
    ],
    demos: [
      { title: "Muestra de mapa de proceso",    summary: "Flujo anotado con identificación de desperdicios." },
      { title: "Presentación del modelo de ROI", summary: "Entradas, sensibilidad, vista a 5 años." },
    ],
    miniCase: {
      headline: "$480K de ahorro en el primer año",
      summary: "La hoja de ruta de un equipo de facturación en salud, secuenciada por retorno.",
    },
    process: baseProcess,
  },
];

export function getService(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

export function serviceLabelBySlug(slug: string): string | undefined {
  return services.find((s) => s.slug === slug)?.title;
}
