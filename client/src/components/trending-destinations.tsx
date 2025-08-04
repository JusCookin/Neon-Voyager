import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import type { Destination } from '@/types/travel';

interface TrendingDestinationsProps {
  onDestinationSelect: (destinationId: string) => void;
}

export default function TrendingDestinations({ onDestinationSelect }: TrendingDestinationsProps) {
  const { data: destinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section id="destinations" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 neon-border animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-futuristic font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            TRENDING DESTINATIONS
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the most popular interstellar destinations chosen by fellow travelers
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations?.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect rounded-2xl overflow-hidden neon-border hover-glow group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-futuristic font-bold neon-text-cyan">
                      {destination.name.toUpperCase()}
                    </h3>
                    <div className="flex text-pink-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold neon-text-pink">
                      ${destination.price.toLocaleString()}
                    </span>
                    <Button 
                      onClick={() => onDestinationSelect(destination.id)}
                      className="bg-cyan-400 hover:bg-pink-400 text-black px-4 py-2 rounded-lg transition-colors font-semibold hover-glow"
                    >
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
