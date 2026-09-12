import type { MetadataRoute } from "next";
import { getLocalAreaSlugs } from "@/lib/localAreas";

const BASE_URL = "https://gochiromobile.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/book-online",
    "/contact",
    "/forms",
    "/philosophy",
    "/pricing",
    "/service-areas",
    "/touring-production-care",
    "/what-to-expect",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority:
      route === "" ? 1 : route === "/service-areas" || route === "/touring-production-care" ? 0.9 : 0.8,
  }));

  const localAreaPages: MetadataRoute.Sitemap = getLocalAreaSlugs().map((slug) => ({
    url: `${BASE_URL}/service-areas/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...localAreaPages];
}
