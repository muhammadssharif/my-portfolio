"use client";

import type { Demo } from "@/content/demos";
import { useTranslations } from "next-intl";
import { ViewportDeck } from "@/components/ui/ViewportDeck";
import { DemoPreviewCard } from "@/components/demos/DemoPreviewCard";

type DemoPreviewDeckProps = {
  demos: readonly Demo[];
};

export function DemoPreviewDeck({ demos: demoItems }: DemoPreviewDeckProps) {
  const t = useTranslations("demos");

  const slides = demoItems.map((demo) => ({
    id: demo.id,
    label: t(`${demo.id}.title`),
    content: <DemoPreviewCard demo={demo} />
  }));

  return <ViewportDeck axis="horizontal" slides={slides} lockPageScroll />;
}
