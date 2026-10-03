# 17 — Decision Log

This records decisions made during planning.

Treat these as locked defaults unless intentionally revisited.

## D001 — Portfolio is a project, not only a container

**Decision:** The portfolio itself is a major portfolio project.

**Reason:** Its architecture demonstrates UI engineering, design systems, accessibility, performance, localization, and maintainability.

## D002 — Shared content, multiple interpretations

**Decision:** All launch themes use the same underlying project facts and case-study content.

**Reason:** The goal is multiple coherent design systems over one semantic product.

## D003 — Composition is separate from visual theme

**Decision:** Information organization is architecturally separate from visual tokens.

**Reason:** A skin system would not provide meaningful differentiation.

## D004 — Launch with three themes

**Decision:** V1 themes are:

- Editorial
- Engineer
- Digital

**Reason:** Together they demonstrate restraint, systems thinking, and expressive frontend work.

## D005 — Editorial is default

**Decision:** Editorial is the canonical/default experience.

**Reason:** It must work for recruiters who never use the switcher.

## D006 — Product and Graphic deferred

**Decision:** Product and Graphic are future additions.

**Reason:** They add value but should not delay launch.

## D007 — No forced schema completeness

**Decision:** Projects populate only relevant fields/blocks.

**Reason:** Backend, frontend, product, and experimental projects require different narratives.

## D008 — Block-based case studies

**Decision:** Major case studies use semantic structured blocks rather than one unrestricted article.

**Reason:** Themes need to reorganize and emphasize content safely.

## D009 — Hybrid typed data + MDX

**Decision:** Use typed data for structured facts/references and MDX/rich text for narrative where helpful.

**Reason:** Supports validation and presentation independence without making authoring too rigid.

## D010 — Locale-aware from the beginning

**Decision:** English and Japanese route architecture exists from initial implementation.

**Reason:** Japanese employers are a primary audience and later retrofit would be costlier.

## D011 — Partial Japanese is valid

**Decision:** Japanese translation may be summary/partial.

**Reason:** Full translation of every technical section should not block launch.

## D012 — No CMS/database for V1

**Decision:** Store content statically/in the repository.

**Reason:** No persistent application infrastructure is currently needed.

## D013 — Theme state is local

**Decision:** Persist theme locally; no account-based preference.

**Reason:** User accounts are unnecessary.

## D014 — Shareable theme query may be supported

**Decision:** A query such as `?style=engineer` is acceptable.

**Reason:** Useful for interviews/reviews while preserving canonical URLs.

## D015 — Digital uses progressive enhancement

**Decision:** Advanced effects are optional and dynamically loaded.

**Reason:** Default performance and accessibility must remain strong.

## D016 — WCAG 2.2 AA target

**Decision:** All themes target WCAG 2.2 AA.

**Reason:** Experimental presentation should not reduce usability.

## D017 — No scroll hijacking

**Decision:** Use normal browser scrolling.

**Reason:** Preserve control, accessibility, and predictability.

## D018 — Development comparison tools

**Decision:** Include:

- `/dev/design-system`
- `/dev/compositions`

**Reason:** Side-by-side refinement is essential to the project.

## D019 — No generic placeholders

**Decision:** Missing media causes intentional recomposition.

**Reason:** Generic placeholders weaken the design system.

## D020 — AI use is not hidden

**Decision:** The portfolio may explain AI-assisted implementation factually where relevant.

**Reason:** The goal is to communicate ownership, judgment, review, and architecture accurately rather than imply manual authorship that did not occur.

## D021 — Project discovery happens inside source repositories

**Decision:** Use the reusable discovery prompt with Codex/Claude in each project repository.

**Reason:** Agents can inspect real implementation and documentation there.

## D022 — Detailed content inventory is deferred

**Decision:** Do not lock detailed launch inventory now.

**Reason:** Project-specific repository discovery will provide higher-quality source material.

## D023 — Featured projects are not universally cards

**Decision:** Flagship work uses curated compositions.

**Reason:** Uniform cards undermine Editorial and the multi-composition concept.

## D024 — Prefer architecture diagrams over code screenshots

**Decision:** Use diagrams when explaining systems.

**Reason:** They communicate architecture faster and remain themeable.

## D025 — Themes do not change project identity

**Decision:** URLs, canonical identity, factual content, and project availability remain constant.

**Reason:** Themes are presentation modes, not separate products.

## D026 — Semantic fallback renderer required

**Decision:** A block without a specialized theme renderer uses a shared fallback.

**Reason:** Prevents theme incompleteness from breaking content and supports gradual extension.

## D027 — Public claims must be defensible

**Decision:** No fabricated metrics, impact, alternatives, or reflections.

**Reason:** Accuracy matters more than promotional language.

## D028 — Implementation-level visual details remain flexible

**Decision:** Exact fonts, colors, breakpoints, animation durations, and individual compositions may be refined during implementation.

**Reason:** The user explicitly wants room to refine layout/design while preserving the planned architecture and visual directions.

## D029 — Server-selected mode before paint

**Decision:** Use one persistent local preference cookie and render portfolio
routes per request. Select the theme tokens and one composition on the server;
update the preference through a validated native Server Action form.

**Reason:** Radically different compositions must be known before paint. This
keeps narrative rendering on the server, avoids shipping duplicate mode content
trees and avoids conflicting browser preference stores. It deliberately trades
full-page prerendering for consistent initial composition. Static assets and the
root redirect remain static; deployment requires a Next.js server runtime.

**Implementation:** See `THEME-COMPOSITION-INTEGRATION.md`. Confirm delivery costs
and performance during the performance/deployment pass. The optional style query
is deferred; three-mode visual completion remains separate from this foundation.

## D030 — Progressive theme-switch continuity

**Decision:** Animate semantic module snapshots with the browser View Transition
API around the existing server-selected composition commit. Use temporary scoped
identities, destination-specific timings and immediate reduced-motion/unsupported
fallbacks. Preserve the single cookie and native form contract from D029.

**Reason:** Different compositions replace or reorganize markup; visual continuity
must bridge those structures without duplicating accessible content or shifting
theme ownership into browser storage. Bound slow capture, preserve focus/reading
position and allow interruption. No heavy animation dependency is required.

**Implementation:** See `THEME-TRANSITIONS.md`. Entry/reveal and ambient motion
remain separate work; this decision covers presentation switching.

## D031 — Theme-specific route snapshot continuity

**Decision:** Extend progressive same-document snapshots around committed Next
navigation for Digital card-to-project expansion and Editorial directional page
turns. Derive turn direction/count from navigation order and hierarchy depth;
cap turns at three. Preserve normal URLs, native links and reduced-motion fallback.

**Reason:** Tyler requested route interactions that express each composition's
personality. Temporary snapshot identities bridge the server-rendered card/detail
structures without duplicating accessible content or introducing an animation
runtime. Bound capture/media waits and coordinate cancellation with theme switching.

**Implementation:** See `ROUTE-TRANSITIONS.md`. Development-only selected-project
previews permit review while the public inventory remains empty.

**Refinement, 2026-10-02:** Replace repeated Editorial content snapshots with one
continuous turn and staggered blank-sheet snapshots, preserving depth cues without
fetching intermediate pages. Add the requested Engineer record-change preview
using a brief content swap and cyan rule sweep. Both use the existing cancellation
and reduced-motion contract. See `ROUTE-TRANSITIONS.md`.

**Navigation coverage, 2026-10-02:** Tyler approved the refinements and requested
all internal links and browser history. Extend Digital with matching-card
contraction and a generic panel transition. Preserve the route controller across
locale-provider remounts only in the browser, and start history capture from early
Navigation API traversal events where available. Server state remains isolated,
native link semantics remain intact, and ordinary history is the fallback.

**Consistent link motion, 2026-10-02:** Tyler requested each mode's same transition
on page links. Preserve Editorial turns and Engineer record changes; replace
Digital's generic short fade with a 720ms spatial opening from the clicked
semantic module to the incoming main surface. Header and history navigation use
the page surface with a small expansion, keeping controls live. Project links
retain matched card/detail snapshots and reverse contraction. No content or route
contract changes.

## D032 — Semantic evidence ownership and Digital case-study surfaces

**Decision:** Media may declare `supportsBlockId` to identify the narrative it
demonstrates. Evidence follows its owner in the canonical sequence; references
are validated and retained across locales. A composition body renderer can group
these adjacent blocks while preserving their semantic sections and motion IDs.

**Reason:** The portfolio pilot's morphing video appeared disconnected from the
decision it supported. Encoding the relationship once avoids project-specific
layout rules or theme instructions in content.

**Implementation:** Digital gives every narrative block one surface with its
heading inside. Supporting media and captions share that surface without a nested
card. Independent media and galleries retain their visual sequences. Engineer
uses localized source summaries in individually bordered overview records.
See `DIGITAL-IMPLEMENTATION.md` and `CONTENT-AUTHORING.md`.

**Engineer refinement, 2026-10-02:** Apply the same semantic ownership to Engineer
records. Every narrative section has one square frame with its heading inside;
supporting media/captions share that frame. Remove green decision rails and nested
architecture panels. Uniform neutral borders and header rules communicate
structure; status and functional accents retain their established meaning.

## D033 — Case-study orientation and canonical section navigation

**Decision:** Add optional localized overview facts (`distinction`, `currentState`)
and a shared project brief sourced from these facts and structured ownership.
Derive section navigation from canonical narrative blocks and use ordinary anchors.
Themes compose a chapter index, technical sidebar or module navigator; mobile uses
a native disclosure with focus moved to the selected section after closing.

**Reason:** The pilot needs an understandable opening and a way to navigate its
long narrative. Navigation must work without JavaScript, with incomplete Japanese
content, and without inventing project outcomes or reorganizing canonical meaning.

**Implementation:** The brief and index are shared semantic components; theme
styles control presentation. Passive, animation-frame-throttled scroll observation
updates current-section state. Media/gallery blocks do not create extra narrative
chapters. Sticky navigation can morph, but is excluded from reading-position anchor
selection so theme changes preserve the actual narrative location.

**Engineer presentation refinement, 2026-10-03:** The canonical section index now
uses a directory metaphor with the real slug as its folder, file icons, neutral
branch guides and full chapter titles. It remains a flat native navigation list;
no synthetic source paths, tree-widget keyboard model or colored card rails are
introduced. Evidence captures supplement the original media rather than replacing
its historical provenance, with phase labels distinguishing synthetic fixtures.

## D034 — Shared secondary-page content with composition slots

**Decision:** Work, About, Lab and Contact use one typed English page inventory,
shared semantic introductions, sections and continuation links, and a registered
SecondaryPage composition slot. Work uses the filtered published project registry;
Lab remains an intentional empty catalogue until reviewed study content exists.

**Reason:** The routes previously stopped at placeholder introductions. Extend the
approved visual systems with useful page structures while final biography, contact
links, experiment records and translations remain pending. Avoid fabricated records,
credentials, contact actions or three copies of page copy.

**Implementation:** Editorial uses a 5/7 opening and offset reading column; Engineer
uses a split record opening, native section index for multi-section pages and
structured records; Digital uses a spatial opening and asymmetric supporting panels.
Collection headings sit above project decks instead of wrapping cards in another
panel. Headings belong inside narrative panels. Digital panels reuse the existing
dim pointer light with its delayed exit reset and reduced-motion fallback. Semantic
motion IDs retain page-wide morphing and existing route transitions. The populated
Work preview is development-only and uses explicitly synthetic projects.

## D035 — Vercel release preparation and preview indexing guard

**Decision:** Use Vercel's native Next.js deployment with Node 24.x and the existing
validated build. Keep production/preview indexing disabled until reviewed launch
content and a canonical origin are chosen. Supplied non-production VERCEL_ENV values
block indexing regardless of an enabled site flag.

**Reason:** Tyler selected Vercel. Cookie-selected server compositions need the
Next runtime, and a preview environment must not inherit launch indexing accidentally.

**Implementation:** Repository Vercel install/build configuration, matching package
engines, an owned local production smoke server, CI smoke integration, environment
scope instructions, content review inventory and release runbook. No hosted project,
domain, deployment or project publication is performed by this preparation pass.
