# Vercel DNS cutover runbook

**Site:** arturosolo.com  
**Repo:** `arturo-solo-web` (Next.js 14 on Vercel, Supabase, Resend, Upstash)  
**Cutover date:** 2026-07-06 (plan)  
**Status (2026-07-24):** Production DNS points at Vercel. `https://arturosolo.com` serves this Next.js app with Workflow Assessment positioning. Treat the sections below as the live ops record plus rollback and residual checklist items.

---

## Current production posture

Verified from the public site (no auth required):

- [x] Apex serves Next.js on Vercel (`x-powered-by: Next.js`, `server: Vercel`)
- [x] Homepage H1 includes "When the work no longer fits the tools"
- [x] Services expose **Workflow Assessment** and **Custom AI Build** only (visitor-facing). Stable contact value for Workflow Assessment remains `ai-jumpstart`
- [x] Workflow Assessment shows `$1,500` fixed fee, seven business days, and Implementation Brief language
- [x] Named public proof includes DMDL and Joy for Books
- [x] `/contact` returns 200

Still for an operator with prod credentials (not verified from the public HTML alone):

- [ ] Contact submit writes a row in **prod** Supabase `contact_leads`
- [ ] Resend delivers the operator lead email
- [ ] Upstash rate limit is configured on production
- [ ] Preview and Production Vercel envs point at separate Supabase projects
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is absent from client bundles
- [ ] Legacy Vite repo (`asllc-website`) archived or clearly marked retired
- [ ] Dormant `arturo-solo-website` Vercel project retained or deleted after a stable week

CI gate on `main`: lint, typecheck, unit tests, build, e2e. Placeholders are enough for CI and local smoke; real credentials are required only for lead persistence and notifications.

---

## Pre-cutover checklist (historical / re-use on major offer changes)

Run against a Vercel **preview** URL before any DNS change, or after a large positioning rewrite before promoting to production.

- [ ] Homepage at 375px and 1280px. Workflow-first language, not generic agency copy
- [ ] Hero H1: "When the work no longer fits the tools" with workflow-first subhead (not "Working AI. In your business.")
- [ ] Services: Workflow Assessment + Custom AI Build only. Price, timing, Implementation Brief, decision paths, and no-prototype boundary visible without hover
- [ ] No visitor-facing "AI Jumpstart" string
- [ ] Stats: hybrid proof. DMDL and Joy for Books only as named public contexts unless a later plan adds names. Logos subordinate, not a generic "trusted by" strip
- [ ] Why Arturo: solo-founder block with founder photo and name caption
- [ ] `prefers-reduced-motion: reduce`. Sections readable without motion-dependent visibility
- [ ] Contact form: fields, submitting state, validation errors, server errors, honeypot silent success
- [ ] Contact submit → Supabase **preview/dev** row + Resend notification → `/success` warm copy
- [ ] Contact service values remain `ai-jumpstart`, `custom-ai-build`, `not-sure`
- [ ] `/blog` returns 200 with empty-state when no posts
- [ ] Publish one test post in preview Supabase → appears on index and `/blog/[slug]`
- [ ] `/privacy-policy` and `/terms-of-service`. Privacy covers website + published apps (incl. Supabase); Terms Arturo-specific
- [ ] Mobile menu: `aria-expanded` / `aria-controls` wired correctly
- [ ] No `href="#"` placeholders in nav or footer
- [ ] Production Vercel env scoped to **prod** Supabase; preview scoped to **dev** Supabase
- [ ] `SUPABASE_SERVICE_ROLE_KEY` not present in client bundle (grep build output / browser sources)
- [ ] CI green on `main`: lint, typecheck, unit tests, build, e2e

---

## New Vercel project setup

1. Create a **new** Vercel project linked to the `arturo-solo-web` GitHub repo.
2. Confirm framework preset is **Next.js** (not static).
3. Leave the old `arturo-solo-website` Vercel project dormant (rollback reference only).
4. Scope environment variables per deploy context:

| Variable | Production | Preview |
|----------|------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | prod project | dev project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | prod anon | dev anon |
| `SUPABASE_SERVICE_ROLE_KEY` | prod service role | dev service role |
| `RESEND_API_KEY` | prod key | dev/test key |
| `LEAD_NOTIFICATION_EMAIL` | start@arturosolo.com | start@arturosolo.com |
| `UPSTASH_REDIS_REST_URL` | prod instance | dev instance |
| `UPSTASH_REDIS_REST_TOKEN` | prod token | dev token |

5. Verify first Preview deploy: build logs show Next.js route table; `/contact` is not `source: static`.

---

## Supabase provisioning

Apply `supabase/migrations/20250217075930_solitary_shadow.sql` to **both** Supabase projects (preview + production).

Verify:

- Anon SELECT on `contact_leads` returns permission denied
- Server-side insert via service role succeeds
- Published blog posts visible via anon key; drafts hidden

---

## Cutover window

1. Pick a **low-traffic window** (evening or weekend).
2. Confirm Vite site on Netlify (`asllc-website` `main`) is still deployable (rollback safety net), if that stack still exists.
3. Confirm Vercel production deploy is latest green build from `main`.

---

## DNS repoint (arturosolo.com → Vercel)

**Preserve email:** Do not modify MX records. Only change web (A/CNAME) records.

Typical Vercel production records:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Steps:

1. Open domain registrar (may be Netlify DNS or external).
2. Note current Netlify web records (for rollback).
3. Update apex and `www` to Vercel values above (or use Vercel dashboard recommended records).
4. TTL: lower to 300s before cutover if registrar allows; restore after stable.

---

## Post-cutover smoke (within 15 minutes)

- [x] `https://arturosolo.com` serves Next.js site (not Vite/Netlify)
- [ ] Contact form submits to **prod** Supabase
- [ ] Operator receives Resend notification
- [ ] `/success` renders warm confirmation after a real submit
- [x] `/blog`, `/privacy-policy`, `/terms-of-service`, `/contact` reachable

**Rollback trigger:** Production contact path fails within 15 minutes of a DNS flip or env change that breaks lead capture.

---

## Rollback procedure

1. Revert DNS web records to the prior publish targets (saved pre-cutover; historically Netlify Vite).
2. Wait for propagation (up to TTL; typically 5-30 minutes).
3. Verify the prior site serves at `arturosolo.com`.
4. Investigate Vercel/Supabase issue before re-attempting cutover.

If the Vite Netlify stack is already retired, rollback means restoring the last known-good Vercel production deployment and DNS, not flipping back to Netlify.

---

## Archive legacy Vite stack (after successful cutover)

1. Tag last Vite commit on `asllc-website` pre-cutover `main`:
   ```bash
   cd asllc-website
   git tag archive/vite-story-scroll-2026-07-06 <commit-sha>
   git push origin archive/vite-story-scroll-2026-07-06
   ```
2. GitHub archive `asllc-website` or add README banner: "Retired — see arturo-solo-web"
3. Close any open migration PRs from the old repo
4. Retire Netlify production deploy (keep domain registration if desired)
5. After one stable production week, optionally delete the dormant old Vercel project

---

## Operator publishing (blog v1)

No `/admin` route. Publish via Supabase dashboard:

1. Open **prod** Supabase → Table Editor → `posts`.
2. Insert row: `slug`, `title`, `body`, `excerpt`, `status = 'published'`, `published_at = now()`.
3. Verify at `https://arturosolo.com/blog/[slug]`.
4. Homepage `BlogTeaser` appears only when at least one published post exists.

Empty `/blog` is expected until the first published row exists.

---

## Offer copy anchors (do not regress)

Use these when smoke-testing after content deploys:

| Surface | Expect |
|---------|--------|
| Hero H1 | "When the work no longer fits the tools" |
| Services | Workflow Assessment + Custom AI Build |
| Assessment economics | `$1,500` fixed fee · seven business days |
| Deliverable | Implementation Brief |
| Decision paths | Simplify · Buy · Automate · Build · Investigate · Defer |
| Boundary | Assessment does not include prototype or production implementation |
| Contact labels | Workflow Assessment maps to submitted value `ai-jumpstart` |
| Forbidden visitor copy | "AI Jumpstart", Texas Head Start Association, HG Jones Associates (unless a later plan re-approves names) |

---

## Nuggets template reference

Template source: [Nuggets agency template](https://21st.dev/@shuvamk/templates/nuggets-design-agency-website)  
This repo: Next app at root (`app/`, `components/`, `lib/`).
