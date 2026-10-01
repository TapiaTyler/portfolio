# 18 — System Contract Checklist

Use during implementation reviews.

## Product

- [ ] Default experience works as a professional portfolio without theme switching.
- [ ] Editorial is default.
- [ ] Engineer is genuinely architecture/information-forward.
- [ ] Digital is genuinely interaction/spatial-forward.
- [ ] Project work remains the central focus.

## Content

- [ ] Project facts exist once.
- [ ] Content contains no theme-specific classes/layout instructions.
- [ ] Projects can omit irrelevant fields.
- [ ] Draft projects remain private.
- [ ] Featured and published are separate.
- [ ] Claims distinguish implemented/planned/prototype states.

## Composition

- [ ] Modes change information organization, not only surface styling.
- [ ] Shared fallback exists for blocks.
- [ ] Visual reordering preserves semantic reading order.
- [ ] No project requires theme-specific content duplication.

## Theme system

- [ ] Central theme registry exists.
- [ ] Shared token contract exists.
- [ ] Theme persists.
- [ ] No major first-paint theme flash.
- [ ] Optional style query does not change canonical URL.
- [ ] Future theme can be added without project migration.

## Localization

- [ ] EN/JA route model exists.
- [ ] Locale switch preserves theme.
- [ ] Partial Japanese content is handled intentionally.
- [ ] Japanese typography/layout tested.
- [ ] Locale-neutral facts are not duplicated.

## Accessibility

- [ ] WCAG 2.2 AA target.
- [ ] Keyboard works.
- [ ] Focus is visible.
- [ ] Reduced motion is respected.
- [ ] Touch has no hover dependency.
- [ ] Diagrams have accessible summaries.
- [ ] Theme switch does not unexpectedly lose focus.

## Responsive

- [ ] Editorial mobile retains editorial identity.
- [ ] Engineer mobile is not too dense.
- [ ] Digital mobile remains distinct without pointer dependence.
- [ ] No overflow at representative widths.
- [ ] Japanese wrapping tested.

## Performance

- [ ] Digital heavy dependencies are dynamically loaded.
- [ ] Images are optimized.
- [ ] Fonts are controlled.
- [ ] No major CLS from theme initialization.
- [ ] Good Core Web Vitals targeted.

## SEO

- [ ] Unique page metadata.
- [ ] Canonical URLs are style-independent.
- [ ] Locale alternates exist.
- [ ] Sitemap generated.
- [ ] Draft/dev routes excluded.

## Development tooling

- [ ] `/dev/design-system`
- [ ] `/dev/compositions`
- [ ] edge-case fixtures
- [ ] production exclusion

## Testing

- [ ] schema validation
- [ ] project registry tests
- [ ] theme compatibility matrix
- [ ] accessibility checks
- [ ] responsive checks
- [ ] visual regression for major surfaces
- [ ] theme persistence tests

## Scope

- [ ] No unnecessary CMS.
- [ ] No unnecessary database.
- [ ] No auth/accounts.
- [ ] Product/Graphic themes deferred.
- [ ] Advanced WebGL is optional, not baseline.
