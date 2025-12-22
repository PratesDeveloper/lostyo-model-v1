"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from 'sonner'; // Adicionando toast para feedback

// URL da Edge Function (Substitua 'wxlltninzxsmlzenkctw' pelo seu Project ID se for diferente)
const EDGE_FUNCTION_URL = 'https://wxlltninzxsmlzenkctw.supabase.co/functions/v1/discord-auth';

const exchangeCodeForToken = async (code: string) => {
  const response = await fetch(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to exchange code via Edge Function');
  }
  
  return response.json();
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error("Discord OAuth Error:", error);
      toast.error("Authentication failed. Please try again.");
      router.push('/start');
      return;
    }

    if (code) {
      toast.loading("Securing your connection...", { id: 'auth-loading' });
      exchangeCodeForToken(code)
        .then(({ access_token, refresh_token, expires_in }) => {
          toast.dismiss('auth-loading');
          
          // Salva os tokens em cookies com expiração de 14 dias
          Cookies.set('discord_access_token', access_token, { expires: 14, secure: true, sameSite: 'Lax' });
          Cookies.set('discord_refresh_token', refresh_token, { expires: 14, secure: true, sameSite: 'Lax' });
          
          toast.success("Login successful! Redirecting...");
          router.push('/start');
        })
        .catch((err) => {
          toast.dismiss('auth-loading');
          console.error("Error exchanging code for token:", err);
          toast.error("Login failed. Please check your Discord permissions.");
          router.push('/start');
        });
    } else {
      console.error("No code or error found in callback URL.");
      toast.error("Invalid authentication attempt.");
      router.push('/start');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Authenticating...</h1>
        <p className="text-white/40">Please wait while we set up your session.</p>
      </div>
    </div>
  );
}