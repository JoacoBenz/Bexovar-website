# i18n Subsystem (Spanish + English) — Design (Plan 5)

**Status:** Approved for implementation planning
**Date:** 2026-04-13
**Parent spec:** `2026-04-13-bexovar-website-enhancement-design.md`
**Preceded by:** Plans 1–4.

## 1. Goal

Ship a Spanish translation of the Bexovar site alongside the existing English version, with a locale toggle in the nav bar. English URLs stay unchanged (no SEO regression); Spanish pages live under a `/es` prefix.

## 2. Decisions settled during brainstorming

- **URL strategy:** path-prefixed routes via `next-intl`, with `localePrefix: "as-needed"`. English keeps its current URLs (`/demos`, `/services/[slug]`, etc.); Spanish gets a `/es` prefix (`/es/demos`, `/es/services/[slug]`).
- **Translation scope:** UI chrome + short structured content (home, services, demos, about, how-we-work, case-study cards + metadata). Long-form case study narratives stay English-only in this plan, with a visible banner on Spanish detail pages.
- **Toggle placement:** nav bar, desktop and mobile drawer, `EN | ES` pill. Default locale = English. No browser-language auto-detect. Cookie (`NEXT_LOCALE`) persists the user's choice across visits.

## 3. Architecture

### 3.1 Routing reorg

Every existing page under `web/src/app/` moves into `web/src/app/[locale]/`. The old locations are replaced by a single `app/[locale]/` tree. Specifically:

- `web/src/app/page.tsx` → `web/src/app/[locale]/page.tsx`
- `web/src/app/layout.tsx` → split: a tiny `web/src/app/layout.tsx` keeps `<html>`/`<body>` boilerplate without locale-specific attributes, and a `web/src/app/[locale]/layout.tsx` adds `lang={locale}`, `<NextIntlClientProvider>`, nav, footer. (next-intl prefers the provider in a locale layout.)
- `web/src/app/about/` → `web/src/app/[locale]/about/`
- `web/src/app/services/` → `web/src/app/[locale]/services/` (including `[slug]/`)
- `web/src/app/how-we-work/` → `web/src/app/[locale]/how-we-work/`
- `web/src/app/demos/` → `web/src/app/[locale]/demos/`
- `web/src/app/case-studies/` → `web/src/app/[locale]/case-studies/` (including `[slug]/`)
- `web/src/app/not-found.tsx` → `web/src/app/[locale]/not-found.tsx` (localized 404)

Middleware at `web/src/middleware.ts` uses next-intl's `createMiddleware` to handle locale redirects and cookie persistence.

### 3.2 Config

```ts
// web/src/i18n/routing.ts
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
```

```ts
// web/src/i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = locales.includes(await requestLocale as Locale)
    ? (await requestLocale) as Locale
    : defaultLocale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

Typed navigation helpers exported from a shared `web/src/i18n/navigation.ts` (`Link`, `redirect`, `usePathname`, `useRouter`) — these wrap next-intl's locale-aware equivalents so route changes preserve the active locale without callers threading locale manually.

### 3.3 Content layer

UI strings and structured content are separated:

**UI strings** (nav labels, CTA copy, section eyebrows, form labels, 404 text, locale-switcher labels): `messages/en.json` and `messages/es.json`. Namespaced. Accessed via `useTranslations(namespace)` (client) or `getTranslations({ locale, namespace })` (server).

**Structured content** (home, services, demos, about, how-we-work, case studies): parallel locale trees.

Existing `web/src/content/*.ts` files move unchanged into `web/src/content/en/`. Spanish mirrors with the same exported names (and only the string fields translated — slugs, `videoSrc` paths, `headlineMetric.value`, `relatedDemoSlugs`, service `slug`, and every other non-prose identifier stay identical) live under `web/src/content/es/`.

A tiny async loader selects the tree:

```ts
// web/src/content/get-content.ts
import type { Locale } from "@/i18n/routing";

export async function getContent(locale: Locale) {
  if (locale === "es") return await import("./es");
  return await import("./en");
}
```

Each locale index re-exports the same surface:

```ts
// web/src/content/en/index.ts
export { home } from "./home";
export { services, servicesOverview, serviceSlugs, serviceLabelBySlug } from "./services";
export { demos, demoCategories, getFeaturedDemos } from "./demos";
export { about } from "./about";
export { howWeWork } from "./how-we-work";
export {
  caseStudies,
  caseStudyIndustries,
  caseStudyServices,
  getCaseStudyBySlug,
} from "./case-studies";
// same file in es/ with identical export surface
```

The Spanish files start as copies of English with prose fields translated. Slugs stay English (`/es/services/custom-software` — the slug is still English because it's a URL segment; the displayed `title` and `tagline` are Spanish). This keeps URLs stable across locales and avoids hreflang complications.

### 3.4 Case study narratives

Spanish case studies have the same `slug`, `industry`, `engagementLength`, `clientDescriptor` (Spanish translation), `headlineOutcome` (Spanish), `headlineMetric` (label translated; `value` kept as "42%"/"$480K"/etc.), `cardSummary` (Spanish), `services`, `relatedDemoSlugs`, and `pullQuotes` translated. The four long narrative fields (`situation`, `whatWeBuilt`, `outcome`, `delivery`) stay as the English strings, and a banner `Banner` component renders at the top of `/es/case-studies/[slug]` announcing the English-only long-form status.

## 4. Components

### 4.1 `LocaleSwitcher`

Client component, in nav bar (desktop + mobile drawer).

- Renders two buttons: `EN`, `ES`, with `aria-pressed` reflecting the active locale.
- Group wrapper: `role="group"`, `aria-label` from `nav.languageGroupLabel` message.
- On click, calls `router.replace(pathname, { locale: nextLocale })` via next-intl's router, which preserves the current non-locale path.
- Sets a `NEXT_LOCALE` cookie (next-intl's middleware reads this on subsequent visits).
- Visually compact — pill with vertical divider between the two options.

### 4.2 `BilingualBanner`

Server component, rendered only at the top of `/es/case-studies/[slug]`. Simple yellow `bg-yellow-50 border-l-4 border-yellow-400 text-ink` box with the message from `caseStudies.spanishNarrativeNotice`. Not a generic component — single purpose, single file.

### 4.3 Updated nav bar

`web/src/components/layout/nav-bar.tsx` (existing) gets `LocaleSwitcher` appended on the desktop layout (right of the book-a-call CTA) and inside the mobile drawer (bottom).

## 5. SEO

- `<html lang={locale}>` on `[locale]/layout.tsx`.
- Per-locale metadata: every page exports `generateMetadata` that reads `getTranslations` to produce localized `title` + `description`.
- `<head>` alternate links for every page: next-intl's `getAlternates` (or manual via `metadata.alternates`) emits `hreflang` for both locales plus `x-default`.
- `web/src/app/sitemap.ts` (new) — generates a sitemap with every page × every locale.
- `web/src/app/robots.ts` (new or updated) — references the sitemap.

## 6. Middleware

```ts
// web/src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
export default createMiddleware(routing);
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

The matcher excludes `/api`, Next internal assets, and static files. Case-studies, demos, services, etc. all pass through for locale handling.

## 7. File inventory (additions, moves, modifications)

**New files:**
- `web/messages/en.json`
- `web/messages/es.json`
- `web/src/i18n/routing.ts`
- `web/src/i18n/request.ts`
- `web/src/i18n/navigation.ts`
- `web/src/middleware.ts`
- `web/src/content/get-content.ts`
- `web/src/content/en/index.ts` (re-exports)
- `web/src/content/es/index.ts` + `home.ts` + `services.ts` + `demos.ts` + `about.ts` + `how-we-work.ts` + `case-studies.ts`
- `web/src/components/layout/locale-switcher.tsx` + `.test.tsx`
- `web/src/components/layout/bilingual-banner.tsx` (no test — trivial)
- `web/src/app/sitemap.ts`
- `web/src/app/robots.ts`

**Moved:**
- Every file currently under `web/src/app/` except `favicon.ico`, `globals.css`, `layout.tsx`, and `not-found.tsx` moves into `web/src/app/[locale]/`. `not-found.tsx` moves in; `layout.tsx` and `globals.css` stay at `app/` root (see §3.1).

**Modified:**
- `web/src/app/layout.tsx` — minimal root: `<html>`/`<body>` with `globals.css`, font variable, skip link. No `<NavBar>`/`<Footer>` — those move to `[locale]/layout.tsx`.
- `web/src/app/[locale]/layout.tsx` (new, copied + adapted from old `layout.tsx`) — adds `<NextIntlClientProvider>`, `lang={locale}` attr on a nested fragment, includes `<NavBar>` and `<Footer>`, calls `setRequestLocale(locale)` for static rendering. Accepts `params: Promise<{ locale: string }>`.
- Every page under `[locale]/` — converted to `async` functions where needed, reads `params: Promise<{ locale: Locale; slug?: string }>`, awaits `params`, calls `setRequestLocale(locale)`, calls `getContent(locale)` instead of importing content directly.
- `web/src/components/layout/nav-bar.tsx` — imports + renders `LocaleSwitcher`; link labels now come from `useTranslations("nav")`.
- `web/src/components/layout/footer.tsx` — link labels from `useTranslations("footer")`.
- `web/src/components/sections/cta-section.tsx` — CTA button labels from translations if they currently come from `siteConfig`. (Verify during implementation; `siteConfig.cta.primary.label` is `"Book a call"` — may stay as siteConfig with the understanding that booking labels are brand-canonical and not translated, OR translate it. Decision: translate; both "Book a call" and "Solicita una llamada" should feel native.)
- `web/tests/e2e/smoke.spec.ts` — add locale-switcher coverage and Spanish route checks.

## 8. Translation reference (for implementation)

**Site-wide:**
- "Book a call" → "Solicita una llamada"
- "Request a proposal" → "Solicita una propuesta"
- "Contact us" → "Contáctanos"
- "Skip to content" → "Saltar al contenido"
- "Page not found" → "Página no encontrada"
- "Back to home" → "Volver al inicio"

**Nav:**
- Services → Servicios
- Case Studies → Casos de estudio
- Demos → Demos (kept)
- How we work → Cómo trabajamos
- About → Nosotros

**Section eyebrows / titles:** implementer translates each during the structured-content copy pass using the reference English strings as source of truth. Target tone: professional, business-operator register (tú not usted, but avoid slang). Match the terse register of the English copy — case study metric phrasing like "42% lower invoice processing cost" becomes "Reducción del 42% en el costo de procesamiento de facturas" (not more verbose).

**Language switcher strings:**
- `nav.languageGroupLabel` = "Language" / "Idioma"
- Switcher button labels: "EN" / "ES" (unchanged)

## 9. Testing

**Unit:**
- `locale` type guard accepts `"en"`/`"es"`, rejects unknown codes.
- `getContent("en")` / `getContent("es")` return objects with identical top-level keys (structural parity guard — prevents drift when new fields are added to English without Spanish counterparts).

**Component:**
- `LocaleSwitcher` — renders both buttons, marks active with `aria-pressed`, clicking ES calls `router.replace` with the new locale, group has `aria-label`.

**Page:**
- `[locale]/layout.tsx` smoke render (integration-style, through a test wrapper that feeds a mocked `NextIntlClientProvider`).

**E2E (new in `web/tests/e2e/smoke.spec.ts`):**
- Visit `/`, verify English chrome, click the Spanish switcher, land on `/es`, verify Spanish nav ("Servicios"), click back to EN, URL is `/`.
- Visit `/es/demos`, verify hero is Spanish, filter chips render, the demo card titles are Spanish.
- Visit `/es/case-studies/finance-invoice-automation`, assert the English-only banner is visible, card-style metadata is Spanish, and the long prose sections remain in English.
- Visit `/es/this-route-does-not-exist` → 404 in Spanish ("Página no encontrada").

## 10. Non-functional

- **SSG:** every `[locale]` page statically generated at build time for both `en` and `es` by calling `setRequestLocale(locale)` inside each server page. `generateStaticParams` at the layout level emits `locales.map(locale => ({ locale }))`.
- **Performance:** no runtime translation lookups above what next-intl already provides; messages are bundled per locale.
- **Accessibility:** switcher is a keyboard-navigable group; `aria-pressed` conveys state.
- **Privacy:** `NEXT_LOCALE` cookie is first-party, essential, not tracked externally — no cookie banner triggered.

## 11. Out of scope

- Spanish translations of case study narratives (Situation / Built / Outcome / Delivered prose).
- Locale for form validation messages (Plan 6 when forms ship).
- RTL / additional locales.
- Per-locale OG images.
- Auto-detection of browser language.
- Translating slug segments (URLs stay English-slugged across both locales).

## 12. Risks

- **File-move churn:** moving every page into `[locale]/` is a one-shot diff touching ~15 files. E2E coverage and `pnpm build` catch regressions, but reviewers should expect a large-but-mechanical diff.
- **`setRequestLocale` discipline:** forgetting to call it in a new page disables static generation. Plan tasks explicitly list the call in every page.
- **Content drift:** Spanish content tree can diverge over time. The structural-parity unit test catches missing keys but not semantic drift. Policy: both trees are authored in the same PR.

## 13. Open questions

None remaining. The three brainstorming questions (URL strategy, scope, placement/default) settled everything needed to plan.
