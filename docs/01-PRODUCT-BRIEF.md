# 01 — Product Brief

## Product statement

Build a professional portfolio website that presents Tyler Tapia as a software engineer/web developer capable of owning meaningful web products across product thinking, UI engineering, frontend implementation, backend systems, architecture, and maintainability.

The portfolio itself must demonstrate these capabilities through its architecture and interaction model.

The defining concept is not "a site with themes." It is:

> **A shared semantic portfolio interpreted through multiple complete design and composition systems.**

The site should remain excellent in its default Product mode even if a visitor never discovers the theme switcher.

## Primary purpose

Within roughly 30–60 seconds, a visitor should understand that Tyler:

- builds real web applications rather than only isolated exercises;
- thinks about product requirements and system constraints;
- can design and implement polished interfaces;
- can work across frontend and backend concerns;
- understands maintainability, accessibility, performance, and deployment;
- can explain meaningful technical/design decisions;
- can use AI-assisted development professionally rather than relying on it uncritically;
- has enough range to contribute in small-to-midsized teams where responsibilities may span multiple layers.

If a visitor spends longer, the case studies should substantiate those claims with evidence rather than slogans.

## Primary audience

### 1. Japanese web agencies and SMEs

Highest-priority audience.

Relevant environments may expect a developer to contribute across:

- frontend development;
- web applications;
- UI implementation;
- CMS/content integration;
- backend/API work;
- client requirements;
- maintenance;
- deployment;
- design-system implementation;
- some product/design judgment.

The site should communicate breadth without suggesting lack of focus.

Preferred positioning:

> Capable of taking a web product from concept and requirements through implementation and maintenance.

### 2. Product/startup engineering teams

Likely areas of interest:

- architecture;
- maintainability;
- implementation reasoning;
- TypeScript/framework competence;
- API/data design;
- testing;
- performance;
- accessibility;
- ownership;
- tradeoff reasoning.

### 3. Freelance clients

Freelance work is supported, but the site should not become a sales funnel at the expense of the engineering job-search goal.

It should naturally communicate:

- professional quality;
- design range;
- reliability;
- business-requirement understanding;
- maintainable implementation.

## Positioning

Avoid positioning Tyler exclusively as either a visual designer or backend-focused engineer.

Working positioning:

> **Software Engineer focused on web experiences, frontend systems, and full-stack applications.**

Potential hero phrasing:

> **Software Engineer / Web Developer**  
> Designing and building thoughtful digital experiences.

Exact final copy is not locked.

## Personality

The portfolio should feel:

- thoughtful;
- modern;
- precise;
- curious;
- technical;
- quietly expressive;
- deliberate rather than flashy for its own sake.

It should not feel like:

- a generic SaaS template;
- a résumé pasted into cards;
- a game-like experiment that hides the work;
- an art site whose usability depends on hidden interactions;
- a cliché developer aesthetic made entirely of green monospace text.

## Default design direction

The default mode is **Product**, approved on 2026-10-08 (D050). Presentation order:
Product, Editorial, Engineer, Digital, Chronicle. Valid saved choices take precedence.
The original Editorial direction below remains the visual grammar for that mode.

Influences:

- contemporary Japanese portfolio design;
- editorial composition;
- Swiss/grid discipline;
- typography-led presentation;
- restrained motion;
- strong negative space;
- deliberate asymmetry;
- limited UI chrome;
- curated imagery;
- narrow reading measures within wider visual compositions.

## Launch modes

### Editorial

Question it answers:

> Can this person exercise restraint, communicate clearly, and art-direct complex content?

Characteristics:

- spacious;
- narrative;
- typography-led;
- image-aware;
- refined;
- asymmetrical but controlled;
- long-form case-study rhythm.

### Engineer

Question it answers:

> Does this person think systematically and understand the software behind the interface?

Characteristics:

- structured;
- architecture-forward;
- metadata-rich;
- information-dense;
- decision-log oriented;
- precise;
- technical dossier/system-record presentation.

### Digital

Question it answers:

> Can this person create expressive, modern, interactive frontend experiences?

Characteristics:

- spatial;
- motion-led;
- layered;
- visually experimental;
- project/media-forward;
- strong interaction continuity;
- optional advanced effects.

## Future modes

Potential post-launch additions:

- **Product** — polished, friendly, commercially familiar, contemporary application/product UI.
- **Graphic** — bold, poster-like, hard-edged, expressive, typography-forward.

They are not V1 blockers.

## Core sections

Required top-level content:

- Home
- Work
- About
- Lab
- Contact

Project detail routes:

- `/work/[slug]`

The résumé is primarily represented by About, with conventional downloadable artifacts handled separately.

## Work hierarchy

### Featured Case Study

For substantial projects with enough evidence to discuss decisions, architecture, design, or implementation.

### Project

Meaningful work that deserves an entry but not necessarily a long case study.

### Experiment

Small studies of interaction, CSS, motion, rendering, visual systems, algorithms, or technical ideas.

Experiments primarily belong in Lab.

## Current flagship candidates

- Nihonest
- Upwatch
- Hospitality Platform

Do not assume all are complete or publicly deployable. Their factual status must come from project-specific discovery.

## Success criteria

The site succeeds if a visitor can quickly understand:

1. who Tyler is professionally;
2. what kinds of products he builds;
3. what the strongest projects demonstrate;
4. how to inspect deeper technical/design reasoning;
5. how to contact him or access professional artifacts.

The theme system succeeds if a visitor realizes:

> The same portfolio content has been reinterpreted through coherent visual and information systems, not simply recolored.

## Product constraints

The site should:

- be fast;
- be accessible;
- be bilingual-ready;
- work without authentication;
- require no database for V1;
- be inexpensive to host;
- support static generation where appropriate;
- make adding projects straightforward;
- make adding future themes possible without content migration.

## V1 required scope

- Next.js + TypeScript foundation
- locale-aware routing
- Home
- Work index
- project detail/case-study route
- About
- Lab
- Contact
- Editorial
- Engineer
- Digital
- theme persistence
- responsive behavior
- WCAG-oriented accessibility
- project/content registry
- typed content schema
- semantic rich content/MDX
- media system
- SEO metadata
- sitemap
- development design-system route
- composition comparison route
- testing baseline

## Explicitly deferred

- Product mode
- Graphic mode
- CMS
- database
- accounts
- authentication
- user profiles
- complex personalization
- full Japanese translation of every deep technical section
- heavy WebGL as a baseline requirement
- advanced analytics
- elaborate backend
- client-side content editor

## Anti-goals

Do not build:

- a collection of six identical project cards;
- a theme demo where the portfolio content is secondary;
- a default view dependent on WebGL;
- separate duplicated pages for each theme;
- theme-specific copies of project content;
- a schema forcing irrelevant fields into every project;
- a CMS simply because one could be built;
- cryptic Digital navigation;
- fake metrics or fabricated business impact;
- a giant technology-logo wall as the primary capability proof.

## Guiding principle

> **Design judgment, engineering judgment, and ownership — demonstrated through the site and through the work it presents.**
