type IconProps = {
  className?: string;
  size?: number;
};

const strokeProps = {
  stroke: "currentColor",
  strokeWidth: 2,
  fill: "none"
} as const;

function IconSvg({ size = 18, className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconSun({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <circle cx="12" cy="12" r="4" {...strokeProps} />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        {...strokeProps}
        strokeLinecap="round"
      />
    </IconSvg>
  );
}

export function IconMoon({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path
        d="M21 14.5A8.5 8.5 0 1 1 9.5 3 9.8 9.8 0 0 0 21 14.5Z"
        {...strokeProps}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function IconChevronLeft({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m15 18-6-6 6-6" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconChevronRight({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m9 18 6-6-6-6" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconChevronDown({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m6 9 6 6 6-6" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconChevronUp({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m18 15-6-6-6 6" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconArrowUpRight({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="M7 17 17 7M7 7h10v10" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconArrowRight({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconDownload({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="M12 15V3M8 11l4 4 4-4" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19h16" {...strokeProps} strokeLinecap="round" />
    </IconSvg>
  );
}

export function IconSend({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2 11 13" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconGithub({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 4.77 5.07 5.07 0 0 0 17.91 1S16.73.65 13 2.48a13.38 13.38 0 0 0-7 0C2.27.65 1.09 1 1.09 1A5.07 5.07 0 0 0 0 4.77 5.44 5.44 0 0 0 1.5 8.91c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 7 18.13V22"
        {...strokeProps}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function IconLinkedin({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" {...strokeProps} />
      <circle cx="4" cy="4" r="2" {...strokeProps} />
    </IconSvg>
  );
}

export function IconMail({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" {...strokeProps} />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" {...strokeProps} strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

export function IconMenu({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" {...strokeProps} strokeLinecap="round" />
    </IconSvg>
  );
}

export function IconX({ size = 18, className }: IconProps) {
  return (
    <IconSvg size={size} className={className}>
      <path d="m6 6 12 12M18 6 6 18" {...strokeProps} strokeLinecap="round" />
    </IconSvg>
  );
}
