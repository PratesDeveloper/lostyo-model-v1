"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { ProfileDropdown } from './profile-dropdown';
import Cookies from 'js-cookie';

export const Navbar = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);

  useEffect(() => {
    // Checagem inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    // Escuta mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    // Checa cookie de onboarding
    setIsOnboardingDone(Cookies.get('lostyo_onboarding_done') === 'true');

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) {
      setProfile(data);
      if (data.onboarding_complete) {
        setIsOnboardingDone(true);
        Cookies.set('lostyo_onboarding_done', 'true', { expires: 365 });
      }
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl h-14 bg-[#1A1A1E] rounded-full flex items-center justify-between px-2 shadow-xl border border-white/5">
        <Link href="/" className="flex items-center gap-3 pl-4 hover:opacity-80 transition-opacity">
          <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-7 h-7" />
          <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#preview" className="hover:text-white transition-colors">Preview</a>
        </div>

        <div className="flex items-center gap-1">
          {session && isOnboardingDone && profile ? (
            <ProfileDropdown user={{ 
              avatar_url: profile.avatar_url, 
              username: profile.username 
            }} />
          ) : (
            <Link href="/start">
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-10 px-6 rounded-full text-xs font-bold transition-transform active:scale-95">
                Start
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};