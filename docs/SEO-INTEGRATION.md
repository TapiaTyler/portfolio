# SEO integration

## Deployment identity and indexing

Configure the deployment using `.env.example` as a guide:

```dotenv
SITE_URL=https://your-chosen-domain.tld
SITE_INDEXABLE=true
```

Supply the actual public origin, without a path, credentials, query or fragment.
Public origins require HTTPS. Local origins are accepted for development but
cannot be made indexable. `SITE_INDEXABLE` accepts only `true` or `false` and
requires a URL when enabled.

Indexing defaults to disabled. Development is always non-indexable; preview
deployments must retain `SITE_INDEXABLE=false`. Without a URL, absolute canonical,
alternate and share-image URLs are omitted. Incoming Host headers and guessed
domains never determine site identity.

Build and serve with the same configuration. Robots, sitemap and the share image
are generated during the production build; page metadata uses server configuration.
Rebuild after changing the deployment origin or indexability. No deployment or
external search-engine submission is performed by this integration.

## Metadata and locale readiness

Each main route and public project route generates its title, description,
canonical, Open Graph and Twitter metadata through a shared helper. Canonicals
retain the locale and project slug and omit query parameters. The selected mode
does not change metadata, URLs or share imagery. Project descriptions use selected
source content; sparse records receive a plain project-record description.

Japanese fallback routes stay usable and keep their own canonicals when a URL
is configured. They remain `noindex` until relevant Japanese content exists.
English fallback does not advertise Japanese `hreflang` or Open Graph language.

Main-page copy is currently English only. Expand `siteContentLocales` in
`src/lib/seo/metadata.ts` when reviewed shared translations are implemented.
Project Japanese availability follows typed translation status and actual Japanese
records. Summary/partial translations can participate without translating every
deep section. Existing fallback notices and field language attributes remain.

## Publication behavior

`/sitemap.xml` contains ready main pages and published normal project records.
Unfeatured published records remain eligible. Drafts, hidden records, synthetic
fixtures, dev routes, query variants and untranslated locale variants are excluded.
No fabricated modification dates are emitted. Disabled indexing produces an empty
sitemap.

`/robots.txt` disallows crawling while indexing is disabled. Enabled public
deployments allow public crawling, exclude `/dev/` and advertise the sitemap.
Unready locale routes keep page-level `noindex`; they are not globally blocked
from crawling, allowing readiness to be evaluated per project.

## Share image and structured data

`/share-image` generates a static 1200×630 PNG with Tyler Tetsuo Tapia's name.
It uses local rendering and bundled font fallback, without external image/font
requests or theme-dependent composition. Its simple initial design can be refined
after final content and branding review.

Indexable homepages include Person and WebSite JSON-LD with the verified name,
approved Japanese alternate name, configured URL and available source languages.
No job title, affiliations, social URLs or outcomes are inferred. JSON escaping
protects script embedding while preserving parsed values. Project structured data
is deferred until real project facts support a useful schema.

## Verification

- 32 unit tests, including configuration validation, locale readiness, publication
  exclusions, unfeatured-project sitemap inclusion and JSON-LD serialization.
- 15 production browser tests, including metadata across modes/locales, robots,
  sitemap, PNG signature/dimensions and structured data; default and enabled test
  configurations checked.
- Type checking, lint, formatting, content validation and production builds.
- Visual inspection of the generated share image.

`https://portfolio.example` is used only as a synthetic verification origin; the
ordinary non-indexable build is restored afterward. Windows browser checks use
one worker after repeated parallel runner asset stalls; Linux CI retains two.
Concurrent browser requests outside the runner also passed. Hosted CI and
deployment have not been verified. Real domain configuration, final copy and
search-result appearance still need launch review.

## Vercel preview guard — 2026-10-03

Indexing additionally requires `VERCEL_ENV` to be absent or `production`. Preview,
development and unknown supplied values cannot enable indexing even with
`SITE_INDEXABLE=true`. Vercel system variables must be enabled, and build/runtime
settings must match. Preview scopes still explicitly use `SITE_INDEXABLE=false`.
See [RELEASE-RUNBOOK.md](RELEASE-RUNBOOK.md) for environment scopes and deployment
steps. The public origin remains explicit and is not derived from Vercel URLs.
