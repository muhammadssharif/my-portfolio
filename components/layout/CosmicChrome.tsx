"use client";

import { useEffect, useState } from "react";
import { CosmicLuminaries } from "@/components/layout/CosmicLuminaries";
import { CosmicScene } from "@/components/layout/CosmicScene";

/** Decorative layers mount after hydration to avoid SSR/client mismatches. */
export function CosmicChrome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CosmicScene />
      <CosmicLuminaries />
    </>
  );
}
