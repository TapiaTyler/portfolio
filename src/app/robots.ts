import type { MetadataRoute } from "next";
import { readSiteConfig } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const config = readSiteConfig();
  return config.indexable && config.url
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/dev/" },
        sitemap: new URL("/sitemap.xml", config.url).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
