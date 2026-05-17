"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

/** Keep the viewport at the top on refresh and route changes (avoids restored scroll under fixed backdrop). */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
