import React, { useRef } from 'react';
import { useApp } from '../AppContext';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Calendar, Camera, Trash2, Image as ImageIcon, Plus, History, Upload } from 'lucide-react';

export default function ProfilePage() {
  const { user, uploadImage } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      {/* Cover Photo Section */}
      <div className="relative h-80 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=2000" 
          alt="Cover" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-zinc-50 dark:to-zinc-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 border border-black/5 dark:border-white/5 shadow-2xl sticky top-32"
            >
              <div className="relative w-40 h-40 mx-auto mb-8">
                <img 
                  src={user.profilePicture} 
                  alt={user.name} 
                  className="w-full h-full rounded-[40px] object-cover border-8 border-white dark:border-zinc-900 shadow-xl"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg border-4 border-white dark:border-zinc-900 hover:scale-110 transition-transform"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">{user.name}</h2>
                <p className="text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <div className="mt-6 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl text-xs font-bold uppercase tracking-widest">
                  Explorer Level 4
                </div>
              </div>

              <div className="space-y-6 pt-8 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Member Since</span>
                  <span className="font-bold text-zinc-900 dark:text-white">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Trips Completed</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{user.travelHistory.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500 dark:text-zinc-400">Photos Uploaded</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{user.uploadedImages.length}</span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Travel Motto</h4>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm italic leading-relaxed">
                  "To travel is to live, and to explore India is to find the soul of the world."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Travel Memories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Travel Memories</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-2">Your personal gallery of Indian adventures.</p>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20"
                >
                  <Upload className="w-5 h-5" />
                  Add Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>

              {user.uploadedImages.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                  <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300 dark:text-zinc-600">
                    <ImageIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No memories yet</h3>
                  <p className="text-zinc-500 dark:text-zinc-400">Upload photos from your travels to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {user.uploadedImages.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative aspect-square rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm"
                    >
                      <img 
                        src={img} 
                        alt={`Memory ${i}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Travel History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 border border-black/5 dark:border-white/5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-8">
                <History className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Travel History</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.travelHistory.map((cityId, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-3xl bg-zinc-50 dark:bg-zinc-800 border border-black/5 dark:border-white/5">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                      {cityId[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-zinc-900 dark:text-white capitalize mb-1">
                        {cityId}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold">Visited in 2024</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
