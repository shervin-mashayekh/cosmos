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
    label: "Planet One",
    title: "Homeland  Core Belief",
    body:
      "Replace this with your real thematic analysis. This planet holds the gravitational centre of the story world  the shared belief that makes everything else make sense.",
    meta: "Planet 1 of 9  Scroll to continue",
    image: planet1,
  },
  {
    id: 2,
    label: "Planet Two",
    title: "Homeland  Defining Conflict",
    body:
      "Here lives the fracture line. This is where the shared belief is tested, bent, or broken  the tensions and double binds that generate drama.",
    meta: "Planet 2 of 9  Scroll to continue",
    image: planet2,
  },
  {
    id: 3,
    label: "Planet Three",
    title: "Homeland  Environmental Context",
    body:
      "This planet describes the weather of the world  the physical, historical, and emotional environment that shapes everyday life.",
    meta: "Planet 3 of 9  Scroll to continue",
    image: planet3,
  },
  {
    id: 4,
    label: "Planet Four",
    title: "Hierarchy  Social Stratification",
    body:
      "This world maps who rises, who falls, and why. It reveals how status, class, and access are distributed in this cosmos.",
    meta: "Planet 4 of 9  Scroll to continue",
    image: planet4,
  },
  {
    id: 5,
    label: "Planet Five",
    title: "Hierarchy  Audience Agency",
    body:
      "This planet explores how much control people feel they have  over themselves, over others, and over the systems that surround them.",
    meta: "Planet 5 of 9  Scroll to continue",
    image: planet5,
  },
  {
    id: 6,
    label: "Planet Six",
    title: "Hierarchy  Brand as Catalyst",
    body:
      "Here we chart the brands gravitational pull: how it disrupts, amplifies, or stabilises the existing order of things.",
    meta: "Planet 6 of 9  Scroll to continue",
    image: planet6,
  },
  {
    id: 7,
    label: "Planet Seven",
    title: "Habitat  Magical Covenant",
    body:
      "This planet holds the rules of the ritual: what counts as power, what it costs, and what binds people to that covenant.",
    meta: "Planet 7 of 9  Scroll to continue",
    image: planet7,
  },
  {
    id: 8,
    label: "Planet Eight",
    title: "Habitat  Social Fabric",
    body:
      "Here we see how people are stitched together: kinship, friendship, alliances, rivalries  and what keeps those threads from tearing.",
    meta: "Planet 8 of 9  Scroll to continue",
    image: planet8,
  },
  {
    id: 9,
    label: "Planet Nine",
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
  const [scrollY, setScrollY] = useState(0);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  // Show keyboard hint on first visit
  useEffect(() => {
    const hasSeenHint = localStorage.getItem('planetJourneyKeyboardHint');
    if (!hasSeenHint) {
      setShowKeyboardHint(true);
      localStorage.setItem('planetJourneyKeyboardHint', 'true');
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowKeyboardHint(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

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

  // Track scroll position inside the main scroll container for parallax
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    let ticking = false;

    const handleScroll = () => {
      const top = root.scrollTop;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(top);
          ticking = false;
        });
        ticking = true;
      }
    };

    root.addEventListener("scroll", handleScroll);
    return () => root.removeEventListener("scroll", handleScroll);
  }, []);

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
  }, []);

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

  const layerOffset = (multiplier: number) =>
    `translate3d(0, ${scrollY * multiplier * 0.05}px, 0)`;

  return (
    <div className="relative h-screen bg-[#000000] text-foreground">
      {/* Dramatic starry space background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Deep space gradient with purple/blue tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#020208] to-[#000000]" />
        
        {/* Galaxy fog effect */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-purple-900/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-blue-900/15 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-[1000px] h-[400px] bg-cyan-900/8 blur-[140px] rounded-full -translate-x-1/2" />
        </div>
        
        {/* Multiple star layers for depth */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => {
            const size = Math.random() * 3 + 0.5;
            const brightness = Math.random();
            return (
              <div
                key={`star-${i}`}
                className="absolute rounded-full transition-none"
                style={{
                  width: size + 'px',
                  height: size + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  backgroundColor: brightness > 0.7 ? '#ffffff' : brightness > 0.4 ? '#e0e7ff' : '#ddd6fe',
                  opacity: Math.random() * 0.6 + 0.4,
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`,
                }}
              />
            );
          })}
        </div>

        {/* Additional nebula-like glow effects */}
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

          return (
            <section
              key={planet.id}
              ref={setSectionRef(index)}
              data-index={index}
              className="relative flex h-screen w-screen snap-start items-center justify-center px-[12vw]"
            >
              <div className="relative z-10 flex max-w-5xl items-center justify-center gap-[4vw]">
                <div className="relative flex-shrink-0">
                  <img
                    src={planet.image}
                    alt={planet.title}
                    className={`w-[min(38vw,480px)] transition-all duration-700 ease-out drop-shadow-[0_0_30px_rgba(0,0,0,0.9)] ${
                      isActive
                        ? "opacity-100 scale-[1.3] translate-y-0 animate-[spin_40s_linear_infinite]"
                        : "opacity-0 scale-[1.1] translate-y-12"
                    }`}
                    style={{ clipPath: 'inset(12% 12% 12% 12%)' }}
                  />
                </div>

                <article className="relative max-w-md space-y-3">
                  <p
                    className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 text-foreground/80"
                        : "opacity-0 translate-y-6 text-foreground/0"
                    }`}
                  >
                    {planet.label}
                  </p>

                  <h2
                    className={`text-xl font-semibold tracking-[0.08em] transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 text-foreground"
                        : "opacity-0 translate-y-8 text-foreground/0"
                    }`}
                  >
                    {planet.title}
                  </h2>

                  <p
                    className={`text-sm leading-relaxed transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 text-foreground/90"
                        : "opacity-0 translate-y-10 text-foreground/0"
                    }`}
                  >
                    {planet.body}
                  </p>

                  <p
                    className={`pt-2 text-[11px] uppercase tracking-[0.14em] transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 text-foreground/70"
                        : "opacity-0 translate-y-8 text-foreground/0"
                    }`}
                  >
                    {planet.meta}
                  </p>
                </article>
              </div>
            </section>
          );
        })}
      </main>

      <div className="pointer-events-none fixed bottom-5 left-1/2 z-20 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-foreground/80 drop-shadow-[0_0_10px_rgba(0,0,0,0.95)]">
        Scroll to travel between worlds  
      </div>

      {/* Keyboard controls hint */}
      {showKeyboardHint && (
        <div 
          className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 animate-fade-in"
          style={{ animationDuration: '0.5s' }}
        >
          <div className="relative bg-background/90 backdrop-blur-sm border border-foreground/20 rounded-lg px-6 py-3 shadow-lg">
            <button
              onClick={() => setShowKeyboardHint(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground/20 hover:bg-foreground/30 transition-colors flex items-center justify-center text-foreground/80 text-xs"
              aria-label="Close hint"
            >
              ×
            </button>
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

      {/* Go to top button - appears after third planet */}
      {activeIndex >= 3 && (
        <button
          onClick={() => {
            sectionRefs.current[0]?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }}
          className="fixed top-8 right-8 z-30 w-12 h-12 rounded-full bg-foreground/10 hover:bg-foreground/20 backdrop-blur-sm border border-foreground/20 transition-all duration-300 flex items-center justify-center group animate-fade-in"
          aria-label="Go to top"
        >
          <svg 
            className="w-5 h-5 text-foreground/80 group-hover:text-foreground transition-colors" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PlanetJourney;
