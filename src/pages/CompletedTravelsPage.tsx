import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, MapPin, Star, Calendar, ArrowRight, Camera, Plus, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompletedTravelsPage() {
  const { completedTravels, updateCompletedTravel } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-32 bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            My Journey
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            Completed Travels
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Relive your adventures and browse through the places you've explored across India.
          </motion.p>
        </div>

        {completedTravels.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[60px] border border-black/5 dark:border-white/5 shadow-sm"
          >
            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-300 dark:text-zinc-600">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">No completed travels yet</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-sm mx-auto">Mark places as visited to start tracking your journey across the subcontinent.</p>
            <Link 
              to="/cities" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20"
            >
              Explore Cities <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {completedTravels.map((travel, i) => (
                <motion.div
                  key={travel.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-zinc-900 rounded-[60px] overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all p-10 lg:p-16"
                >
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                        <MapPin className="w-4 h-4" />
                        {travel.cityName}
                      </div>
                      <h3 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Trip to {travel.cityName}</h3>
                      <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm mb-10">
                        <Calendar className="w-4 h-4" />
                        Visited on {travel.date}
                      </div>

                      <div className="space-y-10">
                        {/* Rating */}
                        <div>
                          <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Your Rating</div>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => updateCompletedTravel(travel.id, { rating: star })}
                                className={`p-1 transition-all hover:scale-110 ${
                                  (travel.rating || 0) >= star ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-800'
                                }`}
                              >
                                <Star className={`w-8 h-8 ${ (travel.rating || 0) >= star ? 'fill-current' : ''}`} />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Review */}
                        <div>
                          <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Your Experience</div>
                          {editingId === travel.id ? (
                            <div className="space-y-4">
                              <textarea
                                className="w-full p-6 bg-zinc-50 dark:bg-zinc-800 border-none rounded-3xl text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 text-lg leading-relaxed"
                                rows={4}
                                placeholder="How was your trip?"
                                defaultValue={travel.review}
                                autoFocus
                                onBlur={(e) => {
                                  updateCompletedTravel(travel.id, { review: e.target.value });
                                  setEditingId(null);
                                }}
                              />
                              <p className="text-xs text-zinc-400">Click outside to save</p>
                            </div>
                          ) : (
                            <div 
                              onClick={() => setEditingId(travel.id)}
                              className="p-8 bg-zinc-50 dark:bg-zinc-800 rounded-[40px] cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all group/review"
                            >
                              {travel.review ? (
                                <p className="text-zinc-700 dark:text-zinc-300 text-xl leading-relaxed italic">"{travel.review}"</p>
                              ) : (
                                <div className="flex items-center gap-3 text-zinc-400 text-lg italic">
                                  <Plus className="w-6 h-6" /> Add a review of your journey...
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-6">
                      <div className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Travel Photos</div>
                      <div className="grid grid-cols-2 gap-4">
                        {travel.images?.map((img, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.05 }}
                            className="aspect-square rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm"
                          >
                            <img src={img} alt="Trip" className="w-full h-full object-cover" />
                          </motion.div>
                        ))}
                        <button className="aspect-square rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 transition-all group/add">
                          <Camera className="w-8 h-8 mb-2 group-hover/add:scale-110 transition-transform" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Add Photo</span>
                        </button>
                      </div>
                    </div>
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
