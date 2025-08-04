import { useState, useEffect, useRef } from 'react';

interface AudioConfig {
  url?: string;
  volume?: number;
  loop?: boolean;
}

export function useAudio(config: AudioConfig = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(config.volume || 0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // For now, we'll create a placeholder for Tone.js integration
    // In a real implementation, this would use Tone.js for synthesized audio
    if (config.url) {
      audioRef.current = new Audio(config.url);
      audioRef.current.loop = config.loop || true;
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [config.url, config.loop, volume]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      // Fallback: Create synthetic ambient sound using Web Audio API
      createSyntheticAmbient();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const createSyntheticAmbient = () => {
    // Simple Web Audio API implementation for ambient sound
    // This would be replaced with Tone.js in a real implementation
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
      
      oscillator.start();
      
      // Stop after a short duration to avoid continuous sound
      setTimeout(() => {
        oscillator.stop();
      }, 2000);
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  };

  return {
    isPlaying,
    volume,
    play,
    pause,
    toggle,
    updateVolume
  };
}
