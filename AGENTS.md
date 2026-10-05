# AGENTS.md — Portfolio Website Coding-Agent Contract

This is the primary operating guide for any coding agent working in this repository.

Read the project documentation before making architecture-level decisions. Do not infer that a conventional developer-portfolio template is acceptable. This project deliberately separates semantic content, composition, visual theming, and interaction.

## 1. Product objective

Build a professional bilingual portfolio website for Tyler Tapia that demonstrates design judgment, product thinking, and software-engineering ability.

The site is itself a major portfolio project.

The key differentiator is a switchable presentation system where the exact same underlying project and case-study content can be reinterpreted by multiple complete visual/compositional modes.

Launch modes:

- `editorial`
- `engineer`
- `digital`

Default mode:

- `editorial`

Future modes may include:

- `product`
- `graphic`

Chronicle (`chronicle`) is an explicitly authorized additional mode as of
2026-10-03. Use `docs/design-reference/CHRONICLE-REFERENCE.md` and its three PNG
references, plus `docs/CHRONICLE-IMPLEMENTATION.md`. It has no reference HTML.

Do not implement future modes unless explicitly asked.

## 2. Central architecture

Required conceptual pipeline:

```text
CONTENT
  ↓
SEMANTIC COMPONENTS
  ↓
COMPOSITION
  ↓
THEME TOKENS
  ↓
INTERACTION / MOTION
```

### Content

Contains facts, narrative, media references, structured decisions, project metadata, and localized text.

Content must not contain theme-specific appearance instructions.

### Semantic components

Represent meaning, for example:

- `ProjectFeature`
- `ProjectMeta`
- `SectionHeading`
- `CaseStudyIntro`
- `Decision`
- `ArchitectureDisplay`
- `TechnicalDetail`
- `MediaFrame`

Avoid appearance names such as `BigWhiteCard`, `NeonPanel`, or `RoundedBlueCard`.

### Composition

Controls information organization, visual hierarchy, grouping, density, and emphasis for the active mode.

Examples:

- Editorial may prioritize story, imagery, and rationale.
- Engineer may move architecture and system metadata earlier.
- Digital may prioritize interaction, visual sequence, and spatial composition.

This is where the modes should become genuinely different.

### Theme tokens

Control visual primitives:

- typography
- color
- spacing
- border
- radius
- elevation
- imagery treatment
- grid characteristics
- motion personality

Do not confuse token changes with composition changes.

### Motion/interaction

Enhances the chosen composition. It must never be necessary to understand or operate the site.

## 3. Never reduce modes to skins

A failed implementation looks like:

- identical section organization
- identical project-card grid
- identical case-study structure
- only font/color/border differences

A successful implementation makes the modes feel like different ways of reading the same portfolio while clearly remaining one site.

### Editorial

Primary qualities:

- story
- typography
- imagery
- rationale
- whitespace
- controlled asymmetry
- long-form editorial rhythm

### Engineer

Primary qualities:

- system
- structure
- constraints
- implementation
- architecture
- project records
- decision logs
- denser information

### Digital

Primary qualities:

- interaction
- motion
- experimentation
- visual systems
- spatial composition
- layered media
- continuity between project index and detail


## 3A. Approved design references

Approved visual baselines for the three launch modes live in:

```text
docs/design-reference/
```

Before implementing or substantially revising a theme, read:

```text
docs/design-reference/README.md
docs/design-reference/IMPLEMENTATION-CONTRACT.md
docs/design-reference/EDITORIAL-REFERENCE.md
docs/design-reference/ENGINEER-REFERENCE.md
docs/design-reference/DIGITAL-REFERENCE.md
docs/design-reference/EXTENDING-THE-DESIGNS.md
```

Then inspect the corresponding HTML reference:

```text
docs/design-reference/editorial.html
docs/design-reference/engineer.html
docs/design-reference/digital.html
```

These files are approved visual/composition references, not production source code and not factual portfolio content.

### Source-of-truth precedence

For architecture, application behavior, accessibility, localization, semantic structure, and factual content:

1. `AGENTS.md`
2. `/docs` architecture/product/content documentation
3. typed portfolio content and project-discovery results
4. `docs/design-reference/*.md`
5. reference HTML
6. agent inference

For the approved homepage visual direction of a specific theme:

1. `docs/design-reference/*-REFERENCE.md`
2. the corresponding reference HTML
3. older visual/design planning documents
4. agent inference

This means an approved reference may supersede an earlier speculative layout idea while leaving the shared portfolio architecture unchanged.

### Translation, not migration

Do not copy the Stitch HTML wholesale into production React/Next.js.

Translate the approved design into the shared portfolio architecture:

```text
CONTENT
  ↓
SEMANTIC COMPONENTS
  ↓
COMPOSITION
  ↓
THEME TOKENS
  ↓
INTERACTION / MOTION
```

Preserve the reference's:

- composition
- proportions
- typography roles
- visual hierarchy
- palette relationships
- density
- geometry
- surface treatment
- navigation personality
- responsive intent

Replace prototype-only implementation patterns such as:

- Tailwind CDN
- inline configuration
- inline `onclick`
- hardcoded project data
- placeholder external imagery
- fake project metrics
- generated biography/contact/social content

with the production architecture and verified typed content.

### Prevent visual drift

Secondary pages must extend the approved theme grammar rather than introducing a generic unrelated AI-generated UI.

Use:

```text
docs/design-reference/EXTENDING-THE-DESIGNS.md
```

when implementing Work, Case Study, About, Lab, Contact, error pages, or new theme-specific components.

If a secondary page could plausibly belong to an unrelated template instead of the approved homepage system, the implementation has drifted and should be revised.


## 4. Theme invariants

Modes may change:

- typography
- visual layout
- spacing rhythm
- navigation presentation
- project presentation
- section grouping
- media treatment
- motion
- geometry
- decorative systems
- visible emphasis

Modes must not change:

- factual content
- project availability
- project URLs
- semantic meaning
- accessible reading logic
- SEO identity
- canonical URLs
- essential navigation destinations
- required content

## 5. Content rules

Do not hardcode project content into theme components.

Do not require every project to populate every possible case-study field.

Examples:

- a backend service may have no design-system section;
- a visual frontend project may have little infrastructure depth;
- a small project may not warrant a full case study.

Render only relevant, supported content.

Do not invent business outcomes, user counts, metrics, architecture rationale, design rationale, or personal reflections.

## 6. Project-discovery workflow

When project content is needed, use:

`docs/15-PROJECT-DISCOVERY-PROMPT.md`

Run that prompt inside the relevant project repository where an agent can inspect the actual implementation and documentation.

The resulting report is source material, not automatically publishable portfolio copy.

## 7. AI-assisted development disclosure

Do not pretend all implementation was manually authored when AI-assisted development is materially part of the workflow.

Where useful, distinguish:

- product direction
- requirements
- architecture
- design direction
- AI-assisted implementation
- review
- testing
- verification

Do not invent contribution percentages.

The portfolio should communicate ownership and judgment, not turn every page into an AI disclaimer.

## 8. Accessibility

Target WCAG 2.2 AA for every theme and locale.

Requirements include:

- keyboard operability
- visible focus
- logical semantic reading order
- screen-reader compatibility
- sufficient contrast
- touch target sizing
- zoom resilience
- reduced-motion support
- no hover-only essential content
- no pointer-only required interaction

Visual reordering must not create incoherent semantic order.

## 9. Performance

Working targets:

- Lighthouse Performance: >= 90
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95
- good Core Web Vitals

Advanced Digital assets must be lazy/dynamically loaded only when needed.

Editorial and Engineer users should not download large Digital-only WebGL/shader packages.

## 10. Localization

Support English and Japanese from the beginning.

Target route model:

```text
/en/...
/ja/...
```

English is the initial source language.

Japanese content may be incomplete. Support states such as:

- none
- summary
- partial
- complete

When deep Japanese content is incomplete, provide an intentional fallback rather than implying it is complete.

Do not use Japanese text as decoration merely because Japan is a target market.

## 11. Content data versus narrative

Prefer typed structured data for:

- slug
- title
- year
- status
- type/category
- roles
- technology references
- capability references
- links
- publication state
- featured state
- media references
- translation status

Use MDX/rich content for narrative where helpful.

MDX should express semantic blocks, not arbitrary layout classes.

## 12. Publication behavior

Project publication and homepage-featured status are separate.

Valid:

```text
published = true
featured = false
```

Draft/hidden projects must not leak into navigation, sitemap, indexes, or structured data.

## 13. Development-only tooling

Implement/preserve:

- `/dev/design-system`
- `/dev/compositions`

These should allow comparison of shared fixtures across themes.

Fixtures should cover:

- long and short titles
- missing optional fields
- image and no-image states
- Japanese text
- varying image aspect ratios
- reduced-motion states where practical

Dev tooling should be excluded from production or return 404 there.

## 14. Testing expectations

Important categories:

- schema validation
- broken content/media references
- locale consistency
- semantic component behavior
- accessibility
- theme compatibility
- visual regression
- theme persistence
- no-flash initialization
- reduced-motion behavior

Every published project should be testable against all launch themes.

## 15. Documentation expectations

Comments and docs should explain non-obvious intent, constraints, extension points, and architectural rules.

Do not add comments that merely paraphrase obvious code.

When changing a locked architectural decision, update the relevant docs and `docs/17-DECISION-LOG.md`.

## 16. Implementation judgment

Illustrative pseudocode is not a mandatory exact implementation.

You may refine:

- component names
- folder boundaries
- exact library choices
- exact styling mechanism
- exact registry mechanics

But preserve the architectural intent.

If project content needs to know which theme is active, reconsider the design.

If adding a fourth theme requires rewriting all project content, the architecture is wrong.

If adding a new normal project requires editing three theme-specific components, the architecture is wrong.

## 17. Scope discipline

V1 should not be delayed by:

- Product theme
- Graphic theme
- full Japanese translation of every deep case study
- CMS
- database
- authentication/accounts
- excessive analytics
- generalized framework work
- WebGL for its own sake

Prioritize a polished, deployable portfolio with the three launch modes.
