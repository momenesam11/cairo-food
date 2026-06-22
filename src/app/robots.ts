import type { MetadataRoute } from "next";

const siteUrl = "https://www.cairofoodintl.eg";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
