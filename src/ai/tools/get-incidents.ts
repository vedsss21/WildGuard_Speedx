'use server';
/**
 * @fileOverview A tool for fetching incident data from Firestore.
 */

import {ai} from '@/ai/genkit';
import {getIncidents} from '@/services/incidents';
import {z} from 'zod';

export const getIncidentsTool = ai.defineTool(
  {
    name: 'getIncidentsTool',
    description: 'Get all incident reports from the database.',
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        incidentType: z.string().optional(),
        location: z.string().optional(),
        reportedTime: z.string(),
        status: z.string().optional(),
        actionTaken: z.string().optional(),
        animalType: z.string().optional(),
      })
    ),
  },
  async () => {
    return getIncidents();
  }
);
