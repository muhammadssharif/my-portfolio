"use client";

import { useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import {
  getThemeTransitionController,
  requestThemeChange
} from "@/lib/theme-transition-controller";
import { InitialThemeContext } from "@/lib/theme-context";
import { applyTheme, getDocumentTheme, getStoredTheme, type Theme } from "@/lib/theme";

function readClientTheme(): Theme {
  const state = getThemeTransitionController().getSnapshot();
  if (state.locked) {
    return state.resolvedTheme;
  }
  return getDocumentTheme();
}

export function useTheme() {
  const initialTheme = useContext(InitialThemeContext);

  const transitionState = useSyncExternalStore(
    getThemeTransitionController().subscribe,
    getThemeTransitionController().getSnapshot,
    getThemeTransitionController().getSnapshot
  );

  const theme = useSyncExternalStore(
    getThemeTransitionController().subscribe,
    readClientTheme,
    () => initialTheme
  );

  useEffect(() => {
    const stored = getStoredTheme();
    const htmlTheme = getDocumentTheme();

    if (stored && stored !== htmlTheme) {
      applyTheme(stored);
    }

    getThemeTransitionController().recoverStuckState();
  }, []);

  const isTransitioning = transitionState.locked;

  const setThemeExplicit = useCallback((next: Theme) => {
    requestThemeChange(next);
  }, []);

  const toggleTheme = useCallback(() => {
    getThemeTransitionController().toggleTheme();
  }, []);

  return { theme, setTheme: setThemeExplicit, toggleTheme, isTransitioning };
}
