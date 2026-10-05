import type { SecondaryPageContent } from "@/components/semantic/secondary-page";
import { homepageContent, placeholderPages } from "./placeholder";

// Provisional English source shared by every composition; no unverified contact,
// biography, experiment or credential records are introduced by the page layouts.
export const pageContent = {
  work: {
    id: "work",
    ...placeholderPages.work,
    lead: "Each case study covers the problem, key decisions, and current state.",
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
    description: placeholderPages.about.description,
    lead: homepageContent.about.title,
    // Narrative first (background, then how the work is done), facts after, Japan
    // last: the projects prove the skills; this page explains the path.
    sections: [
      {
        id: "background",
        title: "Background",
        paragraphs: [
          "I'm Tyler Tetsuo Tapia, a software engineer and web developer based in Hawaii. My background combines software engineering with more than a decade of experience around the web, beginning with digital media and web design and developing into full-stack applications, frontend systems, and software architecture.",
          "I studied Digital Media Production at Leeward Community College and began working as a freelance web developer while completing that program. That early experience shaped how I approach software today: not only as code and infrastructure, but as something people have to understand, navigate, and use. I later expanded that foundation through a B.S. in Software Engineering at Western Governors University, with my recent work focusing on larger applications, structured content systems, backend services, localization, accessibility, testing, and maintainable architecture.",
          "I enjoy working across the boundary between interface and engineering. Some projects are visually and product focused; others are more concerned with backend systems, data flow, or reusable architecture. Across both, I care about understanding the problem first, making deliberate technical decisions, and building systems that remain clear and maintainable as they grow.",
        ],
      },
      {
        id: "how-i-work",
        title: "How I Work",
        paragraphs: [
          "My workflow makes extensive use of AI-assisted development for implementation, research, testing, and iteration. I treat those tools as part of an engineering process rather than a substitute for one: I define requirements and architecture, direct product and design decisions, review implementation, verify behavior, and remain responsible for the final result.",
        ],
      },
      {
        id: "focus",
        title: "Focus",
        paragraphs: [
          "Frontend & UI Engineering · Full-Stack Development · Web Applications · System Architecture · Localization & Accessibility",
        ],
      },
      {
        id: "languages",
        title: "Skills & Languages",
        fields: [
          {
            label: "Programming",
            value:
              "TypeScript, JavaScript, Java, Python, SQL, PHP (working knowledge)",
          },
          { label: "Web", value: "HTML, CSS" },
          {
            label: "Frameworks",
            value: "Next.js, React, Spring Boot, Tailwind CSS, jQuery",
          },
          {
            label: "Tools",
            value: "PostgreSQL, Supabase, Docker, Git, Playwright, Vitest",
          },
          {
            label: "Editors & IDEs",
            value: "VS Code, IntelliJ IDEA, Android Studio",
          },
          {
            label: "Design",
            value:
              "Adobe Photoshop, Illustrator, XD, InDesign, Lightroom, Premiere Pro",
          },
          { label: "Japanese", value: "JLPT N2" },
          { label: "English", value: "Native" },
        ],
      },
      {
        id: "education",
        title: "Education",
        fields: [
          {
            label: "B.S. Software Engineering",
            value: "Western Governors University",
          },
          {
            label: "A.S. Digital Media Production, Internet Publishing",
            value: "Leeward Community College",
          },
          {
            label: "General Japanese, Pre-Advanced",
            value: "KAI Japanese Language School",
          },
          {
            label: "Japanese Language & Culture",
            value: "Josai International University",
          },
        ],
      },
      {
        id: "currently",
        title: "Currently",
        paragraphs: [
          "I'm based in Hawaii and preparing to continue my software engineering career in Japan. I've studied Japanese both in Japan and independently, including programs at KAI Japanese Language School and Josai International University, and hold the JLPT N2. I'm especially interested in web and software teams where I can contribute across frontend, full-stack development, UI systems, and broader product engineering.",
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
