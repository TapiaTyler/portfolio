import type { ProjectInput } from "@/lib/content/schema";

const prose = (...paragraphs: string[]) =>
  paragraphs.map((text) => ({
    type: "paragraph" as const,
    content: [{ type: "text" as const, text }],
  }));

const image = (
  id: string,
  file: string,
  alt: string,
  caption: string,
  width = 1440,
  height = 1000,
) => ({
  id,
  type: "image" as const,
  src: `/media/projects/nihonest/${file}`,
  width,
  height,
  purpose: width < height ? ("mobile" as const) : ("detail" as const),
  alt: { en: alt },
  caption: { en: caption },
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
    repositoryVisibility: "private",
  },
  translationStatus: { ja: "none" },
  contribution: {
    productDirection: "primary",
    uiDirection: "primary",
    implementation: "ai-assisted",
    review:
      "Planning and documentation were developed with ChatGPT before implementation. Content direction, UI choices and implementation decisions were set and reviewed throughout. AI assisted research, implementation, translation and refactoring: Codex drafted article research and English copy, and Codex and Claude reviewed the implementation and articles.",
    testing:
      "Architecture checks across 677 production modules, TypeScript checking and 18 targeted tests pass. Browser-flow, database and performance testing are not yet part of the verification.",
  },
  previewMediaId: "explore-desktop",
  media: [
    image(
      "explore-desktop",
      "explore-desktop.png",
      "Search for juminhyo with result-kind controls and matches across groups, guides, and glossary terms.",
      "One search joins groups, guides, FAQs and glossary terms under a single query.",
    ),
    image(
      "journey-mobile",
      "journey-mobile.png",
      "Mobile Student journey showing the selected long-term study route and reading sequence.",
      "The student-status route selected on mobile. Route selection guides reading; it does not determine eligibility.",
      390,
      844,
    ),
    image(
      "journey-conditions-mobile",
      "journey-conditions-mobile.png",
      "A mobile journey phase marks working part-time as conditional with an applicability label.",
      "The same route keeps conditional steps and their Editorial Review label.",
      390,
      844,
    ),
    image(
      "local-guidance-desktop",
      "local-guidance-desktop.png",
      "Native prefecture and municipality selectors show a Shinjuku local supplement and its responsible body.",
      "Tokyo and Shinjuku selected. The local supplement is still marked Editorial Review.",
    ),
  ],
  diagrams: [
    {
      id: "architecture-content-boundaries",
      title: { en: "Nihonest content and state boundaries" },
      accessibleSummary: {
        en: "Repository content is validated before public rendering. Browser preferences remain local until an optional account syncs selected state through Supabase. The local CMS edits repository files but is not a public route.",
      },
      nodes: [
        {
          id: "canonical-content",
          label: { en: "English MDX and typed repository records" },
        },
        {
          id: "catalog-validation",
          label: { en: "Zod and cross-reference validation" },
        },
        { id: "search-index", label: { en: "In-memory search index" } },
        { id: "public-routes", label: { en: "Next.js public routes" } },
        {
          id: "translation-overlays",
          label: { en: "Revision-addressed Japanese overlays" },
        },
        {
          id: "browser-state",
          label: { en: "Anonymous browser preferences and progress" },
        },
        {
          id: "account-sync",
          label: { en: "Optional validated account sync" },
        },
        {
          id: "supabase-rls",
          label: { en: "Supabase owner-scoped tables and functions" },
        },
        { id: "local-cms", label: { en: "Loopback editorial CMS" } },
      ],
      edges: [
        {
          from: "canonical-content",
          to: "catalog-validation",
          label: { en: "parsed and checked" },
        },
        {
          from: "catalog-validation",
          to: "public-routes",
          label: { en: "renders" },
        },
        {
          from: "catalog-validation",
          to: "search-index",
          label: { en: "indexes" },
        },
        {
          from: "search-index",
          to: "public-routes",
          label: { en: "discovery results" },
        },
        {
          from: "translation-overlays",
          to: "public-routes",
          label: { en: "Japanese text with fallback" },
        },
        {
          from: "browser-state",
          to: "public-routes",
          label: { en: "anonymous personalization" },
        },
        {
          from: "browser-state",
          to: "account-sync",
          label: { en: "optional snapshot" },
        },
        {
          from: "account-sync",
          to: "supabase-rls",
          label: { en: "validated RPC" },
        },
        {
          from: "local-cms",
          to: "canonical-content",
          label: { en: "guarded local file edits" },
        },
      ],
    },
  ],
  codeSnippets: [
    {
      id: "journey-step-resolver",
      language: "typescript",
      title: { en: "Resolve one journey route into a reading sequence" },
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
  },
} satisfies ProjectInput;
