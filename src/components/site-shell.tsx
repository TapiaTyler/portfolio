import Link from "next/link";
import type { ReactNode } from "react";
import { navigation } from "@/content/placeholder";
import type { Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { themeOptions } from "@/registries/themes";
import { PrimaryNavigation } from "./primary-navigation";
import { identity } from "@/content/identity";

export function SiteShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" data-theme-transition-scope>
        <div className="site-header__inner" data-motion-id="site-navigation">
          <Link className="site-brand" href={`/${locale}`}>
            <span className="site-brand__names">
              <span lang="en">{identity.name}</span>
              <span className="site-brand__japanese" lang="ja">
                {identity.japaneseName}
              </span>
            </span>
          </Link>
          <PrimaryNavigation
            locale={locale}
            items={navigation}
            controls={
              <>
                <LocaleSwitcher locale={locale} />
                <ThemeSwitcher options={themeOptions} />
              </>
            }
          />
          <div className="site-controls site-controls--desktop">
            <LocaleSwitcher locale={locale} />
            <ThemeSwitcher options={themeOptions} />
          </div>
        </div>
      </header>
      {locale === "ja" && (
        <aside
          className="translation-notice"
          aria-label="Translation status"
          data-theme-transition-scope
        >
          <span data-motion-id="translation-status">
            Japanese interface translations are being prepared. Navigation and
            interface labels use English in this preview.
          </span>
        </aside>
      )}
      <main id="main-content" data-theme-transition-scope>
        {children}
      </main>
      <footer className="site-footer" data-theme-transition-scope>
        <div className="site-footer__inner" data-motion-id="site-footer">
          <span>{identity.name}</span>
          <span>Portfolio preview</span>
        </div>
      </footer>
    </>
  );
}
