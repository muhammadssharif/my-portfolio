"use client";

import { createContext, useContext, useLayoutEffect } from "react";
import { runThemeBootstrap } from "@/lib/theme-bootstrap";
import { ThemeTransition } from "@/components/layout/ThemeTransition";
import { ThemeVeil } from "@/components/layout/ThemeVeil";
import { useTheme } from "@/hooks/useTheme";
import { InitialThemeContext } from "@/lib/theme-context";
import type { Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme: Theme;
};

if (typeof window !== "undefined") {
  runThemeBootstrap();
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
  const value = useTheme();

  useLayoutEffect(() => {
    runThemeBootstrap();
  }, []);

  return (
    <InitialThemeContext.Provider value={initialTheme}>
      <ThemeContext.Provider value={value}>
        {children}
        <ThemeVeil />
        <ThemeTransition />
      </ThemeContext.Provider>
    </InitialThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
