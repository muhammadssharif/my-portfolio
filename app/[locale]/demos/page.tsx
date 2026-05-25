import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { demos } from "@/content/demos";
import { DemoPreviewDeck } from "@/components/demos/DemoPreviewDeck";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("demosTitle"),
    description: t("demosDescription")
  };
}

export default async function DemosPage() {
  const t = await getTranslations("demos");

  return (
    <div className="viewport-page viewport-page--immersive cosmic-occlude">
      <header className="viewport-page-intro viewport-page-intro--compact max-w-4xl space-y-2 xl:max-w-5xl">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          <span className="display-title__line">{t("title")}</span>
          <span className="display-title__line text-[var(--muted)]">{t("titleMuted")}</span>
        </h1>
        <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">{t("intro")}</p>
      </header>

      <DemoPreviewDeck demos={demos} />
    </div>
  );
}
