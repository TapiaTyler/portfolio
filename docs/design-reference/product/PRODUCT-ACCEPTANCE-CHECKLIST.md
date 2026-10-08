# Product presentation — acceptance checklist

**Target:** WCAG 2.2 AA; working Lighthouse goals **Performance ≥90**, **Accessibility ≥95**, **Best Practices ≥95**, **SEO ≥95**. Automated audits are **necessary signals, not proof of full WCAG conformance**. Include manual keyboard, screen-reader, touch and visual review. **[A]** explicit requirement or accepted design, **[R]** recommended verification, **[O]** needs source/owner inspection.

**Review method [R]:** record desktop/phone screenshots, reproduction steps, browser/device, actual content fixture, pass/fail, and links to issues. Compare against reference *hierarchy and visual rhythm*, not 1:1 image pixels or generated fictitious text. Perform checks on Product **and regression spot-check** the other four modes.

## Visual fidelity and composition

- [ ] **[A]** Product is registered as fifth mode; default remains `editorial`, and existing Editorial/Engineer/Digital/Chronicle remain navigable and meaningfully unchanged.
- [ ] **[A]** Real page hierarchy/interaction differ from other compositions; not just accent/typography replacement on Editorial markup.
- [ ] **[A/V]** Refined Decision Canvas primary reference governs ivory/ink/forest-green relationship, flat list, selected project preview, and About/Practice/Lab/Contact rhythm. Original Concept 2 only secondary.
- [ ] **[A]** No numbered section/title decorations, trailing arrows on routine links/buttons, repeated colored left borders, gratuitous pills/tag clouds, generic gradient blobs or nested rounded-card grids.
- [ ] **[A]** Compact presentation select, not five top-bar theme tabs (even though an exploratory mockup shows them).
- [ ] **[R]** Sections with no data have neither empty frames nor rigid blank gaps. Decorative media does not dominate verified projects.
- [ ] **[R]** Borders, shadows and icons each have visible semantic/interaction rationale, not template repetition.
- [ ] **[O]** Owner signs off on proposed font pair, selected-state treatment and approximate spacing after actual browser screenshots.

## Content preservation / routes / truth

- [ ] **[A]** Three published projects appear in order: Nihonest (active development), Portfolio presentation system (active development), Japan Travel Planner (complete).
- [ ] **[A]** Each project's title, description, status, ownership/attribution, canonical page URL, source/demo links and publication state match existing verified project source; theme never rewrites them.
- [ ] **[A]** Case study in visible order: Problem, What was built, Key decisions, Architecture, optional Challenge, **one grouped** Engineering details, Result. No invented section content to fill empty design boxes.
- [ ] **[A]** No made-up metrics, growth charts, users, testimonials, contribution percentages, capabilities or outcomes; generated case-study prose/images are not accepted as factual sources.
- [ ] **[A]** Contact exact email `tapiatylert@gmail.com`; GitHub displayed **before** LinkedIn; names themselves link without duplicate `Visit` controls.
- [ ] **[A]** English résumé, Japanese résumé, Japanese CV each show separate PDF and Word pending status, with **zero** fake href/download actions until files exist.
- [ ] **[A]** All actual existing project/internal destinations preserved; internal stays same tab, external web opens new tab, `mailto:` native, local document files once real remain ordinary links.
- [ ] **[A]** English source copy and optional *reviewed* Japanese fields; missing JP fields fall back to corresponding English, not empty/auto-invented translations.
- [ ] **[R]** Document title, meta description, canonical, robots, OG and structured data semantics remain suitable; theme choice does not fork SEO identity or orphan canonical pages.

## Responsive matrices

Capture **actual browser screenshots**, not resized desktop renders. Check navigation open/closed, selected project, case-study detail, Contact/resource slots and missing-media variants.

| Viewport | Pass criteria |
|---|---|
| **1440px desktop [A]** | Work list + right preview legible with useful width for both; no horizontal overflow; compact header select; detail narrative and support media balanced; page not dominated by empty hero |
| **~1024px/tablet [R]** | Navigation/control layout fits or transitions to menu; list/preview may collapse where needed; headings/metadata don't collide; no extremely narrow prose column |
| **~768px tablet [R]** | Natural single reading column or well-proportioned stacked composition; detail media in flow; real anchors remain reachable |
| **390px phone [A]** | Real ~390px CSS width: one-column vertical scroll; phone header shows identity/menu only (no repeated job title); in menu EN/JP **above** presentation; comfortable reading and controls |
| **320px narrow [A]** | No document-level horizontal scroll, trapped labels, clipped title, oversized select or overlapping navigation; long Japanese name and email wrap; pending-format slots break into legible rows |

- [ ] **[A]** Long project title (including 2–3-line cases) does not overlap status, image or link at 1440/390/320.
- [ ] **[A]** One-image, many-image and no-cover-image projects display without broken frames or stock substitutions.
- [ ] **[A]** Missing optional Challenge, focus item, gallery, external source URL and supplemental metadata do not create empty headings, dividers, controls or whitespace traps.
- [ ] **[A]** Evidence screenshot renders with correct aspect ratio; never stretched or upscaled beyond source pixels; any full-resolution view is optional and truthful.
- [ ] **[A]** English and future Japanese headings, status strings, navigation names, captions, email and URLs wrap without clipping; verify Japanese line-breaking, middle dots and kanji glyphs.
- [ ] **[R]** Orientation changes/zoom at 200% (and text-only resize when relevant) retain functionality and readable content without losing fields.

## Keyboard / accessibility / semantics

- [ ] **[A]** Logical source/AT reading order matches presented narrative even when desktop CSS uses list/preview and dual detail columns.
- [ ] **[A]** Distinct, visible focus for every keyboard-reachable item; ring/adjacent contrast tested and not suppressed by backgrounds, sticky header or overflow clips.
- [ ] **[A]** All links, menu, EN/JP, mode select, project selection, Engineering details, copy button, and any lightbox usable with keyboard/touch.
- [ ] **[A]** Essential information and case-study links available without hover. Hover/focus/pressed/selected/disabled states have meaningful consistent treatment.
- [ ] **[A]** Color contrast follows WCAG 2.2 AA: normal text ≥4.5:1, large text ≥3:1, applicable UI control and focus indicators ≥3:1. Audit state combinations, not only default canvas.
- [ ] **[A]** Touch targets meet WCAG 2.2 AA minimum-target requirements (including exception/spacing provisions); aim for ~44×44 CSS px when practical. Two cramped 20px targets beside each other do not pass by appearance alone.
- [ ] **[R]** Check Focus Not Obscured (Minimum), dragging alternatives if any, consistent help, and accessible authentication patterns if a shared shell introduces them; don't claim automated completeness.
- [ ] **[R]** Landmark structure, one meaningful H1, correct case-study heading hierarchy, keyboard skip link, descriptive link names and programmatically indicated page/menu/selection states.
- [ ] **[R]** Selected preview does not duplicate its entire content in assistive output without useful context; status conveyed in text, not colored dot alone.
- [ ] **[R]** Tooltip `Copy` shown on hover/focus, button has independent accessible name; successful copy feedback only after resolved clipboard action, with screen-reader announcement.
- [ ] **[R]** Open mobile menu and optional lightbox support Escape and correct focus management according to whether implemented as modal or nonmodal; test with screen reader.
- [ ] **[R]** Native grouped `<details>/<summary>` remains understandable and keyboard operable; does not unexpectedly contain another pseudo-disclosure for each spine section.
- [ ] **[R]** Manual passes with at least one screen reader/browser combination (e.g. NVDA + Chrome on Windows; optional VoiceOver + Safari) and keyboard-only route through homepage/detail/Contact.

## Motion and interaction behavior

- [ ] **[A]** OS reduced-motion preference removes or nearly eliminates selection transitions, menu entrance, theme morph and optional smooth-scroll; no loss of function/state.
- [ ] **[A]** Rapid select changes do not show stale project data, broken hybrid themes or missing focus.
- [ ] **[A]** EN/JP clearly indicates which language is active via a visible selected indicator **and** accessible semantics; per-field fallback works across page types.
- [ ] **[A]** Product mode is visible in compact presentation selector; no mode change rewrites project content or URLs.
- [ ] **[R]** No layout-jumping carousel or unnecessary image zoom; preview changes in place, with modest optional crossfade only.
- [ ] **[R]** Gallery is added only if actual evidence and accessible shared behavior exist; inline image works without gallery.

## Native behavior / JS off / browser history

- [ ] **[A]** With JavaScript disabled, real internal/external anchors remain navigable, email remains readable/mailto-capable, and native Engineering details can open where present. Note inherited constraints in shared theme/locale switching rather than pretending they are solved.
- [ ] **[A]** Browser back/forward returns to expected route and correct content; direct project URLs reload; fragment navigation (if offered) reaches unobscured headings.
- [ ] **[A]** Theme persistence follows existing site convention, with **no flash of wrong mode** on initial render/hydration, and editorial as fallback default.
- [ ] **[R]** Theme switching continuity associates same semantic module/project across modes where supported, not unrelated screenshot containers; disabling animation has zero functional cost.
- [ ] **[R]** No link is `href="#"` merely to resemble a button. No fake disabled résumé downloads, fictional CTA endpoints or client-only critical navigation.
- [ ] **[O]** If preexisting router cannot honor desired no-JS language/theme switching, document limitation and request review before architecting a replacement.

## Performance and delivery

- [ ] **[A]** On representative mobile and desktop runs, working Lighthouse targets are **Performance ≥90** and **Accessibility, Best Practices, SEO ≥95** (record measured conditions and variance). Targets are not acceptance proof of WCAG 2.2 AA.
- [ ] **[A]** Do **not** downgrade image readability, visible content, fonts or responsiveness, or conspicuously defer small useful elements to chase trivial score gains.
- [ ] **[R]** Product-only heavy media/fonts/assets are loaded conditionally as the site's architecture permits; switching to another mode does not eagerly download every Product decorative resource.
- [ ] **[R]** Real screenshot sources are appropriately sized and compressed, with dimensions/aspect ratio preventing CLS; consider AVIF/WebP for photos, lossless/PNG if UI lettering demands it; inline evidence no larger than source resolution.
- [ ] **[R]** Proper loading priority for above-fold meaningful media, lazy-loading for truly below-fold images; avoid delays visible to users. Confirm performance at slow/mobile throttling without animation masking content.
- [ ] **[R]** Ensure no new layout shift from font fallback (particularly Japanese), no long main-thread selection effect, and no hydration mismatch from persisted theme.
- [ ] **[R]** Check no dev-only mockup PNGs are imported into deployed bundle. The five references are handoff documentation, not client visual assets.

## Regression and owner-review gates

- [ ] **[A]** Verify factual invariance and functional navigation in all five modes for the same project; no theme-specific disappearance of required case-study content.
- [ ] **[R]** Regression test invalid/unknown persisted presentation and language values; return to established fallback without blank screen.
- [ ] **[R]** Test with very long metadata lists, two real screenshots, one screenshot, none, and missing Challenge; no phantom layout placeholders.
- [ ] **[O]** Owner reviews first working 1440px homepage, 390px homepage (menu expanded and closed), desktop and phone Travel Planner detail, Work/index and Contact pending files.
- [ ] **[O]** Owner reviews any new hero photo/art, the candidate fonts, project selection vs navigation behavior, and the final mobile menu model.
- [ ] **[A]** Update repository roadmap and decision log with Product addition, approved visual rules, rejected patterns, source checks and remaining open decisions.
