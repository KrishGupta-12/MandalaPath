'use server';

/**
 * @fileOverview Generates a cultural insight (Sanskrit shloka with English meaning or a cultural fact) after solving a mandala.
 *
 * - generateCulturalInsight - A function that generates the cultural insight.
 * - GenerateCulturalInsightInput - The input type for the generateCulturalInsight function.
 * - GenerateCulturalInsightOutput - The return type for the generateCulturalInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCulturalInsightInputSchema = z.object({
  mandalaName: z.string().describe('The name of the solved mandala.'),
});
export type GenerateCulturalInsightInput = z.infer<typeof GenerateCulturalInsightInputSchema>;

const GenerateCulturalInsightOutputSchema = z.object({
  insight: z.string().describe('The generated cultural insight.'),
});
export type GenerateCulturalInsightOutput = z.infer<typeof GenerateCulturalInsightOutputSchema>;

export async function generateCulturalInsight(
  input: GenerateCulturalInsightInput
): Promise<GenerateCulturalInsightOutput> {
  return generateCulturalInsightFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCulturalInsightPrompt',
  input: {schema: GenerateCulturalInsightInputSchema},
  output: {schema: GenerateCulturalInsightOutputSchema},
  prompt: `You are a cultural expert specializing in providing insights related to mandalas.

  Based on the name of the solved mandala, generate a relevant cultural insight, which can be a Sanskrit shloka with English meaning or a cultural fact.

  Mandala Name: {{{mandalaName}}}
  `,
});

const generateCulturalInsightFlow = ai.defineFlow(
  {
    name: 'generateCulturalInsightFlow',
    inputSchema: GenerateCulturalInsightInputSchema,
    outputSchema: GenerateCulturalInsightOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
