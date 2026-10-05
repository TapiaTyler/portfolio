# 03 — Content Model and Case-Study System

## Core rule

> **Content blocks describe meaning. Themes decide composition.**

The content model must support radically different presentations without duplicating project information.

It must also allow projects to remain sparse when certain fields are irrelevant.

## Content layers

```text
PROJECT FACTS
    ↓
NARRATIVE / SEMANTIC BLOCKS
    ↓
THEME COMPOSITION
```

Project facts are stable data.

Narrative blocks express the project story.

Theme composition decides how those facts and blocks are presented.

## Illustrative project model

```ts
type ProjectStatus =
  | "active"
  | "complete"
  | "prototype"
  | "planned"
  | "archived";

type PublicationStatus =
  | "draft"
  | "published"
  | "hidden";

type TranslationDepth =
  | "none"
  | "summary"
  | "partial"
  | "complete";

interface Project {
  slug: string;
  title: string;
  shortTitle?: string;

  year?: number | string;
  status: ProjectStatus;

  type: string[];
  roles: string[];

  technologyIds: string[];
  capabilityIds: string[];

  publication: {
    status: PublicationStatus;
    featured: boolean;
    priority?: number;
  };

  links?: {
    live?: string;
    repository?: string;
    documentation?: string;
  };

  availability?: {
    publicDemo?: boolean;
    sourcePublic?: boolean;
  };

  media: ProjectMedia[];

  locale: {
    en: LocalizedProjectContent;
    ja?: LocalizedProjectContent;
  };

  translationStatus?: {
    ja?: TranslationDepth;
  };

  contribution?: ProjectContribution;

  caseStudy?: CaseStudy;
}
```

Exact schema may be refined.

## Locale-neutral metadata

Avoid duplicating:

- slug;
- year;
- project status;
- publication state;
- featured state;
- technology identifiers;
- capability identifiers;
- links;
- media identifiers;
- contribution metadata where factual;
- asset dimensions.

Localized text should be separate.

## Localized project content

Illustrative:

```ts
interface LocalizedProjectContent {
  title: string;
  summary: string;
  description?: string;
  categoryLabel?: string;
  blocks?: CaseStudyBlock[];
}
```

Japanese does not need the same translation depth as English at all times.

## Publication versus featured

These are separate.

Valid:

```text
published = true
featured = false
```

A draft must not leak into public routes, sitemap, metadata, or Work indexes.

## Project preview model

Homepage/index previews may derive from the project object but should have a clear interface.

Suggested derived fields:

- title;
- short category;
- summary;
- year;
- preview media;
- key technologies;
- key capabilities;
- status where useful.

Avoid duplicate preview copy unless there is a genuine editorial need.

## Case-study model

A case study is a sequence of semantic blocks.

Potential types:

- `intro`
- `problem`
- `audience`
- `goals`
- `constraints`
- `decision`
- `media`
- `gallery`
- `architecture`
- `challenge`
- `technical`
- `result`
- `reflection`
- `quote`
- `comparison`
- `timeline`
- `callout`

Do not implement every type before needed.

## Block design principle

Bad:

```ts
{ type: "left-image-right-text" }
```

Better:

```ts
{ type: "comparison", relationship: "before-after" }
```

Bad:

```ts
{ type: "three-column-neon-panel" }
```

Better:

```ts
{ type: "decision", emphasis: "primary" }
```

The composition system chooses columns, overlap, borders, and styling.

## Core block examples

### Intro

```ts
interface IntroBlock {
  type: "intro";
  eyebrow?: string;
  heading: string;
  body?: RichText;
}
```

### Problem

```ts
interface ProblemBlock {
  type: "problem";
  heading?: string;
  body: RichText;
}
```

### Goals

```ts
interface GoalsBlock {
  type: "goals";
  items: string[];
}
```

### Constraints

```ts
interface ConstraintsBlock {
  type: "constraints";
  items: {
    title: string;
    detail?: string;
  }[];
}
```

### Decision

```ts
interface DecisionBlock {
  type: "decision";
  id?: string;
  title: string;
  context?: RichText;
  decision: RichText;
  rationale?: RichText;
  tradeoffs?: RichText;
  alternatives?: RichText;
}
```

Do not require alternatives when none are documented.

### Media

```ts
interface MediaBlock {
  type: "media";
  mediaId: string;
  caption?: string;
  emphasis?: "standard" | "wide" | "full";
}
```

`emphasis` represents editorial intent rather than locked pixel layout.

### Gallery

```ts
interface GalleryBlock {
  type: "gallery";
  mediaIds: string[];
  relationship?: "sequence" | "comparison" | "details" | "states";
}
```

### Architecture

```ts
interface ArchitectureBlock {
  type: "architecture";
  title?: string;
  diagramId: string;
  explanation?: RichText;
}
```

### Challenge

```ts
interface ChallengeBlock {
  type: "challenge";
  title: string;
  problem: RichText;
  response?: RichText;
  result?: RichText;
}
```

### Technical detail

```ts
interface TechnicalBlock {
  type: "technical";
  title: string;
  summary: string;
  body?: RichText;
  code?: CodeSnippet[];
  defaultExpanded?: boolean;
}
```

Technical detail should often use progressive disclosure.

### Result

```ts
interface ResultBlock {
  type: "result";
  body: RichText;
  metrics?: {
    label: string;
    value: string;
    context?: string;
  }[];
}
```

Metrics must be factual and supported.

### Reflection

```ts
interface ReflectionBlock {
  type: "reflection";
  learned?: RichText;
  improve?: RichText;
  next?: RichText;
}
```

Do not fabricate personal reflection.

## Narrative flexibility

> Published case studies now follow the fixed spine in
> [CASE-STUDY-CONTRACT.md](CASE-STUDY-CONTRACT.md) (D040). The flexibility below
> applies to drafts and to which material is chosen, not to the published order.

A product-heavy project might use:

```text
Intro
Problem
Audience
Information Architecture
Product Decisions
Design
Architecture
Challenges
Result
Reflection
```

A backend/system project might use:

```text
Intro
Problem
Requirements
Architecture
Concurrency/Data Flow
Decisions
Reliability/Security
Deployment
Challenges
Result
```

A small project may use only:

```text
Overview
Implementation Highlight
Result/Lesson
```

Omission is expected and must be natural.

## Theme interpretation

Given:

```text
Problem
Goals
Decision
Architecture
Result
```

Editorial may visually favor:

```text
Problem
large media
Goals/narrative
Decision essay
Architecture later
Result
```

Engineer may favor:

```text
PROJECT OBJECTIVES
SYSTEM OVERVIEW
ARCHITECTURE
DECISION LOG
IMPLEMENTATION
RESULT
```

Digital may favor:

```text
hero media
problem + goals
interactive model
decision nodes
UI sequence
architecture
result
```

The source content remains shared.

## Visual reordering limits

Visual order may differ from source order only when:

- semantic reading order stays coherent;
- keyboard order remains logical;
- heading hierarchy remains valid;
- mobile fallback remains understandable.

Do not use CSS reordering or absolute positioning to create an incoherent linearized page.

## Typed data + MDX

Recommended hybrid:

### Typed structured data

Use for:

- metadata;
- block type;
- IDs;
- references;
- publication state;
- technologies/capabilities;
- media relationships;
- decision metadata.

### MDX/rich text

Use for:

- narrative paragraphs;
- explanations;
- lists;
- links;
- emphasis;
- short code.

Prefer semantic blocks:

```mdx
<Problem>
  ...
</Problem>

<Decision id="content-model">
  ...
</Decision>
```

Avoid theme-specific classes in content.

## Technology registry

Projects should reference central IDs.

Illustrative:

```ts
const technologies = {
  nextjs: { label: "Next.js", category: "frontend" },
  typescript: { label: "TypeScript", category: "language" },
  go: { label: "Go", category: "backend" },
};
```

Do not treat incidental packages as portfolio technologies.

## Capability registry

Possible IDs:

- `product-ui-engineering`
- `frontend-development`
- `backend-development`
- `full-stack-development`
- `system-architecture`
- `api-design`
- `data-modeling`
- `design-systems`
- `accessibility`
- `performance`
- `localization`
- `security`
- `devops-deployment`
- `testing-quality`
- `developer-tooling`
- `technical-documentation`

Select only capabilities a project can support with evidence.

## Contribution/ownership

Where useful, model contribution without percentages.

Conceptual:

```ts
interface ProjectContribution {
  productDirection?: "primary" | "shared" | "supporting";
  architecture?: "primary" | "shared" | "supporting";
  uiDirection?: "primary" | "shared" | "supporting";
  implementation?: "manual" | "ai-assisted" | "mixed";
  review?: string;
  testing?: string;
}
```

Exact implementation is flexible.

## AI-assisted development

Good framing may explain that:

- requirements and architecture were deliberately defined;
- AI assisted implementation/research/testing;
- output was reviewed and verified;
- tradeoffs remained the owner's responsibility.

Avoid:

- hiding meaningful AI use;
- making AI the project's main selling point;
- unsupported manual-authorship claims;
- invented contribution percentages.

## Decision logs

Decision records are especially valuable.

Example:

```ts
{
  id: "D004",
  title: "Use structured content metadata plus MDX",
  context: "...",
  decision: "...",
  rationale: "...",
  tradeoffs: "..."
}
```

Theme treatment:

- Editorial: essay/pull section.
- Engineer: formal decision record.
- Digital: interactive/spatial node.

## Scan mode and deep read

The same case study should naturally support both.

### Scan

- title;
- summary;
- media;
- key decisions;
- architecture;
- result.

### Deep read

- tradeoffs;
- technical details;
- challenges;
- diagrams;
- code excerpts;
- reflections.

No explicit mode toggle is required.

## Validation

Validate where practical:

- unique slugs;
- valid publication states;
- valid technology/capability IDs;
- media reference existence;
- alt text where required;
- locale objects;
- valid block discriminators;
- valid links;
- unique internal IDs.

## Principle

The schema exists to support strong project stories.

Projects do not exist to fill the schema.
