import type { ProjectInput } from "@/lib/content/schema";
import type { RichText } from "@/lib/content/text";

const paragraph = (text: string): RichText => [
  { type: "paragraph", content: [{ type: "text", text }] },
];

// These are invented test records. They describe no real project or personal outcome.
export const fixtureProjects = [
  {
    kind: "fixture",
    slug: "fixture-minimal",
    status: "prototype",
    publication: { status: "published", featured: false },
    locale: { en: { title: "Fixture: Minimal" } },
  },
  {
    kind: "fixture",
    slug: "fixture-system",
    year: 2026,
    status: "prototype",
    type: ["Development fixture"],
    technologyIds: ["typescript"],
    capabilityIds: ["system-architecture"],
    publication: { status: "published", featured: true, priority: 1 },
    diagrams: [
      {
        id: "flow",
        title: { en: "Fixture data flow" },
        accessibleSummary: {
          en: "Input flows through validation to output. This is a development fixture.",
        },
        nodes: [
          { id: "input", label: { en: "Input" } },
          { id: "validation", label: { en: "Validation" } },
          { id: "output", label: { en: "Output" } },
        ],
        edges: [
          { from: "input", to: "validation" },
          { from: "validation", to: "output" },
        ],
      },
    ],
    codeSnippets: [
      {
        id: "example",
        language: "typescript",
        source: `// Synthetic example for disclosure and code-layout review.
type FixtureInput = {
  name: string;
  enabled?: boolean;
};

type FixtureResult =
  | { ok: true; value: FixtureInput }
  | { ok: false; reason: string };

export function validateFixture(input: FixtureInput): FixtureResult {
  const name = input.name.trim();

  if (name.length === 0) {
    return { ok: false, reason: "A fixture name is required." };
  }

  return {
    ok: true,
    value: { name, enabled: input.enabled ?? false },
  };
}`,
      },
    ],
    locale: {
      en: {
        title:
          "Fixture: A system record with a deliberately long title for composition testing",
        summary:
          "A synthetic backend-style record with architecture and technical detail, but no image.",
        blocks: [
          {
            id: "context",
            type: "intro",
            heading: "Development example",
            body: paragraph(
              "This example exists only to verify rendering and validation.",
            ),
          },
          {
            id: "problem",
            type: "problem",
            body: paragraph(
              "Sparse records must remain valid when images and optional metadata are absent.",
            ),
          },
          {
            id: "goals",
            type: "goals",
            items: ["Verify shared content behavior."],
          },
          {
            id: "limits",
            type: "constraints",
            items: [{ title: "Synthetic data only" }],
          },
          {
            id: "decision",
            type: "decision",
            title: "Fixture decision",
            decision: paragraph("Use a no-image record for this test."),
          },
          { id: "architecture", type: "architecture", diagramId: "flow" },
          {
            id: "technical",
            type: "technical",
            title: "Fixture code",
            summary:
              "A multiline synthetic code sample for disclosure and layout review.",
            codeSnippetIds: ["example"],
          },
          {
            id: "result",
            type: "result",
            body: paragraph(
              "This is a test record, not an achieved project result.",
            ),
          },
        ],
      },
    },
  },
  {
    kind: "fixture",
    slug: "fixture-visual",
    status: "prototype",
    publication: { status: "published", featured: false, priority: 2 },
    technologyIds: ["react"],
    capabilityIds: ["frontend-development"],
    media: [
      {
        id: "wide",
        type: "image",
        src: "/media/fixtures/wide.svg",
        width: 1200,
        height: 400,
        purpose: "detail",
        alt: { en: "A wide 1200 by 400 development fixture." },
      },
      {
        id: "portrait",
        type: "image",
        src: "/media/fixtures/portrait.svg",
        width: 400,
        height: 600,
        purpose: "detail",
        alt: { en: "A portrait 400 by 600 development fixture." },
      },
      {
        id: "reference",
        type: "image",
        src: "/media/fixtures/reference.svg",
        width: 800,
        height: 500,
        purpose: "overview",
        alt: { en: "A labeled development fixture with an 800 by 500 frame." },
        caption: { en: "Synthetic media fixture / 800 × 500" },
      },
    ],
    previewMediaId: "reference",
    locale: {
      en: {
        title: "Fixture: Visual",
        summary: "A synthetic image-bearing record for media-reference checks.",
        blocks: [
          { id: "image", type: "media", mediaId: "reference" },
          {
            id: "sequence",
            type: "gallery",
            mediaIds: ["reference", "wide", "portrait"],
            relationship: "details",
          },
          {
            id: "challenge",
            type: "challenge",
            title: "Fixture challenge",
            problem: paragraph(
              "This is synthetic narrative for a semantic block test.",
            ),
          },
        ],
      },
    },
  },
  {
    kind: "fixture",
    slug: "fixture-draft",
    status: "planned",
    publication: { status: "draft", featured: false },
    locale: { en: { title: "Fixture: Draft" } },
  },
  {
    kind: "fixture",
    slug: "fixture-hidden",
    status: "archived",
    publication: { status: "hidden", featured: false },
    locale: { en: { title: "Fixture: Hidden" } },
  },
] satisfies ProjectInput[];
