import { Navigation } from "@/components/Navigation";
import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <GridBackground />
      <Navigation />
      
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 animate-fade-in text-center">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  An online brand guidelines platform
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  for branding teams
                </p>
              </div>

              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Your brand estate—sorted
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  Try now
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                  Book a Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-8 justify-center">
                <span className="text-sm text-muted-foreground">Choice of</span>
                <div className="flex gap-4 opacity-60">
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                  <div className="h-8 w-20 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

export default Index;
