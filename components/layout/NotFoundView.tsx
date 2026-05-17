import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IconArrowRight, IconChevronLeft } from "@/components/ui/icons";

export async function NotFoundView() {
  const t = await getTranslations("notFound");

  return (
    <section className="cosmic-occlude flex min-h-[min(68vh,640px)] flex-col items-center justify-center py-16 text-center">
      <div className="surface-card relative w-full max-w-xl overflow-hidden rounded-3xl px-8 py-14 md:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--accent)_18%,transparent),transparent_62%)]"
          aria-hidden="true"
        />
        <div className="relative space-y-6">
          <p className="eyebrow">{t("eyebrow")}</p>
          <p
            className="font-display text-[clamp(5.5rem,22vw,8.5rem)] font-semibold leading-none tracking-[-0.06em] text-[color:color-mix(in_srgb,var(--accent)_88%,var(--text))]"
            aria-hidden="true"
          >
            404
          </p>
          <div className="space-y-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{t("title")}</h1>
            <p className="mx-auto max-w-md text-base leading-relaxed text-[var(--muted)]">{t("description")}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/" className="btn btn-primary group inline-flex items-center gap-2">
              <IconChevronLeft size={18} />
              {t("home")}
            </Link>
            <Link href="/contact" className="btn btn-secondary inline-flex items-center gap-2">
              {t("contact")}
              <IconArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
