import { THEME_COOKIE_NAME, type Theme } from "@/lib/theme";

/** Ensures `data-theme` is set before paint when Safari serves cached HTML without it. */
export function ThemeBootstrap({ theme }: { theme: Theme }) {
  const fallback = theme;
  const cookie = THEME_COOKIE_NAME;

  return (
    <script
      id="theme-bootstrap"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var el=document.documentElement;if(!el.getAttribute("data-theme")){var m=document.cookie.match(/(?:^|;\\s*)${cookie}=(light|dark)/);el.setAttribute("data-theme",m?m[1]:"${fallback}");}var ua=typeof navigator!=="undefined"&&navigator.userAgent?navigator.userAgent:"";if(/AppleWebKit/i.test(ua)&&/Safari/i.test(ua)&&!/Chrome|Chromium|CriOS|Edg|OPR|FxiOS/i.test(ua)){el.dataset.browser="safari";}}catch(e){}})();`
      }}
    />
  );
}
