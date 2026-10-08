# Production performance review

Initial baseline measured 2026-10-01 (Hawaii time); latest populated four-mode
refresh measured 2026-10-07. Historical sections retain their original conditions.
The latest local production results below are not deployed or field acceptance.

## Reproduce

Use Node.js 24, install dependencies and the Playwright Chromium browser, then:

```sh
npm run build
npm run audit:performance -- --label=current
# Optional: focus on one or more registered modes
npm run audit:performance -- --label=chronicle-refined --modes=chronicle
# Optional: measure a public Work index or case study
npm run audit:performance -- --label=portfolio-current --route=/en/work/portfolio
# Record the reduced-motion path, including homepage interaction diagnostics
npm run audit:performance -- --label=current-reduced --motion=reduce
```

The script starts and stops its own production server on `127.0.0.1:3219`.
Leave that port free. Chromium uses an available debugging port. Each mode is
audited in a fresh browser with its preference supplied as a request cookie.
HTML reports, Lighthouse JSON and a combined `summary.json` are saved under
`.cache/performance/<label>/`, ignored by Git. By default, it audits all four
registered modes: Editorial, Engineer, Digital and Chronicle. Use the optional
comma-separated `--modes=` argument to audit a subset; unregistered and duplicate
mode names are rejected. Failures return a nonzero exit status. Run one audit
process at a time.

`--motion=` accepts `no-preference` (default) or `reduce`. Chromium's browser-level
switch sets the preference for Lighthouse's target; the script verifies the media
query and theme inside the measured document using an informational, zero-weight
audit. Interaction contexts use the same preference. Reports record the setting
and fail if the measured document disagrees. With no label, reduced-motion output
uses `current-reduced-motion`, leaving the default normal-motion report intact.

`--route=` accepts a locale homepage, Work index or project route without query
parameters. Non-homepage audits measure loading only; homepage interaction
diagnostics are omitted rather than reported as measurements of another route.
Missing routes or non-200 documents fail the audit.

The script also measures mobile menu mode changes, waiting for the selected
composition and fonts. Timings include Playwright click/polling overhead and
are not an INP measurement. It additionally samples desktop Home → About → Back
navigation in each selected mode, recording content availability, choreography
completion, main-thread long tasks and requestAnimationFrame gaps. A focused
single-mode audit starts from Editorial and measures a switch into that mode.

## Conditions

- Windows, Node.js 24.21.0, Lighthouse 13.5.0, Chromium 153.0.8010.12.
- Next.js production build, `/en`, local loopback server.
- Lighthouse default mobile settings and simulated throttling; see the
  [official Lighthouse project](https://github.com/GoogleChrome/lighthouse).
- Two complete runs: `baseline` and `repeat`, measuring Editorial, Engineer,
  then Digital. Server startup/cache warmth can affect comparison.
- Provisional English homepage; no published project records or project images.
- Preview configuration: indexing disabled and no public origin configured.
- Mode switching: 390×844 viewport without artificial throttling.

## Results

Ranges include both runs. FCP/LCP are seconds; TBT is milliseconds.

| Mode      | Performance | FCP       | LCP       | TBT     | CLS    |
| --------- | ----------- | --------- | --------- | ------- | ------ |
| Editorial | 95–99       | 1.51–1.67 | 2.11–2.79 | 28–33   | 0      |
| Engineer  | 97          | 1.36      | 2.49      | 16–16.5 | 0.0318 |
| Digital   | 96          | 1.51      | 2.64      | 15–15.5 | 0.0003 |

All runs scored 100 for automated Accessibility and Best Practices. These
supplement the existing accessibility tests and manual review; they do not
establish full WCAG conformance.

SEO scored 63 because the preview deliberately blocks indexing. Keep that
protection until the domain and final content are ready. Public launch SEO
acceptance remains pending.

### Initial resource delivery

Lighthouse transfer sizes, rounded to KiB (1024 bytes):

| Mode      | JavaScript | CSS | Fonts | Project images |
| --------- | ---------- | --- | ----- | -------------- |
| Editorial | 145.7      | 8.8 | 93.4  | 0              |
| Engineer  | 145.7      | 8.8 | 61.8  | 0              |
| Digital   | 145.7      | 8.8 | 87.2  | 0              |

The repeat report confirms these font requests:

- Editorial: Inter and Cormorant Garamond regular/italic.
- Engineer: JetBrains Mono and Space Grotesk.
- Digital: Inter and JetBrains Mono.

Unused mode fonts were not requested during initial loads. Digital's portal is
inline SVG/CSS and adds no separate heavy graphics package. All modes share
the same transferred JavaScript and stylesheet sizes. Inline decorative SVG
contributes to the document rather than a separate image request.

### Theme switching

The sequence starts from Editorial with the local server running:

| Destination | Elapsed time across both runs |
| ----------- | ----------------------------- |
| Engineer    | 122 ms                        |
| Digital     | 78–80 ms                      |
| Editorial   | 67–68 ms                      |

Newly required fonts can load during the sequence. These are local observations,
not fully cached-font or real network timings. Existing browser tests cover
persistence, server selection before paint and switching without JavaScript.

## Decisions and remaining review

Every measured mode meets the initial Performance, Accessibility and Best
Practices score targets. No application styling or composition change was
required in this pass. Preserve approved typography and mode-specific delivery.

Lighthouse flags render-blocking stylesheet/font dependency chains and about
13 KiB of legacy JavaScript; some runs also flag about 29 KiB of unused
JavaScript. These remain optimization candidates. The current bundle has no
added Digital graphics runtime to remove.

LCP remains a launch review item: Digital measured about 2.64 seconds and
Editorial varied between 2.11 and 2.79 seconds. Watch Engineer's small nonzero
layout shift when real copy is added. Repeat on the chosen deployment with
final content before selecting a font preload or bundle change. Avoid globally
preloading every mode's fonts.

The shared image renderer uses intrinsic dimensions, lazy loading and Next image
delivery for local production images. Video uses `preload="none"`. Synthetic
preview image ratios and failed-media behavior have browser coverage. Remote
images bypass optimization pending an approved host policy.

No real production image was downloaded in these audits. Review responsive
`sizes`, compression/format, critical loading and remote host policy when real
assets enter the public registry. The shared desktop `sizes` hint currently
assumes 1200px; narrower project deck placements need appropriate hints when
raster assets are integrated.

Remaining acceptance includes populated Work/case-study routes, Japanese fonts
and content when available, representative devices, deployed server response,
final image delivery and field Core Web Vitals. Local simulated results cannot
establish those outcomes.

## Theme-switch integration follow-up

The `theme-transitions-final` production audit on the same date and equipment
measured the new snapshot transition system. Initial-load results remain within
the baseline range:

| Mode      | Performance | LCP (seconds) | CLS    |
| --------- | ----------- | ------------- | ------ |
| Editorial | 95          | 2.79          | 0      |
| Engineer  | 97          | 2.48          | 0.0318 |
| Digital   | 96          | 2.64          | 0.0003 |

Automated Accessibility/Best Practices remain 100; preview SEO remains 63.
JavaScript transfer was approximately 146.8 KiB and CSS 9.1 KiB, an increase of
about 1.2 KiB JavaScript and 0.3 KiB CSS over the original baseline. No animation
package or extra font family was added.

| Destination | Composition/fonts ready | Choreography finished |
| ----------- | ----------------------- | --------------------- |
| Engineer    | 131 ms                  | 515 ms                |
| Digital     | 76 ms                   | 775 ms                |
| Editorial   | 60 ms                   | 644 ms                |

`elapsedMs` retains the composition/font readiness measurement;
`animationFinishedMs` also includes the intentional geometry animation and test
polling overhead. The additional visual duration is not a delay before the new
composition becomes available. Slow capture releases after 1500 ms, and reduced
motion avoids the choreography. These local timings are not field interaction
metrics. The previous LCP/content/deployment limitations still apply.

## Theme-specific motion follow-up

The `theme-motion-final` production run measured the entrance/reveal and interaction
layer with the same mobile simulation and placeholder content:

| Mode      | Performance | LCP (seconds) | CLS    |
| --------- | ----------- | ------------- | ------ |
| Editorial | 95          | 2.79          | 0      |
| Engineer  | 97          | 2.49          | 0.0318 |
| Digital   | 96          | 2.65          | 0.0003 |

Accessibility and Best Practices remain 100 in every mode. SEO remains 63 because
indexing is intentionally disabled. JavaScript transfer is approximately 148.1 KiB
and CSS 9.8 KiB. There is no new animation dependency or additional font family.
The motion layer adds approximately 1.3 KiB JavaScript and 0.7 KiB CSS over the
theme-switch integration. Entrances leave text opaque and do not delay content
availability; the initial-load scores remain within the measured baseline range.

Switch readiness measured 152ms for Engineer, 75ms for Digital and 73ms for
Editorial; choreography finished at 535ms, 775ms and 657ms respectively. The audit
now lets the mode menu's opening animation finish before starting the switch
timer, so browser automation's element-stability wait is not counted as mode
selection latency. These are local diagnostics, including action/font/click
overhead, rather than field interaction metrics.

All previous real-content, image, deployment and field-performance limitations
remain. See [THEME-MOTION.md](THEME-MOTION.md) for motion behavior and safeguards.

## Route-motion follow-up

The `route-motion` audit, after adding Digital project expansion and Editorial page
turns, measured Performance 98/97/96 for Editorial/Engineer/Digital. Accessibility
and Best Practices remained 100; SEO remained 63 with preview indexing disabled.
LCP was 2.27/2.48/2.63 seconds and CLS 0/0.0318/0.0003. Script transfer was about
149.5 KiB and CSS 10.5 KiB, without a new animation dependency. Run-to-run differences
do not establish a performance improvement. The final pointer-layer correction
changes only route snapshot CSS and capture naming; this audit predates that fix.

These initial-load audits contain no published projects and do not measure a real
project opening. The Digital intro now loads its lead image eagerly for snapshot
continuity, while cards and narrative media retain lazy loading. Review its real
asset loading and deployed navigation timings after content integration. Existing
placeholder/deployment/field limitations remain.

## Full motion refresh — 2026-10-03

Rebuilt the current application and ran `motion-refresh` and
`motion-refresh-repeat` sequentially with the same Node, Lighthouse and Chromium
versions listed above. These cover the current headers, secondary-page styles,
microinteraction controllers, gallery and disclosure code, and theme/route
transition system in the production bundle. Lighthouse still loads the provisional
`/en` homepage; it does not activate every interaction or load draft case studies.

### Mobile initial load

| Mode      | Performance | FCP (seconds) | LCP (seconds) | TBT (ms) | CLS    |
| --------- | ----------- | ------------- | ------------- | -------- | ------ |
| Editorial | 95–98       | 1.66–1.67     | 2.26–2.79     | 13–13.5  | 0      |
| Engineer  | 96–97       | 1.36          | 2.63–2.64     | 13–16.5  | 0.0320 |
| Digital   | 95          | 1.51          | 2.78–2.79     | 12–14.5  | 0.0004 |

Every run exceeded the Performance target of 90. Automated Accessibility and Best
Practices remained 100 in all modes. SEO remained 63 because indexing is intentionally
disabled while content integration and deployment are deferred. Neither run emitted
Lighthouse runtime warnings.

The latest earlier `route-motion` audit scored 98/97/96 with LCP 2.27/2.48/2.63
seconds. Engineer and Digital now measure about 0.15 seconds slower; Digital's
score is one point lower, and Editorial still varies within the original range.
These observations do not isolate animation cost: the intervening changes also
added header behavior, content, components and secondary-page styles. The scores
remain acceptable, but the simulated LCP in Engineer and Digital exceeds the
2.5-second good-LCP threshold and remains a release review item. Lab results do
not establish field Core Web Vitals.

All modes transferred approximately 157.2 KiB JavaScript and 15.0 KiB CSS, up
7.7 KiB and 4.5 KiB respectively from `route-motion`. Font transfer remains
93.4/61.8/87.2 KiB for Editorial/Engineer/Digital, with only the active mode's
families requested on initial load. No project image was downloaded and no heavy
graphics runtime was added. Existing findings remain: font/stylesheet dependency
chains, approximately 13 KiB legacy JavaScript and, in most runs, 29 KiB unused
JavaScript. Preserve the mode-specific font delivery when investigating these.

### Interaction measurements

Mobile mode selection at 390×844, without artificial throttling:

| Destination | Composition/fonts ready | Choreography finished |
| ----------- | ----------------------- | --------------------- |
| Engineer    | 135–152 ms              | 519–535 ms            |
| Digital     | 73–74 ms                | 774 ms                |
| Editorial   | 73 ms                   | 656–657 ms            |

Desktop header navigation from Home to About at 1440×900, also unthrottled:

| Mode      | Content visible | Choreography finished | Back choreography finished |
| --------- | --------------- | --------------------- | -------------------------- |
| Editorial | 75–81 ms        | 698–716 ms            | 671–678 ms                 |
| Engineer  | 83–89 ms        | 355–365 ms            | 298 ms                     |
| Digital   | 85–86 ms        | 840–877 ms            | 809–817 ms                 |

Back content became visible in 6–7 ms. These include automation overhead and
intentional visual duration; they are not field INP measurements. The route
sampler recorded zero main-thread long tasks (over 50 ms) across all twelve
navigation windows. Maximum requestAnimationFrame gaps were approximately
17–50 ms. Two first-run gaps narrowly exceeded 50 ms before rounding; neither
recurred in the repeat. This sample does not demonstrate consistent 60fps:
requestAnimationFrame timing is not compositor/GPU presentation timing, and a
local desktop cannot establish performance on a slower mobile device.

Populated development previews are checked separately for actual project opening,
horizontal page turns, theme morphing, disclosure replay/reversed closure, pointer
lighting, image-gallery expansion/contraction, reduced motion and mobile controls.
Those browser checks verify behavior rather than assign production performance
scores to draft content. All 23 targeted preview scenarios passed across the
initial run and focused reruns. Corrected older test locators that selected the
new mobile section index instead of technical disclosures, and replaced an
obsolete immediate glow reset expectation with the approved retained-position
behavior while focus keeps the glow visible. Script/test lint and formatting
checks passed. Next's development diagnostics also flagged the pilot's first
comparison image as an LCP candidate; review its loading priority with the final
case-study composition instead of making every narrative image eager.

The pilot remains unpublished, so production audits of
populated project pages and real media delivery remain pending.

No animation timing or approved visual treatment was changed in this review.
The next performance acceptance pass should use the integrated project content,
real media and a Vercel preview, including representative mobile hardware and
interaction profiling. Deployment remains deferred at Tyler's request until the
other projects are ready and integrated.

## Chronicle refinement audit — 2026-10-03

Ran `chronicle-refined` after the production build with
`npm run audit:performance -- --label=chronicle-refined --modes=chronicle`.
This is a single Lighthouse mobile-simulation run on `/en`, with Chronicle
selected by request cookie, local production server, placeholder portfolio
content, and indexing disabled. It does not represent deployed or field data.

Scores: Performance 83, Accessibility 100, Best Practices 100 and SEO 63. The
SEO score remains constrained by the intentional no-index preview setting. FCP
was 1.061 seconds, LCP 4.666 seconds, TBT 40 ms and CLS 0. The Chronicle result
is below the Performance target of 90; the measured LCP needs investigation.

Initial transfer was 162,759 bytes of JavaScript, 23,644 bytes of CSS, no font
files and 692,381 bytes of images. The image requests were `landscape-v2.webp`
(298,072 bytes transferred), `sakura-corner.webp` (219,542 bytes),
`crystal-corner.webp` (174,180 bytes) and `monogram.svg` (587 bytes). Lighthouse's
image-delivery insight estimated about 294 KiB in savings across the three large
WebP assets. It identified the Chronicle hero section as the LCP candidate and
reported that its image request was not discoverable from the initial document;
the hero artwork is currently a CSS background. Other findings included about
450 ms of render-blocking savings, 29 KiB of unused JavaScript and 13 KiB of
legacy JavaScript. No Lighthouse runtime warnings were reported.

In the unthrottled 390×844 mobile switch sample, moving from Editorial to
Chronicle took 120 ms until the composition and fonts were ready and 801 ms
through the end of the transition. Desktop Home → About at 1440×900 showed
content in 80 ms and finished its transition in 692 ms; Back showed content in
7 ms and finished in 585 ms. Neither route sample observed a main-thread long
task. The About sample recorded three animation-frame gaps above 50 ms, with a
maximum of 67 ms; the Back sample's maximum was 50 ms. These local timings
include automation overhead and do not measure compositor frame rate or field
INP.

This result adds Chronicle to the performance review; historical tables above
remain the earlier three-mode measurements. Review the CSS background LCP
discovery and large decorative artwork before the next Chronicle audit.

### Chronicle optimized follow-up — 2026-10-03

After reducing the Chronicle artwork for mobile and adding a high-priority,
discoverable preload, reran the same focused command with label
`chronicle-refined-optimized`. Conditions, route and single-run limitation match
the Chronicle refinement audit above. Performance improved from 83 to 89, still
one point below the target of 90. Accessibility and Best Practices remained 100;
SEO remained 63 because indexing is disabled. FCP was 1.059 seconds, LCP 3.759
seconds, TBT 28 ms and CLS 0.

Image transfer fell from 692,381 bytes to 281,858 bytes (about 59%). JavaScript
was unchanged at 162,759 bytes, CSS was 23,665 bytes and no font files were
requested. The browser requested one each of `landscape-v2-compact.webp`
(141,366 bytes transferred), `sakura-corner-compact.webp` (77,929 bytes), and
`crystal-corner-compact.webp` (61,976 bytes), plus `monogram.svg` (587 bytes).
The Lighthouse request-discovery checklist now passes all three checks:
high priority, discoverable in the initial document and not lazy-loaded. No
duplicate asset request appeared in the network-request audit. Estimated image
compression savings fell from about 294 KiB to about 96 KiB.

The remaining scored findings were LCP 3.8 seconds, unused JavaScript (29 KiB),
legacy JavaScript (13 KiB), and render-blocking savings estimated at 450 ms.
The LCP discovery and priority findings are resolved in this run, but overall
LCP remains over the 2.5-second good threshold. The Lighthouse LCP breakdown
listed approximately 158 ms TTFB, 11 ms resource-load delay, 14 ms resource-load
duration and 68 ms element-render delay; this sub-breakdown does not account for
the full 3.759-second reported LCP, so repeat and inspect its trace before
attributing the remaining delay.

Unthrottled mobile switching from Editorial to Chronicle measured 120 ms until
composition/fonts were ready and 784 ms through choreography. On desktop,
Home → About showed content in 110 ms and finished in 715 ms; Back showed content
in 7 ms and finished in 584 ms. Neither route sample recorded a long task. About
had one animation-frame gap above 50 ms (maximum 50 ms); Back also peaked at
50 ms. These local automation timings are not compositor FPS or field INP.

### Chronicle mobile-corner follow-up — 2026-10-03

After adding 320px mobile corner artwork with matching mobile-only background
overrides, ran `chronicle-refined-final` using the same focused audit command and
conditions above. Performance reached 91, meeting the initial score target;
Accessibility and Best Practices remained 100 and SEO remained 63 due to
intentional no-indexing. FCP was 1.059 seconds, LCP 3.459 seconds, TBT 26 ms and
CLS 0. The score target is met, though LCP still exceeds 2.5 seconds and remains
a review item.

Image transfer fell from 281,858 to 209,181 bytes (about 25.8% from the previous
run, 69.8% from the initial Chronicle run). The request list contained exactly
one each of `landscape-v2-compact.webp` (141,366 bytes transferred),
`crystal-corner-mobile.webp` (29,806 bytes),
`sakura-corner-mobile.webp` (37,422 bytes), and `monogram.svg` (587 bytes); no
duplicate image requests appeared. Desktop artwork retains larger delivery
sizes and is outside this mobile Lighthouse viewport. Lighthouse still
reported approximately 61 KiB estimated image savings. The LCP preload checks
for priority, initial-document discoverability and eager loading all passed.
JavaScript was 162,759 bytes, CSS 23,729 bytes and no font files were requested.

Other scored findings included 17 KiB estimated unused CSS, 29 KiB unused
JavaScript, 13 KiB legacy JavaScript, a forced-reflow insight and approximately
450 ms potential render-blocking savings. No Lighthouse runtime warnings were
reported.

The unthrottled mobile switch sample measured 122 ms until Chronicle and its
fonts were ready and 785 ms through choreography. Desktop Home → About showed
content in 98 ms and finished in 659 ms; Back showed content in 7 ms and finished
in 567 ms. Neither sample recorded a long task. The About transition had three
frame gaps above 50 ms (the reported rounded maximum was 50 ms); Back had none
and a maximum gap of 34 ms. These local timings include automation overhead and
are not compositor FPS or field INP.

## Chronicle microinteraction pass — 2026-10-04

Same focused command and conditions as the Chronicle audits above (single mobile
Lighthouse runs on the empty public `/en`, local production server, indexing off).

The first run after the wide-screen, ornament, font-weight and load-choreography work
measured Performance 81 and LCP 5.14s. The LCP element (the hero) loaded quickly in the
trace; the simulated delay came from other requests sharing bandwidth before it painted
(images 402 KiB). Changes, re-measured after each step:

| Change                                                                                         | Performance | LCP        |
| ---------------------------------------------------------------------------------------------- | ----------- | ---------- |
| Baseline after the new work                                                                    | 81          | 5.14s      |
| Defer glass-button hover/pressed art to idle after load; phone corner art for home-tab corners | 87          | 3.99s      |
| Glass-button states re-encoded at 600px (2× display width; ~72 → ~21 KiB each)                 | 87–88       | 3.91–3.98s |
| Scene haze disabled (attribution only, not kept)                                               | 88          | 3.91s      |
| Portrait scene 780px WebP q72 (141 → 97 KiB)                                                   | 89–92       | 3.31–3.69s |

The haze wake-up has no measurable cost. Remaining pre-LCP bytes are the portrait
scene, phone corner art, two Cormorant weights (500/700, 46 KiB) and small ornaments.
These are local simulated results, not field data.

## Populated four-mode refresh — 2026-10-07

Built the current working tree with npm run build (content validation and TypeScript
passed), then ran two sequential audits:

```sh
npm run audit:performance -- --label=populated-2026-10-07
npm run audit:performance -- --label=populated-2026-10-07-repeat
```

Windows, Node 24.21.0, Chromium 153.0.8010.12 and Lighthouse 13.5.0;
mobile simulated load on /en, local production server on port 3219. Each mode used
a fresh browser and its preference cookie. The site has three published/featured
records (Nihonest, Portfolio, Japan Travel Planner), the current Editorial ink artwork,
current About/profile content and refreshed Portfolio evidence. Opening copy remains
provisional; indexing remains disabled. This supersedes the empty-inventory baseline
for current homepage performance, not its historical record.

### Mobile load results

Ranges cover both runs. FCP/LCP are seconds, TBT milliseconds. Performance target ≥90.

| Mode      | Performance | FCP       | LCP       | TBT     | CLS     |
| --------- | ----------- | --------- | --------- | ------- | ------- |
| Editorial | 97–99       | 1.06–1.67 | 1.96–2.49 | 12.5–15 | 0.00008 |
| Engineer  | 95          | 1.51      | 2.79–2.86 | 13–15.5 | 0.03201 |
| Digital   | 94          | 1.51      | 3.01      | 12.5–14 | 0.00042 |
| Chronicle | 79          | 1.36      | 5.49      | 29      | 0.00007 |

All four modes: Accessibility 100, Best Practices 100, SEO 66. The SEO audit reports
intentional indexing blockage; keep that guard until release. No Lighthouse runtime
warnings occurred. Automated accessibility scores are not a complete WCAG audit.
Engineer/Digital meet the score target while LCP exceeds the 2.5-second good threshold.

JavaScript transfer is 167,466 bytes and CSS 31,567 bytes in every mode. Image
transfer: Editorial about 173 kB, Engineer/Digital 54 kB, Chronicle 613 kB. No project
video was requested during the homepage audits; these load scores are
not measurements of case-study playback or gallery interaction.

### Chronicle finding

The 79 score and 5.49s LCP repeat almost identically. The hero is the LCP element;
its background priority, initial-document discovery and eager-loading checks pass.
Two card-frame assets transfer 313,322 bytes combined (about 306 KiB):
project-frame-active.webp 203,736 bytes and project-frame.webp 109,586 bytes. They
account for about 51% of Chronicle image transfer. The scene adds 97,557 bytes;
phone corner artwork adds 67,228 bytes. Real project thumbnails add 54,296 bytes.

Low TBT and near-zero CLS point toward image/network delivery as the first area to
investigate, rather than establishing an animation CPU bottleneck. This is an
inference, not an isolated attribution experiment. The earlier 89–92 Chronicle
measurements used an empty inventory and are not comparable populated acceptance.
Lighthouse also flags about 111 KiB potential image savings and render-blocking CSS.

Next optimization: create smaller responsive card-frame derivatives while preserving
the decorative shape and glow, review eager/idle asset competition, then repeat the
focused Chronicle audit. Do not remove motion solely based on this load score.

### Theme switching and navigation

The repeat's unthrottled mobile samples (390 × 844):

| Destination | Composition/fonts ready | Choreography finished |
| ----------- | ----------------------- | --------------------- |
| Engineer    | 155 ms                  | 536 ms                |
| Digital     | 76 ms                   | 775 ms                |
| Chronicle   | 125 ms                  | 828 ms                |
| Editorial   | 92 ms                   | 670 ms                |

The first run recorded one anomalous Digital sample at 9,896/9,897 ms. It did not
recur; its cause is unconfirmed and the raw result is retained. Do not present that
sample as a confirmed application regression or silently omit it from the record.

Across 16 desktop Home → About/Back samples (1440 × 900), About content appeared in
87–106 ms and Back in 9–14 ms. No main-thread long task was recorded. Choreography
ranges: Editorial 686–807 ms, Engineer 308–434 ms, Digital 814–867 ms, Chronicle
605–688 ms. Occasional RAF gaps reached 83 ms. These observations include automation
overhead, are not compositor FPS or field INP, and do not establish universal
smoothness on real devices.

### Artifacts and remaining work

Raw JSON, HTML and summary reports are in the ignored directories
.cache/performance/populated-2026-10-07 and
.cache/performance/populated-2026-10-07-repeat. The audit script's conditions label
now describes the actual typed inventory instead of the former placeholder-only set.
This pass changed audit metadata and documentation; no product optimization was applied.

Remaining: Chronicle frame delivery, representative Work/project route load and
media interaction audits, deployed verification and field Core Web Vitals when hosted.

## Chronicle responsive frame optimization — 2026-10-07

Implemented the first delivery pass following the populated baseline. At viewport
widths up to 900px, project cards, case-study evidence and the theme picker use
720px frame derivatives instead of 1200px originals. Source border slices scale
by 0.6; rendered border widths, artwork, composition and motion remain unchanged.
Desktop frames and original PNGs are retained. The reproducible generator is
`scripts/optimize-chronicle-frames.mjs`; the asset manifest records encoding and provenance.

Two fresh focused production audits used the same three-project homepage, default
mobile simulated throttling, local server and disabled indexing as the baseline:

| Metric         | Populated baseline (two runs) | Compact frames (two runs) |
| -------------- | ----------------------------- | ------------------------- |
| Performance    | 79 / 79                       | 83 / 84                   |
| FCP            | 1.36s / 1.36s                 | 1.39s / 1.37s             |
| LCP            | 5.49s / 5.49s                 | 4.61s / 4.54s             |
| TBT            | 29ms / 29ms                   | 40.5ms / 22.5ms           |
| CLS            | 0.00007 / 0.00007             | 0 / 0.00007               |
| Image transfer | 613,223 bytes                 | 410,756 bytes             |

The frame pair now transfers 110,855 bytes, down from 313,322 bytes (65% less).
Overall image transfer falls 33%, and observed LCP improves about 0.9 seconds
(16–17%). Accessibility and Best Practices remain 100; SEO remains 66 due to the
intentional indexing guard. No Lighthouse runtime warnings occurred. These local
measurements demonstrate an improvement, but do not meet the Performance ≥90 or
good LCP targets and do not establish deployed Core Web Vitals.

Visual and browser checks covered portrait 390×844, landscape 844×390 and desktop
1440×900 cards, selection changes, case-study frames and the opened mobile theme
picker. Rendered border widths remain 46px (selected cards), 40px (evidence) and
7px/9px (picker). Mobile network checks, including opening the picker, requested
only compact frames; desktop cards retain their original assets and slices.

Theme-switch diagnostics measured Chronicle ready at 171–172ms and choreography
finished at 845ms. Four unthrottled desktop About/Back samples recorded no long
tasks; occasional RAF gaps reached 83ms. These are small local automation samples,
not field INP or compositor FPS measurements.

Raw JSON, HTML and summaries are retained in the ignored directories
`.cache/performance/chronicle-frame-compact` and
`.cache/performance/chronicle-frame-compact-repeat`. The baseline reports remain
available for comparison. Next: investigate nonessential asset competition and
render-blocking CSS, followed by another isolated measured pass. Representative
Work/project loads, media interactions and deployed verification remain pending.

## Chronicle loading priority — 2026-10-07

Removed idle prefetching of glass-button hover and pressed artwork. Idle callbacks
can run while images are still in flight; CSS now requests each state only when
hovered, keyboard-focused or pressed. Each state keeps the already loaded base
image underneath, preserving its frame during a first interaction on a slow network.
Chronicle card thumbnails retain eager loading for horizontal selection, but use
low fetch priority and composition-specific responsive sizes. Shared media defaults
are preserved for other compositions. No motion, content or typography was removed.

| Metric         | Previous frame pass (two runs) | Final priority pass (two runs) |
| -------------- | ------------------------------ | ------------------------------ |
| Performance    | 83 / 84                        | 85 / 85                        |
| FCP            | 1.39s / 1.37s                  | 1.52s / 1.52s                  |
| LCP            | 4.61s / 4.54s                  | 4.29s / 4.29s                  |
| TBT            | 40.5ms / 22.5ms                | 31ms / 45ms                    |
| CLS            | 0 / 0.00007                    | 0.00007 / 0.00007              |
| Image transfer | 410,756 bytes                  | 367,386 bytes                  |

The 43,370-byte reduction equals the two unneeded button-state transfers. Compared
with the original populated baseline, image transfer is 40% lower and LCP is about
1.2s faster (22%). FCP increased about 0.15s versus the frame pass; this is not an
improvement in every metric. Both final audits retain Accessibility/Best Practices
100 and intentional SEO 66, with no runtime warnings. Conditions remain local
production, default mobile simulated throttling, three published projects, `/en`.
The final build was measured twice under labels `chronicle-load-priority-final`
and `chronicle-load-priority-repeat`; reports are in `.cache/performance/`.
An intermediate audit (`chronicle-load-priority`) also scored 85 before adding
the persistent base layer and adjusting landscape image sizing.

Production browser checks passed at 390×844, 844×390 and 1440×900: thumbnails
decoded, selection worked, button state assets were absent before interaction and
requested on hover/press, and keyboard focus retained the base artwork. An initial
landscape sizing candidate was too small for cover cropping and was increased
before final verification. Six existing semantic tests, content validation,
production build/type checking and targeted ESLint passed.

Final switch diagnostics: Chronicle composition/fonts ready in 171ms and choreography
finished in 837–853ms. Four desktop About/Back samples recorded no long tasks;
the largest RAF gap was 67ms. These remain unthrottled local automation observations.

The CSS investigation found all mode styles imported by the shared locale layout.
Lighthouse still estimates 13 KiB unused CSS and 760ms render-blocking savings;
these estimates are not additive or guaranteed. CSS delivery was not changed in this
pass. Next: test loading only the active mode's styles initially, ensuring destination
styles are ready before theme morphing and preserving no-flash/reduced-motion
behavior. Performance remains below 90 and LCP above 2.5s; release and representative
Work/project verification are still pending.

## Active-mode stylesheet experiment — 2026-10-07

The first server-only dynamic import candidate still delivered all four mode
stylesheets: 35,793 bytes CSS and Performance 85. It was rejected. Reports remain
in `.cache/performance/active-theme-css` for comparison.

The retained candidate uses SSR-enabled `next/dynamic` component boundaries in
`src/components/theme/active-theme-styles.tsx`. Each component imports the existing
scoped grammar for one mode; the public locale layout renders only the saved mode.
Shared semantic, font, token and interaction/motion resources remain initial.
Development and reference-review layouts keep all mode imports for simultaneous
fixtures. No CSS is copied to public files or generated by an additional pipeline.
Loaded styles remain available for return switches. See D041 and
`THEME-TRANSITIONS.md` for resource readiness and scope behavior.

Two final four-mode audits used the same local production/default mobile simulated
conditions and populated inventory:

| Mode      | Performance (first / repeat) | LCP (first / repeat) | CSS transfer | Previous CSS transfer |
| --------- | ---------------------------- | -------------------- | ------------ | --------------------- |
| Editorial | 97 / 97                      | 2.41s / 2.41s        | 14,834 bytes | 31,646 bytes          |
| Engineer  | 99 / 95                      | 2.11s / 2.78s        | 14,328 bytes | 31,646 bytes          |
| Digital   | 94 / 94                      | 3.02s / 3.01s        | 14,222 bytes | 31,646 bytes          |
| Chronicle | 86 / 86                      | 4.22s / 4.22s        | 25,535 bytes | 31,646 bytes          |

Chronicle CSS transfer falls 19%; other modes save 53–55%. The boundary adds about
1.9 kB of JavaScript (169,238 bytes in Chronicle versus 167,323). Chronicle's repeatable
LCP gain versus the preceding 4.29s pass is modest, about 65–70ms; it remains below
Performance 90. Engineer's 99 score did not repeat: retain the 95–99 range rather
than claiming a confirmed four-point gain. No score regression is apparent relative
to the populated baseline, but two local runs do not prove field performance.
Accessibility/Best Practices remain 100 and intentional SEO 66, with no warnings.
Chronicle FCP stays 1.52s, TBT 38–39ms and CLS 0.00007. Image transfer is unchanged.

Verification: 19 production Playwright tests and four theme unit tests passed.
New regression tests delay each cold destination's CSS by 700ms and compare geometry,
header font and background at morph snapshot readiness with a direct no-JavaScript
render. Existing checks cover both locales, secondary pages, interruptions, reading
position, reduced motion, unsupported API, slow responses, persistence, native forms
and mobile keyboard controls. Additional production checks cover no-JavaScript
initial renders in all four modes, reduced-motion cold switches and cached returns.
Production build/type checks, targeted lint and diff checks passed.

The final four-mode runs recorded composition/font readiness at 80–170ms and
choreography completion at 551–829ms. Sixteen About/Back samples recorded no long
tasks; RAF gaps reached 83ms. These remain small unthrottled automation samples.

Raw reports: `.cache/performance/active-theme-css-boundary` (focused candidate),
`.cache/performance/active-theme-css-four-modes` and
`.cache/performance/active-theme-css-four-modes-repeat` (final comparisons).
Retain the change for its smaller initial style delivery and verified readiness.
Next: inspect Chronicle's remaining image-delivery costs; the load report still
estimates 66 KiB image savings. Representative Work/project media and deployed
verification remain pending.

## AVIF delivery and fallback — 2026-10-07

Encoded seven existing delivery WebPs as AVIF without changing dimensions, crop,
source slices or alpha presence. Frames/corners/button/top rail cap use quality 65,
effort 6 and 4:4:4 chroma; the portrait scene uses quality 50 and 4:2:0. Higher-quality
portrait candidates grew beyond WebP size and were rejected. The reproducible
generator is `scripts/optimize-chronicle-avif.mjs`; the asset manifest records each
variant and retained WebP source/fallback. Original PNGs are untouched.

| Asset                  | WebP bytes | AVIF bytes |
| ---------------------- | ---------- | ---------- |
| Portrait scene         | 97,274     | 58,214     |
| Mobile sakura corner   | 37,140     | 23,550     |
| Mobile crystal corner  | 29,524     | 18,792     |
| Selected compact frame | 69,936     | 34,395     |
| Normal compact frame   | 40,354     | 22,499     |
| Base glass button      | 20,116     | 10,590     |
| Top rail cap           | 6,380      | 4,314      |

CSS image-set selects AVIF first and WebP when AVIF's MIME type is unsupported.
The portrait preload specifies only AVIF plus its type: unsupported clients skip
it, then CSS selects WebP. This avoids preloading both variants. Format selection
does not promise retry after a network error/404. Supporting browsers retain other
existing WebP artwork where no AVIF variant was introduced.

Project screenshots continue using semantic next/image and original PNG sources.
`next.config.ts` enables formats in AVIF/WebP order; the optimizer negotiates using
Accept and returns the original format if neither is supported. No picture wrappers,
content-schema changes or manual screenshot srcsets were needed. See
[Next.js formats](https://nextjs.org/docs/app/api-reference/components/image#formats)
and [CSS image-set](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image/image-set).

The isolated CSS-artwork audit (`chronicle-avif`) scored 89 with 3.70s LCP and
239,014 bytes image transfer. Enabling project-image negotiation then produced:

| Mode      | Performance (first / repeat) | LCP (first / repeat) | Image transfer          |
| --------- | ---------------------------- | -------------------- | ----------------------- |
| Editorial | 97 / 93                      | 2.42s / 3.09s        | 165,193 / 165,190 bytes |
| Engineer  | 96 / 99                      | 2.71s / 2.11s        | 46,516 bytes            |
| Digital   | 94 / 94                      | 3.01s / 3.01s        | 46,516 bytes            |
| Chronicle | 89 / 89                      | 3.71s / 3.70s        | 231,234 bytes           |

Chronicle image transfer is 37% below the preceding active-CSS pass (367,386 bytes),
62% below the original populated baseline (613,223 bytes). LCP improves about 0.51s
versus the active-CSS pass, 1.78s versus the original baseline. FCP is 1.51–1.52s,
TBT 19–20.5ms and CLS 0.00007. Accessibility/Best Practices remain 100 and intentional
SEO 66 across every mode; no warnings. Chronicle remains below Performance 90 and
above good LCP. Editorial/Engineer vary across runs; do not claim stable gains in
those modes or omit Editorial's slower repeat. These remain local mobile simulated
homepage audits, not deployed Core Web Vitals. Optimizer disk caches can be warm;
these are not isolated first-encoding latency tests.

Three new production browser tests passed: AVIF/WebP/original PNG negotiation,
AVIF artwork with no duplicate WebP transfers, and native WebP selection when
the AVIF MIME type is substituted with an unsupported type. The latter simulates
format selection in Chromium, not an actual legacy browser or failed network
request. Visible no-JavaScript backgrounds/frames/corners/button assets decoded
in both branches. Portrait, landscape and desktop interaction checks passed,
including thumbnail selection, hover/press/focus and base-art persistence. AVIF
and WebP rendered comparisons were reviewed, including the scenic source image.
Source dimensions and alpha metadata match. Build/content validation, TypeScript
and targeted lint passed.

Final switch readiness: 79–188ms; choreography finished at 568–847ms. Sixteen
unthrottled About/Back samples recorded no long tasks. These small automation
samples do not establish compositor FPS or field INP.

Reports: `.cache/performance/chronicle-avif`, `avif-formats-four-modes` and
`avif-formats-four-modes-repeat` under the same ignored performance directory.
Next: inspect Chronicle font discovery and remaining render-blocking resources.
Representative Work/project media and deployed verification remain pending.

## Full-theme AVIF and Chronicle font discovery — 2026-10-07

Extended AVIF-first typed image-set delivery to every existing theme raster
variant: nine Editorial and 26 Chronicle assets. Engineer and Digital's project
images already use shared negotiation. Every scenic preload now uses AVIF with
its MIME type and matching viewport conditions. Local raster video posters use
the same Next optimizer; native playback remains `preload="none"`. Original PNGs,
WebPs, vectors, videos and historical evidence remain intact.

The complete artwork inventory is 2,295,402 bytes as WebP versus 1,135,750 as AVIF,
50.5% smaller. This includes retained/non-runtime variants and is not a per-page
transfer claim. See `IMAGE-DELIVERY.md`, `IMAGE-DELIVERY-MANIFEST.json` and
`scripts/optimize-theme-images.mjs` for settings and regeneration.

Chronicle now declares the same Cormorant Garamond binaries in its conditional
stylesheet and preloads weights 500/700 only when initially selected. Weight 600
loads on demand. Public copies preserve the source package's license and hashes;
no font appearance or metrics were intentionally changed. Other modes request
no Chronicle font files. This replaces Next localFont discovery for Chronicle
only, with no content or preference-state changes (D042).

Two final local mobile production audits:

| Mode      | Performance (first / repeat) | LCP (first / repeat) | Image transfer |
| --------- | ---------------------------- | -------------------- | -------------- |
| Editorial | 97 / 93                      | 2.42s / 3.09s        | 119,852 bytes  |
| Engineer  | 96 / 99                      | 2.64s / 2.11s        | 46,516 bytes   |
| Digital   | 94 / 97                      | 3.01s / 2.56s        | 46,516 bytes   |
| Chronicle | 89 / 89                      | 3.73s / 3.72s        | 228,496 bytes  |

Editorial image transfer is about 27.5% below the preceding AVIF pass. Chronicle
is 62.7% below the populated baseline; most of that saving came from earlier
responsive artwork and AVIF work. In this combined asset/font pass Chronicle FCP
improved from 1.51–1.52s to 1.21s in both runs. Its LCP and score did not improve;
the small LCP difference is within local measurement variability. Retain the font
change for earlier discovery and first paint, not a claimed Lighthouse score gain.
These measurements do not isolate fonts from the accompanying artwork changes.

Chronicle TBT is 23–25.5ms, CLS 0, CSS transfer 26,371 bytes and font transfer
46,216 bytes. Accessibility/Best Practices remain 100; SEO remains intentional 66
with indexing disabled. No Lighthouse warnings. Editorial/Engineer/Digital scores
vary between runs; report their ranges. Reports use default Lighthouse mobile
simulated throttling against the local production homepage; optimizer caches may
be warm. They do not establish cold encoding latency, deployed CWV or project-page
playback performance.

Verification: 32 distinct production browser tests passed, covering all 35 AVIF
decodes at source dimensions, font/preload isolation, project/poster format
negotiation, mobile/desktop Chronicle and desktop Editorial format fallback,
no-JavaScript rendering and existing theme/header/morph regressions. Unsupported
format simulation covers CSS/HTML and React's HTTP Link preload headers. Sharp
metadata confirms dimensions and alpha presence for all 35 derivatives. Reviewed
desktop/mobile AVIF/WebP comparisons; portrait, short landscape and desktop
interaction checks retain frame geometry, responsive thumbnail selection and
base artwork beneath hover/pressed states. Source references remain unchanged.
Ten semantic/theme unit tests, production build/content validation, TypeScript,
targeted lint and diff checks passed.

Across the two final audits switch readiness was 79–172ms and choreography
completion 552–791ms. Sixteen unthrottled About/Back samples recorded no long tasks.
These are small automation samples, not compositor FPS or field INP measurements.

Reports: `.cache/performance/all-theme-avif-fonts` and
`all-theme-avif-fonts-repeat`. Next: inspect Chronicle's remaining render-blocking
critical path, then measure representative Work and case-study routes; retain
the theme's motion and visual quality. Hosting verification remains pending.

## Work and case-study loading — 2026-10-07

Extended the audit tool with `--route=`. Recorded one initial local mobile run of
Work and all three published case studies in every mode, using the existing AVIF
build before the changes below. Accessibility/Best Practices were 100 and deliberate
SEO 66 in every route/mode. Baseline Performance / LCP:

| Route                | Editorial  | Engineer   | Digital    | Chronicle  |
| -------------------- | ---------- | ---------- | ---------- | ---------- |
| Work                 | 94 / 2.94s | 95 / 2.79s | 94 / 3.01s | 88 / 3.79s |
| Portfolio            | 87 / 3.92s | 95 / 2.93s | 87 / 3.99s | 81 / 4.98s |
| Japan Travel Planner | 94 / 3.02s | 95 / 2.86s | 93 / 3.09s | 87 / 4.03s |
| Nihonest             | 97 / 2.49s | 95 / 2.86s | 94 / 3.01s | 87 / 4.00s |

### Critical-path inspection

Chronicle's scenic image already has high priority, immediate HTML discovery and
eager loading according to Lighthouse. The preceding homepage report identifies
three render-blocking CSS resources totaling 26,371 bytes: roughly 15.5 kB active
Chronicle grammar, 7.8 kB shared styles and 3.1 kB font/base styles. Its render-blocking
insight estimates 450ms potential FCP saving but zero LCP saving. The reported
observed local LCP is 212ms while the simulated mobile LCP is 3.72s: do not confuse
unthrottled timings with the simulation or assume all LCP delay is animation.

Reviewed [Chrome render-blocking guidance](https://developer.chrome.com/docs/performance/insights/render-blocking)
and [Next inlineCss](https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss).
Global CSS inlining was not enabled: Next documents it as experimental, repeats
styles in HTML/RSC, and removes independent cross-page stylesheet caching. A
future split of page-specific Chronicle/shared styles needs cold theme-switch and
no-JavaScript checks; it is not justified solely by an opportunity estimate.

### Retained changes

- Browsers requested all three Portfolio video posters on initial load despite
  `preload="none"`, totaling 147,189 image bytes. The shared media component now
  observes lazy local raster videos, loading their optimized posters near view
  while respecting clipping by contained reading panels. Native dimensions and
  controls remain immediate. No automatic playback requests are introduced.
- Eager, vector and external posters retain immediate behavior. Without JavaScript,
  lazy local videos omit thumbnails but keep controls, captions and playback.
  Unsupported IntersectionObserver falls back to eager poster loading after
  hydration. The tradeoff is documented in the media contract and D043.
- Digital's eager opening case-study image now has `fetchPriority="high"`.
  Its Portfolio preview is the measured LCP element. This changes scheduling,
  without replacing the image or requesting another copy.
- Chronicle's mobile outer panel and chapter divider use 720px proportional
  derivatives below 901px. The panel AVIF falls from 53,151 to 24,326 bytes;
  divider falls from 18,067 to 9,237. Source slices scale by 0.6, displayed border
  widths and layout remain unchanged, and desktop retains the larger assets.

Two final Portfolio comparisons:

| Mode      | Performance (first / repeat) | LCP (first / repeat) | Initial image bytes (before → after) |
| --------- | ---------------------------- | -------------------- | ------------------------------------ |
| Editorial | 96 / 96                      | 2.56s / 2.56s        | 214,341 → 67,151                     |
| Engineer  | 94 / 99                      | 2.94s / 2.03s        | 159,986 → 12,797                     |
| Digital   | 93 / 95                      | 3.16s / 2.92s        | 172,846 → 25,657                     |
| Chronicle | 88 / 88                      | 3.85s / 3.85s        | 473,864 → 289,019                    |

Chronicle's initial Portfolio image transfer falls about 39% and simulated LCP
improves about 1.13s versus the single baseline. Editorial's score gain repeats;
Engineer and Digital vary. Chronicle stays below 90. JavaScript transfer grows
about 169 bytes; Chronicle CSS grows 78 bytes. Its CLS remains 0.00121 and TBT is
17.5–18ms in the final comparison. There are no Lighthouse warnings.

Focused follow-ups on affected routes (one run each):

| Route / mode                     | Performance | LCP   | Image bytes |
| -------------------------------- | ----------- | ----- | ----------- |
| Work / Chronicle                 | 88          | 3.79s | 265,794     |
| Japan Travel Planner / Digital   | 92          | 3.24s | 57,031      |
| Japan Travel Planner / Chronicle | 88          | 3.79s | 292,259     |
| Nihonest / Digital               | 94          | 3.11s | 8,682       |
| Nihonest / Chronicle             | 88          | 3.79s | 270,774     |

Work does not use the compact outer panel at initial mobile load, so its transfer
and result are unchanged. Travel/Nihonest Chronicle save about 37.7 kB each.
Digital's priority hint does not show a consistent gain across projects: Travel's
sample is slower than baseline and Nihonest's score is unchanged. These single
follow-ups are not evidence of stable field changes. Homepages were not re-audited
in this pass; retain the preceding two-run homepage results as historical data.

Verification: production build/content validation, ten semantic/theme unit tests,
TypeScript and targeted lint passed. Twenty-four production browser checks passed:
all 37 AVIF decodes, format fallback, font isolation, four-mode deferred posters,
unchanged video geometry on poster arrival, no automatic playback, no-JavaScript
and observer fallbacks, delayed cold morph readiness, and Digital responsive/AA
checks. Initial mobile frame comparisons preserve layout and ornament placement.
No project content, source screenshots, evidence captures or motion timing changed.

Reports under `.cache/performance/`: `work-avif-baseline`,
`portfolio-avif-baseline`, `travel-avif-baseline`, `nihonest-avif-baseline`,
`portfolio-posters`, `portfolio-posters-repeat`, `work-panel-compact`,
`travel-panel-compact` and `nihonest-panel-compact`. Raw captures and report caches
are ignored by Git. Optimizer caches can be warm; these remain local simulated
loading measurements rather than deployed CWV, encoding-latency or playback tests.

The next pass evaluated page-specific Chronicle/shared CSS against these baselines;
its rejected candidates and restored results follow. Deployed preview performance
and indexing checks remain pending.

## Surface-specific CSS evaluation — 2026-10-07

Tested two delivery boundaries without changing artwork, content, typography or
motion. Both experiments were removed; D041's active-mode loading remains.

### Shared secondary-page scopes — rejected

Separated common rules, mode-specific secondary-page scopes and responsive rules,
preserving their original cascade. Next's production output introduced additional
stylesheet resources, including an effectively empty aggregator resource. CSS
transfer increased from 14,920 to 17,047 bytes in Editorial, 14,184 to 16,482 in
Engineer, and 14,078 to 16,412 in Digital. Chronicle transferred 25,624 bytes while
also excluding its project grammar. The four-mode sample scored 99/98/97/88; those
variable scores do not establish a loading gain. Restored the combined shared CSS
rather than retaining extra requests for the small amount of conditional grammar.

### Chronicle project grammar — rejected

With the shared stylesheet restored, tested a separate project stylesheet selected
by public case-study routes. Original mixed selector groups were partitioned by
selector, preserving each surface's cascade. Both English and Japanese direct
project renders worked without JavaScript. A cold Home-to-project test delayed CSS
by 700 ms and verified project styles before `ViewTransition.ready`; cold four-mode
morph tests also passed. Settled computed-style comparisons across 18 Chronicle
route/viewport combinations found no differences, including pseudo-element frames,
typography, contained scrolling and spacing. The candidate was visually viable.

The loading comparison did not justify retaining it:

| Chronicle route | Previous Performance / LCP | Candidate Performance / LCP | CSS transfer (previous → candidate) |
| --------------- | -------------------------- | --------------------------- | ----------------------------------- |
| Home            | 89 / 3.72–3.73s            | 89 / 3.72s, twice           | 26,449 → 24,342 bytes               |
| Work            | 88 / 3.79s                 | 88 / 3.79s, once            | 26,449 → 24,342 bytes               |
| Portfolio       | 88 / 3.85s, twice          | 88 / 3.86s; 87 / 4.01s      | 26,449 → 28,405 bytes               |

Home/Work saved 2,107 bytes, about 8%, without a meaningful LCP or score change.
Direct project loads gained 1,956 bytes and a fourth stylesheet request. Their
first paint moved from 1.51s to 1.66s in both candidate runs. LCP varied, but the
additional request, transfer and repeated first-paint cost weigh against this split.
The route selector, extra component and split CSS were removed. Artwork manifests
and generators again inspect the complete Chronicle stylesheet.

### Restored implementation

Production rebuild passed. One confirmation audit per affected route measured:

| Chronicle route | Performance | FCP   | LCP   | CSS transfer |
| --------------- | ----------- | ----- | ----- | ------------ |
| Home            | 89          | 1.21s | 3.73s | 26,449 bytes |
| Portfolio       | 88          | 1.51s | 3.92s | 26,449 bytes |

Initial image transfer is unchanged at 228,496 / 289,019 bytes, respectively;
JavaScript is restored to 169,458 bytes. Accessibility and Best Practices are 100,
deliberate SEO is 66, and Lighthouse reports no warnings. Home CLS is zero;
Portfolio CLS is 0.00121. Local Chronicle switching remains about 138 ms to content
readiness and 805 ms including choreography; About/Back have no observed long tasks.
These are local diagnostics, not field INP or deployed CWV.

Final verification on the restored build: content validation and production build,
four theme unit tests, targeted lint/formatting and diff checks passed. Thirty-four
production browser tests passed: AVIF decoding/negotiation/fallback, conditional
fonts, poster deferral/native fallbacks, cold four-mode CSS readiness, secondary
page morphs, reading-position restoration, transition cancellation, reduced motion,
theme persistence, native forms and mobile keyboard controls. Experimental
route-split tests were removed with the rejected implementation.

Report labels: `css-surface-candidate`, `css-surface-four-modes`,
`chronicle-route-css`, `chronicle-route-css-repeat`, `chronicle-project-css`,
`chronicle-project-css-repeat`, `chronicle-work-css`, `css-restored-home`, and
`css-restored-project`, under ignored `.cache/performance/`. The first two are
intermediate experiments; only the last two describe the final restored build.

Next: inspect the scenic LCP resource's network dependency chain and competing
above-fold requests before trying another delivery change. The restored Home report
shows high-priority transfers for both card frames and the crystal corner as well
as the scenic image; investigate decorative-resource competition first. The scene already has eager
initial-document discovery and high fetch priority; adding another scenic preload is not
supported by these reports. Keep the ≥90 Chronicle target open and verify eventual
hosting separately. Do not trade project-page loading or visual fidelity for a
smaller homepage CSS number.

## Decorative image priority and reduced motion — 2026-10-07

### Retained priority change

The mobile scenic hero was already discovered eagerly and fetched at high priority.
Three decorative CSS images were also high priority: the header crystal corner and
both project-card frames. Added low-priority AVIF preload hints for those existing
requests. The header hint applies only up to 900px; collection hints apply only to
frames used by the actual project count. Detail/supporting pages do not preload
collection frames. Unsupported AVIF clients skip the typed hints and retain CSS
WebP fallback. No new imagery, crop, animation, geometry or content was introduced.

The network reports confirm all three decorations move from High to Low while
the scenic resource stays High. Mobile image transfer remains 228,496 bytes on
Home and 265,794 on Work; Portfolio retains 289,019. JavaScript remains 169,458
bytes. A concurrent, separately authored portrait-media pairing rule increases
shared CSS transfer by 116 bytes in the rebuilt application; it is preserved.
The priority hints themselves introduce no stylesheet or image bytes.

To isolate that concurrent change, rebuilt a control with the same shared CSS and
only the priority hints disabled. Home returned to 89 / 3.71s LCP and Work to
89 / 3.78s, while image/CSS/JavaScript transfers matched the retained candidate.
The normal-motion priority gain survives that control. The hints were restored
and the final build verified afterwards.

| Chronicle route          | Prior Performance / LCP | Final Performance / LCP     |
| ------------------------ | ----------------------- | --------------------------- |
| Home, normal motion      | 89 / 3.74s              | 91 / 3.48–3.50s, three runs |
| Home, reduced motion     | 89 / 3.71s              | 91 / 3.47–3.49s, two runs   |
| Work, normal motion      | 88 / 3.79s              | 90 / 3.57s, twice           |
| Portfolio, normal motion | 88 / 3.85–3.92s         | 88 / 3.85s, once            |

Home improves by roughly 0.24s without reducing image bytes. Work also repeats its
gain; the Portfolio detail does not show a material gain. Chronicle's Home/Work
local score target is reached, while the case-study and eventual hosted targets
remain open. Reduced-motion results do not replace normal-motion acceptance.

### Motion comparison

Recorded the initial normal/reduced-motion four-mode samples before the change,
then final four-mode samples in both settings. Lighthouse defaults to simulated
mobile loading; interactions are separate local, unthrottled measurements.
The final samples on the retained build are:

| Theme     | Home normal Performance / LCP | Home reduced Performance / LCP | Portfolio reduced Performance / LCP |
| --------- | ----------------------------- | ------------------------------ | ----------------------------------- |
| Editorial | 100 / 1.89s                   | 97 / 2.42s                     | 96 / 2.56s                          |
| Engineer  | 96 / 2.70s                    | 99 / 2.11s                     | 97 / 2.41s                          |
| Digital   | 94 / 3.01s                    | 94 / 3.01s                     | 96 / 2.64s                          |
| Chronicle | 91 / 3.48s                    | 91 / 3.47s                     | 88 / 3.85s                          |

The other themes vary between samples: initial Home normal scores were
93/99/94 and reduced scores 93/96/98. Their opposite-direction changes do not prove
that reducing motion speeds up loading. Fonts, artwork and scripts still load;
the stronger distinction is interaction completion after suppressing choreography.
All final reports have Accessibility/Best Practices 100, deliberate SEO 66 and no
Lighthouse warnings. Home reduced TBT is 13–17ms; Portfolio reduced TBT is 13–16ms.
CLS stays below 0.033 in every recorded mode/route.

Final local mobile theme-switch measurements:

| Destination | Normal ready / finished | Reduced ready / finished |
| ----------- | ----------------------- | ------------------------ |
| Engineer    | 170 / 553ms             | 129 / 132ms              |
| Digital     | 90 / 790ms              | 56 / 58ms                |
| Chronicle   | 109 / 786ms             | 77 / 78ms                |
| Editorial   | 79 / 661ms              | 52 / 53ms                |

Reduced-motion desktop About navigation finishes in 76–87ms and Back in 8–14ms;
normal About finishes in 408–930ms and Back in 335–821ms. Both settings have zero
observed long tasks. Frame-gap samples, automation overhead and choreography
completion are not GPU FPS, INP or field CWV. Very short reduced-motion Back
operations sometimes complete before the next animation frame, producing zero
frame samples; that does not prove perfect rendering.

Recorded summaries are preserved in [PERFORMANCE-MOTION-RESULTS.json](PERFORMANCE-MOTION-RESULTS.json).
Raw reports remain under ignored `.cache/performance/`: `motion-normal-baseline`,
`motion-reduce-baseline`, `decor-priority-normal`, `decor-priority-normal-repeat`,
`decor-priority-reduce`, `decor-priority-project`, `decor-priority-work`,
`decor-priority-work-repeat`, `motion-normal-final`, `motion-reduce-final` and
`motion-reduce-portfolio`.
The matched-CSS controls are `decor-priority-control` and
`decor-priority-work-control`; those two samples intentionally disable the hints.

Next: inspect Chronicle case-study loading separately; Portfolio remains at 88
with either motion setting. Preserve the successful Home/Work priority hints and
the normal-motion design while targeting a measured case-study dependency.

Verification: production build/content validation, targeted lint/formatting and
35 production browser tests passed, including actual decoration/hero request
priorities, single transfers, AVIF/WebP fallback, conditional fonts, deferred
posters, native forms, cold morph readiness, both locales, reduced-motion behavior
and mobile keyboard controls. Invalid/duplicate motion arguments fail before
starting the audit server.

## Chronicle case-study discovery refinement — 2026-10-07

The scenic case-study banner is the mobile LCP element. Its discovery is already
eager/high priority. The visible panel frame was High, and the existing 600-weight
font was discovered later at VeryHigh priority. Tested these independently:

- A low-priority hint for the visible compact panel, restricted to ≤900px,
  takes Portfolio from 88 / 3.84s to 89 / 3.70–3.77s in two normal-motion runs.
  Reduced motion measures 89 / 3.78s. Other project scores do not materially change.
- Adding a low-priority preload for the same case-study 600 font improves first
  paint from about 1.51s to 1.21s in both Portfolio runs and the other two projects.
  Font transfer remains 69,894 bytes. Font binaries and displayed weights are unchanged.
- Rejected broad chapter-ornament hints before measuring that variant: native
  menus can leave those assets deferred. The retained panel is already visible.

Final retained font + panel samples:

| Chronicle project    | Initial normal Performance / FCP / LCP | Final normal Performance / FCP / LCP |
| -------------------- | -------------------------------------- | ------------------------------------ |
| Portfolio            | 88 / 1.51s / 3.84s                     | 89 / 1.21s / 3.77s, twice            |
| Japan Travel Planner | 90 / 1.51s / 3.55s                     | 90 / 1.21s / 3.63s                   |
| Nihonest             | 89 / 1.51s / 3.71s                     | 89 / 1.21s / 3.71s                   |

Portfolio's final reduced-motion sample is 89 / 1.21s FCP / 3.77s LCP. The roughly
300ms first-paint gain repeats; the smaller LCP/score gain is limited to Portfolio.
Travel's single LCP sample is slower despite earlier first paint. Do not claim an
across-project LCP improvement or completion of the ≥90 acceptance gate.

JavaScript/CSS transfer remains 169,458 / 26,565 bytes. Initial image transfer is
unchanged at 289,019 / 292,259 / 270,774 bytes for Portfolio/Travel/Nihonest.
All reports have Accessibility/Best Practices 100, deliberate SEO 66 and no
Lighthouse warnings; final CLS is about 0.00121–0.00127 and TBT is 15–20ms.

Ordinary 390px native/hydrated requests were compared on all three projects:
the image inventories match before/after. A native control that removes only the
600 preload from HTML and HTTP Link headers confirms all three pages already
request that font without the hint. The change therefore does not add native font
downloads. Production browser checks verify actual Low font/panel priority,
High scenery, single transfers, contained scrolling in both motion settings,
and native AVIF/WebP fallback. An initial assertion that hidden chapter images
never request after font settling was too broad and was removed; no such absolute
behavior is assumed. Thirty other media/cold-morph/transition checks also passed.

Home and Work were rechecked to guard the prior improvement: Home remains
91 / 3.50s with only weights 500/700 loaded; Work remains 90. The new hints are
composition-local, not a global change to font discovery. See D046 and
[PERFORMANCE-MOTION-RESULTS.json](PERFORMANCE-MOTION-RESULTS.json).

Reports: `case-priority-before-portfolio`, `case-priority-before-japan-travel-planner`,
`case-priority-before-nihonest`, `case-panel-after-portfolio`,
`case-panel-after-portfolio-repeat`, `case-panel-after-japan-travel-planner`,
`case-panel-after-nihonest`, `case-panel-after-reduce`, `case-font-candidate`,
`case-font-candidate-repeat`, `case-font-final-japan-travel-planner`,
`case-font-final-nihonest`, `case-font-final-reduce`, `case-font-home-guard` and
`case-font-work-guard`, under ignored `.cache/performance/`.

### Chronicle reading-image sizing — 2026-10-07

D047 replaces the generic case-study image size estimate with conservative
composition-specific bounds for supporting evidence and full-width media blocks.
Compression remains at the existing quality setting. Sources, source-size display
caps, eager first previews, native lazy loading and motion are unchanged. Other
themes and Chronicle Home/Work keep their delivery policy.

Matched controls use the same production build in Chromium with JavaScript
disabled, 2× screen density, and only the HTML `sizes` attributes restored to the
previous estimates. Each visible case-study image is scrolled into view and decoded.
Totals below sum optimized project-image response bodies across that reading pass;
they exclude decorative artwork, video posters, fonts and scripts. They are not
initial Lighthouse transfer or deployed-network measurements.

| Project | Portrait 390×844, before → after | Landscape 844×390, before → after | Desktop 1440×900, before → after |
| --- | --- | --- | --- |
| Portfolio | 169,709 → 137,149 bytes (19.2%) | 347,677 → 262,963 bytes (24.4%) | 351,630 → 351,630 bytes (0%) |
| Japan Travel Planner | 104,885 → 74,846 bytes (28.6%) | 171,688 → 116,255 bytes (32.3%) | 171,328 → 122,601 bytes (28.4%) |
| Nihonest | 84,764 → 71,061 bytes (16.2%) | 153,441 → 106,937 bytes (30.3%) | 158,128 → 135,239 bytes (14.5%) |

All visible images meet the displayed 2× pixel requirement up to source resolution.
Matched portrait Travel and landscape Portfolio captures were inspected: no
material visible quality loss was found. Hydrated before/after inventories also
retain eager previews and native lazy-loading behavior. Immediate jumps to the
end can encounter unloaded images in both versions; this pass introduces no new
loading gate or observer. The browser may reuse a larger cached variant when one
source appears in both narrow and full-width placements, explaining Portfolio's
desktop result. Do not force smaller variants at the cost of duplicate transfers.

Portfolio Lighthouse: normal **89**, FCP **1.22s**, LCP **3.69s**; reduced motion
**90**, FCP **1.21s**, LCP **3.63s**. Image transfer remains **289,019 bytes**, as do
script/CSS/font transfers. Accessibility and Best Practices remain **100**; SEO is
the deliberate preview **66**. There are no Lighthouse warnings. The reduced sample
is one run and may reflect timing variance; it is not a normal-motion acceptance
result. One lint run overlapped part of that reduced audit, so do not attribute its
score movement to image sizing. Raw reports: `case-image-sizes-normal` and
`case-image-sizes-reduce` under ignored `.cache/performance/`.

Verification: production build and lint pass; the targeted native browser check
passes across all three projects at portrait, landscape and desktop sizes, checking
decoding, eager previews, source-size caps and adequate selected resolution.
Matched byte comparisons and both motion reports are retained in
[PERFORMANCE-MOTION-RESULTS.json](PERFORMANCE-MOTION-RESULTS.json).

Next: review the retained visuals and scrolling on a real phone and a deployed
preview when deployment is authorized. Avoid further compression or loading-delay
changes solely to raise Chronicle's score slightly; preserve its visual quality
and responsive feel.
