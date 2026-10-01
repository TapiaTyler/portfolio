# 09 — Accessibility and Responsive Design

## Accessibility target

> **WCAG 2.2 AA**

Applies to:

- Editorial;
- Engineer;
- Digital;
- English;
- Japanese;
- desktop;
- tablet;
- mobile;
- future themes.

Digital does not receive an accessibility exemption.

## Semantic structure

Use meaningful HTML:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `figure`
- `figcaption`
- correct heading levels
- lists for lists
- buttons for actions
- links for navigation

Do not simulate controls with clickable `div`s.

## Visual versus semantic order

Composition may visually rearrange content, but:

- DOM reading order remains logical;
- keyboard focus remains logical;
- screen-reader order remains coherent;
- heading hierarchy remains consistent.

If a design requires a severe mismatch, redesign it.

## Keyboard

All functionality must be keyboard accessible, including:

- theme selector;
- locale selector;
- menus;
- Lab interactions;
- expandable technical details;
- project previews;
- media controls if present.

No keyboard traps.

## Skip link

Include a visible-on-focus skip link to primary content.

## Focus visibility

Every theme needs strong focus states.

Do not rely on:

- color alone;
- barely visible outlines;
- hover-only treatment.

Engineer density must not hide focus.

Digital effects must not obscure it.

## Contrast

Meet AA contrast for:

- body text;
- muted metadata;
- controls;
- focus states;
- text over imagery;
- Digital gradients;
- Engineer borders;
- disabled states.

## Touch targets

Use adequate tap targets.

Avoid tiny densely packed Engineer controls on mobile.

## Hover dependence

Do not hide essential:

- project titles;
- descriptions;
- action labels;
- navigation;
- metadata

behind hover.

Hover enriches; it does not gate.

## Screen readers

Provide:

- accurate alt text;
- captions where useful;
- accessible names for icon-only controls;
- expanded/collapsed state;
- clear theme selector labels;
- clear language selector labels.

Decorative visuals should be hidden from assistive tech.

## Image alt text

Bad:

> screenshot

Better:

> Nihonest visa guide page showing section navigation and document requirements.

Avoid redundant duplication of nearby captions.

## Diagrams

Diagrams need:

- accessible title/description;
- text alternative or structured summary;
- no color-only meaning;
- legible labels.

Interactive diagrams need keyboard alternatives if interaction reveals information.

## Code blocks

Ensure:

- horizontal scroll instead of page overflow;
- readable contrast;
- optional language label;
- accessible copy controls if added.

## Responsive philosophy

Desktop may be highly expressive.

Mobile must be deliberately composed rather than merely collapsed.

Suggested test widths:

```text
360
390
430
768
1024
1440
1920+
```

These are test points, not necessarily CSS breakpoints.

## Editorial mobile

Preserve:

- strong typographic rhythm;
- whitespace;
- varied but readable media widths;
- narrative pacing.

Do not squash desktop offsets.

## Engineer mobile

Use:

- condensed records;
- collapsible secondary metadata;
- readable tables/records;
- horizontally scrollable or simplified diagrams when necessary.

Avoid tiny dashboard density.

## Digital mobile

Reduce:

- overlap;
- pointer interactions;
- high-cost effects;
- simultaneous layers.

Use:

- project-focused sequences;
- tap/swipe/scroll;
- simplified spatial composition.

Digital should still feel distinct.

## Zoom/reflow

Test browser zoom and text enlargement.

Avoid fixed-height containers around text.

## Japanese responsive testing

Test:

- long labels;
- navigation;
- section headings;
- metadata;
- buttons;
- mixed Latin/Japanese technology names.

## Forms

If a contact form is added later:

- visible labels;
- associated errors;
- clear validation;
- no unnecessary inaccessible CAPTCHA.

## Acceptance checks

Before launch verify:

- keyboard-only complete navigation;
- screen-reader structural pass;
- reduced motion;
- high zoom;
- mobile touch;
- contrast across themes;
- no focus loss during theme switch;
- no inaccessible hover-only project detail.

## Principle

Experimental presentation succeeds only when information remains usable by people who do not experience the presentation in the same way.
