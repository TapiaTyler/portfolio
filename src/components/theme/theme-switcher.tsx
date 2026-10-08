"use client";
import { interfaceCopy } from "@/lib/i18n/messages";
import { Text } from "@/components/localized-text";

import { type Locale } from "@/lib/i18n/locales";
import { UiText } from "@/components/ui-text";

import { startTransition, useActionState, useEffect, useRef } from "react";
import {
  saveThemePreference,
  type ThemeActionState,
} from "@/lib/theme/actions";
import { type ThemeId, isThemeId } from "@/lib/theme/ids";

import { useTheme, useThemeTransition } from "./theme-provider";
import { useDismissibleDisclosure } from "../use-dismissible-disclosure";

export function ThemeSwitcher({
  options,
  locale = "en",
}: {
  locale?: Locale;
  options: { id: ThemeId; label: string }[];
}) {
  const theme = useTheme();
  const transitions = useThemeTransition();
  const picker = useRef<HTMLDetailsElement>(null);
  // Stays open across theme switches so modes can be compared; focus stays on the
  // chosen option. Outside presses, focus loss, navigation and Escape close it.
  useDismissibleDisclosure(picker);
  const [state, action, pending] = useActionState<ThemeActionState, FormData>(
    saveThemePreference,
    {},
  );
  useEffect(() => {
    if (state.error) transitions.cancel();
  }, [state.error, transitions]);
  return (
    <details
      className="mode-picker"
      lang="en"
      ref={picker}
      onKeyDown={(event) => {
        if (event.key === "Escape" && picker.current?.open) {
          event.stopPropagation();
          picker.current.open = false;
          picker.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <span className="mode-picker__label">
          <UiText locale={locale} id="Presentation:" />
        </span>
        <span>{options.find((option) => option.id === theme)?.label}</span>
        <svg
          className="mode-picker__chevron"
          aria-hidden="true"
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
        >
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <form
        action={action}
        className="theme-switcher"
        onSubmit={(event) => {
          const submitter = (event.nativeEvent as SubmitEvent).submitter;
          const data = new FormData(event.currentTarget, submitter);
          const target = data.get("theme");
          if (
            isThemeId(target) &&
            target !== theme &&
            transitions.begin(target, () => {
              startTransition(() => action(data));
            })
          )
            event.preventDefault();
        }}
      >
        <fieldset disabled={pending}>
          <legend>
            <UiText locale={locale} id="Presentation" />
          </legend>
          <div className="theme-switcher__options">
            {options.map(({ id, label }) => (
              <button
                type="submit"
                name="theme"
                value={id}
                data-theme-option={id}
                key={id}
                aria-pressed={theme === id}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <p
          className={state.error ? "theme-switcher__error" : "visually-hidden"}
          role="status"
          aria-live="polite"
        >
          <Text
            locale={locale}
            value={
              pending
                ? interfaceCopy("Changing presentation…")
                : state.error || state.message
                  ? interfaceCopy(state.error ?? state.message!)
                  : undefined
            }
          />
        </p>
      </form>
    </details>
  );
}
