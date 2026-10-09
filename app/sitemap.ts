import { EXERCISES } from "@/lib/exercises";
import type { MetadataRoute } from "next";
import { getLocalAreaSlugs } from "@/lib/localAreas";

import { SCHEMA_SITE_URL as BASE_URL } from "@/lib/businessSchema";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/book-online",
    "/contact",
    "/philadelphia",
    "/philadelphia/workplace",
    "/philadelphia/hotel-visits",
    "/check-your-location",
    "/forms",
    "/group-intake",
    "/exercises",
    "/high-intensity-laser-therapy",
    "/group-visits/standard",
    "/group-visits/premium",
    "/philosophy",
    "/pricing",
    "/service-areas",
    "/touring-production-care",
    "/touring-production-care/care-approach",
    "/touring-production-care/how-it-works",
    "/touring-production-care/request",
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

  const exercisePages: MetadataRoute.Sitemap = Object.keys(EXERCISES).map(slug => ({
    url: `${BASE_URL}/exercises/${slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...localAreaPages, ...exercisePages];
}
