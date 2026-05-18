import { THEME_COOKIE_NAME } from "@/lib/theme";

/** Restores theme + Safari flag when cached HTML omits `data-theme` (no inline script — React 19 safe). */
export function runThemeBootstrap(): void {
  if (typeof document === "undefined") return;

  try {
    const el = document.documentElement;
    if (!el.getAttribute("data-theme")) {
      const match = document.cookie.match(
        new RegExp(`(?:^|;\\s*)${THEME_COOKIE_NAME}=(light|dark)`)
      );
      el.setAttribute("data-theme", match?.[1] ?? "dark");
    }

    const ua = navigator.userAgent ?? "";
    if (
      /AppleWebKit/i.test(ua) &&
      /Safari/i.test(ua) &&
      !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS/i.test(ua)
    ) {
      el.dataset.browser = "safari";
    }
  } catch {
    // ignore
  }
}
