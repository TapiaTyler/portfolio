import type { ProjectInput } from "@/lib/content/schema";
import { japanTravelPlannerJapanese } from "./japan-travel-planner.ja";

const prose = (...paragraphs: string[]) =>
  paragraphs.map((text) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text }],
  }));

const image = (
  id: string,
  file: string,
  width: number,
  height: number,
  purpose: "overview" | "detail" | "mobile",
  alt: { en: string; ja: string },
  caption: { en: string; ja: string },
) => ({
  id,
  type: "image" as const,
  src: `/media/projects/japan-travel-planner/${file}`,
  width,
  height,
  purpose,
  alt,
  caption,
});

/** Tyler confirmed status, ownership and media use on Oct 3, 2026. */
export const japanTravelPlannerProject = {
  kind: "project",
  slug: "japan-travel-planner",
  year: 2026,
  status: "complete",
  type: ["Full-stack web application", "Travel planning"],
  roles: ["Product direction", "Architecture", "Implementation", "Code review"],
  technologyIds: [
    "react",
    "javascript",
    "vite",
    "java",
    "spring-boot",
    "postgresql",
    "flyway",
    "i18next",
    "docker",
    "vitest",
  ],
  capabilityIds: [
    "full-stack-development",
    "frontend-development",
    "backend-development",
    "api-design",
    "data-modeling",
    "localization",
    "testing-quality",
    "security",
  ],
  publication: { status: "published", featured: true, priority: 2 },
  links: {
    live: "https://japan-travel-planner-ggev.onrender.com/",
    repository: "https://github.com/TapiaTyler/japan-travel-planner",
  },
  translationStatus: { ja: "complete" },
  contribution: {
    productDirection: "primary",
    architecture: "primary",
    implementation: "mixed",
    review:
      "The original school-project application was completed manually without AI. Later enhancements used AI assistance, with revisions, decisions and architecture directed and reviewed throughout the work.",
    testing:
      "Frontend lint, 72 frontend tests, 25 backend unit tests and the frontend build pass, and CI passed. Authenticated production workflows have not been tested end to end.",
  },
  previewMediaId: "media-itinerary-desktop",
  media: [
    image(
      "media-itinerary-desktop",
      "itinerary-desktop.png",
      1265,
      1179,
      "detail",
      {
        en: "Desktop Tokyo and Kyoto itinerary with date groups, search, map links and a yen cost summary.",
        ja: "東京と京都のデスクトップ版旅程。日付ごとのグループ、検索、地図リンク、円建ての費用の概要が表示されている。",
      },
      {
        en: "A desktop itinerary brings date grouping, filtering, print controls and cost status together. Fictional trip data illustrates the planning workflow.",
        ja: "デスクトップの旅程画面では、日付ごとのグループ分け、絞り込み、印刷操作、費用状況をまとめて扱える。架空の旅行データで計画の流れを示している。",
      },
    ),
    image(
      "media-itinerary-mobile-dark",
      "itinerary-mobile-dark.png",
      534,
      1263,
      "mobile",
      {
        en: "Narrow dark-theme itinerary with search, print controls, date tabs and the cost summary above the trip items.",
        ja: "幅の狭いダークテーマの旅程。検索、印刷操作、日付タブ、旅程項目の上の費用の概要が表示されている。",
      },
      {
        en: "The itinerary in a narrow dark-theme view using demo data. This is a responsive-state screenshot, not a device-performance test or an earlier version.",
        ja: "デモデータを使った、幅の狭いダークテーマでの旅程表示。レスポンシブ表示の状態を示すスクリーンショットで、端末の性能テストや以前のバージョンではない。",
      },
    ),
    image(
      "media-library-ja",
      "trip-library-japanese.png",
      1270,
      715,
      "detail",
      {
        en: "Trip Library with Japanese interface labels and three curated public-template cards.",
        ja: "日本語のインターフェースで表示した旅行ライブラリ。厳選された3つの公開テンプレートのカードが並んでいる。",
      },
      {
        en: "Japanese interface resources and curated templates share the same library workflow. The image demonstrates implemented localization; translation quality was not independently reviewed.",
        ja: "日本語のインターフェースリソースと厳選テンプレートは、同じライブラリの流れで使える。実装したローカライズを示す画像であり、翻訳の品質は第三者によるレビューを受けていない。",
      },
    ),
  ],
  codeSnippets: [
    {
      id: "snippet-filter-pipeline",
      language: "javascript",
      title: {
        en: "Combining text and structured itinerary filters",
        ja: "テキスト検索と構造化された旅程の絞り込みを組み合わせる",
      },
      source:
        'export function filterItineraryItems(items, query, filters) {\n    const normalizedQuery = normalize(query.trim());\n\n    return items.filter((item) => {\n        if (!matchesSearch(item, normalizedQuery)) {\n            return false;\n        }\n\n        if (filters.dateFrom && (!item.date || item.date < filters.dateFrom)) {\n            return false;\n        }\n\n        if (filters.dateTo && (!item.date || item.date > filters.dateTo)) {\n            return false;\n        }\n\n        if (\n            filters.locations.length > 0 &&\n            !getItemLocations(item).some(\n                (location) => filters.locations.includes(location)\n            )\n        ) {\n            return false;\n        }\n\n        if (\n            filters.itemTypes.length > 0 &&\n            !filters.itemTypes.includes(item.itemType)\n        ) {\n            return false;\n        }\n\n        const costStatus = item.costStatus || "UNKNOWN";\n\n        if (\n            filters.costStatuses.length > 0 &&\n            item.cost !== null &&\n            !filters.costStatuses.includes(costStatus)\n        ) {\n            return false;\n        }\n\n        if (filters.minCost !== "") {\n            if (item.cost === null || Number(item.cost) < Number(filters.minCost)) {\n                return false;\n            }\n        }\n\n        if (filters.maxCost !== "") {\n            if (item.cost === null || Number(item.cost) > Number(filters.maxCost)) {\n                return false;\n            }\n        }\n\n        if (\n            filters.transportationTypes.length > 0 &&\n            item.itemType === "Transportation" &&\n            !filters.transportationTypes.includes(item.transportationType)\n        ) {\n            return false;\n        }\n\n        return true;\n    });\n}',
    },
  ],
  diagrams: [
    {
      id: "diagram-system-flow",
      title: {
        en: "Request, storage and delivery boundaries",
        ja: "リクエスト、保存、配信の境界",
      },
      accessibleSummary: {
        en: "The browser loads the React interface and sends authenticated requests to Spring. Services enforce ownership before reading or writing trips and templates through JPA repositories in PostgreSQL. Flyway manages database changes; a Docker build packages the client into Spring's static resources.",
        ja: "ブラウザはReactのインターフェースを読み込み、認証済みのリクエストをSpringに送ります。サービスは所有者を確認したうえで、JPAリポジトリを通じてPostgreSQLの旅行とテンプレートを読み書きします。データベースの変更はFlywayで管理し、DockerのビルドでクライアントをSpringの静的リソースにパッケージします。",
      },
      nodes: [
        {
          id: "browser",
          label: {
            en: "Browser / React interface",
            ja: "ブラウザ / Reactのインターフェース",
          },
        },
        {
          id: "api",
          label: {
            en: "Spring controllers and security",
            ja: "Springのコントローラーとセキュリティ",
          },
        },
        {
          id: "services",
          label: {
            en: "Trip, item and template services",
            ja: "旅行・項目・テンプレートのサービス",
          },
        },
        {
          id: "repositories",
          label: {
            en: "Spring Data JPA repositories",
            ja: "Spring Data JPAのリポジトリ",
          },
        },
        { id: "database", label: { en: "PostgreSQL", ja: "PostgreSQL" } },
        {
          id: "flyway",
          label: { en: "Flyway migrations", ja: "Flywayのマイグレーション" },
        },
        { id: "docker", label: { en: "Docker build", ja: "Dockerのビルド" } },
        {
          id: "static",
          label: {
            en: "Client files served by Spring",
            ja: "Springが配信するクライアントファイル",
          },
        },
      ],
      edges: [
        {
          from: "browser",
          to: "api",
          label: {
            en: "Session and CSRF headers",
            ja: "セッションとCSRFヘッダー",
          },
        },
        {
          from: "api",
          to: "services",
          label: { en: "Validated operations", ja: "検証済みの操作" },
        },
        {
          from: "services",
          to: "repositories",
          label: { en: "Ownership checks", ja: "所有者の確認" },
        },
        {
          from: "repositories",
          to: "database",
          label: { en: "Read and write", ja: "読み取りと書き込み" },
        },
        {
          from: "flyway",
          to: "database",
          label: { en: "Schema migrations", ja: "スキーマのマイグレーション" },
        },
        {
          from: "docker",
          to: "static",
          label: { en: "Build and package", ja: "ビルドとパッケージ化" },
        },
        {
          from: "static",
          to: "browser",
          label: { en: "Deliver interface", ja: "インターフェースの配信" },
        },
      ],
    },
  ],
  locale: {
    en: {
      title: "Japan Travel Planner",
      summary:
        "A Japan itinerary planner that brings trip editing, reusable templates, yen cost summaries and printable plans into one responsive application.",
      description:
        "A full-stack application that began as a WGU software engineering capstone and evolved to include reusable planning content, filtering, responsive themes and English/Japanese interface support.",
      overview: {
        distinction:
          "A shared itinerary model connects account-based editing, reusable templates, cost summaries and filtered print output.",
        currentState:
          "Completed full-stack application deployed on Render, with account-based trip editing, reusable plans, printable itineraries and English/Japanese interface support.",
      },
      blocks: [
        {
          id: "problem-planning",
          type: "problem",
          heading: "Organize plans without losing their context",
          body: prose(
            "A trip combines activities, accommodation and transport, each with different details, but travelers plan them together and revisit them as dates, costs and routes change.",
            "The planner keeps those item types in one itinerary while letting travelers group, filter, duplicate and reuse their plans.",
          ),
        },
        {
          id: "intro-product",
          type: "intro",
          heading: "Keep a trip's working details together",
          body: prose(
            "Trips combine activities, lodging and transportation in an account-based itinerary. Date and location grouping, search, yen cost summaries and print output offer several ways to work with the same data, and public templates, private reusable trips and saved items avoid starting each plan from scratch.",
            "It began as a WGU software engineering capstone, built without AI and preserved under the capstone-v1.0 tag (September 1, 2026). Later iterations added filtering, mobile and dark-theme refinements, localization, reusable planning content, login limiting and deployment tooling.",
          ),
        },
        {
          id: "media-itinerary-support",
          type: "media",
          mediaId: "media-itinerary-desktop",
          supportsBlockId: "intro-product",
        },
        {
          id: "media-mobile-support",
          type: "media",
          mediaId: "media-itinerary-mobile-dark",
          supportsBlockId: "intro-product",
        },
        {
          id: "decision-delivery",
          type: "decision",
          title: "Package the client and API under one origin",
          decision: prose(
            "The Docker build compiles the React frontend into Spring's static resources and packages the application in one non-root JVM container.",
          ),
          rationale: prose(
            "A single origin for the interface and API simplifies the browser's session-cookie and CSRF integration.",
          ),
          tradeoffs: prose(
            "Frontend and server releases are coupled into one deployment.",
          ),
        },
        {
          id: "decision-localization",
          type: "decision",
          title: "Separate interface translation from personal trip content",
          decision: prose(
            "Interface resources and curated public templates support English and Japanese. User-entered content stays in the language it was written in.",
          ),
          tradeoffs: prose(
            "Translation quality and completeness have not been independently reviewed.",
          ),
        },
        {
          id: "media-localization-support",
          type: "media",
          mediaId: "media-library-ja",
          supportsBlockId: "decision-localization",
        },
        {
          id: "architecture-system",
          type: "architecture",
          title: "Keep account boundaries in the service layer",
          diagramId: "diagram-system-flow",
          explanation: prose(
            "The React client sends session-based requests to Spring controllers. Validated operations pass through services and account-scoped repository access before reaching PostgreSQL, and Flyway versions database changes.",
          ),
        },
        {
          id: "challenge-security",
          type: "challenge",
          title: "Protect account-owned plans across request boundaries",
          problem: prose(
            "Public templates must be readable without an account, while trips, private templates and saved items belong to one user and must never be reachable through another account or a forged request.",
          ),
          response: prose(
            "Spring Security permits anonymous template reads and requires authentication for everything else. Services use the authenticated username instead of an owner value sent by the client, CSRF tokens protect cookie-authenticated mutations, passwords use BCrypt, and login limiting constrains repeated failures.",
          ),
          result: prose(
            "Mocked service tests reject access to another user's resources. Known gaps: the login path does not rotate the session ID or CSRF token, and filter-chain tests for missing CSRF are not yet written.",
          ),
        },
        {
          id: "engineering-details",
          type: "technical",
          title: "Engineering details",
          summary:
            "The client-side filter pipeline, the full security model, responsive and theme behavior, and how the application is tested.",
          codeSnippetIds: ["snippet-filter-pipeline"],
          body: prose(
            "Text search and structured filters narrow the itinerary by date, location, item type, cost and transport mode in filterItineraryItems. Cost summaries and print output use the visible filtered view, which a print-component test checks.",
            "Login stores the authenticated security context in a server session; the session cookie is HttpOnly, and the CSRF cookie is readable by JavaScript so the API client can send its header. Item operations check membership in the owned trip. DTO and service validation cover required values, date order and cost rules, with stable error codes. Login limiting tracks failures per username and client IP in bounded, expiring caches (five username or 25 IP failures in 15 minutes); that state is per process and resets on restart. Protected API namespaces are listed explicitly, so a new API boundary needs deliberate review.",
            "The client includes responsive layouts, light and dark themes, focus styles and reduced-motion rules. Public templates are instantiated from date offsets.",
            "Frontend lint, 72 Vitest tests and the Vite build pass; 25 backend tests in nine classes pass on Java 21, mostly against mocked services rather than a full Spring security or database environment. The landing, library, public template and health endpoints of the deployed application responded as expected when checked; authenticated production workflows, accessibility conformance and field performance have not been tested end to end.",
          ),
        },
        {
          id: "result-current",
          type: "result",
          body: prose(
            "A complete full-stack application: account-based itineraries with grouping, filtering, yen cost summaries and printing, plus public templates and private reuse, in English and Japanese, light and dark, on desktop and mobile.",
            "It grew from a manually built capstone into a deployed application, with a React client and a Spring API in one container on Render, backed by PostgreSQL and Flyway migrations.",
          ),
        },
      ],
    },
    ja: japanTravelPlannerJapanese,
  },
} satisfies ProjectInput;
