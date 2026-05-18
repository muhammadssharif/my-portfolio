"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";
import { shouldDeferWheelToNestedScroll } from "@/lib/nested-scroll-wheel";
import { useSwipeNavigation } from "@/lib/use-swipe-navigation";
import { useViewportDeckScrollLock } from "@/lib/use-viewport-deck-scroll-lock";

export type ViewportDeckSlide = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type ViewportDeckAxis = "vertical" | "horizontal";

/** carousel = transform track (demos index); single = one slide in DOM (flow gallery, Safari-safe) */
type ViewportDeckMode = "carousel" | "single";

type ViewportDeckProps = {
  axis: ViewportDeckAxis;
  slides: readonly ViewportDeckSlide[];
  initialId?: string;
  className?: string;
  /** Overrides default carousel aria-label */
  ariaLabel?: string;
  /** Prevents page scroll while the deck is mounted */
  lockPageScroll?: boolean;
  /** carousel (default) slides on a transform track; single mounts only the active slide */
  mode?: ViewportDeckMode;
  /** Controlled active slide index */
  index?: number;
  onIndexChange?: (index: number) => void;
  /** Rendered between the toolbar and the stage (e.g. flow step rail) */
  middleSlot?: React.ReactNode;
};

export function ViewportDeck({
  axis,
  slides,
  initialId,
  className = "",
  ariaLabel,
  lockPageScroll = false,
  mode = "carousel",
  index: controlledIndex,
  onIndexChange,
  middleSlot
}: ViewportDeckProps) {
  const t = useTranslations("viewportDeck");
  const deckId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const hashSyncedRef = useRef(false);
  const [uncontrolledIndex, setUncontrolledIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const isControlled = controlledIndex !== undefined;
  const index = isControlled ? controlledIndex : uncontrolledIndex;

  const total = slides.length;
  const current = slides[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const wrapped = ((nextIndex % total) + total) % total;
      if (wrapped === index) return;
      if (isControlled) onIndexChange?.(wrapped);
      else setUncontrolledIndex(wrapped);
    },
    [index, isControlled, onIndexChange, total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  useEffect(() => {
    setMounted(true);
    if (hashSyncedRef.current) return;
    hashSyncedRef.current = true;

    const hashId = window.location.hash.replace(/^#/, "");
    const fromHash = hashId || initialId;
    if (!fromHash) return;
    const hashIndex = slides.findIndex(
      (slide) => slide.id === fromHash || slide.id.startsWith(`${fromHash}-`)
    );
    if (hashIndex >= 0) goToRef.current(hashIndex);
  }, [initialId, slides]);

  useViewportDeckScrollLock(lockPageScroll);
  useSwipeNavigation(stageRef, {
    onPrev: goPrev,
    onNext: goNext,
    enabled: axis === "horizontal"
  });

  useEffect(() => {
    if (!mounted) return;
    stageRef.current?.focus({ preventScroll: true });
  }, [mounted]);

  const lastHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (!mounted || !current) return;
    if (lastHashRef.current === current.id) return;
    lastHashRef.current = current.id;
    const nextUrl = `${window.location.pathname}${window.location.search}#${current.id}`;
    window.history.replaceState(null, "", nextUrl);
  }, [current?.id, mounted]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let wheelLock = false;
    const onWheel = (event: WheelEvent) => {
      if (wheelLock) return;
      const delta = axis === "vertical" ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 28) return;
      // Let nested VerticalMarquee consume wheel until top/bottom (Safari + Chrome).
      if (shouldDeferWheelToNestedScroll(event.target, event.deltaY)) return;
      event.preventDefault();
      wheelLock = true;
      if (delta > 0) goNext();
      else goPrev();
      window.setTimeout(() => {
        wheelLock = false;
      }, 420);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [axis, goNext, goPrev]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, button, a[href], [contenteditable='true']")
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(total - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev, goTo, total]);

  if (total === 0 || !current) return null;

  const PrevIcon = IconChevronLeft;
  const NextIcon = IconChevronRight;
  const hint = axis === "vertical" ? t("hintVertical") : t("hintHorizontal");
  const stageControlId = mode === "single" ? `${deckId}-slide-${current.id}` : `${deckId}-track`;

  return (
    <section
      className={`viewport-deck cosmic-occlude ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={ariaLabel ?? t("label")}
      data-axis={axis}
      data-mode={mode}
    >
      <div className="viewport-deck-toolbar" aria-live="polite">
        <p className="viewport-deck-counter">
          <span className="sr-only">{t("position")}</span>
          {t("counter", { current: index + 1, total })}
          <span className="viewport-deck-counter-sep" aria-hidden>
            ·
          </span>
          <span className="viewport-deck-active-label">{current.label}</span>
        </p>
        <p className="viewport-deck-hint viewport-deck-hint--desktop">{hint}</p>
        <p className="viewport-deck-hint viewport-deck-hint--touch">{t("hintTouch")}</p>
        <div className="viewport-deck-nav">
          <button
            type="button"
            className="viewport-deck-nav-btn"
            onClick={goPrev}
            aria-label={t("prev")}
            aria-controls={stageControlId}
          >
            <PrevIcon size={18} />
          </button>
          <div className="viewport-deck-dots" role="tablist" aria-label={t("jumpTo")}>
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-controls={`${deckId}-slide-${slide.id}`}
                className={`viewport-deck-dot ${slideIndex === index ? "viewport-deck-dot-active" : ""}`}
                onClick={() => goTo(slideIndex)}
                aria-label={t("goTo", { label: slide.label })}
              />
            ))}
          </div>
          <button
            type="button"
            className="viewport-deck-nav-btn"
            onClick={goNext}
            aria-label={t("next")}
            aria-controls={stageControlId}
          >
            <NextIcon size={18} />
          </button>
        </div>
      </div>

      {middleSlot ? <div className="viewport-deck-middle">{middleSlot}</div> : null}

      <div ref={stageRef} className="viewport-deck-stage viewport-deck-swipe-surface" tabIndex={0}>
        {mode === "single" ? (
          <article
            key={current.id}
            id={`${deckId}-slide-${current.id}`}
            className="viewport-deck-slide viewport-deck-slide--single"
            data-active
          >
            {current.content}
          </article>
        ) : (
          <div
            id={`${deckId}-track`}
            className="viewport-deck-track"
            style={
              axis === "vertical"
                ? { transform: `translate3d(0, -${index * 100}%, 0)` }
                : {
                    width: "100%",
                    transform: `translate3d(-${index * 100}%, 0, 0)`
                  }
            }
          >
            {slides.map((slide, slideIndex) => (
              <article
                key={slide.id}
                id={`${deckId}-slide-${slide.id}`}
                className="viewport-deck-slide"
                aria-hidden={slideIndex !== index}
                data-active={slideIndex === index}
              >
                {slide.content}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
