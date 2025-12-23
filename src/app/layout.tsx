import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "LostyoCord",
  description: "The simple way to grow your Discord community",
  icons: {
    icon: '/favicon.ico', 
    apple: '/apple-touch-icon.png',
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