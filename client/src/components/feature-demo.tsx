import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Search, MapPin, Hotel, Utensils, Star, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureDemo() {
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    {
      icon: Search,
      title: "Smart Search",
      description: "Type 'tokyo', 'singapore', or 'dubai' to see instant search results",
      action: "Try the search bar above",
      color: "cyan"
    },
    {
      icon: MapPin,
      title: "Destination Explorer",
      description: "Click any destination card to view detailed information",
      action: "Click 'Explore' on destination cards",
      color: "pink"
    },
    {
      icon: Hotel,
      title: "Live Travel Data",
      description: "Browse real hotels, restaurants, and attractions from external APIs",
      action: "Use the tabs to switch between Hotels/Restaurants/Attractions",
      color: "purple"
    },
    {
      icon: Calendar,
      title: "Itinerary Builder",
      description: "Add items to your custom itinerary with drag-and-drop functionality",
      action: "Click 'Add' buttons on any hotel/restaurant/attraction card",
      color: "green"
    }
  ];

  const currentDemoData = demos[currentDemo];
  const IconComponent = currentDemoData.icon;

  return (
    <motion.div 
      className="fixed bottom-4 left-4 z-50 max-w-sm"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <Card className="glass-effect border-cyan-400/30 neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">FEATURE DEMO</span>
          </div>
          
          <motion.div
            key={currentDemo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <IconComponent className={`w-6 h-6 text-${currentDemoData.color}-400`} />
              <h3 className="font-semibold text-white">{currentDemoData.title}</h3>
            </div>
            
            <p className="text-sm text-gray-300">
              {currentDemoData.description}
            </p>
            
            <Badge className={`bg-${currentDemoData.color}-400/20 text-${currentDemoData.color}-400 text-xs`}>
              {currentDemoData.action}
            </Badge>
          </motion.div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-cyan-400/20">
            <div className="flex gap-1">
              {demos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentDemo ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCurrentDemo((prev) => (prev + 1) % demos.length)}
              className="text-cyan-400 hover:text-cyan-300 text-xs"
            >
              Next Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}