"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";

// Not-found boundaries receive no route params; recover the locale from the URL.
export default function NotFoundPage() {
  const segment = usePathname()?.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : "en";
  return (
    <section className="page-intro">
      <p className="eyebrow">404 / Not Found</p>
      <h1>That page is unavailable.</h1>
      <p>The address may be incorrect, or the project is not published yet.</p>
      <Link className="text-link" href={`/${locale}`}>
        Return Home <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
