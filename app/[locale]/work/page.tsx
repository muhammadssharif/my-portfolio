import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CaseStudyDeck } from "@/components/work/CaseStudyDeck";
import { getLocalizedPortfolio } from "@/lib/messages-portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("workTitle"),
    description: t("workDescription")
  };
}

export default async function WorkPage() {
  const t = await getTranslations("work");
  const { caseStudies } = await getLocalizedPortfolio();

  return (
    <div className="viewport-page viewport-page--immersive cosmic-occlude">
      <header className="viewport-page-intro viewport-page-intro--compact max-w-3xl space-y-1.5 phone-lg:space-y-2">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          <span className="display-title__line">{t("title")}</span>
          <span className="display-title__line text-[var(--muted)]">{t("titleMuted")}</span>
        </h1>
        <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">{t("intro")}</p>
      </header>

      <CaseStudyDeck studies={caseStudies} />
    </div>
  );
}
