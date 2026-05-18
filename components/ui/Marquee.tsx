type MarqueeDirection = "left" | "right";

type MarqueeProps = {
  children: React.ReactNode;
  durationSec?: number;
  direction?: MarqueeDirection;
  className?: string;
  "aria-label"?: string;
};

export function Marquee({
  children,
  durationSec = 50,
  direction = "left",
  className = "",
  "aria-label": ariaLabel
}: MarqueeProps) {
  return (
    <div
      className={`marquee relative overflow-hidden ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        className={`marquee-track flex w-max gap-3 ${direction === "right" ? "marquee-track-right" : "marquee-track-left"}`}
        style={{ "--marquee-duration": `${durationSec}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
