import { Icon } from "@/components/Icon";

export const sidebarNav = [
  {
    id: 1,
    title: "Dashboard",
    route: "/dashboard",
    icon: Icon.home,
    isActive: true,
  },
  {
    id: 2,
    title: "Chat",
    route: "/dashboard/chat",
    icon: Icon.chat,
    isActive: false,
  },

  {
    id: 3,
    title: "Broadcast",
    route: "/dashboard/broadcast",
    icon: Icon.broadcast,
    isActive: true,
  },
  {
    id: 4,
    title: "Contacts",
    route: "/dashboard/contacts",
    icon: Icon.contat,
    isActive: true,
  },
  {
    id: 5,
    title: "Chatbot",
    route: "/dashboard/chatbot",
    icon: Icon.bot,
    isActive: false,
  },
  {
    id: 6,
    title: "Reports",
    route: "/dashboard/reports",
    icon: Icon.report,
    isActive: false,
  },
  {
    id: 7,
    title: "Flows",
    route: "/dashboard/flows",
    icon: Icon.workflow,
    isActive: true,
  },
  {
    id: 8,
    title: "Ads",
    route: "/dashboard/advertise",
    icon: Icon.ads,
    isActive: false,
  },

  {
    id: 9,
    title: "Templates",
    route: "/dashboard/template",
    icon: Icon.template,
    isActive: true,
  },

  {
    id: 10,
    title: "Setting",
    route: "/dashboard/settings",
    icon: Icon.settings,
    isActive: false,
  },
  {
    id: 11,
    title: "Whatsapp",
    route: "/dashboard/whatsapp",
    icon: Icon.settings,
    isActive: false,
  },
];
