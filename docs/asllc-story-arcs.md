# Client story arcs for website

Owner-approved teaching arcs for homepage Stats (plan U2). Site copy may be lightly polished for tone; facts should not drift.

## DMDL

1. **What looked true:** External service providers were required to scan a printed QR code that connected to a Google Form and complete it upon arrival *and* departure to/from a site visit. The proposed solution was for the code to connect to a DMDL-hosted form and when the provider left the school site geolocation would trigger a “completed” hidden form field, instead of the provider needing to complete the form a second time.
2. **What discovery found:** The field team needed a better check-in system: capture visits on phones, sync to the office, and record a provider’s sessions. The obvious next step looked like shipping a PWA for mobile and web portal features as soon as possible.
3. **Path that followed:** PWA + portal supported ~40 provider and office team members, but we learned that because iOS browsers do not support background location, users reported bugs based on the expectation that the PWA would act more like a native app.
4. **Status notes:** We scrapped the PWA and used Expo/React Native to rebuild the mobile experience into native iPhone and Android apps. (Also: published—admin/staff on portal + native apps; external workforce on native phone app. Owner updated the public status from beta to published on 2026-11-25.)
5. **Optional implication:** On mobile, users have more confidence in native phone apps than they do from a PWA, regardless of its performance.

## Joy for Books

Owner restated the public beats on 2026-11-25 from this project description. Status moved from in development to beta.

> Joy for Books needed a coordinated way to manage its book catalog, track physical inventory, and fulfill school requests without losing visibility into copies already promised. Combinotion delivers a centralized operations application for titles, auditable inventory movements, school reservations, visits, and intake, with authenticated staff access and a public school-request workflow. The solution gives staff a shared operational record of books on hand, reserved, and donated, supporting accountable distribution and clearer planning for school visits.

1. **What looked true:** Catalog, physical inventory, and school requests were tracked apart from each other. Copies already promised to a school could disappear from view before staff knew they were gone.
2. **What discovery found:** The missing piece was one shared record: which books are on hand, which are reserved, and which were donated. Without that, fulfillment and school visits could not stay accountable.
3. **Path that followed:** A staff operations app covers titles, auditable inventory movements, school reservations, visits, and intake, plus a public school-request workflow. Authenticated staff share one operational record instead of separate lists. The product name Combinotion stays in the source note above and is not used on the public card.
4. **Status notes:** Beta. Staff can work from a shared record of books on hand, reserved, and donated.
5. **Optional implication:** Name the record the work depends on before you split it across tools. If promised copies can drop out of view, staff cannot plan visits or account for what went out.
