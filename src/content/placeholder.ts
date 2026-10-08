/** Provisional English sources with optional reviewed Japanese fields. */
import { interfaceMessages } from "./interface";
import type { HomepageContent } from "@/components/semantic/homepage";
import { identity } from "./identity";
export const homeHero = {
  name: identity.name,
  label: { en: "Portfolio Preview" },
  title: { en: "Software Engineer" },
  emphasis: { en: "& Web Developer" },
  description: {
    en: "This portfolio is being built. Project stories and final copy will be added after content review.",
  },
  link: { label: { en: "Explore Work" }, destination: "/work" },
};

export const homepageContent: HomepageContent = {
  hero: homeHero,
  work: {
    title: { en: "Selected Work" },
    linkLabel: { en: "View All Work" },
    emptyText: {
      en: "Project stories are being prepared. A selection of work will appear here soon.",
    },
  },
  capabilities: {
    title: { en: "Areas of Practice" },
    lead: { en: "Interfaces, applications, and the systems behind them." },
    items: [
      {
        title: { en: "Design" },
        description: {
          en: "Making complex things clear, from information structure to the details of an interface.",
        },
      },
      {
        title: { en: "Engineering" },
        description: {
          en: "Turning ideas into useful software with attention to structure, behavior, and maintainability.",
        },
      },
      {
        title: { en: "Systems" },
        description: {
          en: "Connecting the parts into a coherent whole, with room to grow and adapt.",
        },
      },
    ],
  },
  about: {
    label: { en: `About / ${identity.name}` },
    title: { en: "From web design to full-stack engineering." },
    paragraphs: [
      {
        en: "I'm a software engineer and web developer based in Hawaii, with more than a decade around the web: from digital media and web design to full-stack applications and software architecture.",
      },
      {
        en: "I'm preparing to continue my software engineering career in Japan.",
      },
    ],
    linkLabel: { en: "More About Me" },
  },
  lab: {
    title: { en: "Lab & Explorations" },
    description: {
      en: "Experiments, prototypes, and studies outside the main projects.",
    },
    emptyText: { en: "New studies will appear here." },
    linkLabel: { en: "Explore the Lab" },
  },
  contact: {
    label: { en: "Start a Conversation" },
    title: {
      en: "Open to software engineering and web development roles in Japan.",
    },
    description: { en: "For roles, projects, or questions about the work." },
    linkLabel: { en: "Get in Touch" },
  },
};

export const navigation = [
  { href: "/work", label: interfaceMessages.Work },
  { href: "/about", label: interfaceMessages.About },
  { href: "/lab", label: interfaceMessages.Lab },
  { href: "/contact", label: interfaceMessages.Contact },
] as const;

export const placeholderPages = {
  work: {
    title: { en: "Work" },
    description: {
      en: "Web applications, content systems, and full-stack projects, each with a case study.",
    },
  },
  about: {
    title: { en: "About" },
    description: {
      en: "Software engineer and web developer based in Hawaii, preparing to continue my career in Japan.",
    },
  },
  lab: {
    title: { en: "Lab" },
    description: {
      en: "Experiments and small studies will appear here when their details are ready.",
    },
  },
  contact: {
    title: { en: "Contact" },
    description: {
      en: "Email and professional profiles, with résumé and CV files to follow.",
    },
  },
} as const;
