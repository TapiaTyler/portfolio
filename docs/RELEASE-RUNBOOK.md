# Vercel release runbook

Prepared 2026-10-03. Hosting choice: Vercel. Public domain and final launch content
are still open. Tyler has deferred deployment until the other projects are completed
and integrated into the portfolio. This runbook prepares the existing Next.js application for a
non-indexed preview; no Vercel project, deployment or domain has been created here.

## Repository configuration

| Setting          | Value                                               |
| ---------------- | --------------------------------------------------- |
| Framework        | Next.js                                             |
| Root directory   | Repository root                                     |
| Node             | 24.x, declared in package.json                      |
| Install          | npm ci                                              |
| Build            | npm run build                                       |
| Output directory | Next.js default; leave the dashboard override unset |

`vercel.json` records the framework/install/build choices. The build retains content
validation through `prebuild`. Cookie-selected server compositions require the
Next.js runtime; do not change this project to a static export. Keep the ordinary
Next image/font handling and framework caching behavior.

Vercel supports Next.js directly and Node 24.x through package engines:
[Next.js integration](https://vercel.com/docs/frameworks/full-stack/nextjs),
[Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Environment settings

| Variable       | Preview and development                                   | Production before launch        | Reviewed public launch                    |
| -------------- | --------------------------------------------------------- | ------------------------------- | ----------------------------------------- |
| SITE_URL       | Leave unset until an intentional preview origin is needed | Chosen HTTPS origin, once known | Exact canonical HTTPS origin              |
| SITE_INDEXABLE | false                                                     | false                           | true only after content and domain review |
| VERCEL_ENV     | Vercel supplies it                                        | Vercel supplies it              | Must be production                        |

Enable Vercel's system environment variables. `VERCEL_ENV` is available at build
and runtime; the code refuses indexing when it is present with any value other
than `production`. This adds a guard if a production indexing flag is mistakenly
assigned to Preview. It does not replace setting the correct environment scopes.
See [system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).

The canonical origin is explicit; neither request headers nor `VERCEL_URL` invent
it. Build and runtime must use the same settings because robots/sitemap/share image
are generated at build time. Redeploy after changing the origin or indexing flag.

## Local preview release gates

With the normal non-indexed configuration:

```sh
npm ci
npm run lint
npm run format:check
npm test
npm run build
npm run test:release
npm run test:browser
npm run test:preview
```

Do not run a build concurrently with preview tests or captures. The release smoke
command owns port 3220 and checks the production build across three cookie-selected
themes, public routes, production 404 guards, static JavaScript, public PNG media,
noindex robots and an empty preview sitemap. It stops its own server afterward and
writes diagnostics to `.cache/release-smoke.log`. It is a preview gate, not a hosted
Vercel or browser-motion test. Its draft assertions reflect the current unpublished
pilot; update those assertions as part of the eventual publication pass.

CI runs this smoke gate after building. Browser tests retain their separate ports
and traces. Local success does not establish deployed performance or hosted CI success.

## First Vercel preview

1. Make the reviewed application files available in the GitHub repository. A remote
   connection alone does not publish the current local working tree.
2. In Vercel, import `TapiaTyler/portfolio` and confirm the settings above.
3. Set `SITE_INDEXABLE=false` in Preview and Production. Set `SITE_URL` only when
   the intended canonical origin is chosen. Keep system environment variables enabled.
4. Deploy the intended revision and inspect its build log for content validation.
5. Visit Work, About, Lab and Contact in all themes, at mobile and desktop widths.
   Check language switching, persisted mode, Back/Forward and mobile menu controls.
6. Confirm `/dev/compositions`, `/dev/design-system`, `/dev/projects/portfolio` and
   the unpublished `/en/work/portfolio` return 404. Vercel Preview runs production
   code, so local development previews are intentionally unavailable there.
7. Check `/robots.txt` disallows `/`, `/sitemap.xml` contains no URLs, and page
   metadata remains noindex. Check font/image delivery, native videos where present,
   image-viewer focus return and reduced-motion behavior on the hosted application.

The public project inventory remains empty until a project is deliberately published.
Review the populated pilot locally at `/dev/projects/portfolio`. Static media files
under `public/` remain URL-accessible; draft routes are publication gates, not private
media storage. Do not add confidential material to public assets.

## Content and launch

Use [CONTENT-REVIEW.md](CONTENT-REVIEW.md) for the outstanding content decisions.
After the pilot is reviewed, set publication and featuring separately and update
its status copy and publication-dependent verification. Check public rendering in
all themes, sitemap inclusion and unpublished-record exclusion again.

Attach the chosen domain, verify HTTPS and canonical URLs, and run deployed
performance/accessibility/SEO checks with populated content. Only then enable the
Production indexing flag and redeploy. Japanese fallback remains noindex until
reviewed Japanese content is available. Save the verified deployment/revision and
environment choices in the release record.

For a rollback, restore the last verified deployment and its matching environment
settings through the Vercel dashboard, then repeat route, asset and metadata checks.
Changing source code locally does not roll back a hosted deployment.
