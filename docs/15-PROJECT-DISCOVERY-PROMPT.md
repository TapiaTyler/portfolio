# 15 — Reusable Project Discovery Prompt

Updated 2026-10-03 against the implemented content schema and authoring workflow.
Use the prompt below inside the repository of the project you want to import.
The receiving agent does not need access to the portfolio repository.

The output is discovery source material, not approved copy or a publishable record.
English is the source language; Japanese translation remains a later pass.

## Copy-ready prompt

You are reviewing this repository for inclusion in Tyler Tetsuo Tapia's software
engineering portfolio. Inspect its documentation, implementation, configuration,
tests, available Git history and supplied design/context artifacts. Produce an
evidence-backed project discovery report that another agent can use to create
an accurate project record and case study.

The portfolio uses one canonical content source across Editorial, Engineer and
Digital compositions. Describe facts and meaning, not theme-specific layouts,
colors, CSS classes or separate versions of the story. A backend project may
need diagrams instead of screenshots; a small project may need only a short entry.

### Working rules

- Read the repository's agent instructions first. Inspect the actual code as well
  as documentation; flag stale docs or conflicts instead of treating plans as facts.
- Record the inspected revision, date and working-tree state. If relevant changes
  are uncommitted, say that the report describes the working tree, not just HEAD.
- Cite repository-relative paths and relevant line numbers or named symbols for
  important claims. Separate implemented facts, documented intent, your inference,
  and information requiring Tyler's confirmation. Git authorship alone does not
  establish personal ownership, development dates or manual implementation.
- Do not modify the current application's tracked code, deploy, publish, push,
  contact others or change Git history. You may save discovery deliverables and
  use isolated temporary copies or capture-only overrides for the optional
  comparisons below. Use available project tooling
  for local checks only when appropriate; record what you actually ran. Do not
  install dependencies or run migrations solely to fill out the report.
- Inspect relevant configuration without copying secret values. Exclude private
  customer/user data, credentials, internal endpoints and unapproved proprietary
  material from the report, examples and proposed captures. Note disclosure or
  asset-permission questions without reproducing restricted content.
- Do not invent users, impact, metrics, rationale, rejected alternatives, personal
  reflections, qualifications or contribution percentages. Keep optional sections
  sparse or omit them when unsupported. Do not generate Japanese translations.

### Report sections

#### 1. Snapshot and evidence

Identify the repository/project, inspected commit or working-tree state, inspection
date, major sources reviewed, and any access or verification limits. Give important
claims evidence references; identify conflicts and unresolved assumptions.

#### 2. Project identity and scope

Provide the name, candidate kebab-case slug, year/period if supported, category,
audience, purpose, problem, one-sentence summary and short description. Clarify
whether it is a production application, prototype, learning project, internal tool,
template or other kind of work. Summarize major features, subsystems, integrations,
constraints and important exclusions. Separate implemented, partial, planned and
unresolved functionality.

#### 3. Ownership and contribution

Identify supported responsibilities in product direction, requirements, research,
architecture, UI/UX, implementation, data/API design, deployment, testing and review.
Distinguish Tyler's direction and decisions from collaborators, third-party work
and material AI assistance. Explain the review/verification process where evidenced.
Treat unknown ownership or implementation methods as questions, not assumptions.

#### 4. Technology and architecture

List material technologies by role, not every dependency. Explain layers, modules,
data flow, storage, external services, runtime/deployment and important boundaries.
Include data/content models when meaningful. Recommend diagrams with actual nodes,
edges and relationships plus a plain-language accessible summary. Do not invent
complexity or imply that proposed architecture is implemented.

#### 5. Decisions, challenges and design iterations

For each worthwhile decision: context, chosen approach, supported rationale,
tradeoffs, evidenced alternatives and current result. For each challenge: problem,
why it mattered, response and result or remaining limitation. Include meaningful
product/UX, information hierarchy, responsive, accessibility and interaction
choices where relevant. Preserve iterations and rejected approaches when supported;
identify which media or code would demonstrate each one.

Older-state comparisons are optional, not a required section or an emphasis for
every project. When a meaningful, evidenced iteration would help explain a
decision, first look for actual historical captures. If those are unavailable,
try reproducing an older state from available history, design artifacts or
documented changes using an isolated temporary copy or capture-only override.
Do not replace current application files, reset the working tree, install an old
stack solely for a comparison, or run an old deployment. Keep the effort bounded;
skip it if evidence, safe tooling or explanatory value is insufficient.

Capture a comparable current state when practical. Record the source revision or
artifacts, reconstruction method, overrides and known differences. Label any
reconstructed image/video in the media itself and its caption/manifest; it must
not imply an authentic historical capture or measured historical performance.
Do not invent an earlier design. If recreation is impractical, a concise textual
account of the supported iteration is enough.

#### 6. Quality, operations and results

Cover implemented testing, type/static checks, CI, security/privacy, failure handling,
reliability, performance, accessibility, localization, deployment and operations
where relevant. Distinguish targets, existing test definitions, recorded historical
results and checks you ran now. State commands, date/revision, environment, scope,
results and limits for actual checks. For metrics, include units and measurement
conditions, including local versus deployed, lab versus field, device/throttling,
content/fixture state and comparable before/after methodology. A test suite's presence
is not proof it passes; automated audits do not establish full WCAG conformance.

Summarize concrete achieved outputs, current limitations and next steps. Personal
lessons/reflections must be documented or marked as questions for Tyler.

#### 7. Portfolio highlights and capability mapping

Choose up to 3–7 specific, defensible highlights, fewer for small projects. Map
only capabilities demonstrated by evidence: Product & UI Engineering, Frontend,
Backend, Full-stack, System Architecture, API Design, Data Modeling, Design Systems,
Accessibility, Performance, Localization, Security, DevOps / Deployment,
Testing / Quality Engineering, Developer Tooling and Technical Documentation.
Explain the evidence for each. Suggest another category if needed; do not force
an unrelated match. Supply factual candidate title, short category, summary,
2–4 key technologies/capabilities where available, and preview media choice.

#### 8. Media and technical evidence handoff

Inventory existing useful assets separately from assets still needing capture.
For each asset or recommendation, provide:

- Stable candidate ID; image or video; existing repository path or proposed
  filename clearly marked as not yet created. Never report a recommendation as
  an existing file. Recommend a useful preview image if one exists.
- Purpose: overview, detail, mobile, architecture, process or result; what claim
  or narrative section it supports; proposed section/block ID.
- English alternative text or equivalent description and caption. Captions explain
  the evidence and its limits; alt text describes the visual without needless repetition.
- Measured intrinsic width/height, format and file size for existing media. For
  video, include duration, poster path or capture requirement, and any necessary
  transcript/caption information. Unknown dimensions remain unknown, not guessed.
- Provenance: source, capture date/revision, route/screen, viewport, relevant input
  or setup, and whether it uses real, anonymized, synthetic or fixture data.
  Identify existing historical captures versus reconstructed earlier states.
  Label reconstructions explicitly; do not present them as historical screenshots.
- For proposed captures, specify the exact useful state/action sequence and
  prerequisites. Prefer short silent interaction clips with native controls and
  a poster; do not require autoplay to understand the evidence.
- For related images, describe their shared subject and relationship: sequence,
  comparison, details or states. Before/after evidence should use comparable
  framing and explain what changed. Do not prescribe a theme layout.
- Public-use permission, sensitive areas needing removal, and approval gaps.

For useful architecture diagrams, provide IDs, titles, accessible summaries, node
IDs/labels and directed edges with optional labels. For useful code excerpts,
provide an ID, title, language, exact source path/symbol and a short actual excerpt
with context. Check that excerpts can be disclosed; avoid secrets and huge dumps.
If an asset is missing or not publishable, recommend an intentional no-image entry.

#### 9. Narrative and import handoff

Recommend an outline suited to this project. Use stable kebab-case IDs and propose
semantic block types only where relevant: intro, problem, goals, constraints,
decision, architecture, challenge, technical, media, gallery and result.

A technical section needs a useful visible summary before optional deeper detail.
Map media, diagram and snippet IDs to the sections they support. Supporting media
blocks use `supportsBlockId` and follow their narrative owner immediately, or follow
that owner's other supporting media. Related galleries declare their relationship.
This lets compositions group the evidence with its explanation without duplicate
content. Do not assign raw HTML, styling classes or theme instructions to blocks.

Provide a compact metadata handoff with:

- `kind: project`, candidate `slug`, supported `year`, `type`, `roles` and actual
  project `status`: active, complete, prototype, planned or archived.
- Verified or explicitly unverified live/repository/documentation links, including
  access restrictions. Do not infer public availability from a configured URL.
- English title, optional short title, summary/description, and optional overview
  `distinction` and `currentState` supported by the report.
- Material technology names and evidenced capabilities. Registry IDs will be
  resolved in the portfolio; flag missing vocabulary instead of inventing IDs.
- Suggested preview media ID, asset/diagram/snippet inventories and ordered block map.
- Contribution facts. Where supported, portfolio ownership values are primary,
  shared or supporting; implementation is manual, ai-assisted or mixed. Leave
  unsupported assignments unset.
- Proposed `publication: { status: draft, featured: false }`. Project completion,
  public portfolio publication and homepage featuring are separate decisions.
  Flag requested publication exceptions for Tyler; do not publish anything.
- Japanese translation status: none unless existing reviewed translations are
  supplied. Inventory existing Japanese text and review/coverage limits separately;
  do not imply complete translation. Supported later states are summary, partial
  and complete, with the same narrative IDs and shared asset references.

This is an import proposal, not a schema-validated portfolio object. Keep unknown
fields and provenance notes in the discovery report rather than inserting fake
values or extra properties into production content.

#### 10. Questions for Tyler

End with focused questions that cannot be answered from the repository. Prioritize
ownership, unsupported rationale/reflection, public disclosure, missing media,
verified outcomes and publication/featured preferences. Separate import blockers
from optional enhancements; do not ask Tyler to restate discoverable facts.

### Delivery

Save the report as `docs/portfolio/DISCOVERY.md` if the repository permits it.
Follow its documentation conventions when that path is inappropriate; do not
overwrite an existing report blindly. Update existing discovery material carefully,
retain useful evidence and state the reviewed revision. If file creation is not
available, return the complete report in the chat.

When multiple useful deliverables or approved media files are available, also
prepare `portfolio-discovery-<slug>.zip` using existing local archive tooling.
Do not install a new packaging tool just for this task. Include one top-level
`portfolio-discovery-<slug>/` directory with the following suggested structure:

```text
portfolio-discovery-<slug>/
  README.md
  DISCOVERY.md
  IMPORT-PROPOSAL.json
  media/
    MANIFEST.json
    <approved existing images, videos and posters>
  evidence/
    VERIFICATION.md
    ITERATIONS.md             # only when useful and supported
    RECONSTRUCTIONS.md        # only when optional recreations were made
  diagrams/
    <diagram-id>.json          # only for meaningful diagrams
  code/
    <snippet-id>.txt           # only for selected shareable excerpts
```

- `README.md`: bundle date, source revision/working-tree state, file inventory,
  review limitations, publication approval gaps and how the files relate.
- `DISCOVERY.md`: the canonical report; reference evidence by repository-relative
  path/symbol and use relative links for files included in the bundle.
- `IMPORT-PROPOSAL.json`: valid JSON containing the candidate metadata, English
  copy, ordered semantic section map and reference IDs. Mark it as a proposal;
  it is not automatically a valid portfolio `ProjectInput`. Keep uncertainty and
  evidence references explicit. Do not invent values to satisfy a schema.
- `media/MANIFEST.json`: valid JSON listing each included or recommended asset,
  its ID, source provenance, dimensions/format/size where known, alt/description,
  caption, purpose, narrative owner or gallery relationship, video/poster details,
  capture setup and public-use review state. Include a relative `bundlePath` only
  for actual included files. Give missing/proposed assets an explicit state such
  as `needs-capture`, `needs-permission` or `unavailable`, with no fake file path.
- `evidence/VERIFICATION.md`: exact checks run, or recorded checks clearly labelled
  as historical, including commands, conditions, results and limitations. Say when
  no checks were run. Optional `ITERATIONS.md` preserves supported before/after
  decisions and identifies historical versus reconstructed evidence.
- Optional `evidence/RECONSTRUCTIONS.md`: source revisions/artifacts, isolated
  recreation steps or overrides, known differences and the corresponding labelled
  asset IDs. Include this only when older-state recreation adds useful evidence.
- Diagram JSON and snippet text contain the selected structures/excerpts described
  above; keep their source references and explanations in the report or manifest.

Omit irrelevant optional files/directories. For a small project, a report and brief
handoff may be sufficient; do not manufacture extra artifacts to fill the structure.
Include only assets with established permission and reviewed safe contents.
If permission or data review is unresolved, inventory the asset without bundling it.
Exclude repository copies, `.git`, dependencies, build outputs, environment files,
logs, private raw datasets and unnecessary large recordings. Do not include arbitrary
symlinks or machine-specific absolute paths. If a useful asset is too large to share,
note its omission and approved transfer options rather than silently dropping it.

After packaging, inspect the ZIP entry list, check that paths stay within the named
bundle root, parse included JSON, and verify included asset paths and cross-file IDs
resolve. Confirm that missing assets are explicitly marked and no unintended files
were included. Creating a ZIP does not approve its contents for publication.

Return the report location or report text, the ZIP location when created, a brief
list of strongest supported claims, available/missing assets and outstanding import
blockers. If ZIP creation is unavailable, provide the separate files or their text
and say that no archive was created. Do not create portfolio implementation files
in this repository. Accuracy and a useful handoff matter more than exhaustive
coverage or promotional copy.

## Portfolio-side handling

1. Review the report and resolve material evidence/permission gaps with Tyler.
2. Convert selected material into one canonical English project record, using
   `src/lib/content/schema.ts`, `blocks.ts` and `text.ts` as the implemented contract.
   Consult [CONTENT-AUTHORING.md](CONTENT-AUTHORING.md); older illustrative models
   are not an exact production schema.
3. Resolve or extend technology/capability vocabulary with evidence. Copy approved
   assets into the portfolio's public media directory, assign actual paths and
   dimensions, and retain capture provenance in a separate manifest/document.
   Draft publication does not make files in `public/` private.
4. Keep Japanese fallback intentional and do not generate translations in this pass.
5. Validate schemas, references and local assets. Preview the project in all three
   themes and review keyboard, reduced motion, responsive media and owner grouping.
6. Obtain separate content/publication and featured decisions. Keep drafts excluded
   from public selectors, routes, navigation, sitemap and structured data.
7. Deployment remains a separate release decision. Final media and populated pages
   require performance review before launch.
