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
    title: { en: "Email" },
    address: "tapiatylert@gmail.com",
    href: "mailto:tapiatylert@gmail.com",
  },
  {
    id: "github",
    title: { en: "GitHub" },
    description: { en: "Repositories and implementation work." },
    href: identity.github,
  },
  {
    id: "linkedin",
    title: { en: "LinkedIn" },
    description: { en: "Professional background and connections." },
    href: identity.linkedin,
  },
];

export const contactDocuments: ContactDocument[] = [
  {
    id: "resume-en",
    title: { en: "English Résumé" },
    language: "en",
    files: {},
  },
  {
    id: "resume-ja",
    title: { en: "Japanese Résumé" },
    language: "ja",
    files: {},
  },
  { id: "cv-ja", title: { en: "Japanese CV" }, language: "ja", files: {} },
];
