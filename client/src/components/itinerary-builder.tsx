import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trash2, GripVertical, Save } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useItinerary } from '@/hooks/use-itinerary';
import type { Attraction, ItineraryItem } from '@/types/travel';

export default function ItineraryBuilder() {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [itineraryName, setItineraryName] = useState('');
  
  const {
    currentItinerary,
    addItem,
    removeItem,
    reorderItems,
    clearItinerary,
    saveItinerary
  } = useItinerary();

  const { data: destinations } = useQuery({
    queryKey: ['/api/destinations'],
  });

  const { data: attractions } = useQuery({
    queryKey: ['/api/destinations', 'dest-1', 'attractions'], // Using first destination for demo
  });

  const availableItems: ItineraryItem[] = (attractions && Array.isArray(attractions)) ? attractions.map((attraction: Attraction) => ({
    id: attraction.id,
    type: 'attraction' as const,
    name: attraction.name,
    duration: attraction.duration,
    category: attraction.category,
    imageUrl: attraction.imageUrl
  })) : [];

  const handleSaveItinerary = () => {
    if (itineraryName.trim() && currentItinerary.length > 0) {
      saveItinerary(itineraryName, 'dest-1'); // Using first destination for demo
      setSaveDialogOpen(false);
      setItineraryName('');
    }
  };

  return (
    <section id="itinerary" className="py-20 px-4 border-t border-cyan-400/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-futuristic font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            BUILD YOUR ITINERARY
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Drag and drop your favorite destinations to create the perfect journey
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Items */}
          <div className="lg:col-span-2">
            <motion.h3 
              className="text-2xl font-futuristic font-bold neon-text-cyan mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              AVAILABLE EXPERIENCES
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-4">
              {availableItems.map((item, index) => (
                <motion.div
                  key={`available-${item.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className="glass-effect rounded-xl p-4 neon-border hover-glow cursor-pointer"
                    onClick={() => addItem(item)}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg" 
                      />
                      <div className="flex-1">
                        <h4 className="font-bold neon-text-cyan">{item.name}</h4>
                        <p className="text-sm text-gray-300">
                          {item.duration} • {item.category}
                        </p>
                        <div className="flex items-center mt-1">
                          <GripVertical className="w-4 h-4 text-pink-400 mr-2" />
                          <span className="text-pink-400 font-semibold text-sm">Click to add</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Itinerary Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-futuristic font-bold neon-text-cyan mb-6">
              YOUR ITINERARY
            </h3>
            <Card className="glass-effect rounded-2xl p-6 neon-border min-h-96">
              {currentItinerary.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  <Calendar className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="mb-2">Click experiences to build your itinerary</p>
                  <p className="text-sm">Your perfect journey awaits!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Reorder.Group 
                    values={currentItinerary} 
                    onReorder={(newOrder) => {
                      // Update the itinerary order
                      newOrder.forEach((item, index) => {
                        const oldIndex = currentItinerary.findIndex(i => i.id === item.id);
                        if (oldIndex !== index) {
                          reorderItems(oldIndex, index);
                        }
                      });
                    }}
                    className="space-y-3"
                  >
                    {currentItinerary.map((item, index) => (
                      <Reorder.Item 
                        key={`${item.id}-${index}-${item.type}`} 
                        value={item}
                        className="flex items-center gap-4 p-3 bg-cyan-400/10 rounded-lg cursor-move"
                        whileDrag={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                          {index + 1}
                        </div>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded" 
                        />
                        <div className="flex-1">
                          <h4 className="font-bold neon-text-cyan text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-300">
                            {9 + index * 2}:00 AM - {item.duration}
                          </p>
                        </div>
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          className="text-pink-400 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                  
                  <div className="pt-4 border-t border-cyan-400/30 space-y-3">
                    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-black py-3 rounded-lg hover-glow font-semibold">
                          <Save className="w-4 h-4 mr-2" />
                          Save Itinerary
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-effect border-cyan-400/30">
                        <DialogHeader>
                          <DialogTitle className="neon-text-cyan font-futuristic">
                            Save Your Itinerary
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter itinerary name..."
                            value={itineraryName}
                            onChange={(e) => setItineraryName(e.target.value)}
                            className="glass-effect border-cyan-400/50"
                          />
                          <div className="flex gap-3">
                            <Button
                              onClick={() => setSaveDialogOpen(false)}
                              variant="outline"
                              className="flex-1 glass-effect border-cyan-400/50"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveItinerary}
                              className="flex-1 bg-gradient-to-r from-cyan-400 to-pink-400 text-black hover-glow"
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      onClick={clearItinerary}
                      variant="outline"
                      className="w-full glass-effect border-pink-400/50 text-pink-400 hover:bg-pink-400/10"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
