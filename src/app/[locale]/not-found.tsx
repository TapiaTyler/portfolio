"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";
import { UiText } from "@/components/ui-text";

// Not-found boundaries receive no route params; recover the locale from the URL.
export default function NotFoundPage() {
  const segment = usePathname()?.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : "en";
  return (
    <section className="page-intro">
      <p className="eyebrow">
        <UiText locale={locale} id="404 / Not Found" />
      </p>
      <h1>
        <UiText locale={locale} id="That page is unavailable." />
      </h1>
      <p>
        <UiText
          locale={locale}
          id="The address may be incorrect, or the project is not published yet."
        />
      </p>
      <Link className="text-link" href={`/${locale}`}>
        <UiText locale={locale} id="Return Home" />{" "}
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
