# ASLLC-38 dependency upgrade

Verified in the orb on October 3, 2026. Ticket: [ASLLC-38](https://linear.app/arturosolo/issue/ASLLC-38/upgrade-vulnerable-nextjs-and-transitive-production-dependencies).

## Upgrade

- Next.js 14.2.35 → 16.3.8 (current stable release at verification).
- React and React DOM 18.3.1 → 19.3.0, with matching types. Lucide React 0.468.0 adds compatible React 19 peer support; Framer Motion 11 remains compatible.
- Next.js now supplies PostCSS 8.5.23; the direct development PostCSS is 8.5.28. Both are patched. The shared nanoid resolution is 3.3.19.
- Matching Next.js ESLint config, ESLint 9 flat config, and direct ESLint CLI replace the removed `next lint`. Typecheck runs `next typegen` first for clean-checkout route validation.
- Workshop confirmation awaits `searchParams`; contact and checkout use React's `useActionState`. Async cookies, headers, and blog slug handling were already compatible. Next.js generated the TypeScript JSX and route-type changes.
- Image allowlisting uses HTTPS `remotePatterns` rather than deprecated `domains`. The root HTML attribute preserves the previous smooth-scroll navigation behavior.

No force upgrade, dependency overrides, public-offer changes, or client-side secret access were introduced.

## Advisory review

The baseline `npm audit --omit=dev` reported Next.js (critical), PostCSS (high), and nanoid (high). Severity alone does not establish exploitation.

- **App Router / Server Actions:** This app has both contact and checkout Server Actions, so [GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj) applies. Its crafted-request CPU exhaustion has no workaround besides upgrading. Related RSC deserialization, cache, and endpoint-disclosure findings were not treated as safe merely because this is a marketing site; the new framework release resolves the audited ranges.
- **Conditional Next.js findings:** The repository has no rewrites, custom server, WebSocket upgrade handling, Pages Router/i18n middleware, Edge Server Actions, CSP nonces, or `beforeInteractive` scripts. Findings requiring those configurations are not demonstrated here. The Windows-hosting RCE is conditional on Windows hosting, not an established exploit of the Vercel deployment. Image optimization remains a relevant framework surface; the upgrade also removes the audited image DoS, disk-cache, and AVIF RCE findings without weakening image security defaults.
- **PostCSS:** [Source-map path traversal](https://github.com/advisories/GHSA-r28c-9q8g-f849) requires processing attacker-controlled CSS and exposing generated maps. No visitor CSS-processing endpoint exists in this app; blog bodies render as text. That limits observed applicability, but both installed PostCSS versions were upgraded beyond all audited affected ranges, including subsequent incomplete-fix advisories and CSS stringification XSS.
- **nanoid:** [Zero-size custom-generator loops](https://github.com/advisories/GHSA-2v37-7h3g-55p8) and negative-size non-secure-generator loops require attacker-controlled generator sizes. App code does not import nanoid; it is a PostCSS dependency. The locked 3.3.19 resolution fixes both regardless.

After a fresh `npm ci`, `npm audit --omit=dev` reports **found 0 vulnerabilities**. There are no residual production advisories to waive or mitigate.

The full audit (including development tools) still reports 16 findings: 12 high, 3 moderate, 1 low, in the ESLint/Tailwind/Vitest tooling tree. This is not a clean full audit. Those findings are outside this production-dependency ticket; no blanket force fix or Tailwind major migration was attempted. Development-tool exposure should be assessed separately, especially before processing untrusted source files or exposing development servers publicly.

## Verification

After `npm ci`:

- `npm run lint`: exit 0.
- `npm run typecheck`: route generation and TypeScript pass.
- `npm run test`: 15 files, 45 tests pass. Includes new page-level regression cases for a resolved paid-session query and an empty async query; Stripe is mocked, not charged.
- `npm run build`: Next.js 16.3.8 Turbopack production build passes, all routes generated.
- `npm run test:e2e`: 10 Chromium tests pass against `next start`, including mobile navigation accessibility, public offer copy, contact validation, blog empty state, missing Stripe checkout, and confirmation without alumni pricing.

Rendered screenshots were inspected for homepage, contact default and failed submission, blog empty state, workshop default and checkout error, and confirmation with an unverified query. No browser runtime errors were reported. Contact labels and service choices remain intact; the $1,200 alumni CTA stays hidden without verified payment.

Checks used placeholder Supabase values and disabled write, notification, rate-limit, and Stripe credentials. Contact's graceful failure was exercised without inserting a lead. No live payment, real published-blog database read, production write, or deployment was performed. Paid alumni confirmation is covered by mocked page/component and eligibility tests, not a live Stripe transaction.

For future verification, build first and run `next start` on port 3000 before `npm run test:e2e` to exercise the production bundle locally. CI already uses this flow. Production rollout remains a separate authorized delivery step.
