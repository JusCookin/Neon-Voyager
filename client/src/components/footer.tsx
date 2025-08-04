import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerSections = [
    {
      title: 'EXPLORE',
      links: ['Destinations', 'Hotels', 'Restaurants', 'Attractions']
    },
    {
      title: 'FEATURES',
      links: ['Itinerary Builder', 'Interactive Maps', 'Weather Widgets', 'AI Recommendations']
    },
    {
      title: 'SUPPORT',
      links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service']
    }
  ];

  return (
    <footer className="border-t border-cyan-400/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Rocket className="text-2xl text-cyan-400 animate-pulse-neon" />
              <span className="text-xl font-futuristic font-bold neon-text-cyan">
                NEON VOYAGER
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Explore the future of travel with our AI-powered guide to the world's most incredible destinations.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'facebook'].map((social) => (
                <motion.a 
                  key={social}
                  href="#" 
                  className="text-cyan-400 hover:text-pink-400 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-6 h-6 bg-current rounded" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-futuristic font-bold neon-text-cyan mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a 
                      href="#" 
                      className="hover:text-cyan-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="border-t border-cyan-400/30 mt-8 pt-8 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 Neon Voyager. All rights reserved. Journey into the future.</p>
        </motion.div>
      </div>
    </footer>
  );
}
