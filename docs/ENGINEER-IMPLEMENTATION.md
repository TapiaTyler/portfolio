# Engineer — first implementation pass

The implementation translates `design-reference/ENGINEER-REFERENCE.md` and
`engineer.html` into the shared semantic portfolio system. It establishes an
initial visual direction; final project content and populated-layout approval
remain pending.

## Composition

The homepage begins with a 6/6 profile dossier and project overview. The overview
uses the actual selected project count and titles; an empty inventory has an
intentional empty state. Work uses project records with metadata emphasis and,
when a preview exists, a 5/7 evidence/dossier split. Records without images do not
allocate a fake media panel.

Capabilities form a bordered matrix. The current shared draft provides three
categories, so the layout uses three columns rather than inventing a fourth set
of skills. Lab and About share an 8/4 grouping, with Lab appearing first in the
DOM and visual order. Contact closes the page as a bordered record.

Case studies begin with an identity record and metadata. When supported blocks
exist, a system overview presents validated architecture summaries and links to
architecture, decision and technical sections. Architecture links receive early
emphasis. The complete source narrative keeps its canonical sequence, heading
logic and facts. This makes technical information available early without moving
the full story into an incoherent reading order.

Every narrative block receives record framing; its content still comes from
shared semantic renderers. The composition registry's CaseStudy slot and the
shared body renderer and `afterIntro` extensions keep this organization outside
project content.

## Case-study record rules

- The identity record and early system overview establish project metadata and
  technical navigation. Overview entries have complete individual borders and
  summaries from localized source content.
- Every narrative section (intro, problem, goals, architecture, decision,
  challenge, technical detail, constraints and result) uses one square record.
  Its heading is inside the record, separated from the body by a quiet rule.
- Records have uniform one-pixel neutral borders. Green left accent bars do not
  express a meaningful distinction and have been removed. Color remains useful
  for actual statuses, navigation and functional interaction states.
- Media declaring `supportsBlockId` follows its narrative inside the same record,
  separated by a neutral rule. Its caption stays with the media; no second card
  wraps it. Standalone media and galleries remain separate evidence sequences.
- Diagrams, disclosures and code belong to the record body. An embedded diagram
  does not add another enclosing panel; nodes and controls retain their functional
  boundaries. Canonical order, anchors and motion identities remain unchanged.

Related images in one gallery use a responsive comparison row, rather than a
series of full-width panels. Consecutive media supporting the same narrative can
also share a row. Portraits are bounded at 20rem; standalone standard media and
video at 48rem. Standalone panoramic media can use the available width. Mobile
stacks evidence naturally and preserves intrinsic image proportions. Tyler
accepted this arrangement during the follow-up review.

## Reading orientation and navigation

The opening pairs summary/resources with compact metadata, followed by a project
brief. Distinguishing approach and current state form one row, with roles and
implementation below; mobile follows the semantic definition-list order.
Ownership/review details remain available in a native disclosure. Metadata does
not repeat role and status already shown in the brief.

The technical System overview retains its early emphasis. A separate sticky
section index follows canonical narrative order beside the body; it includes
every titled narrative section rather than only technical blocks. It resembles a
file directory: the real project slug labels a folder, neutral branch guides lead
to file icons and full section titles, and header-green text with a quiet row surface marks
the current section. This is a flat chapter index, not a literal source-file tree;
it invents no filenames or nested hierarchy. Icons and guides are decorative, and
the links remain native navigation rather than an ARIA tree. At mobile widths it
becomes a native disclosure with the same entries. Related media retains its comparison rows
within the narrower body column. Supporting labels are quieter than record titles,
and prose uses a tighter, comfortable line height.

## Typography and surfaces

JetBrains Mono is the primary technical face; Space Grotesk supports headings and
long prose. Both are served locally through `next/font/local`, with licenses in
`public/fonts`. Font files load when used rather than being globally preloaded.

Dark blue-black surfaces, one-pixel borders, square geometry, a quiet dot grid,
indexed navigation and green/cyan/amber accents follow the approved reference.
Navigation brackets are explicitly hidden from assistive technology, preserving
clean link names. Status accents use actual project states.

`src/styles/engineer.css` uses a scope boundary that stops at nested theme roots.
Comparison previews retain their own typography and composition even when the
outer document uses Engineer. Mobile layouts stack records and metadata while
retaining semantic order, visible focus and native scrolling. The existing
reduced-motion token overrides apply; no continuous animation was added.

## Content boundaries

Profile text and homepage copy are provisional shared English content. Project
facts, media, links and statuses come from typed records. Prototype availability,
coordinates, activity dates, telemetry and capability claims were not introduced.
No Japanese translations were authored; locale selection continues to provide
intentional English fallback with language attributes.

## Verification

- 28 unit tests, including every fixture in all modes/locales, canonical block
  compatibility, early system navigation and sparse project behavior.
- 9 production browser tests covering responsive layouts, local fonts, theme
  persistence, keyboard controls, locale changes, no-JavaScript use, reduced
  motion and production exclusion of development previews.
- Automated axe checks on public English route shells and Japanese fallback home,
  plus populated Engineer system, visual and minimal development fixtures.
- 320/390/768/1440px overflow checks, scoped typography and unique anchor checks,
  technical-section link checks, and desktop/mobile screenshot inspection.
- Content validation, lint, formatting, type checking and production build.

These checks do not establish complete WCAG conformance or final visual approval.
Real project discovery, media and copy still need integration and review. The
public inventory remains empty. Review populated synthetic records at
`/dev/compositions?project=fixture-system`; these routes return 404 in production.

The next design pass is Digital.

## Secondary routes — 2026-10-03

Work, About, Lab and Contact now use the shared page inventory through the
SecondaryPage composition slot. A split square opening separates page identity
from its statement. About has a native section index, profile definition list,
three-column areas-of-practice matrix and background record. Single-section pages
omit the index. Narrative records have complete neutral borders; green denotes
orientation and category labels, with no colored card rails. Work's collection
header precedes the project records rather than enclosing them in another card.
Mobile stacks the opening and records while retaining canonical content order.
