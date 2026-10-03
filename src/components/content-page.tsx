import { notFound } from "next/navigation";
import { pageContent } from "@/content/pages";
import { isLocale } from "@/lib/i18n/locales";
import { getPublishedProjects } from "@/registries/projects";
import { ComposedSecondaryPage } from "./composed-surfaces";

export async function ContentPage({
  page,
  params,
}: {
  page: keyof typeof pageContent;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <ComposedSecondaryPage
      content={pageContent[page]}
      locale={locale}
      projects={page === "work" ? getPublishedProjects() : []}
    />
  );
}
