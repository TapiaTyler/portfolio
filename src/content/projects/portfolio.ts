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
  publication: { status: "published", featured: true, priority: 0 },
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
      "chronicle-before-mobile",
      "chronicle-before-mobile.png",
      "First Chronicle homepage on a portrait phone: a hero, an empty boxed Selected Work panel and collapsed sections stacked down the page.",
      "Before, portrait phone: the same build as a stacked page of boxes, captured October 3 before any project was published.",
      390,
      844,
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
      "chronicle-portrait-home",
      "chronicle-portrait-home.png",
      "Chronicle homepage on a portrait phone with a compact hero and a full-width project card in a horizontal strip.",
      "After, portrait phone: the same horizontal strip adapted to portrait, with a menu button in place of the header links.",
      390,
      844,
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
        en: "Header navigation and browser Back in the original three modes, followed by a Digital synthetic project card opening into its detail view and contracting on Back.",
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
            "The site needs to communicate both design judgment and software-engineering ability. A single conventional portfolio layout would show only one way of organizing that work.",
            "The initial requirement was to keep one factual source while offering three complete reading experiences. Chronicle extends that system with a fourth composition. Changing modes should alter hierarchy, grouping, density and interaction—not project availability, URLs or meaning.",
          ),
        },
        {
          id: "architecture",
          type: "architecture",
          diagramId: "presentation-pipeline",
          explanation: prose(
            "Project metadata, media references and narrative blocks live in a typed content record. Validation checks publication rules, asset references and translation declarations before rendering.",
            "Shared semantic components express meaning. Compositions can introduce summaries or groupings while preserving the canonical narrative sequence. Tokens and motion remain separate presentation layers. A new project does not require a separate copy of its content for each mode.",
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
            "Chronicle presents the portfolio as a touch-first, landscape mobile-game screen: horizontal project selection, contained reading and art-directed frames, built from the same content records.",
            "Navigation changes too: Editorial follows the text with an ink rule; Engineer uses a square beside the label; Digital separates its slash prefix from a glowing label-width rule; Chronicle moves a crystal marker along a gold rail.",
          ),
          tradeoffs: prose(
            "Separate compositions require more responsive and accessibility review than a token-only switch. Shared content, semantic blocks and isolated theme scopes keep those differences maintainable.",
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
          id: "continuity",
          type: "decision",
          title: "Morph the composition without duplicating the content",
          context: prose(
            "Replacing the page abruptly made the presentation switch feel incomplete. A continuous transition needed to bridge genuinely different layouts.",
          ),
          decision: prose(
            "The server selects the composition using one validated preference cookie. Around that commit, the browser matches visible semantic modules by temporary identities, then moves and resizes their snapshots into the next layout.",
            "Geometry follows the destination: 560ms for Editorial, 360ms for Engineer, 680ms for Digital and 620ms for Chronicle. A shorter 180ms content swap changes typography and surfaces without leaving doubled text on screen. A reader's section and control focus are preserved where possible.",
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
            "Repeated content turns looked like blinking, so blank sheets now carry the depth. The top-bound flip reached its final front-side rotation after several rounds of visual feedback.",
            "Engineer swaps records over 240ms with a cyan scan rule. Digital expands a selected project card into its detail view over 720ms, contracts back to a matching card over 560ms, and uses spatial opening for other links. Chronicle slides chapters forward or back by direction; an opened card's frame grows into the case-study banner, which unfurls like a scroll, and Back folds it into the matching card. Theme changes cancel route effects.",
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
          ),
        },
        {
          id: "disclosure-evidence",
          type: "media",
          mediaId: "disclosure-interactions",
          supportsBlockId: "microinteractions",
        },
        {
          id: "gallery-iteration",
          type: "gallery",
          mediaIds: ["gallery-before", "gallery-after"],
          relationship: "comparison",
        },
        {
          id: "chronicle",
          type: "challenge",
          title: "Rebuild Chronicle as a touch-first game screen",
          problem: prose(
            "The first Chronicle build was AI-assisted from three reference images. It matched their palette and scenery but read as a conventional webpage: stacked boxed panels, collapsed sections and a vertical case study.",
            "The intent was different: a landscape mobile-game interface you hold and touch, that must also work in portrait.",
          ),
          response: prose(
            "Directed review rebuilt the composition rather than its colors. Each page is now a screen: the shell fits the viewport, projects are chosen from a snapping horizontal strip with dots and arrows, and case studies open into a lit chapter rail beside contained reading. Landscape phones get their own layouts, with identity beside the content instead of a portrait stack.",
            "Touch became the rule. Controls are at least 44px, the whole card is the tap target, and a first tap selects and arms a card while a second opens it; a swipe never opens a card by accident. Menus and dropdowns close when focus leaves them. Small responses complete the feel: cards are dealt in, a light sweeps the selected frame, images open through a crystal shape and glass buttons gleam when pressed.",
          ),
          result: prose(
            "The same project records now read as a game screen on desktop, landscape and portrait phones. Every response has a reduced-motion state, and the content, URLs and native links are unchanged.",
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
          id: "chronicle-handheld",
          type: "gallery",
          mediaIds: [
            "chronicle-before-mobile",
            "chronicle-landscape-home",
            "chronicle-portrait-home",
          ],
          relationship: "comparison",
        },
        {
          id: "chronicle-reading",
          type: "gallery",
          mediaIds: ["chronicle-case-study", "chronicle-case-study-landscape"],
          relationship: "sequence",
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
            "This excerpt from src/lib/content/registry.ts shows public lookup searching the already-filtered published inventory. The development preview reads authoring records only behind a development-environment guard. That let this project be reviewed with real content before it was published.",
          ),
          codeSnippetIds: ["public-lookup"],
        },
        {
          id: "state",
          type: "result",
          body: prose(
            "The implemented portfolio presents the same project content through four distinct compositions. Editorial, Engineer and Digital established the system; Chronicle extended it with a touch-first landscape composition without changing the content model. Theme-switch morphing preserves continuity between them, while page transitions and smaller interactions extend each mode's reading model.",
            "Shared content validation, publication controls and locale fallbacks support adding projects without creating separate narratives for each theme. Local browser and accessibility checks exercise the compositions, navigation and reduced-motion behavior.",
            "The presentation system is implemented and published; final homepage copy, Japanese translations, deployment and performance acceptance remain the next release steps.",
          ),
        },
      ],
    },
  },
} satisfies ProjectInput;
