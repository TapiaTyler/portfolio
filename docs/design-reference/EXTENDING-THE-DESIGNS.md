# Extending the Approved Designs to New Screens

## Purpose

The three HTML files in this folder define approved **homepage visual systems**.

Secondary routes should not be independently redesigned with a generic AI aesthetic.

When creating Work, Case Study, About, Lab, Contact, or error screens, extrapolate from the approved homepage grammar.

## General rule

Do not ask:

> What would an Editorial/Engineer/Digital portfolio page normally look like?

Ask:

> How would the exact approved theme primitives in this folder reorganize this new semantic content?

## Editorial extrapolation

Reuse:

- warm paper;
- hairlines;
- serif display hierarchy;
- narrow prose;
- wide editorial canvas;
- 5/7 and 7/5 relationships;
- large media interruption;
- sparse metadata;
- low-radius frames;
- restrained mono labels.

### Work index

Prefer:

- large vertical rhythm;
- varied editorial arrangements;
- no uniform grid unless comparison genuinely benefits from one.

### Case study

Prefer:

- magazine/article pacing;
- narrow text;
- full/wide media;
- decision sections;
- selective architecture diagrams;
- quiet captions.

### About

Prefer:

- narrative;
- large statement;
- selective visual;
- education/certifications as clean editorial records.

### Lab

Prefer:

- contact sheet/catalogue;
- image or experiment preview;
- small captions.

## Engineer extrapolation

Reuse:

- dark blue-black system palette;
- JetBrains Mono;
- status headers;
- bordered records;
- metadata rows;
- green/cyan/amber semantics;
- dot grid;
- square geometry;
- dense structured layouts.

### Work index

Prefer:

- project registry;
- filters as system controls only if genuinely useful;
- status/type/year/role metadata.

### Case study

Prefer:

- project identity dossier;
- system overview near top;
- architecture;
- decision log;
- implementation evidence;
- challenges/results.

### About

Prefer:

- profile record;
- capability matrix;
- education/certifications;
- workflow;
- concise biography after structured information.

### Lab

Prefer:

- experiment registry;
- IDs/status;
- technology/purpose;
- optional logs.

## Digital extrapolation

Reuse:

- near-black atmospheric surface;
- cyan identity;
- strong sans display;
- mono telemetry;
- translucent panels;
- grid/glow;
- project-specific accents;
- spatial diagrams;
- bolder motion.

### Work index

Prefer:

- rich system cards or a related responsive deck;
- stronger media;
- hover/focus glow;
- accent-coded projects.

### Case study

Prefer:

- immersive project opening;
- layered media;
- status/meta HUD;
- visual system diagrams;
- interactive but optional details;
- strong continuity between preview and detail.

### About

Prefer:

- spatial narrative;
- relationship/bridge visualization;
- capability panels;
- strong identity statement.

### Lab

Prefer:

- active experiment deck;
- live or animated previews where cheap and accessible.

## Shared secondary-page requirements

Regardless of theme:

- same route;
- same project facts;
- same locale;
- same case-study blocks;
- same accessible semantic order;
- same canonical page identity.

The theme changes composition and emphasis.

## Preventing generic AI UI drift

Before approving a new screen, compare it to the homepage reference.

Reject it if it introduces unexplained patterns such as:

- generic gradient hero unrelated to the theme;
- random rounded feature cards in Editorial;
- soft glass cards in Engineer;
- flat SaaS cards in Digital;
- unrelated font families;
- new color systems;
- random iconography;
- layout density inconsistent with the mode.

Every new screen should appear to have been designed by the same system as its approved homepage.

## New primitive rule

Only introduce a new visual primitive if the existing grammar cannot express the new content.

When adding a new primitive:

1. identify the semantic need;
2. establish how it behaves in all three themes or provide a shared fallback;
3. add it to `/dev/design-system` or `/dev/compositions`;
4. document it if it becomes reusable;
5. test responsive and localization behavior.

## Practical agent workflow for a new page

1. Read `README.md`.
2. Read `IMPLEMENTATION-CONTRACT.md`.
3. Read the relevant theme reference Markdown.
4. Inspect the corresponding HTML.
5. Identify 3–5 existing composition primitives that can transfer.
6. Map the new page's semantic content to those primitives.
7. Implement through shared content/components.
8. Compare visually with the approved homepage.
9. Test mobile.
10. Test English and Japanese.
11. Test keyboard and reduced motion.
12. Only then add new visual ideas.

## Case-study cross-theme example

Given the same semantic content:

```text
Project intro
Problem
Goals
Decision
Architecture
Media
Challenge
Result
```

### Editorial

May render as:

```text
large title + restrained metadata
wide hero media
narrow problem narrative
decision essay
large visual interruption
architecture later in story
result/reflection
```

### Engineer

May render as:

```text
project dossier
objectives
system overview
architecture
decision log
implementation evidence
challenge/status
result
```

### Digital

May render as:

```text
immersive title/media
HUD metadata
problem + goal pairing
layered decision visualization
interactive/animated architecture
media sequence
result
```

The data remains shared.

## Fidelity rule

For new routes, exact homepage layouts do not need to be repeated.

What must remain recognizable is the system:

- Editorial = publication;
- Engineer = dossier/system;
- Digital = expressive HUD/studio.

If a screenshot of a secondary page could be mistaken for a generic unrelated template, the extrapolation has failed.
