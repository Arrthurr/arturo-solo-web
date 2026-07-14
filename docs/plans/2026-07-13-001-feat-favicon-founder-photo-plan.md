---
title: "feat: Add favicon and Why Arturo founder photo"
date: 2026-07-13
type: feat
artifact_contract: ce-unified-plan/v1
artifact_readiness: implementation-ready
product_contract_source: ce-plan-bootstrap
execution: code
---

## Goal Capsule

Wire the site favicon from `public/icon.png` and replace the Why Arturo left-column "AT" placeholder with Arthur Turnbull's photo (`public/arthur-turnbull.jpg` + `@2x`), filling the square frame with a center-top crop, plus a visible name caption under the photo.

Authority: this plan. Stop when both assets render correctly in the browser and verification gates pass.

## Product Contract

### Summary

Ship two visual identity assets that already live in `public/`: a PNG favicon for browser chrome, and a founder headshot (with name caption) that completes the solo-founder Why Arturo block (previously deferred photography).

Product Contract changed: R6 — keep a visible founder caption (review decision).

### Requirements

- R1. The site exposes `public/icon.png` as its favicon (and apple touch icon) via root metadata.
- R2. The Why Arturo left column shows Arthur Turnbull's photo instead of the "AT" text placeholder.
- R3. The photo fills the existing square frame (`object-cover`) and anchors crop at center-top (`object-top`).
- R4. Hi-DPI displays receive the `@2x` variant via `srcSet` (`1x` / `2x`).
- R5. The photo has meaningful alt text naming Arthur Turnbull.
- R6. A visible caption reading "Arthur Turnbull" identifies the founder under the photo (not AT monogram).

### Scope Boundaries

**In scope:** Root metadata icons; Why Arturo left-column image swap, crop, and founder name caption.

**Out of scope:** Open Graph / Twitter share images; PWA `manifest.json` icons; introducing `next/image`; redesigning Why Arturo layout or copy beyond the photo + caption; other pages' imagery.

### Success Criteria

- Browser tab shows the new favicon from `/icon.png`.
- Homepage Why Arturo section shows a filled, top-anchored headshot with no "AT" placeholder.
- Visible caption "Arthur Turnbull" appears under the photo.
- `@2x` asset is referenced for retina.

## Planning Contract

### Key Technical Decisions

- KTD1. Use `metadata.icons` in `app/layout.tsx` pointing at `/icon.png` (and apple) rather than moving the file to `app/icon.png`. Asset already lives in `public/`; metadata avoids duplication and matches the existing metadata export pattern.
- KTD2. Use a plain `<img>` with `srcSet`, not `next/image`. Follow `components/Stats.tsx` for plain-img + `eslint-disable-next-line @next/next/no-img-element`; `srcSet` wiring is new in this repo and is defined in U2. Honors the explicit 1x/`@2x` pair; zero `next/image` precedent in the repo.
- KTD3. Keep the existing square photo frame (`aspect-square`, `rounded-2xl`, `overflow-hidden`); put the image inside it with `h-full w-full object-cover object-top`. Place the name caption **below** the square (outside `overflow-hidden`) so crop does not clip the label. Reuse the prior caption styling (`text-sm text-gray-500 font-display`).
- KTD4. Use the current `public/arthur-turnbull@2x.jpg` as the retina source after the user's resize. Note: file is ~4× linear vs 1x (3648×4544 vs 912×1136), not a strict 2×; still acceptable for this ship — optional follow-up to export a true 1824×2272 `@2x` if bandwidth matters.

### Assumptions

- Alt text "Arthur Turnbull" is sufficient for the image; the visible caption carries sighted identification (R6).
- Social preview / OG images stay unset for this change.
- `manifest.json` stays unlinked and iconless (deferred).

### Patterns to Follow

- `components/Stats.tsx` — plain `<img>` + `eslint-disable-next-line @next/next/no-img-element`
- `app/layout.tsx` — extend the existing `metadata` export
- `lib/motion.ts` / Why Arturo — leave Framer Motion + `usePrefersReducedMotion()` unchanged
- Prior Why Arturo caption classes for the name under the frame

## Implementation Units

### U1. Wire favicon via root metadata

**Goal:** Browser chrome uses `public/icon.png`.

**Requirements:** R1

**Dependencies:** None

**Files:**
- Modify: `app/layout.tsx`

**Approach:** Add `icons: { icon: '/icon.png', apple: '/icon.png' }` to the root `metadata` export. Do not add manual `<link rel="icon">` tags.

**Patterns to follow:** Existing `metadata` block in `app/layout.tsx`.

**Test scenarios:**
- Happy path: After load, document head includes a favicon link whose href ends with `/icon.png` (accept absolute URL via `metadataBase`, e.g. `https://arturosolo.com/icon.png`).
- Edge: Child routes (e.g. `/contact`) inherit the same icon without local overrides.

**Verification:** Homepage and one child page show the PNG favicon in the tab / head links. Lint and typecheck clean for `app/layout.tsx`.

### U2. Replace Why Arturo placeholder with founder photo + caption

**Goal:** Left column shows the headshot (fill, center-top crop, retina `srcSet`) and a visible "Arthur Turnbull" caption under the frame.

**Requirements:** R2, R3, R4, R5, R6

**Dependencies:** None (parallel with U1)

**Files:**
- Modify: `components/WhyArturo.tsx`
- Test: `e2e/homepage.spec.ts`

**Approach:** Replace the centered "AT" monogram block with a photo frame + caption stack. Inside the square frame, render `{/* eslint-disable-next-line @next/next/no-img-element */}` then an `<img>` with `src="/arthur-turnbull.jpg"`, `srcSet="/arthur-turnbull.jpg 1x, /arthur-turnbull@2x.jpg 2x"`, `alt="Arthur Turnbull"`, and classes that fill + `object-cover object-top`. Remove `flex items-center justify-center` from the square container so the image fills. Below the square (sibling, not clipped), render a caption `Arthur Turnbull` using the prior `text-sm text-gray-500 font-display` styling. Keep the outer motion wrapper and reduced-motion behavior. In `e2e/homepage.spec.ts`, assert `page.getByAltText('Arthur Turnbull')` is visible, `toHaveAttribute('srcset', /arthur-turnbull@2x\.jpg 2x/)`, visible text "Arthur Turnbull" in the section, and "AT" monogram text absent.

**Execution note:** Prefer a quick visual smoke at mobile and desktop widths to confirm face framing under `object-top` and caption placement under the rounded square; e2e covers presence, not crop aesthetics.

**Patterns to follow:** `components/Stats.tsx` img + eslint-disable; keep Why Arturo as a solo-founder block (AGENTS.md).

**Test scenarios:**
- Happy path: Homepage shows an image with alt "Arthur Turnbull" in the Why Arturo section; visible caption "Arthur Turnbull" is present; "AT" placeholder monogram is absent.
- Integration: Existing homepage e2e still finds "Why Arturo" copy; new assertions cover headshot alt, srcset, and caption text.
- Edge: Image sources include both `/arthur-turnbull.jpg` and the `@2x` path in `src`/`srcSet`.

**Verification:** Visual check that the photo fills the rounded square, crops from the top, and caption sits under the frame; homepage e2e passes; lint clean for the eslint-disable comment pattern.

## Verification Contract

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Smoke: favicon in tab; Why Arturo photo fill + top crop + caption at ~375px and ~1280px
- `npm run test:e2e` (at least homepage)

## Definition of Done

- U1 and U2 complete with cited requirements satisfied
- Verification Contract gates pass
- No "AT" placeholder remains in Why Arturo; founder caption remains visible
- Favicon is the PNG asset, not a missing/default icon
- Social/OG and manifest icons remain explicitly out of scope (unchanged)
