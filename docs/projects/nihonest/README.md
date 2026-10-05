# Nihonest portfolio draft

- [Import review](IMPORT-REVIEW.md): supported claims, contribution confirmations,
  disclosure approval, and remaining review.
- [Discovery report](discovery/DISCOVERY.md): supplied source material at `4bc3df9`.
- [Canonical content](../../../src/content/projects/nihonest.ts): shared English
  narrative across Editorial, Engineer, Digital, and Chronicle.
- [Capture manifest](../../../public/media/projects/nihonest/capture-manifest.json):
  current local routes, dimensions, demo states, and capture limitations.

Review at `/dev/projects/nihonest`; append `?locale=ja` for intentional English
fallback. Full-shell review is `/preview/chronicle?project=nihonest` in the selected
presentation mode. All review routes are development-only. The draft is excluded
from public Work, featured inventories, direct project routes, sitemap, and structured data.

Nihonest remains in active development and has not yet been deployed. No live
link has been invented. Its source-project review and release gates remain separate
from this portfolio's import checks.

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
