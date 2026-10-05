"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { useDismissibleDisclosure } from "./use-dismissible-disclosure";

export function PrimaryNavigation({
  locale,
  items,
  controls,
}: {
  locale: Locale;
  items: readonly { href: string; label: string }[];
  controls: ReactNode;
}) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  useDismissibleDisclosure(menu);
  const links = items.map(({ href, label }) => {
    const destination = `/${locale}${href}`;
    return (
      <Link
        key={href}
        href={destination}
        aria-label={label}
        aria-current={
          pathname === destination || pathname.startsWith(`${destination}/`)
            ? "page"
            : undefined
        }
      >
        <span className="navigation-delimiter" aria-hidden="true">
          [
        </span>
        <span className="site-nav__label">{label}</span>
        <span className="navigation-delimiter" aria-hidden="true">
          ]
        </span>
      </Link>
    );
  });
  return (
    <>
      <nav aria-label="Primary" className="site-nav site-nav--desktop">
        {links}
      </nav>
      <details
        className="mobile-navigation"
        ref={menu}
        onKeyDown={(event) => {
          if (event.key === "Escape" && menu.current?.open) {
            menu.current.open = false;
            menu.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary aria-label="Menu">
          <span className="mobile-navigation__label">Menu</span>
          <span className="mobile-navigation__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </summary>
        <div className="mobile-navigation__panel">
          <nav
            aria-label="Primary"
            className="site-nav"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a") && menu.current)
                menu.current.open = false;
            }}
          >
            {links}
          </nav>
          <div className="site-controls site-controls--mobile">{controls}</div>
        </div>
      </details>
    </>
  );
}
