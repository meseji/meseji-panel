import { useEffect, useState } from "react";

const Facebook = () => {
  const [userStatus, setUserStatus] = useState(""); // State to manage login status

  useEffect(() => {
    const initializeFacebookSDK = () => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v20.0",
        });

        // Check the current login status
        FB.getLoginStatus(function (response) {
          statusChangeCallback(response);
        });
      };

      // Load the Facebook SDK script asynchronously if it doesn't already exist
      if (!document.getElementById("facebook-jssdk")) {
        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    // Initialize the SDK only on client-side
    if (typeof window !== "undefined") {
      initializeFacebookSDK();
    }
  }, []);

  // Callback for status change
  const statusChangeCallback = (response) => {
    console.log("statusChangeCallback", response);

    if (response.status === "connected") {
      // Logged into your app and Facebook
      testAPI();
    } else {
      // Not logged in
      setUserStatus("Please log into this webpage.");
    }
  };

  // Check login state when login button is clicked
  const checkLoginState = () => {
    if (typeof FB !== "undefined") {
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    }
  };

  // Test the Graph API after login
  const testAPI = () => {
    console.log("Welcome! Fetching your information....");
    FB.api("/me", function (response) {
      console.log("Successful login for: " + response.name);
      setUserStatus("Thanks for logging in, " + response.name + "!");
    });
  };

  return (
    <div>
      <div id="fb-root"></div>
      {/* Facebook Login Button */}
      <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="login_with"
        data-layout="rounded"
        data-auto-logout-link="true"
        data-use-continue-as="true"
        data-scope="public_profile,email"
        data-onlogin="checkLoginState();"
      ></div>
      {/* Display status message */}
      <div id="status">{userStatus}</div>
    </div>
  );
};

export default Facebook;
