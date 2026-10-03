# Portfolio pilot

- [Discovery report](DISCOVERY.md): repository-backed source material, implemented/pending boundaries and evidence links.
- [Iteration ledger](ITERATIONS.md): design feedback, rejected approaches and final interaction intent.
- [Canonical English draft](../../../src/content/projects/portfolio.ts): one record interpreted by all three compositions; no Japanese narrative yet.
- [Capture manifest](../../../public/media/projects/portfolio/capture-manifest.json): live images/video and explicitly labelled reconstruction provenance.

Review locally at `/dev/projects/portfolio`. Use the theme picker to compare actual
compositions and module morphing; `?locale=ja` reviews intentional English fallback.
The route returns 404 in production, and the record remains a draft excluded from
public Work, homepage, direct project lookup, sitemap and structured data.

To regenerate media while port 3218 is free:

```sh
node scripts/capture-portfolio-pilot.mjs
```

The script owns an isolated development server/browser and cleans them up. It
does not use or stop the ordinary development server. PNGs are real local captures;
the WebM is an unedited local switching recording, not a performance measurement.
The before navigation and gallery images include reconstruction labels and the manifest
records the overrides. Homepage content shown in this capture is still placeholder
copy, with no published project inventory. The gallery comparison uses the existing
synthetic media fixtures; the earlier layout is cropped to the current panel height.
After recapture, compare the manifest dimensions with the draft's intrinsic media
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

Next review: directory hierarchy, evidence captions and the focused recordings.
Then continue refining the remaining Work, About, Lab and Contact screens before
publication/featured review and populated deployed performance verification.
