# Product presentation — asset manifest

**This is a provenance-aware inventory, not an instruction to ship generated mockups as runtime assets.** Entries are designated **[A] provided in handoff**, **[R] potentially needed**, or **[O] repository/owner verification required**. `mockups/` files are bundled design references only. No assertion is made about licenses for third-party buildings, landscapes, interface screenshot fragments, fonts, or individual imagery rendered inside the generated artwork.

## Actual packaged design references (not deployable evidence)

Dimensions were checked against the PNG files. They are **whole-image pixels**; their browser chrome, page content and phone drawings are embedded artwork, not separate editable layers.

| Suggested descriptive filename / packaged path | Purpose & placement | Decorative / evidence? | Available source | Native dimensions / aspect ratio | Transparency | Responsive variants | Suggested delivery | Status and provenance |
|---|---|---|---|---|---|---|---|---|
| `mockups/product-decision-canvas-refined-homepage.png` | **Primary** look/reference for homepage, palette, selected project list/preview and section groupings | Conceptual design, **not** app evidence | Original: `a_clean_minimal_elegant_portfolio_website_homepa.png` | 1024×1536; **2:3 portrait** | No; RGB PNG | None as real breakpoints; inspect composition to implement CSS | Keep as PNG in handoff; **do not deliver to visitors as homepage graphic** | **Exists [A/V]**; AI-generated within design conversation, sub-image provenance/licensing unverified |
| `mockups/product-decision-canvas-original-concept.png` | Earlier chosen Concept 2 before simplification; secondary composition reference | Conceptual design only | `decision_canvas_portfolio_mockup.png` | 1122×1402; ~0.800 portrait | No; RGB PNG | None | PNG in handoff only | **Exists [A/V]**; lower precedence, contains explicitly rejected decorations |
| `mockups/product-phone-home-menu-exploration.png` | Phone homepage **and** open menu/continued sections shown side by side | Conceptual design only | `bilingual_japanese_portfolio_mobile_ui.png` | 941×1672; ~0.563 portrait for entire **montage** | No; RGB PNG | Not a 390px viewport export; implement responsive page and separate menu state | PNG in handoff only | **Exists [V/O]**; theme tabs/handwriting/icons are not requirements, imagery not authentic evidence |
| `mockups/product-japan-travel-planner-desktop-detail.png` | Desktop case-study structure with narrative and supporting media | Conceptual design, depicted app UI **not** verified | `japan_travel_planner_case_study.png` (duplicate of generic `imagegen.png`, omit duplicate) | 1491×1055; ~1.413 landscape | No; RGB PNG | Actual CSS test at 1440; image is not a screenshot of existing repo | PNG in handoff only | **Exists [V/O]**; generated copy and screenshots may be fictitious; five-theme-tab header is superseded |
| `mockups/product-japan-travel-planner-phone-detail.png` | Phone case-study order and information density | Conceptual design, app UI **not** verified | `japan_travel_planner_portfolio_case_study.png` | 941×1672; ~0.563 portrait | No; RGB PNG | Actual CSS test at 390 and 320 | PNG in handoff only | **Exists [V/O]**; verify every image/caption/claim before publishing |

**Not bundled intentionally:** rejected Flowline and Guided Review concepts and duplicate versions of the same image; they were not selected. Neither rejected idea is a source of requirements. The ZIP includes no individual isolated Japan panorama and no authentic product screenshots; they cannot be extracted with reliable ownership or meaning from these composite mockups.

## Runtime asset inventory — source-of-truth inspection required

Proposed filenames are **descriptive wishes**, not claims about repository filenames, paths or assets. Actual repo assets should be reused where suitable; rename only if worthwhile and nonbreaking. For authentic screenshot files, preserve originals and store dimensions after inspection.

| Suggested descriptive filename | Purpose / placement | Decorative / evidence | Source available now? | Original dimensions / ratio | Transparency | Responsive variants | Delivery guidance | Rights/provenance and status |
|---|---|---|---|---|---|---|---|---|
| `nihonest-home-desktop` (actual extension TBD) | Nihonest project list/preview and maybe case detail | **Factual evidence** | **Unknown; inspect repo [O]** | Unknown; preserve source ratio | Usually no, verify | Use source-aligned thumbnail + native-size detail image; phone variant only if authentic mobile screenshot exists | PNG often best for small UI text; test lossless WebP/AVIF at visually acceptable fidelity, proper `srcset`/`sizes` | **Needed if showing image**; capture/version/provenance must be verified, else omit |
| `portfolio-presentation-system-preview` | Accurate composite or screenshot of implemented modes in Work/index | **Factual evidence** | Unknown [O] | Unknown | Typically no | Authentic desktop/phone only if real captures; no generated fake UI | Constrained inline screen at natural ratio, appropriately optimized | Potentially required if mockup's visual media is maintained; otherwise text-only is valid |
| `japan-travel-planner-home-desktop` | Work feature and case-study overview | **Factual evidence** | Unknown [O] | Unknown | Typically no | Authentic mobile if available; do **not** resize a low-resolution source upward | Natural raster width/height, responsive sources, maybe WebP/AVIF when copy remains legible | Needed only where actual screenshot exists; fabricated itinerary UI must not be published |
| `japan-travel-planner-itinerary-workflow` | Within Built/Decisions/Architecture section **only if true workflow screenshot exists** | **Factual evidence** | Unknown [O] | Unknown | Usually no | Desktop/mobile captures if source verified | `<figure>` + accurate caption; contain fit, no stretch | Optional; don't require to fill a media rail |
| `product-hero-japan-decorative` | Optional decorative hero atmosphere reminiscent of approved palette/composition | **Decorative**, not proof about work or locale | **No isolated approved original supplied [O]** | N/A | N/A unless a cutout is intentionally licensed | Optional crop chosen for wide/phone; may omit entirely | AVIF/WebP at appropriate responsive sizes if licensed; CSS-only neutral fallback recommended | **Not available** as independent approved asset; artist/photo rights must be confirmed; do not crop/ship mockup blindly |
| `about-photo-or-art` | Optional About preview media | Usually decorative unless actual personal photo | Unknown [O] | Unknown | Depends on source | Use only if asset legitimately provided and subject correct | Responsive `<img>`, proper credit where required | Optional; no AI-generated picture of owner or a fictional workspace |
| `site-brand-mark` | Not required: site header is full name + Japanese name | Text-first | Names available from brief [A] | N/A | N/A | Natural wrapping | Native text; no raster text image | Exists as text; **do not request a logo file** |
| `icon-copy`, `icon-menu`, `icon-close`, `icon-external` | Functional icon affordances as actually needed | UI geometry | Use existing icon system [O] | Vector | Yes as SVG/icon glyph | Scales with font/target | Inline SVG or existing icon primitives; no bitmap | No new raster assets needed; avoid decorative arrow icons |
| `english-resume.pdf`, `english-resume.docx` | Reserved English résumé PDF/Word slots | Document resource | **No [A]** | N/A | N/A | N/A | **Pending text only** until real approved document files exist | Do not create or link to fake exports |
| `japanese-resume.pdf`, `japanese-resume.docx` | Reserved Japanese résumé PDF/Word slots | Document resource | **No [A]** | N/A | N/A | N/A | Pending text only | No fabricated downloads |
| `japanese-cv.pdf`, `japanese-cv.docx` | Reserved Japanese CV PDF/Word slots | Document resource | **No [A]** | N/A | N/A | N/A | Pending text only | No fabricated downloads |

**Note:** sample resume filenames above are placeholders for *manifest naming*; they are not current paths, runtime assumptions or claims that files exist.

## Asset rules [A/R]

1. **Never substitute mockup UI for actual UI.** Source screenshots must represent the actual project/app and existing features. Generated faux screenshots, charts and fake itinerary details must not become content evidence.
2. **Inspect provenance.** For every shipped image, record creator/owner/license, usage permissions, capture context/date where relevant, and source path in repo. Neither screenshot rights nor third-party image rights are proven by appearance in an AI-generated mockup.
3. **No unnecessary raster UI.** Implement logo/name as text, buttons/select/tooltip as HTML/CSS, separators/focus styles as CSS, icons as accessible SVG/existing icon library. No bitmap buttons or rasterized headings.
4. **Resizing policy.** Record intrinsic pixel dimensions and rendered CSS size. Do not display raster evidence larger than native dimensions; if a larger source exists, use responsive `srcset`. Preserve aspect ratio and never stretch. For diagrams needing zoom, show an accessible lightbox or direct image file if genuinely available.
5. **Compression.** Try AVIF/WebP for photographs and supportive images; compare screenshots at typical and 2× density so tiny interface type is not smeared. PNG is acceptable when it preserves factual UI. Use explicit dimensions/aspect ratio to avoid CLS; lazy-load *below-fold* evidence only and avoid visually delayed hero/media just to improve a Lighthouse score.
6. **No-image layout.** Omit frames/placeholder boxes, give narrative normal width; don't introduce stock or fake branded imagery. If existing shared media component renders decorative fallbacks, disable only for Product if needed without mutating shared project data.
7. **Localizations.** Evidence screenshots can remain in the language they actually depict and should not be silently translated in an image editor. Page/interface text follows English source and reviewed Japanese fallback policy.
8. **Variant selection.** Do not create dozens of cut images solely to match a generated composition. Start with verified sources and browser-delivered responsive transforms in the existing stack.

## Follow-up inventory actions [O]

- Identify all real project media and their source dimensions, alt texts/captions, associated project IDs/routes and rights.
- Determine if available authentic screenshots cover the cases shown in the mockup; if not, remove the image rather than staging invented workflows.
- Confirm site typography licenses/download strategy and font payload in Japanese (full glyph sets can be large).
- Confirm whether a licensed scenic image is needed at all; text-first hero is an acceptable implementation variant.
- Record absent source files in roadmap/decision log without misleading placeholders.
