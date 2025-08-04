export interface TravelData {
  destinations: Destination[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  attractions: Attraction[];
  weather: Weather[];
  itineraries: Itinerary[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  location: { lat: number; lng: number };
  category: string;
}

export interface Hotel {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  amenities: string[];
}

export interface Restaurant {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  cuisineType: string;
  priceRange: string;
  rating: number;
  imageUrl: string;
}

export interface Attraction {
  id: string;
  destinationId: string;
  name: string;
  description: string;
  category: string;
  duration: string;
  imageUrl: string;
  location: { lat: number; lng: number };
}

export interface Weather {
  id: string;
  destinationId: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

export interface Itinerary {
  id: string;
  name: string;
  destinationId: string;
  items: Array<{ id: string; type: string; time: string }>;
  createdAt: string;
}

export interface ItineraryItem {
  id: string;
  type: 'hotel' | 'restaurant' | 'attraction';
  name: string;
  duration: string;
  category: string;
  imageUrl: string;
}
