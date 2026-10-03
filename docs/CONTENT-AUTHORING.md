# Content foundation and authoring

The implemented content boundary lives in `src/lib/content/`. It validates data
before a project enters a registry. `ProjectInput` is the authoring type; `Project`
is the validated type with safe defaults for omitted lists.

## Project records

Add a reviewed project file under `src/content/projects/`, then register it in
that directory's `index.ts`. This is the only portfolio content inventory.
The portfolio pilot is the first real project record, kept as a draft. See
`projects/portfolio/README.md` and `/dev/projects/portfolio` for discovery and review.

Each record needs:

- `kind: "project"`;
- a unique kebab-case `slug`;
- its actual project `status`;
- a `publication` object;
- `locale.en.title`.

Summary, year, roles, technologies, capabilities, media, diagrams, snippets, and
case-study blocks are optional. An absent list defaults to an empty list. Do not
fill fields merely to make a record appear complete.

Keep title and prose inside `locale`. Shared facts and identifiers belong at the
project root. Technology and capability IDs must exist in the central registries;
registry entries are vocabulary, not automatic personal capability claims.

## Publication and selection

`src/registries/projects.ts` exports public selectors:

```ts
getProject(slug);
getPublishedProjects();
getFeaturedProjects();
getProjectsByTechnology(id);
getProjectsByCapability(id);
```

All selectors, including slug lookup, exclude drafts and hidden records. Featured
status is independent of publication, but only published projects can be featured.
Ordering uses ascending optional `publication.priority`, then slug. Records without
a priority sort after explicitly ordered records. Selectors return independent
copies, so a composition cannot mutate the canonical record used by another call.

These selectors are the intended source for routes, navigation, sitemap, and
metadata. They must not be replaced by direct imports of draft records.

## Narrative and references

Project narratives use a neutral case-study/report voice: describe the purpose,
decisions, implementation and concrete results directly. Avoid referring to the
portfolio owner by name in the third person. Ownership text can describe directed
responsibilities and the development process without introducing an outside narrator.
Keep material AI assistance explicit and distinguish it from the original manual work
where applicable.

Result sections describe what the project delivered. Discovery provenance, import
approvals and unresolved historical-source questions belong in review documentation.
Testing and technical sections can state verification scope and real limitations;
do not turn those into invented outcomes or a substitute for the project result.

`locale.en.blocks` contains semantic case-study blocks. Each block needs a stable
ID unique within its locale. The initial union covers intro, problem, goals,
constraints, decision, media, gallery, architecture, challenge, technical, and
result. Add another semantic type when real content requires it, together with a
shared fallback renderer in `src/components/semantic/case-study-block.tsx`.

Rich text currently supports paragraphs, lists, inline text with semantic marks,
and links. It does not accept raw HTML or styling classes. MDX can be introduced
at the authoring boundary when a narrative needs it; it must preserve the same
semantic contract.

Media, diagrams, and code snippets are defined once at the project root and
referenced by ID from blocks. Images require intrinsic dimensions and localized
alternative text. Videos also require a poster. Diagrams require a title,
accessible summary, nodes, and edges with valid endpoints. Code is text in
`codeSnippets`, not an image or a repeated copy in each translation.

Images shrink responsively but their rendered size is capped at the declared
source dimensions in every theme. Digital's image gallery also respects this cap;
larger screens should not upscale a small screenshot. Supply the actual source
width and height rather than a desired layout size.

Local media paths are rooted at `public/`. Their files must exist, and paths cannot
escape that directory. Remote media must use HTTPS; validation checks URL format
but does not establish approval, ownership, or remote availability.

## Translation readiness

English is required. Japanese text is optional, and defaults to translation depth
`none`. No Japanese copy is currently authored.

When Japanese content is added, explicitly declare `translationStatus.ja` as
`summary`, `partial`, or `complete`. Translated blocks retain their English IDs,
types, and media/diagram/code references. A complete declaration requires every
English block, supplied narrative sections, and the applicable asset text.
Validation checks coverage and references; it cannot establish translation quality
or factual equivalence.

`selectProjectContent` in `src/lib/i18n/project-content.ts` keeps the English block
sequence and selects translations by stable ID. Shared renderers resolve fields
independently, so an omitted translated rationale, caption or body retains its
English source. Text carries its actual language attribute. Incomplete Japanese
case studies display an English fallback notice. Navigation/interface translations
remain a separate pending task.

The shared semantic renderers contain no theme selection. Work and case-study
routes use these renderers as a baseline; future compositions can specialize
presentation while retaining the same selected content and fallback components.
Technical summaries remain visible above native expandable details. Media uses
alternative text, intrinsic dimensions and native video controls; failed loads
retain a descriptive text fallback.

## Development fixtures

`src/content/fixtures/projects.ts` contains synthetic records marked
`kind: "fixture"`. They cover sparse, system, visual, draft, and hidden cases.
Their invented text describes no real project or personal outcome.

Fixtures have a separate entry point and are not imported by the public registry.
The registry rejects them unless a development/test caller explicitly opts in.
Fixture media lives under `src/content/fixtures/assets/`, outside `public/`;
it is validated against that separate root and is not a public production asset.
`/dev/design-system` previews these records only in development, including a
Japanese-route fallback mode without authored Japanese text. Its asset route
serves only the allowlisted fixture image. Both routes return 404 in production.

## Case-study overview

Localized project text may include an optional `overview` with `distinction` and
`currentState`. These are factual, theme-neutral summaries of what distinguishes
the work and its current progress. Omit unsupported fields; do not infer outcomes
from project status. The portfolio draft summarizes implemented modes and
explicitly lists pending copy, deployment, translations and deployed checks.

English remains the source. Overview fields fall back individually on Japanese
routes, with English language attributes. A `complete` Japanese translation must
cover every authored English overview field. Roles, implementation method and
ownership/review text continue to come from the existing structured record.

## Supporting media

An optional `supportsBlockId` on a `media` block identifies the narrative block
it demonstrates. Place the media immediately after that block, or after another
media block supporting the same owner. Owners cannot be media or gallery blocks.
Validation rejects missing, self, forward and nonadjacent references. Japanese
blocks retain this same reference, even when their narrative is only partially
translated.

This is a semantic evidence relationship, not a theme layout instruction. Digital
uses it to place the media and caption in the owner's single surface; other modes
keep the canonical sequence. All renderers expose the owner heading as the media
section's accessible description. Omit the field for standalone media.

## Validation

```sh
npm run content:validate
npm test
```

The validation command checks production records and development fixtures,
including asset files. It also runs automatically before `npm run build`.
Schema and registry tests protect publication gates, sparse content, identifiers,
references, translation declarations, semantic text, and local asset checks.

Passing validation does not verify portfolio claims. Real content still requires
the repository discovery and review process described in
`15-PROJECT-DISCOVERY-PROMPT.md` and `16-CONTENT-GOVERNANCE.md`.

## Secondary-page copy

`src/content/pages.ts` is the provisional English inventory for Work, About, Lab
and Contact. Its section descriptions, optional fields, items and collection empty
states are semantic content; theme-specific grouping belongs in SecondaryPage
composition renderers. It reuses reviewed identity and existing provisional home
copy. Replace pending biography/contact copy only with supplied, verified material.
Public Work receives only published project records. Lab is currently empty; adding
actual studies should begin with reviewed source material, not synthetic fixtures.
The Japanese routes explicitly retain English page content and translation notice.
