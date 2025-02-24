"use client"; // Ensures it's a client-side component

import { useEffect } from "react";

export default function FacebookSDK() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, 
        cookie: true,
        xfbml: true,
        version: "v21.0",
      });
    };

    // Load Facebook SDK script
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return null; // No need to render anything
}
