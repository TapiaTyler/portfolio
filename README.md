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

## Local development

The initial Next.js + TypeScript foundation is implemented. Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The root redirects to `/en`. Both `/en` and `/ja`
support Home, Work, About, Lab, and Contact. The Japanese route shell currently
uses English placeholders with an explicit translation notice. Language links
preserve the current destination.

Project detail routes use the publication-safe content registry and return 404
until reviewed project content is available.
All three launch modes have initial implementations of their approved designs.
Final content, visual refinement and launch verification remain upcoming milestones.

Verification commands:

```sh
npm run typecheck
npm run content:validate
npm run lint
npm test
npm run format:check
npm run build
```

Use `npm run format` to format application code and configuration. Production
builds can be served locally with `npm start` after `npm run build`.

The content foundation now includes typed project records, shared registries,
semantic case-study blocks, and build-time validation. The portfolio itself is
the first real draft project; public project content remains empty pending review.
Read [the pilot discovery and review guide](./docs/projects/portfolio/README.md),
then open `/dev/projects/portfolio` on the development server to review all three
compositions and theme morphing. Synthetic development fixtures remain separate from the public
registry. See [`docs/CONTENT-AUTHORING.md`](./docs/CONTENT-AUTHORING.md) for the
implemented authoring contract and validation workflow.

Shared semantic components now render all supported case-study blocks with
locale-aware field fallback. With the development server running, open
`http://localhost:3000/dev/design-system` to inspect synthetic project previews.
Use `?locale=ja` to inspect English fallback behavior, and `?project=fixture-visual`
or `?project=fixture-minimal` to inspect other records. The preview and its fixture
media return 404 in production.

Presentation controls now select a registered token/composition profile and save
the preference in a local cookie. The server renders the saved mode before paint,
including after locale changes. Editorial uses a split hero, local typography, sparse sections and
project features. Engineer uses a profile dossier, project records, a capability
matrix and early case-study system summaries. Digital uses a spatial hero, abstract
portal, project deck, connected About section and media-led project introduction.
Final copy, imagery and populated
layout review are still pending.

`http://localhost:3000/dev/compositions` compares the same synthetic case study
across all three profiles, including project previews and case studies. This
preview also returns 404 in production. See [the Editorial implementation notes](./docs/EDITORIAL-IMPLEMENTATION.md)
and [the Engineer implementation notes](./docs/ENGINEER-IMPLEMENTATION.md)
and [Digital implementation notes](./docs/DIGITAL-IMPLEMENTATION.md)
for the current design scope and remaining review.

Use `/dev/compositions?surface=homepage` to review a populated synthetic homepage
in the selected mode. This preview also remains development-only.
The preview motion controls simulate reduced link/card movement; the browser's
actual reduced-motion preference is also supported. The visual fixture gallery
includes landscape, wide and portrait images.

For browser verification, run once `npx playwright install chromium`, then:

```sh
npm run build
npm run test:browser
npm run test:preview
```

The browser suite starts and stops its own production server on port 3217.
The preview suite uses an isolated development build and server on port 3218,
so it can run alongside the normal development server. It verifies populated
compositions, locale fallbacks, scoped styles, image ratios, reduced motion and
failed-media descriptions. Both suites run in CI.

For production performance measurements after a build, run
`npm run audit:performance -- --label=current`. It owns a separate local server
on port 3219 and saves reports under `.cache/performance/`.
See [the performance review](./docs/PERFORMANCE-REVIEW.md) for measurement
conditions, current results and remaining launch acceptance.

Theme changes now animate matching semantic modules between server-rendered
compositions, with destination-specific timing, reading-position continuity,
interruptible snapshots and an immediate reduced-motion/unsupported fallback.
See [theme transition notes](./docs/THEME-TRANSITIONS.md) for the implementation
and the remaining entry/reveal motion work.

SEO uses explicit deployment configuration. Copy `.env.example` to `.env.local`
when ready to supply the public origin. `SITE_INDEXABLE` defaults to false;
Japanese fallback-only pages remain non-indexable until translations are ready.
See [SEO integration notes](./docs/SEO-INTEGRATION.md) for canonical, sitemap,
robots and share metadata behavior. Rebuild after changing deployment settings.
See [docs/ROADMAP.md](./docs/ROADMAP.md) for completed integrations and the next
milestones, and [theme integration notes](./docs/THEME-COMPOSITION-INTEGRATION.md)
for the implemented rendering and persistence contract.

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

Theme-specific entry, reveal and interaction behavior is documented in [THEME-MOTION.md](./docs/THEME-MOTION.md).

Digital card-to-project expansion and Editorial directional page turns are documented
in [ROUTE-TRANSITIONS.md](./docs/ROUTE-TRANSITIONS.md). Review selected synthetic
projects from `/dev/compositions?surface=homepage` during development.

## Release and content review

Vercel is the selected host. Start with [RELEASE-RUNBOOK.md](./docs/RELEASE-RUNBOOK.md)
for framework settings, preview environment scopes, local release verification and
hosted review steps. [CONTENT-REVIEW.md](./docs/CONTENT-REVIEW.md) collects the remaining
biography, contact, pilot publication and domain decisions. The normal build remains
non-indexed and the pilot remains an unpublished development draft.
