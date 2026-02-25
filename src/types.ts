export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
}

export interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  contact: string;
  rating: number;
  reviews: Review[];
  categories: string[]; // ['Veg', 'Indian', 'Chinese']
  menu: MenuItem[];
  openingHours: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface RoomType {
  name: string;
  price: string;
  description: string;
  amenities: string[];
  status: 'available' | 'booked';
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  starRating: number;
  address: string;
  distanceFromReference?: string;
  roomTypes: RoomType[];
  amenities: string[];
  image: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Place {
  id: string;
  name: string;
  description: string;
  history?: string;
  entryFee?: string;
  image: string;
  category: 'landmark' | 'restaurant' | 'stay';
  location: {
    lat: number;
    lng: number;
  };
  famousDishes?: string[]; // For quick view
  nearbyPlaces?: string[]; // IDs of other places
  tags: string[];
  visitingHours?: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  places: Place[];
  restaurants?: Restaurant[];
  hotels?: Hotel[];
}

export interface UserProfile {
  name: string;
  email: string;
  profilePicture: string;
  travelHistory: string[]; // City IDs
  uploadedImages: string[];
}

export interface WishlistItem {
  id: string;
  type: 'place' | 'restaurant' | 'hotel';
  name: string;
  image: string;
  cityId: string;
}

export interface CompletedTravel {
  id: string;
  cityId: string;
  cityName: string;
  date: string;
  review?: string;
  rating?: number;
  images?: string[];
}
