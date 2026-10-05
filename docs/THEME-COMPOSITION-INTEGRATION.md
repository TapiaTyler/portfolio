# Theme and composition integration

## Implemented boundary

`src/lib/theme/ids.ts` defines the registered mode IDs (the three launch modes plus
Chronicle) and the Editorial default.
`src/registries/themes.ts` maps each ID to a label, color scheme and typed token
profile. Token categories cover typography, color, spacing, borders, radius,
elevation, grid, imagery and motion. `ThemeStyles` emits the same stylesheet in
each root layout, with scoped selectors for comparison previews and reduced-motion
overrides that follow all profiles.

The reference-derived colors are starting values. Editorial now uses locally
served Cormorant Garamond and Inter. Engineer uses local JetBrains Mono and
Space Grotesk. Digital reuses local Inter and JetBrains Mono.

`src/registries/compositions.ts` maps IDs to composition profiles separately from
tokens. The current typed slots are SecondaryPage, Homepage, Hero, ProjectFeature,
CaseStudy, CaseStudyIntro and optional case-study block renderers. Missing slots
resolve to shared semantic components; an absent specialized block uses the
exhaustive semantic block renderer. Every mode currently specializes all six page
surfaces. Engineer, Digital and Chronicle frame narrative sections through the shared
grouped body in `src/compositions/grouped-body.tsx`, which honors `blockRenderers`
(D037). No mode currently registers a block renderer; add one only for a genuinely
block-specific treatment inside the existing record or surface frame. See `EDITORIAL-IMPLEMENTATION.md` and
`ENGINEER-IMPLEMENTATION.md` and `DIGITAL-IMPLEMENTATION.md` for the initial design passes; final content and
populated-layout refinement remain open.

`src/components/composed-surfaces.tsx` selects the server renderer after routes
select validated public content. Project files and shared content selectors never
read theme state. Localized content and public URLs remain independent of mode.
The shared ProjectIndex owns inventory/order while delegating each preview to the
registered feature renderer. CaseStudy retains the canonical reading sequence and
delegates its intro and blocks. Engineer's registered CaseStudy adds an early
architecture summary and technical-section links through the shared `afterIntro`
extension. The full source block sequence remains unchanged. Overview text comes
from validated diagram summaries and localized block titles.

## Persistence and initial rendering

The sole persisted preference is the `portfolio-mode` cookie. It is scoped to `/`,
lasts one year, uses SameSite=Lax and is HttpOnly. Missing, malformed and obsolete
values resolve to Editorial. No local-storage mirror, account or database is used.

`getActiveTheme` reads and memoizes the incoming preference within the request.
The locale layout emits `data-theme` on the initial HTML root, and composed page
surfaces select the same profile. Tokens are available in the head. This avoids
a client bootstrap that first paints Editorial and later replaces its composition.
The provider exposes this server snapshot to client controls without a second
independent theme state.

The switcher uses a native form and a validated Server Action. Next.js cookie
mutation invalidates its router cache and returns the updated server tree in the
same roundtrip. The previous view remains while the action is pending; new tokens
and composition commit together. Normal browser scrolling remains intact, and
the form also works without JavaScript. All navigation, including locale changes,
uses the same cookie. The optional shareable style query is deferred.

**Rendering tradeoff:** Portfolio routes deliberately render on the server per
request. This supplies one selected composition before paint without shipping
three duplicate content trees or turning narrative rendering into a client app.
The root redirect remains static. Content and assets are still repository-backed;
there is no application database. Deployment requires a Next.js server runtime
rather than a pure static export. Revisit caching and delivery costs during the
performance/deployment pass.

## Development comparison

`/dev/design-system` inspects shared semantics under the active token profile.
`/dev/compositions` renders the same selected fixture in three scoped profiles.
Each narrative receives a unique anchor prefix and a coherent heading hierarchy.
Both tools, and fixture asset delivery, return 404 outside development. Preview
text describes the three implemented composition directions. The additional
`?surface=homepage` view uses published synthetic fixtures in the active mode,
with one homepage tree to preserve unique section anchors. No Japanese narrative
translations or prototype portfolio claims are introduced by this integration.
Motion controls add a development simulation for the same link/card movement
disabled by the browser's reduced-motion preference. The simulation is scoped to
preview content, preserves unique anchors and does not modify the saved theme.

## Verification and extension

Unit tests validate mode IDs, token coverage, reduced-motion overrides, fixture
compatibility across every mode/locale and specialized-block fallback behavior.
Playwright checks actual production switching, cookie persistence, route/locale
navigation, invalid preference/action values, keyboard use, reduced motion,
first HTML without JavaScript, native form submission and production preview gates.
The separate `npm run test:preview` suite starts an isolated development build on
port 3218. It checks populated homepages in all modes/locales, comparison scope
isolation, multiple image ratios, failed-media descriptions and reduced motion.
It runs after production browser checks in CI; neither test server uses the user's
normal development server or build lock.

When specializing a profile, keep all facts and required content, preserve URLs
and accessible reading logic, and keep the content-compatibility assertions passing.
Add responsive
and visual fidelity checks against its approved reference. Digital-only expensive
enhancements must be dynamically loaded inside the active Digital surface; the
registry must not statically import those packages.
