import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CITIES } from '../data/cities';
import { motion } from 'motion/react';
import { MapPin, Clock, CreditCard, Navigation, Info, ArrowLeft, Utensils, Hotel, Compass, Heart, CheckCircle } from 'lucide-react';
import { getPlaceDetails } from '../services/geminiService';
import { useGeolocation } from '../hooks/useGeolocation';
import { useApp } from '../AppContext';
import Markdown from 'react-markdown';

export default function PlaceDetailPage() {
  const { cityId, placeId } = useParams();
  const city = CITIES.find(c => c.id === cityId);
  const place = city?.places.find(p => p.id === placeId);
  
  const { addToWishlist, wishlist, removeFromWishlist, addCompletedTravel, completedTravels } = useApp();
  const [details, setDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { calculateDistance } = useGeolocation();

  useEffect(() => {
    if (place && city) {
      getPlaceDetails(place.name, city.name).then(data => {
        setDetails(data);
        setLoading(false);
      });
    }
  }, [place, city]);

  if (!city || !place) return <div className="pt-24 text-center dark:text-white">Place not found</div>;

  const distance = calculateDistance(place.location);
  const isWishlisted = wishlist.some(item => item.id === place.id);
  const isCompleted = completedTravels.some(t => t.cityId === city.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(place.id);
    } else {
      addToWishlist({ id: place.id, name: place.name, image: place.image, type: 'place', cityId: city.id });
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      addCompletedTravel({
        id: Date.now().toString(),
        cityId: city.id,
        cityName: city.name,
        date: new Date().toLocaleDateString(),
      });
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pb-24 transition-colors">
      {/* Hero Header */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        
        <div className="absolute top-24 left-0 right-0 px-4 max-w-7xl mx-auto flex justify-between items-center">
          <Link 
            to={`/city/${city.id}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {city.name}
          </Link>
          
          <div className="flex gap-3">
            <button 
              onClick={handleWishlist}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleComplete}
              disabled={isCompleted}
              className={`p-3 rounded-full backdrop-blur-md transition-all ${
                isCompleted ? 'bg-emerald-500 text-white' : 'bg-black/20 text-white hover:bg-black/40'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {place.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">{place.name}</h1>
            
            <div className="flex flex-wrap items-center gap-8 text-zinc-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-6 h-6 text-emerald-400" />
                <span className="text-lg">{city.name}, {city.state}</span>
              </div>
              {distance && (
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-6 h-6 text-emerald-400" />
                  <span className="text-lg">{distance} km from you</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Info Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
                  <CreditCard className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Entry Fee</div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">{place.entryFee || 'Free'}</div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-6">
                <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Best Time</div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white">Oct - Mar</div>
                </div>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm flex items-center gap-6 col-span-2 sm:col-span-1">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Compass className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-1">Category</div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-white capitalize">{place.category}</div>
                </div>
              </div>
            </div>

            {/* AI Generated Details */}
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 md:p-16 border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
                  <Info className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Complete Guide & History</h2>
              </div>

              {loading ? (
                <div className="space-y-8 animate-pulse">
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6" />
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                  <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded w-4/6" />
                  <div className="h-48 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl w-full" />
                </div>
              ) : (
                <div className="prose prose-lg prose-emerald dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <Markdown>{details}</Markdown>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-10">
            {/* Nearby Places */}
            <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-10 border border-black/5 dark:border-white/5 shadow-sm">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-emerald-600" /> Nearby Places
              </h3>
              <div className="space-y-6">
                {place.nearbyPlaces?.map(nearbyId => {
                  const nearby = city.places.find(p => p.id === nearbyId);
                  if (!nearby) return null;
                  return (
                    <Link 
                      key={nearbyId}
                      to={`/city/${city.id}/place/${nearbyId}`}
                      className="flex items-center gap-5 p-4 rounded-3xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group"
                    >
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                        <img src={nearby.image} alt={nearby.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">{nearby.name}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{nearby.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Local Recommendations */}
            <div className="bg-zinc-900 dark:bg-zinc-900/50 rounded-[40px] p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-8">Local Favorites</h3>
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Utensils className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Must-Try Food</div>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Check out the local street food stalls near the entrance for authentic flavors.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Hotel className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">Best Stay Nearby</div>
                    <p className="text-sm text-zinc-400 mt-2 leading-relaxed">Several heritage hotels are located within 2km of this landmark.</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                Plan Your Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
