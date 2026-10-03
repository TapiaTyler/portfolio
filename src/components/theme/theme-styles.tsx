import { themeStyleSheet } from "@/registries/themes";

export function ThemeStyles() {
  return <style id="portfolio-theme-tokens">{themeStyleSheet()}</style>;
}
