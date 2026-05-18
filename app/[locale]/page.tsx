import { Hero } from "@/components/hero/Hero";
import { SelectedWorkCarousel } from "@/components/home/SelectedWorkCarousel";
import { TechStackMarquee } from "@/components/home/TechStackMarquee";
import { siteContent } from "@/content/portfolio";
import { getLocalizedPortfolio } from "@/lib/messages-portfolio";

export default async function HomePage() {
  const { caseStudies } = await getLocalizedPortfolio();
  const byId = new Map(caseStudies.map((s) => [s.id, s]));

  const featuredItems = siteContent.homepageFeatured.map((h) => {
    const study = byId.get(h.caseStudyId);
    if (!study) {
      throw new Error(`Missing case study: ${h.caseStudyId}`);
    }
    return { study, cardId: h.cardId };
  });

  return (
    <div className="home-viewport flex min-h-[calc(100dvh-7rem)] flex-col gap-3 md:gap-5">
      <Hero />
      <TechStackMarquee />
      <SelectedWorkCarousel items={featuredItems} className="mt-auto pb-1" />
    </div>
  );
}
