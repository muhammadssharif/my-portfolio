"use client";

import { useEffect, useRef, type RefObject } from "react";

const SWIPE_THRESHOLD_PX = 40;
const AXIS_LOCK_PX = 12;

/** Interactive targets that must receive clicks normally (especially links in Firefox). */
const SWIPE_IGNORE_SELECTOR =
  "input, textarea, select, button, a[href], [contenteditable='true'], .vertical-marquee-clip";

function shouldIgnoreSwipeStart(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return true;
  return !!target.closest(SWIPE_IGNORE_SELECTOR);
}

type SwipeAxis = "none" | "horizontal" | "vertical";

type SwipeNavigationOptions = {
  onPrev: () => void;
  onNext: () => void;
  /** When false, swipe handlers are not attached */
  enabled?: boolean;
};

/**
 * Horizontal swipe on a stage element (RTL-aware). Uses axis locking so horizontal
 * swipes on scrollable card content still navigate the deck. Links inside swipe
 * surfaces are navigable by tap; horizontal swipes change slides instead.
 */
export function useSwipeNavigation<T extends HTMLElement>(
  stageRef: RefObject<T | null>,
  { onPrev, onNext, enabled = true }: SwipeNavigationOptions
) {
  const swipeRef = useRef<{
    startX: number;
    startY: number;
    pointerId: number;
    tracking: boolean;
    axis: SwipeAxis;
  } | null>(null);
  const consumedSwipeRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const stage = stageRef.current;
    if (!stage) return;

    const clearSwipe = () => {
      swipeRef.current = null;
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!consumedSwipeRef.current) return;
      event.preventDefault();
      event.stopPropagation();
      consumedSwipeRef.current = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (shouldIgnoreSwipeStart(event.target)) return;
      consumedSwipeRef.current = false;
      swipeRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        pointerId: event.pointerId,
        tracking: true,
        axis: "none"
      };
      stage.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const swipe = swipeRef.current;
      if (!swipe?.tracking || swipe.pointerId !== event.pointerId) return;

      const deltaX = event.clientX - swipe.startX;
      const deltaY = event.clientY - swipe.startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (swipe.axis === "none") {
        if (absX < AXIS_LOCK_PX && absY < AXIS_LOCK_PX) return;
        if (absX > absY * 1.15) swipe.axis = "horizontal";
        else if (absY > absX * 1.15) swipe.axis = "vertical";
        else return;
      }

      if (swipe.axis === "vertical") {
        swipe.tracking = false;
        return;
      }

      if (swipe.axis === "horizontal") {
        event.preventDefault();
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      const swipe = swipeRef.current;
      if (!swipe || swipe.pointerId !== event.pointerId) {
        clearSwipe();
        return;
      }
      clearSwipe();

      if (!swipe.tracking || swipe.axis !== "horizontal") return;

      const deltaX = event.clientX - swipe.startX;
      const deltaY = event.clientY - swipe.startY;
      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;
      if (Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

      consumedSwipeRef.current = true;

      const isRtl = document.documentElement.dir === "rtl";
      if (isRtl) {
        if (deltaX > 0) onNext();
        else onPrev();
      } else {
        if (deltaX < 0) onNext();
        else onPrev();
      }
    };

    stage.addEventListener("click", onClickCapture, true);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove, { passive: false });
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);

    return () => {
      stage.removeEventListener("click", onClickCapture, true);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
    };
  }, [enabled, onNext, onPrev, stageRef]);
}
