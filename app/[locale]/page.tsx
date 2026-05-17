import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IconArrowUpRight } from "@/components/ui/icons";
import { Hero } from "@/components/hero/Hero";
import { siteContent } from "@/content/portfolio";
import { getLocalizedPortfolio } from "@/lib/messages-portfolio";

export default async function HomePage() {
  const t = await getTranslations("home");
  const { caseStudies } = await getLocalizedPortfolio();
  const featuredIds = new Set<string>(siteContent.featuredCaseStudies);
  const featured = caseStudies.filter((caseStudy) => featuredIds.has(caseStudy.id));

  return (
    <div className="space-y-20 md:space-y-28">
      <Hero />

      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">{t("selectedWork")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{t("projectsTitle")}</h2>
          </div>
          <Link href="/work" className="btn btn-secondary inline-flex w-fit items-center gap-2">
            {t("seeAll")}
            <IconArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((study) => (
            <Link
              key={study.id}
              href={`/work#${study.id}`}
              className="surface-card group block rounded-2xl p-6 transition-all hover:-translate-y-0.5 md:p-7"
            >
              <p className="eyebrow mb-3">{study.company}</p>
              <h3 className="font-display text-2xl font-semibold tracking-tight transition group-hover:text-[var(--accent)]">
                {study.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{study.constraint}</p>
              <MetricList metrics={study.metrics.slice(0, 2)} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricList({ metrics }: { metrics: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {metrics.map((metric) => (
        <span key={metric} className="metric-pill" data-active={false}>
          {metric}
        </span>
      ))}
    </div>
  );
}
