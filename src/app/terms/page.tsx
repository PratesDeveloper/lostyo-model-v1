"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/studio/navbar';
import { 
  FileText, Shield, Scale, AlertCircle, 
  Copyright, UserMinus, CreditCard, HelpCircle 
} from 'lucide-react';

const TermSection = ({ title, icon: Icon, children }: any) => (
  <div className="mb-20 last:mb-0 print:mb-12">
    <div className="flex items-center gap-5 mb-8 print:mb-4">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 print:border-black print:text-black">
        <Icon size={22} />
      </div>
      <h2 className="text-2xl font-black text-white tracking-tighter uppercase print:text-black print:text-xl">{title}</h2>
    </div>
    <div className="text-white/40 leading-relaxed font-medium space-y-6 pl-0 md:pl-16 print:pl-0 print:text-black print:text-sm">
      {children}
    </div>
  </div>
);

export default function TermsPage() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500/30 print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="pt-48 pb-40 px-6 print:pt-0 print:pb-0 print:px-0">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-32 print:mb-12"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8 print:hidden">
              Legal Framework v2.1
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] print:text-black print:text-4xl print:mb-4">
              TERMS OF <br /> <span className="text-white/20 print:text-gray-400">SERVICE.</span>
            </h1>
            <p className="text-white/30 text-lg font-medium max-w-2xl mx-auto print:text-black print:text-sm">
              The foundational protocols for our partnership and use of the Lostyo Studios ecosystem.
            </p>
          </motion.div>

          <div className="glass rounded-[4rem] p-10 md:p-24 border border-white/5 print:border-none print:p-0 print:bg-white print:shadow-none">
            
            <TermSection title="1. Agreement to Terms" icon={Scale}>
              <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Lostyo Studios (“we,” “us” or “our”), concerning your access to and use of our Roblox experiences, web dashboards, and related services.</p>
              <p>You agree that by accessing the Service, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the service and must discontinue use immediately.</p>
            </TermSection>

            <TermSection title="2. Intellectual Property Rights" icon={Copyright}>
              <p>Unless otherwise indicated, the Service is our proprietary property and all source code, Luau scripts, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Service (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.</p>
              <div className="bg-white/[0.02] border-l-2 border-blue-500 p-6 rounded-r-2xl my-8 print:border-black print:bg-gray-50">
                <h4 className="text-white text-xs font-black uppercase tracking-widest mb-3 print:text-black">Asset Usage Protocol</h4>
                <p className="text-xs print:text-black">Unauthorized extraction of assets, reverse engineering of scripts, or redistribution of proprietary environments is strictly prohibited. Violations will result in DMCA takedown requests and permanent account termination across our network.</p>
              </div>
            </TermSection>

            <TermSection title="3. User Representations" icon={FileText}>
              <p>By using the Service, you represent and warrant that:</p>
              <ul className="list-disc pl-5 space-y-3 text-sm print:text-black">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Service.</li>
                <li>You will not use the Service for any illegal or unauthorized purpose.</li>
              </ul>
            </TermSection>

            <TermSection title="4. Monetization & Payments" icon={CreditCard}>
              <p>Certain experiences within the Lostyo Studios ecosystem may involve virtual currency (Robux) or subscription models. All financial transactions are subject to the Roblox Corporation Terms of Use.</p>
              <p>Lostyo Studios is not responsible for platform-wide currency fluctuations or errors occurring within the Roblox payment gateway. All sales of virtual items are final and non-refundable unless otherwise required by law.</p>
            </TermSection>

            <TermSection title="5. Termination" icon={UserMinus}>
              <p>These Terms of Service shall remain in full force and effect while you use the Service. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICE (INCLUDING BLOCKING CERTAIN IP ADDRESSES).</p>
            </TermSection>

            <TermSection title="6. Limitation of Liability" icon={AlertCircle}>
              <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</p>
            </TermSection>

            <TermSection title="7. Contact & Support" icon={HelpCircle}>
              <p>In order to resolve a complaint regarding the Service or to receive further information regarding use of the Service, please contact us at our official Discord community or via the Support portal on our dashboard.</p>
            </TermSection>

            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 print:mt-12 print:pt-6 print:border-black">
              <div className="text-center md:text-left">
                <h4 className="text-white text-sm font-black tracking-tighter mb-1 print:text-black">Lostyo Studios Legal Division</h4>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] print:text-black">Protocol Revised: Oct 2025</p>
              </div>
              <button 
                onClick={handleDownload}
                className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform print:hidden"
              >
                Download PDF Version
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}