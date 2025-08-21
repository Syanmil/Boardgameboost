// Summarize feedback based on user submitted data.
'use server';
/**
 * @fileOverview Summarizes playtest feedback using AI.
 *
 * - summarizePlaytestFeedback - A function that summarizes playtest feedback.
 * - SummarizePlaytestFeedbackInput - The input type for the summarizePlaytestFeedback function.
 * - SummarizePlaytestFeedbackOutput - The return type for the summarizePlaytestFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePlaytestFeedbackInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('The playtest feedback text to summarize.'),
});
export type SummarizePlaytestFeedbackInput = z.infer<typeof SummarizePlaytestFeedbackInputSchema>;

const SummarizePlaytestFeedbackOutputSchema = z.object({
  summary: z.string().describe('The summarized feedback.'),
});
export type SummarizePlaytestFeedbackOutput = z.infer<typeof SummarizePlaytestFeedbackOutputSchema>;

export async function summarizePlaytestFeedback(
  input: SummarizePlaytestFeedbackInput
): Promise<SummarizePlaytestFeedbackOutput> {
  return summarizePlaytestFeedbackFlow(input);
}

const summarizePlaytestFeedbackPrompt = ai.definePrompt({
  name: 'summarizePlaytestFeedbackPrompt',
  input: {schema: SummarizePlaytestFeedbackInputSchema},
  output: {schema: SummarizePlaytestFeedbackOutputSchema},
  prompt: `Summarize the following playtest feedback:

{{{feedbackText}}}`,
});

const summarizePlaytestFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizePlaytestFeedbackFlow',
    inputSchema: SummarizePlaytestFeedbackInputSchema,
    outputSchema: SummarizePlaytestFeedbackOutputSchema,
  },
  async input => {
    const {output} = await summarizePlaytestFeedbackPrompt(input);
    return output!;
  }
);
