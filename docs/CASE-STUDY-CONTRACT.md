# Case-Study Contract

Adopted 2026-10-05 (D040). Applies to every **published** project. Drafts may break it
while they are being written; `tests/case-study-contract.test.ts` checks the
measurable rules before a record can ship.

## Purpose

Evaluators of a software-engineering portfolio scan first and read deeply only once
something earns it. A case study must therefore be **fast to evaluate and deep when
inspected**:

| Depth | Reader | What they get |
| --- | --- | --- |
| 10–20 second scan | Recruiter, first screen | The opening: what it is, role, status, technologies, links, one strong image |
| 2–5 minute read | Hiring manager, engineer | The visible spine below |
| Deep inspection | Interviewer, curious engineer | The collapsed Engineering details, diagrams and code |

A reader must understand the project **without opening a single disclosure**.

This contract tightens the "narrative flexibility" in
[03-CONTENT-MODEL-AND-CASE-STUDIES.md](03-CONTENT-MODEL-AND-CASE-STUDIES.md) for
published work: every case study follows one recognisable spine, so evaluators can
compare projects without relearning each page.

## 1. The opening (record metadata)

Rendered by every composition from the record; no block is needed.

| Field | Rule |
| --- | --- |
| `title` | The product or project name. Claims belong in headings, not the title. |
| `summary` | One sentence, at most 30 words: what it is and who it serves. |
| `description` | At most 60 words: what was built and its current state. |
| `overview.distinction` | One sentence, at most 35 words: why it is technically interesting. |
| `overview.currentState` | One sentence, at most 35 words: status in plain terms (hosted, complete, in development). |
| `roles` | 3–5 roles, phrased as work owned: Architecture, Implementation, Code review, Product direction. Avoid vague verbs such as "management". |
| `technologyIds` | The stack actually used, primary technologies first; at most 10. |
| `links` | `live` when hosted; `repository` when public; otherwise `repositoryVisibility: "private"` so the page says "Source private" instead of staying silent. |
| `previewMediaId` | One strong, real screenshot of the product. |

## 2. The visible spine

Blocks appear in this order. Media blocks follow the section they support.

| # | Section | Block type | Count | Visible budget |
| --- | --- | --- | --- | --- |
| 1 | Problem | `problem` | exactly 1 | ≤ 150 words |
| 2 | What was built | `intro` | exactly 1 | ≤ 150 words |
| 3 | Key decisions | `decision` | 2–3 | ≤ 180 words each |
| 4 | Architecture | `architecture` | exactly 1, with a diagram | ≤ 150 words |
| 5 | Challenge | `challenge` | 0–1 | ≤ 180 words |
| 6 | Engineering details | `technical` | exactly 1 | summary ≤ 40 words; body collapsed |
| 7 | Result | `result` | exactly 1 | ≤ 120 words |

Decisions and the challenge share one slot budget: **three decisions and no
challenge, or two decisions and one challenge.**

Totals:

- **Exactly 8 sections** in the chapter navigation when the spine is complete (media
  and galleries do not count); never more.
- **Visible spine words: target 600–1,100; hard ceiling 1,500.** Counted over the spine:
  block headings and text, the Engineering details title and summary, and media
  captions. The Engineering details body and code are excluded, as is the opening,
  which has its own field limits and adds roughly 150–300 words to the page.
- No other block types (`goals`, `constraints`, extra `technical` blocks) on published
  case studies. Their content either earns a place in the spine or moves into
  Engineering details.

### Section guidance

- **Problem.** Why this needed to exist. One or two short paragraphs; no project
  history unless the history is the point.
- **What was built.** The system in one or two paragraphs: the main capabilities a
  user meets. This is where the best screenshot goes.
- **Key decisions.** The heart of an engineering case study. Pick the 2–3 decisions
  that reveal judgment, not every decision the discovery found. Each states the
  decision and why; context and tradeoffs only when they add something. A good
  decision reads as "this constraint led to X rather than Y".
- **Architecture.** One diagram and a short explanation of the boundaries it shows.
- **Challenge.** At most one genuinely interesting difficulty: a constraint that
  changed the design, not a bug that was fixed.
- **Engineering details.** One disclosure that groups the deep material: security,
  testing and verification, deployment, localisation, implementation notes and code
  excerpts. Its title is "Engineering details"; its summary tells the reader what is
  inside. Group related material in paragraphs; do not split it into several
  collapsed sections.
- **Result.** What exists today, honestly: hosted, complete or in development. Known
  gaps may be named here once. Metrics only when measured and sourced.

## 3. Media

- At most **6 media items** per case study; at most **2 galleries**.
- At most **2 media items** supporting any one section.
- Every image is real product evidence or a clearly labelled before/after. Atmospheric
  art never stands in for product screenshots.
- **Captions describe what is shown, in at most 25 words.** Provenance details
  (capture method, reconstruction overrides) belong in the capture manifest, not the
  caption, unless the image is a reconstruction or a synthetic fixture, which must
  still be labelled as such.
- Videos are unedited, silent, captioned, and never autoplay.

## 4. Wording

- **Describe the work, not the review of it.** No "discovery", "inspected
  checkout", "source-project evidence", "this capture state" or similar audit
  language in published copy.
- **No commit hashes or revision references.** A release tag may appear when a
  reader can use it (for example a preserved capstone tag).
- **File paths and function names** only inside Engineering details, and only when
  they help an engineer find the code.
- **Limitations are stated once**, plainly, in the Result or Engineering details.
  Do not repeat disclaimers in captions and every section.
- **AI assistance is disclosed in the ownership disclosure** (`contribution`), not
  repeated through the narrative. Name tools there if useful.
- Headings are short, specific statements in sentence case (D038). Labels and
  buttons stay in Title Case.
- Neutral voice; describe what the system does and why. No promotional adjectives,
  invented outcomes, user counts or impact metrics.

## 5. The editorial pass (import workflow)

The [discovery prompt](15-PROJECT-DISCOVERY-PROMPT.md) stays exhaustive. Between
discovery and the project record, an editorial pass sorts every finding into:

| Class | Destination |
| --- | --- |
| **Primary** | The visible spine: problem, what was built, 2–3 decisions, architecture, one challenge, result |
| **Supporting** | The Engineering details disclosure |
| **Evidence only** | Kept in the discovery report and docs; not published |
| **Do not publish** | Private, unverified, sensitive or irrelevant material |

The question for each item: does a hiring manager need this to understand why the
project demonstrates engineering ability? If not, it is supporting or evidence only.

## 6. Enforcement

`tests/case-study-contract.test.ts` checks every published record for:

- the spine block types, counts and order;
- at most 8 sections, 6 media items and 2 galleries, and at most 2 media per section;
- the 1,500 visible-word ceiling, and the opening field limits;
- no commit hashes or audit phrases in published copy;
- a live link, public repository or `repositoryVisibility` declaration.

The word budgets per section are editorial targets; the test enforces the totals.
