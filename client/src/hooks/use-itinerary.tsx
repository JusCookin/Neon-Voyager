import { useState, useEffect } from 'react';
import type { Itinerary, ItineraryItem } from '@/types/travel';

const STORAGE_KEY = 'neon-voyager-itinerary';

export function useItinerary() {
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryItem[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentItinerary(parsed.current || []);
        setSavedItineraries(parsed.saved || []);
      } catch (error) {
        console.warn('Failed to parse saved itinerary');
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever itinerary changes
    const data = {
      current: currentItinerary,
      saved: savedItineraries
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [currentItinerary, savedItineraries]);

  const addItem = (item: ItineraryItem) => {
    setCurrentItinerary(prev => [...prev, item]);
  };

  const removeItem = (itemId: string) => {
    setCurrentItinerary(prev => prev.filter(item => item.id !== itemId));
  };

  const reorderItems = (startIndex: number, endIndex: number) => {
    setCurrentItinerary(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const clearItinerary = () => {
    setCurrentItinerary([]);
  };

  const saveItinerary = (name: string, destinationId: string) => {
    const newItinerary: Itinerary = {
      id: `itinerary-${Date.now()}`,
      name,
      destinationId,
      items: currentItinerary.map((item, index) => ({
        id: item.id,
        type: item.type,
        time: `${9 + index * 2}:00 AM` // Simple time assignment
      })),
      createdAt: new Date().toISOString()
    };

    setSavedItineraries(prev => [...prev, newItinerary]);
    return newItinerary;
  };

  const deleteItinerary = (itineraryId: string) => {
    setSavedItineraries(prev => prev.filter(itinerary => itinerary.id !== itineraryId));
  };

  const loadItinerary = (itinerary: Itinerary) => {
    // Convert saved itinerary back to editable format
    // This would need to fetch the actual item details from the API
    console.log('Loading itinerary:', itinerary);
  };

  return {
    currentItinerary,
    savedItineraries,
    addItem,
    removeItem,
    reorderItems,
    clearItinerary,
    saveItinerary,
    deleteItinerary,
    loadItinerary
  };
}
