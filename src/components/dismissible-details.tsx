"use client";

import { useRef, type ComponentProps } from "react";
import { useDismissibleDisclosure } from "./use-dismissible-disclosure";

/** A `<details>` overlay that closes itself on outside press, focus loss or route change. */
export function DismissibleDetails(props: ComponentProps<"details">) {
  const details = useRef<HTMLDetailsElement>(null);
  useDismissibleDisclosure(details);
  return (
    <details
      {...props}
      ref={details}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (event.key === "Escape" && details.current?.open) {
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
      }}
    />
  );
}
