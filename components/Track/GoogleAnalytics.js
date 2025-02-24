'use client'
import { useEffect } from 'react';
import Script from 'next/script';

const GoogleAnalytics = ({ trackingId }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gtag('config', trackingId, {
        page_path: window.location.pathname,
      });
    }
  }, [trackingId]); // Include trackingId in the dependency array

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
