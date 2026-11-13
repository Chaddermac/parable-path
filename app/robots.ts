import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/results/", "/feedback/", "/reflect", "/assessment", "/experiences/formation/results/"]
    },
    sitemap: "https://www.parablepath.com/sitemap.xml"
  };
}
