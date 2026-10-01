# 05 — Visual Design Grammar

## Purpose

This document defines visual rules that should survive implementation-level refinement.

Exact fonts, colors, breakpoints, and individual compositions remain open to art direction.

## Global layout philosophy

Use a flexible editorial grid rather than a rigid dashboard grid.

Suggested desktop foundation:

- 12-column grid;
- deliberate outer margins;
- large vertical spacing;
- controlled asymmetry;
- multiple content widths;
- alignment consistency even when section layouts differ.

Mobile should not attempt to preserve desktop asymmetry literally.

## Content widths

Support semantic width categories.

### Narrow

For:

- long prose;
- detailed explanations;
- About text;
- decision rationale;
- reflection.

Approximate target:

```text
700–800px
```

### Standard

For:

- page sections;
- mixed content;
- project overview layouts.

Approximate target:

```text
1200–1400px
```

### Wide

For:

- project visuals;
- diagrams;
- hero compositions;
- galleries;
- immersive sections.

Approximate target:

```text
1600px+
```

These are conceptual, not locked constants.

## Spacing

Use a semantic scale, for example:

```text
2xs
xs
sm
md
lg
xl
2xl
3xl
4xl
```

Relationships matter more than exact values.

Typical semantics:

- text-to-text: small;
- heading-to-body: medium;
- component-to-component: large;
- section-to-section: very large.

Themes may reinterpret density while preserving hierarchy.

## Typography hierarchy

Required semantic roles:

- Display
- Section
- Title
- Body
- Meta
- Mono/Technical

Do not couple role to a single font family.

### Editorial

Possible behavior:

- expressive display;
- refined sans/serif pairing;
- quiet metadata;
- strong typographic composition.

### Engineer

Possible behavior:

- monospace metadata;
- technical headings;
- readable sans for long body copy;
- dense but legible.

### Digital

Possible behavior:

- bold/grotesk or expressive display;
- large scale contrast;
- controlled tracking;
- dynamic positioning;
- clean body typography.

## Font strategy

Prefer:

- one high-quality variable family; or
- one display family plus one body family.

Japanese support should be intentional.

Potential direction:

- modern Gothic for UI/body;
- selective Mincho accent in Editorial if appropriate.

Do not use Japanese glyphs simply as decoration.

## Heading composition

Headings may become spatial design elements.

Examples:

```text
01
SELECTED
WORK
```

or:

```text
WORK                          2026
```

Section labels, numbers, and metadata can participate in composition.

## Navigation grammar

Shared destinations:

```text
WORK
ABOUT
LAB
CONTACT
```

plus:

```text
EN / 日本語
STYLE
```

### Editorial

Minimal, likely horizontal.

### Engineer

Indexed/structured.

Example:

```text
[01] WORK
[02] ABOUT
[03] LAB
[04] CONTACT
```

Optional visible route/path metadata may appear.

### Digital

May use edge-mounted, overlay, or spatial presentation, but must remain obvious.

## Sticky navigation

Recommended:

- minimal top state;
- compact/solidified scrolled state;
- theme and locale controls remain available;
- no excessive vertical occupancy.

## Hero

The hero should be concise and visually meaningful.

Do not default to a generic centered `100vh` hero.

Core information:

- Tyler Tapia;
- Software Engineer / Web Developer;
- concise statement;
- Hawaii → Japan/relocation context where appropriate;
- optional visual;
- style selector.

Each mode may compose these differently.

## Project presentation

Avoid homogeneous flagship card grids.

Supported intentions:

- full-width feature;
- split;
- offset;
- text-led;
- horizontal;
- contained evidence view;
- interactive preview surface.

Themes may rotate through multiple compositions.

## Project preview interactions

Hover/focus may reveal:

- image crop/shift;
- metadata;
- call-to-action;
- contextual cursor label;
- title motion;
- brief description.

Essential information must not require hover.

Touch receives equivalent accessible behavior.

## Imagery

Prefer curated evidence over endless full-browser screenshots.

Useful media:

- full interface capture;
- cropped detail;
- mobile view;
- feature sequence;
- architecture diagram;
- process artifact;
- interaction recording;
- before/after or state comparison.

## Device mockups

Use sparingly.

Prefer:

- direct UI crops;
- framed browser context when meaningful;
- device frames only when mobile behavior matters.

Avoid a mockup-marketplace aesthetic.

## No-image behavior

Never use generic placeholders or fake stock imagery.

If media is absent, recompose using:

- project typography;
- structured metadata;
- diagrams;
- code excerpts where meaningful;
- theme-derived geometric treatment;
- project mark/monogram;
- purposeful color/line system.

A no-image project should still look intentional.

## Case-study opening

Treat it as editorial/technical narrative, not ecommerce product detail.

Core elements may include:

- project title;
- summary;
- year;
- role;
- stack;
- status;
- primary media.

Themes decide arrangement.

## Case-study rhythm

Recommended cadence:

```text
context
↓
visual/evidence
↓
decision
↓
detail
↓
technical/system explanation
↓
result
```

Avoid long uninterrupted walls of text.

## Code

Use code only when it demonstrates something meaningful.

Good reasons:

- unusual localization architecture;
- theme/composition mechanism;
- concurrency pattern;
- structured content design;
- specific performance/security technique.

Bad reason:

- proving React or Next.js exists.

Keep snippets short.

## Diagrams

Prefer diagrams over code screenshots for architecture.

Where practical, store diagram data semantically so themes can style it differently.

## Color

Editorial:

- restrained;
- neutral foundation;
- one accent;
- near-black text;
- low visual noise.

Engineer:

- restrained technical palette;
- strong hierarchy;
- avoid neon-green cliché.

Digital:

- may use stronger accents;
- ensure contrast;
- do not rely on glow alone for state.

## Geometry

Possible direction:

| Mode | Geometry |
|---|---|
| Editorial | subtle rules, minimal radius |
| Engineer | square/structural |
| Digital | modular, layered, dynamic |
| Product (future) | moderate radius |
| Graphic (future) | hard edges/heavy borders |

## Backgrounds

Editorial should remain visually quiet.

Possible:

- subtle grain;
- faint grid;
- hairline rules;
- flat fields;
- restrained inverse sections.

Digital can be louder.

## Microcopy

Prefer clear, human language.

Examples:

- Explore the project
- How it works
- Open experiment

Avoid corporate filler and exaggerated claims.

## Writing tone

Desired:

- clear;
- concise;
- thoughtful;
- confident;
- specific;
- non-inflated.

Avoid:

> Passionate software engineer leveraging cutting-edge technologies to create innovative solutions.

Prefer:

> I build web applications with an emphasis on clear interfaces, maintainable systems, and thoughtful product decisions.

## Theme-switch principle

Switching modes should obviously change:

- composition;
- density;
- hierarchy;
- typography;
- media treatment;
- motion personality.

Not merely color.

## Principle

Visual ambition should increase demonstrated judgment, not decorative volume.
