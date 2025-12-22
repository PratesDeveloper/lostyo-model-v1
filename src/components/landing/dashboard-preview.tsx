"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DashboardPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const dashboardScreens = [
    {
      id: 1,
      title: "Analytics Overview",
      description: "Real-time insights into your community's health and growth",
      features: ["Member growth tracking", "Engagement metrics", "Activity heatmaps"]
    },
    {
      id: 2,
      title: "Moderation Hub",
      description: "Powerful tools to keep your community safe and welcoming",
      features: ["Automated filters", "Custom rule sets", "Incident reports"]
    },
    {
      id: 3,
      title: "Custom Commands",
      description: "Create unique bot interactions without coding",
      features: ["Drag-and-drop builder", "Dynamic responses", "User variables"]
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === dashboardScreens.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? dashboardScreens.length - 1 : prev - 1));
  };

  return (
    <section id="preview" className="py-24 bg-[#0B0B0D]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Everything under control.
          </motion.h2>
          <p className="text-white/20 text-lg font-medium max-w-xl mx-auto">
            A clean, fast, and intuitive dashboard to help you focus on what matters: your community.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#1A1A1E] hover:bg-[#5865F2] w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="text-white" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#1A1A1E] hover:bg-[#5865F2] w-12 h-12 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="text-white" />
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Mockup de Interface Flat */}
              <div className="bg-[#141417] rounded-[3rem] p-4 md:p-8 aspect-video overflow-hidden shadow-2xl border border-[#1A1A1E]">
                <div className="flex gap-4 h-full">
                  {/* Sidebar do Mockup */}
                  <div className="hidden md:flex flex-col gap-3 w-16 bg-white/5 rounded-[2rem] p-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-2xl bg-white/5" />
                    ))}
                  </div>
                  
                  {/* Conteúdo do Mockup */}
                  <div className="flex-grow flex flex-col gap-6">
                    <div className="h-12 bg-white/5 rounded-full w-1/3" />
                    <div className="grid grid-cols-3 gap-4 h-full">
                      <div className="col-span-2 bg-white/5 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-6">
                            <h3 className="text-white text-xl font-bold mb-2">
                              {dashboardScreens[currentIndex].title}
                            </h3>
                            <p className="text-white/60 mb-4">
                              {dashboardScreens[currentIndex].description}
                            </p>
                            <ul className="text-left space-y-2">
                              {dashboardScreens[currentIndex].features.map((feature, idx) => (
                                <li key={idx} className="text-white/50 text-sm flex items-center">
                                  <div className="w-2 h-2 bg-[#5865F2] rounded-full mr-2"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="h-full bg-white/5 rounded-[2rem]" />
                        <div className="h-full bg-white/5 rounded-[2rem]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Indicadores */}
              <div className="flex justify-center mt-8 gap-2">
                {dashboardScreens.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentIndex ? 'bg-[#5865F2]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};