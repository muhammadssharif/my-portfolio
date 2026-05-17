"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { localeMetadata, locales, type Locale } from "@/i18n/locales";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useFixedDropdownPosition } from "@/hooks/useFixedDropdownPosition";
import { IconChevronDown } from "@/components/ui/icons";

const PANEL_CLASS =
  "language-menu-panel w-72 min-w-[17rem] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-[var(--border)] p-1.5 shadow-[var(--language-menu-shadow)]";

type LanguageMenuItemProps = {
  code: Locale;
  selected: boolean;
  pathname: string;
  onSelect: () => void;
};

function LanguageMenuItem({ code, selected, pathname, onSelect }: LanguageMenuItemProps) {
  const meta = localeMetadata[code];
  return (
    <li>
      <Link
        href={pathname}
        locale={code}
        onClick={onSelect}
        role="menuitem"
        dir={meta.dir}
        lang={meta.htmlLang}
        aria-current={selected ? "true" : undefined}
        aria-label={`${meta.nativeLabel} (${meta.nativeRegion})`}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start no-underline transition-colors ${
          selected
            ? "bg-[color:color-mix(in_srgb,var(--accent)_16%,transparent)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_35%,var(--border))]"
            : "text-inherit hover:bg-[var(--hover-surface)]"
        }`}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-lg leading-none"
          aria-hidden="true"
        >
          {meta.flag}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-semibold leading-tight text-[var(--text)]" lang={meta.htmlLang}>
            {meta.nativeLabel}
          </span>
          <span className="truncate text-xs leading-tight text-[var(--muted)]" lang={meta.htmlLang}>
            {meta.nativeRegion}
          </span>
        </span>

        <span
          className={`shrink-0 rounded-md border px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide ${
            selected
              ? "border-[color:color-mix(in_srgb,var(--accent)_40%,var(--border))] bg-[color:color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]"
          }`}
        >
          {code}
        </span>
      </Link>
    </li>
  );
}

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { open, toggle, close, containerRef } = useDisclosure({
    panelRef: menuRef,
    panelId: "language-menu"
  });

  useFixedDropdownPosition(triggerRef, menuRef, open);

  const current = localeMetadata[locale];
  const docDir = current.dir;

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className={`icon-btn icon-btn-pill shrink-0 gap-1.5 ${open ? "icon-btn-open" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="language-menu"
        aria-label={t("current", { language: current.nativeLabel })}
        title={t("label")}
      >
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center text-base leading-none"
          aria-hidden="true"
        >
          {current.flag}
        </span>
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          {locale}
        </span>
        <IconChevronDown
          size={13}
          className={`icon shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180 text-[var(--accent)]" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          id="language-menu"
          role="menu"
          aria-label={t("label")}
          dir={docDir}
          className={`z-[120] ${PANEL_CLASS}`}
          style={{ visibility: "hidden" }}
        >
          <p className="px-3 pb-1 pt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            {t("label")}
          </p>
          <ul className="m-0 list-none p-0">
            {locales.map((code) => (
              <LanguageMenuItem
                key={code}
                code={code}
                selected={code === locale}
                pathname={pathname}
                onSelect={close}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
