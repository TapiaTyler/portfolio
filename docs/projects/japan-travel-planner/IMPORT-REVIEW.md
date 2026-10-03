# Japan Travel Planner — portfolio import review

Prepared 2026-10-03 (Hawaii time). Source discovery reviewed at `385c122`.

## Preserved sources

The eight files from the supplied ZIP are preserved here, including its README,
original unvalidated proposal, media inventory and verification history. The
separately supplied report/proposal match their ZIP entries byte for byte.
Later confirmations below supersede open questions in those preserved files;
the original report is retained as a record of what was known at discovery time.
Repository evidence paths in the report refer to Japan Travel Planner, not this
portfolio. No source application or Git configuration was changed by this import.

## Tyler's confirmations

- Project status: **complete**.
- Original school-project application: completed manually without AI.
- Later enhancements: AI-assisted, with Tyler directing revisions, decisions and
  architecture. Canonical implementation value: `mixed`; no percentages asserted.
- Four existing screenshots: fictional/demo data and approved for portfolio use.
  Selected code: approved for portfolio use.
- Hosting: Railway's free hosting, no custom domain, with the supplied Railway URL.
- Security should be a visible project strength. The draft includes evidenced
  controls, their boundaries and the limits of the current verification.

## Import conversion

Canonical content: `src/content/projects/japan-travel-planner.ts`. One English
record across all modes; no Japanese portfolio narrative or theme-specific copy.

- Added material technology vocabulary without changing existing IDs.
- Replaced the proposed unsupported `process` block with a semantic intro.
- Imported the supplied eight-node architecture as localized labels and valid edges.
- Imported four original PNGs with measured dimensions, source hashes, provenance
  and Tyler's approval in a separate capture manifest. Commit addition dates are
  not described as exact screenshot capture dates. No historical recreation exists.
- Expanded the incomplete bundled code excerpt to the complete
  `filterItineraryItems` function from `385c122`, preserving its source meaning.
- Bound supporting images to their adjacent narrative owners with `supportsBlockId`.
- Added a dedicated security technical section and capability, supported by code
  inspection. No penetration test or security-conformance claim is made.
- Imported the supplied live URL. A Chromium check returned HTTP 200, page title
  and heading "Japan Travel Planner", with no page errors during that check. The
  browsing tool could not retrieve it; the Chromium result verifies the public
  entry page only, not authenticated workflows, uptime or production data behavior.
- Repository URL comes from the source README; public GitHub availability was not
  independently established. No link-verification claim is inferred from its presence.
- Generalized the development preview's label to "Draft project preview" so the
  existing generic route can review projects beyond the portfolio pilot.

Preview: `/dev/projects/japan-travel-planner`, or append `?locale=ja` to inspect
intentional English fallback. Public English/Japanese project routes remain 404
while `publication.status` is `draft`; `featured` remains false. Approved files
in `public/` are directly servable even while project routes are drafts.

## Remaining evidence and review

The canonical narrative uses a neutral report voice following Tyler's content
review. The result describes the completed planning workflow, reuse, localization
and deployment; source-check provenance and approval history remain in this review
and the preserved discovery. Ownership describes manual original implementation
and AI-assisted enhancements without referring to the portfolio owner in third person.

The original school-version boundary is confirmed as `capstone-v1.0` (see the
follow-up below). Authentic earlier captures, full HTTP security-test coverage,
live authenticated behavior, performance, translation quality and personal
reflection remain unverified or optional. The 72 frontend and 25 backend tests
are reported source-review results, not suites rerun by the portfolio importer.
No business/adoption metrics are added.

The [follow-up evidence](followup/FOLLOWUP.md) resolves the original prompt's main
questions. Historical comparisons and interaction videos are optional;
their absence does not block a draft. Final narrative, publication and homepage
featuring need separate review. Portfolio deployment remains deferred.

## Follow-up integration — 2026-10-03

The twelve-file follow-up ZIP and updated discovery are retained under `followup/`.
Its report/proposal match the separately supplied files. All four bundled PNGs
match the already approved public assets byte for byte; existing screenshots and
captions are retained. The complete filter excerpt matches the already imported
function. No reconstruction or optional video was supplied or implied.

Tyler confirmed that **`capstone-v1.0` is the original project**. Local Git resolves
it to `23a4dd6d6d5d6837a7301047be908378001ea9eb`, whose commit date is September 1,
2026 in Hawaii. The case study identifies this original version and the manual/AI
development boundary. It does not infer a school submission date from a commit.
Authentication and CSRF were present in that version; later enhancements are not
credited with introducing all security controls.

The supplement corrects the earlier discovery's history note: repository root
`835201f` contains the starter README; `41fe222` is an application commit, not the
root. The preserved first report remains historical source material; the current
case study does not reproduce that incorrect chronology.

New source verification: 25 backend unit tests passed in nine classes using an
existing Java 21/offline Maven environment. The original 72 frontend tests,
lint/build at the same source revision were not repeated by the source follow-up.
Historical CI run `33992189208` reports success at the inspected HEAD. Anonymous
landing/library rendering, public-template reads and health responses were checked.
Exact commands and failures before the successful run are retained in
[followup/evidence/VERIFICATION.md](followup/evidence/VERIFICATION.md).

Canonical content now includes the eight-node security-boundary diagram, expanded
security detail and a separate technical quality section. The outcome-focused
result and neutral report voice are preserved. The security narrative distinguishes
mocked service tests from filter-chain/database integration, per-process throttling
from distributed enforcement, and configured defaults from inspected production
settings. It does not claim verified session/token rotation, a strong password
policy, a completed penetration test or comprehensive security coverage.

These updates supersede the initial import's backend/public-availability limitations
above where the supplement provides new evidence. Authenticated production workflows,
deployment revision and cookie/proxy settings remain unverified. Publication stays
`draft`, featuring stays false, and Japanese portfolio translation stays `none`.

Follow-up portfolio checks passed: content/reference validation, production build
with type checking, lint/formatting, and three populated theme previews. The preview
checks include both eight-node diagrams, responsive media at 320/1440px, owner
grouping, automated AA scans, English fallback, capstone wording and separation of
verification detail from the outcome-focused result. The source project's 25-test
backend run is evidence supplied by the follow-up, not a suite rerun in this portfolio.

## Portfolio verification

- Content validation: two project records and five development fixtures passed,
  including asset existence, schema and shared-reference checks.
- Unit tests: all 38 passed.
- Production build/type checking: passed.
- Three populated preview scenarios: passed in Editorial, Engineer and Digital,
  including all owned media, eight-node diagram, code disclosure, 320/1440px
  overflow checks, automated AA scans, English fallback and reduced-motion content.
- Desktop frames inspected in all three compositions. The existing shared media
  and narrative grammar is reused; no new theme-specific project implementation.
- Release smoke: 18 route/theme checks and nine production guard routes passed,
  including the new draft's public English/Japanese and development routes.
- Next development diagnostics identify itinerary media as potential LCP candidates.
  Final critical-media priority, responsive delivery and populated production
  performance remain a release review item; this is not a Lighthouse acceptance run.
