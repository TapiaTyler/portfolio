# 11 — Media, Diagrams, and Asset System

## Purpose

Project media should function as evidence.

Do not treat imagery as generic decoration.

The same source media should be reusable across themes with different cropping/framing where practical.

## Illustrative media model

```ts
interface ProjectMedia {
  id: string;

  type:
    | "image"
    | "video"
    | "animation"
    | "diagram";

  src: string;
  alt: string;

  caption?: string;

  width?: number;
  height?: number;
  aspectRatio?: string;

  focalPoint?: {
    x: number;
    y: number;
  };

  purpose:
    | "overview"
    | "detail"
    | "mobile"
    | "architecture"
    | "process"
    | "result";
}
```

## Purpose metadata

`purpose` describes why an asset exists.

This allows composition logic to prioritize assets intelligently.

Examples:

- Editorial may prioritize `overview`.
- Engineer may bring `architecture` forward.
- Digital may prefer `overview` + `detail` sequences.

## Asset types

### Overview

Broad project context.

Examples:

- primary application screen;
- representative landing page;
- dashboard overview.

### Detail

Shows a specific feature or decision.

### Mobile

Demonstrates responsive/mobile behavior.

### Architecture

Shows system structure or data flow.

### Process

Shows design/development progression where meaningful.

### Result

Shows final state or concrete output.

## Image treatment by theme

### Editorial

- larger framing;
- selective full bleed;
- editorial cropping;
- strong whitespace.

### Engineer

- contained evidence;
- visible full UI where useful;
- annotations/figure metadata;
- technical context.

### Digital

- aggressive crop/mask;
- layering;
- motion;
- transitions.

Do not duplicate assets merely to support different frames unless necessary.

## Focal points

Store optional focal point information so responsive/theme crops can preserve important content.

## Screenshot guidelines

Prefer screenshots that demonstrate something.

Avoid:

- redundant captures of every route;
- browser chrome in every image;
- low-resolution captures;
- outdated UI;
- private/sensitive data.

## Device frames

Use sparingly.

Good when:

- mobile behavior is important;
- device context genuinely helps.

Avoid turning every screenshot into a floating laptop/phone mockup.

## Video/motion clips

Use for:

- meaningful interaction;
- complex transition;
- live monitoring state;
- responsive behavior;
- animation experiment.

Rules:

- short;
- muted;
- poster image;
- lazy load;
- no autoplay sound;
- accessible caption/description;
- pause offscreen where practical.

## No-image behavior

Never show generic placeholders.

If media is unavailable, intentionally recompose using:

- typography;
- metadata;
- architecture diagram;
- data/system representation;
- code excerpt when meaningful;
- project mark;
- theme geometry.

The no-image state should still appear designed.

## Architecture diagrams

Prefer structured/component-generated diagrams rather than static raster screenshots when feasible.

Possible model:

```ts
interface Diagram {
  id: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  groups?: DiagramGroup[];
  accessibleSummary: string;
}
```

Structured diagrams allow theme-specific interpretation.

### Editorial diagram

- minimal;
- clean;
- generous whitespace.

### Engineer diagram

- precise;
- technical labels;
- system groups;
- data-flow emphasis.

### Digital diagram

- may animate;
- may reveal relationships;
- may respond to focus/hover;
- remains accessible.

## Useful diagram subjects

- user → app → services → data;
- scheduler → worker pool → HTTP checks → database;
- content source → processing → render;
- module relationships;
- request sequence;
- localization pipeline;
- generator → client project relationship.

Do not create diagrams merely to make a project look complex.

## Code screenshots

Avoid screenshots of code.

If code is worth showing:

- render actual text code;
- syntax highlight;
- keep excerpts short;
- explain why it matters.

## Asset organization

Possible:

```text
content/
  projects/
    nihonest/
      media/
      diagrams/
```

or a centralized asset store with stable IDs.

Exact location is flexible.

## Asset validation

Build/test should detect:

- broken media references;
- missing alt text for informative images;
- invalid dimensions where required;
- duplicate IDs.

## Licensing/privacy

Only use assets that can be publicly displayed.

Do not expose:

- credentials;
- API keys;
- client/private data;
- personal emails;
- database records;
- internal tools not intended for public display.

## Media recommendation source

When media must be collected, project discovery should identify:

- overview screenshot;
- detail screenshot;
- architecture diagram;
- mobile view;
- process visual;
- optional interaction recording.

## Principle

Every asset should answer:

> What does this help the visitor understand?
