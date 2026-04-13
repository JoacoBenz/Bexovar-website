# Plan 1 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 15 + TypeScript + Tailwind site with design tokens, core primitive components, shared layout (NavBar + Footer), test harness, and a Vercel preview deploy — producing an "empty shell" site that later plans fill in.

**Architecture:** Next.js App Router app in a `web/` subfolder of the existing repo (keeps the legacy static HTML untouched until cutover). Tailwind configured from the spec's design tokens. `shadcn/ui` components as base primitives. Vitest for unit/component tests, Playwright for E2E. Signature `OrbitalGraphic` component ported from the legacy site and restyled for the light theme, with `prefers-reduced-motion` respected.

**Tech Stack:** Next.js 15, TypeScript 5, Tailwind CSS 3, `shadcn/ui`, Vitest, React Testing Library, Playwright, pnpm, Vercel.

---

## File Structure

```
web/
  package.json
  pnpm-lock.yaml
  tsconfig.json
  next.config.mjs
  tailwind.config.ts
  postcss.config.mjs
  vitest.config.ts
  playwright.config.ts
  .eslintrc.json
  .gitignore
  .env.example
  README.md
  src/
    app/
      layout.tsx              # root layout: fonts, NavBar, Footer, metadata defaults
      page.tsx                # placeholder home showcasing primitives
      globals.css             # Tailwind base + CSS vars for tokens
    components/
      ui/
        button.tsx            # Button primitive (variant/size)
        button.test.tsx
        card.tsx              # Card primitive
        card.test.tsx
      layout/
        nav-bar.tsx
        nav-bar.test.tsx
        footer.tsx
        footer.test.tsx
        container.tsx         # max-width wrapper
      sections/
        section-header.tsx    # eyebrow + title + subtitle
        section-header.test.tsx
        cta-section.tsx       # reusable CTA band
        cta-section.test.tsx
      graphics/
        orbital-graphic.tsx   # light-theme restyle, reduced-motion aware
        orbital-graphic.test.tsx
    lib/
      cn.ts                   # classnames util (clsx + tailwind-merge)
      site-config.ts          # site metadata, nav links, footer links
    styles/
      tokens.css              # CSS custom properties for colors/radii/shadows
  tests/
    e2e/
      smoke.spec.ts           # homepage loads, nav renders, footer renders
  public/
    favicon.svg               # copied from legacy site
```

**Responsibility boundaries:**
- `app/` — routing + top-level page composition only.
- `components/ui/` — styled primitives with zero business logic.
- `components/layout/` — site chrome (nav, footer, container).
- `components/sections/` — reusable section patterns used across pages.
- `components/graphics/` — visual/decorative components.
- `lib/` — pure utilities and static config.
- `styles/` — global CSS only (tokens, resets).

---

## Prerequisites

- Node 20+ installed
- pnpm installed (`npm i -g pnpm`)
- Git repo initialized at `D:/Bexovar/bexovar-website` (already done)
- Vercel account (free tier fine)

All commands below assume cwd = `D:/Bexovar/bexovar-website` unless stated.

---

## Task 1: Scaffold Next.js project in `web/` subfolder

**Files:**
- Create: `web/` (entire Next.js scaffold)

- [ ] **Step 1: Run the Next.js scaffolder**

Run:
```bash
pnpm create next-app@latest web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-pnpm
```

Expected: scaffold completes; `web/` folder exists with `package.json`, `src/app/`, `tailwind.config.ts`.

- [ ] **Step 2: Verify dev server runs**

Run:
```bash
cd web && pnpm dev
```

Expected: server starts on http://localhost:3000, default Next.js page renders. Ctrl+C to stop.

- [ ] **Step 3: Commit**

```bash
cd ..
git add web/
git commit -m "chore(web): scaffold Next.js 15 + TS + Tailwind app in web/"
```

---

## Task 2: Pin dependency versions and add utility deps

**Files:**
- Modify: `web/package.json`

- [ ] **Step 1: Install runtime deps**

```bash
cd web && pnpm add clsx tailwind-merge class-variance-authority
```

- [ ] **Step 2: Install dev deps**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom @types/node @playwright/test
```

- [ ] **Step 3: Verify package.json contents**

Open `web/package.json`. Confirm `dependencies` contains `next`, `react`, `react-dom`, `clsx`, `tailwind-merge`, `class-variance-authority`. `devDependencies` contains `typescript`, `tailwindcss`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`.

- [ ] **Step 4: Commit**

```bash
cd ..
git add web/package.json web/pnpm-lock.yaml
git commit -m "chore(web): add cva/clsx/testing deps"
```

---

## Task 3: Configure design tokens (colors, fonts, spacing)

**Files:**
- Modify: `web/tailwind.config.ts`
- Create: `web/src/styles/tokens.css`
- Modify: `web/src/app/globals.css`
- Modify: `web/src/app/layout.tsx`

- [ ] **Step 1: Replace `web/tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: { DEFAULT: "#ffffff", alt: "#f8fafc" },
        ink: { DEFAULT: "#0f172a", muted: "#475569", subtle: "#64748b" },
        accent: { DEFAULT: "#0284c7", hover: "#0369a1", soft: "#e0f2fe" },
        metric: "#059669",
        border: "#e2e8f0",
        dark: { bg: "#0f172a", ink: "#f8fafc", muted: "#cbd5e1" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", fontWeight: "700" }],
        h2: ["clamp(2rem, 3.5vw, 2.5rem)", { lineHeight: "1.15", fontWeight: "600" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "600" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.15em", fontWeight: "600" }],
      },
      borderRadius: { md: "6px", lg: "8px", "2xl": "16px" },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(15 23 42 / 0.04)",
        lg: "0 10px 30px -10px rgb(15 23 42 / 0.15)",
      },
      transitionDuration: { DEFAULT: "150ms" },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Create `web/src/styles/tokens.css`**

```css
:root {
  --section-py: 5rem;
}
@media (min-width: 768px) { :root { --section-py: 7rem; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Replace `web/src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "../styles/tokens.css";

html { scroll-behavior: smooth; }
body { @apply bg-bg text-ink font-sans antialiased; }
h1, h2, h3, h4 { @apply text-ink; }
p { @apply text-ink-muted; }
a { @apply text-accent hover:text-accent-hover; }

:focus-visible { outline: 2px solid theme("colors.accent.DEFAULT"); outline-offset: 2px; }
```

- [ ] **Step 4: Wire Inter font via `next/font` in `web/src/app/layout.tsx`**

Replace the file contents:
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Bexovar", template: "%s | Bexovar" },
  description: "Custom software and process automation for mid-market operators.",
  metadataBase: new URL("https://bexovar.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Run dev server to verify compile**

```bash
cd web && pnpm dev
```

Expected: compiles without errors, page renders with Inter font applied. Ctrl+C.

- [ ] **Step 6: Commit**

```bash
cd ..
git add web/tailwind.config.ts web/src/styles/tokens.css web/src/app/globals.css web/src/app/layout.tsx
git commit -m "feat(web): configure design tokens and Inter font"
```

---

## Task 4: Set up Vitest test harness

**Files:**
- Create: `web/vitest.config.ts`
- Create: `web/src/test/setup.ts`
- Modify: `web/package.json` (scripts)
- Modify: `web/tsconfig.json` (include vitest globals)

- [ ] **Step 1: Create `web/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

- [ ] **Step 2: Create `web/src/test/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add test scripts to `web/package.json`**

In the `scripts` object add:
```json
"test": "vitest run",
"test:watch": "vitest",
"e2e": "playwright test"
```

- [ ] **Step 4: Update `web/tsconfig.json` `compilerOptions.types`**

Add `"vitest/globals"` to the `types` array (create the array if it does not exist):
```json
"types": ["vitest/globals"]
```

- [ ] **Step 5: Write smoke test `web/src/test/smoke.test.ts`**

```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run tests**

```bash
cd web && pnpm test
```

Expected: 1 test passes.

- [ ] **Step 7: Commit**

```bash
cd ..
git add web/vitest.config.ts web/src/test/setup.ts web/src/test/smoke.test.ts web/package.json web/tsconfig.json
git commit -m "chore(web): set up Vitest + testing-library harness"
```

---

## Task 5: Add `cn` classname utility

**Files:**
- Create: `web/src/lib/cn.ts`
- Create: `web/src/lib/cn.test.ts`

- [ ] **Step 1: Write failing test `web/src/lib/cn.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges classes and dedupes conflicting Tailwind utilities", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
  it("filters falsy values", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/lib/cn.test.ts
```

Expected: FAIL — module `./cn` not found.

- [ ] **Step 3: Write `web/src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/lib/cn.test.ts
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/lib/cn.ts web/src/lib/cn.test.ts
git commit -m "feat(web): add cn classname utility"
```

---

## Task 6: Site config (nav + footer links, brand)

**Files:**
- Create: `web/src/lib/site-config.ts`

- [ ] **Step 1: Create `web/src/lib/site-config.ts`**

```ts
export const siteConfig = {
  name: "Bexovar",
  tagline: "Custom software & process automation",
  domain: "bexovar.io",
  email: "hello@bexovar.io",
  linkedin: "https://www.linkedin.com/company/bexovar",
  nav: [
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/demos", label: "Demos" },
    { href: "/how-we-work", label: "How we work" },
    { href: "/about", label: "About" },
  ],
  footer: {
    services: [
      { href: "/services/custom-software", label: "Custom Software" },
      { href: "/services/rpa-agents", label: "RPA & Agents" },
      { href: "/services/integrations", label: "Systems Integration" },
      { href: "/services/consulting", label: "Process Consulting" },
    ],
    company: [
      { href: "/about", label: "About" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  cta: {
    primary: { href: "/book", label: "Book a call" },
    secondary: { href: "/proposal", label: "Request a proposal" },
    tertiary: { href: "/contact", label: "Contact us" },
  },
} as const;

export type NavLink = { href: string; label: string };
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add web/src/lib/site-config.ts
git commit -m "feat(web): add site-config"
```

---

## Task 7: Button primitive

**Files:**
- Create: `web/src/components/ui/button.tsx`
- Create: `web/src/components/ui/button.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });
  it("applies primary variant by default", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-accent");
  });
  it("applies secondary variant when specified", () => {
    render(<Button variant="secondary">Go</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-border");
  });
  it("renders as anchor when href is provided", () => {
    render(<Button href="/book">Book</Button>);
    const link = screen.getByRole("link", { name: "Book" });
    expect(link).toHaveAttribute("href", "/book");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/ui/button.test.tsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement `web/src/components/ui/button.tsx`**

```tsx
import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent-hover",
        secondary: "bg-white text-ink border border-border hover:bg-bg-alt",
        ghost: "bg-transparent text-ink hover:bg-bg-alt",
      },
      size: {
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-6 py-3",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsAnchor = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }
  const { href: _h, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonAsButton & { href?: undefined };
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test src/components/ui/button.test.tsx
```

Expected: 4 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/ui/button.tsx web/src/components/ui/button.test.tsx
git commit -m "feat(web): add Button primitive"
```

---

## Task 8: Card primitive

**Files:**
- Create: `web/src/components/ui/card.tsx`
- Create: `web/src/components/ui/card.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>hello</p></Card>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
  it("applies base card classes", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass("rounded-lg");
    expect(container.firstChild).toHaveClass("border");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/ui/card.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/ui/card.tsx`**

```tsx
import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm test src/components/ui/card.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/ui/card.tsx web/src/components/ui/card.test.tsx
git commit -m "feat(web): add Card primitive"
```

---

## Task 9: Container layout helper

**Files:**
- Create: `web/src/components/layout/container.tsx`

- [ ] **Step 1: Implement `web/src/components/layout/container.tsx`**

```tsx
import * as React from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4 md:px-8", className)} {...rest}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add web/src/components/layout/container.tsx
git commit -m "feat(web): add Container layout helper"
```

---

## Task 10: SectionHeader component

**Files:**
- Create: `web/src/components/sections/section-header.tsx`
- Create: `web/src/components/sections/section-header.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "./section-header";

describe("SectionHeader", () => {
  it("renders eyebrow, title, subtitle", () => {
    render(<SectionHeader eyebrow="PROOF" title="Real outcomes" subtitle="Names withheld." />);
    expect(screen.getByText("PROOF")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Real outcomes" })).toBeInTheDocument();
    expect(screen.getByText("Names withheld.")).toBeInTheDocument();
  });
  it("omits eyebrow when not provided", () => {
    render(<SectionHeader title="T" />);
    expect(screen.queryByText(/PROOF/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/sections/section-header.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/sections/section-header.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-eyebrow uppercase text-accent mb-3">{eyebrow}</p>
      )}
      <h2 className="text-h2 text-ink">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-muted max-w-2xl">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/components/sections/section-header.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/section-header.tsx web/src/components/sections/section-header.test.tsx
git commit -m "feat(web): add SectionHeader"
```

---

## Task 11: CTASection component

**Files:**
- Create: `web/src/components/sections/cta-section.tsx`
- Create: `web/src/components/sections/cta-section.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders heading and primary CTA link", () => {
    render(
      <CTASection
        heading="Ready?"
        primary={{ href: "/book", label: "Book a call" }}
      />
    );
    expect(screen.getByRole("heading", { name: "Ready?" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Book a call" });
    expect(link).toHaveAttribute("href", "/book");
  });
  it("renders optional secondary CTA", () => {
    render(
      <CTASection
        heading="h"
        primary={{ href: "/a", label: "A" }}
        secondary={{ href: "/b", label: "B" }}
      />
    );
    expect(screen.getByRole("link", { name: "B" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/sections/cta-section.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/sections/cta-section.tsx`**

```tsx
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

type CTA = { href: string; label: string };

export function CTASection({
  heading,
  subtitle,
  primary,
  secondary,
  tone = "dark",
  className,
}: {
  heading: string;
  subtitle?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "py-20 md:py-28",
        dark ? "bg-dark-bg text-dark-ink" : "bg-bg-alt text-ink",
        className
      )}
    >
      <Container className="text-center max-w-3xl">
        <h2 className={cn("text-h2", dark ? "text-dark-ink" : "text-ink")}>
          {heading}
        </h2>
        {subtitle && (
          <p className={cn("mt-4 text-lg", dark ? "text-dark-muted" : "text-ink-muted")}>
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} size="lg">{primary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/components/sections/cta-section.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/sections/cta-section.tsx web/src/components/sections/cta-section.test.tsx
git commit -m "feat(web): add CTASection"
```

---

## Task 12: NavBar component

**Files:**
- Create: `web/src/components/layout/nav-bar.tsx`
- Create: `web/src/components/layout/nav-bar.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBar } from "./nav-bar";

describe("NavBar", () => {
  it("renders the brand link to home", () => {
    render(<NavBar />);
    const brand = screen.getByRole("link", { name: /bexovar/i });
    expect(brand).toHaveAttribute("href", "/");
  });
  it("renders all configured nav links", () => {
    render(<NavBar />);
    for (const label of ["Services", "Case Studies", "Demos", "How we work", "About"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });
  it("renders a book-a-call CTA", () => {
    render(<NavBar />);
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/layout/nav-bar.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/layout/nav-bar.tsx`**

```tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { cn } from "@/lib/cn";

export function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-ink">
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={siteConfig.cta.primary.href} size="sm">
            {siteConfig.cta.primary.label}
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </Container>

      <div
        className={cn(
          "md:hidden border-t border-border bg-white",
          open ? "block" : "hidden"
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {siteConfig.nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href={siteConfig.cta.primary.href} size="md" className="w-full">
            {siteConfig.cta.primary.label}
          </Button>
        </Container>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/components/layout/nav-bar.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/layout/nav-bar.tsx web/src/components/layout/nav-bar.test.tsx
git commit -m "feat(web): add NavBar with mobile drawer"
```

---

## Task 13: Footer component

**Files:**
- Create: `web/src/components/layout/footer.tsx`
- Create: `web/src/components/layout/footer.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders Services links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Custom Software" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "RPA & Agents" })).toBeInTheDocument();
  });
  it("renders email contact link", () => {
    render(<Footer />);
    const emailLink = screen.getByRole("link", { name: /hello@bexovar\.io/i });
    expect(emailLink).toHaveAttribute("href", "mailto:hello@bexovar.io");
  });
  it("renders the Book a call CTA", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /book a call/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/layout/footer.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/layout/footer.tsx`**

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="bg-bg-alt border-t border-border">
      <Container className="py-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">Services</h3>
          <ul className="space-y-2">
            {siteConfig.footer.services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">Company</h3>
          <ul className="space-y-2">
            {siteConfig.footer.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">Ready to talk?</h3>
          <p className="text-sm text-ink-muted mb-4">
            30-min call. See a live demo on your workflow.
          </p>
          <Button href={siteConfig.cta.primary.href} size="md">
            {siteConfig.cta.primary.label}
          </Button>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-subtle">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <div className="flex items-center gap-6">
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <Link href="/privacy">Privacy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/components/layout/footer.test.tsx
```

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/layout/footer.tsx web/src/components/layout/footer.test.tsx
git commit -m "feat(web): add Footer"
```

---

## Task 14: OrbitalGraphic component (light-theme, reduced-motion)

**Files:**
- Create: `web/src/components/graphics/orbital-graphic.tsx`
- Create: `web/src/components/graphics/orbital-graphic.test.tsx`

- [ ] **Step 1: Write failing test**

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { OrbitalGraphic } from "./orbital-graphic";

describe("OrbitalGraphic", () => {
  it("renders with an aria role of presentation", () => {
    const { container } = render(<OrbitalGraphic />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute("role", "presentation");
    expect(root).toHaveAttribute("aria-hidden", "true");
  });
  it("renders three orbit rings", () => {
    const { container } = render(<OrbitalGraphic />);
    expect(container.querySelectorAll("[data-orbit-ring]")).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd web && pnpm test src/components/graphics/orbital-graphic.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `web/src/components/graphics/orbital-graphic.tsx`**

```tsx
import { cn } from "@/lib/cn";

export function OrbitalGraphic({ className }: { className?: string }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn("relative w-[320px] h-[320px] mx-auto", className)}
    >
      <div
        data-orbit-ring
        className="absolute inset-0 rounded-full border border-accent/30 animate-[spin_18s_linear_infinite]"
      />
      <div
        data-orbit-ring
        className="absolute inset-8 rounded-full border border-accent/25 animate-[spin_12s_linear_infinite_reverse]"
      />
      <div
        data-orbit-ring
        className="absolute inset-16 rounded-full border border-accent/20 animate-[spin_8s_linear_infinite]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-hover shadow-lg opacity-80" />
      </div>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(2,132,199,0.6)]" />
      <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-accent/80" />
      <div className="absolute top-1/2 left-4 w-2.5 h-2.5 rounded-full bg-accent/70" />
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify pass**

```bash
pnpm test src/components/graphics/orbital-graphic.test.tsx
```

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/components/graphics/orbital-graphic.tsx web/src/components/graphics/orbital-graphic.test.tsx
git commit -m "feat(web): add OrbitalGraphic (reduced-motion aware via tokens.css)"
```

> Note: `prefers-reduced-motion` is handled globally in `src/styles/tokens.css` (Task 3, Step 2) — animations pause automatically.

---

## Task 15: Root layout wires NavBar + Footer

**Files:**
- Modify: `web/src/app/layout.tsx`

- [ ] **Step 1: Update `web/src/app/layout.tsx`**

Replace the `RootLayout` function body (keep imports from Task 3 and add the two new ones):

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/layout/nav-bar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Bexovar", template: "%s | Bexovar" },
  description: "Custom software and process automation for mid-market operators.",
  metadataBase: new URL("https://bexovar.io"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-ink focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd ..
git add web/src/app/layout.tsx
git commit -m "feat(web): wire NavBar and Footer into root layout with skip link"
```

---

## Task 16: Placeholder homepage showcasing primitives

**Files:**
- Modify: `web/src/app/page.tsx`

- [ ] **Step 1: Replace `web/src/app/page.tsx` contents**

```tsx
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase text-accent mb-4">Foundation preview</p>
            <h1 className="text-display text-ink">
              Bexovar site foundation
            </h1>
            <p className="mt-6 text-lg text-ink-muted max-w-xl">
              This page is a placeholder exercising the design system and shared components.
              Real homepage content lands in Plan 2.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={siteConfig.cta.primary.href} size="lg">Book a call</Button>
              <Button href="#" variant="secondary" size="lg">Secondary action</Button>
            </div>
          </div>
          <OrbitalGraphic />
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Primitives"
            title="Cards render like this"
            subtitle="Verifying the Card primitive with hover elevation."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card><h3 className="text-h3">Custom Software</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
            <Card><h3 className="text-h3">RPA & Agents</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
            <Card><h3 className="text-h3">Integrations</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to see what this looks like on your workflow?"
        subtitle="30-min call. We'll show you a live demo built around your actual process."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
```

- [ ] **Step 2: Copy favicon from legacy site**

```bash
cp favicon.svg web/public/favicon.svg
```

- [ ] **Step 3: Run dev server to verify end-to-end**

```bash
cd web && pnpm dev
```

Expected: http://localhost:3000 shows NavBar, hero with orbital graphic, 3 cards, dark CTA band, Footer. Ctrl+C.

- [ ] **Step 4: Run full test suite**

```bash
pnpm test
```

Expected: all tests pass (approx. 17 tests across suites).

- [ ] **Step 5: Commit**

```bash
cd ..
git add web/src/app/page.tsx web/public/favicon.svg
git commit -m "feat(web): placeholder homepage showcasing primitives"
```

---

## Task 17: Playwright E2E smoke test

**Files:**
- Create: `web/playwright.config.ts`
- Create: `web/tests/e2e/smoke.spec.ts`
- Modify: `web/.gitignore`

- [ ] **Step 1: Install Playwright browsers**

```bash
cd web && pnpm exec playwright install --with-deps chromium
```

Expected: Chromium installs.

- [ ] **Step 2: Create `web/playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
```

- [ ] **Step 3: Create `web/tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("homepage renders nav, hero, cards, footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Bexovar" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /foundation/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /book a call/i }).first()).toBeVisible();
  await expect(page.getByText(/© \d{4} Bexovar/)).toBeVisible();
});

test("skip link works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to content/i });
  await expect(skip).toBeFocused();
});
```

- [ ] **Step 4: Append Playwright outputs to `web/.gitignore`**

Append:
```
# playwright
/test-results/
/playwright-report/
/playwright/.cache/
```

- [ ] **Step 5: Run E2E tests**

```bash
pnpm e2e
```

Expected: 2 tests pass (Playwright starts dev server and drives Chromium).

- [ ] **Step 6: Commit**

```bash
cd ..
git add web/playwright.config.ts web/tests/e2e/smoke.spec.ts web/.gitignore
git commit -m "test(web): Playwright smoke E2E for homepage shell"
```

---

## Task 18: CI workflow for lint + unit + E2E

**Files:**
- Create: `.github/workflows/web-ci.yml`

- [ ] **Step 1: Create `.github/workflows/web-ci.yml`**

```yaml
name: web-ci
on:
  push:
    branches: [main]
    paths: ["web/**", ".github/workflows/web-ci.yml"]
  pull_request:
    paths: ["web/**", ".github/workflows/web-ci.yml"]
jobs:
  build-test:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: web } }
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm, cache-dependency-path: web/pnpm-lock.yaml }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm build
      - run: pnpm e2e
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/web-ci.yml
git commit -m "ci: lint, unit, build, and E2E for web/"
```

---

## Task 19: Vercel deploy configuration

**Files:**
- Create: `web/vercel.json`
- Create: `web/.env.example`
- Create: `web/README.md`

- [ ] **Step 1: Create `web/vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install --frozen-lockfile",
  "devCommand": "pnpm dev"
}
```

- [ ] **Step 2: Create `web/.env.example`**

```env
# Empty in Plan 1. Plan 4 will add RESEND_API_KEY, TURNSTILE_SECRET_KEY, etc.
```

- [ ] **Step 3: Create `web/README.md`**

```markdown
# Bexovar website (Next.js)

## Develop

    pnpm install
    pnpm dev

Visit http://localhost:3000.

## Test

    pnpm test         # unit + component (Vitest)
    pnpm e2e          # Playwright E2E
    pnpm lint
    pnpm build

## Deploy

Deployed via Vercel. The project root is `web/`. Set Vercel "Root Directory" = `web` and framework = Next.js.
```

- [ ] **Step 4: Import project in Vercel dashboard (manual)**

- Go to vercel.com → New Project → Import the `bexovar-website` repo.
- Set Root Directory to `web`.
- Framework preset: Next.js (auto-detected).
- Click Deploy.
- Expected: preview URL returned and deploys succeed.

- [ ] **Step 5: Verify preview URL renders homepage**

Open the Vercel-provided URL. Expected: same placeholder homepage as local dev.

- [ ] **Step 6: Commit**

```bash
git add web/vercel.json web/.env.example web/README.md
git commit -m "chore(web): add Vercel config and README"
```

---

## Task 20: Final green-build verification and plan close-out

**Files:** (none new)

- [ ] **Step 1: From repo root, run all checks**

```bash
cd web && pnpm lint && pnpm test && pnpm build && pnpm e2e
```

Expected: all four commands exit 0.

- [ ] **Step 2: Verify file tree matches "File Structure" section at top of this plan**

Manually scan `web/src/` against the layout. Any deviations → resolve before declaring Plan 1 complete.

- [ ] **Step 3: Tag the foundation milestone**

```bash
cd ..
git tag -a plan-1-foundation -m "Foundation: scaffold, tokens, primitives, layout, CI, Vercel"
```

- [ ] **Step 4: Confirm Vercel preview URL is live and rendering correctly.**

Plan 1 is complete when:
- All Vitest tests pass (`pnpm test`)
- Playwright E2E passes (`pnpm e2e`)
- `pnpm build` succeeds
- Vercel preview URL renders the placeholder homepage with NavBar, hero, cards, CTA band, and Footer

---

## Self-Review Checklist (executed during plan authoring)

**Spec coverage (Plan 1 scope):**
- ✅ Next.js 15 + App Router + TS + Tailwind scaffold → Task 1
- ✅ Design tokens (colors, fonts, spacing, radii, shadows, motion) → Task 3
- ✅ `shadcn/ui`-style primitives (Button, Card) → Tasks 7, 8
- ✅ Shared layout (NavBar with mobile drawer, Footer, Container) → Tasks 9, 12, 13, 15
- ✅ Section primitives (SectionHeader, CTASection) → Tasks 10, 11
- ✅ OrbitalGraphic light-theme with reduced-motion → Task 14 + Task 3 Step 2
- ✅ Skip-to-content accessibility primitive → Task 15
- ✅ Vitest + Testing Library → Task 4
- ✅ Playwright E2E → Task 17
- ✅ CI (lint, unit, build, E2E) → Task 18
- ✅ Vercel preview deploy → Task 19

**Deferred to later plans (confirmed out of scope for Plan 1):**
- Homepage real content + remaining pages → Plan 2
- MDX pipeline, case studies, demos → Plan 3
- Forms, booking, Resend, Turnstile → Plan 4
- Full SEO metadata, JSON-LD, sitemap, analytics, Lighthouse CI, 301s → Plan 5

**Type consistency:** `siteConfig` shape in Task 6 is consumed by NavBar (Task 12), Footer (Task 13), homepage (Task 16), and CTASection via `siteConfig.cta.primary` — all references match. `Button` props (`href`, `variant`, `size`) are consistent across all consumers.

**Placeholder scan:** none of the "TBD / TODO / implement later / add appropriate X" anti-patterns appear. Every code step contains full code; every command step states expected output.
