# Product presentation — implementation handoff to coding agent

**Deliverable intent:** add a fifth full composition (`product`) to the existing portfolio; **do not write or commit implementation merely from this document**. First inspect repository and report the facts discovered. The portfolio's default is and remains `editorial`.

## Read this ZIP in this order

1. `PRODUCT-REFERENCE.md` — desired visual/semantic behavior and reference authority.
2. `PRODUCT-COMPOSITION-MAP.md` — shared content mapped to Product; **conceptual roles**, not current component names.
3. `PRODUCT-INTERACTION-SPEC.md` — interaction and fallback behavior.
4. `PRODUCT-ASSET-MANIFEST.md` — available design images, absent evidence screenshots and provenance.
5. `PRODUCT-ACCEPTANCE-CHECKLIST.md` — test/review gates.

The `mockups/` directory has five verified visual references. **Do not import them as application UI screenshots.**

## Approved direction (what is fixed)

- **[Approved]** Product is deliberately *different* in composition, not merely a palette: a work-oriented scan list paired with an on-demand project context/detail region on desktop and a vertical reading case-study at any size.
- **[Approved]** Selected **Decision Canvas** / refined homepage direction: warm ivory and off-white ground; ink-colored typography; restrained forest-green action and selection; narrow separators; mostly unboxed content; readable, efficient project comparison. The three projects stay in order: Nihonest, Portfolio presentation system, Japan Travel Planner.
- **[Approved]** Avoid routine arrow suffixes, prefixed section/project numbers, pills, green left-border markers, nested rounded cards, ornamental icons/labels, ornamental Japanese, fake charts/capabilities/outcomes and huge empty hero.
- **[Approved]** Header: `Tyler Tetsuo Tapia`, `テイラー・鉄男・タピア`, Work/About/Lab/Contact, GitHub then LinkedIn, EN/JP with visible animated selected state, **compact presentation select** for Editorial, Engineer, Digital, Chronicle, Product. Phone places **language above presentation in menu** and does not repeat job title.
- **[Approved]** Case-study spine: Problem → What was built → Key decisions → Architecture → optional Challenge → **one grouped Engineering details** → Result. Project source is authoritative; no generated narrative or screenshot evidence.
- **[Approved]** Contact email `tapiatylert@gmail.com`, adjacent Copy tooltip button, real profile names as links, native email, external websites in new tab, reserved résumé/CV PDF/Word entries in **pending** state (no fake files).
- **[Approved]** Maintain: factual content/attribution, available/published state, actual URLs, accessible order, canonical SEO identity and optional reviewed Japanese per-field English fallback. Four existing modes preserved; default Editorial.
- **[Approved]** WCAG 2.2 AA target and Lighthouse working targets (Performance ≥90, Accessibility/Best Practices/SEO ≥95), without visual-quality sacrifice or fake optimizations.

## Reference precedence and known generated-image contradictions

| Priority | Artifact / basis | Interpretation |
|---|---|---|
| 1 | Explicit owner constraints and rejection feedback (in this handoff) | Binding over image-generated details |
| 2 | `mockups/product-decision-canvas-refined-homepage.png` | **Primary approved homepage visual direction** |
| 3 | `mockups/product-decision-canvas-original-concept.png` | Selected Concept 2's basic list/preview structure **only**; not its arrows, numbering, pills, leading borders or large theme tabs |
| 4 | `mockups/product-phone-home-menu-exploration.png` | **Unreviewed follow-on** phone exploration; depicts multi-tab theme selector/handwriting that must **not** be copied |
| 5 | `mockups/product-japan-travel-planner-desktop-detail.png` and `mockups/product-japan-travel-planner-phone-detail.png` | **Unreviewed follow-on** detail explorations; use reading layout and media relationships, not fictional content or five theme tabs |
| 6 | Numeric typography, spacing, color, breakpoints and motion in documentation | **Estimates/recommendations**, revise after implementation screenshots, testing and owner review |

**No approved mockup exists for dedicated Work/index, full Contact page, state board, tablet or narrow-320px layout.** Extend established grammar using specs; request visual sign-off when available. The phone-image montage is not a pixel-exact 390px screenshot. The desktop and phone detail drawings include illustrative application UI, not validated screenshots.

## Repository-first inspection: required report before editing

The coding agent has repository access; this handoff does **not**. Do not make up paths, packages, hooks, component names or facts. Inspect and briefly document:

1. **Architecture and routing:** framework/runtime version, current theme registration/default, client/server boundaries, routing/links, canonical paths, navigation, SEO and 404 handling.
2. **Content sources:** project order and IDs, source copy, case-study fields, optional sections, contribution credits, real URLs, editorial states, content-loading/localization semantics and per-field fallbacks.
3. **Semantic components/compositions:** existing patterns for introductions, list/detail previews, case-study spine, media, Contact, Lab empty state, resources. Identify stable semantic identity/morph matching rules rather than guessing keys.
4. **Language/theme controls:** existing selectors, persistence storage or URL model, SSR first-paint initialization, no-flash protections, navigation transitions and back/forward semantics.
5. **Media:** actual project screenshots and dimensions, alt/captions, source rights, existing optimized-image pipeline, gallery/lightbox and no-image behavior. **No project screenshot is provided as an isolated verified asset in this ZIP.**
6. **Accessibility and testing:** existing keyboard/focus/menu/disclosure components, reduced-motion strategy, CSS token structure, viewport tests, a11y audits, performance/Lighthouse scripts and CI conventions.
7. **Project management:** find the *actual* roadmap and decision log file(s) and conventions; no filenames assumed.

Before changes, present a short impact map of existing files/components to reuse or extend, unresolved factual inputs and a test baseline. Avoid duplicating content, building a parallel router or replacing shared behavior just for Product.

## Recommended implementation sequence (dependencies explicit)

| Phase | Change / verification goal | Depends on | Exit gate |
|---|---|---|---|
| **0. Repository mapping** | Report actual composition/content/token/theme/navigation/asset implementation; establish baseline screenshots/tests | Repository access | Real source-of-truth and affected modules identified; no guessed APIs |
| **1. Data contract and semantic mapping** | Ensure Product consumes exactly the same project content, URLs, attribution, statuses, localization rules and case-study sections as others | Phase 0 | Three-project parity check; optional fields identified; no generated copy |
| **2. Mode integration and foundation** | Register fifth composition, theme choice and tokens; preserve Editorial default, persistence/first paint, other modes | 0–1 | Product selectable via compact control; other modes unchanged |
| **3. Homepage Product composition** | Intro, selected-work list with right contextual preview, About, practice, intentionally empty Lab, Contact invitation; actual evidence or omit images | 1–2 and media inventory | First 1440/390/320 screenshots; genuine links work; no rejected patterns |
| **4. Work/index and project detail** | Extend list/preview grammar to Work; Travel Planner as first verification case; spine and grouped native disclosure; no-image cases | 1–3 | Detail data matches shared source, 1440 and 390 readable, browser history correct |
| **5. Contact/auxiliary states** | Exact email Copy control; GitHub/LinkedIn; three unavailable document rows, About/Lab/404 extension | 2–4 | No false downloads, correct external/email behavior, empty/error recoverable |
| **6. State/motion and semantic morph** | Focus, selected state, language indicator, mobile menu, optional preview fade, integration with existing morph; reductions/interruption | 2–5 and shared API inspection | Keyboard/touch/reduced-motion/rapid switching pass; no behavior gated by animation |
| **7. Verification and owner review** | Responsive matrix, content invariance across 5 modes, no-JS/navigation checks, accessibility manual audits, Lighthouse and media performance | All above | Acceptance checklist evidence; visual signoff or recorded deviations |
| **8. Documentation update** | Record final token choices, deviations, decisions and asset provenance in actual repo roadmap/decision log | Review outcome | Repository notes updated; open decisions remain explicit |

**Implementation code is out of scope for this handoff ZIP.** This phase order is guidance, not a request to implement unrelated CMS, analytics or design systems.

## Risks and mitigations

| Risk | Mitigation / review point |
|---|---|
| Model treats mockup's application imagery as accurate screenshots | Source actual screenshots from repo, check product UI and versions; absent screenshot → omit. Mark illustrations as references only |
| Data duplication / localized content drift across themes | Reuse existing project content and per-field fallback; test same project in all five modes |
| Generated case-study claims become published facts | Do not paste sample Problem/Decisions/Result prose without verifying existing content; retain missing optional fields |
| Mobile menu copied literally from art | Use compact mode `<select>`; language above mode; no five-tab strip or phone header duplicate job title |
| Desktop preview harms keyboard/no-JS use | Provide direct case-study anchors and static readable list; distinguish select from navigate |
| Morph animation couples different projects or causes flashing | Map semantic identity only when valid; initialize theme before visible paint using existing system; reduced-motion instant fallback |
| Small text/long Japanese lines or 320px overflow | Test actual glyphs/copy, fluid columns and wraps; don't freeze mocked text blocks |
| UI evidence upscaled/blurry or extra heavy fonts | Preserve native image resolution, selectively optimize, avoid excess JP font downloads; maintain quality and targets |
| New CSS/token rules disturb four other themes | Scope Product composition styles appropriately, reuse shared foundations safely, run regression checks |
| Nonexistent résumé/CV files become fake links | Plain pending PDF and Word statuses; only real later assets get native href/downloads |
| Lighthouse score chasing weakens site | Compare perceived loading, typography/media fidelity and interaction; don't defer small essential elements artificially |

## Open decisions that materially affect implementation

1. **[User review + repo discovery] Project selection semantics.** Does clicking a row select a desktop preview, navigate, or use two distinct controls? The preview concept is approved; the exact interaction contract remains to be aligned with existing site behavior.
2. **[Repo discovery] Genuine screenshots.** Inventory which projects have usable images, original sizes, accessible captions and rights. The design must work without them.
3. **[User review] Hero media.** Generated scenery is illustrative and not separately sourced/licensed. Decide whether to use a real cleared image or a text/CSS-only hero.
4. **[User review] Typography/tokens.** IBM Plex Sans + Source Serif 4, optional Noto JP families, candidate colors/sizing are *recommendations*, not literally approved pixel measurements.
5. **[Repo discovery] Persistence, history and morph.** Follow current contracts; do not create a new query-string, client storage key, animation system or component API by inference.
6. **[User review] Follow-on page layouts.** Phone homepage/menu, desktop/phone Travel Planner detail are exploratory illustrations; first working implementation must be reviewed. Work/index and full Contact have no dedicated approved visual mockup.
7. **[Repo discovery + owner/editor] Content completeness.** Confirm existing actual Problem/Built/Decisions/Architecture/Result wording and Challenge/Engineering details presence. No assumptions based on generated image text.

## Suggested developer-to-owner review packet [R]

Provide actual screenshots/videos at **1440px homepage**, **390px homepage closed+open menu**, **1440px Work/index**, **1440px Travel Planner case-study**, **390px case-study**, **320px critical views**, **Contact pending resources**, and **one zero-image test**. Include a brief diff-style list of departures from the refined primary mockup and how each departure serves real content, accessibility or breakpoint constraints. Separate factual/editorial questions from purely visual feedback. Include automated score reports **plus** manual accessibility results; never claim automated audits certify WCAG conformance.

## Required completion housekeeping [A]

- Update the **repository's actual roadmap and decision log** with Product progress, approved vs revised visual decisions, remaining unknowns, acceptance results and source asset decisions.
- Record that Product is a fifth composition while Editorial remains default.
- Record any known incompatibility or missing resource as an open item instead of silently creating fake content or destinations.
- Keep this handoff and its images in documentation or development tooling, **not** runtime imports or the production public asset directory unless explicitly justified.
