import FacebookSDK from "@/components/Track/FacebookSdk";
import React from "react";

export default function FacebookLayout({ children }) {
  return (
    <div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
