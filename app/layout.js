"use client";  // Add this directive at the top

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Google Analytics setup
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

    if (GA_TRACKING_ID) { // Ensure the GA_TRACKING_ID exists before running GA setup
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID);
    }
  }, []);

  const metadata = {
    title: "Rate My Professor GSU AI",
    description: "Rate My Professor GSU AI Edition",
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Google Analytics Script */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          ></script>
        )}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
