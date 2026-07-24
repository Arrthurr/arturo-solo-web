# AGENTS.md

## Project Shape

This is a **Next.js 14 (App Router)** marketing site for Arturo Solo LLC, scaffolded from the Nuggets agency template. Positioning: founder-led AI build studio — "working AI, built into your business."

Homepage section IA (template-native remap):

```tsx
<Header />
<Hero />        {/* opening promise + bottleneck subhead */}
<Stats />       {/* hybrid proof */}
<Services />    {/* Workflow Assessment + Custom AI Build */}
<Process />     {/* reconstruct → compare → act on the decision */}
<WhyArturo />   {/* solo-founder block */}
<BlogTeaser />  {/* hidden when zero published posts */}
<Footer />
```

Contact lives at `/contact` with warm, low-friction tone. Do not reintroduce GSAP story-scroll or a Vite SPA architecture.

Important files:

- `app/page.tsx` — homepage composition
- `components/Hero.tsx`, `Services.tsx`, `Stats.tsx`, `Process.tsx`, `WhyArturo.tsx` — section copy and Framer Motion wrappers
- `components/ContactForm.tsx` + `app/contact/page.tsx` — visitor-facing contact UX
- `app/actions/submit-contact.ts` — server-mediated Supabase insert, honeypot, rate limit, Resend notification
- `lib/supabase/admin.ts` — `server-only` service-role client (never import from client components)
- `lib/supabase/server.ts` / `lib/supabase/client.ts` — `@supabase/ssr` split for blog reads
- `app/blog/` — Supabase-backed blog (dashboard publishing v1)
- `docs/runbooks/2026-07-06-vercel-cutover.md` — DNS cutover and rollback

## Content and Positioning Invariants

Preserve the hybrid proof model: public products, internal workflows, real client contexts, and AI tools in development. Do not imply unfinished products are finished portfolio items. Client logos in `Stats` are subordinate proof — not a generic "trusted by" strip.

Services exposes **Workflow Assessment** and **Custom AI Build** only. Keep the stable
contact service value `ai-jumpstart` as the internal identifier for Workflow Assessment.

Why Arturo is a visible solo-founder block — not a multi-person grid.

Tonal boundary:

- Homepage sections can be blunt and kinetic (Framer Motion).
- Contact should be warmer, practical, and low-friction.

## Animation Architecture

Framer Motion is scoped to Nuggets section components. Every motion wrapper must respect `prefers-reduced-motion: reduce` — use `usePrefersReducedMotion()` from `lib/motion.ts`.

Do **not** port GSAP story-scroll.

## Supabase and Contact Rules

Contact writes use a `'use server'` action with the admin client (`SUPABASE_SERVICE_ROLE_KEY`). Never use anon-key client inserts for leads.

Form contract:

- Fields: `name`, `email`, `company`, `service`, `message`
- Service values: `ai-jumpstart`, `custom-ai-build`, `not-sure`
- Honeypot: `website` — silent redirect to `/success`, no DB row
- Rate limit: 5 submissions/IP/hour via Upstash (when configured)
- Success: redirect to `/success` with warm confirmation copy

RLS on `contact_leads`: enabled, no anon/authenticated policies. Blog `posts`: public SELECT where `status = 'published'`.

Separate Supabase projects for Vercel preview vs production.

## Accessibility Rules

Mobile menu toggle must expose `aria-expanded` and `aria-controls` pointing at the mobile nav panel id.

Placeholder links (`href="#"`) are not acceptable in production navigation or footer.

## Deployment

- **Production:** Vercel with env-scoped Supabase, Resend, Upstash credentials.
- **Domain:** arturosolo.com (DNS cutover per runbook).
- **CI:** `.github/workflows/ci.yml` on `main`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Playwright uses Next.js on `127.0.0.1:3000` (`next dev` locally; `next start` in CI after build).

## Cursor Cloud specific instructions

Node 20+ is required (repo tested on Node 22). Standard commands are in `## Verification` above and `package.json` scripts.

- A `.env.local` is required for `dev`/`build`/`test:e2e` because `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be defined. It is gitignored, so it does not persist across fresh VMs — recreate it with placeholder values (same ones CI uses: `https://placeholder.supabase.co` and `placeholder-anon-key`). All pages, unit tests, and Playwright e2e pass with only these placeholders.
- The site runs and renders fully on placeholders. Real credentials are only needed to actually persist data: submitting the `/contact` form without a real `SUPABASE_SERVICE_ROLE_KEY` reaches the server action, fails the insert, and shows the graceful banner "Something went wrong. Please try again..." — this is expected, not an environment defect. Resend (`RESEND_API_KEY`) and Upstash rate limiting are also inert without their credentials.
- Playwright locally reuses an already-running dev server on `127.0.0.1:3000`; if one is running, `npm run test:e2e` will attach to it instead of spawning its own.
