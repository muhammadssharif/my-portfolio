export type CosmicQualityTier = "high" | "medium" | "low";

export type CosmicQualitySettings = {
  tier: CosmicQualityTier;
  maxDpr: number;
  targetFps: number;
  includeMist: boolean;
  cloudCount: number;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** WebKit/Safari struggles with stacked blurs, filters, and dual full-screen canvases. */
export function isSafariWebKit(): boolean {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  return /AppleWebKit/i.test(ua) && /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|FxiOS/i.test(ua);
}

export function getCosmicQualityTier(): CosmicQualityTier {
  if (typeof window === "undefined") return "high";
  if (prefersReducedMotion()) return "low";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 768;
  const safari = isSafariWebKit();

  if (safari) {
    if (small || cores <= 6 || memory <= 6) return "low";
    return "medium";
  }

  if (cores <= 4 || memory <= 4 || (coarse && small)) return "low";
  if (cores <= 6 || memory <= 6) return "medium";
  return "high";
}

export function getCosmicQualitySettings(): CosmicQualitySettings {
  const tier = getCosmicQualityTier();

  switch (tier) {
    case "low":
      return { tier, maxDpr: 1, targetFps: 24, includeMist: false, cloudCount: 8 };
    case "medium":
      return { tier, maxDpr: 1.25, targetFps: 30, includeMist: true, cloudCount: 11 };
    default:
      return { tier, maxDpr: 2, targetFps: 60, includeMist: true, cloudCount: 16 };
  }
}
