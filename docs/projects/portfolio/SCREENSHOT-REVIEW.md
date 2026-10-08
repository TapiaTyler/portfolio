# Portfolio screenshot review

## Current presentation — 2026-10-08

- Editorial remains the opening image, with a refreshed ink-landscape capture and
  finalized English hero copy, even though Product is now the site's default.
- Five matched 1440 × 1000 home captures appear in one comparison stage: Product,
  Editorial, Engineer, Digital and Chronicle. Named controls select one view; no
  autoplay. A native scroll strip provides the no-JavaScript fallback.
- Chronicle's challenge retains the original/current desktop pair and its motion
  recording. Landscape-home and dossier stills no longer lengthen the gallery;
  their historical capture files remain available.
- A fresh 844 × 390 landscape-home capture records compact dots and reserved header
  spacing. Heading/control clearance is checked at 568, 667 and 844 pixels wide.
- Dated `*-2026-10-08-refreshed.png` URLs prevent stale optimized thumbnails.
  Provenance is in `presentations-2026-10-08-refreshed.capture.json`.
- Refreshed October 8 morphing and route-navigation videos cover all five modes,
  with matching Product posters. Chronicle's October 7 video keeps its matching
  poster and recorded sequence; historical route/morphing assets remain preserved.

The sections below preserve the previous review and completion notes.

Reviewed 2026-10-07 against the published record and current composition code at
baseline d883935. This is an asset review, not a fresh runtime or accessibility audit.
The findings below describe the pre-refresh set. A subsequent October 7 pass
created the dated assets described in the completion note below.

## Visible evidence inventory

The case study uses four homepage screenshots in the composition comparison, one
morphing recording, one Chronicle recording, one route recording, and an iteration
gallery (three images before refresh, four afterwards). Its preview image is editorial-home.png. Other files in the media directory
remain historical or unused evidence; their presence does not mean they are rendered.

| Asset                        | Finding                                                                                                                                 | Recommended action                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| editorial-home.png           | Shows the removed ampersand study and earlier metadata/header. It is also the project preview and morphing-video poster.                | Highest priority: capture the current ink-landscape homepage; separate the video poster from the refreshed preview so it still matches its recording.           |
| engineer-home.png            | Clearly shows the records composition, but counts only two projects and uses older roles/technology rows.                               | Recapture with the same three-project inventory as the other modes.                                                                                             |
| digital-home.png             | Clear spatial hero; the 1000px viewport barely reaches Selected Work, so project composition is not demonstrated.                       | Refresh the hero and use a complementary collection/section view if needed within the existing media budget.                                                    |
| chronicle-home.png           | Good full-screen composition evidence, but only two projects and obsolete About placeholder copy.                                       | Recapture with current inventory, About content and profile controls.                                                                                           |
| chronicle-before-home.png    | Authentic initial build; empty project panel, conventional disclosures, old controls and development badge explain the later revisions. | Preserve unchanged and identify it as historical.                                                                                                               |
| chronicle-landscape-home.png | Demonstrates identity beside the project strip. Topic text reaches/clips at the lower frame and the image shows the old preview.        | Recapture; inspect the selected card's frame gutters and readable copy at 844 × 390. Native overflow is intentional, but a still should communicate it clearly. |
| chronicle-case-study.png     | Shows the dossier/evidence layout, but its chapter list and narrative predate the shorter contract; the embedded preview is also old.   | Recapture the current opening or a representative chapter with readable evidence.                                                                               |

## Other screenshots and posters inspected

- chronicle-case-study-landscape.png illustrates contained reading, but shows the old
  narrative; lower text is cut at the panel edge. It is not referenced by the current
  published body. Keep historical or refresh if it becomes selected evidence.
- chronicle-portrait-home.png shows the portrait fallback with clipped lower card
  content. It is also not referenced by the current body. A future portrait capture
  should show a useful selected-card or tab state without suggesting content is lost.
- chronicle-interactions.png matches the older two-project Chronicle state. Refresh
  it together with its recording, or retain both explicitly as a dated demonstration.
- route-transitions.png and disclosure-interactions.png belong to older recordings
  not referenced by the current body. The disclosure poster contains a nested copy
  of the demonstration and a partially visible player: avoid reusing it as standalone
  product evidence. A new recording should avoid capturing its own player.

## Comparability and readability

The four desktop home images share a 1440 × 1000 capture size. That is useful for
comparison, but Editorial/Digital mostly show the hero while Engineer/Chronicle also
show project organization. Keep a matched homepage set and explain that it compares
opening compositions; use focused evidence for deeper layout claims. Do not replace
real product evidence with atmospheric artwork.

The Chronicle iteration gallery mixes a desktop before, landscape-phone after and
desktop case study. These show distinct improvements, but are not like-for-like
before/after views. Prefer a desktop-before/desktop-after pair, then show the phone
or dossier as a separately identified responsive/reading example. Stay within the
published gallery and media limits.

## Provenance and capture tooling

- PNG dimensions match every PNG entry in the current capture manifest.
- The two Chronicle initial captures match their recorded source files byte for byte.
- The manifest's top-level updatedAt predates later per-file captures. A refresh
  should update that bookkeeping without changing historical capture dates.
- capture-portfolio-chronicle.mjs hardcodes a two-project content-state description;
  update it for the actual inventory before recording another capture batch.
- The current editorial alt text describes an asymmetric hero that will no longer
  match the new capture; update it and the caption with the image.
- theme-morphing uses editorial-home.png as its poster. Replacing that image alone
  would give the old recording a visually mismatched new poster. Preserve a dedicated
  historical poster or refresh the recording and poster together.

## Suggested refresh sequence

1. Preserve superseded stills/recordings and their provenance in the evidence archive.
2. Refresh the project preview and matched four-mode home set against one revision.
   Capture the new preview before other themes so nested project thumbnails use it.
3. Capture current Chronicle desktop, landscape and contained-reading states; revise
   the iteration comparison to make matching and differing viewports explicit.
4. Refresh motion demonstrations and matching posters together if presenting them
   as current; retain useful older demonstrations with dated labels otherwise.
5. Update dimensions, alt text, concise captions and manifest entries, then verify
   the actual case study across all four themes and the image gallery.

## Refresh completion — 2026-10-07

- Eight dated stills capture the current four-mode home set and Chronicle responsive/dossier views.
- Four dated silent recordings and matching posters refresh the demonstrations.
  Morphing now visits all four modes; the disclosure demonstration uses the current
  Engineering details and avoids capturing its own player.
- The published iteration gallery now starts with a desktop-before/desktop-after
  pair, followed by the landscape-phone and dossier examples.
- Updated alt text/captions and a dedicated morphing poster align with the captures.
- The previous public set and manifest remain unchanged in evidence/pre-ink-refresh
  with hashes. The initial Chronicle before captures are retained unchanged.
- Manifest update bookkeeping and dated URLs prevent the stale thumbnail issue.

The short landscape card still uses contained overflow; the capture preserves that
actual behavior. A later layout pass can refine topic fit. No product layout was
modified as part of this evidence refresh.
