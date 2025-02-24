import { Blog } from "@/components/marketing/home/Blog";
import { Integrations } from "@/components/marketing/home/Integrations";
import { Hero } from "@/components/marketing/home/Hero";
import { Content } from "@/components/marketing/home/Content";
import { Testimonial } from "@/components/marketing/home/Testimonial";
import { ClientLogo } from "@/components/marketing/home/ClientLogo";
import { Stats } from "@/components/marketing/home/Stats";
import { Document } from "@/components/marketing/home/Document";
import { HowDo } from "@/components/marketing/home/HowDo";
import { Solutions } from "@/components/marketing/home/Solutions";
import { Show } from "@/components/marketing/home/Show";
import { Icon } from "@/components/Icon";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: "https://meseji.app/logo.png",
        sameAs: [
          siteConfig.links.facebook,
          siteConfig.links.linkedin,
          siteConfig.links.twitter,
          siteConfig.links.instagram,
          siteConfig.links.youtube,
        ],
        email: "contact@meseji.app",
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          minValue: 10,
          maxValue: 99,
        },
        // contactPoint: {
        //   "@type": "ContactPoint",
        //   telephone: "+91 9456081065",
        //   contactType: "customer service",
        //   areaServed: "IN",
        //   availableLanguage: "en",
        // },
      },
      // {
      //   "@type": "LocalBusiness",
      //   name: "Meseji",
      //   image: "https://meseji.app/office.jpg",
      //   address: {
      //     "@type": "PostalAddress",
      //     streetAddress: "123 Meseji",
      //     addressLocality: "Noida",
      //     addressRegion: "UP",
      //     postalCode: "462001",
      //     addressCountry: "IN",
      //   },
      //   url: "https://meseji.app",
      //   telephone: "+91 9456081065",
      //   openingHours: "Mo-Fr 09:00-18:00",
      //   priceRange: "$$",
      //   geo: {
      //     "@type": "GeoCoordinates",
      //     latitude: "23.2599",
      //     longitude: "77.4126",
      //   },
      // },
    ],
  };

  const t = useTranslations("home");

  const statsData = [
    {
      id: 1,
      value: "98%",
      description: t("stats.openRates"),
      icon: Icon.broadcast,
    },
    {
      id: 2,
      value: "80%",
      description: t("stats.clickRates"),
      icon: Icon.broadcast,
    },
    {
      id: 3,
      value: "2.6Bn+",
      description: t("stats.activeUsers"),
      icon: Icon.broadcast,
    },
  ];
  return (
    <main>
      <Hero />
      <HowDo />
      <Show />
      <Solutions />
      <Stats
        title={t("title")}
        description={t("description")}
        stats={statsData}
      />
      <Integrations />
      <Blog />
      {/* <Content /> */}
      {/* <ClientLogo /> */}
      <Testimonial />
      {/* <Document /> */}
    </main>
  );
}
