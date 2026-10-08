"use client";

import { useId, useState } from "react";
import { type Locale } from "@/lib/i18n/locales";
import { message, selectMessage, type MessageId } from "@/lib/i18n/messages";
import { UiText } from "./ui-text";

export function CopyEmail({
  address,
  locale,
}: {
  address: string;
  locale: Locale;
}) {
  const [status, setStatus] = useState<MessageId>();
  const tooltipId = useId();
  return (
    <div className="contact-copy">
      <noscript>
        <style>{`.contact-copy__control{display:none!important}`}</style>
      </noscript>
      <div className="contact-email-actions">
        <a
          className="text-link contact-method__action"
          href={`mailto:${address}`}
        >
          {address}
        </a>
        <span className="contact-copy__control">
          <button
            type="button"
            aria-label={message(locale, "Copy email address")}
            lang={selectMessage(locale, "Copy email address").lang}
            aria-describedby={tooltipId}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(address);
                setStatus("Email address copied.");
              } catch {
                setStatus(
                  "Copy unavailable. Select the email address to copy it.",
                );
              }
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="8" y="8" width="12" height="12" rx="2" />
              <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
          <span className="contact-copy__tooltip" role="tooltip" id={tooltipId}>
            <UiText locale={locale} id="Copy" />
          </span>
        </span>
      </div>
      <span
        role="status"
        aria-live="polite"
        lang={status ? selectMessage(locale, status).lang : undefined}
      >
        {status && message(locale, status)}
      </span>
    </div>
  );
}
