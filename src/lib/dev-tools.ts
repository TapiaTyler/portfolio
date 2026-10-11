/**
 * Development review routes (/dev, /preview) exist in development, and in the
 * dedicated preview-test build CI makes with PORTFOLIO_PREVIEW_BUILD=1 (into
 * .next/preview-tests). Deployed builds never set the flag, and Vercel builds
 * are excluded outright, so production keeps returning 404 for these routes.
 */
export function devToolsEnabled() {
  return (
    process.env.NODE_ENV === "development" ||
    (process.env.PORTFOLIO_PREVIEW_BUILD === "1" && !process.env.VERCEL)
  );
}
