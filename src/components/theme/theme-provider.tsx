"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type ThemeId } from "@/lib/theme/ids";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  bindRouteNavigation,
  getRouteTransitionController,
} from "@/lib/motion/route-transition";
import { setupPageMotion } from "@/lib/motion/page-motion";
import {
  createThemeTransitionController,
  type ThemeTransitionController,
} from "@/lib/theme/transition";

const ThemeContext = createContext<ThemeId | null>(null);
const TransitionContext = createContext<ThemeTransitionController | null>(null);

// The server preference is authoritative. Do not correct it after mount using another store.
export function ThemeProvider({
  theme,
  children,
}: {
  theme: ThemeId;
  children: ReactNode;
}) {
  const [transitions] = useState(createThemeTransitionController);
  const [routes] = useState(getRouteTransitionController);
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams().toString();
  const previousTheme = useRef(theme);
  useLayoutEffect(() => routes.connect(), [routes]);
  useEffect(() => {
    const enteredTheme = previousTheme.current !== theme;
    const skipVisible = enteredTheme || routes.running;
    previousTheme.current = theme;
    return setupPageMotion(skipVisible, enteredTheme);
  }, [theme, pathname, query, routes]);
  useLayoutEffect(
    () => routes.committed(pathname + (query ? `?${query}` : "")),
    [pathname, query, routes],
  );
  useLayoutEffect(
    () =>
      bindRouteNavigation(
        routes,
        theme,
        (href) => router.push(href, { scroll: false }),
        transitions.cancel,
      ),
    [routes, theme, router, transitions],
  );
  useLayoutEffect(() => transitions.committed(theme), [theme, transitions]);
  useLayoutEffect(() => transitions.cancel(), [pathname, query, transitions]);
  useLayoutEffect(() => () => transitions.cancel(), [transitions]);
  return (
    <ThemeContext.Provider value={theme}>
      <TransitionContext.Provider value={transitions}>
        {children}
      </TransitionContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error("Theme controls require a ThemeProvider.");
  return theme;
}

export function useThemeTransition() {
  const transitions = useContext(TransitionContext);
  if (!transitions)
    throw new Error("Theme transitions require a ThemeProvider.");
  return transitions;
}
