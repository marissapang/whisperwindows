import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import GtmPageView from './gtm-pageview'; //


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whisper Windows",
  description: "Soundproof Windows in NYC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en">
      {/* Per Next.js docs: mount GTM at the root */}
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className={inter.className}>
        {/* Fire SPA pageviews on route changes */}
        <Suspense fallback={null}>
          <GtmPageView />
        </Suspense>
        {children}
      </body>
    </html>
  );
}