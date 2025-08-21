'use server';
/**
 * @fileOverview Provides AI-powered suggestions for design improvements based on common feedback themes.
 *
 * - suggestImprovements - A function that takes game project feedback and returns design improvement suggestions.
 * - SuggestImprovementsInput - The input type for the suggestImprovements function.
 * - SuggestImprovementsOutput - The return type for the suggestImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImprovementsInputSchema = z.object({
  feedbackSummary: z
    .string()
    .describe("A summary of feedback received on a game design, including common themes and concerns."),
  gameDescription: z.string().describe("A description of the game, including its mechanics and goals."),
});
export type SuggestImprovementsInput = z.infer<typeof SuggestImprovementsInputSchema>;

const SuggestImprovementsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe("A list of AI-powered suggestions for design improvements."),
  thematicConflicts: z
    .array(z.string())
    .describe("A list of potential thematic conflicts identified by the AI."),
});
export type SuggestImprovementsOutput = z.infer<typeof SuggestImprovementsOutputSchema>;

export async function suggestImprovements(input: SuggestImprovementsInput): Promise<SuggestImprovementsOutput> {
  return suggestImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImprovementsPrompt',
  input: {schema: SuggestImprovementsInputSchema},
  output: {schema: SuggestImprovementsOutputSchema},
  prompt: `You are an AI game design assistant. Your task is to analyze game feedback and suggest improvements.

You are provided with a summary of feedback and a description of the game.

Based on the feedback, suggest specific, actionable improvements to the game design. List suggestions that could improve the gameplay experience.

Also, check for and list any thematic conflicts in the game. Thematic conflicts are elements that don't logically fit with the themes and mechanics that are provided.

Feedback Summary: {{{feedbackSummary}}}
Game Description: {{{gameDescription}}}

Here are the suggestions for design improvements:
{{ suggestions }}

Here are the thematic conflicts:
{{ thematicConflicts }}`,
});

const suggestImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestImprovementsFlow',
    inputSchema: SuggestImprovementsInputSchema,
    outputSchema: SuggestImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
