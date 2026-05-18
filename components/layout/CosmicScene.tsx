"use client";

import { CosmicBackdrop } from "@/components/layout/CosmicBackdrop";
import { CosmicClouds } from "@/components/layout/CosmicClouds";
import { CosmicLuminaries } from "@/components/layout/CosmicLuminaries";
import { PretextStarfield } from "@/components/layout/PretextStarfield";
import { CosmicRuntimeProvider } from "@/lib/cosmic-runtime";

export function CosmicScene() {
  return (
    <CosmicRuntimeProvider>
      <div className="cosmic-scene" aria-hidden="true">
        <CosmicBackdrop />
        <CosmicClouds />
        <PretextStarfield />
        <CosmicLuminaries />
      </div>
    </CosmicRuntimeProvider>
  );
}
