"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getDemoForCaseStudy } from "@/content/demos";
import type { CaseStudy } from "@/content/portfolio";
import { IconArrowUpRight } from "@/components/ui/icons";

export type ProjectPreviewCardProps = {
  cardId: string;
  study: CaseStudy;
};

export function ProjectPreviewCard({ cardId, study }: ProjectPreviewCardProps) {
  const t = useTranslations("home");
  const demosT = useTranslations("demos");
  const tagline = t(`cards.${cardId}.tagline`);
  const problem = t(`cards.${cardId}.problem`);
  const built = t(`cards.${cardId}.built`);
  const impact = t(`cards.${cardId}.impact`);
  const stack = t.raw(`cards.${cardId}.stack`) as string[];

  const demo = getDemoForCaseStudy(study.id);
  const href = demo ? `/demos/${demo.slug}` : `/work#${study.id}`;
  const ctaLabel = demo ? demosT("viewFlow") : t("viewCaseStudy");

  return (
    <Link href={href} className="marquee-project-link group">
      <article className="project-preview-card surface-card flex h-full w-[min(100vw-2rem,20rem)] shrink-0 flex-col rounded-2xl border border-[var(--border)] p-5 sm:w-[19rem] md:p-6">
        <p className="eyebrow mb-2">{study.company}</p>
        <h3 className="font-display text-lg font-semibold tracking-tight text-[var(--text)] md:text-xl">{study.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--accent)]">{tagline}</p>

        <dl className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <div>
            <dt className="eyebrow mb-0.5 text-[var(--muted)]">{t("problemLabel")}</dt>
            <dd className="text-[var(--text)]">{problem}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-0.5 text-[var(--muted)]">{t("builtLabel")}</dt>
            <dd>{built}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-0.5 text-[var(--muted)]">{t("impactLabel")}</dt>
            <dd className="text-[var(--text)]">{impact}</dd>
          </div>
        </dl>

        <div className="mt-4">
          <p className="eyebrow mb-2">{t("techLabel")}</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_70%,transparent)] px-2 py-0.5 text-xs text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <span className="btn btn-secondary mt-5 inline-flex w-full items-center justify-center gap-2 text-sm">
          {ctaLabel}
          <IconArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </article>
    </Link>
  );
}
