"use client";

import { useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { useCosmicRuntime } from "@/lib/cosmic-runtime";
import { InitialThemeContext } from "@/lib/theme-context";
import { getThemeSnapshot, subscribeTheme } from "@/lib/theme-subscription";
import {
  buildStableConstellation,
  buildStarPool,
  collectContentObstacles,
  createStarfield,
  paintStarfield,
  stepShootingStars,
  stepStars,
  type AnimatedStar,
  type ConstellationEdge,
  type ShootingStar,
  type StarSpec
} from "@/lib/cosmic-stars";

function starCountForViewport(width: number, tier: "high" | "medium" | "low"): number {
  const mobile = width < 768;
  switch (tier) {
    case "low":
      return mobile ? 16 : 24;
    case "medium":
      return mobile ? 24 : 36;
    default:
      return mobile ? 32 : 48;
  }
}

function themeMixForResolved(theme: "light" | "dark"): number {
  return theme === "light" ? 1 : 0;
}

export function PretextStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { quality, register, unregister } = useCosmicRuntime();

  const initialTheme = useContext(InitialThemeContext);
  const documentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => initialTheme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';
    let pool: StarSpec[] = [];
    let stars: AnimatedStar[] = [];
    let edges: ConstellationEdge[] = [];
    let meteors: ShootingStar[] = [];
    let obstacles: ReturnType<typeof collectContentObstacles> = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let initialized = false;
    let obstacleTimer = 0;

    const viewport = () => ({
      width: Math.max(320, Math.round(window.visualViewport?.width ?? window.innerWidth)),
      height: Math.max(480, Math.round(window.visualViewport?.height ?? window.innerHeight))
    });

    const syncCanvas = () => {
      const next = viewport();
      const sizeChanged = next.width !== width || next.height !== height;
      width = next.width;
      height = next.height;
      dpr = Math.min(window.devicePixelRatio || 1, quality.maxDpr);

      const pixelW = Math.floor(width * dpr);
      const pixelH = Math.floor(height * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return sizeChanged;
    };

    const rebuildStars = () => {
      obstacles = collectContentObstacles();
      const count = starCountForViewport(width, quality.tier);
      stars = createStarfield(width, height, pool, obstacles, count);
      edges = buildStableConstellation(stars);
    };

    const readMix = () => themeMixForResolved(getThemeSnapshot());

    const paint = (time: number) => {
      paintStarfield(ctx, width, height, dpr, stars, edges, meteors, time, readMix());
    };

    const initialize = () => {
      pool = buildStarPool(fontFamily);
      syncCanvas();
      rebuildStars();
      meteors = [];
      paint(performance.now());
      initialized = true;
    };

    const onFrame = (time: number) => {
      if (!initialized || width === 0) return;

      if (time - obstacleTimer > 800) {
        obstacles = collectContentObstacles();
        obstacleTimer = time;
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stepStars(stars, time, width, height, obstacles);
      }

      meteors = stepShootingStars(meteors, width, height);
      paint(time);
    };

    register({
      id: "pretext-starfield",
      isActive: () => initialized && width > 0,
      onFrame
    });

    let fontTimeout: ReturnType<typeof setTimeout> | undefined;

    document.fonts.ready
      .then(() => {
        clearTimeout(fontTimeout);
        initialize();
      })
      .catch(() => {
        initialize();
      });

    fontTimeout = setTimeout(() => {
      if (!initialized) initialize();
    }, 2000);

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!initialized) return;
        if (syncCanvas()) rebuildStars();
        else obstacles = collectContentObstacles();
      }, 150);
    };

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      unregister("pretext-starfield");
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      clearTimeout(fontTimeout);
    };
  }, [quality, register, unregister, documentTheme]);

  return <canvas ref={canvasRef} className="pretext-starfield" aria-hidden="true" />;
}
