import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ComposedCaseStudy } from "@/components/composed-surfaces";
import { isLocale } from "@/lib/i18n/locales";
import { selectProjectContent } from "@/lib/i18n/project-content";
import { getProject } from "@/registries/projects";
import { projectMetadata } from "@/lib/seo/metadata";

type RouteProps = { params: Promise<{ locale: string; slug: string }> };

async function contentForRoute({ params }: RouteProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  return selectProjectContent(project, locale);
}

export async function generateMetadata(props: RouteProps): Promise<Metadata> {
  const content = await contentForRoute(props);
  return projectMetadata(content);
}

export default async function ProjectPage(props: RouteProps) {
  return <ComposedCaseStudy content={await contentForRoute(props)} />;
}
