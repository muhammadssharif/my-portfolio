export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_COOKIE_NAME = "portfolio-theme";
export const THEME_CHANGE_EVENT = "portfolio-theme-change";
export const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function setThemeCookie(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${THEME_COOKIE_NAME}=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function getDocumentTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Applies theme immediately (no animation). Used at init and by the transition controller at commit. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  setThemeCookie(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

