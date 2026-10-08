# Product — first implementation

Implemented: 2026-10-08. Visual approval remains pending.

## Reference and scope

The owner authorized Product as the fifth mode after reviewing the supplied
handoff. Product is now the default following owner approval in D050. The six supplied Markdown documents and
five mockups are preserved in [design-reference/product](design-reference/product/README.md),
with descriptive filenames and package provenance. The refined Decision Canvas
homepage is primary; the phone montage represents two separate screens.

Mockup copy and generated project UI are illustrative. All runtime project facts,
captions, links and screenshots come from the existing typed records. No Japanese
translations were authored. Optional Japanese slots and per-field English fallback
remain available, including Product's new interface labels.

## Composition and interaction

- Home and Work: a roughly 64/36 desktop project list and selected preview. A
  dedicated Preview button changes the panel without navigating; the project title
  and Read case study links retain real destinations. Selected state has an
  accessible pressed state and a pale sage surface. The active button keeps focus.
- At 900px and below: the preview and its controls disappear; every project remains
  directly accessible in an ordinary vertical list. With JavaScript disabled, the
  same list works at every width without inactive preview buttons.
- Home continues with About, Areas of Practice and Lab columns, followed by shared
  Contact resources. Smaller widths stack these sections in their reading order.
- Case studies preserve the canonical spine and all supported blocks. Contiguous
  decisions share a Key decisions heading. Owned evidence sits next to its claim;
  sections without evidence use the available width. Portrait evidence stays compact,
  source dimensions bound image growth, and captions remain visible in detail pages.
- About, Lab and Contact reuse shared semantics with Product typography, restrained
  separators and ordinary document flow. Contact retains the copy icon, verified
  profile links and three pending document entries.
- Internal route changes use normal navigation, including browser history and
  language links. Product adds no page turn or card expansion. Preview changes use
  a 180ms/4px entrance; incoming Product theme morphs use 280ms. OS reduced motion
  removes selection animation and uses the shared immediate-switch behavior.
- The shared header retains its moving navigation marker, language slider and
  compact presentation menu. Product uses rectangular forest-green controls and
  an icon-only phone hamburger. Language remains above presentation in the menu.

## Implementation ownership

`src/compositions/product/` owns layout and preview selection, while
`src/themes/product/tokens.ts` and `src/styles/product.css` own visual primitives.
The mode participates in the existing theme/composition registries, persisted
server preference, conditional SSR stylesheet delivery, dev fixtures and semantic
theme-morph identities. No project schema or route changes were needed.

Source Serif 4 and IBM Plex Sans are locally served from `public/fonts/product/`,
with their licenses. Source Serif comes from `@fontsource-variable/source-serif-4`;
the 400/500/600 Plex Sans files come from `@fontsource/ibm-plex-sans`. Their font
faces load with Product's stylesheet, without global preloads. Japanese glyphs use
the existing system fallback until a reviewed Japanese type treatment is chosen.

A browser accessibility check found repeated unnamed media regions in the shared
block renderer. Media now uses a labeled group containing its semantic figure,
rather than adding an indistinguishable landmark for every screenshot. Figure
captions, owner descriptions and motion identities are preserved across modes.

## Review and next pass

First-pass desktop/phone Home and phone menu captures are preserved under
`design-reference/product/first-pass/` for later comparison. Additional page captures
are saved locally under `.cache/product-review/`; these are review artifacts,
not new case-study evidence. The historical handoff acceptance
checklist remains intact and does not imply full completion or visual approval.

### Verification

- Production build, content validation, lint and formatting passed; 58 unit tests
  pass, including all-mode fixture rendering and content invariance.
- Eight final production browser checks pass: Product preview/keyboard selection;
  responsive pages; morphs on Work/About/Contact/Portfolio detail; mobile menu and
  native project navigation; Product Contact in both locales; native Contact across
  five modes; delayed cold Product stylesheet; all-mode matching geometry sequence.
- All eight populated surfaces were checked at 1440/1024/768/390/320px without
  document overflow. Desktop/phone Axe scans returned no violations. Manual
  screen-reader and physical touch-device review remain open.
- The first Home Lighthouse sample measured Performance 94, Accessibility 100,
  Best Practices 100, SEO 66, LCP 2.72s, TBT 33ms and CLS 0.021. SEO includes the
  deliberate preview indexing restriction. This is one local mobile sample,
  recorded before the final secondary-page typography refinement; it is not
  acceptance of every route. Conditions and results are in
  [PRODUCT-PERFORMANCE-BASELINE.json](PRODUCT-PERFORMANCE-BASELINE.json).

Remaining work:

- Review the supplied scenic artwork in its desktop/phone placement. The owner
  provided a standalone generated landscape after the initial text-only pass;
  original first-pass captures remain intact. No personal About photograph is invented.
- Review candidate fonts, preview density, metadata spacing and case-study evidence
  balance with actual content. Final opening copy remains a shared content task.
- Refine pending resources to show each PDF/Word format separately, while retaining
  the existing non-interactive pending entries until reviewed files arrive.
- Complete manual screen-reader/touch and cross-browser checks. Automated checks
  are signals, not a claim of full WCAG conformance.
- Verify hosted and physical-device performance when deployment is authorized;
  the local Home/Work/case-study normal/reduced matrix is recorded below.

See D049 in [17-DECISION-LOG.md](17-DECISION-LOG.md) and the current
[ROADMAP.md](ROADMAP.md) for integration status and verification.

## Nihonest media refinement — 2026-10-08

Related consecutive portrait screenshots now share a two-column evidence group,
including screenshots owned by a decision. The same rule applies to supported
evidence alongside other narrative sections. Landscape evidence retains the full
group width, captions stay beside their own images, and single portraits retain
their compact source-bounded layout. This corrects the stacked journey screenshots
without making a project-specific layout exception.

Nihonest's shared preview now uses a dated live homepage capture. The discovery
search remains in the body as supporting evidence; historical local screenshots
and provenance remain intact. See the project README for capture details.

Verification: the live cover loads in all five presentations. Related portraits
share a row at 1440/390/320px in normal and reduced motion, with source-size bounds,
no document overflow and no Axe violations. Both targeted production browser tests,
58 unit tests, content validation, production build, lint and formatting pass.

Product supporting evidence does not visibly repeat the opening preview image.
For Japan Travel Planner, the trip-details section retains its mobile screenshot
while the desktop screenshot remains in the opening. Canonical block anchors and
order are preserved; other presentations and shared project content are unchanged.

## Product interactions and supplied landscape — 2026-10-08

- Shared email copying now confirms success with a check icon and `Copied` tooltip
  for two seconds in every mode. The icon target stays 44px, and the polite success
  announcement stays outside visual flow. Clipboard failure still shows the manual
  fallback. Repeated requests reset the timer; stale completions and unmounts are handled.
- Product selection uses a 140ms sage surface transition. The Preview control retains
  its original underlined text treatment, with bold text for the selected state,
  following owner review. The existing 180ms/4px preview entrance stays anchored; newest
  selection wins. Hover/focus never selects a project or delays navigation.
- Buttons have stationary press shading/inset elevation and visible keyboard focus.
  Project-title links retain separate navigation and understated hover treatment.
- Engineering disclosures use a rotating chevron and reversible 200ms intrinsic-height
  transition. The mobile menu fades/moves 4px over 180ms in both directions, with
  a quick hamburger/close change. Native details preserve keyboard, Escape and no-JS
  behavior. Browsers without intrinsic-height transition support use immediate native
  expansion. Reduced motion removes these transitions. Without JavaScript, native
  menus/disclosures update immediately; animation is enabled only after enhancement
  initializes, preserving narrow-screen native switching.
- Product's header stays sticky at the top on desktop and mobile, with its existing
  opaque surface and menu stacking order.
- The supplied misty-valley artwork appears beside desktop hero copy, below phone
  copy, and as a subdued footer background. It is decorative generated atmosphere,
  not evidence of a location or project. It has empty alt text and no parallax.
- Preserve the original as `design-reference/product/assets/misty-sunrise-valley-source.png`.
  Reproduce delivery variants with `node scripts/prepare-product-landscape.mjs`.
  `public/media/themes/product/PROVENANCE.json` records source hash, dimensions,
  encoding and outputs. The hero has responsive AVIF/WebP sources plus a JPEG fallback;
  the footer uses AVIF/WebP image-set. AVIF variants range from 29KB to 112KB at
  960–2172px, using quality 65 and 4:4:4 chroma; WebP uses quality 86.

Verification: nine final production browser checks passed, including all-mode copy
success/reset/failure, Product keyboard selection and native navigation, reversible
disclosure/menu behavior in normal and reduced motion, five-width layout checks,
desktop/phone Axe scans and all-page morphs. All 58 unit tests, content validation,
lint, changed-file formatting and the final production build passed. Latest visual
captures are in `.cache/product-review/product-landscape-{1440,390}.png`.
The earlier Lighthouse baseline predates this artwork and remains historical.

## Current performance matrix — 2026-10-08

Ten sequential local production Lighthouse mobile samples cover Home, Work and
all three published case studies in normal and reduced motion. Performance ranges
from 92 to 98; Accessibility and Best Practices are 100 throughout. SEO remains 66
because preview indexing is disabled. Every measured document confirms the requested
motion preference and Product theme; there are no Lighthouse run warnings.

Home scores 95/96, Work 95/96, Portfolio 98/95, Japan Travel Planner 93/92 and
Nihonest 95/92 (normal/reduced). LCP spans 2.26–3.17s, TBT 15–25ms, and maximum
CLS is 0.0347. These are single local samples, not field metrics or repeated medians.
No quality, loading or interaction changes were made to improve the score.

See [PRODUCT-PERFORMANCE-RESULTS.json](PRODUCT-PERFORMANCE-RESULTS.json) for exact
metrics and retained report labels, and [PERFORMANCE-REVIEW.md](PERFORMANCE-REVIEW.md)
for the interpretation and local interaction diagnostics.
