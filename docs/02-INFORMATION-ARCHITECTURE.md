# 02 — Information Architecture

## Public route model

Recommended:

```text
/[locale]
/[locale]/work
/[locale]/work/[slug]
/[locale]/about
/[locale]/lab
/[locale]/contact
```

Examples:

```text
/en
/en/work
/en/work/nihonest
/en/about

/ja
/ja/work
/ja/work/nihonest
/ja/about
```

Development-only routes:

```text
/dev/design-system
/dev/compositions
```

These should not be publicly available in production.

## Navigation destinations

Conceptual destinations remain stable across themes:

- Work
- About
- Lab
- Contact
- Language selector
- Style/theme selector

Themes may alter visual presentation and placement, but not discoverability.

## Homepage semantic responsibilities

Recommended source order:

1. Hero
2. Selected Work
3. Capabilities
4. About Preview
5. Lab Preview
6. Contact

Themes may group or visually reposition these while preserving a coherent semantic reading order.

### Hero

Contains:

- name;
- professional role;
- concise positioning;
- location/relocation context where appropriate;
- theme/style access;
- optional visual treatment.

Do not require a full viewport height.

### Selected Work

Shows only a curated subset of the strongest work.

Avoid a large undifferentiated card grid.

Featured order is curated, not automatically chronological.

### Capabilities

Express meaningful areas of competence rather than technologies.

Possible examples:

- Product & UI Engineering
- Full-stack Development
- System Architecture
- Design Systems
- API/Data work
- Localization
- Accessibility/Performance

Actual visible set may be shorter.

### About Preview

Compact narrative entry into About.

Do not duplicate the whole About page.

### Lab Preview

Small number of experiments; communicates that experimentation is separated from production-oriented work.

### Contact

Simple and low-friction.

## Work index

Includes all published projects intended for public display.

Featured status is independent of publication.

Possible treatment:

- Editorial: curated visual index with varied compositions.
- Engineer: registry/project-record view.
- Digital: spatial or interactive project-selection view.

All derive from the same project registry.

## Project/case-study route

Stable canonical URL:

```text
/[locale]/work/[slug]
```

A shareable theme query may optionally exist:

```text
/en/work/nihonest?style=engineer
```

If implemented:

- canonical URL remains theme-independent;
- search engines do not treat styles as separate content pages;
- invalid values fall back safely.

## Major case-study topics

A project may include some combination of:

- Intro
- Problem
- Audience
- Goals
- Constraints
- Decisions
- Information Architecture
- Design / UX
- Architecture
- Data / Content Model
- Implementation Highlights
- Security / Reliability
- Challenges
- Results / Current State
- Reflection / Next Steps

No project must populate all of them.

## About page

Should not be a prose copy of a résumé.

Recommended areas:

- short biography;
- how Tyler works;
- interests/focus;
- technical capabilities grouped by function;
- education and certifications;
- professional workflow/tools;
- Japan relocation/employment context;
- résumé downloads/links;
- contact path.

Theme emphasis may differ:

- Editorial: biography/story first.
- Engineer: structured profile/capability/credentials first.
- Digital: concise identity plus interactive chronology/spatial capability treatment.

## Lab

Lab is intentionally less constrained than Work.

Possible content:

- motion studies;
- typography;
- CSS experiments;
- WebGL;
- layout explorations;
- component interactions;
- algorithm visualizations;
- small technical demos.

Lab entries may be tiny and do not need full case-study depth.

Experimental interactions must remain easy to exit.

## Contact

Potential items:

- email;
- GitHub;
- LinkedIn;
- résumé links.

Avoid requiring a server-backed form in V1 without a clear need.

## Footer

May include:

- Tyler Tapia
- GitHub
- LinkedIn
- Email
- location/relocation line
- year
- understated build information if desired

Keep it simple.

## Theme-specific information emphasis

Editorial:

```text
story > imagery > rationale > technical detail
```

Engineer:

```text
system > architecture > decisions > implementation > visual evidence
```

Digital:

```text
interaction > visual experience > process > narrative > technical depth
```

This is emphasis, not permission to remove content.

## Semantic order versus visual order

The DOM/read order must remain coherent even if grid/positioning produces another visual arrangement.

Do not create visual reordering that causes:

- results before problems for screen readers;
- unpredictable keyboard focus;
- nonsensical mobile order;
- broken heading hierarchy.

If a composition conflicts with semantic clarity, preserve semantics.

## Navigation behavior

Navigation may be sticky.

Recommended:

- top: visually light/minimal;
- scrolled: slightly stronger separation and possibly more compact;
- style selector remains reachable;
- mobile menu is accessible;
- locale selection remains available.

Avoid oversized sticky headers.

## Résumé strategy

About communicates the professional story.

Traditional résumé artifacts may be linked separately, potentially including:

- English résumé
- Japanese 履歴書
- Japanese 職務経歴書

They are external artifacts, not substitutes for About.

## Error routes

Design:

- 404
- unavailable project
- malformed route
- missing locale

Themes may present errors differently, but recovery actions remain clear.

## IA principle

Every page should answer:

1. Where am I?
2. What is this?
3. What can I do next?
4. Where can I go deeper?

Experimental styling must not weaken those answers.
