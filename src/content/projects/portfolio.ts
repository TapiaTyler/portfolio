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
  src: `/media/projects/portfolio/${file}`,
  width,
  height,
  purpose: "process" as const,
  alt: { en: alt },
  caption: { en: caption },
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
  translationStatus: { ja: "none" },
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
      "editorial-home.png",
      "Editorial homepage with publication typography and an asymmetric hero composition.",
      "Live local capture, October 2026. Editorial prioritizes narrative and whitespace; the homepage introduction is still placeholder copy.",
    ),
    image(
      "engineer-home",
      "engineer-home.png",
      "Engineer homepage with a system-oriented introduction and structured technical panels.",
      "The same homepage facts in Engineer: system records, monospace metadata and denser grouping.",
    ),
    image(
      "digital-home",
      "digital-home.png",
      "Digital homepage with a spatial hero, atmospheric grid and cyan interface accents.",
      "The same homepage facts in Digital: spatial composition, layered surfaces and expressive responses.",
    ),
    image(
      "chronicle-home",
      "chronicle-home.png",
      "Chronicle homepage on one landscape screen: scenic hero, a horizontal strip of framed project cards and a tab rail with the selected section.",
      "The same homepage facts in Chronicle: one landscape game screen with horizontal project selection and a tab rail.",
    ),
    image(
      "chronicle-before-home",
      "chronicle-before-home.png",
      "First Chronicle homepage: a scenic hero, an empty boxed Selected Work panel and a row of four collapsed sections, with the mode picker as a row of buttons.",
      "Before: the first AI-assisted Chronicle build on the public homepage, captured October 3, before any project was published. It followed the reference palette but used ordinary stacked boxes and disclosures.",
      1440,
      900,
    ),
    image(
      "chronicle-landscape-home",
      "chronicle-landscape-home.png",
      "Chronicle homepage on a landscape phone: identity in a left column beside one large project card, with dots and arrows above it.",
      "After, landscape phone (the primary handheld target): identity beside the project strip, one card plus a peek of the next, 44px dots and arrows.",
      844,
      390,
    ),
    image(
      "chronicle-case-study",
      "chronicle-case-study.png",
      "Chronicle case study: scenic project banner above a framed reading panel with a lit chapter rail on the left and evidence on the right.",
      "After: the case study opens like a dossier. The shell fits the screen, the chapter rail lights up to the current chapter and long text scrolls inside its own panel.",
    ),
    image(
      "chronicle-case-study-landscape",
      "chronicle-case-study-landscape.png",
      "Chronicle case study on a landscape phone with title and chapter rail in a left column beside a full-height reading panel.",
      "After, landscape phone: identity, Project at a Glance and the chapter rail share a column beside full-height reading.",
      844,
      390,
    ),
    {
      id: "chronicle-interactions",
      type: "video" as const,
      src: "/media/projects/portfolio/chronicle-interactions.webm",
      poster: "/media/projects/portfolio/chronicle-interactions.png",
      width: 1440,
      height: 1000,
      purpose: "process" as const,
      alt: {
        en: "Editorial morphing into Chronicle, then a project card selected with one tap and opened with a second, unfolding into its case-study banner; a chapter link, an image opening through a crystal shape, and browser Back folding the banner into its card.",
      },
      caption: {
        en: "Watch the morph into Chronicle, the first tap arming a card and the second opening it, the lit chapter rail, the crystal image opening and Back returning the banner to its card. Unedited local recording with capture-only phase labels and no audio; not a benchmark.",
      },
    },
    {
      id: "theme-morphing",
      type: "video",
      src: "/media/projects/portfolio/theme-morphing.webm",
      poster: "/media/projects/portfolio/editorial-home.png",
      width: 1440,
      height: 1000,
      purpose: "process",
      alt: {
        en: "Local recording of Editorial changing to Engineer, Digital and back to Editorial, with matching modules moving and resizing.",
      },
      caption: {
        en: "Live theme switching, recorded locally, including menu activation and server response time.",
      },
    },
    {
      id: "route-transitions",
      type: "video",
      src: "/media/projects/portfolio/route-transitions.webm",
      poster: "/media/projects/portfolio/route-transitions.png",
      width: 1440,
      height: 1000,
      purpose: "process",
      alt: {
        en: "Header navigation and browser Back in the original three modes, followed by a Digital synthetic project card opening into its detail view and contracting on Back.",
      },
      caption: {
        en: "Watch the top-bound Editorial page turn, Engineer scan rule and Digital spatial opening on header navigation and browser Back. The final selected-card expansion and contraction uses a labelled synthetic fixture. This unedited local recording includes loading and control activation; it is not a benchmark.",
      },
    },
  ],
  diagrams: [
    {
      id: "presentation-pipeline",
      title: { en: "One content source, several reading experiences" },
      accessibleSummary: {
        en: "Typed content is validated and localized, then shared semantic components supply meaning. A selected composition organizes it, theme tokens supply visual primitives, and progressive motion adds continuity without changing the facts.",
      },
      nodes: [
        { id: "content", label: { en: "Typed content and locale selection" } },
        { id: "semantics", label: { en: "Shared semantic components" } },
        {
          id: "composition",
          label: {
            en: "Editorial / Engineer / Digital / Chronicle composition",
          },
        },
        { id: "tokens", label: { en: "Theme tokens" } },
        { id: "motion", label: { en: "Progressive interaction and motion" } },
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
      title: { en: "Public lookup uses the filtered inventory" },
      source: `getProject: (slug: string): Project | undefined => {
  const project = published.find((project) => project.slug === slug);
  return project ? structuredClone(project) : undefined;
},`,
    },
  ],
  locale: {
    en: {
      title: "One Portfolio, Several Ways of Reading It",
      shortTitle: "Portfolio Presentation System",
      summary:
        "A shared content system interpreted through Editorial, Engineer, Digital and Chronicle compositions, with visual systems and motion adapted to each mode.",
      description:
        "A portfolio built around one content source and several ways of reading it. Shared semantic components support different compositions, visual systems and interactions without duplicating project narratives.",
      overview: {
        distinction:
          "One factual content source supports different compositions, with theme morphing, navigation transitions and interaction patterns tailored to each reading experience.",
        currentState:
          "Editorial, Engineer, Digital and Chronicle are implemented and published. Final homepage copy, deployment, Japanese translations and deployed performance verification remain pending.",
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
          heading: "Four complete ways to read one portfolio",
          body: prose(
            "Editorial, Engineer, Digital and Chronicle present the same projects, pages and case studies. Each mode has its own composition and navigation, while one typed content source supplies every fact, link and project.",
            "Switching modes morphs the page in place, and each mode has its own page transitions and small responses. Motion is always an enhancement: links, forms and disclosures work without it.",
          ),
        },
        {
          id: "compositions",
          type: "gallery",
          mediaIds: [
            "editorial-home",
            "engineer-home",
            "digital-home",
            "chronicle-home",
          ],
          relationship: "comparison",
        },
        {
          id: "composition",
          type: "decision",
          title: "Make modes different ways of reading",
          context: prose(
            "A palette and font switch alone would leave the same hierarchy and project grid in place.",
          ),
          decision: prose(
            "Editorial reads like a publication, with serif typography and narrative-led features. Engineer uses project records, metadata and a technical section overview. Digital uses spatial cards and layered media. Chronicle is a touch-first, landscape game screen with horizontal project selection.",
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
            "Directed review rebuilt the composition rather than its colors: a screen-sized shell, a snapping horizontal project strip, contained case-study reading and dedicated landscape-phone layouts. Touch became the rule: 44px controls, whole cards as targets, and a first tap that selects while a second opens.",
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
          mediaIds: [
            "chronicle-before-home",
            "chronicle-landscape-home",
            "chronicle-case-study",
          ],
          relationship: "comparison",
        },
        {
          id: "engineering-details",
          type: "technical",
          title: "Engineering details",
          summary:
            "Theme-specific page transitions and microinteractions, reduced-motion behavior, the publication boundary, and how the system is verified.",
          body: prose(
            "Theme morph geometry follows the destination: 560ms for Editorial, 360ms for Engineer, 680ms for Digital and 620ms for Chronicle, while text and surfaces swap in 180ms. A 1500ms capture timeout releases a slow snapshot; reduced motion, unsupported browsers and native forms switch immediately.",
            "Each mode has its own navigation model. Editorial turns pages: horizontal turns follow chapter order and depth, and header links swing a top-bound page down from the front over 600ms. Engineer swaps records with a scan rule over 240ms. Digital expands a selected card into its detail view and contracts it on Back. Chronicle slides chapters by direction and unfolds an opened card into its case-study banner. Theme changes cancel route effects.",
            "Microinteractions follow the same split: Editorial disclosures fold from their top edge and reverse on closing, Engineer gives stepped feedback and inspectable diagrams, Digital uses pointer lighting and a carousel that expands from the selected image, and Chronicle deals cards, sweeps the selected frame with light and opens images through a crystal shape. Touch gets press feedback without mouse tracking, and reduced motion keeps every state legible without animation.",
            "Publication is a content boundary: drafts are validated but excluded from the public inventory, including direct slug lookup, and development previews read authoring records only behind an environment guard.",
            "Schema and unit tests, Playwright browser checks and automated accessibility scans cover the compositions, navigation and reduced-motion behavior. They do not establish full WCAG conformance or deployed performance. English is the source language; /en and /ja routes and field-level fallback exist, and Japanese translation is pending.",
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
            "The same project content reads through four distinct compositions, connected by theme-switch morphing and extended by each mode's page transitions and small responses. Shared validation, publication controls and locale fallbacks let a new project join every mode without separate narratives.",
            "The presentation system is implemented and published; final homepage copy, Japanese translations, deployment and performance acceptance are the next release steps.",
          ),
        },
      ],
    },
  },
} satisfies ProjectInput;
