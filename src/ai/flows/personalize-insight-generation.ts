'use server';

/**
 * @fileOverview A flow that generates cultural insights based on user preferences.
 *
 * - generatePersonalizedInsight - A function that generates cultural insights based on user preferences.
 * - PersonalizedInsightInput - The input type for the generatePersonalizedInsight function.
 * - PersonalizedInsightOutput - The return type for the generatePersonalizedInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInsightInputSchema = z.object({
  insightType: z
    .enum(['shloka', 'historicalFact', 'mythologicalStory'])
    .describe('The type of cultural insight to generate.'),
});
export type PersonalizedInsightInput = z.infer<typeof PersonalizedInsightInputSchema>;

const PersonalizedInsightOutputSchema = z.object({
  insight: z.string().describe('The generated cultural insight.'),
});
export type PersonalizedInsightOutput = z.infer<typeof PersonalizedInsightOutputSchema>;

export async function generatePersonalizedInsight(
  input: PersonalizedInsightInput
): Promise<PersonalizedInsightOutput> {
  return personalizedInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedInsightPrompt',
  input: {schema: PersonalizedInsightInputSchema},
  output: {schema: PersonalizedInsightOutputSchema},
  prompt: `You are a cultural expert specializing in generating insights.

  Based on the user's preference, generate a cultural insight.

  If the user wants a shloka, provide a Sanskrit shloka with an English meaning.
  If the user wants a historical fact, provide a relevant historical fact.
  If the user wants a mythological story, provide a brief mythological story.

  Insight Type: {{{insightType}}}
  `,
});

const personalizedInsightFlow = ai.defineFlow(
  {
    name: 'personalizedInsightFlow',
    inputSchema: PersonalizedInsightInputSchema,
    outputSchema: PersonalizedInsightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
