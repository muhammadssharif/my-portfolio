import Link from "next/link";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { defaultLocale } from "@/i18n/locales";
import "./globals.css";

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

export default function RootNotFound() {
  return (
    <html lang="en" data-theme="dark" className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}>
      <body className="flex min-h-screen items-center justify-center px-4">
        <div className="surface-card w-full max-w-lg rounded-3xl px-8 py-12 text-center">
          <p className="eyebrow">Signal lost</p>
          <p className="font-display text-7xl font-semibold tracking-tight text-[var(--accent)]">404</p>
          <h1 className="mt-4 font-display text-2xl font-semibold">This page drifted out of orbit</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            The route you requested is not on our map. Head back to charted space.
          </p>
          <Link href={`/${defaultLocale}`} className="btn btn-primary mt-8 inline-flex">
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
