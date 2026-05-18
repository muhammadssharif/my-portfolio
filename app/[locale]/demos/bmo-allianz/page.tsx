import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getDemoBySlug } from "@/content/demos";
import { DemoFlowGallery } from "@/components/demos/DemoFlowGallery";
import { IconArrowUpRight } from "@/components/ui/icons";

const DEMO_SLUG = "bmo-allianz";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const demoT = await getTranslations(`demos.${DEMO_SLUG}`);
  return {
    title: `${demoT("title")} | ${t("demosTitle")}`,
    description: demoT("description")
  };
}

export default async function BmoAllianzDemoPage() {
  const demo = getDemoBySlug(DEMO_SLUG);
  if (!demo) notFound();

  const t = await getTranslations("demos");
  const demoT = await getTranslations(`demos.${DEMO_SLUG}`);
  const stepsT = await getTranslations(`demos.${DEMO_SLUG}.steps`);

  const steps = demo.steps.map((step) => ({
    id: step.id,
    image: step.image,
    label: stepsT(`${step.id}.title`),
    description: stepsT(`${step.id}.description`)
  }));

  return (
    <div className="viewport-page viewport-page--immersive viewport-page--flow cosmic-occlude">
      <DemoFlowGallery
        steps={steps}
        ariaLabel={demoT("flowLabel")}
        intro={
          <header className="viewport-page-intro viewport-page-intro--compact space-y-1.5">
            <Link href="/demos" className="demo-back-link">
              ← {t("backToDemos")}
            </Link>
            <p className="eyebrow">{demoT("tag")}</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{demoT("title")}</h1>
            <p className="text-sm leading-relaxed text-[var(--muted)] md:text-base">{demoT("description")}</p>
            {demo.caseStudyId ? (
              <Link href={`/work#${demo.caseStudyId}`} className="btn btn-secondary inline-flex w-fit items-center gap-2 text-sm">
                {t("relatedCaseStudy")}
                <IconArrowUpRight size={16} />
              </Link>
            ) : null}
          </header>
        }
        footnote={
          <p className="text-xs leading-relaxed text-[var(--muted)] md:text-sm">{demoT("disclaimer")}</p>
        }
      />
    </div>
  );
}
