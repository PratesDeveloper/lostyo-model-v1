"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BotVerificationStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const guildId = searchParams.get('guild_id');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;
  const RETRY_INTERVAL = 2000; // 2 seconds

  const verifyBot = useCallback(async (currentAttempt: number) => {
    if (!guildId) {
      setStatus('error');
      toast.error("Missing server ID. Please try again.");
      return;
    }

    try {
      // Check if bot is active in the guild
      // Note: Based on your schema, the column name is 'state'
      const { data, error } = await supabase
        .from('guilds')
        .select('state')
        .eq('guild_id', guildId)
        .single();

      if (data?.state === true) {
        setStatus('success');
        toast.success("Bot successfully verified!");
        setTimeout(() => router.push('/dashboard'), 2000);
        return;
      }

      if (currentAttempt < MAX_ATTEMPTS) {
        setAttempts(currentAttempt + 1);
        setTimeout(() => verifyBot(currentAttempt + 1), RETRY_INTERVAL);
      } else {
        setStatus('error');
        toast.error("Could not verify bot installation. Please refresh or try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      if (currentAttempt >= MAX_ATTEMPTS) setStatus('error');
    }
  }, [guildId, router]);

  useEffect(() => {
    verifyBot(1);
  }, [verifyBot]);

  if (status === 'loading') {
    return (
      <div className="text-center animate-in fade-in duration-500">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-2">Verifying Installation</h2>
        <p className="text-white/40 font-medium">
          Checking if the bot joined your server... (Attempt {attempts}/{MAX_ATTEMPTS})
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center animate-in zoom-in duration-300">
        <CheckCircle2 className="text-green-500 w-16 h-16 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-2">Success!</h2>
        <p className="text-white/40 font-medium">Redirecting you to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="text-center animate-in slide-in-from-bottom-4 duration-300">
      <XCircle className="text-red-500 w-16 h-16 mx-auto mb-6" />
      <h2 className="text-2xl font-black text-white mb-2">Verification Failed</h2>
      <p className="text-white/40 font-medium mb-8 max-w-xs mx-auto">
        We couldn't confirm the bot is in your server yet. This can happen if Discord is slow.
      </p>
      <div className="flex flex-col gap-3">
        <Button 
          onClick={() => {
            setAttempts(0);
            setStatus('loading');
            verifyBot(1);
          }}
          className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full font-bold h-12"
        >
          <RefreshCw className="mr-2 w-4 h-4" />
          Try Again
        </Button>
        <Button 
          variant="ghost" 
          onClick={() => router.push('/start')}
          className="text-white/40 hover:text-white rounded-full font-bold h-12"
        >
          Back to Setup
        </Button>
      </div>
    </div>
  );
}