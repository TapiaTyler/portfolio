# Japanese case-study translation guide

How project case studies are translated into Japanese. Interface and page copy are
already drafted (see `docs/07-LOCALIZATION.md`); this covers the project records in
`src/content/projects/`.

English is the source. Japanese is AI-drafted and then reviewed; a draft is never
final professional copy on its own.

## Workflow

1. `npm run translation:report` lists, per project, everything still missing for a
   complete Japanese case study. It checks the record as if it were declared
   `complete`, so the list matches exactly what validation will demand.
2. Translate one project at a time (see "Where Japanese goes").
3. Set `translationStatus.ja`:
   - `summary`: title and summary only, no case-study blocks.
   - `partial`: some blocks; the rest fall back to English with a notice.
   - `complete`: everything the report listed. The per-project fallback notice
     disappears on its own, on cards and on the case study.
4. `npm run content:validate` and `npm test`.
5. Review in the browser at `/ja/work/<slug>` in each mode, including phones
   (Japanese runs longer than English in fixed Chronicle screens).
6. Once every published project is `complete`, remove the site-wide translation
   notice in `src/components/site-shell.tsx`, and consider enabling Japanese
   indexing (hreflang alternates and sitemap entries).

## Where Japanese goes

- **Narrative:** `locale.ja` holds `title`, `shortTitle`, `summary`, `description`,
  `overview` and `blocks`. Each translated block keeps its English `id`, `type` and
  references (`mediaId`, `diagramId`, `codeSnippetIds`, `supportsBlockId`); only text
  changes. Blocks are matched by ID, so Japanese cannot drop or reorder sections.
- **Project wording:** `locale.ja.type`, `locale.ja.roles` (same items, same order
  as the English lists) and `locale.ja.contribution.review` / `.testing`.
- **Asset text:** media `alt` and `caption`, diagram `title`, `accessibleSummary`,
  node and edge labels, and code snippet `title` take an inline `ja` beside `en`.
- For a long record, keep `locale.ja` in a sibling module (for example
  `nihonest.ja.ts`, typed as `NonNullable<ProjectInput["locale"]["ja"]>`) and
  import it, so the English source stays readable.

## Rules

- Keep the facts. No new claims, outcomes, metrics or rationale; numbers, dates
  and test counts stay exactly as in English.
- Natural professional Japanese (です/ます in prose; concise noun phrases in
  headings and labels). Rewrite for flow rather than translating line by line.
- Technology, product and library names stay as written: Next.js, React,
  TypeScript, Supabase, Zod, MDX, Vercel, Spring Boot, PostgreSQL, Flyway, Docker.
- The site's mode names stay English: Product, Editorial, Engineer, Digital,
  Chronicle. Project names stay as authored (Nihonest).
- Code, identifiers and file names are never translated.
- The English case-study contract (word ceilings, section caps) is measured on
  English only; keep Japanese similarly concise.

## Shared terminology

Use these so case studies match the interface (`src/content/interface.ts`).

| English | Japanese |
|---|---|
| case study | ケーススタディ |
| decision | 判断 |
| rationale | 理由 |
| tradeoffs | トレードオフ |
| alternatives | 代替案 |
| challenge | 直面した課題 |
| problem | 課題 |
| result / outcome | 成果 |
| architecture | アーキテクチャ |
| engineering details | 技術的な詳細 |
| overview / at a glance | 概要 |
| active development | 開発中 |
| AI-assisted development | AI支援による開発 |
| localization | ローカライズ |
| accessibility | アクセシビリティ |
| validation | 検証 |
| content system | コンテンツシステム |
| web route (Next.js) | ルート |
| municipality / prefecture | 市区町村 / 都道府県 |
| residence status | 在留資格 |
| residence certificate (juminhyo) | 住民票 |
| responsible authority | 担当機関 |
| sources (citations) | 出典 |

Project-specific terms should match the Japanese the project itself uses. Nihonest
has a Japanese interface (select 日本語（試験版） under "Guide language"); from it:

| Nihonest English | Japanese (from the app) |
|---|---|
| journey / guided journey | ジャーニー / ガイド付きジャーニー |
| route (a person's immigration route) | 経路 |
| phase / step | フェーズ / ステップ |
| Explore | ガイドを探す |
| Find my starting point | 開始地点を選ぶ |
| Editorial Review (label) | 編集確認が必要 |
| Clarity / Sources / Access | 分かりやすさ / 出典 / 利用しやすさ |
| municipal supplement | 自治体ごとの補足情報 (no app term found) |

Japan Travel Planner's terms come from its own Japanese interface
(`frontend/src/i18n/locales/ja.json` in its repository):

| Japan Travel Planner English | Japanese (from the app) |
|---|---|
| trip / My Trips | 旅行 / 旅行一覧 |
| itinerary / itinerary item | 旅程 / 旅程項目 |
| Trip Library | 旅行ライブラリ |
| template / private | テンプレート / 非公開 |
| saved items | 保存した項目 |
| cost summary / cost status | 費用の概要 / 費用状況 |
| activity / lodging / transportation | アクティビティ / 宿泊 / 交通 |
| filters | 絞り込み |
| printable itinerary | 印刷用旅程 |
| capstone | キャップストーン（卒業制作） |

Screenshots show the English interface, so captions quote visible English labels
and add the app's Japanese in brackets, e.g. 「Editorial Review」（編集確認が必要）.
Record new decisions here as they are made.
