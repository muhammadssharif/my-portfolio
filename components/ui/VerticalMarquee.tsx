"use client";

/**
 * Vertical outcomes marquee for case-study cards (work page).
 *
 * Motion model (transform-offset, not scroll-port):
 * - Auto-play: rAF advances `offsetPx`, applied as translate3d on the track.
 * - Manual: wheel / keyboard nudge the same offset while paused.
 * - Loop: duplicate sequence in DOM; wrap offset modulo one sequence height.
 *
 * Why not scrollTop + overflow:auto on the clip?
 * - Safari flex + nested scroll often fails to clip (min-height:auto on flex items).
 * - mask-image on a scrolling container repaints poorly in WebKit.
 * - A prior scroll-port attempt also paused on every scroll event (including rAF).
 *
 * Safari-specific hooks in this file:
 * - Pin clip height from [data-marquee-bound] parent (see measure).
 * - Double rAF remeasure when active flips on (layout settle).
 * - fonts.ready + ResizeObserver + pageshow(bfcache) + safari-presentation-refresh.
 * - translate3d (not % transforms) for loop distance — Safari miscomputes % on flex tracks.
 *
 * @see lib/nested-scroll-wheel.ts — deck wheel deferral at marquee boundaries
 * @see lib/safari-compat.ts — dispatches safari-presentation-refresh
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
  type WheelEvent
} from "react";
import {
  registerMarqueeWheelController,
  unregisterMarqueeWheelController
} from "@/lib/nested-scroll-wheel";

/** Parent flex cap; must match CaseStudyCard outcomes wrapper. */
const MARQUEE_BOUND_ATTR = "data-marquee-bound";

/** Matches .case-study-card-body stack breakpoint in globals.css */
const STACKED_LAYOUT_MQ = "(max-width: 899px)";

type VerticalMarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Pixels advanced per second when auto-playing (transform offset). */
  scrollSpeed?: number;
  /** Idle time after manual wheel before auto-play resumes (unless hovered). */
  wheelResumeMs?: number;
  "aria-label"?: string;
};

export function VerticalMarquee({
  children,
  className = "",
  scrollSpeed = 22,
  wheelResumeMs = 1800,
  "aria-label": ariaLabel
}: VerticalMarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);

  /** Single source of truth for vertical position (px), modulo one sequence height. */
  const offsetPxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isStackedLayout, setIsStackedLayout] = useState(false);

  const hoveredRef = useRef(false);
  const wheelResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const syncPaused = useCallback((next: boolean) => {
    setPaused(next);
  }, []);

  const getLoopHeight = useCallback(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return 0;
    // offsetHeight (not %) — stable loop distance in Safari flex layouts.
    return sequence.offsetHeight;
  }, []);

  /** Wrap offset into [0, loopHeight) for seamless duplicate-sequence loop. */
  const normalizeOffset = useCallback(() => {
    const loopHeight = getLoopHeight();
    if (loopHeight <= 0) return;
    let offset = offsetPxRef.current;
    while (offset >= loopHeight) offset -= loopHeight;
    while (offset < 0) offset += loopHeight;
    offsetPxRef.current = offset;
  }, [getLoopHeight]);

  /** GPU-friendly transform; clip stays overflow:hidden with mask in CSS. */
  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(0, ${-offsetPxRef.current}px, 0)`;
  }, []);

  /**
   * Used by ViewportDeck (via nested-scroll-wheel) and local wheel handler.
   * At boundaries returns false so wheel bubbles and the deck can change slides.
   */
  const canConsumeWheel = useCallback(
    (deltaY: number) => {
      if (!active) return false;

      // Reduced motion: native overflow-y on clip (see .vertical-marquee--static).
      if (reducedMotion) {
        const clip = clipRef.current;
        if (!clip) return false;
        const { scrollTop, scrollHeight, clientHeight } = clip;
        if (deltaY > 0) return scrollTop + clientHeight < scrollHeight - 1;
        if (deltaY < 0) return scrollTop > 1;
        return false;
      }

      const loopHeight = getLoopHeight();
      if (loopHeight < 1) return false;
      const offset = offsetPxRef.current;
      if (deltaY > 0) return offset < loopHeight - 1;
      if (deltaY < 0) return offset > 1;
      return false;
    },
    [active, reducedMotion, getLoopHeight]
  );

  const nudgeOffset = useCallback(
    (delta: number) => {
      offsetPxRef.current += delta;
      normalizeOffset();
      applyTransform();
    },
    [normalizeOffset, applyTransform]
  );

  /**
   * Decide if marquee should run and pin clip height to the bound parent.
   * Safari: without explicit height on the clip, overflow:hidden clips zero visible area.
   */
  const measure = useCallback(() => {
    const clip = clipRef.current;
    const sequence = sequenceRef.current;
    if (!clip || !sequence) return;

    if (window.matchMedia(STACKED_LAYOUT_MQ).matches) {
      clip.style.removeProperty("height");
      clip.style.removeProperty("max-height");
      offsetPxRef.current = 0;
      const track = trackRef.current;
      if (track) track.style.removeProperty("transform");
      setActive(false);
      return;
    }

    const boundEl = clip.closest<HTMLElement>(`[${MARQUEE_BOUND_ATTR}]`);
    const boundHeight = boundEl?.clientHeight ?? clip.parentElement?.clientHeight ?? 0;
    if (boundHeight < 8) return;

    const sequenceHeight = sequence.offsetHeight;
    const overflows = sequenceHeight > boundHeight + 2;

    if (boundEl && overflows) {
      clip.style.height = `${boundHeight}px`;
      clip.style.maxHeight = `${boundHeight}px`;
    } else {
      clip.style.removeProperty("height");
      clip.style.removeProperty("max-height");
    }

    setActive(overflows);
    if (!overflows) {
      offsetPxRef.current = 0;
      applyTransform();
    }
  }, [applyTransform]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    return () => media.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(STACKED_LAYOUT_MQ);
    const updateStacked = () => {
      setIsStackedLayout(media.matches);
      measure();
    };
    updateStacked();
    media.addEventListener("change", updateStacked);
    return () => media.removeEventListener("change", updateStacked);
  }, [measure]);

  useEffect(() => {
    const runMeasure = () => {
      measure();
      // Safari: first layout pass after font/grid settle can read wrong heights.
      requestAnimationFrame(measure);
    };

    runMeasure();

    const clip = clipRef.current;
    const sequence = sequenceRef.current;
    const bound = clip?.closest<HTMLElement>(`[${MARQUEE_BOUND_ATTR}]`);
    if (!clip || !sequence) return;

    const observer = new ResizeObserver(runMeasure);
    observer.observe(clip);
    observer.observe(sequence);
    if (bound) observer.observe(bound);
    const parent = clip.parentElement;
    if (parent) observer.observe(parent);

    document.fonts?.ready.then(runMeasure).catch(() => undefined);

    // Safari bfcache: restored pages keep stale layout until remeasured.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) runMeasure();
    };
    // Fired from lib/safari-compat after theme/animation refresh on WebKit.
    const onSafariRefresh = () => runMeasure();
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("safari-presentation-refresh", onSafariRefresh);

    return () => {
      observer.disconnect();
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("safari-presentation-refresh", onSafariRefresh);
    };
  }, [measure, children]);

  // Safari: active flip often needs one extra frame before clientHeight is trustworthy.
  useEffect(() => {
    if (!active) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(measure));
    return () => cancelAnimationFrame(id);
  }, [active, measure]);

  // Static / inactive: clear transform so reduced-motion native scroll is not offset.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (!active || reducedMotion || isStackedLayout) {
      track.style.removeProperty("transform");
      offsetPxRef.current = 0;
    } else {
      applyTransform();
    }
  }, [active, reducedMotion, isStackedLayout, applyTransform]);

  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTimeRef.current = null;

    if (!active || reducedMotion || paused) return;

    const tick = (time: number) => {
      const last = lastTimeRef.current ?? time;
      lastTimeRef.current = time;
      const deltaSec = (time - last) / 1000;
      offsetPxRef.current += scrollSpeed * deltaSec;
      normalizeOffset();
      applyTransform();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [active, paused, reducedMotion, scrollSpeed, normalizeOffset, applyTransform]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    registerMarqueeWheelController(root, { canConsumeWheel });
    return () => unregisterMarqueeWheelController(root);
  }, [canConsumeWheel]);

  const pause = useCallback(() => syncPaused(true), [syncPaused]);

  const resume = useCallback(() => {
    if (wheelResumeTimerRef.current) {
      clearTimeout(wheelResumeTimerRef.current);
      wheelResumeTimerRef.current = null;
    }
    syncPaused(false);
  }, [syncPaused]);

  const scheduleResumeAfterWheel = useCallback(() => {
    if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current);
    wheelResumeTimerRef.current = setTimeout(() => {
      wheelResumeTimerRef.current = null;
      if (!hoveredRef.current) syncPaused(false);
    }, wheelResumeMs);
  }, [syncPaused, wheelResumeMs]);

  const onWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!active) return;

      const delta = event.deltaY;
      if (!canConsumeWheel(delta)) return;

      // Only stop propagation when we consume — at boundaries deck may navigate.
      event.stopPropagation();

      if (reducedMotion) return;

      syncPaused(true);
      nudgeOffset(delta);
      scheduleResumeAfterWheel();
    },
    [active, reducedMotion, canConsumeWheel, nudgeOffset, scheduleResumeAfterWheel, syncPaused]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!active || reducedMotion) return;

      const step = event.key === "PageDown" || event.key === "PageUp" ? 80 : 24;
      let delta = 0;
      if (event.key === "ArrowDown" || event.key === "PageDown") delta = step;
      else if (event.key === "ArrowUp" || event.key === "PageUp") delta = -step;
      else return;

      if (!canConsumeWheel(delta)) return;

      event.preventDefault();
      syncPaused(true);
      nudgeOffset(delta);
      scheduleResumeAfterWheel();
    },
    [active, reducedMotion, canConsumeWheel, nudgeOffset, scheduleResumeAfterWheel, syncPaused]
  );

  useEffect(() => {
    const clip = clipRef.current;
    if (!clip || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) measure();
      },
      { threshold: 0.15 }
    );
    observer.observe(clip);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    return () => {
      if (wheelResumeTimerRef.current) clearTimeout(wheelResumeTimerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isStatic = isStackedLayout || reducedMotion || !active;

  const stateClass = [
    active && !isStackedLayout ? "vertical-marquee--active" : "",
    paused ? "vertical-marquee--paused" : "",
    isStatic ? "vertical-marquee--static" : "",
    isStackedLayout ? "vertical-marquee--stacked" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={`vertical-marquee ${stateClass} ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
      data-marquee-root
      onMouseEnter={
        active && !reducedMotion
          ? () => {
              hoveredRef.current = true;
              pause();
            }
          : undefined
      }
      onMouseLeave={
        active && !reducedMotion
          ? () => {
              hoveredRef.current = false;
              resume();
            }
          : undefined
      }
      onFocusCapture={active ? pause : undefined}
      onBlurCapture={(event) => {
        if (!active) return;
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
        resume();
      }}
    >
      <div
        ref={clipRef}
        className="vertical-marquee-clip"
        tabIndex={active && !reducedMotion ? 0 : -1}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
      >
        <div ref={trackRef} className="vertical-marquee-track">
          <div ref={sequenceRef} className="vertical-marquee-sequence" data-marquee-sequence>
            {children}
          </div>
          {active && !reducedMotion && !isStackedLayout ? (
            <div className="vertical-marquee-sequence" aria-hidden="true">
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
