import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllEntries } from "@/lib/content";
import { collectionPath, funPath, localizedRoute } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    localizedRoute("pt"),
    localizedRoute("en"),
    localizedRoute("pt", "/about"),
    localizedRoute("en", "/about"),
    collectionPath("pt", "work"),
    collectionPath("en", "work"),
    funPath("pt"),
    funPath("en"),
  ];

  const contentRoutes = [
    ...getAllEntries("pt").map((entry) => entry.href),
    ...getAllEntries("en").map((entry) => entry.href),
  ];

  return [...staticRoutes, ...contentRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
  }));
}
