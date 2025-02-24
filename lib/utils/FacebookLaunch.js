export async function launchWhatsAppSignup() {
  if (typeof fbq !== "undefined") {
    fbq("trackCustom", "WhatsAppOnboardingStart", {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
      feature: "whatsapp_embedded_signup",
    });
  }

  if (typeof FB !== "undefined") {
    const loginPromise = new Promise((resolve, reject) => {
      FB.login(
        (response) => {
          if (response.authResponse) {
            const code = response.authResponse.code;
            // console.log("Authorization code:", code);
            resolve(code);
          } else {
            console.log("User cancelled login or did not fully authorize.");
            reject(
              new Error("User cancelled login or did not fully authorize.")
            );
          }
        },
        {
          scope: "public_profile,email",
          config_id: process.env.NEXT_PUBLIC_FACEBOOK_CONFIG_ID,
          response_type: "code",
          override_default_response_type: true,
          extras: {
            setup: {
              business: {
                name: "Astreak",
                id: process.env.NEXT_PUBLIC_FACEBOOK_BUSINESS_ID,
              },
              preVerifiedPhone: {},
              phone: {},
              whatsAppBusinessAccount: {},
            },
            featureType: 'only_waba_sharing',
            // type: "WA_EMBEDDED_SIGNUP",
            sessionInfoVersion: "3",
          },
        }
      );
    });

    try {
      const code = await loginPromise;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/facebook/callback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        }
      );
      console.log(res);
      if (!res.ok) {
        const error = await res.json();
        console.error("Onboarding failed:", error);
      } else {
        const data = await res.json();
        console.log("Onboarding successful:", data);

        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error during Facebook login or fetching token:", error);
    }
  } else {
    console.error("Facebook SDK is not loaded.");
  }
}
