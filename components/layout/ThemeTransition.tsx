"use client";

import { useEffect } from "react";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";

/** Attaches the singleton theme transition controller on mount. */
export function ThemeTransition() {
  useEffect(() => getThemeTransitionController().attach(), []);
  return null;
}
