# Theme system

Portfolio theme switching uses a **veil + instant swap** architecture. One full-screen element animates `opacity` on the GPU; cosmic layers and `data-theme` commit while the veil is opaque.

## Architecture

```
User click → ThemeTransitionController
  ├─ pause CosmicRuntime RAF
  ├─ veil fade in (WAAPI opacity 0→1)
  ├─ commit: data-theme, storage, cookie
  ├─ veil fade out (opacity 1→0)
  └─ resume CosmicRuntime RAF
```

### Phases

| Phase | DOM | Cosmic RAF | Content `data-theme` |
|-------|-----|------------|----------------------|
| `idle` | veil hidden | running | settled |
| `veil-in` | veil fading in | paused | previous (under veil) |
| `commit` | veil opaque | paused | **updated** |
| `veil-out` | veil fading out | paused | new |

### Key modules

- [`lib/theme-transition-controller.ts`](../lib/theme-transition-controller.ts) — state machine, WAAPI driver, interrupt/coalesce logic
- [`lib/theme.ts`](../lib/theme.ts) — types, storage helpers, `applyTheme()` for instant apply
- [`components/layout/ThemeVeil.tsx`](../components/layout/ThemeVeil.tsx) — fixed veil (`z-index: 100`) covering content + cosmic
- [`lib/theme-context.ts`](../lib/theme-context.ts) — `InitialThemeContext` for SSR/hydration-safe toggle state
- [`components/layout/ThemeTransition.tsx`](../components/layout/ThemeTransition.tsx) — mounts controller on client

### HTML attributes

| Attribute | Set by | Purpose |
|-----------|--------|---------|
| `data-theme` | commit phase | Content CSS variables (`--bg`, `--text`, …) |
| `data-theme-transitioning` | veil-in → veil-out | Hide luminaries, pause pillar animations |

Cosmic stack visibility is driven by the same `data-theme` attribute (no separate cosmic attribute).

## Duration tiers

Derived from [`lib/cosmic-quality.ts`](../lib/cosmic-quality.ts):

| Tier | Veil in | Veil out | Notes |
|------|---------|----------|-------|
| high | 280ms | 220ms | Desktop Chrome/Firefox |
| medium | 220ms | 180ms | Safari, mid-tier hardware |
| low | 0 | 0 | `prefers-reduced-motion` or low tier — instant snap |

## Rapid clicks

- Toggle is **disabled** while `locked` (`isTransitioning` in React).
- Controller **latches** to latest target: interrupt aborts WAAPI, increments `generation`, restarts toward `pendingTarget`.
- 80ms coalesce window ignores duplicate requests to the same pending target.
- On completion, chains one follow-up transition if `pendingTarget` remains.

## Cosmic layers

- **No `--theme-mix` crossfade** — only one stack is visible via `data-theme`.
- Clouds render only in light mode (`resolvedTheme === "light"`).
- Starfield uses binary mix `0` or `1` (no per-frame lerp).
- RAF pauses when `controller.isCosmicPaused()` is true.

## SSR / hydration

Server renders `data-theme` on `<html>` ([`app/[locale]/layout.tsx`](../app/[locale]/layout.tsx)). `ThemeProvider` receives `initialTheme` from the cookie and passes it to `useSyncExternalStore`’s server snapshot so `ThemeToggle` matches SSR. After hydration, `useEffect` syncs `localStorage` / system preference via `applyTheme()` **before** the controller attaches.

## Debugging

In development, inspect the controller:

```js
window.__themeController.getState()
// → { phase, resolvedTheme, targetTheme, generation, locked }
```

Checklist when something looks wrong:

1. `data-theme` matches the toggle icon and visible cosmic stack
2. `.theme-veil` opacity returns to `0`
3. `data-theme-transitioning` is absent when idle
4. Only one of `.cosmic-stack-dark` / `.cosmic-stack-light` is visible

## Safari development (CSS / Turbopack)

When styles look correct briefly then break after refresh in **Safari**:

1. Prefer `npm run dev:webpack` instead of `npm run dev` (Turbopack can serve stale CSS in WebKit).
2. Hard-refresh once with **⌘⌥R** or **Develop → Empty Caches** if styles stay wrong.
3. Filter the console by `style-health` and copy the `paste:` JSON from a broken load.

Production Safari uses `SafariCompat` + `needsStyleRecovery()` to `router.refresh()` when global CSS or theme tokens fail probes.

## Anti-patterns

Do **not**:

- Reintroduce `--theme-mix` opacity crossfade on dual cosmic stacks
- Flip `data-theme` before the veil covers the viewport
- Animate blur filters or `mix-blend-mode` stacks per frame
- Dispatch per-frame mix events during transitions
- Add separate Safari-only animation drivers (one WAAPI path for all browsers)
