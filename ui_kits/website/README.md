# Bexovar Website UI Kit

Recreation of the Bexovar marketing site (`bexovar.io`) — sourced from `JoacoBenz/Bexovar-website@master` under `web/`.

**What's here:**
- `index.html` — interactive click-through across Home → Services → Demos → Case Studies → How We Work → About
- Components defined inline as small React functions at the top of `index.html`:
  - Layout: `NavBar`, `Footer`, `Container`, `Section`
  - Marketing: `Button`, `StatBlock`, `Eyebrow`, `SectionHeader`, `ServiceCard`, `DemoCard`, `CaseCard`, `ProcessStep`, `PhasePanel`, `FAQItem`, `PullQuote`, `CategoryFilter`, `OrbitalGraphic`, `CTASection`

All copy is lifted verbatim from `web/src/content/en/*.ts` and `web/messages/en.json`.
All colors / type / radii / shadows from `colors_and_type.css` (which mirrors `web/src/app/globals.css`).
