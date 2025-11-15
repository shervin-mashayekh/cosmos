import { Navigation } from "@/components/Navigation";
import { Scene3D } from "@/components/Scene3D";
import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <GridBackground />
      <Navigation />
      
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Engineer Your Brand Cosmos
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground">
                  for branding teams
                </p>
              </div>

              <p className="text-lg text-muted-foreground max-w-lg">
                Your brand estate—sorted
              </p>
            </div>

            {/* Right content - 3D Scene */}
            <div className="relative h-[600px] lg:h-[700px]">
              <Scene3D />
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
