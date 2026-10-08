# Theme-switch transitions

The first expressive motion pass implements continuity during a presentation
change. Theme-specific entry/reveal choreography and additional micro-interactions
are now implemented in a separate layer; see [THEME-MOTION.md](THEME-MOTION.md).

## Behavior

Matching modules move and resize between compositions. A short staged fade
changes typography, decoration and surface treatment without prolonged doubled
text. Geometry timing follows the destination mode:

| Destination | Geometry duration | Character                  |
| ----------- | ----------------- | -------------------------- |
| Editorial   | 560 ms            | Restrained, settling ease  |
| Engineer    | 360 ms            | Precise, quick response    |
| Digital     | 680 ms            | More expressive continuity |
| Chronicle   | 620 ms            | Luminous panel continuity  |
| Product     | 280 ms            | Quiet, short settling ease |

The content swap lasts 180 ms within the geometry animation. The selected
composition is usable before the animation finishes; these durations are not
added delays before saving a preference.

Shared identities cover hero narrative/visual, Work, capabilities, About, Lab,
Contact, project records, case-study introductions and narrative sections.
Navigation has its own snapshot above content so open mobile menus retain their
normal stacking order during movement.
The Engineer overview occupies the corresponding hero visual position, so that
surface transforms as well. Sparse secondary-page introductions also participate.

Public Work, About, Lab and Contact share the same scoped controller through
SiteShell, in both locale routes. Populated Work headings, visible footer content
and the Japanese fallback notice have stable identities too. Development layouts
now supply a capture scope for selected-project and shared-semantic previews,
as well as the populated homepage and real pilot draft. Fixed-theme comparison
panels are excluded: their local themes are intentional independent previews,
not modules being replaced by the document's presentation switch.

Only visible modules receive snapshot names. Existing below-fold reading position
is anchored to a corresponding semantic module where possible, including after
fonts settle. Scroll position at the top remains at the top. Document bounds can
limit exact anchoring near the end of a page.

## Architecture

`src/lib/theme/transition.ts` coordinates the browser's same-document View
Transition API with the existing Server Action. See the
[official API guidance](https://developer.chrome.com/docs/web-platform/view-transitions/same-document).
The API snapshots old/new visual states, including position and dimensions.
It does not introduce a second accessible content tree.

The enhanced submit handler starts snapshot capture, then dispatches the same
validated action used by the native form. `ThemeProvider` releases the capture
promise in its layout effect when the new server-selected theme is committed.
New fonts settle before the final snapshot. The HttpOnly cookie remains the sole
persistent preference; composition/content rendering remains on the server.

Public locale layouts now render `ActiveThemeStyles` for the saved mode. Each
mode has an independent SSR-enabled dynamic component that imports its existing
scoped CSS (Chronicle includes its header stylesheet). Next/React stylesheet
resources hold the destination update until its CSS is available, before the
provider releases the morph commit. Loaded styles remain available for return
switches; existing scope boundaries prevent cross-mode leakage. Shared tokens,
semantic styles and motion remain initial resources. Development comparison
layouts deliberately retain all mode styles for simultaneous fixtures.

The surface-specific loading experiment in D044 was rejected on measured loading
cost. Chronicle continues to load complete mode grammar rather than selecting an
additional project stylesheet by pathname. Cold route rendering does not require
a separate project-style request.

Production tests delay a cold destination stylesheet by 700ms and compare its
computed geometry/header styles at `ViewTransition.ready` with a JavaScript-disabled
direct render. All four destinations passed, alongside immediate reduced-motion
switches and native form navigation. This uses Next's
[stylesheet and Suspense integration](https://nextjs.org/docs/app/getting-started/css),
without a separate client preference store or manually timed stylesheet injection.

`data-motion-id` is semantic presentation identity, not factual content. Projects
derive it from their existing slug and narrative sections from their block ID.
New project records automatically participate through the existing renderers.
No theme-dependent fields were added to the content schema.

Snapshot names are temporary, unique and scoped by `data-theme-transition-scope`.
They are cleared and reassigned after the commit because React may reuse DOM
elements for different modules. Cleanup is idempotent so the end of an interrupted
animation cannot clear the names of its replacement.

## Interaction and fallback

- A new selection interrupts the previous animation; pending Server Actions retain
  their existing disabled state to prevent duplicate submissions.
- Route navigation cancels the active snapshot animation.
- Snapshot overlays do not intercept pointer input. Keyboard controls remain live;
  focus is restored when disabling a submitted control drops focus to the body.
- If capture is still waiting after 1500 ms, release the snapshots and let the
  requested action complete normally. Do not hold a frozen page indefinitely.
- Reduced motion uses the immediate switch. CSS also disables snapshot animation
  if the preference changes while an animation is running.
- An unavailable API uses the existing immediate switch. JavaScript-disabled
  browsers retain the native form and server-selected composition.
- `/dev/compositions?surface=homepage` supports populated module transitions.
  Its reduced-motion simulation also disables theme choreography. Side-by-side
  comparisons do not share module snapshot names.

## Verification

Browser tests inspect actual geometry animation, capture completion, focus,
interrupted selection, route interruption, slow responses, reading position,
reduced motion, unsupported API fallback and snapshot cleanup. Existing regression
tests retain JavaScript-disabled forms, persistence, locales and accessibility.
Populated development fixtures verify project identity uniqueness and motion.
Desktop/mobile transition frames were inspected locally.

The performance audit now records `elapsedMs` for composition/font readiness
and `animationFinishedMs` for the entire choreography. These are local test
observations, not INP or field Core Web Vitals. See `PERFORMANCE-REVIEW.md`.

## Reading position across compositions — 2026-10-04

Reading position is captured on every presentation change and restored when the new
composition commits, independently of the animation. Reduced motion, an unsupported
View Transition API, or a response slower than the 1500 ms capture bound now abandon
only the animation, not the restore. Route changes and failed actions still discard it.

The anchor is the innermost narrative module containing the reading line (the line
below the sticky header, or just inside Chronicle's contained reading panel). Its
progress through that module is restored at the new composition's reading line, so
height changes between modes do not shift the reader. Supporting evidence
(`data-motion-supporting`) is never the anchor: Chronicle places it beside its owner
while other modes place it below, which previously moved readers a whole section.
Without a containing module, the nearest module keeps its distance from the reading
line. Panel restores scroll instantly because reading panels use smooth scrolling.
Document scroll positions round to device pixels: a narrative module within one
pixel below the reading line still counts as current, with progress clamped to zero.
This prevents repeated switches from selecting its enclosing group at the boundary.
`tests/preview/chronicle-morphing.spec.ts` covers every surface and both directions.

## Contained reading and clipped modules — 2026-10-05

Snapshots of named modules are drawn above the page and ignore ancestor overflow, so
text inside Chronicle's scrolling reading panel used to spill over the banner and
header while morphing (seen when switching partway through a long case study).

- The contained reading region (a `.case-study-body` that scrolls on its own) is
  named `contained-reading` with `view-transition-group: contain`. Text modules
  inside it nest in its group, and `::view-transition-group-children(contained-reading)`
  clips them, so text still morphs into place but only within the panel.
- Outside that region, a module that a clipping ancestor cuts off is not named; it
  changes with the page's own cross-fade, which is clipped correctly.
- Browsers without nested view-transition groups do not name text inside the panel;
  it cross-fades in place. Other modes use document scrolling and are unaffected.
