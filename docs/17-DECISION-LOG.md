# 17 — Decision Log

This records decisions made during planning.

Treat these as locked defaults unless intentionally revisited.

## D001 — Portfolio is a project, not only a container

**Decision:** The portfolio itself is a major portfolio project.

**Reason:** Its architecture demonstrates UI engineering, design systems, accessibility, performance, localization, and maintainability.

## D002 — Shared content, multiple interpretations

**Decision:** All launch themes use the same underlying project facts and case-study content.

**Reason:** The goal is multiple coherent design systems over one semantic product.

## D003 — Composition is separate from visual theme

**Decision:** Information organization is architecturally separate from visual tokens.

**Reason:** A skin system would not provide meaningful differentiation.

## D004 — Launch with three themes

**Decision:** V1 themes are:

- Editorial
- Engineer
- Digital

**Reason:** Together they demonstrate restraint, systems thinking, and expressive frontend work.

## D005 — Editorial is default

Superseded by D050 on 2026-10-08; retained below as the original decision.

**Decision:** Editorial is the canonical/default experience.

**Reason:** It must work for recruiters who never use the switcher.

## D006 — Product and Graphic deferred

**Decision:** Product and Graphic are future additions.

**Reason:** They add value but should not delay launch.

## D007 — No forced schema completeness

**Decision:** Projects populate only relevant fields/blocks.

**Reason:** Backend, frontend, product, and experimental projects require different narratives.

## D008 — Block-based case studies

**Decision:** Major case studies use semantic structured blocks rather than one unrestricted article.

**Reason:** Themes need to reorganize and emphasize content safely.

## D009 — Hybrid typed data + MDX

**Decision:** Use typed data for structured facts/references and MDX/rich text for narrative where helpful.

**Reason:** Supports validation and presentation independence without making authoring too rigid.

## D010 — Locale-aware from the beginning

**Decision:** English and Japanese route architecture exists from initial implementation.

**Reason:** Japanese employers are a primary audience and later retrofit would be costlier.

## D011 — Partial Japanese is valid

**Decision:** Japanese translation may be summary/partial.

**Reason:** Full translation of every technical section should not block launch.

## D012 — No CMS/database for V1

**Decision:** Store content statically/in the repository.

**Reason:** No persistent application infrastructure is currently needed.

## D013 — Theme state is local

**Decision:** Persist theme locally; no account-based preference.

**Reason:** User accounts are unnecessary.

## D014 — Shareable theme query may be supported

**Decision:** A query such as `?style=engineer` is acceptable.

**Reason:** Useful for interviews/reviews while preserving canonical URLs.

## D015 — Digital uses progressive enhancement

**Decision:** Advanced effects are optional and dynamically loaded.

**Reason:** Default performance and accessibility must remain strong.

## D016 — WCAG 2.2 AA target

**Decision:** All themes target WCAG 2.2 AA.

**Reason:** Experimental presentation should not reduce usability.

## D017 — No scroll hijacking

**Decision:** Use normal browser scrolling.

**Reason:** Preserve control, accessibility, and predictability.

## D018 — Development comparison tools

**Decision:** Include:

- `/dev/design-system`
- `/dev/compositions`

**Reason:** Side-by-side refinement is essential to the project.

## D019 — No generic placeholders

**Decision:** Missing media causes intentional recomposition.

**Reason:** Generic placeholders weaken the design system.

## D020 — AI use is not hidden

**Decision:** The portfolio may explain AI-assisted implementation factually where relevant.

**Reason:** The goal is to communicate ownership, judgment, review, and architecture accurately rather than imply manual authorship that did not occur.

## D021 — Project discovery happens inside source repositories

**Decision:** Use the reusable discovery prompt with Codex/Claude in each project repository.

**Reason:** Agents can inspect real implementation and documentation there.

## D022 — Detailed content inventory is deferred

**Decision:** Do not lock detailed launch inventory now.

**Reason:** Project-specific repository discovery will provide higher-quality source material.

## D023 — Featured projects are not universally cards

**Decision:** Flagship work uses curated compositions.

**Reason:** Uniform cards undermine Editorial and the multi-composition concept.

## D024 — Prefer architecture diagrams over code screenshots

**Decision:** Use diagrams when explaining systems.

**Reason:** They communicate architecture faster and remain themeable.

## D025 — Themes do not change project identity

**Decision:** URLs, canonical identity, factual content, and project availability remain constant.

**Reason:** Themes are presentation modes, not separate products.

## D026 — Semantic fallback renderer required

**Decision:** A block without a specialized theme renderer uses a shared fallback.

**Reason:** Prevents theme incompleteness from breaking content and supports gradual extension.

## D027 — Public claims must be defensible

**Decision:** No fabricated metrics, impact, alternatives, or reflections.

**Reason:** Accuracy matters more than promotional language.

## D028 — Implementation-level visual details remain flexible

**Decision:** Exact fonts, colors, breakpoints, animation durations, and individual compositions may be refined during implementation.

**Reason:** The user explicitly wants room to refine layout/design while preserving the planned architecture and visual directions.

## D029 — Server-selected mode before paint

**Decision:** Use one persistent local preference cookie and render portfolio
routes per request. Select the theme tokens and one composition on the server;
update the preference through a validated native Server Action form.

**Reason:** Radically different compositions must be known before paint. This
keeps narrative rendering on the server, avoids shipping duplicate mode content
trees and avoids conflicting browser preference stores. It deliberately trades
full-page prerendering for consistent initial composition. Static assets and the
root redirect remain static; deployment requires a Next.js server runtime.

**Implementation:** See `THEME-COMPOSITION-INTEGRATION.md`. Confirm delivery costs
and performance during the performance/deployment pass. The optional style query
is deferred; three-mode visual completion remains separate from this foundation.

## D030 — Progressive theme-switch continuity

**Decision:** Animate semantic module snapshots with the browser View Transition
API around the existing server-selected composition commit. Use temporary scoped
identities, destination-specific timings and immediate reduced-motion/unsupported
fallbacks. Preserve the single cookie and native form contract from D029.

**Reason:** Different compositions replace or reorganize markup; visual continuity
must bridge those structures without duplicating accessible content or shifting
theme ownership into browser storage. Bound slow capture, preserve focus/reading
position and allow interruption. No heavy animation dependency is required.

**Implementation:** See `THEME-TRANSITIONS.md`. Entry/reveal and ambient motion
remain separate work; this decision covers presentation switching.

## D031 — Theme-specific route snapshot continuity

**Decision:** Extend progressive same-document snapshots around committed Next
navigation for Digital card-to-project expansion and Editorial directional page
turns. Derive turn direction/count from navigation order and hierarchy depth;
cap turns at three. Preserve normal URLs, native links and reduced-motion fallback.

**Reason:** Tyler requested route interactions that express each composition's
personality. Temporary snapshot identities bridge the server-rendered card/detail
structures without duplicating accessible content or introducing an animation
runtime. Bound capture/media waits and coordinate cancellation with theme switching.

**Implementation:** See `ROUTE-TRANSITIONS.md`. Development-only selected-project
previews permit review while the public inventory remains empty.

**Refinement, 2026-10-02:** Replace repeated Editorial content snapshots with one
continuous turn and staggered blank-sheet snapshots, preserving depth cues without
fetching intermediate pages. Add the requested Engineer record-change preview
using a brief content swap and cyan rule sweep. Both use the existing cancellation
and reduced-motion contract. See `ROUTE-TRANSITIONS.md`.

**Navigation coverage, 2026-10-02:** Tyler approved the refinements and requested
all internal links and browser history. Extend Digital with matching-card
contraction and a generic panel transition. Preserve the route controller across
locale-provider remounts only in the browser, and start history capture from early
Navigation API traversal events where available. Server state remains isolated,
native link semantics remain intact, and ordinary history is the fallback.

**Consistent link motion, 2026-10-02:** Tyler requested each mode's same transition
on page links. Preserve Editorial turns and Engineer record changes; replace
Digital's generic short fade with a 720ms spatial opening from the clicked
semantic module to the incoming main surface. Header and history navigation use
the page surface with a small expansion, keeping controls live. Project links
retain matched card/detail snapshots and reverse contraction. No content or route
contract changes.

## D032 — Semantic evidence ownership and Digital case-study surfaces

**Decision:** Media may declare `supportsBlockId` to identify the narrative it
demonstrates. Evidence follows its owner in the canonical sequence; references
are validated and retained across locales. A composition body renderer can group
these adjacent blocks while preserving their semantic sections and motion IDs.

**Reason:** The portfolio pilot's morphing video appeared disconnected from the
decision it supported. Encoding the relationship once avoids project-specific
layout rules or theme instructions in content.

**Implementation:** Digital gives every narrative block one surface with its
heading inside. Supporting media and captions share that surface without a nested
card. Independent media and galleries retain their visual sequences. Engineer
uses localized source summaries in individually bordered overview records.
See `DIGITAL-IMPLEMENTATION.md` and `CONTENT-AUTHORING.md`.

**Engineer refinement, 2026-10-02:** Apply the same semantic ownership to Engineer
records. Every narrative section has one square frame with its heading inside;
supporting media/captions share that frame. Remove green decision rails and nested
architecture panels. Uniform neutral borders and header rules communicate
structure; status and functional accents retain their established meaning.

## D033 — Case-study orientation and canonical section navigation

**Decision:** Add optional localized overview facts (`distinction`, `currentState`)
and a shared project brief sourced from these facts and structured ownership.
Derive section navigation from canonical narrative blocks and use ordinary anchors.
Themes compose a chapter index, technical sidebar or module navigator; mobile uses
a native disclosure with focus moved to the selected section after closing.

**Reason:** The pilot needs an understandable opening and a way to navigate its
long narrative. Navigation must work without JavaScript, with incomplete Japanese
content, and without inventing project outcomes or reorganizing canonical meaning.

**Implementation:** The brief and index are shared semantic components; theme
styles control presentation. Passive, animation-frame-throttled scroll observation
updates current-section state. Media/gallery blocks do not create extra narrative
chapters. Sticky navigation can morph, but is excluded from reading-position anchor
selection so theme changes preserve the actual narrative location.

**Engineer presentation refinement, 2026-10-03:** The canonical section index now
uses a directory metaphor with the real slug as its folder, file icons, neutral
branch guides and full chapter titles. It remains a flat native navigation list;
no synthetic source paths, tree-widget keyboard model or colored card rails are
introduced. Evidence captures supplement the original media rather than replacing
its historical provenance, with phase labels distinguishing synthetic fixtures.

## D034 — Shared secondary-page content with composition slots

**Decision:** Work, About, Lab and Contact use one typed English page inventory,
shared semantic introductions, sections and continuation links, and a registered
SecondaryPage composition slot. Work uses the filtered published project registry;
Lab remains an intentional empty catalogue until reviewed study content exists.

**Reason:** The routes previously stopped at placeholder introductions. Extend the
approved visual systems with useful page structures while final biography, contact
links, experiment records and translations remain pending. Avoid fabricated records,
credentials, contact actions or three copies of page copy.

**Implementation:** Editorial uses a 5/7 opening and offset reading column; Engineer
uses a split record opening, native section index for multi-section pages and
structured records; Digital uses a spatial opening and asymmetric supporting panels.
Collection headings sit above project decks instead of wrapping cards in another
panel. Headings belong inside narrative panels. Digital panels reuse the existing
dim pointer light with its delayed exit reset and reduced-motion fallback. Semantic
motion IDs retain page-wide morphing and existing route transitions. The populated
Work preview is development-only and uses explicitly synthetic projects.

## D035 — Vercel release preparation and preview indexing guard

**Decision:** Use Vercel's native Next.js deployment with Node 24.x and the existing
validated build. Keep production/preview indexing disabled until reviewed launch
content and a canonical origin are chosen. Supplied non-production VERCEL_ENV values
block indexing regardless of an enabled site flag.

**Reason:** Tyler selected Vercel. Cookie-selected server compositions need the
Next runtime, and a preview environment must not inherit launch indexing accidentally.

**Implementation:** Repository Vercel install/build configuration, matching package
engines, an owned local production smoke server, CI smoke integration, environment
scope instructions, content review inventory and release runbook. No hosted project,
domain, deployment or project publication is performed by this preparation pass.

## D036 — Chronicle as a fourth composition with contained reading

**Decision:** Extend the existing composition registry with the explicitly requested
Chronicle mode. Translate the supplied home, project and mobile images into a
landscape shell, horizontal project discovery, a contextual preview chapter rail
and a separate native case-study reading container. English and Japanese route
identity, shared project facts and publication rules remain the same.

**Reason:** The mobile-game reference calls for a scenic composition with minimal
document scrolling. Changing fonts and surfaces on the existing page arrangement
would not establish that reading model. Portrait and zoomed windows still need
native scroll containers so all content remains available.

**Implementation:** Cards, previews and chapters consume existing typed records and
semantic renderers. The supplied alpha artwork frames live HTML rather than baked
interface labels. Scenic image generation is decorative and documented. The
header prioritizes the full bilingual name and uses a glass language slider,
violet navigation marker and stylized presentation dropdown. Preview chapters omit
unsupported sections; case studies preserve canonical anchors and evidence
ownership. Scrollable text regions have keyboard access. Native links and forms
remain usable without JavaScript; reduced motion keeps static state feedback.
Theme morphing now preserves anchors within native overflow containers as well
as document scrolling.

The development-only `/preview/chronicle` route shows actual draft records in the
site shell for visual review. Its query parameter selects a draft case study;
production returns 404. Initial captures and source snapshots remain unchanged,
with new captures archived separately. Product and Graphic remain future modes.

**Homepage review correction:** Remove the reference-only header monogram and
identity dividers. Homepage supplementary views belong in a left-side tab rail
below Selected work, with selected content on the right and a persistent bottom-right
action for an existing destination. About, practice areas, Lab and Contact consume
the shared semantic content; no theme-specific facts or unavailable page links are
introduced. The Work composition retains its project-specific preview chapters.

**Project-strip review correction:** Home and Work keep dots/arrows at the upper
right above the cards. Work removes the optional card diamonds. Card topics span
the full width below image/copy, with readable insets around the ornamental frame.
Lower tab/preview sections are full-width and borderless. Decorative corners attach
to those section boundaries, with corrected orientation and a fade before the
reading/action gutters; they do not use fixed viewport layers or intercept input.

**Interaction and type review:** Chronicle trials locally hosted Cormorant Garamond
500/600 in place of Times New Roman. Work cards select previews through full-area
buttons, with View Details as the explicit route action and conventional no-JavaScript
title links. No-image cards use full-width copy. Home tabs use a measured moving
selector/connector; glitter uses independent decorative timelines with static reduced
motion. Shared header-link targets adjoin through padding while markers measure labels.

**Directed refinement, 2026-10-03:** Use a viewport-sized landscape shell with
native overflow inside reading panels, discovery tracks and disclosures. This is
an intentional Chronicle composition choice; other modes retain document scrolling.
No wheel interception or mandatory motion is introduced. Chapter tracking and
theme-change position restoration account for the contained reading panel. Preserve
the actual initial implementation in an evidence archive before revising its visuals.
See [CHRONICLE-IMPLEMENTATION.md](CHRONICLE-IMPLEMENTATION.md).

**Landscape-phone refinement, 2026-10-04:** Tyler confirmed Chronicle is primarily a
landscape-oriented mobile-game reading model that must also work in portrait. Short
landscape viewports (landscape, height ≤ 500px) no longer inherit the portrait/narrow
stack. Home becomes two snapped screens: identity beside horizontal discovery, then the
tab panel. Case studies place identity, the at-a-glance disclosure and chapter rail in
one column beside a full-height reading panel; Work and About follow the same
identity-beside-content split. `main` is the size container that defines one screen.
Hidden scrollbars, proximity snapping and native overflow are unchanged. Home tab
panels share one header grammar (section eyebrow, then headline); the optional
capabilities `lead` is provisional copy. Chapter rails keep their shorter labels, with
the canonical section title appended to each link's accessible name.

## D037 — Grouped case-study bodies honor block renderers

**Decision, 2026-10-04:** Engineer, Digital and Chronicle share one grouped body helper
(`src/compositions/grouped-body.tsx`) that renders each block through the composition's
`blockRenderers` entry before falling back to the shared semantic renderer.

**Reason:** The custom bodies rendered shared blocks directly, so registered block
renderers were silently ignored, and the same evidence-grouping loop existed three
times. Record/surface framing now belongs to the body; `blockRenderers` is reserved
for block-specific treatments inside that frame, so the obsolete wrapper registrations
(which would otherwise double-frame each section) were removed.

## D038 — Title Case for labels, sentence case for statements

**Decision, 2026-10-04:** Names and labels (navigation, section names, page and project
titles, buttons, links, tab and chapter labels) use Title Case; sentences, claims,
case-study section headings, captions and body text use sentence case. Applied in
content and component labels, not CSS, so every mode shows identical text.

**Reason:** Tyler found the all-sentence-case interface read as generic generated copy,
and casing was already inconsistent ("View Details" beside "View all work"). The
Chronicle references also title-case their labels. Statements stay in sentence case so
headlines do not read as marketing copy. See `CONTENT-AUTHORING.md`.

## D039 — Project opening transition per mode

**Decision, 2026-10-04:** Generalize Digital's card-to-project route transition into a
per-mode surface map, and give Chronicle its own card-to-banner opening as part of its
microinteraction pass.

**Reason:** The matching, history and cleanup logic was mode-agnostic but hard-coded to
Digital's selectors; duplicating it for Chronicle would have split one mechanism in two.
URLs, content and native links are unchanged; reduced motion keeps plain navigation.

## D040 — Case-study contract for published projects

**Decision, 2026-10-05:** Published case studies follow
[CASE-STUDY-CONTRACT.md](CASE-STUDY-CONTRACT.md): one visible spine in a fixed order
(problem, what was built, 2–3 decisions, architecture, at most one challenge, one
"Engineering details" disclosure, result), at most 8 sections, 6 media items and 2
galleries, a 1,500 visible-word ceiling, opening field limits, and wording rules. A
test enforces the measurable rules. The Portfolio, Japan Travel Planner and Nihonest
case studies were restructured to it.

**Reason:** The case studies had grown to 10–13 sections with different shapes and up
to about 1,900 visible words, much of it process and verification detail written for
review rather than for evaluators. Evaluators scan first; the spine makes every
project quick to evaluate and comparable, while the disclosure keeps the depth. This
narrows the per-project "narrative flexibility" of 03 for published work; drafts and
discovery reports stay unconstrained.

## D041 — Load public theme grammar by active mode

**Decision, 2026-10-07:** Public locale layouts load the active mode's existing
scoped styles through SSR-enabled dynamic style components. Shared semantic,
token and motion styles remain initial resources. Development comparison layouts
load every mode's grammar. Next/React stylesheet resources gate the destination
render; no additional preference store or CSS generation pipeline is introduced.

**Reason:** Loading all four mode grammars increased initial CSS transfer even
though only one composition was visible. A server-only dynamic-import experiment
still loaded every stylesheet and was rejected. Independent client component
boundaries produced separate CSS delivery while retaining server-selected initial
styles and native no-JavaScript rendering. Cold destination checks with a 700ms
CSS delay verify styling before morph snapshot readiness. Measurements and limits
are recorded in `PERFORMANCE-REVIEW.md`.

## D042 — AVIF delivery and conditional Chronicle font discovery

**Decision, 2026-10-07:** All theme raster artwork uses AVIF-first typed CSS
image-set with retained WebP fallback. Shared project images and local raster
video posters negotiate AVIF/WebP/original through Next's optimizer. Original
sources and historical evidence remain intact; vectors and videos retain their
native formats. The all-theme generator and delivery manifest record the policy.

Chronicle's unchanged Cormorant Garamond files use conditional stylesheet font
faces and server-selected preloads for weights 500/700; 600 loads on demand. Other
modes do not preload Chronicle fonts. Public copies preserve the source license
and hashes, regenerated from the installed font package.

**Refinement, 2026-10-08:** Remove the explicit weight-500 preload after an
unused-preload warning was reported. Its font face still loads through Chronicle
CSS when rendered. Keep the heading weight-700 hint and the later case-study
weight-600 hint (D046); font files and typography are unchanged.

**Reason:** The first AVIF experiment reduced Chronicle transfer and LCP. Applying
the same format policy to the remaining artwork avoids partial coverage without
coupling project content to formats or themes. Conditional font preloads improve
Chronicle font discovery without adding those downloads to other modes. Native
format selection and cold morph readiness are regression-tested. Measurements,
encoding limits and regeneration instructions are in `IMAGE-DELIVERY.md` and
`PERFORMANCE-REVIEW.md`.

## D043 — Defer offscreen local video posters

**Decision, 2026-10-07:** Shared semantic media observes lazy local raster video
posters through the viewport and any contained reading panels, attaching the
optimized poster when the video approaches view. Native controls, dimensions,
captions and `preload="none"` remain available from server rendering. Eager,
external and vector posters retain immediate behavior. Without JavaScript, lazy
local videos omit the thumbnail but remain playable; without IntersectionObserver,
the hydrated client loads posters eagerly.

**Reason:** The first case-study audit found all three Portfolio posters downloaded
on initial load despite playback deferral, adding about 147 kB in every mode.
Deferral avoids competing with initial reading resources and preserves intrinsic
video geometry. All four mode reading areas and fallback paths are verified in
`tests/browser/image-formats.spec.ts`; route measurements and limits are recorded
in `PERFORMANCE-REVIEW.md`.

## D044 — Retain combined shared and Chronicle surface styles

**Decision, 2026-10-07:** Keep D041's active-mode boundary, the combined shared
secondary-page stylesheet, and one complete Chronicle grammar. Reject the tested
split of secondary-page mode scopes and the route-specific Chronicle project
stylesheet. The experimental files and route selector were removed.

**Reason:** Splitting shared scopes produced more stylesheet requests and higher
transfer. Isolating Chronicle project grammar saved about 2 kB on Home/Work without
improving their measured scores; project pages gained about 2 kB and a blocking
request, with first paint about 150 ms later in two runs. Native rendering and cold
snapshot readiness passed, but correctness alone did not justify the loading
tradeoff. Reconsider only with a delivery strategy that improves measured route
loading while preserving the cascade and development comparison fixtures. Results
and report labels are recorded in `PERFORMANCE-REVIEW.md`.

## D045 — Prioritize Chronicle scenery over existing mobile ornament

**Decision, 2026-10-07:** Retain typed, viewport-limited low-priority AVIF preload
hints for the mobile header crystal and collection frames actually displayed by
the project count. Keep scenery high priority, artwork sources and CSS WebP fallback.
Do not preload collection frames on project-detail/supporting screens. The hints
belong to theme/composition delivery rather than factual project content.

**Reason:** Network reports identified three high-priority decorative requests
competing with the scenic LCP resource. The hints change those requests to Low
without adding image transfers. Chronicle Home repeats 91 / 3.48–3.50s LCP in normal
motion and 91 / 3.47–3.49s with reduced motion; Work repeats 90 / 3.57s. Project detail
remains at 88. Measurements and scoped regression checks are in
`PERFORMANCE-REVIEW.md`; reduced motion is independently verified inside the
Lighthouse document and is not substituted for normal-motion acceptance.

## D046 — Discover Chronicle case-study font early and lower panel priority

**Decision, 2026-10-07:** Chronicle case-study composition hints its existing 600
font weight at low priority and its visible compact panel frame at low priority
below 901px. Home/Work retain their existing font policy; other modes are unchanged.
The font binaries, typography, frames and motion timings remain intact. This refines
D042's demand-loading rule for the case-study surface only.

**Reason:** Case-study font 600 was discovered late at VeryHigh priority, while the
panel frame also competed with the scenic banner. Font/panel hints preserve transfer
and improve measured first paint from about 1.51s to 1.21s. Portfolio repeats 89 in
normal motion and reaches 89 in reduced motion; the ≥90 case-study target remains
open. Do not preload chapter-rail artwork: ordinary native loads may defer it.
All three projects retain their original font/image request inventories in the
native and hydrated comparisons. Results and limits are in `PERFORMANCE-REVIEW.md`.

## D047 — Size Chronicle evidence for its reading columns

**Decision, 2026-10-07:** Supply composition-owned responsive image size hints to
Chronicle's case-study preview and supporting evidence, with a separate bound for
full-width media blocks. Keep compression quality, sources, motion and native lazy
loading unchanged. The semantic block renderer accepts an optional media size hint;
project content remains independent of presentation.

**Reason:** The generic 1200px estimate overstates narrow reading columns. Matched
native 2×-density scrolling checks across the three projects reduce project-image
body bytes by 16–29% on portrait phones and 24–32% on landscape phones. All selected
variants cover displayed pixel density or the original source resolution. Desktop
savings vary; Portfolio's reused full-width screenshot shows no saving. These are
full-reading image comparisons, not total initial-page transfer reductions.

Respect Tyler's quality and responsiveness constraint: no stricter image deferral
or lower encoding quality for marginal score gains. Initial Lighthouse image bytes
remain unchanged; normal/reduced Portfolio samples are 89/90, with ordinary run
variance. Do not claim that this closes the normal-motion ≥90 target.

## D048 — Localize site copy independently and share Contact resources

**Decision, 2026-10-08:** Public page fields use required English and optional Japanese
text, while common interface and accessibility messages use one typed dictionary.
Resolve and mark each field's actual language independently, including progressive
gallery, clipboard and diagram controls. Validate sources and interpolation tokens
before builds. Keep project locale schemas and unpublished Japanese SEO policy intact.

Contact methods and document entries are shared semantic data rendered by the existing
four compositions. Approved email is primary, with verified professional profiles.
Reserve English résumé, Japanese résumé and Japanese CV PDF/Word slots; emit native
downloads only when reviewed files are supplied. No form service is introduced.

**Reason:** Routing and project translations were ready, but page and interface strings
had no Japanese slots. This closes that authoring gap without inventing translations
or duplicating factual data per mode. Missing documents remain honest pending states.
See `07-LOCALIZATION.md` and `CONTACT-CONTENT.md` for authoring and verification.

## D049 — Add Product as a fifth composition with ordinary route navigation

**Decision, 2026-10-08:** Implement the owner-authorized Product mode from the
Decision Canvas handoff in `design-reference/product/`. Preserve Editorial as
default, existing project content and canonical routes. Desktop Home/Work use a
flat project list with a separately selected preview; phone and no-JavaScript
views retain ordinary direct project links. Selection does not alter history.

Case studies group canonical decisions and pair supported evidence with their
narrative, rather than borrowing Chronicle's contained chapter interface or
Editorial's page turns. Product routes navigate normally. Theme changes retain
shared semantic morphs, with a 280ms destination profile and reduced-motion fallback.
Product typography uses local Source Serif 4 and IBM Plex Sans, loaded through
the existing conditional mode stylesheet. Generated mockups remain documentation;
authentic project images remain evidence. Missing scenic assets use the permitted
text-only composition until isolated assets are supplied or created.

**Reason:** The fifth mode should express project comparison and product decisions
through organization and interaction while sharing the same underlying facts.
Keeping preview selection separate from navigation preserves keyboard clarity,
native links and usable phone layouts without a new routing/content framework.
See `PRODUCT-IMPLEMENTATION.md` for this pass's limits and remaining visual review.

## D050 — Product default and presentation order

**Decision, 2026-10-08:** The owner approved Product, Editorial, Engineer, Digital,
Chronicle as the selector order, with Product as the first-visit and invalid-preference
default. This supersedes D005 and the default-preservation clause of D049, including
older supplied design handoffs. Their visual/composition guidance still applies.

Use `src/lib/theme/ids.ts` as the shared order/default source. Root CSS tokens follow
that default rather than hardcoding Editorial. Valid preference cookies keep their
existing selected mode; no migration or reset is performed. Server rendering and
native no-JavaScript switching retain the same preference model and route identity.

**Reason:** Product gives a clear first introduction through project comparison,
case-study evidence and restrained navigation. Editorial provides the narrative
alternative, followed by technical, spatial and game-inspired reading modes.
All five remain equally available with unchanged factual content and URLs.

**Verification:** 59 unit tests, production build, seven focused browser checks
(first HTML, both locales, saved preferences, reduced motion, native mobile menus
and repeated reading-position preservation) and release smoke checks pass.

## D051 — Compact alternative-view evidence

**Decision, 2026-10-08:** The owner requested a compact comparison of all five
Portfolio theme screenshots while preserving Editorial as the project opening.
Gallery relationship `alternatives` describes several versions of one subject;
optional localized media labels identify them. The shared semantic renderer presents
one bounded image stage, named selectors and previous/next controls in every mode.
No autoplay; native horizontal scrolling provides the no-JavaScript fallback.
Selecting evidence does not switch the site's active theme. Image viewers reveal
the comparison view last inspected before measuring their closing destination.

**Reason:** This preserves access to every presentation without a long screenshot
stack or theme-specific content. Chronicle's challenge keeps its first/current home
pair and interaction video; redundant phone and dossier views remain archived assets.
