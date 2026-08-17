# AGENTS.md

## Project shape

This is a Next.js 14 (App Router) marketing site for Arturo Solo LLC. Positioning is a founder-led workflow and systems studio. The public offer is one SKU, Workflow Assessment. Implementation after a decision is a new conversation, not a second product.

Product strategy lives in `STRATEGY.md`. When July 2026 plans, playbooks, or the cutover runbook disagree with `STRATEGY.md` or this file, follow the live files. Those older docs still describe a two-SKU site, an AI Jumpstart name, a Process section, and a Vite/Netlify cutover that already happened.

## Homepage

```tsx
<Header />
<Hero />        {/* reconstruct → find the constraint → act on the decision */}
<Services />    {/* Workflow Assessment only */}
<Stats />       {/* teaching-proof client stories, not a trusted-by strip */}
<WhyArturo />   {/* solo-founder block, id="team" */}
<BlogTeaser />  {/* hidden when zero published posts */}
<Footer />
```

There is no Process section and no public Custom AI Build card. Do not add either back.

Nav is Services (`#services`), About (`#team`), and Blog, plus a contact CTA. Contact lives at `/contact` with a warmer, lower-friction tone than the homepage.

## Routes

- `/` homepage
- `/contact` lead form
- `/success` post-submit confirmation
- `/blog` published index, or "Posts coming soon" when empty
- `/blog/[slug]` published post
- `/privacy-policy` and `/terms-of-service`
- `/customers` leftover template route. It redirects to `/#team`. Do not rebuild it as a portfolio page.

## Important files

- `app/page.tsx` homepage composition
- `components/Hero.tsx`, `Services.tsx`, `Stats.tsx`, `WhyArturo.tsx` section copy and Framer Motion wrappers
- `docs/asllc-story-arcs.md` owner-approved Stats facts. Copy may be polished. Facts should not drift.
- `components/ContactForm.tsx` and `app/contact/page.tsx` visitor-facing contact UX
- `app/actions/submit-contact.ts` server-mediated Supabase insert, honeypot, rate limit, Resend notification
- `lib/contact-service-labels.ts` visitor labels vs legacy `custom-ai-build`
- `lib/supabase/admin.ts` `server-only` service-role client. Never import from client components.
- `lib/supabase/server.ts` and `lib/supabase/client.ts` `@supabase/ssr` split for blog reads
- `app/blog/` public blog reads. No `/admin` route. Publish in the Supabase Table Editor.
- `supabase/migrations/` `contact_leads` and `posts` schema
- `docs/runbooks/2026-07-24-prod-contact-smoke.md` live contact smoke after credential or lead-path changes

## Content and positioning

Preserve the hybrid proof model: public products, internal workflows, real client contexts, and AI tools in development. Do not imply unfinished products are finished portfolio items.

`Stats` teaches decide-before-build with named client stories (DMDL, Joy for Books). Status stays maturity-honest (beta, in development). Logos sit inside those stories. They are not a generic trusted-by strip. Do not revive HG Jones Associates or Texas Head Start Association on the site.

Services exposes **Workflow Assessment** only. Keep the stable contact service value `ai-jumpstart` as the internal identifier.

Public messaging invariants (see `STRATEGY.md`):

- The public offer is one SKU: **$1,500** fixed, **seven business days**, **one consequential workflow**, six named decision paths (Simplify · Buy · Automate · Build · Investigate · Defer), and an Implementation Brief.
- The seven-business-day clock starts after payment and kickoff, with the decision owner, workflow lead, and agreed materials in place.
- Assessment sells a decision path, not a prototype or production build. The fee is not a deposit on a future build.
- Custom AI Build is not a public SKU, CTA, or second engagement. Implement capability lives only in Why Arturo: he can map the work, test assumptions, and build if justified, and can recommend the lower-complexity path. No predetermined custom-build pitch.
- AI is evaluated as a technique under automate/build for the buyer, not pitched as the default answer. AI-first delivery is Arturo's internal method, not the hero promise. Do not lead with "AI consultancy" or the retired visitor name "AI Jumpstart".
- Audience: small orgs where leaders wear many hats and decision-makers or recommenders are close to the work. Use qualitative time/capacity language only. No guaranteed ROI or savings percentages.

Why Arturo is a visible solo-founder block, not a multi-person grid.

Tonal boundary:

- Homepage sections can be blunt and kinetic (Framer Motion).
- Contact should be warmer, practical, and low-friction.

## Animation

Framer Motion is scoped to section components. Every motion wrapper must respect `prefers-reduced-motion: reduce`. Use `usePrefersReducedMotion()` from `lib/motion.ts`.

## Supabase and contact

Contact writes use a `'use server'` action with the admin client (`SUPABASE_SERVICE_ROLE_KEY`). Never use anon-key client inserts for leads.

Form contract:

- Fields: `name`, `email`, `company`, `service`, `message` (`message` is optional)
- Visitor-facing service values: `ai-jumpstart`, `not-sure`. Keep `custom-ai-build` accepted in validation for legacy submissions. Do not offer it on the form.
- Honeypot: `website`. Silent redirect to `/success`, no DB row.
- Rate limit: 5 submissions/IP/hour via Upstash when configured
- Success: redirect to `/success` with warm confirmation copy
- Operator email: Resend to `LEAD_NOTIFICATION_EMAIL` (defaults to `start@arturosolo.com`)

RLS on `contact_leads`: enabled, no anon/authenticated policies. Blog `posts`: public SELECT where `status = 'published'`.

Separate Supabase projects for Vercel preview vs production.

## Accessibility

Mobile menu toggle must expose `aria-expanded` and `aria-controls` pointing at the mobile nav panel id.

Placeholder links (`href="#"`) are not acceptable in production navigation or footer.

## Deployment

Production is live on Vercel at [arturosolo.com](https://arturosolo.com), with env-scoped Supabase, Resend, and Upstash credentials.

CI (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, build, and Playwright e2e on pushes and pull requests to `main`.

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

Node 20+ is required (CI uses 20; this repo is also tested on Node 22). Standard commands are in `## Verification` above and `package.json` scripts.

- A `.env.local` is required for `dev`/`build`/`test:e2e` because `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be defined. It is gitignored, so it does not persist across fresh VMs. Recreate it with placeholder values (same ones CI uses: `https://placeholder.supabase.co` and `placeholder-anon-key`). All pages, unit tests, and Playwright e2e pass with only these placeholders.
- The site runs and renders fully on placeholders. Real credentials are only needed to actually persist data. Submitting the `/contact` form without a real `SUPABASE_SERVICE_ROLE_KEY` reaches the server action, fails the insert, and shows the graceful banner "Something went wrong. Please try again..." This is expected, not an environment defect. Resend (`RESEND_API_KEY`) and Upstash rate limiting are also inert without their credentials.
- Playwright locally reuses an already-running dev server on `127.0.0.1:3000`. If one is running, `npm run test:e2e` will attach to it instead of spawning its own.
