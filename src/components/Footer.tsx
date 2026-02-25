import React from 'react';
import { Compass, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-black/5 dark:border-white/5 pt-24 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Compass className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">My Dream Destination</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Your ultimate companion for exploring the vibrant landscapes, rich history, and diverse cultures of India. 
              We bring you the best of every city, from monuments to street food.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="/cities" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 transition-colors">All Cities</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Popular Places</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Local Cuisines</a></li>
              <li><a href="#" className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 transition-colors">Travel Guides</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-zinc-500 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <span className="text-sm">hello@mydreamdestination.com</span>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 dark:text-zinc-500 text-sm">© 2026 My Dream Destination. All rights reserved.</p>
          <div className="flex space-x-8 text-sm text-zinc-400 dark:text-zinc-500">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
