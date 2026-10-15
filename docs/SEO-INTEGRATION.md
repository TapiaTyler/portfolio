# SEO integration

## Deployment identity and indexing

Configure Vercel's **Production** environment using `.env.production.example`:

```dotenv
SITE_URL=https://tylertapia.com
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

The owner requested the bilingual SEO release on 2026-10-14 after translation
review and refinement. `siteContentLocales` now includes `en` and `ja`; main pages
advertise reciprocal fully qualified alternates plus English `x-default`. Each
locale retains its own canonical URL. This release eligibility is separate from
the remaining human native-language review described in the case studies.
Project Japanese availability follows typed translation status and actual Japanese
records. Summary/partial translations can participate without translating every
deep section. Existing fallback notices and field language attributes remain.

## Publication behavior

`/sitemap.xml` contains ready main pages and published normal project records.
Unfeatured published records remain eligible. Drafts, hidden records, synthetic
fixtures, dev routes, query variants and untranslated locale variants are excluded.
No fabricated modification dates are emitted. Disabled indexing produces an empty
sitemap.

The current inventory produces **16 URLs** when indexing is enabled: five main
pages in each language and three published projects in each language. The count is
derived from publication and locale readiness, rather than hardcoded in production.

`/robots.txt` disallows crawling while indexing is disabled. Enabled public
deployments allow public crawling, exclude `/dev/` and advertise the sitemap.
Unready locale routes keep page-level `noindex`; they are not globally blocked
from crawling, allowing readiness to be evaluated per project.

## Share image and structured data

`src/app/favicon.ico` supplies a shared TT monogram icon in 16, 32, 48 and 64px
sizes; Next.js declares it in locale-page metadata. Its vector source is
`public/favicon.svg`. Both locales and every theme share the same identity.

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

## Bilingual SEO verification — 2026-10-14

The seven focused SEO unit tests cover bilingual main-page metadata, unavailable
Japanese fallback, publication filtering, preview guards and JSON-LD. Production
browser checks use the intended domain configuration and cover all five modes,
reciprocal locale links, sitemap contents, robots rules, social-image output,
structured data and the favicon. The default noindex configuration is also checked.

Verification completed: all 63 repository unit tests passed; four focused SEO
browser tests passed in each of three configurations (indexable Production,
Vercel Preview inheriting `SITE_INDEXABLE=true`, and the default no-origin/noindex
build). The preview release smoke passed 45 route/theme checks and eight production
guards. Production builds/type checking, targeted lint and repository formatting
checks passed. The ordinary default local build was restored afterward.

Before deploying, set both Production variables above and redeploy the updated
revision: sitemap/robots are generated at build time. Preview and Development
scopes retain `SITE_INDEXABLE=false`; do not infer identity from incoming headers.

After deployment, verify `/en`, `/ja`, `/robots.txt`, `/sitemap.xml`, `/share-image`
and `/favicon.ico`. Public pages should have `index, follow`, self canonicals and
reciprocal `en`/`ja` alternates. Robots should allow `/`, exclude `/dev/` and point
to `https://tylertapia.com/sitemap.xml`. The sitemap should contain the current
16 public routes and no theme queries, drafts or development paths.

Verify the domain property in Google Search Console through Porkbun DNS using the
exact TXT verification token supplied by Google, then submit `sitemap.xml`. No
verification token is invented or stored here. Search Console verification and
submission require the owner's account; they have not been performed by this work.

## Live production verification — 2026-10-14

After the owner configured the Production environment variables, all 16 URLs in
the live sitemap returned 200 with `index, follow`, matching self canonicals and
English/Japanese/English-default language alternates. Both homepages include
valid Person and WebSite JSON-LD. `/robots.txt` allows public crawling, excludes
`/dev/` and advertises the canonical sitemap. `/favicon.ico` returns 200 with an
icon content type.

The response evidence is recorded in
[SEO-LIVE-VERIFICATION-2026-10-14.json](SEO-LIVE-VERIFICATION-2026-10-14.json).
This confirms live HTTP metadata and crawl eligibility, not actual Google indexing,
rankings, Search Console ownership or post-change Lighthouse scores.

## Post-deployment Lighthouse SEO — 2026-10-14

Fresh live mobile Lighthouse 13.5.0 audits of `/en` and `/ja` in Product both
score **SEO 100** and **Best Practices 100**, with no run warnings or failed audits
in those categories. The prior bilingual release audit scored SEO 66 and Best
Practices 96 before indexing configuration and favicon changes.

These runs audit only SEO and Best Practices; they do not update Performance or
Accessibility scores, establish Google indexing, or predict rankings. Exact
timestamps, scores and raw-report location are recorded in
[LIVE-SEO-RESULTS-2026-10-14.json](LIVE-SEO-RESULTS-2026-10-14.json).

## Vercel preview guard — 2026-10-03

Indexing additionally requires `VERCEL_ENV` to be absent or `production`. Preview,
development and unknown supplied values cannot enable indexing even with
`SITE_INDEXABLE=true`. Vercel system variables must be enabled, and build/runtime
settings must match. Preview scopes still explicitly use `SITE_INDEXABLE=false`.
See [RELEASE-RUNBOOK.md](RELEASE-RUNBOOK.md) for environment scopes and deployment
steps. The public origin remains explicit and is not derived from Vercel URLs.
