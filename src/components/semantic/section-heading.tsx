import type { ReactNode } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function SectionHeading({
  children,
  level = 2,
  id,
}: {
  children: ReactNode;
  level?: HeadingLevel;
  id?: string;
}) {
  const Heading = `h${level}` as const;
  return <Heading id={id}>{children}</Heading>;
}
