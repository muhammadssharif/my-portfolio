/** SVG filters for organic nebula texture (no JS, paint-only). */
export function CosmicFilters() {
  return (
    <svg className="cosmic-filters" aria-hidden="true">
      <defs>
        <filter id="cosmic-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" seed="12" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
          <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
        </filter>
        <filter id="cosmic-warp" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" seed="8" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="cosmic-warp-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
