# Japan Travel Planner — project discovery

Discovery source material for a portfolio import; **not approved publication copy**. Inspected 2026-10-03 (Hawaii time), at `385c122` (`main`, tag `v1.0.0`). The working tree was clean before this discovery work. This report describes the tracked implementation at HEAD; generated `frontend/dist/` and these discovery files are not part of that revision. Paths below are repository relative.

**Follow-up:** [FOLLOWUP.md](FOLLOWUP.md) supersedes the unresolved completion, contribution and asset-permission statements below. Tyler confirms complete status, manual original school work, AI-assisted later enhancements under his direction/architecture, and approved fictional/demo screenshots and selected code. The follow-up verifies 25 backend tests, anonymous public rendering and historical CI, and identifies `capstone-v1.0`. The sections below preserve the first inspection's verification conditions; the history error in §1 is corrected.

## 1. Snapshot and evidence

Reviewed `AGENTS.md`, `README.md`, architecture/deployment/migration guides, React routes, hooks, API client, components and styles, Spring controllers/services/security, models/migrations, CI, tests, Dockerfile, screenshots, and Git history. Correction from the follow-up: the root commit is `835201f` (2023-02-13), containing only a course starter README. `41fe222` (2026-08-25) is an application commit. Initialization is at `d4cce39` (2026-08-22), functional React code appears at `047b5f9` (2026-08-27), and the four checked-in screenshots first appear in `2b63b0e` (2026-09-05). No authentic screenshot from the original school-project version was found in tracked history. Git commits establish sequence, not authorship method or individual contribution. See the follow-up for the recovered `capstone-v1.0` tag.

**User-supplied provenance:** Tyler says the original website / first iteration and push of the application was completed without AI as a school project. Record this prominently in the eventual case study, attributed to Tyler. The repository supports the capstone origin (`README.md:9`) and early code sequence, but Git cannot independently verify implementation methods or a submitted school revision. The root commit is a course-provided README, so “first push” should be phrased as the first application iteration. The follow-up resolves later AI assistance and documents the tagged capstone boundary.

Limits: no live site or deployed database was inspected; the README live link is **unverified**. Local Java is 17, while `backend/pom.xml` specifies 21; backend tests and a full-stack runtime check were not run. No current browser capture was made. The four repository images were visually/dimensionally inspected, but their data provenance and public-use permission need confirmation.

## 2. Identity and scope

- **Name / candidate slug:** Japan Travel Planner / `japan-travel-planner`.
- **Period:** 2026, supported by commit dates; school-project dates and later contribution boundaries need Tyler's confirmation.
- **Category / status:** full-stack travel-planning web application, originating as a WGU software engineering capstone and subsequently developed as a portfolio application (`README.md:9`). Implemented software and a documented deployment; actual live availability is unverified. Candidate project status: `active` pending Tyler's confirmation.
- **Audience / purpose:** people planning travel in Japan; organize trips and activities, lodging, and transportation in one itinerary. This audience is an inference from product behavior and README, not user research.
- **One-line summary:** A responsive Japan itinerary planner with account-based trip editing, reusable templates, yen cost summaries, print output, and English/Japanese interface support.

Implemented: registration/login/account controls (`frontend/src/App.jsx:260-320`; `backend/.../controller/AuthController.java`, `AccountController.java`); trip and item CRUD and duplication (`TripController.java`, `TripItemController.java`, `TripService.java:97`); date/location grouping, search and advanced filters (`frontend/src/hooks/useItinerary.js`, `frontend/src/utils/itineraryFilters.js:74`); cost totals and printable filtered itineraries (`CostSummary.jsx`, `PrintableItinerary.jsx:13-166`); public/private trip templates and reusable individual items (`TripTemplateController.java:23-75`, `SavedItineraryItemController.java`); theme, language preference and external map queries (`useTheme.js`, `i18n/index.js`, `utils/mapUrls.js`). Public library browsing works without login; template instantiation requires it (`SecurityConfig.java:40-67`).

Important scope boundaries: costs use JPY, user-entered text is not translated, maps are outgoing links rather than an embedded maps integration, and image upload is deferred (`docs/ARCHITECTURE.md`, “Deliberate Constraints”). The landing-page preview is sample UI content, not a live trip (`frontend/src/pages/LandingPage.jsx`). No measured adoption or travel outcome is available.

## 3. Ownership and contribution

The user directly confirms that the original application iteration was a manually completed school project with no AI. Current Git history and the README support evolution from capstone to portfolio-style app, but do **not** establish who designed or implemented each later feature, whether collaborators or AI assisted later, or contribution percentages. `CONTRIBUTING.md` and CI document review conventions, not completed personal review. Suggested portfolio ownership and implementation values remain unset until Tyler confirms the later work. No external research, user testing, product metrics, or design ownership is evidenced.

## 4. Technology and architecture

React 19, React Router, Vite, i18next and CSS form the client (`frontend/package.json`, `frontend/src/App.jsx`). Java 21 Spring Boot, MVC, Security, JPA and validation form the API (`backend/pom.xml`, controllers/services). PostgreSQL stores accounts, trips, polymorphic itinerary items, templates and reusable items; Flyway versions the schema (`backend/src/main/resources/db/migration/V1__baseline_schema.sql` through `V5__add_public_template_localization_keys.sql`; `backend/src/main/java/.../model`). The production Dockerfile builds the client into Spring static resources and runs one non-root JVM container (`Dockerfile:1-34`); Railway topology is documented, not runtime verified (`docs/DEPLOYMENT.md`).

Data flow: browser routes render the UI → `frontend/src/api/api.js:68-93` sends cookie-bearing API requests and CSRF headers → Spring controllers validate DTOs and call services → services apply user ownership and template rules → Spring Data repositories read/write PostgreSQL. `SecurityConfig.java:40-67` permits selected public reads and requires authentication for account, trip, template mutation, and library endpoints. A useful diagram is `diagram-system-flow` in the handoff, with an accessible summary there.

## 5. Decisions, challenges, iterations

| Supported decision / issue | Evidence and current result | Tradeoff or limit |
| --- | --- | --- |
| One origin for client and API | `Dockerfile:1-34`, `SpaController.java:13`, `docs/ARCHITECTURE.md` show React bundled into Spring. | Simplifies browser cookie/CSRF deployment; couples release of client and server. Railway runtime not checked. |
| Account-scoped trip data | Repository ownership queries (`TripRepository.java:12`, `SavedItineraryItemRepository.java:11`) and `TripService.java:38,63,88`; server sessions, CSRF, BCrypt and login limiting (`SecurityConfig.java`, `LoginAttemptService.java`). | In-memory rate-limit state is per process (`LoginAttemptService.java`); no distributed behavior evidenced. |
| Reusable planning content | Public seeded templates, personal templates and saved items (`V2`–`V5` migrations, `TripTemplateService.java`, `SavedItineraryItemService.java`). Template dates are instantiated from offsets. | Public template content and permission to feature it need review; user-entered content stays in its original language. |
| Filtered work and output | Client search/filter logic and print component (`itineraryFilters.js:74-145`, `PrintableItinerary.jsx:13-166`); `PrintableItinerary.test.jsx:25` checks print options use the visible source. | Filtering and print totals are client calculations; no field performance measurements. |
| English/Japanese presentation | UI resources and stored language (`i18n/index.js:4-33`); curated public templates localized by server keys (`TripTemplateContentLocalizer.java:17`, `V5`). | Translation review/coverage and native-language quality are unverified. |
| Mobile, dark mode and reduced motion | `useTheme.js`, `frontend/src/styles/itinerary.css:481,532`, `layout.css:106,137` and current mobile screenshot. | No device/browser matrix or accessibility audit. |

The history supports later additions of routing, filters, mobile refinements, dark mode, localization, libraries, landing page and CI (`git log --reverse`). These are meaningful iterations, but no historical UI capture is tracked before 2026-09-05. The school version should be shown through a real archive or a separately labelled recreation only if Tyler supplies one or authorizes a bounded capture from old code. No reconstruction was made here: the first app states require a running older stack and account data, while local Java is 17 and the instructions prohibit installing an old stack solely for comparison. Do not describe a current screenshot as the original school version.

## 6. Quality, operations and results

CI defines frontend `npm ci`, lint, Vitest and build plus Java 21 Maven tests (`.github/workflows/ci.yml`). The repository contains 21 frontend test files and nine backend test files. Tests cover utilities, components/pages, services and exception handling; presence alone is not a historical pass. Current checks on 2026-10-03 at HEAD: `npm run lint` passed; `npm test` passed (21 files, 72 tests); `npm run build` passed (Vite 8.2.2). Existing `frontend/node_modules` was used; no dependency installation. Backend Maven tests were not run because local Java is 17 versus required 21. See bundled `evidence/VERIFICATION.md`.

Security and reliability mechanisms are implemented in code: validation DTOs, service ownership checks, BCrypt, CSRF, per-username/IP login limiting, exception responses, Flyway migrations and Hibernate schema validation (`SecurityConfig.java`; `UserService.java`; `LoginAttemptService.java`; `GlobalExceptionHandler.java`; `backend/src/main/resources/application.properties`). This is not a security audit. CSS includes responsive and reduced-motion rules, focus states and print rules; automated accessibility conformance was not measured. No performance, uptime, adoption or financial metrics were found. The live link and deployment claims in README/deployment docs remain unverified. One documentation conflict: `AGENTS.md` says the frontend has no test runner, but `frontend/package.json` defines Vitest and current tests pass. The README accurately includes the test command.

## 7. Portfolio highlights and capability mapping

1. **Full-stack / Backend / Data Modeling:** trips, typed itinerary records and reusable templates across React, REST, JPA and Flyway (`TripItemController.java`, `TripTemplateService.java`, migrations).
2. **Product & UI Engineering / Frontend:** filterable, grouped itinerary with visible cost status and print path (`TripDetailsPage.jsx`, `itineraryFilters.js`, `PrintableItinerary.jsx`).
3. **Security / API Design:** account-scoped repository queries, sessions, CSRF and throttled login (`SecurityConfig.java`, `TripService.java`, `LoginAttemptService.java`). Describe as implemented controls, not proven secure.
4. **Localization / Accessibility:** English/Japanese resources, curated-template key localization, mobile and reduced-motion styles (`i18n/index.js`, `TripTemplateContentLocalizer.java`, CSS). Avoid a WCAG claim.
5. **Testing / DevOps:** current 72 passing frontend tests; CI and single-container build definitions (`.github/workflows/ci.yml`, `Dockerfile`). Backend tests exist but current result unverified.

Candidate short category: **Full-stack web app**. Preview candidate `media-itinerary-desktop` if approved; otherwise use an intentional no-image entry. Key technologies: React, Spring Boot, PostgreSQL, Flyway. Candidate title and summary are in §2; keep school-project origin and subsequent evolution together without attributing later implementation methods.

## 8. Media and technical evidence handoff

All four existing PNGs were added in `2b63b0e` on 2026-09-05. Their exact capture dates, route, viewport, underlying data provenance and publication rights are not documented. They appear to show demonstration trip data, but **synthetic/fixture status is unconfirmed**. They are inventoried in `media/MANIFEST.json` and excluded from the ZIP pending Tyler's approval and content review. Captions below describe only what is visible. Dimensions and sizes are intrinsic bytes measured from tracked files.

| ID / source | Pixels / bytes | Purpose, owner, alt text and caption | State |
| --- | --- | --- | --- |
| `media-landing-desktop` / `docs/images/landing-desktop.png` | 1259×748 PNG, 123,584 B | Overview, `intro-product`; alt: “Japan Travel Planner landing page with a trip preview and entry points.” Caption: “Public landing page in the 2026-09-05 repository capture; preview trip is sample UI.” | Existing; permission/data review needed. |
| `media-itinerary-desktop` / `docs/images/itinerary-desktop.png` | 1265×1179 PNG, 93,397 B | Detail, `technical-itinerary`; alt: “Desktop trip itinerary with date groups, search, map links and a yen cost summary.” Caption: “A populated itinerary view in the 2026-09-05 repository capture; example trip data provenance awaits confirmation.” | Existing; permission/data review needed. Preview candidate. |
| `media-itinerary-mobile-dark` / `docs/images/itinerary-mobile-dark.png` | 534×1263 PNG, 53,835 B | Mobile/detail, `decision-responsive`; alt: “Narrow dark-theme itinerary view with cards and cost summary.” Caption: “A narrow-screen dark-theme capture from the 2026-09-05 repository; not a measured device test.” | Existing; permission/data review needed. Related to desktop as current-state responsive views. |
| `media-library-ja` / `docs/images/trip-library-japanese.png` | 1270×715 PNG, 88,005 B | Localization/detail, `decision-localization`; alt: “Trip Library interface displaying Japanese labels and public templates.” Caption: “Japanese Trip Library capture from the 2026-09-05 repository; translation quality has not been independently reviewed.” | Existing; permission/data review needed. |
| `media-school-original` / proposed `school-original-authentic.png` | Unknown | Process/iteration, `origin-school`; authentic screenshot of the first completed school application. Capture a non-sensitive trip or landing state with route, revision and capture date if Tyler has an archive. | Needs capture; do not substitute a later screenshot. |

If an authenticated current screenshot is recaptured, use a disposable account and synthetic trip, add activity, train and lodging items, show date groups, search and cost summary at a recorded viewport, then remove identifying browser/account details. A short silent clip could show filtering and opening print options; it needs a poster and captions/transcript. Existing screenshots are static and no video is bundled.

**Diagram `diagram-system-flow`:** browser React client → Spring REST controllers/security → services → JPA repositories → PostgreSQL; Flyway → PostgreSQL; Docker build → client static assets within Spring. Accessible summary: “The browser loads the React interface and sends authenticated requests to Spring; services enforce ownership before saving trips and templates in PostgreSQL.” Node/edge JSON is bundled. **Snippet `snippet-filter-pipeline`:** `frontend/src/utils/itineraryFilters.js`, `filterItineraryItems`, demonstrates combining text and structured filters; small excerpt bundled, pending normal code-publication review. No secret values are copied.

## 9. Narrative and import handoff

Suggested order: `intro-product` (intro, purpose and school origin; landing media); `origin-school` (process, Tyler-supplied manual first version and later evolution; original capture only if obtained); `problem-planning` (problem and constraints); `technical-itinerary` (visible summary of trip editing, grouping, filters and cost; desktop media and snippet); `decision-responsive` (mobile/dark interaction; mobile media); `architecture-system` (plain-language architecture followed by diagram); `decision-localization` (UI and curated content language boundary; Japanese media); `result-current` (verified checks, limitations and current state). Supporting media blocks should immediately follow their owner and use `supportsBlockId`. Desktop/mobile are related current-state views, not a before/after pair.

The bundled `IMPORT-PROPOSAL.json` is a proposal, not a validated portfolio object. `kind: project`; slug `japan-travel-planner`; year 2026; type full-stack web app; status proposed `active` (confirm); ownership fields unset except the attributed manual original iteration. Repository and README live URLs are unverified; publication is `{status: draft, featured: false}`. Japanese portfolio translation is **none**; app localization exists but no portfolio Japanese copy was supplied. English is the sole source narrative. Technology and capability names need registry resolution; do not invent registry IDs.

## 10. Questions for Tyler

### Import blockers

1. Please confirm where the original no-AI school-project version ends in Git history, and whether later design/implementation used AI or collaborators. Which responsibilities should be personally attributed to you? The user statement is recorded as direct provenance, not inferred from Git.
2. May the four repository screenshots and a short code excerpt be copied into portfolio media? Were the screenshots made with fictional/fixture data and do any visible names or content need removal?
3. Do you have an authentic screenshot/video or archived capture of the original school version? If yes, provide it with approximate date/revision and permission to use it. Otherwise the portfolio should make the origin point in text with no historical image.
4. Should the project be described as active, complete or archived, and is the README live URL currently public and representative? A configured URL was not verified here.

### Optional enhancements

- What prompted the shift from capstone to portfolio application, and which later design/architecture choices were yours? Provide only decisions you want attributed.
- Are there verified usage, deployment or performance outcomes, or a reviewed Japanese translation, that may be cited? None was found in this repository.
- Decide publication and homepage featuring separately after reviewing the imported record and assets.
