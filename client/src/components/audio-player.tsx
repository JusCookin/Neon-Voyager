import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAudio } from '@/hooks/use-audio';

export default function AudioPlayer() {
  const [showControls, setShowControls] = useState(false);
  const { isPlaying, volume, toggle, updateVolume } = useAudio({
    // In a real implementation, this would be a synth-wave track
    url: undefined, // Will use synthetic audio
    volume: 0.3,
    loop: true
  });

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2">
        {showControls && (
          <div className="glass-effect rounded-lg p-3 neon-border flex items-center gap-3 animate-in slide-in-from-right">
            <Slider
              value={[volume * 100]}
              onValueChange={(value) => updateVolume(value[0] / 100)}
              max={100}
              step={1}
              className="w-20"
            />
            <span className="text-xs text-cyan-400 min-w-[30px]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
        
        <Button
          onClick={() => setShowControls(!showControls)}
          className="glass-effect neon-border hover-glow w-12 h-12 p-0"
          variant="outline"
        >
          {volume === 0 ? (
            <VolumeX className="h-5 w-5 text-cyan-400" />
          ) : (
            <Volume2 className="h-5 w-5 text-cyan-400" />
          )}
        </Button>
        
        <Button
          onClick={toggle}
          className="glass-effect neon-border hover-glow w-12 h-12 p-0"
          variant="outline"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-pink-400" />
          ) : (
            <Play className="h-5 w-5 text-pink-400" />
          )}
        </Button>
      </div>
    </div>
  );
}
