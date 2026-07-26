# Client story arcs for website

Owner-approved teaching arcs for homepage Stats (plan U2). Site copy may be lightly polished for tone; facts should not drift.

## DMDL

1. **What looked true:** External service providers were required to scan a printed QR code that connected to a Google Form and complete it upon arrival *and* departure to/from a site visit. The proposed solution was for the code to connect to a DMDL-hosted form and when the provider left the school site geolocation would trigger a “completed” hidden form field, instead of the provider needing to complete the form a second time.
2. **What discovery found:** The field team needed a better check-in system: capture visits on phones, sync to the office, and record a provider’s sessions. The obvious next step looked like shipping a PWA for mobile and web portal features as soon as possible.
3. **Path that followed:** PWA + portal supported ~40 provider and office team members, but we learned that because iOS browsers do not support background location, users reported bugs based on the expectation that the PWA would act more like a native app.
4. **Status notes:** We scrapped the PWA and used Expo/React Native to rebuild the mobile experience into native iPhone and Android apps. (Also: beta with admin/staff on portal + native apps; external workforce on native phone app.)
5. **Optional implication:** On mobile, users have more confidence in native phone apps than they do from a PWA, regardless of its performance.

## Joy for Books

1. **What looked true:** A custom CRM-type app needed to use a school event as its “center”—the central point where all other business units (a book title’s inventory, distributors, and reviews) connected.
2. **What discovery found:** It was the organization’s book inventory that was the central element. Without books, no other unit would exist.
3. **Path that followed:** A web application framework was built based on what looked true; enough to be testable by the client. It was quickly determined after further discovery that the inventory should be the focus. AI helped revise the requirements document, and rebuilding the app started from that center.
4. **Status notes:** Active development / in development.
5. **Optional implication:** Center the workflow on what actually holds the work together—not the first object that looks central.
