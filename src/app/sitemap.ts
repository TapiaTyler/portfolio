import { getPublishedProjects } from "@/registries/projects";
import { sitemapEntries } from "@/lib/seo/metadata";

export default function sitemap() {
  return sitemapEntries(getPublishedProjects());
}
