'use server';
/**
 * @fileOverview An AI agent for detecting animals in an image.
 *
 * - detectAnimal - A function that handles the animal detection process.
 * - DetectAnimalInput - The input type for the detectAnimal function.
 * - DetectAnimalOutput - The return type for the detectAnimal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnimalInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a scene, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectAnimalInput = z.infer<typeof DetectAnimalInputSchema>;

const DetectAnimalOutputSchema = z.object({
    detectedAnimal: z.string().describe("The name of the animal detected in the image. If no animal is found, return 'None'."),
    confidence: z.number().describe("The confidence score of the detection, from 0 to 100."),
    isTiger: z.boolean().describe("Whether the detected animal is a tiger."),
});
export type DetectAnimalOutput = z.infer<typeof DetectAnimalOutputSchema>;

export async function detectAnimal(input: DetectAnimalInput): Promise<DetectAnimalOutput> {
  return detectAnimalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnimalPrompt',
  input: {schema: DetectAnimalInputSchema},
  output: {schema: DetectAnimalOutputSchema},
  prompt: `You are a highly specialized wildlife detection model with an expert focus on identifying tigers.
Analyze the provided image.

Your task is to identify the primary animal in the image.
- If a tiger is present, you MUST identify it as "Tiger" and set isTiger to true. Your confidence should be high.
- If another animal is present, identify it by its common name (e.g., "Leopard", "Elephant", "Deer") and set isTiger to false.
- If no animal is clearly visible, return "None" as the detectedAnimal and a confidence of 0.

Return the name of the animal, your confidence score (0-100), and whether it is a tiger.

Photo: {{media url=photoDataUri}}`,
});

const detectAnimalFlow = ai.defineFlow(
  {
    name: 'detectAnimalFlow',
    inputSchema: DetectAnimalInputSchema,
    outputSchema: DetectAnimalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
