import { Metadata } from 'next';
import './globals.css';
import { SupabaseProvider } from '@/context/SupabaseProvider';
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
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
        <Toaster richColors theme="dark" />
      </body>
    </html>
  );
}