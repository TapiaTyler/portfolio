# Nihonest portfolio project

- [Import review](IMPORT-REVIEW.md): supported claims, contribution confirmations,
  disclosure approval, and remaining review.
- [Discovery report](discovery/DISCOVERY.md): supplied source material at `4bc3df9`.
- [Canonical content](../../../src/content/projects/nihonest.ts): shared English
  narrative across Editorial, Engineer, Digital, Chronicle and Product.
- [Capture manifest](../../../public/media/projects/nihonest/capture-manifest.json):
  current local routes, dimensions, demo states, and capture limitations.

Review at `/dev/projects/nihonest`; append `?locale=ja` for intentional English
fallback. Full-shell review is `/preview/chronicle?project=nihonest` in the selected
presentation mode. These review routes are development-only. The current record
is published and featured; its public English route is /en/work/nihonest, with the
declared English fallback at /ja/work/nihonest.

Nihonest remains in active development. The current record includes the live link
https://nihonest.vercel.app/ and declares private source. The dated discovery/import
reports describe the earlier local import; application release gates remain separate
from portfolio checks. Updated 2026-10-08; the live homepage was captured for visual
evidence, without a full live-site audit.

## Opening image

The opening image and collection thumbnail now use the live English homepage,
captured October 8, 2026 at 1440×1000 from a fresh anonymous context. The search
capture remains supporting evidence for the discovery workflow. The old local
homepage and its original capture manifest are retained separately.

- [Live homepage](../../../public/media/projects/nihonest/home-live-desktop-2026-10-08.png)
- [Dated provenance](../../../public/media/projects/nihonest/home-live-desktop-2026-10-08.capture.json)

To capture a new dated homepage without changing the other discovery screenshots:

```sh
node scripts/capture-nihonest-home.mjs
```

The script records the capture URL, date, viewport and SHA-256. Review the image
and update the canonical media reference before using a future capture.

## Local screenshots

Five screenshots were captured from an isolated copy using installed dependencies,
fresh anonymous browser state, and no copied environment credentials. The capture
omits only the Next development badge. No source application code or database was changed.
No CMS capture was made because no inert review fixture was supplied.

The source report and demonstration captions preserve editorial and translation
review limitations. Displayed administrative information is an example of the
interface's content model, not a current official-source verification.

To refresh from an already-running isolated local demo on port 3225:

```sh
node scripts/capture-nihonest.mjs
```

The script captures actual UI and writes its manifest; it does not launch the source
application or publish content. When capturing a newer revision, update the script's
revision, recorded evidence, content claims and captions together.
