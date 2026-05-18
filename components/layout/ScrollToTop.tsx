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
    // Deep links (e.g. /work#pcc-sdk) scroll the deck into view instead.
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
