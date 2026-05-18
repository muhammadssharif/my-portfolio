"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useIsDesktop } from "@/hooks/useMinWidth";
import { IconMenu, IconX } from "@/components/ui/icons";

const navItems = [
  { href: "/work", labelKey: "work" as const, match: (p: string) => p === "/work" },
  { href: "/demos", labelKey: "demos" as const, match: (p: string) => p.startsWith("/demos") },
  { href: "/contact", labelKey: "contact" as const, match: (p: string) => p === "/contact" }
] as const;

export function Header() {
  const t = useTranslations("nav");
  const siteT = useTranslations("site");
  const pathname = usePathname();
  const isDesktop = useIsDesktop();
  const { open, toggle, close, containerRef } = useDisclosure();

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (isDesktop) close();
  }, [isDesktop, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header ref={containerRef} className="cosmic-occlude">
      <div className="sticky top-3 z-50 sm:top-4">
        <NavShell>
        <Link href="/" className="min-w-0 shrink">
          <span className="flex items-center gap-2 sm:gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:color-mix(in_srgb,var(--accent)_18%,transparent)] font-display text-sm font-semibold text-[var(--accent)] ring-1 ring-[color:color-mix(in_srgb,var(--accent)_30%,transparent)]">
              MS
            </span>
            <span className="hidden truncate font-display text-sm font-semibold tracking-tight phone-lg:block phone-lg:max-w-[9rem] md:max-w-none md:text-base">
              {siteT("shortName")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex md:gap-1" aria-label={t("menu")}>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} label={t(item.labelKey)} />
          ))}
        </nav>

        {isDesktop ? (
          <div className="flex shrink-0 items-center gap-1 md:gap-1.5">
            <SocialLinks variant="compact" />
            <LanguageSwitcher />
            <ThemeToggle />
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary px-3 py-2 text-sm">
              {t("resume")}
            </a>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-1.5">
            <div
              className="header-prefs-pill flex items-center gap-0.5 rounded-xl border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)] p-0.5"
              aria-label={t("preferences")}
            >
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
            <button
              type="button"
              className="icon-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t("closeMenu") : t("menu")}
              onClick={toggle}
            >
              {open ? <IconX size={18} /> : <IconMenu size={18} />}
            </button>
          </div>
        )}
      </NavShell>

      {!isDesktop && open ? (
        <nav
          id="mobile-nav"
          className="surface-panel mt-2 space-y-1 rounded-2xl p-3 shadow-[var(--card-shadow)]"
          aria-label={t("menu")}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              label={t(item.labelKey)}
              onNavigate={close}
              mobile
            />
          ))}

          <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4">
            <p className="px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              {t("connect")}
            </p>
            <SocialLinks variant="compact" className="px-1" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-full justify-center"
              onClick={close}
            >
              {t("resume")}
            </a>
          </div>
        </nav>
      ) : null}
      </div>
    </header>
  );
}

function NavShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="surface-card surface-card-nav flex items-center justify-between gap-2 overflow-visible rounded-2xl px-2.5 py-2 sm:px-3 sm:py-2.5 md:gap-3 md:px-4 md:py-3 lg:px-6">
      {children}
    </div>
  );
}

type NavItem = (typeof navItems)[number];

function NavLink({
  item,
  pathname,
  label,
  onNavigate,
  mobile = false
}: {
  item: NavItem;
  pathname: string;
  label: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  const active = item.match(pathname);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`block rounded-lg font-medium transition-all ${
        mobile ? "px-3 py-3 text-base" : "px-2.5 py-2 text-xs sm:px-3 sm:text-sm"
      } ${
        active
          ? "bg-[color:color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--text)]"
          : "text-[var(--muted)] hover:bg-[var(--hover-surface)] hover:text-[var(--text)]"
      }`}
    >
      {label}
    </Link>
  );
}
