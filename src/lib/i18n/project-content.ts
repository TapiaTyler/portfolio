import type { CaseStudyBlock } from "@/lib/content/blocks";
import type { Project } from "@/lib/content/schema";
import type { Locale } from "./locales";

export interface LocalizedValue<T> {
  value: T;
  lang: Locale;
  isFallback: boolean;
}

export function resolveValue<T>(
  english: T,
  japanese: T | undefined,
  locale: Locale,
): LocalizedValue<T> {
  const translated = locale === "ja" && japanese !== undefined;
  return {
    value: translated ? japanese : english,
    lang: translated ? "ja" : "en",
    isFallback: locale === "ja" && !translated,
  };
}

export function resolveOptionalValue<T>(
  english: T | undefined,
  japanese: T | undefined,
  locale: Locale,
): LocalizedValue<T> | undefined {
  if (english === undefined && (locale === "en" || japanese === undefined))
    return undefined;
  if (locale === "ja" && japanese !== undefined)
    return resolveValue(japanese, japanese, locale);
  return english === undefined
    ? undefined
    : resolveValue(english, undefined, locale);
}

export function resolveText(text: { en: string; ja?: string }, locale: Locale) {
  return resolveValue(text.en, text.ja, locale);
}

export interface SelectedBlock {
  block: CaseStudyBlock;
  translation?: CaseStudyBlock;
}

export function selectProjectContent(project: Project, locale: Locale) {
  const en = project.locale.en;
  const ja = locale === "ja" ? project.locale.ja : undefined;
  const translations = new Map(ja?.blocks.map((block) => [block.id, block]));

  // Keep the canonical narrative sequence. Translation fills fields without dropping English sections.
  const blocks: SelectedBlock[] = en.blocks.map((block) => ({
    block,
    translation: translations.get(block.id),
  }));

  return {
    project,
    locale,
    translationDepth:
      locale === "ja" ? project.translationStatus.ja : "complete",
    title: resolveValue(en.title, ja?.title, locale),
    summary: resolveOptionalValue(en.summary, ja?.summary, locale),
    description: resolveOptionalValue(en.description, ja?.description, locale),
    blocks,
  };
}

export type ProjectContent = ReturnType<typeof selectProjectContent>;
