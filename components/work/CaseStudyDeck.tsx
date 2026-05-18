"use client";

import type { CaseStudy } from "@/content/portfolio";
import { ViewportDeck } from "@/components/ui/ViewportDeck";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { useMinWidth } from "@/hooks/useMinWidth";

type CaseStudyDeckProps = {
  studies: readonly CaseStudy[];
};

export function CaseStudyDeck({ studies }: CaseStudyDeckProps) {
  const isDesktop = useMinWidth("(min-width: 48rem)");
  const slides = studies.map((study) => ({
    id: study.id,
    label: study.title,
    content: <CaseStudyCard study={study} />
  }));

  return (
    <ViewportDeck
      axis="horizontal"
      mode="single"
      slides={slides}
      lockPageScroll={isDesktop}
      scrollToSlideOnNavigate
      className="case-study-deck"
    />
  );
}
