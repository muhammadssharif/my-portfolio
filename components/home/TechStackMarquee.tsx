"use client";

import type { ComponentType } from "react";
import {
  Atom,
  Container,
  CreditCard,
  Database,
  FileCode2,
  Hexagon,
  Layers,
  LayoutGrid,
  Radio,
  Zap
} from "lucide-react";
import { useTranslations } from "next-intl";
import { siteContent } from "@/content/portfolio";
import { Marquee } from "@/components/ui/Marquee";

const iconById: Record<string, ComponentType<{ size?: number; className?: string; strokeWidth?: number }>> = {
  react: Atom,
  typescript: FileCode2,
  fastapi: Zap,
  mongodb: Database,
  docker: Container,
  vite: Zap,
  zustand: Layers,
  tanstack: LayoutGrid,
  payments: CreditCard,
  websockets: Radio,
  nodejs: Hexagon,
  postgres: Database
};

export function TechStackMarquee() {
  const t = useTranslations("home");

  return (
    <Marquee direction="right" durationSec={48} aria-label={t("techMarqueeLabel")} className="home-marquee-fade -mx-4 py-1 md:-mx-8">
      {siteContent.techBadges.map((badge) => {
        const Icon = iconById[badge.id] ?? FileCode2;
        return (
          <span
            key={badge.id}
            className="tech-badge-pill inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_85%,transparent)] px-3 py-1.5 text-sm text-[var(--text)]"
            style={{ "--tech-brand": badge.brandColor } as React.CSSProperties}
          >
            <Icon size={16} className="tech-badge-pill-icon text-[var(--accent)]" strokeWidth={1.75} aria-hidden />
            {badge.label}
          </span>
        );
      })}
    </Marquee>
  );
}
