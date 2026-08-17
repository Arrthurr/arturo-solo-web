# arturo-solo-web

Next.js 14 marketing site for [arturosolo.com](https://arturosolo.com). Arturo Solo LLC sells one public offer: a $1,500, seven-business-day Workflow Assessment that ends in a decision, not a build.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS and Framer Motion
- Supabase for contact leads (server-mediated) and published blog posts
- Resend for operator lead notifications
- Upstash Redis for contact form rate limiting
- Vercel for preview and production, each with its own Supabase project

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in Supabase, Resend, and Upstash credentials, or keep the
# NEXT_PUBLIC_SUPABASE_* placeholders used by CI.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Pages, unit tests, and Playwright e2e run with only `NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co` and `NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key`. Real `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and Upstash values are required only to persist a lead or send the operator email. Without them, `/contact` still reaches the server action and shows the graceful error banner.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E smoke tests (Playwright) |

Playwright talks to Next.js on `127.0.0.1:3000`. Locally it reuses a running `next dev` if one is already up. CI builds first, then runs `next start`.

## Environment variables

See `.env.example`. Use separate Supabase projects for Vercel Preview vs Production. Never expose `SUPABASE_SERVICE_ROLE_KEY` to client bundles.

## Routes

| Path | Role |
|------|------|
| `/` | Homepage |
| `/contact` | Lead form |
| `/success` | Post-submit confirmation |
| `/blog` | Published posts, or an empty-state page |
| `/blog/[slug]` | Single published post |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `/customers` | Redirects to `/#team` |

There is no in-app blog admin. Publish by inserting a `posts` row in the Supabase Table Editor with `status = 'published'`.

## Deployment

Production is live on Vercel at arturosolo.com. CI on `main` (and PRs to `main`) runs lint, typecheck, unit tests, build, and Playwright.

After a contact-path or credential change, use `docs/runbooks/2026-07-24-prod-contact-smoke.md`. The July 2026 DNS cutover is done. `docs/runbooks/2026-07-06-vercel-cutover.md` is the historical record, not a pending task.

## Documentation

- `STRATEGY.md` current product strategy and public-offer rules
- `AGENTS.md` architecture invariants for AI assistants and contributors
- `docs/asllc-story-arcs.md` owner-approved client facts used in homepage Stats
- `docs/runbooks/` production contact smoke and the completed Vercel cutover record
- `docs/plans/` and the ASLLC playbooks are historical or internal delivery notes. They still mention AI Jumpstart, Custom AI Build as a public SKU, and the Vite site. Do not treat them as the live spec.
