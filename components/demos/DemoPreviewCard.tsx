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
    <Link href={`/demos/${demo.slug}`} className="demo-preview-card viewport-deck-card group h-full">
      <div className="demo-preview-thumb">
        <Image src={preview.image} alt="" width={1024} height={510} className="demo-preview-image" />
      </div>
      <div className="demo-preview-body">
        <p className="eyebrow">{t("tag")}</p>
        <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--text)] md:text-2xl">{t("title")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("description")}</p>
        <span className="demo-preview-cta">
          {common("viewFlow")}
          <IconArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
