"use client";

import FacebookSDK from "@/components/Track/FacebookSdk";
import { launchWhatsAppSignup } from "@/lib/utils/FacebookLaunch";
import { Circle, CircleCheckIcon, Facebook } from "lucide-react";

const steps = [
  {
    id: 1,
    type: "done",
    title: "Sign in with your account",
    description:
      "To get started, log in with your organization account from your company.",
    href: "#",
  },
  {
    id: 2,
    type: "in progress",
    title: "Connect your Whatsapp Business Account",
    description: "Connect your Whatsapp Business Account to setup profile.",
    href: "#",
  },
  {
    id: 3,
    type: "open",
    title: "Import your first love (e.g. customer number)",
    description: "Import Customer number to start sending messages.",
    href: "#",
  },
];

export default function Page() {
  return (
    <>
      <FacebookSDK />
      <div className="sm:mx-auto sm:max-w-lg">
        <h3 className="text-gray-700 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Hello, Meseji
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Let&apos;s set up your first whatsapp business account.
        </p>
        <ul role="list" className="mt-8 space-y-3">
          {steps.map((step) =>
            step.type === "done" ? (
              <li key={step.id} className="relative p-4">
                <div className="flex items-start">
                  {/* <RiCheckboxCircleFill
                    className="size-6 shrink-0 text-tremor-brand dark:text-dark-tremor-brand"
                    aria-hidden={true}
                  /> */}
                  <CircleCheckIcon className="size-6 shrink-0 text-green-600 " />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-gray-800 dark:text-dark-tremor-content-strong">
                      <a href={step.href} className="focus:outline-none">
                        {/* extend link to entire list card */}
                        <span className="absolute inset-0" aria-hidden={true} />
                        {step.title}
                      </a>
                    </p>
                    <p className="mt-1 text-tremor-default leading-6 text-gray-600 dark:text-dark-tremor-content">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ) : step.type === "in progress" ? (
              <li className="rounded-tremor-default bg-gray-200 p-4 ">
                <div className="flex items-start">
                  {/* <RiCheckboxBlankCircleLine
                    className="size-6 shrink-0 text-tremor-brand dark:text-dark-tremor-brand"
                    aria-hidden={true}
                  /> */}
                  <Circle className="size-6 shrink-0 text-tremor-brand dark:text-dark-tremor-brand" />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-gray-800 dark:text-dark-tremor-content-strong">
                      {step.title}
                    </p>
                    <p className="mt-1 text-tremor-default text-gray-600 leading-6 text-tremor-content dark:text-dark-tremor-content">
                      {step.description}
                    </p>
                    <button
                      onClick={launchWhatsAppSignup}
                      type="button"
                      className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap rounded-md bg-black px-3 py-2 text-white font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted  dark:hover:bg-dark-tremor-brand-emphasis"
                    >
                      {/* <RiDatabase2Line
                        className="-ml-0.5 size-5 shrink-0"
                        aria-hidden={true}
                      /> */}
                      <Facebook className="size-5 shrink-0" />
                      Connect Whatsapp
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li className="relative p-4">
                <div className="flex items-start">
                  {/* <RiCheckboxBlankCircleLine
                    className="size-6 shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                    aria-hidden={true}
                  /> */}
                  <Circle className="size-6 shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle" />
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium leading-5 text-gray-800 dark:text-dark-tremor-content-subtle">
                      <a href={step.href} className="focus:outline-none">
                        {/* extend link to entire list card */}
                        <span className="absolute inset-0" aria-hidden={true} />
                        {step.title}
                      </a>
                    </p>
                    <p className="mt-1 text-gray-600 leading-6 text-tremor-content-subtle dark:text-dark-tremor-content-subtle">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        <div className="mt-12 rounded-tremor-default bg-gray-200 p-4 dark:bg-dark-tremor-background-muted">
          <h4 className="text-tremor-default font-medium text-gray-600 dark:text-dark-tremor-content-strong">
            Need help?
          </h4>
          <p className="mt-1 text-tremor-default text-gray-800 dark:text-dark-tremor-content">
            Connect with a member of our team at{" "}
            <a
              href="mailto:support@company.com"
              className="font-medium text-blue-600 dark:text-dark-tremor-brand"
            >
              support@company.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
