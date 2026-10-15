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
      ja: "各ケーススタディでは、課題、主な判断、現在の状況を紹介しています。",
    },
    sections: [
      {
        id: "work-collection",
        title: { en: "Project Collection", ja: "プロジェクト一覧" },
        collection: true,
        emptyText: homepageContent.work.emptyText,
      },
    ],
    related: [
      {
        label: { en: "About My Approach", ja: "取り組み方を見る" },
        destination: "/about",
      },
      {
        label: { en: "Explore the Lab", ja: "ラボを見る" },
        destination: "/lab",
      },
    ],
  },
  about: {
    id: "about",
    title: { en: "About", ja: "プロフィール" },
    description: placeholderPages.about.description,
    lead: homepageContent.about.title,
    // Narrative first (background, then how the work is done), facts after, Japan
    // last: the projects prove the skills; this page explains the path.
    sections: [
      {
        id: "background",
        title: { en: "Background", ja: "経歴" },
        paragraphs: [
          {
            en: "I'm Tyler Tetsuo Tapia, a software engineer and web developer based in Hawaii. My background combines software engineering with more than a decade of experience around the web, beginning with digital media and web design and developing into full-stack applications, frontend systems, and software architecture.",
            ja: "タイラー・鉄男・タピアです。ハワイを拠点に、ソフトウェアエンジニア・Webデベロッパーとして活動しています。デジタルメディアとWebデザインから始まり、フルスタックアプリケーション、フロントエンドシステム、ソフトウェアアーキテクチャへと広がってきた10年以上のWebの経験を、ソフトウェアエンジニアリングと組み合わせています。",
          },
          {
            en: "I studied Digital Media Production at Leeward Community College and began working as a freelance web developer while completing that program. That early experience shaped how I approach software today: not only as code and infrastructure, but as something people have to understand, navigate, and use. I later expanded that foundation through a B.S. in Software Engineering at Western Governors University, with my recent work focusing on larger applications, structured content systems, backend services, localization, accessibility, testing, and maintainable architecture.",
            ja: "リーワード・コミュニティカレッジでデジタルメディア制作を学び、在学中にフリーランスのWeb開発者として働き始めました。この経験から、ソフトウェアをコードやインフラとしてだけでなく、人が理解し、たどり、使うものとして捉えるようになりました。その後、ウェスタン・ガバナーズ大学でソフトウェアエンジニアリングの学士号（B.S.）を取得して基礎を広げました。最近は、大規模なアプリケーション、構造化されたコンテンツシステム、バックエンドサービス、ローカライズ、アクセシビリティ、テスト、保守しやすいアーキテクチャに取り組んでいます。",
          },
          {
            en: "I enjoy working across the boundary between interface and engineering. Some projects are visually and product focused; others are more concerned with backend systems, data flow, or reusable architecture. Across both, I care about understanding the problem first, making deliberate technical decisions, and building systems that remain clear and maintainable as they grow.",
            ja: "インターフェースとエンジニアリングの境界をまたいで仕事をすることが好きです。見た目やプロダクトに重点を置くプロジェクトもあれば、バックエンドシステムやデータの流れ、再利用できるアーキテクチャが中心のものもあります。どちらの場合も、まず課題を理解し、意図を持って技術的な判断を行い、規模が大きくなっても明快で保守しやすいシステムをつくることを大切にしています。",
          },
        ],
      },
      {
        id: "how-i-work",
        title: { en: "How I Work", ja: "仕事の進め方" },
        paragraphs: [
          {
            en: "My workflow makes extensive use of AI-assisted development for implementation, research, testing, and iteration. I treat those tools as part of an engineering process rather than a substitute for one: I define requirements and architecture, direct product and design decisions, review implementation, verify behavior, and remain responsible for the final result.",
            ja: "実装、調査、テスト、改善の各段階で、AI支援による開発を幅広く活用しています。こうしたツールはエンジニアリングの代わりではなく、そのプロセスの一部として扱っています。要件とアーキテクチャを定義し、プロダクトとデザインの判断を主導し、実装をレビューして動作を検証したうえで、最終的な結果に責任を持ちます。",
          },
        ],
      },
      {
        id: "focus",
        title: { en: "Focus", ja: "注力分野" },
        paragraphs: [
          {
            en: "Frontend & UI Engineering · Full-Stack Development · Web Applications · System Architecture · Localization & Accessibility",
            ja: "フロントエンド・UIエンジニアリング · フルスタック開発 · Webアプリケーション · システムアーキテクチャ · ローカライズ・アクセシビリティ",
          },
        ],
      },
      {
        id: "languages",
        title: { en: "Skills & Languages", ja: "スキル・言語" },
        fields: [
          {
            label: { en: "Programming", ja: "プログラミング" },
            value: {
              en: "TypeScript, JavaScript, Java, Python, SQL, PHP (working knowledge)",
              ja: "TypeScript、JavaScript、Java、Python、SQL、PHP（基礎的な実務知識）",
            },
          },
          { label: { en: "Web" }, value: { en: "HTML, CSS", ja: "HTML、CSS" } },
          {
            label: { en: "Frameworks", ja: "フレームワーク" },
            value: {
              en: "Next.js, React, Spring Boot, Tailwind CSS, jQuery",
              ja: "Next.js、React、Spring Boot、Tailwind CSS、jQuery",
            },
          },
          {
            label: { en: "Tools", ja: "ツール" },
            value: {
              en: "PostgreSQL, Supabase, Docker, Git, Playwright, Vitest",
              ja: "PostgreSQL、Supabase、Docker、Git、Playwright、Vitest",
            },
          },
          {
            label: { en: "Editors & IDEs", ja: "エディタ・IDE" },
            value: {
              en: "VS Code, IntelliJ IDEA, Android Studio",
              ja: "VS Code、IntelliJ IDEA、Android Studio",
            },
          },
          {
            label: { en: "Design", ja: "デザイン" },
            value: {
              en: "Adobe Photoshop, Illustrator, XD, InDesign, Lightroom, Premiere Pro",
              ja: "Adobe Photoshop、Illustrator、XD、InDesign、Lightroom、Premiere Pro",
            },
          },
          {
            label: { en: "Japanese", ja: "日本語" },
            value: { en: "JLPT N2", ja: "日本語能力試験（JLPT）N2 合格" },
          },
          {
            label: { en: "English", ja: "英語" },
            value: { en: "Native", ja: "ネイティブ" },
          },
        ],
      },
      {
        id: "education",
        title: { en: "Education", ja: "学歴" },
        fields: [
          {
            label: {
              en: "B.S. Software Engineering",
              ja: "ソフトウェアエンジニアリング学士（B.S.）",
            },
            value: {
              en: "Western Governors University",
              ja: "ウェスタン・ガバナーズ大学",
            },
          },
          {
            label: {
              en: "A.S. Digital Media Production, Internet Publishing",
              ja: "デジタルメディア制作準学士（A.S.）・インターネット出版",
            },
            value: {
              en: "Leeward Community College",
              ja: "リーワード・コミュニティカレッジ",
            },
          },
          {
            label: {
              en: "General Japanese, Pre-Advanced",
              ja: "一般日本語コース（準上級）",
            },
            value: {
              en: "KAI Japanese Language School",
              ja: "KAI日本語スクール",
            },
          },
          {
            label: {
              en: "Japanese Language & Culture",
              ja: "日本語・日本文化",
            },
            value: { en: "Josai International University", ja: "城西国際大学" },
          },
        ],
      },
      {
        id: "currently",
        title: { en: "Currently", ja: "現在" },
        paragraphs: [
          {
            en: "I'm based in Hawaii and preparing to continue my software engineering career in Japan. I've studied Japanese both in Japan and independently, including programs at KAI Japanese Language School and Josai International University, and hold the JLPT N2. I'm especially interested in web and software teams where I can contribute across frontend, full-stack development, UI systems, and broader product engineering.",
            ja: "ハワイを拠点に、日本でソフトウェアエンジニアとしてのキャリアを続けるための準備を進めています。KAI日本語スクールや城西国際大学のプログラムを含め、日本での留学と独学の両方で日本語を学び、日本語能力試験（JLPT）N2に合格しています。特に、フロントエンド、フルスタック開発、UIシステム、そして幅広いプロダクトエンジニアリングに貢献できるWeb・ソフトウェアのチームに関心があります。",
          },
        ],
      },
    ],
    related: [
      {
        label: { en: "Explore the Work", ja: "制作実績を見る" },
        destination: "/work",
      },
      {
        label: { en: "Start a Conversation", ja: "ご連絡はこちら" },
        destination: "/contact",
      },
    ],
  },
  lab: {
    id: "lab",
    ...placeholderPages.lab,
    lead: homepageContent.lab.description,
    sections: [
      {
        id: "lab-collection",
        title: { en: "Studies & Explorations", ja: "検証・試作" },
        collection: true,
        emptyText: homepageContent.lab.emptyText,
      },
    ],
    related: [
      {
        label: { en: "Explore the Work", ja: "制作実績を見る" },
        destination: "/work",
      },
      {
        label: { en: "About My Approach", ja: "取り組み方を見る" },
        destination: "/about",
      },
    ],
  },
  contact: {
    id: "contact",
    title: { en: "Contact", ja: "お問い合わせ" },
    description: homepageContent.contact.description,
    lead: homepageContent.contact.title,
    sections: [
      {
        id: "contact-methods",
        title: { en: "Start a Conversation", ja: "ご連絡はこちら" },
        contactMethods,
      },
      {
        id: "contact-documents",
        title: { en: "Résumés & CV", ja: "履歴書・職務経歴書" },
        paragraphs: [
          {
            en: "Download English and Japanese documents in PDF format. The Japanese résumé is a public version with personal details reduced.",
            ja: "英文履歴書・履歴書・職務経歴書をPDF形式でダウンロードできます。履歴書は個人情報を一部省略した公開用です。",
          },
        ],
        documents: contactDocuments,
      },
    ],
    related: [
      {
        label: { en: "Explore the Work", ja: "制作実績を見る" },
        destination: "/work",
      },
      {
        label: { en: "About My Approach", ja: "取り組み方を見る" },
        destination: "/about",
      },
    ],
  },
} satisfies Record<string, SecondaryPageContent>;
