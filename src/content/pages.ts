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
        title: "Project Collection",
        collection: true,
        emptyText: homepageContent.work.emptyText,
      },
    ],
    related: [
      { label: "About My Approach", destination: "/about" },
      { label: "Explore the Lab", destination: "/lab" },
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
        title: "Background & Experience",
        paragraphs: [
          homepageContent.about.paragraphs[1],
          placeholderPages.about.description,
        ],
      },
    ],
    related: [
      { label: "Explore the Work", destination: "/work" },
      { label: "Start a Conversation", destination: "/contact" },
    ],
  },
  lab: {
    id: "lab",
    ...placeholderPages.lab,
    lead: homepageContent.lab.description,
    sections: [
      {
        id: "lab-collection",
        title: "Studies & Explorations",
        collection: true,
        emptyText: homepageContent.lab.emptyText,
      },
    ],
    related: [
      { label: "Explore the Work", destination: "/work" },
      { label: "About My Approach", destination: "/about" },
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
        title: "Start a Conversation",
        paragraphs: [placeholderPages.contact.description],
      },
    ],
    related: [
      { label: "Explore the Work", destination: "/work" },
      { label: "About My Approach", destination: "/about" },
    ],
  },
} satisfies Record<string, SecondaryPageContent>;
