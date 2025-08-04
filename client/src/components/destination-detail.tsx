import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bed, Utensils, MapPin, Cloud, Star, Plus, Heart, Share } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import type { Destination, Hotel, Restaurant, Attraction, Weather } from '@/types/travel';

interface DestinationDetailProps {
  destinationId: string;
  onAddToItinerary: (item: any) => void;
}

export default function DestinationDetail({ destinationId, onAddToItinerary }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState('hotels');

  const { data: destination } = useQuery<Destination>({
    queryKey: ['/api/destinations', destinationId],
  });

  const { data: hotels } = useQuery<Hotel[]>({
    queryKey: ['/api/destinations', destinationId, 'hotels'],
  });

  const { data: restaurants } = useQuery<Restaurant[]>({
    queryKey: ['/api/destinations', destinationId, 'restaurants'],
  });

  const { data: attractions } = useQuery<Attraction[]>({
    queryKey: ['/api/destinations', destinationId, 'attractions'],
  });

  const { data: weather } = useQuery<Weather>({
    queryKey: ['/api/destinations', destinationId, 'weather'],
  });

  if (!destination) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-700 rounded-3xl mb-8"></div>
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destination-detail" className="py-20 px-4 border-t border-cyan-400/30">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="relative h-96 rounded-3xl overflow-hidden mb-8 neon-border"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={destination.imageUrl} 
            alt={destination.name}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-blue/80 to-transparent">
            <div className="absolute bottom-8 left-8">
              <motion.h1 
                className="text-5xl font-futuristic font-black neon-text-cyan mb-2 animate-glow"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {destination.name.toUpperCase()}
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-200"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {destination.description}
              </motion.p>
            </div>
          </div>
        </motion.div>
        
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8 gap-4 bg-transparent">
              <TabsTrigger 
                value="hotels" 
                className="bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold hover-glow data-[state=active]:bg-cyan-400 data-[state=active]:text-black"
              >
                <Bed className="w-4 h-4 mr-2" />
                Hotels
              </TabsTrigger>
              <TabsTrigger 
                value="restaurants"
                className="glass-effect border border-cyan-400/50 px-6 py-3 rounded-xl hover-glow data-[state=active]:bg-cyan-400 data-[state=active]:text-black"
              >
                <Utensils className="w-4 h-4 mr-2" />
                Restaurants
              </TabsTrigger>
              <TabsTrigger 
                value="attractions"
                className="glass-effect border border-cyan-400/50 px-6 py-3 rounded-xl hover-glow data-[state=active]:bg-cyan-400 data-[state=active]:text-black"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Attractions
              </TabsTrigger>
              <TabsTrigger 
                value="weather"
                className="glass-effect border border-cyan-400/50 px-6 py-3 rounded-xl hover-glow data-[state=active]:bg-cyan-400 data-[state=active]:text-black"
              >
                <Cloud className="w-4 h-4 mr-2" />
                Weather
              </TabsTrigger>
            </TabsList>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <TabsContent value="hotels" className="space-y-6">
                  {hotels?.map((hotel) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="glass-effect rounded-2xl p-6 neon-border hover-glow">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img 
                            src={hotel.imageUrl} 
                            alt={hotel.name}
                            className="w-full md:w-48 h-48 object-cover rounded-xl" 
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-futuristic font-bold neon-text-cyan">
                                  {hotel.name.toUpperCase()}
                                </h3>
                                <div className="flex items-center mt-1">
                                  <div className="flex text-pink-400 mr-3">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-current' : ''}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-gray-300">
                                    {hotel.rating} ({hotel.reviewCount.toLocaleString()} reviews)
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold neon-text-pink">
                                  ${hotel.price}
                                </div>
                                <div className="text-gray-400">per night</div>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-4">{hotel.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2 flex-wrap">
                                {hotel.amenities.map((amenity) => (
                                  <Badge 
                                    key={amenity}
                                    className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => onAddToItinerary({
                                    id: hotel.id,
                                    type: 'hotel',
                                    name: hotel.name,
                                    duration: '1 night',
                                    category: 'Accommodation',
                                    imageUrl: hotel.imageUrl
                                  })}
                                  variant="outline"
                                  className="neon-border hover-glow"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add
                                </Button>
                                <Button className="bg-gradient-to-r from-cyan-400 to-pink-400 text-black hover-glow font-semibold">
                                  Book Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
                
                <TabsContent value="restaurants" className="space-y-6">
                  {restaurants?.map((restaurant) => (
                    <motion.div
                      key={restaurant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="glass-effect rounded-2xl p-6 neon-border hover-glow">
                        <div className="flex flex-col md:flex-row gap-6">
                          <img 
                            src={restaurant.imageUrl} 
                            alt={restaurant.name}
                            className="w-full md:w-48 h-48 object-cover rounded-xl" 
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-2xl font-futuristic font-bold neon-text-cyan">
                                  {restaurant.name.toUpperCase()}
                                </h3>
                                <div className="flex items-center mt-1 gap-3">
                                  <Badge className="bg-pink-400/20 text-pink-400">
                                    {restaurant.cuisineType}
                                  </Badge>
                                  <Badge className="bg-purple-400/20 text-purple-400">
                                    {restaurant.priceRange}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex text-pink-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(restaurant.rating) ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 mb-4">{restaurant.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-cyan-400 font-semibold">
                                Rating: {restaurant.rating}/5
                              </span>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => onAddToItinerary({
                                    id: restaurant.id,
                                    type: 'restaurant',
                                    name: restaurant.name,
                                    duration: '1.5 hours',
                                    category: 'Dining',
                                    imageUrl: restaurant.imageUrl
                                  })}
                                  variant="outline"
                                  className="neon-border hover-glow"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add
                                </Button>
                                <Button className="bg-gradient-to-r from-pink-400 to-purple-400 text-black hover-glow font-semibold">
                                  Reserve
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
                
                <TabsContent value="attractions" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {attractions?.map((attraction) => (
                      <motion.div
                        key={attraction.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="glass-effect rounded-2xl overflow-hidden neon-border hover-glow">
                          <img 
                            src={attraction.imageUrl} 
                            alt={attraction.name}
                            className="w-full h-32 object-cover" 
                          />
                          <CardContent className="p-4">
                            <h3 className="font-futuristic font-bold neon-text-cyan mb-2">
                              {attraction.name.toUpperCase()}
                            </h3>
                            <p className="text-gray-300 text-sm mb-3">{attraction.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <Badge className="bg-purple-400/20 text-purple-400">
                                {attraction.category}
                              </Badge>
                              <span className="text-cyan-400 text-sm">{attraction.duration}</span>
                            </div>
                            <Button 
                              onClick={() => onAddToItinerary({
                                id: attraction.id,
                                type: 'attraction',
                                name: attraction.name,
                                duration: attraction.duration,
                                category: attraction.category,
                                imageUrl: attraction.imageUrl
                              })}
                              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-black hover-glow font-semibold"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add to Itinerary
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="weather">
                  {weather && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="glass-effect rounded-2xl p-8 neon-border text-center">
                        <h3 className="text-2xl font-futuristic font-bold neon-text-cyan mb-6">
                          CURRENT WEATHER
                        </h3>
                        <div className="text-6xl font-bold neon-text-pink mb-4">
                          {weather.temperature}°C
                        </div>
                        <div className="text-xl text-gray-300 mb-6">{weather.condition}</div>
                        <div className="grid grid-cols-2 gap-8 text-center">
                          <div>
                            <div className="text-cyan-400 text-lg font-semibold">Humidity</div>
                            <div className="text-2xl font-bold">{weather.humidity}%</div>
                          </div>
                          <div>
                            <div className="text-cyan-400 text-lg font-semibold">Wind</div>
                            <div className="text-2xl font-bold">{weather.windSpeed} km/h</div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </TabsContent>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Weather Widget */}
                {weather && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="glass-effect rounded-2xl p-6 neon-border">
                      <h3 className="text-xl font-futuristic font-bold neon-text-cyan mb-4 flex items-center">
                        <Cloud className="text-pink-400 mr-2" />
                        WEATHER
                      </h3>
                      <div className="text-center">
                        <div className="text-4xl font-bold neon-text-pink mb-2">
                          {weather.temperature}°C
                        </div>
                        <div className="text-gray-300 mb-4">{weather.condition}</div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-cyan-400">Humidity</div>
                            <div className="font-semibold">{weather.humidity}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-cyan-400">Wind</div>
                            <div className="font-semibold">{weather.windSpeed} km/h</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}
                
                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="glass-effect rounded-2xl p-6 neon-border">
                    <h3 className="text-xl font-futuristic font-bold neon-text-cyan mb-4">
                      QUICK ACTIONS
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-black py-3 rounded-lg hover-glow font-semibold">
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Itinerary
                      </Button>
                      <Button className="w-full glass-effect border border-cyan-400/50 py-3 rounded-lg hover-glow">
                        <Heart className="w-4 h-4 mr-2" />
                        Save Destination
                      </Button>
                      <Button className="w-full glass-effect border border-cyan-400/50 py-3 rounded-lg hover-glow">
                        <Share className="w-4 h-4 mr-2" />
                        Share with Friends
                      </Button>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Interactive Map Placeholder */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card className="glass-effect rounded-2xl p-6 neon-border">
                    <h3 className="text-xl font-futuristic font-bold neon-text-cyan mb-4 flex items-center">
                      <MapPin className="text-pink-400 mr-2" />
                      LOCATION MAP
                    </h3>
                    <div className="bg-space-navy rounded-xl h-48 flex items-center justify-center border border-cyan-400/30">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                        <p className="text-gray-300">Interactive Map</p>
                        <p className="text-sm text-gray-400">Mapbox GL JS Integration</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
