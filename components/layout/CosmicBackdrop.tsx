"use client";

import { useSyncExternalStore } from "react";
import { getThemeSnapshot, subscribeTheme } from "@/lib/theme-subscription";

function DarkStack() {
  return (
    <div className="cosmic-stack cosmic-stack-dark">
      <div className="cosmic-atmosphere cosmic-atmosphere-dark" />
      <div className="cosmic-layer cosmic-layer-dark">
        <div className="cosmic-accent">
          <div className="cosmic-pillar cosmic-pillar-a" />
          <div className="cosmic-pillar cosmic-pillar-b" />
          <div className="cosmic-pillar cosmic-pillar-c" />
        </div>
      </div>
    </div>
  );
}

function LightStack() {
  return (
    <div className="cosmic-stack cosmic-stack-light">
      <div className="cosmic-atmosphere cosmic-atmosphere-light" />
      <div className="cosmic-layer cosmic-layer-light">
        <div className="cosmic-sky-glow cosmic-sky-glow-day" />
        <div className="cosmic-accent cosmic-accent-light">
          <div className="cosmic-pillar cosmic-pillar-a cosmic-pillar-day" />
          <div className="cosmic-pillar cosmic-pillar-b cosmic-pillar-day" />
          <div className="cosmic-pillar cosmic-pillar-c cosmic-pillar-day" />
        </div>
      </div>
    </div>
  );
}

export function CosmicBackdrop() {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeSnapshot);

  return (
    <div className="cosmic-backdrop" data-active-stack={theme} aria-hidden="true">
      {theme === "light" ? <LightStack /> : <DarkStack />}
      {theme === "light" ? (
        <div className="cosmic-vignette cosmic-vignette-light" />
      ) : (
        <div className="cosmic-vignette cosmic-vignette-dark" />
      )}
    </div>
  );
}
