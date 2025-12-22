"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

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

export default function AuthCallbackContent() {
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
      const toastId = toast.loading("Securing your connection...");
      exchangeCodeForToken(code)
        .then(({ access_token, refresh_token }) => {
          toast.dismiss(toastId);
          
          Cookies.set('discord_access_token', access_token, { expires: 14, secure: true, sameSite: 'Lax' });
          Cookies.set('discord_refresh_token', refresh_token, { expires: 14, secure: true, sameSite: 'Lax' });
          
          toast.success("Login successful! Redirecting...");
          router.push('/start');
        })
        .catch((err) => {
          toast.dismiss(toastId);
          console.error("Error exchanging code for token:", err);
          toast.error("Login failed. Please check your Discord permissions.");
          router.push('/start');
        });
    } else {
      router.push('/start');
    }
  }, [router, searchParams]);

  return (
    <div className="text-center">
      <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">Authenticating...</h1>
      <p className="text-white/40">Please wait while we set up your session.</p>
    </div>
  );
}