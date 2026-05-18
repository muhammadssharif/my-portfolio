/** Safari sometimes freezes CSS animations after navigation, bfcache, or compositor glitches. */
export function restartCssAnimations() {
  if (typeof document === "undefined") return;

  const tracks = document.querySelectorAll<HTMLElement>(".marquee-track-left, .marquee-track-right");
  for (const track of tracks) {
    const { animationName } = getComputedStyle(track);
    if (!animationName || animationName === "none") continue;
    track.style.animation = "none";
    void track.offsetWidth;
    track.style.removeProperty("animation");
  }
}
