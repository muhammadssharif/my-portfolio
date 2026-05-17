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
    <div className="grid gap-10 py-4 md:grid-cols-[1fr_1.1fr] md:gap-14 md:py-10">
      <section className="space-y-6">
        <div className="space-y-4">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {t("title")}
            <span className="block text-[var(--muted)]">{t("titleMuted")}</span>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-[var(--muted)]">{t("intro")}</p>
        </div>

        <div className="surface-card space-y-4 rounded-2xl p-5 text-sm">
          <p>
            <span className="text-[var(--muted)]">{t("email")} · </span>
            <a href={`mailto:${siteContent.links.email}`} className="text-[var(--text)] hover:text-[var(--accent)]">
              {siteContent.links.email}
            </a>
          </p>
          <p>
            <span className="text-[var(--muted)]">{t("phone")} · </span>
            <a href={`tel:${siteContent.links.phone.replace(/-/g, "")}`} className="text-[var(--text)] hover:text-[var(--accent)]">
              {siteContent.links.phone}
            </a>
          </p>
          <p>
            <span className="text-[var(--muted)]">{t("github")} · </span>
            <Link href={siteContent.links.github} target="_blank" className="text-[var(--text)] hover:text-[var(--accent)]">
              muhammadssharif
            </Link>
          </p>
          <p>
            <span className="text-[var(--muted)]">{t("linkedin")} · </span>
            <Link href={siteContent.links.linkedin} target="_blank" className="text-[var(--text)] hover:text-[var(--accent)]">
              Muhammad Sharif
            </Link>
          </p>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
