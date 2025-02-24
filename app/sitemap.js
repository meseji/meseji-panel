import { industries } from "@/config/data/industries";
import { integrations } from "@/config/data/integrations";
import { siteConfig } from "@/config/site";


export default async function sitemap() {
  const BASE_URL = siteConfig.url;
  
  const industryRoutes = industries.map((industry) => ({
    url: `${BASE_URL}/industries/${industry?.slug}`,
    lastModified: industry?.updatedAt || new Date(),
   
  }));

  // Dynamic pages for integrations
  const integrationRoutes = integrations.map((integration) => ({
    url: `${BASE_URL}/integrations/${integration?.slug}`,
    lastModified: integration?.updatedAt || new Date(),
  }));
  return [
    {
      url: "https://meseji.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://meseji.app/contact-us",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/terms-conditions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/refund-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://meseji.app/register",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: "https://meseji.app/blog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://docs.meseji.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    ...industryRoutes,
    ...integrationRoutes,
  ];
}
