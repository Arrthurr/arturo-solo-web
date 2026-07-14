---
title: "feat: Apple Org-ready privacy policy"
date: 2026-07-13
type: feat
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
deepened: false
---

# feat: Apple Org-ready privacy policy

## Goal Capsule

**Objective:** Revise the public privacy policy at `/privacy-policy` so Arturo Solo LLC can use it as a credible Organization-enrollment website signal and as the App Store Connect privacy policy URL for iOS apps published under the company name.

**Authority:** Product Contract (this document) → Apple App Review Guideline 5.1.1(i) and Organization enrollment website rules → existing legal-page patterns in `app/privacy-policy/page.tsx`.

**Stop when:** Policy covers website + published apps/products with 5.1.1-required disclosures; production URL remains `https://arturosolo.com/privacy-policy`; e2e smoke locks key statements; Terms of Service unchanged.

**Out of scope:** D-U-N-S / enrollment paperwork, App Store Connect nutrition labels, in-app privacy UI, attorney certification, Terms rewrite.

---

## Product Contract

### Summary

Expand the existing Arturo Solo LLC privacy page from website-contact-only to a single policy covering the marketing site and apps/products published under the company name, using generic product language until specific apps are named. Meet Apple App Review 5.1.1(i) content requirements while preserving accurate Supabase/contact disclosures. Terms stay as-is.

### Requirements

- R1. The privacy policy remains publicly reachable at `/privacy-policy` on the organization domain (`arturosolo.com`) with no auth wall.
- R2. The policy clearly identifies the legal entity as **Arturo Solo LLC** and provides a working privacy contact (`start@arturosolo.com`).
- R3. Scope covers (a) the marketing website / contact form and (b) apps and products Arturo Solo LLC publishes (generic language; no requirement to name specific apps yet).
- R4. Per Apple Guideline 5.1.1(i), the policy must clearly and explicitly:
  - Identify what data is collected (if any), how it is collected, and all uses of that data for covered surfaces.
  - Confirm that third parties with whom user data is shared provide the same or equal protection of user data as stated in the policy.
  - Explain retention/deletion policies and how a user can revoke consent and/or request deletion.
- R5. Preserve accurate website disclosures already institutionalized: contact form fields, Supabase US storage, operator-only lead access, Vercel/Resend/Upstash roles, no sale of personal information, rights of access/correction/deletion.
- R6. Include a children’s privacy statement suitable for App Store–facing policies (not directed at children under 13; no knowing collection from children).
- R7. Update `Last updated` and metadata description so scope is not still described as contact-form-only.
- R8. Do not change Terms of Service in this work.
- R9. Add automated smoke coverage so key Apple-facing disclosures do not regress silently.

### Actors

- A1. **Website visitor / app user** — reads the policy; may email for access, correction, deletion, or consent revocation.
- A2. **Apple reviewer / enrollment verifier** — opens the public URL during Organization verification or App Review; expects a functional, non-minimal site and 5.1.1-complete policy text.
- A3. **Operator (Arthur Turnbull / Arturo Solo LLC)** — maintains truthful copy as products and third parties change.

### Key Flows

- F1. Visitor opens `/privacy-policy` via footer or direct URL → sees entity, scope (site + apps), collection/use, third parties + equal-protection, retention/deletion/revoke-consent, children’s statement, contact email.
- F2. App Store Connect / in-app link points at `https://arturosolo.com/privacy-policy` → page loads without login and presents 5.1.1-required content.
- F3. User emails `start@arturosolo.com` for deletion or consent revocation → operator handles off-site (process, not code).

### Acceptance Examples

- AE1. Given production `arturosolo.com`, when Apple opens the Privacy Policy URL, then the page returns successfully and names Arturo Solo LLC plus a working mailto contact.
- AE2. Given the revised policy, when a reviewer scans for 5.1.1(i), then collection/how/use, third-party equal protection, and retention + revoke-consent/deletion language are all present and explicit.
- AE3. Given the revised policy, when reading scope, then both the website contact form and generically described published apps/products are covered without claiming unfinished products as finished portfolio items.
- AE4. Given CI e2e, when `/privacy-policy` is loaded, then status 200 and assertions pass for entity name, apps/products scope signal, equal-protection language, revoke-consent or deletion path, and Supabase disclosure.

### Scope Boundaries

**In scope**

- Content and metadata updates to `app/privacy-policy/page.tsx`
- Playwright smoke for the privacy route
- Light runbook checklist wording if it still implies contact-only privacy copy

**Out of scope**

- Terms of Service changes
- D-U-N-S Number, binding-authority docs, Apple enrollment form filling
- App Store Connect privacy nutrition labels / privacy choices URL page
- In-app Settings → Privacy Policy UI
- Formal attorney review / opinion letter
- Naming specific iOS apps until they exist

**Deferred to Follow-Up Work**

- Per-app policy annex or named-product sections when first App Store submission needs product-specific data categories
- Optional Privacy Choices URL page (Apple optional metadata)
- Capturing an Apple/privacy learning in `docs/solutions/` after first successful Org enrollment or App Review

### Assumptions

- Generic “apps and products we publish” language is acceptable until named apps ship; when practices diverge, the operator will update the policy before App Store submission.
- Website third-party list remains accurate for the marketing site; app-specific SDKs will be disclosed in the same policy when introduced (not inventing SDKs that do not exist yet).
- Template-edited legal copy without attorney certification remains the project posture (consistent with prior KTD10).
- Organization enrollment’s website rule is satisfied by the existing functional site plus a substantive privacy page (Apple requires a public functional domain-associated site; privacy URL is required for apps).

---

## Planning Contract

### Key Technical Decisions

- KTD1. **Single URL, dual surface.** Keep one route (`/privacy-policy`) covering website + apps rather than splitting into `/privacy` and `/app-privacy`. Rationale: Apple expects one Privacy Policy URL in App Store Connect; enrollment already uses the company domain; footer already links here.
- KTD2. **In-place JSX copy, preserve legal-page shell.** Edit `app/privacy-policy/page.tsx` using the existing Header / `section-padding` / `max-w-3xl` / `.prose` / numbered `h2` pattern mirrored by Terms. Rationale: no shared legal component exists; introducing MDX or a CMS is out of proportion.
- KTD3. **Map sections to 5.1.1(i), not a full GDPR rewrite.** Required additions: apps/products scope, how data is collected across surfaces, third-party equal-protection confirmation, revoke-consent language alongside deletion, children’s statement. Keep existing contact-form and vendor disclosures. Rationale: Apple’s gate is 5.1.1(i); over-lawyering expands risk of inaccurate claims.
- KTD4. **Truthful generic app language.** Describe categories of data apps *may* collect only when needed for core functionality, subject to OS permission prompts, and commit to updating the policy when practices change — do not invent analytics/ad networks that are not in use. Rationale: false third-party claims fail App Review and mislead users.
- KTD5. **E2E smoke over unit tests.** Add `e2e/privacy-policy.spec.ts` following `e2e/blog.spec.ts`. Rationale: no precedent for static legal unit tests; Playwright already covers route reachability patterns; R9 needs durable assertions on key phrases.

### Alternative Approaches Considered

| Approach | Why not chosen |
|----------|----------------|
| Separate `/app-privacy` page | Splits Apple’s single Privacy Policy URL; doubles maintenance |
| MDX / CMS-backed legal content | No existing pattern; heavier than a one-page revision |
| Attorney-drafted policy only | Explicitly deferred; blocks shipping Org-ready URL |

### Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Generic app language drifts from real app practices | Operator updates policy before each App Store submission; deferred named-product annex |
| Terms remain website-only while Privacy covers apps | Accepted this plan; revisit ToS when first app ships if needed |
| Overclaiming third parties | Only list known website vendors + equal-protection clause for future processors |
| Production must serve updated copy before Apple uses the URL | Deploy before enrollment / App Store Connect privacy URL entry |

### Sources & Research

- Apple Developer Program enrollment — Organization website must be publicly available, functional, domain-associated; minimal/registrar parking pages rejected ([enrollment help](https://developer.apple.com/help/account/membership/program-enrollment))
- App Review Guidelines 5.1.1(i) — Privacy Policies required content ([guidelines](https://developer.apple.com/app-store/review/guidelines/))
- App Store Connect — Privacy Policy URL required for all apps ([manage app privacy](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/))
- Local patterns: `app/privacy-policy/page.tsx`, `app/terms-of-service/page.tsx`, `components/Footer.tsx`, `e2e/blog.spec.ts`
- Prior launch constraint: Supabase disclosure + template-edited legal copy (`docs/plans/2026-07-06-001-feat-fresh-next-repo-plan.md` KTD10); no `docs/solutions/` Apple learnings

**Product Contract preservation:** N/A (ce-plan-bootstrap; no upstream requirements-only unified plan). Confirmed scope from user: website + apps, generic product language, Terms out of scope.

---

## Implementation Units

### U1. Expand privacy policy copy for Apple 5.1.1(i)

**Goal:** Rewrite privacy page content so it covers website + published apps/products and includes every 5.1.1(i) required element while keeping accurate Arturo website disclosures.

**Requirements:** R1–R8

**Dependencies:** None

**Files:**

- Modify: `app/privacy-policy/page.tsx`

**Approach:**

- Keep the existing page shell (Header, Footer, layout classes, numbered `h2` structure).
- Update `metadata.description` and `Last updated` (implementation date).
- Restructure/expand sections so a reviewer can find:
  - Who we are (Arturo Solo LLC, domain, contact)
  - Scope (website + apps/products we publish)
  - Information collected + how collected + uses (website contact form preserved; apps framed generically and truthfully)
  - Third-party processors (existing website vendors) **plus** equal-protection confirmation for shared data
  - Retention, deletion, and **revoke consent** path via email
  - Children’s privacy
  - Changes / updates
- Do not invent unused ad/analytics SDKs. Prefer “when introduced, disclosed and bound to equal protection” over false lists.
- Preserve “we do not sell personal information.”

**Patterns to follow:** Current `app/privacy-policy/page.tsx` and `app/terms-of-service/page.tsx` prose/list conventions (`list-disc pl-6 mb-6 text-gray-600 font-display`, `&ldquo;` entities).

**Execution note:** Prefer smoke/runtime verification of rendered copy over unit tests for this unit; U2 locks phrases in e2e.

**Test scenarios:** Covered by U2 e2e (this unit is content). Manual: open `/privacy-policy` locally and confirm sections read as one coherent policy.

**Verification:** Local page shows dual-surface scope and all 5.1.1(i) elements; Terms file untouched; footer still links `/privacy-policy`.

---

### U2. Add privacy-policy e2e smoke and runbook alignment

**Goal:** Lock Apple-facing disclosures in CI and keep the cutover/smoke checklist from implying contact-only privacy copy.

**Requirements:** R9, AE4; supports AE1–AE3

**Dependencies:** U1

**Files:**

- Create: `e2e/privacy-policy.spec.ts`
- Modify (light): `docs/runbooks/2026-07-06-vercel-cutover.md` — only if checklist wording still says privacy is contact/Supabase-only without apps scope

**Approach:**

- Mirror `e2e/blog.spec.ts`: `goto('/privacy-policy')`, expect 200, assert stable strings (entity name, apps/products scope cue, equal-protection cue, deletion or revoke-consent cue, Supabase).
- Keep assertions on durable phrases, not full paragraph snapshots.
- Adjust runbook privacy bullet to “Arturo privacy policy covering website + published apps (incl. Supabase disclosure)” if still outdated.

**Patterns to follow:** `e2e/blog.spec.ts`, `e2e/homepage.spec.ts`

**Test scenarios:**

- Happy path: `/privacy-policy` returns 200 and shows heading “Privacy Policy”.
- Happy path: Page text includes “Arturo Solo LLC”.
- Happy path: Page text signals coverage of apps/products (or equivalent durable phrase chosen in U1).
- Happy path: Page text includes third-party equal-protection language (or durable cue chosen in U1).
- Happy path: Page text includes deletion and/or revoke-consent path and `start@arturosolo.com` or visible mailto.
- Happy path: Page text still discloses Supabase.
- Integration: Spec runs under existing Playwright config (`baseURL` `127.0.0.1:3000`) in CI with other e2e tests.

**Verification:** `npm run test:e2e` includes the new spec and passes; runbook privacy line (if touched) matches dual-surface scope.

---

## Verification Contract

**Gates (repo standard):**

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

**Manual / Apple readiness:**

- Confirm `https://arturosolo.com/privacy-policy` serves the revised copy after deploy (AE1).
- Spot-check against Guideline 5.1.1(i) checklist (AE2).
- Confirm Terms at `/terms-of-service` unchanged (R8).

---

## Definition of Done

- [ ] U1: Privacy page covers website + apps/products with 5.1.1(i) required statements; metadata and Last updated refreshed; Terms untouched.
- [ ] U2: `e2e/privacy-policy.spec.ts` passes in CI; runbook privacy wording aligned if it was stale.
- [ ] Verification Contract gates pass.
- [ ] Production deploy of the privacy URL is ready before Apple enrollment / App Store Connect uses it (operator action outside code).

---

## Appendix

### Gap map: current page → Apple 5.1.1(i)

| 5.1.1(i) requirement | Current page | Target |
|----------------------|--------------|--------|
| What / how / uses | Website contact form only | Website + generic apps/products |
| Third-party equal protection | Lists vendors; no equal-protection clause | Keep list + add equal-protection confirmation |
| Retention + revoke consent / deletion | Retention + deletion email; no revoke-consent | Add revoke-consent language with same contact path |
| Children’s privacy | Absent | Add not-directed-at-children statement |
| Public URL on org domain | Present | Keep |
