import React, { Suspense } from 'react';
import BotVerificationStep from '@/components/auth/BotVerificationStep';
import { Loader2 } from 'lucide-react';

export default function BotCallbackPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#141417] rounded-[3rem] p-12 border border-[#1A1A1E]">
        <Suspense fallback={
          <div className="text-center">
            <Loader2 className="animate-spin text-[#5865F2] w-12 h-12 mx-auto mb-4" />
            <p className="text-white/40">Initializing...</p>
          </div>
        }>
          <BotVerificationStep />
        </Suspense>
      </div>
    </div>
  );
}