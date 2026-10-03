import { isLocale } from "@/lib/i18n/locales";
import { notFound } from "next/navigation";
import { getFeaturedProjects } from "@/registries/projects";
import { ComposedHomepage } from "@/components/composed-surfaces";
import { homepageContent } from "@/content/placeholder";
import {
  mainPageMetadata,
  siteStructuredData,
  serializeStructuredData,
} from "@/lib/seo/metadata";

export const generateMetadata = ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => mainPageMetadata(params, "home");

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const featured = getFeaturedProjects();
  const structuredData = siteStructuredData();

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(structuredData),
          }}
        />
      )}
      <ComposedHomepage
        content={homepageContent}
        projects={featured}
        locale={locale}
      />
    </>
  );
}
