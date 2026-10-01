# Portfolio Website — Project Documentation

This documentation defines the product, design, content, and engineering contracts for Tyler Tapia's personal portfolio website.

The portfolio is intentionally more ambitious than a conventional résumé site. It is both a professional portfolio and a portfolio project in its own right. Its defining idea is:

> **One portfolio. One semantic content model. Multiple coherent ways of reading it.**

The launch version supports three visual/compositional modes:

- **Editorial** — quiet, refined, narrative, image-aware, typography-led.
- **Engineer** — structured, information-dense, architecture-forward, precise.
- **Digital** — spatial, interactive, motion-led, visually experimental.

These are not color skins. Each mode may reorganize shared content, change emphasis, select different media treatments, and use different composition strategies while preserving factual content, accessibility, URLs, SEO identity, and project availability.

Future themes such as **Product** and **Graphic** may be added later through the same architecture.

## Documentation map

Read in this order when implementing:

1. [`AGENTS.md`](./AGENTS.md) — coding-agent operating contract.
2. [`docs/01-PRODUCT-BRIEF.md`](./docs/01-PRODUCT-BRIEF.md) — purpose, audiences, success criteria, V1 scope.
3. [`docs/02-INFORMATION-ARCHITECTURE.md`](./docs/02-INFORMATION-ARCHITECTURE.md) — routes, page responsibilities, hierarchy, navigation.
4. [`docs/03-CONTENT-MODEL-AND-CASE-STUDIES.md`](./docs/03-CONTENT-MODEL-AND-CASE-STUDIES.md) — typed project data and semantic case-study blocks.
5. [`docs/04-THEME-AND-COMPOSITION-SYSTEM.md`](./docs/04-THEME-AND-COMPOSITION-SYSTEM.md) — separation of content, semantics, composition, tokens, and motion.
6. [`docs/05-VISUAL-DESIGN-GRAMMAR.md`](./docs/05-VISUAL-DESIGN-GRAMMAR.md) — layout, typography, spacing, imagery, navigation, project presentation.
7. [`docs/06-APPLICATION-ARCHITECTURE.md`](./docs/06-APPLICATION-ARCHITECTURE.md) — Next.js/TypeScript architecture, registries, state, rendering boundaries.
8. [`docs/07-LOCALIZATION.md`](./docs/07-LOCALIZATION.md) — English/Japanese strategy and fallbacks.
9. [`docs/08-MOTION-AND-INTERACTION.md`](./docs/08-MOTION-AND-INTERACTION.md) — motion tiers, transitions, reduced motion, Digital safeguards.
10. [`docs/09-ACCESSIBILITY-AND-RESPONSIVE.md`](./docs/09-ACCESSIBILITY-AND-RESPONSIVE.md) — WCAG target, semantics, keyboard, responsive reinterpretation.
11. [`docs/10-PERFORMANCE-SEO-ANALYTICS.md`](./docs/10-PERFORMANCE-SEO-ANALYTICS.md) — performance budgets, canonical behavior, analytics limits.
12. [`docs/11-MEDIA-DIAGRAMS-ASSETS.md`](./docs/11-MEDIA-DIAGRAMS-ASSETS.md) — media evidence, no-image behavior, diagrams, video.
13. [`docs/12-TESTING-AND-QUALITY.md`](./docs/12-TESTING-AND-QUALITY.md) — schema, compatibility, accessibility, visual regression, CI.
14. [`docs/13-DEVELOPMENT-TOOLS-AND-PREVIEW.md`](./docs/13-DEVELOPMENT-TOOLS-AND-PREVIEW.md) — `/dev/design-system`, `/dev/compositions`, fixtures.
15. [`docs/14-IMPLEMENTATION-ROADMAP.md`](./docs/14-IMPLEMENTATION-ROADMAP.md) — recommended implementation order and acceptance gates.
16. [`docs/15-PROJECT-DISCOVERY-PROMPT.md`](./docs/15-PROJECT-DISCOVERY-PROMPT.md) — reusable prompt for Codex/Claude inside project repositories.
17. [`docs/16-CONTENT-GOVERNANCE.md`](./docs/16-CONTENT-GOVERNANCE.md) — publication states, evidence, maintenance rules.
18. [`docs/17-DECISION-LOG.md`](./docs/17-DECISION-LOG.md) — planning decisions treated as locked defaults.
19. [`docs/18-SYSTEM-CONTRACT-CHECKLIST.md`](./docs/18-SYSTEM-CONTRACT-CHECKLIST.md) — implementation-review checklist.
20. [`docs/design-reference/README.md`](./docs/design-reference/README.md) — approved Editorial, Engineer, and Digital visual references and source-of-truth rules.
21. [`docs/design-reference/IMPLEMENTATION-CONTRACT.md`](./docs/design-reference/IMPLEMENTATION-CONTRACT.md) — contract for translating the approved Stitch HTML into the shared production architecture.
22. [`docs/design-reference/EXTENDING-THE-DESIGNS.md`](./docs/design-reference/EXTENDING-THE-DESIGNS.md) — rules for extending the approved homepage systems to secondary routes without generic visual drift.


## Approved design references

The reviewed visual baselines for the three launch modes are stored in:

```text
docs/design-reference/
```

This folder contains:

- theme-specific reference documentation;
- an implementation contract;
- rules for extending the designs to new screens;
- the approved exported HTML references.

For **homepage visual direction**, these reviewed design references take precedence over earlier speculative examples in the planning documentation.

For **architecture, content, factual claims, accessibility, localization, routing, and application behavior**, the main project documentation and typed content remain authoritative.

The reference HTML is therefore a visual/composition source, not production code and not a factual content source.

Coding agents should read the design-reference documentation before implementing or substantially revising Editorial, Engineer, or Digital.


## Non-negotiable architectural rules

1. **Content describes meaning.**
2. **Semantic components represent purpose, not appearance.**
3. **Composition controls information organization, grouping, and emphasis.**
4. **Theme tokens control visual language.**
5. **Motion enhances presentation but is never required to understand content.**
6. **Every published project must render correctly in every launch theme.**
7. **Adding normal project content must not require editing theme implementation.**
8. **Adding a new theme must not require editing project content.**
9. **Themes must not change project URLs, SEO identity, factual content, accessibility, or project availability.**
10. **If a theme lacks a specialized renderer for a block, use a shared semantic fallback.**
11. **Editorial is the default experience.**
12. **The launch theme set is Editorial + Engineer + Digital.**
13. **Product and Graphic are post-launch candidates, not V1 blockers.**
14. **Advanced Digital effects are progressive enhancements and must not burden other themes.**
15. **The site must remain polished even if a visitor never changes theme.**

## V1 technology direction

Planned default stack:

- Next.js
- TypeScript
- MDX for narrative content where appropriate
- typed TypeScript data for structured project/content metadata
- build-time schema validation such as Zod
- CSS custom properties/design tokens
- scoped component styling
- Motion or equivalent for animation
- static generation wherever practical
- no database or CMS unless a later requirement clearly justifies one

The portfolio should remain deployable as a low-cost, CDN-friendly site and should not introduce infrastructure merely to demonstrate infrastructure.

## Intentionally open to refinement

These may change during implementation without violating the plan:

- exact font families
- exact color values
- exact breakpoint values
- exact animation durations
- individual project layout details
- screenshot crops
- microcopy
- final project order
- detailed launch content inventory
- final hosting provider

Coding agents may propose options for these while preserving the higher-level contracts in this documentation.
