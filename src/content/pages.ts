import type { SecondaryPageContent } from "@/components/semantic/secondary-page";
import { homepageContent, homeHero, placeholderPages } from "./placeholder";
import { identity } from "./identity";

// Provisional English source shared by every composition; no unverified contact,
// biography, experiment or credential records are introduced by the page layouts.
export const pageContent = {
  work: {
    id: "work",
    ...placeholderPages.work,
    lead: "The work, and the thinking behind it.",
    sections: [
      {
        id: "work-collection",
        title: "Project collection",
        collection: true,
        emptyText: homepageContent.work.emptyText,
      },
    ],
    related: [
      { label: "About my approach", destination: "/about" },
      { label: "Explore the lab", destination: "/lab" },
    ],
  },
  about: {
    id: "about",
    title: "About",
    description: homepageContent.about.paragraphs[0],
    lead: homepageContent.about.title,
    sections: [
      {
        id: "profile",
        title: "Profile",
        fields: [
          { label: "Name", value: identity.name },
          {
            label: "Practice",
            value: `${homeHero.title} ${homeHero.emphasis}`,
          },
        ],
      },
      {
        id: "practice",
        title: homepageContent.capabilities.title,
        items: homepageContent.capabilities.items,
      },
      {
        id: "background",
        title: "Background & experience",
        paragraphs: [
          homepageContent.about.paragraphs[1],
          placeholderPages.about.description,
        ],
      },
    ],
    related: [
      { label: "Explore the work", destination: "/work" },
      { label: "Start a conversation", destination: "/contact" },
    ],
  },
  lab: {
    id: "lab",
    ...placeholderPages.lab,
    lead: homepageContent.lab.description,
    sections: [
      {
        id: "lab-collection",
        title: "Studies & explorations",
        collection: true,
        emptyText: homepageContent.lab.emptyText,
      },
    ],
    related: [
      { label: "Explore the work", destination: "/work" },
      { label: "About my approach", destination: "/about" },
    ],
  },
  contact: {
    id: "contact",
    title: "Contact",
    description: homepageContent.contact.description,
    lead: homepageContent.contact.title,
    sections: [
      {
        id: "contact-methods",
        title: "Start a conversation",
        paragraphs: [placeholderPages.contact.description],
      },
    ],
    related: [
      { label: "Explore the work", destination: "/work" },
      { label: "About my approach", destination: "/about" },
    ],
  },
} satisfies Record<string, SecondaryPageContent>;
