# 12 — Testing and Quality

## Goal

Testing should protect the portfolio's unusual parts:

- content correctness;
- theme compatibility;
- accessibility;
- localization;
- composition;
- theme persistence;
- responsive behavior.

Do not overbuild testing infrastructure before the product exists.

## 1. Schema/content validation

Validate:

- unique slugs;
- publication states;
- featured flags;
- technology IDs;
- capability IDs;
- media IDs;
- locale objects;
- translation states;
- block discriminators;
- required alt text;
- link formats.

Fail build where malformed content would create a broken public page.

## 2. Registry tests

Ensure:

- every published project can be discovered;
- drafts are excluded from public selectors;
- featured projects are also published;
- ordering is deterministic;
- no duplicate registry keys.

## 3. Semantic component tests

Test shared components independent of theme where practical.

Examples:

- project metadata;
- locale links;
- expandable technical detail;
- media figure;
- theme selector behavior.

## 4. Composition compatibility

Critical requirement.

Every published project should render across all launch themes.

Conceptual matrix:

```text
                  Editorial  Engineer  Digital
Nihonest             ✓         ✓         ✓
Upwatch              ✓         ✓         ✓
Hospitality          ✓         ✓         ✓
```

A theme must not fail because a project omits optional fields.

## 5. Fallback renderer tests

When a theme lacks a specialized block renderer:

- shared renderer appears;
- content remains readable;
- no runtime error occurs;
- spacing remains acceptable.

## 6. Automated accessibility

Use tooling where practical for:

- missing labels;
- invalid ARIA;
- obvious contrast issues;
- landmarks/headings.

Automated checks do not replace manual testing.

## 7. Manual accessibility

Before launch test:

- keyboard-only navigation;
- visible focus;
- skip link;
- theme switch via keyboard;
- locale switch;
- mobile menu;
- expandable sections;
- screen-reader structural pass;
- reduced motion;
- zoom/reflow.

## 8. Theme persistence

Test:

- first visit defaults to Editorial;
- selecting Engineer persists;
- reload preserves Engineer;
- locale switch preserves Engineer;
- optional style query works;
- invalid query falls back;
- no severe flash/reflow.

## 9. Localization

Test:

- complete EN;
- partial JA;
- translation fallback;
- Japanese long headings;
- Japanese metadata;
- locale navigation;
- `lang` changes.

## 10. Responsive

Representative widths:

```text
360
390
430
768
1024
1440
1920+
```

Look for:

- overflow;
- overlap;
- unreadable Engineer density;
- Digital collisions;
- poor cropping;
- nav issues;
- Japanese wrapping problems.

## 11. Visual regression

Protect major surfaces:

```text
home
work
flagship case study
about
```

across:

```text
editorial
engineer
digital
```

and key mobile/desktop widths.

Do not snapshot every pixel of every experiment if maintenance becomes excessive.

## 12. Motion/reduced motion

Test:

- page transition;
- theme transition;
- Digital project interaction;
- reduced-motion variant;
- offscreen animation behavior;
- keyboard focus during motion.

## 13. Performance

Measure:

- base bundle;
- Digital dynamic chunk;
- route performance;
- image behavior;
- layout shift;
- theme bootstrap.

Verify Editorial does not load heavy Digital-only packages.

## 14. SEO

Test:

- titles/descriptions;
- canonical;
- locale alternates;
- sitemap;
- no dev routes;
- no draft projects;
- no duplicate canonical caused by style query.

## 15. Broken links/media

Automate where easy.

Check:

- project links;
- internal links;
- media paths;
- résumé artifacts once added.

## 16. CI

Reasonable baseline:

```text
install
typecheck
lint
schema/content validate
unit/component tests
build
```

Add end-to-end, accessibility, and visual checks as implementation matures.

## 17. Manual quality review

Before public release, review each theme as a product.

Ask:

- Does this still feel like Tyler's portfolio?
- Is the mode genuinely distinct?
- Is it readable?
- Does project hierarchy make sense?
- Is any motion annoying?
- Does mobile feel designed?
- Does Japanese feel intentional?
- Are project claims defensible?

## 18. Definition of done for a theme

A launch theme is not complete until:

- Home works;
- Work works;
- case study works;
- About works;
- Lab shell works;
- Contact works;
- mobile works;
- reduced motion works;
- Japanese shell works;
- optional project data does not break it;
- accessibility review passes.

## Principle

The important test is not that three styles exist.

It is that one content system remains correct through three different compositions.
