import React from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useApp();

  return (
    <div className="pt-32 pb-32 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            My Collection
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            Your Wishlist
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            All the places, restaurants, and hotels you've saved for your future Indian adventures.
          </motion.p>
        </div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[60px] border border-black/5 dark:border-white/5 shadow-sm"
          >
            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-300 dark:text-zinc-600">
              <Heart className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Your wishlist is empty</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto">Start exploring cities and places to build your dream itinerary.</p>
            <Link 
              to="/cities" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
            >
              Explore Cities <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-6 right-6">
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-red-500 transition-all border border-white/30"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <div className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {item.type}
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest mb-3">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      {item.cityId}
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">{item.name}</h3>
                    <Link 
                      to={item.type === 'place' ? `/city/${item.cityId}/place/${item.id}` : `/city/${item.cityId}`}
                      className="flex items-center justify-center w-full py-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all group/btn"
                    >
                      View Details <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
