import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Digital Marketing Company in Dubai | Custom Web Development Dubai",
  description: "I help businesses in Dubai & UAE dominate their market with custom web development, SEO, and digital marketing services. I get results. It's that simple.",
  keywords: "best digital marketing company dubai, digital marketing services dubai uae, social media marketing agency dubai, seo services dubai small business, ppc advertising company dubai, content marketing services uae, email marketing agency dubai, website design companies dubai uae, custom web development dubai, ecommerce website development uae, responsive web design dubai, mobile app development dubai, wordpress development company dubai, custom software development dubai, mobile app developers uae, enterprise software solutions dubai, crm software development dubai, business automation software uae",
  authors: [{ name: "WeThinkDigital Team" }],
  creator: "WeThinkDigital",
  openGraph: {
    title: "Best Digital Marketing Company in Dubai | Custom Web Development Dubai",
    description: "I help businesses in Dubai & UAE dominate their market with custom web development, SEO, and digital marketing services. I get results. It's that simple.",
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
