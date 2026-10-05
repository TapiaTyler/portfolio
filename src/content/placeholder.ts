/** Provisional English copy only. Replace after the content review. */
import type { HomepageContent } from "@/components/semantic/homepage";
import { identity } from "./identity";
export const homeHero = {
  name: identity.name,
  label: "Portfolio Preview",
  title: "Software Engineer",
  emphasis: "& Web Developer",
  description:
    "This portfolio is being built. Project stories and final copy will be added after content review.",
  link: { label: "Explore Work", destination: "/work" },
};

export const homepageContent: HomepageContent = {
  hero: homeHero,
  work: {
    title: "Selected Work",
    linkLabel: "View All Work",
    emptyText:
      "Project stories are being prepared. A selection of work will appear here soon.",
  },
  capabilities: {
    title: "Areas of Practice",
    lead: "Design, engineering and systems, considered together.",
    items: [
      {
        title: "Design",
        description:
          "Making complex things clear, from information structure to the details of an interface.",
      },
      {
        title: "Engineering",
        description:
          "Turning ideas into useful software with attention to structure, behavior, and maintainability.",
      },
      {
        title: "Systems",
        description:
          "Connecting the parts into a coherent whole, with room to grow and adapt.",
      },
    ],
  },
  about: {
    label: `About / ${identity.name}`,
    title: "A considered approach to making things.",
    paragraphs: [
      "A space for the thinking behind the work: the questions, the decisions, and the care that connects them.",
      "Professional background and the full story will follow after content review.",
    ],
    linkLabel: "More About Me",
  },
  lab: {
    title: "Lab & Explorations",
    description: "Smaller ideas, studies, and works in progress.",
    emptyText: "New studies will appear here.",
    linkLabel: "Explore the Lab",
  },
  contact: {
    label: "Start a Conversation",
    title: "Let’s build something meaningful.",
    description:
      "For conversations about thoughtful software and useful digital experiences.",
    linkLabel: "Get in Touch",
  },
};

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/lab", label: "Lab" },
  { href: "/contact", label: "Contact" },
] as const;

export const placeholderPages = {
  work: {
    title: "Work",
    description:
      "Project entries will appear here after their source repositories have been reviewed.",
  },
  about: {
    title: "About",
    description:
      "A reviewed professional background and résumé links will be added here.",
  },
  lab: {
    title: "Lab",
    description:
      "Experiments and small studies will appear here when their details are ready.",
  },
  contact: {
    title: "Contact",
    description: "Verified contact links will be added here.",
  },
} as const;
