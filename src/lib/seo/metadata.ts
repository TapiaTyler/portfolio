import type { Metadata, MetadataRoute } from "next";
import { notFound } from "next/navigation";
import { identity } from "@/content/identity";
import { homepageContent, placeholderPages } from "@/content/placeholder";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import type { ProjectContent } from "@/lib/i18n/project-content";
import type { Project } from "@/lib/content/schema";
import { readSiteConfig, type SiteConfig } from "./site";
import { text, textLanguage } from "@/lib/i18n/copy";

// Expand when shared interface/homepage translations have been authored and reviewed.
export const siteContentLocales: readonly Locale[] = ["en"];
export const pagePaths = ["", "/work", "/about", "/lab", "/contact"] as const;
type PageKey = "home" | keyof typeof placeholderPages;

export function projectSeoLocales(project: Project): Locale[] {
  return project.translationStatus.ja !== "none" && project.locale.ja
    ? ["en", "ja"]
    : ["en"];
}

export function pageSeo({
  title,
  description,
  locale,
  path,
  availableLocales = siteContentLocales,
  contentLocale = "en",
  config = readSiteConfig(),
}: {
  title: string;
  description?: string;
  locale: Locale;
  path: string;
  availableLocales?: readonly Locale[];
  contentLocale?: Locale;
  config?: SiteConfig;
}): Metadata {
  const fullTitle = `${title} | ${identity.name}`;
  const canonical = config.url
    ? new URL(`/${locale}${path}`, config.url).href
    : undefined;
  const index = config.indexable && availableLocales.includes(locale);
  const languages = config.url
    ? Object.fromEntries(
        availableLocales.map((language) => [
          language,
          new URL(`/${language}${path}`, config.url!).href,
        ]),
      )
    : undefined;
  const images = config.url
    ? [
        {
          url: new URL("/share-image", config.url).href,
          width: 1200,
          height: 630,
          alt: `${identity.name} — Portfolio`,
        },
      ]
    : undefined;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: config.url
      ? {
          canonical,
          languages: {
            ...languages,
            "x-default": new URL(`/en${path}`, config.url).href,
          },
        }
      : undefined,
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      title: fullTitle,
      description,
      url: canonical,
      siteName: `${identity.name} — Portfolio`,
      locale: contentLocale === "ja" ? "ja_JP" : "en_US",
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: fullTitle,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

export async function mainPageMetadata(
  params: Promise<{ locale: string }>,
  page: PageKey,
): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content =
    page === "home"
      ? { title: "Portfolio", description: homepageContent.hero.description }
      : placeholderPages[page];
  return pageSeo({
    title: text(content.title, locale),
    description: text(content.description, locale),
    contentLocale: textLanguage(content.description, locale),
    locale,
    path: page === "home" ? "" : `/${page}`,
  });
}

export function projectMetadata(
  content: ProjectContent,
  config = readSiteConfig(),
) {
  return pageSeo({
    title: content.title.value,
    description:
      content.summary?.value ??
      content.description?.value ??
      `Project record: ${content.title.value}.`,
    locale: content.locale,
    contentLocale: content.title.lang,
    path: `/work/${content.project.slug}`,
    availableLocales: projectSeoLocales(content.project),
    config,
  });
}

export function sitemapEntries(
  projects: readonly Project[],
  config = readSiteConfig(),
): MetadataRoute.Sitemap {
  if (!config.indexable || !config.url) return [];
  const records = [
    ...pagePaths.flatMap((path) =>
      siteContentLocales.map((locale) => ({
        path,
        locale,
        locales: siteContentLocales,
      })),
    ),
    ...projects
      .filter(
        (project) =>
          project.kind === "project" &&
          project.publication.status === "published",
      )
      .flatMap((project) =>
        projectSeoLocales(project).map((locale) => ({
          path: `/work/${project.slug}`,
          locale,
          locales: projectSeoLocales(project),
        })),
      ),
  ];
  return records.map(({ path, locale, locales }) => ({
    url: new URL(`/${locale}${path}`, config.url!).href,
    alternates: {
      languages: Object.fromEntries(
        locales.map((language) => [
          language,
          new URL(`/${language}${path}`, config.url!).href,
        ]),
      ),
    },
  }));
}

export function siteStructuredData(config = readSiteConfig()) {
  if (!config.indexable || !config.url) return undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${config.url.href}#person`,
        name: identity.name,
        alternateName: identity.japaneseName,
        url: config.url.href,
      },
      {
        "@type": "WebSite",
        "@id": `${config.url.href}#website`,
        name: `${identity.name} — Portfolio`,
        url: config.url.href,
        inLanguage: siteContentLocales,
        publisher: { "@id": `${config.url.href}#person` },
      },
    ],
  };
}

export function serializeStructuredData(
  data: ReturnType<typeof siteStructuredData>,
) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
