# 10 — Performance, SEO, and Analytics

## Performance philosophy

The portfolio demonstrates frontend competence.

Poor performance would undermine its message.

The baseline experience should remain fast even when Digital supports richer effects.

## Working quality targets

- Lighthouse Performance: >= 90
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95
- good Core Web Vitals

Do not game Lighthouse at the expense of UX.

## Progressive enhancement order

```text
content / HTML
↓
base style
↓
standard interaction
↓
theme-specific enhancement
↓
optional advanced visual effects
```

The site should remain understandable if later layers fail.

## Bundle discipline

Do not ship expensive Digital-only libraries to Editorial users.

Dynamic/lazy load:

- WebGL;
- Three.js;
- React Three Fiber;
- shader libraries;
- large Digital-only animation/visualization code.

## Images

Use:

- optimized responsive images;
- intrinsic dimensions;
- appropriate formats;
- lazy loading below the fold;
- priority only for genuinely critical media.

Avoid huge full-resolution UI captures when smaller assets are sufficient.

## Fonts

Limit weight/style count.

Prefer variable fonts where beneficial.

Use fallback strategies to reduce layout shift.

Japanese fonts can be large; load intentionally.

## Layout shift

Theme initialization and fonts are major CLS risks.

Avoid:

- post-hydration theme reflow;
- images without dimensions;
- severe late font metric swaps;
- Digital effects inserting content above existing sections.

## SEO route identity

Themes are presentation variants, not separate content.

Canonical project:

```text
/en/work/nihonest
```

Possible style URL:

```text
/en/work/nihonest?style=engineer
```

Canonical remains:

```text
/en/work/nihonest
```

## Metadata

Generate per page/project:

- title;
- description;
- canonical;
- Open Graph;
- social metadata where useful;
- locale alternates;
- structured data where appropriate.

Use real project content, not generic site-wide descriptions.

## Sitemap

Generate from registries/content.

Include:

- published locale routes;
- published project routes;
- main pages.

Exclude:

- drafts;
- hidden projects;
- dev routes;
- query-parameter theme variants.

## Robots

Handle preview/dev environments carefully to prevent accidental indexing where appropriate.

Production should expose intended public pages.

## Structured data

Potentially:

- Person
- WebSite
- CreativeWork/SoftwareApplication where semantically valid

Do not overstuff structured data.

## Analytics philosophy

Keep analytics minimal and privacy-conscious.

Potential useful events:

- project view;
- outbound demo click;
- GitHub click;
- résumé download;
- theme switch;
- locale switch.

Avoid invasive tracking.

## Theme analytics

Possible event:

```text
theme_change
from: editorial
to: engineer
```

Do not let analytics complexity block launch.

## No fabricated metrics

Do not claim:

- user growth;
- conversion lift;
- response-time improvement;
- revenue impact;
- adoption;

unless documented evidence exists.

Performance metrics should include context such as device, route, method, and date where relevant.

## Error monitoring

Optional later.

If added, keep privacy in mind and avoid unnecessary data collection.

## Hosting considerations

Choose later based on:

- static/CDN performance;
- preview deployments;
- custom domain;
- low cost;
- Next.js compatibility;
- environment-variable management.

Railway is possible, but a static-friendly platform may better fit.

## Launch performance acceptance

- no heavy Digital-only bundle on Editorial baseline;
- responsive images;
- theme switch without full reload;
- major pages reviewed for performance;
- no obvious theme-bootstrap CLS;
- motion remains smooth on representative hardware.

## Principle

Visual ambition and performance are part of the same quality standard.
