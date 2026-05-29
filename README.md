# Bexovar Design System

**Bexovar** — Consultora y desarrolladora de desarrollos web y automatizaciones. A software + automation studio for mid-market operators (directors/VPs at 200–2000 employee companies) who've outgrown spreadsheets and shadow IT.

> Cut your ops team's busywork by 30–60%. Measured, not promised.

## Product in scope

**bexovar.io marketing website** — the primary (only) customer-facing surface. A Next.js 15 App Router site rewriting the original hand-written static HTML. One product, one marketing site. No app or docs UI yet.

Pages:
- `/` Homepage (hero + metrics + demos + services + featured case + process + CTA)
- `/services`, `/services/[slug]` (4 services: custom-software, rpa-agents, integrations, consulting)
- `/case-studies`, `/case-studies/[slug]`
- `/demos` (6 demo videos w/ category filter)
- `/how-we-work` (methodology + FAQ)
- `/about`, `/contact`, `/proposal`, `/404`

Bilingual: English + Spanish (`/en`, `/es`). Spanish is the origin — company description is in Spanish.

## Sources used

- **GitHub:** `JoacoBenz/Bexovar-website@master` (branch `master`)
- Newer implementation under `web/` (Next.js + TS + Tailwind v4) — canonical
- Legacy static HTML at repo root (`index.html`, `services.html`, etc.) — superseded
- **Design spec:** `docs/superpowers/specs/2026-04-13-bexovar-website-enhancement-design.md` — the visual direction, token values, and IA all come from here.

## Index

| File | What's in it |
| --- | --- |
| `README.md` | This file. Brand summary, content + visual foundations, iconography. |
| `colors_and_type.css` | CSS custom properties for every color, type scale, radius, shadow, motion token. Import this in any HTML/artifact. |
| `SKILL.md` | Skill manifest. Cross-compatible with Agent Skills. |
| `assets/favicon.svg` | Brand mark (tiny "B" on navy square, cyan glyph — the legacy favicon). |
| `assets/demos/*.svg` | The 6 demo poster SVGs (placeholder posters used before real video thumbnails land). |
| `preview/*.html` | Design-system cards registered to the Design System tab. |
| `ui_kits/website/` | UI kit recreating the marketing website: components + interactive index. |

---

## Content fundamentals

Bexovar copy is **operator-to-operator, outcomes-first, and sells against vagueness.** Every sentence is a claim with a number or a concrete artifact attached.

### Voice

- **First-person plural ("we")** for the company, **second-person ("your", "you")** for the reader. Never "users" or "the customer."
- **Confident, short, declarative.** No hedging. "We ship focused tools." not "We aim to ship focused tools." Spec's homepage headline is the blueprint: *"Cut your ops team's busywork by 30–60%. Measured, not promised."*
- **Sells against consulting clichés.** Phrases like *"No platforms for their own sake. No five-year transformations."* and *"No status theater."* The brand actively names and rejects the stuff mid-market execs hate.
- **Numbers before nouns.** Prefer "42% AP cost reduction" over "major cost savings." Prefer "4h → 20min" over "dramatic speedup." StatBlocks render these in **green (`--metric`)** for a reason.
- **Deliverables, not vibes.** Sections routinely list artifacts: "Process map. Quantified baseline. Prioritized automation backlog." The body-copy is a bill of materials.

### Tone cues pulled from source

- Hero body: *"We build custom software and automation that takes repetitive, manual work off your people — so they can focus on what actually moves the business."*
- Mission: *"No platforms for their own sake. No five-year transformations. Real outcomes, measured in weeks."*
- Value: *"Outcomes over artifacts — deliverables only matter if they move a metric."*
- Value: *"The engineer scoping the work is the engineer shipping it. No bait-and-switch, no offshore surprise."*
- FAQ: *"Fixed-fee per phase. … Ongoing support is monthly or hourly, your call."*
- About closing CTA: *"Book a 30-min call. If we're not, we'll tell you."*

### Casing

- **Sentence case for headings** — not Title Case. Examples from source: *"What we build"*, *"How we work"*, *"Things execs usually ask"*, *"A bit of context"*.
- **UPPERCASE eyebrows only**, 12px, `.15em` letter-spacing, `--accent` colored. Examples: `PROOF`, `DEMOS`, `HOW WE WORK`, `VALUES`.
- **Case studies** use Title Case section headers for the four narrative blocks: *The Situation / What We Built / The Outcome / How It Was Delivered*.
- **CTA labels** use sentence case: *"Book a call"*, *"Request a proposal"*, *"See demos"*, *"Learn more →"*, *"Read the case →"*.

### Punctuation & symbols

- **Em dash (—)** for asides and attribution: `— CFO, regional hospital group`.
- **Arrow (→)** for link affordances and transformations: `Read the case →`, `4h → 20min`, `Invoice OCR → ERP`.
- **En dash (–)** in numeric ranges: `30–60%`, `2–4`, `1–2 weeks`.
- **Middot (·)** for inline metadata rows: `200-person ops team · 6-week engagement · 38% cost reduction · Full handoff to internal team.`
- **Curly quotes** in pull-quotes (the `PullQuote` component wraps in `&ldquo;…&rdquo;`).
- **No emoji. No exclamation marks.** Not a single one in the source copy. The brand earns trust with measurement, not enthusiasm.

### Structure patterns

- **One-line outcome tagline per service** — outcome, not feature. *"Internal tools shaped to how your team actually works."*
- **Three-example bullet lists** under `"What this looks like in practice"` on every service page. Each example is a full sentence with a number or concrete system named.
- **StatBlock pattern**: `industry tag` + `huge green number` + `one-line outcome`. Used on homepage proof strip and inside case studies.
- **Headline metric is always the first thing on a case study card** — tag, then the number, then the 1-line outcome.

### Bilingual rules

Copy exists in `en.json` / `es.json` and `content/en` / `content/es`. Spanish tends to be slightly longer; layout tolerates ±15% length. A `BilingualBanner` warns on the few case-study detail pages where the narrative is English-only. Spanish CTA labels: *Solicita una llamada*, *Solicita una propuesta*, *Contáctanos*, *Ver demos*.

---

## Visual foundations

**Family:** Modern SaaS — Linear / Notion / Vercel neighborhood. **Restrained, light-first, typographically confident, geometrically calm.**

### Color

- **White-first surfaces.** `--bg` (`#ffffff`) is the dominant background; `--bg-alt` (`#f8fafc`, slate-50) alternates sections for rhythm. Dark band (`--dark-bg` `#0f172a`) appears **only on the closing CTA** and 404 — it's a tool for punctuation, not chrome.
- **One accent: sky-600.** `--accent` (`#0284c7`) for links, primary buttons, eyebrows, icon bubbles, filter pills when active. Hover shifts to `--accent-hover` (`#0369a1`, sky-700). A lightened wash `--accent-soft` (`#e0f2fe`, sky-100) backs process-step bubbles and metric tags.
- **Green reserved for outcomes.** `--metric` (`#059669`, emerald-600) is used **only on headline numbers inside StatBlocks**. Do not use it for buttons, links, or success messages.
- **Neutrals are slate.** `--ink` `#0f172a` for headings, `--ink-muted` `#475569` for body, `--ink-subtle` `#64748b` for meta. Borders `#e2e8f0` are quiet and structural.
- **No gradients as backgrounds.** A subtle accent-to-accent-hover gradient appears on the orbital graphic's core sphere, and nowhere else. No bluish-purple gradients. No glass/mesh.

### Typography

**Inter** across everything, weights 400 / 500 / 600 / 700, `font-display: swap`. Display headings are heavily tracked in (`letter-spacing: -0.02em`).

| Role | Size | Weight | Line height | Notes |
| --- | --- | --- | --- | --- |
| Display (h1) | `clamp(40, 5vw, 64px)` | 700 | 1.05 | Page heroes only |
| H2 | `clamp(32, 3.5vw, 40px)` | 600 | 1.15 | Section titles |
| H3 | 22px | 600 | 1.3 | Card titles, phase titles |
| Lead body | 18px | 400 | 1.55 | Hero body, subtitles |
| Body | 16px | 400 | 1.6 | Default paragraph |
| Small | 14px | 400 | 1.5 | Card body, meta |
| Eyebrow | 12px | 600 | 1.0 | Uppercase, `.15em` track, accent-colored |

### Spacing & layout

- **Section rhythm.** `py-20 md:py-28` (80px / 112px vertical) on every section. This is `--section-py` in `tokens.css`. It's the single most defining layout rule — never break it.
- **Container:** `max-width: 72rem (1152px)`, 1.5rem gutters. Hero split is 1:1 grid on md+.
- **Card padding:** `p-6` (24px) for small cards, `p-10 md:p-14` (40/56px) for large featured containers.
- **Grid gap:** `gap-6` (24px) is the default between cards.

### Radii

- `6px` (`--radius-md`) — buttons.
- `8px` (`--radius-lg`) — cards (service cards, demo cards, case cards, stat blocks, process steps).
- `16px` (`--radius-2xl`) — featured case container and methodology phase panels.
- `9999px` (`--radius-full`) — industry/category pills, process-step number bubbles, filter chips.

### Shadows

- **Rest:** `shadow-sm` = `0 1px 2px 0 rgb(15 23 42 / 0.04)`. A whisper — not decoration.
- **Hover / modal:** `shadow-lg` = `0 10px 30px -10px rgb(15 23 42 / 0.15)`. Short throw, tight blur, a little more than the rest state.
- **No inner shadows. No colored shadows.** Elevation is achieved by shadow transition on hover (`transition-shadow` 150ms), never by color or outline.

### Borders

- **All cards carry a 1px `--border` hairline.** Even on hover, the border stays — elevation is pure shadow. Cards never switch to borderless / "floating" on hover.
- Section dividers use `border-t border-border` — flat, no ornament.
- **No colored left-border accent cards.** The single border-left usage in the entire source is the `PullQuote` — `border-l-4 border-accent` — and that's the exception proving the rule.

### Motion

- **Duration:** 150ms on all hover state changes (the CSS var `--default-transition-duration`). No spring physics.
- **Easing:** standard `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Reveal:** `fade + rise` on scroll (small translateY). No parallax.
- **Orbital graphic** — three concentric rings rotating at 18s / 12s-reverse / 8s. Pauses under `prefers-reduced-motion`.
- **No bounces. No elastic overshoots. No skeleton shimmer.**

### Hover / press states

- **Links:** color shifts `--accent` → `--accent-hover`. No underline toggle.
- **Cards:** `shadow-sm` → `shadow-lg`. Border holds. Card title can shift to accent (`group-hover:text-accent` on service cards).
- **Buttons (primary):** bg `--accent` → `--accent-hover`. No scale.
- **Buttons (secondary, ghost):** bg tint in, border unchanged.
- **No "press" scale-down**; no shrink-on-click.
- **Focus-visible** is universal: `outline: 2px solid var(--accent); outline-offset: 2px`.

### Transparency & blur

- **One use only.** The sticky nav-bar uses `bg-white/90 backdrop-blur` to float over hero content. Nothing else uses backdrop-filter.

### Imagery

- Real product/case imagery is **not present** in the source — intentional. The site uses one signature graphic (the orbital) and demo posters.
- **Demo posters** (`/public/demos/*.svg`) are flat, blueprint-style SVGs: slate-50 field, slate-200 strokes, small accent-blue swatches. Same visual language as the UI.
- No stock photography. No faces. No office shots. No product screenshots with device mockups.
- **When a real product/case image is needed**, treat the light-slate flat-SVG language as the placeholder: `#f8fafc` ground, `#e2e8f0` strokes, `#0284c7` as the single accent color in the image.

### Signature element: the orbital graphic

Three concentric rings (accent/30, /25, /20 opacity) around a sky-blue sphere with an outer glow point. Used **only**:
- Homepage hero (right of headline)
- `/how-we-work` hero
It's not a decoration pattern — it's a brand mark you use sparingly.

---

## Iconography

**Stance: minimal, icon-light.** Bexovar is a copy-forward, number-forward brand. The source code contains almost no icons — typography does the work.

### What's in the source

- **Logos / marks**
  - `assets/favicon.svg` — 32×32 rounded-square, navy `#0D1B2A` ground, cyan `#00C2CB` "B" glyph. This is the legacy favicon; the Next.js spec calls for carrying brand assets forward without restyling, so this is still canonical.
  - **Wordmark** is text-only: `Bexovar` in Inter 700, 18px, `--ink`, rendered in the nav. There is no separate logomark image.
- **Signature graphic:** `OrbitalGraphic` (pure CSS, no asset file) — see above.
- **Demo posters:** 6 flat SVGs under `assets/demos/`.
- **Arrow chars in copy:** unicode `→` is used liberally as a link affordance (`Read the case →`, `Book a call →`, `Invoice OCR → ERP`). Unicode `↔` appears in `CRM ↔ ERP two-way sync`.
- **Nav hamburger** is drawn with three `<span>` divs (no icon), `w-6 h-0.5 bg-ink`.

### What's **not** in the source

- No icon font, no icon-library dependency (no Lucide / Heroicons / Phosphor / FontAwesome imports in `package.json`).
- No emoji anywhere in content.
- No SVG icon sprite.

### Rule for this design system

**Prefer type and whitespace over icons.** When an icon is needed:

1. First, check whether a number, short label, or `→` arrow would do the same job. Usually it does.
2. If you really need an icon, use **Lucide** (CDN: `https://unpkg.com/lucide@latest`) at the default stroke weight `2`. Lucide's geometry (20/24px, rounded join, sparse detail) matches the slate/sky aesthetic. **This is a substitution — flag it** if you ship it: the source has no icon system and the original author should confirm.
3. Icon color defaults to `currentColor` so icons inherit the text color (`--ink-muted` on body, `--accent` on interactive).
4. Never mix icon libraries in a single surface.

### Emoji & unicode

- **Emoji: never.** The brand reads as technical and measured; emoji undercut that.
- **Unicode symbols: yes, sparingly.** `→`, `↔`, `—`, `·`, `–` are all part of the copy system; treat them as typography, not iconography.

---

## Caveats / known substitutions

- **Inter** is loaded via Google Fonts CDN here; the source uses `next/font/google` with the Latin subset, which produces identical glyph metrics, but if you need offline font files please flag and we can bundle the `.woff2`.
- **Iconography** is substitutable with Lucide if needed (see above). No icons ship from the repo.
- **No logomark image exists.** The `Bexovar` wordmark is literal text. Carry it forward as text in Inter 700.
- **Demo video MP4s** are not in the repo (Phase 1 placeholders). The SVG posters are the only visuals available.
