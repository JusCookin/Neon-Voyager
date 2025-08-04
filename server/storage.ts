import { 
  destinations,
  hotels,
  restaurants,
  attractions,
  weather,
  itineraries,
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
import { db } from "./db";
import { eq, ilike, or } from "drizzle-orm";
import { fetchWeatherData } from "./weather-api";
import { 
  fetchHotelsForDestination, 
  fetchRestaurantsForDestination, 
  fetchAttractionsForDestination 
} from "./travel-apis";

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

export class DatabaseStorage implements IStorage {
  async seedData() {
    // Check if data already exists
    const existingDestinations = await db.select().from(destinations).limit(1);
    if (existingDestinations.length > 0) {
      return; // Data already seeded
    }

    // Seed destinations
    const destinationData = [
      {
        name: "Neo Tokyo",
        description: "Experience the perfect blend of ancient traditions and cyberpunk innovation in this neon-lit metropolis.",
        price: 1299,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 35.6762, lng: 139.6503 },
        category: "Cyberpunk"
      },
      {
        name: "Cyber Singapore",
        description: "A garden city transformed into a digital paradise with AI-integrated smart systems and vertical farms.",
        price: 999,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 1.3521, lng: 103.8198 },
        category: "Smart City"
      },
      {
        name: "Digital Dubai",
        description: "Where luxury meets technology in the world's most advanced smart city with holographic entertainment.",
        price: 1599,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: { lat: 25.2048, lng: 55.2708 },
        category: "Luxury Tech"
      }
    ];

    const createdDestinations = await db.insert(destinations).values(destinationData).returning();

    // Seed hotels for first destination
    const hotelData = [
      {
        destinationId: createdDestinations[0].id,
        name: "Cyber Grand Hotel",
        description: "Experience luxury in the heart of Neo Tokyo with holographic concierge services and quantum wifi.",
        price: 299,
        rating: 4.9,
        reviewCount: 2847,
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        amenities: ["AI Butler", "Sky Pool", "Quantum Spa"]
      },
      {
        destinationId: createdDestinations[0].id,
        name: "Neon Boutique Suites",
        description: "Intimate boutique experience with AR room customization and personalized AI recommendations.",
        price: 189,
        rating: 4.7,
        reviewCount: 1923,
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        amenities: ["AR Rooms", "VR Lounge"]
      }
    ];

    await db.insert(hotels).values(hotelData);

    // Seed restaurants
    const restaurantData = [
      {
        destinationId: createdDestinations[0].id,
        name: "Cyber Ramen Experience",
        description: "Traditional ramen elevated with molecular gastronomy and holographic ambiance.",
        cuisineType: "Fusion Japanese",
        priceRange: "$$$",
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    await db.insert(restaurants).values(restaurantData);

    // Seed attractions
    const attractionData = [
      {
        destinationId: createdDestinations[0].id,
        name: "Digital Shrine Visit",
        description: "Experience ancient spirituality enhanced with augmented reality offerings and digital prayers.",
        category: "Cultural",
        duration: "2 hours",
        imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      },
      {
        destinationId: createdDestinations[0].id,
        name: "Holographic Shopping",
        description: "Shop in virtual reality stores with haptic feedback and instant delivery to your hotel.",
        category: "Shopping",
        duration: "3 hours",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      },
      {
        destinationId: createdDestinations[0].id,
        name: "Maglev City Tour",
        description: "High-speed magnetic levitation tour through the city's most iconic futuristic landmarks.",
        category: "Sightseeing",
        duration: "4 hours",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        location: { lat: 35.6762, lng: 139.6503 }
      }
    ];

    await db.insert(attractions).values(attractionData);

    // Seed weather
    const weatherData = [
      {
        destinationId: createdDestinations[0].id,
        temperature: 23,
        condition: "Neon Rain",
        humidity: 72,
        windSpeed: 15,
        icon: "neon-rain"
      }
    ];

    await db.insert(weather).values(weatherData);
  }

  async getDestinations(): Promise<Destination[]> {
    return await db.select().from(destinations);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    const result = await db.select().from(destinations).where(eq(destinations.id, id));
    return result[0];
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const result = await db.insert(destinations).values(insertDestination).returning();
    return result[0];
  }

  async getHotelsByDestination(destinationId: string): Promise<Hotel[]> {
    // Get from database first
    const dbHotels = await db.select().from(hotels).where(eq(hotels.destinationId, destinationId));
    
    // Get destination name for API call
    const destination = await this.getDestination(destinationId);
    if (!destination) return dbHotels;
    
    try {
      // Fetch from external API and merge with database data
      const externalHotels = await fetchHotelsForDestination(destination.name);
      
      // Convert external hotels to our schema and add to database
      for (const externalHotel of externalHotels) {
        const existingHotel = dbHotels.find(h => h.name === externalHotel.name);
        if (!existingHotel) {
          const newHotel = await db.insert(hotels).values([{
            destinationId,
            name: externalHotel.name,
            description: externalHotel.description,
            price: externalHotel.price,
            rating: externalHotel.rating,
            reviewCount: externalHotel.reviewCount,
            imageUrl: externalHotel.imageUrl,
            amenities: externalHotel.amenities
          }]).returning();
          dbHotels.push(newHotel[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching external hotels:', error);
    }
    
    return dbHotels;
  }

  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const result = await db.insert(hotels).values(insertHotel).returning();
    return result[0];
  }

  async getRestaurantsByDestination(destinationId: string): Promise<Restaurant[]> {
    // Get from database first
    const dbRestaurants = await db.select().from(restaurants).where(eq(restaurants.destinationId, destinationId));
    
    // Get destination name for API call
    const destination = await this.getDestination(destinationId);
    if (!destination) return dbRestaurants;
    
    try {
      // Fetch from external API and merge with database data
      const externalRestaurants = await fetchRestaurantsForDestination(destination.name);
      
      // Convert external restaurants to our schema and add to database
      for (const externalRestaurant of externalRestaurants) {
        const existingRestaurant = dbRestaurants.find(r => r.name === externalRestaurant.name);
        if (!existingRestaurant) {
          const newRestaurant = await db.insert(restaurants).values([{
            destinationId,
            name: externalRestaurant.name,
            description: externalRestaurant.description,
            cuisineType: externalRestaurant.cuisineType,
            priceRange: externalRestaurant.priceRange,
            rating: externalRestaurant.rating,
            imageUrl: externalRestaurant.imageUrl
          }]).returning();
          dbRestaurants.push(newRestaurant[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching external restaurants:', error);
    }
    
    return dbRestaurants;
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const result = await db.insert(restaurants).values(insertRestaurant).returning();
    return result[0];
  }

  async getAttractionsByDestination(destinationId: string): Promise<Attraction[]> {
    // Get from database first
    const dbAttractions = await db.select().from(attractions).where(eq(attractions.destinationId, destinationId));
    
    // Get destination name for API call
    const destination = await this.getDestination(destinationId);
    if (!destination) return dbAttractions;
    
    try {
      // Fetch from external API and merge with database data
      const externalAttractions = await fetchAttractionsForDestination(destination.name);
      
      // Convert external attractions to our schema and add to database
      for (const externalAttraction of externalAttractions) {
        const existingAttraction = dbAttractions.find(a => a.name === externalAttraction.name);
        if (!existingAttraction) {
          const newAttraction = await db.insert(attractions).values([{
            destinationId,
            name: externalAttraction.name,
            description: externalAttraction.description,
            category: externalAttraction.category,
            duration: externalAttraction.duration,
            imageUrl: externalAttraction.imageUrl,
            location: externalAttraction.location
          }]).returning();
          dbAttractions.push(newAttraction[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching external attractions:', error);
    }
    
    return dbAttractions;
  }

  async createAttraction(insertAttraction: InsertAttraction): Promise<Attraction> {
    const result = await db.insert(attractions).values(insertAttraction).returning();
    return result[0];
  }

  async getWeatherByDestination(destinationId: string): Promise<Weather | undefined> {
    // Check database first
    const dbResult = await db.select().from(weather).where(eq(weather.destinationId, destinationId));
    let weatherData = dbResult[0];
    
    // Get destination for real-time weather
    const destination = await this.getDestination(destinationId);
    if (!destination) return weatherData;
    
    try {
      // Fetch real-time weather data
      const realTimeWeather = await fetchWeatherData(destination.location.lat, destination.location.lng);
      
      if (weatherData) {
        // Update existing weather data
        await db.update(weather)
          .set({
            temperature: realTimeWeather.temperature,
            condition: realTimeWeather.condition,
            humidity: realTimeWeather.humidity,
            windSpeed: realTimeWeather.windSpeed,
            icon: realTimeWeather.icon
          })
          .where(eq(weather.destinationId, destinationId));
        
        // Return updated data
        weatherData = {
          ...weatherData,
          ...realTimeWeather
        };
      } else {
        // Create new weather data
        const newWeather = await db.insert(weather).values([{
          destinationId,
          ...realTimeWeather
        }]).returning();
        weatherData = newWeather[0];
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    
    return weatherData;
  }

  async createWeather(insertWeather: InsertWeather): Promise<Weather> {
    const result = await db.insert(weather).values(insertWeather).returning();
    return result[0];
  }

  async getItineraries(): Promise<Itinerary[]> {
    return await db.select().from(itineraries);
  }

  async getItinerary(id: string): Promise<Itinerary | undefined> {
    const result = await db.select().from(itineraries).where(eq(itineraries.id, id));
    return result[0];
  }

  async createItinerary(insertItinerary: InsertItinerary): Promise<Itinerary> {
    const itineraryWithDate = {
      ...insertItinerary,
      createdAt: new Date().toISOString()
    };
    const result = await db.insert(itineraries).values([itineraryWithDate]).returning();
    return result[0];
  }

  async deleteItinerary(id: string): Promise<void> {
    await db.delete(itineraries).where(eq(itineraries.id, id));
  }

  async searchDestinations(query: string): Promise<Destination[]> {
    return await db.select().from(destinations).where(
      or(
        ilike(destinations.name, `%${query}%`),
        ilike(destinations.description, `%${query}%`),
        ilike(destinations.category, `%${query}%`)
      )
    );
  }
}

const storage = new DatabaseStorage();

// Initialize data on startup
storage.seedData().catch(console.error);

export { storage };
