import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { TRPCReactProvider } from "~/trpc/react";
import { headers } from "next/headers";
import Head from "next/head";
import { Header } from "./_components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Url shortener",
  description: "shorten your favorite URLs now",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          {metadata.icons.map((icon, index) => (
            <link key={index} rel={icon.rel} href={icon.url} />
          ))}
        </Head>
        <body className={`font-sans ${inter.variable}`}>
          <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <Header />
            <TRPCReactProvider headers={headers()}>
              {children}
            </TRPCReactProvider>
          </main>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
