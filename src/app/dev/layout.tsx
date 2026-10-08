import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getActiveTheme } from "@/lib/theme/server";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeStyles } from "@/components/theme/theme-styles";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { themeOptions } from "@/registries/themes";
import { fontVariables } from "@/styles/fonts";
import "../globals.css";
import "@/styles/semantic.css";
import "@/styles/secondary-pages.css";
import "@/styles/editorial.css";
import "@/styles/engineer.css";
import "@/styles/digital.css";
import "@/styles/theme-transition.css";
import "@/styles/interaction.css";
import "@/styles/microinteraction.css";
import "@/styles/route-transition.css";
import "@/styles/chronicle.css";
import "@/styles/chronicle-header.css";
import "@/styles/product.css";

export const metadata: Metadata = {
  title: "Portfolio development preview",
  robots: { index: false, follow: false },
};

export default async function DevelopmentLayout({
  children,
}: {
  children: ReactNode;
}) {
  const theme = await getActiveTheme();
  return (
    <html lang="en" data-theme={theme} className={fontVariables}>
      <head>
        <ThemeStyles theme={theme} />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <a className="skip-link" href="#main-content">
            Skip to Content
          </a>
          <main id="main-content" data-theme-transition-scope>
            <ThemeSwitcher options={themeOptions} />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
