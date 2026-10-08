# Product — Decision Canvas reference package

Imported 2026-10-08 from the owner-supplied `PRODUCT-PRESENTATION-HANDOFF.zip`.
Archive SHA-256: `dc9027b4bf4558ba1186b286cce80ce401d76f7d4bb2f97ac7c63f4dc401b692`.

The package's descriptive filenames are retained so its cross-references remain valid.
The four separately supplied PNGs correspond to the refined homepage, phone montage
and desktop/phone detail references; the ZIP also includes the earlier selected concept.

Read [PRODUCT-REFERENCE.md](PRODUCT-REFERENCE.md), then the composition map,
interaction spec, asset manifest, acceptance checklist and implementation handoff.
Owner instructions and the repository's architectural/content contracts take precedence.
The supplied handoff's original Editorial-default requirements are superseded by
the owner's 2026-10-08 decision D050: Product is default, and selector order is
Product, Editorial, Engineer, Digital, Chronicle. Preserve the source documents as
historical design material; follow D050 for current initialization and ordering.
The handoff's original "inspect before editing" stage was completed before implementation;
the owner subsequently authorized implementation on 2026-10-08.

## Reference authority

- Primary: `mockups/product-decision-canvas-refined-homepage.png`.
- Historical composition context: `mockups/product-decision-canvas-original-concept.png`.
- Explorations: phone home/menu montage and the two project-detail images.

The phone homepage image depicts two screens, not one wide phone viewport.
Generated project UI and prose are illustrative; production uses existing project records
and authentic evidence. The original handoff includes no isolated scenery or personal
About photo. All mockups stay in documentation, outside runtime imports. The owner
subsequently supplied a generated landscape in `assets/misty-sunrise-valley-source.png`;
delivery variants and provenance are under `public/media/themes/product/`.

## First implementation captures

`first-pass/` preserves actual Chromium screenshots from 2026-10-08:
desktop and phone Home, plus the open phone menu on the Japanese route with
English fallback. These document the first Product implementation; they are not
approved replacement references. Desktop Home uses 1440px CSS width, phone uses
390px, and the captures include the shared provisional hero copy. Scenic artwork
was absent in that first pass. Later refinements keep these originals for comparison.
