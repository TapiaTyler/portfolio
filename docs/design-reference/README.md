# Portfolio Design References

This folder contains the approved homepage design references for the portfolio's three launch presentation modes:

- `editorial.html`
- `engineer.html`
- `digital.html`

These HTML files were generated as design prototypes and then explicitly selected as strong visual baselines.

They are **design references, not production source code and not authoritative portfolio content**.

## What these references are authoritative for

Treat the HTML files as high-priority references for:

- visual direction;
- page composition;
- section proportions;
- relative information density;
- typography character;
- color relationships;
- borders, geometry, surfaces, and background treatments;
- project-preview presentation;
- theme-specific navigation treatment;
- visual hierarchy;
- responsive intent visible in the markup;
- interaction flavor represented by hover/focus/transition classes;
- decorative motifs.

When these HTML references conflict with older speculative descriptions of how a theme *might* look, prefer these references for the **homepage visual direction**, because these are the layouts that were reviewed and selected.

## What these references are NOT authoritative for

Do not use these files as the source of truth for:

- project facts;
- project dates;
- project statuses;
- project technology stacks;
- project architecture;
- role/contribution claims;
- biography;
- cultural/ethnic background;
- relocation destination beyond what is verified in portfolio content;
- availability/employment-status claims;
- contact email addresses;
- social/profile URLs;
- project domains;
- case-study copy;
- Lab experiment names;
- metrics;
- activity/changelog dates;
- public deployment state;
- Japanese translations;
- accessibility conformance claims.

Stitch generated placeholder and invented content in the reference HTML.

The production portfolio must obtain factual content from the portfolio's typed content model and project-discovery process.

## Source-of-truth priority

Use this priority when sources disagree.

### Architecture, behavior, factual content, and accessibility

1. `AGENTS.md`
2. Portfolio architecture/product documentation in `/docs`
3. Typed portfolio content/project-discovery results
4. These design-reference documents
5. Reference HTML
6. Agent inference

### Visual homepage direction

1. These design-reference documents
2. The corresponding reference HTML
3. Portfolio visual/design documentation
4. Agent inference

This distinction is intentional.

The reference HTML has strong authority over **what the approved theme should look and feel like**, but it has low authority over **what the portfolio says and how the production application is architected**.

## Required implementation approach

Do **not** copy these HTML pages wholesale into React/Next.js.

The production architecture remains:

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

Use each HTML file to infer the composition and visual grammar for its theme, then implement that grammar through the portfolio's shared semantic system.

Examples:

- the Editorial reference shows a 12-column editorial composition with large media, restrained metadata, and narrative/media balance;
- the Engineer reference shows dossier-like records, compact metadata tables, system panels, and denser information organization;
- the Digital reference shows an atmospheric HUD/cybernetic system with strong spatial hierarchy, luminous accents, layered surfaces, and more expressive interaction.

Those ideas should become production theme/composition implementations, not three standalone copied pages.

## Shared identity requirements

All three modes must still render the same underlying portfolio.

They must share:

- canonical project data;
- project availability;
- public routes;
- SEO identity;
- locale system;
- content blocks;
- capability registry;
- technology registry;
- semantic meaning;
- accessibility requirements.

The theme may change how the information is organized and emphasized.

The theme must not change what is factually true.

## Recommended folder structure

```text
design-references/
├── README.md
├── IMPLEMENTATION-CONTRACT.md
├── EDITORIAL-REFERENCE.md
├── ENGINEER-REFERENCE.md
├── DIGITAL-REFERENCE.md
├── EXTENDING-THE-DESIGNS.md
├── editorial.html
├── engineer.html
└── digital.html
```

Coding agents should read:

1. `README.md`
2. `IMPLEMENTATION-CONTRACT.md`
3. the relevant theme reference Markdown
4. the corresponding HTML file

before implementing or substantially revising a theme.

## Important content warning

The design prototypes contain plausible-looking but unsupported content.

Do not "clean up" or normalize that prototype content into production data.

Replace it through the real content system.

In particular, do not assume that a generated project technology, date, title, biography sentence, location, metric, or link is correct merely because it appears polished in the prototype.

## Goal

The final portfolio should make someone switching modes think:

- Editorial: **a refined design publication**
- Engineer: **a precise technical system interface**
- Digital: **an expressive interactive digital studio**

while still clearly remaining one portfolio built from one semantic content system.
