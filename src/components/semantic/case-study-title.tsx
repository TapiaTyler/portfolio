import type { LocalizedValue } from "@/lib/i18n/project-content";

/** Keep one accessible title while giving compositions a phrase boundary to arrange. */
export function CaseStudyTitle({ title }: { title: LocalizedValue<string> }) {
  const comma = title.value.indexOf(",");
  return (
    <span lang={title.lang}>
      {comma < 0 ? (
        title.value
      ) : (
        <>
          {title.value.slice(0, comma + 1)}{" "}
          <span className="case-study-title__continuation">
            {title.value.slice(comma + 1).trimStart()}
          </span>
        </>
      )}
    </span>
  );
}
