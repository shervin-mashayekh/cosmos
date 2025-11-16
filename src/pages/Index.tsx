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
  
  // Initialize state for each question with empty reply arrays
  const [homelandReplies, setHomelandReplies] = useState<string[][]>(
    Array(15).fill(null).map(() => [""])
  );
  const [hierarchyReplies, setHierarchyReplies] = useState<string[][]>(
    Array(9).fill(null).map(() => [""])
  );
  const [habitatReplies, setHabitatReplies] = useState<string[][]>(
    Array(13).fill(null).map(() => [""])
  );

  const handleSubmitConflict = () => {
    setSubmittedConflict(conflict);
  };

  const addReply = (section: 'homeland' | 'hierarchy' | 'habitat', questionIndex: number) => {
    if (section === 'homeland') {
      const updated = [...homelandReplies];
      updated[questionIndex] = [...updated[questionIndex], ""];
      setHomelandReplies(updated);
    }
    if (section === 'hierarchy') {
      const updated = [...hierarchyReplies];
      updated[questionIndex] = [...updated[questionIndex], ""];
      setHierarchyReplies(updated);
    }
    if (section === 'habitat') {
      const updated = [...habitatReplies];
      updated[questionIndex] = [...updated[questionIndex], ""];
      setHabitatReplies(updated);
    }
  };

  const removeReply = (section: 'homeland' | 'hierarchy' | 'habitat', questionIndex: number, replyIndex: number) => {
    if (section === 'homeland') {
      const updated = [...homelandReplies];
      updated[questionIndex] = updated[questionIndex].filter((_, i) => i !== replyIndex);
      setHomelandReplies(updated);
    }
    if (section === 'hierarchy') {
      const updated = [...hierarchyReplies];
      updated[questionIndex] = updated[questionIndex].filter((_, i) => i !== replyIndex);
      setHierarchyReplies(updated);
    }
    if (section === 'habitat') {
      const updated = [...habitatReplies];
      updated[questionIndex] = updated[questionIndex].filter((_, i) => i !== replyIndex);
      setHabitatReplies(updated);
    }
  };

  const updateReply = (section: 'homeland' | 'hierarchy' | 'habitat', questionIndex: number, replyIndex: number, value: string) => {
    if (section === 'homeland') {
      const updated = [...homelandReplies];
      updated[questionIndex][replyIndex] = value;
      setHomelandReplies(updated);
    }
    if (section === 'hierarchy') {
      const updated = [...hierarchyReplies];
      updated[questionIndex][replyIndex] = value;
      setHierarchyReplies(updated);
    }
    if (section === 'habitat') {
      const updated = [...habitatReplies];
      updated[questionIndex][replyIndex] = value;
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
          <h2 className="text-4xl font-bold text-center mb-6">
            Understand The Core Concepts
          </h2>
          <p className="text-center text-muted-foreground max-w-4xl mx-auto mb-16 text-lg leading-relaxed">
            Before answering questions to build your cosmos and developing a universe, read these definitions. It is important for you to understand these terminologies since they might seem familiar but they have a different meaning in this context. These words will be used in questions and understanding them would help you to better answer questions and to have a more detailed cosmos.
          </p>
          
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
            <div className="grid grid-cols-1 lg:grid-cols-[9fr_1fr] gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Add The Conflict</h3>
                  <p className="text-muted-foreground mb-4">
                    Define the core conflict of your brand cosmos. What is the central struggle or tension?
                  </p>
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
                <div className="space-y-6">
                  {[
                    "What does your brand stand for? What is it that you want to achieve that is aligned with your audience's wants and values?",
                    "Who is the antagonist? (Think about norms, beliefs, cultural or political stances you want to change)",
                    "What are the antagonist's agendas? What do they see as good and evil?",
                    "What is it that you want to change in the outside world?",
                    "Why do conflicts persist or change in this world?",
                    "What poses the greatest threat in this world? (This is something that has been part of everyone's life, it is easy to follow).",
                    "What are the natural resources? Which ones are scarce?",
                    "When were the key turning points in this world's history?",
                    "Why would someone study this world's history, what would it teach them?",
                    "What important inventions or advances have been made?",
                    "How does this fight affect your audience? (If the status quo stays the same)",
                    "What is the status quo your brand is challenging? (Common beliefs/ norms)",
                    "What do people vote for by buying your product?/ What are they buying into? (Community? Value?)",
                    "What is the risk of doing nothing for the future generation and the whole world (nature)? What if, the antagonist wins?",
                    "What is the antagonist's magical power?"
                  ].map((question, qIndex) => (
                    <div key={qIndex} className="space-y-2">
                      <label className="text-sm font-medium block">{question}</label>
                      {homelandReplies[qIndex]?.map((reply, rIndex) => (
                        <div key={rIndex} className="space-y-2">
                          <Textarea
                            placeholder="Your answer..."
                            className="min-h-[100px] bg-background/50"
                            value={reply}
                            onChange={(e) => updateReply('homeland', qIndex, rIndex, e.target.value)}
                          />
                          {rIndex > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeReply('homeland', qIndex, rIndex)}
                              className="text-destructive"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addReply('homeland', qIndex)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Plus className="w-3 h-3" />
                        Add Another Reply
                      </button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Hierarchy */}
            <AccordionItem value="hierarchy" className="bg-card/50 backdrop-blur border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                Hierarchy
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-6">
                  {[
                    "List of all touch points- How much power do people have to personalize/alter/create within specific touch points? (Addressing the power/ passing the mic)",
                    "How many levels are there in this society? What are they based on?",
                    "How can people be part of this society (citizenship rules) and how do they get deported? What are rights and privileges?(Addressing the level and ease of access)",
                    "If someone at the top changes, how might your audience relations change to the brand?",
                    "What are the tools, spaces, and expertise you provide to support them?",
                    "What can be a source of inequality? How is stratification created?",
                    "How do people move between different classes? How difficult is it to rise or fall from one social level to another? How much social mobility is there? How much do people think there is?",
                    "How would the world be different if they achieve their goals?",
                    "What do they stand to lose?"
                  ].map((question, qIndex) => (
                    <div key={qIndex} className="space-y-2">
                      <label className="text-sm font-medium block">{question}</label>
                      {hierarchyReplies[qIndex]?.map((reply, rIndex) => (
                        <div key={rIndex} className="space-y-2">
                          <Textarea
                            placeholder="Your answer..."
                            className="min-h-[100px] bg-background/50"
                            value={reply}
                            onChange={(e) => updateReply('hierarchy', qIndex, rIndex, e.target.value)}
                          />
                          {rIndex > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeReply('hierarchy', qIndex, rIndex)}
                              className="text-destructive"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addReply('hierarchy', qIndex)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Plus className="w-3 h-3" />
                        Add Another Reply
                      </button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Habitat */}
            <AccordionItem value="habitat" className="bg-card/50 backdrop-blur border border-border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-bold hover:no-underline">
                Habitat
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-6">
                  {[
                    "What would they do if they feel defeated? How do they cope? What motivates them to continue?",
                    "How do you unite your community to fight against the antagonists?",
                    "What are the educational resources you provide for the audience about your value/stand?",
                    "How do you ensure that people from the other side do not infiltrate the community? How do you ensure your audience's safety?",
                    "What kind of magical power do your audience get?",
                    "Who can and who is allowed to use magic? Is magic inherited, gifted, obtained or learned?",
                    "Are there any hierarchies regarding the use/practice of magic?",
                    "How can the audience practice magic? Is it collective or individual? Do you have rituals or events to make it more collective?",
                    "What are the magical objects the audience and customers would get? (Think objects)",
                    "How do you create a platform to ensure your audience feels useful and valued (others can depend on them)? How do you ensure the communication between them happens?",
                    "What are the areas of conflict within the society and among the audience? How would they react in these instances?",
                    "What are the social norms and rituals they practice?",
                    "What are the shared language/words/objects they have that tie the audience together?"
                  ].map((question, qIndex) => (
                    <div key={qIndex} className="space-y-2">
                      <label className="text-sm font-medium block">{question}</label>
                      {habitatReplies[qIndex]?.map((reply, rIndex) => (
                        <div key={rIndex} className="space-y-2">
                          <Textarea
                            placeholder="Your answer..."
                            className="min-h-[100px] bg-background/50"
                            value={reply}
                            onChange={(e) => updateReply('habitat', qIndex, rIndex, e.target.value)}
                          />
                          {rIndex > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeReply('habitat', qIndex, rIndex)}
                              className="text-destructive"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addReply('habitat', qIndex)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <Plus className="w-3 h-3" />
                        Add Another Reply
                      </button>
                    </div>
                  ))}
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