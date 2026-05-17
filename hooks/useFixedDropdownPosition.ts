"use client";

import { useLayoutEffect, type RefObject } from "react";

const GAP = 10;
const PADDING = 12;
const FALLBACK_WIDTH = 288;

/** Viewport-fixed coords for dropdowns inside sticky headers (Safari absolute+sticky is unreliable). */
export function useFixedDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  open: boolean
) {
  useLayoutEffect(() => {
    if (!open) return;

    const position = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      const rect = trigger.getBoundingClientRect();
      const panelWidth = panel.offsetWidth || FALLBACK_WIDTH;
      const panelHeight = panel.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = rect.bottom + GAP;
      let left = rect.right - panelWidth;

      if (
        panelHeight > 0 &&
        top + panelHeight > vh - PADDING &&
        rect.top > panelHeight + GAP + PADDING
      ) {
        top = rect.top - GAP - panelHeight;
      }

      left = Math.min(
        Math.max(left, PADDING),
        Math.max(PADDING, vw - panelWidth - PADDING)
      );
      top = Math.min(
        Math.max(top, PADDING),
        Math.max(PADDING, vh - (panelHeight || 0) - PADDING)
      );

      panel.style.position = "fixed";
      panel.style.top = `${Math.round(top)}px`;
      panel.style.left = `${Math.round(left)}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.visibility = "visible";
    };

    position();
    const raf = requestAnimationFrame(() => requestAnimationFrame(position));

    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);

      const panel = panelRef.current;
      if (!panel) return;
      panel.style.removeProperty("position");
      panel.style.removeProperty("top");
      panel.style.removeProperty("left");
      panel.style.removeProperty("right");
      panel.style.removeProperty("bottom");
      panel.style.removeProperty("visibility");
    };
  }, [open, triggerRef, panelRef]);
}
