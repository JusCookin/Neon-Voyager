import { useEffect, useRef } from 'react';

interface VantaBackgroundProps {
  children: React.ReactNode;
  effect?: 'net' | 'galaxy' | 'waves';
}

export default function VantaBackground({ children, effect = 'net' }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    // For now, we'll create a CSS-based particle effect
    // In a real implementation, this would load and initialize Vanta.js
    if (vantaRef.current && !vantaEffect.current) {
      createCSSParticleEffect();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current = null;
      }
    };
  }, [effect]);

  const createCSSParticleEffect = () => {
    if (!vantaRef.current) return;

    // Create animated particles using CSS
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-particles';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      
      // Add some pink and purple particles
      if (i % 3 === 0) particle.classList.replace('bg-cyan-400', 'bg-pink-400');
      if (i % 5 === 0) particle.classList.replace('bg-cyan-400', 'bg-purple-400');
      
      vantaRef.current.appendChild(particle);
    }

    // Create connecting lines effect
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 w-full h-full opacity-20';
    vantaRef.current.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = vantaRef.current.offsetWidth;
      canvas.height = vantaRef.current.offsetHeight;
      
      // Simple animated line effect
      let animationId: number;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 1;
        
        const time = Date.now() * 0.001;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(
            Math.sin(time + i) * 200 + canvas.width / 2,
            Math.cos(time + i * 0.7) * 100 + canvas.height / 2
          );
          ctx.lineTo(
            Math.sin(time + i + 1) * 200 + canvas.width / 2,
            Math.cos(time + (i + 1) * 0.7) * 100 + canvas.height / 2
          );
          ctx.stroke();
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animate();
      
      // Store cleanup function
      vantaEffect.current = () => {
        cancelAnimationFrame(animationId);
      };
    }
  };

  return (
    <div ref={vantaRef} className="relative overflow-hidden">
      {children}
    </div>
  );
}
