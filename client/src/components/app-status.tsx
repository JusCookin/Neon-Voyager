import { CheckCircle, Wifi, Database, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function AppStatus() {
  const features = [
    { icon: Database, label: 'PostgreSQL Database', status: 'Connected' },
    { icon: Cloud, label: 'Weather API', status: 'Active' },
    { icon: Wifi, label: 'Travel APIs', status: 'Online' },
    { icon: CheckCircle, label: 'Search Engine', status: 'Ready' }
  ];

  return (
    <motion.div 
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <Card className="glass-effect border-cyan-400/30 neon-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold text-green-400">SYSTEM STATUS</span>
          </div>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex items-center justify-between gap-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <feature.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-gray-300">{feature.label}</span>
                </div>
                <Badge className="bg-green-400/20 text-green-400 text-xs px-2 py-0">
                  {feature.status}
                </Badge>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-cyan-400/20">
            <div className="text-xs text-center text-cyan-400 font-semibold">
              ALL SYSTEMS OPERATIONAL ✨
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}