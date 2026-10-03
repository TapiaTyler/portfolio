# Editorial implementation — first design pass

The production composition follows the approved publication grammar in
`design-reference/EDITORIAL-REFERENCE.md` and `design-reference/editorial.html`.
This pass establishes the visual system; final content and Tyler's visual approval
remain pending.

## Reading orientation and chapters

The case-study opening adds a factual project brief, with ownership/review in a
native disclosure and compact metadata beside the lead. Body type remains readable
sans; display serif typography is reserved for the title and chapter headings.
A quiet two-column chapter index precedes the narrative on desktop, complementing
existing reading progress. It becomes a native disclosure on mobile. Anchors use
canonical narrative sections; supporting media does not create unrelated chapters.
Recurring Context/Decision/Tradeoffs labels use restrained mono typography beneath
larger section headings. These are the 2026-10-03 reading refinements; final copy
and populated-layout approval remain pending.

## Implemented

- A wide 5/7 hero with Cormorant Garamond display type, italic emphasis and
  restrained Inter body/UI text.
- A deliberate abstract typographic study in a 16:10 frame. It is decorative,
  hidden from assistive technology, and carries no personal or project claims.
- Hairline section divisions, three sparse capability columns, an asymmetric
  narrative About section and a split contact closing.
- Intentional empty Work/Lab sections until reviewed content exists. There are no
  generated project entries, portraits, external prototype images or fabricated links.
- A sticky paper header, destination-aware navigation, native mobile menu,
  language pill and compact native presentation picker. Escape returns focus to
  the corresponding disclosure; links and mode forms also work without JavaScript.
- Project features with serif titles, 5/7 narrative/media balance, quiet metadata
  and recomposition for no-image records. Title, media and narrative stay in the
  same DOM order at every breakpoint; mobile presents media before body narrative.
- Wide case-study introductions, narrow narrative blocks, quiet media captions,
  shared decision/technical/architecture semantics and native expandable details.
- Work, About, Lab, Contact and not-found shells inherit the same typography,
  paper palette, gutters and editorial spacing. Their final content remains pending.

## Content and composition boundary

`src/content/placeholder.ts` holds provisional English homepage copy using the
shared `HomepageContent` model. The areas-of-practice copy is draft language,
not reviewed personal claims or a skills inventory. No Japanese translations
have been authored.

The composition registry now includes a Homepage surface. Editorial specializes
Homepage, Hero, ProjectFeature and CaseStudyIntro while reusing shared semantic
sections and block fallbacks. Engineer and Digital receive the same homepage
content through their baseline renderers until their design passes.

The public project inventory stays empty. Development previews use the separate
fixture registry and explicit preview destinations, not fabricated public routes.
`/dev/compositions` compares project previews and full case studies across modes.

## Fonts and CSS

Cormorant Garamond normal/italic and variable Inter Latin fonts come from pinned
npm packages and are bundled with `next/font/local`. Builds and visitors do not
fetch Google Fonts. Fonts use swap/fallback metric adjustment and are not globally
preloaded, so unused Editorial faces are not forced on other modes. The fonts'
SIL Open Font Licenses accompany the distribution under `public/fonts/`.
Japanese font integration belongs to the later translation pass; system fallback
continues to handle any future Japanese strings meanwhile.

`src/styles/editorial.css` uses CSS scopes bounded by nested theme containers.
This prevents a saved Editorial root preference from restyling Engineer/Digital
fixtures on the comparison page. New theme styles should preserve that isolation.
Tokens still control primitives; the scoped composition stylesheet controls
proportions, information grouping, surfaces and responsive transformations.

## Verification and remaining review

Local checks cover unit content compatibility, production switching/persistence,
keyboard controls, JavaScript-disabled navigation, reduced motion, local font
delivery and responsive widths of 320, 390, 768 and 1440 pixels. Automated axe
checks cover the English homepage and secondary shells plus the Japanese fallback
homepage. Development fixtures were checked for unique anchors and horizontal
overflow, and desktop/mobile screenshots were inspected.

Automated accessibility checks are a regression guard, not a full WCAG audit.
Final visual review, real imagery, populated project/Lab layouts, long final copy,
Japanese typography and release accessibility/performance review remain open.
Continue refining Editorial when real content or visual feedback warrants it.

## Secondary routes — 2026-10-03

Work, About, Lab and Contact now share typed page content through a registered
SecondaryPage composition. Serif page titles and a 5/7 opening extend the approved
publication grammar. About uses an offset reading column with labels beside profile,
practice and background content; Work retains full-width editorial project features.
Lab uses an honest empty catalogue until studies are reviewed. Contact has a generous
statement opening and pending contact-method section, without unverified addresses.
Continuation links retain the existing ink rule and hover movement. Mobile returns
to the same semantic reading order in one column.
