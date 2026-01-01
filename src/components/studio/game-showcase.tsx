"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ 
  title, 
  category, 
  index, 
  link,
  image 
}: { 
  title: string, 
  category: string, 
  index: number,
  link?: string,
  image?: string
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onClick={() => link && window.open(link, '_blank')}
      className="group relative aspect-[16/10] bg-[#F5F5F5] rounded-[4rem] overflow-hidden cursor-pointer w-full max-w-5xl mx-auto"
    >
      <div className="absolute inset-0 z-0">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
            <span className="text-black/5 font-black text-6xl uppercase tracking-widest">Lostyo</span>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      
      <div className="absolute bottom-14 left-14 right-14 z-20 flex justify-between items-end">
        <div>
          <span className="text-[#3B82F6] text-xs font-black uppercase tracking-widest mb-3 block">{category}</span>
          <h3 className="text-5xl font-black text-white tracking-tighter uppercase">{title}</h3>
        </div>
        <button className="h-16 px-10 bg-white text-black rounded-full font-black uppercase tracking-widest text-[11px] opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-2xl">
          Launch Node
        </button>
      </div>
    </motion.div>
  );
};

export const GameShowcase = () => {
  const games = [
    { 
      title: "CapToken", 
      category: "Simulation / Strategy", 
      link: "https://www.roblox.com/pt/games/94278394125668/CapToken",
      image: "https://tr.rbxcdn.com/180DAY-e75c09bfe9457c2384a4d43b6ca7f1bb/352/352/Image/Png/noFilter"
    }
  ];

  return (
    <section id="games" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-black text-black tracking-tighter uppercase mb-6">Masterpiece.</h2>
          <p className="text-black/30 text-xl font-medium">Bespoke experiences tailored for the next generation of players.</p>
        </div>

        <div className="space-y-12">
          {games.map((game, i) => (
            <GameCard 
              key={i} 
              index={i} 
              title={game.title} 
              category={game.category} 
              link={game.link}
              image={game.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};