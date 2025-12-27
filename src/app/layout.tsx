import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/shared/loading-screen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lostyo Studios | Premium Roblox Development",
  description: "High-end Roblox experiences, built for the future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}