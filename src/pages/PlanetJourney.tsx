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
    title: "Homeland  Core Belief",
    body:
      "Replace this with your real thematic analysis. This planet holds the gravitational centre of the story world  the shared belief that makes everything else make sense.",
    meta: "Planet 1 of 9",
    image: planet1,
  },
  {
    id: 2,
    label: "Homeland - Defining Conflict",
    title: "Homeland  Defining Conflict",
    body:
      "Here lives the fracture line. This is where the shared belief is tested, bent, or broken  the tensions and double binds that generate drama.",
    meta: "Planet 2 of 9",
    image: planet2,
  },
  {
    id: 3,
    label: "Homeland - Environmental Context",
    title: "Homeland  Environmental Context",
    body:
      "This planet describes the weather of the world  the physical, historical, and emotional environment that shapes everyday life.",
    meta: "Planet 3 of 9",
    image: planet3,
  },
  {
    id: 4,
    label: "Hierarchy - Social Stratification",
    title: "Hierarchy  Social Stratification",
    body:
      "This world maps who rises, who falls, and why. It reveals how status, class, and access are distributed in this cosmos.",
    meta: "Planet 4 of 9",
    image: planet4,
  },
  {
    id: 5,
    label: "Hierarchy - Audience Agency",
    title: "Hierarchy  Audience Agency",
    body:
      "This planet explores how much control people feel they have  over themselves, over others, and over the systems that surround them.",
    meta: "Planet 5 of 9",
    image: planet5,
  },
  {
    id: 6,
    label: "Hierarchy - Brand as Catalyst",
    title: "Hierarchy  Brand as Catalyst",
    body:
      "Here we chart the brands gravitational pull: how it disrupts, amplifies, or stabilises the existing order of things.",
    meta: "Planet 6 of 9",
    image: planet6,
  },
  {
    id: 7,
    label: "Habitat - Magical Covenant",
    title: "Habitat  Magical Covenant",
    body:
      "This planet holds the rules of the ritual: what counts as power, what it costs, and what binds people to that covenant.",
    meta: "Planet 7 of 9",
    image: planet7,
  },
  {
    id: 8,
    label: "Habitat - Social Fabric",
    title: "Habitat  Social Fabric",
    body:
      "Here we see how people are stitched together: kinship, friendship, alliances, rivalries  and what keeps those threads from tearing.",
    meta: "Planet 8 of 9",
    image: planet8,
  },
  {
    id: 9,
    label: "Habitat - Collective Resilience",
    title: "Habitat  Collective Resilience",
    body:
      "The final world asks: what endures? It traces the rituals, stories, and infrastructures that help this cosmos survive disruption.",
    meta: "Planet 9 of 9",
    image: planet9,
  },
];

const PlanetJourney = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState<number[]>(Array(planets.length).fill(0));
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);
  
  // Memoize star positions with depth layers for parallax
  const starLayers = useRef({
    far: [...Array(150)].map(() => ({
      size: Math.random() * 1.5 + 0.5,
      brightness: Math.random() * 0.6 + 0.2,
      top: Math.random() * 100,
      left: Math.random() * 100,
    })),
    mid: [...Array(100)].map(() => ({
      size: Math.random() * 2.5 + 1,
      brightness: Math.random() * 0.7 + 0.3,
      top: Math.random() * 100,
      left: Math.random() * 100,
    })),
    near: [...Array(50)].map(() => ({
      size: Math.random() * 3.5 + 1.5,
      brightness: Math.random() * 0.8 + 0.2,
      top: Math.random() * 100,
      left: Math.random() * 100,
    })),
  }).current;

  // Basic SEO for this landing page
  useEffect(() => {
    document.title = "Thematic Skyfield  Planet Journey";

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

  // Track scroll progress for smooth transitions and global progress
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const handleScroll = () => {
      // Calculate global scroll progress for parallax effects
      const scrollTop = root.scrollTop;
      const scrollHeight = root.scrollHeight - root.clientHeight;
      const globalProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setGlobalScrollProgress(globalProgress);

      const newProgress = sectionRefs.current.map((section) => {
        if (!section) return 0;
        
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;
        
        // Calculate progress with extended range for smoother, longer transitions
        const sectionCenter = rect.top + sectionHeight / 2;
        const viewportCenter = windowHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const maxDistance = windowHeight * 1.2; // Extended range for smooth travel feeling
        
        let progress = 1 - (distance / maxDistance);
        progress = Math.max(0, Math.min(1, progress));
        
        // Apply cubic easing for more natural acceleration/deceleration
        progress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
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
            block: 'center'
          });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        if (prevIndex !== activeIndex && sectionRefs.current[prevIndex]) {
          sectionRefs.current[prevIndex]?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Ensure first planet is centered on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current && sectionRefs.current[0]) {
        scrollRef.current.scrollTop = 0;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  };

  // Calculate dynamic background color based on active planet
  const getBackgroundColor = () => {
    const colors = [
      { h: 280, s: 60, l: 4 },  // Purple tint
      { h: 240, s: 50, l: 4 },  // Blue tint
      { h: 200, s: 55, l: 4 },  // Cyan tint
      { h: 340, s: 45, l: 4 },  // Pink tint
      { h: 280, s: 50, l: 4 },  // Purple-pink
      { h: 260, s: 55, l: 4 },  // Deep purple
      { h: 220, s: 50, l: 4 },  // Blue-purple
      { h: 300, s: 45, l: 4 },  // Magenta
      { h: 270, s: 60, l: 4 },  // Violet
    ];
    
    const current = colors[activeIndex];
    const next = colors[Math.min(activeIndex + 1, colors.length - 1)];
    const progress = scrollProgress[activeIndex] || 0;
    
    // Interpolate between current and next color
    const h = current.h + (next.h - current.h) * (1 - progress);
    const s = current.s + (next.s - current.s) * (1 - progress);
    const l = current.l + (next.l - current.l) * (1 - progress);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  // Calculate warp effect intensity based on scroll velocity
  const scrollVelocity = useRef(0);
  const lastScrollTop = useRef(0);
  
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    
    const calculateVelocity = () => {
      const currentScroll = root.scrollTop;
      scrollVelocity.current = Math.abs(currentScroll - lastScrollTop.current);
      lastScrollTop.current = currentScroll;
    };
    
    const interval = setInterval(calculateVelocity, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative h-screen text-foreground transition-colors duration-1000"
      style={{ backgroundColor: getBackgroundColor() }}
    >
      {/* Parallax starry space background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Dynamic galaxy fog effect that shifts with scroll */}
        <div className="absolute inset-0 opacity-15 transition-transform duration-700">
          <div 
            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-900/20 blur-[120px] rounded-full"
            style={{ transform: `translate(${globalScrollProgress * -100}px, ${globalScrollProgress * 150}px)` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-blue-900/20 blur-[100px] rounded-full"
            style={{ transform: `translate(${globalScrollProgress * 80}px, ${globalScrollProgress * -100}px)` }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-[1000px] h-[400px] bg-cyan-900/15 blur-[140px] rounded-full -translate-x-1/2"
            style={{ transform: `translate(-50%, ${globalScrollProgress * -120}px)` }}
          />
        </div>
        
        {/* Far star layer - slowest parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${globalScrollProgress * 50}px)` }}>
          {starLayers.far.map((star, i) => (
            <div
              key={`star-far-${i}`}
              className="absolute rounded-full"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                top: star.top + '%',
                left: star.left + '%',
                backgroundColor: '#e0e7ff',
                opacity: star.brightness * 0.24,
                boxShadow: `0 0 ${star.size}px rgba(224, 231, 255, ${star.brightness * 0.18})`,
              }}
            />
          ))}
        </div>
        
        {/* Mid star layer - medium parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${globalScrollProgress * 150}px)` }}>
          {starLayers.mid.map((star, i) => (
            <div
              key={`star-mid-${i}`}
              className="absolute rounded-full"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                top: star.top + '%',
                left: star.left + '%',
                backgroundColor: star.brightness > 0.6 ? '#ffffff' : '#e0e7ff',
                opacity: star.brightness * 0.36,
                boxShadow: `0 0 ${star.size * 1.5}px rgba(255, 255, 255, ${star.brightness * 0.24})`,
              }}
            />
          ))}
        </div>
        
        {/* Near star layer - fastest parallax */}
        <div className="absolute inset-0" style={{ transform: `translateY(${globalScrollProgress * 300}px)` }}>
          {starLayers.near.map((star, i) => (
            <div
              key={`star-near-${i}`}
              className="absolute rounded-full"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                top: star.top + '%',
                left: star.left + '%',
                backgroundColor: '#ffffff',
                opacity: star.brightness * 0.42 + 0.18,
                boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.36})`,
              }}
            />
          ))}
        </div>

        {/* Warp streak effect during fast scrolling */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, ${Math.min(scrollVelocity.current / 100, 0.05)}) 10px,
              rgba(255, 255, 255, ${Math.min(scrollVelocity.current / 100, 0.05)}) 11px
            )`,
            opacity: Math.min(scrollVelocity.current / 50, 0.3),
          }}
        />
      </div>

      <main
        ref={scrollRef}
        className="h-screen overflow-y-scroll scroll-smooth"
        style={{ scrollPaddingTop: '50vh' }}
        aria-label="Thematic Skyfield planet journey"
      >
        <div className="sr-only">
          <h1>Thematic Skyfield  Planet Journey</h1>
        </div>

        {planets.map((planet, index) => {
          const isActive = index === activeIndex;
          const progress = scrollProgress[index] || 0;
          
          // More dramatic interpolation for space travel feel
          const scale = 0.3 + progress * 1.06; // 0.3 to 1.36 - planets start tiny and far away (20% smaller final size)
          const translateX = -30 + progress * 30; // -30% to 0% - more horizontal travel
          const translateZ = (1 - progress) * 200; // Simulate depth
          const rotate = -30 + progress * 30; // -30deg to 0deg
          const opacity = progress > 0.1 ? Math.pow(progress, 0.7) : 0; // Fade in/out more dramatically
          const blur = Math.max(0, 12 * (1 - progress)); // 12px to 0px - stronger blur effect
          
          // Enhanced trail effects for motion blur
          const trail1Scale = 0.4 + progress * 0.3;
          const trail1TranslateX = -40 + progress * 20;
          const trail1Rotate = -35 + progress * 15;
          const trail1Opacity = Math.max(0, 0.25 * (1 - progress) * progress);
          
          const trail2Scale = 0.5 + progress * 0.4;
          const trail2TranslateX = -30 + progress * 15;
          const trail2Rotate = -25 + progress * 12;
          const trail2Opacity = Math.max(0, 0.3 * (1 - progress) * progress);

          return (
            <section
              key={planet.id}
              ref={setSectionRef(index)}
              data-index={index}
              className={`relative flex w-screen items-center justify-center px-[12vw] ${index === 0 ? 'h-screen' : 'h-[150vh]'}`}
              style={{ 
                minHeight: index === 0 ? '100vh' : '150vh',
              }}
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
                  {(() => {
                    // Calculate text-specific progress (triggered when planet lands at ~85% scroll)
                    const textProgress = progress > 0.85 ? Math.pow((progress - 0.85) / 0.15, 1.5) : 0;
                    
                    return (
                      <>
                        <p
                          className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/80"
                          style={{
                            opacity: textProgress,
                            transform: `translateY(${(1 - textProgress) * 40}px)`,
                            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          {planet.label}
                        </p>

                        <h2
                          className="text-xl font-semibold tracking-[0.08em] text-foreground"
                          style={{
                            opacity: textProgress,
                            transform: `translateY(${(1 - textProgress) * 40}px)`,
                            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                          }}
                        >
                          {planet.title}
                        </h2>

                        <p
                          className="text-sm leading-relaxed text-foreground/90"
                          style={{
                            opacity: textProgress,
                            transform: `translateY(${(1 - textProgress) * 40}px)`,
                            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                          }}
                        >
                          {planet.body}
                        </p>

                        <p
                          className="pt-2 text-[11px] uppercase tracking-[0.14em] text-foreground/70"
                          style={{
                            opacity: textProgress * 0.9,
                            transform: `translateY(${(1 - textProgress) * 40}px)`,
                            transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                          }}
                        >
                          {planet.meta}
                        </p>
                      </>
                    );
                  })()}
                </article>
              </div>
            </section>
          );
        })}
      </main>

      {/* Keyboard controls hint and scroll message */}
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

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 w-full text-center text-[11px] uppercase tracking-[0.16em] text-foreground/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.95)] animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        Scroll to travel between worlds
      </div>


      {/* Vertical planet progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        {planets.map((planet, index) => (
          <button
            key={planet.id}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
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
