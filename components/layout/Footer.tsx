import { getTranslations } from "next-intl/server";
import { siteContent } from "@/content/portfolio";
import { SocialLinks } from "@/components/layout/SocialLinks";

export async function Footer() {
  const t = await getTranslations();
  const siteT = await getTranslations("site");

  return (
    <footer className="cosmic-occlude mt-12 border-t border-[var(--border)] pt-8 md:mt-20 md:pt-10">
      <div className="flex flex-col gap-6 phone-lg:gap-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="font-display text-lg font-semibold leading-snug">{siteT("shortName")}</p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">{t("footer.tagline", { location: siteT("location") })}</p>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-4 sm:items-end">
          <SocialLinks />
          <div className="flex w-full min-w-0 flex-col gap-2 text-sm phone-lg:w-auto phone-lg:flex-row phone-lg:flex-wrap phone-lg:items-center phone-lg:gap-x-6 phone-lg:gap-y-2">
            <a href={`mailto:${siteContent.links.email}`} className="text-link break-all">
              {siteContent.links.email}
            </a>
            <a href={`tel:${siteContent.links.phone.replace(/-/g, "")}`} className="text-link">
              {siteContent.links.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
