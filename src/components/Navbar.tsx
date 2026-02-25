import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Compass, Search, Heart, User, CheckCircle, Moon, Sun, Menu, X } from 'lucide-react';
import { useApp } from '../AppContext';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { to: '/cities', label: 'Explore', icon: <Search className="w-4 h-4" /> },
    { to: '/wishlist', label: 'Wishlist', icon: <Heart className="w-4 h-4" /> },
    { to: '/completed', label: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
    { to: '/profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">My Dream Destination</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  location.pathname === link.to 
                    ? 'text-emerald-600' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-emerald-600'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-zinc-500 dark:text-zinc-400"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-zinc-500 dark:text-zinc-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 p-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.to 
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
