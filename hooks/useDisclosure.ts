"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type UseDisclosureOptions = {
  panelRef?: RefObject<HTMLElement | null>;
  panelId?: string;
};

export function useDisclosure(options?: UseDisclosureOptions) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const panelRef = options?.panelRef;
  const panelId = options?.panelId;

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef?.current?.contains(target)) return;
      if (panelId && document.getElementById(panelId)?.contains(target)) return;
      close();
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, close, panelId, panelRef]);

  return { open, toggle, close, containerRef };
}
