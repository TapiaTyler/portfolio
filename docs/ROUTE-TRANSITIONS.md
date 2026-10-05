# Theme-specific route transitions

Implemented 2026-10-01 at Tyler's request. These extend
[theme switching](THEME-TRANSITIONS.md) and [module motion](THEME-MOTION.md).

## Digital: opening a project from its card

Activating a Digital project title or **Explore the project** navigates to the
selected project's ordinary URL. The card snapshot expands and moves into the
matching project introduction over 720ms, with a short content crossfade. The
slug is a semantic matching key, not a theme field in project content.

The introduction's image loads eagerly, while project-card and narrative images
retain their default lazy loading. Before capturing the destination, the controller
allows up to 250ms for intro image decoding. Slow or failed imagery does not hold
navigation; the existing media fallback still applies. Video behavior is unchanged.

The selected fixture can be reviewed in development:

1. Select Digital in `/dev/compositions?surface=homepage`.
2. Activate **Explore the project** on any card.
3. Review the single selected case study, then return to the cards or use Back.

The fixture URL uses `surface=project`; it never publishes synthetic content into
the public project inventory. The production project route remains `/en/work/[slug]`
or `/ja/work/[slug]`. Returning to a page containing the same card contracts the
project into that card over 560ms; Forward opens it again. This applies to return
links and browser history. The matching card is brought into view if necessary.
Other Digital page links now use the same 720ms spatial opening rhythm. The
clicked content module expands into the incoming main surface, with the same
220ms outgoing and 400ms incoming crossfade as a project opening. Header, brand,
language and history navigation use the main surface, with a small incoming
expansion when no clicked module exists. The header remains live throughout.
This replaces the earlier 320ms fade/settle following Tyler's request for the
same theme transition on each page link. Matching projects retain their precise
card/introduction continuity and 560ms return contraction.

## Editorial: turning through the portfolio

Chapter order is Home → Work → About → Lab → Contact. A forward move turns the
outgoing page from right to left around its left edge. A backward move turns it
left to right around its right edge. A perspective transform and subtle shading
give the snapshot a paper-like turn; the destination sits underneath it.

Header navigation, the brand link and language picker instead flip the incoming
page down from a horizontal binding at the top. Its top edge stays fixed below
the header while a full perspective rotation opens from +88 degrees toward the
reader to flat over
600ms. Paper shading and an opaque page surface make this a book-page motion;
there is no progressive clipping wipe on the page itself. The outgoing content
releases over 180ms after a 180ms delay. Header navigation uses one page without
intermediate sheets. This reflects Tyler's clarification that the book binding
should be at the top. Content links and history retain the chapter direction rules.
Perspective distance grows with the incoming page height so long pages do not
cross the camera plane while flipping from the front.
The theme selector retains theme switching and cancels any active page flip.

All Editorial snapshot layers are clipped below the live header's bottom edge,
including the rotated content and blank sheets. The header is outside named route
captures and remains clickable. The clipping boundary is restored across locale
layout replacement and respects both source and destination header heights. The
flip starts at the incoming page's top edge after ordinary navigation scroll
positioning. Temporary geometry variables
are removed on completion, interruption and timeout.

Entering a deeper route turns forward; returning to a shallower route reverses.
The absolute difference in hierarchy depth determines the number of turns, with
a minimum of one and maximum of three. The outgoing content turns once over
600ms, matching the approved top-bound header flip's timing and easing. Deeper
moves add up to two blank paper sheets, staggered 100ms apart, bounding the whole
effect at 800ms. Tyler requested slower turns on 2026-10-02,
then reported blinking when the content snapshot repeated. The updated treatment
keeps overlapping sheet movement without resetting the content animation. Examples:

| Navigation     | Direction | Turns |
| -------------- | --------- | ----- |
| Home → Work    | Forward   | 1     |
| Work → About   | Forward   | 1     |
| About → Work   | Backward  | 1     |
| Home → project | Forward   | 2     |
| Project → Home | Backward  | 2     |

The selected-project fixture flow maps to the same conceptual homepage/project
depths so layered turns can be reviewed before public projects exist. Intermediate
routes are not fetched or rendered. Temporary inert, aria-hidden paper elements
provide outgoing-only snapshots and are removed before destination capture. Their
snapshot animations finish or cancel with the route transition. This avoids
network-dependent parent-page navigation and repeated flashes of the same content.

Browser Back/Forward uses the same direction rules and preserves browser scroll
restoration. Language links now also use the active mode's page transition.
External links, downloads, new-tab/modifier clicks and same-page anchors retain
normal navigation behavior.

## Engineer: record-change preview

Engineer now has a 240ms route transition for review. The outgoing record fades
and moves upward 4px over 100ms; the incoming record appears with 4px of settling
travel. A thin cyan rule sweeps across the top of the main surface and fades out.
The header stays live. Navigation, selected fixtures and browser Back/Forward use
the treatment; reduced motion preserves immediate navigation.

The cyan rule uses a temporary outgoing-only snapshot, with no recurring loop,
fake loading, animated terminal text or additional network request. Typography,
content and the static project/capability borders are unchanged.

## Internal link and history coverage

Tyler approved the layered Editorial turn and Engineer record change on 2026-10-02
and requested consistent transitions for all internal links and Back/Forward.
The delegated link handler covers portfolio and composition-preview page routes,
including header, content, project, return, brand and language links. Links to a
different page's fragment retain their destination hash; same-page anchors keep
native scrolling rather than introducing a page animation.

History uses the [Navigation API's early traverse event](https://html.spec.whatwg.org/multipage/nav-history-apis.html#navigation-api)
where available, without intercepting or rewriting the browser's traversal.
The outgoing snapshot starts before Next restores a cached route or locale tree.
Browsers without this API retain a `popstate` listener and usable ordinary history;
animation capture there is best effort because framework restoration can win the
event timing. Reduced motion and unavailable View Transitions retain immediate
navigation in all cases.

One browser-only route controller survives locale-provider remounts. Server
requests always receive separate controllers. Layout effects rebind navigation
listeners during commits; provider connection tracking preserves an in-flight
handoff to its intended URL. No route animation state is persisted to storage.

For project history, the controller can wait up to 500ms for Next's restored card
or intro subtree before naming the destination. This shares the existing 1500ms
overall capture limit and avoids shrinking into a generic page while the card
is still being restored. There are no intermediate-page fetches.

## Integration and safeguards

`src/lib/motion/route-transition.ts` temporarily names route snapshots and wraps
Next's client navigation in the same-document View Transition API. `ThemeProvider`
releases capture when the new pathname/query server tree commits. URLs, content,
SEO and the saved theme contract do not change.

The live DOM contains one semantic page. The persistent header and document root
are excluded from route capture so navigation and theme controls remain live
during animation. This follows the captured-element hit-testing behavior defined
by the [View Transitions specification](https://www.w3.org/TR/css-view-transitions-1/).
All route pseudo-element layers also pass pointer events through.
New link navigation scrolls to the top and focuses its incoming heading;
browser history retains its normal focus/scroll handling. Mobile menus close before
capture. Entrance motion and pointer tilt settle before route capture; visible
modules do not replay entrance choreography over the page transition.

Theme and route controllers cancel each other when necessary. New navigation
can interrupt a turn, temporary styles are removed after completion/cancellation,
and capture releases after 1500ms on a slow response. Reduced-motion changes cancel
active snapshots. Reduced-motion users and browsers without the API retain normal
Next navigation. JavaScript-disabled links remain ordinary anchors.

## Verification

Browser coverage includes Editorial direction/history, slow response, reduced
motion, unsupported APIs, Digital selected identity/heading focus, image delivery,
cleanup, layered fixture navigation, all-mode content/brand/language links,
cross-locale Back/Forward and Digital contraction/reopening. The existing theme,
native-control and accessibility suites remain regression gates. Desktop/mobile
Editorial turning frames and a decoded-image Digital expansion frame were inspected.

Interruption recovery on 2026-10-02 confirmed all 35 production browser tests and
all 10 populated preview tests pass. An earlier preview hover failure passed on
both a targeted retry and the complete preview rerun; its intermittent timing
remains recorded in the roadmap.

Tyler's review accepted the layered Editorial turn and Engineer record change.
The expanded navigation coverage remains open to review. Published-project and
real-image performance review remains pending content integration.

## Project opening in other modes — 2026-10-04

The card-to-project transition is no longer Digital-only. `projectSurfaces` in
`route-transition.ts` maps a mode to its card and destination selectors (Digital:
card → case-study intro; Chronicle: card → dossier banner). Both carry the project
slug as a matching key. Matching, history waiting, closing into the matching card
and cleanup are shared; each mode supplies its own keyframes. Chronicle unfurls the
banner from the centre over 600ms and furls it back on Back.
