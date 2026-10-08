# 06 — Application Architecture

## Technology direction

Default stack:

- Next.js
- TypeScript
- MDX where long-form narrative benefits from it
- typed TypeScript objects for structured project/content metadata
- schema validation such as Zod
- CSS custom properties for theme tokens
- scoped styles/components
- Motion or equivalent animation library
- static generation where practical

No V1 database or CMS unless a concrete requirement emerges.

## Architectural goals

The implementation should be:

- maintainable;
- theme-extensible;
- content-driven;
- statically friendly;
- type-safe;
- accessible;
- testable;
- portable;
- low-cost to deploy.

## Suggested directory structure

Illustrative:

```text
src/
├─ app/
│  ├─ [locale]/
│  │  ├─ page.tsx
│  │  ├─ work/
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  │  ├─ about/
│  │  │  └─ page.tsx
│  │  ├─ lab/
│  │  │  └─ page.tsx
│  │  └─ contact/
│  │     └─ page.tsx
│  └─ ...
│
├─ components/
│  ├─ core/
│  ├─ navigation/
│  ├─ project/
│  ├─ case-study/
│  ├─ media/
│  ├─ diagrams/
│  └─ accessibility/
│
├─ compositions/
│  ├─ editorial/
│  ├─ engineer/
│  └─ digital/
│
├─ themes/
│  ├─ editorial/
│  ├─ engineer/
│  └─ digital/
│
├─ content/
│  ├─ projects/
│  ├─ lab/
│  └─ profile/
│
├─ registries/
│  ├─ projects.ts
│  ├─ technologies.ts
│  ├─ capabilities.ts
│  └─ themes.ts
│
├─ lib/
│  ├─ content/
│  ├─ i18n/
│  ├─ theme/
│  ├─ seo/
│  └─ validation/
│
└─ styles/
   ├─ reset.css
   ├─ globals.css
   └─ tokens.css
```

Exact structure may change while preserving boundaries.

## Data flow

Conceptually:

```text
project content files
        ↓
schema validation
        ↓
project registry / content selectors
        ↓
semantic page model
        ↓
active composition registry
        ↓
theme tokens + motion profile
        ↓
rendered route
```

## Content registry

Projects should be centrally discoverable.

Useful selectors:

```ts
getProject(slug)
getPublishedProjects()
getFeaturedProjects()
getProjectsByCapability(capabilityId)
getProjectsByTechnology(technologyId)
```

Routes should not manually import arbitrary project files in scattered places.

## Theme registry

A central registry should define available themes.

Illustrative:

```ts
type ThemeId = "editorial" | "engineer" | "digital";

const themeRegistry = {
  editorial: {...},
  engineer: {...},
  digital: {...},
};
```

Future themes should extend this predictably.

## Composition registry

See the theme/composition document.

Avoid repeated:

```ts
if (theme === "engineer") ...
```

across the application.

Theme-specific branching should be centralized.

## Token contract

Every theme should satisfy a shared visual token interface.

Potential categories:

```text
typography
colors
spacing
borders
radius
elevation
grid
imagery
motion
```

Prefer semantic custom properties:

```css
--surface-primary
--surface-secondary
--text-primary
--text-muted
--accent
--border-subtle
--font-display
--font-body
--font-mono
--space-section
--radius-control
--motion-fast
```

Avoid raw theme-specific constants throughout semantic components.

## Server versus client boundaries

Default to server-rendered/static content.

Use client components only when necessary for:

- theme switching;
- local persistence;
- animation;
- interactive diagrams;
- expandable technical details;
- Digital-specific enhancements.

Do not make the entire site a client application because some interactions exist.

## Static generation

Project and locale routes should be statically generated where practical.

Benefits:

- speed;
- low hosting cost;
- SEO;
- resilience;
- simple deployment.

## Theme state

Requirements:

- default is Product (D050);
- persisted in a server-readable preference cookie; valid choices are preserved;
- no account required;
- optional URL style query;
- avoid first-paint theme flash.

Possible implementation:

- cookie for initial server-readable preference;
- local storage synchronized after hydration;
- inline pre-paint bootstrap if needed.

Choose the simplest robust approach.

The implemented choice uses one server-readable preference cookie and request
rendering, with no local-storage mirror. Tokens and the selected composition are
present in the first HTML; changing the cookie through a Server Action returns
the updated tree. See `THEME-COMPOSITION-INTEGRATION.md` and D029 for the rendering
tradeoff and extension contract.

## Locale state

Locale comes from the route, not theme state.

Theme should persist when locale changes.

Example:

```text
/en/work/nihonest + Engineer
→ locale switch
/ja/work/nihonest + Engineer
```

## Hydration/flash handling

Because compositions may differ radically, saved theme application after first paint may create severe layout shift.

Avoid:

```text
Editorial renders
↓
page visibly restructures
↓
Engineer appears
```

Ensure active theme is known early enough to prevent this.

## Dynamic imports

Digital-only expensive features should load only when required.

Examples:

- Three.js;
- React Three Fiber;
- shaders;
- canvas effects;
- large visualization code.

Editorial and Engineer should not pay those costs.

## Error boundaries

Provide graceful handling for:

- missing media;
- invalid project slug;
- malformed content;
- failed optional enhancement;
- missing translation;
- unavailable diagram.

A Digital enhancement failure must not make project content inaccessible.

## No backend by default

Do not add:

- database;
- server actions for trivial needs;
- auth;
- API routes;
- CMS;

without a user requirement.

Contact can use simple links in V1.

## Environment variables

Keep minimal.

Possible later needs:

- analytics ID;
- public base URL.

Do not require secrets for normal local development if avoidable.

## Type-safety expectations

Use types/schema validation at content boundaries.

Prefer discriminated unions for blocks.

Avoid `any` except for narrowly justified library boundaries.

## Comments

Use comments for:

- architecture intent;
- non-obvious constraints;
- accessibility workarounds;
- performance reasons;
- extension points.

Avoid comments that simply restate code.

## Documentation synchronization

When architecture changes materially:

- update relevant docs;
- update decision log;
- update AGENTS.md if agent behavior changes.

## Architecture acceptance criteria

The architecture is healthy if:

- normal project creation does not require theme edits;
- normal theme creation does not require project edits;
- project facts exist once;
- locale-neutral facts are not duplicated;
- theme persistence does not flash;
- static pages remain indexable;
- Digital-only packages are avoidable outside Digital;
- build-time validation catches malformed content.
