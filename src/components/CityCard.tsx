import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Map, Utensils, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';
import { City } from '../types';

interface CityCardProps {
  city: City;
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="group relative bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-black/5 dark:border-white/5"
    >
      <Link to={`/city/${city.id}`}>
        <div className="aspect-[4/5] overflow-hidden relative">
          <img
            src={city.image}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30">
              <MapPin className="w-3 h-3 text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{city.state}</span>
            </div>
          </div>

          <div className="absolute top-6 right-6">
            <div className="px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
              Explore <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-4xl font-bold mb-4 tracking-tight font-serif italic">{city.name}</h3>
          
          <div className="flex gap-3">
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-[10px] font-bold flex items-center gap-2">
              <Map className="w-3.5 h-3.5 text-zinc-400" />
              {city.places.length * 10 + 2}
            </div>
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-[10px] font-bold flex items-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-zinc-400" />
              {city.places.length * 30 + 6}
            </div>
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-[10px] font-bold flex items-center gap-2">
              <Hotel className="w-3.5 h-3.5 text-zinc-400" />
              {city.places.length * 15 + 9}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
