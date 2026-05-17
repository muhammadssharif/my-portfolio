"use client";

/** Persistent sun/moon — SVG bodies, CSS-driven theme + transition. */
export function CosmicLuminaries() {
  return (
    <div className="cosmic-luminaries" aria-hidden="true">
      <div className="cosmic-luminary-wrap cosmic-luminary-wrap-sun">
        <div className="cosmic-luminary-glow cosmic-luminary-glow-sun" />
        <svg className="cosmic-luminary-svg cosmic-luminary-svg-sun" viewBox="0 0 120 120" fill="none">
          <defs>
            <radialGradient id="sun-core-dark" cx="38%" cy="34%" r="65%">
              <stop offset="0%" stopColor="#fffef0" />
              <stop offset="45%" stopColor="#fde047" />
              <stop offset="78%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </radialGradient>
            <radialGradient id="sun-corona-dark" cx="50%" cy="50%" r="50%">
              <stop offset="55%" stopColor="rgba(251,191,36,0)" />
              <stop offset="78%" stopColor="rgba(251,191,36,0.35)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0.15)" />
            </radialGradient>
            <radialGradient id="sun-core-light" cx="40%" cy="34%" r="58%">
              <stop offset="0%" stopColor="#fffef5" />
              <stop offset="22%" stopColor="#fde68a" />
              <stop offset="48%" stopColor="#fbbf24" />
              <stop offset="72%" stopColor="#f59e0b" />
              <stop offset="88%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
            <radialGradient id="sun-corona-light" cx="50%" cy="50%" r="50%">
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              <stop offset="68%" stopColor="rgba(254,240,138,0.7)" />
              <stop offset="82%" stopColor="rgba(251,191,36,0.45)" />
              <stop offset="100%" stopColor="rgba(234,88,12,0.18)" />
            </radialGradient>
            <radialGradient id="sun-flare-light" cx="38%" cy="32%" r="45%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          <circle cx="60" cy="60" r="52" className="cosmic-sun-corona-fill" />
          <circle cx="60" cy="60" r="18" className="cosmic-sun-flare" />

          <g className="cosmic-sun-rays cosmic-sun-rays-dark" strokeLinecap="round">
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              return (
                <line
                  key={`d-${i}`}
                  x1={60 + Math.cos(angle) * 38}
                  y1={60 + Math.sin(angle) * 38}
                  x2={60 + Math.cos(angle) * 52}
                  y2={60 + Math.sin(angle) * 52}
                  strokeWidth="2.5"
                />
              );
            })}
          </g>

          <g className="cosmic-sun-rays cosmic-sun-rays-light" strokeLinecap="round">
            {Array.from({ length: 16 }, (_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const inner = i % 2 === 0 ? 34 : 38;
              const outer = i % 2 === 0 ? 48 : 52;
              return (
                <line
                  key={`l-${i}`}
                  x1={60 + Math.cos(angle) * inner}
                  y1={60 + Math.sin(angle) * inner}
                  x2={60 + Math.cos(angle) * outer}
                  y2={60 + Math.sin(angle) * outer}
                  strokeWidth={i % 2 === 0 ? 2.6 : 1.8}
                />
              );
            })}
          </g>

          <circle cx="60" cy="60" r="26" className="cosmic-sun-disc" />
          <circle cx="60" cy="60" r="27.5" className="cosmic-sun-rim" fill="none" />
          <circle cx="48" cy="48" r="7" className="cosmic-sun-highlight-a" />
          <ellipse cx="69" cy="66" rx="5" ry="3" className="cosmic-sun-highlight-b" />
        </svg>
      </div>

      <div className="cosmic-luminary-wrap cosmic-luminary-wrap-moon">
        <div className="cosmic-luminary-glow cosmic-luminary-glow-moon" />
        <svg className="cosmic-luminary-svg cosmic-luminary-svg-moon" viewBox="0 0 120 120" fill="none">
          <defs>
            <radialGradient id="moon-lit" cx="42%" cy="38%" r="55%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="55%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>
            <mask id="moon-mask">
              <rect width="120" height="120" fill="white" />
              <circle cx="78" cy="42" r="30" fill="black" />
            </mask>
          </defs>
          <circle cx="60" cy="60" r="50" fill="rgba(199,210,254,0.2)" />
          <circle cx="60" cy="60" r="34" fill="url(#moon-lit)" mask="url(#moon-mask)" />
          <circle cx="44" cy="50" r="4" fill="rgba(148,163,184,0.35)" />
          <circle cx="54" cy="68" r="5" fill="rgba(148,163,184,0.28)" />
          <circle cx="38" cy="64" r="3" fill="rgba(148,163,184,0.22)" />
          <circle cx="62" cy="54" r="2.5" fill="rgba(148,163,184,0.2)" />
          <circle cx="50" cy="42" r="2" fill="rgba(255,255,255,0.35)" />
        </svg>
      </div>
    </div>
  );
}
