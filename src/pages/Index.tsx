import { Navigation } from "@/components/Navigation";
import { Scene3D } from "@/components/Scene3D";
import { GridBackground } from "@/components/GridBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { Plus, X } from "lucide-react";

const Index = () => {
  const [conflict, setConflict] = useState("");
  const [submittedConflict, setSubmittedConflict] = useState("");
  const [homelandReplies, setHomelandReplies] = useState([""]);
  const [hierarchyReplies, setHierarchyReplies] = useState([""]);
  const [habitatReplies, setHabitatReplies] = useState([""]);

  const handleSubmitConflict = () => {
    setSubmittedConflict(conflict);
  };

  const addReply = (section: 'homeland' | 'hierarchy' | 'habitat') => {
    if (section === 'homeland') setHomelandReplies([...homelandReplies, ""]);
    if (section === 'hierarchy') setHierarchyReplies([...hierarchyReplies, ""]);
    if (section === 'habitat') setHabitatReplies([...habitatReplies, ""]);
  };

  const removeReply = (section: 'homeland' | 'hierarchy' | 'habitat', index: number) => {
    if (section === 'homeland') setHomelandReplies(homelandReplies.filter((_, i) => i !== index));
    if (section === 'hierarchy') setHierarchyReplies(hierarchyReplies.filter((_, i) => i !== index));
    if (section === 'habitat') setHabitatReplies(habitatReplies.filter((_, i) => i !== index));
  };

  const updateReply = (section: 'homeland' | 'hierarchy' | 'habitat', index: number, value: string) => {
    if (section === 'homeland') {
      const updated = [...homelandReplies];
      updated[index] = value;
      setHomelandReplies(updated);
    }
    if (section === 'hierarchy') {
      const updated = [...hierarchyReplies];
      updated[index] = value;
      setHierarchyReplies(updated);
    }
    if (section === 'habitat') {
      const updated = [...habitatReplies];
      updated[index] = value;
      setHabitatReplies(updated);
    }
  };

  return <div className="relative bg-background overflow-hidden">
      <GridBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-[800px]">
            <Scene3D />
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-1/2 backdrop-blur-xl bg-background/30 z-10" />

        <div className="relative z-20 container mx-auto px-6 py-20">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-[3.2rem] font-bold leading-tight">
                Engineer Your<br />Brand Cosmos
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground">
                Transform insights into cosmic strategy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understand The Core Concepts Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            Understand The Core Concepts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
              <h3 className="text-xl font-bold mb-3">Protagonist</h3>
              <p className="text-muted-foreground">
                The central figure driving the narrative forward. Define their motivations, strengths, and journey through your cosmos.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
              <h3 className="text-xl font-bold mb-3">Antagonist</h3>
              <p className="text-muted-foreground">
                The opposing force creating tension and conflict. Essential for driving meaningful change and growth.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
              <h3 className="text-xl font-bold mb-3">Magic</h3>
              <p className="text-muted-foreground">
                The unique elements that make your cosmos special. What rules govern your world and make it distinct?
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all">
              <h3 className="text-xl font-bold mb-3">Society</h3>
              <p className="text-muted-foreground">
                The cultural fabric and social structures. How do communities interact and organize within your cosmos?
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all lg:col-span-2">
              <h3 className="text-xl font-bold mb-3">Value Definition</h3>
              <p className="text-muted-foreground">
                The core principles and beliefs that drive behavior. What matters most in your cosmos and why?
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Start Building Your Cosmos Section */}
      <section className="relative py-20 px-6 bg-background/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            Start Building Your Cosmos
          </h2>

          {/* Add The Conflict */}
          <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Add The Conflict</h3>
                  <Textarea
                    placeholder="Describe the central conflict of your cosmos..."
                    className="min-h-[120px] bg-background/50"
                    value={conflict}
                    onChange={(e) => setConflict(e.target.value)}
                  />
                  <Button 
                    className="mt-4 w-full"
                    onClick={handleSubmitConflict}
                  >
                    Submit
                  </Button>
                </div>

                {submittedConflict && (
                  <Card className="p-4 bg-background/50 border-primary/30">
                    <h4 className="font-semibold mb-2">Your Conflict:</h4>
                    <p className="text-muted-foreground">{submittedConflict}</p>
                  </Card>
                )}
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-48 h-48 relative">
                  <Scene3D />
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  How to define the conflict
                </p>
              </div>
            </div>
          </Card>

          {/* Accordion Section */}
          <Accordion type="single" collapsible className="space-y-4">
            {/* Homeland */}
            <AccordionItem value="homeland" className="bg-card/50 backdrop-blur border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                Homeland
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Where do they live? (brief high-level description)</label>
                  {homelandReplies.map((reply, index) => (
                    <div key={index} className="space-y-2">
                      <Textarea
                        placeholder="Describe the homeland..."
                        className="min-h-[100px] bg-background/50"
                        value={reply}
                        onChange={(e) => updateReply('homeland', index, e.target.value)}
                      />
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReply('homeland', index)}
                          className="text-destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addReply('homeland')}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Reply
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Hierarchy */}
            <AccordionItem value="hierarchy" className="bg-card/50 backdrop-blur border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                Hierarchy
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What is the social structure?</label>
                  {hierarchyReplies.map((reply, index) => (
                    <div key={index} className="space-y-2">
                      <Textarea
                        placeholder="Describe the hierarchy..."
                        className="min-h-[100px] bg-background/50"
                        value={reply}
                        onChange={(e) => updateReply('hierarchy', index, e.target.value)}
                      />
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReply('hierarchy', index)}
                          className="text-destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addReply('hierarchy')}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Reply
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Habitat */}
            <AccordionItem value="habitat" className="bg-card/50 backdrop-blur border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                Habitat
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">What is the environment like?</label>
                  {habitatReplies.map((reply, index) => (
                    <div key={index} className="space-y-2">
                      <Textarea
                        placeholder="Describe the habitat..."
                        className="min-h-[100px] bg-background/50"
                        value={reply}
                        onChange={(e) => updateReply('habitat', index, e.target.value)}
                      />
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeReply('habitat', index)}
                          className="text-destructive"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addReply('habitat')}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Reply
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Final CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="text-lg px-12 py-6">
              Generate Thematic Analysis
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default Index;