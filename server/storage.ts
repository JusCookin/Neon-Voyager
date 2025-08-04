import { 
  type Destination, 
  type Hotel, 
  type Restaurant, 
  type Attraction, 
  type Itinerary, 
  type Weather,
  type InsertDestination,
  type InsertHotel,
  type InsertRestaurant,
  type InsertAttraction,
  type InsertItinerary,
  type InsertWeather
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Hotels
  getHotelsByDestination(destinationId: string): Promise<Hotel[]>;
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  
  // Restaurants
  getRestaurantsByDestination(destinationId: string): Promise<Restaurant[]>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Attractions
  getAttractionsByDestination(destinationId: string): Promise<Attraction[]>;
  createAttraction(attraction: InsertAttraction): Promise<Attraction>;
  
  // Weather
  getWeatherByDestination(destinationId: string): Promise<Weather | undefined>;
  createWeather(weather: InsertWeather): Promise<Weather>;
  
  // Itineraries
  getItineraries(): Promise<Itinerary[]>;
  getItinerary(id: string): Promise<Itinerary | undefined>;
  createItinerary(itinerary: InsertItinerary): Promise<Itinerary>;
  deleteItinerary(id: string): Promise<void>;
  
  // Search
  searchDestinations(query: string): Promise<Destination[]>;
}

export class MemStorage implements IStorage {
  private destinations: Map<string, Destination> = new Map();
  private hotels: Map<string, Hotel> = new Map();
  private restaurants: Map<string, Restaurant> = new Map();
  private attractions: Map<string, Attraction> = new Map();
  private weather: Map<string, Weather> = new Map();
  private itineraries: Map<string, Itinerary> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed destinations
    const destinations: Destination[] = [
      {
        id: "dest-1",
        name: "Neo Tokyo",
        description: "Experience the perfect blend of ancient traditions and cyberpunk innovation in this neon-lit metropolis.",
        price: 1299,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 35.6762, lng: 139.6503 },
        category: "Cyberpunk"
      },
      {
        id: "dest-2",
        name: "Cyber Singapore",
        description: "A garden city transformed into a digital paradise with AI-integrated smart systems and vertical farms.",
        price: 999,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 1.3521, lng: 103.8198 },
        category: "Smart City"
      },
      {
        id: "dest-3",
        name: "Digital Dubai",
        description: "Where luxury meets technology in the world's most advanced smart city with holographic entertainment.",
        price: 1599,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 25.2048, lng: 55.2708 },
        category: "Luxury Tech"
      }
    ];

    destinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Seed hotels
    const hotels: Hotel[] = [
      {
        id: "hotel-1",
        destinationId: "dest-1",
        name: "Cyber Grand Hotel",
        description: "Experience luxury in the heart of Neo Tokyo with holographic concierge services and quantum wifi.",
        price: 299,
        rating: 4.9,
        reviewCount: 2847,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        amenities: ["AI Butler", "Sky Pool", "Quantum Spa"]
      },
      {
        id: "hotel-2",
        destinationId: "dest-1",
        name: "Neon Boutique Suites",
        description: "Intimate boutique experience with AR room customization and personalized AI recommendations.",
        price: 189,
        rating: 4.7,
        reviewCount: 1923,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        amenities: ["AR Rooms", "VR Lounge"]
      }
    ];

    hotels.forEach(hotel => this.hotels.set(hotel.id, hotel));

    // Seed restaurants
    const restaurants: Restaurant[] = [
      {
        id: "rest-1",
        destinationId: "dest-1",
        name: "Cyber Ramen Experience",
        description: "Traditional ramen elevated with molecular gastronomy and holographic ambiance.",
        cuisineType: "Fusion Japanese",
        priceRange: "$$$",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    restaurants.forEach(rest => this.restaurants.set(rest.id, rest));

    // Seed attractions
    const attractions: Attraction[] = [
      {
        id: "attr-1",
        destinationId: "dest-1",
        name: "Digital Shrine Visit",
        description: "Experience ancient spirituality enhanced with augmented reality offerings and digital prayers.",
        category: "Cultural",
        duration: "2 hours",
        imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      },
      {
        id: "attr-2",
        destinationId: "dest-1",
        name: "Holographic Shopping",
        description: "Shop in virtual reality stores with haptic feedback and instant delivery to your hotel.",
        category: "Shopping",
        duration: "3 hours",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      },
      {
        id: "attr-3",
        destinationId: "dest-1",
        name: "Maglev City Tour",
        description: "High-speed magnetic levitation tour through the city's most iconic futuristic landmarks.",
        category: "Sightseeing",
        duration: "4 hours",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      }
    ];

    attractions.forEach(attr => this.attractions.set(attr.id, attr));

    // Seed weather
    const weatherData: Weather[] = [
      {
        id: "weather-1",
        destinationId: "dest-1",
        temperature: 23,
        condition: "Neon Rain",
        humidity: 72,
        windSpeed: 15,
        icon: "neon-rain"
      }
    ];

    weatherData.forEach(w => this.weather.set(w.id, w));
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = randomUUID();
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }

  async getHotelsByDestination(destinationId: string): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).filter(hotel => hotel.destinationId === destinationId);
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const id = randomUUID();
    const hotel: Hotel = { ...insertHotel, id };
    this.hotels.set(id, hotel);
    return hotel;
  }

  async getRestaurantsByDestination(destinationId: string): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(rest => rest.destinationId === destinationId);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = randomUUID();
    const restaurant: Restaurant = { ...insertRestaurant, id };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  async getAttractionsByDestination(destinationId: string): Promise<Attraction[]> {
    return Array.from(this.attractions.values()).filter(attr => attr.destinationId === destinationId);
  }

  async createAttraction(insertAttraction: InsertAttraction): Promise<Attraction> {
    const id = randomUUID();
    const attraction: Attraction = { ...insertAttraction, id };
    this.attractions.set(id, attraction);
    return attraction;
  }

  async getWeatherByDestination(destinationId: string): Promise<Weather | undefined> {
    return Array.from(this.weather.values()).find(w => w.destinationId === destinationId);
  }

  async createWeather(insertWeather: InsertWeather): Promise<Weather> {
    const id = randomUUID();
    const weather: Weather = { ...insertWeather, id };
    this.weather.set(id, weather);
    return weather;
  }

  async getItineraries(): Promise<Itinerary[]> {
    return Array.from(this.itineraries.values());
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    return this.itineraries.get(id);
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const id = randomUUID();
    const itinerary: Itinerary = { 
      ...insertItinerary, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.itineraries.set(id, itinerary);
    return itinerary;
  }

  async deleteItinerary(id: string): Promise<void> {
    this.itineraries.delete(id);
  }

  async searchDestinations(query: string): Promise<Destination[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.destinations.values()).filter(dest =>
      dest.name.toLowerCase().includes(lowercaseQuery) ||
      dest.description.toLowerCase().includes(lowercaseQuery) ||
      dest.category.toLowerCase().includes(lowercaseQuery)
    );
  }
}

export const storage = new MemStorage();
