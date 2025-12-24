"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Calendar,
  Clock
} from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  // Dados para o gráfico de membros
  const membersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Members',
        data: [120, 190, 150, 220, 180, 250, 210, 280, 230, 310, 270, 350],
        backgroundColor: 'rgba(88, 101, 242, 0.7)',
        borderColor: 'rgba(88, 101, 242, 1)',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  // Dados para o gráfico de atividade
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Messages',
        data: [1200, 1900, 1500, 2200, 1800, 2500, 2100],
        fill: true,
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderColor: 'rgba(88, 101, 242, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(88, 101, 242, 1)',
        pointRadius: 5,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(20, 20, 23, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">Analytics.</h1>
        <p className="text-white/40 font-medium">Insights into your community growth and engagement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Members", value: "12,402", change: "+12%", icon: Users, color: "text-[#5865F2]" },
          { title: "Messages Today", value: "3,245", change: "+5%", icon: MessageSquare, color: "text-green-500" },
          { title: "Online Now", value: "3,245", change: "+8%", icon: Calendar, color: "text-blue-500" },
          { title: "Avg. Response", value: "2m 14s", change: "-12%", icon: Clock, color: "text-purple-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#141417] p-6 rounded-[2rem] border border-white/5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className={`text-xs font-bold mt-2 ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last week
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Members Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#141417] p-6 rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tight">Member Growth</h2>
            <BarChart3 className="w-5 h-5 text-[#5865F2]" />
          </div>
          <div className="h-80">
            <Bar data={membersData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#141417] p-6 rounded-[2rem] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white tracking-tight">Weekly Activity</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="h-80">
            <Line data={activityData} options={chartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#141417] rounded-[2rem] border border-white/5 p-6"
      >
        <h2 className="text-xl font-black text-white tracking-tight mb-6">Engagement Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Most Active Day", value: "Saturday", desc: "Peak activity at 8 PM" },
            { label: "Top Channel", value: "#general", desc: "42% of all messages" },
            { label: "Most Engaged Role", value: "Members", desc: "78% participation rate" }
          ].map((metric, index) => (
            <div key={index} className="p-5 rounded-2xl bg-white/5">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{metric.label}</p>
              <p className="text-white font-bold text-lg mb-1">{metric.value}</p>
              <p className="text-white/60 text-sm">{metric.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;