'use server';

/**
 * @fileOverview An AI agent for generating data analysis based on a user query.
 *
 * - generateAnalysis - A function that handles the analysis generation process.
 * - GenerateAnalysisInput - The input type for the generateAnalysis function.
 * - GenerateAnalysisOutput - The return type for the generateAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnalysisInputSchema = z.object({
  query: z.string().describe('The natural language query for data analysis.'),
});
export type GenerateAnalysisInput = z.infer<typeof GenerateAnalysisInputSchema>;

const GenerateAnalysisOutputSchema = z.object({
  analysis: z.string().describe('The generated analysis based on the user\'s query.'),
});
export type GenerateAnalysisOutput = z.infer<typeof GenerateAnalysisOutputSchema>;

export async function generateAnalysis(input: GenerateAnalysisInput): Promise<GenerateAnalysisOutput> {
  return generateAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAnalysisPrompt',
  input: {schema: GenerateAnalysisInputSchema},
  output: {schema: GenerateAnalysisOutputSchema},
  prompt: `You are an expert data analyst for WildGuard, a platform that tracks human-wildlife conflict.
  Your task is to analyze incident data based on user queries and provide a clear, insightful summary.

  You have access to a conceptual database of incidents with the following fields:
  - id (string)
  - type (enum: 'Crop Damage', 'Property Damage', 'Animal Attack', 'Sighting', 'Other')
  - location (string, e.g., 'Kothrud, Pune')
  - date (string, YYYY-MM-DD)
  - status (enum: 'Resolved', 'Active', 'Pending')
  - actionTaken (string)
  - animal (enum: 'Leopard', 'Elephant', 'Wild Boar', 'Snake', 'Monkey')

  Analyze the data based on the following user query and provide a response.
  Format the response clearly with headings, bullet points, and bold text to highlight key findings.

  User Query: "{{query}}"
  `,
});

const generateAnalysisFlow = ai.defineFlow(
  {
    name: 'generateAnalysisFlow',
    inputSchema: GenerateAnalysisInputSchema,
    outputSchema: GenerateAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
