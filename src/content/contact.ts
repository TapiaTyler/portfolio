import type { LocalizedText } from "@/lib/i18n/copy";
import type { Locale } from "@/lib/i18n/locales";
import { identity } from "./identity";

export interface ContactMethod {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  href: string;
  address?: string;
}
export interface ContactDocument {
  id: string;
  title: LocalizedText;
  language: Locale;
  /** Only populate with reviewed, public files. Missing files have no link. */
  files: { pdf?: string; word?: string };
}

export const contactMethods: ContactMethod[] = [
  {
    id: "email",
    title: { en: "Email", ja: "メール" },
    address: "tapiatylert@gmail.com",
    href: "mailto:tapiatylert@gmail.com",
  },
  {
    id: "github",
    title: { en: "GitHub" },
    description: {
      en: "Repositories and implementation work.",
      ja: "リポジトリと実装の記録。",
    },
    href: identity.github,
  },
  {
    id: "linkedin",
    title: { en: "LinkedIn" },
    description: {
      en: "Professional background and connections.",
      ja: "職歴とネットワーク。",
    },
    href: identity.linkedin,
  },
];

export const contactDocuments: ContactDocument[] = [
  {
    id: "resume-en",
    title: { en: "English Résumé", ja: "英文履歴書" },
    language: "en",
    files: {
      pdf: "/documents/contact/Tyler_Tetsuo_Tapia_Resume_EN.pdf",
    },
  },
  {
    id: "resume-ja",
    title: { en: "Japanese Résumé (Public Version)", ja: "履歴書（公開用）" },
    language: "ja",
    files: {
      pdf: "/documents/contact/Tyler_Tetsuo_Tapia_Rirekisho_JP_Public.pdf",
    },
  },
  {
    id: "cv-ja",
    title: { en: "Japanese CV", ja: "職務経歴書" },
    language: "ja",
    files: {
      pdf: "/documents/contact/Tyler_Tetsuo_Tapia_Shokumukeirekisho_JP.pdf",
    },
  },
];
