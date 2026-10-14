import type { ProjectInput } from "@/lib/content/schema";
import { nihonestJapanese } from "./nihonest.ja";

const prose = (...paragraphs: string[]) =>
  paragraphs.map((text) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text }],
  }));

const image = (
  id: string,
  file: string,
  alt: { en: string; ja: string },
  caption: { en: string; ja: string },
  width = 1440,
  height = 1000,
) => ({
  id,
  type: "image" as const,
  src: `/media/projects/nihonest/${file}`,
  width,
  height,
  purpose: width < height ? ("mobile" as const) : ("detail" as const),
  alt,
  caption,
});

/** Hosted at nihonest.vercel.app and in active development; claims stay within verified source evidence. */
export const nihonestProject = {
  kind: "project",
  slug: "nihonest",
  year: 2026,
  status: "active",
  type: ["Information web application", "Editorial tooling"],
  roles: [
    "Product planning",
    "Content direction",
    "UI direction",
    "Technical direction",
    "Implementation review",
  ],
  technologyIds: [
    "nextjs",
    "react",
    "typescript",
    "mdx",
    "zod",
    "tailwind",
    "supabase",
    "postgresql",
  ],
  capabilityIds: [
    "product-ui-engineering",
    "full-stack-development",
    "system-architecture",
    "data-modeling",
    "localization",
    "security",
    "developer-tooling",
    "testing-quality",
    "technical-documentation",
  ],
  publication: { status: "published", featured: true, priority: 0 },
  links: {
    live: "https://nihonest.vercel.app/",
    repository: "https://github.com/TapiaTyler/nihonest",
  },
  translationStatus: { ja: "complete" },
  contribution: {
    productDirection: "primary",
    uiDirection: "primary",
    implementation: "ai-assisted",
    review:
      "Planning and documentation were developed with ChatGPT before implementation. Content direction, UI choices and implementation decisions were set and reviewed throughout. AI assisted research, implementation, translation and refactoring: Codex drafted article research and English copy, and Codex and Claude reviewed the implementation and articles.",
    testing:
      "Architecture checks across 677 production modules, TypeScript checking and 18 targeted tests pass. Browser-flow, database and performance testing are not yet part of the verification.",
  },
  previewMediaId: "home-desktop",
  media: [
    image(
      "home-desktop",
      "home-live-desktop-2026-10-08.png",
      {
        en: "Nihonest's English homepage with its introduction, Find my starting point action, optional personalization panel, and clarity, sources, and access principles.",
        ja: "Nihonestの英語版ホームページ。紹介文、「Find my starting point」（開始地点を選ぶ）ボタン、任意のパーソナライズ設定パネル、分かりやすさ・出典・利用しやすさの方針が表示されている。",
      },
      {
        en: "The live homepage introduces public guidance and optional personalization. Captured October 8, 2026.",
        ja: "公開中のホームページ。誰でも読めるガイドと、任意のパーソナライズを紹介している。2026年10月8日撮影。",
      },
    ),
    image(
      "explore-desktop",
      "explore-desktop.png",
      {
        en: "Search for juminhyo with result-kind controls and matches across groups, guides, and glossary terms.",
        ja: "「juminhyo（住民票）」の検索結果。結果の種類を切り替えるコントロールと、グループ・ガイド・用語集にまたがる一致項目が表示されている。",
      },
      {
        en: "One search joins groups, guides, FAQs and glossary terms under a single query.",
        ja: "ひとつの検索で、グループ、ガイド、よくある質問、用語集をまとめて探せる。",
      },
    ),
    image(
      "journey-mobile",
      "journey-mobile.png",
      {
        en: "Mobile Student journey showing the selected long-term study route and reading sequence.",
        ja: "モバイルの学生向けジャーニー。選択した長期留学の経路と、読み進める順序が表示されている。",
      },
      {
        en: "The student-status route selected on mobile. Route selection guides reading; it does not determine eligibility.",
        ja: "モバイルで在留資格「留学」の経路を選択した画面。経路の選択は読む順序を案内するもので、資格の有無を判定するものではない。",
      },
      390,
      844,
    ),
    image(
      "journey-conditions-mobile",
      "journey-conditions-mobile.png",
      {
        en: "A mobile journey phase marks working part-time as conditional with an applicability label.",
        ja: "モバイルのジャーニーの一段階。アルバイトが、適用条件のラベル付きの条件付き項目として示されている。",
      },
      {
        en: "The same route keeps conditional steps and their Editorial Review label.",
        ja: "同じ経路でも、条件付きのステップと「Editorial Review」（編集確認が必要）のラベルはそのまま表示される。",
      },
      390,
      844,
    ),
    image(
      "local-guidance-desktop",
      "local-guidance-desktop.png",
      {
        en: "Native prefecture and municipality selectors show a Shinjuku local supplement and its responsible body.",
        ja: "都道府県と市区町村の標準セレクトで新宿区を選び、新宿区の補足情報と担当機関が表示されている。",
      },
      {
        en: "Tokyo and Shinjuku selected. The local supplement is still marked Editorial Review.",
        ja: "東京都と新宿区を選択した画面。この地域の補足情報には、まだ「Editorial Review」（編集確認が必要）のラベルが付いている。",
      },
    ),
  ],
  diagrams: [
    {
      id: "architecture-content-boundaries",
      title: {
        en: "Nihonest content and state boundaries",
        ja: "Nihonestのコンテンツと状態の境界",
      },
      accessibleSummary: {
        en: "Repository content is validated before public rendering. Browser preferences remain local until an optional account syncs selected state through Supabase. The local CMS edits repository files but is not a public route.",
        ja: "リポジトリのコンテンツは、公開ページに表示される前に検証されます。ブラウザの設定は、任意のアカウントがSupabase経由で選択された状態を同期するまで、端末内にとどまります。ローカルCMSはリポジトリのファイルを編集しますが、公開ルートではありません。",
      },
      nodes: [
        {
          id: "canonical-content",
          label: {
            en: "English MDX and typed repository records",
            ja: "英語のMDXと型付きリポジトリレコード",
          },
        },
        {
          id: "catalog-validation",
          label: {
            en: "Zod and cross-reference validation",
            ja: "Zodと相互参照の検証",
          },
        },
        {
          id: "search-index",
          label: {
            en: "In-memory search index",
            ja: "メモリ上の検索インデックス",
          },
        },
        {
          id: "public-routes",
          label: { en: "Next.js public routes", ja: "Next.jsの公開ルート" },
        },
        {
          id: "translation-overlays",
          label: {
            en: "Revision-addressed Japanese overlays",
            ja: "リビジョン単位で管理する日本語オーバーレイ",
          },
        },
        {
          id: "browser-state",
          label: {
            en: "Anonymous browser preferences and progress",
            ja: "匿名のブラウザ設定と進捗",
          },
        },
        {
          id: "account-sync",
          label: {
            en: "Optional validated account sync",
            ja: "任意の検証済みアカウント同期",
          },
        },
        {
          id: "supabase-rls",
          label: {
            en: "Supabase owner-scoped tables and functions",
            ja: "Supabaseの所有者単位のテーブルと関数",
          },
        },
        {
          id: "local-cms",
          label: {
            en: "Loopback editorial CMS",
            ja: "ループバック限定の編集用CMS",
          },
        },
      ],
      edges: [
        {
          from: "canonical-content",
          to: "catalog-validation",
          label: { en: "parsed and checked", ja: "解析・検査" },
        },
        {
          from: "catalog-validation",
          to: "public-routes",
          label: { en: "renders", ja: "表示" },
        },
        {
          from: "catalog-validation",
          to: "search-index",
          label: { en: "indexes", ja: "インデックス化" },
        },
        {
          from: "search-index",
          to: "public-routes",
          label: { en: "discovery results", ja: "検索結果" },
        },
        {
          from: "translation-overlays",
          to: "public-routes",
          label: {
            en: "Japanese text with fallback",
            ja: "日本語テキスト（英語フォールバックあり）",
          },
        },
        {
          from: "browser-state",
          to: "public-routes",
          label: {
            en: "anonymous personalization",
            ja: "匿名のパーソナライズ",
          },
        },
        {
          from: "browser-state",
          to: "account-sync",
          label: { en: "optional snapshot", ja: "任意のスナップショット" },
        },
        {
          from: "account-sync",
          to: "supabase-rls",
          label: { en: "validated RPC", ja: "検証済みRPC" },
        },
        {
          from: "local-cms",
          to: "canonical-content",
          label: {
            en: "guarded local file edits",
            ja: "保護されたローカルファイル編集",
          },
        },
      ],
    },
  ],
  codeSnippets: [
    {
      id: "journey-step-resolver",
      language: "typescript",
      title: {
        en: "Resolve one journey route into a reading sequence",
        ja: "ジャーニーの経路を、ひとつの読む順序に解決する",
      },
      source: `export function resolveJourneySteps(journey: GuidedJourney, routeId?: string): readonly ResolvedJourneyStep[] {
  const route = getJourneyRouteById(journey, routeId);
  // Route choices replace one placeholder with one canonical guide; alternatives must never become sequential steps.
  return journey.phases.flatMap<ResolvedJourneyStep>((phase) => phase.steps.flatMap<ResolvedJourneyStep>((step) => {
    if (step.type === "route-choice") {
      return route ? [{ phaseId: phase.id, phaseTitle: phase.title, articleId: route.articleId, requiredness: "required" as const, isRouteSelection: true }] : [];
    }
    if (step.routeIds && (!route || !step.routeIds.includes(route.id))) return [];
    return [{ phaseId: phase.id, phaseTitle: phase.title, articleId: step.articleId, requiredness: step.requiredness, conditionLabel: step.conditionLabel, isRouteSelection: false }];
  }));
}`,
    },
  ],
  locale: {
    en: {
      title: "Nihonest",
      summary:
        "Source-linked guidance for moving to and living in Japan, with structured discovery, route-aware journeys, and optional account continuity.",
      description:
        "A Next.js information application that brings guides, Japanese terminology, FAQs, residence-status information, and municipal supplements into one validated content system. A separate local CMS supports editorial changes. The project is hosted on Vercel and in active development.",
      overview: {
        distinction:
          "One canonical content system connects source references, discovery, journeys, and local guidance while keeping access independent of account creation.",
        currentState:
          "Hosted on Vercel and in active development. Qualified editorial and translation review and a CMS screen-reader walkthrough are still pending.",
      },
      blocks: [
        {
          id: "problem-guidance",
          type: "problem",
          heading: "Connect general explanations to the right process",
          body: prose(
            "Moving to Japan involves administrative processes that depend on a person's route, residence status and location. A collection of independent articles can explain individual topics while still leaving readers to work out their sequence and local differences.",
            "Nihonest responds with source-linked guidance that stays open to everyone: reading never requires an account, and each explanation connects to its sources, Japanese terminology and the responsible authority.",
          ),
        },
        {
          id: "intro-product",
          type: "intro",
          heading: "One validated content system with several ways in",
          body: prose(
            "Guides, Japanese administrative terms, FAQs, residence-status information and municipal supplements live in one content system. English MDX articles and typed registries are checked for IDs and relationships before they reach public routes.",
            "Readers can search groups, guides, FAQs and glossary terms in one query, follow a journey for their route, or add guidance for their municipality. Optional accounts carry preferences and progress between devices, and a separate local CMS supports editorial changes.",
          ),
        },
        {
          id: "media-discovery-support",
          type: "media",
          mediaId: "explore-desktop",
          supportsBlockId: "intro-product",
        },
        {
          id: "decision-journeys",
          type: "decision",
          title: "Resolve a route into one reading sequence",
          context: prose(
            "A journey can include shared steps, conditional steps and alternative routes. Presenting every alternative as a sequential task would make the path misleading.",
          ),
          decision: prose(
            "The journey model distinguishes route-choice placeholders from ordinary steps. A selected route resolves the placeholder to its canonical guide and includes only steps scoped to that route; conditional steps keep their applicability labels.",
          ),
          tradeoffs: prose(
            "The route model is a navigation aid, not an eligibility check: readers still confirm applicability with the responsible authority, and content changes must keep route and article references valid.",
          ),
        },
        {
          id: "media-journey-support",
          type: "media",
          mediaId: "journey-mobile",
          supportsBlockId: "decision-journeys",
        },
        {
          id: "media-conditions-support",
          type: "media",
          mediaId: "journey-conditions-mobile",
          supportsBlockId: "decision-journeys",
        },
        {
          id: "decision-localization",
          type: "decision",
          title: "Keep translations attached to the canonical source",
          decision: prose(
            "English is the canonical source. Japanese overlays are cached derivatives addressed by source, prompt and terminology revisions, with fallback behavior and protected terminology constraining what reaches public pages.",
          ),
          tradeoffs: prose(
            "Japanese text is machine-assisted and has not yet had qualified review, so the English source stays authoritative.",
          ),
        },
        {
          id: "architecture-system",
          type: "architecture",
          title:
            "Separate canonical content, personal state, and editorial tooling",
          diagramId: "architecture-content-boundaries",
          explanation: prose(
            "English MDX and typed repository records pass through Zod and cross-reference validation before Next.js renders them. An in-memory index supplies search, and Japanese overlays stay tied to source and terminology revisions.",
            "Personal state stays in the browser unless an optional account syncs it to owner-scoped Supabase tables. The loopback CMS edits repository files outside the public application.",
          ),
        },
        {
          id: "challenge-local-guidance",
          type: "challenge",
          title: "Add local differences without implying universal coverage",
          problem: prose(
            "National guidance leaves readers with municipality-specific questions, while a partial local catalog risks looking more comprehensive than it is.",
          ),
          response: prose(
            "Municipal supplements add researched local differences with source and recheck context. Locations without a researched supplement fall back to general advice instead of showing an implied local guide.",
          ),
          result: prose(
            "Local variation has a place, and gaps stay visible. Keeping supplements current remains an editorial responsibility.",
          ),
        },
        {
          id: "media-local-support",
          type: "media",
          mediaId: "local-guidance-desktop",
          supportsBlockId: "challenge-local-guidance",
        },
        {
          id: "engineering-details",
          type: "technical",
          title: "Engineering details",
          summary:
            "Route resolution in the domain model, the guarded editorial CMS, account synchronization, and the checks that verify them.",
          body: prose(
            "Route resolution stays in the domain model. resolveJourneySteps turns a journey and a selected route into one reading sequence using the typed journey model and getJourneyRouteById, so route rules never live in page layouts.",
            "The editorial CMS runs outside the public application. Its writes check the expected revision and a clean starting file, validate content on the server, and require a local origin and session token. Approval is tied to an exact revision and an immutable record, and the CMS previews changes without publishing the application.",
            "Optional account synchronization validates selected state before sending it through Supabase functions to owner-scoped tables; anonymous preferences and progress stay in browser storage.",
            "Architecture checks across 677 production modules, TypeScript checking and 18 targeted tests pass, covering content, search, account synchronization and the CMS production boundary. Browser flows, database tests and performance measurements are not yet part of the verification, and the database policies and CMS protections have not had a security audit.",
          ),
          codeSnippetIds: ["journey-step-resolver"],
        },
        {
          id: "result-current",
          type: "result",
          body: prose(
            "Nihonest brings public guidance, cross-collection search, route-aware journeys, Japanese terminology and local supplements into one content system, without making an account a prerequisite for reading.",
            "It is hosted on Vercel and in active development. Qualified editorial and translation review, a CMS screen-reader walkthrough and broader testing are the next steps.",
          ),
        },
      ],
    },
    ja: nihonestJapanese,
  },
} satisfies ProjectInput;
