import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
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
    <div className="space-y-10 py-4 md:space-y-12 md:py-8">
      <header className="max-w-3xl space-y-4">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
          <span className="block text-[var(--muted)]">{t("titleMuted")}</span>
        </h1>
        <p className="text-lg leading-relaxed text-[var(--muted)]">{t("intro")}</p>
      </header>

      <div className="space-y-6">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </div>
  );
}
