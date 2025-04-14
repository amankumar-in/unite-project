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
    "Showcasing investment opportunities and trade partnerships in Uganda",
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
