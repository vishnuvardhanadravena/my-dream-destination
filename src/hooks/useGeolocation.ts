import { useState, useEffect } from 'react';

export interface Location {
  lat: number;
  lng: number;
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  const calculateDistance = (target: Location) => {
    if (!location) return null;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(target.lat - location.lat);
    const dLon = deg2rad(target.lng - location.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location.lat)) * Math.cos(deg2rad(target.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d.toFixed(1);
  };

  function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  return { location, error, calculateDistance };
}
