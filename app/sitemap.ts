import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";

const baseUrl = "https://my-portfolio-moeseneca.vercel.app";

const paths = ["/", "/work", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}/${locale}${path === "/" ? "" : path}`,
      changeFrequency: path === "/contact" ? "monthly" : "weekly",
      priority: path === "/" ? 1 : path === "/work" ? 0.9 : 0.8
    }))
  );
}
