# 04 — Theme and Composition System

## Why this system exists

The portfolio's main differentiator is that the same underlying content can be interpreted through multiple coherent visual and information systems.

A normal theme architecture is insufficient.

Changing only colors, fonts, border radius, or backgrounds would fail the design goal.

The system therefore separates **composition** from **theme tokens**.

## Definitions

### Theme

Defines visual language:

- typography;
- color;
- border;
- radius;
- elevation;
- imagery treatment;
- spacing scale;
- motion personality;
- grid characteristics;
- decorative primitives.

### Composition

Defines:

- where information appears;
- which content is emphasized;
- how sections are grouped;
- how media relates to text;
- how project previews are structured;
- how case-study blocks are visually sequenced;
- whether architecture/metadata appears early or late;
- whether content is sparse or dense.

## Launch modes

```text
editorial
engineer
digital
```

The active mode selects both:

1. a theme token set;
2. a composition profile.

## Shared semantic contract

High-level page components operate on shared content.

Conceptual:

```tsx
<ProjectFeature project={project} />
```

The implementation resolves the active composition.

Possible architecture:

```ts
const compositions = {
  editorial: {
    Hero: EditorialHero,
    ProjectFeature: EditorialProjectFeature,
    CaseStudyIntro: EditorialCaseStudyIntro,
    ArchitectureDisplay: EditorialArchitectureDisplay,
  },
  engineer: {
    Hero: EngineerHero,
    ProjectFeature: EngineerProjectFeature,
    CaseStudyIntro: EngineerCaseStudyIntro,
    ArchitectureDisplay: EngineerArchitectureDisplay,
  },
  digital: {
    Hero: DigitalHero,
    ProjectFeature: DigitalProjectFeature,
    CaseStudyIntro: DigitalCaseStudyIntro,
    ArchitectureDisplay: DigitalArchitectureDisplay,
  },
};
```

This is conceptual, not mandatory exact code.

## Shared lower-level semantic pieces

Theme-specific compositions should reuse shared primitives where possible:

- ProjectTitle
- ProjectSummary
- ProjectMeta
- ProjectMedia
- Status
- TechnologyList
- CapabilityList
- LocaleLink
- AccessibleLink
- Figure
- Caption
- ExpandableTechnicalDetail

Do not duplicate data-fetching/content logic inside each theme.

## Fallback renderer rule

Every semantic content block must have a shared fallback renderer.

If Digital has no specialized renderer for a new block type:

```text
Digital specialized renderer
        ↓ unavailable
Shared semantic renderer
```

The page still works.

## Composition contract

A typed contract is recommended.

Illustrative:

```ts
interface PortfolioComposition {
  Hero: ComponentType<HeroProps>;
  ProjectFeature: ComponentType<ProjectFeatureProps>;
  ProjectIndex: ComponentType<ProjectIndexProps>;
  CaseStudyIntro: ComponentType<CaseStudyIntroProps>;
  SectionHeading: ComponentType<SectionHeadingProps>;
  blockRenderers?: Partial<Record<CaseStudyBlock["type"], ComponentType<any>>>;
}
```

Required/optional surfaces may be refined.

## Editorial composition

### Purpose

Feel like a carefully art-directed publication.

### Priority

```text
story > imagery > rationale > technical detail
```

### Homepage

Hero:

- asymmetrical;
- large typography;
- restrained metadata;
- optional atmospheric/project-adjacent visual;
- concise statement;
- generous negative space.

Selected Work:

- varied compositions;
- not a uniform card grid;
- each flagship project may have a different relationship among title, image, summary, year, and metadata;
- strong vertical rhythm.

Capabilities:

- editorial list;
- minimal card treatment;
- numbering/labels may become compositional elements.

About Preview:

- narrow readable prose;
- optional portrait/abstract visual;
- spacious.

Lab:

- understated studies/catalogue feel.

### Case studies

Editorial may defer deep architecture until the reader understands:

- why the project exists;
- audience/context;
- information/product shape;
- important decisions.

Typical rhythm:

```text
narrative
↓
large media
↓
decision/rationale
↓
detail media
↓
architecture
↓
result
```

### Anti-patterns

Avoid:

- generic blog template;
- excessive centered text;
- everything in white cards;
- serif use that harms long-form readability;
- decorative Japanese without content value.

## Engineer composition

### Purpose

Present work as technical systems and decision records.

### Priority

```text
system > architecture > decisions > implementation > visual evidence
```

### Homepage

Hero may resemble a profile/system record:

```text
PROFILE
NAME
ROLE
FOCUS
LOCATION
TARGET
STATUS
```

Selected Work may become a project registry:

```text
01 / NIHONEST
TYPE
STATUS
YEAR
ROLE
STACK
SYSTEMS
```

Images act as evidence rather than dominant decoration.

Capabilities may be grouped by technical domain:

- Frontend
- Backend
- Platform
- Tooling

### Case studies

Architecture appears earlier.

Useful patterns:

- system overview;
- project status record;
- objectives/requirements;
- decision log;
- architecture diagram;
- implementation notes;
- constraints;
- reliability/testing.

### Anti-patterns

Avoid:

- fake terminal requiring commands;
- green-on-black hacker cliché;
- tiny unreadable type;
- excessive ASCII decoration;
- hiding visual/project context;
- monospace body copy where readability suffers.

## Digital composition

### Purpose

Demonstrate expressive frontend design, spatial composition, motion, and interaction.

### Priority

```text
interaction > visual experience > process > narrative > technical depth
```

### Homepage

Hero may use:

- oversized typography;
- layered project media;
- peripheral metadata;
- pointer-responsive but nonessential movement;
- strong spatial composition.

Selected Work may use:

- project index controlling a large preview surface;
- viewport-scale project sections;
- overlapping type/media;
- stronger continuity from preview to detail.

### Case studies

Digital may use:

- layered content;
- multiple blocks within one viewport;
- animated diagrams;
- interactive information models;
- image sequences;
- media-led transitions;
- spatial decision presentation.

Use normal scrolling.

### Anti-patterns

Avoid:

- scroll hijacking;
- mandatory splash screens;
- pointer-only navigation;
- unreadable overlapping text;
- constant parallax;
- animations delaying content;
- WebGL for every visitor;
- hiding links because a visual interaction exists.

## Theme identity test

Within about five seconds after switching:

Editorial should feel like:

> a design publication.

Engineer should feel like:

> a technical system interface.

Digital should feel like:

> an interactive digital studio.

Yet all should clearly be Tyler Tapia's portfolio.

## Theme selector

It should be easy to find without becoming the primary attraction.

Possible conceptual labels:

Editorial:

```text
Style
Editorial
```

Engineer:

```text
MODE: ENGINEER
```

Digital:

A compact graphical selector is acceptable.

The conceptual location/function should remain recognizable.

## Theme persistence

Persist locally.

Default:

```text
editorial
```

No account/server profile persistence.

A cookie or pre-paint initialization may be used to avoid flash/reflow.

## Shareable style URL

Optional:

```text
?style=engineer
```

Rules:

- may override local default for that visit;
- canonical URL excludes style;
- invalid values fall back safely;
- theme variants are not distinct SEO content.

## Adding a future theme

Expected workflow:

1. define token profile;
2. define composition profile;
3. implement required surfaces;
4. add optional specialized block renderers;
5. define motion profile;
6. register theme;
7. add preview fixtures;
8. pass compatibility/accessibility/visual tests.

No content migration should be needed.

## Architectural smell tests

Something is wrong if:

- project files import theme-specific components;
- project data contains `engineerLayout`;
- MDX contains Digital-only utility classes;
- each project has three duplicate renderers;
- adding a project requires theme-registry edits;
- adding a theme requires project edits;
- switching theme navigates to a duplicate page copy.

## Principle

> **Themes are different interpretations of shared meaning, not separate websites.**
