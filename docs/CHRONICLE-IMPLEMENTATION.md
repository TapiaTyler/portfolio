# Chronicle implementation

Initial implementation: 2026-10-03. Visual direction follows
[the approved reference](design-reference/CHRONICLE-REFERENCE.md) and its homepage,
project and mobile images. There is no source HTML prototype.

The subsequent autonomous reference pass revises the composition rather than
changing only colors. Reference-sized captures, a matching initial-evidence
viewport and mobile states are stored in the
[refinement evidence archive](projects/portfolio/evidence/chronicle-refined/README.md).
The result is ready for visual review, not a claim of final design approval.

## Composition and content

- Scenic, serif-led homepage with horizontal project discovery and a separate
  four-tab information panel below Selected work. All cards keep native detail links; selection is an optional
  enhancement with labelled buttons, touch scrolling, project dots and bounded
  Previous/Next chevrons.
- Work's selected project preview has supported Overview, Topics, Approach, Screenshots and
  Outcome chapters derived from the record. A chapter rail sits beside narrative
  and a stack of actual project images on wide screens; portrait uses a horizontally
  scrollable chapter strip. Keyboard focus brings offscreen controls into view.
- Homepage About, Areas of practice, Lab & explorations and Start a conversation
  are selected from a persistent left rail. Only the selected information appears
  on the right. A framed action remains at its bottom right for About, Lab and
  Contact; Areas of practice has no standalone destination and no invented link.
  Keyboard Up/Down and Home/End select tabs with roving focus. Without JavaScript,
  the existing information remains available through a native overflow fallback.
- Work reuses the horizontal selector. About, Lab and Contact extend the bright
  framed reading grammar while preserving their existing provisional content.
- Case studies use a scenic identity banner, an explicit shared metadata/ownership
  disclosure, a connected chapter rail and adjacent supporting evidence. The shell
  fits the viewport; long narratives scroll natively inside a keyboard-focusable
  reading region. Mobile exposes chapters through a compact disclosure. Main content
  remains an overflow container for short windows and zoomed layouts.
- Selection stores server-rendered semantic content, not copied theme-specific
  project narratives. Published selectors and draft guards remain unchanged.
- The full bilingual name takes priority in the glass header. The role is inline
  when space allows and appears beneath the name on mobile. The language control
  retains the `/ja` route and shows `JP`; selected language uses an animated glass
  indicator. Presentation returns to the shared dropdown list with a violet
  framed summary button. The reference-only monogram and identity dividers are
  removed; the bilingual name remains the linked identity.

## Interaction

Registered cookie preference, server-selected compositions, no-JavaScript theme
forms and existing semantic morph identities apply to the fourth mode. Chronicle
uses 620ms morphing and 480ms chapter/panel navigation instead of borrowing Editorial
page turns. Selection previews slot into place; selected frames have a border and
tinted surface as well as glow. There is no ambient particle loop.

Theme changes preserve native contained-reading anchors as well as document
positions. Keyboard stops are limited to regions that actually scroll: the project
strip, cards, the preview copy column, home-tab content and case-study reading and
banner regions. Non-scrolling preview identity/chapter blocks and tab panels are not
separate stops. Without JavaScript, unavailable preview controls are hidden and ordinary
project links remain available. Scrolling and animation are not prerequisites for
understanding the project facts.

The existing image gallery is shared with Chronicle, using its own tokens and
retaining source-dimension caps, native dialog controls, focus/scroll restoration
and reduced-motion handling. Essential navigation stays conventional.

## Assets and provenance

`public/media/themes/chronicle/landscape-v2.webp` is the current generated scenic
desktop backdrop: 1920 × 640, approximately 291 KiB. The brighter Fuji/lake/temple placement
follows the reference's light and geometry; its
[source and prompt](design-reference/chronicle-assets/landscape-v2-prompt.md) are
preserved. Scoped CSS requests it only in Chronicle. The original `landscape.webp`,
`ornament.svg` and `frame.svg` remain available as initial implementation assets.
None of these are photography or project evidence. Evidence inside cards and
chapters remains actual media from each project record.
The subsequent [user-supplied asset set](design-reference/chronicle-assets/README.md)
provides the richer panel/project frames, active frame, glass button, corner artwork,
divider and chapter rail used by the refined layout. Original PNGs are preserved
under descriptive names; optimized WebP derivatives retain alpha transparency.
Transparent ivory glass, violet/pink selection glows, pale language controls and
serif headings follow the reference's visual hierarchy (originally a Times-family
stack, now the Cormorant Garamond trial described below). Nine-slice
frames keep corner detail legible instead of scaling the entire ornament down to
a one-pixel line. Decorative corner layers sit behind the reading glass so they
cannot cover its text or controls. Authored `monogram.svg` and `blossom.svg` supply
the historical header mark and selected chapter node. The monogram is preserved
for initial-state provenance but is no longer displayed.

The subsequent homepage correction is recorded in
[the tab-panel archive](projects/portfolio/evidence/chronicle-home-tabs/README.md).
It preserves the earlier refinement archive and includes the four selected desktop
views plus mobile panel and dropdown states. Nine focused browser scenarios passed
after this correction, including full-shell tabs, matching actions, keyboard
selection, native no-script links, draft guards and contained reading/morphing.
The performance measurements below precede this homepage correction.

Responsive delivery uses a 1440 × 480 landscape up to 900px, plus 320px corner
artwork there and 480px corners on larger screens. A Chronicle-only, media-matched
preload prioritizes the landscape; header/body share corner URLs. The final local
mobile audit transferred 209,181 bytes of images, about 70% less than the first
refinement audit, with no duplicate image requests. Sources and earlier delivery
assets remain preserved; [the asset manifest](design-reference/chronicle-assets/asset-manifest.json)
records each derivative.

## Initial-state evidence

[The initial capture archive](projects/portfolio/evidence/chronicle-initial/README.md)
preserves actual desktop/mobile browser captures, a capture manifest and partial
source snapshots made before the landscape refinement. Keep these unchanged for
an honest comparison with the reviewed result. They are not reconstructed states.

The original landscape used the built-in imagegen tool, then proportional resizing
and WebP encoding for delivery. Original generation prompt:

> Bright premium Japanese landscape-oriented mobile game illustration, wide 3:1
> landscape. Mountain lake, traditional wooden temple veranda on the right, sakura
> and red maple framing, distant pagodas and warm lanterns. Luminous ivory/pastel
> sky with pale mist and uncluttered left-side space for dark HTML text. Subtle
> prismatic crystals at lower outer corners. Refined painterly art; no text, UI,
> people, logos or borders. Decorative atmosphere, not travel photography or evidence.

## Local review

Select Chronicle in the header's Presentation control. The public inventory remains
empty while both project records are drafts. To see the real projects in the selector:

```text
/preview/chronicle
/preview/chronicle?project=portfolio
/preview/chronicle?project=japan-travel-planner
/dev/compositions?surface=homepage&inventory=projects
/dev/projects/portfolio
/dev/projects/japan-travel-planner
```

These routes are development-only. Use the actual host/port printed by `npm run dev`.
The `/preview/chronicle` routes use the full site shell, while `/dev` keeps its
fixture and comparison tooling. The public draft slug routes still return 404.
The review header's language links lead to the real locale roots rather than
inventing a Japanese development-preview path.

## Verification and remaining review

The autonomous reference refinement passed 38 unit tests and 22 distinct targeted
preview scenarios across Chronicle and the original compositions. These cover the
full-shell populated selector, supported preview chapters, native project links
without JavaScript, chapter route transitions and Back, deep reading continuity
through theme morphing, both real case studies, galleries, secondary screens,
English/Japanese fallback, short landscape and 320px portrait layouts. Portrait
cards and project banners now grow to show their complete topics; short portrait
screens retain a reading region and allow native main overflow.

Original-theme language/header regression, content validation, lint, formatting,
production build and release guards passed. Automated accessibility scans found
no violations in the tested shell and case-study regions; manual/device review
remains necessary.

The three production header tests completed their assertions successfully; the
Windows Playwright runner required manual interruption during shutdown afterward.
The separate release smoke exited cleanly, passing 24 theme/route checks and 11
production guards. Its temporary server was stopped.

The [refined evidence archive](projects/portfolio/evidence/chronicle-refined/README.md)
contains 15 actual desktop/mobile captures, a normal-motion interaction recording,
a manifest and partial source snapshots. The initial archive remains unchanged.

Three focused local mobile production audits measured Performance 83 → 89 → 91.
The final audit meets the 90 score target, with Accessibility and Best Practices
both 100. LCP improved from 4.666s to 3.459s but is still above the 2.5s good
threshold. CLS was 0 and TBT 26ms. SEO scored 63 with indexing deliberately
disabled. These are single local simulated runs on the empty public homepage,
not deployed or populated-project acceptance. See
[the performance review](PERFORMANCE-REVIEW.md) for conditions and retained results.

Earlier landscape refinement checks: 38 unit tests and 12 combined preview checks passed,
including contained chapter scrolling and existing-theme regressions. The four
Chronicle preview checks also passed with the supplied layout artwork applied;
an additional check covers project dots and contained overflow at 844 × 390 and
640 × 480. Those checks preceded the focused performance audits above.

Initial checks: 38 unit tests and 12 combined browser preview tests passed,
including both Chronicle case studies, chapter/gallery interaction, secondary-page
morphing, original-theme regression, 320px overflow and English/Japanese fallback.
Targeted selection/header checks also passed after responsive alignment refinement.
Lint, formatting, content validation and production build passed. Axe found no
violations in the scanned case-study regions; this is not a full conformance claim.
Production smoke checks also passed with Chronicle included, keeping draft and
development routes guarded and preview indexing disabled.

- Review artwork density, frame geometry, card proportions and desktop/mobile rhythm.
- Review chapter and theme-change motion in the browser.
- Review deployed/populated performance once the public inventory and host are ready;
  local Chronicle results do not establish field performance.
- Expand the pilot case study with the reviewed Chronicle evidence after this mode
  settles. Its current title and summary now acknowledge multiple compositions;
  the original three-mode recordings retain their historical descriptions.

### Project-strip and lower-panel refinement

Home and Work place project dots and arrow buttons together at the upper right,
above the horizontal card strip. Work omits the optional card diamond selectors;
dots, arrows and keyboard selection still change its project preview. Card copy
has a wider column, while the topic list spans the full card below image and copy.
Content is inset from ornamental frame corners. Portrait cards grow to show all
their content rather than cropping topics inside a fixed-height strip.

The supplementary home tabs and Work project preview span the full main width
without an enclosing border. Corner artwork is anchored to these lower sections,
with upper-corner source artwork flipped or rotated into lower corners. The
decoration extends across section boundaries, fades before reading/action gutters,
and never receives pointer events. It no longer uses misplaced fixed body layers.

The development review also supports `/preview/chronicle?surface=work`, using real
drafts without changing public availability. The new
[layout evidence archive](projects/portfolio/evidence/chronicle-card-layout/README.md)
preserves desktop, mobile and narrow-screen captures separately from earlier passes.

Product and Graphic remain future concepts. No projects are published by this pass.

### Spacing, ornament and hover review

The lower panel retains a thin gold section divider and vertical rail separator,
with no enclosing frame. Its content has no bottom border. Wider corner artwork
uses a tapered edge to cross the project-strip boundary while keeping text/actions
inside protected gutters. Work cards have a taller row, a wider copy column and
balanced serif titles with looser leading. Project-strip scrollbars are hidden;
native swiping/scrolling, arrows, dots and keyboard controls remain available.

Framed actions, project arrows, language links and the presentation button have a
CSS glitter effect on hover or keyboard focus. Reduced motion uses a static
highlight. Work preview prose uses one keyboard-focusable scroll region so the
identity and summary do not compete with a separately clipped reading area.

Ten Chronicle browser scenarios passed, including control/card/action geometry,
hidden scrollbars, glitter/reduced-motion behavior and the removed content rule.
Updated captures are preserved in the separate `chronicle-spacing-glitter` archive.

Cards explicitly record whether usable preview media exists. Without media they
use a single full-width reading column instead of leaving copy in the image slot.
The synthetic Work fixtures cover this fallback even though normal projects are
expected to supply images.

Work cards are full-area native preview buttons, including their image and title.
Click/tap, Space and Enter select the connected preview without changing the route.
The explicit View Details action opens the project. Without JavaScript, cards
restore conventional title links. The contained Work introduction and preview
reading region are keyboard-focusable.

### Serif and continuous-interaction trial

Chronicle now uses locally hosted Cormorant Garamond at weights 500/600, with
adjusted body sizes and card rows. Header overrides use the same family. Its font
files are not preloaded into other modes. This remains a visual trial for review.

Glitter is created only when an eligible control is hovered or focused: eighteen
scattered sparks receive independent randomized positions, sizes, negative phases
and 3.5–7.5 second cycles. Each pauses outside interaction and the layer fades away;
there is no synchronized whole-layer blink. Reduced motion uses static highlights.
Enhancement cleanup removes decorative nodes and listeners on page lifecycle changes.

The homepage tab rail has a persistent moving highlight, hover feedback and a
measured connector from the first tab center to the last. Resize and font loading
remeasure wrapped labels. Reduced motion removes selector transitions.

Across all four themes, header navigation targets now adjoin through padding,
with no gaps between links. Markers still measure the inner label; Engineer's dot
sits to its left. Seventeen browser scenarios passed across the full/focused runs,
including four header geometry checks, clickable cards, no-image cards, accessible
Work reading, continuous glitter, selectors, reduced motion and existing Chronicle
navigation/case studies. Updated evidence is in `chronicle-serif-interactions`.

### Shared side navigation and hidden scrollbars

Home tabs, Work preview chapters and case-study chapter links share selector
geometry and visual rules. Work's selector moves vertically on desktop and
horizontally in its mobile chapter strip. Case-study selection follows the existing
current-section semantics as the reading panel scrolls. Hover feedback, measured
connector lines and reduced-motion alternatives persist across the theme.

All Chronicle scrollbars are hidden, including reading, chapter, disclosure and
main containers. Native overflow, wheel/touch scrolling and keyboard access remain.
Four focused browser scenarios passed, covering home/Work selectors, card selection,
case-study selection, keyboard scrolling, scrollbar styles and accessibility.
Evidence is preserved separately in `chronicle-shared-navigation`.

## Mobile header and carousel polish

The mobile identity omits the role line and uses a hamburger-only menu button with its accessible Menu label retained. The presentation picker keeps its violet surface; menu artwork uses a fixed size and top anchor so expanding the picker does not resize or move it. Portrait hero banners use a stronger white fade and soft text halo. Project strips use proximity snapping with a shared inset for native and button-driven scrolling. Chronicle architecture figures omit the inherited horizontal rules that appeared directly beneath their section headings.

Verification: two focused browser scenarios cover menu readability, stable artwork, border removal, carousel controls, and card selection by pointer, keyboard, and touch. Lint passed. Mobile captures are in projects/portfolio/evidence/chronicle-mobile-polish/.

## Landscape-phone composition — 2026-10-04

Chronicle's primary handheld target is a landscape phone; portrait must also work.
Width-only breakpoints previously sent 844 × 390 into the portrait/narrow stack: home
cards sat below the fold and case studies left a ~93px reading strip. A layer for
`(orientation: landscape) and (max-height: 500px)` now uses width instead:

- Home: two snapped screens. Identity sits beside the horizontal project strip (one
  card plus a peek); the tab rail and panel fill the second screen.
- Case study: identity, Project at a glance and the chapter rail share a left column
  beside a full-height reading panel (about 300 × 560px at 844 × 390).
- Work and About: page identity on the left, content at full height on the right.
  Work's cards and project preview are two snapped screens inside the collection.
- `main` is the size container (`cqb` units define one screen); the header compacts.

Hidden scrollbars, proximity snapping and native overflow are unchanged. Home tab
panels now share one header grammar: section eyebrow, then headline. Chapter rails keep
short labels such as Objective, and each link's accessible name appends the canonical
section title.

## Reference-alignment pass — 2026-10-04

- Header navigation is centred on the page like the other modes (equal side columns)
  with larger 500-weight links.
- Cormorant Garamond 700 is loaded for display titles (h1/h2, card and preview titles);
  in-text headings stay at 600. Font synthesis remains off.
- Card evidence takes about 36% of the card, with a thin gold inner edge and faint
  violet vignette so pale screenshots read as framed evidence. Size containment keeps
  tall screenshots from stretching cards. Topics remain full width below the card.
- Card and banner topics use the reference's slash-separated line.
- Chapter rails show full titles (wrapping, no ellipsis); reading text is 1.2rem.
- The case-study banner and Work introduction size to their content, so their topic
  and lead lines are no longer clipped.

## Generated ornament set — 2026-10-04

A second user-supplied ChatGPT set replaces CSS stand-ins: chapter rails gain a gold
segment with top/bottom finials layered on the measured rail line, the selected
chapter/tab uses a crystal marker, and a portrait scene serves portrait phones and the
landscape-phone identity column. Empty states use the authored `frame.svg`. (The card crests were later removed with
the card selector button; see Card touch targets.) Delivery
WebPs total about 35 KB for ornaments and 141 KB for the portrait scene; preloads match
the CSS conditions so no viewport downloads two backdrops. See the asset README.

## Wide screens and header — 2026-10-04

Above 1801px, bands run edge to edge (scenery, dividers, card strips, corner art) while
content keeps the 1800px column via `--chronicle-edge`. Corner art is sized by the
content: it fills the free side space up to just before the panels' inner padding,
rises over the section boundary there, and fades only beyond that reach, so on 2K and
wider screens it is fully opaque and clear of text and controls (800px art variants).
Below 1801px nothing changes. The header shows the bilingual name only; the role line
was removed (the hero still states it).

## Load choreography — 2026-10-04 (microinteractions group 1)

`src/lib/motion/chronicle-entrance.ts`, started from the shared page-motion setup:

- **Scene wakes up:** on the document's first load a warm ivory haze over the hero,
  case-study banner and page intros clears over 1.1s. Text is readable from the first
  frame; later routes and mode switches arrive with the scene already awake.
- **Frames assemble:** as framed panels enter view their gold frame art lights up.
  Only image frames also settle from 98.5% scale: scaling text panels made long
  reading regions wobble into place after a mode switch, and a scale on strip cards
  would disturb snap positions. Corner art blooms from its corner.
- **Images reveal:** a screenshot still downloading shows a gold shimmer in its frame,
  then fades in once decoded. Cached images appear immediately; failures keep the
  existing fallback.
- Chronicle content keeps the shared rise-in entrance (12px, 520ms); reading-panel
  chapters receive it as they scroll into the contained panel.

Reduced motion shows the finished state (static shimmer, no fades). Theme switches and
route transitions skip on-screen entrances; keyboard focus finishes any entrance it
lands in. `tests/preview/chronicle-entrance.spec.ts` covers all of this.

## Signature interactions — 2026-10-04 (microinteractions group 2)

- **Card opens into the case study:** a project card's frame grows into the case-study
  banner while the banner unfurls from its centre; Back furls the banner into the
  matching card. Uses the shared project route transition (D039).
- **Selection lock-on:** choosing a card (click, arrows, dots, keyboard or swipe) runs one
  gold-to-pink light sweep around its frame,
  and other cards' screenshots step back (saturation/brightness only; text unchanged).
- **Cards dealt in:** on load, card contents slide in from the right one after another.
  The snapping strip items themselves never transform, so snap positions are stable.
- **Lit chapter rail:** in case studies the rail is lit from the first chapter to the
  current one and the crystal marker travels with the moving selector. Home tabs and
  Work preview chapters land the crystal with a small turn.
- **Crystal image opening:** View Image grows a diamond clip from the image centre with
  the shared expand motion; closing reverses it.

Reduced motion keeps all of these static. `tests/preview/chronicle-signature.spec.ts`.

**Card touch targets (2026-10-04):** the whole card is the touch target on every
surface; there is no separate selector button on the card. A tap selects and arms
the card (on Work it also updates the preview); a second tap on the armed card opens
it. Swipes, dots and arrows move the selection without arming, so nothing opens on a
single tap after a swipe.
The second tap follows a real project link (the card title on the homepage, the
preview's View Details on Work), which keeps the card-to-banner opening. The crest
selector was removed because it covered card content.

## Navigation feel — 2026-10-04 (microinteractions group 3)

- **Directional swipes:** home tabs, Work preview chapters and the selected-project
  preview slide in from the direction of travel. Components only report a direction
  (`--swipe-dir`: 1 or -1); CSS picks the axis and distance for the layout, e.g.
  vertical for the side rails and horizontal for the portrait chapter strip and for
  project changes. Route "chapter" transitions slide forward or back by
  `data-route-direction` (`--chapter-dir`).
- **Entering Chronicle:** after a mode switch into Chronicle, once the morph has landed,
  the on-screen frames light up and the corner art blooms. The first-load haze does
  not replay.
- **Glass gleam on press:** pressing a glass button (pointer, Enter or Space) sends a
  band of light across the glass. It is masked to the authored glass shape and sits
  under the label.
- **Pending crest (dropped):** while the theme Server Action is pending, the view
  transition holds the old frame on screen, so a live pending indicator would never
  paint. Without view transitions it would have to be static (reduced motion), so it
  was not built.

Reduced motion keeps all of these static. `tests/preview/chronicle-signature.spec.ts`.

## Dismissible menus and touch fixes — 2026-10-04

- The mobile menu, presentation picker, mobile Chapter Archive and Project at a Glance
  close on an outside press, focus leaving them, a route or theme change, Escape, or
  when a resize hides them (`src/components/use-dismissible-disclosure.ts`).
- Chronicle's mobile-menu switch point matches the shared 62rem, so the menu panel
  always drops down over the page instead of growing the header.
- Reading panels and the project strip no longer use overscroll containment, which
  swallowed the wheel wherever a panel had nothing to scroll.
- Screenshots with a gallery open when the image itself is tapped.
- [CHRONICLE-REFERENCE.md](design-reference/CHRONICLE-REFERENCE.md) was revised to
  record the touch-first, landscape-first decisions and departures from the images.

## Supporting screens — 2026-10-04

Work, About, Lab and Contact now share one Chronicle screen grammar
(`src/compositions/chronicle/secondary-page.tsx`, `.chronicle-screen` in chronicle.css):

- **Action dock:** the page's related destinations are glass buttons beside the page
  identity (top right of the scenic band on desktop, under the identity column on
  landscape phones, a two-column row under the band in portrait). It follows the
  identity in reading order. The former bottom bar of outlined links is gone, which
  returns its height to Work's project preview.
- **About:** its sections use the homepage tab rail (Profile, Areas of Practice,
  Background & Experience); the profile fields use the theme's serif small-caps labels
  instead of the shared monospace labels, stacked above values in portrait.
- **Lab and Contact:** one framed dialog panel sized to its content and centred on the
  stage; longer content scrolls inside it.
- Shared semantic sections, headings, anchors and content are unchanged; other modes
  are unaffected. Project-strip arrows and dots are now 44 × 44px.
