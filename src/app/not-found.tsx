import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 mx-auto text-[#5865F2]" />
        </div>
        
        <h1 className="text-6xl font-black text-white mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-white/40 text-lg mb-8 font-medium">
          Looks like you've wandered into the void. The page you're looking for doesn't exist.
        </p>
        
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full">
            <Button className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all">
              <Home size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/start" className="w-full">
            <Button 
              variant="ghost" 
              className="w-full h-14 text-lg font-bold rounded-full bg-[#1A1A1E] hover:bg-[#2A2A2E] text-white/60 hover:text-white transition-all"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}