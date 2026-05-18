import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteContent } from "@/content/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("contactTitle"),
    description: t("contactDescription")
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <div className="grid min-w-0 gap-8 py-4 phone-lg:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14 md:py-10">
      <section className="min-w-0 space-y-6">
        <div className="space-y-4 overflow-visible">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="display-title text-3xl font-semibold tracking-tight phone-lg:text-4xl md:text-5xl">
            <span className="display-title__line">{t("title")}</span>
            <span className="display-title__line mt-1 text-[var(--muted)]">{t("titleMuted")}</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-[var(--muted)] phone-lg:text-lg">{t("intro")}</p>
        </div>

        <div className="surface-panel contact-details space-y-3 overflow-visible rounded-2xl p-5 text-sm leading-relaxed">
          <p className="min-w-0">
            <span className="text-[var(--muted)]">{t("email")} · </span>
            <a href={`mailto:${siteContent.links.email}`} className="text-link break-all">
              {siteContent.links.email}
            </a>
          </p>
          <p>
            <span className="text-[var(--muted)]">{t("phone")} · </span>
            <a href={`tel:${siteContent.links.phone.replace(/-/g, "")}`} className="text-link">
              {siteContent.links.phone}
            </a>
          </p>
          <p className="min-w-0">
            <span className="text-[var(--muted)]">{t("github")} · </span>
            <Link href={siteContent.links.github} target="_blank" className="text-link break-all">
              muhammadssharif
            </Link>
          </p>
          <p>
            <span className="text-[var(--muted)]">{t("linkedin")} · </span>
            <Link href={siteContent.links.linkedin} target="_blank" className="text-link">
              Muhammad Sharif
            </Link>
          </p>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
