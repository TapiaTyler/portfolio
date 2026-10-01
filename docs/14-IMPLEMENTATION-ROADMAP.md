# 14 — Implementation Roadmap

## Purpose

Recommended implementation sequence.

It is not a strict sprint plan.

Establish architecture before polishing three complete visual systems.

## Phase 0 — Repository foundation

Set up:

- Next.js;
- TypeScript;
- linting/formatting;
- basic tests;
- route skeleton;
- global reset/base styles;
- documentation;
- CI baseline.

Acceptance:

- app builds;
- locale route renders;
- typecheck/lint/tests run.

## Phase 1 — Content/schema foundation

Implement:

- project schema;
- publication state;
- technology registry;
- capability registry;
- media schema;
- case-study block union;
- validation;
- fixture projects.

Do not build deep theme UI yet.

Acceptance:

- malformed fixture fails validation;
- valid project can be loaded by slug;
- draft filtering works.

## Phase 2 — Localization shell

Implement:

- `/en` and `/ja`;
- locale navigation;
- locale metadata;
- fallback policy;
- translation status.

Acceptance:

- English and Japanese shell render;
- route architecture is stable.

## Phase 3 — Shared semantic rendering

Build shared fallback components:

- Hero model;
- ProjectFeature;
- ProjectMeta;
- Work index;
- CaseStudyIntro;
- core case-study blocks;
- MediaFrame;
- expandable TechnicalDetail.

At this stage the site may be visually plain.

Acceptance:

- a full sample project renders without theme-specific code;
- missing optional fields do not break it.

## Phase 4 — Theme/composition infrastructure

Implement:

- ThemeId;
- theme registry;
- composition registry;
- token contract;
- theme provider/state;
- persistence;
- pre-paint initialization;
- optional style query;
- fallback renderers.

Acceptance:

- switching mode changes registry/composition;
- persists across reload;
- no major flash;
- locale switch preserves theme.

## Phase 5 — Development preview tooling

Build:

- `/dev/design-system`
- `/dev/compositions`
- edge-case fixtures

Acceptance:

- same fixture visible in all modes;
- no-image and Japanese states available.

## Phase 6 — Editorial

Editorial is first because it is the canonical/default experience.

Implement:

- typography;
- grid;
- navigation;
- homepage hero;
- varied selected-work composition;
- capabilities;
- About preview;
- Lab preview;
- case-study intro;
- major block treatments;
- responsive behavior;
- accessibility.

Acceptance:

- Editorial alone is professional enough to launch if needed.

## Phase 7 — Engineer

Implement genuine information reorganization.

Do not merely swap fonts.

Required:

- profile/system hero;
- project registry/index treatment;
- technical metadata emphasis;
- architecture-forward case-study treatment;
- decision-log treatment;
- responsive density;
- accessible mobile behavior.

Acceptance:

- switching from Editorial to Engineer creates an obviously different reading hierarchy.

## Phase 8 — Digital

Start from accessible baseline.

Implement:

- spatial hero;
- interactive selected-work treatment;
- layered case-study treatment;
- motion profile;
- progressive enhancement;
- optional dynamically loaded visual effects.

Do not require WebGL for Digital completeness.

Acceptance:

- Digital is distinct without blocking reading;
- reduced motion remains strong;
- mobile remains usable;
- heavy code is not loaded by default themes.

## Phase 9 — Cross-theme hardening

Verify:

- all published projects across themes;
- no-image states;
- long copy;
- Japanese;
- reduced motion;
- keyboard;
- mobile;
- persistence;
- fallback renderers.

## Phase 10 — SEO/performance

Implement/refine:

- canonical;
- locale alternates;
- project metadata;
- sitemap;
- structured data where justified;
- image optimization;
- bundle analysis;
- Core Web Vitals work.

## Phase 11 — Real project content integration

Use project repository discovery reports from:

`docs/15-PROJECT-DISCOVERY-PROMPT.md`

Do not force a detailed content inventory before source material exists.

## Phase 12 — Release review

Review:

- copy quality;
- factual accuracy;
- public links;
- media;
- résumé links;
- accessibility;
- performance;
- responsive behavior;
- theme distinction;
- Japanese shell.

## Post-launch

Potential:

- Product theme;
- Graphic theme;
- more Lab work;
- deeper Japanese translation;
- portfolio's own case study;
- richer interactive diagrams;
- additional projects.

## Agent execution guidance

Coding agents should work in bounded phases.

Avoid asking one agent to simultaneously:

- build full architecture;
- write all content;
- design three themes;
- add advanced effects;
- test everything.

Use these docs as stable context, then assign a concrete phase/task.

## Principle

Ship a strong Editorial portfolio first, then prove the composition system with Engineer and Digital.
