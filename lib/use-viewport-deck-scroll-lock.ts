"use client";

import { useEffect } from "react";

const DESKTOP_DECK_QUERY = "(min-width: 900px)";

/** Locks page scroll only on desktop immersive decks (≥900px). */
export function useViewportDeckScrollLock(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const media = window.matchMedia(DESKTOP_DECK_QUERY);

    const sync = () => {
      if (media.matches) {
        document.documentElement.classList.add("viewport-deck-active");
      } else {
        document.documentElement.classList.remove("viewport-deck-active");
      }
    };

    sync();
    media.addEventListener("change", sync);

    return () => {
      media.removeEventListener("change", sync);
      document.documentElement.classList.remove("viewport-deck-active");
    };
  }, [enabled]);
}
