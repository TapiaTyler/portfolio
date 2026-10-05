# Chronicle layout artwork

User-supplied ChatGPT-generated assets, imported 2026-10-03. These PNGs retain
their original dimensions and alpha transparency. `asset-manifest.json` maps
descriptive repository names to the original download names and delivery sizes.

| Asset                   | Intended role                                                    |
| ----------------------- | ---------------------------------------------------------------- |
| panel-frame             | Large glass reading panels                                       |
| project-frame           | Unselected project cards                                         |
| project-frame-active    | Selected project card with stronger glow                         |
| glass-button            | Primary framed action surface                                    |
| glass-button-hover      | Hover and keyboard-focus state of the glass button               |
| glass-button-active     | Pressed state of the glass button                                |
| crystal-corner          | Prismatic outer-shell decoration                                 |
| sakura-corner           | Floral outer-shell decoration                                    |
| chapter-divider         | Horizontal chapter separator                                     |
| chapter-rail            | Chapter spine (superseded by the sliceable set below)            |
| chapter-rail-cap-top    | Top finial of each measured chapter rail                         |
| chapter-rail-cap-bottom | Bottom finial of each measured chapter rail                      |
| chapter-rail-segment    | Repeating gold rail line (uniform middle band, tiles vertically) |
| chapter-rail-marker     | Selected chapter/tab marker (replaced `blossom.svg`)             |
| card-crest              | Unused: card selector removed 2026-10-04 (covered card content)  |
| card-crest-selected     | Unused: card selector removed 2026-10-04                         |
| scenic-portrait         | Portrait-phone and landscape-phone identity-column backdrop      |

Trimmed, proportionally resized WebP derivatives live in
`public/media/themes/chronicle/`. Transparency is preserved. Runtime use is scoped
to Chronicle; the source PNGs are documentation assets and are not served from
the public directory. These are decorative artwork, not project screenshots or
evidence. Labels, links, chapter state and controls remain semantic HTML.

## Second landscape generation

The autonomous reference refinement added `landscape-v2.png`: brighter anime-style
scenery with an open left side, Mount Fuji, a blue lake and a warm temple veranda.
The [generation prompt and delivery details](landscape-v2-prompt.md) preserve its
provenance. The original landscape remains available; version 2 is the current
scoped background. No screenshots, labels or project evidence are generated.

`monogram.svg` and `blossom.svg` are authored interface ornaments: a geometric
identity mark and a selected chapter flower. They carry no independent content.

Runtime status (2026-10-04): the authored `frame.svg` frames empty and pending states
as a nine-slice border. The second generated set (renamed from `sliceable-chapter-rail-01…04`,
`card-selector-crest-01/02` and `portrait-background`) supplies the rail caps, segment
and selected marker, the card crests and the portrait scene. Rail caps and the segment
are layered on each rail's measured pseudo-element, so finials always meet the first
and last real chapter. Retained but unused in `public/`: `monogram.svg` (header mark
removed at Tyler's request), `blossom.svg` (replaced by the crystal marker),
`ornament.svg`, `landscape.webp` and `chapter-rail.webp` (provenance), and the 800px
`crystal-corner.webp`/`sakura-corner.webp` (superseded by sized variants).

## Responsive delivery

The source PNGs and first delivery files remain preserved. The current layout
requests proportionally resized WebP derivatives according to viewport width:

| Artwork          | Up to 900px                             | Above 900px                              |
| ---------------- | --------------------------------------- | ---------------------------------------- |
| Scenic landscape | `landscape-v2-compact.webp`, 1440 × 480 | `landscape-v2.webp`, 1920 × 640          |
| Scenic portrait  | `scenic-portrait.webp`, 780 × 1040¹     | `scenic-portrait.webp`¹                  |
| Crystal corner   | `crystal-corner-mobile.webp`, 320 × 314 | `crystal-corner-compact.webp`, 480 × 471 |
| Sakura corner    | `sakura-corner-mobile.webp`, 320 × 242  | `sakura-corner-compact.webp`, 480 × 364  |

Sharp resized the existing delivery images and encoded these variants; it did
not regenerate or change the artwork. The 480px corners use WebP quality 80;
the 320px corners and 1440px landscape use quality 78. Alpha quality is 90.
`asset-manifest.json` records actual dimensions and file sizes. Matching header
and body rules reuse the same corner URLs, while a theme-conditional scenic
preload starts the selected size early. Other initial themes do not preload
Chronicle artwork.

¹ The portrait scene is used for portrait phones (≤ 900px wide) and for any short
landscape viewport (height ≤ 500px); the landscape images cover the remaining sizes.
Preload media queries in `theme-styles.tsx` mirror these conditions.
