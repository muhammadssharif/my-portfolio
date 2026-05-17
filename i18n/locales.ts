export const locales = ["en", "fr", "es", "ar", "ur"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Non-translatable locale metadata (routing, SEO, document attributes). */
export const localeMetadata: Record<
  Locale,
  {
    flag: string;
    htmlLang: string;
    dir: "ltr" | "rtl";
    openGraphLocale: string;
    /** Language name in that language (always shown natively in the switcher). */
    nativeLabel: string;
    /** Region hint in that language. */
    nativeRegion: string;
  }
> = {
  en: {
    flag: "🇨🇦",
    htmlLang: "en-CA",
    dir: "ltr",
    openGraphLocale: "en_CA",
    nativeLabel: "English",
    nativeRegion: "Canada"
  },
  fr: {
    flag: "🇨🇦",
    htmlLang: "fr-CA",
    dir: "ltr",
    openGraphLocale: "fr_CA",
    nativeLabel: "Français",
    nativeRegion: "Canada"
  },
  es: {
    flag: "🇲🇽",
    htmlLang: "es-MX",
    dir: "ltr",
    openGraphLocale: "es_MX",
    nativeLabel: "Español",
    nativeRegion: "México"
  },
  ar: {
    flag: "🇸🇦",
    htmlLang: "ar-SA",
    dir: "rtl",
    openGraphLocale: "ar_SA",
    nativeLabel: "العربية",
    nativeRegion: "السعودية"
  },
  ur: {
    flag: "🇵🇰",
    htmlLang: "ur-PK",
    dir: "rtl",
    openGraphLocale: "ur_PK",
    nativeLabel: "اردو",
    nativeRegion: "پاکستان"
  }
};
