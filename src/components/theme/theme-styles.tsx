import { themeStyleSheet } from "@/registries/themes";
import type { ThemeId } from "@/lib/theme/ids";

export function ThemeStyles({ theme }: { theme?: ThemeId } = {}) {
  return (
    <>
      {/* Media conditions mirror chronicle.css so each viewport preloads only the
          scenic image it renders. */}
      {theme === "chronicle" && (
        <>
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/scenic-portrait.webp"
            media="(max-width: 900px) and (orientation: portrait), (orientation: landscape) and (max-height: 500px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/landscape-v2-compact.webp"
            media="(max-width: 900px) and (orientation: landscape) and (min-height: 501px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/landscape-v2.webp"
            media="(min-width: 901px) and (min-height: 501px)"
            fetchPriority="high"
          />
        </>
      )}
      <style id="portfolio-theme-tokens">{themeStyleSheet()}</style>
    </>
  );
}
