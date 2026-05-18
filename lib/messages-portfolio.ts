import { getTranslations } from "next-intl/server";
import { siteContent } from "@/content/portfolio";
import { buildCaseStudies, buildImpactMetrics, type PortfolioMessages } from "@/lib/portfolio-content";

export async function getPortfolioMessages(): Promise<PortfolioMessages> {
  const t = await getTranslations();

  const impactMetrics = Object.fromEntries(
    siteContent.impactMetrics.map((metric) => [
      metric.id,
      {
        headline: t(`impactMetrics.${metric.id}.headline`),
        story: t(`impactMetrics.${metric.id}.story`),
        proofChips: t.raw(`impactMetrics.${metric.id}.proofChips`) as string[]
      }
    ])
  );

  const caseStudies = Object.fromEntries(
    siteContent.caseStudies.map((study) => [
      study.id,
      {
        title: t(`caseStudies.${study.id}.title`),
        company: t(`caseStudies.${study.id}.company`),
        period: t(`caseStudies.${study.id}.period`),
        context: t(`caseStudies.${study.id}.context`),
        constraint: t(`caseStudies.${study.id}.constraint`),
        built: t.raw(`caseStudies.${study.id}.built`) as string[],
        metrics: t.raw(`caseStudies.${study.id}.metrics`) as string[]
      }
    ])
  );

  return {
    site: {
      shortName: t("site.shortName"),
      location: t("site.location"),
      headline: t("site.headline"),
      bio: t.raw("site.bio") as string[]
    },
    impactMetrics,
    caseStudies
  };
}

export async function getLocalizedPortfolio() {
  const messages = await getPortfolioMessages();
  return {
    site: messages.site,
    impactMetrics: buildImpactMetrics(messages),
    caseStudies: buildCaseStudies(messages)
  };
}
