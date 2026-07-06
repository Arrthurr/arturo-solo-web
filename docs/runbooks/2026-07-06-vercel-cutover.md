# Vercel DNS Cutover Runbook

**Date:** 2026-07-06  
**Site:** arturosolo.com  
**Repo:** `arturo-solo-web` (Next.js 14 on Vercel, Supabase, Resend, Upstash)

---

## Pre-cutover checklist (preview deploy)

Run against the Vercel **preview** URL before touching production DNS.

- [ ] Homepage at 375px and 1280px — builder language, not generic agency copy
- [ ] Hero: "Working AI. In your business."
- [ ] Services: AI Jumpstart + Custom AI Build only
- [ ] Stats: hybrid proof model, client logos subordinate
- [ ] Why Arturo: solo-founder block visible
- [ ] `prefers-reduced-motion: reduce` — sections readable without motion-dependent visibility
- [ ] Contact form: all fields, submitting state, validation errors, server errors, honeypot silent success
- [ ] Contact submit → Supabase **dev** project row + Resend notification → `/success` warm copy
- [ ] `/blog` returns 200 with empty-state when no posts
- [ ] Publish one test post in dev Supabase → appears on index and `/blog/[slug]`
- [ ] `/privacy-policy` and `/terms-of-service` — Arturo copy including Supabase disclosure
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
2. Confirm Vite site on Netlify (`asllc-website` `main`) is still deployable (rollback safety net).
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

- [ ] `https://arturosolo.com` serves Next.js site (not Vite/Netlify)
- [ ] Contact form submits to **prod** Supabase
- [ ] Operator receives Resend notification
- [ ] `/success` renders warm confirmation
- [ ] `/blog`, `/privacy-policy`, `/terms-of-service` reachable

**Rollback trigger:** Production contact e2e fails within 15 minutes of DNS flip.

---

## Rollback procedure

1. Revert DNS web records to Netlify publish targets (saved pre-cutover).
2. Wait for propagation (up to TTL; typically 5–30 minutes).
3. Verify Netlify Vite site serves at `arturosolo.com`.
4. Investigate Vercel/Supabase issue before re-attempting cutover.

---

## Archive legacy Vite stack (after successful cutover)

1. Tag last Vite commit on `asllc-website` pre-cutover `main`:
   ```bash
   cd asllc-website
   git tag archive/vite-story-scroll-2026-07-06 <commit-sha>
   git push origin archive/vite-story-scroll-2026-07-06
   ```
2. GitHub archive `asllc-website` or add README banner: "Retired — see arturo-solo-web"
3. Close any open migration PRs (e.g. PR #10)
4. Retire Netlify production deploy (keep domain registration if desired)
5. After one stable production week, optionally delete dormant old Vercel project

---

## Operator publishing (blog v1)

No `/admin` route. Publish via Supabase dashboard:

1. Open **prod** Supabase → Table Editor → `posts`.
2. Insert row: `slug`, `title`, `body`, `excerpt`, `status = 'published'`, `published_at = now()`.
3. Verify at `https://arturosolo.com/blog/[slug]`.

---

## Nuggets template reference

Template source: [Nuggets agency template](https://21st.dev/@shuvamk/templates/nuggets-design-agency-website)  
This repo: Next app at root (`app/`, `components/`, `lib/`).
