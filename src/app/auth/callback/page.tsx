"use client";
import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/contexts/user-context';

// Componente interno com a lógica do useSearchParams
function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading } = useUser();

  useEffect(() => {
    // The token exchange is now handled in the login page
    // Redirect to start page after a short delay to ensure context is set
    const timer = setTimeout(() => {
      router.push('/start');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
          <p className="text-white/40">Securing your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <p className="text-white/40">Setting up your account...</p>
      </div>
    </div>
  );
}

// Componente principal exportado com o Boundary de Suspense
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2]" />
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}