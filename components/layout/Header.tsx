"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const siteT = useTranslations("site");
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/contact", label: t("contact") }
  ] as const;

  return (
    <header className="cosmic-occlude sticky top-4 z-50 mb-10">
      <NavShell>
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] font-display text-sm font-semibold text-[var(--accent)] ring-1 ring-[color:color-mix(in_srgb,var(--accent)_30%,transparent)]">
            MS
          </span>
          <span className="hidden font-display text-base font-semibold tracking-tight sm:block">{siteT("shortName")}</span>
        </Link>

        <nav className="flex flex-nowrap items-center gap-1 overflow-visible sm:gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-[color:color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--text)]"
                    : "text-[var(--muted)] hover:bg-[var(--hover-surface)] hover:text-[var(--text)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex flex-nowrap items-center gap-1 overflow-visible sm:gap-1.5">
            <SocialLinks className="hidden md:flex" />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary hidden px-3 py-2 lg:inline-flex">
            {t("resume")}
          </a>
        </nav>
      </NavShell>
    </header>
  );
}

function NavShell({ children }: { children: React.ReactNode }) {
  return <div className="surface-card surface-card-nav flex items-center justify-between gap-4 overflow-visible rounded-2xl px-4 py-3 md:px-6">{children}</div>;
}
