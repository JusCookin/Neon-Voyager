// Travel APIs integration for hotels, restaurants, and attractions
// In production, you would integrate with APIs like Booking.com, TripAdvisor, Google Places, etc.

interface TravelLocation {
  lat: number;
  lng: number;
}

export interface ExternalHotel {
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  amenities: string[];
  bookingUrl?: string;
}

export interface ExternalRestaurant {
  name: string;
  description: string;
  cuisineType: string;
  priceRange: string;
  rating: number;
  imageUrl: string;
  reservationUrl?: string;
}

export interface ExternalAttraction {
  name: string;
  description: string;
  category: string;
  duration: string;
  imageUrl: string;
  location: TravelLocation;
  ticketUrl?: string;
}

// Simulated API data - in production you'd fetch from real APIs
const hotelDatabase = {
  'Neo Tokyo': [
    {
      name: "Cyber Grand Hotel",
      description: "Experience luxury in the heart of Neo Tokyo with holographic concierge services and quantum wifi.",
      price: 299,
      rating: 4.9,
      reviewCount: 2847,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      amenities: ["AI Butler", "Sky Pool", "Quantum Spa"],
      bookingUrl: "https://booking.example.com/cyber-grand"
    },
    {
      name: "Neon Boutique Suites",
      description: "Intimate boutique experience with AR room customization and personalized AI recommendations.",
      price: 189,
      rating: 4.7,
      reviewCount: 1923,
      imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      amenities: ["AR Rooms", "VR Lounge"],
      bookingUrl: "https://booking.example.com/neon-boutique"
    },
    {
      name: "Digital Zen Lodge",
      description: "Modern minimalist hotel with meditation pods and biometric wellness tracking.",
      price: 249,
      rating: 4.6,
      reviewCount: 1567,
      imageUrl: "https://images.unsplash.com/photo-1578774204375-826dc5d996e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      amenities: ["Meditation Pods", "Wellness Tracking", "Smart Rooms"],
      bookingUrl: "https://booking.example.com/digital-zen"
    }
  ],
  'Cyber Singapore': [
    {
      name: "Marina Bay Cyber Resort",
      description: "Luxury resort with infinity pool overlooking the digital skyline and AI concierge.",
      price: 350,
      rating: 4.8,
      reviewCount: 3421,
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      amenities: ["Infinity Pool", "AI Concierge", "Sky Garden"],
      bookingUrl: "https://booking.example.com/marina-cyber"
    }
  ],
  'Digital Dubai': [
    {
      name: "Burj Digital Palace",
      description: "Ultra-luxury tower hotel with holographic entertainment and personal AI assistants.",
      price: 599,
      rating: 4.9,
      reviewCount: 2156,
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      amenities: ["Holographic Entertainment", "Personal AI", "Luxury Spa"],
      bookingUrl: "https://booking.example.com/burj-digital"
    }
  ]
};

const restaurantDatabase = {
  'Neo Tokyo': [
    {
      name: "Cyber Ramen Experience",
      description: "Traditional ramen elevated with molecular gastronomy and holographic ambiance.",
      cuisineType: "Fusion Japanese",
      priceRange: "$$$",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      reservationUrl: "https://reservations.example.com/cyber-ramen"
    },
    {
      name: "Neon Sushi Lab",
      description: "Interactive sushi bar where robots and chefs collaborate to create edible art.",
      cuisineType: "Modern Japanese",
      priceRange: "$$$$",
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      reservationUrl: "https://reservations.example.com/neon-sushi"
    }
  ]
};

const attractionDatabase = {
  'Neo Tokyo': [
    {
      name: "Digital Shrine Visit",
      description: "Experience ancient spirituality enhanced with augmented reality offerings and digital prayers.",
      category: "Cultural",
      duration: "2 hours",
      imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      location: { lat: 35.6762, lng: 139.6503 },
      ticketUrl: "https://tickets.example.com/digital-shrine"
    },
    {
      name: "Holographic Shopping District",
      description: "Shop in virtual reality stores with haptic feedback and instant delivery to your hotel.",
      category: "Shopping",
      duration: "3 hours",
      imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      location: { lat: 35.6762, lng: 139.6503 },
      ticketUrl: "https://tickets.example.com/holo-shopping"
    },
    {
      name: "Maglev City Tour",
      description: "High-speed magnetic levitation tour through the city's most iconic futuristic landmarks.",
      category: "Sightseeing",
      duration: "4 hours",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
      location: { lat: 35.6762, lng: 139.6503 },
      ticketUrl: "https://tickets.example.com/maglev-tour"
    }
  ]
};

export async function fetchHotelsForDestination(destinationName: string): Promise<ExternalHotel[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return hotelDatabase[destinationName as keyof typeof hotelDatabase] || [];
}

export async function fetchRestaurantsForDestination(destinationName: string): Promise<ExternalRestaurant[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return restaurantDatabase[destinationName as keyof typeof restaurantDatabase] || [];
}

export async function fetchAttractionsForDestination(destinationName: string): Promise<ExternalAttraction[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return attractionDatabase[destinationName as keyof typeof attractionDatabase] || [];
}

// Search functionality across all travel data
export async function searchTravelData(query: string): Promise<{
  hotels: ExternalHotel[];
  restaurants: ExternalRestaurant[];
  attractions: ExternalAttraction[];
}> {
  const lowercaseQuery = query.toLowerCase();
  
  const allHotels = Object.values(hotelDatabase).flat();
  const allRestaurants = Object.values(restaurantDatabase).flat();
  const allAttractions = Object.values(attractionDatabase).flat();
  
  return {
    hotels: allHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(lowercaseQuery) ||
      hotel.description.toLowerCase().includes(lowercaseQuery)
    ),
    restaurants: allRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(lowercaseQuery) ||
      restaurant.description.toLowerCase().includes(lowercaseQuery) ||
      restaurant.cuisineType.toLowerCase().includes(lowercaseQuery)
    ),
    attractions: allAttractions.filter(attraction => 
      attraction.name.toLowerCase().includes(lowercaseQuery) ||
      attraction.description.toLowerCase().includes(lowercaseQuery) ||
      attraction.category.toLowerCase().includes(lowercaseQuery)
    )
  };
}