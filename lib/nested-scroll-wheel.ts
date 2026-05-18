/**
 * Coordinates wheel events between ViewportDeck (slide navigation) and nested
 * VerticalMarquee regions on the work page.
 *
 * Safari note: the deck stage uses `{ passive: false }` + `preventDefault()` for
 * wheel-to-slide. Without deferral, Safari never delivers native scroll to the
 * marquee and manual wheel appears "broken" even when the outcomes column overflows.
 */

/** Root element registered by VerticalMarquee; used to find the wheel controller. */
export const MARQUEE_ROOT_ATTR = "data-marquee-root";

export type MarqueeWheelController = {
  /** True when the marquee can still move in the direction of deltaY (px). */
  canConsumeWheel: (deltaY: number) => boolean;
};

/** One controller per marquee root; WeakMap avoids leaks when cards unmount. */
const controllers = new WeakMap<HTMLElement, MarqueeWheelController>();

export function registerMarqueeWheelController(
  root: HTMLElement,
  controller: MarqueeWheelController
): void {
  controllers.set(root, controller);
}

export function unregisterMarqueeWheelController(root: HTMLElement): void {
  controllers.delete(root);
}

/**
 * When true, ViewportDeck must not call preventDefault / goNext / goPrev.
 * The marquee (transform offset or native scroll in reduced-motion mode) should
 * receive the wheel instead until it hits its top/bottom boundary.
 */
export function shouldDeferWheelToNestedScroll(
  target: EventTarget | null,
  deltaY: number
): boolean {
  if (!(target instanceof HTMLElement) || Math.abs(deltaY) < 1) return false;

  const root = target.closest<HTMLElement>(`[${MARQUEE_ROOT_ATTR}]`);
  if (!root) return false;

  const controller = controllers.get(root);
  if (!controller) return false;

  return controller.canConsumeWheel(deltaY);
}
