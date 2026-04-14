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
    eyebrow: "Cómo trabajamos",
    title: "Proceso predecible. Sin misterios.",
    body: "Cada proyecto sigue las mismas cuatro fases para que siempre sepas qué sigue, qué se espera y qué recibirás.",
  },
  phases: [
    {
      number: "1",
      title: "Descubrir",
      duration: "1–2 semanas",
      deliverables: [
        "Mapa del proceso del flujo de trabajo objetivo",
        "Baseline cuantificado (tiempo, costo, tasa de errores)",
        "Backlog de automatizaciones priorizado con estimaciones de ROI",
      ],
      clientRole: "Dos talleres de medio día; preguntas asíncronas en el intermedio.",
    },
    {
      number: "2",
      title: "Diseñar",
      duration: "1–2 semanas",
      deliverables: [
        "Prototipo funcionando con tus datos reales",
        "Diagramas de flujo de datos e integraciones",
        "Declaración de trabajo de alcance fijo",
      ],
      clientRole: "Una revisión por semana; aprobación antes de Construir.",
    },
    {
      number: "3",
      title: "Construir",
      duration: "3–8 semanas",
      deliverables: [
        "Código en producción en tu entorno",
        "Tests automatizados y monitoreo",
        "Demos semanales en funcionamiento — no presentaciones de estado",
      ],
      clientRole: "Demo de 30 min cada semana; revisión de excepciones según se necesite.",
    },
    {
      number: "4",
      title: "Entregar",
      duration: "2 semanas + 90 días de soporte",
      deliverables: [
        "Runbooks y documentación de arquitectura",
        "Capacitación para los responsables internos",
        "Corrección de errores y ajustes menores por 90 días",
      ],
      clientRole: "Identifica al responsable interno desde Construir.",
    },
  ] satisfies Phase[],
  differentiators: [
    {
      title: "Sprints de alcance fijo",
      body: "Conoces el precio y el plazo antes de empezar. Los cambios de alcance se convierten en órdenes de cambio, no en facturas sorpresa.",
    },
    {
      title: "Demos semanales en funcionamiento",
      body: "Cada viernes ves algo que corre. Sin teatro de estado.",
    },
    {
      title: "Diseñado para entregar",
      body: "Tu equipo es dueño de lo que construimos. Documentación, capacitación y 90 días de garantía son estándar.",
    },
  ],
  faq: [
    {
      q: "¿Cómo cobran los proyectos?",
      a: "Tarifa fija por fase. Descubrir es una tarifa plana. Diseñar y Construir se cotizan juntos después de Descubrir. El soporte continuo es mensual o por hora, tú eliges.",
    },
    {
      q: "¿Cuánto dura un proyecto típico?",
      a: "De seis a diez semanas de inicio a fin es lo habitual. Descubrir ~2 semanas, Diseñar ~1–2, Construir ~3–6, Entregar ~2 más 90 días de soporte.",
    },
    {
      q: "¿Quién es dueño de la propiedad intelectual?",
      a: "Tú. Todo el código se entrega bajo términos de trabajo por encargo a tu organización. No mantenemos licencias embebidas ni tarifas de uso continuo.",
    },
    {
      q: "¿Quién estará en el equipo?",
      a: "Dos a cuatro ingenieros senior. La persona que define el alcance es la que lo construye. Sin transferencias offshore, sin sorpresas de personal junior.",
    },
    {
      q: "¿Qué pasa después de la entrega?",
      a: "Noventa días de soporte incluido para corrección de errores y ajustes pequeños. Después, la mayoría de los clientes pasa a un retainer mensual para mejoras, o vuelve para el siguiente proyecto.",
    },
  ] satisfies Faq[],
  closingCta: {
    heading: "Empieza con una llamada de 30 minutos.",
    subtitle: "Te diremos si tu problema se adapta a lo que hacemos — con honestidad — antes de cotizar nada.",
  },
} as const;
