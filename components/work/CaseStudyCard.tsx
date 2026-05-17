import { getTranslations } from "next-intl/server";
import type { CaseStudy } from "@/content/portfolio";

type CaseStudyCardProps = {
  study: CaseStudy;
};

export async function CaseStudyCard({ study }: CaseStudyCardProps) {
  const t = await getTranslations("work");

  return (
    <article id={study.id} className="surface-card scroll-mt-32 rounded-2xl p-6 md:p-8">
      <header className="mb-8 border-b border-[var(--border)] pb-6">
        <p className="eyebrow mb-2">{study.company}</p>
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{study.title}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{study.period}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)]">
          <section>
            <p className="eyebrow mb-2">{t("context")}</p>
            <p className="text-[var(--text)]">{study.context}</p>
          </section>
          <section>
            <p className="eyebrow mb-2">{t("constraint")}</p>
            <p>{study.constraint}</p>
          </section>
          <section>
            <p className="eyebrow mb-3">{t("built")}</p>
            <ul className="space-y-3">
              {study.built.map((item) => (
                <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--highlight)]">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <p className="eyebrow mb-3">{t("proof")}</p>
            <div className="flex flex-wrap gap-2">
              {study.metrics.map((metric) => (
                <span key={metric} className="metric-pill" data-active={false}>
                  {metric}
                </span>
              ))}
            </div>
          </section>
          <section>
            <p className="eyebrow mb-3">{t("stack")}</p>
            <StackPills stack={study.stack} />
          </section>
        </div>
        </div>
    </article>
  );
}

function StackPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <span
          key={tech}
          className="rounded-lg border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] px-2.5 py-1 text-xs text-[var(--muted)]"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
