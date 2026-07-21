# ASLLC Delivery Playbook

**Version:** 0.1  
**Status:** Internal working standard  
**Calibration base:** DMDL, Texas Head Start Association, and Joy for Books  
**Applies to:** AI Jumpstart assessments and Custom AI Build handoffs

## Purpose

AI Jumpstart begins with the work—not the requested feature and not AI.

ASLLC reconstructs the current workflow, identifies the operational failure and durable record involved, compares **simplify / buy / automate / build**, and produces a decision-ready implementation brief. The assessment does not include implementation.

A custom build is recommended only when a lower-complexity option cannot meet documented must-have requirements and the client can own adoption, data, acceptance, and ongoing operation.

Every Jumpstart must answer:

1. What should change?
2. Why should it change?
3. What evidence supports that conclusion?
4. Why were the other paths rejected?
5. What is the smallest valuable boundary?
6. What remains uncertain?
7. What must be measured next?

When evidence is insufficient, reduce commitment—not standards. Recommend a measurement step, vendor validation, feasibility prototype, or narrower boundary instead of turning uncertainty into custom scope.

---

## 1. What the three engagements taught ASLLC

### DMDL

The initial request—help providers follow a school check-in protocol—was not the full problem. Discovery showed that communication was not failing; the workflow duplicated effort and still produced weak attendance evidence. A QR-code prototype preserved the underlying burden, so the solution moved toward location-based check-in.

The PWA then exposed a critical feasibility mistake: iOS could not support the expected hands-free background-location behavior. That led to a native rewrite after field use.

**Rules derived from DMDL:**

- Separate the requested feature from the operational control it is meant to provide.
- Test critical platform behavior on the dominant real device before committing to architecture.
- Require representative users and a client approver for acceptance; the developer cannot be the sole release authority.
- Define manual fallback and override behavior, even when the client prefers full automation.
- Treat adoption, successful check-in/out pairs, and compliance outcomes as different measurements.
- Establish privacy, data, support, and maintenance ownership before production.

### Texas Head Start Association

The initial release was a first-of-its-kind map showing 86 programs. Its value depended on the authority and accuracy of its source data. A congressional-district overlay later gave way to four TDEM-derived regions when the organization's governance model changed.

The map has been used in four presentations. That is observed usage, not yet evidence that it changed a policy or governance decision.

**Rules derived from TXHSA:**

- Identify the decision a data product must support, even when no previous workflow exists.
- Record the authoritative source, validation method, update owner, and expected update frequency for every critical dataset.
- Reassess analytical boundaries when the client's operating or governance model changes.
- Distinguish feature demand, usage, and decision impact.
- Price from the work and risk involved, not from uncertainty about a presumed market rate.

### Joy for Books

The initial request was to connect related Notion databases. Discovery first framed the product around a school-visit event, but partial implementation exposed a more durable operational center: books and inventory. The revised product connects reviews, purchases, suppliers, receipts, reservations, school requests, donations, and visits through an auditable inventory ledger.

The reassessment also removed Squarespace Commerce ingestion as a dependency. Squarespace remains the fundraising storefront; a custom public request page handles school requests.

**Rules derived from Joy for Books:**

- Identify the durable operational record before treating the first data model as final.
- Test normal and exception cases against the proposed operational spine.
- Verify product-plan/API access before making an integration part of the boundary.
- A change to the system of record, public surface, integration model, or core workflow requires a scope, estimate, and measurement reset.
- Future flexibility alone does not justify a custom build.
- Evaluate sector-specific products before concluding that custom is necessary.

### Limits of this evidence

This playbook is grounded in only three engagements. All three involve lean organizations, and none yet provides strong measured business-outcome evidence. Numeric thresholds in this document are marked **provisional** and must be recalibrated as ASLLC completes more assessments and measures post-launch outcomes.

---

## 2. Solution paths

| Path | Definition | Boundary |
| --- | --- | --- |
| **Simplify** | Remove, combine, standardize, or reassign steps, records, approvals, or controls. | No new material software dependency. |
| **Buy** | Adopt an existing product as the primary workflow or system of record. | Configuration and migration are allowed; custom product development is not. |
| **Automate** | Connect or augment existing systems while they remain authoritative. | Includes deterministic automation and narrowly justified AI components. |
| **Build** | Create a custom application that owns durable workflow state, records, or user interaction. | Carries product, security, support, and maintenance responsibility. |

AI is a technique under **automate** or **build**, not a fifth solution category.

An assessment may also conclude **investigate** or **defer** when evidence is insufficient.

---

## 3. Delivery stages and gates

The seven-business-day Jumpstart normally ends at the decision review. A feasibility prototype or Custom Build scoping phase is separately authorized and priced work.

| Gate | Activity | Required exit evidence | Stop or conditional result |
| --- | --- | --- | --- |
| **G0 — Qualify** | Fit call and questionnaire screening | Decision owner, process owner, artifact access, and acceptance of all solution paths | Decline or postpone if the client requires a predetermined build or implementation inside the assessment |
| **G1 — Establish evidence** | Review questionnaire, artifacts, systems, source data, and contradictions | Evidence log; material facts classified; unknowns visible | Do not fill gaps with assumptions |
| **G2 — Reconstruct current state** | Discovery and one representative case walkthrough | Validated workflow map with actors, records, systems, handoffs, failures, workarounds, and source authority | Recommend more discovery if the workflow cannot be validated |
| **G3 — Frame opportunity** | Separate initial ask, root problem, durable record, outcome, and smallest boundary | Problem statement, Value/Readiness scores, and measurement plan | Trigger reassessment if the operational center remains disputed |
| **G4 — Compare paths** | Evaluate simplify, buy, automate, and build against the same requirements | Candidate scorecards, vetoes, uncertainty ranges, and rejection reasons | Build cannot advance until plausible simplify and buy paths are evaluated |
| **G5 — Produce and QA brief** | Write and review the implementation brief | QA passes; unknowns and assumptions explicit | Failed critical checks change the answer to conditional, investigate, or defer |
| **G6 — Decision review** | Review findings with the client | Accept, correct, investigate, defer, or request separate scoping | Preserve client disagreement and corrections in the evidence log |
| **G7 — Prototype or handoff** | Separately scope feasibility work or Custom Build | Prototype gate passes or handoff packet is accepted | A prototype cannot drift into production implementation |

---

## 4. Qualification criteria

### Required fit

Accept a Jumpstart only when all are true:

- There is a consequential workflow or decision surface—not merely a desire to “use AI.”
- A decision owner can approve the recommendation.
- A process owner can explain the work.
- The client will provide representative artifacts or a live walkthrough.
- The client accepts simplify, buy, automate, build, investigate, or defer as legitimate conclusions.
- There is a plausible way to observe improvement, even if a baseline must first be collected.
- The client understands that the Jumpstart does not include implementation.

### Conditional fit

Proceed with an explicit limitation when:

- Only one stakeholder is available. Flag workflow-validation and adoption risk.
- Baseline data does not exist. Include a baseline-collection plan before making outcome claims.
- Sensitive, identity, employee-monitoring, location, or public-submission data is involved. Require a named client data/privacy owner before implementation.
- Critical platform or integration behavior is uncertain. Recommend a separate prototype rather than an unconditional build.

### Decline or postpone

Decline or postpone when the prospect:

- Requires endorsement of a predetermined technology without comparison.
- Cannot provide a decision owner, process owner, representative workflow, or source artifacts.
- Expects ASLLC to make legal, privacy, employment, or compliance decisions on its behalf.
- Expects production implementation or a bypass-ready implementation plan inside the fixed assessment.
- Treats the Jumpstart fee as an automatic deposit on a future build.

---

## 5. Pre-assessment questionnaire

Require concise answers and available attachments before discovery.

1. What did you initially ask ASLLC to help create or change?
2. What goes wrong today if nothing changes? Give the latest concrete example.
3. Who performs the work, who approves it, and who is affected by its failure?
4. Walk through the process from its trigger to its completed state.
5. Which forms, spreadsheets, databases, SaaS products, paper records, and messages are used? Attach examples.
6. Which record is authoritative when systems disagree? Who owns that decision?
7. How often does the workflow occur and at what volume? Identify measured versus estimated figures.
8. Where do people re-enter, reconcile, verify, chase, or correct information? How long does that take?
9. What errors or exceptions occur? How are they detected and corrected?
10. What tools or process changes have already been tried? What specifically failed?
11. Which existing products have been evaluated? Record actual cost, missing requirements, and evidence.
12. What is the smallest result that would be valuable without optional features?
13. Which device, browser, location, network, account, user role, or integration is critical?
14. What data is personal, sensitive, location-based, credentialed, or externally sourced? Who owns access and retention decisions?
15. How would you know the change worked? Give the formula, baseline, target, source, and review period if known.
16. Who will participate in acceptance testing and approve a release?
17. Who will own subscriptions, support, updates, security, and data quality after launch?
18. What deadlines, budget constraints, licenses, contracts, or platform plans constrain the answer?
19. Are you prepared to change the process, or only the software?
20. What must remain outside the first implementation boundary?

---

## 6. Discovery script: 75 minutes

### 0–5 minutes: roles and decision

- What decision must this assessment make?
- Who can approve that decision?
- Who owns the workflow day to day?
- Who else must validate that our description is accurate?

### 5–15 minutes: initial ask versus underlying problem

- What did you first think needed to be built or connected?
- Describe the most recent failure without proposing a solution.
- What consequence did it create?
- If we removed the requested feature, what problem would remain?

### 15–35 minutes: current-state walkthrough

Use one recent, representative case.

- What triggered the work?
- Who acted first?
- What did they read, create, or change?
- Where was the same information entered again?
- What happens when the expected path fails?
- How is the exception detected and corrected?
- Which record wins when two systems disagree?
- What manual check exists because the system is not trusted?
- Where does the process actually end?

### 35–45 minutes: quantify and classify

- How often did this occur in the last representative period?
- How much time does a normal case take? An exception?
- Which figure is measured, estimated, or remembered?
- Can we inspect the source?
- Are any dates, counts, or definitions contradictory?

### 45–55 minutes: alternatives and constraints

- What can be removed or standardized before adding technology?
- What products were actually tested or demonstrated?
- Which exact must-have did each fail?
- Could automation leave the current systems authoritative?
- What future flexibility is essential now rather than merely desirable?
- What platform, license, API, data, or policy constraint changes the answer?

### 55–63 minutes: smallest boundary and feasibility

- Name one user, one trigger, one durable record, one completed state, and one measurable result.
- Which behavior would make the whole solution fail if it did not work?
- On which real device, account, dataset, or environment must it be proven?
- What manual fallback or override is required?

### 63–70 minutes: outcome

- Is this evidence of demand, adoption, usage, successful output, or business outcome?
- What are the numerator and denominator?
- Where will the baseline come from?
- Who reviews the metric, and what decision will it change?

### 70–75 minutes: ownership and delivery

- Who accepts the work?
- Who owns privacy, access, retention, maintenance, subscriptions, and source-data quality?
- What costs or work have historically been omitted or absorbed?
- What would trigger a scope or commercial reset?

---

## 7. Current-state workflow template

Use one row per meaningful step.

| Field | Required content |
| --- | --- |
| Step ID | Stable reference, such as `CS-01` |
| Trigger | Event that starts the step |
| Actor | Person or system performing it |
| Action | Observable action—not desired future behavior |
| Input | Record or data consumed |
| System/location | Paper, form, sheet, app, message, or other location |
| Output/change | Record created or state changed |
| Source authority | What wins when records conflict; named owner |
| Handoff | Next actor/system and method |
| Volume/frequency | Number plus evidence class |
| Normal time | Number plus evidence class |
| Failure/exception | Observed or reported failure |
| Detection | How anyone learns it failed |
| Workaround/control | Re-entry, checking, reconciliation, or override |
| Consequence | Operational, financial, compliance, service, or decision effect |
| Evidence | Observed, client-reported, estimated, anticipated, or unknown |
| Artifact | File, screenshot, source system, or interview note |
| Open question | Unresolved item and owner |

Every workflow map must end with:

1. Workflow boundary: trigger through completed state.
2. Initial ask.
3. Root problem.
4. Durable operational record or spine.
5. Authoritative sources and conflicts.
6. Critical failure path.
7. Smallest valuable boundary.
8. Optional and deferred capabilities.

---

## 8. Evidence standard

### Evidence classes

| Class | Definition | Required notation |
| --- | --- | --- |
| **Observed** | ASLLC inspected an artifact, source record, repository, system behavior, recording, or live workflow | Cite artifact and date; code does not prove a field outcome |
| **Client-reported** | A stakeholder stated the fact, but ASLLC did not independently verify it | Name role and interview date |
| **Estimated** | Derived from stated or observed inputs | Show formula, inputs, range, and assumptions |
| **Anticipated** | A future result, target, planned launch, or untested capability | Use conditional language; never present as achieved |
| **Unknown** | Not established or too contradictory to resolve | State what evidence would resolve it and who owns the action |

### Evidence rules

- Multiple stakeholder statements remain client-reported until corroborated.
- Repository inspection establishes scope or implementation state—not adoption or outcome.
- Feature demand is not adoption or outcome.
- Installation or enrollment is adoption, not successful usage.
- Usage is not an outcome until connected to a changed operational or decision result.
- Estimates must show their denominator and assumptions.
- Anticipated savings cannot appear as achieved ROI.
- Critical technical feasibility requires a representative test.
- Source authority must be known before derived output is called reliable.
- Privacy, retention, and compliance ownership require explicit confirmation; silence is unknown, not consent.
- Contradictory claims remain visible as a **conflict flag** rather than being resolved for convenience.

### Uncertainty in scoring

For estimated, anticipated, disputed, or unknown criteria:

1. Record low, base, and high ratings.
2. Calculate low, base, and high totals.
3. If the winner changes across plausible totals, issue a conditional recommendation.
4. Name the evidence-gathering action that will resolve the decision.
5. Treat an unknown must-have as not passed—not as an average score.

---

## 9. Opportunity scoring

Opportunity value is separate from solution selection. A valuable problem does not imply a custom build.

Report:

> **Value: __/16 · Readiness: __/16 · Evidence: O__ / C__ / E__ / A__ / U__**

Where `O` is observed, `C` client-reported, `E` estimated, `A` anticipated, and `U` unknown.

### Value

Score each dimension from 0–4.

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Consequence | Unknown or immaterial | Recurring local rework, delay, or decision friction | Core service, financial, compliance, governance, or mission consequence |
| Recurrence/exposure | Unknown or isolated | Repeats in a bounded workflow | Frequent or high-volume exposure across a core operation |
| Burden/failure magnitude | Unknown | Measurable work or correctable errors | Severe recurring burden, unreliable control, or material failure |
| Operational leverage | No linked decision | One team or workflow | Durable record links multiple consequential workflows or stakeholders |

### Readiness

| Dimension | 0 | 2 | 4 |
| --- | --- | --- | --- |
| Owner/alignment | No owner | One owner with stakeholder gaps | Decision, process, data, and acceptance roles explicit |
| Workflow/data clarity | Unknown | Partial map or disputed authority | Representative workflow and sources validated |
| Measurement readiness | No metric | Candidate metric without baseline | Formula, source, baseline plan, owner, and review window set |
| Adoption/resources | No commitment | Interest but unclear rollout/support | Representative users, change owner, fallback, and operating resources committed |

### Priority guide — provisional

| Value | Readiness | Action |
| --- | --- | --- |
| 8–16 | 8–16 | Compare solutions and recommend action |
| 8–16 | 0–7 | Collect evidence, prototype, or resolve ownership |
| 0–7 | 8–16 | Consider only a low-cost simplify or buy improvement |
| 0–7 | 0–7 | Defer |

Do not combine Value and Readiness into one score.

---

## 10. Simplify / buy / automate / build rubric

### Candidate generation requirements

Before scoring, document:

#### Simplify

- Can duplicate evidence or data entry be eliminated?
- Can one record become authoritative?
- Can an approval or handoff be removed?
- Can clearer ownership or a standard operating rule solve the failure?

#### Buy

Search at least one relevant horizontal product category and one sector-specific category where one credibly exists. Record up to three credible products, actual pricing basis if available, and whether each meets the top three must-haves.

“Too large,” “too rigid,” or “too expensive” is not sufficient without evidence.

#### Automate

- Which existing system remains authoritative?
- What are the trigger and action?
- Is API, export, credential, and plan access verified?
- What happens on retry, exception, duplicate, or partial failure?
- Would automation create hidden business state that belongs in a product instead?

#### Build

- What durable record will the product own?
- What is its lifecycle and state transition model?
- Why can existing products not meet the must-haves?
- What critical behavior must be proven?
- Who owns acceptance, data/privacy, operations, and maintenance?
- What is the smallest valuable boundary?

### Common scorecard

Score each credible candidate 0–4 against the same criteria.

| Criterion | Weight | Question |
| --- | ---: | --- |
| Outcome fit | 20 | Does it address the root problem and measured result? |
| Workflow/boundary fit | 15 | Does it support the smallest valuable workflow without preserving needless burden? |
| Critical feasibility | 15 | Can it work on the real platform, account, network, and integration environment? |
| Data/source authority | 10 | Are sources, validation, migration, and conflict rules workable? |
| Adoption/operational fit | 10 | Can users follow it, including exceptions and manual fallback? |
| Privacy/security/control | 10 | Are access, monitoring, retention, credentials, and ownership acceptable? |
| Lifecycle ownership | 10 | Can someone own support, subscriptions, API drift, data quality, and maintenance? |
| Economics/time to value | 10 | Are full implementation and operating costs proportionate and sufficiently known? |

Calculate `sum(weight × rating ÷ 4)`.

Rating anchors:

- **0 — Fails:** no credible path.
- **1 — Major gap:** requires an unsupported assumption or unacceptable workaround.
- **2 — Partial:** plausible with a material unresolved gap.
- **3 — Meets:** satisfies the requirement with manageable limitations.
- **4 — Strong:** verified fit with low residual risk or meaningfully better performance.

Mark true non-negotiables as **must-have**. Any candidate with a must-have below 3 is ineligible regardless of total.

### Vetoes on unconditional implementation

Recommend investigate, prototype, or defer when any is true:

- Root problem or workflow boundary remains disputed.
- No success metric and no feasible baseline plan exist.
- Critical source authority is unresolved.
- No client acceptance owner or representative user is available.
- Privacy, data, credential, or compliance ownership is unknown.
- Cost or timing cannot be estimated without resolving a critical uncertainty.

### Additional custom-build vetoes

Do not recommend “proceed to build” when:

- A plausible simplify or buy path was not evaluated.
- The durable operational record is not agreed.
- Critical behavior is untested in a representative environment.
- UAT, operations, or maintenance has no named owner.
- The first boundary combines unrelated workflows mainly for future flexibility.
- The estimate omits discovery, prototype, migration, QA, deployment, subscriptions, support, or contingency.

The brief may state “build is the leading hypothesis, contingent on…” but cannot issue unconditional authorization.

### Selection logic — provisional

1. Eliminate vetoed candidates and candidates that fail a must-have.
2. Require a base score of at least **70/100** for recommendation.
3. When eligible candidates are within **10 points**, choose the lower-complexity path: simplify → buy → automate → build.
4. Override that tie-break only when the more complex path resolves a must-have, scores more than 10 points higher, has no weaker critical evidence, and the client accepts the added ownership.
5. If low/base/high ranges produce different winners, recommend the evidence-gathering action instead.
6. Always include “why not the other paths.”

---

## 11. Reassessment and prototype gates

A prototype is a separately authorized, time-boxed learning engagement. It must state one uncertainty, representative conditions, pass/fail criteria, time/cost cap, artifact disposition, and the decision it will produce.

| Gate | Trigger | Required evidence | Failure response |
| --- | --- | --- | --- |
| **Critical behavior** | Success depends on device, browser, background execution, API, identity, network, or external service | Demonstrate normal and failure behavior on the dominant real platform | Stop architecture commitment; simplify, buy, change platform, or redefine experience |
| **Durable spine** | A product will own state across workflows | Name the record, map lifecycle, and run two normal plus two exception examples through it | Reframe boundary and re-estimate before more implementation |
| **Integration/access** | Recommendation depends on third-party data or APIs | Verify plan entitlement, credentials, limits, export, ownership, and representative payload | Replace integration, retain manual intake, change boundary, or reject candidate |
| **Scope delta** | System of record, public surface, permissions, integration, migration, or core workflow changes—or likely effort rises over 25% | Compare old/new scope, risks, estimate, and measurement plan | Issue a change proposal or stop; the 25% threshold is provisional |
| **UAT/fallback** | Before production release | Named client approver, representative users, acceptance examples, fallback, and defect disposition | Do not self-approve release |
| **Production ownership** | Before live data or public use | Named owners for privacy, retention, credentials, subscriptions, incidents, data quality, and maintenance | Delay production or reduce collected data and scope |

### Prototype template

```text
Decision this prototype must enable:
Critical assumption:
Representative user/device/account/data:
Test procedure:
Pass threshold:
Failure/fallback behavior:
Evidence to capture:
Explicitly excluded production capabilities:
Maximum time/cost:
Decision on pass:
Decision on failure:
Client approver:
```

---

## 12. The Implementation Brief

Do not call the Jumpstart deliverable merely a report.

### Executive decision page

1. **Decision:** simplify / buy / automate / build / investigate / defer.
2. **Problem statement:** “When [trigger], [actor] must [job], but [failure] causes [consequence].”
3. **Evidence strength:** important observed, reported, estimated, anticipated, and unknown facts.
4. **Recommended first action.**
5. **Smallest valuable boundary:** “[User] responds to [trigger] by changing [durable record] until [completed state], measured by [metric].”
6. **Why not the other paths.**
7. **Conditions and gates.**
8. **Budget and timeline range with assumptions—not a build commitment.**

### Supporting sections

1. Assessment scope and participants.
2. Initial request versus underlying problem.
3. Current-state workflow.
4. Source authority and data flow.
5. Failures, exceptions, and workarounds.
6. Opportunity Value/Readiness and evidence mix.
7. Must-have, optional, deferred, and excluded requirements.
8. Solution candidate scorecards.
9. Recommendation and uncertainty range.
10. Smallest valuable boundary.
11. Reassessment or prototype gates.
12. Outcome measurement plan.
13. Commercial assumptions and total-cost categories.
14. Risks, privacy, acceptance, maintenance, and ownership.
15. Decision options and next steps.
16. Evidence log and unresolved conflicts.

---

## 13. QA checklist

Mark each item **Pass / Fail / Not applicable**. A failed critical item prevents an unconditional implementation recommendation.

### Problem and workflow

- [ ] Initial requested feature is separated from the underlying problem. **Critical**
- [ ] One representative current-state case is mapped end to end. **Critical**
- [ ] Duplicate entry, reconciliation, exceptions, and workarounds are shown.
- [ ] Durable record and source authority are identified or explicitly unknown. **Critical**
- [ ] Stakeholder disagreements and chronology conflicts remain visible.

### Evidence

- [ ] Every material claim has an evidence class.
- [ ] Estimates show formulas and assumptions.
- [ ] Anticipated results are not presented as achieved.
- [ ] Demand, adoption, usage, successful output, and outcome are not conflated. **Critical**
- [ ] Code or prototype evidence is not used as field-outcome evidence.

### Decision

- [ ] At least one simplify counterfactual was evaluated.
- [ ] Plausible buy categories were evaluated or absence was documented. **Critical for build**
- [ ] All candidates used the same must-haves and criteria.
- [ ] Vetoes and uncertainty ranges were applied.
- [ ] A build recommendation explains why lower-complexity paths fail.
- [ ] Future flexibility alone is not the build justification.

### Boundary and feasibility

- [ ] Smallest valuable boundary names user, trigger, record, completion, and metric.
- [ ] Optional and deferred items are explicit.
- [ ] Critical platform/integration behavior is verified or assigned a prototype gate. **Critical**
- [ ] Normal, failure, and manual fallback paths are addressed.
- [ ] A changed operational spine triggers reassessment.

### Ownership and delivery

- [ ] Decision, process, source-data, privacy, UAT, and maintenance owners are named. **Critical**
- [ ] The client—not ASLLC alone—owns acceptance. **Critical**
- [ ] Data minimization, retention, access, and credential responsibilities are recorded.
- [ ] Commercial range includes prototype, migration, QA, deployment, subscriptions, contingency, and support where applicable.
- [ ] Assessment is separated from implementation.
- [ ] No unsupported ROI or guaranteed savings appears.

If a critical item fails, change the recommendation to **conditional, investigate, or defer** and name the evidence required.

---

## 14. Review call: 45 minutes

### 0–5 minutes: frame the decision

> The purpose today is to validate the work as described, review the alternatives, and decide whether to accept, correct, investigate, or defer the recommendation. This is not a commitment to hire ASLLC for implementation.

### 5–15 minutes: validate current state

- What is represented incorrectly?
- Which step, record, owner, or exception is missing?
- Which evidence class should change, and what supports it?
- Do the source authorities match how conflicts are actually resolved?

### 15–25 minutes: review alternatives

- Present Value/Readiness.
- Present all eligible paths—not only the winner.
- Explain must-have failures and vetoes.
- Ask whether any rejected path rests on an assumption that can be cheaply tested.

### 25–35 minutes: boundary, gates, and measurement

- Confirm user, trigger, durable record, completed state, and exclusions.
- Confirm prototype and reassessment conditions.
- Confirm metric formula, baseline plan, owner, and review window.
- Ask what would cause ASLLC and the client to stop, rescope, or switch paths.

### 35–40 minutes: commercial reality

- Present included cost categories and uncertainty.
- Separate assessment, prototype, implementation, subscriptions, and support.
- Confirm client-owned accounts and maintenance expectations.

### 40–45 minutes: decision

Allowed outcomes:

1. Accept the recommendation.
2. Accept conditionally after a named gate.
3. Correct the model and revise the brief.
4. Defer.
5. Request separate prototype or Custom Build scoping.

Append corrections to the evidence record; do not erase the original assessment.

---

## 15. Custom Build scoping handoff

Do not begin Custom Build scoping until the build candidate has no unresolved veto, unless the handoff is explicitly conditional.

### Required packet

1. Approved problem and outcome statement.
2. Value/Readiness scores and evidence mix.
3. Reasons simplify, buy, and automate were rejected.
4. Named users and adoption owner.
5. Current and proposed workflow.
6. Durable record, lifecycle, and authoritative sources.
7. Smallest valuable boundary.
8. Must-have, optional, deferred, and excluded capabilities.
9. Acceptance examples for normal and exception paths.
10. Critical-behavior prototype results.
11. Integration access and representative payloads.
12. Data classification, permissions, retention, and privacy owner.
13. Migration/opening-balance strategy and reconciliation method.
14. Manual fallback and override.
15. UAT participants and release approver.
16. Deployment, account ownership, subscriptions, and support model.
17. Outcome baseline and post-launch measurement plan.
18. Bottom-up effort and cost range.
19. Change-control triggers.
20. Remaining unknowns and accepted risks.

### Boundary pressure test

The first build must fit this sentence:

> [Named user group] handles [one triggering workflow] by creating or changing [one durable operational record] through [defined completed state], producing [measurable output or outcome].

If it requires multiple unrelated triggers, systems of record, public and internal products, or several outcome families, split or phase the build.

---

## 16. Outcome measurement

### Measurement ladder

| Level | Question | Engagement example |
| --- | --- | --- |
| **Demand** | Did someone request or express interest? | A DMDL sister organization expressed interest; TXHSA requested more features |
| **Adoption** | Did eligible users begin using it? | DMDL client-reported more than 80% PWA participation |
| **Usage** | Was the workflow actually performed? | TXHSA map used in four presentations |
| **Successful output** | Did the workflow complete correctly? | Completed check-in/out pair or correctly reserved inventory |
| **Outcome** | Did time, reliability, service, compliance evidence, or decision quality improve? | Not yet established strongly in the three histories |

Never promote evidence from one level to the next without measurement.

### Metric record

```text
Outcome hypothesis:
Metric level: demand / adoption / usage / successful output / outcome
Metric name:
Exact numerator:
Exact denominator:
Unit:
Baseline value:
Baseline period:
Baseline evidence class:
Target or decision threshold:
Target basis:
Data source:
Source owner:
Collection method:
Review cadence:
Outcome window:
Known exclusions or biases:
Decision if target is met:
Decision if target is missed:
```

### Calibration metrics for the current engagements

#### DMDL

- Completed check-in/out pairs ÷ expected visits, weekly.
- Report missing check-in, missing check-out, manual corrections, and false geofence events separately.
- Use eligible providers as the adoption denominator.
- Treat native outcomes as anticipated until post-launch evidence exists.

#### TXHSA

- Preserve four presentations as observed usage.
- Ask whether the map changed regional analysis, board representation, or policymaker understanding.
- If no decision effect is documented, usage remains the highest supported level.

#### Joy for Books

Candidate metrics remain anticipated until the client approves baseline and targets:

- Median time from source review through a completed purchase recommendation or finance report.
- Titles with system-versus-physical stock discrepancy ÷ titles counted.
- Reservations requiring manual correction ÷ reservations submitted.
- Review-to-order cycle time.
- Order quantities received without unresolved exception ÷ quantities ordered.
- Median school-visit logging and recap time.

Do not blend these into one “inventory trust” score.

---

## 17. Commercial safeguards

### Jumpstart boundary

The fixed Jumpstart includes:

- Pre-assessment questionnaire.
- Recorded workflow assessment.
- Agreed artifact review.
- Current-state workflow map.
- Opportunity and solution analysis.
- Implementation Brief.
- Findings and decision call.

It excludes:

- Production implementation.
- Working integrations or data migration.
- Custom prototypes.
- Vendor procurement.
- Legal or compliance determination.
- Material revisions caused by newly introduced scope.

### Bottom-up implementation estimate

Estimate each phase separately with low/likely/high effort, assumptions, exclusions, and direct cost:

1. Additional discovery and scoping.
2. Feasibility prototype.
3. Workflow, data, and product design.
4. Implementation.
5. Integrations and migration.
6. QA and security review.
7. Client UAT and remediation.
8. Deployment and account setup.
9. Documentation and training.
10. Project communication and change management.
11. Contingency for named risks.
12. Third-party subscriptions, APIs, devices, and infrastructure.
13. Initial support and ongoing maintenance.

Do not infer future rates from the TXHSA undercharge or automatically reuse DMDL's historical rate.

### Quote rules

- Do not issue a fixed build quote while a critical veto or prototype gate remains unresolved.
- The Jumpstart may provide a conditional budget/timeline range with explicit assumptions.
- Separate pass-through costs from ASLLC fees.
- Put production accounts, domains, contracts, and authoritative data under client ownership where practical.
- State who pays for API and AI usage and how overruns are approved.
- Define support, response expectations, defect remediation, and maintenance before launch.
- Track all actual hours and direct costs internally, including fixed-price work.
- Treat general capability learning as an ASLLC cost unless explicitly agreed.
- Scope project-specific research, feasibility testing, and change-driven work rather than silently absorbing it.
- Distinguish defects from changed requirements.
- Compare estimates with actuals by phase and calculate realized rate net of direct cost.

### Mandatory change-control triggers

Re-price, re-phase, or stop when:

- The operational spine or system of record changes.
- A new user population or public surface is added.
- Authentication or permissions change materially.
- An integration is added, removed, or unavailable.
- Migration history or data quality changes materially.
- Critical platform behavior fails.
- A new report or workflow family enters scope.
- Acceptance criteria change materially.
- Likely effort moves outside the approved range.

---

## 18. Outcome and calibration record

After every Jumpstart, preserve an anonymized record containing:

- Qualification result.
- Initial ask and root problem.
- Evidence mix.
- Value and Readiness scores.
- Candidate solution scores and uncertainty ranges.
- Vetoes triggered.
- Recommendation and client corrections.
- Client-selected path.
- Prototype result, if any.
- Estimate versus actual by phase.
- Scope-change triggers.
- Demand, adoption, usage, output, and outcome results.
- Support burden and direct costs.
- Whether a lower-complexity solution was later found.

Review the model after **every five completed Jumpstarts or every three implementations reaching their outcome window, whichever occurs first**. This cadence is provisional.

At calibration, ask:

1. Did high Value/Readiness opportunities proceed?
2. Did recommended builds later simplify or move to an existing product?
3. Did prototypes correctly predict feasibility?
4. Which must-haves were identified incorrectly?
5. Which scope triggers caused overruns?
6. Which evidence classes were over-trusted?
7. Were estimate ranges accurate by phase?
8. Were outcome metrics collectible?
9. Which controls added burden without changing a decision?
10. Should scoring weights or thresholds change?

Version the rubric. Do not rewrite old scores; append new evidence and compare the old decision under the revised model.

---

## 19. Provisional rules and overlearning risks

- The 70-point recommendation threshold, 10-point complexity margin, 25% scope trigger, priority bands, and calibration cadence are operating hypotheses—not validated predictors.
- The sample overrepresents nonprofits, associations, lean teams, and founder-led delivery.
- The durable-spine gate applies most strongly to systems that own operational state; do not force it onto a one-off analysis or narrow stateless automation.
- DMDL does not mean every project requires a prototype. Prototype only when a critical behavior is uncertain.
- Joy for Books does not prove custom was right or wrong. It proves that alternatives and lifecycle ownership must be documented before commitment.
- TXHSA does not mean low-frequency projects lack value. Strategic decision surfaces may be valuable despite limited usage.
- “Buy first” can also waste time. Limit research to credible categories and top must-haves rather than performing an exhaustive market study.
- Privacy and maintenance controls are prudent because ownership was unclear, not because these clients experienced documented incidents.
- These engagements do not validate an AI-quality rubric. Consequential probabilistic AI requires task-specific evaluation data, error tolerance, human review, and fallback.

The playbook must become stricter or simpler based on measured results—not on confidence alone.
