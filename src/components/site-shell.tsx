import { messageLanguage, message } from "@/lib/i18n/messages";
import { UiText } from "@/components/ui-text";

import Link from "next/link";
import { type ReactNode } from "react";
import { navigation } from "@/content/placeholder";
import { type Locale } from "@/lib/i18n/locales";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { themeOptions } from "@/registries/themes";
import { PrimaryNavigation } from "./primary-navigation";
import { identity } from "@/content/identity";
import { externalLinkAttributes } from "@/lib/external-links";

/** Icon-only profile links; each accessible name carries the destination. */
function ProfileLinks() {
  return (
    <span className="site-profiles">
      <a
        className="site-profile"
        href={identity.github}
        {...externalLinkAttributes(identity.github)}
        aria-label="GitHub"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" width="20" height="20">
          <path
            fill="currentColor"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
      <a
        className="site-profile"
        href={identity.linkedin}
        {...externalLinkAttributes(identity.linkedin)}
        aria-label="LinkedIn"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="19" height="19">
          <path
            fill="currentColor"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      </a>
    </span>
  );
}

export function SiteShell({
  children,
  locale,
  localeRoutePath,
}: {
  children: ReactNode;
  locale: Locale;
  localeRoutePath?: string;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        <UiText locale={locale} id="Skip to Content" />
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
                <ProfileLinks />
                <LocaleSwitcher locale={locale} routePath={localeRoutePath} />
                <ThemeSwitcher locale={locale} options={themeOptions} />
              </>
            }
          />
          <div className="site-controls site-controls--desktop">
            <ProfileLinks />
            <LocaleSwitcher locale={locale} routePath={localeRoutePath} />
            <ThemeSwitcher locale={locale} options={themeOptions} />
          </div>
        </div>
      </header>
      {locale === "ja" && (
        <aside
          className="translation-notice"
          aria-label={message(locale, "Translation status")}
          lang={messageLanguage(locale, "Translation status")}
          data-theme-transition-scope
        >
          <span data-motion-id="translation-status">
            <UiText
              locale={locale}
              id="Some page and interface text is shown in English where Japanese translations are unavailable."
            />
          </span>
        </aside>
      )}
      <main id="main-content" data-theme-transition-scope>
        {children}
      </main>
      <footer className="site-footer" data-theme-transition-scope>
        <div className="site-footer__inner" data-motion-id="site-footer">
          <span>{identity.name}</span>
          <span className="site-footer__links">
            <a
              className="site-footer__link"
              href={identity.github}
              {...externalLinkAttributes(identity.github)}
            >
              GitHub
            </a>
            <a
              className="site-footer__link"
              href={identity.linkedin}
              {...externalLinkAttributes(identity.linkedin)}
            >
              LinkedIn
            </a>
          </span>
          <span>
            <UiText locale={locale} id="Portfolio Preview" />
          </span>
        </div>
      </footer>
    </>
  );
}
