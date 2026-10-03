import type { ReactNode } from "react";
import { ThemeStyles } from "@/components/theme/theme-styles";
import { fontVariables } from "@/styles/fonts";
import "../globals.css";

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        <ThemeStyles />
      </head>
      <body>{children}</body>
    </html>
  );
}
