"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from 'lucide-react';
import { useUser } from '@/contexts/user-context';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, isLoading } = useUser();
  
  // URL de autorização direta do Discord
  const discordLoginUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=identify+guilds+guilds.join`;

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      exchangeCodeForToken(code);
    }
  }, [searchParams]);

  const exchangeCodeForToken = async (code: string) => {
    try {
      // In a real implementation, this should be done server-side for security
      // For now, we'll simulate the process
      const response = await fetch('/api/exchange-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
      
      const data = await response.json();
      
      if (data.access_token) {
        // Store tokens
        Cookies.set('discord_token', data.access_token, { expires: 7 });
        Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
        
        // Fetch user data
        const userResponse = await fetch('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${data.access_token}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser({
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar 
              ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` 
              : `https://cdn.discordapp.com/embed/avatars/${userData.discriminator % 5}.png`,
            discriminator: userData.discriminator
          });
        }
        
        router.push('/start');
      }
    } catch (error) {
      console.error('Failed to exchange code for token:', error);
    }
  };

  const handleLogin = () => {
    // Redirect to Discord OAuth
    window.location.href = discordLoginUrl;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
          <p className="text-white/40">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Login Required</h1>
        <p className="text-white/40 text-lg mb-8 font-medium">
          Please log in with your Discord account to continue securely.
        </p>
        <Button 
          onClick={handleLogin}
          className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all"
        >
          <Lock size={20} className="mr-2" />
          Login with Discord
        </Button>
      </div>
    </div>
  );
}