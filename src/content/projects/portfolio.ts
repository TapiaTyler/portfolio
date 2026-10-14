import type { ProjectInput } from "@/lib/content/schema";
import { portfolioJapanese } from "./portfolio.ja";

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
  label?: string,
) => ({
  id,
  type: "image" as const,
  src: `/media/projects/portfolio/${file}`,
  width,
  height,
  purpose: "process" as const,
  alt,
  caption,
  ...(label ? { label: { en: label } } : {}),
});

/** Source-backed record; claims stay limited to what the repository and captures show. */
export const portfolioProject = {
  kind: "project",
  slug: "portfolio",
  year: 2026,
  status: "active",
  type: ["Portfolio website", "Presentation system"],
  roles: [
    "Product direction",
    "Architecture",
    "Design direction",
    "Implementation review",
  ],
  technologyIds: ["typescript", "nextjs", "react", "zod", "playwright"],
  capabilityIds: [
    "product-ui-engineering",
    "system-architecture",
    "design-systems",
    "accessibility",
    "testing-quality",
  ],
  publication: { status: "published", featured: true, priority: 1 },
  links: { repository: "https://github.com/TapiaTyler/portfolio" },
  translationStatus: { ja: "complete" },
  contribution: {
    productDirection: "primary",
    architecture: "primary",
    uiDirection: "primary",
    implementation: "ai-assisted",
    review:
      "Product, architecture and design direction guided successive reviews of the running site. Interaction behavior was refined through repeated visual and functional review, with coding agents assisting implementation, documentation and automated verification.",
    testing:
      "Schema validation, unit tests, Playwright browser checks, automated accessibility scans and visual inspection; deployed and field-performance acceptance remain pending.",
  },
  previewMediaId: "editorial-home",
  media: [
    image(
      "editorial-home",
      "editorial-home-2026-10-08-refreshed.png",
      {
        en: "Editorial homepage with an ink landscape, large serif headline and publication-style navigation.",
        ja: "水墨画の風景、大きなセリフ体の見出し、出版物風のナビゲーションを備えたEditorialのホームページ。",
      },
      {
        en: "Editorial pairs an ink landscape with publication typography and generous whitespace.",
        ja: "Editorialは、水墨画の風景に出版物のようなタイポグラフィとたっぷりとした余白を組み合わせています。",
      },
      1440,
      1000,
      "Editorial",
    ),
    image(
      "engineer-home",
      "engineer-home-2026-10-08-refreshed.png",
      {
        en: "Engineer homepage with a system-oriented introduction and structured technical panels.",
        ja: "システム志向の紹介文と、構造化された技術パネルを備えたEngineerのホームページ。",
      },
      {
        en: "The same homepage facts in Engineer: system records, monospace metadata and denser grouping.",
        ja: "同じホームページの内容をEngineerで表示。システムのレコード、等幅フォントのメタデータ、より密度の高いグループ分け。",
      },
      1440,
      1000,
      "Engineer",
    ),
    image(
      "digital-home",
      "digital-home-2026-10-08-refreshed.png",
      {
        en: "Digital homepage with a spatial hero, atmospheric grid and cyan interface accents.",
        ja: "空間的なヒーロー、雰囲気のあるグリッド、シアンのアクセントを備えたDigitalのホームページ。",
      },
      {
        en: "The same homepage facts in Digital: spatial composition, layered surfaces and expressive responses.",
        ja: "同じホームページの内容をDigitalで表示。空間的なコンポジション、重なり合う面、表情豊かな反応。",
      },
      1440,
      1000,
      "Digital",
    ),
    image(
      "chronicle-home",
      "chronicle-home-2026-10-08-refreshed.png",
      {
        en: "Chronicle homepage on one landscape screen: scenic hero, a horizontal strip of framed project cards and a tab rail with the selected section.",
        ja: "ひとつの横長画面に収めたChronicleのホームページ。風景のヒーロー、枠付きのプロジェクトカードが横に並ぶストリップ、選択中のセクションを示すタブレール。",
      },
      {
        en: "The same homepage facts in Chronicle: one landscape game screen with horizontal project selection and a tab rail.",
        ja: "同じホームページの内容をChronicleで表示。横方向にプロジェクトを選ぶ、タブレール付きの横長のゲーム画面。",
      },
      1440,
      1000,
      "Chronicle",
    ),
    image(
      "product-home",
      "product-home-2026-10-08-refreshed.png",
      {
        en: "Product homepage with a misty valley beside the introduction and a project list with a selected preview.",
        ja: "紹介文の横に霧の谷を配し、プロジェクトの一覧と選択中のプレビューを備えたProductのホームページ。",
      },
      {
        en: "Product emphasizes project comparison, a selected preview and restrained feedback.",
        ja: "Productは、プロジェクトの比較、選択中のプレビュー、控えめなフィードバックを重視しています。",
      },
      1440,
      1000,
      "Product",
    ),
    image(
      "chronicle-before-home",
      "chronicle-before-home.png",
      {
        en: "First Chronicle homepage: a scenic hero, an empty boxed Selected Work panel and a row of four collapsed sections, with the mode picker as a row of buttons.",
        ja: "最初のChronicleのホームページ。風景のヒーロー、空の枠付き「Selected Work」パネル、折りたたまれた4つのセクションの列、ボタンを並べたモード選択。",
      },
      {
        en: "Before: the first AI-assisted Chronicle build, captured October 3, with an empty project panel and conventional stacked disclosures.",
        ja: "変更前：10月3日に撮影した、AI支援による最初のChronicle。プロジェクトのパネルは空で、従来型の開閉式の要素が縦に積まれています。",
      },
      1440,
      900,
    ),
    {
      id: "chronicle-interactions",
      type: "video" as const,
      src: "/media/projects/portfolio/chronicle-interactions-2026-10-07.webm",
      poster: "/media/projects/portfolio/chronicle-interactions-2026-10-07.png",
      width: 1440,
      height: 1000,
      purpose: "process" as const,
      alt: {
        en: "Editorial morphing into Chronicle, then a project card selected with one tap and opened with a second, unfolding into its case-study banner; a chapter link, an image opening through a crystal shape, and browser Back folding the banner into its card.",
        ja: "EditorialがChronicleへモーフィングし、1回目のタップでプロジェクトカードを選び、2回目で開くとケーススタディのバナーに展開します。続いて章のリンク、クリスタル型から開く画像、ブラウザの「戻る」でバナーがカードへ折りたたまれる様子。",
      },
      caption: {
        en: "Theme morphing, two-tap project opening, chapter selection, crystal image viewing and browser Back. Silent local demonstration; not a benchmark.",
        ja: "テーマのモーフィング、2回のタップでのプロジェクトの表示、章の選択、クリスタル型の画像表示、ブラウザの「戻る」。音声なしのローカルでのデモで、ベンチマークではありません。",
      },
    },
    {
      id: "theme-morphing",
      type: "video",
      src: "/media/projects/portfolio/theme-morphing-2026-10-08.webm",
      poster: "/media/projects/portfolio/theme-morphing-2026-10-08.png",
      width: 1440,
      height: 1000,
      purpose: "process",
      alt: {
        en: "Local recording of Product changing to Editorial, Engineer, Digital, Chronicle and back to Product, with matching modules moving and resizing.",
        ja: "ProductからEditorial、Engineer、Digital、Chronicleへ切り替わり、Productに戻るまでを、対応するモジュールが移動・リサイズする様子とともにローカルで録画したもの。",
      },
      caption: {
        en: "Product, Editorial, Engineer, Digital and Chronicle share one content source, with modules moving and resizing during theme changes. Silent local recording.",
        ja: "Product、Editorial、Engineer、Digital、Chronicleはひとつのコンテンツソースを共有し、テーマの切り替え中にモジュールが移動・リサイズします。音声なしのローカル録画。",
      },
    },
    {
      id: "route-transitions",
      type: "video",
      src: "/media/projects/portfolio/route-transitions-2026-10-08-refreshed.webm",
      poster:
        "/media/projects/portfolio/route-transitions-2026-10-08-refreshed.png",
      width: 1440,
      height: 1000,
      purpose: "process",
      alt: {
        en: "Header navigation to About and browser Back in Product, Editorial, Engineer, Digital and Chronicle.",
        ja: "Product、Editorial、Engineer、Digital、Chronicleでの、ヘッダーからAboutへの移動とブラウザの「戻る」。",
      },
      caption: {
        en: "Header navigation and browser Back across five modes: ordinary navigation, page turns, record scans, spatial changes and chapter slides. Silent local recording.",
        ja: "5つのモードでのヘッダーからの移動とブラウザの「戻る」。通常の画面遷移、ページめくり、レコードのスキャン、空間的な変化、章のスライド。音声なしのローカル録画。",
      },
    },
  ],
  diagrams: [
    {
      id: "presentation-pipeline",
      title: {
        en: "One content source, several reading experiences",
        ja: "ひとつのコンテンツソース、複数の読み方",
      },
      accessibleSummary: {
        en: "Typed content is validated and localized, then shared semantic components supply meaning. A selected composition organizes it, theme tokens supply visual primitives, and progressive motion adds continuity without changing the facts.",
        ja: "型付きのコンテンツを検証・ローカライズし、共有のセマンティックコンポーネントが意味を与えます。選択したコンポジションがそれを構成し、テーマトークンが視覚の基本要素を与え、段階的なモーションが事実を変えずに連続性を加えます。",
      },
      nodes: [
        {
          id: "content",
          label: {
            en: "Typed content and locale selection",
            ja: "型付きコンテンツとロケールの選択",
          },
        },
        {
          id: "semantics",
          label: {
            en: "Shared semantic components",
            ja: "共有のセマンティックコンポーネント",
          },
        },
        {
          id: "composition",
          label: {
            en: "Product / Editorial / Engineer / Digital / Chronicle composition",
            ja: "Product / Editorial / Engineer / Digital / Chronicleのコンポジション",
          },
        },
        { id: "tokens", label: { en: "Theme tokens", ja: "テーマトークン" } },
        {
          id: "motion",
          label: {
            en: "Progressive interaction and motion",
            ja: "段階的なインタラクションとモーション",
          },
        },
      ],
      edges: [
        { from: "content", to: "semantics" },
        { from: "semantics", to: "composition" },
        { from: "composition", to: "tokens" },
        { from: "tokens", to: "motion" },
      ],
    },
  ],
  codeSnippets: [
    {
      id: "public-lookup",
      language: "typescript",
      title: {
        en: "Public lookup uses the filtered inventory",
        ja: "公開用の参照は絞り込み済みの一覧を使う",
      },
      source: `getProject: (slug: string): Project | undefined => {
  const project = published.find((project) => project.slug === slug);
  return project ? structuredClone(project) : undefined;
},`,
    },
  ],
  locale: {
    en: {
      title: "One Portfolio, Five Perspectives",
      shortTitle: "Portfolio Presentation System",
      summary:
        "A shared content system interpreted through Product, Editorial, Engineer, Digital and Chronicle compositions, with visual systems and motion adapted to each mode.",
      description:
        "A portfolio built around one content source and several ways of reading it. Shared semantic components support different compositions, visual systems and interactions without duplicating project narratives.",
      overview: {
        distinction:
          "One factual content source supports different compositions, with theme morphing, navigation transitions and interaction patterns tailored to each reading experience.",
        currentState:
          "Five presentation modes are implemented, with Product as the default. Japanese copy is AI-drafted and awaiting native review; deployment and deployed performance verification remain pending.",
      },
      blocks: [
        {
          id: "intent",
          type: "problem",
          heading: "The portfolio is part of the work",
          body: prose(
            "A portfolio should show both design judgment and engineering ability, but a single conventional layout shows only one way of organizing the work.",
            "The requirement was one factual source with several complete ways of reading it. Changing modes should change hierarchy, grouping, density and interaction, never project availability, URLs or meaning.",
          ),
        },
        {
          id: "built",
          type: "intro",
          heading: "Five complete ways to read one portfolio",
          body: prose(
            "Product, Editorial, Engineer, Digital and Chronicle present the same projects, pages and case studies. Each mode has its own composition and navigation, while one typed content source supplies every fact, link and project.",
            "Switching modes morphs the page in place, and each mode has its own page transitions and small responses. Motion is always an enhancement: links, forms and disclosures work without it.",
          ),
        },
        {
          id: "compositions",
          type: "gallery",
          mediaIds: [
            "product-home",
            "editorial-home",
            "engineer-home",
            "digital-home",
            "chronicle-home",
          ],
          relationship: "alternatives",
        },
        {
          id: "composition",
          type: "decision",
          title: "Make modes different ways of reading",
          context: prose(
            "A palette and font switch alone would leave the same hierarchy and project grid in place.",
          ),
          decision: prose(
            "Product emphasizes project comparison and decisions through a list and selected preview. Editorial reads like a publication, with serif typography and narrative-led features. Engineer uses project records, metadata and a technical section overview. Digital uses spatial cards and layered media. Chronicle is a touch-first, landscape game screen with horizontal project selection.",
          ),
          tradeoffs: prose(
            "Separate compositions need more responsive and accessibility review than a token-only switch; shared content and semantic components keep that maintainable.",
          ),
        },
        {
          id: "continuity",
          type: "decision",
          title: "Morph the composition without duplicating the content",
          context: prose(
            "Replacing the page abruptly made switching modes feel like loading a different site.",
          ),
          decision: prose(
            "The server selects the composition from one validated preference cookie. Around that commit, the browser matches visible semantic modules by temporary identities and moves and resizes their snapshots into the new layout, keeping the reader's section and focus.",
          ),
          rationale: prose(
            "Snapshot continuity bridges different server-rendered structures without a second content tree or a heavy animation runtime.",
          ),
        },
        {
          id: "morphing-evidence",
          type: "media",
          mediaId: "theme-morphing",
          supportsBlockId: "continuity",
        },
        {
          id: "architecture",
          type: "architecture",
          diagramId: "presentation-pipeline",
          explanation: prose(
            "Project metadata, media and narrative blocks live in typed records, validated for publication rules, asset references and translation declarations before rendering.",
            "Shared semantic components carry meaning; each mode's composition organizes them, and tokens and motion stay separate layers. Adding a project never means writing its content once per mode.",
          ),
        },
        {
          id: "chronicle",
          type: "challenge",
          title: "Rebuild Chronicle as a touch-first game screen",
          problem: prose(
            "The first, AI-assisted Chronicle build matched its reference images' palette and scenery but read as a conventional webpage: stacked boxed panels, collapsed sections and a vertical case study.",
          ),
          response: prose(
            "Directed review rebuilt the composition rather than its colors: a screen-sized shell, a snapping horizontal project strip, contained case-study reading and dedicated landscape-phone layouts. Generous touch targets and whole-card selection make browsing comfortable; a first tap selects a project and a second opens it.",
          ),
          result: prose(
            "The same project records now read as a game screen on desktop and phones, with content, URLs and native links unchanged.",
          ),
        },
        {
          id: "chronicle-evidence",
          type: "media",
          mediaId: "chronicle-interactions",
          supportsBlockId: "chronicle",
        },
        {
          id: "chronicle-iteration",
          type: "gallery",
          mediaIds: ["chronicle-before-home", "chronicle-home"],
          relationship: "comparison",
        },
        {
          id: "engineering-details",
          type: "technical",
          title: "Engineering details",
          summary:
            "Theme-specific page transitions and microinteractions, reduced-motion behavior, the publication boundary, and how the system is verified.",
          body: prose(
            "Theme morph geometry follows the destination: 280ms for Product, 560ms for Editorial, 360ms for Engineer, 680ms for Digital and 620ms for Chronicle, while text and surfaces swap in 180ms. A 1500ms capture timeout releases a slow snapshot; reduced motion, unsupported browsers and native forms switch immediately.",
            "Each mode has its own navigation model. Product uses ordinary route navigation and restrained selection feedback. Editorial turns pages: horizontal turns follow chapter order and depth, and header links swing a top-bound page down from the front over 600ms. Engineer swaps records with a scan rule over 240ms. Digital expands a selected card into its detail view and contracts it on Back. Chronicle slides chapters by direction and unfolds an opened card into its case-study banner. Theme changes cancel route effects.",
            "Microinteractions follow the same split: Editorial disclosures fold from their top edge and reverse on closing, Engineer gives stepped feedback and inspectable diagrams, Digital uses pointer lighting and a carousel that expands from the selected image, and Chronicle deals cards, sweeps the selected frame with light and opens images through a crystal shape. Touch gets press feedback without mouse tracking, and reduced motion keeps every state legible without animation.",
            "Publication is a content boundary: drafts are validated but excluded from the public inventory, including direct slug lookup, and development previews read authoring records only behind an environment guard.",
            "Schema and unit tests, Playwright browser checks and automated accessibility scans cover the compositions, navigation and reduced-motion behavior. They do not establish full WCAG conformance or deployed performance. English is the source language; /ja routes carry an AI-drafted Japanese translation awaiting native review, with field-level fallback to English.",
          ),
          codeSnippetIds: ["public-lookup"],
        },
        {
          id: "navigation-evidence",
          type: "media",
          mediaId: "route-transitions",
          supportsBlockId: "engineering-details",
        },
        {
          id: "state",
          type: "result",
          body: prose(
            "The same project content reads through five distinct compositions, connected by theme-switch morphing and extended by each mode's navigation and small responses. Shared validation, publication controls and locale fallbacks let a new project join every mode without separate narratives.",
            "The presentation system and English and Japanese copy are implemented. Native review of the Japanese, deployment and deployed performance acceptance are the next release steps.",
          ),
        },
      ],
    },
    ja: portfolioJapanese,
  },
} satisfies ProjectInput;
