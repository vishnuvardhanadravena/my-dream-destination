import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, WishlistItem, CompletedTravel } from './types';

interface AppContextType {
  user: UserProfile;
  wishlist: WishlistItem[];
  completedTravels: CompletedTravel[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  addCompletedTravel: (travel: CompletedTravel) => void;
  updateCompletedTravel: (id: string, updates: Partial<CompletedTravel>) => void;
  uploadImage: (url: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialUser: UserProfile = {
  name: 'Traveler',
  email: 'traveler@example.com',
  profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  travelHistory: ['delhi'],
  uploadedImages: [],
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [completedTravels, setCompletedTravels] = useState<CompletedTravel[]>(() => {
    const saved = localStorage.getItem('completedTravels');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    localStorage.setItem('completedTravels', JSON.stringify(completedTravels));
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user, wishlist, completedTravels, theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const addToWishlist = (item: WishlistItem) => {
    if (!wishlist.find(i => i.id === item.id)) {
      setWishlist(prev => [...prev, item]);
    }
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(i => i.id !== id));
  };

  const addCompletedTravel = (travel: CompletedTravel) => {
    setCompletedTravels(prev => [...prev, travel]);
    setUser(prev => ({
      ...prev,
      travelHistory: [...new Set([...prev.travelHistory, travel.cityId])]
    }));
  };

  const updateCompletedTravel = (id: string, updates: Partial<CompletedTravel>) => {
    setCompletedTravels(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const uploadImage = (url: string) => {
    setUser(prev => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, url]
    }));
  };

  return (
    <AppContext.Provider value={{
      user, wishlist, completedTravels, theme, toggleTheme,
      addToWishlist, removeFromWishlist, addCompletedTravel, updateCompletedTravel, uploadImage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
