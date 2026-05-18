"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode
} from "react";
import { getThemeTransitionController } from "@/lib/theme-transition-controller";
import { getCosmicQualitySettings, type CosmicQualitySettings } from "@/lib/cosmic-quality";
import { markSafariDocument } from "@/lib/safari-compat";

export type CosmicFrameHandle = {
  id: string;
  /** When false, the frame loop skips this subscriber (e.g. clouds hidden in dark mode). */
  isActive: () => boolean;
  onFrame: (time: number) => void;
};

type CosmicRuntimeContextValue = {
  quality: CosmicQualitySettings;
  register: (handle: CosmicFrameHandle) => void;
  unregister: (id: string) => void;
};

const CosmicRuntimeContext = createContext<CosmicRuntimeContextValue | null>(null);

export function CosmicRuntimeProvider({ children }: { children: ReactNode }) {
  const quality = useMemo(() => getCosmicQualitySettings(), []);
  const subscribersRef = useRef(new Map<string, CosmicFrameHandle>());
  const rafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const frameInterval = 1000 / quality.targetFps;

  const isPaused = useSyncExternalStore(
    getThemeTransitionController().subscribe,
    () => getThemeTransitionController().isCosmicPaused(),
    () => false
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.cosmicTier = quality.tier;
    markSafariDocument();
  }, [quality.tier]);

  useEffect(() => {
    const subscribers = subscribersRef.current;

    const loop = (time: number) => {
      rafRef.current = requestAnimationFrame(loop);
      if (document.hidden || isPaused) return;

      const elapsed = time - lastFrameRef.current;
      if (elapsed < frameInterval) return;
      lastFrameRef.current = time - (elapsed % frameInterval);

      for (const handle of subscribers.values()) {
        if (!handle.isActive()) continue;
        handle.onFrame(time);
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      subscribers.clear();
    };
  }, [frameInterval, isPaused]);

  const value = useMemo<CosmicRuntimeContextValue>(
    () => ({
      quality,
      register: (handle) => {
        subscribersRef.current.set(handle.id, handle);
      },
      unregister: (id) => {
        subscribersRef.current.delete(id);
      }
    }),
    [quality]
  );

  return <CosmicRuntimeContext.Provider value={value}>{children}</CosmicRuntimeContext.Provider>;
}

export function useCosmicRuntime() {
  const context = useContext(CosmicRuntimeContext);
  if (!context) {
    throw new Error("useCosmicRuntime must be used within CosmicRuntimeProvider");
  }
  return context;
}
