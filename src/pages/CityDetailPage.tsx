import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CITIES } from '../data/cities';
import { motion } from 'motion/react';
import { MapPin, Utensils, Info, ChevronRight, Navigation, Hotel, Star, Phone, Clock, Heart } from 'lucide-react';
import { getCityHighlights, getRestaurants, getHotels } from '../services/geminiService';
import { Restaurant, Hotel as HotelType } from '../types';
import { useApp } from '../AppContext';
import Markdown from 'react-markdown';

export default function CityDetailPage() {
  const { cityId } = useParams();
  const city = CITIES.find(c => c.id === cityId);
  const { addToWishlist, wishlist, removeFromWishlist } = useApp();
  
  const [highlights, setHighlights] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      setLoading(true);
      Promise.all([
        getCityHighlights(city.name),
        getRestaurants(city.name),
        getHotels(city.name)
      ]).then(([highlightsData, restaurantsData, hotelsData]) => {
        setHighlights(highlightsData);
        setRestaurants(restaurantsData);
        setHotels(hotelsData);
        setLoading(false);
      });
    }
  }, [city]);

  if (!city) return <div className="pt-24 text-center dark:text-white">City not found</div>;

  const isWishlisted = (id: string) => wishlist.some(item => item.id === id);

  const handleWishlist = (id: string, name: string, image: string, type: 'place' | 'restaurant' | 'hotel') => {
    if (isWishlisted(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, image, type, cityId: city.id });
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen transition-colors">
      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold uppercase tracking-widest text-sm">{city.state}</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">{city.name}</h1>
            <p className="text-zinc-300 max-w-2xl text-lg leading-relaxed">{city.description}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-24">
          
          {/* Famous Places */}
          <section id="places">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Must Visit Places</h2>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden sm:block" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {city.places.filter(p => p.category === 'landmark').map((place) => (
                <div key={place.id} className="group bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all">
                  <Link to={`/city/${city.id}/place/${place.id}`}>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={place.image} 
                        alt={place.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </Link>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{place.name}</h3>
                      <button 
                        onClick={() => handleWishlist(place.id, place.name, place.image, 'place')}
                        className={`p-2 rounded-full transition-colors ${isWishlisted(place.id) ? 'bg-red-50 text-red-500' : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-400'}`}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted(place.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 mb-6 leading-relaxed">{place.description}</p>
                    <Link 
                      to={`/city/${city.id}/place/${place.id}`}
                      className="flex items-center justify-between w-full py-4 px-6 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      Explore Details <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Restaurants Section */}
          <section id="restaurants">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Dining & Restaurants</h2>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden sm:block" />
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1,2,3,4].map(i => <div key={i} className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {restaurants.map((res, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Utensils className="w-8 h-8" />
                      </div>
                      <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" /> {res.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{res.name}</h3>
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-4">
                      <MapPin className="w-3 h-3" /> {res.address}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {res.categories.map(cat => (
                        <span key={cat} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Famous Dishes</div>
                      {res.menu.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.name}</span>
                          <span className="text-emerald-600 font-bold">{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" /> Get Directions
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          {/* Hotels Section */}
          <section id="hotels">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Places to Stay</h2>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 mx-8 hidden sm:block" />
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1,2,3].map(i => <div key={i} className="h-48 bg-zinc-100 dark:bg-zinc-900 rounded-3xl animate-pulse" />)}
              </div>
            ) : (
              <div className="space-y-6">
                {hotels.map((hotel, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-sm flex flex-col md:flex-row gap-8"
                  >
                    <div className="w-full md:w-48 h-48 bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={`https://picsum.photos/seed/${hotel.name}/400/400`} alt={hotel.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(hotel.starRating)].map((_, i) => <Star key={i} className="w-3 h-3 text-amber-400 fill-current" />)}
                          </div>
                          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{hotel.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-400 uppercase font-bold tracking-widest">Starting from</div>
                          <div className="text-xl font-bold text-emerald-600">{hotel.roomTypes[0]?.price}</div>
                        </div>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6 flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {hotel.address}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {hotel.amenities.slice(0, 5).map(amenity => (
                          <span key={amenity} className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                          Book Now
                        </button>
                        <button className="px-6 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
                          View Rooms
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar - AI Insights */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-black/5 dark:border-white/5 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-emerald-600">
                <Info className="w-5 h-5" />
                <h3 className="font-bold uppercase tracking-widest text-sm">AI Travel Insights</h3>
              </div>
              
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-full" />
                  <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-5/6" />
                </div>
              ) : (
                <div className="prose prose-sm prose-emerald dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400">
                  <Markdown>{highlights}</Markdown>
                </div>
              )}
            </div>

            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-600/20">
              <h3 className="text-xl font-bold mb-4">Ready to visit {city.name}?</h3>
              <p className="text-emerald-100 text-sm mb-8 leading-relaxed">
                Get personalized routes and hidden gems from our AI guide.
              </p>
              <button className="w-full py-4 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Navigation className="w-5 h-5" /> Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
