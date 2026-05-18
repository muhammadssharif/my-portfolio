"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";
import { getIsRtl } from "@/lib/document-direction";
import { useSwipeNavigation } from "@/lib/use-swipe-navigation";
import { useViewportDeckScrollLock } from "@/lib/use-viewport-deck-scroll-lock";

export type DemoFlowStep = {
  id: string;
  image: string;
  label: string;
  description: string;
};

type DemoFlowGalleryProps = {
  steps: readonly DemoFlowStep[];
  ariaLabel: string;
  intro?: ReactNode;
  footnote?: ReactNode;
};

function DemoFlowStepList({
  steps,
  activeIndex,
  onSelect
}: {
  steps: readonly DemoFlowStep[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const t = useTranslations("demos");
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[aria-current="step"]');
    active?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeIndex]);

  return (
    <nav className="demo-flow-steps" aria-label={t("flowStepsLabel")}>
      <ol ref={listRef} className="demo-flow-steps-list">
        {steps.map((step, stepIndex) => {
          const isActive = stepIndex === activeIndex;
          return (
            <li key={step.id}>
              <button
                type="button"
                className={`demo-flow-step-btn${isActive ? " demo-flow-step-btn-active" : ""}`}
                onClick={() => onSelect(stepIndex)}
                aria-current={isActive ? "step" : undefined}
              >
                <span className="demo-flow-step-btn-num" aria-hidden>
                  {String(stepIndex + 1).padStart(2, "0")}
                </span>
                <span className="demo-flow-step-btn-label">{step.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function DemoFlowGallery({ steps, ariaLabel, intro, footnote }: DemoFlowGalleryProps) {
  const t = useTranslations("demos");
  const deckT = useTranslations("viewportDeck");
  const [index, setIndex] = useState(0);
  const galleryRef = useRef<HTMLElement>(null);
  const hashSyncedRef = useRef(false);
  const lastHashRef = useRef<string | null>(null);

  const total = steps.length;
  const step = steps[index];

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const wrapped = ((nextIndex % total) + total) % total;
      setIndex((prev) => (prev === wrapped ? prev : wrapped));
    },
    [total]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useViewportDeckScrollLock(true);
  useSwipeNavigation(galleryRef, { onPrev: goPrev, onNext: goNext });

  useEffect(() => {
    if (hashSyncedRef.current) return;
    hashSyncedRef.current = true;

    const hashId = window.location.hash.replace(/^#/, "");
    if (!hashId) return;
    const hashIndex = steps.findIndex((s) => s.id === hashId || s.id.startsWith(`${hashId}-`));
    if (hashIndex >= 0) setIndex(hashIndex);
  }, [steps]);

  useEffect(() => {
    if (!step) return;
    if (lastHashRef.current === step.id) return;
    lastHashRef.current = step.id;
    const nextUrl = `${window.location.pathname}${window.location.search}#${step.id}`;
    window.history.replaceState(null, "", nextUrl);
  }, [step]);

  useEffect(() => {
    const stage = galleryRef.current?.querySelector<HTMLElement>(".demo-flow-stage");
    if (!stage) return;

    const desktopMedia = window.matchMedia("(min-width: 900px)");
    const onWheel = (event: WheelEvent) => {
      if (!desktopMedia.matches) return;
      if (wheelLock) return;
      if (Math.abs(event.deltaY) < 28 && Math.abs(event.deltaX) < 28) return;
      event.preventDefault();
      wheelLock = true;
      if (event.deltaY > 0 || event.deltaX > 0) goNext();
      else goPrev();
      window.setTimeout(() => {
        wheelLock = false;
      }, 420);
    };

    let wheelLock = false;
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

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
      const isRtl = getIsRtl();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (isRtl) goNext();
        else goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (isRtl) goPrev();
        else goNext();
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

  if (!step || total === 0) return null;

  const isRtl = getIsRtl();
  const PrevIcon = isRtl ? IconChevronRight : IconChevronLeft;
  const NextIcon = isRtl ? IconChevronLeft : IconChevronRight;

  return (
    <section ref={galleryRef} className="demo-flow-gallery demo-flow-swipe-surface" aria-label={ariaLabel}>
      <div className="demo-flow-copy">
        {intro}
        <div className="demo-flow-detail">
          <p className="demo-flow-detail-meta">{t("flowStep", { current: index + 1, total })}</p>
          <h2 className="demo-flow-detail-title">{step.label}</h2>
          <p className="demo-flow-detail-description">{step.description}</p>

          <div className="demo-flow-nav">
            <button type="button" className="viewport-deck-nav-btn" onClick={goPrev} aria-label={deckT("prev")}>
              <PrevIcon size={18} />
            </button>
            <span className="demo-flow-nav-counter">{deckT("counter", { current: index + 1, total })}</span>
            <button type="button" className="viewport-deck-nav-btn" onClick={goNext} aria-label={deckT("next")}>
              <NextIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="demo-flow-mobile-nav" aria-label={deckT("jumpTo")}>
        <button type="button" className="viewport-deck-nav-btn" onClick={goPrev} aria-label={deckT("prev")}>
          <PrevIcon size={18} />
        </button>
        <div className="viewport-deck-dots" role="tablist" aria-label={deckT("jumpTo")}>
          {steps.map((flowStep, stepIndex) => (
            <button
              key={flowStep.id}
              type="button"
              role="tab"
              aria-selected={stepIndex === index}
              className={`viewport-deck-dot ${stepIndex === index ? "viewport-deck-dot-active" : ""}`}
              onClick={() => goTo(stepIndex)}
              aria-label={deckT("goTo", { label: flowStep.label })}
            />
          ))}
        </div>
        <button type="button" className="viewport-deck-nav-btn" onClick={goNext} aria-label={deckT("next")}>
          <NextIcon size={18} />
        </button>
      </div>

      <div className="demo-flow-visual">
        <div className="demo-flow-main">
          <main className="demo-flow-stage" tabIndex={0} aria-live="polite">
            <figure className="demo-flow-figure">
              <div className="demo-screenshot-frame">
                <Image
                  key={step.id}
                  src={step.image}
                  alt={step.label}
                  width={1024}
                  height={510}
                  className="demo-screenshot-image"
                  sizes="(min-width: 900px) min(70vw, 100vw), 100vw"
                  priority={index === 0}
                />
              </div>
            </figure>
            <p className="demo-flow-stage-hint demo-flow-stage-hint--desktop">{deckT("hintHorizontal")}</p>
            <p className="demo-flow-stage-hint demo-flow-stage-hint--touch">{deckT("hintTouch")}</p>
          </main>

          {footnote ? <div className="demo-flow-footnote">{footnote}</div> : null}
        </div>

        <aside className="demo-flow-aside">
          <DemoFlowStepList steps={steps} activeIndex={index} onSelect={goTo} />
        </aside>
      </div>
    </section>
  );
}
