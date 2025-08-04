import { useState } from 'react';
import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import TrendingDestinations from '@/components/trending-destinations';
import DestinationDetail from '@/components/destination-detail';
import ItineraryBuilder from '@/components/itinerary-builder';
import Footer from '@/components/footer';
import AudioPlayer from '@/components/audio-player';
import AppStatus from '@/components/app-status';
import FeatureDemo from '@/components/feature-demo';
import { useItinerary } from '@/hooks/use-itinerary';

export default function Home() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const { addItem } = useItinerary();

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDestinationSelect = (destinationId: string) => {
    setSelectedDestination(destinationId);
    // Scroll to destination detail section
    setTimeout(() => {
      document.getElementById('destination-detail')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddToItinerary = (item: any) => {
    addItem(item);
  };

  return (
    <div className="min-h-screen">
      <Navigation onNavigate={handleNavigate} />
      
      <HeroSection onDestinationSelect={handleDestinationSelect} />
      
      <TrendingDestinations onDestinationSelect={handleDestinationSelect} />
      
      {selectedDestination && (
        <DestinationDetail 
          destinationId={selectedDestination}
          onAddToItinerary={handleAddToItinerary}
        />
      )}
      
      <ItineraryBuilder />
      
      <Footer />
      
      <AudioPlayer />
      
      <AppStatus />
      
      <FeatureDemo />
    </div>
  );
}
