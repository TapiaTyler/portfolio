# 16 — Content Governance

## Purpose

Keep the portfolio maintainable as projects evolve.

Governance prevents:

- stale claims;
- duplicated facts;
- inconsistent technology naming;
- theme-specific content drift;
- accidental draft publication;
- exaggerated portfolio language.

## Source of truth

Each project has one canonical portfolio content record.

Do not maintain separate:

- Editorial copy;
- Engineer copy;
- Digital copy.

Themes reinterpret shared content.

## Adding a project

Expected workflow:

1. gather project discovery source material;
2. create project record/folder;
3. add locale-neutral metadata;
4. add English summary/content;
5. add media references;
6. add optional Japanese summary/content;
7. validate;
8. set publication state;
9. preview through all themes;
10. publish.

Normal project creation should not require editing:

- theme registry;
- composition implementation;
- global navigation logic.

## Updating a project

When implementation evolves:

- update factual status;
- replace outdated screenshots;
- update architecture when materially changed;
- keep historical decisions only when still useful;
- distinguish roadmap from completed work.

Avoid copy that describes a planned feature as implemented.

## Accuracy

Every public claim should be:

- true;
- supportable;
- relevant;
- current enough not to mislead.

Do not invent:

- users;
- revenue;
- performance gains;
- production adoption;
- client work;
- business results.

## AI/process claims

Be accurate about AI assistance.

Do not claim:

- "built entirely by hand" if false;
- "AI did everything" if product direction/architecture were actively managed;
- exact contribution percentages without evidence.

Prefer clear process explanation.

## Technology naming

Use the central registry.

Examples:

- `PostgreSQL` consistently rather than random `Postgres`/`PostgreSQL` display;
- `Next.js`, not inconsistent `NextJS`.

## Capability claims

Only reference a capability when the project can demonstrate it.

Avoid giving every project:

- Architecture
- Security
- Accessibility
- Performance
- Design Systems

unless those are real strengths in that project.

## Publication states

Recommended:

```text
draft
published
hidden
```

### Draft

Under development and not publicly indexed.

### Published

Available on public Work routes.

### Hidden

Retained internally but intentionally undiscoverable.

## Featured state

Separate from publication.

A published project may not be featured.

Homepage should not automatically show all public work.

## Project status

Separate from publication.

Examples:

- active;
- complete;
- prototype;
- planned;
- archived.

A planned project should never look like a finished production application.

## Translation status

Japanese depth tracked separately:

- none;
- summary;
- partial;
- complete.

Do not duplicate English text just to mark Japanese complete.

## Media freshness

When UI changes materially:

- review flagship screenshots;
- replace outdated images if they would misrepresent the current project.

Architecture diagrams should match the version described by the case study.

## Content tone

Keep:

- factual;
- clear;
- thoughtful;
- confident.

Avoid inflated language such as:

- cutting-edge;
- revolutionary;
- seamless;
- world-class;

unless a very specific factual use is justified.

## Content density

Suggested:

- flagship project: 5–8 strong substantive sections;
- normal project: 2–4;
- Lab: short by default.

Do not turn every project into a thesis.

## Reflection

Personal reflection should come from Tyler or be clearly based on documented evidence.

Agents should not fabricate feelings or lessons.

## Removing/archiving work

Removing a project from the homepage does not require deleting it.

Use publication/featured states.

Older work may remain if it:

- demonstrates a still-relevant capability;
- shows useful progression;
- meets current quality standards.

Do not retain every school exercise simply because it exists.

## Principle

A smaller number of defensible, well-explained projects is stronger than exhaustive coverage.
