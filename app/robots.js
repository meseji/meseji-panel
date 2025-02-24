import { siteConfig } from "@/config/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
