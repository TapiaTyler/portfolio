# Product presentation — design reference

**Scope:** implementation handoff for the fifth presentation mode of Tyler Tetsuo Tapia's existing portfolio. This specifies design behavior, not repository implementation. **Default mode remains `editorial`.**

## How to read this document

- **[A] Approved** — explicitly required by the brief, or a direction the owner selected/affirmed in conversation.
- **[V] Visual reference** — visible in the chosen/refined mockups; useful as a model, **not** proof of pixel-exact dimensions or approval of incidental text and controls.
- **[R] Recommendation** — actionable proposal requiring normal implementation judgment.
- **[O] Open** — needs repository inspection or owner decision.
- **[X] Rejected** — do not reproduce, even if a generated mockup accidentally depicts it.

**Precedence:** explicit factual/content/accessibility requirements > explicit rejection/feedback > refined Decision Canvas homepage > original selected Decision Canvas composition > later exploratory phone/detail images > recommendations. Generated text, fake UI screenshots, and control inconsistencies never override explicit requirements.

## Objective and audience

**[A]** Product is for prospective employers, engineering leads, designers and collaborators assessing how the author frames a need, builds a working product, navigates constraints, makes decisions and explains the delivered result. Readers should be able to scan quickly or continue to an accessible case study. Do **not** make Product a SaaS dashboard, generic landing page, or fourth-page-turn narrative. No invented customers, revenue, statistics, conversion metrics, or contribution percentages.

**[A]** Architecture contract: **CONTENT → SEMANTIC COMPONENTS → COMPOSITION → THEME TOKENS → INTERACTION / MOTION**. Themes change hierarchy/grouping/density/navigation/media treatment, never factual claims, contribution ownership, published availability, URLs, essential destinations, SEO identity, or accessible reading order. Appearance instructions do not belong inside project content.

## Direction and visual hierarchy

**[A/V]** Selected: **Concept 2, “Decision Canvas”**, subsequently refined to remove AI-pattern repetition. Preserve warm ivory/near-white fields, deep navy/charcoal type, quiet forest-green actions and selection, fine separators, spacious but efficient reading, a compact top navigation, a relatively low hero, a scan-friendly project list and a persistent project preview on desktop. Project information is the centerpiece; images support it, not the reverse.

**[A]** The refined homepage's calm list/right-hand-detail split supersedes the busier original, including its decorative arrows, numbered labels, pills, colored left outlines and large theme tabs.

### Distinction from existing presentations

| Existing mode | Existing reading approach (given) | Product's separate composition [A/R] |
|---|---|---|
| Editorial | Publication narrative, imagery, whitespace, restrained artwork | Scannable project comparison and task-oriented case-study sections; less illustration-led |
| Engineer | System records, technical density, architecture, directory navigation | Leads with problem and decisions; technical specifics are available but subordinate to product explanation |
| Digital | Dark spatial layering, lighting, animated expansion | Light stable surfaces, steady preview pane, restrained state feedback instead of expansion |
| Chronicle | Scenic glass, horizontal chapter/project selectors, contained reader | Normal vertical document scrolling, clear headings, native page navigation and no game-like chapters |

The mode must not be achieved by applying color and font tokens to an unchanged Editorial layout. Section arrangement, discovery model and detail organization must differ observably.

## Reference mockup inventory and authority

All five verified PNGs appear in `mockups/` of this handoff; dimensions are **whole generated image dimensions**, not CSS viewport specifications.

| File | Pixels | What it represents | Authority and cautions |
|---|---:|---|---|
| `product-decision-canvas-refined-homepage.png` | 1024×1536 | Homepage's **approved direction**: lighter hero, flat project rows, selected-project preview, lower About/Practice/Lab/Contact | **Primary visual authority [A/V]** for palette, rhythm, grouping; generated prose/images are not evidence |
| `product-decision-canvas-original-concept.png` | 1122×1402 | Earlier Concept 2, before simplification | **Secondary [V]** for basic split and comparative thinking; **not** for its numbering, border accents, arrows, tags or large presentation tabs |
| `product-phone-home-menu-exploration.png` | 941×1672 | Side-by-side phone homepage and expanded menu/continued sections | **Exploratory [V/O]** only, not a literal 390px full-page capture. Override the illustrated five theme tabs with one compact select. Do not copy decorative handwritten words |
| `product-japan-travel-planner-desktop-detail.png` | 1491×1055 | Two-column desktop case-study: primary narrative and supporting screenshot/media rail | **Exploratory [V/O]**. Some generated details/imagery may be fictional; header shows theme tabs contrary to requirement |
| `product-japan-travel-planner-phone-detail.png` | 941×1672 | Single-column reading flow, large media, grouped decisions and disclosure | **Exploratory [V/O]**. Menu/navigation presentation is not a finalized phone spec; content unverified |

**[O]** No separate Work/index, full Contact page, interaction state board, or 320px capture has been approved. Design those by extending the chosen grammar, not by pretending references exist. These raster images are design illustrations, **not** deployable screenshots of Nihonest, the portfolio, or Japan Travel Planner.

## Homepage: composition and reading order

**[A]** Information order remains **professional introduction → Selected Work (Nihonest, Portfolio presentation system, Japan Travel Planner) → About preview → Areas of practice → Lab & Explorations → Contact invitation**. The layout can rearrange side-by-side modules visually only if DOM/focus/screen-reader reading order stays logical.

1. **Header [A].** Wordmark `Tyler Tetsuo Tapia` plus `テイラー・鉄男・タピア`; Work, About, Lab, Contact; GitHub then LinkedIn; EN/JP; **one compact presentation selector**. Normal navigation, not a promotional toolbar. Keep links/selection behavior consistent with other modes.
2. **Hero [A/V].** Large but not full-screen professional introduction; strong title and readable supporting copy, with a restrained decorative or approved image region. CTA text may be `Selected work` and `About`; actionable link labels need no arrow icons. Do not make the decorative image essential to understanding. Do not add unverified biography or Japan employment claims.
3. **Selected Work [A/V].** Desktop: approximately **60–65% scanning list / 35–40% preview** within the main content region **[R: estimate from raster proportions, not measurements]**. Three ordered entries, each with actual name, publication status, concise factual summary, focus areas, and an optional true project image. Selected row gains a soft neutral/sage surface rather than a border marker. Preview displays the *same selected project's* verified content, salient image(s) and an ordinary `Read case study` link. No duplicated links/arrow-only buttons. If the site already uses a sensible native link/card interaction, integrate rather than invent a parallel controller.
4. **About preview [A/V].** Short real biography and a single clearly labeled link to About. Optional image can be omitted cleanly.
5. **Areas of practice [A/V].** Text-first concise practice areas sourced from existing content. Simple rows or restrained columns; icons only if semantically useful, not six identical decorative glyphs.
6. **Lab & Explorations [A].** Deliberately empty catalogue. State plainly, e.g. `No explorations published yet.` Keep Lab reachable and do not draw fake experiment cards/counts.
7. **Contact invitation [A/V].** Clear email action and routes to Contact; optional small area for GitHub/LinkedIn in established order. Never show placeholders that look like active downloads.

**[R]** For the homepage project preview, keep enough hierarchy to reveal **purpose / what was built / focus or decisions / current status**; never hallucinate project-specific decisions or results to fill fixed boxes. A list row can use an anchor to the case study and a distinct selection affordance if needed; differentiate those actions by label and semantics.

## Work / index [R — not separately visualized]

Use the homepage's list/preview grammar on a dedicated Work page with all **three** projects in immutable order. Allow more descriptive text and actual media, but do not turn into a nested grid or dashboard. A wide viewport may pin the preview as readers select entries; no dependency on sticky behavior to navigate. A narrow viewport becomes an ordinary vertically stacked list of full, independently readable project summaries and links. If the current architecture has links/filters, preserve factual destinations; do not fabricate filter options or counts.

## Project detail: Japan Travel Planner case study

**[A]** Publish and read content through the invariant spine: **Problem → What was built → Key decisions → Architecture → optional Challenge → one grouped `Engineering details` disclosure → Result**. Other available sections may exist in the repository but must not silently supersede this required order. If optional Challenge is absent, omit that entire heading and spacing.

**[V/R]** Desktop detail: title/status/summary above the narrative, substantive text in a **~58–65% main column**, and one **~35–42% supporting media/metadata column** if real material exists. These are estimates; the mockup canvas is 1491×1055, not a 1440px webpage specification. Intro metadata is understated plaintext. Use hairline section dividers sparingly and meaningful heading levels. Technical disclosure is **one** grouped native disclosure, not four per-section accordions. Render Result plainly using verified content; do not invent business impact. Only show source/demo links confirmed in project data.

**[V/R]** At phone widths, use a single DOM/logical reading stream: title/status/summary → key metadata → representative evidence **if available** → Problem → Built → Decisions → Architecture → optional Challenge → Engineering details → Result → relevant next steps/contact. Supporting images can be placed where they explain a section, not all automatically hoisted above Problem. Evidence media must never be stretched past source resolution. Mobile decisions may become stacked items rather than cramped mini-columns. Avoid sticky chapter navigation.

**[A]** Facts permitted for this example: `Japan Travel Planner`, `Complete`, `A full-stack application for organizing itineraries and reusing planning templates, with English and Japanese workflows`, and focus areas `itinerary planning`, `responsive layouts`, `localization`, `account/security boundaries`. Everything else in image-generated case-study text or pictured app UI is provisional and must be checked against repository source before publication.

## Other page extensions [R unless noted]

- **About:** identity and factual experience with readable paragraphs; Optional supplementary image aligned rather than dominating. Resume/document links should follow actual resource availability; no fabricated credentials or downloadable URLs.
- **Lab:** when empty, single helpful statement and navigation back to Work. When populated, use the same restrained list/item grammar with a truthful publication state; do not add empty "coming soon" cards.
- **Contact:** email `tapiatylert@gmail.com`, adjacent copy control with tooltip `Copy`; then GitHub **before** LinkedIn, each profile title itself linked. Reserve **English résumé**, **Japanese résumé**, **Japanese CV** rows with PDF and Word availability text `Pending`/`Not available yet`; **no anchor/button/download** while absent. Retain native `mailto:` for email; open external web sites in a new tab; document files, once present, use ordinary file-link semantics. A focused Contact section on homepage may be shorter; full Contact page contains resource statuses.
- **Error/not-found:** accurate status heading, short action-oriented explanation, same accessible header and a real route back to Work/Home. No fake product telemetry. On missing project media, remove media frame and give narrative full width; optional fallback is **typography and spacing**, not stock imagery or generated product UI.
- **Localization empty fields:** English is source; display reviewed Japanese per field where present, otherwise that field's English text; do not hide the project or populate untranslated blanks with fabricated Japanese.

## Layout & responsive estimates

**These are suggested CSS targets, not measurements from image output.** Test actual content and existing site shell first.

| Range | Proposed behavior / approximate dimensions |
|---|---|
| ≥1200px (1440 test) | Content max-width ~1240–1320px; outer gutters ~48–72px; desktop work 62/38 split with 20–32px gutter; hero ~280–360px of visible content before next section, not full-viewport |
| 900–1199px | Reduce gutter to ~28–40px; preview ~35%; if real project summaries become cramped, stack preview *after* project list and rely on standard links |
| 600–899px tablet | Prefer one-column introduction; project preview can move below list or be omitted if selection creates duplicate work; no horizontal scroll for main content; side rail in details becomes in-flow media |
| 390px phone | ~16–20px outer padding; single column, vertical normal scroll; no repeated title in header; menu for navigation and both selectors; project entries independently actionable |
| 320px narrow | ~12–16px outer padding, no clipped names/labels; menu/select buttons fit, long email can wrap, 2-way document statuses reflow; avoid fixed-width chips and horizontal overflow |

**[R]** Preferred spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px; major section gaps around 48–72px desktop, 32–48px mobile. Use fluid clamp values where natural; don't force an empty hero simply to match a screenshot height. Header target ~64–80px desktop depending on shared site shell; on phone a two-line identity plus menu button is more appropriate than squeezed nav links.

## Surface and card rules

- **Unboxed:** headings, narrative sections, metadata labels, status text, Areas of Practice, most footer and Contact content. Let typography, gaps and dividers create hierarchy.
- **Soft surface allowed:** the currently selected project row, with subtle background rather than green leading border. One parent surface may be used for an actual UI preview or media region. **Do not nest boxes simply to group every sentence.**
- **Bordered frame:** only when it improves evidence distinction (real screenshot against page background), native disclosure outline, or input/control affordance. One border level per region is generally sufficient.
- **Empty state:** text-first on page. No dashed placeholder card unless it conveys an actual upload drop target (not applicable here).
- **Radiuses:** proposed ~0–6px for interface frames, ~0–4px buttons, not pill shapes; keep consistent with actual screenshots when those images are preserved at native aspect ratio.
- **Shadows:** none on text sections; optional very subtle elevation for floating menu or media, not every card.

## Typography and localization [R]

**Candidate family roles, not approved font files:** `IBM Plex Sans` 400/500/600 for UI, navigation, project descriptions and metadata; `Source Serif 4` 400/600 for selective headline and major section titles (avoid recreating fully Editorial mode). For Japanese fields, try `Noto Sans JP` 400/500/700 for UI and `Noto Serif JP` 400/600 only where aligned with heading treatment, with system fallbacks and font loading tested. Use `font-display: swap`/existing site conventions with minimal layout shift; check glyph coverage including katakana, middle dot and the kanji in the confirmed name `テイラー・鉄男・タピア`.

| Role | Proposed desktop / phone | Weight | Line-height |
|---|---|---:|---:|
| Hero headline | 48–60 / 32–38px | Serif 400–600 | 1.12–1.22 |
| Page/case title | 44–54 / 30–36px | Serif 400–600 | 1.15–1.25 |
| Section heading | 26–32 / 23–28px | Serif 400–600 | 1.2–1.3 |
| Project title | 23–28 / 21–25px | Serif 400–600 or Sans 600 | 1.2–1.35 |
| Body/long reading | 16–18 / 16–17px | Sans 400 | 1.5–1.7 |
| Meta/nav/controls | 14–16 / 14–16px | Sans 500–600 | 1.35–1.5 |

**[R]** Avoid all-caps eyebrow labels repeated before otherwise identical headings. Limit line width for narrative to ~60–75 Latin characters when practical; use language-aware wrapping, `overflow-wrap` only where needed, proper Japanese line-breaking and avoid `white-space: nowrap` on content names.

## Palette and visual tokens [R, estimates]

The mockups establish *relationships*, not color-managed sampled tokens. The following are **candidate** values; adjust using real WCAG contrast testing and screenshots:

| Use | Candidate HEX |
|---|---|
| Page canvas, warm ivory | `#F7F6F2` |
| Content surface | `#FEFDFC` |
| Main ink (blue-black) | `#172332` |
| Secondary readable text | `#4E5661` |
| Forest action/selected control | `#304A35` |
| Selected row neutral sage | `#EAEFE8` |
| Noninteractive divider | `#D7D9D2` |
| Strong focus outline | `#193E72` (check against adjacent backgrounds) |

Text must meet WCAG 2.2 AA: normal text contrast ≥4.5:1, large text ≥3:1; non-text interactive boundaries/indicators and focus states ≥3:1 where applicable. Decorative hairlines may be lighter, but **not** the sole means to identify controls. Check both English and Japanese font rendering rather than assuming color values ensure accessibility. Green selection needs another cue (e.g., `aria-current`/aria-selected and distinct typography), not hue alone.

## Images and media

**[A]** Project screenshots are **evidence**: use actual image sources validated in repository, captions/alt reflecting what truly appears, browser frame only if useful, intrinsic width/height, and never upscale raster screenshots above their natural pixels. `object-fit: contain` for UI evidence, preserve aspect ratio. Prefer media grouped near the relevant claim. If missing, omit, recomposing into readable prose without invented substitute.

**[V/R]** Nature/Japan images in generated hero are **decorative composition suggestions only**, neither required nor proof of license. If a properly licensed source is not present, omit or substitute a neutral CSS treatment rather than introducing an unrelated stock photograph. No bitmap UI controls or rasterized text. Prefer SVG/HTML/CSS for simple arrows (only where functionality actually requires), focus rings and dividers.

## Navigation and controls

**[A]** Header includes names, internal links, GitHub then LinkedIn, a visible animated selected-state EN/JP control, **compact presentation select** listing Editorial, Engineer, Digital, Chronicle, Product. Mobile: navigation menu, **language above presentation**, no job-title duplication. Internal navigation same tab; external web profiles new tab; email native `mailto:`.

**[R]** Treat presentation select as a native `<select>` if supported by existing shared controls; it is more reliable than a row of five theme buttons. Animate language selection via a small sliding **indicator** only if state, semantics and focus remain apparent without animation. Persist mode and language via established site mechanisms. Initialize the chosen mode without a visible incorrect-theme flash; editorial remains default when no valid saved preference exists. Don't invent settings keys, URL schemes or routing APIs in this document.

## Product-specific interaction character

**[R]** Stable panel, informative emphasis: project selection changes preview content in place; concise opacity shift/short position adjustment (<~8px) may affirm selection but must not conceal content or change tab order. A disclosure opens engineering detail without interrupting reading. Theme morph uses matching semantic modules only if the site already supports them; Product's project list should correspond to the other modes' project entries, and Product's detail heading to their detail heading. Never make motion a prerequisite for reading.

## Rejected patterns / drift guardrails

**[X]** Repeated arrow suffixes on links/buttons; numbering before ordinary section/project titles; decorative pill status labels and focus tags; green left borders on every card; icon next to every heading; gratuitous layered cards/roundings; oversized empty hero; charts/telemetry/customer metrics; fake screenshot screens; generic gradients; ornamental Japanese text; five large desktop theme tabs; large desktop navigation replicated across narrow phones; Chronicle's horizontal contained reading; Digital's image/card expansion; Engineer's scan gimmick; unreadable small text; hover-only information.

**[R]** During visual review, audit *every* border, radius, arrow, icon, overline and hover effect: delete if it conveys neither hierarchy, state, accessibility nor a genuine affordance.

## Outstanding decisions

1. **[O]** Verify actual repository project content, case-study sections, screenshots, external URLs and contribution credits before content mapping; images contain unverified example text.
2. **[O]** Choose exact licensed font availability and measure Latin/JP wraps; candidates above are not final typography approval.
3. **[O]** Determine whether a homepage selected project should follow a currently existing pattern (selection + explicit case-study link) or navigate on row activation. Avoid ambiguous nested interaction.
4. **[O]** Decide whether decorative hero imagery has suitable approved provenance; no licensing assumptions.
5. **[O]** Finalize dedicated Work/index, full Contact, tablet and 320px layouts after first working implementation; no approved visual assets exist for those exact views.
6. **[O]** Inspect existing shared language/theme persistence, routing, disclosure, gallery, and morph semantics before adjusting anything.

