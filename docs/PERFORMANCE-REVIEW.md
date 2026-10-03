# Production performance review

Initial baseline measured 2026-10-01 (Hawaii time); latest full motion refresh
measured 2026-10-03. This reviews the provisional homepage and local interactions,
not final launch acceptance.

## Reproduce

Use Node.js 24, install dependencies and the Playwright Chromium browser, then:

```sh
npm run build
npm run audit:performance -- --label=current
```

The script starts and stops its own production server on `127.0.0.1:3219`.
Leave that port free. Chromium uses an available debugging port. Each mode is
audited in a fresh browser with its preference supplied as a request cookie.
HTML reports, Lighthouse JSON and a combined `summary.json` are saved under
`.cache/performance/<label>/`, ignored by Git. Failures return a nonzero exit
status. Run one audit process at a time.

The script also measures mobile menu mode changes, waiting for the selected
composition and fonts. Timings include Playwright click/polling overhead and
are not an INP measurement. It additionally samples desktop Home → About → Back
navigation in every mode, recording content availability, choreography completion,
main-thread long tasks and requestAnimationFrame gaps.

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

| Mode | Performance | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| Editorial | 95–99 | 1.51–1.67 | 2.11–2.79 | 28–33 | 0 |
| Engineer | 97 | 1.36 | 2.49 | 16–16.5 | 0.0318 |
| Digital | 96 | 1.51 | 2.64 | 15–15.5 | 0.0003 |

All runs scored 100 for automated Accessibility and Best Practices. These
supplement the existing accessibility tests and manual review; they do not
establish full WCAG conformance.

SEO scored 63 because the preview deliberately blocks indexing. Keep that
protection until the domain and final content are ready. Public launch SEO
acceptance remains pending.

### Initial resource delivery

Lighthouse transfer sizes, rounded to KiB (1024 bytes):

| Mode | JavaScript | CSS | Fonts | Project images |
| --- | --- | --- | --- | --- |
| Editorial | 145.7 | 8.8 | 93.4 | 0 |
| Engineer | 145.7 | 8.8 | 61.8 | 0 |
| Digital | 145.7 | 8.8 | 87.2 | 0 |

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
| --- | --- |
| Engineer | 122 ms |
| Digital | 78–80 ms |
| Editorial | 67–68 ms |

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

| Mode | Performance | LCP (seconds) | CLS |
| --- | --- | --- | --- |
| Editorial | 95 | 2.79 | 0 |
| Engineer | 97 | 2.48 | 0.0318 |
| Digital | 96 | 2.64 | 0.0003 |

Automated Accessibility/Best Practices remain 100; preview SEO remains 63.
JavaScript transfer was approximately 146.8 KiB and CSS 9.1 KiB, an increase of
about 1.2 KiB JavaScript and 0.3 KiB CSS over the original baseline. No animation
package or extra font family was added.

| Destination | Composition/fonts ready | Choreography finished |
| --- | --- | --- |
| Engineer | 131 ms | 515 ms |
| Digital | 76 ms | 775 ms |
| Editorial | 60 ms | 644 ms |

`elapsedMs` retains the composition/font readiness measurement;
`animationFinishedMs` also includes the intentional geometry animation and test
polling overhead. The additional visual duration is not a delay before the new
composition becomes available. Slow capture releases after 1500 ms, and reduced
motion avoids the choreography. These local timings are not field interaction
metrics. The previous LCP/content/deployment limitations still apply.

## Theme-specific motion follow-up

The `theme-motion-final` production run measured the entrance/reveal and interaction
layer with the same mobile simulation and placeholder content:

| Mode | Performance | LCP (seconds) | CLS |
| --- | --- | --- | --- |
| Editorial | 95 | 2.79 | 0 |
| Engineer | 97 | 2.49 | 0.0318 |
| Digital | 96 | 2.65 | 0.0003 |

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

| Mode | Performance | FCP (seconds) | LCP (seconds) | TBT (ms) | CLS |
| --- | --- | --- | --- | --- | --- |
| Editorial | 95–98 | 1.66–1.67 | 2.26–2.79 | 13–13.5 | 0 |
| Engineer | 96–97 | 1.36 | 2.63–2.64 | 13–16.5 | 0.0320 |
| Digital | 95 | 1.51 | 2.78–2.79 | 12–14.5 | 0.0004 |

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
| --- | --- | --- |
| Engineer | 135–152 ms | 519–535 ms |
| Digital | 73–74 ms | 774 ms |
| Editorial | 73 ms | 656–657 ms |

Desktop header navigation from Home to About at 1440×900, also unthrottled:

| Mode | Content visible | Choreography finished | Back choreography finished |
| --- | --- | --- | --- |
| Editorial | 75–81 ms | 698–716 ms | 671–678 ms |
| Engineer | 83–89 ms | 355–365 ms | 298 ms |
| Digital | 85–86 ms | 840–877 ms | 809–817 ms |

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
