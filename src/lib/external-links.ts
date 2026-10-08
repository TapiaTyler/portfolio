/** Public web destinations open separately; anchors, email and local files stay native. */
export function externalLinkAttributes(href: string | undefined) {
  return href && /^https?:\/\//i.test(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
