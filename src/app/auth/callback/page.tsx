"use client";

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/integrations/supabase/auth/session-provider';

// Componente interno com a lógica do useSearchParams
function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading, profile } = useUser();

  useEffect(() => {
    // This page handles the redirect from Discord OAuth.
    // Supabase automatically handles the session storage (cookies) based on the URL hash/query params.
    
    if (!isLoading) {
      if (isAuthenticated) {
        // Check if onboarding is complete
        if (profile?.onboarding_complete) {
          router.replace('/dashboard');
        } else {
          // If authenticated but onboarding is not complete, go to start page
          router.replace('/start');
        }
      } else {
        // If session failed to establish (e.g., error in URL), redirect to login
        router.replace('/login');
      }
    }
  }, [router, isAuthenticated, isLoading, profile]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <p className="text-white/40">Securing your session...</p>
      </div>
    </div>
  );
}

// Componente principal exportado com o Boundary de Suspense
export default function AuthCallbackPage() {
  return (
    // O fallback é renderizado enquanto os parâmetros da URL carregam
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthContent />
    </Suspense>
  );
}