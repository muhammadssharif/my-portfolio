import { isSafariWebKit } from "@/lib/cosmic-quality";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";
import { applyTheme, getDocumentTheme } from "@/lib/theme";
import { restartCssAnimations } from "@/lib/restart-css-animations";

/** Tag `<html>` so CSS can apply WebKit-specific compositing fixes. */
export function markSafariDocument(): boolean {
  if (typeof document === "undefined" || !isSafariWebKit()) {
    return false;
  }

  document.documentElement.dataset.browser = "safari";
  return true;
}

/** Re-apply theme tokens + restart CSS animations after Safari bfcache / navigation glitches. */
export function refreshSafariPresentation(): void {
  if (typeof document === "undefined" || !isSafariWebKit()) {
    return;
  }

  getThemeTransitionController().recoverStuckState();
  applyTheme(getDocumentTheme());
  restartCssAnimations();
  // VerticalMarquee and other layout-sensitive UI listen for this to remeasure.
  window.dispatchEvent(new Event("safari-presentation-refresh"));
}
