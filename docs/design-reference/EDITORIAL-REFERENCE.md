# Editorial Theme — Approved Design Reference

Reference file: `editorial.html`

## Theme identity

Editorial is the narrative-led portfolio experience. It was the original default;
the owner selected Product as the default on 2026-10-08 (D050).

The approved reference establishes a quiet, high-end editorial system with:

- warm paper backgrounds;
- black/charcoal ink;
- muted taupe secondary text;
- fine hairline rules;
- large serif display typography;
- restrained sans-serif UI/body copy;
- Japanese serif support;
- large project imagery;
- generous negative space;
- narrow narrative text;
- simple, high-confidence navigation;
- extremely restrained visual chrome.

The intended reaction is:

> **A refined design publication that happens to be a software engineer's portfolio.**

## Reference token extraction

### Colors

Prototype tokens:

```text
paper           #FAF8F5
paper-card      #F3F0EB
ink-primary     #161616
ink-secondary   #5A5854
ink-muted       #8E8B85
hairline        #E4DFD7
hairline-dark   #C9C4BC
```

These values are strong starting references.

Production implementation should convert them to semantic theme tokens.

### Fonts

Prototype families:

```text
Display / Serif:
Cormorant Garamond

Body / UI:
Inter

Japanese:
Noto Serif JP
```

Roles matter at least as much as exact font choice.

The serif should communicate:

- editorial elegance;
- large-scale contrast;
- soft but controlled formality.

Inter handles:

- body;
- navigation;
- small labels.

Noto Serif JP creates a compatible Japanese editorial tone.

## Global surface

Body:

- warm off-white;
- dark ink;
- smooth antialiasing;
- no visible grid texture;
- no glassmorphism;
- very low ornamentation.

This mode should feel the least "UI-like" of the three.

## Main container

Prototype maximum width: approximately `1400px`.

Major sections use generous horizontal padding and full-width hairline separators.

Preserve the sense that content has room to breathe.

## Header

Key characteristics:

- sticky;
- approximately 80px high in the prototype;
- translucent warm paper background;
- subtle backdrop blur;
- bottom hairline;
- compact brand at left;
- Japanese name subline;
- simple horizontal nav on desktop;
- language pill;
- rounded theme selector;
- simple mobile menu.

### Brand treatment

Small uppercase identity rather than a large logo.

Japanese subline is secondary.

### Navigation

Use restrained labels:

- Work
- About
- Lab
- Contact

Do not make Editorial navigation playful or heavily animated.

## Hero composition

### Desktop grid

12-column layout.

Approximate reference:

```text
Left narrative:
5–6 columns

Right visual:
6–7 columns
```

The right visual has greater visual mass.

### Left

Contains:

- large serif role statement;
- italic contrast in second line;
- concise narrative;
- Hawaii → Japan metadata.

Large heading is the dominant element.

### Right

Contains a wide `16:10` visual frame.

The reference uses:

- nearly square geometry;
- subtle image motion;
- gradient overlay;
- small editorial caption.

### Production adaptation

The reference landscape is placeholder imagery.

Use:

- real approved project/personal visual;
- abstract theme artwork;
- or a deliberate no-image treatment.

Do not use an unapproved generated landscape simply because it appears in the reference.

## Selected Work

This is the most important Editorial section.

### Section header

- thin horizontal rule;
- compact mono uppercase section label;
- understated "View All Work".

### Rhythm

Large gaps between projects.

The goal is to make each featured project feel like an editorial feature rather than one tile among many.

### Project composition

Desktop:

```text
Narrative     Media
5 cols        7 cols
```

Mobile places media before narrative.

Narrative contains:

- project name in large serif;
- concise description;
- bottom hairline;
- case-study CTA;
- small year/category metadata.

Media contains:

- warm or dark presentation frame;
- nested browser/application evidence;
- restrained shadow.

### Important

Do not convert these into standard rounded SaaS cards.

The outer layout is editorial.

The project UI may appear inside a framed mock window, but the overall page should remain sparse.

## Capabilities

Reference:

- three columns on desktop;
- no cards;
- each column begins with a hairline;
- large serif capability title;
- short explanatory copy.

This is a preferred pattern for Editorial.

Avoid icon cards.

## About

Desktop reference:

```text
Image/visual:
5 columns

Narrative:
7 columns
```

The text column is dominant conceptually despite the large image.

Elements:

- small mono About label;
- large serif statement;
- two levels of prose;
- understated text CTA.

### Critical placeholder warning

The reference's portrait is generated placeholder imagery.

Do not use it as Tyler's portrait.

If no approved portrait exists:

- use no portrait;
- use project/process imagery;
- use abstract visual system;
- allow the layout to recompose.

## Lab

Reference presents Lab like an editorial contact sheet:

- section rule;
- small description;
- 2 columns on small screens;
- 4 columns on desktop;
- square imagery;
- tiny mono captions.

This is a strong baseline for Editorial Lab previews.

Lab imagery/content itself is placeholder until real experiments exist.

## Contact

Reference uses a split closing composition:

```text
Large CTA:
~7 columns

Japanese/secondary statement:
~5 columns
```

Large serif closing statement.

Simple underlined contact CTA.

No giant contact form.

## Footer

Reference:

- warm slightly darker paper;
- hairline top border;
- compact mono text;
- outbound links;
- minimal height.

Preserve its understated character.

## Geometry

Preferred:

- nearly square;
- low radius for major media;
- rounded pills only for compact controls;
- hairlines instead of heavy borders.

## Shadows

Use sparingly.

Prototype project frames use soft low-opacity depth.

Editorial should not look elevated everywhere.

## Motion

Reference direction:

- slow subtle image scale on hover;
- small horizontal CTA movement;
- color/opacity transitions;
- no aggressive scroll animation.

Recommended motion profile:

- slow;
- restrained;
- low distance;
- natural easing.

## Mobile identity

Mobile should retain:

- serif hierarchy;
- whitespace;
- media-first featured projects where appropriate;
- hairline rhythm;
- warm paper.

Do not collapse it into generic stacked cards.

## What to preserve strongly

- warm paper/ink system;
- Cormorant-like serif hierarchy;
- wide editorial canvas;
- hero narrative/media balance;
- hairline section divisions;
- oversized project spacing;
- 5/7 project relationship;
- serif project titles;
- minimalist capability columns;
- About image/text split;
- Lab contact-sheet character;
- restrained closing CTA.

## What may be refined

- exact hero visual;
- exact serif font if needed;
- exact Japanese font;
- precise max width;
- individual project frame styling;
- whether all projects use identical left/right alignment;
- exact Lab visuals;
- exact About visual.

## Do not import from prototype as factual content

Do not trust:

- project descriptions;
- project year labels;
- project technology;
- personal biography;
- project domain;
- contact email;
- GitHub/LinkedIn/ReadCV URLs;
- Japanese slogan;
- image alt text describing Tyler.

Those are design placeholders until verified by the content system.
