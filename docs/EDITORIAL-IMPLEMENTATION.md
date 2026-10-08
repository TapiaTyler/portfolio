# Editorial implementation

Updated 2026-10-08. The production composition extends the approved publication
reference with the directed October 6 ink-landscape redesign. The original HTML
records the baseline; current composition/CSS and the asset provenance below record
later refinements. Final opening copy, translations and hosted verification remain open.

## Current composition

- A headline-led cover with Cormorant Garamond display type, italic emphasis and
  Inter body/UI text. The former framed ampersand study has been removed.
- A generated sumi-e landscape multiplies into the paper background and fades at
  its edges. A compact derivative serves narrower desktop/tablet layouts; phones
  omit the landscape and hero seal to keep text clear.
- A full-width lead project feature followed by smaller paired features. Compact
  year/status/technology kickers precede the full metadata on case-study pages.
- Screenshot plates with paper mats, hairlines and 16:10 card crops; case studies
  use numbered figure captions, a serif standfirst and a drop cap. Portrait evidence
  respects intrinsic size and the shared height cap.
- Letter-spaced Inter labels, hairline divisions, narrative About content and a
  split contact closing. Sparse ink marks extend the system across supporting pages.
- A sticky paper header, moving text-width navigation marker, animated language
  picker and compact native presentation control. Header/language routes use the
  top-bound page turn; narrative routes use horizontal turns.
- A desktop chapter index and native mobile disclosure, reading progress, unfolding
  Engineering details and ordinary anchor destinations. Reduced motion remains static.
- Work, About, Lab and Contact extend the publication grammar. Work contains real
  published projects, About contains biography/skills/education, Lab is intentionally
  empty and Contact offers approved email/profiles with reserved résumé/CV files.

## Content and composition boundary

Homepage opening/practice copy remains in src/content/placeholder.ts. Page content
lives in src/content/pages.ts; three published project records supply the shared
case-study facts. No theme-specific appearance is stored in those records.
Editorial specializes semantic composition surfaces while preserving the published
case-study spine in [CASE-STUDY-CONTRACT.md](CASE-STUDY-CONTRACT.md).
Development fixtures remain separate from the real public inventory.

## Artwork and provenance

[Editorial assets](design-reference/editorial-assets/README.md) records the
user-supplied, ChatGPT-generated landscape and ink-mark sources. Optimized delivery
files live under public/media/themes/editorial; they are decorative artwork, not
product evidence. The Tetsuo seal signs the hero, droplets mark the homepage close,
a brush stroke sits under the footer name and a mountain seal ends case studies.
Work, About, Lab and Contact use distinct marks in their margins. Phone layouts
omit larger margin decorations. Marks are noninteractive and avoid body text.
Contact's title sweep and margin spatter move roughly 200px upward after the Contact pass,
placing the sweep in the title's open area. Phone layouts continue to omit both.

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
Current populated screenshots, final opening/contact copy, Japanese typography
and hosted accessibility/performance review remain open. Earlier checks below
are historical verification, not a fresh audit of the October 6 artwork.
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

## Publication redesign — 2026-10-06

- Headline-led cover: the decorative ampersand study is removed; the ink landscape
  blends into the paper instead of occupying a separate framed column.
- Project features: a lead story spans the page; later features pair up as smaller
  stacked pieces. Cards carry a one-line kicker (year · status · three primary
  technologies); the full metadata table stays on the case study.
- Screenshots are plates: paper mat, hairline, one 16:10 ratio on cards, and
  numbered "Fig." captions in case studies.
- Labels use letter-spaced Inter small caps instead of monospace.
- Case studies open with a serif standfirst and a drop cap.
- The accent is a spot colour only: drop cap, chapter numbers, link hover and focus.
- The active presentation option is a filled ink pill; the footer has an ink rule
  and the name in the display serif.

All nine ink artwork delivery variants now prefer AVIF with typed WebP fallback.
The artwork positioning and composition are unchanged. The shared image optimizer
also negotiates project screenshot and local video-poster formats. See
[IMAGE-DELIVERY.md](IMAGE-DELIVERY.md) for regeneration and source preservation.
