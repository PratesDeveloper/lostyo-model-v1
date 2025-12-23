import { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '@/contexts/user-context';

export const metadata: Metadata = {
  title: "LostyoCord",
  description: "The simple way to grow your Discord community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}