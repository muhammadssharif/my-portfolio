"use client";

import { useSyncExternalStore } from "react";

const TABLET_MIN_WIDTH = "(min-width: 48rem)";

function subscribe(query: string, onStoreChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

/** SSR defaults to false (mobile-first) to avoid hydration mismatch. */
function getServerSnapshot() {
  return false;
}

export function useMinWidth(query: string = TABLET_MIN_WIDTH) {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    getServerSnapshot
  );
}

export const useIsDesktop = () => useMinWidth(TABLET_MIN_WIDTH);
