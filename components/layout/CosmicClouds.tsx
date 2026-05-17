"use client";

import { useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { useCosmicRuntime } from "@/lib/cosmic-runtime";
import { InitialThemeContext } from "@/lib/theme-context";
import { getThemeSnapshot, subscribeTheme } from "@/lib/theme-subscription";
import {
  clearCloudSpriteCache,
  createClouds,
  paintClouds,
  stepClouds,
  warmCloudSprites,
  type DriftCloud
} from "@/lib/cosmic-clouds";

export function CosmicClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { quality, register, unregister } = useCosmicRuntime();

  const initialTheme = useContext(InitialThemeContext);
  const documentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => initialTheme);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let clouds: DriftCloud[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sized = false;

    const isLightMode = () => getThemeSnapshot() === "light";

    const syncSize = () => {
      width = Math.max(320, Math.round(window.visualViewport?.width ?? window.innerWidth));
      height = Math.max(480, Math.round(window.visualViewport?.height ?? window.innerHeight));
      dpr = Math.min(window.devicePixelRatio || 1, quality.maxDpr);

      const pixelW = Math.floor(width * dpr);
      const pixelH = Math.floor(height * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      clearCloudSpriteCache();
      clouds = createClouds(width, height, {
        includeMist: quality.includeMist,
        maxCount: quality.cloudCount
      });
      warmCloudSprites(clouds);
      sized = width > 0 && height > 0;
    };

    const paint = (time: number) => {
      if (!isLightMode()) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);
        canvas.style.opacity = "0";
        return;
      }
      canvas.style.opacity = "1";
      paintClouds(ctx, width, height, dpr, clouds, time, 1);
    };

    const onFrame = (time: number) => {
      if (!sized || width === 0 || !isLightMode()) return;

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stepClouds(clouds, width, height, time);
      }

      paint(time);
    };

    register({
      id: "cosmic-clouds",
      isActive: () => sized && isLightMode(),
      onFrame
    });

    syncSize();
    paint(performance.now());

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        syncSize();
        paint(performance.now());
      }, 150);
    };

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      unregister("cosmic-clouds");
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      clearCloudSpriteCache();
    };
  }, [quality, register, unregister, documentTheme]);

  return <canvas ref={canvasRef} className="cosmic-clouds-canvas" aria-hidden="true" />;
}
