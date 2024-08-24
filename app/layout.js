"use client";  // Add this directive at the top

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Google Analytics setup
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8QHBPVG77N');
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8QHBPVG77N"></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
