"use client";
import React from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ title, category, index }: { title: string, category: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="group relative aspect-[4/5] glass rounded-[3rem] overflow-hidden cursor-pointer"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-700" />
    
    <div className="absolute bottom-10 left-10 right-10 z-20">
      <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-2 block">{category}</span>
      <h3 className="text-3xl font-black text-white tracking-tighter">{title}</h3>
    </div>
  </motion.div>
);

export const GameShowcase = () => {
  const games = [
    { title: "Neon Drift", category: "Racing / MMO" },
    { title: "Aetheria", category: "Open World RPG" },
    { title: "Shadow Protocol", category: "Tactical FPS" }
  ];

  return (
    <section id="games" className="py-32 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">Our Creations.</h2>
            <p className="text-white/30 text-lg font-medium">Bespoke experiences that push the boundaries of the Roblox platform.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-white/10 font-black text-8xl tracking-tighter hidden lg:block"
          >
            01
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <GameCard key={i} index={i} title={game.title} category={game.category} />
          ))}
        </div>
      </div>
    </section>
  );
};