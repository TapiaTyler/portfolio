# Chronicle — reference refinement evidence

Actual local browser captures following the autonomous reference-comparison pass
on 2026-10-03. These show the running implementation with the two existing draft
records; project images are genuine previously approved screenshots. Scenic
artwork and UI frames are decorative. No screen or historical state is reconstructed
in this archive. This pass awaits visual review.

## Comparison

The [initial archive](../chronicle-initial/README.md) remains unchanged. Its desktop
homepage viewport was 1440 × 900, with 1817px document height. The new matching
viewport capture is `home-desktop.png`. The revised shell fits the viewport and
uses native scroll containers for discovery and long reading. The original
populated captures used development workbench routes; the revised populated ones
use the full-shell development review route. Header chrome therefore differs as
well as the composition. Both inventories contain the same real project records;
the pilot's current title now acknowledges several compositions.

The supplied desktop reference is 1672 × 941. The `*-reference-width.png` captures
use those dimensions to compare proportions directly. Mobile captures are native
390 × 844 browser viewports; the supplied mobile concept uses a wider canvas.

| Capture                                                       | State                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| `home-reference-width.png`                                    | Scenic hero, horizontal cards, selected chapter preview             |
| `home-desktop.png`                                            | Same layout at the original desktop capture dimensions              |
| `home-mobile.png`                                             | Initial portrait view with a neighboring-card cue                   |
| `home-mobile-card.png`                                        | Main scrolled to the complete selected card, with clear text insets |
| `home-mobile-preview.png`                                     | Main region scrolled to the full contextual preview                 |
| `home-mobile-outcome.png`                                     | Keyboard-selected Outcome; chapter strip scrolled into view         |
| `header-mobile-open.png`                                      | Native menu with language and presentation controls                 |
| `home-short-landscape.png`                                    | 844 × 390 with contained overflow                                   |
| `portfolio-reference-width.png`                               | Portfolio overview and real evidence in the reading panel           |
| `travel-reference-width.png`                                  | Travel planner overview and real itinerary evidence                 |
| `portfolio-mobile.png`, `travel-mobile.png`                   | Portrait reading containers                                         |
| `portfolio-mobile-chapters.png`, `travel-mobile-chapters.png` | Open connected chapter archive                                      |
| `public-reference-width.png`                                  | Honest empty public inventory, with no overlapping labels           |

## Interaction recording

[Watch Chronicle interactions](chronicle-interactions.webm): project selection,
preview chapters, opening the travel planner, contained chapter navigation,
Engineer/Chronicle theme morphing and browser history through a hash entry and
back to the homepage. This is a silent unedited local recording, including server
response time and automation pauses. It is not a performance benchmark.

## Reproduction and provenance

Run the development app and select Chronicle. Review routes:

```text
/preview/chronicle
/preview/chronicle?project=portfolio
/preview/chronicle?project=japan-travel-planner
```

Use the host/port printed by the running app. These routes return 404 in production
and do not publish the records. `capture-manifest.json` records exact URLs,
viewports, document dimensions, scroll positions and browser error observations.
Still captures use reduced motion to stabilize the image; the recording uses
normal motion. The five `source-*.snapshot.txt` files preserve the relevant
composition and CSS at capture time, not a complete runnable historical checkout.
