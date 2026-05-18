import { Fragment } from "react";

type MarqueeDirection = "left" | "right";

/** Duplicated sequences in the track; animation shifts by 1/N of total width per loop. */
const MARQUEE_COPY_COUNT = 4;

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
      dir="ltr"
      className={`marquee relative overflow-x-clip overflow-y-visible ${className}`.trim()}
      role="region"
      aria-label={ariaLabel}
    >
      <div
        dir="ltr"
        className={`marquee-track flex w-max flex-nowrap gap-3 ${direction === "right" ? "marquee-track-right" : "marquee-track-left"}`}
        style={
          {
            "--marquee-duration": `${durationSec}s`,
            "--marquee-copies": MARQUEE_COPY_COUNT
          } as React.CSSProperties
        }
      >
        {Array.from({ length: MARQUEE_COPY_COUNT }, (_, copyIndex) => (
          <Fragment key={copyIndex}>{children}</Fragment>
        ))}
      </div>
    </div>
  );
}
