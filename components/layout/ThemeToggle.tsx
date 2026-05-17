"use client";

import { useThemeContext } from "@/components/layout/ThemeProvider";
import { IconMoon, IconSun } from "@/components/ui/icons";

export function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn theme-toggle-btn"
      disabled={isTransitioning}
      aria-busy={isTransitioning}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
    </button>
  );
}
