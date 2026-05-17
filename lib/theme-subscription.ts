import { getThemeTransitionController } from "@/lib/theme-transition-controller";
import { THEME_CHANGE_EVENT, getDocumentTheme, type Theme } from "@/lib/theme";

/** Subscribe to theme changes (DOM + transition controller). */
export function subscribeTheme(onStoreChange: () => void): () => void {
  const unsubController = getThemeTransitionController().subscribe(onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => {
    unsubController();
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

export function getThemeSnapshot(): Theme {
  return getDocumentTheme();
}
