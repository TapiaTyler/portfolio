/** Shared English sources with optional reviewed Japanese fields. */
import { interfaceMessages } from "./interface";
import type { HomepageContent } from "@/components/semantic/homepage";
import { identity } from "./identity";
export const homeHero = {
  name: identity.name,
  label: { en: "Portfolio", ja: "ポートフォリオ" },
  title: { en: "Software Engineer", ja: "ソフトウェアエンジニア" },
  emphasis: { en: "& Web Developer", ja: "& Webデベロッパー" },
  description: {
    en: "I design and build web applications, connecting clear interfaces with maintainable systems. Based in Hawaii, I'm preparing to continue my software engineering career in Japan.",
    ja: "わかりやすいインターフェースと保守しやすいシステムをつなぐ、Webアプリケーションを設計・開発しています。ハワイを拠点に、日本でソフトウェアエンジニアとしてのキャリアを続けるための準備を進めています。",
  },
  link: {
    label: { en: "Explore Work", ja: "制作実績を見る" },
    destination: "/work",
  },
};

export const homepageContent: HomepageContent = {
  hero: homeHero,
  work: {
    title: { en: "Selected Work", ja: "主な制作実績" },
    linkLabel: { en: "View All Work", ja: "制作実績をすべて見る" },
    emptyText: {
      en: "Project stories are being prepared. A selection of work will appear here soon.",
      ja: "プロジェクトの紹介を準備中です。近日中にここで制作実績を紹介します。",
    },
  },
  capabilities: {
    title: { en: "Areas of Practice", ja: "取り組んでいる領域" },
    lead: {
      en: "Interfaces, applications, and the systems behind them.",
      ja: "インターフェース、アプリケーション、そしてそれを支えるシステム。",
    },
    items: [
      {
        title: { en: "Design", ja: "デザイン" },
        description: {
          en: "Making complex things clear, from information structure to the details of an interface.",
          ja: "情報設計からインターフェースの細部まで、複雑なものをわかりやすく形にします。",
        },
      },
      {
        title: { en: "Engineering", ja: "エンジニアリング" },
        description: {
          en: "Turning ideas into useful software with attention to structure, behavior, and maintainability.",
          ja: "構造、振る舞い、保守性に気を配りながら、アイデアを役に立つソフトウェアにします。",
        },
      },
      {
        title: { en: "Systems", ja: "システム" },
        description: {
          en: "Connecting the parts into a coherent whole, with room to grow and adapt.",
          ja: "各部分をつなぎ、成長や変化に対応できる一貫した全体をつくります。",
        },
      },
    ],
  },
  about: {
    label: {
      en: `About / ${identity.name}`,
      ja: `プロフィール / ${identity.japaneseName}`,
    },
    title: {
      en: "From web design to full-stack engineering.",
      ja: "Webデザインからフルスタックエンジニアリングへ。",
    },
    paragraphs: [
      {
        en: "I'm a software engineer and web developer based in Hawaii, with more than a decade around the web: from digital media and web design to full-stack applications and software architecture.",
        ja: "ハワイを拠点とするソフトウェアエンジニア・Webデベロッパーです。デジタルメディアやWebデザインから、フルスタックアプリケーションやソフトウェアアーキテクチャまで、10年以上Webに携わってきました。",
      },
      {
        en: "I'm preparing to continue my software engineering career in Japan.",
        ja: "日本でソフトウェアエンジニアとしてのキャリアを続けるための準備を進めています。",
      },
    ],
    linkLabel: { en: "More About Me", ja: "プロフィールを詳しく見る" },
  },
  lab: {
    title: { en: "Lab & Explorations", ja: "ラボ・試作" },
    description: {
      en: "Experiments, prototypes, and studies outside the main projects.",
      ja: "メインのプロジェクトとは別に取り組む実験、プロトタイプ、検証です。",
    },
    emptyText: {
      en: "New studies will appear here.",
      ja: "新しい試作はここで紹介します。",
    },
    linkLabel: { en: "Explore the Lab", ja: "ラボを見る" },
  },
  contact: {
    label: { en: "Contact", ja: "お問い合わせ" },
    title: {
      en: "Open to software engineering and web development roles in Japan.",
      ja: "日本でのソフトウェアエンジニア・Web開発のポジションを探しています。",
    },
    description: {
      en: "For roles, projects, or questions about the work.",
      ja: "採用やプロジェクトのご相談、制作物についてのご質問はこちらから。",
    },
    linkLabel: { en: "Get in Touch", ja: "連絡する" },
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
    title: { en: "Work", ja: "制作実績" },
    description: {
      en: "Web applications, content systems, and full-stack projects, each with a case study.",
      ja: "Webアプリケーション、コンテンツシステム、フルスタックのプロジェクトを、それぞれケーススタディとともに紹介します。",
    },
  },
  about: {
    title: { en: "About", ja: "プロフィール" },
    description: {
      en: "Software engineer and web developer based in Hawaii, preparing to continue my career in Japan.",
      ja: "ハワイを拠点とするソフトウェアエンジニア・Webデベロッパー。日本でのキャリアに向けて準備を進めています。",
    },
  },
  lab: {
    title: { en: "Lab", ja: "ラボ" },
    description: {
      en: "Experiments and small studies will appear here when their details are ready.",
      ja: "実験や小さな検証は、詳細が整い次第ここで紹介します。",
    },
  },
  contact: {
    title: { en: "Contact", ja: "お問い合わせ" },
    description: {
      en: "Email, professional profiles, and résumé and CV files.",
      ja: "メールアドレス、各種プロフィール、履歴書・職務経歴書を掲載しています。",
    },
  },
} as const;
