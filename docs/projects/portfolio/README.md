# Portfolio pilot

- [Discovery report](DISCOVERY.md): repository-backed source material, implemented/pending boundaries and evidence links.
- [Iteration ledger](ITERATIONS.md): design feedback, rejected approaches and final interaction intent.
- [Canonical English record](../../../src/content/projects/portfolio.ts): one published record interpreted by all four compositions; no Japanese narrative yet.
- [Capture manifest](../../../public/media/projects/portfolio/capture-manifest.json): live images/video and explicitly labelled reconstruction provenance.

Review locally at `/dev/projects/portfolio`. Use the theme picker to compare actual
compositions and module morphing; `?locale=ja` reviews intentional English fallback.
The development route returns 404 in production. The record is published and
featured, with public routes /en/work/portfolio and /ja/work/portfolio (English
fallback). Updated 2026-10-07.

To regenerate media while port 3218 is free:

```sh
node scripts/capture-portfolio-pilot.mjs
```

The script owns an isolated development server/browser and cleans them up. It
does not use or stop the ordinary development server. PNGs are real local captures;
the WebM is an unedited local switching recording, not a performance measurement.
The before navigation and gallery images include reconstruction labels and the manifest
records the overrides. The original captures showed placeholder copy and an empty public inventory; later
entries show published projects. Check each manifest entry for its content state. The gallery comparison uses the existing
synthetic media fixtures; the earlier layout is cropped to the current panel height.
After recapture, compare the manifest dimensions with the record's intrinsic media
dimensions and refresh captions if the represented UI or content has changed.

The opening now includes a project brief and ownership/review disclosure. Editorial
has a chapter index; Engineer has a directory-style section index and Digital has
sticky section navigation. Mobile
uses native disclosures; all section destinations remain ordinary anchors.

To refresh only the focused interaction demonstrations while port 3218 is free:

```sh
node scripts/capture-portfolio-interactions.mjs
```

This preserves the original capture set and adds native-control videos/posters for
header navigation and browser Back in each theme, Digital selected-card continuity
on an explicitly labelled synthetic fixture, and opening/closing the real pilot
disclosure in each mode. Recordings are unedited, silent and labelled by phase.
The manifest records each new capture's date and route; they are not benchmarks.
Videos and captions belong to the narrative sections they demonstrate, sharing
their owner's record/surface in Engineer and Digital without nested media cards.

Next review: screenshot currency after the Editorial ink redesign, comparable
four-mode evidence and focused recordings. Preserve authentic historical captures;
populated deployed performance verification remains pending.

To refresh the Chronicle before/after set and the homepage captures against an
already-running server (a second dev server cannot start beside it):

```sh
node scripts/capture-portfolio-chronicle.mjs --base http://localhost:3000
```

"Before" images are unchanged copies of the preserved `evidence/chronicle-initial` captures;
everything else is captured live with reduced motion, plus one unedited recording
(`chronicle-interactions.webm`). The script merges its entries into the manifest.

See [screenshot review](SCREENSHOT-REVIEW.md) for the current evidence inventory and refresh recommendations.

## Current evidence refresh — 2026-10-07

The active comparison/preview uses dated PNGs with the current ink Editorial design,
three-project inventory and shared profile links. The Chronicle iteration gallery
now includes a matching desktop before/after pair, a landscape-phone example and
a current dossier view. Authentic initial captures remain unchanged.

Four new silent recordings cover theme morphing, Chronicle card/chapter/image/Back
interactions, header navigation/Back and Engineering details opening/closing in all
four modes. Morphing, Chronicle and route recordings are in the current published
body; the disclosure recording is a supplemental demonstration. Each has a matching poster.

To regenerate against an already-running preview server:

```sh
node scripts/refresh-portfolio-evidence.mjs http://127.0.0.1:3218
```

The script preserves the earlier evidence before capture. The dated files avoid
stale optimized thumbnails, and the morphing poster is separate from the project
preview. Previous scripts above describe older capture batches; they should not
be used to regenerate the current set. See the preserved
[evidence archive](evidence/pre-ink-refresh/README.md).
