# Chronicle Theme — Approved Design Reference

Reference images:

- `Chronicle-home.png`
- `Chronicle-project.png`
- `Chronicle-mobile.png`

Last revised 2026-10-04 to record the decisions made while building and reviewing
Chronicle with Tyler. The images remain the visual baseline for palette, ornament,
framing and mood. Where this document and an image disagree, this document wins:
each difference below was decided deliberately. Implementation detail and history
live in [CHRONICLE-IMPLEMENTATION.md](../CHRONICLE-IMPLEMENTATION.md) and decisions
D036–D039 in [the decision log](../17-DECISION-LOG.md).

## Theme identity

Chronicle presents the portfolio as a polished, premium Japanese **mobile game
interface**: a landscape game screen you hold and touch, not a webpage you scroll.

It is landscape-first. A phone held sideways is the primary handheld target, and
desktop screens are treated as the same landscape game screen at a larger size.
Portrait must work well, but it is the adaptation, not the design centre.

The intended reaction is:

> **A premium Japanese mobile-game interface — immersive, tactile and collectible,
> but still clearly a professional portfolio.**

What makes it Chronicle:

- **Touch-first controls.** Large tap targets, whole objects you tap to select, and
  physical-feeling responses to presses.
- **Screens, not a long page.** A fixed shell of contained screens, panels and rails.
  Content changes in place; whole-page scrolling is avoided where practical.
- **Horizontal discovery.** Projects are chosen from a snapping horizontal strip with
  dots and arrows, like choosing a story chapter.
- **Selected-object continuity.** The object you select is the object that opens.
- **Art-directed atmosphere.** Bright ivory surfaces, scenic Japanese landscape, gold
  frames, crystalline and sakura ornament, serif typography.

Chronicle must not become a generic fantasy RPG UI, a neon gamer dashboard, or a
decorative skin over a conventional scrolling page. Its identity comes from
composition and interaction as much as from ornament.

## Touch and control principles

This is the part a conventional website most often gets wrong. Treat these as rules.

- **Large targets.** Every interactive control is at least 44 × 44px. Primary actions
  (glass buttons such as View Details) are taller, around 62px. Home-tab and chapter
  rail items are full-width rows of at least 44px, taller on phones.
- **Tap the object itself.** A project card is one large touch target covering the
  whole card. Do not add small selector buttons, crests or diamonds on cards; an
  earlier crest selector was removed because it blocked card content.
- **Select, then confirm.** Everywhere, the first tap on a card selects and arms it,
  and a second tap on the armed card opens it, like confirming a choice in a game.
  Swiping, dots and arrows move the selection but never arm a card, so a card that
  has just slid into place cannot open on a single tap. On Work, selection also
  updates the preview, whose View Details action opens the project directly; on the
  homepage the title stays a direct link for a one-tap open.
- **Tap images to view them.** Screenshots with a gallery open when tapped. The View
  Image glass button overlays the image's bottom-right corner (no drop shadow) and
  remains the keyboard and screen-reader route.
- **Swipe where it looks swipeable.** Horizontal strips use native touch scrolling
  with snapping. Dots and previous/next arrows above the strip signal that it moves
  horizontally and give a non-swipe way to move.
- **Hidden scrollbars.** Scrollbars are hidden throughout Chronicle on purpose, as in
  a game. Native scrolling, wheel, touch and keyboard access stay intact, and other
  affordances (dots, arrows, rails, peeking next cards) signal movement.
- **Never trap scrolling.** A contained panel that has nothing to scroll must pass the
  gesture on. Do not use overscroll containment on panels that are not guaranteed to
  scroll.
- **Menus get out of the way.** Dropdowns and overlays (mobile menu, presentation
  picker, chapter list, Project at a Glance) close when you press or move focus
  outside them, change page or theme, or press Escape.
- **Presses feel physical.** Glass buttons swap to authored hover and pressed art and
  play a short light gleam on press. Feedback never shifts layout.

Project-strip arrows and dots are 44 × 44px at every size.

## Screen layouts

### Desktop and laptop

Treat a 16:9 screen as one game screen. The shell fits the viewport; long content
scrolls inside its own panel.

Homepage:

```text
Header
Wide scenic hero (identity, short introduction)
Horizontal project strip (dots and arrows above, right-aligned)
Information panel: left tab rail + selected content on the right
```

The homepage does not carry the selected-project preview shown in the reference
image. That deeper preview lives on Work, where there is room for it. The homepage's
lower panel is a tab rail (About, Areas of Practice, Lab & Explorations, Start a
Conversation) with only the selected section shown, and a framed action at its
bottom right where a real destination exists.

Work:

```text
Page identity
Horizontal project strip
Selected-project preview: chapter rail | narrative | project screenshots | View Details
```

Preview chapters are derived from the project record (for example Overview, Topics,
Approach, Screenshots, Outcome) and omit unsupported sections.

About, Lab and Contact (supporting screens):

```text
Scenic page identity                [action dock: related destinations]
Stage: tab rail + selected section (several sections, e.g. About)
       or one framed dialog panel sized to its content (Lab, Contact)
```

The action dock holds the page's "Continue Exploring" destinations as glass
buttons and always sits with the page identity: top right of the scenic band on
desktop, under the identity column on landscape phones, under the band in portrait.
Work uses the same dock, so no bottom bar takes height from the preview.

Case study:

```text
Scenic identity banner (title, status, summary, topics)
Project at a Glance (overlay disclosure)
Chapter rail (lit to the current chapter) | reading panel | supporting evidence
```

### Landscape phone (primary handheld)

Landscape phones (landscape, height ≤ 500px) use width, not the portrait stack:

- **Homepage:** two snapped screens. Identity sits beside the project strip (one card
  plus a peek of the next); the tab rail and panel fill the second screen.
- **Case study:** identity, Project at a Glance and the chapter rail share a left
  column beside a full-height reading panel.
- **Work and About:** page identity on the left, content at full height on the right.
  Work's cards and preview are two snapped screens.
- The header compacts to give height back to the game screen.

### Portrait phone

Portrait may scroll vertically, but carousels stay horizontal:

- one full card plus a peek of the next, with dots and arrows;
- the Work chapter rail becomes a horizontal chapter strip;
- the case-study chapter rail becomes a compact disclosure (Chapter Archive);
- supporting screens stack identity, a two-column action dock, then the stage; field
  labels sit above their values;
- a portrait version of the scenery replaces the wide landscape;
- ornament density, simultaneous copy and frame layers reduce.

### Wide and large screens

On very wide screens (above ~1800px), bands run edge to edge: scenery, dividers,
card strips and corner art fill the width, while content keeps an ~1800px column.
Corner art is sized by the content around it: it fills the free side space, may
overlap section boundaries, stays fully opaque, and never covers text or buttons.

## Header

- Bilingual identity (Tyler Tetsuo Tapia) on the left. No role line in the header;
  the hero states the role.
- Navigation centred on the page like the other modes, with comfortably large links.
- EN / JP language control and the presentation picker on the right.
- The reference's monogram and identity dividers are not used.
- Below 62rem (the same width as every mode), navigation collapses into a hamburger
  menu. The menu panel drops down over the page; it never grows the header. The
  language control and presentation picker live inside the menu on small screens.

Navigation stays conventional:

```text
Work
About
Lab
Contact
```

Presentation modes stay explicit and equal:

```text
Editorial
Engineer
Digital
Chronicle
```

Chronicle should not visually imply it is the default or best mode. Its active state
may be expressive; inactive modes stay clearly available.

## Hero

- Wide scenic composition: identity and short introduction on the left, scenic
  Japanese landscape (mountain, water, architecture, seasonal foliage) to the right.
- Introduces the theme without becoming a full-screen splash: the project strip is
  visible on common desktop screens.
- Text sits on a controlled light area of the scenery, never over noisy detail.

Scenic artwork is generated or licensed atmosphere, documented as such. It must never
be presented as project evidence, a screenshot or real photography.

## Project cards and selection

Each card contains:

- the project's preview screenshot, framed as evidence (about a third of the card);
- title, real status as plain text, concise summary;
- topics as a full-width slash-separated line below the image and copy.

Rules:

- no numbering (01, 02…), no rarity, no ranking;
- no pills, no right-facing arrows as the call to action;
- no small selector controls on the card (see Touch and control principles);
- cards without a preview image use a single full-width copy column.

Selected state:

- stronger authored gold frame plus a violet/pink internal light;
- on selection, one light sweep traces the frame; other cards' screenshots step
  back slightly (imagery only, text keeps full contrast);
- understandable without hover, without motion and on touch devices. Use frame,
  surface and contrast as redundant signals, never glow alone.

## Rails and selected markers

Home tabs, Work preview chapters and case-study chapters share one rail grammar:

- a gold rail with authored finials, lit from the start to the current item in case
  studies;
- a crystal marker that travels with the selection;
- the active item gets stronger text and a light pink/violet wash. Keep the wash
  light enough that text contrast stays comfortable.

Do not use a coloured left border bar as the active indicator. It reads as a generic
generated-UI pattern and was explicitly rejected.

## Labels and terminology

- Labels and names use Title Case; statements and body text use sentence case (D038).
- Game-flavoured labels that stay professional are approved in rails and archives:
  `Objective`, `Chapter Archive`, `Project at a Glance`, `System Overview`. Each
  chapter link's accessible name still includes the canonical section title.
- Normal site navigation is never renamed into game terminology.

Never invent game systems or facts: no levels, XP, rarity, achievements, quests,
completion or contribution percentages, rankings, invented metrics, outcomes or
clients. Borrow the **interface craft** of a premium mobile game, never its economy
or gameplay: no currencies, stamina, gacha, summoning, banners, daily tasks or battle
language.

## Palette and tokens

Directional values from the reference (final tokens derive from the artwork and
contrast checks; a token pass for Chronicle's raw colours is pending):

```text
chronicle-bg            #FFFDFC
chronicle-surface       #FFF9F6
chronicle-surfaceSoft   #FFF2F7
chronicle-panel         #FFFFFF
chronicle-border        #E9D7C8
chronicle-gold          #D6A14A
chronicle-goldSoft      #F5E1B9
chronicle-pink          #F5A8D0
chronicle-pinkStrong    #E96AB3
chronicle-violet        #7B5CFF
chronicle-violetSoft    #C7B8FF
chronicle-blueSoft      #B8D9FF
chronicle-text          #111936
chronicle-textMuted     #4F5874
chronicle-textDim       #7D849B
chronicle-success       #6FBF97
chronicle-development   #C78A3E
```

Hierarchy:

```text
Primary interaction:    violet / violet-pink
Structural ornament:    warm gold
Atmosphere:             pink / blossom
Text:                   deep navy
Status:                 semantic but subdued, plain text
```

The violet selected state is the clearest interactive signal. Gold is never the only
colour carrying essential text.

## Typography

- Cormorant Garamond, locally hosted: 700 for display titles (page, card, preview
  titles), 600 for in-text headings, 500 for body and navigation.
- No fantasy display font. The game feel comes from composition, framing and motion.
- Reading text stays comfortable for long case studies (around 1.2rem in panels).

## Ornament and framing

- **Frames:** authored nine-slice gold frames around panels and cards; thin gold
  dividers with small diamond intersections; no soft rounded-card system, no nested
  cards, no heavy fantasy metal.
- **Crystals:** translucent faceted pastel crystals at corners and edges, never random
  low-poly decoration.
- **Sakura and foliage:** blossom, maple and branch art at corners and section
  boundaries; no constant falling-petal particles.
- **Corner art** may overlap section boundaries to tie screens together, but never
  covers text or controls and never receives pointer input.
- The centre of a reading panel stays calm; ornament lives at the edges.

## Motion

Chronicle has the most game-like motion of the four modes, but it stays short,
directional and responsive, and never delays input.

- **First load:** the scene wakes (a light haze clears over the scenery), frames light
  up, corner art blooms, and cards are dealt in from the right. Text is readable from
  the first frame.
- **Loading images:** a gold shimmer in the frame, then a fade-in once decoded.
- **Selection:** frame light sweep; the preview slides in from the direction of travel.
- **Panels and chapters:** slide in along their rail's axis and direction.
- **Opening a project:** the card's frame grows into the case-study banner, which
  unfurls like a scroll; Back furls it into the matching card.
- **Opening an image:** the image opens through a growing crystal and closes back into
  its frame.
- **Switching into Chronicle:** shared content morphs in place; then on-screen frames
  light up and corners bloom.
- **Glass buttons:** hover and press art, a short gleam on press.

Avoid constant floating, ambient particle loops, long cinematic transitions and
animation that competes with reading. Reduced motion shows every finished state
without animation, and state changes remain fully legible.

## Case studies

- Open like a dossier: scenic identity banner, then a stable shell with a lit chapter
  rail, a contained reading panel and adjacent evidence.
- Chapters come from the shared semantic sections; unsupported sections are omitted.
- Evidence is real project media, framed and inspectable, distinct from atmospheric
  art; it keeps its aspect ratio and opens in the crystal gallery.
- Long-form content stays semantically normal HTML.

## Accessibility

Chronicle's decoration must not weaken accessibility (WCAG 2.2 AA):

- dark text on light surfaces; selected states meet contrast;
- selection never relies on colour or glow alone;
- every touch interaction has a keyboard equivalent (arrows, dots, tab rails with
  arrow keys and Home/End, focusable reading regions);
- hidden scrollbars are offset by visible affordances and keyboard-scrollable regions;
- reduced motion respected throughout;
- without JavaScript, project titles revert to ordinary links and content stays
  available.

## Relationship to the other modes

- **Editorial** is narrative and publication-like. Chronicle is a game screen with
  horizontal selection, a persistent shell and luminous selected states. It must not
  become "Editorial with sakura".
- **Engineer** is dense, technical and dark-edged. Chronicle has light surfaces, lower
  metadata density and image-first entry. No terminal or HUD language.
- **Digital** is dark, spatial and pointer-lit. Chronicle is bright, serif-led and
  touch-first. No neon cyan, dark grids or cyberpunk lighting.

## Deliberate departures from the reference images

| Reference image shows | Chronicle uses | Why |
| --- | --- | --- |
| Selected-project preview under the homepage strip | Tab rail panel on the homepage; preview on Work | Keeps the homepage one screen; preview has room on Work |
| Monogram and identity dividers in the header | Bilingual name only, no role line | Cleaner identity; the hero states the role |
| Visible mobile navigation row | Hamburger menu with language and presentation inside | Gives height back to the game screen |
| Card selector marks | Whole card is the touch target | Small marks blocked content and made touch harder |
| Left-edge marker on the current chapter | Crystal marker, lit rail and light wash | Left border bars read as generic generated UI |
| Sentence- and mixed-case labels | Title Case labels (D038) | Consistency; reads as authored |
| Mostly desktop composition | Landscape-phone-first layouts | Chronicle is a landscape mobile game first |

## Explicitly rejected

Do not restore these without a new decision:

- project numbering (01, 02…);
- pill-shaped labels or topic pills by default;
- right-facing arrows on titles or calls to action;
- small selector crests or diamonds on cards;
- coloured left border bars as active indicators;
- drop shadows on glass buttons;
- dark navy full-page surfaces, neon cyan, tactical or parchment-heavy styling;
- a long vertically stacked desktop homepage;
- a live "pending" indicator while switching modes (the mode-switch transition holds
  the old frame, so it could never be seen).

## Prototype content that must not be trusted

The reference images contain placeholders: generated screenshot collages, fictional
UI, invented locations, arbitrary icon meanings, implied chronology, generated
role/category metadata and device frames. All factual content comes from the shared
portfolio content registry.

## Production intent

Chronicle proves the portfolio system can turn the same shared project data,
navigation, media and case-study sections into a substantially different interface:
a touch-first landscape game screen with horizontal discovery, selected-object
continuity, contained navigation and accessible long-form reading. It succeeds when a
visitor feels they are using a different presentation system while every essential
fact stays equally clear and accessible.
