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
