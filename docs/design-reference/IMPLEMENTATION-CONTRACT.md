# Design Reference Implementation Contract

## Purpose

This document tells a coding agent how to translate the approved HTML references into the production portfolio architecture.

The reference HTML is a visual prototype.

The production application is a typed, localized, accessible Next.js application with shared semantic content and multiple composition systems.

The task is therefore **translation, not code migration**.

## 1. Never port the prototype architecture literally

The reference files use prototype-friendly patterns such as:

- Tailwind CDN;
- inline Tailwind configuration;
- hardcoded content;
- inline `onclick` handlers;
- anchor navigation;
- external placeholder images;
- one-off mock interface elements;
- duplicated project metadata;
- theme-local page structure.

These are acceptable in a static visual prototype.

They are not production architecture.

Do not preserve them merely because they exist in the source HTML.

## 2. Preserve visual intent

While the code should be rebuilt, preserve intentional visible characteristics such as:

- relative section sizing;
- column proportions;
- density;
- surface hierarchy;
- typography roles;
- border strength;
- whitespace;
- project-preview treatment;
- navigation personality;
- background texture;
- accent strategy;
- shape language;
- responsive transformations.

If an implementation materially loses the character of the reference, it is not complete.

## 3. Production architecture remains shared

Use the portfolio architecture:

```text
Project data
    ↓
Semantic content model
    ↓
Shared semantic components
    ↓
Theme-specific composition renderer
    ↓
Theme token profile
    ↓
Theme motion profile
```

Do not create three unrelated hardcoded homepages.

Theme-specific high-level composition components are allowed and expected, but they must consume the same semantic data.

## 4. Separate three categories of reference information

### A. Preserve closely

Examples:

- Editorial's paper/ink palette relationship;
- Editorial serif-led hierarchy;
- Engineer's dark dossier/system-record organization;
- Engineer's square technical panels;
- Digital's cyan-led atmospheric HUD language;
- Digital's luminous layered surfaces;
- section proportions;
- major homepage composition.

### B. Preserve conceptually but adapt to real content

Examples:

- project mockups;
- project labels;
- capability lists;
- location/relocation motif;
- Lab previews;
- status indicators.

Use real typed content instead of the generated text.

### C. Do not preserve

Examples:

- invented project dates;
- fabricated metrics;
- placeholder emails;
- fake project domains;
- unsupported project stacks;
- generated biography claims;
- generated "recent activity";
- placeholder image URLs;
- mock accessibility claims;
- arbitrary deployment claims.

## 5. Design-reference precedence

For homepage aesthetics, these HTML files represent the approved baseline and may supersede older planning examples.

For application behavior and content architecture, the portfolio documentation supersedes the HTML.

Example:

If an older planning document says Digital's Work section *may* be a spatial index, but the approved HTML uses three rich system cards, implement the approved visual reference unless Tyler explicitly requests another direction.

However, the three cards should still consume shared `Project` data rather than hardcoded Digital-only project objects.

## 6. The prototypes are homepage references

Do not assume these files define every route.

Use them to establish each mode's visual grammar, then extend that grammar to:

- Work index;
- case studies;
- About;
- Lab;
- Contact;
- 404/error states;
- development preview routes.

Those extensions must follow the portfolio's existing theme/composition documentation.

Do not ask an image generator or generic UI generator to invent unrelated secondary pages.

Instead, extrapolate from the approved primitives documented here.

## 7. No content duplication by theme

Bad:

```ts
editorialNihonest = {...}
engineerNihonest = {...}
digitalNihonest = {...}
```

Correct:

```ts
nihonest = {...shared facts/content...}
```

and then:

```text
Editorial ProjectFeature
Engineer ProjectDossier
Digital SystemCard
```

consume that same object.

## 8. Theme tokens

Convert raw prototype values into semantic production tokens.

Bad:

```css
color: #00f0ff;
```

repeated throughout the Digital implementation.

Better:

```css
--accent-primary
--accent-secondary
--surface-base
--surface-panel
--text-primary
--text-muted
--border-subtle
--glow-accent
```

The exact CSS architecture may vary.

## 9. Typography

The references strongly establish font roles.

Use production font loading rather than the prototype's Google Fonts `<link>` approach where appropriate.

If exact reference fonts remain acceptable and licensing/hosting is suitable, preserve them.

If a font must change:

- preserve role;
- preserve contrast;
- preserve weight hierarchy;
- preserve approximate metrics;
- revalidate layout.

Do not casually substitute fonts because a framework default is easier.

## 10. Placeholder imagery

The external generated image URLs in the prototypes are not approved production assets.

Rules:

- do not ship them without explicit approval;
- do not portray an AI-generated person as Tyler;
- do not use a generated landscape as factual personal imagery;
- replace project mockups with real project media when available;
- use intentional no-image fallbacks until approved media exists.

## 11. Navigation

Prototype anchors such as:

```text
#work
#about
#lab
#contact
```

represent visual navigation, not final route behavior.

Production navigation should use the portfolio's route architecture.

The homepage may still scroll to sections where appropriate, but public top-level routes remain supported.

## 12. Locale selector

The prototype EN/JP controls are visual references only.

Production locale behavior must use real locale-aware routing.

Switching language must:

- preserve the current theme;
- preserve equivalent route where possible;
- use real translated content/fallback rules.

Do not implement a cosmetic EN/JP toggle that only changes the button state.

## 13. Theme selector

The prototype theme selector is visual only.

Production selector must switch the real composition/theme system.

Requirements:

- Product default with valid saved selections preserved (D050);
- persistence;
- no severe flash/reflow;
- keyboard accessibility;
- visible focus;
- reduced-motion behavior;
- optional shareable style query if implemented.

## 14. Responsive behavior

The HTML includes responsive Tailwind classes and is useful evidence.

Preserve the responsive *intent*, but test the real implementation independently.

Do not assume prototype responsiveness is automatically correct.

Each mode must retain its identity on mobile.

## 15. Accessibility

Prototype markup is not proof of WCAG conformance.

Production requirement remains WCAG 2.2 AA.

Review:

- contrast;
- focus;
- keyboard;
- heading hierarchy;
- nav labels;
- accessible names;
- reduced motion;
- semantic reading order;
- mobile touch targets;
- image alt text.

## 16. Motion

Prototype transition utilities describe direction, not the final motion system.

Move repeated behavior into semantic motion primitives.

Examples:

- media hover scale;
- text shift;
- border/accent transition;
- pulse/status indicators;
- theme transition.

Do not reproduce decorative animation if it creates noise or accessibility problems.

## 17. Data-dependent layouts

The real content may be longer or shorter than prototype text.

Theme compositions must tolerate:

- missing optional fields;
- long titles;
- Japanese text;
- no image;
- varying technology counts;
- project statuses;
- different case-study depth.

Do not hardcode heights around prototype copy.

## 18. Theme-specific fidelity testing

Compare production output visually against the reference HTML.

Review:

- desktop width;
- mobile;
- density;
- typography;
- spacing;
- surface hierarchy;
- section order;
- project proportions.

Pixel-perfect reproduction is not required when production semantics demand changes.

Character and composition fidelity are required.

## 19. Known generated-content hazards

The reference pages contain examples of generated content that must not be automatically promoted to production truth, including:

- different Upwatch stacks across references;
- different project years/statuses;
- different Hospitality Platform identities and purposes;
- invented metrics such as uptime/latency;
- invented project URLs;
- invented activity logs;
- generated Lab projects;
- generated email addresses;
- generated social links;
- generated relocation/destination wording;
- generated personal-background wording.

Use typed real content instead.

## 20. Completion criterion

A theme implementation is successful when:

1. a side-by-side comparison clearly resembles the approved reference;
2. the code uses the shared architecture;
3. real content can replace all placeholders without changing theme code;
4. mobile retains the theme personality;
5. accessibility requirements hold;
6. switching themes genuinely changes composition and visual language;
7. no factual claim is sourced from the prototype alone.
