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
    lead: "Interfaces, applications, and the systems behind them.",
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
    title: "From web design to full-stack engineering.",
    paragraphs: [
      "I'm a software engineer and web developer based in Hawaii, with more than a decade around the web: from digital media and web design to full-stack applications and software architecture.",
      "I'm preparing to continue my software engineering career in Japan.",
    ],
    linkLabel: "More About Me",
  },
  lab: {
    title: "Lab & Explorations",
    description:
      "Experiments, prototypes, and studies outside the main projects.",
    emptyText: "New studies will appear here.",
    linkLabel: "Explore the Lab",
  },
  contact: {
    label: "Start a Conversation",
    title: "Open to software engineering and web development roles in Japan.",
    description: "For roles, projects, or questions about the work.",
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
      "Web applications, content systems, and full-stack projects, each with a case study.",
  },
  about: {
    title: "About",
    description:
      "Software engineer and web developer based in Hawaii, preparing to continue my career in Japan.",
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
