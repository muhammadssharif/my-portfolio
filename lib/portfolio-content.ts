import type { CaseStudy, ImpactMetric } from "@/content/portfolio";
import { siteContent } from "@/content/portfolio";

type ImpactMetricMessages = Record<string, { headline: string; story: string; proofChips: string[] }>;
type CaseStudyMessages = Record<
  string,
  {
    title: string;
    company: string;
    period: string;
    context: string;
    constraint: string;
    built: string[];
    metrics: string[];
  }
>;

export type PortfolioMessages = {
  site: {
    shortName: string;
    location: string;
    headline: string;
    bio: string[];
  };
  impactMetrics: ImpactMetricMessages;
  caseStudies: CaseStudyMessages;
};

export function buildImpactMetrics(messages: PortfolioMessages): ImpactMetric[] {
  return siteContent.impactMetrics.map((metric) => {
    const translated = messages.impactMetrics[metric.id];
    return {
      ...metric,
      headline: translated?.headline ?? metric.headline,
      story: translated?.story ?? metric.story,
      proofChips: translated?.proofChips ?? [...metric.proofChips]
    };
  });
}

export function buildCaseStudies(messages: PortfolioMessages): CaseStudy[] {
  return siteContent.caseStudies.map((study) => {
    const translated = messages.caseStudies[study.id];
    if (!translated) return study;
    return {
      ...study,
      title: translated.title,
      company: translated.company,
      period: translated.period,
      context: translated.context,
      constraint: translated.constraint,
      built: translated.built,
      metrics: translated.metrics
    };
  });
}

export function getHeadlineParts(headline: string) {
  return headline.split(" | ");
}
