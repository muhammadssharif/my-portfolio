"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/content/portfolio";
import { Marquee } from "@/components/ui/Marquee";
import { ProjectPreviewCard } from "@/components/home/ProjectPreviewCard";
import { IconArrowUpRight } from "@/components/ui/icons";

type SelectedWorkCarouselProps = {
  studies: readonly CaseStudy[];
  className?: string;
};

export function SelectedWorkCarousel({ studies, className = "" }: SelectedWorkCarouselProps) {
  const t = useTranslations("home");

  const cards = studies.map((study) => <ProjectPreviewCard key={study.id} study={study} />);

  return (
    <section className={`space-y-4 ${className}`.trim()} aria-label={t("recentCaseStudies")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="eyebrow">{t("selectedEngineeringWork")}</p>
          <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">{t("recentCaseStudies")}</h2>
        </div>
        <Link href="/work" className="btn btn-secondary inline-flex w-fit items-center gap-2 text-sm">
          {t("seeAll")}
          <IconArrowUpRight size={16} />
        </Link>
      </div>

      <Marquee durationSec={42} aria-label={t("workMarqueeLabel")} className="home-marquee-fade -mx-4 md:-mx-8">
        {cards}
      </Marquee>
    </section>
  );
}
