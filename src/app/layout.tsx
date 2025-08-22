import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "./schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Development and Digital Marketing in Dubai, UAE | WeThinkDigital",
  description: "Expert web development, digital marketing, and SEO services in Dubai and across the UAE. We help businesses grow with results-driven digital solutions.",
  keywords: "web development dubai, digital marketing uae, seo services dubai, e-commerce development uae, mobile app development dubai, growth marketing uae, shopify development dubai, magento development uae",
  authors: [{ name: "WeThinkDigital Team" }],
  creator: "WeThinkDigital",
  openGraph: {
    title: "WeThinkDigital - Digital Excellence in Dubai & UAE",
    description: "End-to-end digital solutions that drive real business growth in the UAE.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17485985143"
        ></Script>
        <Script
          id="gtag-inline-script"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17485985143');
            `,
          }}
        />
        <link rel="icon" href="/wethinkdigital.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
