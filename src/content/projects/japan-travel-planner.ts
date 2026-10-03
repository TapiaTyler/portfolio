import type { ProjectInput } from "@/lib/content/schema";

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
  alt: string,
  caption: string,
) => ({
  id,
  type: "image" as const,
  src: `/media/projects/japan-travel-planner/${file}`,
  width,
  height,
  purpose,
  alt: { en: alt },
  caption: { en: caption },
});

/** Discovery at 385c122; Tyler confirmed status, ownership and media use on Oct 3. */
export const japanTravelPlannerProject = {
  kind: "project",
  slug: "japan-travel-planner",
  year: 2026,
  status: "complete",
  type: ["Full-stack web application", "Travel planning"],
  roles: [
    "Product direction",
    "Architecture direction",
    "Implementation",
    "Revision review",
  ],
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
  publication: { status: "draft", featured: false, priority: 1 },
  links: {
    live: "https://japan-travel-planner-production.up.railway.app/",
    repository: "https://github.com/TapiaTyler/japan-travel-planner",
  },
  translationStatus: { ja: "none" },
  contribution: {
    productDirection: "primary",
    architecture: "primary",
    implementation: "mixed",
    review:
      "The original school-project application was completed manually without AI. Later enhancements used AI assistance, with revisions, decisions and architecture directed and reviewed throughout the work.",
    testing:
      "Frontend lint, 72 frontend tests, 25 backend unit tests and the frontend build passed at revision 385c122. Historical CI at that revision also succeeded. Anonymous public pages and template reads were checked; authenticated production workflows and deployed security settings remain unverified.",
  },
  previewMediaId: "media-itinerary-desktop",
  media: [
    image(
      "media-landing-desktop",
      "landing-desktop.png",
      1259,
      748,
      "overview",
      "Japan Travel Planner landing page with a sample Tokyo and Kyoto trip preview and planning entry points.",
      "The public landing page presents a sample trip and entry points for planning and template browsing. Repository screenshot with demo data; exact capture date was not recorded.",
    ),
    image(
      "media-itinerary-desktop",
      "itinerary-desktop.png",
      1265,
      1179,
      "detail",
      "Desktop Tokyo and Kyoto itinerary with date groups, search, map links and a yen cost summary.",
      "A desktop itinerary brings date grouping, filtering, print controls and cost status together. Fictional trip data illustrates the planning workflow.",
    ),
    image(
      "media-itinerary-mobile-dark",
      "itinerary-mobile-dark.png",
      534,
      1263,
      "mobile",
      "Narrow dark-theme itinerary with search, print controls, date tabs and the cost summary above the trip items.",
      "The itinerary in a narrow dark-theme view using demo data. This is a responsive-state screenshot, not a device-performance test or an earlier version.",
    ),
    image(
      "media-library-ja",
      "trip-library-japanese.png",
      1270,
      715,
      "detail",
      "Trip Library with Japanese interface labels and three curated public-template cards.",
      "Japanese interface resources and curated templates share the same library workflow. The image demonstrates implemented localization; translation quality was not independently reviewed.",
    ),
  ],
  codeSnippets: [
    {
      id: "snippet-filter-pipeline",
      language: "javascript",
      title: { en: "Combining text and structured itinerary filters" },
      source:
        'export function filterItineraryItems(items, query, filters) {\n    const normalizedQuery = normalize(query.trim());\n\n    return items.filter((item) => {\n        if (!matchesSearch(item, normalizedQuery)) {\n            return false;\n        }\n\n        if (filters.dateFrom && (!item.date || item.date < filters.dateFrom)) {\n            return false;\n        }\n\n        if (filters.dateTo && (!item.date || item.date > filters.dateTo)) {\n            return false;\n        }\n\n        if (\n            filters.locations.length > 0 &&\n            !getItemLocations(item).some(\n                (location) => filters.locations.includes(location)\n            )\n        ) {\n            return false;\n        }\n\n        if (\n            filters.itemTypes.length > 0 &&\n            !filters.itemTypes.includes(item.itemType)\n        ) {\n            return false;\n        }\n\n        const costStatus = item.costStatus || "UNKNOWN";\n\n        if (\n            filters.costStatuses.length > 0 &&\n            item.cost !== null &&\n            !filters.costStatuses.includes(costStatus)\n        ) {\n            return false;\n        }\n\n        if (filters.minCost !== "") {\n            if (item.cost === null || Number(item.cost) < Number(filters.minCost)) {\n                return false;\n            }\n        }\n\n        if (filters.maxCost !== "") {\n            if (item.cost === null || Number(item.cost) > Number(filters.maxCost)) {\n                return false;\n            }\n        }\n\n        if (\n            filters.transportationTypes.length > 0 &&\n            item.itemType === "Transportation" &&\n            !filters.transportationTypes.includes(item.transportationType)\n        ) {\n            return false;\n        }\n\n        return true;\n    });\n}',
    },
  ],
  diagrams: [
    {
      id: "diagram-system-flow",
      title: { en: "Request, storage and delivery boundaries" },
      accessibleSummary: {
        en: "The browser loads the React interface and sends authenticated requests to Spring. Services enforce ownership before reading or writing trips and templates through JPA repositories in PostgreSQL. Flyway manages database changes; a Docker build packages the client into Spring's static resources.",
      },
      nodes: [
        { id: "browser", label: { en: "Browser / React interface" } },
        { id: "api", label: { en: "Spring controllers and security" } },
        { id: "services", label: { en: "Trip, item and template services" } },
        { id: "repositories", label: { en: "Spring Data JPA repositories" } },
        { id: "database", label: { en: "PostgreSQL" } },
        { id: "flyway", label: { en: "Flyway migrations" } },
        { id: "docker", label: { en: "Docker build" } },
        { id: "static", label: { en: "Client files served by Spring" } },
      ],
      edges: [
        {
          from: "browser",
          to: "api",
          label: { en: "Session and CSRF headers" },
        },
        { from: "api", to: "services", label: { en: "Validated operations" } },
        {
          from: "services",
          to: "repositories",
          label: { en: "Ownership checks" },
        },
        {
          from: "repositories",
          to: "database",
          label: { en: "Read and write" },
        },
        { from: "flyway", to: "database", label: { en: "Schema migrations" } },
        { from: "docker", to: "static", label: { en: "Build and package" } },
        { from: "static", to: "browser", label: { en: "Deliver interface" } },
      ],
    },
    {
      id: "diagram-security-boundaries",
      title: { en: "Account and mutation security boundaries" },
      accessibleSummary: {
        en: "The client obtains a CSRF token before cookie-bearing mutations. Spring checks authentication and CSRF. Login verifies credentials and limits failures; services bind private resources to the authenticated user before persistence. Public templates have a separate anonymous read path.",
      },
      nodes: [
        { id: "client", label: { en: "React API client" } },
        { id: "csrf", label: { en: "Public CSRF initialization endpoint" } },
        {
          id: "filters",
          label: { en: "Spring authentication and CSRF route checks" },
        },
        {
          id: "login",
          label: { en: "Credential verification and login counters" },
        },
        { id: "session", label: { en: "Server HTTP session" } },
        {
          id: "owner",
          label: {
            en: "Services using authenticated username and item membership",
          },
        },
        { id: "store", label: { en: "JPA repositories / PostgreSQL" } },
        { id: "public", label: { en: "Anonymous curated-template reads" } },
      ],
      edges: [
        {
          from: "client",
          to: "csrf",
          label: { en: "GET token and header name" },
        },
        {
          from: "csrf",
          to: "client",
          label: { en: "token response and CSRF cookie" },
        },
        {
          from: "client",
          to: "filters",
          label: { en: "mutation with token header and cookies" },
        },
        {
          from: "filters",
          to: "login",
          label: { en: "login route; CSRF still applies" },
        },
        {
          from: "login",
          to: "session",
          label: { en: "store authenticated security context" },
        },
        {
          from: "session",
          to: "filters",
          label: { en: "authenticated identity on subsequent requests" },
        },
        { from: "filters", to: "owner", label: { en: "protected operation" } },
        {
          from: "owner",
          to: "store",
          label: { en: "owned resource lookup before mutation" },
        },
        { from: "client", to: "public", label: { en: "public GET templates" } },
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
          "Completed full-stack application deployed on Railway, with account-based trip editing, reusable plans, printable itineraries and English/Japanese interface support.",
      },
      blocks: [
        {
          id: "intro-product",
          type: "intro",
          heading: "Keep a trip's working details together",
          body: prose(
            "Trips combine activities, lodging and transportation in an account-based itinerary. Date and location grouping, search, cost summaries and print output offer several ways to work with the same planning data.",
            "The project focuses on planning travel within Japan. Costs use Japanese yen, while map shortcuts open an external map application rather than an embedded map service.",
          ),
        },
        {
          id: "media-landing-support",
          type: "media",
          mediaId: "media-landing-desktop",
          supportsBlockId: "intro-product",
        },
        {
          id: "origin-school",
          type: "intro",
          heading: "From a capstone to a broader application",
          body: prose(
            "The original WGU software engineering capstone is preserved at the capstone-v1.0 tag, pointing to revision 23a4dd6 from September 1, 2026. It already included authentication and CSRF protection. Later iterations added filtering, mobile and dark-theme refinements, localization, reusable planning content, login limiting and deployment tooling.",
            "The original school-project application was completed manually without AI. Subsequent enhancements used AI assistance while retaining direct control over revisions, decisions and architecture.",
          ),
        },
        {
          id: "problem-planning",
          type: "problem",
          heading: "Organize plans without losing their context",
          body: prose(
            "Activities, accommodation and transport have different details, but need to remain part of the same trip. The implemented model keeps those item types together while allowing travelers to group, filter, duplicate and reuse their plans.",
          ),
        },
        {
          id: "technical-itinerary",
          type: "technical",
          title: "Filter the working itinerary and its print output",
          summary:
            "Text search and structured filters narrow the itinerary by date, location, item type, cost and transport mode. Print output uses the visible filtered source.",
          codeSnippetIds: ["snippet-filter-pipeline"],
          body: prose(
            "The client combines the search query and structured conditions in filterItineraryItems. Cost summaries and print options operate on the chosen itinerary view, so the output reflects the work currently being reviewed.",
            "A print-component test checks this visible-source behavior. Filtering and cost calculations run on the client, alongside the itinerary view.",
          ),
        },
        {
          id: "media-itinerary-support",
          type: "media",
          mediaId: "media-itinerary-desktop",
          supportsBlockId: "technical-itinerary",
        },
        {
          id: "decision-reuse",
          type: "decision",
          title: "Reuse a whole plan or an individual item",
          decision: prose(
            "Public trip templates can be browsed without signing in. Instantiating a template requires an account, while private templates and saved itinerary items support personal reuse.",
          ),
          tradeoffs: prose(
            "Template dates are instantiated from offsets. Public template content and user-entered itinerary content have different ownership and localization rules.",
          ),
        },
        {
          id: "decision-responsive",
          type: "decision",
          title: "Retain the planning workflow on narrow screens",
          decision: prose(
            "The client includes responsive layouts, light and dark theme preferences, focus styles and reduced-motion rules.",
          ),
          tradeoffs: prose(
            "Responsive and reduced-motion behavior are implemented. A comprehensive device/browser matrix and accessibility conformance review remain verification work.",
          ),
        },
        {
          id: "media-mobile-support",
          type: "media",
          mediaId: "media-itinerary-mobile-dark",
          supportsBlockId: "decision-responsive",
        },
        {
          id: "architecture-system",
          type: "architecture",
          title: "Keep account boundaries in the service layer",
          diagramId: "diagram-system-flow",
          explanation: prose(
            "The React client sends session-based requests to Spring controllers. Validated operations pass through services and account-scoped repository access before reaching PostgreSQL. Flyway versions database changes.",
            "The implementation includes CSRF protection, BCrypt password hashing and login limiting. Login-limit state is held per process, which limits its scope to the running instance.",
          ),
        },
        {
          id: "technical-security",
          type: "technical",
          title: "Protect account-owned plans across request boundaries",
          summary:
            "Authentication identifies the user, server-side ownership checks bind plans to that user, CSRF tokens protect cookie-authenticated mutations, and login limiting constrains repeated failures.",
          body: prose(
            "Spring Security permits anonymous template reads while requiring authentication for account, trip, template mutation and saved-item operations. Login stores the authenticated security context in a server session; logout clears the current login. Private-resource services use the authenticated username rather than an owner value supplied by the client, and item operations check membership in the owned trip.",
            "The API client obtains a CSRF token and its header name before sending cookie-bearing mutation requests. Spring validates that token at the request boundary. The CSRF cookie is readable by JavaScript for this exchange; the session cookie is configured HttpOnly. Password registration and changes use the configured BCrypt encoder.",
            "DTO and service validation cover required values, trip date order, item dates and cost rules before persistence. Controlled exception responses supply stable field/domain codes. These checks complement authentication: an authenticated operation still needs valid input and permission to access its target resource.",
            "Login limiting tracks failures by normalized username and client IP in bounded, expiring caches. Defaults allow five username failures or 25 IP failures within 15 minutes. That state is local to a process and resets on restart or eviction; the admission sequence is not atomic across concurrent requests. Proxy handling also affects which client address is counted.",
            "Existing mocked service tests reject another user's private template and saved item, invalid trip/item dates, and login attempts above selected thresholds. A frontend test checks CSRF headers and credentials for template instantiation. These tests provide evidence for specific boundaries without proving the full HTTP security flow.",
            "The custom login path does not explicitly establish session-ID or CSRF-token rotation. Filter-chain tests for unauthenticated requests and missing or invalid CSRF remain absent, and deployed cookie/proxy settings have not been inspected. Protected API namespaces are explicitly listed; the fallback permits other routes, so new API boundaries need deliberate review. This is implementation and test evidence, not a completed security audit.",
          ),
        },
        {
          id: "architecture-security",
          type: "architecture",
          title: "Follow identity and mutation checks to persistence",
          diagramId: "diagram-security-boundaries",
          explanation: prose(
            "CSRF initialization, session authentication and private-resource ownership serve different purposes. The diagram separates those boundaries from anonymous template browsing and shows where the client, request filters and services participate.",
          ),
        },
        {
          id: "decision-delivery",
          type: "decision",
          title: "Package the client and API under one origin",
          decision: prose(
            "The Docker build compiles the frontend into Spring's static resources and packages the application in one non-root JVM container.",
          ),
          rationale: prose(
            "The documented architecture uses a single origin for the interface and API, simplifying the browser's session-cookie and CSRF integration.",
          ),
          tradeoffs: prose(
            "Frontend and server releases are coupled. The application is deployed on Railway's free hosting with a Railway-provided domain and no custom domain.",
          ),
        },
        {
          id: "decision-localization",
          type: "decision",
          title: "Separate interface translation from personal trip content",
          decision: prose(
            "Interface resources and curated public templates support English and Japanese. User-entered content remains in the language in which it was written.",
          ),
          tradeoffs: prose(
            "Localization support is implemented; translation quality and completeness were not independently reviewed. The portfolio case study itself currently has English source content only.",
          ),
        },
        {
          id: "media-localization-support",
          type: "media",
          mediaId: "media-library-ja",
          supportsBlockId: "decision-localization",
        },
        {
          id: "technical-quality",
          type: "technical",
          title: "Verify behavior at the appropriate boundary",
          summary:
            "At revision 385c122, 72 frontend tests and 25 backend unit tests passed. Anonymous public rendering and template reads were checked separately from authenticated workflows.",
          body: prose(
            "Frontend lint, the Vitest suite and the Vite build passed during the October 3, 2026 source review. The follow-up ran the backend suite with an existing Java 21 environment: 25 tests in nine classes passed with no failures, errors or skips. Those backend checks primarily use mocked services and handlers rather than a full Spring security or database integration environment.",
            "Historical CI at the same source revision reports successful backend tests and frontend lint, tests and build. Anonymous checks returned the landing and library pages, three public templates containing 11 items, and a health response of UP. Landing and library content also rendered in a fresh browser profile.",
            "These are recorded source-project checks. Authenticated production workflows, the deployed revision, operations, accessibility conformance and field performance were not established by them. Test provenance and execution conditions are retained in the project review documentation.",
          ),
        },
        {
          id: "result-current",
          type: "result",
          body: prose(
            "The completed application brings activities, lodging and transportation into an account-based itinerary. Plans can be grouped and filtered, reviewed with yen cost summaries, and printed from the selected view.",
            "Public templates, private reusable trips and saved items extend the workflow beyond creating each itinerary from scratch. Responsive layouts, light and dark themes, and English/Japanese interface resources provide different ways to use the same planning model; personal trip content remains in its original language.",
            "The project progressed from a manually implemented capstone to a deployed full-stack application. A React client and Spring API share one deployable container, with PostgreSQL persistence and Flyway migrations supporting the planning data.",
          ),
        },
      ],
    },
  },
} satisfies ProjectInput;
