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

/** Source-backed draft: keep unpublished until narrative, media and launch review. */
export const portfolioProject = {
  kind: "project",
  slug: "portfolio",
  year: 2026,
  status: "active",
  type: ["Portfolio website", "Presentation system"],
  roles: [
    "Product direction",
    "Architecture direction",
    "Design direction",
    "Interaction review",
  ],
  technologyIds: ["nextjs", "react", "typescript"],
  capabilityIds: [
    "product-ui-engineering",
    "system-architecture",
    "design-systems",
    "accessibility",
    "testing-quality",
  ],
  publication: { status: "draft", featured: false, priority: 0 },
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
      "Live local capture, October 2026. Editorial prioritizes narrative and whitespace; homepage copy is still placeholder content.",
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
        en: "Live theme switching, recorded locally. The recording includes menu activation and server response time; it is not a benchmark.",
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
        en: "Header navigation and browser Back in all three modes, followed by a Digital synthetic project card opening into its detail view and contracting on Back.",
      },
      caption: {
        en: "Watch the top-bound Editorial page turn, Engineer scan rule and Digital spatial opening on header navigation and browser Back. The final selected-card expansion and contraction uses a labelled synthetic fixture. This unedited local recording includes loading and control activation; it is not a benchmark.",
      },
    },
    {
      id: "disclosure-interactions",
      type: "video",
      src: "/media/projects/portfolio/disclosure-interactions.webm",
      poster: "/media/projects/portfolio/disclosure-interactions.png",
      width: 1440,
      height: 1000,
      purpose: "process",
      alt: {
        en: "The same portfolio technical disclosure opening and closing in Editorial, Engineer and Digital, including Editorial's reversed fold on closing.",
      },
      caption: {
        en: "Watch the same disclosure open and close in each mode: Editorial folds from its top edge and reverses on closing, Engineer gives a brief stepped response, and Digital uses a short spatial response. Recorded from this real local draft, with capture-only phase labels and no audio.",
      },
    },
    image(
      "navigation-before",
      "reconstruction-digital-navigation.png",
      "Reconstructed Digital header showing an active-link underline and a second moving rule below the whole link.",
      "Before, reconstructed: the active underline and moving rule compete, and the lower rule spans the slash prefix. CSS overrides recreate the issue on the current site; this is not an original historical screenshot.",
      1440,
      150,
    ),
    image(
      "navigation-after",
      "digital-navigation.png",
      "Digital header with one rule just below the active label and the slash prefix outside the underline.",
      "After, live capture: one marker sits close to the label, excluding the slash prefix. The 44px link target remains intact while only the visible rule becomes narrower.",
      1440,
      150,
    ),
    image(
      "gallery-before",
      "reconstruction-digital-gallery.png",
      "Reconstructed single-column Digital fixture gallery, with a full-width image and Enlarge image label.",
      "Before, reconstructed on synthetic fixtures: a full-width image dominates the gallery and Enlarge image promises a larger view. Cropped to the comparison panel height; not an original historical screenshot.",
      1280,
      1098,
    ),
    image(
      "gallery-after",
      "digital-gallery.png",
      "Current Digital fixture gallery with a smaller standard image and a paired wide and portrait row.",
      "After, live capture of the same synthetic fixtures: a bounded standard image and a paired wide/portrait row vary the rhythm. View image describes the carousel without promising magnification. These are test fixtures, not another portfolio project.",
      1280,
      1097,
    ),
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
          label: { en: "Editorial / Engineer / Digital composition" },
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
      title: "One portfolio, three ways of reading it",
      shortTitle: "Portfolio presentation system",
      summary:
        "A portfolio that reinterprets the same project content through Editorial, Engineer and Digital compositions, with motion that reinforces each mode.",
      description:
        "A portfolio built around one content source and three distinct ways of reading it. Shared semantic components support different compositions, visual systems and interactions without duplicating project narratives.",
      overview: {
        distinction:
          "One factual content source supports three different compositions, with theme morphing, navigation transitions and interaction patterns tailored to each reading experience.",
        currentState:
          "Three modes and their interaction systems are implemented. This case study is a draft; final content, deployment, Japanese translations and deployed performance verification remain pending.",
      },
      blocks: [
        {
          id: "intent",
          type: "problem",
          heading: "The portfolio is part of the work",
          body: prose(
            "The site needs to communicate both design judgment and software-engineering ability. A single conventional portfolio layout would show only one way of organizing that work.",
            "The requirement was to keep one factual source while offering three complete reading experiences. Changing modes should alter hierarchy, grouping, density and interaction—not project availability, URLs or meaning.",
          ),
        },
        {
          id: "architecture",
          type: "architecture",
          diagramId: "presentation-pipeline",
          explanation: prose(
            "Project metadata, media references and narrative blocks live in a typed content record. Validation checks publication rules, asset references and translation declarations before rendering.",
            "Shared semantic components express meaning. Compositions can introduce summaries or groupings while preserving the canonical narrative sequence. Tokens and motion remain separate presentation layers. A new project does not require three copies of its content.",
            "Work, About, Lab and Contact follow the same separation: one English page inventory supplies introductions, profile fields, areas of practice and continuation links. Each mode organizes those facts through a registered page composition, while public Work reads only the published project inventory.",
          ),
        },
        {
          id: "composition",
          type: "decision",
          title: "Make modes different ways of reading",
          context: prose(
            "A palette and font switch alone would leave the same hierarchy and project grid in place.",
          ),
          decision: prose(
            "Editorial uses publication rhythm, serif display typography and narrative-led project features. Engineer uses project records, metadata and a technical section overview. Digital uses spatial project cards, layered media and continuity between project index and detail.",
            "Navigation changes too: Editorial follows the text with an ink rule; Engineer uses a square beside the label; Digital separates its slash prefix from a glowing label-width rule. Language selection uses a pill in Editorial and Digital, and a moving square in Engineer.",
          ),
          tradeoffs: prose(
            "Separate compositions require more responsive and accessibility review than a token-only switch. Shared content, semantic blocks and isolated theme scopes keep those differences maintainable.",
          ),
        },
        {
          id: "compositions",
          type: "gallery",
          mediaIds: ["editorial-home", "engineer-home", "digital-home"],
          relationship: "comparison",
        },
        {
          id: "continuity",
          type: "decision",
          title: "Morph the composition without duplicating the content",
          context: prose(
            "Replacing the page abruptly made the presentation switch feel incomplete. A continuous transition needed to bridge genuinely different layouts.",
          ),
          decision: prose(
            "The server selects the composition using one validated preference cookie. Around that commit, the browser matches visible semantic modules by temporary identities, then moves and resizes their snapshots into the next layout.",
            "Geometry follows the destination: 560ms for Editorial, 360ms for Engineer and 680ms for Digital. A shorter 180ms content swap changes typography and surfaces without leaving doubled text on screen. A reader's section and control focus are preserved where possible.",
          ),
          rationale: prose(
            "Snapshot continuity bridges different server-rendered structures without adding another accessible content tree or a heavy animation runtime.",
          ),
          tradeoffs: prose(
            "This requires coordination with fonts, server responses, focus and interruption. A 1500ms capture timeout releases a slow snapshot; reduced motion, unsupported APIs and native forms retain an immediate usable switch.",
          ),
        },
        {
          id: "morphing-evidence",
          type: "media",
          mediaId: "theme-morphing",
          supportsBlockId: "continuity",
        },
        {
          id: "navigation-motion",
          type: "challenge",
          title: "Give navigation a theme-specific physical model",
          problem: prose(
            "The page transition needed to match each composition and remain usable on links, language changes and browser history.",
          ),
          response: prose(
            "Editorial content links use horizontal page turns derived from chapter order and route depth. Header and language links use a top-bound page that swings down from the front. Both use 600ms timing. Deeper horizontal navigation adds blank sheets 100ms apart, capped at three turns.",
            "Earlier repeated content turns looked like blinking. Blank sheet snapshots retained depth without fetching parent pages. The header stays live, and the whole Editorial snapshot layer is clipped beneath it. The top-bound flip was refined from a bottom hinge, through a shallow reveal, to a full front-side rotation after visual feedback.",
            "Engineer swaps records over 240ms with a cyan scan rule. Digital expands a selected project card into its detail view over 720ms, contracts back to a matching card over 560ms, and uses spatial opening for other links. Theme changes cancel route effects.",
          ),
          result: prose(
            "The navigation contract remains ordinary URLs and native links. Motion is an enhancement with reduced-motion, unsupported-browser, interruption and slow-response behavior.",
          ),
        },
        {
          id: "navigation-evidence",
          type: "media",
          mediaId: "route-transitions",
          supportsBlockId: "navigation-motion",
        },
        {
          id: "microinteractions",
          type: "technical",
          title: "Small responses carry the same design intent",
          summary:
            "Each theme has its own response vocabulary; essential content and controls remain available without motion.",
          body: prose(
            "Editorial images shift their crop and caption slightly on hover or focus. Long case studies show actual reading progress. Native technical disclosures unfold their grid height with a top-edge fold over 520ms, replay on every opening and reverse on closing; another activation can reverse a closing fold in place.",
            "Engineer uses brief record brightness feedback, stepped disclosure indicators, code copying with honest clipboard failure feedback, and diagram inspection based on actual node IDs and edge relationships. Pointer hover and keyboard focus inspect connections; activation pins a node and Escape clears it. Hover rails and capability borders were removed after review.",
            "Digital uses a restrained portal tilt, pointer-following card lighting, press feedback, image scaling, contextual Open labels and monochrome moving border glimmers. Touch gets press feedback without mouse tracking; reduced motion keeps static feedback.",
            "Its case-study images now use a split introduction, an offset standalone panel and mixed-width galleries. View image opens a deduplicated carousel, expanding from the selected frame. Closing contracts into the last viewed frame, scrolls it into view and returns focus. This replaced a full-width presentation where Enlarge image could make the image smaller.",
            "Double underlines were removed by measuring label geometry independently of the 44px link target. Digital's slash decoration stays outside the marker, and Engineer's square moves without shifting the labels. These are small changes, but they preserve both the theme's character and predictable controls.",
            "Engineer chapter navigation now resembles a directory, with the project slug as a folder, decorative file icons and neutral branch guides. Green current and hovered entries balance the cyan technical links. The mobile Menu control also varies: fine lines for Editorial, a bracketed stepped control for Engineer and staggered bars for Digital, all using one native disclosure.",
          ),
        },
        {
          id: "disclosure-evidence",
          type: "media",
          mediaId: "disclosure-interactions",
          supportsBlockId: "microinteractions",
        },
        {
          id: "navigation-iteration",
          type: "gallery",
          mediaIds: ["navigation-before", "navigation-after"],
          relationship: "comparison",
        },
        {
          id: "gallery-iteration",
          type: "gallery",
          mediaIds: ["gallery-before", "gallery-after"],
          relationship: "comparison",
        },
        {
          id: "quality",
          type: "constraints",
          items: [
            {
              title: "Motion remains optional",
              detail:
                "Native links, forms, disclosures and video controls; keyboard focus, touch operation and reduced-motion behavior are part of the implementation.",
            },
            {
              title: "Evidence before claims",
              detail:
                "Schema and browser tests, automated accessibility scans and local performance diagnostics support implementation review. They do not establish full WCAG conformance, deployed performance or business impact.",
            },
            {
              title: "Translation readiness without invented translations",
              detail:
                "English is the source; /en and /ja routes, translation depth and field-level fallback exist. Japanese narrative and interface translation remain pending.",
            },
            {
              title: "A bounded first release",
              detail:
                "No CMS, database, authentication, future modes or WebGL package is needed for the current portfolio.",
            },
          ],
        },
        {
          id: "publication-boundary",
          type: "technical",
          title: "Publication is a content boundary",
          summary:
            "A draft is validated but excluded from the public inventory, including direct slug lookup.",
          body: prose(
            "This excerpt from src/lib/content/registry.ts shows public lookup searching the already-filtered published inventory. The development preview reads authoring records only behind a development-environment guard. That allows this pilot to test real content without silently publishing it.",
          ),
          codeSnippetIds: ["public-lookup"],
        },
        {
          id: "state",
          type: "result",
          body: prose(
            "The implemented portfolio presents the same project content through three distinct compositions. Theme-switch morphing preserves continuity between them, while page transitions and smaller interactions extend each mode's reading model.",
            "Shared content validation, publication controls and locale fallbacks support adding projects without creating separate narratives for each theme. Local browser and accessibility checks exercise the compositions, navigation and reduced-motion behavior.",
            "The presentation system is implemented; final content, Japanese translations, deployment and performance acceptance with the completed project inventory remain the next release steps.",
          ),
        },
      ],
    },
  },
} satisfies ProjectInput;
