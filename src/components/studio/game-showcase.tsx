"use client";
import React from 'react';
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onClick={() => link && window.open(link, '_blank')}
      className="group relative aspect-[4/3] sm:aspect-[16/10] bg-[#F5F5F5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden cursor-pointer w-full max-w-5xl mx-auto"
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
            <span className="text-black/5 font-black text-4xl md:text-6xl uppercase tracking-widest">Lostyo</span>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 md:from-black/60 to-transparent z-10" />
      
      <div className="absolute bottom-8 left-8 right-8 md:bottom-14 md:left-14 md:right-14 z-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
        <div>
          <span className="text-[#3B82F6] text-[10px] md:text-xs font-black uppercase tracking-widest mb-2 md:mb-3 block">{category}</span>
          <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">{title}</h3>
        </div>
        <button className="w-full sm:w-auto h-12 md:h-16 px-8 md:px-10 bg-white text-black rounded-full font-black uppercase tracking-widest text-[9px] md:text-[11px] sm:opacity-0 group-hover:opacity-100 transition-all sm:translate-y-4 group-hover:translate-y-0 shadow-2xl">
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
    <section id="games" className="py-20 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-black tracking-tighter uppercase mb-4 md:mb-6 leading-none">Masterpiece.</h2>
          <p className="text-black/30 text-base md:text-xl font-medium px-4">Bespoke experiences tailored for the next generation of players.</p>
        </div>

        <div className="space-y-8 md:space-y-12">
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