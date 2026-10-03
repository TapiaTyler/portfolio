export interface SiteEnvironment {
  SITE_URL?: string;
  SITE_INDEXABLE?: string;
  NODE_ENV?: string;
  VERCEL_ENV?: string;
}

/** Deployment configuration is explicit; request headers never determine canonical identity. */
export function readSiteConfig(env: SiteEnvironment = process.env) {
  if (env.SITE_INDEXABLE && !["true", "false"].includes(env.SITE_INDEXABLE))
    throw new Error("SITE_INDEXABLE must be true or false.");
  let url: URL | undefined;
  if (env.SITE_URL?.trim()) {
    url = new URL(env.SITE_URL.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    )
      throw new Error(
        "SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.",
      );
    if (
      url.protocol !== "https:" &&
      !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
    )
      throw new Error("Public SITE_URL must use HTTPS.");
  }
  const requested = env.SITE_INDEXABLE === "true";
  if (requested && !url)
    throw new Error("SITE_URL is required when SITE_INDEXABLE is true.");
  const local =
    url && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  return {
    url,
    indexable:
      requested &&
      env.NODE_ENV === "production" &&
      !local &&
      (!env.VERCEL_ENV || env.VERCEL_ENV === "production"),
  };
}

export type SiteConfig = ReturnType<typeof readSiteConfig>;
