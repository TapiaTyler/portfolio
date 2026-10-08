# Portfolio — Multiple Ways of Reading the Same Work

A professional portfolio for Tyler Tetsuo Tapia, built as a project in its own
right. One canonical content model is presented through five distinct reading
experiences: Product, Editorial, Engineer, Digital and Chronicle.

The project separates facts and narrative from their composition, visual language
and motion. Switching presentation changes hierarchy, density and interaction
while preserving the content, project URLs and essential navigation.

## Presentation modes

| Mode                  | Reading model                                                                | Interaction character                                                                                 |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Product** (default) | Project comparison, a selected desktop preview and evidence-led case studies | Quiet selection feedback, ordinary route navigation and short theme morphs                            |
| **Editorial**         | Narrative, typography, imagery and controlled whitespace                     | Page turns, unfolding disclosures, quiet link/image responses and reading progress                    |
| **Engineer**          | System records, architecture, implementation and decision detail             | Record-change scans, directory-style section navigation, code copying and diagram inspection          |
| **Digital**           | Spatial composition, layered media and visual continuity                     | Card-to-project expansion, image-gallery expansion/contraction, pointer lighting and animated borders |
| **Chronicle**         | Chapter-based discovery, horizontal project selection and a linked preview   | Luminous selected frames, panel changes, scenic artwork and a chapter archive                         |

Theme switching morphs matching semantic modules between compositions, preserves
reading position and handles interruption. Route effects also cover internal links,
language changes and browser history. Keyboard, touch and reduced-motion behavior
are part of the implementation; motion is an optional enhancement.

The selector follows the table order. New visitors and invalid saved preferences
use Product; valid saved selections retain their chosen mode across reloads,
routes and locales. See D050 in [the decision log](docs/17-DECISION-LOG.md).

See [theme morphing](docs/THEME-TRANSITIONS.md),
[theme-specific interactions](docs/THEME-MOTION.md) and
[route transitions](docs/ROUTE-TRANSITIONS.md).

## Current status

As of **October 8, 2026**:

- Home, Work, project detail, About, Lab and Contact have compositions for all five modes.
- Product's first implementation follows the Decision Canvas references: a flat
  desktop work list with a separate preview, normal vertical phone reading, and
  narrative/evidence case-study columns. The supplied misty-valley scenery and
  restrained interactions are implemented; final visual review remains open.
  See [Product implementation](docs/PRODUCT-IMPLEMENTATION.md).
- Three English case studies are published and featured: Nihonest, Portfolio and
  Japan Travel Planner, in that display order.
- Editorial now uses an ink landscape, sparse brush/seal artwork, a lead-story
  project layout, screenshot plates and publication typography.
- Chronicle uses a landscape game-screen model with horizontal card selection,
  chapter/tab rails, glass actions and native contained reading. A card tap selects;
  a second tap opens. A dismissible first-visit hint explains the interaction.
- Theme morphing preserves reading position and clips snapshots inside contained
  reading panels, with a fallback when nested groups are unsupported.
- About includes background, education, skills, languages and working approach.
  GitHub and LinkedIn profiles are available in the header and footer. The shared
  hero description introduces the work, Hawaii base and career direction in Japan.
- Contact offers email, LinkedIn and GitHub in all modes. English résumé, Japanese
  résumé and Japanese CV entries reserve PDF/Word files for later delivery; see
  [Contact authoring](docs/CONTACT-CONTENT.md).
- English and Japanese routes exist. Incomplete Japanese content intentionally falls
  back to English with a notice. Page copy and a shared interface dictionary now
  accept optional Japanese fields, with per-field language and validation; actual
  Japanese translation remains pending. See [localization](docs/07-LOCALIZATION.md).
- Vercel is the selected portfolio host. Release configuration is prepared;
  portfolio deployment remains deferred and a public origin has not been selected.

Existing performance reports describe earlier local builds. They do not establish
acceptance of the current populated site or latest Editorial artwork. See
[Chronicle implementation](docs/CHRONICLE-IMPLEMENTATION.md) and
[performance review](docs/PERFORMANCE-REVIEW.md) for capture conditions.

### Imported projects

| Project                           | Source-project state                                 | Case-study focus                                                                                          | Development preview                  |
| --------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Portfolio presentation system** | Active local implementation                          | Shared content, distinct compositions, theme morphing, navigation, microinteractions and design iteration | `/dev/projects/portfolio`            |
| **Japan Travel Planner**          | Complete; deployed on Railway                        | Full-stack planning workflow, reuse, localization, account/security boundaries and capstone evolution     | `/dev/projects/japan-travel-planner` |
| **Nihonest**                      | Active development; Vercel live link, private source | Source-linked discovery, route-aware journeys, canonical content, optional accounts and editorial tooling | `/dev/projects/nihonest`             |

Each uses one English narrative across the modes, with a neutral report voice and
results describing what the project delivers. Their discovery and review records:

- [Portfolio pilot guide](docs/projects/portfolio/README.md).
- [Travel Planner import review](docs/projects/japan-travel-planner/IMPORT-REVIEW.md)
  and [follow-up evidence](docs/projects/japan-travel-planner/followup/FOLLOWUP.md).
- [Nihonest import review](docs/projects/nihonest/IMPORT-REVIEW.md).

The Travel Planner's original manual school-project version is preserved at
`capstone-v1.0`; later enhancements used AI assistance under directed architecture
and revision review. Its application deployment is separate from this portfolio's
pending deployment.

### Project pipeline

Nihonest is published and featured; its record includes a live Vercel link while
the application remains in active development. The following is planning context, not published portfolio content or a delivery schedule:

| Project                  | Current state                         | Import context                           |
| ------------------------ | ------------------------------------- | ---------------------------------------- |
| **Upwatch**              | Planning; intended to follow Nihonest | No GitHub repository or coding agent yet |
| **Hospitality Platform** | Planning                              | No GitHub repository or coding agent yet |

## Architecture

```text
CONTENT → SEMANTIC COMPONENTS → COMPOSITION → THEME TOKENS → INTERACTION / MOTION
```

- **Content:** typed project metadata, English narrative, media, diagrams and code references.
- **Semantic components:** render meaning through shared blocks and accessible controls.
- **Composition:** selects grouping, hierarchy and emphasis for each mode.
- **Theme tokens:** define typography, color, spacing, geometry and motion personality.
- **Interaction:** adds continuity and feedback with progressive browser enhancements.

Adding a normal project requires a content record and approved assets, rather than
separate theme-specific implementations. Published project selectors control routes,
indexes, sitemap and structured data. Draft/hidden records are excluded from public
lookup; development review uses a separate guarded route.

### Implemented stack

- Next.js App Router, React, TypeScript and Node.js 24.
- Zod validation and typed semantic rich text for narrative; MDX is not currently used.
- CSS custom properties, scoped styles, local fonts, SVG and native browser
  View Transition / Web Animations APIs; no animation framework or WebGL runtime.
- Playwright, axe-core, Node tests, ESLint, Prettier and Lighthouse.
- Vercel configuration for the Next.js runtime; no portfolio database, CMS or accounts.

Material AI assistance is disclosed in the project records. Product, architecture,
design direction and review remain distinct from assisted implementation,
documentation and automated verification. No contribution percentages are asserted.

### Repository layout

```text
src/app/                  Locale routes and guarded development tools
src/content/              Identity, page copy, project records and separate fixtures
src/components/semantic/  Shared meaning-oriented renderers
src/compositions/         Editorial, Engineer, Digital and Chronicle organization
src/themes/               Theme token definitions
src/registries/           Projects, compositions, themes and vocabulary
src/lib/                  Content, localization, theme, motion and SEO contracts
src/styles/               Shared and scoped theme/interaction styles
public/media/projects/    Approved project assets and capture provenance
scripts/                  Validation, capture, performance and release tooling
tests/                    Unit, production browser and populated preview checks
docs/                     Architecture, design references, discovery and review records
```

## Local development

Use **Node.js 24.x** and npm:

```sh
npm ci
npm run dev
```

Use the URL printed by Next.js, normally `http://localhost:3000`. If that port is
occupied, Next.js may select another. The application root redirects to `/en`.
Use the running application rather than opening reference HTML as a local file.

Public routes are `/en` or `/ja`, followed by `/work`, `/about`, `/lab`, `/contact`
and `/work/[slug]` for published projects. Language links preserve the destination;
the saved presentation cookie selects the server-rendered mode before paint.
All three published projects have public routes under `/en/work/[slug]`; Japanese
routes provide the declared English fallback.

### Development review tools

| Route                                             | Purpose                                                     |
| ------------------------------------------------- | ----------------------------------------------------------- |
| `/dev/projects/portfolio`                         | Review the real portfolio record in the selected mode       |
| `/dev/projects/japan-travel-planner`              | Review the imported travel planner record                   |
| `/dev/projects/nihonest`                          | Review the active Nihonest record                           |
| `/dev/design-system`                              | Shared semantic fixtures, including sparse/no-image states  |
| `/dev/compositions`                               | Compare the same synthetic case study across all modes      |
| `/dev/compositions?surface=homepage`              | Populated synthetic homepage and project-opening flow       |
| `/dev/compositions?surface=work`                  | Populated synthetic Work index                              |
| `/preview/chronicle`                              | Real-project homepage in the full site shell                |
| `/preview/chronicle?project=portfolio`            | Full-shell portfolio record; select Chronicle in the header |
| `/preview/chronicle?project=japan-travel-planner` | Full-shell travel planner record                            |
| `/preview/chronicle?project=nihonest`             | Full-shell Nihonest record                                  |

Append `?locale=ja` to project previews to inspect English fallback. Development
routes and fixture media return 404 in production. Files under `public/` are
servable independently of project publication; draft status is not asset privacy.

## Verification

Install Chromium once for browser checks:

```sh
npx playwright install chromium
```

Then run the relevant gates:

```sh
npm run content:validate
npm run lint
npm run format:check
npm test
npm run build
npm run typecheck
npm run test:release
npm run test:browser
npm run test:preview
```

Builds validate every authoring record, including drafts, and check local media
and cross-reference integrity. Use `npm run format` for code/configuration formatting.
CI is configured to run lint, unit tests, formatting, build/type checks, release
smoke and both browser suites. Local success does not establish hosted CI success.

| Tool                     | Owned port | Scope                                                                         |
| ------------------------ | ---------- | ----------------------------------------------------------------------------- |
| Production browser suite | 3217       | Routes, themes, persistence, navigation, motion and production guards         |
| Populated preview suite  | 3218       | Drafts/fixtures, media, responsive compositions and accessibility             |
| Performance audit        | 3219       | Mobile production Lighthouse plus local theme/route diagnostics               |
| Release smoke            | 3220       | Production responses, assets, draft/dev 404 guards and indexing configuration |

Keep the requested port free. These tools own and stop their test servers.
**Do not build concurrently with preview tests or captures:** a build can remove
their isolated development output. After a build, `npm start` serves the normal
production application locally.

### Performance and accessibility

```sh
npm run audit:performance -- --label=current
npm run audit:performance -- --label=portfolio-current --route=/en/work/portfolio
npm run audit:performance -- --label=current-reduced --motion=reduce
```

Product's October 8 audits cover Home, Work and all three published case studies
in normal and reduced motion: **Performance 92–98**, **Accessibility 100**,
**Best Practices 100**, and intentional preview **SEO 66**. Every sample confirms
its motion preference and has no Lighthouse run warnings. LCP ranges from
**2.26–3.17s**; these are single local production mobile samples, not field metrics.
Exact results are in [Product performance results](docs/PRODUCT-PERFORMANCE-RESULTS.json).

Earlier October 7 populated production audits (two runs) measured Performance
**93–97** for Editorial, **96–99** for Engineer, **94–97** for Digital and **89** for
Chronicle. Responsive artwork, loading priority and AVIF delivery reduced Chronicle
image transfer by **63%** from the populated baseline. Its LCP fell from **5.49s**
to **3.72–3.73s**; conditional font preloads bring first paint to **1.21s**.
All theme raster artwork prefers AVIF with WebP format fallback; project images
and local video posters use Next.js AVIF/WebP negotiation with original-source
fallback. Source artwork and historical evidence remain intact. The full artwork
set is about **50.3% smaller** as AVIF. See [image delivery](docs/IMAGE-DELIVERY.md)
for the inventory, regeneration commands and fallback policy.
Chronicle case-study images also use estimates matched to their reading columns.
Matched 2× phone checks reduce project-image downloads during a full reading pass
by **16–32%**, with compression quality and native lazy loading preserved. This is
separate from initial Lighthouse transfer, which was unchanged in that pass.
The subsequent case-study audit found offscreen video posters competing with
initial reading resources. Lazy local posters now load near their videos, and
Chronicle uses compact mobile outer frames/separators. Portfolio's two final
project-page runs measured Editorial **96**, Engineer **94–99**, Digital **93–95**
and Chronicle **88**; Chronicle LCP improved from **4.98s to 3.85s**. Work and all
three case studies have route baselines in the performance review. Those results
are separate from the homepage measurements above.

The latest priority pass keeps Chronicle's scenery high priority and lowers
existing mobile frame/corner requests. Home now repeats **91** with LCP
**3.48–3.50s** in normal motion and **91 / 3.47–3.49s** in reduced motion. Work
repeats **90 / 3.57s**; Portfolio detail remains **88**. Image transfer and visual
assets are unchanged. The audit accepts `--motion=no-preference` (default) or
`--motion=reduce`, verifies the setting inside Lighthouse's measured document,
and records matching interaction diagnostics. Final four-theme Home comparisons
and reduced-motion Portfolio checks are preserved in
[PERFORMANCE-MOTION-RESULTS.json](docs/PERFORMANCE-MOTION-RESULTS.json).

The following case-study pass discovers Chronicle's unchanged 600-weight font
early at low priority and lowers its mobile reading-panel frame priority. First
paint improves from **1.51s to 1.21s** across all three projects, with unchanged
font/image transfer. Portfolio repeats **89** in normal motion and measures **89**
in reduced motion; Travel Planner measures **90** and Nihonest **89**. Home/Work
retain **91/90**. The case-study target remains open.

Automated Accessibility and Best Practices were **100** in every mode;
SEO was **66** with indexing deliberately blocked. Chronicle's case studies still
need further loading optimization to reach 90. The three other modes meet
the score target, though Digital LCP and some Editorial/Engineer samples remain above 2.5s.

These are local simulated homepage results, plus unthrottled theme-switch and
Home/About/Back diagnostics. They are not deployed acceptance, field Core Web
Vitals, or proof of full WCAG conformance. Raw reports are saved under the ignored
.cache/performance directories. See [PERFORMANCE-REVIEW.md](docs/PERFORMANCE-REVIEW.md)
for conditions, findings, the isolated switch-timing outlier and remaining checks.

## Content and publication workflow

1. Run the [project-discovery prompt](docs/15-PROJECT-DISCOVERY-PROMPT.md) inside
   the source project. Reports and optional ZIPs are evidence, not approved copy.
2. Review supported claims, ownership, media permissions and unresolved questions.
3. Apply the [case-study contract](docs/CASE-STUDY-CONTRACT.md): edit discovery into
   the visible spine, one Engineering details disclosure and evidence-only docs.
   Add one English record and approved assets with dimensions, captions, alt text and provenance.
4. Validate and preview the record in every launch mode, including mobile, keyboard
   and reduced-motion behavior. Keep supporting media with its narrative owner.
5. Review publication and homepage featuring separately; only published records
   can be featured. Do not publish planning-only pipeline entries.

See [CONTENT-AUTHORING.md](docs/CONTENT-AUTHORING.md) for the implemented schema,
report-style narrative guidance and reference rules, and
[CONTENT-REVIEW.md](docs/CONTENT-REVIEW.md) for remaining editorial decisions.

## Release status

Vercel configuration, Node 24.x settings, release smoke and the
[release runbook](docs/RELEASE-RUNBOOK.md) are prepared. No portfolio deployment or
custom domain has been created in this work; deployment remains deferred.

`SITE_INDEXABLE` defaults to false. Configure `SITE_URL` explicitly when a canonical
origin is chosen; do not infer it from request headers. Vercel previews cannot enable
indexing through an inherited production flag, and Japanese fallback-only project
pages remain non-indexable. Rebuild/redeploy after changing those settings.
See [SEO-INTEGRATION.md](docs/SEO-INTEGRATION.md).

Remaining release work includes final contact/hero copy, current project-media review,
translations where appropriate, public-origin configuration and populated deployed
accessibility/performance/SEO checks. The three current projects are published and
featured; those settings remain separate decisions for future imports.

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

## Design and extension contracts

Approved visual references live in [docs/design-reference](docs/design-reference/README.md).
Their homepage visual direction takes precedence over older speculative design
examples; architecture, accessibility, localization and factual content follow
`AGENTS.md`, the project docs and implemented typed contracts. Reference HTML is
visual source material, not production React code or verified portfolio content.

Preserve content, URLs, semantic reading logic and essential destinations across
modes. Theme-specific composition must remain more than token changes. New block
types need a shared semantic fallback; normal projects must not need theme edits.
Product was authorized as a fifth mode on October 8, 2026; its
[handoff and mockups](docs/design-reference/product/README.md) are preserved in
the reference library. Graphic remains unimplemented and outside the current scope.

[ROADMAP.md](docs/ROADMAP.md) tracks completed integration and remaining review.
The planned implementation sequence is retained separately in
[14-IMPLEMENTATION-ROADMAP.md](docs/14-IMPLEMENTATION-ROADMAP.md).
