import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, conflict } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing cosmos with AI...');

    const seedWords = `
- Protagonist: A collective hero comprised of the brand and its audience, unified in their commitment to a core moral value and their fight against a defined 'darkness' or antagonist.
- Antagonist: Not a specific person or competitor, but the opposing ideology, societal norm, or abstract concept that the protagonist is morally committed to fighting against. The conflict is a battle between two worldviews (e.g., Creativity vs. Conformity).
- Magic: The specific, real-world 'how' or methodology the protagonist uses to combat the antagonist. It is not supernatural, but the unique tool, skill, or process that empowers them (e.g., for a brand promoting critical thinking, the 'magic' could be 'learning').
- Society: Refers specifically to the self-contained universe or 'brand world' being created, with its own distinct history, rules, norms, and conflicts, separate from society at large.
- Value: Refers exclusively to the core moral, ethical, and philosophical principles the protagonist stands for. It is the moral currency of the brand world that the audience aligns with for personal identity and social signaling, not a functional or monetary benefit.
    `.trim();

    const systemPrompt = `You are an expert brand strategist and thematic analyst specializing in brand cosmos development. 

Your task is to analyze the provided strategic answers about a brand's cosmos and extract key themes and insights.

IMPORTANT DEFINITIONS TO CONSIDER:
${seedWords}

Return your analysis as a JSON object with the following structure:
{
  "algorithm_flow": {
    "protagonist": { "title": string, "analysis": string },
    "antagonist": { "title": string, "analysis": string },
    "magic": { "title": string, "analysis": string },
    "society": { "title": string, "analysis": string }
  },
  "category_themes": [
    {
      "category_name": "Homeland" | "Hierarchy" | "Habitat",
      "themes": [
        { "title": string, "analysis": string }
      ]
    }
  ]
}

For the algorithm_flow:
- Protagonist: Identify the collective hero (brand + audience) and their core moral value
- Antagonist: Define the opposing ideology or societal norm being fought against
- Magic: Describe the specific methodology or "how" the protagonist combats the antagonist
- Society: Explain the self-contained brand world with its distinct rules and norms

For category themes:
- Title should be concise (2-5 words)
- Analysis should be insightful and actionable (2-3 sentences)
- Extract 3-5 themes per category based on the answers provided`;

    const userPrompt = `CORE CONFLICT:\n${conflict || 'Not provided'}\n\nSTRATEGIC ANSWERS:\n${JSON.stringify(answers, null, 2)}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to your workspace.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway request failed: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    const analysis = JSON.parse(analysisText);

    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in analyze-cosmos function:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'An error occurred during analysis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
