"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { ImpactMetric } from "@/content/portfolio";
import { IconArrowUpRight, IconChevronLeft, IconChevronRight } from "@/components/ui/icons";

type ImpactConsoleProps = {
  metrics: readonly ImpactMetric[];
};

export function ImpactConsole({ metrics }: ImpactConsoleProps) {
  const t = useTranslations("impactConsole");
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMetric = useMemo(() => metrics[activeIndex], [activeIndex, metrics]);

  const cycle = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveIndex((index) => (index + 1) % metrics.length);
      return;
    }
    setActiveIndex((index) => (index - 1 + metrics.length) % metrics.length);
  };

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
      aria-label={t("ariaLabel")}
      className="surface-card relative overflow-hidden rounded-2xl p-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] md:p-8"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--accent-glow)] blur-3xl"
        aria-hidden
      />

      <div className="relative space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{t("title")}</p>
          <span className="mono text-xs text-[var(--muted)]">
            {activeIndex + 1} / {metrics.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {metrics.map((metric, index) => (
            <button
              key={metric.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="metric-pill"
              data-active={index === activeIndex}
              aria-pressed={index === activeIndex}
            >
              {metric.value}
            </button>
          ))}
        </div>

        <div className="space-y-3 border-t border-[var(--border)] pt-6">
          <p className="impact-value">{activeMetric.value}</p>
          <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{activeMetric.label}</h3>
          <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">{activeMetric.proof}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button type="button" onClick={() => cycle("prev")} className="icon-btn" aria-label={t("prev")}>
            <IconChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => cycle("next")} className="icon-btn" aria-label={t("next")}>
            <IconChevronRight size={18} />
          </button>
          <Link href={`/work#${activeMetric.caseStudy}`} className="btn btn-secondary group ml-auto inline-flex items-center gap-2">
            {t("viewCaseStudy")}
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
