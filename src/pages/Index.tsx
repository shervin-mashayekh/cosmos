import { Navigation } from "@/components/Navigation";
import { Scene3D } from "@/components/Scene3D";
import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";
const Index = () => {
  return <div className="relative min-h-screen bg-background overflow-hidden">
      <GridBackground />
      <Navigation />
      
      <main className="relative min-h-screen flex items-center justify-center">
        {/* 3D Scene - Full screen centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-[800px]">
            <Scene3D />
          </div>
        </div>

        {/* Blurred overlay covering left half */}
        <div className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-xl bg-background/30 z-10" />

        {/* Content over the overlay */}
        <div className="relative z-20 container mx-auto px-6 py-20">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Engineer Your Brand Cosmos
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Transform insights into cosmic strategy
              </p>
            </div>

            <Button size="lg" className="text-lg px-8 py-6">
              Cosmos Development
            </Button>
          </div>
        </div>
      </main>
    </div>;
};
export default Index;