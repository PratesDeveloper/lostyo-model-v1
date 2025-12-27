"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '09:00', price: 100 },
  { time: '10:00', price: 120 },
  { time: '11:00', price: 110 },
  { time: '12:00', price: 150 },
  { time: '13:00', price: 140 },
  { time: '14:00', price: 180 },
  { time: '15:00', price: 200 },
  { time: '16:00', price: 195 },
];

export const MarketStepChart = () => {
  return (
    <div className="h-[250px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="stepGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffffff" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 800 }} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
            itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 900 }}
          />
          <Area 
            type="stepAfter" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#stepGradient)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};