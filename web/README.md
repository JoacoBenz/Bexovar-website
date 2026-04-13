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
