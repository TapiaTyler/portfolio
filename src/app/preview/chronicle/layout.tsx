import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeStyles } from "@/components/theme/theme-styles";
import { getActiveTheme } from "@/lib/theme/server";
import { fontVariables } from "@/styles/fonts";
import "../../globals.css";
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

export const metadata: Metadata = {
  title: "Chronicle design review — development only",
  robots: { index: false, follow: false },
};

export default async function ChronicleReviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (process.env.NODE_ENV !== "development") notFound();
  const theme = await getActiveTheme();
  return (
    <html lang="en" data-theme={theme} className={fontVariables}>
      <head>
        <ThemeStyles theme={theme} />
      </head>
      <body>
        <div lang="en">
          <ThemeProvider theme={theme}>
            <SiteShell locale="en" localeRoutePath="/en">
              {children}
            </SiteShell>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
