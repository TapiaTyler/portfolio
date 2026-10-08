# Product presentation — interaction specification

This document is behavioral guidance, not code or a claim about existing components. **[A]** means explicit requirement/accepted direction, **[R]** proposed default for implementation, and **[O]** depends on actual portfolio conventions. Preserve native/shared behaviors whenever they already satisfy this contract. All animations are optional enhancements: no functionality may depend on timing or hover.

## Shared motion and state language [R]

- **Personality:** calm confirmation, stable viewport, preserved reading context. Product is *not* Editorial page-turn, Engineer record scan, Digital image expansion or Chronicle chapter glow.
- **Baseline timing:** state/color 100–150ms; small panel content transition 150–220ms; menu entrance 160–220ms; reduced motion ≈0ms or instant replacement. Proposed easing: `cubic-bezier(.2, .7, .2, 1)` for entries, `ease-out` for simple fades. These are candidates, not measured animations.
- **Allowed transforms:** at most 4–8px translation for a contained panel during selection; no scaling important text, no persistent parallax, no scroll hijack.
- **Focus:** a 2px or stronger highly contrasting visible ring/outline (test ≥3:1 non-text contrast), never removed by `outline: none` without equivalent; selected state includes semantic label/selection state, not color alone.
- **Press feedback:** immediate but brief color/elevation change; preserve hit target throughout. Do not delay real navigation to finish an exit animation.
- **Interruptibility:** new selection cancels an in-progress transition and lands on the newest valid state. Keep content and focus logical even if transitions are cancelled.
- **Touch:** no essential `:hover` affordances. **Recommended** comfortable targets ~44×44 CSS px where possible; never fail WCAG 2.2 AA minimum target-size rules by using tightly packed links.
- **Progressive enhancement:** use real anchors, buttons, `<select>`, and `<details>/<summary>` where applicable. CSS transitions and client handlers may improve them, not replace the accessible baseline.

## Header navigation [A/R]

**Purpose:** reach Work, About, Lab, Contact; external GitHub and LinkedIn in that order. **Trigger:** activate a link. **Initial:** current route identifiable by text emphasis plus underline/other visual cue; no numeric section prefix. **Hover:** simple underline/background change, not arrow appearance. **Focus:** conspicuous focus ring. **Pressed:** immediate subtle foreground/background shift; do not override native activation. **Selected:** current page indicated by `aria-current="page"` when appropriate, independent of color. **Disabled:** not applicable to real links; missing routes must not be rendered as working links.

**Motion:** underline or color change ~120ms; no page wipe. **Interrupted input:** latest navigation accepted under browser/router semantics; no artificially locked menu. **Touch/keyboard:** native anchor activation by touch/click/Enter, Tab order matches visual order. **Reduced motion:** instant state change. **No JS:** internal anchors navigate normally in same tab, external destinations open separately as required; browser history works.

## Mobile menu [A/R]

**Purpose:** expose all main links and settings without crowding 390/320px header. **Trigger:** one clearly labeled Menu button (`aria-expanded`, `aria-controls` or semantically equivalent); second activation and Escape close. **Initial:** closed, identity `Tyler Tetsuo Tapia` and `テイラー・鉄男・タピア` plus menu button; **do not repeat job title**. **Hover:** subtle only. **Focus:** ring on trigger/items. **Pressed:** normal button response. **Selected/open:** unmistakable close affordance, menu panel visible, active page text marked. **Disabled:** do not disable the menu without a valid alternate nav.

**Content order [A]:** Work, About, Lab, Contact → GitHub, LinkedIn → **Language EN/JP** → **Presentation one compact select**. Mobile mockup illustrates a five-tab selector: **reject that incidental portrayal**. Don't display the full desktop link row in the phone header.

**Motion [R]:** menu overlay/in-flow panel opacity 0→1 and Y +4→0px, 160–220ms; no animated navigation through whole screen. **Interruption:** rapid toggles settle cleanly; closing on route change returns focus only when relevant. If modal, trap focus and lock background according to existing shared dialog convention; if nonmodal disclosure, don't invent modal keyboard expectations. **Touch/keyboard:** Escape and button work; focus management tested. **Reduced motion:** instant. **No JS:** render an accessible fallback menu with usable native disclosure/visible links or server-rendered navigation; do not rely on an inert hamburger.

## EN / JP language control [A/R]

**Purpose:** choose rendered language while maintaining per-field English fallback for missing reviewed Japanese. **Trigger:** actual select/button/radio-style selection. **Initial:** current/remembered language visibly indicated. **Hover:** pointer highlighting, no translations on hover. **Focus:** ring around selection control. **Pressed:** immediate acknowledgment. **Selected:** high-contrast sliding indicator under the selected label, plus programmatic state (`checked`, `aria-pressed` for toggles, or native select value); accessible name `Language`. **Disabled:** only when a choice truly cannot be selected, never silently gray out JP because a particular field has English fallback.

**Motion [R]:** indicator translates within control, ~160–200ms ease-out; text/copy switches without animated layout distortion. **Interruption:** rapid toggles commit most recent explicit choice; focus stays on control; do not queue multiple slides. **Touch/keyboard:** minimum usable target, Left/Right and Space/Enter if implemented as radio group, or native select keys if `<select>`; maintain language of translated strings in markup where appropriate. **Reduced motion:** indicator jumps. **No JS:** prefer existing server/native locale links with fully functional URLs or forms. **[O]** Confirm actual language routing/persistence before implementing; never invent locale paths.

## Presentation selector [A/R]

**Purpose:** choose `editorial`, `engineer`, `digital`, `chronicle`, `product`; default `editorial`. **Trigger:** select a mode from **one compact selector**, not five large tabs. **Initial:** shows current valid choice; on first visit fallback editorial. **Hover/focus/pressed:** native/select equivalent, discernible focus. **Selected:** selection remains visible after close, with selected option programmatically conveyed. **Disabled:** only invalid/unavailable option, not fabricated; Product not presumed disabled.

**Motion:** selector itself need not animate; successful mode change may participate in existing semantic-module morph (below). **Interruption:** last valid choice wins; prevent partial mixed layouts if rapidly changed. **Touch/keyboard:** native `<select>` recommended unless existing accessible shared selector; arrow keys/Enter/Space should work according to control model. **Reduced motion:** instantaneous composition change. **No JS:** reuse existing server URL/form navigation behavior if supported; don't create dead control. **[O]** Persistence and page URL contract must be read from repo, including theme-first-paint behavior.

## Project discovery/selection on homepage and Work [A/R/O]

**Purpose:** compare three real projects efficiently while retaining a contextual desktop preview. **Trigger:** a distinct project selection action. **Initial [R]:** first published project, **Nihonest**, selected on wide screens, unless existing route/history state validly selects another; list order fixed. **Hover:** light surface emphasis/cursor only where row genuinely interactive. **Focus:** visible outline around selection target. **Pressed:** subtle shade. **Selected:** quiet sage fill + stronger name weight/visible `Selected` context; semantic `aria-selected` if using tabs/listbox, or `aria-pressed` if a toggle button model is used. Do **not** apply `aria-selected` to arbitrary links. **Disabled:** an unavailable project may still be displayed faithfully, but a non-published case study must not acquire a fake working URL.

**Motion [R]:** selected-row background ~120ms; preview image/text fade 120–180ms, with optional up-to-4px entrance within fixed location. Do not crossfade from an unrelated image to fake proof. Preserve image aspect ratio and reserve enough media height to avoid major shifts, while allowing long real copy to grow. **Interruption:** most recent selection wins, focus remains on selected item, stale content never overwrites new selection. **Touch/keyboard:** give selection targets distinct names and Enter/Space as appropriate. Do **not** overload one click both to select a preview and navigate to case study. Offer separate, clearly labeled `Read case study` link; if entire row is a conventional link instead, no transient selection panel is mandatory. **Phone:** stacked summaries with ordinary case-study links; no sticky offscreen detail rail. **Reduced motion:** instant content update. **No JS:** all project names and links remain server-rendered, summaries remain readable; preview may default to first project or disappear in favor of a complete static list.

**[O]** Determine interaction model from existing architecture, and whether selection state belongs in URL. Don't generate new `/work/...` routes or query params without inspecting canonical routes. Preserve back/forward if selection is URL state; otherwise don't pollute history for every hover or selection.

## Project navigation [A/R]

**Purpose:** open legitimate case studies, projects, source/demo destinations as data permits. **Trigger:** real link activation. **Initial:** distinguish local case study link from external source/demo link by wording, not a repeated arrow glyph. **Hover/focus/pressed:** consistent text link states, focus ring and immediate activation. **Selected:** destination current page indicated by page heading/navigation, not status pill. **Disabled/unavailable:** omit unverified destination or render plain `Unavailable` text; no `href="#"`, fake disabled anchor or fabricated demo.

**Motion:** normal native/SPA route change; no motion dependency. **Interruption:** browser navigation wins. **Touch/keyboard:** anchors; visible destination labels. **Reduced motion:** no transition needed. **No JS:** regular `href` works; internal same tab, external web `target="_blank"` with appropriate `rel` protections. Email uses `mailto:`; downloadable docs use actual local file URLs once present.

## Section navigation [R/O]

**Purpose:** move to Work/About/Lab/Contact or within a long case study *if* existing site uses section anchors. **Trigger:** section navigation link. **Initial/selected:** current location clear; **hover/focus/pressed:** native link treatment. **Disabled:** omit links to absent optional sections. **Motion:** prefer default browser scroll; optional smooth scroll only when reduced motion is not requested, while ensuring focus and history updates. **Interruption:** user wheel/touch/keyboard scroll interrupts animated movement. **Touch/keyboard:** real fragment links with heading offsets under sticky header, not fake scrollspy-only buttons. **Reduced motion:** instant jump. **No JS:** anchors should still reach headings. **[O]** An in-page sticky table of contents is **not required** by mockups; don't add one just to fill space.

## Engineering details disclosure [A/R]

**Purpose:** show deep technical discussion without overwhelming case-study overview. **Trigger:** activate **one** grouped `Engineering details` summary. **Initial:** collapsed by default if substantive extra content exists; if no engineering details exist, omit rather than display inert disclosure. **Hover:** simple summary emphasis. **Focus:** visible focus ring around summary. **Pressed:** immediate. **Selected/open:** native expanded state visually clear and exposed to assistive tech. **Disabled:** not a state; omit if absent.

**Motion:** optional 120–180ms appearance of inner content if no clipping of keyboard focus/reading, but **native instantaneous `<details>` is preferred**; never animate fixed max-height that clips large content. **Interruption:** rapid open/close leaves correct exposed state. **Touch/keyboard:** `<details><summary>` allows pointer, Enter/Space and focus. **Reduced motion:** instant. **No JS:** native disclosure works by default. Entire engineering content is in a **single grouped region**; don't create nested unrelated accordions.

## Image gallery: entry and exit [R/O]

**Purpose:** inspect authentic project evidence at readable resolution *only if the existing shared site already offers a gallery/lightbox or evidence warrants one*. **Trigger:** labelled button/thumbnail activation; click image only if clearly expressed as expandable. **Initial:** in-flow image at natural aspect ratio; **hover:** light focusable affordance, not image enlargement; **focus:** obvious ring on thumbnail control. **Pressed:** standard. **Selected/open:** view in existing accessible modal/lightbox with image caption, Close control and image count **only when true**. **Disabled:** no link/lightbox if no suitable image, no fake gallery thumbnail.

**Motion [R]:** optional opacity in/out 120–180ms, no Digital-style expanding image flight. **Interruption:** Escape/close/route change exit promptly and restore focus to triggering control where it still exists; repeated opens ignored while open; next/previous only if multiple real images. **Touch/keyboard:** touch-close controls, swipe only as enhancement; keyboard Close, Escape and arrow keys if existing component supports these, focus managed according to modal semantics. **Reduced motion:** instant. **No JS:** image remains visible inline and may link directly to original file if desired; no fake interactive overlay. **[O]** Inspect gallery API and image rights; Product need not introduce gallery at all.

## Email copy and feedback [A/R]

**Purpose:** copy exactly `tapiatylert@gmail.com` without hiding the native email link. **Trigger:** adjacent **copy icon button**; tooltip text **`Copy`** on hover/focus. **Initial:** email as separate `mailto:` anchor, copy button with accessible name `Copy email address`. **Hover/focus:** tooltip `Copy`, visible ring. **Pressed:** immediate action. **Success:** feedback `Copied` (announced by polite live region) for short interval; avoid claiming success before clipboard confirmation. **Failure:** show `Unable to copy` or equivalent, preserve email text and native link. **Disabled:** only during truly unavailable action; ideally keep fallback selectable text.

**Motion:** tooltip/feedback fade ~100ms if applicable; no bouncing icon. **Interruption/repetition:** multiple clicks safely repeat; last completed result determines notice, no timer required for correctness. **Touch/keyboard:** button activated by tap/Enter/Space; mobile feedback cannot depend on hover; accessible name remains comprehensible. **Reduced motion:** instant. **No JS/clipboard API:** hide copy action if inoperable, leave text selectable and `mailto:` fully usable. **[O]** Follow existing clipboard utility, avoid inventing app toasts.

## Theme-switch morphing [A/R/O]

**Purpose:** preserve identity when changing composition, keeping matching semantic content recognizable across Product and four other modes. **Trigger:** confirmed presentation selection. **Initial:** fully valid existing mode. **Hover/focus/pressed:** all handled by selector. **Selected:** chosen mode; no mixture of mode structures or lost content. **Disabled:** no morph if reduced motion or API unavailable; direct replacement is still successful.

**Motion [R]:** where existing morph system supports shared semantic identity keys, map hero identity↔hero identity, project listing entry↔project listing entry, case-study heading↔case-study heading, media↔corresponding *same image*. Use subtle opacity/position/layout interpolation **only if existing mechanism already supports it**; target ~180–280ms, no forced crossfade of unrelated projects. **Interruption:** rapid switches cancel/reconcile prior transition; latest mode immediately owns state, focus returns to meaningful equivalent control or location. **Touch/keyboard:** select works identically for all. **Reduced motion:** no shared element flight or layout morph; immediate DOM/state update. **No JS:** theme can change via existing server-supported link/form/URL where available; if server currently requires JS to switch, retain readable editorial fallback and record that limitation, don't conceal it.

**[O]** Inspect actual continuity mechanism before specifying keyed identities, client APIs, persistence and routing. Morph must never rewrite content, URLs or SEO canonical identity.

## Browser back/forward, hash links and theme persistence [A/R/O]

**Purpose:** navigation history should make sense after page, locale or theme changes. **Trigger:** normal link/select browser input and Popstate/history navigation. **Initial:** server/page resolves canonical route, valid persisted language/mode, with editorial default if unspecified. **Hover/focus/pressed/selected:** follow respective controls. **Disabled:** no invalid theme or locale states. **Motion:** avoid replaying entrance sequences on every history restoration; honor browser scroll restoration and reduced-motion. **Interruption:** back/forward should cancel stale selection transitions and restore correct route/mode state. **Touch/keyboard:** standard browser controls must work.

**No JS:** internal href/history/fragment links must remain usable; theme/language fallback depends on repo's existing SSR strategy. **[O]** Inspect whether changes push, replace or omit history entries; do not assume hash/query routes or localStorage keys. Prefer not to add a history entry for ephemeral visual selection unless sharable link semantics already exist. Validate direct loads, reload, back/forward, and multi-theme deep links against actual router.

## Explicitly disallowed interaction drift [A/X]

No selection by hover only; no hover-revealed critical case-study links; no slide-to-advance chapter panels; no fake disabled download buttons; no autoplay carousel used to show project availability; no multiple per-section engineering disclosures; no visual-only language switch; no arrows appended to each CTA; no animated content that becomes inaccessible if JS fails; no decorative cursor spotlight or image zoom expansion.

## Verification scenarios [R]

1. Keyboard-only: tab header and menu, change language/mode, select project and open true case study, open/close disclosure, copy email; test Escape in menu/lightbox when applicable.
2. Touch 390/320: open menu, locate language *above* presentation, select modes with no overflow, activate every project link without hover.
3. Reduced motion enabled: no swept panels, no flicker, full content present at every step.
4. Without client JS: navigation still useful, project list readable, disclosure native, email address selectable; document any gap inherited from shared site infrastructure.
5. Rapid state changes: EN→JP→EN, Project 1→3→2, Product→Digital→Product; final UI/URL/readout consistent with last action.
6. Back/forward after navigating between project details and Work: correct content, active nav/focus semantics, no phantom pages or modified links.
