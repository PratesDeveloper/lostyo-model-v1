import { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from '@/integrations/supabase/auth/session-provider';
import { Toaster } from '@/components/ui/sonner';

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
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}