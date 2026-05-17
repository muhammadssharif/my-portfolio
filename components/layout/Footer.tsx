import { getTranslations } from "next-intl/server";
import { siteContent } from "@/content/portfolio";
import { SocialLinks } from "@/components/layout/SocialLinks";

export async function Footer() {
  const t = await getTranslations();
  const siteT = await getTranslations("site");

  return (
    <footer className="cosmic-occlude mt-20 border-t border-[var(--border)] pt-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-display text-lg font-semibold">{siteT("shortName")}</p>
          <p className="text-sm text-[var(--muted)]">{t("footer.tagline", { location: siteT("location") })}</p>
        </div>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          <SocialLinks />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
            <a href={`mailto:${siteContent.links.email}`} className="transition hover:text-[var(--text)]">
              {siteContent.links.email}
            </a>
            <a href={`tel:${siteContent.links.phone.replace(/-/g, "")}`} className="transition hover:text-[var(--text)]">
              {siteContent.links.phone}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
