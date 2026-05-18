"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Demo } from "@/content/demos";
import { IconArrowUpRight } from "@/components/ui/icons";

type DemoPreviewCardProps = {
  demo: Demo;
};

export function DemoPreviewCard({ demo }: DemoPreviewCardProps) {
  const t = useTranslations(`demos.${demo.id}`);
  const common = useTranslations("demos");
  const preview = demo.steps[0];

  return (
    <article className="demo-preview-card viewport-deck-card group h-full">
      <Link href={`/demos/${demo.slug}`} className="demo-preview-thumb block no-underline">
        <Image src={preview.image} alt="" width={1024} height={510} className="demo-preview-image" />
      </Link>
      <div className="demo-preview-body">
        <Link href={`/demos/${demo.slug}`} className="block no-underline">
          <p className="eyebrow">{t("tag")}</p>
          <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">{t("title")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("description")}</p>
        </Link>
        <div className="mt-4 flex flex-col gap-2">
          <Link href={`/demos/${demo.slug}`} className="demo-preview-cta">
            {common("viewFlow")}
            <IconArrowUpRight size={16} />
          </Link>
          {demo.caseStudyId ? (
            <Link
              href={`/work#${demo.caseStudyId}`}
              className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] no-underline transition hover:text-[var(--accent)]"
            >
              {common("relatedCaseStudy")}
              <IconArrowUpRight size={14} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
