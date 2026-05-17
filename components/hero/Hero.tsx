"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IconArrowRight } from "@/components/ui/icons";
import { siteContent } from "@/content/portfolio";
import { ImpactConsole } from "@/components/hero/ImpactConsole";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { getHeadlineParts } from "@/lib/portfolio-content";
import type { ImpactMetric } from "@/content/portfolio";

export function Hero() {
  const t = useTranslations();
  const headlineParts = getHeadlineParts(t("site.headline"));
  const bio = t.raw("site.bio") as string[];

  const metrics: ImpactMetric[] = siteContent.impactMetrics.map((metric) => ({
    ...metric,
    label: t(`impactMetrics.${metric.id}.label`),
    proof: t(`impactMetrics.${metric.id}.proof`)
  }));

  return (
    <motion.section
      variants={staggerContainer}
      initial={false}
      animate="visible"
      className="grid gap-10 py-4 md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:py-10"
    >
      <motion.div variants={fadeInUp} className="cosmic-occlude flex flex-col justify-center space-y-7">
        <div className="space-y-4">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="font-display text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {t("site.shortName")}
          </h1>
          <div className="flex flex-wrap gap-2">
            {headlineParts.map((part) => (
              <span
                key={part}
                className="rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_80%,transparent)] px-3 py-1 text-sm text-[var(--muted)]"
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-xl space-y-3 text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/work" className="btn btn-primary group">
            {t("hero.viewWork")}
            <IconArrowRight size={18} className="transition group-hover:translate-x-0.5" />
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            {t("hero.getInTouch")}
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 border-t border-[var(--border)] pt-6">
          <div>
            <p className="eyebrow mb-1">{t("hero.locationLabel")}</p>
            <p className="text-sm text-[var(--text)]">{t("site.location")}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">{t("hero.availableLabel")}</p>
            <p className="text-sm text-[var(--text)]">{t("hero.availableValue")}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="cosmic-occlude md:pt-4">
        <ImpactConsole metrics={metrics} />
      </motion.div>
    </motion.section>
  );
}
