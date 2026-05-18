import { Hero } from "@/components/hero/Hero";
import { SelectedWorkCarousel } from "@/components/home/SelectedWorkCarousel";
import { TechStackMarquee } from "@/components/home/TechStackMarquee";
import { getLocalizedPortfolio } from "@/lib/messages-portfolio";

export default async function HomePage() {
  const { caseStudies } = await getLocalizedPortfolio();

  return (
    <div className="home-viewport flex min-h-[calc(100dvh-7rem)] flex-col gap-3 md:gap-5">
      <Hero />
      <TechStackMarquee />
      <SelectedWorkCarousel studies={caseStudies} className="mt-auto pb-1" />
    </div>
  );
}
