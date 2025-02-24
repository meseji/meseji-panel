export function generateMetadata({ title, description, url, image, date }) {
    const siteConfig = {
      url: "https://meseji.app", // Replace with your site's URL
      title: "Meseji",
      description: "Meseji - Your Marketing Solution",
      name: "Meseji",
    };
  
    return {
      metadataBase: new URL(siteConfig.url),
      title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
      },
      description: description || siteConfig.description,
      image: image || "/logo.png",
      url: url || siteConfig.url,
      type: "website",
      siteName: siteConfig.name,
      date: date || new Date().toISOString().split('T')[0],
      keywords: [
        "meseji",
        "whatsappapi",
        "whatsapp",
        "sms",
        "marketing",
        "email",
        "chatbot",
      ],
      openGraph: {
        type: "website",
        locale: "en_US",
        url: url || siteConfig.url,
        title: title || siteConfig.title,
        description: description || siteConfig.description,
        siteName: siteConfig.name,
        images: [
          {
            url: image || "/og-image.jpeg",
            width: 1200,
            height: 630,
            alt: title || siteConfig.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@meseji",
      },
      manifest: `${siteConfig.url}/manifest.json`,
    };
  }
  