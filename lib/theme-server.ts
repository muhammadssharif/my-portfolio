import { cookies } from "next/headers";
import { THEME_COOKIE_NAME, type Theme } from "@/lib/theme";

const DEFAULT_THEME: Theme = "dark";

export async function resolveServerTheme(): Promise<Theme> {
  const store = await cookies();
  const value = store.get(THEME_COOKIE_NAME)?.value;
  return value === "light" || value === "dark" ? value : DEFAULT_THEME;
}
