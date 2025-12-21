"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I get started with LostyoCord?",
    answer: "Simply click the 'Add to Discord' button. Our setup wizard will guide you through permissions and basic configuration in less than a minute."
  },
  {
    question: "Is LostyoCord free to use?",
    answer: "Yes! The core features of LostyoCord are free forever. We offer optional premium plans for advanced analytics and higher customization limits."
  },
  {
    question: "How secure is my data?",
    answer: "We prioritize privacy. We only store the minimum data required for the bot to function, and we never sell your server's data to third parties."
  },
  {
    question: "Can I use it on multiple servers?",
    answer: "Absolutely. You can manage all your servers from a single unified dashboard with synchronized settings if you choose."
  }
];

export const FAQ = () => {
  return (
    <section className="py-32 bg-[#0B0B0D]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Questions.</h2>
          <p className="text-white/20 text-lg font-medium">Common things people ask about us.</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-[#141417] rounded-[2rem] px-8 border-none">
              <AccordionTrigger className="text-white font-bold hover:no-underline text-left py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/30 text-sm font-medium leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};