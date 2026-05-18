/** Snapshot for Safari / Next.js CSS loading diagnostics — paste logs from the console. */
export type StyleHealthSnapshot = {
  at: string;
  trigger: string;
  page: { href: string; visibility: DocumentVisibilityState };
  document: {
    theme: string | null;
    themeTransitioning: string | undefined;
    dir: string | null;
    fontVars: { display: string; body: string; mono: string };
  };
  cssVariables: {
    bg: string;
    text: string;
    surface: string;
    accent: string;
    border: string;
  };
  stylesheets: {
    linkCount: number;
    links: string[];
    sheetCount: number;
    sheets: { index: number; href: string; disabled: boolean; rules: number | "inaccessible" }[];
  };
  probes: {
    tailwindUtility: { className: string; borderRadius: string; display: string };
    displayTitleLine: { found: boolean; display: string };
    customClass: { selector: string; found: boolean; backgroundColor: string; isolation: string };
    marquee: { found: boolean; animationName: string; animationPlayState: string };
    impactPanel: { found: boolean; backgroundColor: string; backdropFilter: string };
    viewportDeck: { found: boolean; display: string };
    caseStudyCard: { found: boolean; position: string; borderRadius: string };
    siteHeaderGap: {
      immersive: boolean;
      mainPaddingTopPx: number;
      headerMainGapPx: number;
    };
  };
  issues: string[];
};

function readRules(sheet: CSSStyleSheet): number | "inaccessible" {
  try {
    return sheet.cssRules?.length ?? 0;
  } catch {
    return "inaccessible";
  }
}

export function collectStyleHealth(trigger: string): StyleHealthSnapshot {
  const root = document.documentElement;
  const rootStyle = getComputedStyle(root);
  const issues: string[] = [];

  const links = [...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')];
  const sheets = [...document.styleSheets];

  if (links.length === 0) issues.push("NO_STYLESHEET_LINKS");
  if (sheets.length === 0) issues.push("NO_DOCUMENT_STYLESHEETS");

  const bg = rootStyle.getPropertyValue("--bg").trim();
  const text = rootStyle.getPropertyValue("--text").trim();
  if (!bg) issues.push("MISSING_CSS_VAR_--bg");
  if (!text) issues.push("MISSING_CSS_VAR_--text");

  if (root.dataset.themeTransitioning === "true") {
    issues.push("STUCK_THEME_TRANSITION");
  }

  const probe =
    document.getElementById("style-health-tailwind-probe") ??
    document.querySelector<HTMLElement>(".surface-card-nav .rounded-lg");
  const impactPanel = document.querySelector(".impact-console-panel");
  const marquee = document.querySelector<HTMLElement>(".marquee-track-left, .marquee-track-right");
  const displayTitleLine = document.querySelector<HTMLElement>(
    ".display-title .block, .display-title__line"
  );

  const tailwindStyle = probe ? getComputedStyle(probe) : null;
  if (probe && tailwindStyle && tailwindStyle.borderRadius === "0px" && tailwindStyle.display !== "none") {
    issues.push("TAILWIND_UTILITY_NOT_APPLIED");
  }

  const displayTitleLineStyle = displayTitleLine ? getComputedStyle(displayTitleLine) : null;
  if (displayTitleLine && displayTitleLineStyle && displayTitleLineStyle.display !== "block") {
    issues.push("DISPLAY_TITLE_LINE_NOT_BLOCK");
  }

  const panelStyle = impactPanel ? getComputedStyle(impactPanel) : null;
  if (impactPanel && panelStyle) {
    const panelBg = panelStyle.backgroundColor;
    if (panelBg === "rgba(0, 0, 0, 0)" || panelBg === "transparent") {
      issues.push("IMPACT_PANEL_TRANSPARENT");
    }
    if (panelStyle.backdropFilter && panelStyle.backdropFilter !== "none") {
      issues.push("IMPACT_PANEL_HAS_BACKDROP_FILTER");
    }
  } else if (impactPanel === null && document.querySelector(".impact-console")) {
    issues.push("IMPACT_PANEL_CLASS_MISSING");
  }

  if (marquee) {
    const marqueeStyle = getComputedStyle(marquee);
    if (!marqueeStyle.animationName || marqueeStyle.animationName === "none") {
      issues.push("MARQUEE_ANIMATION_INACTIVE");
    }
  }

  const viewportDeck = document.querySelector(".viewport-deck");
  const viewportDeckStyle = viewportDeck ? getComputedStyle(viewportDeck) : null;
  const caseStudyCard = document.querySelector(".case-study-card");
  const caseStudyStyle = caseStudyCard ? getComputedStyle(caseStudyCard) : null;

  const headerEl = document.querySelector("header");
  const mainEl = document.querySelector("main.site-main");
  const immersiveEl = document.querySelector(".viewport-page--immersive");
  const mainPaddingTopPx = mainEl ? parseFloat(getComputedStyle(mainEl).paddingTop) || 0 : 0;
  let headerMainGapPx = 0;
  if (headerEl && mainEl) {
    headerMainGapPx = Math.round(mainEl.getBoundingClientRect().top - headerEl.getBoundingClientRect().bottom);
  }

  if (immersiveEl && headerEl && mainEl && headerMainGapPx < 8) {
    issues.push("SITE_HEADER_GAP_MISSING");
  }

  // Only flag deck/card styles when theme tokens are loaded (avoids false positives mid-navigation).
  if (bg && text) {
    if (viewportDeck && viewportDeckStyle?.display !== "flex") {
      issues.push("VIEWPORT_DECK_STYLES_MISSING");
    }
    if (caseStudyCard && caseStudyStyle) {
      const paddingTop = parseFloat(caseStudyStyle.paddingTop);
      if (caseStudyStyle.position !== "relative" || paddingTop < 12) {
        issues.push("CASE_STUDY_CARD_STYLES_MISSING");
      }
    }
  }

  for (const sheet of sheets) {
    if (sheet.disabled) issues.push(`DISABLED_STYLESHEET:${sheet.href || "inline"}`);
    const rules = readRules(sheet);
    if (rules === "inaccessible") issues.push(`CORS_BLOCKED_STYLESHEET:${sheet.href || "inline"}`);
    if (rules === 0 && sheet.href) issues.push(`EMPTY_STYLESHEET:${sheet.href}`);
  }

  return {
    at: new Date().toISOString(),
    trigger,
    page: { href: location.href, visibility: document.visibilityState },
    document: {
      theme: root.getAttribute("data-theme"),
      themeTransitioning: root.dataset.themeTransitioning,
      dir: root.getAttribute("dir"),
      fontVars: {
        display: rootStyle.getPropertyValue("--font-display").trim(),
        body: rootStyle.getPropertyValue("--font-body").trim(),
        mono: rootStyle.getPropertyValue("--font-mono").trim()
      }
    },
    cssVariables: {
      bg,
      text,
      surface: rootStyle.getPropertyValue("--surface").trim(),
      accent: rootStyle.getPropertyValue("--accent").trim(),
      border: rootStyle.getPropertyValue("--border").trim()
    },
    stylesheets: {
      linkCount: links.length,
      links: links.map((l) => l.href),
      sheetCount: sheets.length,
      sheets: sheets.map((sheet, index) => ({
        index,
        href: sheet.href || "(inline)",
        disabled: sheet.disabled,
        rules: readRules(sheet)
      }))
    },
    probes: {
      tailwindUtility: {
        className: "rounded-lg",
        borderRadius: tailwindStyle?.borderRadius ?? "(no probe)",
        display: tailwindStyle?.display ?? "(no probe)"
      },
      displayTitleLine: {
        found: Boolean(displayTitleLine),
        display: displayTitleLineStyle?.display ?? "(n/a)"
      },
      customClass: {
        selector: ".impact-console-panel",
        found: Boolean(impactPanel),
        backgroundColor: panelStyle?.backgroundColor ?? "(n/a)",
        isolation: panelStyle?.isolation ?? "(n/a)"
      },
      marquee: {
        found: Boolean(marquee),
        animationName: marquee ? getComputedStyle(marquee).animationName : "(n/a)",
        animationPlayState: marquee ? getComputedStyle(marquee).animationPlayState : "(n/a)"
      },
      impactPanel: {
        found: Boolean(impactPanel),
        backgroundColor: panelStyle?.backgroundColor ?? "(n/a)",
        backdropFilter: panelStyle?.backdropFilter ?? "(n/a)"
      },
      viewportDeck: {
        found: Boolean(viewportDeck),
        display: viewportDeckStyle?.display ?? "(n/a)"
      },
      caseStudyCard: {
        found: Boolean(caseStudyCard),
        position: caseStudyStyle?.position ?? "(n/a)",
        borderRadius: caseStudyStyle?.borderRadius ?? "(n/a)"
      },
      siteHeaderGap: {
        immersive: Boolean(immersiveEl),
        mainPaddingTopPx,
        headerMainGapPx
      }
    },
    issues
  };
}

const STYLE_RECOVERY_ISSUES = [
  "VIEWPORT_DECK_STYLES_MISSING",
  "CASE_STUDY_CARD_STYLES_MISSING",
  "NO_STYLESHEET_LINKS",
  "NO_DOCUMENT_STYLESHEETS",
  "MISSING_CSS_VAR_--bg",
  "MISSING_CSS_VAR_--text",
  "TAILWIND_UTILITY_NOT_APPLIED",
  "STUCK_THEME_TRANSITION",
  "DISPLAY_TITLE_LINE_NOT_BLOCK",
  "SITE_HEADER_GAP_MISSING"
] as const;

/** True when Safari should run router.refresh() to recover broken global or layout CSS. */
export function needsStyleRecovery(issues: readonly string[]): boolean {
  return issues.some(
    (issue) =>
      (STYLE_RECOVERY_ISSUES as readonly string[]).includes(issue) ||
      issue.startsWith("MISSING_CSS_VAR_") ||
      issue.startsWith("EMPTY_STYLESHEET:")
  );
}

/** @deprecated Use needsStyleRecovery */
export function needsDeckStyleRecovery(issues: readonly string[]): boolean {
  return needsStyleRecovery(issues);
}

export function logStyleHealth(trigger: string) {
  const snapshot = collectStyleHealth(trigger);
  // const label = snapshot.issues.length ? "warn" : "log";
  // console.groupCollapsed(`[style-health] ${trigger} — ${snapshot.issues.length} issue(s)`);
  // console[label]("issues:", snapshot.issues.length ? snapshot.issues : "none");
  // console.log("paste:", JSON.stringify(snapshot, null, 2));
  // console[label](snapshot);
  // console.groupEnd();
  return snapshot;
}
