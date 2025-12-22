import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "LostyoCord",
  description: "The simple way to grow your Discord community",
  icons: {
    icon: "https://cdn.lostyo.com/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}