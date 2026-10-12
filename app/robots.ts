import type { MetadataRoute } from "next";

import { SCHEMA_SITE_URL as BASE_URL } from "@/lib/businessSchema";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
