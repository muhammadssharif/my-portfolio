"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { markSafariDocument, refreshSafariPresentation } from "@/lib/safari-compat";
import { collectStyleHealth, needsStyleRecovery } from "@/lib/style-health";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";

/**
 * Safari-only: document flag for CSS overrides + bfcache recovery.
 * Does not toggle stylesheets (that breaks globals.css in WebKit).
 */
export function SafariCompat() {
  const pathname = usePathname();
  const router = useRouter();
  const recoveredForPath = useRef<string | null>(null);

  useEffect(() => {
    if (!markSafariDocument()) return;

    const recoverStyles = (trigger: string) => {
      if (recoveredForPath.current === pathname) return;

      const snapshot = collectStyleHealth(trigger);
      if (!needsStyleRecovery(snapshot.issues)) return;

      if (snapshot.issues.includes("STUCK_THEME_TRANSITION")) {
        getThemeTransitionController().recoverStuckState();
      }

      recoveredForPath.current = pathname;
      router.refresh();
    };

    const run = (trigger: string) => {
      refreshSafariPresentation();
      window.setTimeout(() => recoverStyles(trigger), 350);
    };

    run("mount");

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) recoveredForPath.current = null;
      run(event.persisted ? "pageshow-bfcache" : "pageshow");
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") run("visibility-visible");
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname, router]);

  return null;
}
