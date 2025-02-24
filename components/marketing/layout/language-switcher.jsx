"use client";
"use client";

import { Button } from "@/components/dashboard/shared/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/dashboard/shared/ui/popover";
import { Icon } from "@/components/Icon";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export const languages = [
  { code: "en", name: "English" }, //
  // { code: "nl", name: "Dutch" }, //
  { code: "es", name: "Español" }, //
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" }, //
  { code: "pt", name: "Português" }, //
  { code: "hi", name: "हिन्दी" }, //
  { code: "ar", name: "العربية" }, //
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const l = useLocale();

  // const changeLanguage = (locale) => {
  //   // router.push(`/${locale}${pathname}`);
  //   router.push(pathname, { locale: locale });
  // };
  const changeLanguage = (newLocale) => {
    router.replace({pathname, params}, { locale: newLocale });
    router.refresh();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center p-2 rounded-full hover:bg-lime-50 bg-gray-50 ">
          <Icon.globeLang className="size-6 " />
          {/* <span>{l}</span> */}
        </button>
        {/* <Button variant="outline">Tooltip-like with steps</Button> */}
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[150px] py-2 shadow-none mt-2"
        side="top"
      >
        <div className="space-y-1">
          {/* {languages.map(({ code, name }) => (
            <button
              key={code}
              className="block w-full px-2 py-1 text-left hover:bg-gray-100 "
              onClick={() => changeLanguage(code)}
            >
              {name}
            </button>
          ))} */}
          {languages.map((lang, name) => (
            <button
              key={name}
              className="block w-full px-2 py-1 text-left hover:bg-gray-100 "
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
