import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar", "de", "es", "fr", "hi", "pt"],
  defaultLocale: "en",
  localeDetection: true,
  // localePrefix: "as-needed"
  localePrefix: {
    mode: "as-needed",
  },
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
