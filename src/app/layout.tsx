"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { GlobalDataProvider } from "@/providers/GlobalDataProvider";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const metadata1 = {
  title: "Browser Notepad",
  description: "A simple notepad application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata1.title}</title>
        <meta name="description" content={metadata1.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-gray-100 bg-gray-50 text-gray-900`}
      >
        <GlobalDataProvider>
          <Header />
          {children}
          <Footer />
        </GlobalDataProvider>
      </body>
    </html>
  );
}
