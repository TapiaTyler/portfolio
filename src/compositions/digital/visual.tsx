/** Decorative vectors: no telemetry, personal location or project claims. */
export function DigitalVisual({
  variant = "portal",
}: {
  variant?: "portal" | "bridge";
}) {
  return (
    <div
      className={`digital-visual digital-visual--${variant}`}
      aria-hidden="true"
      data-motion-id={variant === "portal" ? "hero-visual" : undefined}
    >
      <svg viewBox="0 0 480 560" fill="none">
        <g className="digital-visual__orbit" stroke="currentColor">
          <ellipse cx="240" cy="270" rx="155" ry="200" />
          <ellipse
            cx="240"
            cy="270"
            rx="155"
            ry="80"
            transform="rotate(-35 240 270)"
          />
          <ellipse
            cx="240"
            cy="270"
            rx="75"
            ry="200"
            transform="rotate(25 240 270)"
          />
          <path d="M65 270h350M240 45v450" strokeDasharray="3 8" />
        </g>
        <g className="digital-visual__nodes" fill="currentColor">
          <circle cx="240" cy="270" r="8" />
          <circle cx="240" cy="70" r="5" />
          <circle cx="85" cy="270" r="5" />
          <circle cx="395" cy="270" r="5" />
          <circle cx="240" cy="470" r="5" />
        </g>
        <path
          d="M28 74V28h46M406 28h46v46M28 486v46h46M406 532h46v-46"
          stroke="currentColor"
        />
      </svg>
    </div>
  );
}
