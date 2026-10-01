# Engineer Theme — Approved Design Reference

Reference file: `engineer.html`

## Theme identity

Engineer is the systems-oriented interpretation of the portfolio.

The approved reference establishes:

- dark technical surfaces;
- dense but legible information;
- monospace-first typography;
- strict square geometry;
- compact headers;
- dossier panels;
- status labels;
- system metadata;
- grid/dot backgrounds;
- technical diagrams;
- project records instead of editorial features.

The intended reaction is:

> **A precise technical system interface — not merely a dark theme.**

## Reference token extraction

### Colors

Prototype tokens:

```text
sys-bg            #0A0E14
sys-surface       #0D1117
sys-panel         #111720
sys-border        #1E293B
sys-borderDim     #16202E
sys-borderBright  #334155

sys-green         #10B981
sys-greenDim      #064E3B
sys-cyan          #38BDF8
sys-amber         #F59E0B

text-primary      #E2E8F0
text-muted        #94A3B8
text-dim          #475569
```

Production should map these to semantic tokens.

### Fonts

Prototype:

```text
Primary / technical:
JetBrains Mono

Secondary display:
Space Grotesk
```

The body is intentionally monospace-first.

For production, retain the technical character while monitoring long-form readability.

Long case-study prose may use the supporting sans font if needed.

## Background

Prototype uses:

- deep blue-black;
- 24px radial dot grid;
- optional scanline language;
- subtle technical depth.

Use these motifs selectively.

Avoid turning every surface into a noisy terminal.

## Header

Reference characteristics:

- sticky compact bar;
- border bottom;
- dark translucent surface;
- small status/identity indicator;
- indexed navigation;
- language selector;
- explicit ENGINEER mode control;
- system-style mobile menu.

Preferred desktop navigation character:

```text
[WORK]
[ABOUT]
[LAB]
[CONTACT]
```

This indexed syntax is part of the theme personality.

## Hero: system dossier

The reference hero is structurally distinct from Editorial.

Desktop:

```text
12-column container
6 columns profile dossier
6 columns current systems / telemetry
```

Contained inside a bordered technical shell.

### Left: Profile

Uses a specifications-table pattern:

```text
NAME
ROLE
FOCUS
LOCATION
TARGET
STATUS
```

This is a strong compositional idea.

Production must populate it from verified content.

Do not hardcode prototype values.

### Right: Current systems

Shows project/system status rows and a technical route/telemetry visual.

Preserve the idea:

> The visitor is introduced to Tyler and major projects as a system state, not a narrative hero.

## Project Index

This is the clearest Engineer differentiator.

Each project is a dossier record.

### Structure

Outer:

- square border;
- panel header;
- project identifier;
- compact description/path.

Body desktop:

```text
Preview / evidence:
5 columns

Metadata dossier:
7 columns
```

Metadata may include only relevant real fields:

- type;
- status;
- year;
- role;
- stack;
- systems/capabilities.

Do not require all fields.

### Action

Engineer CTA language may use:

```text
INSPECT SYSTEM
```

or similar technical phrasing when appropriate.

The actual target remains a normal accessible project link.

## Project media treatment

Reference previews are contained inside technical frames.

Characteristics:

- dark evidence frame;
- square corners;
- small UI mockup;
- corner accents;
- low ornament beyond technical borders;
- media is evidence rather than dominant art direction.

When real project screenshots exist:

- use them;
- preserve the technical frame;
- avoid fabricating UI screenshots.

## Capabilities matrix

Reference uses four technical columns:

- Frontend
- Backend
- Platform
- Tools

This is acceptable as an Engineer-specific presentation of shared capability data.

Production should derive entries from real registries.

Do not hardcode unsupported skills simply because the prototype lists them.

## Activity / location section

Reference uses:

```text
Recent Activity:
8 columns

Location:
4 columns
```

This demonstrates a useful theme pattern:

- secondary information can be represented as logs/status panels.

However, the actual activity records are invented.

Production options:

- populate from real curated activity;
- replace with Lab/recent work;
- replace with current focus;
- omit if no useful real data exists.

Do not invent an activity feed.

## Footer

Reference uses a status HUD.

Potential theme language may be technical, but avoid false dynamic claims such as:

- all systems operational;
- available for work;

unless real content intentionally supplies them.

## Geometry

Strong rules:

- square corners;
- one-pixel borders;
- compact spacing;
- internal separators;
- no soft floating cards;
- minimal shadow.

This theme should feel assembled from panels and records.

## Density

Engineer should be the densest theme.

But:

- preserve readable type;
- avoid tiny important labels;
- mobile must reduce density;
- long prose may relax monospace use.

## Accent semantics

Reference suggests:

- green = active/primary system state;
- cyan = technical/link/data accent;
- amber = planning/warning/development state.

This semantic accent model is useful.

Do not use status colors inaccurately.

## Decorative system language

Reference includes:

- dot grid;
- coordinates;
- route map;
- telemetry labels;
- system IDs;
- status LEDs;
- bordered HUD frames.

Use this vocabulary consistently, not randomly.

## Motion

Prototype direction:

- status pulse;
- subtle hover color;
- small border changes;
- limited movement.

Recommended Engineer motion profile:

- precise;
- fast;
- low-distance;
- functional;
- little flourish.

## Mobile identity

Mobile should retain:

- indexed navigation;
- records;
- borders;
- system labels;
- technical hierarchy.

But reduce:

- metadata columns;
- tiny text;
- complex diagrams.

Use collapsible secondary detail if needed.

## Case-study extrapolation

The homepage reference should influence Engineer case studies.

Recommended structure:

1. Project identity record
2. Objectives / requirements
3. System overview
4. Architecture diagram
5. Decision log
6. Implementation evidence
7. Constraints / challenges
8. Results / current state
9. Reflection

Architecture and system facts should appear earlier than in Editorial.

## What to preserve strongly

- dark blue-black system palette;
- JetBrains Mono technical identity;
- square dossier framing;
- compact sticky status header;
- indexed navigation;
- 6/6 hero dossier;
- 5/7 project evidence/metadata split;
- metadata row structure;
- four-column capability matrix;
- green/cyan/amber system accents;
- grid/dot background;
- low-motion technical personality.

## What may be refined

- scanline intensity;
- exact route/telemetry art;
- exact profile fields;
- activity panel purpose;
- supporting sans usage;
- exact density;
- system labels/copy;
- number of capability columns at specific widths.

## Prototype content that must not be trusted

The reference contains generated project information.

Examples that must come from real content instead:

- Upwatch year/status/stack;
- Hospitality Platform year/status/role/stack;
- project system lists;
- project UI mockups;
- Recent Activity dates;
- availability status;
- coordinates as personal/location claims;
- build-version labels;
- technology capabilities;
- exact relocation destination.

Do not normalize these placeholders into the production content registry.
