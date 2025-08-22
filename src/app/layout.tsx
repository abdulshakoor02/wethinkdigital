import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeThinkDigital - Full-Stack Development & Growth Marketing",
  description: "Transform your business with our end-to-end digital solutions. From concept to market domination, we drive real results.",
  keywords: "software development, digital marketing, web development, mobile apps, growth marketing, SEO, PPC, conversion optimization",
  authors: [{ name: "WeThinkDigital Team" }],
  creator: "WeThinkDigital",
  openGraph: {
    title: "WeThinkDigital - Digital Excellence",
    description: "End-to-end digital solutions that drive real business growth",
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
