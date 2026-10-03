import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { isLocale } from "@/lib/i18n/locales";
import { getActiveTheme } from "@/lib/theme/server";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeStyles } from "@/components/theme/theme-styles";
import { fontVariables } from "@/styles/fonts";
import { identity } from "@/content/identity";
import { readSiteConfig } from "@/lib/seo/site";
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

// One server-rendered composition is selected from the incoming preference cookie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: readSiteConfig().url,
  robots: { index: readSiteConfig().indexable, follow: true },
  title: {
    default: `${identity.name} | Portfolio preview`,
    template: `%s | ${identity.name}`,
  },
  description: `A preview of ${identity.name}'s portfolio website.`,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();
  const theme = await getActiveTheme();

  return (
    <html lang={locale} data-theme={theme} className={fontVariables}>
      <head>
        <ThemeStyles />
      </head>
      <body>
        {/* Interface labels stay English for now; project fields declare their own language. */}
        <div lang="en">
          <ThemeProvider theme={theme}>
            <SiteShell locale={locale}>{children}</SiteShell>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
