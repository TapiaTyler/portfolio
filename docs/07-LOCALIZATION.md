# 07 — Localization

## Goal

Support English and Japanese from the beginning without requiring every deep case-study section to be translated before launch.

English is the initial canonical/source language.

Japanese is a first-class locale, not a decorative alternate stylesheet.

## Route strategy

Use explicit locale-prefixed routes:

```text
/en
/en/work/nihonest

/ja
/ja/work/nihonest
```

Benefits:

- explicit language state;
- predictable sharing;
- straightforward SEO;
- easier debugging.

## Shared versus localized data

### Shared

Do not duplicate:

- slug;
- year;
- project status;
- publication state;
- technologies;
- capability references;
- links;
- media IDs;
- technical IDs;
- factual numeric metadata.

### Localized

Translate:

- project title where appropriate;
- summary;
- description;
- headings;
- narrative blocks;
- captions;
- navigation;
- labels;
- language-dependent alt text;
- accessibility labels;
- About copy;
- contact copy.

## Translation completeness

Support explicit states:

```text
none
summary
partial
complete
```

A project may launch with Japanese summary only while its deep case study remains English.

## Fallback behavior

Do not silently mix languages without explanation.

If a Japanese page has partial translation:

- render available Japanese content;
- indicate that detailed content is currently available in English;
- optionally offer a clear link/switch;
- use reviewed Japanese navigation/page chrome where available, with English fallback otherwise.

The fallback should feel intentional.

## Japanese design behavior

Japanese text differs from English in:

- line breaking;
- character width;
- punctuation;
- density;
- heading scale;
- font metrics.

Therefore Japanese mode may require locale-specific layout adjustments.

This is not a separate theme.

## Vertical writing

Selective vertical Japanese text may be used only where it genuinely supports Editorial composition.

Rules:

- decorative/supporting, not essential;
- accessible equivalent exists;
- not used for long critical content;
- not present merely to signal "Japan."

## Font selection

Choose Japanese fonts intentionally.

Possible direction:

- Gothic for UI/body;
- optional Mincho accents in Editorial.

Ensure:

- readable weights;
- good mixed Latin/Japanese appearance;
- controlled loading;
- minimal layout shift.

## Locale switch behavior

Switching locale should preserve:

- equivalent current route;
- current theme;
- current project;
- sensible state where practical.

Example:

```text
/en/work/upwatch
→ JA
/ja/work/upwatch
```

## Theme and locale independence

Orthogonal axes:

```text
locale = en | ja
theme = editorial | engineer | digital | chronicle
```

Do not encode locale into theme IDs.

All launch themes must support both locale shells.

## SEO

Use:

- correct `lang` attribute;
- canonical;
- alternate/hreflang links;
- locale-specific metadata;
- locale-specific OG content where available.

Avoid canonical conflicts.

## Translation workflow

Recommended:

```text
English source
↓
Japanese draft
↓
human/AI review for naturalness
↓
publish translation status
```

Do not treat raw automatic translation as final professional Japanese without review.

## Japanese audience tone

Aim for natural professional Japanese.

Avoid:

- over-polite machine phrasing;
- unnecessary katakana;
- literal idiom translation;
- random decorative Japanese mixed into English-only content.

## Technical terminology

Use conventional Japanese software terminology where appropriate.

Keep technology names unchanged:

- Next.js
- TypeScript
- Go
- PostgreSQL

## Structural compatibility

Localized content should be structurally compatible enough for all themes to render it.

It need not be sentence-by-sentence identical.

Natural Japanese rewriting is acceptable when factual meaning is preserved.

## Testing

Test:

- long Japanese headings;
- punctuation;
- line wrapping;
- mobile;
- menu width;
- metadata density;
- Engineer mode technical labels;
- Digital overlapping text;
- screen-reader language changes.

## Principle

Localization is product architecture, not an afterthought or decorative motif.

## Implemented source authoring (2026-10-08)

Public page copy in `src/content/placeholder.ts`, `src/content/pages.ts` and
`src/content/contact.ts` uses `{ en: "English source", ja?: "Reviewed Japanese" }`.
Leave `ja` absent until reviewed copy exists. IDs, routes, addresses and destinations
remain shared. Project records keep their existing per-locale schema and translation status.

Interface text lives in `src/content/interface.ts`, including navigation, metadata,
gallery/code controls, empty states and accessibility labels. Its stable keys identify
messages; edit their `en`/`ja` values rather than renaming keys to change wording.
Interpolated values such as `{title}` or `{count}` must occur in both translations.
Technology names and other verified proper names can remain shared.

Use `Text` for localized content and `UiText` for dictionary labels. Use `message`
for attributes and progressive controls, with `messageLanguage` or `setInterfaceText`
to mark the actual text language. Each field resolves independently: a translated
heading does not turn its English description into Japanese. React text rendering
and DOM `textContent` keep inserted values escaped.

`npm run content:validate` checks nonempty English sources, optional nonempty Japanese
fields and matching interpolation tokens. Unit tests cover partial translations and
fallback language; browser tests cover both locale routes in every mode.

This pass adds translation infrastructure, not Japanese drafts. The locale notice
now explains that unavailable translations use English. Japanese SEO alternates and
sitemap entries remain disabled until the corresponding content is reviewed; filling
a few interface slots alone does not make a Japanese page ready for indexing.
