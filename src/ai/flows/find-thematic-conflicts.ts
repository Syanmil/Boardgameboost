'use server';

/**
 * @fileOverview An AI agent that identifies potential thematic inconsistencies or conflicts in a game's description and rules.
 *
 * - findThematicConflicts - A function that analyzes game description and rules to identify thematic conflicts.
 * - FindThematicConflictsInput - The input type for the findThematicConflicts function.
 * - FindThematicConflictsOutput - The return type for the findThematicConflicts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindThematicConflictsInputSchema = z.object({
  gameDescription: z
    .string()
    .describe('The description of the game, including its theme and setting.'),
  gameRules: z.string().describe('The rules of the game.'),
});
export type FindThematicConflictsInput = z.infer<typeof FindThematicConflictsInputSchema>;

const FindThematicConflictsOutputSchema = z.object({
  conflicts: z
    .array(z.string())
    .describe(
      'A list of thematic inconsistencies or conflicts identified in the game description and rules.'
    ),
  summary: z
    .string()
    .describe('A summary of the thematic analysis, highlighting major conflicts and their potential impact.'),
});
export type FindThematicConflictsOutput = z.infer<typeof FindThematicConflictsOutputSchema>;

export async function findThematicConflicts(input: FindThematicConflictsInput): Promise<FindThematicConflictsOutput> {
  return findThematicConflictsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findThematicConflictsPrompt',
  input: {schema: FindThematicConflictsInputSchema},
  output: {schema: FindThematicConflictsOutputSchema},
  prompt: `You are an expert game designer specializing in identifying thematic inconsistencies in board games.

You will analyze the provided game description and rules to identify any potential thematic conflicts or inconsistencies.

Game Description: {{{gameDescription}}}

Game Rules: {{{gameRules}}}

Based on your analysis, generate a list of conflicts and a summary of the thematic analysis.

Conflicts: {{conflicts}}
Summary: {{summary}}`,
});

const findThematicConflictsFlow = ai.defineFlow(
  {
    name: 'findThematicConflictsFlow',
    inputSchema: FindThematicConflictsInputSchema,
    outputSchema: FindThematicConflictsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

