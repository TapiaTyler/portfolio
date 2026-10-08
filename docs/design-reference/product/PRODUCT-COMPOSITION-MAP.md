# Product presentation — semantic composition map

This is a **conceptual map**, not a list of current repository component names, interfaces, file paths, CMS fields or URLs. The implementation agent must discover and reuse actual semantic structures. **[A]** approved content/behavior; **[R]** proposed composition; **[O]** verify actual content model.

## Content and invariants

**[A]** CONTENT → SEMANTIC COMPONENTS → COMPOSITION → THEME TOKENS → INTERACTION / MOTION. Presentation never mutates factual data, project availability/publication status, case-study ownership, canonical URLs, outbound links, SEO identity, or the accessible order of information. Theme-specific prose like “green preview panel” may appear in composition definitions, **not** in project records.

**[A]** Published display order:

1. **Nihonest** — **Active development**. Bilingual Japan-focused editorial web application; source-linked content, route-aware reading journeys, optional accounts, editorial tooling. Focus: content architecture, localization, product navigation, editorial workflows.
2. **Portfolio presentation system** — **Active development**. One shared content system with Editorial, Engineer, Digital, Chronicle and Product under design. Focus: content architecture, theme morphing, navigation transitions, accessibility, iterative design.
3. **Japan Travel Planner** — **Complete**. Full-stack application organizing itineraries and reusable planning templates with English/Japanese workflows. Focus: itinerary planning, responsive layouts, localization, account/security boundaries.

**[O]** Reconcile provisional copy above with actual repository source of truth; never replace more precise verified project information with image-generated prose. Don't infer “Product shipped” until implemented.

## Semantic content → Product placement

| Semantic role / content | Product placement and emphasis | Required / optional | Sparse fallback | Potential theme-morph correspondence | Accessibility and reading order |
|---|---|---|---|---|---|
| Site identity / global nav [A] | Slim header with full and Japanese names, internal links, GitHub, LinkedIn, language + compact mode selector | Site identity and essential destinations required; secondary layout optional | Wrap/stack nav in phone menu | Identity ↔ identity; main nav ↔ main nav in other compositions | Correct landmark, unique accessible control labels; logical keyboard order; no duplicate mobile job title |
| Hero / professional introduction [A] | Concise, prominent headline, factually grounded bio, links to Work/About; decorative art subordinate [R] | Intro required, image optional | Text-only split becomes full-width | Intro heading ↔ mode hero heading; associated link ↔ same destination | H1 hierarchy established per route; decorative image hidden from AT; headings precede work |
| Project feature (summary) [A] | Main scan list; active selection opens right preview at desktop [A/V] | Name, source summary and correct status required; image optional | Expand text across row, preserve link, omit image/preview | Project summary ↔ same project feature in Editorial/Engineer/Digital/Chronicle | Project headings in source order, actual links reachable without preview, no essential hover info |
| Project metadata [A] | Plain line under title or compact row: genuine development/publication state and relevant focus areas | Actual status required for three listed projects; extra metadata optional | Omit missing fields and separators; no `N/A` pill | Project meta ↔ project meta | Text distinguishes status; no color-only meaning; screen readers identify pairs if tabular |
| Project URLs / source/demo links [A] | Clear `Read case study` link and other links only if data provides them | Essential existing URLs required; source/demo optional | Omit unavailable links entirely; never create `#` destination | Same URL/link ↔ equivalent link across modes | Real href; external sites new tab + secure rel; internal site same tab; describe destination |
| Project preview media [R] | In desktop right pane when selected, authentic image near short actual overview | Optional | No-image preview is concise typography only, or panel collapses if nothing useful | Image ↔ identical project image when present across themes | Descriptive alt for evidence; avoid duplicated information if alt repeats adjacent caption; never upscale |
| Section heading [A] | Clear heading before each group; hierarchy driven by type/space rather than numbered overlines | Required for present sections | Omit heading entirely if optional section absent | Heading ↔ same semantic section heading | True heading levels; linkable IDs if existing; no skipped hierarchy solely for typography |
| Problem [A] | Start of project narrative, high prominence beneath overview | Required within published case-study spine, actual content source authoritative | No placeholder invention; flag missing required source content for owner review | Problem ↔ Problem | Read before solutions; maintain meaningful heading and paragraph structure |
| What was built [A] | Directly follows Problem, concise overview plus verified workflow | Required for published case study | No made-up workflows; surface missing content to editor | Built ↔ built | Semantic heading; figure placement near relevant statements |
| Key decisions [A] | Real decisions, tradeoffs and consequences; stacked text or modest columns depending on length [R] | Spine section required; individual items driven by content | One decision takes full width; if data missing, flag editorial gap, not dummy grid entries | Decisions ↔ decisions / implementation rationale | No fictitious counts; layout reflows into DOM-linear reading; meaningful headings per item |
| Architecture [A] | Follows decisions; text-led with optional truthful technical media | Required as spine | Full-width prose, avoid empty schema diagram | Architecture ↔ architecture | Diagrams have text equivalents; code/long URLs scroll internally as needed, not whole page |
| Challenge [A] | Between Architecture and disclosure when project source includes it | Optional | **Omit** when absent, including nav item and gap | Challenge ↔ challenge | No empty landmark/heading and no false impression challenge was documented |
| Technical detail [A] | One grouped `Engineering details` disclosure in case study | Optional substance but one disclosure grouping if present | Omit disclosure when no actual technical details | Deep technical facts ↔ other modes' technical module(s) | Native `<details>` preferred; keyboard/AT open state; no nested fake subaccordions |
| Result [A] | Last major case-study narrative section with truthful deliverable/state | Required; no invented metrics | Short actual statement remains valid, don't invent impact card | Result ↔ result | Result heading follows disclosure; avoid communicating completion solely through color |
| Media frame [A/R] | Actual screenshots near substantiated workflows, hero or rail; subdued outline if needed | Optional, cannot become a content prerequisite | Text reflows; no placeholder/stock/fabricated UI | Same screenshot ↔ same image source across themes | `img` intrinsic sizes, `object-fit: contain`; alt/caption; modal optional only if shared and accessible |
| About preview [A] | After Work on homepage, factual short bio with single link | Text/route required per existing homepage; photo optional | Text-only | About teaser ↔ About teaser | One valid link, accessible heading, no repetition for visual columns |
| Areas of practice [A] | Text-first practice list/rows | Existing genuine practice data required; icons optional | Only render known entries; avoid decorative placeholders | Practice list ↔ practice list | Actual list markup when list, not flat icon wallpaper |
| Lab empty catalogue [A] | Truthful empty message plus Lab navigation | Empty status required while catalogue empty | `No explorations published yet.`; no fake card | Lab placeholder ↔ Lab placeholder | Informative plain text; no misleading action |
| Contact methods [A] | Contact area/page: mailto email + adjacent copy, GitHub then LinkedIn each title link | Email and profiles required | Copy button disappears gracefully if JS/clipboard not usable; mailto remains | Contact ↔ Contact, same real destinations | Native link/button semantics, tooltip not sole accessible label; externals new tab |
| Document resources [A] | English résumé, Japanese résumé, Japanese CV; PDF and Word status slots | Labels and reserved slots required, files unavailable | Show `Pending` as non-interactive text for each format | Resources ↔ same resources in other modes | No fake anchors/download buttons; future link only when real file exists |
| Error / not-found [R] | Shared site framing, concise error and real return navigation | Behavior required where page exists; copy flexible | Text and one functional navigation link | Not-found ↔ corresponding error state | Proper page title/H1, meaningful recovery link; no theme-dependent empty error screen |

## Layers and ownership boundary

**Shared factual content [A]:** title, slug/canonical route, content paragraphs, publication status, authorship/credit, project links, asset references/captions, localized strings, optional fields, project order, SEO metadata. These values must come from the existing source of truth. Optional reviewed Japanese per field, English fallback **per field**, not per page.

**Semantic components [A/R]:** roles such as SiteIdentity, ProjectSummary, ProjectStatus, ProjectCaseStudy, CaseSection, ProjectMedia, ContactMethod, ResourceStatus. **These are conceptual descriptions, NOT exact names of code components.** Aim to preserve semantic identity and accessibility in each theme.

**Product composition [R]:** section order, feature-list/right-preview pairing, case-study narrative/optional media rail, text-first metadata, responsive stacking, spacing/grouping, image presence rules. A Product composition may reorganize DOM structures if factual and reading-order invariants hold.

**Theme tokens [R]:** canvas, ink, accent, selected surface, separators, font stacks/weights, spacing scale, radius, shadow and motion parameter values. Tokens must never determine whether a project is published, which URL opens, or what its result claims.

**Interaction layer [R]:** selection, focus/pressed state, menu, language mode indicator, native disclosure, optional lightbox and existing theme morph. All real navigation works without animation and should remain compatible with native links. Actual APIs/state stores must be discovered.

## Responsive semantic mapping

- **Desktop:** one source list of three projects, one *visual* selected preview. Avoid duplicate meaningful text in AT tree if summary and preview merely echo each other; give preview a descriptive heading/context or make redundant parts appropriately nonduplicative.
- **Tablet:** when the side preview cannot fit comfortably, move it after the list or omit it while preserving direct case-study links. Don't leave a narrow two-column mini-dashboard.
- **Phone:** project features form an ordinary, independently actionable vertical sequence. A selected preview is unnecessary when it would merely reprint the preceding summary. Ensure evidence shown only once unless its later reuse has a different explanatory purpose.
- **No image:** collapse media span, preserve text width and margins. No layout should require a cover or any optional challenge/decision count.
- **Long/Japanese:** flexible grid min widths, natural Japanese breaking and per-field fallback; navigation/select labels must survive 320px without overflow.

## Practical assembly examples (conceptual, not code)

**Homepage:** Identity/Nav → Intro → `Selected Work` with three ProjectSummary records + one optional ProductPreview panel → AboutPreview → PracticeList → LabEmpty → ContactInvitation → Footer.

**Work/index:** Identity/Nav → `Work` heading and simple explanatory copy (if existing) → three real ProjectSummary entries + desktop ProductPreview → normal footer. No generated filtering, sorting, charts or fictitious activity.

**Travel Planner detail:** Identity/Nav → ProjectHeading/Status/Abstract → OptionalMedia → Problem → Built → Decisions → Architecture → [Challenge if true] → [one EngineeringDetails group if source exists] → Result → confirmed related links and footer.

**Contact:** Identity/Nav → Contact heading/introduction → EmailLink+CopyButton → GitHubLink → LinkedInLink → ResourceStatus rows (three resources, two formats each, currently pending) → Footer.

## Unresolved mapping questions [O]

1. How are theme compositions and semantic modules currently registered? Do **not** create parallel content repositories.
2. What source drives the list/detail project routes, publication status and bilingual content? What fields are truly optional?
3. Does the existing morph implementation identify semantic modules across route changes, only within a route, or not at all? Use only verified keys/APIs.
4. How are cases with zero images, image captions, and optional sections currently represented? Preserve their existing editorial semantics.
5. Does the existing Work page already have a comparable selection model? Avoid incompatible double navigation.
