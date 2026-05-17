"use client";

import { createContext } from "react";
import type { Theme } from "@/lib/theme";

/** SSR-resolved theme from cookie — must match `<html data-theme>`. */
export const InitialThemeContext = createContext<Theme>("dark");
