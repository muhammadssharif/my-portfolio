import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CosmicChrome } from "@/components/layout/CosmicChrome";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { localeMetadata, routing } from "@/i18n/routing";
import { resolveServerTheme } from "@/lib/theme-server";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "meta" });
  const config = localeMetadata[locale as keyof typeof localeMetadata];

  return {
    metadataBase: new URL("https://my-portfolio-moeseneca.vercel.app"),
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      url: "https://my-portfolio-moeseneca.vercel.app",
      siteName: t("siteName"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("ogAlt") }],
      locale: config.openGraphLocale,
      type: "website"
    },
    robots: { index: true, follow: true }
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const config = localeMetadata[locale as keyof typeof localeMetadata];
  const theme = await resolveServerTheme();

  return (
    <html
      lang={config.htmlLang}
      dir={config.dir}
      data-theme={theme}
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider initialTheme={theme}>
            <ScrollToTop />
            <CosmicChrome />
            <div className="site-shell relative mx-auto min-h-screen max-w-6xl px-4 pb-12 pt-5 md:px-8 md:pt-6">
              <Header />
              <main className="relative">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
