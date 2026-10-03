# Digital — first implementation pass

This pass translates `design-reference/DIGITAL-REFERENCE.md` and `digital.html`
into shared production components. It establishes the initial visual direction;
final project content, media and Tyler's visual review remain pending.

## Composition and visual language

The homepage uses a 7/5 name-led hero with a tall abstract portal. The portal is a
decorative inline SVG, layered over grid and ambient gradients; it makes no
location, status or telemetry claims. A three-column project deck becomes two
columns on tablets and one on narrow screens. Each card uses the existing typed
project title, summary, media, status and metadata. Sparse records omit unsupported
evidence and fields.

About follows Work as a 6/6 narrative and connection visualization. The supporting
labels reuse the shared capability categories. Translucent capability panels,
the Lab empty state and a centered bold contact closure continue the same grammar.
No experimental Lab projects, social links or availability claims were invented.

Project details use a media-led introduction: title, available preview media,
narrative and metadata. The full case-study block sequence remains unchanged.
Shared decision, architecture and technical content receive layered surface
styling without introducing theme instructions into content.

Inter is the primary local face; JetBrains Mono supports metadata and controls.
Existing font assets are reused. Near-black surfaces, cyan accents, a 40px grid,
rounded geometry and restrained glows distinguish Digital from Engineer's records.
Prototype status accents use the existing planning token. Theme scope boundaries
prevent style leakage into nested comparison previews.

## Interaction and user corrections

Cards respond to hover and keyboard focus through their borders and glow. A small
lift is limited to fine pointers that support hover. Reduced motion removes the
transform and transitions. Native links, scrolling, media controls, language
navigation and the theme form remain usable without the enhancements.

The full name and approved Japanese name remain in the header. Mobile language
and theme selectors stay inside the native menu. Both controls use the established
equal height and aligned SVG chevron. Explore work has no arrow, as requested.

This pass adds no WebGL, animation package, pointer listeners or continuous motion.
Decorative SVGs are hidden from assistive technology. If later enhancements need
large packages, they must be dynamically loaded inside the active Digital surface.

## Development review

### Case-study image composition

Image-bearing intros pair a framed preview with the project record on desktop.
Standalone images use a bounded, offset panel; galleries use a twelve-column
composition with different widths for standard, wide and portrait media. Mobile
stacks the panels while retaining a narrower portrait frame. Images keep their
intrinsic aspect ratios. Shared semantic frames expose media identity and geometry;
the Digital stylesheet interprets them without adding appearance instructions to content.

View image opens a carousel of unique images from the current case study. The
existing expanding/contracting motion is preserved. Closing scrolls to and focuses
the last viewed image's page frame; route/theme changes dismiss without relocating
the new page. Keyboard buttons, arrow keys, Escape and reduced motion are supported.
Review with `/dev/compositions?surface=project&project=fixture-visual` in Digital.

`/dev/compositions` compares the same synthetic project across all three modes.
`/dev/compositions?surface=homepage` renders three published synthetic fixtures in
the active mode, allowing populated homepage review without publishing fixtures.
Both surfaces remain development-only. The mode selector changes the active
homepage preview; `?locale=ja&surface=homepage` exercises English fallback.

## Case-study surface rules

The project introduction is an open composition: title, media and metadata share
the spatial grid. It is not a nested project card.

Every narrative block (intro, problem, goals, architecture, decision, challenge,
technical detail, constraints and result) gets one translucent surface. Its
heading belongs inside that surface. Subheadings, diagrams, code and disclosures
are content within it; they do not introduce another enclosing card. Diagram
nodes and code controls retain their functional boundaries.

A media block with `supportsBlockId` shares its narrative owner's surface,
following the text with a quiet divider. The video/image and caption remain
together without a second framed MediaFrame. The canonical block IDs, anchors,
reading order and motion identities remain intact. The portfolio morphing video
uses this relationship to accompany the morphing decision.

Unassociated media and galleries remain independent visual sequences with their
existing bounded frames and varied widths. Their captions belong to those frames;
they do not need an empty narrative card. Card boundaries express semantic
grouping, rather than depending on whether a block happens to be a decision.

Narrative surfaces share the pointer-light behavior of the opening project card
with a dimmer 5% accent tint (the project card retains 12%). They do not inherit
project press compression or contextual Open labels. Mouse tracking uses the
existing animation-frame controller and interruption cleanup; touch and reduced
motion retain static feedback, and keyboard focus activates the same subtle light.

On pointer exit, the light keeps its last coordinates throughout the 180ms
opacity fade. Coordinate cleanup waits 220ms and only runs once the light is
fully hidden. Re-entry cancels pending cleanup, preventing a flash at the fallback
center. Motion/input preference changes and controller disposal clear it directly.

## Reading orientation and navigation

The media-led opening now includes a project brief with distinguishing approach,
role, implementation method and current state, plus native ownership/review detail.
All information comes from the canonical record; metadata avoids repeating role
and status. No contribution percentages or completion claims are inferred.

A sticky module navigator sits beside narrative surfaces on desktop. Its active
section uses a restrained accent and surface boundary. It follows canonical
section order and becomes a native disclosure on mobile. Major section titles
remain bold; recurring Context/Decision/Tradeoffs labels use quieter mono type.
Existing image frames, evidence ownership and dim pointer lighting remain.

## Verification and remaining work

- 28 unit tests including source-content compatibility in every mode and locale.
- 11 production browser tests, including Digital responsiveness, local display
  font, mobile switching and automated accessibility checks on route shells.
- Brave review of public home, populated homepage and sparse/system/visual
  comparison fixtures at 320, 390, 768 and 1440px; automated axe checks and
  reduced-motion card response checks.
- Desktop/mobile screenshot inspection, content validation, lint, formatting,
  type checking and production build.

Automated checks do not establish full WCAG conformance or final design approval.
Public project inventory remains empty; Japanese interface and narrative copy are
still pending. The only authored Japanese text is the approved header name.
Real content may require refinement of card density, crops and case-study rhythm.

Next: cross-theme integration review of content edge cases, responsive behavior,
keyboard controls and media presentation before launch metadata and performance work.

## Secondary routes — 2026-10-03

Work, About, Lab and Contact use the shared inventory via SecondaryPage composition.
A spatial opening pairs large identity type with the page statement. About pairs a
profile panel with a larger practice panel, then gives background its own full row.
Narrative headings and content belong inside one translucent surface; project-deck
headings remain outside cards, and collections never add an enclosing card. Work
uses the established project deck, selected-card expansion and return contraction.
Supporting surfaces reuse the 5% pointer light, delayed invisible reset, touch/static
feedback and reduced-motion behavior. Lab and Contact have explicit pending content
rather than fabricated studies or nonfunctional forms. Mobile stacks the panels.
