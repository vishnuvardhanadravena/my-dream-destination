import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2000"
          alt="India Landscape"
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 backdrop-blur-md rounded-full border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            IN Incredible India
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Explore India
          </h1>
          
          <p className="text-zinc-300 text-lg max-w-xl font-light">
            Discover cities, places, food & stays
          </p>

          {/* Search Bar - Integrated into flow */}
          <div className="w-full max-w-2xl pt-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-2 flex items-center border border-black/5 dark:border-white/10">
              <div className="flex-1 flex items-center px-6 gap-4">
                <Search className="w-5 h-5 text-amber-500" />
                <input 
                  type="text" 
                  placeholder="Search cities or states..."
                  className="w-full py-4 bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
