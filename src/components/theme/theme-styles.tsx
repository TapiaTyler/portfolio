import { themeStyleSheet } from "@/registries/themes";
import { type ThemeId } from "@/lib/theme/ids";

export function ThemeStyles({ theme }: { theme?: ThemeId } = {}) {
  return (
    <>
      {/* Media conditions mirror chronicle.css so each viewport preloads only the
          scenic image it renders. */}
      {theme === "chronicle" && (
        <>
          {/* The header already uses this artwork. A low-priority hint keeps its
              CSS request from competing with the scenic LCP image on phones. */}
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/crystal-corner-mobile.avif"
            type="image/avif"
            media="(max-width: 900px)"
            fetchPriority="low"
          />
          {/* Only the heading face is hinted. Body text discovers weight 500
              through CSS, avoiding an unused hint when its presentation changes. */}
          <link
            rel="preload"
            as="font"
            href="/fonts/chronicle/cormorant-garamond-latin-700-normal.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/scenic-portrait.avif"
            type="image/avif"
            media="(max-width: 900px) and (orientation: portrait), (orientation: landscape) and (max-height: 500px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/landscape-v2-compact.avif"
            type="image/avif"
            media="(max-width: 900px) and (orientation: landscape) and (min-height: 501px)"
            fetchPriority="high"
          />
          <link
            rel="preload"
            as="image"
            href="/media/themes/chronicle/landscape-v2.avif"
            type="image/avif"
            media="(min-width: 901px) and (min-height: 501px)"
            fetchPriority="high"
          />
        </>
      )}
      <style id="portfolio-theme-tokens">{themeStyleSheet()}</style>
    </>
  );
}
