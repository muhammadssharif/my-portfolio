"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { logStyleHealth } from "@/lib/style-health";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";
import { restartCssAnimations } from "@/lib/restart-css-animations";

const LOG_PREFIX = "[style-health]";
const PROBE_ID = "style-health-tailwind-probe";

function ensureTailwindProbe(): HTMLElement | null {
  if (process.env.NODE_ENV !== "development") return null;

  let probe = document.getElementById(PROBE_ID);
  if (!probe) {
    probe = document.createElement("div");
    probe.id = PROBE_ID;
    probe.className = "pointer-events-none fixed left-0 top-0 -z-[9999] hidden rounded-lg";
    probe.setAttribute("aria-hidden", "true");
    document.body.appendChild(probe);
  }

  return probe;
}

/**
 * Dev-only Safari/CSS diagnostics. Filter the console by `style-health`.
 * When broken, copy the JSON from the `paste:` log line.
 *
 * Renders nothing in React — probe mounts on document.body after hydration
 * so server/client trees stay identical.
 */
export function StyleHealthProbe() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const probe = ensureTailwindProbe();

    const run = (trigger: string) => {
      const snapshot = logStyleHealth(trigger);

      if (snapshot.issues.includes("STUCK_THEME_TRANSITION")) {
        // console.warn(`${LOG_PREFIX} recovering stuck theme transition`);
        getThemeTransitionController().recoverStuckState();
      }

      if (
        snapshot.issues.some((i) =>
          ["NO_STYLESHEET_LINKS", "NO_DOCUMENT_STYLESHEETS", "MARQUEE_ANIMATION_INACTIVE"].includes(i)
        )
      ) {
        // console.warn(`${LOG_PREFIX} restarting CSS animations`);
        restartCssAnimations();
      }
    };

    run("mount");

    const onPageShow = (event: PageTransitionEvent) => {
      run(event.persisted ? "pageshow-bfcache" : "pageshow");
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") run("visibility-visible");
    };

    const delayed = window.setTimeout(() => run("mount+500ms"), 500);
    const delayed2 = window.setTimeout(() => run("mount+2000ms"), 2000);

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(delayed);
      window.clearTimeout(delayed2);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
      probe?.remove();
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const delayed = window.setTimeout(() => logStyleHealth(`navigate:${pathname}`), 300);
    return () => window.clearTimeout(delayed);
  }, [pathname]);

  return null;
}
