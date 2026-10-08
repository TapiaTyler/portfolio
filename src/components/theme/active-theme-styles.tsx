"use client";

import dynamic from "next/dynamic";
import { type ThemeId } from "@/lib/theme/ids";

// Keep these as literal imports so Next can attach each stylesheet to its own
// component resource. React waits for that resource before revealing the update.
const styles = {
  editorial: dynamic(() => import("./styles/editorial")),
  engineer: dynamic(() => import("./styles/engineer")),
  digital: dynamic(() => import("./styles/digital")),
  chronicle: dynamic(() => import("./styles/chronicle")),
  product: dynamic(() => import("./styles/product")),
};
export function ActiveThemeStyles({ theme }: { theme: ThemeId }) {
  const Styles = styles[theme];
  return <Styles />;
}
