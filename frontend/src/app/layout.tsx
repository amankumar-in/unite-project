import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";
import SiteLayout from "@/components/layout/SiteLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNITE - Uganda Next Investment & Trade Expo 2025",
  description:
    "Showcasing investment opportunities and trade partnerships in Uganda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <SiteLayout>{children}</SiteLayout>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
