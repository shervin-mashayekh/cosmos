import { useEffect, useState } from "react";

export const GridBackground = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const fadeStart = heroHeight * 0.6;
      const fadeEnd = heroHeight;
      
      if (scrollPosition <= fadeStart) {
        setOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 overflow-hidden pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Vertical lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--grid-color)) 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }} />
      
      {/* Horizontal lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to bottom, hsl(var(--grid-color)) 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }} />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background" />
    </div>
  );
};
