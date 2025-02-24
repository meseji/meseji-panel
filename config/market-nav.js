import { Icon } from "@/components/Icon";
const ref = "ref=meseji-market-nav";
export const marketMenu = [
  {
    id: "product",
    title: "Product",
    url: "/product",
    isActive: false,
    children: [
      {
        id: "whatsapp-broadcast",
        title: "WhatsApp Broadcast",
        description: "Broadcast messages to multiple customers at once.",
        url: "/product/whatsapp-broadcast",
        icon: Icon.broadcastM,
        isActive: true,
        children: [],
      },
      {
        id: "automations",
        title: "Automations",
        description:
          "Marketing on a new level with visual, drag & drop creator.",
        url: "/product/messaging-automations",
        icon: Icon.automationM,
        isActive: true,
        children: [],
      },
      {
        id: "whatsapp-api",
        title: "WhatsApp API",
        description: "Send and receive messages with the WhatsApp API.",
        url: "/product/whatsapp-api",
        icon: Icon.whatsappApiM,
        isActive: false,
        children: [],
      },
      {
        id: "live-chat-chatbots",
        title: "Live Chat & Chatbots",
        description: "Engage customers with live chat and chatbots.",
        url: "/product/live-chat-chatbots",
        icon: Icon.chatbotM,
        isActive: true,
        children: [],
      },
      {
        id: "crm",
        title: "CRM",
        description: "Manage customer relationships with ease.",
        url: "/product/crm",
        icon: Icon.crmM,
        isActive: true,
        children: [],
      },
    ],
    addons: [
      {
        title: "Book Demo",
        url: "/product/whatsapp-broadcast",
        icon: Icon.broadcastM,
      },
      {
        title: "Automations",
        url: "/product/messaging-automations",
        icon: Icon.automationM,
      },
    ],
  },
  {
    id: "industries",
    title: "Industries",
    url: "/industries",
    isActive: true,
    children: [
      {
        id: "ecommerce",
        title: "Ecommerce",
        description: "Solutions for B2C, B2B, and D2C brands",
        url: "/industries/whatsapp-business-for-ecommerce",
        icon: Icon.ecommerceM,
        isActive: true,
        children: [],
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description: "Simplify Solutions for healthcare providers",
        url: "/industries/whatsapp-business-for-healthcare",
        icon: Icon.healthcareM,
        isActive: true,
        children: [],
      },
      {
        id: "education",
        title: "Education",
        description: "Empower Edtech, coaches and institutes",
        url: "/industries/whatsapp-business-for-education",
        icon: Icon.educationM,
        isActive: true,
        children: [],
      },
      {
        id: "finance",
        title: "Finance",
        description: "Streamline banking and fintech messaging",
        url: "/industries/whatsapp-business-for-finance",
        icon: Icon.financeM,
        isActive: true,
        children: [],
      },
      {
        id: "travel",
        title: "Travel",
        description: "Promote bookings and enhance experiences",
        url: "/industries/whatsapp-business-for-travel",
        icon: Icon.travelM,
        isActive: true,
        children: [],
      },
      {
        id: "all-industries",
        title: "All Industries",
        description: "Solutions for all industries",
        url: "/industries",
        icon: Icon.globeM,
        isActive: true,
        children: [],
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    url: "/integrations",
    isActive: true,
    children: [
      {
        id: "shopify",
        title: "Shopify",
        description: "Send updates from your Shopify store.",
        url: "/integrations/shopify-whatsapp-integration",
        icon: Icon.shopify,
        isActive: true,
        children: [],
      },
      {
        id: "woocommerce",
        title: "WooCommerce",
        description: "Sync orders with your WooCommerce store.",
        url: "/integrations/whatsapp-for-woocommerce",
        icon: Icon.woocommerce,
        isActive: true,
        children: [],
      },
      {
        id: "google_sheets",
        title: "Google Sheets",
        description: "Automate WhatsApp messages with Google Sheets.",
        url: "/integrations/google-sheets-whatsapp-integration",
        icon: Icon.googlesheets,
        isActive: false,
        children: [],
      },
      {
        id: "zendesk",
        title: "Zendesk",
        description: "Deliver WhatsApp support with Zendesk integration.",
        url: "/integrations/zendesk-whatsapp-integration",
        icon: Icon.zendesk,
        isActive: false,
        children: [],
      },
      {
        id: "salesforce",
        title: "Salesforce",
        description: "Manage WhatsApp chats via Salesforce CRM.",
        url: "/integrations/salesforce-whatsapp-integration",
        icon: Icon.salesforce,
        isActive: true,
        children: [],
      },
      {
        id: "zapier",
        title: "Zapier",
        description: "Automate workflows with Zapier and WhatsApp.",
        url: "/integrations/zapier-whatsapp-integration",
        icon: Icon.zapier,
        isActive: false,
        children: [],
      },
      {
        id: "hubspot",
        title: "HubSpot",
        description: "Connect WhatsApp to HubSpot for engagement.",
        url: "/integrations/hubspot-whatsapp-integration",
        icon: Icon.hubspot,
        isActive: false,
        children: [],
      },
      {
        id: "magento",
        title: "Magento",
        description: "Automate messages for Magento customers.",
        url: "/integrations/magento-whatsapp-integration",
        icon: Icon.magento,
        isActive: true,
        children: [],
      },
      {
        id: "bigcommerce",
        title: "BigCommerce",
        description: "Update customers from your BigCommerce store.",
        url: "/integrations/bigcommerce-whatsapp-integration",
        icon: Icon.bigcommerce,
        isActive: true,
        children: [],
      },
      {
        id: "stripe",
        title: "Stripe",
        description: "Send payment updates through WhatsApp easily.",
        url: "/integrations/stripe-whatsapp-integration",
        icon: Icon.stripe,
        isActive: true,
        children: [],
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    url: "/resources",
    isActive: true,
    children: [
      {
        id: "blogs",
        title: "Blogs",
        description: "Read the latest news and updates",
        url: `/blog?${ref}`,
        icon: Icon.blogM,
        isActive: true,
        children: [],
      },
      {
        id: "case-studies",
        title: "Case Studies",
        description: "See how our customers are using us",
        url: "/resources/case-studies",
        icon: Icon.caseStudyM,
        isActive: false,
        children: [],
      },
      {
        id: "api-docs",
        title: "API Documentation",
        description: "Get started with our API documentation",
        url: `https://docs.meseji.app/api-reference/apireference/AuthController_register?${ref}`,
        icon: Icon.linkM,
        isActive: true,
        children: [],
      },
      {
        id: "help-and-guides",
        title: "Help & guidess",
        description: "Learn Guides, How to's and FAQs",
        url: `https://docs.meseji.app/documentation/introduction?${ref}`,
        icon: Icon.helpM,
        isActive: true,
        children: [],
      },
      {
        id: "contact",
        title: "Contact",
        description: "Reach out to us",
        url: `/contact-us?${ref}`,
        icon: Icon.contactM,
        isActive: true,
        children: [],
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    url: `/pricing?${ref}`,
    icon: "",
    isActive: true,
    children: [],
  },
];
