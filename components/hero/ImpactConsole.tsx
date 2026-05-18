"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ImpactMetric } from "@/content/portfolio";
import { IconChevronLeft, IconChevronRight } from "@/components/ui/icons";

const PANEL_CLASS =
  "impact-console-panel relative flex min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-[var(--border)] p-5 shadow-[var(--impact-console-shadow)] md:min-h-[18rem] md:p-6";

type ImpactConsoleProps = {
  metrics: readonly ImpactMetric[];
};

export function ImpactConsole({ metrics }: ImpactConsoleProps) {
  const t = useTranslations("impactConsole");
  const [activeIndex, setActiveIndex] = useState(0);
  const [pauseUser, setPauseUser] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  const activeMetric = metrics[activeIndex] ?? metrics[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;
    const onChange = () => {
      prefersReducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const cycle = useCallback(
    (direction: "next" | "prev") => {
      if (metrics.length === 0) return;
      if (direction === "next") {
        setActiveIndex((index) => (index + 1) % metrics.length);
        return;
      }
      setActiveIndex((index) => (index - 1 + metrics.length) % metrics.length);
    },
    [metrics.length]
  );

  useEffect(() => {
    if (prefersReducedMotionRef.current || pauseUser || metrics.length <= 1) return;
    const interval = window.setInterval(() => cycle("next"), 8000);
    return () => window.clearInterval(interval);
  }, [cycle, metrics.length, pauseUser]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      cycle("next");
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      cycle("prev");
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPauseUser(true)}
      onMouseLeave={() => setPauseUser(false)}
      onFocus={() => setPauseUser(true)}
      onBlur={() => setPauseUser(false)}
      aria-label={t("ariaLabel")}
      className="impact-console outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    >
      <div className={PANEL_CLASS}>
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,var(--accent-glow),transparent_55%)] opacity-80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.35] [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:24px_24px]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-4">
          <div className="impact-console-header flex items-start justify-between gap-4">
            <p className="eyebrow pt-1">{t("title")}</p>
            {activeMetric ? (
              <span className="impact-console-stat-badge impact-console-stat-badge-lg shrink-0">
                {activeMetric.stat}
              </span>
            ) : null}
          </div>

          {activeMetric ? (
            <Link
              href={`/work#${activeMetric.caseStudy}`}
              /* overflow-visible (not hidden): the panel itself already clips with
                 rounded corners + overflow-hidden, and clipping here was cutting
                 the descenders (g/p/y) off the headline at the bottom of the row. */
              className="impact-console-story group relative flex min-h-0 flex-1 flex-col overflow-visible p-1 transition hover:bg-[color:color-mix(in_srgb,var(--accent)_6%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label={`${activeMetric.headline} — ${t("viewCaseStudy")}`}
            >
              <div className="flex min-h-0 flex-1 flex-col gap-3">
                <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-[var(--text)] pb-[0.05em] transition group-hover:text-[var(--accent)] md:text-xl">
                  {activeMetric.headline}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">{activeMetric.story}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {activeMetric.proofChips.map((chip) => (
                    <span key={chip} className="impact-console-chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ) : null}

          <div className="flex shrink-0 items-center gap-2 border-t border-[color:color-mix(in_srgb,var(--border)_70%,transparent)] pt-3">
            <button type="button" onClick={() => cycle("prev")} className="icon-btn icon-btn-sm" aria-label={t("prev")} disabled={metrics.length <= 1}>
              <IconChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => cycle("next")} className="icon-btn icon-btn-sm" aria-label={t("next")} disabled={metrics.length <= 1}>
              <IconChevronRight size={16} />
            </button>
            <div className="ml-1 flex gap-1.5" aria-hidden>
              {metrics.map((m, i) => (
                <span key={m.id} className="impact-console-dot" data-active={i === activeIndex} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
