import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Dashboard' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'itinerary', label: 'Itinerary' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 glass-effect border-b border-cyan-400/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Rocket className="text-2xl text-cyan-400 animate-pulse-neon" />
            <span className="text-xl font-futuristic font-bold neon-text-cyan">
              NEON VOYAGER
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="hover:text-cyan-400 transition-colors font-medium"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <Button className="bg-gradient-to-r from-cyan-400 to-pink-400 hover:from-pink-400 hover:to-purple-400 text-black font-semibold hover-glow">
              Sign In
            </Button>
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden text-cyan-400">
                <Menu className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-effect border-cyan-400/30">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    variant="ghost"
                    className="justify-start text-left hover:text-cyan-400"
                  >
                    {item.label}
                  </Button>
                ))}
                <Button className="bg-gradient-to-r from-cyan-400 to-pink-400 text-black font-semibold hover-glow mt-4">
                  Sign In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
