export function setupEngineerInteractions() {
  const disposers: (() => void)[] = [];
  const inEngineer = (element: Element) =>
    element.closest<HTMLElement>("[data-theme]")?.dataset.theme === "engineer";
  for (const record of document.querySelectorAll<HTMLElement>(
    ".engineer-project",
  )) {
    if (!inEngineer(record)) continue;
    function press(event: PointerEvent | KeyboardEvent) {
      if (
        !(event.target as Element).closest("a") ||
        (event instanceof KeyboardEvent
          ? event.key !== "Enter"
          : event.button !== 0)
      )
        return;
      record.dataset.recordPressed = "";
    }
    function reset() {
      delete record.dataset.recordPressed;
    }
    record.addEventListener("pointerdown", press);
    record.addEventListener("keydown", press);
    const events = ["pointerup", "pointercancel", "keyup", "blur"] as const;
    events.forEach((event) => window.addEventListener(event, reset));
    document.addEventListener("portfolio:route-transition", reset);
    document.addEventListener("portfolio:theme-transition", reset);
    disposers.push(() => {
      reset();
      record.removeEventListener("pointerdown", press);
      record.removeEventListener("keydown", press);
      events.forEach((event) => window.removeEventListener(event, reset));
      document.removeEventListener("portfolio:route-transition", reset);
      document.removeEventListener("portfolio:theme-transition", reset);
    });
  }
  for (const figure of document.querySelectorAll<HTMLElement>(
    ".code-snippet",
  )) {
    if (!inEngineer(figure)) continue;
    const code = figure.querySelector("code");
    if (!code) continue;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code sample");
    const status = document.createElement("span");
    status.className = "visually-hidden";
    status.setAttribute("role", "status");
    figure.append(button, status);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    async function copy() {
      button.disabled = true;
      try {
        await navigator.clipboard.writeText(code!.textContent ?? "");
        if (disposed) return;
        button.textContent = "Copied";
        button.dataset.copyState = "copied";
        status.textContent = "Code copied to clipboard.";
      } catch {
        if (disposed) return;
        button.textContent = "Copy Unavailable";
        status.textContent =
          "Clipboard unavailable. Select the code sample to copy it manually.";
      } finally {
        if (!disposed) {
          button.disabled = false;
          clearTimeout(timer);
          timer = setTimeout(() => {
            button.textContent = "Copy";
            delete button.dataset.copyState;
            status.textContent = "";
          }, 1800);
        }
      }
    }
    button.addEventListener("click", copy);
    disposers.push(() => {
      disposed = true;
      clearTimeout(timer);
      button.removeEventListener("click", copy);
      button.remove();
      status.remove();
    });
  }
  for (const diagram of document.querySelectorAll<HTMLElement>(
    ".architecture-display",
  )) {
    if (!inEngineer(diagram)) continue;
    const nodes = Array.from(
      diagram.querySelectorAll<HTMLElement>("[data-node-id]"),
    );
    const edges = Array.from(
      diagram.querySelectorAll<HTMLElement>("[data-connection-from]"),
    );
    const buttons = new Map<HTMLElement, HTMLButtonElement>();
    const status = document.createElement("p");
    status.className = "visually-hidden";
    status.setAttribute("role", "status");
    diagram.append(status);
    let pinned: string | null = null;
    function paint(id: string | null) {
      const related = new Set(id ? [id] : []);
      edges.forEach((edge) => {
        const connected =
          !!id &&
          (edge.dataset.connectionFrom === id ||
            edge.dataset.connectionTo === id);
        edge.dataset.connectionState = id
          ? connected
            ? "related"
            : "muted"
          : "idle";
        if (connected) {
          related.add(edge.dataset.connectionFrom!);
          related.add(edge.dataset.connectionTo!);
        }
      });
      nodes.forEach((node) => {
        node.dataset.connectionState = id
          ? related.has(node.dataset.nodeId!)
            ? "related"
            : "muted"
          : "idle";
        buttons
          .get(node)
          ?.setAttribute(
            "aria-pressed",
            String(pinned === node.dataset.nodeId),
          );
      });
    }
    for (const node of nodes) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "diagram-node";
      const original = Array.from(node.childNodes);
      button.append(...original);
      node.append(button);
      buttons.set(node, button);
      button.setAttribute(
        "aria-label",
        `Inspect connections for ${button.textContent}`,
      );
      button.setAttribute("aria-pressed", "false");
      function enter() {
        paint(node.dataset.nodeId!);
      }
      function leave() {
        paint(
          pinned ??
            (diagram.contains(document.activeElement)
              ? ((document.activeElement as HTMLElement).closest<HTMLElement>(
                  "[data-node-id]",
                )?.dataset.nodeId ?? null)
              : null),
        );
      }
      function click() {
        pinned = pinned === node.dataset.nodeId ? null : node.dataset.nodeId!;
        paint(pinned ?? node.dataset.nodeId!);
        status.textContent = pinned
          ? `${button.textContent}: connected components and relationships highlighted.`
          : "Connection selection cleared.";
      }
      function escape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          pinned = null;
          paint(null);
          status.textContent = "Connection selection cleared.";
        }
      }
      function blur() {
        queueMicrotask(leave);
      }
      button.addEventListener("pointerenter", enter);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("focus", enter);
      button.addEventListener("blur", blur);
      button.addEventListener("click", click);
      button.addEventListener("keydown", escape);
      disposers.push(() => {
        button.removeEventListener("pointerenter", enter);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("focus", enter);
        button.removeEventListener("blur", blur);
        button.removeEventListener("click", click);
        button.removeEventListener("keydown", escape);
        button.replaceWith(...original);
        delete node.dataset.connectionState;
      });
    }
    paint(null);
    disposers.push(() => {
      edges.forEach((edge) => delete edge.dataset.connectionState);
      status.remove();
    });
  }
  return () => disposers.forEach((dispose) => dispose());
}
