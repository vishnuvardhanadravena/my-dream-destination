import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { MapPin, Utensils, Hotel, Compass, ArrowRight, Map } from 'lucide-react';
import { CITIES } from '../data/cities';
import { Link } from 'react-router-dom';
import CityCard from '../components/CityCard';

export default function LandingPage() {
  const features = [
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Handpicked Destinations",
      desc: "Discover the most iconic and hidden gems across India's vast landscape."
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Culinary Journeys",
      desc: "Explore authentic local flavors and legendary restaurants in every city."
    },
    {
      icon: <Hotel className="w-6 h-6" />,
      title: "Curated Stays",
      desc: "Find the perfect place to rest, from luxury palaces to boutique stays."
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Real-time Info",
      desc: "Get distances, entry fees, and historical insights powered by AI."
    }
  ];

  return (
    <div className="bg-[#FCF9F4] dark:bg-zinc-950 transition-colors">
      <Hero />
      
      {/* City List Section - Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 pt-24 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{CITIES.length} Cities to Explore</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Find your next adventure in these iconic Indian cities.</p>
          </div>
          <Link to="/cities" className="text-orange-600 font-bold hover:underline flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CityCard city={city} />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            Why Choose Us
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">Travel with Confidence</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide a comprehensive guide to make your Indian adventure unforgettable, 
            combining historical depth with practical travel information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-[40px] border border-black/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{f.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-900 py-32 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-8 leading-tight tracking-tight">Experience the Soul of <br/> Ancient Traditions</h2>
            <p className="text-zinc-400 mb-12 text-xl leading-relaxed">
              India is not just a destination; it's an experience that stays with you forever. 
              From the spiritual ghats of Varanasi to the royal forts of Rajasthan, every corner tells a story.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <div className="text-5xl font-bold text-emerald-400">28+</div>
                <div className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold">States to Explore</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-emerald-400">40+</div>
                <div className="text-xs text-zinc-500 uppercase tracking-[0.2em] font-bold">UNESCO Sites</div>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800" 
              className="rounded-[40px] aspect-[3/4] object-cover shadow-2xl"
              alt="India Culture"
              referrerPolicy="no-referrer"
            />
            <motion.img 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              src="https://images.unsplash.com/photo-1523544545175-92e04b96d26b?auto=format&fit=crop&q=80&w=800" 
              className="rounded-[40px] aspect-[3/4] object-cover mt-12 shadow-2xl"
              alt="India Food"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="bg-emerald-600 rounded-[60px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready for your next adventure?</h2>
            <p className="text-emerald-100 text-lg">Join thousands of travelers who use My Dream Destination to plan their perfect Indian getaway.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-5 bg-white text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20">
              Get Started
            </button>
            <button className="px-10 py-5 bg-emerald-700 text-white rounded-2xl font-bold hover:bg-emerald-800 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
