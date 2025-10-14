'use server';

/**
 * @fileOverview A monthly incident report generator AI agent.
 *
 * - generateIncidentReport - A function that handles the incident report generation process.
 * - GenerateIncidentReportInput - The input type for the generateIncidentReport function.
 * - GenerateIncidentReportOutput - The return type for the generateIncidentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIncidentReportInputSchema = z.object({
  month: z.string().describe('The month for which to generate the report (e.g., January, February).'),
  year: z.string().describe('The year for which to generate the report (e.g., 2023, 2024).'),
});
export type GenerateIncidentReportInput = z.infer<typeof GenerateIncidentReportInputSchema>;

const GenerateIncidentReportOutputSchema = z.object({
  report: z.string().describe('The generated monthly incident report with trend analysis.'),
});
export type GenerateIncidentReportOutput = z.infer<typeof GenerateIncidentReportOutputSchema>;

export async function generateIncidentReport(input: GenerateIncidentReportInput): Promise<GenerateIncidentReportOutput> {
  return generateIncidentReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIncidentReportPrompt',
  input: {schema: GenerateIncidentReportInputSchema},
  output: {schema: GenerateIncidentReportOutputSchema},
  prompt: `You are an AI assistant specializing in generating monthly incident reports related to wildlife-human conflict.

  Generate a comprehensive report for the month of {{month}} in the year {{year}}.

  The report should include:
  - A summary of the total number of incidents reported during the month.
  - An analysis of the types of incidents that occurred (e.g., animal attacks, crop damage, property damage).
  - Identification of hotspots or areas with a high concentration of incidents.
  - Trends observed in the data, such as increases or decreases in specific types of incidents compared to previous months.
  - Recommendations for mitigating wildlife-human conflict based on the analysis.

  Format the report in a clear and concise manner, suitable for presentation to authorized officials.
  `,
});

const generateIncidentReportFlow = ai.defineFlow(
  {
    name: 'generateIncidentReportFlow',
    inputSchema: GenerateIncidentReportInputSchema,
    outputSchema: GenerateIncidentReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
