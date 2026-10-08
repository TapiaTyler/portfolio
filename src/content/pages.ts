import type { SecondaryPageContent } from "@/components/semantic/secondary-page";
import { homepageContent, placeholderPages } from "./placeholder";
import { contactMethods, contactDocuments } from "./contact";

// Provisional English source shared by every composition; no unverified contact,
// biography, experiment or credential records are introduced by the page layouts.
export const pageContent = {
  work: {
    id: "work",
    ...placeholderPages.work,
    lead: {
      en: "Each case study covers the problem, key decisions, and current state.",
    },
    sections: [
      {
        id: "work-collection",
        title: { en: "Project Collection" },
        collection: true,
        emptyText: homepageContent.work.emptyText,
      },
    ],
    related: [
      { label: { en: "About My Approach" }, destination: "/about" },
      { label: { en: "Explore the Lab" }, destination: "/lab" },
    ],
  },
  about: {
    id: "about",
    title: { en: "About" },
    description: placeholderPages.about.description,
    lead: homepageContent.about.title,
    // Narrative first (background, then how the work is done), facts after, Japan
    // last: the projects prove the skills; this page explains the path.
    sections: [
      {
        id: "background",
        title: { en: "Background" },
        paragraphs: [
          {
            en: "I'm Tyler Tetsuo Tapia, a software engineer and web developer based in Hawaii. My background combines software engineering with more than a decade of experience around the web, beginning with digital media and web design and developing into full-stack applications, frontend systems, and software architecture.",
          },
          {
            en: "I studied Digital Media Production at Leeward Community College and began working as a freelance web developer while completing that program. That early experience shaped how I approach software today: not only as code and infrastructure, but as something people have to understand, navigate, and use. I later expanded that foundation through a B.S. in Software Engineering at Western Governors University, with my recent work focusing on larger applications, structured content systems, backend services, localization, accessibility, testing, and maintainable architecture.",
          },
          {
            en: "I enjoy working across the boundary between interface and engineering. Some projects are visually and product focused; others are more concerned with backend systems, data flow, or reusable architecture. Across both, I care about understanding the problem first, making deliberate technical decisions, and building systems that remain clear and maintainable as they grow.",
          },
        ],
      },
      {
        id: "how-i-work",
        title: { en: "How I Work" },
        paragraphs: [
          {
            en: "My workflow makes extensive use of AI-assisted development for implementation, research, testing, and iteration. I treat those tools as part of an engineering process rather than a substitute for one: I define requirements and architecture, direct product and design decisions, review implementation, verify behavior, and remain responsible for the final result.",
          },
        ],
      },
      {
        id: "focus",
        title: { en: "Focus" },
        paragraphs: [
          {
            en: "Frontend & UI Engineering · Full-Stack Development · Web Applications · System Architecture · Localization & Accessibility",
          },
        ],
      },
      {
        id: "languages",
        title: { en: "Skills & Languages" },
        fields: [
          {
            label: { en: "Programming" },
            value: {
              en: "TypeScript, JavaScript, Java, Python, SQL, PHP (working knowledge)",
            },
          },
          { label: { en: "Web" }, value: { en: "HTML, CSS" } },
          {
            label: { en: "Frameworks" },
            value: { en: "Next.js, React, Spring Boot, Tailwind CSS, jQuery" },
          },
          {
            label: { en: "Tools" },
            value: {
              en: "PostgreSQL, Supabase, Docker, Git, Playwright, Vitest",
            },
          },
          {
            label: { en: "Editors & IDEs" },
            value: { en: "VS Code, IntelliJ IDEA, Android Studio" },
          },
          {
            label: { en: "Design" },
            value: {
              en: "Adobe Photoshop, Illustrator, XD, InDesign, Lightroom, Premiere Pro",
            },
          },
          { label: { en: "Japanese" }, value: { en: "JLPT N2" } },
          { label: { en: "English" }, value: { en: "Native" } },
        ],
      },
      {
        id: "education",
        title: { en: "Education" },
        fields: [
          {
            label: { en: "B.S. Software Engineering" },
            value: { en: "Western Governors University" },
          },
          {
            label: { en: "A.S. Digital Media Production, Internet Publishing" },
            value: { en: "Leeward Community College" },
          },
          {
            label: { en: "General Japanese, Pre-Advanced" },
            value: { en: "KAI Japanese Language School" },
          },
          {
            label: { en: "Japanese Language & Culture" },
            value: { en: "Josai International University" },
          },
        ],
      },
      {
        id: "currently",
        title: { en: "Currently" },
        paragraphs: [
          {
            en: "I'm based in Hawaii and preparing to continue my software engineering career in Japan. I've studied Japanese both in Japan and independently, including programs at KAI Japanese Language School and Josai International University, and hold the JLPT N2. I'm especially interested in web and software teams where I can contribute across frontend, full-stack development, UI systems, and broader product engineering.",
          },
        ],
      },
    ],
    related: [
      { label: { en: "Explore the Work" }, destination: "/work" },
      { label: { en: "Start a Conversation" }, destination: "/contact" },
    ],
  },
  lab: {
    id: "lab",
    ...placeholderPages.lab,
    lead: homepageContent.lab.description,
    sections: [
      {
        id: "lab-collection",
        title: { en: "Studies & Explorations" },
        collection: true,
        emptyText: homepageContent.lab.emptyText,
      },
    ],
    related: [
      { label: { en: "Explore the Work" }, destination: "/work" },
      { label: { en: "About My Approach" }, destination: "/about" },
    ],
  },
  contact: {
    id: "contact",
    title: { en: "Contact" },
    description: homepageContent.contact.description,
    lead: homepageContent.contact.title,
    sections: [
      {
        id: "contact-methods",
        title: { en: "Start a Conversation" },
        contactMethods,
      },
      {
        id: "contact-documents",
        title: { en: "Résumés & CV" },
        paragraphs: [
          {
            en: "English and Japanese documents will be available here in PDF and Word formats.",
          },
        ],
        documents: contactDocuments,
      },
    ],
    related: [
      { label: { en: "Explore the Work" }, destination: "/work" },
      { label: { en: "About My Approach" }, destination: "/about" },
    ],
  },
} satisfies Record<string, SecondaryPageContent>;
