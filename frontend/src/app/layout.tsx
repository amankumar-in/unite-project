// frontend/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import SiteLayout from "@/components/layout/SiteLayout";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNITE - Uganda Next Investment & Trade Expo 2025",
  description:
    "Showcasing trade partnerships and International Collaboration in Uganda",
  keywords: [
    "Uganda",
    "Investment",
    "Trade Expo",
    "International Collaboration",
  ],
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    title: "UNITE 2025",
    capable: true,
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "UNITE - Uganda Next Investment & Trade Expo 2025",
    description:
      "Showcasing trade partnerships and International Collaboration in Uganda",
    type: "website",
    siteName: "UNITE 2025",
    images: [
      {
        url: "/og-image1.jpg",
        width: 1200,
        height: 630,
        alt: "UNITE 2025 - Uganda Next Investment & Trade Expo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNITE - Uganda Next Investment & Trade Expo 2025",
    description:
      "Showcasing trade partnerships and International Collaboration in Uganda",
    images: [
      {
        url: "/og-image2.jpg",
        width: 1200,
        height: 600,
        alt: "UNITE 2025 - Uganda Next Investment & Trade Expo",
      },
    ],
    creator: "@uniteexpo",
    site: "@uniteexpo",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://ugandanext.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            <SiteLayout>{children}</SiteLayout>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
