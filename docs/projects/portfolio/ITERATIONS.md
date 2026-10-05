# Portfolio interaction and design iteration ledger

Captured from repository documentation and Tyler's feedback on 2026-10-02. Keep this alongside the canonical draft so visual context survives further implementation. It is process evidence, not final first-person reflection.

## Composition and continuity

- Approved HTML prototypes establish three visual baselines; they are translated into semantic components/compositions rather than copied wholesale. Facts are shared; hierarchy, density, navigation and geometry differ.
- Early architecture/performance work did not by itself fulfill expressive motion expectations. Tyler explicitly requested the theme-switch system and further theme-specific responses.
- Theme changes now move/resize matched visible modules across server-selected layouts. Typography/surfaces have a shorter fade; reading position and focus are preserved where possible. See D029/D030 and THEME-TRANSITIONS for bounds/fallbacks.
- Entry/reveal, theme morphing, route motion and microinteractions are separate layers. Capture all four in the project story; a color-switch screenshot alone cannot represent the system.

## Navigation and headers

- Full name, approved Japanese header name and mobile placement of theme/language controls were requested. Directional arrow glyphs were removed.
- Editorial hover underlines conflicted with already-underlined content links. Main links now shift slightly; header markers measure text independently of 44px targets.
- Engineer hover rails and capability borders were removed. Its header marker now sits left of labels without moving them; language selection uses a square.
- Digital had duplicate active/hover and moving rules. The rule now sits 2px below the label and excludes the independent `//` prefix. Language selection is a sliding pill; Editorial uses an ink pill. Both keep the theme control's 50px height.
- Earlier Japanese selector font discrepancies were corrected while keeping interface labels English pending translation.

## Editorial page physics

1. Directional horizontal turns follow chapter order and depth.
2. Slower timing was requested. Replaying multiple content turns looked like blinking on fast loads.
3. Fetching/rendering parent routes solely for an effect was discussed; the implementation uses one outgoing content turn and staggered blank sheets, avoiding that network dependence. Tyler approved the result.
4. Header navigation needed a different motion and a steady header. A bottom-hinged outgoing turn missed the intended direction. A shallow disclosure-style reveal also missed the requested page flip.
5. Tyler clarified a book binding at the top. The incoming sheet now rotates around its top edge below the header. An initial away-from-reader rotation looked as though it came from behind; reversing it to +88 degrees makes it swing from the front. Perspective scales for long pages.
6. The 600ms top-bound flip was approved as smooth. Horizontal turns now use its timing/easing; 100ms blank-sheet staggering gives a maximum 800ms sequence.

All Editorial snapshots are clipped below the live header. Header/brand/language links use the top-bound flip; content links/history retain horizontal direction. Theme switching cancels page motion. See ROUTE-TRANSITIONS and the production/preview tests.

## Disclosures

- The first Editorial response looked too similar to other modes. A longer synthetic code example made the differences inspectable.
- Editorial now expands actual grid height with a small top-edge fold/shading, instead of only translating/scaling an already-open panel.
- Opening had to restart retained CSS animation timelines explicitly to replay reliably.
- Reverse closing retains native `open` until the fold finishes. A second activation reverses mid-close; focus entering the body interrupts closure. Reduced motion closes immediately.
- Engineer retains its stepped indicator/quick settle; Digital retains its control entrance. Tyler approved these distinctions.

## Digital image continuity

- Project activation expands the selected card into the corresponding intro; returning contracts into the matching card. Generic internal links use the same spatial opening rhythm.
- Full-width fixture images could become smaller in the modal despite the label “Enlarge image”. Tyler asked for “View image”, a carousel, return to the last viewed frame, and varied page layouts.
- The current layout combines a split intro, bounded offset panels and mixed-width landscape/portrait galleries. Media identity deduplicates repeats within the case study.
- Opening/closing keep expansion/contraction. Button/arrow navigation, aspect ratios, selected-frame scroll/focus return and reduced motion are verified.

## Other responses worth retaining

- Editorial: image/caption framing and actual native-scroll reading progress.
- Engineer: record brightness press, code-copy success/denial feedback, and inspection of real diagram relationships with hover/focus/pinned selection.
- Digital: monochrome rotating border glimmers, restrained portal tilt, pointer-following card lighting, press compression, contextual Open labels and image scaling. Touch omits mouse tracking; reduced motion keeps static feedback.
- Across themes: native menus/forms/links/details, visible focus, interruptible snapshots and failure/timeout cleanup.

## Pilot layout review

- The first Engineer system overview linked five blocks but used unbroken column
  dividers. A wrapped fifth item appeared outside the first row, while only the
  architecture entry had a summary. Each item now has its own complete border;
  flexible rows distribute available width. Decision context and technical
  summaries come from the same localized canonical content as the full sections.
- Digital initially framed only decisions and technical sections. The standalone
  offset morphing video was detached from the decision it demonstrated. Narrative
  sections now consistently enclose their headings and body in one surface.
- The video declares a semantic `supportsBlockId` relationship and shares its
  owner's surface with its caption, without another media card. Standalone media
  and galleries remain visual sequences. Architecture inside a narrative surface
  keeps its functional diagram boundaries without another enclosing panel.
- These refinements preserve canonical block order, anchors, media identity and
  theme morphing. Capture review evidence after the populated layout is approved.

Engineer subsequently adopted the same explicit evidence ownership: every
narrative section is a square record with its heading inside, and supporting
video/captions share their owner's record. Green decision rails were removed at
Tyler's request; uniform neutral borders and header rules provide structure.
Embedded architecture no longer adds another enclosing panel.

## Reconstruction policy

Git history currently contains initial documentation, not recoverable intermediate application builds. Screenshots labelled **reconstruction** reproduce a documented symptom with browser-only overrides on current markup. They must never be called original screenshots or exact historical builds. Actual captures and override recipes are listed in the media manifest.

Navigation and gallery before/afters are included in the draft. The gallery uses synthetic image-ratio fixtures and an equally sized crop, not another real project. Other prior states remain documented here; recreating every experiment is unnecessary. A future capture should add evidence only when it improves the story.

## Reading directory and focused interaction evidence — 2026-10-03

Engineer section navigation now reads as a project folder containing chapter
entries, with neutral branch guides, decorative file icons and cyan current-row
feedback. Full narrative titles and native anchors preserve meaning; the directory
metaphor does not claim these chapters are repository files.

Two new unedited local recordings supplement theme morphing. One compares header
navigation and browser Back in each mode, then shows Digital selected-card continuity
using a labelled synthetic fixture. The other opens and closes the same real pilot
disclosure in all three modes, including Editorial's reversed closing fold. Each
recording sits with its narrative owner; captions describe what to watch. Comparison
captions now explain the visible change while retaining explicit reconstruction
and synthetic-fixture provenance. Existing historical capture files are preserved.

The directory's hover/current-row text and file icons were subsequently changed
to the same green accent as the Engineer header, at Tyler's request, to balance
the concentration of cyan technical links. Neutral branch guides remain unchanged.

## Chronicle rework and case-study refresh — 2026-10-04

The first Chronicle build (preserved in `evidence/chronicle-initial`) followed the
reference palette but read as a long vertical webpage. Directed review rebuilt it as
a touch-first, landscape-first game screen: a viewport shell, horizontal project
selection, contained case-study reading, landscape-phone layouts, 44px controls,
whole-card targets with select-then-confirm taps, self-dismissing menus and a set of
Chronicle microinteractions. See CHRONICLE-IMPLEMENTATION and CHRONICLE-REFERENCE.

The published case study now tells that story in its own chapter with:

- before/after homepage comparisons (desktop, and portrait vs landscape phone). The
  "before" images are unmodified copies of the first build's public-homepage captures
  (`header-desktop.png`, `header-mobile.png`), taken before any project was published;
- after-only case-study captures (no useful "before" exists: the initial case-study
  captures show mostly development tooling);
- one unedited recording of the morph into Chronicle, select/arm/open, the lit chapter
  rail, the crystal image gallery and Back.

Removed as minor relative to the rest of the story: the Digital navigation
before/after (a double-underline fix), and the paragraphs on underline geometry and
Engineer's directory-style chapter navigation. Their image files remain in
`public/media/projects/portfolio` (still produced by `capture-portfolio-pilot.mjs`)
and can be deleted if no longer wanted. Homepage captures for all four modes were
refreshed now that projects are published, and Chronicle joins that comparison.
