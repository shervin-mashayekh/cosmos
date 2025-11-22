import { useEffect, useRef, useState } from "react";
import planet1 from "@/assets/planet-1.png";
import planet2 from "@/assets/planet-2.png";
import planet3 from "@/assets/planet-3.png";
import planet4 from "@/assets/planet-4.png";
import planet5 from "@/assets/planet-5.png";
import planet6 from "@/assets/planet-6.png";
import planet7 from "@/assets/planet-7.png";
import planet8 from "@/assets/planet-8.png";
import planet9 from "@/assets/planet-9.png";

interface Planet {
  id: number;
  label: string;
  title: string;
  body: string;
  meta: string;
  image: string;
}

const planets: Planet[] = [
  {
    id: 1,
    label: "Homeland - Core Belief",
    title: "Homeland  Core Belief",
    body:
      "Replace this with your real thematic analysis. This planet holds the gravitational centre of the story world  the shared belief that makes everything else make sense.",
    meta: "Planet 1 of 9  Scroll to continue",
    image: planet1,
  },
  {
    id: 2,
    label: "Homeland - Defining Conflict",
    title: "Homeland  Defining Conflict",
    body:
      "Here lives the fracture line. This is where the shared belief is tested, bent, or broken  the tensions and double binds that generate drama.",
    meta: "Planet 2 of 9  Scroll to continue",
    image: planet2,
  },
  {
    id: 3,
    label: "Homeland - Environmental Context",
    title: "Homeland  Environmental Context",
    body:
      "This planet describes the weather of the world  the physical, historical, and emotional environment that shapes everyday life.",
    meta: "Planet 3 of 9  Scroll to continue",
    image: planet3,
  },
  {
    id: 4,
    label: "Hierarchy - Social Stratification",
    title: "Hierarchy  Social Stratification",
    body:
      "This world maps who rises, who falls, and why. It reveals how status, class, and access are distributed in this cosmos.",
    meta: "Planet 4 of 9  Scroll to continue",
    image: planet4,
  },
  {
    id: 5,
    label: "Hierarchy - Audience Agency",
    title: "Hierarchy  Audience Agency",
    body:
      "This planet explores how much control people feel they have  over themselves, over others, and over the systems that surround them.",
    meta: "Planet 5 of 9  Scroll to continue",
    image: planet5,
  },
  {
    id: 6,
    label: "Hierarchy - Brand as Catalyst",
    title: "Hierarchy  Brand as Catalyst",
    body:
      "Here we chart the brands gravitational pull: how it disrupts, amplifies, or stabilises the existing order of things.",
    meta: "Planet 6 of 9  Scroll to continue",
    image: planet6,
  },
  {
    id: 7,
    label: "Habitat - Magical Covenant",
    title: "Habitat  Magical Covenant",
    body:
      "This planet holds the rules of the ritual: what counts as power, what it costs, and what binds people to that covenant.",
    meta: "Planet 7 of 9  Scroll to continue",
    image: planet7,
  },
  {
    id: 8,
    label: "Habitat - Social Fabric",
    title: "Habitat  Social Fabric",
    body:
      "Here we see how people are stitched together: kinship, friendship, alliances, rivalries  and what keeps those threads from tearing.",
    meta: "Planet 8 of 9  Scroll to continue",
    image: planet8,
  },
  {
    id: 9,
    label: "Habitat - Collective Resilience",
    title: "Habitat  Collective Resilience",
    body:
      "The final world asks: what endures? It traces the rituals, stories, and infrastructures that help this cosmos survive disruption.",
    meta: "Planet 9 of 9  Scroll to traverse back up",
    image: planet9,
  },
];

const PlanetJourney = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState<number[]>(Array(planets.length).fill(0));
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Basic SEO for this landing page
  useEffect(() => {
    document.title = "Thematic Skyfield  Planet Journey";

    const description =
      "Scroll through nine thematic planets that map the narrative cosmos of your brand.";

    let meta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  // Smooth mouse wheel scrolling
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (isScrollingRef.current) return;
      
      const delta = e.deltaY;
      const threshold = 50; // Minimum scroll amount to trigger
      
      if (Math.abs(delta) > threshold) {
        isScrollingRef.current = true;
        
        const direction = delta > 0 ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(activeIndex + direction, planets.length - 1));
        
        if (nextIndex !== activeIndex && sectionRefs.current[nextIndex]) {
          sectionRefs.current[nextIndex]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        
        // Reset scrolling flag after animation
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    root.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      root.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeIndex]);

  // Track scroll progress for smooth transitions
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const handleScroll = () => {
      const newProgress = sectionRefs.current.map((section) => {
        if (!section) return 0;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calculate progress: 0 when entering viewport, 1 when centered, 0 when leaving
        const sectionCenter = rect.top + sectionHeight / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = windowHeight / 2 + sectionHeight / 2;
        
        let progress = 1 - (distance / maxDistance);
        progress = Math.max(0, Math.min(1, progress));
        
        // Apply easing for smoother transitions
        progress = progress * progress * (3 - 2 * progress); // smoothstep
        
        return progress;
      });
      
      setScrollProgress(newProgress);
    };

    root.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => root.removeEventListener('scroll', handleScroll);
  }, []);

  // Track previous index for transition direction
  useEffect(() => {
    setPrevActiveIndex(activeIndex);
  }, [activeIndex]);

  // Observe sections to trigger active animations similar to the original HTML
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const indexAttr = (entry.target as HTMLElement).dataset.index;
            const index = indexAttr ? parseInt(indexAttr, 10) : 0;
            setPrevActiveIndex(activeIndex);
            setActiveIndex(index);
          }
        });
      },
      {
        root,
        threshold: 0.55,
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = Math.min(activeIndex + 1, planets.length - 1);
        if (nextIndex !== activeIndex && sectionRefs.current[nextIndex]) {
          sectionRefs.current[nextIndex]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        if (prevIndex !== activeIndex && sectionRefs.current[prevIndex]) {
          sectionRefs.current[prevIndex]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="relative h-screen bg-[#000000] text-foreground">
      {/* Static starry space background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Deep space gradient with purple/blue tones - completely static */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#020208] to-[#000000]" />
        
        {/* Static galaxy fog effect */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-900/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-blue-900/15 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[400px] bg-cyan-900/8 blur-[140px] rounded-full -translate-x-1/2" />
        </div>
        
        {/* Static star field - no movement */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => {
            const size = Math.random() * 3 + 0.5;
            const brightness = Math.random();
            return (
              <div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  backgroundColor: brightness > 0.7 ? '#ffffff' : brightness > 0.4 ? '#e0e7ff' : '#ddd6fe',
                  opacity: Math.random() * 0.6 + 0.4,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
                  transform: 'none',
                }}
              />
            );
          })}
        </div>

        {/* Static nebula glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(138,43,226,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,100,255,0.06),transparent_50%)]" />
      </div>

      <main
        ref={scrollRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        aria-label="Thematic Skyfield planet journey"
      >
        <div className="sr-only">
          <h1>Thematic Skyfield  Planet Journey</h1>
        </div>

        {planets.map((planet, index) => {
          const isActive = index === activeIndex;
          const progress = scrollProgress[index] || 0;
          
          // Interpolate values based on scroll progress
          // Starting point: 30% from left, small scale
          // Ending point: centered (0%), 20% smaller final size (1.44 instead of 1.8)
          const scale = 0.8 + progress * 0.64; // 0.8 to 1.44 (20% smaller than 1.8)
          const translateX = -30 + progress * 30; // -30% to 0%
          const rotate = -20 + progress * 20; // -20deg to 0deg
          const opacity = Math.max(0.3, progress); // Always somewhat visible
          const blur = 6 - progress * 6; // 6px to 0px
          
          // Trail effects - more subtle
          const trail1Scale = 0.6 + progress * 0.2;
          const trail1TranslateX = -50 + progress * 20;
          const trail1Rotate = -25 + progress * 10;
          const trail1Opacity = 0.15 * (1 - progress);
          
          const trail2Scale = 0.7 + progress * 0.2;
          const trail2TranslateX = -40 + progress * 15;
          const trail2Rotate = -15 + progress * 5;
          const trail2Opacity = 0.2 * (1 - progress);

          return (
            <section
              key={planet.id}
              ref={setSectionRef(index)}
              data-index={index}
              className="relative flex h-screen w-screen snap-start items-center justify-center px-[12vw]"
            >
              <div className="relative z-10 flex max-w-5xl items-center justify-center gap-[4vw] animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="relative flex-shrink-0">
                  {/* Motion trail effect - scroll-driven */}
                  <img
                    src={planet.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-[min(38vw,480px)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] origin-center transition-none"
                    style={{ 
                      clipPath: 'inset(12% 12% 12% 12%)',
                      transform: `translateX(${trail2TranslateX}%) rotate(${trail2Rotate}deg) scale(${trail2Scale})`,
                      opacity: trail2Opacity,
                      filter: 'blur(2px)'
                    }}
                  />
                  <img
                    src={planet.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-[min(38vw,480px)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] origin-center transition-none"
                    style={{ 
                      clipPath: 'inset(12% 12% 12% 12%)',
                      transform: `translateX(${trail1TranslateX}%) rotate(${trail1Rotate}deg) scale(${trail1Scale})`,
                      opacity: trail1Opacity,
                      filter: 'blur(4px)'
                    }}
                  />
                  
                  {/* Main planet - scroll-driven animation */}
                  <img
                    src={planet.image}
                    alt={planet.title}
                    className="relative w-[min(38vw,480px)] drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] origin-center transition-none"
                    style={{ 
                      clipPath: 'inset(12% 12% 12% 12%)',
                      transform: `translateX(${translateX}%) rotate(${rotate}deg) scale(${scale})`,
                      opacity: opacity,
                      filter: `blur(${blur}px)`
                    }}
                  />
                </div>

                <article className="relative max-w-md space-y-3">
                  <p
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80 transition-none"
                    style={{
                      opacity: Math.max(0.2, progress * 0.8),
                      transform: `translateY(${(1 - progress) * 20}px)`
                    }}
                  >
                    {planet.label}
                  </p>

                  <h2
                    className="text-xl font-semibold tracking-[0.08em] text-foreground transition-none"
                    style={{
                      opacity: Math.max(0.3, progress),
                      transform: `translateY(${(1 - progress) * 24}px)`
                    }}
                  >
                    {planet.title}
                  </h2>

                  <p
                    className="text-sm leading-relaxed text-foreground/90 transition-none"
                    style={{
                      opacity: Math.max(0.2, progress * 0.9),
                      transform: `translateY(${(1 - progress) * 28}px)`
                    }}
                  >
                    {planet.body}
                  </p>

                  <p
                    className="pt-2 text-[11px] uppercase tracking-[0.14em] text-foreground/70 transition-none"
                    style={{
                      opacity: Math.max(0.2, progress * 0.7),
                      transform: `translateY(${(1 - progress) * 20}px)`
                    }}
                  >
                    {planet.meta}
                  </p>
                </article>
              </div>
            </section>
          );
        })}
      </main>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-foreground/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.95)] animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        Scroll to travel between worlds  
      </div>

      {/* Keyboard controls hint - shows only on first slide */}
      {activeIndex === 0 && (
        <div 
          className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 animate-fade-in"
          style={{ animationDelay: '1s', animationFillMode: 'both' }}
        >
          <div className="relative bg-background/90 backdrop-blur-sm border border-foreground/20 rounded-lg px-6 py-3 shadow-lg">
            <div className="flex items-center gap-3 text-foreground/90">
              <div className="flex gap-1.5">
                <kbd className="px-2 py-1 bg-foreground/10 border border-foreground/20 rounded text-[10px] font-mono">↑</kbd>
                <kbd className="px-2 py-1 bg-foreground/10 border border-foreground/20 rounded text-[10px] font-mono">↓</kbd>
              </div>
              <span className="text-xs tracking-wider">Use arrow keys to navigate</span>
            </div>
          </div>
        </div>
      )}


      {/* Vertical planet progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        {planets.map((planet, index) => (
          <button
            key={planet.id}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className={`group relative transition-all duration-300 ${
              index === activeIndex ? 'scale-125' : 'scale-100 hover:scale-110'
            }`}
            aria-label={`Go to ${planet.label}`}
          >
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-foreground border-foreground shadow-[0_0_12px_rgba(255,255,255,0.6)]' 
                  : 'bg-transparent border-foreground/30 hover:border-foreground/60'
              }`}
            />
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div className="bg-background/90 backdrop-blur-sm border border-foreground/20 rounded px-3 py-1.5 text-xs text-foreground/90">
                {planet.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanetJourney;
