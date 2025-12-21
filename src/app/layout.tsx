import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ManualAuthProvider } from "@/components/auth/manual-auth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LostyoCord",
  description: "Experience the future of Discord integration with the unified LostyoCord Bot, Dashboard, and Extension.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0B0B0D] text-white`}>
        <ManualAuthProvider>
          {children}
        </ManualAuthProvider>
      </body>
    </html>
  );
}