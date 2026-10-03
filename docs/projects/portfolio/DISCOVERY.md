# Portfolio pilot — discovery report

Prepared 2026-10-02 from this repository and Tyler's explicit direction/review in the development conversation. This is source material, not final portfolio copy. The canonical draft is [portfolio.ts](../../../src/content/projects/portfolio.ts).

## 1. Identity and purpose

- **Project:** Tyler Tapia portfolio / switchable presentation system.
- **Category:** Professional portfolio website and interface/architecture demonstration.
- **Status:** Active local implementation; deployment and final content remain pending.
- **Period:** 2026. Git history begins 2026-10-01 with documentation; it does not establish when all planning began.
- **Audience:** People evaluating Tyler's design judgment, product thinking and engineering work, with English/Japanese route support.
- **Summary:** One factual project source, reinterpreted through Editorial, Engineer and Digital compositions.

Evidence: [operating contract](../../../AGENTS.md), [roadmap](../../ROADMAP.md), [approved references](../../design-reference/README.md), [identity](../../../src/content/identity.ts). The public site currently uses placeholder copy and has no published projects. This pilot is the first real draft record.

## 2. Scope

Implemented: locale-prefixed Home, Work, project detail, About, Lab and Contact routes; typed content validation; publication filtering; incomplete-Japanese fallback; three compositions; server-selected theme persistence; module morphing; route transitions/history; responsive navigation; theme-specific microinteractions; development fixtures and comparison tools; metadata and performance tooling.

Deferred: final biography/project copy, Japanese interface/narrative translation, hosting/domain choice, deployed acceptance, future Product/Graphic modes, CMS, database, accounts and WebGL. The empty inventory is a content state, not a completed content rollout.

## 3. Role and ownership

Tyler set the product objective and architectural constraints, selected the visual direction, and reviewed/refined running interactions. Examples include removing hover rails/double underlines, relocating mobile controls, refining disclosures, selecting the top-bound front-side flip and matching horizontal timing. AI-assisted implementation, documentation and automated verification are material parts of the workflow. No authorship percentage or claim of entirely manual coding is supported.

Evidence: AGENTS; approved reference contracts; D029–D031 in the [decision log](../../17-DECISION-LOG.md); [iteration ledger](ITERATIONS.md); explicit conversation feedback. Personal reflection still requires Tyler's wording.

## 4. Material technology

- Next.js App Router and React: server-selected compositions and ordinary route navigation.
- TypeScript and Zod: structured project data, reference validation and publication rules.
- CSS scopes, custom properties, grids and perspective transforms: isolated design systems and motion grammar.
- Browser View Transition API and Web Animations API: progressive snapshot continuity and bounded interaction animations.
- Playwright, axe-core and Node tests: route, theme, locale, content and interaction verification.

Package versions are recorded in the lockfile. There is no animation-framework, database or shader dependency. This is not a backend-service case study.

## 5. Architecture

The required conceptual flow is content → semantic components → composition → tokens → interaction/motion. The implementation validates and localizes records, resolves a composition from a validated preference cookie, and renders one server-selected content tree. Theme tokens set visual primitives; client motion matches temporary semantic snapshot identities around commits.

Relevant implementation:

- [schema](../../../src/lib/content/schema.ts), [blocks](../../../src/lib/content/blocks.ts), [publication registry](../../../src/lib/content/registry.ts), [locale selection](../../../src/lib/i18n/project-content.ts).
- [semantic case study](../../../src/components/semantic/case-study.tsx), [composition registry](../../../src/registries/compositions.ts), [theme provider](../../../src/components/theme/theme-provider.tsx).
- [theme continuity](../../../src/lib/theme/transition.ts), [route continuity](../../../src/lib/motion/route-transition.ts).

Engineer adds an early technical overview without silently reordering the canonical block sequence. Different composition is more than a palette swap, but it must retain coherent reading order. A pipeline diagram and a theme-commit sequence diagram would explain the boundaries; the draft includes the former.

## 6. Decisions worth discussing

| Decision | Reason and tradeoff | Evidence |
| --- | --- | --- |
| One canonical typed narrative | Avoid three divergent copies; semantic block vocabulary limits arbitrary layouts | Content governance; schema/blocks |
| Compositions separate from tokens | Change hierarchy/grouping, not just fonts and color; requires more cross-mode review | Composition registry; three homepage implementations |
| Cookie/server selection before paint | Render the intended composition without client correction; requires a Next.js server runtime | D029; theme server/action/provider |
| Snapshot module morphing | Bridge different markup without a second accessible tree; coordinate fonts, focus, anchors and slow commits | D030; THEME-TRANSITIONS |
| Theme-specific route physics | Editorial book, Engineer record, Digital spatial continuity; preserve URLs, history and fallbacks | D031; ROUTE-TRANSITIONS |
| Single content turn plus blank sheets | Repeated content looked like blinking; depth cues remain without fetching parent routes | Route controller; iteration ledger |
| Image inspection as a gallery | Full-width images could shrink when “enlarged”; varied layouts and return-to-selected-frame continuity | Digital stylesheet; digital-gallery module |

Supported alternatives are documented in the ledger. Do not add a fabricated framework-selection or hosting comparison.

## 7–8. Constraints and challenges

Accessibility, touch operation, reduced motion, no-flash selection, canonical URLs, sparse optional fields and incomplete translation constrain the design. Snapshot work must be interruptible and must not freeze a slow navigation indefinitely. The 1500ms capture bound is a safeguard, not an imposed navigation wait.

Actual problems included snapshot identity cleanup when React reused nodes, locale-provider remounts, late destination DOM readiness on history traversal, repeated disclosure animations not restarting, reverse closure with native `open` state, duplicate underlines, and dialog focus/geometry. Sources: transition helpers, disclosure helper, browser/preview tests and the relevant roadmap verification entries. These are implemented responses; final deployed reliability and cross-browser visual acceptance remain open.

## 9. Design and interaction inventory

| Editorial | Engineer | Digital |
| --- | --- | --- |
| Publication hero, narrative project features, whitespace and asymmetric imagery | Project records, system metadata, diagram/technical overview, square geometry | Spatial hero/deck, transparent layers, atmospheric grid and mixed media widths |
| Ink label marker; pill language slider | Square marker left of labels; square language indicator | Cyan label rule excluding slash prefix; cyan language pill |
| 600ms directional content turns; front-side top-bound header flip | 240ms record swap and scan rule | 720ms card/detail expansion, 560ms matched return; spatial opening on other links |
| 520ms unfolding disclosures and reversible closure | Stepped disclosure indicator and quick settle | Control entrance response |
| Crop/caption alignment; native-scroll reading progress | Record press, honest code copying, real connection inspection | Portal tilt, card lighting/press, Open label, image scale, animated monochrome borders |
| Shared reduced-motion and keyboard/native fallback contract | Shared reduced-motion and keyboard/native fallback contract | Shared reduced-motion and keyboard/native fallback contract; touch omits mouse tracking |

Theme switching itself morphs matched modules: destination geometry 560/360/680ms for Editorial/Engineer/Digital, with a shorter 180ms surface/content swap. This is distinct from route physics and from entry/reveal motion. Source: [theme transitions](../../THEME-TRANSITIONS.md), [motion inventory](../../THEME-MOTION.md), [route transitions](../../ROUTE-TRANSITIONS.md). No pointer response is necessary to understand the content.

## 10–11. Content, reliability and performance

Metadata/media/diagram relationships are typed; narrative uses semantic rich blocks. Publication and homepage featuring are independent. Drafts/hidden records are excluded from public lookup, indexes, sitemap and structured data. English content retains actual language attributes on incomplete Japanese routes. No Japanese copy should be invented for this pilot.

Performance tooling and local audits exist. Historical route-motion audits recorded Performance 98/97/96, but measured empty/placeholder homepages and predate later refinements. They are not this draft's populated/deployed performance, field CWV, or evidence of improvement. The case-study draft deliberately avoids numerical outcome claims. Source: [performance review](../../PERFORMANCE-REVIEW.md), audit script and package/asset boundaries.

## 12–13. Quality and operations

Schema/reference tests, semantic rendering tests, production route checks, populated fixture checks, theme persistence/no-flash tests, reduced-motion/touch tests, axe scans and visual inspection are implemented. GitHub CI is configured to run lint, tests, format, build, type checks and both browser suites; a configured workflow is not evidence of a successful remote CI run. Automated accessibility scans do not establish full WCAG conformance.

No deployment platform or public domain is selected. The runtime needs a Next.js server; local diagnostics and preview routes are available. Source: package scripts, [CI](../../../.github/workflows/ci.yml), next.config, roadmap. No operational adoption/uptime claim is supported.

## 14–17. State, reflection and highlights

Implemented and locally reviewed: three design systems, content/composition separation, module morphing, route continuity and the listed responses. Being refined: real content integration and screen rhythm. Pending: release/content review, translation and deployed acceptance.

Strongest defensible highlights are composition architecture, continuity across different server-rendered structures, interaction iteration grounded in feedback, progressive/native accessibility behavior, and verification tooling. These support Product & UI Engineering, System Architecture, Design Systems, Accessibility and Testing/Quality. They do not establish backend/security/deployment expertise from this project alone.

Reflection candidates for Tyler: how the same content changes perceived emphasis; why motion needed a physical model; how visual feedback altered the implementation. Do not write personal lessons as if Tyler has supplied them.

## 18–20. Media and candidate structure

Capture the same homepage in all modes, a live module-morphing recording, close views of response differences, and a labelled before/after navigation example. Preserve a media manifest: current working tree, viewport, route, capture date and reconstruction overrides. A static image cannot demonstrate animation timing; the video matters. Later capture the populated pilot, mobile reading, top-bound/horizontal turns and gallery/disclosure behavior.

Suggested narrative: product intent → shared architecture → composition comparison → module continuity → route/response iteration → constraints/verification → honest current state. Candidate preview title: **Portfolio presentation system**. Summary: **One portfolio source, reinterpreted through three compositions with motion that reinforces each reading experience.** Technologies: Next.js, React, TypeScript. Preview: current Editorial homepage; do not imply the site's placeholder copy is finalized.

## 21. Questions for Tyler

For later copy review, not blockers for this draft:

1. What personal lesson from these iterations should the closing reflection emphasize?
2. Which audience should the final case-study introduction prioritize: design/product reviewers or engineering reviewers?

No new translations, fabricated outcomes or publication approval are implied by this discovery report.
