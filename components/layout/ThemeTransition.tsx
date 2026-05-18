"use client";

import { useEffect } from "react";
import { restartCssAnimations } from "@/lib/restart-css-animations";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";

/** Attaches the singleton theme transition controller on mount. */
export function ThemeTransition() {
  useEffect(() => {
    const detach = getThemeTransitionController().attach();
    const raf = requestAnimationFrame(() => restartCssAnimations());
    return () => {
      cancelAnimationFrame(raf);
      detach();
    };
  }, []);
  return null;
}
