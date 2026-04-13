# Bexovar Website Enhancement — Design Spec

**Date:** 2026-04-13
**Status:** Approved for planning
**Next step:** Hand off to `writing-plans` skill for Phase 1 implementation plan

---

## 1. Goal & Audience

Transform the Bexovar marketing site from its current hand-written static HTML into a modern, conversion-focused Next.js site that appeals to **mid-market executives** (directors/VPs at 200–2000 employee companies). Visitors should leave understanding what Bexovar builds, seeing proof it works, and feeling invited to book a call.

**Primary conversion goal:** book a discovery call. Secondary: request a proposal. Tertiary: general contact.

**Differentiating hook:** "Book a call → see a live demo on your own workflow." The site showcases anonymized case studies and short recorded demos; the hands-on interactive demo is unlocked via the discovery call.

## 2. Visual Direction

**Modern SaaS / Clean** (light backgrounds, generous whitespace, friendly blue accent — Linear/Notion/Vercel family).

### Design tokens
- **Colors:** white primary, `#f8fafc` secondary bg, `#0f172a` headings, `#475569` body, `#0284c7` accent (hover `#0369a1`), `#059669` for metric callouts, `#e2e8f0` borders.
- **Typography:** Inter. Display 48–64/700, H2 32–40/600, H3 20–24/600, body 16–18/400 (1.6 leading), eyebrow 12–13/600 uppercase.
- **Spacing:** Tailwind default scale; section padding `py-20 md:py-28`.
- **Radii:** `rounded-md` (6px) buttons, `rounded-lg` (8px) cards, `rounded-2xl` (16px) large containers.
- **Shadow:** minimal — `shadow-sm` rest, `shadow-lg` hover/modal.
- **Motion:** 150ms ease on hover; fade+rise on scroll reveal; respects `prefers-reduced-motion`.

### Signature element: orbital graphic
Carried forward from current site, restyled for light theme (soft sky-blue rings, muted glow). Used only on:
- Homepage hero (right-side accent beside headline)
- `/how-we-work` page (methodology anchor)

Paused under `prefers-reduced-motion`.

## 3. Information Architecture

### Top nav (sticky)
`Logo | Services | Case Studies | Demos | How we work | About | [Book a call]`

- Phase 2 adds "Services" dropdown (industries) and "Resources" (blog, playbooks).

### Footer
Three-column: Services links · Company (About, Case Studies, Contact) · CTA block ("Ready to scope a project? → Book a call"). Bottom bar: copyright, LinkedIn, email, privacy.

### CTA hierarchy
- **Primary (everywhere):** "Book a call" → Cal.com embed in modal or `/book`.
- **Secondary (services + case pages):** "Request a proposal" → `/proposal` long form.
- **Tertiary (footer, 404):** "Contact us" → `/contact`.

## 4. Scope & Phasing

### Phase 1 — Conversion core (this spec's target)
Pages:
1. `/` — Homepage
2. `/services` — overview
3. `/services/[slug]` — 4 service detail pages (custom-software, rpa-agents, integrations, consulting)
4. `/case-studies` — index
5. `/case-studies/[slug]` — case detail template
6. `/demos` — gallery with category filter
7. `/how-we-work` — methodology
8. `/about` — story + values (no team section yet)
9. `/contact` — form + booking embed
10. `/proposal` — longer intake form
11. `/404`, `sitemap.xml`, `robots.txt` — restyled / regenerated

Also in Phase 1: design system, shared components, forms, booking, analytics, SEO, migration.

### Phase 2 — Credibility & SEO (not in this spec)
Industries pages, Team/Leadership section on About, Engagement models / pricing transparency page.

### Phase 3 — Lead-gen tooling (not in this spec)
ROI calculator, Resources hub, Blog refresh.

## 5. Homepage Structure (outcomes-first narrative)

1. **Hero** — outcome headline ("Cut your ops team's busywork by 30–60%. Measured, not promised."), subcopy, dual CTA (Book a call / See demos), industries-served line, orbital graphic.
2. **Proof strip** — 4 anonymized metric cards (industry tag + big number + 1-line outcome).
3. **Demos strip** — 3 featured demo thumbnails + link to gallery.
4. **Services** — 4-card grid, each linking to its detail page.
5. **Featured case study** — single full-width teaser.
6. **How we work** — 4-step process strip (Discover · Design · Build · Handoff).
7. **Closing CTA band** (dark) — Book a call / Request a proposal.
8. **Footer.**

## 6. Secondary Page Structures

### `/services` overview
Hero → 4-service grid → mid-page CTA ("Not sure which? Book a call — we'll help you scope it") → footer CTA.

### `/services/[slug]` (×4)
Hero (service + outcome tagline) → "What this looks like in practice" (3 bullets) → 1–2 demo embeds relevant to the service → mini case callout → abbreviated 4-step process → dual CTA.

### `/case-studies` index
Hero + industry/service filter chips → grid of case cards (industry tag, headline metric, 1-line outcome, link) → CTA band.

### `/case-studies/[slug]`
Hero (industry + engagement length + headline outcome) → The Situation / What We Built / The Outcome / How It Was Delivered → pull quotes (anonymized titles) → related demo embeds → CTA.

### `/demos`
Hero + category filter (Finance · Logistics · Healthcare · RPA · Integrations · AI agents) → responsive grid of `DemoCard` → inline/modal player → prominent "Want a live demo on your data? Book a call" band.

### `/how-we-work`
Hero with orbital graphic → 4-phase timeline with deliverables/duration/client involvement per phase → "What makes this different" (3 differentiators: fixed-scope sprints, weekly demos, full handoff) → FAQ (pricing model, timeline, IP ownership, team composition, post-launch support) → CTA band.

### `/about`
Mission + founding story (short) → values / operating principles (3–4) → industries + years of combined experience stats → CTA.

### `/contact`
Split layout: contact form (left) + Cal.com embed (right) → email + response-time promise ("reply within 1 business day") → FAQ accordion below.

### `/proposal`
Long intake form: company, industry, team size, pain point, timeline, budget range → submits to inbox with auto-reply confirming receipt.

## 7. Component Library

Built on Tailwind + `shadcn/ui`:

- `Button` (primary / secondary / ghost, 3 sizes)
- `Card` (base)
- `ServiceCard`, `CaseStudyCard`, `DemoCard`
- `StatBlock` (big number + label)
- `SectionHeader` (eyebrow + title + subtitle)
- `CTASection` (reusable band)
- `NavBar` (sticky, responsive, mobile drawer)
- `Footer`
- `VideoEmbed` (lazy, poster thumbnail, play-on-click)
- `OrbitalGraphic` (light-theme version, reduced-motion aware)
- `LogoStrip` → rendered as "Industries we serve" icon row (no client logos available)
- `ContactForm`, `ProposalForm`, `FormField`
- `BookingModal` (wraps Cal.com embed)

Each component must be understandable and testable in isolation; file per component; props typed.

## 8. Technical Architecture

- **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS.
- **Content:** MDX files in-repo for case studies and demos. Front-matter drives metadata (industry, service, metrics, thumbnail). No external CMS in Phase 1.
- **Forms:** `react-hook-form` + `zod` client validation; Next.js route handlers validate server-side and forward via Resend to a configured inbox. Honeypot + Cloudflare Turnstile for anti-spam.
- **Booking:** Cal.com embed; primary "Book a call" CTA opens in a modal; `/book` route also available as a deep link.
- **Analytics:** Plausible. Track page views + named events (`book_call_cta_click`, `proposal_submit`, `contact_submit`, `demo_play`).
- **SEO:** per-page `metadata` exports; JSON-LD (Organization, Service, Article); generated `sitemap.xml` and `robots.txt`; canonical URLs; OG images via `next/og`.
- **Images/media:** `next/image` with AVIF/WebP; videos lazy-loaded, self-hosted on Vercel Blob or unlisted YouTube.
- **Fonts:** `next/font` Inter subset, `font-display: swap`.
- **Deploy:** Vercel. `main` → production. PRs → preview URLs.

## 9. Non-Functional Requirements

**Performance budget (4G throttled, mobile):**
- LCP < 2.0s
- CLS < 0.05
- Homepage JS < 80 KB gzipped
- Lighthouse CI enforces budgets on every PR.

**Accessibility:** WCAG 2.1 AA. axe-core in CI. Keyboard nav, focus-visible rings, skip-to-content link. Reduced-motion honored.

**Browser support:** last 2 versions of Chrome, Firefox, Safari, Edge.

**Privacy:** Plausible (no cookie banner needed). No third-party tracking pixels. Forms store only submitted data and email transcript.

## 10. Testing Strategy

- **Unit (Vitest):** form validators, utility functions, content-loader helpers.
- **Component (Vitest + Testing Library):** interactive components (BookingModal, VideoEmbed, filter chips).
- **E2E (Playwright):** homepage load + CTA flow, book-a-call modal open, contact form submission (with mocked Resend), demo play, 404 rendering, nav keyboard navigation.
- **Visual:** manual review via Vercel preview URLs before each merge.
- **Lighthouse CI:** blocks PRs that regress perf or a11y budgets.

## 11. Migration & Cutover

- Build new site in parallel at a Vercel preview domain (e.g., `new.bexovar.io`).
- Preserve existing URLs where possible; map 301 redirects for any that change.
- Carry over existing meta/OG so SEO doesn't regress.
- Keep current favicon and brand assets; restyle rather than replace.
- Cutover via single DNS switch once Phase 1 is fully approved in preview.
- Old site archived in a `legacy/` branch for reference.

## 12. Open Questions / To Resolve Before Implementation

- Exact copy for hero headline, service taglines, case study narratives (we have placeholders in the spec — client to supply or approve AI-drafted copy).
- Demo videos/GIFs: list of available assets, categories, and titles.
- Cal.com account URL to embed.
- Resend sender domain + destination inbox.
- Turnstile site key provisioning.
- Legal copy: privacy policy, any NDAs governing case study wording.

## 13. Explicitly Out of Scope (Phase 1)

- ROI calculator (Phase 3)
- Industries landing pages (Phase 2)
- Team/Leadership on About (Phase 2)
- Engagement models / pricing page (Phase 2)
- Resources hub / lead-magnet downloads (Phase 3)
- Blog content migration beyond restyling (Phase 3)
- Client portal, gated content, auth (not planned)
- Multi-language / i18n (not planned)
