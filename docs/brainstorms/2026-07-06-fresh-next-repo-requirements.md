---
date: 2026-07-06
topic: fresh-next-repo
supersedes: docs/brainstorms/2026-07-05-nextjs-nuggets-migration-requirements.md
---

# Fresh Next.js Repo for arturosolo.com

## Summary

Abandon the mixed-repo `feat/nextjs-nuggets` approach. Create a **new Next-only repository** scaffolded fresh from the Nuggets template, connect it to a **new Vercel project**, verify Preview QA, then **cut over `arturosolo.com` to production** on Vercel. Archive `asllc-website` for feature work now; Netlify continues serving the Vite site until DNS cutover.

---

## Problem Frame

The July 2026 parallel-branch migration (`feat/nextjs-nuggets` inside `asllc-website`) built a working Next.js app, but Vercel Preview deployments serve **`source: static`** — no Next routes, 404 on `/contact` and `/blog`. Root cause is repo collision: legacy Vite artifacts (`src/`, `vite.config.ts`, `netlify.toml` with `publish = "dist"`, `public/_redirects`) coexist with the Next app in one tree. Removing `index.html` and adding `.vercelignore` did not fix framework detection.

The original migration requirements (2026-07-05) already called for a **greenfield rebuild**. The parallel-branch tactic was an execution shortcut that reintroduced the collision the greenfield decision was meant to avoid. A dedicated Next-only repo restores that intent.

---

## Key Decisions

- **Fresh repo, not branch repair.** Do not invest more effort fixing Vercel on `asllc-website`. Close PR #10 and abandon `feat/nextjs-nuggets`.
- **Nuggets template as starting point.** Scaffold from the purchased Nuggets template again — not a file copy from the feature branch.
- **Selective re-application, not code carry-over.** Use the abandoned branch and prior docs as **reference** for Arturo copy, Supabase schema intent, runbooks, and env-var lists. Re-implement in the clean repo.
- **Archive `asllc-website` now.** No further feature work on that repo. Production stays on Netlify (Vite) until DNS cutover.
- **New Vercel project.** Do not rewire the existing `arturo-solo-website` project (stale build settings from the mixed tree).
- **Cutover soon after Preview QA.** Preview deploy must pass smoke checks, then repoint `arturosolo.com` DNS to the new Vercel production deployment.

---

## Actors

- A1. **Cold discovery visitor:** Judges quickly whether Arturo is a real AI builder.
- A2. **Business owner / operator:** Needs a low-friction contact path.
- A3. **Arturo Solo LLC:** Needs founder-builder credibility and hybrid proof on the public site.
- A4. **Arturo (site operator):** Publishes blog posts and receives contact leads via Supabase.

---

## Requirements

**Repository and delivery**

- R1. A **new git repository** must contain only the Next.js 14 (App Router) site — no Vite `src/` tree, no root `index.html`, no `vite.config.ts`, no `netlify.toml` publish config.
- R2. The new repo must be scaffolded from the purchased **Nuggets** template (`https://21st.dev/@shuvamk/templates/nuggets-design-agency-website`).
- R3. Production hosting must be a **new Vercel project** linked to the new repo, with Supabase env vars scoped per deploy context (preview and production). The service role key must never ship to client bundles.
- R4. Preview and production must use **isolated Supabase projects** or strictly separated credentials so test submissions cannot mix with production lead data.
- R5. **`asllc-website` must be archived** for active development: close PR #10, abandon `feat/nextjs-nuggets`, document that the repo is Vite-legacy only. Netlify production on `main` remains live until cutover.
- R6. The new repo must pass **lint, build, unit tests, and e2e smoke** in CI before cutover.

**Positioning and content** *(unchanged from 2026-07-05 migration)*

- R7. All homepage sections must carry Arturo's June 2026 positioning: **working AI, built into your business** — founder-led AI build studio.
- R8. **Hero** must deliver the opening promise with contrast language (working systems, not decks or demos).
- R9. **Services** must present **AI Jumpstart** and **Custom AI Build** only.
- R10. **Process** must describe: discover bottleneck → build until it runs → expand.
- R11. **Stats** must present **hybrid proof** without implying unfinished products are finished portfolio items.
- R12. **Team** must be a visible **"Why Arturo"** solo-founder block.
- R13. **Blog** must be Supabase-backed at `/blog`; zero posts at launch is acceptable.
- R14. **Contact** must capture leads via server-mediated Supabase write with fields `name`, `email`, `company`, `service` (`ai-jumpstart`, `custom-ai-build`, `not-sure`), `message`, honeypot, and rate limiting.
- R15. **Privacy Policy** and **Terms** must ship with Arturo-specific copy before public cutover.

**Experience and quality** *(unchanged from 2026-07-05 migration)*

- R16. Motion uses Framer Motion with `prefers-reduced-motion: reduce` fallbacks. No GSAP story-scroll port.
- R17. Fully responsive; SEO metadata on all public routes.
- R18. Contact path stays warm and lower-friction than kinetic homepage sections.
- R19. Contact form exposes submitting, validation-error, server-error, and success states.
- R20. Success confirmation via `/success` or equivalent inline state.
- R21. Mobile menu exposes `aria-expanded` and `aria-controls` with keyboard behavior verified.

**Security and cutover**

- R22. Supabase RLS on contact leads denies anonymous `SELECT`, `UPDATE`, `DELETE`.
- R23. **Preview deploy** on the new Vercel project must be verified before DNS cutover: desktop/mobile smoke, contact submit, `/blog`, Privacy/Terms, reduced-motion, mobile menu ARIA.
- R24. DNS for `arturosolo.com` must point to the new Vercel production deployment without breaking email or unrelated records.
- R25. After cutover, tag or archive the Vite codebase in `asllc-website` so history is recoverable but not confused with the live stack.
- R26. **`AGENTS.md` in the new repo** must document Next.js, Framer Motion, Supabase, and multi-section IA invariants.

---

## Acceptance Examples

- AE1. **Covers R1, R3.** Given the new repo is pushed, when Vercel builds Preview, build logs show the Next.js route table and runtime logs show `source` other than bare `static` for `/contact`.
- AE2. **Covers R7, R8.** Given a cold visitor lands on `/`, when they read the hero, they encounter builder language — not a design-agency tagline.
- AE3. **Covers R14, R19, R20.** Given a visitor submits valid contact data on Preview, when submission completes, a row appears in Supabase and the visitor sees warm success confirmation.
- AE4. **Covers R23, R24, R25.** Given Preview QA passes, when DNS cutover completes, `arturosolo.com` serves the new Vercel Next site and the Vite repo is archived per R25.

---

## Success Criteria

- Vercel Preview on the new repo serves Next.js routes (`/`, `/contact`, `/blog`) — not static 404s or Vite shell HTML.
- A cold visitor describes the site using builder/systems language.
- Contact leads arrive in Supabase from production.
- Cutover completes without extended downtime on `arturosolo.com`.
- `asllc-website` is clearly retired for active development; no one confuses it with the live stack.

---

## Scope Boundaries

### Deferred for later

- Migrating historical Netlify Form submissions into Supabase.
- Product screenshots, founder photography, dedicated case-study page.
- Seed blog posts (operator preference).
- Custom `/admin` blog CMS route.

### Outside this product's identity

- Fixing Vercel deployment on the mixed `asllc-website` tree.
- Recreating GSAP story-scroll narrative.
- Preserving Netlify Forms as lead-capture backend.
- Parallel-branch workflow inside `asllc-website`.

### Superseded by this document

- **R2** (parallel git branch in `asllc-website`) from `docs/brainstorms/2026-07-05-nextjs-nuggets-migration-requirements.md`.
- **R25** (update `AGENTS.md` on the feature branch) — replaced by R26 in the new repo.

All other requirements from the 2026-07-05 document remain valid unless contradicted above.

---

## Dependencies / Assumptions

- Nuggets template remains available from 21st.dev.
- Supabase projects (preview + production) can be provisioned before cutover.
- GitHub org access for a new repository.
- Vercel account access for a new project.
- June 2026 positioning docs remain the content baseline.
- Domain registration may stay at Netlify; only DNS routing changes at cutover.
- Reference material from `feat/nextjs-nuggets` (copy in `components/`, `docs/runbooks/2026-07-05-vercel-cutover.md`, Supabase migrations) accelerates re-implementation but is not copied verbatim into the new repo root.

---

## Outstanding Questions

### Deferred to Planning

- [Affects R1][Operations] New repository name and GitHub org placement (`arturo-solo-website-next` vs. rename strategy).
- [Affects R3][Operations] Whether to delete or leave dormant the old `arturo-solo-website` Vercel project after the new project is live.
- [Affects R5][Operations] Exact archive steps for `asllc-website` (GitHub archive flag, README banner, Netlify site status).
- [Affects R10][Content] Launch blog empty vs. 1–2 seed posts.
- [Affects R15][Content] Privacy/Terms copy source — template edit vs. custom draft.
- [Affects R23, R24][Operations] Cutover window and rollback plan if Supabase or Vercel misconfigures on launch day.

---

## Sources / Research

- Failed mixed-repo deploy evidence: Vercel runtime logs showing `source: static`, `/contact` 404, deployment `dpl_EBRW7rDS5dqnyfJ1v9dyv74wVx8a` on `feat/nextjs-nuggets`.
- Prior migration requirements: `docs/brainstorms/2026-07-05-nextjs-nuggets-migration-requirements.md`.
- Positioning baseline: `docs/brainstorms/2026-06-01-ai-consultancy-pivot-requirements.md`, `docs/brainstorms/2026-06-03-story-scroll-redesign-requirements.md`.
- Cutover runbook (to adapt): `docs/runbooks/2026-07-05-vercel-cutover.md`.
- Nuggets template: `https://21st.dev/@shuvamk/templates/nuggets-design-agency-website`.
