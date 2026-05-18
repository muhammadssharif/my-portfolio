"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getDemoForCaseStudy } from "@/content/demos";
import type { CaseStudy } from "@/content/portfolio";
import { IconArrowUpRight } from "@/components/ui/icons";
import { VerticalMarquee } from "@/components/ui/VerticalMarquee";
import { getTechBrandColor } from "@/lib/tech-brand";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const t = useTranslations("work");
  const demosT = useTranslations("demos");
  const demo = getDemoForCaseStudy(study.id);

  return (
    <article
      className="case-study-card viewport-deck-card surface-panel"
      data-study={study.id}
      data-swipe-surface
    >
      <div className="case-study-card-glow" aria-hidden />

      <header className="case-study-card-header">
        <div className="case-study-card-identity">
          <p className="case-study-company">{study.company}</p>
          <h2 className="case-study-title">{study.title}</h2>
        </div>
        <div className="case-study-card-meta">
          <span className="case-study-period">{study.period}</span>
          {demo ? (
            <Link href={`/demos/${demo.slug}`} className="case-study-flow-cta">
              {demosT("viewFlow")}
              <IconArrowUpRight size={15} />
            </Link>
          ) : null}
        </div>
      </header>

      <div className="case-study-card-body">
        <div className="case-study-card-narrative">
          <section className="case-study-block">
            <h3 className="case-study-block-label">{t("context")}</h3>
            <p className="case-study-block-text">{study.context}</p>
          </section>
          <section className="case-study-block case-study-block-constraint">
            <h3 className="case-study-block-label">{t("constraint")}</h3>
            <p className="case-study-block-text">{study.constraint}</p>
          </section>
        </div>

        {/*
          data-marquee-bound: flex height cap for VerticalMarquee.measure().
          Safari flex children default to min-height:auto and grow instead of
          clipping; pairing this with min-height:0 in globals.css enables overflow.
        */}
        <div className="case-study-card-outcomes" data-marquee-bound>
          <VerticalMarquee
            aria-label={t("slideOutcomes")}
            className="case-study-outcomes-marquee"
            scrollSpeed={18}
          >
            <div className="case-study-outcomes-scroll">
              <section className="case-study-metrics">
                <h3 className="case-study-block-label">{t("proof")}</h3>
                <ul className="case-study-metrics-list">
                  {study.metrics.map((metric) => (
                    <li key={metric}>
                      <MetricTile metric={metric} />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="case-study-built">
                <h3 className="case-study-block-label">{t("built")}</h3>
                <ul className="case-study-built-list">
                  {study.built.map((item, index) => (
                    <li key={item}>
                      <span className="case-study-built-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="case-study-built-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="case-study-stack-section">
                <h3 className="case-study-block-label">{t("stack")}</h3>
                <ul className="case-study-stack">
                  {study.stack.map((tech) => (
                    <li
                      key={tech}
                      style={{ "--tech-brand": getTechBrandColor(tech) } as React.CSSProperties}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </VerticalMarquee>
        </div>
      </div>
    </article>
  );
}

function MetricTile({ metric }: { metric: string }) {
  const arrowIndex = metric.indexOf("->");
  const hasArrow = arrowIndex !== -1;
  const head = hasArrow ? metric.slice(0, arrowIndex).trim() : metric;
  const tail = hasArrow ? metric.slice(arrowIndex + 2).trim() : null;

  return (
    <div className="case-study-metric">
      <span className="case-study-metric-value">{head}</span>
      {tail ? <span className="case-study-metric-detail">{tail}</span> : null}
    </div>
  );
}
