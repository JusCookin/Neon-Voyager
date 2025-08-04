import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import VantaBackground from './vanta-background';

interface HeroSectionProps {
  onDestinationSelect: (destinationId: string) => void;
}

export default function HeroSection({ onDestinationSelect }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: searchResults } = useQuery({
    queryKey: ['/api/search', searchQuery],
    queryFn: async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: searchQuery.length > 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults && Array.isArray(searchResults) && searchResults.length > 0) {
      onDestinationSelect(searchResults[0].id);
    }
  };

  return (
    <VantaBackground>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-space-navy/20 to-space-gray/40" />
        
        <motion.div 
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-futuristic font-black mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="animate-glow neon-text-cyan">EXPLORE THE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400">
              FUTURE
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover destinations like never before with our AI-powered travel companion. 
            Journey through time and space to find your perfect adventure.
          </motion.p>
          
          <motion.div 
            className="max-w-2xl mx-auto mb-8 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-400 text-xl" />
                <Input
                  type="text"
                  placeholder="Search destinations across the galaxy..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 2);
                  }}
                  onFocus={() => setShowSuggestions(searchQuery.length > 2)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full px-6 py-4 pl-14 bg-space-navy/80 border-2 border-cyan-400/50 rounded-2xl text-white placeholder-gray-400 search-glow text-lg"
                />
                <Button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400 to-pink-400 hover:from-pink-400 hover:to-purple-400 text-black font-semibold hover-glow"
                >
                  Explore
                </Button>
              </div>
              
              {showSuggestions && searchResults && Array.isArray(searchResults) && searchResults.length > 0 && (
                <motion.div 
                  className="absolute mt-2 w-full glass-effect rounded-xl border border-cyan-400/30 overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="p-4 space-y-2">
                    {searchResults.slice(0, 3).map((destination: any) => (
                      <div
                        key={destination.id}
                        onClick={() => {
                          onDestinationSelect(destination.id);
                          setShowSuggestions(false);
                        }}
                        className="flex items-center p-3 hover:bg-cyan-400/10 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                        <span>{destination.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            <Button 
              onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-pink-400 hover:to-cyan-400 text-black font-bold text-lg px-8 py-4 rounded-2xl hover-glow animate-float"
            >
              Start Your Journey
            </Button>
            <div className="text-center text-sm text-gray-400 max-w-md mx-auto">
              ✨ Try searching for "tokyo" or "singapore" above, or click any destination card below to see live hotels, restaurants, attractions, and weather data!
            </div>
          </motion.div>
        </motion.div>
      </section>
    </VantaBackground>
  );
}
