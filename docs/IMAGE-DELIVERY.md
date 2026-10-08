# Image delivery

Updated: 2026-10-07.

## Format policy

All production theme raster artwork prefers AVIF and retains WebP fallback.
Editorial has nine artwork variants; Chronicle has 28, including responsive sizes
and retained variants. Engineer and Digital have no independent raster artwork:
their project images use the shared semantic media component.

CSS uses typed `image-set()` candidates, AVIF first and WebP second. Chronicle's
scenic preload uses only AVIF, its MIME type and the same viewport conditions as
the CSS. React emits these hints in both HTML and HTTP Link headers. Unsupported
clients skip the AVIF hint and select WebP. This handles format support, not retry
after an AVIF request fails. See [MDN image-set](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/image/image-set)
and [preload guidance](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload).

Chronicle also hints the existing mobile header crystal and visible collection
frames at low priority, up to 900px, keeping the scenic image high priority.
Collection hints depend on project count and are absent from detail/supporting
screens. These typed AVIF hints reuse CSS requests; unsupported clients retain
WebP selection without a second format download. See D045 and the performance
review for the measured scope and unchanged image transfer.

Project screenshots retain their original content URLs. `next/image` negotiates
AVIF, WebP, then the original format using the request's Accept header. Local raster
video posters use the same optimizer through `getImageProps`; video playback stays
native with `preload="none"`. Lazy local raster posters are attached when their
video approaches the viewport, respecting clipping by contained reading panels.
They are not fetched for every offscreen demonstration during initial load.
Eager media and external/vector posters retain immediate behavior. Without
JavaScript, lazy local videos retain native controls and captions but omit the
poster until playback; clients without IntersectionObserver load posters eagerly.
A separate `<picture>` wrapper would duplicate the
existing responsive optimization policy. See [Next.js formats](https://nextjs.org/docs/app/api-reference/components/image#formats).

Keep SVG diagrams/icons as vectors, WebM demonstrations as video, and the generated
social-sharing image in its existing PNG format. Preserve original screenshots,
design sources and historical evidence. They are source files, not an instruction
to deliver full-resolution PNGs to every browser. Remote and development fixture
images retain their existing unoptimized behavior.

## Regeneration and inventory

```sh
node scripts/optimize-theme-images.mjs
```

The generator converts established delivery WebPs without changing dimensions,
crop or alpha presence. Transparent artwork uses quality 65, effort 6 and 4:4:4
chroma; opaque scenes use quality 50 and 4:2:0. Every generated AVIF must be smaller
than its fallback. Review new artwork visually before publishing it; a smaller file
does not prove acceptable image quality.

[IMAGE-DELIVERY-MANIFEST.json](IMAGE-DELIVERY-MANIFEST.json) records all 37 theme
variants, encoding settings, byte sizes and runtime references, plus 38 retained
project screenshots/posters. Theme AVIF files total 1,169,313 bytes versus 2,353,698
bytes for the WebP set, about 50.3% smaller. This is an inventory comparison, not
the transfer for one page: responsive and interaction assets load when applicable.

After changing Chronicle frame dimensions, first run
`node scripts/optimize-chronicle-frames.mjs`, then the general image generator.
The frame script includes 720px panel/project frames and chapter separators;
mobile source slices scale by 0.6 while displayed border widths remain unchanged.
`optimize-chronicle-avif.mjs` reproduces the earlier seven-asset experiment;
the general generator is the current all-theme workflow. The Chronicle provenance
manifest retains that earlier pass; the delivery manifest covers the full set.

## Chronicle case-study image sizing

The composition supplies conservative responsive `sizes` hints for its evidence
columns and separate full-width media blocks. These describe layout, so they live
in the composition rather than project content. The semantic renderer forwards
the optional hint; other compositions retain their existing defaults.

Keep the current compression quality and native lazy-loading policy. The browser
selects a variant for its screen density, and source-size display limits remain
in force. Do not tighten loading proximity or reduce image quality merely to gain
a small Lighthouse score increase. Chronicle's artwork and motion justify some
additional cost. See D047 and the matched image-transfer checks in the performance
review; initial Lighthouse image transfer did not change in this pass.

## Font discovery

Chronicle retains the same Cormorant Garamond binaries and weights. Its conditional
stylesheet declares local font faces, and its server-selected head preloads weight
700. Weight 500 is discovered through CSS rather than explicitly preloaded, avoiding
the reported unused-preload warning. Case-study compositions also preload the unchanged 600 weight at low
priority; other Chronicle screens leave it demand-loaded. Other modes do not preload or request
these files. Regenerate the public copies and license with
`node scripts/sync-chronicle-fonts.mjs` after upgrading the source font package;
`public/fonts/chronicle/manifest.json` records source hashes.

Case-study reading panels hint their already-visible compact frame at low priority
on viewports up to 900px. The chapter rail is not preloaded: its decoration can stay
deferred in native closed menus. D046 records this scope, measured first-paint gains
and unchanged transfers on all three current projects.

## Verification

`tests/browser/image-formats.spec.ts` verifies all theme AVIFs decode at source
dimensions, project/poster AVIF/WebP/original negotiation, conditional font loading,
and artwork fallback without duplicate format transfers. Unsupported-format tests
substitute an unknown MIME type in HTML, CSS and preload headers in Chromium;
they do not represent an actual legacy browser or a failed network request.

Theme transition checks include delayed cold CSS and font readiness before morph
snapshots. Performance results and remaining work are in
[PERFORMANCE-REVIEW.md](PERFORMANCE-REVIEW.md).
