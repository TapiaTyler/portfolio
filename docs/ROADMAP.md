# Implementation progress

Last updated: 2026-10-03.

This file tracks implemented integration. The planned sequence and acceptance
gates remain in [14-IMPLEMENTATION-ROADMAP.md](14-IMPLEMENTATION-ROADMAP.md).
Update this tracker after each implementation pass and record the checks performed.
A completed foundation does not mean final content or visual design is approved.

## Completed integrations

- [x] Repository remote connected to `TapiaTyler/portfolio`; ignore rules for
      dependencies, generated output, caches, local configuration and secrets.
- [x] Next.js, TypeScript, linting, formatting, test runner and CI configuration.
- [x] English/Japanese route skeleton, destination-preserving locale navigation,
      basic metadata, skip link and visible focus styles.
- [x] Typed project, media, diagram, code snippet and semantic block schemas.
- [x] Technology/capability registries and publication-safe project selectors.
- [x] Build-time validation of schema, references, translation coverage and local assets.
- [x] Separate synthetic fixtures for sparse, system, visual, draft and hidden records.
- [x] Locale-aware content selection preserving the English narrative sequence,
      with field-level fallback and correct language attributes.
- [x] Shared ProjectFeature, ProjectMeta, ProjectLinks, SectionHeading,
      CaseStudyIntro, RichText, MediaFrame, ArchitectureDisplay and TechnicalDetail.
- [x] Semantic fallback rendering for all eleven supported case-study block types.
- [x] Work index, featured homepage projects and project detail routes use the
      public registry; project detail metadata uses selected locale content.
- [x] Development-only `/dev/design-system` preview and fixture media delivery.
      Both return 404 in production.

## Theme/composition foundation — completed

- [x] Theme IDs and registry for Editorial, Engineer and Digital.
- [x] Composition registry and shared fallback renderer contract.
- [x] Theme token contract and server-synchronized theme provider.
- [x] Cookie persistence and server selection before paint; preserve mode across locale changes.
- [x] Theme switching verification, including reload, keyboard, JavaScript-disabled use and reduced motion.
- [x] Development-only `/dev/compositions` comparison with unique scoped narrative anchors.
- [x] Shared homepage Hero content boundary and fallback renderer.

## Next integration pass

- [x] Add theme-specific entry/reveal choreography and hover/focus/press responses.
- [ ] Refine motion with Tyler's visual feedback and repeat relevant accessibility/performance checks.

## Motion and interaction — theme switching and mode profiles implemented

- [x] Motion tokens, reduced-motion overrides and immediate theme state changes.
- [x] Editorial link movement and Digital card hover/focus response.
- [x] Native navigation, selected/pending feedback and keyboard controls.
- [x] Shared module identity and coordinated movement/resizing across themes.
- [x] Destination-specific geometry timing, decorative/surface transitions and
      a controlled staged typography swap.
- [x] Header/menu snapshot layering and reading-position continuity after fonts settle.
- [x] Theme-specific entry/reveal choreography, project image/title responses, native menu motion and press/focus states.
- [x] Lightweight Digital pointer tilt and bounded decorative orbit entrance; no animation dependency or recurring loop.
- [x] Tyler's border refinement: remove Engineer's project inset rail and capability
      hover border; add monochrome Digital edge glimmers during hover/focus with
      static reduced-motion treatment.
- [x] Transition interruption, route cancellation, focus continuity, mobile,
      reduced-motion/unsupported API fallback, slow-response release and performance review.
- [x] Populated project transition coverage and desktop/mobile captured-frame review.
- [x] Tyler's review of the theme-switch choreography. See [THEME-TRANSITIONS.md](THEME-TRANSITIONS.md).
- [ ] Tyler's review of mode-specific motion and interactions. See [THEME-MOTION.md](THEME-MOTION.md).
- [x] Digital card-to-selected-project expansion and Editorial directional page
      turns, including depth-based multiple turns, history direction, reduced-motion
      fallback and development-only selected-project review. See [ROUTE-TRANSITIONS.md](ROUTE-TRANSITIONS.md).
- [x] Slow Editorial turns to 400ms each following Tyler's timing review.
- [x] Replace blinking repeated Editorial snapshots with one content turn and
      staggered blank sheets; add Engineer's 240ms record-change preview.
- [x] Tyler's approval of the layered Editorial turn and Engineer record change.
- [x] Extend transitions across internal content, brand, language and preview links
      and browser Back/Forward; Digital contracts to matching cards and uses a
      spatial expansion from the clicked module for other page changes, sharing
      the project-opening timing; header/history links expand the page surface.
- [x] First microinteraction pass: theme-specific navigation markers, Editorial
      unfolding disclosures, Engineer stepped indicators and precise detail motion,
      Digital card lighting and press-to-open feedback; keyboard/touch/reduced-motion support.
- [x] Remaining recommended microinteractions: Editorial image/caption framing and
      reading progress; Engineer record press, code copying and factual diagram
      inspection; Digital expanding image viewer and contextual pointer labels.
- [x] Digital media refinement: mixed-width image composition and a deduplicated
      case-study carousel; preserve expansion/contraction and return to the last
      viewed frame with keyboard focus and scroll restoration.
- [x] Header refinement: animated language selection in every mode; Engineer's
      square navigation marker moves beside links without changing their positions;
      Digital uses a single label-width rule with an independent slash prefix.
- [x] Editorial header navigation and language links flip down from a top binding; clip all
      Editorial page-turn snapshots below the live header and keep theme switching independent.
- [x] Match horizontal Editorial page turns to the approved top-bound flip's
      600ms timing; preserve 100ms sheet staggering, with a maximum 800ms sequence.

## Following integration passes

- [x] Discover and draft the portfolio as the first real pilot, including module
      morphing, composition differences and theme-specific motion/response decisions.
- [x] Capture live mode screenshots and switching video, plus labelled navigation
      and gallery reconstructions with provenance; add a guarded draft review route.
- [x] Review the pilot's narrative, media and long-page composition in all modes.
      Tyler also approved Japan Travel Planner's presentation and report voice
      across all three themes. Both records remain draft and unfeatured.
- [x] Implement the first Work, About, Lab and Contact composition pass using the pilot's layout rules.
- [x] Review the secondary-screen and mobile-menu composition pass with Tyler.
- [ ] Review final content, then review publication and featuring.

- [x] Prepare Vercel configuration and a release runbook for the Next.js runtime.
- [x] Select Vercel as the hosting provider.
- [ ] Select the public domain and verify a Vercel preview deployment.
- Deployment is deferred at Tyler's request until the other projects are completed
  and integrated into the portfolio. Local verification and project integration continue.
- [ ] Repeat performance/SEO checks on the deployment with reviewed content.

## Project pipeline — 2026-10-03

- Portfolio and Japan Travel Planner are imported and reviewed; no further imports
  are available at present. Publication and homepage featuring remain separate decisions.
- Nihonest is in development and nearing deployment; discovery/import will follow
  when source material is ready.
- Upwatch is in planning and will follow Nihonest. Hospitality Platform is also in
  planning. Neither has a GitHub repository or coding agent yet.
- The root README now describes the implemented system, reviewed inventory,
  development and verification workflow, project pipeline and deferred Vercel release.
- Images now respect their source dimensions across themes and in Digital's gallery,
  while continuing to shrink for narrower viewports.
  Verification: three Travel Planner preview tests passed, including 320/1440px
  image bounds and a tall-viewport gallery check; targeted lint/format and README
  link/script checks passed.

## Performance foundation — initial review completed

- [x] Reproducible production Lighthouse audits across all three launch modes,
      with isolated browsers, a dedicated server and ignored local reports.
- [x] Two mobile audit runs: Performance 95–99, Accessibility/Best Practices 100;
      indexing intentionally disabled, so public SEO acceptance remains pending.
- [x] Initial bundle/font delivery, layout shift and mobile theme-switch measurements.
- [x] Mode-specific font requests verified; no heavy Digital graphics package.
- [x] Findings and image-delivery limitations recorded in
      [PERFORMANCE-REVIEW.md](PERFORMANCE-REVIEW.md).
- [ ] Review LCP, real raster assets, populated routes and field performance on deployment.

## Editorial — first design pass completed

- [x] Approved-reference hero composition, local Cormorant Garamond/Inter typography
      and an intentional abstract visual instead of unapproved imagery.
- [x] Shared provisional homepage model with Work, capabilities, About, Lab and contact.
- [x] Sticky navigation, active destinations, native mobile menu and compact mode picker.
- [x] Editorial project features and case-study introductions, including no-image states.
- [x] Publication grammar applied to secondary-page shells and shared narrative/media blocks.
- [x] Desktop/mobile screenshot review, 320/390/768/1440px layout checks and keyboard tests.
- [x] Automated accessibility regression checks on English routes and Japanese fallback home.
- [x] Tyler's initial visual review accepted; subsequent content refinement remains open.
- [x] Language selector uses consistent Inter typography for both options and selection states.
- [x] Header includes Tyler Tetsuo Tapia and the approved Japanese name; mobile
      navigation contains both selectors. Control heights and chevron alignment
      are consistent, and diagonal link arrows and Digital's hero arrow are removed.
- [ ] Real content/media integration and final populated-layout review.

## Engineer — first design pass completed

- [x] Approved-reference 6/6 profile dossier and project overview, using local
      JetBrains Mono and Space Grotesk typography.
- [x] Project records with metadata emphasis and a 5/7 evidence/dossier split
      when media exists; sparse records omit unsupported fields and imagery.
- [x] Capability matrix and distinct Lab/About grouping using shared provisional content.
- [x] Square panels, indexed navigation, dark dot grid and semantic status accents.
- [x] Case-study identity record, early architecture summary and technical-section
      links, with the complete canonical narrative sequence preserved.
- [x] Record treatments for architecture, decisions, constraints and technical detail.
- [x] Scoped styles, desktop/mobile screenshot review and 320/390/768/1440px checks.
- [x] Automated accessibility checks for public shells and populated development fixtures;
      keyboard, native navigation and JavaScript-disabled switching regression checks.
- [ ] Tyler's visual review and any resulting refinement.
- [ ] Real content/media integration and final populated-layout review.

## Digital — first design pass completed

- [x] Approved-reference 7/5 name-led hero, local Inter/JetBrains typography,
      abstract SVG portal, ambient gradients and grid.
- [x] Three-column project deck with responsive stacking, media, metadata and
      actual status accents; no-image and sparse records remain supported.
- [x] 6/6 connected About composition, translucent capability panels and centered contact.
- [x] Media-led case-study intro and layered narrative surfaces with canonical blocks preserved.
- [x] Pointer and keyboard response, reduced-motion fallback and native navigation.
- [x] Development-only populated homepage preview for all active modes.
- [x] Desktop/mobile screenshot inspection, populated fixture checks, automated
      accessibility checks and 320/390/768/1440px viewport review.
- [ ] Tyler's visual review and subsequent refinement.
- [ ] Real content/media integration and final populated-layout review.

## Cross-theme integration — completed initial regression pass

- [x] Populated homepage browser coverage in every mode and both locale routes,
      including sparse records, long titles and English field fallbacks.
- [x] Landscape, wide and portrait fixture media, with intrinsic ratio checks
      and verified lazy loading across all three compositions.
- [x] Explicit reduced-motion preview controls and actual browser preference checks.
- [x] Scoped typography checks under every outer mode and unique narrative anchors.
- [x] Failed-media fallback descriptions and working project links in every mode.
- [x] Mobile nested Escape/focus behavior, equal-height controls, native theme
      switching with and without JavaScript, and production preview exclusion.
- [x] Isolated preview test server/build and populated-layout coverage added to CI.
- [ ] Final zoom, screen-reader, device and visual review with real content.

## SEO foundation — implemented

- [x] Validated site-origin configuration and explicit production indexing opt-in.
- [x] Canonical, ready-locale alternates, Open Graph and Twitter metadata for main
      and public project routes, independent of presentation mode.
- [x] Publication-safe sitemap, preview-safe robots and per-page locale readiness.
- [x] Locally generated 1200×630 share image with verified identity.
- [x] Minimal Person/WebSite structured data with safe JSON serialization.
- [x] Default and enabled test configuration verification; normal preview build restored.
- [ ] Supply the real public domain and review final metadata/copy before enabling indexing.
- [ ] Review project structured data when actual project content is available.

## Remaining launch work

- [ ] Complete additional shared homepage content modules
      as supported source content becomes available.
- [x] Extend development previews with image aspect ratios, content edge cases
      and explicit reduced-motion comparison states.
- [ ] Finish Editorial refinements with reviewed content, imagery and visual feedback.
- [ ] Refine Engineer with reviewed project content and visual feedback.
- [ ] Refine Digital with reviewed project content and visual feedback.
- [ ] Integrate reviewed project-discovery reports, real media and final English copy.
- [ ] Translate interface copy and selected Japanese content with intentional fallbacks.
- [x] Implement canonical URLs, locale alternates, sitemap and justified identity structured data.
- [ ] Configure public domain and validate final metadata on the deployment.
- [ ] Cross-theme accessibility, responsive and visual regression review.
- [ ] Performance/bundle review, deployment configuration and release review.

## Current limitations

The portfolio pilot is the first real draft record; public project inventory stays
empty pending content review. `/dev/projects/portfolio` permits review of the real
draft. Synthetic fixtures remain separate, and drafts/fixtures stay outside public
selectors and routes. See `projects/portfolio/README.md` for discovery and evidence.
Japanese interface and narrative translations remain pending; the header includes
the Japanese name explicitly approved by Tyler. All three modes have initial
approved-reference implementations. Editorial's initial visual review is accepted;
Engineer/Digital review and all modes' final content/layout refinement remain open.
Portfolio routes render per request to select
the saved composition before paint (see D029).
CI is configured locally; a successful hosted CI run and deployment are not yet verified.
SEO is implemented but indexing remains disabled by default. The public origin
has not been configured; untranslated Japanese routes remain outside the sitemap
and Japanese language alternates until relevant reviewed content exists.

## Verification history

| Pass                                                       | Checks                                                                                                                                                                                                                                                                                                                                                                                                                            | Result                                                                                                                                                                                                                                                           |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository/application foundation                          | Type checking, lint, formatting, tests and production build                                                                                                                                                                                                                                                                                                                                                                       | Passed locally                                                                                                                                                                                                                                                   |
| Content/schema foundation                                  | 13 tests, content/assets validation, type checking, lint, formatting and production build                                                                                                                                                                                                                                                                                                                                         | Passed locally                                                                                                                                                                                                                                                   |
| Locale selection/shared rendering                          | 19 tests; content/assets validation, type checking, lint, formatting, production build and development/production route smoke checks                                                                                                                                                                                                                                                                                              | Passed locally                                                                                                                                                                                                                                                   |
| Theme/composition foundation                               | 23 unit tests, 4 production browser tests, content validation, type checking, lint, formatting and production build; development comparison preview with scoped palettes, unique anchors and 320px viewport checks                                                                                                                                                                                                                | Passed locally                                                                                                                                                                                                                                                   |
| Editorial first design pass                                | 25 unit tests, 7 production browser tests, axe checks, local fonts, viewport/screenshot review, content validation, type checking, lint, formatting and build                                                                                                                                                                                                                                                                     | Passed locally                                                                                                                                                                                                                                                   |
| Engineer first design pass                                 | 28 unit tests, 9 production browser tests, axe checks on public shells and populated fixtures, local fonts, scoped styles, unique anchors, viewport/screenshot review, content validation, type checking, lint, formatting and build                                                                                                                                                                                              | Passed locally                                                                                                                                                                                                                                                   |
| Digital first design pass                                  | 28 unit tests, 11 production browser tests, Brave viewport/screenshot review, populated fixture axe checks, reduced motion, content validation, lint, formatting, type checking and build                                                                                                                                                                                                                                         | Passed locally                                                                                                                                                                                                                                                   |
| Cross-theme integration                                    | 28 unit tests, 12 production browser tests, 5 populated development browser tests, axe checks, locale fallbacks, scoped typography, image ratios, failed media, native mobile controls, reduced motion, lint, formatting, type checking, content validation and build                                                                                                                                                             | Passed locally                                                                                                                                                                                                                                                   |
| SEO foundation                                             | 32 unit tests, 15 production browser tests with default/enabled identity, canonical/locale checks, sitemap/robots, share PNG, structured data, lint, formatting, type checking, content validation and builds                                                                                                                                                                                                                     | Passed locally                                                                                                                                                                                                                                                   |
| Performance foundation                                     | Two production mobile Lighthouse runs per mode, resource/font review, mobile mode-switch timings, 32 unit tests, lint, formatting, content validation, type checking and production build                                                                                                                                                                                                                                         | Passed locally; final deployed/populated acceptance pending                                                                                                                                                                                                      |
| Theme-switch motion                                        | 32 unit tests, production browser regression and six transition scenarios, 6 populated preview tests, desktop/mobile animation-frame review, lint, formatting, type checking, build and production Lighthouse audits                                                                                                                                                                                                              | Passed locally; visual feedback and remaining expressive motion pending                                                                                                                                                                                          |
| Theme-specific motion                                      | 32 unit tests, 26 production browser tests, 7 populated preview tests, desktop/mobile interaction screenshots, reduced-motion/touch/native-menu checks, lint, formatting, type checking, content validation, build and Lighthouse 95/97/96                                                                                                                                                                                        | Passed locally; Tyler's timing/interaction review pending                                                                                                                                                                                                        |
| Border interaction refinement                              | Targeted populated preview checks for Engineer hover removal, moving Digital border angles, hover exit, keyboard focus and both reduced-motion states; screenshot review, lint, formatting, content validation and production build                                                                                                                                                                                               | Passed locally                                                                                                                                                                                                                                                   |
| Route-motion integration                                   | 33 unit tests, 30 production browser scenarios, 10 preview tests; direction/history, interruption, slow response, fallbacks, selected-project media/focus, two-turn fixture review, desktop/mobile frames, lint, formatting, build and Lighthouse 98/97/96                                                                                                                                                                        | Verified locally; interruption test readiness corrected and an existing theme timing test passed on retry; Tyler's choreography review pending                                                                                                                   |
| Editorial/Engineer route refinement                        | Targeted browser checks for actual sheet/scan animations, one content iteration, Engineer history/reduced motion, Editorial direction/interruption and Digital opening; captured frames, lint, formatting, content validation and production build                                                                                                                                                                                | Passed locally; visual review pending                                                                                                                                                                                                                            |
| Navigation transition coverage                             | 33 unit tests, lint, formatting and production build; 35 production browser tests and 10 populated preview tests, including internal links, locale changes, Back/Forward and Digital contraction/reopening                                                                                                                                                                                                                        | Verified locally after interruption recovery; an intermittent preview hover failure passed on targeted retry and the full preview rerun; expanded navigation visual review pending                                                                               |
| Consistent motion on page links                            | 9 targeted production navigation scenarios, 3 project preview scenarios, lint, formatting and production build; Digital module-to-page expansion and header/history opening timing                                                                                                                                                                                                                                                | Passed locally across the run and fallback retest; isolated preview artifacts after concurrent trace cleanup interference; Tyler's visual review pending                                                                                                         |
| First microinteraction pass                                | 12 production navigation/motion scenarios, 7 targeted populated preview scenarios across runs, real touch press, keyboard disclosures, reduced motion, lint, formatting, content validation and final production build                                                                                                                                                                                                            | Passed locally; corrected scoped disclosure animation selection and focus/press coordination; Tyler's visual review pending                                                                                                                                      |
| Editorial marker/disclosure refinement                     | 3 production marker checks, 4 preview checks, marker-to-label gap, 44px targets, single navigation underline, collapsed rule, direct technical preview link, lint, formatting and production build                                                                                                                                                                                                                                | Passed locally; review link added to development previews                                                                                                                                                                                                        |
| Disclosure replay correction                               | Reproduced Editorial replay failure; native keyboard tests verify three completed opening cycles in Editorial and Engineer, plus reduced motion; lint, formatting and production build                                                                                                                                                                                                                                            | Passed locally after explicit timeline restart on each opening                                                                                                                                                                                                   |
| Editorial unfolding and reverse closure                    | 33 unit tests, 14 full fixture preview checks for height unfolding and longer code, plus 5 final microinteraction checks including reverse fold, mid-close reopening and dynamic reduced motion; inspected partial-fold frame, lint, formatting and final production build                                                                                                                                                        | Passed locally; stabilized automated focus scrolling and card entrance readiness in existing fixture tests; Tyler's motion review pending                                                                                                                        |
| Remaining recommended microinteractions                    | 33 unit tests, 38 production browser tests, 20 populated preview tests; reading position, crop/caption focus, record presses, actual diagram connections, clipboard success/denial, modal keyboard/AA checks, uncropped mobile image geometry, pointer labels and reduced motion; desktop/mobile viewer inspection, lint, formatting and production build                                                                         | Passed locally; corrected modal Tab looping and overlay scope-root styling; Tyler's visual review pending                                                                                                                                                        |
| Digital image composition and gallery                      | 33 unit tests, 38 production browser tests, 20 full preview tests plus a final 6-test gallery/interaction run including the added animated return scenario; deduplication, button/arrow navigation, focus looping, selected-frame contraction and scrolling, mobile aspect ratios, varied image widths, axe checks, desktop/mobile screenshot inspection, lint, formatting and production build                                   | Passed locally; preview server restarted after a simultaneous build removed its nested development output; Tyler's visual review pending                                                                                                                         |
| Header slider and navigation refinement                    | 22 targeted production browser scenarios verified across runs, including six final header checks; real language animation handoff, localized destinations/history, fixed control dimensions, desktop/mobile markers, single Digital label rule, keyboard/AA checks, reduced motion, JavaScript-disabled controls, screenshots, lint, formatting and production build                                                              | Passed locally after correcting Engineer's scoped reduced-motion override and test assumptions about retained focus and menu closure; Tyler's visual review pending                                                                                              |
| Editorial top-bound header page flip                       | 33 unit tests, 13 targeted production browser scenarios plus six final route checks after reversing the rotation toward the reader; incoming top-hinge rotation and intermediate 3D geometry, 600ms timing, below-header snapshot clipping, navigation/brand/language links, mobile theme interruption, history direction, reduced motion, timeout/fallbacks, partial-frame screenshots, lint, formatting and production build    | Passed locally; revised to a binding at the top and a sheet swinging from the front, with perspective scaled for long pages; visual review pending                                                                                                               |
| Editorial horizontal timing refinement                     | Targeted populated preview verifies 600ms forward/backward turns, 100ms blank-sheet stagger, one outgoing content iteration and cleanup; formatting check                                                                                                                                                                                                                                                                         | Passed locally; matches the approved header flip timing and easing                                                                                                                                                                                               |
| Portfolio pilot foundation                                 | 35 unit tests, four real-draft preview scenarios across all modes, 320/1440px layout and AA scans, actual module morphing, native video metadata, English fallback, canonical block preservation and draft selector exclusion; seven targeted production theme/Engineer scenarios including public/preview 404 gates; live capture inspection, labelled reconstruction provenance, lint, formatting, content validation and build | Passed locally; corrected test assumptions about language attributes and offscreen video loading; narrowed Engineer metadata labels after real-content review; narrative/media and publication review pending                                                    |
| Portfolio pilot layout refinement                          | 36 unit tests; all four pilot preview scenarios verified across runs, including a corrected scoped test locator and targeted Digital rerun; five summarized Engineer cells, complete borders, Digital evidence ownership and consistent narrative surfaces, 320/1440px screenshots, AA scans, native video, locale fallback and theme morphing; lint, formatting, content validation and production build                         | Passed locally; desktop/mobile images inspected; Tyler's layout review pending                                                                                                                                                                                   |
| Engineer record consistency and Digital secondary lighting | 36 unit tests and three targeted pilot preview scenarios: complete narrative framing, shared supporting media, neutral Engineer borders, 320/1440px layout and AA scans, native video, locale fallback, theme morphing, dim Digital pointer tracking/exit/reduced-motion behavior; screenshot inspection, lint, formatting, content validation and production build                                                               | Passed locally; visual review pending                                                                                                                                                                                                                            |
| Glow exit, Engineer media rows and page-wide morphing      | 36 unit tests; seven production theme-transition scenarios including Work/About/Lab/Contact in both locales; four targeted preview scenarios verified across runs, retained glow coordinates through fade, bounded Engineer media and same-row comparisons, real pilot and selected-project/shared-semantic morphing; AA checks, screenshot inspection, lint, formatting, content validation and build                            | Passed locally; stabilized hover verification after page reveal movement; current Engineer image arrangement accepted by Tyler                                                                                                                                   |
| Case-study orientation and section navigation              | 37 unit tests; ten reading/pilot preview scenarios verified across runs, native desktop/mobile anchors, current-section tracking, keyboard focus, no-JavaScript navigation, reduced motion, overview fallback and translation coverage, AA scans, sticky-index reading-position preservation and module morphing; screenshots, lint, formatting, content validation and build                                                     | Implemented; initial Engineer opening balanced after screenshot review; visual review pending                                                                                                                                                                    |
| Engineer directory index and focused pilot evidence        | 37 unit tests, ten distinct browser checks across runs, native video metadata, three-theme AA scans, mobile/desktop directory screenshots, recording inspection, lint, formatting, content validation and build                                                                                                                                                                                                                   | Implemented locally; two unedited interaction recordings, explicit fixture provenance and owner grouping; visual/content approval remains pending.                                                                                                               |
| Engineer directory accent balance                          | Scoped CSS reviewed; formatting check                                                                                                                                                                                                                                                                                                                                                                                             | Directory hover/current text and file icons use the existing header green accent.                                                                                                                                                                                |
| Secondary-page composition pass                            | 37 unit tests; four public routes in all modes/locales, 320/390/1440px overflow and screenshots, twelve AA scans, populated Work previews, production module morphing in eight route/locale combinations, lint, formatting, content validation and build                                                                                                                                                                          | Implemented; shared provisional copy, native navigation, neutral Engineer records, dim Digital lighting and honest empty states; final content and visual review pending.                                                                                        |
| Theme-specific mobile menu button                          | Native keyboard/Escape and route closure, 320px touch-target/overflow checks, reduced motion, three AA scans and no-JavaScript navigation; screenshot review, lint, formatting and build                                                                                                                                                                                                                                          | Editorial fine-line close glyph, Engineer bracketed green stepped control and Digital staggered bars with dim open glow.                                                                                                                                         |
| Vercel release and content-review preparation              | Environment guard unit cases, production release smoke, build/type checks, lint and formatting                                                                                                                                                                                                                                                                                                                                    | Native Next configuration, Node 24.x, preview indexing guard, content decision inventory and release runbook; hosted preview and domain pending.                                                                                                                 |
| Full motion performance refresh                            | Fresh production build; two mobile Lighthouse runs in all modes; mobile mode-switch timings; twelve desktop route/history samples with long-task and animation-frame diagnostics; 23 populated interaction scenarios verified across runs; script/test lint, formatting and diff checks                                                                                                                                           | Performance Editorial 95–98, Engineer 96–97, Digital 95; automated Accessibility/Best Practices 100. Corrected stale disclosure/glow tests. Real-media/deployed acceptance remains pending; deployment deferred until other projects are integrated.             |
| Project discovery handoff refresh                          | Prompt reviewed against implemented project/block schemas, vocabulary registries, media authoring and publication rules                                                                                                                                                                                                                                                                                                           | Evidence-backed English discovery, narrative/media ownership, capture provenance, verification conditions and optional multi-file ZIP bundle; imports remain drafts pending review.                                                                              |
| Japan Travel Planner draft import                          | Eight source files preserved; approved PNG provenance and complete source excerpt; two records/five fixtures validated; 38 unit tests, production build, three populated cross-theme previews with AA/320px checks, release smoke and screenshot review                                                                                                                                                                           | Complete source application, mixed implementation attribution, Railway live URL and dedicated security section; portfolio remains draft/unfeatured with English fallback. Focused follow-up prompt covers security evidence and optional historical comparisons. |
| Case-study narrative voice and results                     | Content/reference validation, lint, formatting and six targeted cross-theme reading/project previews, including responsive media and AA checks                                                                                                                                                                                                                                                                                    | Both project narratives use neutral report voice; ownership keeps manual/AI-assisted distinctions. Travel Planner results describe the completed workflow, reuse, localization and deployment; import provenance remains in review docs.                         |
| Travel Planner follow-up evidence integration              | Follow-up files/JSON and existing screenshot hashes reviewed; original capstone tag resolved; content validation and production build passed; three populated cross-theme previews with both diagrams, media ownership, 320px layout, AA scans and locale fallback passed; lint/formatting checked                                                                                                                                | Confirmed original `capstone-v1.0` at `23a4dd6`; security diagram/detail and separate quality evidence added. Source supplement records 25 backend tests, historical CI and anonymous public checks; result stays outcome-focused and publication remains draft. |
