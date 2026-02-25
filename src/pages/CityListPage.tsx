import React from 'react';
import { CITIES } from '../data/cities';
import CityCard from '../components/CityCard';
import { motion } from 'motion/react';

export default function CityListPage() {
  return (
    <div className="pt-32 pb-32 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            Destinations
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            Explore India's Finest
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Discover the unique character, vibrant cultures, and iconic attractions of India's most legendary urban centers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
