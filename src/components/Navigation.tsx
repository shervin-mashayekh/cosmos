import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
            <span className="text-xl font-bold text-foreground">Cosmos</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#cosmos-development" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cosmos Development
            </a>
            <a href="#story" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Story
            </a>
            <Link 
              to="/contact" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
