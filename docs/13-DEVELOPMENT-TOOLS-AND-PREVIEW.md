# 13 — Development Tools and Preview

## Purpose

The visual/composition system is too varied to refine efficiently only through public pages.

Create development-only preview tooling for side-by-side comparison.

## `/dev/design-system`

Purpose:

- inspect visual primitives;
- validate shared components;
- inspect states;
- compare localization;
- test no-image and unusual content.

Suggested sections follow.

### Theme controls

```text
Editorial | Engineer | Digital
EN | 日本語
Reduced Motion simulation where practical
```

### Typography

Show:

- Display
- Section
- Title
- Body
- Meta
- Mono
- English
- Japanese
- mixed language

### Color

Show semantic tokens:

- surfaces;
- text;
- muted text;
- accent;
- borders;
- status;
- focus.

### Spacing/grid

Show:

- spacing scale;
- containers;
- column grid;
- section rhythm.

### Controls

Show:

- links;
- buttons;
- theme selector;
- locale selector;
- menus;
- expandable detail.

### Project primitives

Show:

- title;
- status;
- summary;
- metadata;
- technology list;
- capability list;
- media frame.

### Case-study blocks

Show every implemented block type.

Examples:

- Problem
- Goals
- Constraints
- Decision
- Media
- Gallery
- Architecture
- Challenge
- Technical
- Result
- Reflection

### Media states

Include:

- landscape;
- portrait;
- square;
- video;
- diagram;
- optional-media failure fallback;
- no-image project.

### Content stress states

Fixtures should include:

- very long title;
- very short title;
- missing optional summary;
- many technologies;
- few technologies;
- Japanese heading;
- long Japanese paragraph;
- long URL;
- status variants.

## `/dev/compositions`

Purpose:

Show the **same project data** rendered through all three launch compositions.

Example:

```text
NIHONEST / PROJECT FEATURE

EDITORIAL
[render]

ENGINEER
[render]

DIGITAL
[render]
```

Useful comparison surfaces:

- Hero
- Project Feature
- Work Index Item
- Case Study Intro
- Decision
- Architecture
- Media
- No-image project
- Mobile preview if tooling supports responsive frames

This route is central because the portfolio's goal is composition variation.

## Fixtures

Use dedicated fixture data rather than only real projects.

Fixture types:

- normal project;
- technical backend project;
- visual frontend project;
- no-image project;
- minimal small project;
- long Japanese project;
- incomplete-localization project.

## Production safety

Development routes must not be publicly available.

Options:

- development-only route inclusion;
- return 404 in production;
- build-time environment gate.

Do not rely only on robots.txt.

## Screenshot workflow

The dev routes should support visual regression and manual review.

A developer should be able to:

1. switch theme;
2. inspect the same fixture;
3. test viewport;
4. verify content state;
5. capture baseline.

## Storybook

The dev UI is not required to use Storybook.

Prefer a lightweight in-app route if it satisfies needs.

Do not add Storybook merely because the project has a design system.

## Composition refinement

This is the intended place for refining exact layouts during implementation without changing content contracts.

That preserves the user's decision that some design/layout details should remain open until implementation.

## Principle

Dev tooling should make it obvious when a change improves one theme while accidentally breaking another.
