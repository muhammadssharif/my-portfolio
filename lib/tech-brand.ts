import { siteContent } from "@/content/portfolio";

const EXTRA_TECH_BRAND_COLORS: Record<string, string> = {
  aws: "#FF9900",
  javascript: "#F7DF1E",
  "next.js": "#FFFFFF",
  css: "#1572B6",
  python: "#3776AB",
  graphql: "#E10098",
  jinja2: "#B41717",
  flutter: "#02569B",
  dart: "#0175C2",
  bloc: "#02569B",
  "google maps": "#4285F4",
  "rest apis": "#10B981",
  "payment integrations": "#635BFF",
  "agile delivery": "#38BDF8"
};

const brandByKey = new Map<string, string>();

for (const badge of siteContent.techBadges) {
  brandByKey.set(badge.label.toLowerCase(), badge.brandColor);
  brandByKey.set(badge.id.toLowerCase(), badge.brandColor);
}

export function getTechBrandColor(tech: string): string {
  const key = tech.trim().toLowerCase();
  return brandByKey.get(key) ?? EXTRA_TECH_BRAND_COLORS[key] ?? "var(--accent)";
}
