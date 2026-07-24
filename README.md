# arturo-solo-web

Next.js 14 marketing site for [arturosolo.com](https://arturosolo.com) — Arturo Solo LLC, a founder-led AI build studio.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + Framer Motion
- **Supabase** — contact leads (server-mediated) and blog posts
- **Resend** — operator lead notifications
- **Upstash Redis** — contact form rate limiting
- **Vercel** — hosting (preview + production with isolated Supabase projects)

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in Supabase, Resend, and Upstash credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

## Environment variables

See `.env.example`. Use **separate Supabase projects** for Vercel Preview vs Production. Never expose `SUPABASE_SERVICE_ROLE_KEY` to client bundles.

## Deployment

Production hosting is on Vercel. DNS cutover and rollback steps are in `docs/runbooks/2026-07-06-vercel-cutover.md`. Production contact smoke (Supabase / Resend / Upstash) is in `docs/runbooks/2026-07-24-prod-contact-smoke.md`.

## Documentation

- `AGENTS.md` — architecture invariants for AI assistants and contributors
- `docs/plans/` — feature plans and requirements
- `docs/runbooks/` — cutover and production contact smoke
