## Implementation-ready public website copy plan

I inspected the current public pages/components and verified that `docs/asllc-delivery-playbook.md` in the workspace is identical to commit `98d05f5` (`git diff --exit-code 98d05f5 -- docs/asllc-delivery-playbook.md` is clean). No website files were edited.

### Core correction

The conflict is site-wide, not limited to one Services sentence. The current Hero, Services, Process, metadata, Contact page, and Success page collectively present AI Jumpstart as “the first build.” The revised journey should be:

**workflow no longer fits current tools → map the work and establish evidence → compare simplify / buy / automate / build → deliver a decision-ready Implementation Brief → separately scope implementation only when justified**

Keep the current homepage section order (`Header → Hero → Stats → Services → Process → Why Arturo → BlogTeaser → Footer`). Do not add a service-detail page in this pass. Expand the Services cards enough to define the two engagements clearly; that is the smallest coherent IA change.

---

# 1. Inventory of affected files and sections

## Must change

1. **`components/Hero.tsx` — positioning, promise, CTA support line**
   - Current: “Working AI. In your business,” “I build the first useful AI system,” and “Delivered as a working workflow.”
   - Problem: leads directly to implementation and implies the first engagement produces a running system.
   - Change: install the agreed operation/tools positioning and explain that the first job is choosing the right intervention, not assuming AI or custom software.

2. **`components/Services.tsx` — section intro, both service cards, CTA**
   - Current direct contradiction: Jumpstart says “I build the first running version,” “A real handoff, not a PDF”; section says both engagements are “delivered as working systems … on day one.”
   - Current Custom Build also depends on the false premise “When the first workflow proves value, we expand.”
   - Change: explicitly separate a seven-business-day assessment ending in an Implementation Brief from a later, separately scoped implementation engagement. This component needs slightly richer card structure than one description plus three generic bullets.

3. **`components/Process.tsx` — homepage process model**
   - Current: map → “Build until it runs” → expand.
   - Problem: collapses assessment and implementation into one automatic funnel.
   - Change: map the work → choose the path → implement separately when justified.

4. **`app/layout.tsx` — default, OpenGraph, and Twitter metadata**
   - Current: “I build working AI systems … not decks, not demos.”
   - Problem: external previews repeat the same Jumpstart/build conflation and disparage the actual brief deliverable.
   - Change all title/description variants together.

5. **`app/contact/page.tsx` — metadata, opening paragraph, first-message guidance**
   - Current: “help find the right first build — usually an AI Jumpstart.”
   - Problem: explicitly calls Jumpstart a build.
   - Change: ask for the latest concrete workflow failure and explain that Arturo will assess fit for Jumpstart, an already-supported next step, or separately scoped implementation.

6. **`components/ContactForm.tsx` — service labels, message prompt, possibly submit label**
   - Keep backend values exactly unchanged: `ai-jumpstart`, `custom-ai-build`, `not-sure`.
   - Change visible labels so the distinction is evident at conversion: assessment/brief versus scoped implementation.

7. **`app/success/page.tsx` — post-submit expectation**
   - Current: submitted detail “helps us scope the first build faster.”
   - Problem: implies implementation is assumed.
   - Change: explain that the detail helps validate the workflow and determine the right next step.

8. **`components/Footer.tsx` — global positioning sentence**
   - Current repeats “Working AI, built into your business.”
   - Change to the operation/tools positioning in a shortened global form.

9. **`e2e/homepage.spec.ts` and `e2e/contact.spec.ts` — copy contract**
   - Homepage test currently requires “Working AI / In your business.”
   - Update to assert the new H1 and, critically, visible Jumpstart timing/deliverable/no-implementation boundary plus distinct Custom Build language.
   - Contact test should assert the qualified service labels while leaving form behavior intact.

## Align in the same pass

10. **`components/WhyArturo.tsx` — founder rationale**
    - Current is almost entirely “design, build, and ship.”
    - Keep founder-led builder credibility, but add the judgment not to build when simpler process or existing software is the better answer.

11. **`components/Stats.tsx` — proof framing**
    - Preserve the required hybrid proof model and subordinate client logos.
    - Audit “Ops systems that run daily” and all shipped/live wording against evidence. “Daily” should be removed unless specifically documented. Do not imply client outcomes from logos, product existence, or usage.

12. **`app/blog/page.tsx` — metadata and zero-post copy**
    - Low priority, but change “build log” framing to include workflow mapping, solution choices, feasibility, and practical implementation—not only AI builds.

13. **`components/Header.tsx` — CTA consistency**
    - “Bring me a bottleneck” is compatible and can remain. If CTA language is standardized, use “Talk through the workflow” on desktop while retaining the accessible mobile “Contact” label. No navigation/anchor changes are needed.

## Review only; likely no substantive change

14. **`app/terms-of-service/page.tsx`**
    - Existing language correctly says content is not a binding offer and disclaims guaranteed outcomes. Keep it. Optionally clarify that services include workflow assessment and separately contracted implementation, subject to legal review.

15. **`app/privacy-policy/page.tsx`**
    - Existing service-interest categories remain accurate. Because form values do not change, no data-contract update is needed. Only update prose if visible service names are expanded.

16. **`app/page.tsx`**
    - No direct copy and no composition change recommended.

---

# 2. Recommended information architecture and messaging hierarchy

## Site-level hierarchy

1. **Problem/positioning:** the operation has outgrown its current tools.
2. **Method:** reconstruct the work, identify the real constraint, and compare all credible paths.
3. **Proof:** practical product/workflow/client context, carefully labeled by evidence level.
4. **Engagement choice:**
   - AI Jumpstart = assessment and decision.
   - Custom AI Build = separately scoped implementation after justification.
5. **Process:** map → decide → implement only if justified.
6. **Founder reason:** one accountable operator who can assess and build, without treating custom software as the default.
7. **Low-friction CTA:** describe the stuck workflow; no polished AI idea required.

## Services section hierarchy

The two services should not share one generic promise. Give each card explicit labeled blocks:

### AI Jumpstart
- **Best fit**
- **What happens**
- **What you receive**
- **Decision paths**
- **Timing**
- **Boundary**
- Optional price only after confirmation

### Custom AI Build
- **Entry condition**
- **Scope and acceptance**
- **Feasibility**
- **Build and representative-data testing**
- **UAT and release approval**
- **Deployment / documentation / training**
- **Post-launch support**
- Optional starting floor only after confirmation

This can still be implemented in the existing two-column section; use short subheads and compact lists rather than adding a new page.

---

# 3. Proposed replacement copy blocks

## `components/Hero.tsx`

**Eyebrow**
> Arturo Solo LLC · Workflow and AI systems

**H1 (use the agreed positioning verbatim)**
> When your operation no longer fits the tools you have, I turn the workflow into a system that does.

**Primary support**
> I map how the work actually moves, identify the real constraint, and determine what should change before asking you to fund more software.

**Secondary support**
> The right answer may be a simpler process, existing software, automation, a focused use of AI, or a custom build.

**CTA**
> Bring me the bottleneck

**CTA support line**
> Start with the workflow, not a predetermined tool.

This keeps the blunt homepage tone while removing the implied production deliverable.

## `components/Stats.tsx`

**Heading**
> Built work. Real operating context.

**Support**
> The proof is practical: public products, internal workflows, real client contexts, and AI work clearly labeled when it is still in development—not inflated into outcome claims.

**Proof item revisions**
- `Public products` / `Shipped and available` — retain only if each referenced product is verifiably public.
- `Internal workflows` / `Operational tools and processes` — replaces unsupported “run daily.”
- `Real client contexts` / `Lean teams and consequential workflows`.
- `AI work in development` / `In progress, clearly labeled`.

Keep “Client contexts” above the logos; do not use “trusted by,” and do not attach outcome language to the logo strip.

## `components/Services.tsx`

**Section heading**
> Start with the decision. Build only when it earns its way in.

**Section intro**
> Two distinct engagements: AI Jumpstart establishes what should change and why. Custom AI Build implements a separately approved scope when the evidence supports it.

### AI Jumpstart card

**Description**
> A seven-business-day assessment for a consequential workflow that no longer fits the tools around it. It ends with a decision-ready Implementation Brief—not a prototype or production build.

**Best fit**
> You have a decision owner, a process owner, and a representative workflow or artifacts to review. You are open to simplify, buy, automate, build, investigate, or defer as valid outcomes.

**What happens**
> I review the evidence, walk through one representative case, map the current workflow and durable records, identify the real constraint, and compare credible solution paths against the same requirements.

**What you receive**
> An Implementation Brief with the recommended path, current-state workflow, evidence and unknowns, reasons the other paths were rejected, the smallest valuable boundary, measurement plan, risks and ownership needs, and conditional budget/timeline assumptions where supportable.

**Decision paths (short line or pills)**
> Simplify · Buy · Automate · Build · Investigate · Defer

**Timing**
> Seven business days, ending with a findings and decision review.

**Boundary (must be visually explicit, not tooltip/fine print)**
> No production implementation, working integration, data migration, or custom prototype is included. Any prototype or implementation is authorized and priced separately.

**CTA**
> See if Jumpstart fits

**[PRICE CONFIRMATION REQUIRED — omit the entire line unless Arturo approves]**
> AI Jumpstart — $1,500 fixed fee. The fee covers the assessment and Implementation Brief; implementation is separate and the fee is not automatically a deposit on a future build.

### Custom AI Build card

**Description**
> A separately scoped implementation engagement for a workflow where assessment has justified custom software and the client is ready to own acceptance, data, adoption, and ongoing operation.

**Scope and acceptance**
> We agree on the smallest valuable boundary, must-haves, exclusions, normal and exception examples, acceptance criteria, client owners, and release approver before implementation begins.

**Feasibility first**
> If success depends on an uncertain device, platform, API, account, integration, or data behavior, we test that assumption under representative conditions before committing to the architecture. A feasibility prototype is separately scoped learning work, not production software.

**Implementation and testing**
> I implement the approved scope and test normal, exception, fallback, integration, and data behavior using representative accounts, environments, and data where available.

**UAT and launch**
> Representative users complete client UAT against the acceptance criteria. The client approves release; deployment, account setup, documentation, and training are included only as stated in the approved scope.

**Post-launch**
> Initial support, defect handling, outcome review, and ongoing maintenance are defined before launch rather than assumed afterward.

**CTA**
> Discuss a scoped build

**[PRICE CONFIRMATION REQUIRED — omit the entire line unless Arturo approves]**
> Custom AI Builds start at $5,000. Each build is scoped and quoted separately; unresolved feasibility may require a separately priced prototype first.

Do not state or imply that every Jumpstart leads to Custom Build.

## `components/Process.tsx`

**Heading**
> Map the work. Choose the path. Build only what is justified.

**01 — Reconstruct the workflow**
> Walk one representative case from trigger to completed state. Identify the people, records, systems, handoffs, exceptions, workarounds, and the source that wins when records disagree.

**02 — Find the real constraint**
> Separate the requested feature from the operational problem. Compare simpler process, existing software, automation, AI, and custom software against the same must-haves and evidence.

**03 — Act on the decision**
> Simplify, buy, automate, investigate, defer—or separately scope a build with clear acceptance criteria, feasibility gates, ownership, and a measurable boundary.

This makes the public process describe Jumpstart while still creating a clear bridge to Custom Build.

## `components/WhyArturo.tsx`

**Heading**
> Builder’s judgment. Operator’s discipline.

**Body**
> I can map the operation, test the hard assumptions, and build the software myself. That does not mean custom software is always the answer. You get one accountable partner who can recommend the lower-complexity path when it fits—and carry a justified build through implementation when it does not.

**Bullets**
- Hands-on workflow assessment and implementation
- Evidence and tradeoffs in plain language
- No predetermined AI or custom-build pitch

## `components/Footer.tsx`

> When the operation no longer fits the tools, start with the workflow. Assessment and separately scoped implementation for small businesses and lean teams.

## `app/layout.tsx`

**Default title**
> Arturo Solo LLC — Workflow assessment and custom AI builds

**Default description**
> When your operation no longer fits the tools you have, Arturo Solo maps the workflow, compares the options, and scopes the right next step.

Use the same truthful description for OpenGraph and Twitter. Retain keywords such as AI Jumpstart, workflow assessment, process automation, custom software, and custom AI; remove “working AI” as the primary positioning keyword if it no longer appears in visible copy.

## `app/contact/page.tsx`

**Metadata description**
> Tell me where the work gets stuck. We’ll determine whether the next step is a simpler process, existing software, automation, an AI Jumpstart, or a separately scoped build.

**H1**
> Tell me where the work gets stuck.

**Opening**
> You do not need a polished AI idea or a feature list. Send the latest concrete example of the workflow breaking down—the handoff, record, report, reconciliation, or follow-up that keeps failing. I’ll reply personally and help determine the right next step.

**Guidance heading**
> A useful first message covers

**Guidance bullets/examples**
- What happened in the latest concrete example?
- Who does the work, and which tools or records are involved?
- What have you already tried, and what still does not fit?

**Form-card heading**
> Start with the workflow

## `components/ContactForm.tsx`

Keep submitted values unchanged; change visible option labels only:
- `AI Jumpstart — assessment + Implementation Brief`
- `Custom AI Build — scoped implementation`
- `Not sure — help me choose the next step`

**Message label**
> Where does the workflow break down?

**Submit**
> Send the workflow

“Send the bottleneck” can remain if brand continuity is preferred; neither option makes a delivery promise.

## `app/success/page.tsx`

Keep the warm acknowledgement and one-business-day response expectation if Arturo still supports it.

**Replace final paragraph**
> While you wait, think of one recent case: what started the work, who touched it, which record or tool mattered, and where it broke down. That helps me validate the workflow and suggest the right next step—not assume a build before the evidence supports one.

## `app/blog/page.tsx`

**Metadata**
> Notes on workflow assessment, solution choices, practical automation, AI feasibility, and custom implementation for lean teams.

**Empty-state body**
> I’m writing about how to map operational work, compare simpler process, software, automation, AI, and custom builds, and test what matters before scaling it.

---

# 4. Claims and terminology to remove or avoid

## Remove from current copy
- “I build the first running version” for Jumpstart.
- “both delivered as working systems … on day one.”
- “A real handoff, not a PDF.” The deliverable is a substantial Implementation Brief; do not disparage it as “a PDF.”
- “Build until it runs” as the universal second step.
- “right first build—usually an AI Jumpstart.”
- “scope the first build faster” after every contact submission.
- “When the first workflow proves value, we expand” unless referring to measured evidence from a separate implementation.
- “Built on what already works” where no working implementation exists yet.
- “Shipped into daily operations” and “Ops systems that run daily” unless documented.
- “not decks, not demos” where it creates the false contrast that Jumpstart delivers software.

## Use consistently
- **AI Jumpstart:** assessment, seven business days, Implementation Brief, decision review.
- **Implementation Brief:** capitalize as the named deliverable; do not call it merely a report.
- **Solution paths:** simplify / buy / automate / build; investigate / defer when evidence is insufficient.
- **AI:** a technique within automate or build, not the assumed solution or a fifth path.
- **Custom AI Build:** separately scoped implementation engagement.
- **Feasibility prototype:** separately authorized, time-boxed learning work with pass/fail criteria; never production software by implication.
- **Acceptance:** client-owned UAT and release approval, with representative users/data/environment.

## Avoid unsupported claims
- Fixed hours saved, guaranteed ROI, standard percentage improvements, or universal time/cost reductions.
- “Proven value,” “transformed,” “optimized,” or “eliminated” without outcome-level evidence.
- Treating demand, adoption, usage, successful output, and business outcome as interchangeable.
- Treating a shipped product, code, prototype, presentation use, or client logo as proof of a business outcome.
- Unverified “launched,” “live,” “production,” “daily,” “secure,” “compliant,” “governed,” or “privacy-safe” claims.
- Legal/compliance determinations by ASLLC. Public copy may say ownership and requirements are identified; it should not promise compliance certification.
- Unconditional fixed build quotes while critical feasibility or ownership questions remain unresolved.
- Language implying the Jumpstart fee is credited toward or deposits against a future build.

---

# 5. Sequencing and validation checklist

## Recommended implementation sequence

1. **Confirm decisions before editing**
   - Arturo approves the exact hero positioning.
   - Arturo decides whether to publish `$1,500` Jumpstart pricing.
   - Arturo decides whether to publish the `$5,000` Custom Build starting floor.
   - If either is unconfirmed, omit it completely—do not publish “tentative,” “expected,” or placeholder pricing.
   - Confirm the one-business-day reply expectation remains operationally reliable.

2. **Install the source-of-truth message**
   - Update Hero and all metadata first.
   - Freeze the terminology list above so every later section uses the same service definitions.

3. **Separate the engagements**
   - Restructure Services copy into explicit labeled blocks.
   - Make seven-business-day timing, Implementation Brief, and the no-production-implementation boundary visible without hover, accordion, or fine print.
   - Preserve the two-service invariant: AI Jumpstart and Custom AI Build only.

4. **Correct the journey**
   - Replace Process with map → decide → separately implement.
   - Align Why Arturo and Footer with assessment-plus-builder positioning.

5. **Correct conversion expectations**
   - Update Contact metadata/body/form labels and Success copy.
   - Preserve service enum values and server action/database contracts.

6. **Audit proof and secondary surfaces**
   - Validate each Stats claim and client logo permission/status.
   - Remove unsupported frequency/outcome language.
   - Align Blog empty-state copy.
   - Review Terms and Privacy for terminology consistency without broad legal rewrites.

7. **Update tests and validate**
   - Change stale text assertions.
   - Add regression assertions for:
     - new hero H1;
     - “seven business days”;
     - “Implementation Brief”;
     - explicit no production implementation boundary;
     - Custom AI Build being separately scoped;
     - distinct contact service labels.

## Content QA

- [ ] A visitor can explain in one sentence that Jumpstart is an assessment, not a build.
- [ ] “Implementation Brief” is named and its decision content is concrete.
- [ ] All six possible assessment outcomes appear: simplify, buy, automate, build, investigate, defer.
- [ ] Seven-business-day timing is attached only to Jumpstart.
- [ ] No prototype, integration, migration, or production implementation is implied as included in Jumpstart.
- [ ] Custom Build starts only after evidence/assessment justifies it; it is not an automatic upsell.
- [ ] Custom Build copy covers scope/acceptance, feasibility, representative-data testing, UAT, client release approval, deployment/docs/training, and support.
- [ ] AI is presented as one technique, not the default answer.
- [ ] No unsupported outcome, ROI, savings, launch, security, compliance, privacy, governance, or usage claim remains.
- [ ] Proof language distinguishes shipped work, development status, usage, and outcomes.
- [ ] Pricing is absent unless Arturo explicitly confirms it.

## Technical/UX QA

- [ ] Existing homepage order, section IDs, header anchors, and routes still work.
- [ ] Contact service values remain `ai-jumpstart`, `custom-ai-build`, and `not-sure`.
- [ ] Longer Services copy remains readable at mobile, tablet, and desktop widths; no clipped cards or excessive animation delay.
- [ ] Heading hierarchy remains valid and CTA labels have clear accessible names.
- [ ] Metadata title/description render correctly in generated output and social previews.
- [ ] Search the public source for stale/conflicting phrases: `first running`, `first build`, `working system`, `day one`, `build until`, `proves value`, `run daily`, `not a PDF`, `not decks`, `ROI`, `%`, `guarantee`, `compliant`, `governance`.
- [ ] Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run test:e2e` after implementation.

