"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { IconDownload } from "@/components/ui/icons";
import { siteContent } from "@/content/portfolio";
import { ImpactConsole } from "@/components/hero/ImpactConsole";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { getHeadlineParts } from "@/lib/portfolio-content";
import type { ImpactMetric } from "@/content/portfolio";

export function Hero() {
  const t = useTranslations();
  const headlineParts = getHeadlineParts(t("site.headline"));

  const metrics: ImpactMetric[] = siteContent.impactMetrics.map((metric) => ({
    ...metric,
    headline: t(`impactMetrics.${metric.id}.headline`),
    story: t(`impactMetrics.${metric.id}.story`),
    proofChips: t.raw(`impactMetrics.${metric.id}.proofChips`) as string[]
  }));

  return (
    <motion.section
      variants={staggerContainer}
      initial={false}
      animate="visible"
      className="hero-grid grid grid-cols-1 items-start gap-8 py-2 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-4"
    >
      <motion.div variants={fadeInUp} className="cosmic-occlude order-1 flex flex-col justify-center space-y-4 lg:order-1">
        <p className="eyebrow">{t("hero.eyebrow")}</p>

        <div className="space-y-2">
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
            {t("site.shortName")}
          </h1>
          <p className="max-w-md text-base leading-snug text-[var(--muted)] md:text-[1.05rem]">{t("hero.positioning")}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {headlineParts.map((part) => (
            <span
              key={part}
              className="rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)] px-2.5 py-0.5 text-xs text-[var(--muted)] md:text-sm"
            >
              {part}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href="/resume.pdf" download className="btn btn-primary inline-flex items-center gap-2 text-sm">
            {t("hero.downloadResume")}
            <IconDownload size={18} />
          </a>
        </div>

        <p className="text-xs text-[var(--muted)] md:text-sm">{t("hero.openTo")}</p>
      </motion.div>

      <div className="cosmic-occlude order-2 w-full min-w-0 lg:order-2">
        <ImpactConsole metrics={metrics} />
      </div>
    </motion.section>
  );
}
