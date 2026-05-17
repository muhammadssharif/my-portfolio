import { getCosmicQualityTier } from "@/lib/cosmic-quality";
import {
  THEME_CHANGE_EVENT,
  THEME_COOKIE_NAME,
  THEME_STORAGE_KEY,
  setThemeCookie,
  type Theme
} from "@/lib/theme";

export type ThemePhase = "idle" | "veil-in" | "commit" | "veil-out";

export type ThemeTransitionState = {
  phase: ThemePhase;
  resolvedTheme: Theme;
  targetTheme: Theme;
  generation: number;
  locked: boolean;
};

export type VeilTimings = {
  veilInMs: number;
  veilOutMs: number;
  instant: boolean;
};

const EASING = "cubic-bezier(0.45, 0, 0.15, 1)";
const VEIL_HOLD_MS = 48;
const COALESCE_MS = 80;

type Listener = () => void;

function getVeilTimings(): VeilTimings {
  if (typeof window === "undefined") {
    return { veilInMs: 280, veilOutMs: 220, instant: false };
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { veilInMs: 0, veilOutMs: 0, instant: true };
  }

  const tier = getCosmicQualityTier();
  switch (tier) {
    case "low":
      return { veilInMs: 0, veilOutMs: 0, instant: true };
    case "medium":
      return { veilInMs: 220, veilOutMs: 180, instant: false };
    default:
      return { veilInMs: 320, veilOutMs: 280, instant: false };
  }
}

function readResolvedTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function commitThemeToDom(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  setThemeCookie(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

class ThemeTransitionController {
  private state: ThemeTransitionState = {
    phase: "idle",
    resolvedTheme: "dark",
    targetTheme: "dark",
    generation: 0,
    locked: false
  };

  private listeners = new Set<Listener>();
  private veilEl: HTMLElement | null = null;
  private activeAnimation: Animation | null = null;
  private pendingTarget: Theme | null = null;
  private coalesceTimer: ReturnType<typeof setTimeout> | null = null;
  private lastRequestAt = 0;

  /** Sync controller state from `<html data-theme>` (e.g. after applyTheme). */
  syncFromDom() {
    if (typeof document === "undefined" || this.state.locked) return;

    const resolved = readResolvedTheme();
    if (this.state.resolvedTheme === resolved && this.state.targetTheme === resolved) {
      return;
    }

    this.state.resolvedTheme = resolved;
    this.state.targetTheme = resolved;
    this.emit();
  }

  attach() {
    if (typeof document === "undefined") return () => {};

    this.syncFromDom();

    const onThemeChange = () => this.syncFromDom();
    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

    if (process.env.NODE_ENV === "development") {
      (window as Window & { __themeController?: ThemeTransitionController }).__themeController = this;
    }

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
      this.abortAnimation();
      if (this.coalesceTimer) clearTimeout(this.coalesceTimer);
    };
  }

  registerVeil(el: HTMLElement | null) {
    this.veilEl = el;
  }

  getState(): ThemeTransitionState {
    return this.state;
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = (): ThemeTransitionState => this.state;

  isCosmicPaused(): boolean {
    return this.state.phase !== "idle";
  }

  requestTheme(next: Theme) {
    if (typeof document === "undefined") return;

    const now = Date.now();
    if (now - this.lastRequestAt < COALESCE_MS && this.state.locked && next === this.pendingTarget) {
      return;
    }
    this.lastRequestAt = now;

    if (this.state.resolvedTheme === next && !this.state.locked) {
      return;
    }

    if (this.state.locked) {
      this.pendingTarget = next;
      this.abortAnimation();
      this.state.generation += 1;
      void this.runTransition(next, this.state.generation);
      this.emit();
      return;
    }

    void this.runTransition(next, ++this.state.generation);
  }

  toggleTheme() {
    const base = this.state.locked
      ? (this.pendingTarget ?? this.state.targetTheme)
      : this.state.resolvedTheme;
    this.requestTheme(base === "dark" ? "light" : "dark");
  }

  private emit() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private patch(partial: Partial<ThemeTransitionState>) {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  private abortAnimation() {
    if (this.activeAnimation) {
      this.activeAnimation.cancel();
      this.activeAnimation = null;
    }
  }

  private setVeilTheme(theme: Theme) {
    if (!this.veilEl) return;
    this.veilEl.dataset.veilTheme = theme;
  }

  private resetVeilOpacity() {
    if (!this.veilEl) return;
    this.veilEl.style.opacity = "0";
  }

  private async animateVeil(
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions,
    generation: number
  ): Promise<boolean> {
    if (!this.veilEl) return false;

    this.abortAnimation();
    const animation = this.veilEl.animate(keyframes, options);
    this.activeAnimation = animation;

    try {
      await animation.finished;
    } catch {
      return false;
    }

    if (generation !== this.state.generation) {
      return false;
    }

    this.activeAnimation = null;
    return true;
  }

  private async runTransition(target: Theme, generation: number) {
    const timings = getVeilTimings();

    this.patch({
      phase: "veil-in",
      targetTheme: target,
      locked: true
    });

    document.documentElement.dataset.themeTransitioning = "true";
    this.setVeilTheme(target);

    if (timings.instant) {
      if (generation !== this.state.generation) return;
      this.patch({ phase: "commit" });
      commitThemeToDom(target);
      this.patch({
        phase: "idle",
        resolvedTheme: target,
        targetTheme: target,
        locked: false
      });
      delete document.documentElement.dataset.themeTransitioning;
      this.resetVeilOpacity();
      this.finishOrChain();
      return;
    }

    if (!this.veilEl) {
      this.patch({ phase: "commit", resolvedTheme: target });
      commitThemeToDom(target);
      this.patch({
        phase: "idle",
        resolvedTheme: target,
        targetTheme: target,
        locked: false
      });
      delete document.documentElement.dataset.themeTransitioning;
      this.finishOrChain();
      return;
    }

    const veilInOk = await this.animateVeil(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: timings.veilInMs, easing: EASING, fill: "forwards" },
      generation
    );

    if (!veilInOk || generation !== this.state.generation) return;

    this.patch({ phase: "commit", resolvedTheme: target });
    commitThemeToDom(target);

    if (generation !== this.state.generation) return;

    if (VEIL_HOLD_MS > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, VEIL_HOLD_MS));
      if (generation !== this.state.generation) return;
    }

    this.patch({ phase: "veil-out" });

    const veilOutOk = await this.animateVeil(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: timings.veilOutMs, easing: EASING, fill: "forwards" },
      generation
    );

    if (!veilOutOk || generation !== this.state.generation) return;

    this.patch({
      phase: "idle",
      resolvedTheme: target,
      targetTheme: target,
      locked: false
    });
    delete document.documentElement.dataset.themeTransitioning;
    this.resetVeilOpacity();
    this.finishOrChain();
  }

  private finishOrChain() {
    const pending = this.pendingTarget;
    this.pendingTarget = null;

    if (pending && pending !== this.state.resolvedTheme) {
      void this.runTransition(pending, ++this.state.generation);
    }
  }
}

let controller: ThemeTransitionController | null = null;

export function getThemeTransitionController(): ThemeTransitionController {
  if (!controller) {
    controller = new ThemeTransitionController();
  }
  return controller;
}

export function requestThemeChange(next: Theme) {
  if (typeof window === "undefined") return;
  getThemeTransitionController().requestTheme(next);
}
