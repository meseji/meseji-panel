"use client";
import React from "react";
import { launchWhatsAppSignup } from "@/lib/utils/FacebookLaunch";
import FacebookSDK from "@/components/Track/FacebookSdk";
import Button from "../ui/Button";
import { Icon } from "../Icon";
export default function FacebookConnect() {
  return (
    <>
      <FacebookSDK />
      <section className="mx-auto">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-between flex-col gap-3">
          <div className="block text-center mb-5 lg:text-left">
            <h2 className="font-manrope text-2xl text-white font-semibold mb-1">
              Connect with us
            </h2>
            <p className="text-base text-indigo-100 text-balance">
              Login with Facebook to start launching campaign and analyse phone
              number quality.
            </p>
          </div>
          <Button
            size="md"
            variant="outline"
            onClick={launchWhatsAppSignup}
            className="flex items-center w-full justify-center bg-white text-gray-600 hover:bg-gray-100 gap-1"
          >
            Connect with Facebook
            <Icon.rightarrow className="size-3" />
          </Button>
        </div>
      </section>
    </>
  );
}
