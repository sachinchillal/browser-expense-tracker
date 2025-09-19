"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/appStore";
import { HeaderComponent } from "@/components/Header";
import { FooterComponent } from "@/components/Footer";
import { isLoading } from "@/services/appService";
import { LoaderComponent } from "@/components/Loader";
import { Suspense } from "react";

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
  title: "Browser Expense Tracker",
  description: "A simple expense tracker browser application built with Next.js",
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
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            <HeaderComponent />
            {isLoading && <LoaderComponent />}
            {children}
            <FooterComponent />
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
