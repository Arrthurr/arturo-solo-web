# Public website copy update plan

**Status:** Approved and implementation-ready

**Scope:** Public website copy, supporting metadata, and copy-contract tests

**Primary correction:** Present the first engagement as a workflow assessment and decision—not as a small implementation

## Approved decisions

- Rename **AI Jumpstart** to **Workflow Assessment** in all visitor-facing copy.
- Retain **Custom AI Build** as the implementation service name for this pass.
- Permit direct entry to Custom AI Build when equivalent prior assessment and evidence already exist; a client does not have to purchase Arturo's Workflow Assessment first.
- Price Workflow Assessment at **$1,500 fixed fee** and publish that price.
- Do not publish a Custom AI Build starting price until it is separately approved.
- Keep the one-business-day response expectation.
- Define the best-fit audience as **small organizations where owners or operations leaders are directly accessible and close to the work**.
- Use **DMDL** and **Joy for Books** as the only approved named client contexts in this pass.
- Do not use Texas Head Start Association publicly; it was a proprietary project.
- Omit HG Jones Associates from public proof unless separately approved later.
- Start the seven-business-day delivery clock only after payment and kickoff are complete, the decision owner and workflow lead are identified, and the agreed representative materials are available.
- Keep stable backend service values (`ai-jumpstart`, `custom-ai-build`, `not-sure`) unless a separate data migration is intentionally approved. The legacy `ai-jumpstart` value becomes the internal identifier for visitor-facing **Workflow Assessment** submissions.

## Core correction

The current Hero, Services, Process, metadata, Contact page, and Success page collectively present the first engagement as “the first build.” The revised journey is:

**work no longer fits current tools → reconstruct the workflow and establish evidence → compare simplify / buy / automate / build → deliver a decision-ready Implementation Brief → separately scope implementation only when justified**

AI is a technique under automate or build, not the premise of the assessment or a fifth solution path.

Keep the homepage section order:

`Header → Hero → Stats → Services → Process → WhyArturo → BlogTeaser → Footer`

Do not add a service-detail page in this pass. Keep the Services cards concise enough for a homepage while making the timing, deliverable, price, entry conditions, and implementation boundary explicit.

---

# 1. Audience, offer, and buying path

## Best-fit audience

Use this public-facing definition:

> Small organizations where the people making operational decisions are close to the work.

Use this fuller definition internally when qualifying prospects:

> Small organizations with direct access to an owner or operations leader, a consequential workflow that no longer fits the current tools, and enough operational access to examine a representative case.

Organization size matters because it usually creates shorter decision paths, accessible evidence, and accountable ownership—not because a company officer title is mandatory.

## Service relationship

The two services are distinct, not an automatic funnel:

1. **Workflow Assessment** determines what should change and why.
2. **Custom AI Build** implements a separately approved scope when custom software or AI is justified.

Most unresolved workflow problems should begin with Workflow Assessment. A prospect may discuss Custom AI Build directly when equivalent prior work has already established the problem, evidence, implementation boundary, and reason custom software is appropriate.

Do not imply that every assessment leads to a build or that Arturo's assessment is the only valid route into implementation.

## Readiness gate

Qualify readiness by authority, operational knowledge, and access—not executive title. Before the seven-business-day clock begins, require:

1. **An empowered decision owner** who can approve process or tool changes, resolve tradeoffs, authorize access, and act on the recommendation.
2. **A workflow owner or knowledgeable operator** who can explain normal work, exceptions, records, tools, handoffs, and workarounds.
3. **One representative recent case** that can be traced from trigger to completion or failure through artifacts, redacted records, screenshots, or a live walkthrough.
4. **Openness to every valid outcome:** simplify, buy, automate, build, investigate, or defer.
5. **Payment, kickoff, role confirmation, and agreed materials complete.**

One person may fill both owner roles. A company officer alone is insufficient when that person cannot explain the actual day-to-day workflow.

Use this public expectation rather than placing the full qualification checklist on the homepage:

> Best for a consequential workflow with an accessible decision maker, someone who knows the day-to-day work, and a recent example we can examine.

Use the full gate during the fit call and onboarding. Do not add more required contact-form fields in this pass.

Use this timing language wherever start conditions need to be explained:

> The seven-business-day assessment begins once payment and kickoff are complete, the decision owner and workflow lead are identified, and the agreed representative materials are available.

---

# 2. Messaging hierarchy

Apply this order across the homepage:

1. **Recognition:** the work and tools no longer fit each other.
2. **Point of view:** do not begin with AI or a requested feature.
3. **Method:** reconstruct the workflow and compare credible paths.
4. **Proof:** show specific work, accurately labeled by evidence level.
5. **Offer:** Workflow Assessment produces the decision; Custom AI Build implements a justified scope.
6. **Founder advantage:** one accountable person capable of both judgment and implementation.
7. **CTA:** bring a recent example of the workflow breaking down.

## CTA system

Use each CTA according to its intent:

- **Header/global:** `Talk through the workflow`
- **Hero:** `Bring me the bottleneck`
- **Workflow Assessment:** `See if the assessment fits`
- **Custom AI Build:** `Discuss a scoped build`
- **Contact submit:** `Send the workflow`

The accessible mobile navigation label may remain `Contact`.

---

# 3. Affected files

## Must change

1. **`components/Hero.tsx`**
   - Replace the implementation-first promise with the approved workflow-first position.
   - Keep the blunt, kinetic homepage tone.

2. **`components/Services.tsx`**
   - Rename AI Jumpstart to Workflow Assessment.
   - Separate assessment from implementation without reproducing the full delivery playbook.
   - Show seven-business-day timing, the Implementation Brief, the `$1,500` fixed fee, all six possible decisions, and the no-implementation boundary.
   - Explain that Custom AI Build accepts equivalent prior assessment and is not an automatic next step.

3. **`components/Process.tsx`**
   - Replace map → build → expand with reconstruct → compare → act on the decision.

4. **`components/Stats.tsx`**
   - Replace generic proof categories with specific, supportable evidence where available.
   - Use only DMDL and Joy for Books as named client contexts.
   - Remove HG Jones Associates and do not add Texas Head Start Association.
   - Do not imply outcomes from logos, shipped code, development status, or usage.

5. **`components/WhyArturo.tsx`**
   - Keep builder credibility while adding the judgment not to build when a lower-complexity path fits.

6. **`components/Header.tsx` and `components/Footer.tsx`**
   - Align global positioning and CTA language with the workflow-first message.

7. **`app/layout.tsx`**
   - Update default, OpenGraph, and Twitter metadata together.
   - Replace AI Jumpstart keywords with Workflow Assessment terminology while retaining relevant automation, custom software, and custom AI terms.

8. **`app/contact/page.tsx` and `components/ContactForm.tsx`**
   - Ask for a recent workflow failure rather than an AI idea or “first build.”
   - Update visitor-facing service labels while preserving backend values.
   - Keep the page warm and low-friction; readiness screening happens after initial contact.

9. **`app/success/page.tsx`**
   - Preserve the one-business-day reply expectation.
   - Explain that the submitted detail helps validate the workflow and determine the next step rather than scope an assumed build.

10. **`e2e/homepage.spec.ts` and `e2e/contact.spec.ts`**
    - Replace stale copy assertions and add the copy-contract assertions listed below.

11. **`AGENTS.md`**
    - Update the service-name invariant from AI Jumpstart to Workflow Assessment so project guidance matches the approved public offer.
    - Preserve the two-service invariant and stable backend form values.

## Align in the same pass

- **`app/blog/page.tsx`** — include workflow mapping, solution choices, feasibility, automation, and practical implementation in metadata and empty-state copy.
- **`app/privacy-policy/page.tsx`** — update visible service terminology if present; do not change the data contract merely because the label changed.
- **`app/terms-of-service/page.tsx`** — review terminology only; avoid broad legal rewrites.

## No composition change

- **`app/page.tsx`** — preserve section order and composition.

---

# 4. Approved replacement copy

## `components/Hero.tsx`

**Eyebrow**

> Arturo Solo LLC · Workflow and AI systems

**H1**

> When the work no longer fits the tools, start with the workflow.

**Primary support**

> I reconstruct how the work actually moves, find the real constraint, and determine whether the right next step is to simplify, buy, automate, or build.

**Secondary support**

> The answer may be a simpler process, existing software, focused automation, a justified use of AI, or a custom system.

**CTA**

> Bring me the bottleneck

**CTA support**

> Start with a recent example—not a predetermined tool.

## `components/Stats.tsx`

**Heading**

> Built work. Real operating context.

**Support**

> The proof is practical: public products, operational workflows, and client work described at the level the evidence supports—not inflated into outcome claims.

Before implementation, inventory the exact public artifacts, links, screenshots, implementation state, and measured facts available for DMDL and Joy for Books. Write proof items from that inventory. Do not invent generic outcome language to fill the section.

Rules:

- DMDL and Joy for Books are approved named contexts.
- Texas Head Start Association must not appear publicly.
- HG Jones Associates must be removed unless separately approved.
- Use `Client contexts`, never `Trusted by`.
- Distinguish shipped work, development state, adoption, usage, and business outcomes.
- Remove `daily`, `live`, `production`, and outcome language unless the specific claim is documented.

## `components/Services.tsx`

**Section heading**

> Start with the decision. Build only when it earns its way in.

**Section intro**

> Two distinct engagements: Workflow Assessment establishes what should change and why. Custom AI Build implements a separately approved scope when the evidence supports it.

### Workflow Assessment card

**Tagline**

> A seven-business-day decision on what to change next.

**Description**

> I reconstruct one consequential workflow, identify the real constraint, and compare simpler process, existing software, automation, AI, and custom development.

**What you receive**

> A decision-ready Implementation Brief: the current workflow, the recommended path, the evidence behind it, and the smallest valuable next step—followed by a findings and decision review.

**Decision paths**

> Simplify · Buy · Automate · Build · Investigate · Defer

**Best fit**

> Best for a consequential workflow with an accessible decision maker, someone who knows the day-to-day work, and a recent example we can examine.

**Price and timing**

> $1,500 fixed fee · Seven business days

If space permits, link or place the readiness/start condition adjacent to timing rather than expanding the card with the full onboarding checklist.

**Boundary**

> Workflow Assessment does not include a prototype or production implementation. Those are authorized and priced separately only when justified. The assessment fee is not automatically a deposit on a future build.

**CTA**

> See if the assessment fits

### Custom AI Build card

**Tagline**

> Separately scoped implementation for a validated workflow.

**Description**

> For workflows with a supported need and a clear reason custom software or AI is the right path. That evidence may come from a Workflow Assessment or equivalent discovery already completed by your team.

**How it works**

> We agree on the smallest useful boundary, acceptance criteria, ownership, and any feasibility tests before committing to implementation.

**Delivery**

> Build, representative testing, client acceptance, release, and post-launch responsibilities are defined in the approved scope.

**CTA**

> Discuss a scoped build

Do not publish a Custom AI Build price in this pass. Do not imply that every Workflow Assessment leads to Custom AI Build.

## `components/Process.tsx`

**Heading**

> Map the work. Choose the path. Build only what is justified.

**01 — Reconstruct the workflow**

> Walk one representative case from trigger to completed state. Identify the people, records, systems, handoffs, exceptions, workarounds, and the source that wins when records disagree.

**02 — Find the real constraint**

> Separate the requested feature from the operational problem. Compare simpler process, existing software, automation, AI, and custom software against the same requirements and evidence.

**03 — Act on the decision**

> Simplify, buy, automate, investigate, defer—or separately scope a build with clear acceptance criteria, feasibility gates, ownership, and a measurable boundary.

## `components/WhyArturo.tsx`

**Heading**

> Builder's judgment. Operator's discipline.

**Body**

> I can map the operation, test the hard assumptions, and build the software myself. That does not mean custom software is always the answer. You get one accountable partner who can recommend the lower-complexity path when it fits—and carry a justified build through implementation when it does not.

**Bullets**

- Hands-on workflow assessment and implementation
- Evidence and tradeoffs in plain language
- No predetermined AI or custom-build pitch

## `components/Footer.tsx`

> When the work no longer fits the tools, start with the workflow. Assessment and separately scoped implementation for small organizations where decision makers are close to the work.

## `app/layout.tsx`

**Default title**

> Arturo Solo LLC — Workflow assessment and custom AI builds

**Default/OpenGraph/Twitter description**

> When the work no longer fits the tools, Arturo Solo maps the workflow, compares the options, and scopes the right next step for small organizations.

Suggested keywords:

- workflow assessment
- process automation
- small business operations
- custom software
- custom AI
- Arturo Solo

## `app/contact/page.tsx`

**Metadata description**

> Tell me where the work gets stuck. I will reply within one business day and help determine whether the next step is a simpler process, existing software, automation, assessment, or a separately scoped build.

**H1**

> Tell me where the work gets stuck.

**Opening**

> You do not need a polished AI idea or a feature list. Send the latest concrete example of the workflow breaking down—the handoff, record, report, reconciliation, or follow-up that keeps failing. I'll reply personally within one business day and help determine the right next step.

**Guidance heading**

> A useful first message covers

**Guidance**

- What happened in the latest concrete example?
- Who does the work, and which tools or records are involved?
- What have you already tried, and what still does not fit?

**Form-card heading**

> Start with the workflow

## `components/ContactForm.tsx`

Keep submitted values unchanged; change only visitor-facing labels:

- `ai-jumpstart` → `Workflow Assessment — $1,500 fixed fee`
- `custom-ai-build` → `Custom AI Build — scoped implementation`
- `not-sure` → `Not sure — help me choose the next step`

**Message label**

> Where does the workflow break down?

**Submit**

> Send the workflow

## `app/success/page.tsx`

Keep the warm acknowledgement and one-business-day response expectation.

**Final paragraph**

> While you wait, think of one recent case: what started the work, who touched it, which record or tool mattered, and where it broke down. That helps me validate the workflow and suggest the right next step—not assume a build before the evidence supports one.

## `app/blog/page.tsx`

**Metadata**

> Notes on workflow assessment, solution choices, practical automation, AI feasibility, and custom implementation for small organizations.

**Empty state**

> I'm writing about how to map operational work, compare simpler process, software, automation, AI, and custom builds, and test what matters before scaling it.

---

# 5. Terminology and claim controls

## Use consistently

- **Workflow Assessment:** seven-business-day assessment, `$1,500` fixed fee, Implementation Brief, findings and decision review.
- **Implementation Brief:** capitalize as the named deliverable; do not call it merely a report.
- **Solution paths:** simplify / buy / automate / build; investigate / defer when evidence is insufficient.
- **AI:** a technique within automate or build, not the assumed solution or a separate path.
- **Custom AI Build:** separately scoped implementation supported by Arturo's assessment or equivalent prior evidence.
- **Feasibility prototype:** separately authorized, time-boxed learning work with pass/fail criteria; never production software by implication.
- **Acceptance:** client-owned UAT and release approval using representative users, data, and environments.

## Remove or avoid

- `AI Jumpstart` in visitor-facing copy.
- `I build the first running version` for the assessment.
- `both delivered as working systems ... on day one`.
- `A real handoff, not a PDF`; the named deliverable is an Implementation Brief.
- `Build until it runs` as the universal second step.
- `right first build—usually an AI Jumpstart`.
- `scope the first build faster` after every contact submission.
- `When the first workflow proves value, we expand` unless referring to measured evidence from a separate implementation.
- `Shipped into daily operations` or `Ops systems that run daily` without documented evidence.
- `not decks, not demos` where it falsely contrasts the assessment with its actual brief deliverable.
- Fixed savings, guaranteed ROI, standard percentage improvements, or universal time/cost reductions.
- `proven value`, `transformed`, `optimized`, or `eliminated` without outcome-level evidence.
- Unverified `launched`, `live`, `production`, `daily`, `secure`, `compliant`, `governed`, or `privacy-safe` claims.
- Treating demand, adoption, usage, successful output, and business outcome as interchangeable.
- Treating a shipped product, repository, prototype, presentation, or client logo as proof of a business outcome.
- Legal, privacy, employment, or compliance determinations on a client's behalf.
- Language implying the Workflow Assessment fee is credited toward a future build.

---

# 6. Implementation sequence

1. **Update source-of-truth terminology**
   - Update `AGENTS.md` from AI Jumpstart to Workflow Assessment while preserving the stable backend value.
   - Freeze the terminology above for the rest of the pass.

2. **Install the primary message**
   - Update Hero and metadata together.
   - Verify the shorter H1 wraps cleanly at representative breakpoints.

3. **Separate the services**
   - Implement concise labeled blocks rather than the full delivery-playbook detail.
   - Keep timing, deliverable, price, six decision paths, and implementation boundary visible without hover, accordion, or fine print.
   - Make equivalent prior assessment an explicit Custom AI Build entry path.

4. **Correct the journey and founder rationale**
   - Update Process, Why Arturo, Header, and Footer.

5. **Build proof from evidence**
   - Inventory approved facts and artifacts for DMDL and Joy for Books.
   - Write Stats from that inventory.
   - Remove unapproved names and unsupported frequency/outcome claims.

6. **Align conversion expectations**
   - Update Contact, form labels, and Success.
   - Preserve backend enum values and server/database contracts.

7. **Align secondary surfaces**
   - Update Blog metadata/empty state.
   - Review Terms and Privacy for terminology consistency only.

8. **Update tests and validate**
   - Replace stale assertions.
   - Run the technical checks and comprehension review below.

---

# 7. Validation

## Copy-contract assertions

Add or update tests for:

- the new hero H1;
- `Workflow Assessment` and absence of visitor-facing `AI Jumpstart`;
- `$1,500 fixed fee`;
- `seven business days`;
- `Implementation Brief`;
- all six decision paths;
- explicit no-prototype/no-production-implementation boundary;
- Custom AI Build being separately scoped;
- equivalent prior assessment being a valid implementation entry path;
- distinct contact service labels while submitted values remain unchanged;
- the one-business-day reply expectation;
- absence of Texas Head Start Association and HG Jones Associates from public proof.

## Content QA

- [ ] A visitor can explain that Workflow Assessment is an assessment, not a build.
- [ ] The `$1,500` price, seven-business-day timing, and start conditions are not misleading.
- [ ] The Implementation Brief and its decision value are concrete.
- [ ] Simplify, buy, automate, build, investigate, and defer all appear.
- [ ] No prototype, integration, migration, or production implementation is implied as included.
- [ ] Custom AI Build may follow equivalent prior assessment and is not an automatic upsell.
- [ ] AI is presented as a technique, not the default answer.
- [ ] The audience is small organizations with accessible decision makers close to the work.
- [ ] Named public proof is limited to DMDL and Joy for Books.
- [ ] No unsupported outcome, ROI, savings, launch, security, compliance, privacy, governance, or usage claim remains.

## Five-person comprehension review

Before release, show the homepage to five people who were not involved in writing it and ask:

1. What does Arturo do?
2. What do you receive from Workflow Assessment?
3. Does the assessment include implementation?
4. When would Custom AI Build be appropriate?
5. What would you send Arturo in a first message?

Success criteria:

- At least four of five identify Workflow Assessment as an assessment.
- No participant thinks a working prototype or production implementation is included.
- At least four distinguish the two services.
- At least four understand that AI is evaluated rather than assumed.
- At least four can describe the first contact without needing a polished AI idea.

Revise unclear copy before release if these thresholds are not met.

## Technical/UX QA

- [ ] Existing homepage order, section IDs, header anchors, and routes still work.
- [ ] Contact service values remain `ai-jumpstart`, `custom-ai-build`, and `not-sure`.
- [ ] Services remains readable at mobile, tablet, and desktop widths.
- [ ] Longer content does not clip or create excessive animation delay.
- [ ] Heading hierarchy and accessible CTA names remain valid.
- [ ] Metadata title and description render correctly in generated output and social previews.
- [ ] Search public source for stale/conflicting phrases: `AI Jumpstart`, `first running`, `first build`, `working system`, `day one`, `build until`, `proves value`, `run daily`, `not a PDF`, `not decks`, `ROI`, `%`, `guarantee`, `compliant`, `governance`, `Texas Head Start`, `TXHSA`, `HG Jones`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test`.
- [ ] Run `npm run build`.
- [ ] Run `npm run test:e2e`.
