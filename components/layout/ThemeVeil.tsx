"use client";

import { useEffect, useRef } from "react";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";

/** Full-screen opacity layer — sole animated surface during theme transitions. */
export function ThemeVeil() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    getThemeTransitionController().registerVeil(el);
    return () => getThemeTransitionController().registerVeil(null);
  }, []);

  return <div ref={ref} className="theme-veil" aria-hidden="true" />;
}
