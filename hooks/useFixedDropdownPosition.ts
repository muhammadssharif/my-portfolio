"use client";

import { useLayoutEffect, type RefObject } from "react";

const GAP = 10;
const PADDING = 12;
const FALLBACK_WIDTH = 288;
const FALLBACK_HEIGHT = 280;

/** Viewport-fixed coords for dropdowns inside sticky headers (Safari absolute+sticky is unreliable). */
export function useFixedDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  open: boolean
) {
  useLayoutEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (panel) {
      panel.style.position = "fixed";
      panel.style.visibility = "hidden";
    }

    const position = () => {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      panel.style.position = "fixed";
      panel.style.right = "auto";
      panel.style.bottom = "auto";

      const rect = trigger.getBoundingClientRect();
      const panelWidth = panel.offsetWidth || FALLBACK_WIDTH;
      const measuredHeight = panel.offsetHeight;
      const layoutHeight = measuredHeight || FALLBACK_HEIGHT;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = rect.bottom + GAP;
      let left = rect.right - panelWidth;

      if (
        measuredHeight > 0 &&
        top + layoutHeight > vh - PADDING &&
        rect.top > layoutHeight + GAP + PADDING
      ) {
        top = rect.top - GAP - layoutHeight;
      }

      left = Math.min(
        Math.max(left, PADDING),
        Math.max(PADDING, vw - panelWidth - PADDING)
      );
      top = Math.min(
        Math.max(top, PADDING),
        Math.max(PADDING, vh - (measuredHeight || layoutHeight) - PADDING)
      );

      panel.style.top = `${Math.round(top)}px`;
      panel.style.left = `${Math.round(left)}px`;

      if (measuredHeight > 0) {
        panel.style.visibility = "visible";
      }
    };

    position();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => position()) : null;
    const panelEl = panelRef.current;
    if (panelEl) {
      resizeObserver?.observe(panelEl);
    }

    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);

    return () => {
      resizeObserver?.disconnect();
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
