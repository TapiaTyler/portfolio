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

## Testing approach (current)

Automated tests guard the presentation contract, not the presentation. A mode may
change layout, typography and motion freely; it may never change content, routes,
accessibility or the no-JavaScript path (AGENTS.md §4). Tests therefore assert
those invariants and nothing about appearance, so design adjustments do not
require rewriting tests.

What runs, and what each layer protects:

| Layer         | Command                          | Protects                                                                                                                                                                                                                                        |
| ------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit          | `npm test`                       | Content schema, case-study contract, media references, locale fallback, theme registry, semantic components                                                                                                                                     |
| Release smoke | `npm run test:release`           | Production build: every mode serves every route, dev and preview routes return 404, drafts never leak, noindex/sitemap behavior                                                                                                                 |
| Contract      | `tests/browser/contract.spec.ts` | Every mode lists the same projects; every page in both locales returns 200 with one `h1`, the right `lang` and theme, no axe WCAG 2.2 AA violations and no runtime errors under reduced motion; pages and primary links work without JavaScript |
| Theme         | `tests/browser/theme.spec.ts`    | Default mode, saved preference in the first HTML (no flash), invalid preferences, switching persistence, keyboard switching, production guards                                                                                                  |
| SEO           | `tests/browser/seo.spec.ts`      | One canonical identity across modes and locales                                                                                                                                                                                                 |
| Contact       | `tests/browser/contact.spec.ts`  | Email link, copy fallback, external-link attributes, pending documents, Japanese fallback                                                                                                                                                       |

What is deliberately not automated: visual layout (overlap, spacing, alignment),
animation timing and motion feel. These are reviewed by eye in every mode at phone,
landscape-phone and desktop widths before release (§17). An earlier suite of about
170 browser tests pinned specific positions and animation timings; it broke on
harmless design changes, was flaky in CI and still missed the visual problems
found in review, so it was replaced (D053).

When adding a project, page or mode, no test edits should be needed: the contract
spec discovers projects from the Work page and modes from the theme registry. Add a
test only for a new invariant or a regression in behavior that cannot be seen.

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

- first visit and invalid saved preferences default to Product;
- desktop/mobile selector order is Product, Editorial, Engineer, Digital, Chronicle;
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

Not automated (D053). Screenshot baselines would need refreshing on every design
adjustment. Visual review happens by eye per §17.

## 12. Motion/reduced motion

The contract spec runs every page under reduced motion and fails on runtime
errors; theme.spec checks keyboard switching with reduced motion. Animation timing
and feel are reviewed by eye.

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

Two parallel GitHub Actions jobs:

```text
checks:      lint, unit tests, format check, typecheck
production:  build (validates content), release smoke, Playwright browser suite
```

Failed browser runs upload their Playwright traces as an artifact for seven days.

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
