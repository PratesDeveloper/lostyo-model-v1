"use client";

import React, { Suspense } from 'react';
import AuthCallbackContent from '@/components/auth/AuthCallbackContent';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <Suspense fallback={
        <div className="text-center">
          <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
          <p className="text-white/40">Loading authentication...</p>
        </div>
      }>
        <AuthCallbackContent />
      </Suspense>
    </div>
  );
}